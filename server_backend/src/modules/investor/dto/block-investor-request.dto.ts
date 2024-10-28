import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class BlockInvestorRequest {
  @ApiProperty({ required: true })
  @IsBoolean()
  @IsNotEmpty()
  isBlocked: boolean;
}
