import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GlobalSettings } from './entities/global-settings.entity';
import { GlobalSettingsService } from './services/global-settings.service';
import { GlobalSettingsController } from './controllers/global-settings.controller';
import { PlaidService } from '../plaid/services/plaid.service';
import { UsersService } from '../users/services/users.service';
import { User } from '../users/entities/users.entity';
import { InvestorService } from '../investor/services/investor.service';
import { BusinessOwnerService } from '../business-owner/services/business-owner.service';
import { Investor } from '../investor/entities/investor.entity';
import { BusinessOwner } from '../business-owner/entities/business-owner.entity';
import { Payment } from '../plaid/entities/payment.entity';
import { PlaidModule } from '../plaid/plaid.module';
import { MonthlyReportService } from '../business-owner/services/monthly-report.service';
import { MonthlyReport } from '../business-owner/entities/monthly-report.entity';
import FileService from '../files/service/file.service';
import File from '../files/entity/file.entity';
import { InvestmentRequestService } from '../investment-request/services/investment-request.service';
import { InvestmentRequest } from '../investment-request/entities/investment-request.entity';
import { FinancialReport } from '../business-owner/entities/financial-report.entity';
import { CreditRatingService } from '../investment-request/services/credit-rating.service';
import { NotificationService } from '../investment-request/services/notification.service';
import { LoanService } from '../loan/services/loan.service';
import { Loan } from '../loan/entities/loan.entity';
import { Investment } from '../investment/entities/investment.entity';
import { InstallmentService } from '../loan/services/installment.service';
import { Installment } from '../loan/entities/installment.entity';
import { InvestmentService } from '../investment/services/investment.service';
import { CreditRatingData } from '../investment-request/entities/credit-rating-data.entity';
import { OriginalMonthlyReportService } from '../business-owner/services/original-monthly-report.service';
import { OriginalMonthlyReport } from '../business-owner/entities/original-monthly-report.entity';
import { CsvParserService } from '../business-owner/services/csv-parser.service';
import { RatingSettingsService } from './services/rating-settings.service';
import { RatingRange } from './entities/rating-range.entity';
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
      FinancialReport,
      InvestmentRequest,
      GlobalSettings,
      User,
      Investor,
      BusinessOwner,
      Payment,
      MonthlyReport,
      OriginalMonthlyReport,
      File,
      RatingRange,
      IdentityScore,
    ]),
    GlobalSettingsModule,
    PlaidModule,
  ],
  providers: [
    InvestmentService,
    InstallmentService,
    CreditRatingService,
    NotificationService,
    LoanService,
    GlobalSettingsService,
    PlaidService,
    UsersService,
    InvestorService,
    BusinessOwnerService,
    BusinessOwnerRepository,
    IdentityScoreRepository,
    MonthlyReportService,
    MonthlyReportRepository,
    OriginalMonthlyReportService,
    FileService,
    InvestmentRequestService,
    CsvParserService,
    RatingSettingsService,
  ],
  controllers: [GlobalSettingsController],
})
export class GlobalSettingsModule {}
