import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  forwardRef,
} from '@nestjs/common';
import {
  Observable,
  catchError,
  forkJoin,
  from,
  map,
  mergeMap,
  of,
  pipe,
} from 'rxjs';
import { DeepPartial, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuid4, v4 } from 'uuid';
import { PlaidService } from '../../plaid/services/plaid.service';
import { Payload } from '../../users/models/payload-interface';
import { AchqService } from '../../plaid/services/achq.service';
import { InstallmentService } from './installment.service';
import { InvestmentRequest } from '../../investment-request/entities/investment-request.entity';
import { LoanStatus } from '../enum/loan-status.enum';
import { Loan } from '../entities/loan.entity';
import { GetLoanBusinessOwnerResponse } from '../models/loan-get-business-owner-response.interface';
import { PaymentService } from '../../plaid/services/payment.service';
import { InvestmentService } from '../../investment/services/investment.service';
import { InvestmentRequestService } from '../../investment-request/services/investment-request.service';
import { INVESTMENT_REQUEST_STATUS } from '../../investment-request/enum/investment-status-message.enum';
import { UsersService } from '../../users/services/users.service';
import { GlobalSettingsService } from '../../global-settings/services/global-settings.service';
import { NotificationService } from '../../investment-request/services/notification.service';
import { TransactionEvent } from '../../plaid/enum/transaction-event.enum';
import { Investment } from '../../investment/entities/investment.entity';
import {
  toGetLoanBusinessOwnerResponse,
  toGetLoanInvestorResponse,
} from '../mapper/loan.mapper';
import { BusinessOwner } from '../../business-owner/entities/business-owner.entity';
import { Payment } from '../../plaid/entities/payment.entity';
import { GetLoanInvestorResponse } from '../models/loan-get-investor-response.interface';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PenaltyType } from '../../plaid/enum/penalty-type.enum';
import { PenaltyService } from '../../plaid/services/penalty.service';

@Injectable()
export class LoanService {
  logger = new Logger('LoanService');

  constructor(
    @InjectRepository(Loan)
    private readonly loanRepository: Repository<Loan>,
    @InjectRepository(Investment)
    private readonly investmentRepository: Repository<Investment>,
    private readonly installmentService: InstallmentService,
    @Inject(forwardRef(() => PlaidService))
    private readonly plaidService: PlaidService,
    private readonly achqService: AchqService,
    private readonly paymentService: PaymentService,
    @Inject(forwardRef(() => InvestmentService))
    private readonly investmentService: InvestmentService,
    @Inject(forwardRef(() => InvestmentRequestService))
    private readonly investmentRequestService: InvestmentRequestService,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private readonly globalSettingsService: GlobalSettingsService,
    @Inject(forwardRef(() => NotificationService))
    private readonly notificationService: NotificationService,
    private readonly penaltyService: PenaltyService,
  ) {}

  getAllActiveLoans(): Observable<Loan[]> {
    return from(
      this.loanRepository.find({
        where: {
          loanStatus:
            LoanStatus.AWAITING_NEXT_PAYMENT || LoanStatus.PAYMENT_IS_LATE,
        },
        relations: [
          'businessOwner',
          'businessOwner.user',
          'investmentRequest',
          'investmentRequest.investments',
          'investmentRequest.investments.investor',
        ],
      }),
    );
  }

  getLastLoanForBusinessOwner(
    businessOwnerId: number,
    investmentRequestId: number,
  ): Observable<GetLoanBusinessOwnerResponse> {
    return forkJoin({
      loan: this.findLoanByInvestmnentRequest(investmentRequestId),
      paymentsFromBusinessOwner:
        this.installmentService.findInstallmentsByInvestmentRequestId(
          investmentRequestId,
        ),
    }).pipe(
      map((data) =>
        toGetLoanBusinessOwnerResponse(
          data.loan,
          data.paymentsFromBusinessOwner,
        ),
      ),
      catchError(() => {
        throw new HttpException(
          'Error occured while generating installments view.',
          HttpStatus.NOT_FOUND,
        );
      }),
    );
  }

  getLastLoanForInvestor(
    investorId: number,
    investmentRequestId: number,
  ): Observable<GetLoanInvestorResponse> {
    return forkJoin({
      loan: this.findLoanByInvestmnentRequest(investmentRequestId),
      paymentsToInvestor:
        this.installmentService.findInstallmentsByInvestmentRequestId(
          investmentRequestId,
        ),
    }).pipe(
      map((data) =>
        toGetLoanInvestorResponse(
          investorId,
          data.loan,
          data.paymentsToInvestor.filter(
            (installment) => installment.investor.id == investorId,
          ),
        ),
      ),
      catchError(() => {
        throw new HttpException(
          'Error occured while generating installments view.',
          HttpStatus.NOT_FOUND,
        );
      }),
    );
  }

  findLoanByInvestmnentRequest(investmentRequestId): Observable<Loan> {
    return from(
      this.loanRepository.findOneOrFail({
        relations: [
          'investmentRequest',
          'investmentRequest.investments',
          'investmentRequest.investments.investor',
        ],
        where: {
          investmentRequest: { id: investmentRequestId },
        },
      }),
    ).pipe(
      catchError(() => {
        throw new HttpException('Loan not found.', HttpStatus.NOT_FOUND);
      }),
    );
  }

  createLoan(loan?: DeepPartial<Loan>): Observable<Loan> {
    const newLoan = this.loanRepository.create(loan);

    return from(this.loanRepository.save(newLoan));
  }

  processAcceptLoan(
    investmentRequest: InvestmentRequest,
    payload: Payload,
  ): Observable<void> {
    let amountToBeDeposited = 0;

    investmentRequest.investments.forEach((investment) => {
      amountToBeDeposited += investment.amount;
    });
    amountToBeDeposited -= this.globalSettingsService.APPLICATION_FEE;

    return this.sendApplicationFee(investmentRequest.businessOwner).pipe(
      mergeMap((payment) =>
        this.createLoan({
          amountToBeDeposited: amountToBeDeposited,
          totalPayback: amountToBeDeposited,
          nextPaymentDate: this.nextMonthDate(new Date().getDate(), new Date()),
          finalPaymentDate: this.addMonthsToDate(
            new Date(),
            investmentRequest.returnTerm,
          ),
          loanStatus: LoanStatus.AWAITING_NEXT_PAYMENT,
          businessOwner: { id: investmentRequest.businessOwner.id },
          investmentRequest: { id: investmentRequest.id },
          applicationFee: { id: payment.id },
        }),
      ),
      mergeMap((loan) =>
        this.investmentRequestService.update(investmentRequest.id, {
          status: INVESTMENT_REQUEST_STATUS.TRANSFERED,
          loan: { id: loan.id },
        }),
      ),
      catchError((e) => {
        this.logger.error('Error occured in: processAcceptLoan(): ' + e);

        throw new HttpException(
          'Error occured in: processAcceptLoan(): ' + e,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }),
    );
  }

  sendApplicationFee(businessOwner: BusinessOwner): Observable<Payment> {
    const merchantReferenceId = v4();
    const applicationFee = this.globalSettingsService.APPLICATION_FEE;

    return forkJoin({
      processorToken: this.plaidService.getProcessorToken(
        businessOwner.user.id,
      ),
      identity: this.plaidService.getIdentity(businessOwner.user.id),
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
            paymentAmount: applicationFee,
            phone: data.identity.phone,
            state: data.identity.state,
            zip: data.identity.zip,
          },
          data.processorToken.processor_token,
        ),
      ),
      mergeMap((data) =>
        this.paymentService.createPayment({
          merchantReferenceId: merchantReferenceId,
          transactReferenceId: data.TransAct_ReferenceID,
          applicationFee: applicationFee,
        }),
      ),
      catchError((e) => {
        this.logger.error('Error occured in: sendApplicationFee(): ' + e);

        throw new HttpException(
          'Error occured in: sendApplicationFee(): ' + e,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }),
    );
  }

  rejectLoan(investmentRequest: InvestmentRequest): Observable<void> {
    // return money to investors - ACHQ Refund
    return this.refundPayment(investmentRequest.investments).pipe(
      mergeMap(() =>
        this.investmentRequestService.updateInvestmentRequestStatus(
          investmentRequest.id,
          INVESTMENT_REQUEST_STATUS.CANCELLED,
        ),
      ),
      catchError((e) => {
        this.logger.error('Error occured in rejectLoan(): ' + e);

        throw new HttpException(
          'Error occured in rejectLoan(): ' + e,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }),
    );
  }

  refundPayment(investments: Investment[]): Observable<void> {
    const merchantReferenceId = v4();

    const observables = investments.map((investment) => {
      if (
        investment.paymentFromInvestor.eventName == TransactionEvent.Cleared
      ) {
        // refund payment logic
        return this.achqService
          .refundPayment({
            transactReferenceId:
              investment.paymentFromInvestor.transactReferenceId,
            id: merchantReferenceId,
          })
          .pipe(
            mergeMap((data) =>
              this.paymentService.createPayment({
                merchantReferenceId: merchantReferenceId,
                transactReferenceId: data.TransAct_ReferenceID,
              }),
            ),
            // mergeMap(() =>
            //   this.notificationService.generateInvestmentReturnNotification(
            //     investment.investor.user.email,
            //   ),
            // ),
          );
      } else if (
        investment.paymentFromInvestor.eventName == TransactionEvent.Created
      ) {
        // cancel payment logic
        return this.achqService
          .cancelPayment({
            transactReferenceId:
              investment.paymentFromInvestor.transactReferenceId,
          })
          .pipe
          // mergeMap(() =>
          //   this.notificationService.generateInvestmentReturnNotification(
          //     investment.investor.user.email,
          //   ),
          // ),
          ();
      }
    });

    return forkJoin(observables).pipe(map(() => {}));
  }

  getAllLoansById(userId: number): Observable<Loan[]> {
    return from(
      this.loanRepository.find({
        where: { businessOwner: { user: { id: userId } } },
        relations: [
          'businessOwner',
          'businessOwner.user',
          'investmentRequest',
          'investmentRequest.investments',
          'investmentRequest.investments.investor',
        ],
      }),
    );
  }

  updateLoan(id: number, loan: DeepPartial<Loan>): Observable<void> {
    return from(this.loanRepository.update(id, loan)).pipe(map(() => {}));
  }

  nextMonthDate(baseDay: number, currentDate: Date): Date {
    const day = currentDate.getDate();
    let month = currentDate.getMonth();
    let year = currentDate.getFullYear();

    const daysInNextMonth = new Date(year, month + 1, 0).getDate();
    let dayInNextMonth = Math.min(baseDay, daysInNextMonth);

    if (day >= daysInNextMonth) {
      if (month === 11) {
        year += 1;
        month = 0;
      } else {
        month += 1;
      }
      dayInNextMonth = Math.min(baseDay, new Date(year, month, 0).getDate());
    } else {
      month += 1;
    }

    return new Date(year, month, dayInNextMonth);
  }

  addMonthsToDate(baseDate: Date, monthsToAdd: number): Date {
    const newDate = new Date(baseDate);
    newDate.setMonth(newDate.getMonth() + monthsToAdd);
    return newDate;
  }

  @Cron(CronExpression.EVERY_DAY_AT_10AM)
  resendRejectedApplicationFeeFromBusinessOwner(): void {
    this.logger.log('Execute cron job - resend rejected application fee');

    this.achqService.trackPayments().subscribe({
      next: (statuses) => {
        const merchantReferenceId = v4();
        statuses
          .filter((status) => status.merchantReferenceId)
          .forEach((status) => {
            this.paymentService
              .findByMerchantReferenceId(status.merchantReferenceId)
              .subscribe((payment) => {
                if (
                  payment &&
                  (payment.eventDate < status.eventDate ||
                    payment.eventDate == null)
                ) {
                  if (
                    status.eventName === TransactionEvent.Rejected &&
                    payment.applicationFee
                  ) {
                    forkJoin({
                      processorToken: this.plaidService.getProcessorToken(
                        payment.loan.businessOwner.user.id,
                      ),
                      identity: this.plaidService.getIdentity(
                        payment.loan.businessOwner.user.id,
                      ),
                      penalty: this.penaltyService.penaliseUser(
                        payment.loan.businessOwner.user,
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
                              paymentAmount: payment.applicationFee,
                              phone: data.identity.phone,
                              state: data.identity.state,
                              zip: data.identity.zip,
                            },
                            data.processorToken.processor_token,
                          ),
                        ),
                        mergeMap(() =>
                          this.notificationService.generateRejectedPaymentNotification(
                            payment.loan.businessOwner,
                          ),
                        ),
                      )
                      .subscribe();
                  }

                  this.paymentService
                    .updatePayment(payment.id, {
                      eventName: status.eventName,
                      eventDate: status.eventDate,
                      resultingStatus: status.resultingStatus,
                      returnCode: status.returnCode,
                      returnExplanation: status.returnExplanation,
                      verificationStatus: status.verificationStatus,
                      verificationCode: status.verificationCode,
                      verificationDescription: status.verificationDescription,
                    })
                    .subscribe();
                }
              });
          });
      },
    });
  }
}
