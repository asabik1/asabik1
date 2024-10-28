import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail } from 'class-validator';

export class EmailDto {
  @ApiProperty()
  @IsEmail()
  @Transform((param) => String(param.value).toLocaleLowerCase())
  email: string;
}
