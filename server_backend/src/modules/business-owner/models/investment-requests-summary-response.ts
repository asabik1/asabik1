import { ApiResponseProperty } from '@nestjs/swagger';

export class InvestmentRequestsSummaryResponse {
  @ApiResponseProperty()
  projectedNetRunUpTo: number;

  @ApiResponseProperty()
  totalInvestedAmount: number;

  @ApiResponseProperty()
  numberOfInvestors: number;

  @ApiResponseProperty()
  totalRequiredInvestment: number;

  @ApiResponseProperty()
  minReturnTerm: number;
}
