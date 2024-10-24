import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Max, Min } from 'class-validator';
import { RangesRow } from '../models/ranges.interface';

export class RangesUpdateDto {
  @ApiProperty()
  @Max(5)
  @Min(1)
  @IsInt()
  year: number;

  @ApiProperty()
  rows: RangesRow[];
}
