import { BusinessStructure } from '../src/modules/business-owner/enum/business-structure.enum';
import { BusinessOwnerSurveyAnswers } from '../src/modules/business-owner/models/business-owner-survey-answers.interface';

export const mockBusinessOwnerSurveyAnswers: BusinessOwnerSurveyAnswers = {
  id: 1,
  startDate: '2023-01-15',
  business: 'Sample Business',
  businessSector: 'Technology',
  businessSubsector: 'Software Development',
  businessStructure: BusinessStructure.Corporation,
  avrMonthlySales: 50000,
  avrMonthlyNetProfit: 15000,
  totalLastYearNetProfit: 180000,
  employeesNo: 20,
  website: 'samplebusiness.com',
  loanPurpose: 'Working Capital',
  surveyValidations: {
    isStartDateValid: true,
    isBusinessSubsectorValid: true,
    isLoanPurposeValid: true,
  },
  businessOwnerDescription: 'Sample business description',
};
