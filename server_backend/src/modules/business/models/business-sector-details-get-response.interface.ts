import { ApiProperty } from '@nestjs/swagger';
import { BusinessGetResponse } from './business-get-response.interface';

export class BusinessSectorDetailsGetResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty({ type: BusinessGetResponse })
  business: BusinessGetResponse;
}
