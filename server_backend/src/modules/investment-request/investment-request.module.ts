import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { InvestmentRequest } from './entities/investment-request.entity';
import { InvestmentRequestService } from './services/investment-request.service';
import { InvestmentRequestController } from './controllers/investment-request.controller';
import { BusinessOwnerModule } from '../business-owner/business-owner.module';
import { FinancialReport } from '../business-owner/entities/financial-report.entity';
import { UsersService } from '../users/services/users.service';
import { CreditRatingService } from './services/credit-rating.service';
import { User } from '../users/entities/users.entity';
import { InvestorService } from '../investor/services/investor.service';
import { Investor } from '../investor/entities/investor.entity';
import { Payment } from '../plaid/entities/payment.entity';
import { PlaidModule } from '../plaid/plaid.module';
import { Installment } from '../loan/entities/installment.entity';
import { NotificationService } from './services/notification.service';
import { InstallmentService } from '../loan/services/installment.service';
import { PlaidService } from '../plaid/services/plaid.service';
import { AchqService } from '../plaid/services/achq.service';
import { GlobalSettingsService } from '../global-settings/services/global-settings.service';
import { GlobalSettingsModule } from '../global-settings/global-setting.module';
import { GlobalSettings } from '../global-settings/entities/global-settings.entity';
import { LoanService } from '../loan/services/loan.service';
import { Loan } from '../loan/entities/loan.entity';
import { Investment } from '../investment/entities/investment.entity';
import { InvestmentService } from '../investment/services/investment.service';
import { CreditRatingData } from './entities/credit-rating-data.entity';
import { RatingRange } from '../global-settings/entities/rating-range.entity';
import { RatingSettingsService } from '../global-settings/services/rating-settings.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CreditRatingData,
      InvestmentRequest,
      Loan,
      FinancialReport,
      User,
      Investor,
      Payment,
      Installment,
      GlobalSettings,
      Investment,
      RatingRange,
    ]),
    BusinessOwnerModule,
    PlaidModule,
    GlobalSettingsModule,
  ],
  providers: [
    PlaidService,
    AchqService,
    InvestmentRequestService,
    CreditRatingService,
    UsersService,
    InvestorService,
    NotificationService,
    LoanService,
    InstallmentService,
    GlobalSettingsService,
    InvestmentService,
    RatingSettingsService,
  ],
  controllers: [InvestmentRequestController],
  exports: [InvestmentRequestService],
})
export class InvestmentRequestModule {}
