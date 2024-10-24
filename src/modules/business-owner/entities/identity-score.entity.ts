import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BusinessOwner } from './business-owner.entity';

@Entity('identity_scores')
export class IdentityScore {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'owner_name_score', nullable: true })
  ownerNameScore: number;

  @Column({ name: 'phone_score', nullable: true })
  phoneScore: number;

  @Column({ name: 'email_score', nullable: true })
  emailScore: number;

  @Column({ name: 'address_score', nullable: true })
  addressScore: number;

  @OneToOne(
    (type) => BusinessOwner,
    (businessOwner: BusinessOwner) => businessOwner.identityScore,
    {},
  )
  @JoinColumn({ name: 'identity_score' })
  businessOwner: BusinessOwner;
}
