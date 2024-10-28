import { Injectable } from '@nestjs/common';
import { Observable, catchError, from, map } from 'rxjs';
import { User } from '../../users/entities/users.entity';
import { EMAIL_SUBJECT } from '../enum/mail-subject.enum';
import { AuthEmailConfig } from '../../auth/enums/auth.enum';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  sendConfirmation(user: User): Observable<void> {
    return from(
      this.mailerService.sendMail({
        to: user.email,
        subject: AuthEmailConfig.NEW_ACCOUNT_SUBJECT,
        template: 'confirmation',
        context: {
          frontendUrl: process.env.FRONT_END_URL,
          link: `${process.env.FRONT_END_URL}/auth/confirm-email?user=${user.id}&token=${user.accountActivatationToken}`,
          suportEmail: process.env.EMAIL,
        },
      }),
    ).pipe(
      catchError((err) => {
        console.error(err);
        throw err;
      }),
      map(() => {}),
    );
  }

  sendReportNotification(
    email: string,
    subject: string,
    text: string,
    content: string,
  ): Observable<void> {
    return from(
      this.mailerService.sendMail({
        to: email,
        subject: subject,
        template: 'notification',
        context: {
          title: subject,
          text: text,
        },
        attachments: [
          {
            filename: 'extracted-reports.csv',
            content: content,
          },
        ],
      }),
    ).pipe(
      catchError((err) => {
        console.error(err);
        throw err;
      }),
      map(() => {}),
    );
  }

  sendNotification(
    email: string,
    subject: string,
    text: string,
  ): Observable<void> {
    return from(
      this.mailerService.sendMail({
        to: email,
        subject: subject,
        template: 'notification',
        context: {
          title: subject,
          text: text,
        },
      }),
    ).pipe(
      catchError((err) => {
        console.error(err);
        throw err;
      }),
      map(() => {}),
    );
  }

  sendPlaidTokenUpdateLink(email: string, tokenLink: string): Observable<void> {
    return from(
      this.mailerService.sendMail({
        to: email,
        from: process.env.SENDGRID_EMAIL,
        subject: EMAIL_SUBJECT.PLAID_TOKEN,
        template: 'update-plaid-token',
        context: {
          plaidLink: tokenLink,
        },
      }),
    ).pipe(
      catchError((err) => {
        console.error(err);
        throw err;
      }),
      map(() => {}),
    );
  }

  sendResetPasswordLink(user: User): Observable<void> {
    return from(
      this.mailerService.sendMail({
        to: user.email,
        from: process.env.SENDGRID_EMAIL,
        subject: AuthEmailConfig.FORGOT_PASSWORD_SUBJECT,
        template: 'reset-password',
        context: {
          frontendUrl: process.env.FRONT_END_URL,
          link: `${process.env.FRONT_END_URL}/auth/reset-password?user=${user.id}&token=${user.resetPasswordToken}`,
          suportEmail: process.env.SENDGRID_EMAIL,
        },
      }),
    ).pipe(
      catchError((err) => {
        console.error(err);
        throw err;
      }),
      map(() => {}),
    );
  }
}
