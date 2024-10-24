import { ApiResponseProperty } from '@nestjs/swagger';

export class BusinessOwnerAlertsResponse {
  @ApiResponseProperty()
  isReportPending: boolean;

  @ApiResponseProperty()
  isProfileIncomplete: boolean;

  @ApiResponseProperty()
  isInvestmentRequestExpired: boolean;

  @ApiResponseProperty()
  isVerified: boolean;
}
