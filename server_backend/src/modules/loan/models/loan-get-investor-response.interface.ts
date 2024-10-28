import { ApiProperty } from '@nestjs/swagger';
import { InstallmentInvestorResponse } from './installment-investor-response.interface';

export class GetLoanInvestorResponse {
  @ApiProperty()
  declaredProfitToShare: number;

  @ApiProperty()
  raisedFunds: number;

  @ApiProperty()
  invested: number;

  @ApiProperty()
  investedPercentage: string;

  @ApiProperty()
  installments: InstallmentInvestorResponse[];
}
