import { ApiResponseProperty } from '@nestjs/swagger';
import { BusinessStructure } from '../enum/business-structure.enum';
import { SurveyValidations } from './survey-validations.interface';

export class BusinessOwnerSurveyAnswers {
  @ApiResponseProperty()
  id: number;

  @ApiResponseProperty()
  startDate: string;

  @ApiResponseProperty()
  business: string;

  @ApiResponseProperty()
  businessSector: string;

  @ApiResponseProperty()
  businessSubsector: string;

  @ApiResponseProperty()
  businessStructure: BusinessStructure;

  @ApiResponseProperty()
  avrMonthlySales: number;

  @ApiResponseProperty()
  avrMonthlyNetProfit: number;

  @ApiResponseProperty()
  totalLastYearNetProfit: number;

  @ApiResponseProperty()
  employeesNo: number;

  @ApiResponseProperty()
  website?: string;

  @ApiResponseProperty()
  loanPurpose: string;

  @ApiResponseProperty()
  businessOwnerDescription: string;

  @ApiResponseProperty()
  surveyValidations: SurveyValidations;
}
