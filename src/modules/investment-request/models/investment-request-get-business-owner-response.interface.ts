import { LoanPurpose } from '../enum/loan-purpose.enum';
import { INVESTMENT_REQUEST_STATUS } from '../enum/investment-status-message.enum';
import { ApiProperty } from '@nestjs/swagger';

export class InvestmentRequestGetBusinessOwnerResponse {
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

  @ApiProperty()
  returnTerm: number;

  @ApiProperty()
  requiredCapital: number;

  @ApiProperty()
  netReturn: number;

  @ApiProperty()
  netReturnToShare: number;

  @ApiProperty({ enum: INVESTMENT_REQUEST_STATUS })
  status: INVESTMENT_REQUEST_STATUS;

  @ApiProperty()
  percentageRaised: number;

  @ApiProperty()
  timeLeft: string;

  @ApiProperty()
  isEligible: boolean;

  @ApiProperty()
  canEdit: boolean;
}
