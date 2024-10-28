import { Payment } from '../../../modules/plaid/entities/payment.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { InvestmentRequest } from '../../investment-request/entities/investment-request.entity';
import { Investor } from '../../investor/entities/investor.entity';

@Entity('investments')
export class Investment {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  amount: number;

  @ManyToOne((type) => Investor, (investor: Investor) => investor.investments)
  @JoinColumn({ name: 'investor_id' })
  investor?: Investor;

  @ManyToOne(
    (type) => InvestmentRequest,
    (investmentRequest: InvestmentRequest) => investmentRequest.investments,
  )
  @JoinColumn({ name: 'investment_request_id' })
  investmentRequest: InvestmentRequest;

  @JoinColumn({ name: 'payment_from_investor_id' })
  @OneToOne((type) => Payment, (payment: Payment) => payment.investment, {
    nullable: true,
  })
  paymentFromInvestor?: Payment;

  @JoinColumn({ name: 'payment_to_business_owner_id' })
  @OneToOne((type) => Payment, (payment: Payment) => payment.investment, {
    nullable: true,
  })
  paymentToBusinessOwner?: Payment;
}
