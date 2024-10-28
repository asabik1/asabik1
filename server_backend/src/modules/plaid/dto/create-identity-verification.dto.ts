import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateIdentityVerificationDto {
  @ApiProperty()
  @IsString()
  usSocialSecurityNumber: string;
}
