import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsNotEmpty } from 'class-validator';

export class DecideMonthlyReport {
  @ApiProperty({ required: true })
  @IsInt()
  @IsNotEmpty()
  monthlyReportId: number;

  @ApiProperty({ required: true })
  @IsBoolean()
  @IsNotEmpty()
  isApproved: boolean;
}
