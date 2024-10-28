import { Rating } from '../enum/rating.enum';

export interface RangesRow {
  rating: Rating;
  valueRange: [number, number];
}
