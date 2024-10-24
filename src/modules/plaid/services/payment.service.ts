import { Inject, Injectable, Logger, forwardRef } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { forkJoin, from, map, mergeMap, Observable } from 'rxjs';
import { InvestmentService } from '../../investment/services/investment.service';
import { DeepPartial, Repository, UpdateResult } from 'typeorm';
import { v4 } from 'uuid';
import { Payment } from '../entities/payment.entity';
import { TransactionEvent } from '../enum/transaction-event.enum';
import { AchqService } from './achq.service';
import { PlaidService } from './plaid.service';
import { UsersService } from '../../users/services/users.service';
import { INVESTMENT_REQUEST_STATUS } from '../../investment-request/enum/investment-status-message.enum';

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
                  payment.investment.paymentToBusinessOwner?.id == null &&
                  payment.investment.investmentRequest.status ==
                    INVESTMENT_REQUEST_STATUS.TRANSFERED
                ) {
                  forkJoin({
                    processorToken: this.plaidService.getProcessorToken(
                      payment.investment.investmentRequest.businessOwner.user
                        .id,
                    ),
                    identity: this.plaidService.getIdentity(
                      payment.investment.investmentRequest.businessOwner.user
                        .id,
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
                            paymentAmount: payment.investment.amount,
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
                    )
                    .subscribe();
                } else if (
                  status.eventName == TransactionEvent.Cleared &&
                  payment.investment == null &&
                  payment.applicationFee
                ) {
                  // if payment is for admin
                  this.syncApplicationFeeStatuses(merchantReferenceId, payment);
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

  syncApplicationFeeStatuses(
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
                paymentAmount: payment.applicationFee,
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
            }),
          ),
          map(() => {}),
        ),
      ),
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
            }),
          ),
          map(() => {}),
        ),
      ),
    );
  }
}
