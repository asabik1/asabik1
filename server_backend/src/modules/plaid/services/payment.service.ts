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
import { catchError, forkJoin, from, map, mergeMap, Observable } from 'rxjs';
import { InvestmentService } from '../../investment/services/investment.service';
import { DeepPartial, Repository, UpdateResult } from 'typeorm';
import { v4 } from 'uuid';
import { Payment } from '../entities/payment.entity';
import { TransactionEvent } from '../enum/transaction-event.enum';
import { AchqService } from './achq.service';
import { PlaidService } from './plaid.service';
import { UsersService } from '../../users/services/users.service';
import { PaymentType } from '../enum/payment-type.enum';

@Injectable()
export class PaymentService {
  logger = new Logger('PaymentService');

  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    private readonly achqService: AchqService,
    @Inject(forwardRef(() => PlaidService))
    private readonly plaidService: PlaidService,
    @Inject(forwardRef(() => InvestmentService))
    private readonly investmentService: InvestmentService,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  findByMerchantReferenceId(merchantReferenceId: string): Observable<Payment> {
    return from(
      this.paymentRepository.findOne({
        where: { merchantReferenceId },
        relations: [
          'investment',
          'investment.paymentToBusinessOwner',
          'investment.investmentRequest',
          'investment.investmentRequest.businessOwner',
          'investment.investmentRequest.businessOwner.user',
          'investment.investmentRequest.loan',
        ],
      }),
    );
  }

  createPayment(payment?: DeepPartial<Payment>): Observable<Payment> {
    const newPayment = this.paymentRepository.create(payment);

    return from(this.paymentRepository.save(newPayment));
  }

  updatePayment(
    paymentId: number,
    payment: DeepPartial<Payment>,
  ): Observable<UpdateResult> {
    return from(this.paymentRepository.update(paymentId, payment));
  }

  @Cron(CronExpression.EVERY_MINUTE)
  syncStatuses(): void {
    this.logger.log('Execute cron job - update payments');

    this.achqService.trackPayments().subscribe({
      next: (statuses) => {
        const merchantReferenceId = v4();

        statuses
          .filter((x) => x.merchantReferenceId)
          .forEach((status) => {
            this.findByMerchantReferenceId(
              status.merchantReferenceId,
            ).subscribe((payment) => {
              if (
                payment &&
                (payment.eventDate < status.eventDate ||
                  payment.eventDate == null)
              ) {
                if (
                  status.eventName == TransactionEvent.Cleared &&
                  payment.paymentType == PaymentType.COLLECTING_FUNDS &&
                  payment.investment.paymentToBusinessOwner?.id == null
                ) {
                  forkJoin({
                    adminProcessorToken: this.usersService
                      .getAdmin()
                      .pipe(
                        mergeMap((adminUser) =>
                          this.plaidService.getProcessorToken(adminUser.id),
                        ),
                      ),
                    adminUserIdentity: this.usersService
                      .getAdmin()
                      .pipe(
                        mergeMap((adminUser) =>
                          this.plaidService.getIdentity(adminUser.id),
                        ),
                      ),
                  })
                    .pipe(
                      mergeMap((data) =>
                        this.achqService.submitPayment(
                          {
                            id: merchantReferenceId,
                            address1: data.adminUserIdentity.street,
                            city: data.adminUserIdentity.city,
                            customerName: data.adminUserIdentity.name,
                            direction: 'ToCustomer',
                            SECCode: 'CCD',
                            paymentAmount: payment.investment.amount,
                            phone: data.adminUserIdentity.phone,
                            state: data.adminUserIdentity.state,
                            zip: data.adminUserIdentity.zip,
                          },
                          data.adminProcessorToken.processor_token,
                        ),
                      ),
                      mergeMap((data) =>
                        this.createPayment({
                          merchantReferenceId: merchantReferenceId,
                          transactReferenceId: data.TransAct_ReferenceID,
                          paymentType: PaymentType.COLLECTING_FUNDS,
                        }),
                      ),
                      mergeMap((data) =>
                        this.investmentService.updateInvestment(
                          payment.investment.id,
                          {
                            amount: payment.investment.amount,
                          },
                        ),
                      ),
                      catchError((err) => {
                        this.logger.error('syncStatuses');
                        throw new HttpException(err, HttpStatus.BAD_REQUEST);
                      }),
                    )
                    .subscribe();
                } else if (
                  status.eventName == TransactionEvent.Cleared &&
                  payment.investment.paymentToBusinessOwner?.id == null &&
                  payment.paymentType ==
                    PaymentType.TRANSFERING_TO_BUSINESS_OWNER
                ) {
                  this.syncTransferToBusinessOwner(
                    payment.investment.investmentRequest.businessOwner.user.id,
                    merchantReferenceId,
                    payment,
                  );
                } else if (
                  status.eventName == TransactionEvent.Cleared &&
                  payment.investment == null &&
                  payment.penalty.paymentToAdmin?.id == null
                ) {
                  this.syncPenaltiesStatuses(merchantReferenceId, payment);
                }
                this.updatePayment(payment.id, {
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

  syncTransferToBusinessOwner(
    userId: number,
    merchantReferenceId: string,
    payment: Payment,
  ): Observable<void> {
    return forkJoin({
      processorToken: this.plaidService.getProcessorToken(userId),
      identity: this.plaidService.getIdentity(userId),
    }).pipe(
      mergeMap((data) =>
        this.achqService.submitPayment(
          {
            id: merchantReferenceId,
            address1: data.identity.street,
            city: data.identity.city,
            customerName: data.identity.name,
            direction: 'ToCustomer',
            SECCode: 'CCD',
            paymentAmount:
              payment.investment.investmentRequest.loan.amountToBeDeposited,
            phone: data.identity.phone,
            state: data.identity.state,
            zip: data.identity.zip,
          },
          data.processorToken.processor_token,
        ),
      ),
      mergeMap((data) =>
        this.createPayment({
          merchantReferenceId: merchantReferenceId,
          transactReferenceId: data.TransAct_ReferenceID,
          paymentType: PaymentType.TRANSFERING_TO_BUSINESS_OWNER,
        }),
      ),
      map(() => {}),
    );
  }

  syncPenaltiesStatuses(
    merchantReferenceId: string,
    payment: Payment,
  ): Observable<void> {
    return this.usersService.getAdmin().pipe(
      mergeMap((adminUser) =>
        forkJoin({
          processorToken: this.plaidService.getProcessorToken(adminUser.id),
          identity: this.plaidService.getIdentity(adminUser.id),
        }).pipe(
          mergeMap((data) =>
            this.achqService.submitPayment(
              {
                id: merchantReferenceId,
                address1: data.identity.street,
                city: data.identity.city,
                customerName: data.identity.name,
                direction: 'ToCustomer',
                SECCode: 'CCD',
                paymentAmount: payment.penalty.amount,
                phone: data.identity.phone,
                state: data.identity.state,
                zip: data.identity.zip,
              },
              data.processorToken.processor_token,
            ),
          ),
          mergeMap((data) =>
            this.createPayment({
              merchantReferenceId: merchantReferenceId,
              transactReferenceId: data.TransAct_ReferenceID,
              paymentType: PaymentType.PENALTY,
            }),
          ),
          map(() => {}),
        ),
      ),
    );
  }
}
