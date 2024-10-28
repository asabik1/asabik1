import { ApiProperty } from '@nestjs/swagger';
import { BusinessSectorDetailsGetResponse } from './business-sector-details-get-response.interface';

export class BusinessSubsectorDetailsGetResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty({ type: BusinessSectorDetailsGetResponse })
  businessSector: BusinessSectorDetailsGetResponse;
}
