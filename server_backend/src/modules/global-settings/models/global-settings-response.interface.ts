import { ApiProperty } from '@nestjs/swagger';

export class GetGlobalSettingsResponse {
  @ApiProperty()
  maxReturnTermWOManualProcessing: number;

  @ApiProperty()
  r: number;

  @ApiProperty()
  m: number;

  @ApiProperty()
  a: number;

  @ApiProperty()
  raisingTimeLimit: number;

  @ApiProperty()
  applicationFee: number;

  @ApiProperty()
  minLoan: number;

  @ApiProperty()
  maxLoan: number;

  @ApiProperty()
  invalidTransactionPenalty: number;

  @ApiProperty()
  plaidTokenPenalty: number;
}
