import { Rating } from '../../investment-request/enum/rating.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('rating_range')
export class RatingRange {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'year' })
  year: number;

  @Column({ name: 'rating', enum: Rating })
  rating: Rating;

  @Column({ name: 'low', type: 'float' })
  low: number;

  @Column({ name: 'high', type: 'float' })
  high: number;
}
