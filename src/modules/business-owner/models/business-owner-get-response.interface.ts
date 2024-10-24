import { ApiResponseProperty } from '@nestjs/swagger';
import { Rating } from '../../investment-request/enum/rating.enum';
import { BusinessSubsectorDetailsGetResponse } from '../../business/models/business-subsector-details-get-response.interface';
import { BusinessStructure } from '../enum/business-structure.enum';

export class BusinessOwnerGetResponse {
  @ApiResponseProperty()
  id: number;

  @ApiResponseProperty()
  investmentRequestId?: number;

  @ApiResponseProperty()
  isInvested: boolean;

  @ApiResponseProperty()
  isRepaying: boolean;

  @ApiResponseProperty()
  investedAmount: number;

  @ApiResponseProperty()
  companyName: string;

  @ApiResponseProperty({ enum: Rating })
  rating: Rating;

  @ApiResponseProperty()
  projectedNetReturn: string;

  @ApiResponseProperty()
  psr: string;

  @ApiResponseProperty()
  expirationDate: string;

  @ApiResponseProperty()
  returnTerm: number;

  @ApiResponseProperty()
  amountToMeetTarget: number;

  @ApiResponseProperty({ type: BusinessSubsectorDetailsGetResponse })
  businessSubsector: BusinessSubsectorDetailsGetResponse;

  @ApiResponseProperty()
  businessStructure: BusinessStructure;
}
