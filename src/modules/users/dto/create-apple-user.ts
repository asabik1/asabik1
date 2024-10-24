import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum, IsEmail } from 'class-validator';
import { Role } from '../../auth/enums/role.enum';
import { Transform } from 'class-transformer';

export class CreateAppleUserDto {
  @ApiProperty()
  @IsString()
  appleId: string;

  @ApiProperty()
  @IsEmail()
  @Transform((param) => String(param.value).toLocaleLowerCase())
  email: string;

  @ApiProperty({ enum: Role })
  @IsEnum(Role)
  role: Role;
}
