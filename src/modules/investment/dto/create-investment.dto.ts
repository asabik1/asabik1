import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive } from 'class-validator';

export class CreateInvestmentDto {
  @ApiProperty()
  @IsPositive()
  investmentRequestId: number;

  @ApiProperty()
  @IsInt()
  @IsPositive()
  amount: number;
}
