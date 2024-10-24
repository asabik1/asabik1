import { ApiProperty } from '@nestjs/swagger';
import { InstallmentBusinessOwnerResponse } from './installment-business-owner-response.interface';

export class GetLoanBusinessOwnerResponse {
  @ApiProperty()
  declaredMotnhlyProfit: number;

  @ApiProperty()
  declaredProfitToShare: number;

  @ApiProperty()
  psr: string;

  @ApiProperty({
    type: InstallmentBusinessOwnerResponse,
    isArray: true,
  })
  installments: InstallmentBusinessOwnerResponse[];
}
