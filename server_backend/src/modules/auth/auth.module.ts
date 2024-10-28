import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { SessionController } from './controllers/session.controller';
import { AuthService } from './services/auth.service';
import { SessionService } from './services/session.service';
import { AnonymousStrategy } from './strategies/anonymous-strategy';
import { JwtStrategy } from './strategies/jwt-strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: `${process.env.JWT_SECRET_KEY}`,
      signOptions: {
        expiresIn: '360000s',
      },
    }),
    MailModule,
  ],
  controllers: [SessionController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    SessionService,
    AnonymousStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
