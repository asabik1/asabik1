import { ApiResponseProperty } from '@nestjs/swagger';

export class InvestorGetResponse {
  @ApiResponseProperty()
  id: number;

  @ApiResponseProperty()
  companyName: string;

  @ApiResponseProperty()
  fullName: string;

  @ApiResponseProperty()
  joined: Date;

  @ApiResponseProperty()
  alreadyInvested: number;

  @ApiResponseProperty()
  isActive: boolean;

  @ApiResponseProperty()
  isVerified: boolean;
}
