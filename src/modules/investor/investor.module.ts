import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Investor } from './entities/investor.entity';
import { InvestorService } from './services/investor.service';
import { InvestorController } from './controllers/investor.controller';
import { InvestorProfileController } from './controllers/investor-profile.controller';
import { UsersService } from '../users/services/users.service';
import { User } from '../users/entities/users.entity';
import { BusinessOwnerService } from '../business-owner/services/business-owner.service';
import { BusinessOwner } from '../business-owner/entities/business-owner.entity';
import FileService from '../files/service/file.service';
import File from '../files/entity/file.entity';
import { MonthlyReportService } from '../business-owner/services/monthly-report.service';
import { MonthlyReport } from '../business-owner/entities/monthly-report.entity';
import { PlaidService } from '../plaid/services/plaid.service';
import { InvestmentRequestService } from '../investment-request/services/investment-request.service';
import { InvestmentRequest } from '../investment-request/entities/investment-request.entity';
import { FinancialReport } from '../business-owner/entities/financial-report.entity';
import { CreditRatingService } from '../investment-request/services/credit-rating.service';
import { NotificationService } from '../investment-request/services/notification.service';
import { GlobalSettingsService } from '../global-settings/services/global-settings.service';
import { LoanService } from '../loan/services/loan.service';
import { GlobalSettings } from '../global-settings/entities/global-settings.entity';
import { Loan } from '../loan/entities/loan.entity';
import { Investment } from '../investment/entities/investment.entity';
import { InstallmentService } from '../loan/services/installment.service';
import { Installment } from '../loan/entities/installment.entity';
import { AchqService } from '../plaid/services/achq.service';
import { PaymentService } from '../plaid/services/payment.service';
import { Payment } from '../plaid/entities/payment.entity';
import { InvestmentService } from '../investment/services/investment.service';
import { CreditRatingData } from '../investment-request/entities/credit-rating-data.entity';
import { OriginalMonthlyReportService } from '../business-owner/services/original-monthly-report.service';
import { OriginalMonthlyReport } from '../business-owner/entities/original-monthly-report.entity';
import { PenaltyService } from '../plaid/services/penalty.service';
import { Penalty } from '../plaid/entities/penalty.entity';
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
      GlobalSettings,
      RatingRange,
      FinancialReport,
      InvestmentRequest,
      Investor,
      User,
      BusinessOwner,
      File,
      MonthlyReport,
      OriginalMonthlyReport,
      Investment,
      Installment,
      Payment,
      Penalty,
      IdentityScore,
    ]),
  ],
  providers: [
    AchqService,
    PaymentService,
    InstallmentService,
    InvestmentService,
    InvestmentRequestService,
    InvestorService,
    UsersService,
    BusinessOwnerService,
    BusinessOwnerRepository,
    IdentityScoreRepository,
    FileService,
    MonthlyReportService,
    MonthlyReportRepository,
    OriginalMonthlyReportService,
    PlaidService,
    CreditRatingService,
    NotificationService,
    GlobalSettingsService,
    LoanService,
    PenaltyService,
    CsvParserService,
    RatingSettingsService,
  ],
  controllers: [InvestorController, InvestorProfileController],
  exports: [InvestorService],
})
export class InvestorModule {}
