import { ApiProperty } from '@nestjs/swagger';
import { Rating } from '../enum/rating.enum';

export class InvestmentRequestGetDetailedResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  psr: string;

  @ApiProperty()
  projectedNetReturn: string;

  @ApiProperty()
  nextInstallmentAmount: number;

  @ApiProperty()
  nextInstallmentDate: string;

  @ApiProperty()
  nextPlaidVerifDate: string;

  @ApiProperty()
  finalPaymentAmount: number;

  @ApiProperty()
  finalPaymentDate: string;

  @ApiProperty()
  dti: string;

  @ApiProperty({ enum: Rating })
  rating: Rating;

  @ApiProperty()
  approvedAt: string;
}
