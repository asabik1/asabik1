import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsNotEmpty } from 'class-validator';

export class DecideInvestmentRequest {
  @ApiProperty({ required: true })
  @IsInt()
  @IsNotEmpty()
  investmentRequestId: number;

  @ApiProperty({ required: true })
  @IsBoolean()
  @IsNotEmpty()
  isApproved: boolean;
}
