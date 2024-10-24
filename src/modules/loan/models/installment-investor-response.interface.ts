import { ApiProperty } from '@nestjs/swagger';
import { InstallmentData } from './installment-data.interface';

export class InstallmentInvestorResponse {
  @ApiProperty()
  no: string;

  @ApiProperty()
  paymentDate: string;

  @ApiProperty()
  totalNetProfit: number;

  @ApiProperty()
  profitToShare: number;

  @ApiProperty()
  transfer: number;

  @ApiProperty()
  installmentData: InstallmentData;
}
