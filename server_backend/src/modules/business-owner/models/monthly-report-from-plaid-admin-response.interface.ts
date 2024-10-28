import { ApiResponseProperty } from '@nestjs/swagger';

export class MonthlyReportFromPlaidAdminResponse {
  @ApiResponseProperty()
  reportDate: string;

  @ApiResponseProperty()
  inflow: number;

  @ApiResponseProperty()
  outflow: number;

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
