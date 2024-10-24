import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToOne,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { BusinessOwner } from '../../business-owner/entities/business-owner.entity';
import { Installment } from './installment.entity';
import { InvestmentRequest } from '../../investment-request/entities/investment-request.entity';
import { LoanStatus } from '../enum/loan-status.enum';
import { Payment } from '../../plaid/entities/payment.entity';

@Entity('loan')
export class Loan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'amount_to_be_deposited' })
  amountToBeDeposited: number;

  @Column({ name: 'total_payback' })
  totalPayback: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'next_payment_date', nullable: true })
  nextPaymentDate: Date;

  @Column({ name: 'final_payment_date', nullable: true })
  finalPaymentDate: Date;

  @Column({ name: 'loan_status' })
  loanStatus: LoanStatus;

  @ManyToOne(
    (type) => BusinessOwner,
    (businessOwner: BusinessOwner) => businessOwner.loan,
  )
  @JoinColumn({ name: 'business_owner_id' })
  businessOwner: BusinessOwner;

  @OneToOne(() => InvestmentRequest)
  @JoinColumn({ name: 'investment_request_id' })
  investmentRequest: InvestmentRequest;

  @OneToMany(
    (type) => Installment,
    (installemnt: Installment) => installemnt.loan,
    { nullable: true },
  )
  paymentsToInvestors?: Installment[];

  @OneToMany(
    (type) => Installment,
    (installemnt: Installment) => installemnt.loan,
    { nullable: true },
  )
  paymentsFromBusinessOwner?: Installment[];

  @OneToOne((type) => Payment, (payment: Payment) => payment.loan, {
    nullable: true,
  })
  @JoinColumn({ name: 'application_fee_id' })
  applicationFee: Payment;
}
