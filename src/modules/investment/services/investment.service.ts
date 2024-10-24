import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository, UpdateResult } from 'typeorm';
import { forkJoin, from, map, mergeMap, Observable, tap } from 'rxjs';
import { Investment } from '../entities/investment.entity';
import { CreateInvestmentDto } from '../dto/create-investment.dto';
import { sumInvestments } from '../../../helpers/investment-requests-counters';
import { Payload } from '../../users/models/payload-interface';
import { InvestmentRequestService } from '../../investment-request/services/investment-request.service';
import { AchqService } from '../../plaid/services/achq.service';
import { PaymentService } from '../../plaid/services/payment.service';
import { PlaidService } from '../../plaid/services/plaid.service';
import { v4 as uuid4, v4 } from 'uuid';
import { Cron } from '@nestjs/schedule';
import { TransactionEvent } from '../../plaid/enum/transaction-event.enum';
import { NotificationService } from '../../investment-request/services/notification.service';
import { CommandStatus } from '../../plaid/enum/command-status.enum';
import { PenaltyService } from '../../plaid/services/penalty.service';
import { UsersService } from '../../users/services/users.service';
import { PenaltyType } from '../../plaid/enum/penalty-type.enum';
import { GlobalSettingsService } from '../../global-settings/services/global-settings.service';

@Injectable()
export class InvestmentService {
  logger = new Logger('InvestmentService');

  constructor(
    @InjectRepository(Investment)
    private readonly investmentRepository: Repository<Investment>,
    @Inject(forwardRef(() => InvestmentRequestService))
    private readonly investmentRequestService: InvestmentRequestService,
    @Inject(forwardRef(() => PlaidService))
    private readonly plaidService: PlaidService,
    private readonly achqService: AchqService,
    @Inject(forwardRef(() => PaymentService))
    private readonly paymentService: PaymentService,
    @Inject(forwardRef(() => NotificationService))
    private readonly notificationService: NotificationService,
    @Inject(forwardRef(() => PenaltyService))
    private readonly penaltyService: PenaltyService,
    @Inject(forwardRef(() => UsersService))
    private readonly usersServie: UsersService,
    private readonly globalSettingsService: GlobalSettingsService,
  ) {}

  invest(
    payload: Payload,
    createInvestmentDto: CreateInvestmentDto,
    ip: string,
  ): Observable<void> {
    const merchantReferenceId = uuid4();
    let commandStatus = null;

    return this.investmentRequestService
      .findOneOrFail(createInvestmentDto.investmentRequestId)
      .pipe(
        tap((investmentRequest) => {
          if (investmentRequest.expiresAt <= new Date()) {
            throw new HttpException(
              'The offer has expired.',
              HttpStatus.BAD_REQUEST,
            );
          }
          if (createInvestmentDto.amount % 500 !== 0) {
            throw new HttpException(
              'The amount must be a multiple of 500 USD.',
              HttpStatus.BAD_REQUEST,
            );
          }
          if (
            sumInvestments(investmentRequest.investments) +
              createInvestmentDto.amount >
            investmentRequest.requiredCapital
          ) {
            throw new HttpException(
              'Your deposit exceeds the required investment capital.',
              HttpStatus.BAD_REQUEST,
            );
          }
        }),
        mergeMap(() =>
          forkJoin({
            processorToken: this.plaidService.getProcessorToken(payload.userId),
            identity: this.plaidService.getIdentity(payload.userId),
          }),
        ),
        mergeMap((data) =>
          this.achqService.submitPayment(
            {
              id: merchantReferenceId,
              ip,
              address1: data.identity.street,
              city: data.identity.city,
              customerName: data.identity.name,
              direction: 'FromCustomer',
              SECCode: 'WEB',
              paymentAmount: createInvestmentDto.amount,
              phone: data.identity.phone,
              state: data.identity.state,
              zip: data.identity.zip,
            },
            data.processorToken.processor_token,
          ),
        ),
        mergeMap((data) => {
          commandStatus = data.CommandStatus;

          return this.paymentService.createPayment({
            merchantReferenceId: merchantReferenceId,
            transactReferenceId: data.TransAct_ReferenceID,
          });
        }),
        mergeMap((data) => {
          if (commandStatus == CommandStatus.ERROR) {
            throw new HttpException(
              'An error occured while processing your Investment.',
              HttpStatus.BAD_REQUEST,
            );
          } else if (commandStatus == CommandStatus.DECLINED) {
            return this.usersServie.findOne(payload.userId).pipe(
              mergeMap((user) => {
                this.penaltyService.penaliseUser(
                  user,
                  PenaltyType.INVALID_TRANSACTION,
                );

                throw new HttpException(
                  `Your Payment was declined. You will be fined ${this.globalSettingsService.INVALID_TRANSACTION_PENALTY} USD.`,
                  HttpStatus.BAD_REQUEST,
                );
              }),
            );
          } else {
            return this.createInvestment(
              payload.investorId,
              createInvestmentDto,
              data.id,
            );
          }
        }),
        map(() => {}),
      );
  }

  // @Cron('1 * * * *')
  // resendRejectedInvestmentFromInvestor(): void {
  //   this.logger.log('Execute cron job - resend rejected payments');

  //   this.achqService.trackPayments().subscribe({
  //     next: (statuses) => {
  //       const merchantReferenceId = v4();
  //       statuses
  //         .filter((status) => status.merchantReferenceId)
  //         .map((status) => {
  //           this.paymentService
  //             .findByMerchantReferenceId(status.merchantReferenceId)
  //             .subscribe((payment) => {
  //               if (
  //                 payment &&
  //                 (payment.eventDate < status.eventDate ||
  //                   payment.eventDate === null)
  //               ) {
  //                 if (
  //                   status.eventName == TransactionEvent.Rejected &&
  //                   payment.haveBeenRetried === false &&
  //                   payment.wasInvestorNotified === false
  //                 ) {
  //                   this.notificationService.sendRejectedPaymentNotif(
  //                     payment.investment,
  //                   );

  //                   this.paymentService.updatePayment(payment.id, {
  //                     eventName: status.eventName,
  //                     eventDate: status.eventDate,
  //                     resultingStatus: status.resultingStatus,
  //                     returnCode: status.returnCode,
  //                     returnExplanation: status.returnExplanation,
  //                     verificationStatus: status.verificationStatus,
  //                     verificationCode: status.verificationCode,
  //                     verificationDescription: status.verificationDescription,
  //                     haveBeenRetried: true,
  //                     wasInvestorNotified: true,
  //                   });
  //                 }
  //                 if (
  //                   status.eventName == TransactionEvent.Rejected &&
  //                   payment.haveBeenRetried === false
  //                 ) {
  //                   forkJoin({
  //                     processorToken: this.plaidService.getProcessorToken(
  //                       payment.investment.investmentRequest.businessOwner.user
  //                         .id,
  //                     ),
  //                     identity: this.plaidService.getIdentity(
  //                       payment.investment.investmentRequest.businessOwner.user
  //                         .id,
  //                     ),
  //                   })
  //                     .pipe(
  //                       mergeMap((data) =>
  //                         this.achqService.submitPayment(
  //                           {
  //                             id: merchantReferenceId,
  //                             address1: data.identity.street,
  //                             city: data.identity.city,
  //                             customerName: data.identity.name,
  //                             direction: 'FromCustomer',
  //                             SECCode: 'WEB',
  //                             paymentAmount: payment.investment.amount,
  //                             phone: data.identity.phone,
  //                             state: data.identity.state,
  //                             zip: data.identity.zip,
  //                           },
  //                           data.processorToken.processor_token,
  //                         ),
  //                       ),
  //                     )
  //                     .subscribe();
  //                 }
  //                 this.paymentService
  //                   .updatePayment(payment.id, {
  //                     eventName: status.eventName,
  //                     eventDate: status.eventDate,
  //                     resultingStatus: status.resultingStatus,
  //                     returnCode: status.returnCode,
  //                     returnExplanation: status.returnExplanation,
  //                     verificationStatus: status.verificationStatus,
  //                     verificationCode: status.verificationCode,
  //                     verificationDescription: status.verificationDescription,
  //                     haveBeenRetried: true,
  //                   })
  //                   .subscribe();
  //               }
  //             });
  //         });
  //     },
  //   });
  // }

  createInvestment(
    investorId: number,
    createInvestmentDto: CreateInvestmentDto,
    paymentFromInvestorId?: number,
  ) {
    const newInvestment = this.investmentRepository.create({
      amount: createInvestmentDto.amount,
      paymentFromInvestor: { id: paymentFromInvestorId },
      investmentRequest: { id: createInvestmentDto.investmentRequestId },
      investor: { id: investorId },
    });

    return from(this.investmentRepository.save(newInvestment));
  }

  updateInvestment(
    id: number,
    investment: DeepPartial<Investment>,
  ): Observable<UpdateResult> {
    return from(this.investmentRepository.update(id, investment));
  }

  getAllbyId(userId: number): Observable<Investment[]> {
    return from(
      this.investmentRepository.find({
        where: { investor: { user: { id: userId } } },
      }),
    );
  }

  getAllByBusinessOwnerId(businessOwnerId: number): Observable<Investment[]> {
    return from(
      this.investmentRepository.find({
        where: {
          investmentRequest: { businessOwner: { id: businessOwnerId } },
        },
      }),
    );
  }

  isInvestedByInvestor(investments: Investment[], investorId: number): boolean {
    return investments.some(
      (investment) => investment.investor.id === investorId,
    );
  }
}
