import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsEnum, Matches, MinLength } from 'class-validator';
import { Role } from '../../auth/enums/role.enum';

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  @Transform((param) => String(param.value).toLocaleLowerCase())
  email: string;

  @ApiProperty()
  @MinLength(8)
  @Matches(/^(?=.*[A-Z])(?=.*\W)(?=.*\d).{8,}$/, {
    message: 'Your password does not meet the criteria!',
  })
  password: string;

  @ApiProperty({ enum: Role })
  @IsEnum(Role)
  role: Role;
}
