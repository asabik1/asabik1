import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, Max, Min } from 'class-validator';

export class UpdateGlobalSettingsDto {
  @ApiProperty()
  @IsInt()
  @Max(5)
  @Min(0)
  maxReturnTermWOManualProcessing: number;

  @ApiProperty()
  @IsNumber()
  r: number;

  @ApiProperty()
  @IsNumber()
  m: number;

  @ApiProperty()
  @IsNumber()
  a: number;

  @ApiProperty()
  @IsInt()
  @Min(0)
  raisingTimeLimit: number;

  @ApiProperty()
  @IsInt()
  @Min(0)
  applicationFee: number;

  @ApiProperty()
  @IsInt()
  @Min(0)
  minLoan: number;

  @ApiProperty()
  @IsInt()
  @Min(0)
  maxLoan: number;

  @ApiProperty()
  @IsInt()
  @Min(0)
  invalidTransactionPenalty: number;

  @ApiProperty()
  @IsInt()
  @Min(0)
  plaidTokenPenalty: number;
}
