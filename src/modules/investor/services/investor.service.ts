import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { catchError, from, map, mergeMap, Observable, of, tap } from 'rxjs';
import { Investor } from '../entities/investor.entity';
import { InvestorGetResponse } from '../models/investor-get-response.interface';
import { InvestorDetailsGetResponse } from '../models/investor-details-get-response.interface';
import { InvestorProfilePatchDto } from '../dto/investor-profile-patch.dto';
import { InvestorProfileGetResponse } from '../models/investor-profile-get-response.interface';
import { Payload } from '../../users/models/payload-interface';
import { INVESTMENT_REQUEST_STATUS } from '../../investment-request/enum/investment-status-message.enum';
import { UsersService } from '../../users/services/users.service';
import { SurveyStatus } from '../../survey/models/survey-status.enum';
import { BlockInvestorRequest } from '../dto/block-investor-request.dto';
import {
  toInvestorDetailsGetResponse,
  toInvestorGetResponse,
  toInvestorProfileGetResponse,
} from '../mapper/investor.mapper';
import { PlaidService } from '../../plaid/services/plaid.service';

@Injectable()
export class InvestorService {
  constructor(
    @InjectRepository(Investor)
    private readonly investorRepository: Repository<Investor>,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private readonly plaidService: PlaidService,
  ) {}

  getInvestorProfile(payload: Payload): Observable<InvestorProfileGetResponse> {
    return this.findOneByUserIdOrFail(payload.userId).pipe(
      map((investor) => toInvestorProfileGetResponse(payload.email, investor)),
    );
  }

  patchInvestorProfile(
    investorPatchDto: InvestorProfilePatchDto,
    payload: Payload,
  ): Observable<void> {
    return this.findOneByUserIdOrFail(payload.userId).pipe(
      mergeMap((investor) =>
        this.updateInvestor(investor.id, investorPatchDto),
      ),
      map(() => {
        return;
      }),
    );
  }

  patchInvestorProfileByAdmin(
    investorPatchDto: InvestorProfilePatchDto,
    id: number,
  ): Observable<void> {
    return this.findOneInvestorOrFail(id).pipe(
      mergeMap((investor) =>
        this.updateInvestor(investor.id, investorPatchDto),
      ),
      map(() => {
        return;
      }),
    );
  }

  deleteInvestor(payload: Payload): Observable<void> {
    return this.findOneByUserIdOrFail(payload.userId).pipe(
      tap((investor) => {
        if (!this.canInvestorDelete(investor)) {
          return this.usersService.freezeAccount(payload.userId);
        }
      }),
      mergeMap((investor) =>
        this.usersService
          .removeUser(payload.userId)
          .pipe(mergeMap((user) => this.removeInvestor(investor))),
      ),
      map(() => {}),
    );
  }

  removeInvestor(investor: Investor): Observable<Investor> {
    return from(this.investorRepository.remove(investor));
  }

  blockOrUnblockInvestor(
    investorId: number,
    blockInvestorRequest: BlockInvestorRequest,
  ): Observable<void> {
    return this.findOneInvestorOrFail(investorId).pipe(
      tap((investor) => {
        if (!this.isValidToDelete(investor)) {
          throw new HttpException(
            'You cannot block investor with an active investment request.',
            HttpStatus.BAD_REQUEST,
          );
        }
      }),
      mergeMap((investor) => {
        const surveyStatus = blockInvestorRequest.isBlocked
          ? SurveyStatus.BLOCKED
          : SurveyStatus.QUALIFIES;

        return from(
          this.usersService.update(investor.user.id, {
            surveyStatus: surveyStatus,
          }),
        );
      }),
      map(() => {}),
    );
  }

  getInvestors(): Observable<InvestorGetResponse[]> {
    return this.findAllInvestors().pipe(
      map((investors) => {
        return investors.map((investor) => toInvestorGetResponse(investor));
      }),
      catchError((e) => {
        throw new HttpException(e, HttpStatus.NOT_FOUND);
      }),
    );
  }

  getInvestorDetails(id: number): Observable<InvestorDetailsGetResponse> {
    return this.findOneInvestorOrFail(id).pipe(
      mergeMap((investor) =>
        this.plaidService.getIdentity(investor.user.id).pipe(
          map((userIdentity) =>
            toInvestorDetailsGetResponse(investor, userIdentity),
          ),
          catchError(() => of(toInvestorDetailsGetResponse(investor, null))),
        ),
      ),
    );
  }

  findAllInvestors(): Observable<Investor[]> {
    return from(
      this.investorRepository.find({
        relations: {
          user: true,
          investments: {
            paymentFromInvestor: true,
          },
        },
      }),
    );
  }

  findOneInvestorOrFail(id: number): Observable<Investor> {
    return from(
      this.investorRepository.findOneOrFail({
        where: { id },
        relations: {
          user: true,
          investments: {
            paymentFromInvestor: true,
            investmentRequest: {
              businessOwner: {
                businessSubsector: {
                  businessSector: true,
                },
              },
              loan: true,
            },
          },
        },
      }),
    ).pipe(
      catchError((err) => {
        throw new HttpException(
          'Investor was not found.',
          HttpStatus.NOT_FOUND,
        );
      }),
    );
  }

  findOneByUserIdOrFail(userId: number): Observable<Investor> {
    return from(
      this.investorRepository.findOneOrFail({
        where: { user: { id: userId } },
        relations: ['user', 'investments', 'investments.investmentRequest'],
      }),
    ).pipe(
      catchError((err) => {
        throw new HttpException(
          'Investor was not found.',
          HttpStatus.NOT_FOUND,
        );
      }),
    );
  }

  createInvestor(investor: Partial<Investor> = {}): Observable<Investor> {
    const newInvestor = this.investorRepository.create(investor);
    return from(this.investorRepository.save(newInvestor));
  }

  updateInvestor(
    investorId: number,
    investor: Partial<Investor>,
  ): Observable<UpdateResult> {
    return from(this.investorRepository.update(investorId, investor));
  }

  isValidToDelete(investor: Investor): boolean {
    if (investor.investments.length > 0) {
      return !investor.investments.some((investment) => {
        return (
          investment.investmentRequest.status ===
            INVESTMENT_REQUEST_STATUS.CLOSED ||
          investment.investmentRequest.status ===
            INVESTMENT_REQUEST_STATUS.OPEN ||
          investment.investmentRequest.status ===
            INVESTMENT_REQUEST_STATUS.TRANSFERED
        );
      });
    } else {
      return true;
    }
  }

  canInvestorDelete(investor: Investor): boolean {
    if (investor.investments !== null) {
      return false;
    }

    return true;
  }
}
