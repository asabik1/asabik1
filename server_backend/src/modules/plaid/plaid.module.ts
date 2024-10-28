import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessOwnerModule } from '../business-owner/business-owner.module';
import { Investment } from '../investment/entities/investment.entity';
import { InvestmentService } from '../investment/services/investment.service';
import { UsersModule } from '../users/users.module';
import { PlaidController } from './controllers/plaid.controller';
import { Payment } from './entities/payment.entity';
import { AchqService } from './services/achq.service';
import { PaymentService } from './services/payment.service';
import { PlaidService } from './services/plaid.service';
import { InvestmentRequestService } from '../investment-request/services/investment-request.service';
import { NotificationService } from '../investment-request/services/notification.service';
import { InvestmentRequest } from '../investment-request/entities/investment-request.entity';
import { FinancialReport } from '../business-owner/entities/financial-report.entity';
import { CreditRatingService } from '../investment-request/services/credit-rating.service';
import { GlobalSettingsService } from '../global-settings/services/global-settings.service';
import { GlobalSettings } from '../global-settings/entities/global-settings.entity';
import { InstallmentService } from '../loan/services/installment.service';
import { Installment } from '../loan/entities/installment.entity';
import { Loan } from '../loan/entities/loan.entity';
import { LoanService } from '../loan/services/loan.service';
import { MonthlyReportService } from '../business-owner/services/monthly-report.service';
import { MonthlyReport } from '../business-owner/entities/monthly-report.entity';
import { CreditRatingData } from '../investment-request/entities/credit-rating-data.entity';
import { OriginalMonthlyReportService } from '../business-owner/services/original-monthly-report.service';
import { OriginalMonthlyReport } from '../business-owner/entities/original-monthly-report.entity';
import { AdminPlaidController } from './controllers/admin-plaid.controller';
import { Penalty } from './entities/penalty.entity';
import { PenaltyService } from './services/penalty.service';
import { CsvParserService } from '../business-owner/services/csv-parser.service';
import { RatingRange } from '../global-settings/entities/rating-range.entity';
import { RatingSettingsService } from '../global-settings/services/rating-settings.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CreditRatingData,
      Payment,
      Penalty,
      Investment,
      InvestmentRequest,
      FinancialReport,
      GlobalSettings,
      Loan,
      Installment,
      MonthlyReport,
      OriginalMonthlyReport,
      RatingRange,
    ]),
    forwardRef(() => UsersModule),
    forwardRef(() => BusinessOwnerModule),
  ],
  providers: [
    LoanService,
    CreditRatingService,
    GlobalSettingsService,
    PlaidService,
    AchqService,
    PaymentService,
    InvestmentService,
    InvestmentRequestService,
    NotificationService,
    InstallmentService,
    MonthlyReportService,
    OriginalMonthlyReportService,
    PenaltyService,
    CsvParserService,
    RatingSettingsService,
  ],
  controllers: [PlaidController, AdminPlaidController],
  exports: [PlaidService, AchqService, PaymentService, PenaltyService],
})
export class PlaidModule {}
