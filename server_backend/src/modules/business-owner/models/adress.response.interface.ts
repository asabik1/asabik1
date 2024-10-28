import { ApiResponseProperty } from '@nestjs/swagger';

export class AdressResponse {
  @ApiResponseProperty()
  street: string;

  @ApiResponseProperty()
  city: string;

  @ApiResponseProperty()
  zipcode: string;
}
