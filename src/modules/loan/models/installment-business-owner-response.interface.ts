import { ApiProperty } from '@nestjs/swagger';
import { InstallmentData } from './installment-data.interface';

export class InstallmentBusinessOwnerResponse {
  @ApiProperty()
  no: string;

  @ApiProperty()
  paymentDate: string;

  @ApiProperty()
  totalRevenue: number;

  @ApiProperty()
  totalNetProfit: number;

  @ApiProperty()
  profitToShare: number;

  @ApiProperty()
  transfer: number;

  @ApiProperty({ type: InstallmentData })
  installmentData: InstallmentData;
}
