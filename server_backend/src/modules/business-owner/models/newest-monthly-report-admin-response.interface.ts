import { ApiResponseProperty } from '@nestjs/swagger';

export class NewestMonthlyReportAdminResponse {
  @ApiResponseProperty()
  actionRequired: boolean;

  @ApiResponseProperty()
  reportDate: string;

  @ApiResponseProperty()
  isConfirmed: boolean;

  @ApiResponseProperty()
  isOriginal: boolean;

  @ApiResponseProperty()
  inflow: number;

  @ApiResponseProperty()
  inflowDescription: string;

  @ApiResponseProperty()
  outflow: number;

  @ApiResponseProperty()
  outflowDescription: string;

  @ApiResponseProperty()
  vInflow: number;

  @ApiResponseProperty()
  vTotal: number;

  @ApiResponseProperty()
  outflowExceed: boolean;

  @ApiResponseProperty()
  isNegativeBalance: boolean;

  @ApiResponseProperty()
  noEarning: boolean;
}
