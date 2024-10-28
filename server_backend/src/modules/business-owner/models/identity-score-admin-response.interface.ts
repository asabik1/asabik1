import { ApiResponseProperty } from '@nestjs/swagger';
import { Address } from './address.intrerface';

export class IdentityScoreAdminResponse {
  @ApiResponseProperty()
  extractedName: string;

  @ApiResponseProperty()
  ownerNameScore: number;

  @ApiResponseProperty()
  extractedPhone: string;

  @ApiResponseProperty()
  phoneScore: number;

  @ApiResponseProperty()
  extractedEmail: string;

  @ApiResponseProperty()
  emailScore: number;

  @ApiResponseProperty()
  extractedAddress: Address;

  @ApiResponseProperty()
  addressScore: number;
}
