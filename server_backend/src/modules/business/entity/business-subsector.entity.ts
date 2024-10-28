import { BusinessOwner } from '../../business-owner/entities/business-owner.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { BusinessSector } from './business-sector.entity';

@Entity('business_subsectors')
export class BusinessSubsector {
  @JoinColumn({ name: 'sector_id' })
  @ManyToOne(
    () => BusinessSector,
    (businessSectors) => businessSectors.businesSubsectors,
  )
  businessSector: BusinessSector;

  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  forbidden: boolean;

  @OneToMany(
    () => BusinessOwner,
    (businessOwner: BusinessOwner) => businessOwner.businessSubsector,
  )
  businessOwner: BusinessOwner;
}
