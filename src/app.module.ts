import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { SwaggerModule } from '@nestjs/swagger';
import databaseConfig from '../database.config';
import { SurveyModule } from './modules/survey/survey.module';
import { PlaidModule } from './modules/plaid/plaid.module';
import { MailModule } from './modules/mail/mail.module';
import { InvestorModule } from './modules/investor/investor.module';
import { InvestmentRequestModule } from './modules/investment-request/investment-request.module';
import { BusinessOwnerModule } from './modules/business-owner/business-owner.module';
import { InvestmentModule } from './modules/investment/investment.module';
import { BusinessModule } from './modules/business/business.module';
import { ScheduleModule } from '@nestjs/schedule';
import { GlobalSettingsModule } from './modules/global-settings/global-setting.module';
import { LoanModule } from './modules/loan/loan.module';
import { GuestModule } from './modules/guest/guest.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MulterModule.register({
      dest: 'src/uploads',
    }),
    MailModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      logging: true,
      host: databaseConfig.DB_HOST,
      port: databaseConfig.DB_PORT,
      username: databaseConfig.DB_USERNAME,
      password: databaseConfig.DB_PASSWORD,
      database: databaseConfig.DB_NAME,
      entities: [],
      autoLoadEntities: true,
      synchronize: false,
    }),
    LoanModule,
    AuthModule,
    UsersModule,
    SurveyModule,
    PlaidModule,
    SwaggerModule,
    InvestorModule,
    BusinessOwnerModule,
    InvestmentRequestModule,
    InvestmentModule,
    BusinessModule,
    GlobalSettingsModule,
    ScheduleModule.forRoot(),
    GuestModule,
  ],
})
export class AppModule {}
