import { ApiProperty } from '@nestjs/swagger';
import { LoanPurpose } from '../enum/loan-purpose.enum';
import { Rating } from '../enum/rating.enum';
import { INVESTMENT_REQUEST_STATUS } from '../enum/investment-status-message.enum';

export class InvestmentRequestGetAdminResponse {
  @ApiProperty()
  id: number;

  @ApiProperty({ enum: LoanPurpose })
  purposeOfTheLoan?: LoanPurpose;

  @ApiProperty()
  approvedAt: string;

  @ApiProperty()
  returnTerm: number;

  @ApiProperty()
  loanPurpose: string;

  @ApiProperty()
  helpIncreaseProfit: string;

  @ApiProperty()
  profitIncrease: number;

  @ApiProperty()
  requiredCapital: number;

  @ApiProperty()
  dti: string;

  @ApiProperty({ enum: Rating })
  rating: Rating;

  @ApiProperty({ enum: Rating })
  ratingUpdate: Rating;

  @ApiProperty({ enum: INVESTMENT_REQUEST_STATUS })
  status: INVESTMENT_REQUEST_STATUS;
}
