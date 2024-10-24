import { TypeOrmModule } from '@nestjs/typeorm';
import { forwardRef, Module } from '@nestjs/common';
import { Investment } from './entities/investment.entity';
import { InvestmentController } from './controllers/investment.controller';
import { InvestmentRequestModule } from '../investment-request/investment-request.module';
import { InvestorModule } from '../investor/investor.module';
import { PlaidModule } from '../plaid/plaid.module';
import { NotificationService } from '../investment-request/services/notification.service';
import { InvestmentRequestService } from '../investment-request/services/investment-request.service';
import { UsersService } from '../users/services/users.service';
import { InvestmentRequest } from '../investment-request/entities/investment-request.entity';
import { FinancialReport } from '../business-owner/entities/financial-report.entity';
import { BusinessOwnerService } from '../business-owner/services/business-owner.service';
import { CreditRatingService } from '../investment-request/services/credit-rating.service';
import { GlobalSettingsService } from '../global-settings/services/global-settings.service';
import { User } from '../users/entities/users.entity';
import { InstallmentService } from '../loan/services/installment.service';
import { BusinessOwner } from '../business-owner/entities/business-owner.entity';
import { GlobalSettings } from '../global-settings/entities/global-settings.entity';
import { Installment } from '../loan/entities/installment.entity';
import { Loan } from '../loan/entities/loan.entity';
import { LoanService } from '../loan/services/loan.service';
import FileService from '../files/service/file.service';
import File from '../files/entity/file.entity';
import { InvestmentService } from './services/investment.service';
import { MonthlyReportService } from '../business-owner/services/monthly-report.service';
import { MonthlyReport } from '../business-owner/entities/monthly-report.entity';
import { CreditRatingData } from '../investment-request/entities/credit-rating-data.entity';
import { OriginalMonthlyReportService } from '../business-owner/services/original-monthly-report.service';
import { OriginalMonthlyReport } from '../business-owner/entities/original-monthly-report.entity';
import { CsvParserService } from '../business-owner/services/csv-parser.service';
import { PenaltyService } from '../plaid/services/penalty.service';
import { Penalty } from '../plaid/entities/penalty.entity';
import { RatingRange } from '../global-settings/entities/rating-range.entity';
import { RatingSettingsService } from '../global-settings/services/rating-settings.service';
import { IdentityScore } from '../business-owner/entities/identity-score.entity';
import { BusinessOwnerRepository } from '../business-owner/repository/business-owner.repository';
import { IdentityScoreRepository } from '../business-owner/repository/identity-score.repository';
import { MonthlyReportRepository } from '../business-owner/repository/monthly-report.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CreditRatingData,
      Investment,
      InvestmentRequest,
      FinancialReport,
      User,
      Loan,
      BusinessOwner,
      GlobalSettings,
      Installment,
      File,
      MonthlyReport,
      OriginalMonthlyReport,
      Penalty,
      RatingRange,
      IdentityScore,
    ]),
    forwardRef(() => InvestmentRequestModule),
    forwardRef(() => InvestorModule),
    forwardRef(() => PlaidModule),
  ],
  providers: [
    InvestmentService,
    NotificationService,
    InvestmentRequestService,
    UsersService,
    LoanService,
    BusinessOwnerService,
    BusinessOwnerRepository,
    IdentityScoreRepository,
    CreditRatingService,
    GlobalSettingsService,
    InstallmentService,
    FileService,
    MonthlyReportService,
    MonthlyReportRepository,
    OriginalMonthlyReportService,
    CsvParserService,
    PenaltyService,
    RatingSettingsService,
  ],
  controllers: [InvestmentController],
  exports: [InvestmentService],
})
export class InvestmentModule {}
