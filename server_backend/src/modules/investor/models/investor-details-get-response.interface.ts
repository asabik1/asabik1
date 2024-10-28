import { ApiResponseProperty } from '@nestjs/swagger';
import { InvestmentGetAdminResponse } from '../../investment/model/investment-get-admin-response.interface';
import { ExtractedIdentityResponse } from './extracted-identity-response.interface';

export class InvestorDetailsGetResponse {
  @ApiResponseProperty()
  id: number;

  @ApiResponseProperty()
  companyName: string;

  @ApiResponseProperty()
  fullName: string;

  @ApiResponseProperty()
  registrationDate: Date;

  @ApiResponseProperty()
  totalInvestments: number;

  @ApiResponseProperty()
  email: string;

  @ApiResponseProperty()
  website: string;

  @ApiResponseProperty()
  isActive: boolean;

  @ApiResponseProperty()
  isBlocked: boolean;

  @ApiResponseProperty()
  investments: InvestmentGetAdminResponse[];

  @ApiResponseProperty()
  extractedIdentity?: ExtractedIdentityResponse;

  @ApiResponseProperty()
  isVerified: boolean;
}
