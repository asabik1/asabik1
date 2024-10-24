import { Inject, Injectable, Logger, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { forkJoin, from, map, mergeMap, Observable } from 'rxjs';
import { DeepPartial, Repository, UpdateResult } from 'typeorm';
import { v4 } from 'uuid';
import { AchqService } from './achq.service';
import { PlaidService } from './plaid.service';
import { Penalty } from '../entities/penalty.entity';
import { GlobalSettingsService } from '../../global-settings/services/global-settings.service';
import { PaymentService } from './payment.service';
import { PenaltyType } from '../enum/penalty-type.enum';
import { User } from '../../users/entities/users.entity';
import { NotificationService } from '../../investment-request/services/notification.service';

@Injectable()
export class PenaltyService {
  logger = new Logger('PenaltyService');

  constructor(
    @InjectRepository(Penalty)
    private readonly penaltyRepository: Repository<Penalty>,
    @Inject(forwardRef(() => PlaidService))
    private readonly plaidService: PlaidService,
    private readonly achqService: AchqService,
    private readonly globalSettingsService: GlobalSettingsService,
    @Inject(forwardRef(() => PaymentService))
    private readonly paymentService: PaymentService,
    @Inject(forwardRef(() => NotificationService))
    private readonly notificationService: NotificationService,
  ) {}

  penaliseUser(user: User, penaltyType: PenaltyType): Observable<void> {
    const merchantReferenceId = v4();
    let amount = 0;

    if (penaltyType == PenaltyType.INVALID_PLAID_TOKEN) {
      amount = this.globalSettingsService.PLAID_TOKEN_PENALTY;
    } else if (penaltyType == PenaltyType.INVALID_TRANSACTION) {
      amount = this.globalSettingsService.INVALID_TRANSACTION_PENALTY;
    }

    return forkJoin({
      processorToken: this.plaidService.getProcessorToken(user.id),
      identity: this.plaidService.getIdentity(user.id),
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
            paymentAmount: amount,
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
        }),
      ),
      mergeMap((payment) =>
        this.createPenalty({
          penaltyType: penaltyType,
          amount: amount,
          isResolved: false,
          businessOwner: { id: user.businessOwner.id },
          paymentFromBusinessOwner: { id: payment.id },
        }),
      ),
      mergeMap(() =>
        this.notificationService.generatePenaltyNotification(
          user.businessOwner,
          penaltyType,
          amount,
        ),
      ),
      map(() => {}),
    );
  }

  createPenalty(penalty?: DeepPartial<Penalty>): Observable<Penalty> {
    const newPenalty = this.penaltyRepository.create(penalty);

    return from(this.penaltyRepository.save(newPenalty));
  }

  updatePenalty(
    penaltyId: number,
    penalty: DeepPartial<Penalty>,
  ): Observable<UpdateResult> {
    return from(this.penaltyRepository.update(penaltyId, penalty));
  }
}
