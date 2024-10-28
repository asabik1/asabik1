import { FinancialReport } from '../src/modules/business-owner/entities/financial-report.entity';
import { InvestmentRequestService } from '../src/modules/investment-request/services/investment-request.service';
import { BusinessOwner } from '../src/modules/business-owner/entities/business-owner.entity';
import { BusinessStructure } from '../src/modules/business-owner/enum/business-structure.enum';
import { Role } from '../src/modules/auth/enums/role.enum';
import { CreateInvestmentRequestDto } from '../src/modules/investment-request/dto/investment-request-create.dto';
import { LoanPurpose } from '../src/modules/investment-request/enum/loan-purpose.enum';
import { CreditRatingService } from '../src/modules/investment-request/services/credit-rating.service';
import { BusinessOwnerService } from '../src/modules/business-owner/services/business-owner.service';
import { InvestmentRequest } from '../src/modules/investment-request/entities/investment-request.entity';
import { UsersService } from '../src/modules/users/services/users.service';
import { Repository } from 'typeorm';
import { MESSAGE_TO_BUSINESS_OWNER } from '../src/modules/investment-request/enum/message-to-business-owner.enum';
import { HttpException } from '@nestjs/common';
import { NotificationService } from '../src/modules/investment-request/services/notification.service';
import { GlobalSettingsService } from '../src/modules/global-settings/services/global-settings.service';
import { LoanService } from '../src/modules/loan/services/loan.service';
import { MailService } from '../src/modules/mail/services/mail.service';
import { CreditRatingData } from '../src/modules/investment-request/entities/credit-rating-data.entity';
import { RatingSettingsService } from '../src/modules/global-settings/services/rating-settings.service';
import { BusinessOwnerRepository } from '../src/modules/business-owner/repository/business-owner.repository';
import { MonthlyReportRepository } from '../src/modules/business-owner/repository/monthly-report.repository';
import { mockMonthlyReport } from '../mocks/monthly-report.mock';
import { GetGlobalSettingsResponse } from '../src/modules/global-settings/models/global-settings-response.interface';

describe('CreditRatingService (e2e)', () => {
  let investmentRequestService: InvestmentRequestService;
  let creditRatingService: CreditRatingService;
  let creditRatingDataRepository: Repository<CreditRatingData>;
  let investmentRequestRepository: Repository<InvestmentRequest>;
  let businessOwnerService: BusinessOwnerService;
  let businessOwnerRepository: BusinessOwnerRepository;
  let usersService: UsersService;
  let notificationService: NotificationService;
  let globalSettingsService: GlobalSettingsService;
  let loanService: LoanService;
  let monthlyReportRepository: MonthlyReportRepository;
  let mailService: MailService;
  let ratingSettingsService: RatingSettingsService;

  beforeEach(async () => {
    creditRatingService = new CreditRatingService(
      investmentRequestRepository,
      businessOwnerService,
      businessOwnerRepository,
      usersService,
      investmentRequestService,
      monthlyReportRepository,
      globalSettingsService,
      ratingSettingsService,
      mailService,
    );

    investmentRequestService = new InvestmentRequestService(
      creditRatingDataRepository,
      investmentRequestRepository,
      businessOwnerService,
      businessOwnerRepository,
      creditRatingService,
      notificationService,
      globalSettingsService,
      loanService,
      monthlyReportRepository,
    );
  });

  describe('createInvestmentRequest', () => {
    const businessOwner: BusinessOwner = {
      id: 1,
      startDate: new Date(),
      surveyCompletedAt: new Date(),
      businessStructure: BusinessStructure.Corporation,
      companyName: 'Sample Company',
      ownerName: 'John Johnes',
      street: '1 Main Street',
      city: 'Some Big City',
      zipCode: '00000',
      phone: '123456789',
      website: 'samplecompany.com',
      description: "Sample company's description",
      user: {
        id: 1,
        email: 'user@mail.com',
        emailConfirmed: true,
        accountActivatationToken: '123',
        createdAt: new Date(),
        updatedAt: new Date(),
        role: Role.BusinessOwner,
      },
      avrMonthlySales: 20000,
      avrMonthlyNetProfit: 10000,
      totalLastYearNetProfit: 100000,
      employeesNo: 2,
      investmentRequests: [],
      loan: [],
      isProfileComplete: true,
      monthlyReports: [],
      penalties: [],
    };

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

    const investmentRequestDto: CreateInvestmentRequestDto = {
      purposeOfTheLoan: LoanPurpose.Emergency,
      requiredCapital: 10_000,
      returnTerm: 12,
      netReturn: 2_000,
      netReturnToShare: 1_000,
      loanPurpose: 'Purpose of the loan description',
      helpIncreaseProfit: 'Investment description',
      profitIncrease: 1_000,
    };

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

    it('should throw error if financial report is not sufficient', () => {
      financialReport.totalNoMonth = 10;
      financialReport.outflowExceed = 2;

      let error: any;

      try {
        investmentRequestService.generateCreditRatingAndSaveNewInvestmentRequest(
          businessOwner,
          investmentRequestDto,
          [mockMonthlyReport],
          globalSettings,
        );
      } catch (e) {
        error = e;
      }

      expect(error).toBeInstanceOf(HttpException);
      expect(error.message).toBe(
        MESSAGE_TO_BUSINESS_OWNER.FINANCIAL_REPORT_CONDITIONS_NOT_MET,
      );

      financialReport.totalNoMonth = 24;
      financialReport.outflowExceed = 0;
    });
  });
});
