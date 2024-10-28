import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class ConfirmMonthlyReportDto {
  @ApiProperty({ required: true })
  @IsInt()
  monthlyReportId: number;
}
