import { ApiProperty } from '@nestjs/swagger';

export class InstallmentData {
  @ApiProperty()
  inflowDescription: string;

  @ApiProperty()
  outflowDescription: string;

  @ApiProperty()
  profitToShareInfo: string;
}
