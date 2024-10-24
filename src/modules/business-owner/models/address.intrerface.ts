import { ApiResponseProperty } from '@nestjs/swagger';

export class Address {
  @ApiResponseProperty()
  city?: string;

  @ApiResponseProperty()
  street?: string;

  @ApiResponseProperty()
  zipCode?: string;
}
