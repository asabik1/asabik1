import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BusinessOwner } from '../../business-owner/entities/business-owner.entity';

@Entity('files')
class File {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  filename: string;

  @Column({
    type: 'bytea',
    select: false,
  })
  data?: Uint8Array;

  @OneToOne(() => BusinessOwner)
  businessOwner: BusinessOwner;

  get url(): string {
    return `${process.env.BACK_END_URL}/api/files/${this.id}`;
  }
}

export default File;
