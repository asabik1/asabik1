import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoanService } from './services/loan.service';
import { Loan } from './entities/loan.entity';
import { Installment } from './entities/installment.entity';
import { InstallmentService } from './services/installment.service';
import { InvestmentRequestService } from '../investment-request/services/investment-request.service';
import { PlaidService } from '../plaid/services/plaid.service';
import { AchqService } from '../plaid/services/achq.service';
import { PaymentService } from '../plaid/services/payment.service';
import { NotificationService } from '../investment-request/services/notification.service';
import { Investment } from '../investment/entities/investment.entity';
import { InvestmentRequest } from '../investment-request/entities/investment-request.entity';
import { FinancialReport } from '../business-owner/entities/financial-report.entity';
import { BusinessOwnerService } from '../business-owner/services/business-owner.service';
import { CreditRatingService } from '../investment-request/services/credit-rating.service';
import { GlobalSettingsService } from '../global-settings/services/global-settings.service';
import { UsersService } from '../users/services/users.service';
import { Payment } from '../plaid/entities/payment.entity';
import { BusinessOwner } from '../business-owner/entities/business-owner.entity';
import { GlobalSettings } from '../global-settings/entities/global-settings.entity';
import { User } from '../users/entities/users.entity';
import { InvestorService } from '../investor/services/investor.service';
import { Investor } from '../investor/entities/investor.entity';
import { MonthlyReportService } from '../business-owner/services/monthly-report.service';
import { MonthlyReport } from '../business-owner/entities/monthly-report.entity';
import FileService from '../files/service/file.service';
import File from '../files/entity/file.entity';
import { InvestmentService } from '../investment/services/investment.service';
import { CreditRatingData } from '../investment-request/entities/credit-rating-data.entity';
import { OriginalMonthlyReportService } from '../business-owner/services/original-monthly-report.service';
import { OriginalMonthlyReport } from '../business-owner/entities/original-monthly-report.entity';
import { Penalty } from '../plaid/entities/penalty.entity';
import { PenaltyService } from '../plaid/services/penalty.service';
import { CsvParserService } from '../business-owner/services/csv-parser.service';
import { RatingSettingsService } from '../global-settings/services/rating-settings.service';
import { RatingRange } from '../global-settings/entities/rating-range.entity';
import { IdentityScore } from '../business-owner/entities/identity-score.entity';
import { BusinessOwnerRepository } from '../business-owner/repository/business-owner.repository';
import { IdentityScoreRepository } from '../business-owner/repository/identity-score.repository';
import { MonthlyReportRepository } from '../business-owner/repository/monthly-report.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CreditRatingData,
      Loan,
      Installment,
      Investment,
      InvestmentRequest,
      FinancialReport,
      Payment,
      BusinessOwner,
      GlobalSettings,
      User,
      Investor,
      MonthlyReport,
      OriginalMonthlyReport,
      File,
      Penalty,
      RatingRange,
      IdentityScore,
    ]),
    LoanModule,
  ],
  providers: [
    LoanService,
    InstallmentService,
    InvestmentService,
    InvestmentRequestService,
    PlaidService,
    AchqService,
    PaymentService,
    NotificationService,
    BusinessOwnerService,
    BusinessOwnerRepository,
    IdentityScoreRepository,
    CreditRatingService,
    GlobalSettingsService,
    UsersService,
    InvestorService,
    MonthlyReportService,
    MonthlyReportRepository,
    OriginalMonthlyReportService,
    UsersService,
    FileService,
    PaymentService,
    PenaltyService,
    CsvParserService,
    RatingSettingsService,
  ],
  exports: [LoanService],
})
export class LoanModule {}
