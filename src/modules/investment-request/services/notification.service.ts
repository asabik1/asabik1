import { Inject, Injectable, Logger, forwardRef } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { mergeMap, zip, reduce, Observable, of } from 'rxjs';
import { UsersService } from '../../users/services/users.service';
import { LoanStatus } from '../../loan/enum/loan-status.enum';
import { BusinessOwner } from '../../business-owner/entities/business-owner.entity';
import { MailService } from '../../mail/services/mail.service';
import { InvestmentRequest } from '../entities/investment-request.entity';
import { Investment } from '../../investment/entities/investment.entity';
import { LoanService } from '../../loan/services/loan.service';
import { EMAIL_SUBJECT } from '../../mail/enum/mail-subject.enum';
import { MESSAGE_TO_BUSINESS_OWNER } from '../enum/message-to-business-owner.enum';
import { EMAIL_TEXT } from '../../mail/enum/mail-text.enum';
import { CustomCronExpression } from '../../plaid/enum/custom-cron-expression.enum';
import { PenaltyType } from '../../plaid/enum/penalty-type.enum';

@Injectable()
export class NotificationService {
  logger = new Logger('NotificationService');

  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private readonly loanService: LoanService,
    private readonly mailService: MailService,
  ) {}

  @Cron(CustomCronExpression.EVERY_3RD_DAY_OF_EVERY_MONTH)
  sendPlaidVerificationNotifications(): void {
    this.logger.log(
      'Execute cron job - send plaid notifications to business owners',
    );

    this.usersService
      .getAllActivatedOwners()
      .pipe(
        mergeMap((users) => {
          return zip(
            users.map((user) => this.generateEmailNotification(user.email)),
          );
        }),
        reduce(() => {}),
      )
      .subscribe();
  }

  @Cron(CronExpression.EVERY_DAY_AT_8AM)
  sendPaymentNotifications(): void {
    this.logger.log(
      'Execute cron job - send payment notifications to business owners',
    );

    this.usersService
      .getAllActivatedOwners()
      .pipe(
        mergeMap((users) => {
          return zip(
            users.map((user) => {
              this.loanService.getAllLoansById(user.id).pipe(
                mergeMap((loans) => {
                  return loans.map((loan) => {
                    loan.paymentsFromBusinessOwner.forEach(
                      (installmentFromBusinessOwner) => {
                        if (
                          loan.loanStatus ===
                            LoanStatus.AWAITING_NEXT_PAYMENT &&
                          this.isDateOneWeekFromNow(loan.nextPaymentDate)
                        ) {
                          this.generateEmailNotification(
                            loan.businessOwner.user.email,
                            loan.nextPaymentDate,
                            installmentFromBusinessOwner.amount,
                          );
                        } else if (
                          loan.loanStatus == LoanStatus.AWAITING_NEXT_PAYMENT &&
                          this.isDateOneMonthFromNow(loan.finalPaymentDate)
                        ) {
                          this.generateEmailNotification(
                            loan.businessOwner.user.email,
                            loan.nextPaymentDate,
                            installmentFromBusinessOwner.amount,
                          );
                        }
                      },
                    );
                  });
                }),
              );
            }),
          );
        }),
        reduce(() => {}),
      )
      .subscribe();
  }

  generateEmailNotification(
    email: string,
    nextPaymentDate?: Date,
    amount?: number,
  ): Observable<void> {
    let text: string;

    const now = new Date();

    if (nextPaymentDate === undefined && amount === undefined) {
      const weekFromNow = new Date();
      weekFromNow.setDate(now.getDate() + 7);
      const plaidDate = `${
        weekFromNow.getMonth() + 1
      }/${weekFromNow.getDate()}/${weekFromNow.getFullYear()}`;

      return this.mailService.sendNotification(
        email,
        EMAIL_SUBJECT.PLAID_VERIFICATION,
        EMAIL_TEXT.PLAID_VERIFICATION.replace('{plaidDate}', plaidDate),
      );
    }

    const payment = '$' + amount.toString();

    if (this.isDateOneWeekFromNow(nextPaymentDate)) {
      text = `There is an incoming payment for ${payment} in a week (${nextPaymentDate}) from now.`;

      return this.mailService.sendNotification(
        email,
        EMAIL_SUBJECT.UPCOMING_PAYMENT,
        text,
      );
    } else {
      text = `There is an incoming last payment for ${payment} in a month (${nextPaymentDate}) from now.`;

      return this.mailService.sendNotification(
        email,
        EMAIL_SUBJECT.UPCOMING_LAST_PAYMENT,
        text,
      );
    }
  }

  sendRejectedPaymentNotif(investment: Investment): Observable<void> {
    return this.mailService.sendNotification(
      investment.investor.user.email,
      EMAIL_SUBJECT.INVESTMENT_REJECTED,
      EMAIL_TEXT.REJECTED_INVESTMENT,
    );
  }

  generateInvalidReportsNotif(
    email: string,
    attachment: string,
  ): Observable<void> {
    return this.mailService.sendReportNotification(
      email,
      EMAIL_SUBJECT.INVALID_REPORTS,
      "Your Financial Reports Extracted From Plaid seem to be incorrect. Please verify attached data and let us know if it's incorrect.",
      attachment,
    );
  }

  generateManualProcessingEmail(
    investmentRequest: InvestmentRequest,
    isApproved: boolean,
  ): Observable<void> {
    let text = MESSAGE_TO_BUSINESS_OWNER.MENUAL_PROCESSING_REJECTION.toString();

    if (isApproved === true) {
      text = MESSAGE_TO_BUSINESS_OWNER.SUCCESSFUL_CREDIT_RATING.replace(
        '{approvedLoan}',
        investmentRequest.requiredCapital.toString(),
      );
    }

    return this.mailService.sendNotification(
      investmentRequest.businessOwner.user.email,
      EMAIL_SUBJECT.MANUAL_PROCESSING,
      text,
    );
  }

  generateInvestmentReturnNotification(email: string): Observable<void> {
    return this.mailService.sendNotification(
      email,
      EMAIL_SUBJECT.INVESTMENT_REJECTED_BY_BO,
      EMAIL_TEXT.REJECTED_INVESTMENT_BY_BO,
    );
  }

  generateRejectedPaymentNotification(
    businessOwner: BusinessOwner,
  ): Observable<void> {
    return this.mailService.sendNotification(
      businessOwner.user.email,
      EMAIL_SUBJECT.LATE_PAYMENT,
      EMAIL_TEXT.LATE_PAYMENT,
    );
  }

  generatePenaltyNotification(
    businessOwner: BusinessOwner,
    penaltyType: PenaltyType,
    amount: number,
  ): Observable<void> {
    let subject: EMAIL_SUBJECT;
    if (penaltyType == PenaltyType.INVALID_PLAID_TOKEN) {
      subject = EMAIL_SUBJECT.PENALTY_INVALID_TOKEN;
    } else {
      subject = EMAIL_SUBJECT.PENALTY_INVALID_TRANSACTION;
    }

    return this.mailService.sendNotification(
      businessOwner.user.email,
      subject,
      `We regret to inform you that you have been penalised for ${penaltyType} with the amount of ${amount} USD.`,
    );
  }

  isDateOneWeekFromNow(date: Date): boolean {
    const today = new Date();

    const weekFromNow = new Date();
    weekFromNow.setDate(today.getDate() + 7);

    weekFromNow.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);

    return weekFromNow.getTime() === date.getTime();
  }

  isDateOneMonthFromNow(date: Date): boolean {
    const today = new Date();

    const monthFromNow = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      today.getDate(),
    );

    monthFromNow.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);

    return monthFromNow.getTime() === date.getTime();
  }
}
