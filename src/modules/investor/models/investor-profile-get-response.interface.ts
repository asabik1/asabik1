import { ApiResponseProperty } from '@nestjs/swagger';

export class InvestorProfileGetResponse {
  @ApiResponseProperty()
  fullName: string;

  @ApiResponseProperty()
  email: string;

  @ApiResponseProperty()
  comapnyName: string;

  @ApiResponseProperty()
  website: string;

  @ApiResponseProperty()
  isVerified: boolean;
}
