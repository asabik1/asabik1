import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Business } from './business.entity';
import { BusinessSubsector } from './business-subsector.entity';

@Entity('business_sectors')
export class BusinessSector {
  @JoinColumn({ name: 'business_id' })
  @ManyToOne(() => Business, (businesses) => businesses.businessSectors)
  business: Business;

  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(
    () => BusinessSubsector,
    (businessSubsectors) => businessSubsectors.businessSector,
  )
  businesSubsectors: BusinessSubsector[];
}
