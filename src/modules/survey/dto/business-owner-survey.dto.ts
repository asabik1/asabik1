import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { BusinessStructure } from '../../business-owner/enum/business-structure.enum';
import { CreateInvestmentRequestDto } from '../../investment-request/dto/investment-request-create.dto';

export class BusinessOwnerSurveyDto {
  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  businessStartDate: string;

  @ApiProperty({ type: CreateInvestmentRequestDto })
  @ValidateNested()
  @Type(() => CreateInvestmentRequestDto)
  investmentRequest: CreateInvestmentRequestDto;

  @ApiProperty({ enum: BusinessStructure })
  @IsEnum(BusinessStructure)
  @IsNotEmpty()
  businessStructure: BusinessStructure;

  @ApiProperty()
  @Min(0)
  @IsInt()
  avrMonthlySales: number;

  @ApiProperty()
  @Min(0)
  @IsInt()
  avrMonthlyNetProfit: number;

  @ApiProperty()
  @Min(0)
  @IsInt()
  totalLastYearNetProfit: number;

  @ApiProperty()
  @Min(1)
  @IsInt()
  employeesNo: number;

  @ApiProperty()
  @IsPositive()
  businessSubindustryId: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  website?: string;
}
