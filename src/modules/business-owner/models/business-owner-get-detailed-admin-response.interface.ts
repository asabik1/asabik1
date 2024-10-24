import { ApiResponseProperty } from '@nestjs/swagger';
import { Address } from './address.intrerface';
import { InvestmentRequestGetAdminResponse } from '../../investment-request/models/investment-request-get-admin-response.interface';

export class BusinessOwnerGetDetailedAdminResponse {
  @ApiResponseProperty()
  id: number;

  @ApiResponseProperty()
  companyName: string;

  @ApiResponseProperty()
  registrationDate: Date;

  @ApiResponseProperty()
  ownerName: string;

  @ApiResponseProperty()
  sector: string;

  @ApiResponseProperty()
  address: Address;

  @ApiResponseProperty()
  receivedInvestments: number;

  @ApiResponseProperty()
  requiredInvestments: number;

  @ApiResponseProperty()
  phoneNumber: string;

  @ApiResponseProperty()
  email: string;

  @ApiResponseProperty()
  isActive: boolean;

  @ApiResponseProperty()
  isBlocked: boolean;

  @ApiResponseProperty()
  isReportAvailable: boolean;

  @ApiResponseProperty()
  investors: any[];

  @ApiResponseProperty()
  investmentRequests: InvestmentRequestGetAdminResponse[];

  @ApiResponseProperty()
  isVerified: boolean;
}
