import { ApiResponseProperty } from '@nestjs/swagger';

export class MonthlyReportUsersUpdateAdminResponse {
  @ApiResponseProperty()
  reportDate: string;

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
