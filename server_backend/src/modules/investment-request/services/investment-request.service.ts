import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, IsNull, MoreThanOrEqual, Not, Repository } from 'typeorm';
import {
  catchError,
  delayWhen,
  forkJoin,
  from,
  map,
  mergeMap,
  Observable,
  of,
  tap,
} from 'rxjs';
import { InvestmentRequest } from '../entities/investment-request.entity';
import { CreateInvestmentRequestDto } from '../dto/investment-request-create.dto';
import { BusinessOwner } from '../../business-owner/entities/business-owner.entity';
import { UpdateInvestmentRequestDto } from '../dto/investment-request-update.dto';
import { BusinessOwnerService } from '../../business-owner/services/business-owner.service';
import { CreditRatingService } from './credit-rating.service';
import { MESSAGE_TO_BUSINESS_OWNER } from '../enum/message-to-business-owner.enum';
import { INVESTMENT_REQUEST_STATUS } from '../enum/investment-status-message.enum';
import { NotificationService } from './notification.service';
import { GlobalSettingsService } from '../../global-settings/services/global-settings.service';
import { Payload } from '../../users/models/payload-interface';
import { LoanService } from '../../loan/services/loan.service';
import { InvestmentRequestGetDetailedResponse } from '../models/investment-request-get-detailed-response.interface';
import { InvestmentRequestGetBusinessOwnerResponse } from '../models/investment-request-get-business-owner-response.interface';
import {
  generateFinancialReport,
  getNewestInvestmentRequest,
  sumInvestments,
} from '../../../helpers/investment-requests-counters';
import {
  toCreditRatingDataResponse,
  toInvestmentRequestGetBusinessOwnerResponse,
  toInvestmentRequestGetDetailedResponse,
} from '../mapper/investment-request.mapper';
import { CreditRatingData } from '../entities/credit-rating-data.entity';
import { CreditRatingDataResponse } from '../models/credit-rating-data-response.interface';
import { MonthlyReport } from '../../business-owner/entities/monthly-report.entity';
import { Rating } from '../enum/rating.enum';
import { LoanPurpose } from '../enum/loan-purpose.enum';
import { BusinessOwnerRepository } from '../../business-owner/repository/business-owner.repository';
import { MonthlyReportRepository } from '../../business-owner/repository/monthly-report.repository';
import { GetGlobalSettingsResponse } from 'src/modules/global-settings/models/global-settings-response.interface';

@Injectable()
export class InvestmentRequestService {
  logger = new Logger('InvestmentRequestService');

  constructor(
    @InjectRepository(CreditRatingData)
    private readonly creditRatingDataRepository: Repository<CreditRatingData>,
    @InjectRepository(InvestmentRequest)
    private readonly investmentRequestRepository: Repository<InvestmentRequest>,
    @Inject(forwardRef(() => BusinessOwnerService))
    private readonly businessOwnerService: BusinessOwnerService,
    private readonly businessOwnerRepository: BusinessOwnerRepository,
    private readonly creditRatingService: CreditRatingService,
    private readonly notificationService: NotificationService,
    private readonly globalSettingsService: GlobalSettingsService,
    private readonly loanService: LoanService,
    private readonly monthlyReportRepository: MonthlyReportRepository,
  ) {}

  findAllAcceptedInvestmentRequests(): Observable<InvestmentRequest[]> {
    return from(
      this.investmentRequestRepository.find({
        where: { approvedAt: Not(IsNull()) },
        relations: {
          businessOwner: {
            monthlyReports: true,
          },
          investments: true,
        },
      }),
    ).pipe(
      catchError((err) => {
        throw new HttpException(err, HttpStatus.NOT_FOUND);
      }),
    );
  }

  getAllinvestmentRequests(
    payload: Payload,
  ): Observable<InvestmentRequestGetBusinessOwnerResponse[]> {
    return this.getAllByBusinessOwnerId(payload.businessOwnerId).pipe(
      map((investmentRequests) => {
        return investmentRequests.map((investmentRequest) => {
          return toInvestmentRequestGetBusinessOwnerResponse(investmentRequest);
        });
      }),
    );
  }

  getNewestInvestmentRequest(
    businessOwnerId: number,
  ): Observable<InvestmentRequest> {
    return from(
      this.investmentRequestRepository.findOne({
        where: {
          businessOwner: { id: businessOwnerId },
        },
        relations: ['loan', 'investments'],
        order: { approvedAt: 'DESC' },
      }),
    );
  }

  updateInvestmentRequest(
    updateDto: UpdateInvestmentRequestDto,
    investmentRequestId: number,
    payload: Payload,
  ): Observable<void> {
    const now = new Date();
    const expiresAt = new Date();
    expiresAt.setDate(now.getDate() + 7);

    return this.findOneOrFail(investmentRequestId).pipe(
      tap((investmentRequest) => {
        if (investmentRequest.expiresAt > new Date()) {
          throw new HttpException(
            "This request haven't expired yet. You can't edit its data.",
            HttpStatus.FORBIDDEN,
          );
        } else if (investmentRequest.investments.length > 0) {
          throw new HttpException(
            "Someone has invested in this request. You can't edit its data.",
            HttpStatus.FORBIDDEN,
          );
        } else if (
          investmentRequest.status !== INVESTMENT_REQUEST_STATUS.OPEN
        ) {
          throw new HttpException(
            'You cannot edit this data.',
            HttpStatus.FORBIDDEN,
          );
        }
      }),
      mergeMap(() =>
        this.update(investmentRequestId, {
          loanPurpose: updateDto.loanPurpose,
          helpIncreaseProfit: updateDto.helpIncreaseProfit,
          netReturn: updateDto.netReturn,
          netReturnToShare: updateDto.netReturnToShare,
          expiresAt: expiresAt,
          status: INVESTMENT_REQUEST_STATUS.OPEN,
        }),
      ),
      map(() => {}),
    );
  }

  deleteInvestmentRequest(investmentRequestId: number): Observable<void> {
    return this.findOneOrFail(investmentRequestId).pipe(
      tap((investmentRequest) => {
        if (investmentRequest.investments.length > 0) {
          throw new HttpException(
            'Someone alredy invested in this request.',
            HttpStatus.CONFLICT,
          );
        }
      }),
      mergeMap(() =>
        this.creditRatingDataRepository.delete({
          investmentRequest: { id: investmentRequestId },
        }),
      ),
      mergeMap(() => this.delete(investmentRequestId)),
      map(() => {}),
    );
  }

  findOneOrFail(id: number): Observable<InvestmentRequest> {
    return from(
      this.investmentRequestRepository.findOneOrFail({
        where: { id },
        relations: [
          'investments',
          'investments.investor.user',
          'investments.paymentFromInvestor',
          'investments.investmentRequest',
          'businessOwner',
          'businessOwner.user',
          'loan',
        ],
      }),
    ).pipe(
      catchError(() => {
        throw new HttpException(
          'Investment request in is not available anymore',
          HttpStatus.BAD_REQUEST,
        );
      }),
    );
  }

  acceptLoan(
    investmentRequestId: number,
    payload: Payload,
    ip: string,
  ): Observable<string> {
    return forkJoin({
      investmentRequest: this.findOneOrFail(investmentRequestId),
      globalSettings: this.globalSettingsService.getGlobalSettings(),
    }).pipe(
      tap((data) => {
        if (data.investmentRequest.loan) {
          throw new HttpException(
            'Request already accepted.',
            HttpStatus.BAD_REQUEST,
          );
        }
      }),
      mergeMap((data) =>
        this.loanService.processAcceptLoan(
          data.investmentRequest,
          payload,
          data.globalSettings,
        ),
      ),
      mergeMap(() => {
        return of('Within 7 days the funds will appear in your account.');
      }),
      catchError((e) => {
        this.logger.error('Error occured in acceptLoan(): ' + e);

        throw new HttpException(
          'Error occured in acceptLoan(): ' + e,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }),
    );
  }

  declineLoan(investmentRequestId: number): Observable<string> {
    return this.findOneOrFail(investmentRequestId).pipe(
      mergeMap((investmentRequest) =>
        this.loanService.rejectLoan(investmentRequest),
      ),
      mergeMap(() => {
        return of('Loan request rejected.');
      }),
      catchError((e) => {
        this.logger.error('Error occured in declineLoan(): ' + e);

        throw new HttpException(
          'Error occured in declineLoan(): ' + e,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }),
    );
  }

  extendRaisingTime(investmentRequestId: number): Observable<void> {
    const now = new Date();
    const expiresAt = new Date();
    expiresAt.setDate(now.getDate() + 7);

    return this.findOneOrFail(investmentRequestId).pipe(
      tap((investmentRequest) => {
        if (
          investmentRequest.expiresAt > now ||
          investmentRequest.status !== INVESTMENT_REQUEST_STATUS.CLOSED
          // || investmentRequest.isExtended == true
        ) {
          throw new HttpException(
            'You cannot extend your raising time limit.',
            HttpStatus.BAD_REQUEST,
          );
        }
      }),
      mergeMap((investmentRequest) =>
        this.investmentRequestRepository.update(investmentRequest.id, {
          expiresAt: expiresAt,
          status: INVESTMENT_REQUEST_STATUS.OPEN,
          // isExtended: true,
        }),
      ),
      map(() => {}),
    );
  }

  getInvestmentRequestDetails(
    investmentRequestId: number,
    businessOwnerId: number,
  ): Observable<InvestmentRequestGetDetailedResponse> {
    return forkJoin({
      investmentRequest: this.findOneOrFail(investmentRequestId),
      monthlyReport:
        this.monthlyReportRepository.findNewestMonthlyReport(businessOwnerId),
    }).pipe(
      map((data) =>
        toInvestmentRequestGetDetailedResponse(
          data.monthlyReport,
          data.investmentRequest,
        ),
      ),
    );
  }

  getCreditRatingDataResponse(
    investmentRequestId: number,
  ): Observable<CreditRatingDataResponse> {
    return from(
      this.creditRatingDataRepository.findOneOrFail({
        where: {
          investmentRequest: { id: investmentRequestId },
        },
        relations: ['investmentRequest', 'monthlyReports'],
      }),
    ).pipe(
      map((creditRatingData) => toCreditRatingDataResponse(creditRatingData)),
      catchError(() => {
        throw new HttpException(
          'No credit rating data was found.',
          HttpStatus.BAD_REQUEST,
        );
      }),
    );
  }

  getAllByUser(userId: number): Observable<InvestmentRequest[]> {
    return from(
      this.investmentRequestRepository.find({
        where: { businessOwner: { user: { id: userId } } },
      }),
    );
  }

  getAllByBusinessOwnerId(
    businessOwnerId: number,
  ): Observable<InvestmentRequest[]> {
    return from(
      this.investmentRequestRepository.find({
        where: { businessOwner: { id: businessOwnerId } },
        relations: [
          'investments',
          'investments.investor',
          'investments.investor.user',
          'investments.paymentFromInvestor',
        ],
      }),
    );
  }

  generateCreditRatingAndSaveNewInvestmentRequest(
    businessOwner: BusinessOwner,
    investmentRequestDto: DeepPartial<InvestmentRequest>,
    monthlyReports: MonthlyReport[],
    globalSettings: GetGlobalSettingsResponse,
  ): Observable<InvestmentRequest> {
    if (investmentRequestDto.loanPurpose == LoanPurpose.FinanceDebtObligation) {
      throw new HttpException(
        MESSAGE_TO_BUSINESS_OWNER.WRONG_LOAN_PURPOSE,
        HttpStatus.BAD_REQUEST,
      );
    }

    const reports = monthlyReports
      .sort((a, b) => b.reportDate.getTime() - a.reportDate.getTime())
      .slice(0, 24);

    const financialReport = generateFinancialReport(reports, businessOwner.id);

    const totalNoMonth = financialReport.totalNoMonth;
    const outflowExceed = financialReport.outflowExceed;
    const negativeBalance = financialReport.negativeBalance;
    const noEarning = financialReport.noEarning;

    if (
      totalNoMonth < 24 ||
      outflowExceed !== 0 ||
      negativeBalance !== 0 ||
      noEarning !== 0
    ) {
      throw new HttpException(
        MESSAGE_TO_BUSINESS_OWNER.FINANCIAL_REPORT_CONDITIONS_NOT_MET,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (investmentRequestDto.requiredCapital < globalSettings.minLoan) {
      throw new HttpException(
        MESSAGE_TO_BUSINESS_OWNER.MINIMUM_LOAN_AMOUNT_NOT_MET,
        HttpStatus.BAD_REQUEST,
      );
    } else if (investmentRequestDto.requiredCapital > globalSettings.maxLoan) {
      throw new HttpException(
        MESSAGE_TO_BUSINESS_OWNER.MAXIMUM_LOAN_AMOUNT_NOT_MET,
        HttpStatus.BAD_REQUEST,
      );
    }

    const Y: number = investmentRequestDto.returnTerm / 12;
    const E: number = financialReport.averageE;
    const L: number = financialReport.averageL;
    const VI: number = financialReport.vInflow;

    const now = new Date();
    const expiresAt = new Date();
    expiresAt.setDate(now.getDate() + globalSettings.raisingTimeLimit);

    return this.creditRatingService
      .calculateCreditRating(
        financialReport,
        investmentRequestDto.returnTerm,
        globalSettings,
      )
      .pipe(
        tap((creditRating) => {
          if (
            creditRating.maxLoanCalc < globalSettings.minLoan ||
            creditRating.rating == Rating.JUNK
          ) {
            throw new HttpException(
              MESSAGE_TO_BUSINESS_OWNER.FINANCIAL_REPORT_CONDITIONS_NOT_MET,
              HttpStatus.BAD_REQUEST,
            );
          } else if (creditRating.maxLoanCalc < 0) {
            throw new HttpException(
              MESSAGE_TO_BUSINESS_OWNER.CREDIT_RATING_NOT_SUFFICIENT_FOR_GIVEN_TERM.replace(
                '{years}',
                Y.toString(),
              ),
              HttpStatus.BAD_REQUEST,
            );
          }
        }),
        mergeMap((creditRating) => {
          const creditRatingData = {
            ...creditRating,
            requestedAmount: investmentRequestDto.requiredCapital,
            r: globalSettings.r,
            m: globalSettings.m,
            a: globalSettings.a,
            vInflow: financialReport.vInflow,
            vTotal: financialReport.vTotal,
            averageE: financialReport.averageE,
            averageL: financialReport.averageL,
            totalNoMonth: financialReport.totalNoMonth,
            outflowExceed: financialReport.outflowExceed,
            negativeBalance: financialReport.negativeBalance,
            noEarning: financialReport.noEarning,
          };

          investmentRequestDto.rating = creditRating.rating;
          investmentRequestDto.dti = this.creditRatingService.calculateDti(
            financialReport,
            investmentRequestDto.returnTerm,
          );
          investmentRequestDto.requiredCapital =
            this.creditRatingService.calculateMaxLoanApproved(
              investmentRequestDto.requiredCapital,
              creditRating.maxLoanCalc,
            );
          investmentRequestDto.approvedAt = new Date();
          investmentRequestDto.expiresAt = new Date(expiresAt);
          investmentRequestDto.businessOwner = businessOwner;

          investmentRequestDto.status = INVESTMENT_REQUEST_STATUS.OPEN;
          if (
            investmentRequestDto.returnTerm / 12 >
            globalSettings.maxReturnTermWOManualProcessing
          ) {
            investmentRequestDto.status =
              INVESTMENT_REQUEST_STATUS.MANUAL_PROCESSING;
          }

          return from(
            this.investmentRequestRepository.save(investmentRequestDto),
          ).pipe(
            mergeMap((investmentRequest) =>
              this.creditRatingDataRepository.save({
                ...creditRatingData,
                investmentRequest,
                reports,
              }),
            ),
            map((data) => data.investmentRequest),
            catchError((err) => {
              throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
            }),
          );
        }),
      );
  }

  createInvestmentRequest(
    businessOwnerId: number,
    investmentRequestDto: CreateInvestmentRequestDto,
  ): Observable<string> {
    return forkJoin({
      businessOwner:
        this.businessOwnerRepository.findBusinessOwnerByBusinessOwnerId(
          businessOwnerId,
        ),
      lastMonthlyReport:
        this.monthlyReportRepository.findNewestMonthlyReport(businessOwnerId),
      globalSettings: this.globalSettingsService.getGlobalSettings(),
    }).pipe(
      tap((data) => {
        const currentDate = new Date();
        const oneMonthAgo = new Date(currentDate);
        oneMonthAgo.setMonth(currentDate.getMonth() - 1);

        if (
          !this.businessOwnerService.isValidForRequest(
            getNewestInvestmentRequest(data.businessOwner.investmentRequests),
          )
        ) {
          throw new HttpException(
            'You have an opened investment request.',
            HttpStatus.BAD_REQUEST,
          );
        } else if (data.businessOwner.monthlyReports.length == 0) {
          throw new HttpException(
            MESSAGE_TO_BUSINESS_OWNER.FINANCIAL_REPORT_CONDITIONS_NOT_MET,
            HttpStatus.BAD_REQUEST,
          );
        } else if (data.lastMonthlyReport.reportDate < oneMonthAgo) {
          throw new HttpException(
            MESSAGE_TO_BUSINESS_OWNER.LACKING_LAST_MONTHLY_REPORT,
            HttpStatus.BAD_REQUEST,
          );
        }
      }),
      mergeMap((data) =>
        this.generateCreditRatingAndSaveNewInvestmentRequest(
          data.businessOwner,
          investmentRequestDto,
          data.businessOwner.monthlyReports,
          data.globalSettings,
        ).pipe(
          map((investmentRequest) => {
            if (
              investmentRequest.status ==
              INVESTMENT_REQUEST_STATUS.MANUAL_PROCESSING
            ) {
              return MESSAGE_TO_BUSINESS_OWNER.OVER_3_YEARS_MANUAL_APPROVAL;
            } else {
              return MESSAGE_TO_BUSINESS_OWNER.SUCCESSFUL_CREDIT_RATING.replace(
                '{approvedLoan}',
                investmentRequest.requiredCapital.toString(),
              );
            }
          }),
        ),
      ),
    );
  }

  createInvestmentRequestFromSurvey(
    businessOwner: BusinessOwner,
    investmentRequestDto: DeepPartial<InvestmentRequest>,
  ): Observable<void> {
    if (!businessOwner) {
      throw new HttpException('Invalid Business Owner', HttpStatus.BAD_REQUEST);
    }

    investmentRequestDto.status =
      INVESTMENT_REQUEST_STATUS.PROCESSING_FROM_SURVEY;
    investmentRequestDto.businessOwner = businessOwner;

    return this.businessOwnerRepository
      .findBusinessOwnerByBusinessOwnerId(businessOwner.id)
      .pipe(
        tap(() => {
          if (
            investmentRequestDto.loanPurpose ==
            LoanPurpose.FinanceDebtObligation
          ) {
            throw new HttpException(
              MESSAGE_TO_BUSINESS_OWNER.WRONG_LOAN_PURPOSE,
              HttpStatus.BAD_REQUEST,
            );
          }
        }),
        mergeMap(() => {
          return from(
            this.investmentRequestRepository.save(investmentRequestDto),
          ).pipe(
            catchError((err) => {
              throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
            }),
          );
        }),
        delayWhen(() =>
          this.businessOwnerService.updateProfileStatus(businessOwner.id),
        ),
        map(() => {}),
      );
  }

  approveInvestmentRequestFromManualProcessing(
    investmentRequest: InvestmentRequest,
    isApproved: boolean,
    raisingTimeLimit: number,
  ): Observable<void> {
    let approvedAt = new Date();
    let expiresAt = new Date();
    expiresAt.setDate(approvedAt.getDate() + raisingTimeLimit);
    let status = INVESTMENT_REQUEST_STATUS.OPEN;

    if (isApproved === false) {
      approvedAt = null;
      expiresAt = null;
      status = INVESTMENT_REQUEST_STATUS.CANCELLED;
    }

    return from(
      this.investmentRequestRepository.update(investmentRequest.id, {
        approvedAt: approvedAt,
        expiresAt: expiresAt,
        status: status,
      }),
    ).pipe(
      delayWhen(() =>
        this.businessOwnerService.updateProfileStatus(
          investmentRequest.businessOwner.id,
        ),
      ),
      mergeMap(() =>
        this.notificationService.generateManualProcessingEmail(
          investmentRequest,
          isApproved,
        ),
      ),
    );
  }

  update(
    investmentRequestId: number,
    investmentRequest: DeepPartial<InvestmentRequest>,
  ): Observable<any> {
    return from(
      this.investmentRequestRepository.update(
        investmentRequestId,
        investmentRequest,
      ),
    ).pipe(
      delayWhen((businessOwner) =>
        this.businessOwnerService.updateProfileStatus(businessOwner.id),
      ),
    );
  }

  updateInvestmentRequestStatus(
    investmentRequestId: number,
    status: INVESTMENT_REQUEST_STATUS,
  ): Observable<any> {
    return from(
      this.investmentRequestRepository.update(investmentRequestId, {
        status: status,
      }),
    ).pipe(
      delayWhen((businessOwner) =>
        this.businessOwnerService.updateProfileStatus(businessOwner.id),
      ),
    );
  }

  delete(investmentRequestId: number): Observable<any> {
    return from(
      this.investmentRequestRepository.delete(investmentRequestId),
    ).pipe(
      delayWhen((businessOwner) =>
        this.businessOwnerService.updateProfileStatus(businessOwner.id),
      ),
    );
  }

  dateToString(date: Date): string {
    if (date === null) {
      return '-';
    }

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
  }

  updateInvestmentRequestsStatuses(businessOwnerId: number): Observable<void> {
    return from(
      this.investmentRequestRepository.find({
        where: {
          businessOwner: { id: businessOwnerId },
          status: INVESTMENT_REQUEST_STATUS.OPEN,
          expiresAt: MoreThanOrEqual(new Date()),
        },
      }),
    ).pipe(
      mergeMap((investmentRequests) =>
        investmentRequests.map((investmentRequest) => {
          let status = INVESTMENT_REQUEST_STATUS.CLOSED;
          if (
            sumInvestments(investmentRequest.investments) < 2000 &&
            investmentRequest.isExtended == true
          ) {
            status = INVESTMENT_REQUEST_STATUS.REJECTED;
          }

          this.update(investmentRequest.id, {
            status: status,
          });
        }),
      ),
      map(() => {}),
    );
  }

  // currently we don't reject; we only ask is user wants to extend raising time

  // @Cron('0 * * * *')
  // rejectInvestmentRequests(): void {
  //   this.logger.log('Execute cron job - reject investment requests');

  //   from(
  //     this.investmentRequestRepository.find({
  //       where: {
  //         status: InvestmentStatus.OPEN,
  //         expiresAt: MoreThanOrEqual(new Date()),
  //       },
  //     }),
  //   ).pipe(
  //     mergeMap((investmentRequests) =>
  //       investmentRequests.map((investmentRequest) => {
  //         if (
  //           sumInvestments(investmentRequest.investments) < 2000 &&
  //           investmentRequest.isExtended == true
  //         ) {
  //           this.loanService.refundPayment(investmentRequest.investments);

  //           this.updateInvestmentRequestStatus(
  //             investmentRequest.id,
  //             InvestmentStatus.REJECTED,
  //           );
  //         }
  //       }),
  //     ),
  //     map(() => {}),
  //   );
  // }
}
