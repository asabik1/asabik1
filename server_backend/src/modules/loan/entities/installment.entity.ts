import { TransactionEvent } from '../../plaid/enum/transaction-event.enum';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Loan } from './loan.entity';
import { MonthlyReport } from '../../business-owner/entities/monthly-report.entity';
import { Investor } from '../../investor/entities/investor.entity';

@Entity('installment')
export class Installment {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({
    name: 'transact_reference_id',
    nullable: true,
    length: 50,
  })
  transactReferenceId: string;

  @Column({
    name: 'merchant_reference_id',
    nullable: true,
    length: 50,
  })
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

  @Column({ name: 'verification_code ', nullable: true, length: 3 })
  verificationCode: string;

  @Column({ name: 'verification_description', nullable: true, length: 100 })
  verificationDescription: string;

  @Column({ name: 'amount', type: 'decimal', nullable: true })
  amount: number;

  @Column({ name: 'is_skipped', nullable: true })
  isSkipped: boolean;

  @ManyToOne(
    (type) => MonthlyReport,
    (monthlyReport: MonthlyReport) =>
      monthlyReport.installmentsFromBusinessOwner,
    {
      nullable: true,
    },
  )
  @JoinColumn({ name: 'monthly_report_id' })
  monthlyReport: MonthlyReport;

  @ManyToOne(
    (type) => Investor,
    (investor: Investor) => investor.installments,
    { nullable: true },
  )
  @JoinColumn({ name: 'investor_id' })
  investor: Investor;

  @ManyToOne(
    (type) => Loan,
    (loan: Loan) => loan.paymentsFromBusinessOwner || loan.paymentsToInvestors,
    { nullable: true },
  )
  loan: Loan;
}
