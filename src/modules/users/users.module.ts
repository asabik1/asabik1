import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { InvestorModule } from '../investor/investor.module';
import { BusinessOwnerModule } from '../business-owner/business-owner.module';
import { MailModule } from '../mail/mail.module';
import { MailService } from '../mail/services/mail.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    InvestorModule,
    BusinessOwnerModule,
    MailModule,
  ],
  providers: [UsersService, MailService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
