import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, Max, Min } from 'class-validator';
import { Rating } from '../../investment-request/enum/rating.enum';

export class RangesRowUpdateDto {
  @ApiProperty()
  @IsEnum({ type: Rating })
  rating: Rating;

  @ApiProperty()
  @Min(0)
  @Max(1)
  @IsNumber()
  low: number;

  @ApiProperty()
  @Min(0)
  @Max(1)
  @IsNumber()
  high: number;
}
