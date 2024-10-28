import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { InvestmentRequest } from './investment-request.entity';
import { Rating } from '../enum/rating.enum';
import { MonthlyReport } from '../../business-owner/entities/monthly-report.entity';

@Entity('credit_rating_data')
export class CreditRatingData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'rating' })
  rating: Rating;

  @Column({ name: 'low', type: 'float' })
  low: number;

  @Column({ name: 'high', type: 'float' })
  high: number;

  @Column({ name: 'requested_amount' })
  requestedAmount: number;

  @Column({ name: 'R' })
  r: number;

  @Column({ name: 'M', type: 'float' })
  m: number;

  @Column({ name: 'A' })
  a: number;

  @Column({ name: 'v_inflow', type: 'float' })
  vInflow: number;

  @Column({ name: 'v_total', type: 'float' })
  vTotal: number;

  @Column({ name: 'average_e', type: 'float' })
  averageE: number;

  @Column({ name: 'average_l', type: 'float' })
  averageL: number;

  @Column({ name: 'total_no_month' })
  totalNoMonth: number;

  @Column({ name: 'outflow_exceed' })
  outflowExceed: number;

  @Column({ name: 'negative_balance' })
  negativeBalance: number;

  @Column({ name: 'no_earning' })
  noEarning: number;

  @Column({ name: 'O', type: 'float' })
  o: number;

  @Column({ name: 'I', type: 'float' })
  i: number;

  @Column({ name: 'd1', type: 'float' })
  d1: number;

  @Column({ name: 'd2', type: 'float' })
  d2: number;

  @Column({ name: 'd0', type: 'float' })
  d0: number;

  @Column({ name: 'PoD', type: 'float' })
  pod: number;

  @Column({ name: 'max_loan_calc', type: 'float' })
  maxLoanCalc: number;

  @OneToOne(() => InvestmentRequest)
  @JoinColumn({ name: 'investment_request_id' })
  investmentRequest: InvestmentRequest;

  @OneToMany(
    (type) => MonthlyReport,
    (monthlyReport: MonthlyReport) => monthlyReport.creditRatingData,
    { nullable: true, onDelete: 'SET NULL' },
  )
  @JoinColumn({ name: 'monthly_reports' })
  monthlyReports: MonthlyReport[];
}
