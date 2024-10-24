import { ApiProperty } from '@nestjs/swagger';

export class BusinessSectorGetResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}
