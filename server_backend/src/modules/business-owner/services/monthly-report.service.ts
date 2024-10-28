import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import {
  catchError,
  concatMap,
  forkJoin,
  from,
  iif,
  map,
  mergeMap,
  Observable,
  of,
  range,
  reduce,
  tap,
  zip,
} from 'rxjs';
import { MonthlyReport } from '../entities/monthly-report.entity';
import { PlaidService } from '../../plaid/services/plaid.service';
import { TransactionsGetResponse } from 'plaid';
import { Cron, CronExpression } from '@nestjs/schedule';
import { UsersService } from '../../users/services/users.service';
import { User } from '../../users/entities/users.entity';
import { MailService } from '../../mail/services/mail.service';
import { UpdateMonthlyReportDto } from '../dto/update-monthly-report.dto';
import { LoanStatus } from '../../loan/enum/loan-status.enum';
import { OriginalMonthlyReportService } from './original-monthly-report.service';
import { DecideMonthlyReport } from '../dto/decide-monthly-report.dto';
import { CustomCronExpression } from '../../plaid/enum/custom-cron-expression.enum';
import { InvestmentRequestService } from '../../investment-request/services/investment-request.service';
import { PenaltyService } from '../../plaid/services/penalty.service';
import {
  isWithin20PercentRange,
  toParseMonthlyReportDto,
} from '../mapper/business-owner.mapper';
import { NotificationService } from '../../investment-request/services/notification.service';
import { CsvParserService } from './csv-parser.service';
import { PenaltyType } from '../../plaid/enum/penalty-type.enum';
import { MonthlyReportRepository } from '../repository/monthly-report.repository';
import { EMAIL_SUBJECT } from '../../mail/enum/mail-subject.enum';
import { EMAIL_TEXT } from '../../mail/enum/mail-text.enum';

@Injectable()
export class MonthlyReportService {
  logger = new Logger('MonthlyReportService');
  constructor(
    private readonly monthlyReportRepository: MonthlyReportRepository,
    @Inject(forwardRef(() => PlaidService))
    private readonly plaidService: PlaidService,
    private readonly investmentRequestService: InvestmentRequestService,
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
    private readonly mailService: MailService,
    private readonly originalMonthlyReportService: OriginalMonthlyReportService,
    private readonly penaltyService: PenaltyService,
    private readonly notificationService: NotificationService,
    private readonly csvParserService: CsvParserService,
  ) {}

  createMonthlyReport(
    monthlyReport?: DeepPartial<MonthlyReport>,
  ): Observable<MonthlyReport> {
    const newMonthlyReport =
      this.monthlyReportRepository.createMonthlyReport(monthlyReport);

    return from(
      this.monthlyReportRepository.saveMonthlyReport(newMonthlyReport),
    ).pipe(
      catchError((e) => {
        console.error(e);
        throw new HttpException(
          'Error occured while saving Report.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }),
    );
  }

  generateTwoYearMonthlyReport(
    businessOwnerId: number,
    userId: number,
  ): Observable<MonthlyReport> {
    let monthOffset = 0;
    if (new Date().getDate() < 10) {
      monthOffset = 1;
    }

    const months = 24;

    return range(months).pipe(
      map((x) => months - x + monthOffset),
      concatMap((x) => {
        const reportDate = new Date();
        reportDate.setMonth(reportDate.getMonth() - x);

        return this.generateMonthlyReport(businessOwnerId, userId, reportDate);
      }),
      catchError(() => {
        return of(null);
      }),
    );
  }

  verifyReports(businessOwnerId: number, email: string): Observable<void> {
    return this.monthlyReportRepository
      .findMonthlyReportsByBusinessOwnerId(businessOwnerId)
      .pipe(
        tap((monthlyReports) => {
          if (this.isLowTransactions(monthlyReports)) {
            return this.notificationService.generateInvalidReportsNotif(
              email,
              this.csvParserService.createCsvAttachment(
                monthlyReports.map((report) => toParseMonthlyReportDto(report)),
              ),
            );
          }
        }),
        map(() => {}),
      );
  }

  isLowTransactions(monthlyReports: MonthlyReport[]): boolean {
    return monthlyReports.some(
      (monthlyReport) =>
        monthlyReport.inflow < 1000 && monthlyReport.outflow < 1000,
    );
  }

  @Cron(CronExpression.EVERY_DAY_AT_10AM)
  checkAccessTokens() {
    this.logger.log('Execute cron job - check access tokens');

    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    const date = new Date(currentYear, currentMonth - 1);

    this.userService
      .getAllActivatedUsers()
      .pipe(
        mergeMap((users) => {
          return zip(
            users.map((user) => this.checkTokenAndSendLink(user, date, now)),
          );
        }),
        reduce(() => {}),
        catchError((err) => {
          this.logger.error('checkAccessToken');
          throw new HttpException(err, HttpStatus.BAD_REQUEST);
        }),
      )
      .subscribe();
  }

  checkTokenAndSendLink(user: User, reportDate: Date, now: Date) {
    return this.plaidService
      .getTransactions(user.id, reportDate.getFullYear(), reportDate.getMonth())
      .pipe(
        tap((transactions) => {
          if (transactions && user.invalidPlaidTokenDetection) {
            return this.userService.update(user.id, {
              invalidPlaidTokenDetection: null,
            });
          }
        }),
        catchError(() =>
          this.plaidService.updateAccessToken(user.plaidToken).pipe(
            tap(() => {
              if (user.invalidPlaidTokenDetection == null) {
                this.userService.update(user.id, {
                  invalidPlaidTokenDetection: now,
                });
              }
            }),
            mergeMap((createTokenResponse) =>
              this.mailService.sendPlaidTokenUpdateLink(
                user.email,
                createTokenResponse.link_token,
              ),
            ),
            mergeMap(() => {
              if (user.businessOwner) {
                return this.investmentRequestService
                  .getNewestInvestmentRequest(user.businessOwner.id)
                  .pipe(
                    tap((investmentRequest) => {
                      const fiveDaysFromDetection = new Date(
                        user.invalidPlaidTokenDetection.getTime() +
                          5 * 24 * 60 * 60 * 1000,
                      );

                      if (investmentRequest.loan) {
                        if (
                          investmentRequest.loan.loanStatus !==
                            LoanStatus.FULLY_PAYED &&
                          fiveDaysFromDetection <= now
                        ) {
                          this.penaltyService.penaliseUser(
                            user,
                            PenaltyType.INVALID_PLAID_TOKEN,
                          );
                        }
                      }
                    }),
                  );
              } else {
                return of();
              }
            }),
            // mergeMap(() =>
            //   this.investmentRequestService.getNewestInvestmentRequest(
            //     user.businessOwner.id,
            //   ),
            // ),
            // tap((investmentRequest) => {
            //   const fiveDaysFromDetection = new Date(
            //     user.invalidPlaidTokenDetection.getTime() +
            //       5 * 24 * 60 * 60 * 1000,
            //   );

            //   if (investmentRequest.loan) {
            //     if (
            //       investmentRequest.loan.loanStatus !==
            //         LoanStatus.FULLY_PAYED &&
            //       fiveDaysFromDetection <= now
            //     ) {
            //       this.penaltyService.penaliseUser(
            //         user,
            //         PenaltyType.INVALID_PLAID_TOKEN,
            //       );
            //     }
            //   }
            // }),
          ),
        ),
      );
  }

  @Cron(CronExpression.EVERY_DAY_AT_11PM)
  confirmPendingReprots() {
    this.logger.log('Execute cron job - confirm users monthly reports');

    const currentDate = new Date();

    return this.userService
      .getAllActivatedOwners()
      .pipe(
        mergeMap((users) => {
          return zip(
            users.map((user) => this.updatePendingReport(user, currentDate)),
          );
        }),
        reduce(() => {}),
        catchError((err) => {
          this.logger.error('confirmPendingReport');
          throw new HttpException(err, HttpStatus.BAD_REQUEST);
        }),
      )
      .subscribe();
  }

  updatePendingReport(user: User, currentDate: Date): Observable<void> {
    return this.monthlyReportRepository
      .findNewestMonthlyReport(user.businessOwner.id)
      .pipe(
        tap((monthlyReport) => {
          const fiveDaysFromGeneration = new Date(
            monthlyReport.createdAt.getTime() + 5 * 24 * 60 * 60 * 1000,
          );

          if (
            monthlyReport.isConfirmed == false &&
            monthlyReport.originalMonthlyReport == null &&
            fiveDaysFromGeneration <= currentDate
          ) {
            return this.confirmMonthlyReport(monthlyReport.id);
          }
        }),
        map(() => {}),
      );
  }

  @Cron(CustomCronExpression.EVERY_10TH_DAY_OF_EVERY_MONTH)
  updateMonthlyReports() {
    this.logger.log('Execute cron job - update users monthly reports');

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const date = new Date(currentYear, currentMonth - 1);

    this.userService
      .getAllActivatedOwners()
      .pipe(
        mergeMap((users) => {
          return zip(
            users.map((user) =>
              //TODO: notify users who have active loans
              this.generateMonthlyReport(
                user.businessOwner.id,
                user.id,
                date,
              ).pipe(
                mergeMap(() =>
                  this.mailService.sendNotification(
                    user.email,
                    EMAIL_SUBJECT.MONTHLY_REPORT_PENDING,
                    EMAIL_TEXT.MONTHLY_REPORT_PENDING,
                  ),
                ),
              ),
            ),
          );
        }),
        reduce(() => {}),
        catchError((err) => {
          this.logger.error('updateMonthlyReports');
          throw new HttpException(err, HttpStatus.BAD_REQUEST);
        }),
      )
      .subscribe();
  }

  generateMonthlyReport(
    businessOwnerId: number,
    userId: number,
    reportDate: Date,
  ): Observable<MonthlyReport> {
    const newMonthlyReport = this.monthlyReportRepository.createMonthlyReport({
      businessOwner: { id: businessOwnerId },
      reportDate,
    });

    return forkJoin({
      transactions: this.plaidService.getTransactions(
        userId,
        reportDate.getFullYear(),
        reportDate.getMonth(),
      ),
      previousReport:
        this.monthlyReportRepository.findPreviousMonthlyReportByDateAndBusinessOwnerId(
          businessOwnerId,
          reportDate,
        ),
      user: this.userService.findOneOrFailByBusinessOwnerId(businessOwnerId),
    }).pipe(
      tap(
        (data: {
          transactions: TransactionsGetResponse;
          previousReport: MonthlyReport;
          user: User;
        }) => {
          const inflow = data.transactions.transactions
            .filter((x) => x.amount > 0)
            .reduce((a, b) => a + b.amount, 0);
          const outflow =
            data.transactions.transactions
              .filter((x) => x.amount < 0)
              .reduce((a, b) => a + b.amount, 0) * -1;
          const total = inflow + outflow;
          let balance = inflow - outflow;
          let vInflow = null;
          let vTotal = null;
          let isConfirmed = true;

          if (data.previousReport) {
            if (data.previousReport.inflow) {
              vInflow =
                Math.pow(
                  Math.log(Math.abs(inflow / data.previousReport.inflow)),
                  2,
                ) + 0.000001;
            }

            const previousReportTotal =
              data.previousReport.inflow + data.previousReport.outflow;

            if (previousReportTotal) {
              vTotal =
                Math.pow(Math.log(Math.abs(total / previousReportTotal)), 2) +
                0.000001;
            }

            if (data.previousReport.inflow && data.previousReport.outflow) {
              balance =
                data.previousReport.inflow -
                data.previousReport.outflow +
                inflow -
                outflow;
            }
          }

          if (
            data.user.businessOwner.investmentRequests
              .filter((investmentRequest) => investmentRequest.loan)
              .some(
                (investmentRequest) =>
                  investmentRequest.loan.loanStatus !== LoanStatus.FULLY_PAYED,
              )
          ) {
            isConfirmed = false;
          }

          newMonthlyReport.inflow = inflow;
          newMonthlyReport.outflow = outflow;
          newMonthlyReport.outflowExceed = inflow <= outflow;
          newMonthlyReport.noEarning = inflow < 100;
          newMonthlyReport.isConfirmed = isConfirmed;
          newMonthlyReport.isNegativeBalance = balance <= 0;
          newMonthlyReport.vInflow = vInflow;
          newMonthlyReport.vTotal = vTotal;
        },
      ),
      concatMap(() =>
        from(this.monthlyReportRepository.saveMonthlyReport(newMonthlyReport)),
      ),
    );
  }

  generateMonthlyReportFromUpload(
    businessOwnerId: number,
    reportDate: Date,
    monthlyReport: DeepPartial<MonthlyReport>,
    previousReport?: DeepPartial<MonthlyReport>,
  ): Observable<MonthlyReport> {
    const newMonthlyReport = this.monthlyReportRepository.createMonthlyReport({
      businessOwner: { id: businessOwnerId },
      reportDate,
    });

    return this.userService
      .findOneOrFailByBusinessOwnerId(businessOwnerId)
      .pipe(
        tap((user) => {
          const inflow = monthlyReport.inflow;
          const outflow = monthlyReport.outflow;
          const total = inflow + outflow;
          let balance = inflow - outflow;
          let vInflow = null;
          let vTotal = null;
          let isConfirmed = true;

          if (previousReport) {
            if (previousReport.inflow) {
              vInflow =
                Math.pow(
                  Math.log(Math.abs(inflow / previousReport.inflow)),
                  2,
                ) + 0.000001;
            }

            const previousReportTotal =
              previousReport.inflow + previousReport.outflow;

            if (previousReportTotal) {
              vTotal =
                Math.pow(Math.log(Math.abs(total / previousReportTotal)), 2) +
                0.000001;
            }

            if (previousReport.inflow && previousReport.outflow) {
              balance =
                previousReport.inflow -
                previousReport.outflow +
                inflow -
                outflow;
            }
          }

          if (
            user.businessOwner.investmentRequests
              .filter((investmentRequest) => investmentRequest.loan)
              .some(
                (investmentRequest) =>
                  investmentRequest.loan.loanStatus !== LoanStatus.FULLY_PAYED,
              )
          ) {
            isConfirmed = false;
          }

          newMonthlyReport.inflow = inflow;
          newMonthlyReport.outflow = outflow;
          newMonthlyReport.outflowExceed = inflow <= outflow;
          newMonthlyReport.noEarning = inflow < 100;
          newMonthlyReport.isConfirmed = isConfirmed;
          newMonthlyReport.isNegativeBalance = balance <= 0;
          newMonthlyReport.vInflow = vInflow;
          newMonthlyReport.vTotal = vTotal;
        }),
        concatMap(() =>
          from(
            this.monthlyReportRepository.saveMonthlyReport(newMonthlyReport),
          ),
        ),
      );
  }

  updateMonthlyReport(
    updateMonthlyReportDto: UpdateMonthlyReportDto,
    currentMonthlyReport: MonthlyReport,
    previousReport: DeepPartial<MonthlyReport>,
    isUploaded: boolean,
  ): Observable<void> {
    const inflow = updateMonthlyReportDto.inflow;
    const outflow = updateMonthlyReportDto.outflow;
    const total = inflow + outflow;
    let balance = inflow - outflow;
    let vInflow = currentMonthlyReport.vInflow;
    let vTotal = currentMonthlyReport.vTotal;
    let isConfirmed = true;

    if (previousReport) {
      if (previousReport.inflow) {
        vInflow = Math.pow(
          Math.log10(Math.abs(inflow / previousReport.inflow)),
          2,
        );
      }

      const previousReportTotal =
        previousReport.inflow + previousReport.outflow;

      if (previousReportTotal) {
        vTotal = Math.pow(Math.log10(Math.abs(total / previousReportTotal)), 2);
      }

      if (previousReport.inflow && previousReport.outflow) {
        balance =
          previousReport.inflow - previousReport.outflow + inflow - outflow;
      }
    }

    if (
      !isWithin20PercentRange(
        currentMonthlyReport.inflow,
        currentMonthlyReport.outflow,
        updateMonthlyReportDto.inflow,
        updateMonthlyReportDto.outflow,
      )
    ) {
      isConfirmed = false;
    }

    if (isUploaded) {
      isConfirmed = true;
    }

    return this.originalMonthlyReportService
      .findOriginalMonthlyReportByMonthlyReportId(currentMonthlyReport.id)
      .pipe(
        mergeMap((originalMonthlyReport) => {
          if (originalMonthlyReport !== null) {
            return this.monthlyReportRepository.updateMonthlyReport(
              originalMonthlyReport.monthyReport.id,
              {
                inflow: inflow,
                outflow: outflow,
                vInflow: vInflow,
                vTotal: vTotal,
                outflowExceed:
                  updateMonthlyReportDto.inflow <=
                  updateMonthlyReportDto.outflow,
                noEarning: inflow < 100,
                isConfirmed: isConfirmed,
                isNegativeBalance: balance <= 0,
              },
            );
          }

          return this.originalMonthlyReportService
            .createOriginalMonthlyReport(
              currentMonthlyReport,
              updateMonthlyReportDto,
            )
            .pipe(
              mergeMap((data) =>
                this.monthlyReportRepository.updateMonthlyReport(
                  updateMonthlyReportDto.monthlyReportId,
                  {
                    inflow: inflow,
                    outflow: outflow,
                    vInflow: vInflow,
                    vTotal: vTotal,
                    outflowExceed:
                      updateMonthlyReportDto.inflow <=
                      updateMonthlyReportDto.outflow,
                    noEarning: inflow < 100,
                    isConfirmed: isConfirmed,
                    isNegativeBalance: balance <= 0,
                    originalMonthlyReport: data,
                  },
                ),
              ),
            );
        }),
        map(() => {}),
        catchError((e) => {
          console.error('updateMonthlyReport(): ' + e);
          throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }),
      );
  }

  getMonthlyReportsForAdmin(
    businessOwnerId: number,
  ): Observable<MonthlyReport[]> {
    return this.monthlyReportRepository.findMonthlyReportsByBusinessOwnerId(
      businessOwnerId,
    );
  }

  confirmMonthlyReport(monthlyReportId: number): Observable<void> {
    return this.monthlyReportRepository
      .findMonthlyReportByMonthlyReportId(monthlyReportId)
      .pipe(
        tap((monthlyReport) => {
          if (monthlyReport.isConfirmed) {
            throw new HttpException(
              'Monthly report is already confirmed.',
              HttpStatus.BAD_REQUEST,
            );
          }
        }),
        mergeMap((monthlyReport) =>
          this.monthlyReportRepository.updateMonthlyReport(monthlyReport.id, {
            isConfirmed: true,
          }),
        ),
        map(() => {}),
      );
  }

  rejectMonthlyReportUpdate(monthlyReport: MonthlyReport): Observable<void> {
    return from(
      this.monthlyReportRepository.updateMonthlyReport(monthlyReport.id, {
        inflow: monthlyReport.originalMonthlyReport.inflow,
        outflow: monthlyReport.originalMonthlyReport.outflow,
        vInflow: monthlyReport.originalMonthlyReport.vInflow,
        vTotal: monthlyReport.originalMonthlyReport.vTotal,
        outflowExceed: monthlyReport.originalMonthlyReport.outflowExceed,
        isNegativeBalance:
          monthlyReport.originalMonthlyReport.isNegativeBalance,
        noEarning: monthlyReport.originalMonthlyReport.noEarning,
        isConfirmed: true,
        originalMonthlyReport: null,
      }),
    ).pipe(
      mergeMap(() =>
        this.originalMonthlyReportService.removeOriginalMonthlyReport(
          monthlyReport.originalMonthlyReport,
        ),
      ),
    );
  }

  confirmReportByAdmin(
    decideMonthlyReport: DecideMonthlyReport,
  ): Observable<void> {
    return this.monthlyReportRepository
      .findMonthlyReportByMonthlyReportId(decideMonthlyReport.monthlyReportId)
      .pipe(
        mergeMap((monthlyReport) =>
          iif(
            () => decideMonthlyReport.isApproved,
            this.confirmMonthlyReport(monthlyReport.id),
            this.rejectMonthlyReportUpdate(monthlyReport),
          ),
        ),
      );
  }

  removeReportsForBusinessOwner(businessOwnerId: number): Observable<void> {
    return this.monthlyReportRepository
      .findMonthlyReportsByBusinessOwnerId(businessOwnerId)
      .pipe(
        mergeMap((monthlyReports) =>
          this.monthlyReportRepository.removeMonthlyReports(monthlyReports),
        ),
        map(() => {}),
      );
  }
}
