import { TypeOrmModule } from '@nestjs/typeorm';
import { forwardRef, Module } from '@nestjs/common';
import { BusinessOwner } from './entities/business-owner.entity';
import { BusinessOwnerService } from './services/business-owner.service';
import { BusinessOwnerController } from './controllers/business-owner.controller';
import { FileModule } from '../files/file.module';
import { BusinessOwneProfileController } from './controllers/business-owner-profile.controller';
import { InvestorModule } from '../investor/investor.module';
import { MonthlyReport } from './entities/monthly-report.entity';
import { FinancialReport } from './entities/financial-report.entity';
import { MonthlyReportService } from './services/monthly-report.service';
import { PlaidModule } from '../plaid/plaid.module';
import { UsersModule } from '../users/users.module';
import { BusinessOwnerAdminDataController } from './controllers/business-owner-admin-data.controller';
import { Loan } from '../loan/entities/loan.entity';
import { InvestmentRequestService } from '../investment-request/services/investment-request.service';
import { InvestmentRequest } from '../investment-request/entities/investment-request.entity';
import { CreditRatingService } from '../investment-request/services/credit-rating.service';
import { NotificationService } from '../investment-request/services/notification.service';
import { GlobalSettingsService } from '../global-settings/services/global-settings.service';
import { LoanService } from '../loan/services/loan.service';
import { GlobalSettings } from '../global-settings/entities/global-settings.entity';
import { InstallmentService } from '../loan/services/installment.service';
import { InvestmentService } from '../investment/services/investment.service';
import { Installment } from '../loan/entities/installment.entity';
import { Investment } from '../investment/entities/investment.entity';
import { CreditRatingData } from '../investment-request/entities/credit-rating-data.entity';
import { OriginalMonthlyReportService } from './services/original-monthly-report.service';
import { OriginalMonthlyReport } from './entities/original-monthly-report.entity';
import { CsvParserService } from './services/csv-parser.service';
import { RatingRange } from '../global-settings/entities/rating-range.entity';
import { RatingSettingsService } from '../global-settings/services/rating-settings.service';
import { IdentityScore } from './entities/identity-score.entity';
import { BusinessOwnerRepository } from './repository/business-owner.repository';
import { IdentityScoreRepository } from './repository/identity-score.repository';
import { MonthlyReportRepository } from './repository/monthly-report.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CreditRatingData,
      BusinessOwner,
      MonthlyReport,
      OriginalMonthlyReport,
      FinancialReport,
      Loan,
      InvestmentRequest,
      GlobalSettings,
      Installment,
      Investment,
      RatingRange,
      IdentityScore,
    ]),
    FileModule,
    PlaidModule,
    InvestorModule,
    forwardRef(() => UsersModule),
  ],
  providers: [
    BusinessOwnerService,
    BusinessOwnerRepository,
    IdentityScoreRepository,
    MonthlyReportService,
    MonthlyReportRepository,
    OriginalMonthlyReportService,
    InvestmentRequestService,
    CreditRatingService,
    NotificationService,
    GlobalSettingsService,
    LoanService,
    InstallmentService,
    InvestmentService,
    CsvParserService,
    RatingSettingsService,
  ],
  controllers: [
    BusinessOwnerController,
    BusinessOwneProfileController,
    BusinessOwnerAdminDataController,
  ],
  exports: [
    BusinessOwnerService,
    BusinessOwnerRepository,
    IdentityScoreRepository,
    MonthlyReportService,
    MonthlyReportRepository,
    OriginalMonthlyReportService,
    CsvParserService,
  ],
})
export class BusinessOwnerModule {}
