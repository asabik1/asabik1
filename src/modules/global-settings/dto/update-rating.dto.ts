import { ApiProperty } from '@nestjs/swagger';
import { ArrayMaxSize, ArrayMinSize, IsArray, IsInt } from 'class-validator';
import { RangesRowUpdateDto } from './ranges-row-update.dto';

export class UpdateRatingDto {
  @ApiProperty()
  @IsInt()
  year: number;

  @ApiProperty({ type: RangesRowUpdateDto, isArray: true })
  @IsArray()
  @ArrayMinSize(11)
  @ArrayMaxSize(11)
  rangesRowUpdate: RangesRowUpdateDto[];
}
