import { ApiProperty } from '@nestjs/swagger';

export class BusinessGetResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}
