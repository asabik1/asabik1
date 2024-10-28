import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Payload } from 'src/modules/users/models/payload-interface';
import { InvestorSurveyDto } from '../dto/investor-survey.dto';
import { tap, delayWhen, map, mergeMap, Observable, forkJoin, of } from 'rxjs';
import { Investor } from '../../investor/entities/investor.entity';
import { SurveyStatus } from '../models/survey-status.enum';
import { BusinessOwnerService } from '../../business-owner/services/business-owner.service';
import { InvestmentRequestService } from '../../investment-request/services/investment-request.service';
import { InvestorService } from '../../investor/services/investor.service';
import { UsersService } from '../../users/services/users.service';
import { BusinessOwnerSurveyDto } from '../dto/business-owner-survey.dto';
import { BusinessOwner } from '../../business-owner/entities/business-owner.entity';
import { LoanPurpose } from '../../investment-request/enum/loan-purpose.enum';
import { BusinessStructure } from '../../business-owner/enum/business-structure.enum';
import { BusinessSubsectorRepository } from '../../business/repository/business-subsector.repository';

@Injectable()
export class SurveyService {
  constructor(
    private readonly usersService: UsersService,
    private readonly investorService: InvestorService,
    private readonly businessOwnerService: BusinessOwnerService,
    private readonly investmentRequestService: InvestmentRequestService,
    private readonly businessSubsectorRepository: BusinessSubsectorRepository,
  ) {}

  investorCompleteSurvey(
    surveyDto: InvestorSurveyDto,
    payload: Payload,
  ): Observable<{
    surveyStatus: SurveyStatus;
  }> {
    const investorProfile: Partial<Investor> = {
      companyName: surveyDto.companyName,
      fullName: surveyDto.fullName,
      website: surveyDto.website,
    };

    const surveyStatus = surveyDto.questions.every(
      (question) => question.answer == false,
    )
      ? SurveyStatus.QUALIFIES
      : SurveyStatus.NOT_QUALIFIES;

    return this.usersService.findOne(payload.userId).pipe(
      tap((user) => {
        if (user.surveyStatus != null) {
          throw new HttpException(
            'Survey is already completed.',
            HttpStatus.CONFLICT,
          );
        }

        if (surveyDto.fullName) {
          return this.investorService.updateInvestor(
            payload.investorId,
            investorProfile,
          );
        }
      }),
      delayWhen((user) => this.usersService.update(user.id, { surveyStatus })),
      map(() => ({ surveyStatus })),
    );
  }

  businessOwnerCompleteSurvey(
    surveyDto: BusinessOwnerSurveyDto,
    payload: Payload,
  ): Observable<{
    surveyStatus: SurveyStatus;
  }> {
    let surveyStatus: SurveyStatus = SurveyStatus.QUALIFIES;

    const requiredMinStartDate = new Date();
    requiredMinStartDate.setFullYear(requiredMinStartDate.getFullYear() - 3);

    if (
      new Date(surveyDto.businessStartDate) > requiredMinStartDate ||
      surveyDto.investmentRequest.purposeOfTheLoan ==
        LoanPurpose.FinanceDebtObligation
    ) {
      surveyStatus = SurveyStatus.NOT_QUALIFIES;
    }

    if (
      surveyDto.businessStructure == BusinessStructure.NonprofitOrganization
    ) {
      surveyStatus = SurveyStatus.NOT_QUALIFIES;
    }

    const profileData: Partial<BusinessOwner> = {
      startDate: new Date(surveyDto.businessStartDate),
      businessSubsector: this.businessSubsectorRepository.createDraft(
        surveyDto.businessSubindustryId,
      ),
      businessStructure: surveyDto.businessStructure,
      avrMonthlySales: surveyDto.avrMonthlySales,
      avrMonthlyNetProfit: surveyDto.avrMonthlyNetProfit,
      totalLastYearNetProfit: surveyDto.totalLastYearNetProfit,
      employeesNo: surveyDto.employeesNo,
      website: surveyDto.website,
    };

    return forkJoin({
      user: this.usersService.findOne(payload.userId),
      business:
        this.businessSubsectorRepository.findBusinessSubsectorsByBusinessSubsectorId(
          surveyDto.businessSubindustryId,
        ),
    }).pipe(
      tap((data) => {
        if (data.user.surveyStatus != null) {
          throw new HttpException(
            'Survey is already completed.',
            HttpStatus.CONFLICT,
          );
        } else if (data.business.forbidden) {
          surveyStatus = SurveyStatus.NOT_QUALIFIES;
        }
      }),
      mergeMap(() =>
        this.businessOwnerService.updateBusinessOwner(
          payload.businessOwnerId,
          profileData,
        ),
      ),
      mergeMap((businessOwner) =>
        this.investmentRequestService.createInvestmentRequestFromSurvey(
          businessOwner,
          surveyDto.investmentRequest,
        ),
      ),
      mergeMap(() =>
        this.usersService.update(payload.userId, { surveyStatus }),
      ),
      map(() => ({ surveyStatus })),
    );
  }
}
