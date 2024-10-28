import { Investment } from '../../../modules/investment/entities/investment.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TransactionEvent } from '../enum/transaction-event.enum';
import { Penalty } from './penalty.entity';
import { Loan } from '../../loan/entities/loan.entity';
import { PaymentType } from '../enum/payment-type.enum';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ name: 'transact_reference_id', length: 50 })
  transactReferenceId: string;

  @Column({ name: 'merchant_reference_id', length: 50 })
  merchantReferenceId: string;

  @Column({
    name: 'event_name',
    nullable: true,
    length: 20,
    enum: TransactionEvent,
    enumName: 'transaction_event',
    default: TransactionEvent.Created,
  })
  eventName: TransactionEvent;

  @Column({ name: 'event_date', nullable: true, type: 'date' })
  eventDate: Date;

  @Column({ name: 'resulting_status', nullable: true, length: 20 })
  resultingStatus: string;

  @Column({ name: 'return_code ', nullable: true, length: 3 })
  returnCode: string;

  @Column({ name: 'return_explanation', nullable: true, length: 255 })
  returnExplanation: string;

  @Column({ name: 'verification_status', nullable: true, length: 3 })
  verificationStatus: string;

  @Column({ name: 'verification_code', nullable: true, length: 3 })
  verificationCode: string;

  @Column({ name: 'verification_description', nullable: true, length: 100 })
  verificationDescription: string;

  @Column({ name: 'have_been_retried', nullable: true })
  haveBeenRetried?: boolean;

  @Column({ name: 'was_investor_notified', nullable: true })
  wasInvestorNotified?: boolean;

  @Column({ name: 'payment_type', nullable: true })
  paymentType?: PaymentType;

  @OneToOne(
    (type) => Investment,
    (investment: Investment) =>
      investment.paymentFromInvestor || investment.paymentToBusinessOwner,
    { nullable: true },
  )
  investment: Investment;

  @OneToOne(
    (type) => Penalty,
    (penalty: Penalty) =>
      penalty.paymentFromBusinessOwner || penalty.paymentToAdmin,
    { nullable: true },
  )
  penalty: Penalty;
}
