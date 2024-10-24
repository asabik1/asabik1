import { InvestmentRequest } from '../../investment-request/entities/investment-request.entity';
import { User } from '../../users/entities/users.entity';
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
import { BusinessStructure } from '../enum/business-structure.enum';
import File from '../../files/entity/file.entity';
import { BusinessSubsector } from '../../business/entity/business-subsector.entity';
import { MonthlyReport } from './monthly-report.entity';
import { Loan } from '../../loan/entities/loan.entity';
import { Penalty } from '../../plaid/entities/penalty.entity';
import { IdentityScore } from './identity-score.entity';

@Entity('business_owners')
export class BusinessOwner {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: 'start_date' })
  startDate: Date;

  @CreateDateColumn({ name: 'survey_completed_at' })
  surveyCompletedAt: Date;

  @Column({
    enum: BusinessStructure,
    name: 'business_structure',
    nullable: true,
  })
  businessStructure: BusinessStructure;

  @Column({ name: 'company_name', nullable: true })
  companyName: string;

  @Column({ name: 'owner_name', nullable: true })
  ownerName: string;

  @Column({ nullable: true })
  street: string;

  @Column({ nullable: true })
  city: string;

  @Column({ name: 'zip_code', nullable: true })
  zipCode: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  website?: string;

  @ManyToOne(
    (type) => BusinessSubsector,
    (businessSubsector) => businessSubsector.businessSector,
    { nullable: true },
  )
  @JoinColumn({ name: 'business_subsector_id' })
  businessSubsector?: BusinessSubsector;

  @Column({ nullable: true })
  description: string;

  @OneToOne((type) => User, (user: User) => user.businessOwner, {
    cascade: ['remove'],
  })
  user: User;

  @OneToMany(
    (type) => InvestmentRequest,
    (investmentRequest: InvestmentRequest) => investmentRequest.businessOwner,
    { nullable: true, onDelete: 'SET NULL' },
  )
  investmentRequests: InvestmentRequest[];

  @OneToMany((type) => Loan, (loan: Loan) => loan.businessOwner, {
    nullable: true,
  })
  loan?: Loan[];

  @OneToOne(() => File, { nullable: true, cascade: ['remove'] })
  @JoinColumn({ name: 'image' })
  image?: File;

  @Column({ name: 'avr_monthly_sales', nullable: true })
  avrMonthlySales: number;

  @Column({ name: 'avr_monthly_net_profit', nullable: true })
  avrMonthlyNetProfit: number;

  @Column({ name: 'total_last_year_net_profit', nullable: true })
  totalLastYearNetProfit: number;

  @Column({ name: 'employees_no', nullable: true })
  employeesNo: number;

  @Column({
    default: false,
    name: 'is_profile_complete',
  })
  isProfileComplete: boolean;

  @OneToMany(
    (type) => MonthlyReport,
    (monthlyReport: MonthlyReport) => monthlyReport.businessOwner,
  )
  monthlyReports: MonthlyReport[];

  @OneToMany((type) => Penalty, (penalty: Penalty) => penalty.businessOwner, {
    nullable: true,
  })
  penalties: Penalty[];

  @OneToOne(
    (type) => IdentityScore,
    (identityScore: IdentityScore) => identityScore.businessOwner,
    {
      cascade: ['remove'],
    },
  )
  @JoinColumn({ name: 'identity_score' })
  identityScore?: IdentityScore;
}
