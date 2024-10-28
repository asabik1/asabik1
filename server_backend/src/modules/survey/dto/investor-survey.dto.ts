import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsString,
  IsUrl,
  ValidateIf,
} from 'class-validator';
import { InvestorSurveyQuestionDto } from './investor-survey-question.dto';

export class InvestorSurveyDto {
  @ApiProperty({ type: InvestorSurveyQuestionDto, isArray: true })
  @IsArray()
  @ArrayMinSize(1)
  questions: InvestorSurveyQuestionDto[];

  @ApiProperty()
  @ValidateIf((o) => 'fullName' in o)
  @IsString()
  @IsNotEmpty()
  fullName?: string;

  @ApiProperty({ required: false })
  @ValidateIf((o) => 'companyName' in o)
  @IsNotEmpty()
  @IsString()
  companyName?: string;

  @ApiProperty({ required: false })
  @ValidateIf((o) => 'website' in o)
  @IsUrl()
  @IsNotEmpty()
  website?: string;
}
