import { ApiResponseProperty } from '@nestjs/swagger';

export class InvestmentGetAdminResponse {
  @ApiResponseProperty()
  businessOwnerId: number;

  @ApiResponseProperty()
  companyName: string;

  @ApiResponseProperty()
  businessOwnersName: string;

  @ApiResponseProperty()
  businessSector: string;

  @ApiResponseProperty()
  isActive: boolean;

  @ApiResponseProperty()
  requiredInvestment: number;

  @ApiResponseProperty()
  alreadyInvested: number;

  @ApiResponseProperty()
  investmentRequestId: number;

  @ApiResponseProperty()
  isLoan: boolean;
}
