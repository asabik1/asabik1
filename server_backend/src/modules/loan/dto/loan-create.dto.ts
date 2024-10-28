import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateLoanDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  deposited: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  totalPayback: number;
}
