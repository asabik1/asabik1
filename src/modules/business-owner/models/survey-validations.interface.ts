import { ApiResponseProperty } from '@nestjs/swagger';

export class SurveyValidations {
  @ApiResponseProperty()
  isStartDateValid: boolean;

  @ApiResponseProperty()
  isBusinessSubsectorValid: boolean;

  @ApiResponseProperty()
  isLoanPurposeValid: boolean;
}
