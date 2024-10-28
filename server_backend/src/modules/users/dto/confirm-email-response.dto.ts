import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Role } from '../../auth/enums/role.enum';

export class ConfirmEmailResponse {
  @ApiProperty()
  @IsString()
  role: Role;
}
