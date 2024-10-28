import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class BlockBusinessOwnerRequest {
  @ApiProperty({ required: true })
  @IsBoolean()
  @IsNotEmpty()
  isBlocked: boolean;
}
