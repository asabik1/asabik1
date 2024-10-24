import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class EmailConfirmationTokenDto {
  @ApiProperty()
  @IsString()
  token: string;
}
