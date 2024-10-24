import { ApiResponseProperty } from '@nestjs/swagger';

export class BusinessOwnerGetAdminResponse {
  @ApiResponseProperty()
  id: number;

  @ApiResponseProperty()
  companyName: string;

  @ApiResponseProperty()
  ownerName: string;

  @ApiResponseProperty()
  sector: string;

  @ApiResponseProperty()
  requiredInvestment: number;

  @ApiResponseProperty()
  isActive: boolean;

  @ApiResponseProperty()
  isVerified: boolean;
}
