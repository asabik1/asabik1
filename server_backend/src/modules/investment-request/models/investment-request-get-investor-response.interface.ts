import { ApiProperty } from '@nestjs/swagger';
import { LoanPurpose } from '../enum/loan-purpose.enum';
import { Rating } from '../enum/rating.enum';
import { INVESTMENT_REQUEST_STATUS } from '../enum/investment-status-message.enum';

export class InvestmentRequestGetInvestorResponse {
  @ApiProperty()
  id: number;

  @ApiProperty({ enum: LoanPurpose })
  purposeOfTheLoan?: LoanPurpose;

  @ApiProperty()
  loanPurpose: string;

  @ApiProperty()
  helpIncreaseProfit: string;

  @ApiProperty()
  profitIncrease: number;

  @ApiProperty({ enum: Rating })
  rating: Rating;

  @ApiProperty()
  dti: string;

  @ApiProperty()
  projectedNetReturn: string;

  @ApiProperty()
  psr: string;

  @ApiProperty({ enum: INVESTMENT_REQUEST_STATUS })
  status: INVESTMENT_REQUEST_STATUS;

  @ApiProperty()
  expirationDate: string;

  @ApiProperty()
  returnTerm: number;

  @ApiProperty()
  requiredCapital: number;

  @ApiProperty()
  amountToMeetTarget: number;

  @ApiProperty()
  netReturnToShare: number;

  @ApiProperty()
  numberOfInvestors: number;
}
