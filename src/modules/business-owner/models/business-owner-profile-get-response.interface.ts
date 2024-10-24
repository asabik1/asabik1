import { ApiProperty } from '@nestjs/swagger';
import { BusinessSubsectorDetailsGetResponse } from '../../business/models/business-subsector-details-get-response.interface';
import { InvestmentRequestGetBusinessOwnerResponse } from '../../investment-request/models/investment-request-get-business-owner-response.interface';

export class BusinessOwnerProfileGetResponse {
  @ApiProperty({ required: false })
  imgUrl?: string;

  @ApiProperty({ required: false })
  companyName?: string;

  @ApiProperty({ required: false })
  ownerName?: string;

  @ApiProperty({ required: false })
  street?: string;

  @ApiProperty({ required: false })
  city?: string;

  @ApiProperty({ required: false })
  zipCode?: string;

  @ApiProperty({ required: false })
  phone?: string;

  @ApiProperty({ required: false })
  website?: string;

  @ApiProperty({ type: BusinessSubsectorDetailsGetResponse })
  businessSubsector: BusinessSubsectorDetailsGetResponse;

  @ApiProperty({ required: false })
  businessDescription?: string;

  @ApiProperty({
    type: InvestmentRequestGetBusinessOwnerResponse,
    isArray: true,
  })
  investmentRequests: InvestmentRequestGetBusinessOwnerResponse[];

  @ApiProperty()
  isProfileComplete: boolean;

  @ApiProperty()
  isValidForRequest: boolean;
}
