import { BusinessOwnerService } from '../src/modules/business-owner/services/business-owner.service';
import { InvestmentRequest } from '../src/modules/investment-request/entities/investment-request.entity';
import { CreditRatingService } from '../src/modules/investment-request/services/credit-rating.service';
import { UsersService } from '../src/modules/users/services/users.service';
import { InvestmentRequestService } from '../src/modules/investment-request/services/investment-request.service';
import { GlobalSettingsService } from '../src/modules/global-settings/services/global-settings.service';
import { MailService } from '../src/modules/mail/services/mail.service';
import { RatingSettingsService } from '../src/modules/global-settings/services/rating-settings.service';
import { BusinessOwnerRepository } from '../src/modules/business-owner/repository/business-owner.repository';
import { MonthlyReportRepository } from '../src/modules/business-owner/repository/monthly-report.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FinancialReport } from 'src/modules/business-owner/entities/financial-report.entity';
import { Rating } from '../src/modules/investment-request/enum/rating.enum';
import { firstValueFrom, of } from 'rxjs';
import { GetGlobalSettingsResponse } from '../src/modules/global-settings/models/global-settings-response.interface';

const mockBusinessOwnerService = {};
const mockInvestmentRequestService = {};
const mockUsersService = {};
const mockMonthlyReportRepository = {};
const mockRatingSettingsService = {};
const mockMailService = {};
const mockBusinessOwnerRepository = {};

describe('CreditRatingService', () => {
  let creditRatingService: CreditRatingService;

  beforeEach(async () => {
    const mockGlobalSettingsService = {
      R: 0.0,
      M: 1.05,
      A: 0.0,
    };
    const mockRatingSettingsService = {
      getRatingByYearAndScore: jest
        .fn()
        .mockReturnValue(of({ rating: Rating.Aaa, low: 0.0, high: 0.000003 })),
      findRatingBoundary: jest.fn().mockReturnValue(of(0.0513)),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreditRatingService,
        {
          provide: getRepositoryToken(InvestmentRequest),
          useClass: Repository,
        },
        {
          provide: BusinessOwnerService,
          useValue: mockBusinessOwnerService,
        },
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: InvestmentRequestService,
          useValue: mockInvestmentRequestService,
        },
        {
          provide: MonthlyReportRepository,
          useValue: mockMonthlyReportRepository,
        },
        {
          provide: GlobalSettingsService,
          useValue: mockGlobalSettingsService,
        },
        {
          provide: RatingSettingsService,
          useValue: mockRatingSettingsService,
        },
        {
          provide: MailService,
          useValue: mockMailService,
        },
        {
          provide: BusinessOwnerRepository,
          useValue: mockBusinessOwnerRepository,
        },
      ],
    }).compile();

    creditRatingService = module.get<CreditRatingService>(CreditRatingService);
  });

  describe('calculateMaxLoan', () => {
    it('should return the correct maximum loan amount', async () => {
      const Y = 3;
      const VI = 0.6642161120285031;
      const E = 11_000.09208333333;
      const L = 504.219999999;
      const R = 0;

      const expected = 13_087.1489;

      const result: number = await firstValueFrom(
        creditRatingService.calculateMaxLoan(Y, VI, E, L, R),
      );

      expect(parseFloat(result.toFixed(4))).toEqual(expected);
    });
  });

  describe('calculateCreditRating', () => {
    it('should calculate the credit rating correctly', async () => {
      const financialReport: FinancialReport = {
        vInflow: 0.0354345123431595,
        vTotal: 0.2456,
        averageE: 12_000,
        averageL: 7_000,
        totalNoMonth: 24,
        outflowExceed: 0,
        negativeBalance: 0,
        noEarning: 0,
        businessOwnerId: 1,
      };
      const termInMonths = 12;
      const globalSettings: GetGlobalSettingsResponse = {
        maxReturnTermWOManualProcessing: 3,
        r: 0,
        m: 1.05,
        a: 0,
        raisingTimeLimit: 7,
        applicationFee: 500,
        minLoan: 2_000,
        maxLoan: 50_000,
        invalidTransactionPenalty: 10,
        plaidTokenPenalty: 50,
      };

      const expectedResult = Rating.Aaa;

      const result = await firstValueFrom(
        creditRatingService.calculateCreditRating(
          financialReport,
          termInMonths,
          globalSettings,
        ),
      );

      expect(result.rating).toEqual(expectedResult);
    });
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
});
