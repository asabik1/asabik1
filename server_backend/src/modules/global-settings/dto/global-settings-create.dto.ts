import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export class CreateGlobalSettingsDto {
  @ApiProperty()
  @IsInt()
  @Max(5)
  @Min(0)
  @IsNotEmpty()
  maxReturnTermWOManualProcessing: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  r: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  m: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  a: number;

  @ApiProperty()
  @IsInt()
  @Min(0)
  @IsNotEmpty()
  raisingTimeLimit: number;

  @ApiProperty()
  @IsInt()
  @Min(0)
  @IsNotEmpty()
  applicationFee: number;

  @ApiProperty()
  @IsInt()
  @Min(0)
  @IsNotEmpty()
  minLoan: number;

  @ApiProperty()
  @IsInt()
  @Min(0)
  @IsNotEmpty()
  maxLoan: number;

  @ApiProperty()
  @IsInt()
  @Min(0)
  @IsNotEmpty()
  invalidTransactionPenalty: number;

  @ApiProperty()
  @IsInt()
  @Min(0)
  @IsNotEmpty()
  plaidTokenPenalty: number;
}
