import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsString, MaxLength, Min } from 'class-validator';

export class UpdateMonthlyReportDto {
  @ApiProperty({ required: false })
  @IsInt()
  monthlyReportId?: number;

  @ApiProperty({ required: true })
  @IsNumber()
  @Min(0)
  inflow: number;

  @ApiProperty({ required: false })
  @IsString()
  @MaxLength(500)
  inflowDescription: string;

  @ApiProperty({ required: true })
  @IsNumber()
  @Min(0)
  outflow: number;

  @ApiProperty({ required: false })
  @IsString()
  @MaxLength(500)
  outflowDescription: string;
}
