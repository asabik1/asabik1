import { ApiProperty } from '@nestjs/swagger';

export class BusinessSubsectorGetResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}
