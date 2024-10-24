import { ApiResponseProperty } from '@nestjs/swagger';
import { Address } from '../../business-owner/models/address.intrerface';

export class ExtractedIdentityResponse {
  @ApiResponseProperty()
  extractedName?: string;

  @ApiResponseProperty()
  extractedPhone?: string;

  @ApiResponseProperty()
  extractedEmail?: string;

  @ApiResponseProperty()
  extractedAddress?: Address;
}
