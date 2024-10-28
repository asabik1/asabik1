import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class ParseMonthlyReportDto {
  @ApiProperty({ required: true })
  @IsString()
  date: Date;

  @ApiProperty({ required: true })
  @IsNumber()
  inflow: number;

  @ApiProperty({ required: true })
  @IsNumber()
  outflow: number;
}
