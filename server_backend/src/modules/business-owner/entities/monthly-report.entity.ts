import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BusinessOwner } from './business-owner.entity';
import { CreditRatingData } from '../../investment-request/entities/credit-rating-data.entity';
import { OriginalMonthlyReport } from './original-monthly-report.entity';
import { Installment } from '../../loan/entities/installment.entity';

@Entity('monthly_reports')
export class MonthlyReport {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @CreateDateColumn({ name: 'report_date' })
  reportDate: Date;

  @Column({ type: 'float' })
  inflow: number;

  @Column({ type: 'float' })
  outflow: number;

  @Column({ name: 'v_inflow', type: 'float', nullable: true })
  vInflow?: number;

  @Column({ name: 'v_total', type: 'float', nullable: true })
  vTotal?: number;

  @Column({ name: 'outflow_exceed' })
  outflowExceed: boolean;

  @Column({ name: 'is_negative_balance' })
  isNegativeBalance: boolean;

  @Column({ name: 'no_earning' })
  noEarning: boolean;

  @Column({ name: 'is_confirmed' })
  isConfirmed: boolean;

  @ManyToOne(
    (type) => BusinessOwner,
    (businessOwner: BusinessOwner) => businessOwner.monthlyReports,
  )
  @JoinColumn({ name: 'business_owner_id' })
  businessOwner: BusinessOwner;

  @ManyToOne(() => CreditRatingData, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'credit_rating_data_id' })
  creditRatingData?: CreditRatingData;

  @OneToOne(
    (type) => OriginalMonthlyReport,
    (originalMonthlyReport: OriginalMonthlyReport) =>
      originalMonthlyReport.monthyReport,
    { nullable: true, onDelete: 'SET NULL' },
  )
  @JoinColumn({ name: 'original_monhly_report' })
  originalMonthlyReport?: OriginalMonthlyReport;

  @OneToMany(
    (type) => Installment,
    (installment: Installment) => installment.monthlyReport,
    { nullable: true },
  )
  installmentsFromBusinessOwner?: Installment;
}
