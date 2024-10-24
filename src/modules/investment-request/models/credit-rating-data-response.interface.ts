import { ApiProperty } from '@nestjs/swagger';
import { Rating } from '../enum/rating.enum';

export class CreditRatingDataResponse {
  @ApiProperty()
  psr: string;

  @ApiProperty()
  r: number;

  @ApiProperty()
  m: number;

  @ApiProperty()
  a: number;

  @ApiProperty()
  returnTerm: number;

  @ApiProperty()
  requestedAmount: number;

  @ApiProperty()
  netReturn: number;

  @ApiProperty()
  netReturnToShare: number;

  @ApiProperty()
  totalNoMonth: number;

  @ApiProperty()
  outflowExceed: number;

  @ApiProperty()
  negativeBalance: number;

  @ApiProperty()
  noEarning: number;

  @ApiProperty()
  vInflow: number;

  @ApiProperty()
  vTotal: number;

  @ApiProperty()
  averageE: number;

  @ApiProperty()
  averageL: number;

  @ApiProperty()
  o: number;

  @ApiProperty()
  i: number;

  @ApiProperty()
  d1: number;

  @ApiProperty()
  d2: number;

  @ApiProperty()
  d0: number;

  @ApiProperty()
  pod: number;

  @ApiProperty()
  maxLoanCalc: number;

  @ApiProperty({ enum: Rating })
  rating: Rating;

  @ApiProperty()
  low: number;

  @ApiProperty()
  high: number;
}
