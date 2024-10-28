import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { BusinessSector } from './business-sector.entity';

@Entity('businesses')
export class Business {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(
    () => BusinessSector,
    (businessSectors) => businessSectors.business,
  )
  businessSectors: BusinessSector[];
}
