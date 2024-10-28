import { ApiProperty } from '@nestjs/swagger';
import { Rating } from '../../investment-request/enum/rating.enum';

export class RangesRowResponse {
  @ApiProperty()
  rating: Rating;

  @ApiProperty()
  low: number;

  @ApiProperty()
  high: number;
}
