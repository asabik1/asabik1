import { ApiProperty } from '@nestjs/swagger';
import { RangesRowResponse } from './ranges-row-response.interface';

export class RangesResponse {
  @ApiProperty()
  yearOne: RangesRowResponse[];

  @ApiProperty()
  yearTwo: RangesRowResponse[];

  @ApiProperty()
  yearThree: RangesRowResponse[];

  @ApiProperty()
  yearFour: RangesRowResponse[];

  @ApiProperty()
  yearFive: RangesRowResponse[];
}
