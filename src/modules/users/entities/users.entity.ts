import { Role } from '../../auth/enums/role.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SurveyStatus } from '../../survey/models/survey-status.enum';
import { Investor } from '../../investor/entities/investor.entity';
import { BusinessOwner } from '../../business-owner/entities/business-owner.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'apple_id', unique: true, nullable: true })
  appleId?: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: true })
  password?: string;

  @Column({ name: 'email_confirmed' })
  emailConfirmed: boolean;

  @Column({
    name: 'account_activatation_token',
  })
  accountActivatationToken: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
  })
  createdAt: Date;

  @CreateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
  })
  updatedAt: Date;

  @Column({
    name: 'role',
    default: Role.BusinessOwner,
  })
  role: Role;

  @Column({
    name: 'survey_status',
    nullable: true,
  })
  surveyStatus?: SurveyStatus;

  @Column({
    name: 'plaid_token',
    nullable: true,
  })
  plaidToken?: string;

  @Column({
    name: 'invalid_plaid_token_detection',
    nullable: true,
  })
  invalidPlaidTokenDetection?: Date;

  @Column({
    name: 'reset_password_token',
    nullable: true,
  })
  resetPasswordToken?: string;

  @Column({
    name: 'is_frozen_by_user',
    nullable: true,
    default: false,
  })
  isFrozenByUser?: boolean;

  @Column({
    name: 'identity_verif_id',
    nullable: true,
  })
  identityVerifId?: string;

  @Column({
    name: 'is_verified',
    nullable: true,
  })
  isVerified?: boolean;

  @OneToOne((type) => Investor, (investor: Investor) => investor.user, {
    nullable: true,
  })
  @JoinColumn({ name: 'investor_id' })
  investor?: Investor;

  @OneToOne(
    (type) => BusinessOwner,
    (businessOwner: BusinessOwner) => businessOwner.user,
    { nullable: true },
  )
  @JoinColumn({ name: 'business_owner_id' })
  businessOwner?: BusinessOwner;
}
