export enum MESSAGE_TO_BUSINESS_OWNER {
  WRONG_LOAN_PURPOSE = 'We regret to inform you that Finance Debt Obligation is prohibited on our Platform.',
  FINANCIAL_REPORT_CONDITIONS_NOT_MET = 'We regret to inform you that your credit rating is not sufficient, please come back once your rating has improved.',
  LOAN_TERM_EXCEED = 'We regret to inform you that at this time we can only approve maximum of 3 years (36 months) loan, please change the term.',
  CREDIT_RATING_NOT_SUFFICIENT_FOR_GIVEN_TERM = 'We regret to inform you that your credit rating is not sufficient for the {years} year term, please try to change number of years.',
  SUCCESSFUL_CREDIT_RATING = 'Congratulations, you are approved for ${approvedLoan} loan. Please wait for the fund raising. The raised amount could be less than approved amount.',
  MINIMUM_LOAN_AMOUNT_NOT_MET = 'We regret to inform you that minimum loan to apply for is $2000.',
  MAXIMUM_LOAN_AMOUNT_NOT_MET = 'We regret to inform you that maximum loan to apply for is $50000.',
  LOW_CREDIT_RATING = 'Your credit rating is {creditRating} creditors might not be interested investing on lower credit rating companies or higher risk business.',
  OVER_3_YEARS_MANUAL_APPROVAL = 'You selected term over 3 years, your application would be send for manual processing.',
  MENUAL_PROCESSING_REJECTION = 'We regret to inform you that your Investment Request was rejected after a review.',
  FROM_SURVEY_REJECTED = 'We regret to inform you that your Investment Request was rejected.',
  LACKING_LAST_MONTHLY_REPORT = "You are lacking last month's Financial Report from Plaid. We cannot process your Investment Request.",
}
