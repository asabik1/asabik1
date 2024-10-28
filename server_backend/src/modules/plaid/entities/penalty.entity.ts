import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PenaltyType } from '../enum/penalty-type.enum';
import { BusinessOwner } from '../../business-owner/entities/business-owner.entity';
import { Payment } from './payment.entity';

@Entity('penalties')
export class Penalty {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ name: 'penalty_type', enum: PenaltyType })
  penaltyType: PenaltyType;

  @Column({ name: 'amount' })
  amount: number;

  @Column({ name: 'is_resolved', default: false })
  isResolved: boolean;

  @ManyToOne(
    (type) => BusinessOwner,
    (businessOwner: BusinessOwner) => businessOwner.penalties,
  )
  @JoinColumn({ name: 'business_owner_id' })
  businessOwner: BusinessOwner;

  @OneToOne((type) => Payment, (payment: Payment) => payment.penalty, {
    nullable: true,
  })
  @JoinColumn({ name: 'payment_from_business_owner_id' })
  paymentFromBusinessOwner?: Payment;

  @OneToOne((type) => Payment, (payment: Payment) => payment.penalty, {
    nullable: true,
  })
  @JoinColumn({ name: 'payment_to_admin_id' })
  paymentToAdmin?: Payment;
}
