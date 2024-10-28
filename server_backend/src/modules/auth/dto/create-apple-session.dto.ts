import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateAppleSessionDto {
  @ApiProperty()
  @IsString()
  appleId: string;
}
