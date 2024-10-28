import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, MaxLength, Min, MinLength } from 'class-validator';

export class UpdateInvestmentRequestDto {
  @ApiProperty()
  @IsString()
  @MinLength(500)
  @MaxLength(2400)
  loanPurpose: string;

  @ApiProperty()
  @IsString()
  @MinLength(500)
  @MaxLength(2400)
  helpIncreaseProfit: string;

  @ApiProperty()
  @Min(0)
  @IsInt()
  netReturn: number;

  @ApiProperty()
  @Min(0)
  @IsInt()
  netReturnToShare: number;
}
