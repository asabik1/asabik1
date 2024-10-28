import { ApiResponseProperty } from '@nestjs/swagger';

export class ChartPoint {
  @ApiResponseProperty()
  reportDateAsX: string;

  @ApiResponseProperty()
  inflowAsY: number;

  @ApiResponseProperty()
  outflowAsY: number;
}
