import { BusinessOwner } from '../../business-owner/entities/business-owner.entity';
import {
  AfterLoad,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Investment } from '../../investment/entities/investment.entity';
import { LoanPurpose } from '../enum/loan-purpose.enum';
import { Rating } from '../enum/rating.enum';
import { INVESTMENT_REQUEST_STATUS } from '../enum/investment-status-message.enum';
import { Loan } from '../../loan/entities/loan.entity';
import { CreditRatingData } from './credit-rating-data.entity';

@Entity('investment_requests')
export class InvestmentRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'purpose_of_the_loan' })
  purposeOfTheLoan: LoanPurpose;

  @Column({ name: 'return_term' })
  returnTerm: number;

  @Column({ name: 'net_return', default: 0 })
  netReturn: number;

  @Column({ name: 'net_return_to_share', default: 0 })
  netReturnToShare: number;

  @Column({ name: 'rating', nullable: true })
  rating: Rating;

  @Column({ name: 'rating_update', nullable: true })
  ratingUpdate: Rating;

  @Column({ name: 'dti', nullable: true })
  dti: string;

  @Column({ name: 'status', nullable: true })
  status: INVESTMENT_REQUEST_STATUS;

  @Column({ name: 'loan_purpose', nullable: false })
  loanPurpose: string;

  @Column({ name: 'help_increase_profit', nullable: false })
  helpIncreaseProfit: string;

  @Column({ name: 'profit_increase', nullable: false })
  profitIncrease: number;

  @Column({ name: 'required_capital' })
  requiredCapital: number;

  @CreateDateColumn({ name: 'approved_at', nullable: true })
  approvedAt: Date;

  @CreateDateColumn({ name: 'expires_at', nullable: true })
  expiresAt: Date;

  @Column({ name: 'is_extended', nullable: true })
  isExtended: boolean;

  @OneToOne(() => Loan, { nullable: true })
  @JoinColumn({ name: 'loan_id' })
  loan?: Loan;

  @OneToOne(() => CreditRatingData, { nullable: true })
  creditRatingData?: CreditRatingData;

  @OneToMany(
    (type) => Investment,
    (investment: Investment) => investment.investmentRequest,
  )
  investments: Investment[];

  @ManyToOne(
    (type) => BusinessOwner,
    (businessOwner: BusinessOwner) => businessOwner.investmentRequests,
    { nullable: true, onDelete: 'SET NULL' },
  )
  @JoinColumn({ name: 'business_owner_id' })
  businessOwner: BusinessOwner;

  @AfterLoad()
  updateStatus(): void {
    if (
      this.expiresAt &&
      this.expiresAt <= new Date() &&
      this.status == INVESTMENT_REQUEST_STATUS.OPEN
    ) {
      this.status = INVESTMENT_REQUEST_STATUS.CLOSED;
    }
  }
}
