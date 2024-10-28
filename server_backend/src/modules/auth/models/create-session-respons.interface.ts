import { SurveyStatus } from 'src/modules/survey/models/survey-status.enum';
import { TokenWithExpirationTime } from './token-with-expiration-time.interface';

export interface CreateUserSessionResponse {
  isAppleUser: boolean;
  tokens: TokenWithExpirationTime;
  name?: string;
  email: string;
  role: string;
  emailConfirmed: boolean;
  surveyStatus: SurveyStatus;
}
