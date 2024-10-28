import { Investment } from '../../investment/entities/investment.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/users.entity';
import { Installment } from '../../loan/entities/installment.entity';

@Entity('investors')
export class Investor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'full_name', nullable: true })
  fullName: string;

  @Column({ name: 'company_name', nullable: true })
  companyName: string;

  @Column({ nullable: true })
  website?: string;

  @OneToOne((type) => User, (user: User) => user.investor, {
    cascade: ['remove'],
  })
  user: User;

  @OneToMany(
    (type) => Investment,
    (investment: Investment) => investment.investor,
    { nullable: true, onDelete: 'SET NULL' },
  )
  investments: Investment[];

  @OneToMany(
    (type) => Installment,
    (installemnt: Installment) => installemnt.investor,
    { nullable: true, onDelete: 'SET NULL' },
  )
  installments: Installment[];
}
