import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MonthlyReport } from './monthly-report.entity';

@Entity('original_monthly_report')
export class OriginalMonthlyReport {
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

  @Column({ name: 'inflow_description', nullable: true })
  inflowDescription: string;

  @Column({ name: 'outflow_description', nullable: true })
  outflowDescription: string;

  @OneToOne(
    (type) => MonthlyReport,
    (monthlyReport: MonthlyReport) => monthlyReport.originalMonthlyReport,
  )
  @JoinColumn({ name: 'monthly_report' })
  monthyReport: MonthlyReport;
}
