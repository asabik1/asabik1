import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessOwner } from '../entities/business-owner.entity';
import {
  DeepPartial,
  ILike,
  IsNull,
  Not,
  Repository,
  UpdateResult,
} from 'typeorm';
import { catchError, from, Observable } from 'rxjs';
import { SurveyStatus } from '../../survey/models/survey-status.enum';

@Injectable()
export class BusinessOwnerRepository {
  constructor(
    @InjectRepository(BusinessOwner)
    private readonly businessOwnerRepository: Repository<BusinessOwner>,
  ) {}

  findAllBusinessOwners(): Observable<BusinessOwner[]> {
    return from(
      this.businessOwnerRepository.find({
        relations: {
          user: true,
          monthlyReports: true,
          investmentRequests: {
            investments: true,
          },
        },
      }),
    );
  }

  findAllBusinessOwnersForInvestor(
    companyName: string = '',
    onlyActive?: boolean,
  ): Observable<BusinessOwner[]> {
    return from(
      this.businessOwnerRepository.find({
        where: {
          companyName: ILike(`%${companyName}%`),
          isProfileComplete: onlyActive ? true : undefined,
          investmentRequests: true,
          user: {
            plaidToken: onlyActive ? Not(IsNull()) : undefined,
            surveyStatus: onlyActive ? SurveyStatus.QUALIFIES : undefined,
            emailConfirmed: onlyActive ? true : undefined,
          },
        },
        relations: {
          investmentRequests: {
            loan: true,
            investments: {
              investor: true,
              paymentFromInvestor: true,
            },
          },
          image: true,
          businessSubsector: {
            businessSector: {
              business: true,
            },
          },
          monthlyReports: true,
          user: true,
        },
      }),
    );
  }

  findBusinessOwnersByCompanyNameForAdmin(
    companyName: string = '',
  ): Observable<BusinessOwner[]> {
    return from(
      this.businessOwnerRepository.find({
        where: {
          companyName: ILike(`%${companyName}`),
        },
        relations: {
          investmentRequests: {
            investments: {
              investor: true,
              paymentFromInvestor: true,
            },
          },
          businessSubsector: {
            businessSector: {
              business: true,
            },
          },
          user: true,
        },
      }),
    );
  }

  findBusinessOwnerByUserIdOrFail(
    userId: number,
    onlyActive?: boolean,
  ): Observable<BusinessOwner> {
    return from(
      this.businessOwnerRepository.findOneOrFail({
        where: {
          isProfileComplete: onlyActive ? true : undefined,
          user: {
            id: userId,
            plaidToken: onlyActive ? Not(IsNull()) : undefined,
            surveyStatus: onlyActive ? SurveyStatus.QUALIFIES : undefined,
            emailConfirmed: onlyActive ? true : undefined,
          },
        },
        relations: {
          investmentRequests: {
            investments: {
              investor: true,
              paymentFromInvestor: true,
            },
          },
          image: true,
          businessSubsector: {
            businessSector: {
              business: true,
            },
          },
          user: true,
        },
      }),
    ).pipe(
      catchError(() => {
        throw new HttpException(
          'Business owner not found.',
          HttpStatus.NOT_FOUND,
        );
      }),
    );
  }

  findBusinessOwnerByBusinessOwnerIdOrFailOptionalActive(
    businessOwnerId: number,
    onlyActive?: boolean,
  ): Observable<BusinessOwner> {
    return from(
      this.businessOwnerRepository.findOneOrFail({
        where: {
          id: businessOwnerId,
          isProfileComplete: onlyActive ? true : undefined,
          user: {
            plaidToken: onlyActive ? Not(IsNull()) : undefined,
            surveyStatus: onlyActive ? SurveyStatus.QUALIFIES : undefined,
            emailConfirmed: onlyActive ? true : undefined,
          },
        },
        relations: {
          investmentRequests: {
            loan: true,
            investments: {
              investor: {
                user: true,
              },
              paymentFromInvestor: true,
            },
          },
          image: true,
          businessSubsector: {
            businessSector: {
              business: true,
            },
          },
          user: true,
          identityScore: true,
        },
      }),
    ).pipe(
      catchError(() => {
        throw new HttpException(
          'Business owner not found.',
          HttpStatus.NOT_FOUND,
        );
      }),
    );
  }

  findBusinessOwnerByBusinessOwnerId(
    businessOwnerId: number,
  ): Observable<BusinessOwner> {
    return from(
      this.businessOwnerRepository.findOneOrFail({
        where: {
          id: businessOwnerId,
        },
        relations: {
          investmentRequests: {
            loan: true,
            investments: {
              investor: {
                user: true,
              },
              paymentFromInvestor: true,
            },
          },
          image: true,
          businessSubsector: {
            businessSector: {
              business: true,
            },
          },
          user: true,
          identityScore: true,
          monthlyReports: true,
        },
      }),
    );
  }

  findCompletedBusinessOwnerByBusinessOwnerId(
    businessOwnerId: number,
  ): Observable<BusinessOwner> {
    return from(
      this.businessOwnerRepository.findOne({
        where: {
          id: businessOwnerId,
          // image: {
          //   id: Not(IsNull()),
          // },
          companyName: Not(IsNull()),
          street: Not(IsNull()),
          city: Not(IsNull()),
          zipCode: Not(IsNull()),
          businessSubsector: {
            id: Not(IsNull()),
          },
          investmentRequests: {
            id: Not(IsNull()),
          },
          description: Not(IsNull()),
          user: {
            plaidToken: Not(IsNull()),
            surveyStatus: SurveyStatus.QUALIFIES,
            emailConfirmed: true,
          },
        },
        relations: {
          investmentRequests: true,
          user: true,
          businessSubsector: true,
          image: true,
        },
      }),
    );
  }

  saveBusinessOwner(
    businessOwner: DeepPartial<BusinessOwner>,
  ): Observable<BusinessOwner> {
    return from(this.businessOwnerRepository.save(businessOwner));
  }

  createBusinessOwner(
    businessOwner: DeepPartial<BusinessOwner>,
  ): BusinessOwner {
    return this.businessOwnerRepository.create(businessOwner);
  }

  updateBusinessOwner(
    businessOwnerId: number,
    businessOwner: DeepPartial<BusinessOwner>,
  ): Observable<UpdateResult> {
    return from(
      this.businessOwnerRepository.update(businessOwnerId, businessOwner),
    );
  }

  removeBusinessOwner(businessOwner: BusinessOwner): Observable<BusinessOwner> {
    return from(this.businessOwnerRepository.remove(businessOwner));
  }
}
