import { Test, TestingModule } from '@nestjs/testing';
import { SurveyController } from './survey.controller';
import { SurveyService } from '../services/survey.service';
import { InvestorSurveyDto } from '../dto/investor-survey.dto';
import { BusinessOwnerSurveyDto } from '../dto/business-owner-survey.dto';
import { SurveyStatus } from '../models/survey-status.enum';
import { Observable, of } from 'rxjs';
import { Payload } from '../../users/models/payload-interface';
import { Role } from '../../auth/enums/role.enum';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { GetPayload } from '../../users/decorators/get-payload.decorator';
import { Roles } from '../../auth/decorators/roles.decorator';
import { LoanPurpose } from '../../investment-request/enum/loan-purpose.enum';
import { BusinessStructure } from '../../business-owner/enum/business-structure.enum';

const investorSurveyDtoMock: InvestorSurveyDto = {
  questions: [
    {
      question: 'Sample question 1',
      answer: true,
    },
    {
      question: 'Sample question 2',
      answer: false,
    },
  ],
  fullName: 'John Doe',
  companyName: 'Sample Company',
  website: 'http://samplewebsite.com',
};

const businessOwnerSurveyDtoMock: BusinessOwnerSurveyDto = {
  businessStartDate: '2022-01-30',
  investmentRequest: {
    purposeOfTheLoan: LoanPurpose.WorkingCapital,
    requiredCapital: 100000,
    returnTerm: 12,
    netReturn: 5000,
    netReturnToShare: 4000,
    loanPurpose: 'Sample loan purpose',
    helpIncreaseProfit:
      'Sample description of how the loan will increase profits',
    profitIncrease: 8000,
  },
  businessStructure: BusinessStructure.Corporation,
  avrMonthlySales: 150000,
  avrMonthlyNetProfit: 50000,
  totalLastYearNetProfit: 600000,
  employeesNo: 20,
  businessSubindustryId: 123,
  website: 'https://example.com',
};

class SurveyServiceMock {
  investorCompleteSurvey(
    surveyDto: InvestorSurveyDto,
    payload: Payload,
  ): Observable<{ surveyStatus: SurveyStatus }> {
    return of({ surveyStatus: SurveyStatus.QUALIFIES });
  }

  businessOwnerCompleteSurvey(
    surveyDto: BusinessOwnerSurveyDto,
    payload: Payload,
  ): Observable<{ surveyStatus: SurveyStatus }> {
    return of({ surveyStatus: SurveyStatus.QUALIFIES });
  }
}

describe('SurveyController', () => {
  let controller: SurveyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SurveyController],
      providers: [
        SurveyService,
        {
          provide: SurveyService,
          useClass: SurveyServiceMock,
        },
      ],
    })
      .overrideGuard(AuthGuard(['jwt']))
      .useValue({ canActivate: () => true })
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<SurveyController>(SurveyController);
  });

  it('should complete investor survey', async () => {
    const surveyDto: InvestorSurveyDto = investorSurveyDtoMock;
    const payload: Payload = {
      userId: 123,
      role: Role.Investor,
      email: '',
      emailConfirmed: false,
      investorId: 0,
      businessOwnerId: 0,
      updatedAt: '',
      createdAt: '',
    };

    const result = await controller
      .investorCompleteSurvey(surveyDto, payload)
      .toPromise();

    expect(result).toBeDefined();
    expect(result.surveyStatus).toEqual(SurveyStatus.QUALIFIES);
  });

  it('should complete business owner survey', async () => {
    const surveyDto: BusinessOwnerSurveyDto = businessOwnerSurveyDtoMock;
    const payload: Payload = {
      userId: 456,
      role: Role.BusinessOwner,
      email: '',
      emailConfirmed: false,
      investorId: 0,
      businessOwnerId: 0,
      updatedAt: '',
      createdAt: '',
    };

    const result = await controller
      .businessOwnerCompleteSurvey(surveyDto, payload)
      .toPromise();

    expect(result).toBeDefined();
    expect(result.surveyStatus).toEqual(SurveyStatus.QUALIFIES);
  });
});
