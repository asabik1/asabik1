import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';

export class CreateSessionDto {
  @ApiProperty()
  @IsString()
  @IsEmail()
  @Transform((param) => String(param.value).toLocaleLowerCase())
  email: string;

  @ApiProperty()
  @IsString()
  password: string;
}
