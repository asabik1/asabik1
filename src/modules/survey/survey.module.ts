import { Module } from '@nestjs/common';
import { BusinessModule } from '../business/business.module';
import { InvestmentRequestModule } from '../investment-request/investment-request.module';
import { InvestorModule } from '../investor/investor.module';
import { UsersModule } from '../users/users.module';
import { SurveyController } from './controllers/survey.controller';
import { BusinessOwnerModule } from '../business-owner/business-owner.module';
import { SurveyService } from './services/survey.service';

@Module({
  imports: [
    UsersModule,
    BusinessOwnerModule,
    InvestorModule,
    InvestmentRequestModule,
    BusinessModule,
  ],
  providers: [SurveyService],
  controllers: [SurveyController],
})
export class SurveyModule {}
