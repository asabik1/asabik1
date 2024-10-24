import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { LoanPurpose } from '../enum/loan-purpose.enum';
import { AllowReturnTerms } from '../models/allowed-return-tems.const';

export class CreateInvestmentRequestDto {
  @ApiProperty({ enum: LoanPurpose })
  @IsEnum(LoanPurpose)
  @IsNotEmpty()
  purposeOfTheLoan: LoanPurpose;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  requiredCapital: number;

  @ApiProperty()
  @IsIn(AllowReturnTerms)
  @IsNotEmpty()
  returnTerm: number;

  @ApiProperty()
  @Min(0)
  @IsInt()
  netReturn: number;

  @ApiProperty()
  @Min(0)
  @IsInt()
  netReturnToShare: number;

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
  profitIncrease: number;
}
