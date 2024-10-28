import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  forwardRef,
} from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Observable,
  from,
  forkJoin,
  mergeMap,
  map,
  filter,
  concatMap,
  switchMap,
  catchError,
} from 'rxjs';
import { TransactionEvent as TRANSACTION_EVENT } from '../../plaid/enum/transaction-event.enum';
import { AchqService } from '../../plaid/services/achq.service';
import { PlaidService } from '../../plaid/services/plaid.service';
import { Repository, DeepPartial, UpdateResult } from 'typeorm';
import { v4 } from 'uuid';
import { Installment } from '../entities/installment.entity';
import { LoanService } from './loan.service';
import { LoanStatus as LOAN_STATUS } from '../enum/loan-status.enum';
import { NotificationService } from '../../investment-request/services/notification.service';
import { Loan } from '../entities/loan.entity';
import { MonthlyReportService } from '../../business-owner/services/monthly-report.service';
import { MonthlyReport } from '../../business-owner/entities/monthly-report.entity';
import { Investor } from '../../investor/entities/investor.entity';
import { roundDownToTwoDecimalPlaces } from '../mapper/loan.mapper';
import * as fs from 'fs';
import { PenaltyService } from '../../plaid/services/penalty.service';
import { PenaltyType } from '../../plaid/enum/penalty-type.enum';
import { MonthlyReportRepository } from '../../business-owner/repository/monthly-report.repository';

@Injectable()
export class InstallmentService {
  logger = new Logger('InstallmentService');

  constructor(
    @InjectRepository(Installment)
    private readonly installmentRepository: Repository<Installment>,
    @Inject(forwardRef(() => PlaidService))
    private readonly plaidService: PlaidService,
    private readonly achqService: AchqService,
    @Inject(forwardRef(() => LoanService))
    private readonly loanService: LoanService,
    @Inject(forwardRef(() => NotificationService))
    private readonly notificationService: NotificationService,
    private readonly monthlyReportRepository: MonthlyReportRepository,
    private readonly penaltyService: PenaltyService,
  ) {}

  findInstallmentsByInvestmentRequestId(
    investmentRequestId: number,
  ): Observable<Installment[]> {
    return from(
      this.installmentRepository.find({
        where: {
          loan: {
            investmentRequest: { id: investmentRequestId },
          },
        },
        relations: [
          'investor',
          'monthlyReport',
          'monthlyReport.originalMonthlyReport',
        ],
        order: { createdAt: 'ASC' },
      }),
    );
  }

  updateInstallment(
    installemntId: number,
    installemnt: DeepPartial<Installment>,
  ): Observable<UpdateResult> {
    return from(this.installmentRepository.update(installemntId, installemnt));
  }

  findInstallmentByMerchantReferenceId(
    merchantReferenceId: string,
  ): Observable<Installment> {
    return from(
      this.installmentRepository.findOne({
        where: { merchantReferenceId },
        relations: ['loan', 'loan.businessOwner', 'loan.businessOwner.user'],
      }),
    );
  }

  createInstallemnt(
    installment?: DeepPartial<Installment>,
  ): Observable<Installment> {
    const newInstallment = this.installmentRepository.create(installment);

    return from(this.installmentRepository.save(newInstallment));
  }

  @Cron(CronExpression.EVERY_DAY_AT_10AM)
  resendRejectedInstallmentFromBusinessOwner(): void {
    this.logger.log('Execute cron job - resend rejected installments');

    this.achqService.trackPayments().subscribe({
      next: (statuses) => {
        const merchantReferenceId = v4();
        statuses
          .filter((status) => status.merchantReferenceId)
          .forEach((status) => {
            this.findInstallmentByMerchantReferenceId(
              status.merchantReferenceId,
            ).subscribe((installment) => {
              if (
                installment &&
                (installment.eventDate < status.eventDate ||
                  installment.eventDate == null)
              ) {
                if (status.eventName === TRANSACTION_EVENT.Rejected) {
                  forkJoin({
                    processorToken: this.plaidService.getProcessorToken(
                      installment.loan.businessOwner.user.id,
                    ),
                    identity: this.plaidService.getIdentity(
                      installment.loan.businessOwner.user.id,
                    ),
                    penalty: this.penaltyService.penaliseUser(
                      installment.loan.businessOwner.user,
                      PenaltyType.INVALID_TRANSACTION,
                    ),
                  })
                    .pipe(
                      mergeMap((data) =>
                        this.achqService.submitPayment(
                          {
                            id: merchantReferenceId,
                            address1: data.identity.street,
                            city: data.identity.city,
                            customerName: data.identity.name,
                            direction: 'FromCustomer',
                            SECCode: 'WEB',
                            paymentAmount: installment.amount,
                            phone: data.identity.phone,
                            state: data.identity.state,
                            zip: data.identity.zip,
                          },
                          data.processorToken.processor_token,
                        ),
                      ),
                      mergeMap(() => {
                        let loanStatus = LOAN_STATUS.AWAITING_NEXT_PAYMENT;
                        const currentDate = new Date();
                        const nextPaymentDate = `${
                          currentDate.getMonth() + 1
                        }/${currentDate.getDate()}/${currentDate.getFullYear()}`;

                        return this.loanService.updateLoan(
                          installment.loan.id,
                          {
                            loanStatus: loanStatus,
                            nextPaymentDate: nextPaymentDate,
                          },
                        );
                      }),
                      mergeMap(() =>
                        this.notificationService.generateRejectedPaymentNotification(
                          installment.loan.businessOwner,
                        ),
                      ),
                      catchError((err) => {
                        this.logger.error(
                          'resendRejectedInstallmentFromBusinessOwner',
                        );
                        throw new HttpException(err, HttpStatus.BAD_REQUEST);
                      }),
                    )
                    .subscribe();
                }

                this.updateInstallment(installment.id, {
                  eventName: status.eventName,
                  eventDate: status.eventDate,
                  resultingStatus: status.resultingStatus,
                  returnCode: status.returnCode,
                  returnExplanation: status.returnExplanation,
                  verificationStatus: status.verificationStatus,
                  verificationCode: status.verificationCode,
                  verificationDescription: status.verificationDescription,
                }).subscribe();
              }
            });
          });
      },
    });
  }

  @Cron(CronExpression.EVERY_DAY_AT_6AM)
  generateInstallmentsFromBusinessOwner(): void {
    const lockFilePath = 'cron.lock';

    // Check if the lock file exists
    if (fs.existsSync(lockFilePath)) {
      // If the lock file exists, check if it's too old
      const lockFileStat = fs.statSync(lockFilePath);
      const currentTime = new Date().getTime();
      const lockFileAge = currentTime - lockFileStat.mtime.getTime();

      // If the lock file is too old, remove it
      if (lockFileAge > 1 * 60 * 1000) {
        fs.unlinkSync(lockFilePath);
      } else {
        this.logger.log(
          'Another instance is already running or the lock file is stale. Exiting.',
        );
        return;
      }
    }

    // Create the lock file
    fs.writeFileSync(lockFilePath, '');

    this.logger.log('Start cron job execution - generate installments');

    this.loanService
      .getAllActiveLoans()
      .pipe(
        switchMap((loans) => from(loans)),
        filter((loan) => loan.nextPaymentDate <= new Date()),
        concatMap((loan) => this.processLoan(loan)),
      )
      .subscribe(() => {
        fs.unlinkSync(lockFilePath);
        this.logger.log('End cron job execution - generate installments');
      });
  }

  private processLoan(loan: Loan): Observable<void> {
    return this.monthlyReportRepository
      .findNewestMonthlyReport(loan.businessOwner.id)
      .pipe(
        concatMap((monthlyReport) => {
          let loanStatus = LOAN_STATUS.AWAITING_NEXT_PAYMENT;
          if (monthlyReport.isConfirmed == false) {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            loanStatus = LOAN_STATUS.PAYMENT_IS_LATE;

            return this.loanService.updateLoan(loan.id, {
              nextPaymentDate: tomorrow,
              loanStatus: loanStatus,
            });
          } else {
            if (loan.finalPaymentDate <= new Date()) {
              loanStatus = LOAN_STATUS.FULLY_PAYED;
            }

            return this.generatePaymentsFromBusinessOwner(
              monthlyReport,
              loan,
            ).pipe(
              concatMap(() =>
                this.loanService.updateLoan(loan.id, {
                  nextPaymentDate: this.loanService.nextMonthDate(
                    loan.createdAt.getDate(),
                    new Date(),
                  ),
                  loanStatus: loanStatus,
                }),
              ),
            );
          }
        }),
      );
  }

  private generatePaymentsFromBusinessOwner(
    monthlyReport: MonthlyReport,
    loan: Loan,
  ): Observable<void> {
    const psr =
      loan.investmentRequest.netReturnToShare /
      loan.investmentRequest.netReturn;
    const balance = monthlyReport.inflow - Math.abs(monthlyReport.outflow);

    const uniqueInvestors = new Map();
    loan.investmentRequest.investments.forEach((investment) => {
      uniqueInvestors.set(investment.investor.id, investment.investor);
    });

    const observables = Array.from(uniqueInvestors.values()).map(
      (uniqueInvestor) => {
        if (balance <= 0) {
          return this.createInstallemnt({
            isSkipped: true,
            loan: loan,
            amount: 0,
            monthlyReport: monthlyReport,
            investor: uniqueInvestor,
          }).pipe(map(() => {}));
        }

        const totalInvested = loan.investmentRequest.investments
          .filter((investment) => investment.investor.id === uniqueInvestor.id)
          .reduce((sum, investment) => sum + investment.amount, 0);

        const share = totalInvested / loan.investmentRequest.requiredCapital;
        const paymentAmount = roundDownToTwoDecimalPlaces(
          balance * share * psr,
        );

        return this.processPaymentFromBusinessOwner(
          uniqueInvestor,
          paymentAmount,
          loan,
          monthlyReport,
        ).pipe(map(() => {}));
      },
    );

    return forkJoin(observables).pipe(map(() => {}));
  }

  private processPaymentFromBusinessOwner(
    investor: Investor,
    paymentAmount: number,
    loan: Loan,
    monthlyReport: MonthlyReport,
  ): Observable<void> {
    const merchantReferenceId = v4();

    return forkJoin({
      processorToken: this.plaidService.getProcessorToken(
        loan.businessOwner.user.id,
      ),
      identity: this.plaidService.getIdentity(loan.businessOwner.user.id),
    }).pipe(
      mergeMap((data) =>
        this.achqService.submitPayment(
          {
            id: merchantReferenceId,
            address1: data.identity.street,
            city: data.identity.city,
            customerName: data.identity.name,
            direction: 'FromCustomer',
            SECCode: 'WEB',
            paymentAmount: paymentAmount,
            phone: data.identity.phone,
            state: data.identity.state,
            zip: data.identity.zip,
          },
          data.processorToken.processor_token,
        ),
      ),
      mergeMap((achqResponse) =>
        this.createInstallemnt({
          isSkipped: false,
          transactReferenceId: achqResponse.TransAct_ReferenceID,
          merchantReferenceId: merchantReferenceId,
          amount: paymentAmount,
          loan: loan,
          monthlyReport: monthlyReport,
          investor: investor,
        }),
      ),
      map(() => {}),
    );
  }

  @Cron('1 * * * *')
  syncInstallments(): void {
    this.logger.log('Execute cron job - update installments');

    this.achqService.trackPayments().subscribe({
      next: (statuses) => {
        const merchantReferenceId = v4();

        statuses
          .filter((x) => x.merchantReferenceId)
          .forEach((status) => {
            this.findInstallmentByMerchantReferenceId(
              status.merchantReferenceId,
            ).subscribe((installment) => {
              if (
                installment &&
                (installment.eventDate < status.eventDate ||
                  installment.eventDate == null)
              ) {
                if (status.eventName == TRANSACTION_EVENT.Cleared) {
                  forkJoin({
                    processorToken: this.plaidService.getProcessorToken(
                      installment.investor.user.id,
                    ),
                    identity: this.plaidService.getIdentity(
                      installment.investor.user.id,
                    ),
                  })
                    .pipe(
                      mergeMap((data) =>
                        this.achqService.submitPayment(
                          {
                            id: merchantReferenceId,
                            address1: data.identity.street,
                            city: data.identity.city,
                            customerName: data.identity.name,
                            direction: 'ToCustomer',
                            SECCode: 'CCD',
                            paymentAmount: installment.amount,
                            phone: data.identity.phone,
                            state: data.identity.state,
                            zip: data.identity.zip,
                          },
                          data.processorToken.processor_token,
                        ),
                      ),
                      mergeMap((data) =>
                        this.createInstallemnt({
                          merchantReferenceId: merchantReferenceId,
                          transactReferenceId: data.TransAct_ReferenceID,
                          monthlyReport: installment.monthlyReport,
                        }),
                      ),
                      catchError((err) => {
                        this.logger.error('syncInstallments');
                        throw new HttpException(err, HttpStatus.BAD_REQUEST);
                      }),
                    )
                    .subscribe();
                }
                this.updateInstallment(installment.id, {
                  eventName: status.eventName,
                  eventDate: status.eventDate,
                  resultingStatus: status.resultingStatus,
                  returnCode: status.returnCode,
                  returnExplanation: status.returnExplanation,
                  verificationStatus: status.verificationStatus,
                  verificationCode: status.verificationCode,
                  verificationDescription: status.verificationDescription,
                }).subscribe();
              }
            });
          });
      },
    });
  }

  isToday(date: Date): boolean {
    const today = new Date();

    return (
      today.getFullYear() == date.getFullYear() &&
      today.getMonth() == date.getMonth() &&
      today.getDate() == date.getDate()
    );
  }

  parseDateString(dateString: string): Date {
    const parts = dateString.split('/');
    if (parts.length !== 3) {
      return null;
    }

    const [month, day, year] = parts.map(Number);

    if (isNaN(month) || isNaN(day) || isNaN(year)) {
      return null;
    }

    const date = new Date(year, month - 1, day);

    if (
      date.getFullYear() !== year ||
      date.getMonth() !== month - 1 ||
      date.getDate() !== day
    ) {
      return null;
    }

    return date;
  }
}
