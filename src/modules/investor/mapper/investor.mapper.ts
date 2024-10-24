import { Investor } from '../entities/investor.entity';
import { InvestorProfileGetResponse } from '../models/investor-profile-get-response.interface';
import { InvestorGetResponse } from '../models/investor-get-response.interface';
import {
  countInvestedAmountForBusinessOwner,
  countTotalRequiredInvestment,
  sumInvestments,
} from '../../../helpers/investment-requests-counters';
import { SurveyStatus } from '../../survey/models/survey-status.enum';
import { InvestorDetailsGetResponse } from '../models/investor-details-get-response.interface';
import { toInvestmentGetAdminResponse } from '../../investment/mapper/investment.mapper';
import { UserIdentity } from '../../plaid/models/user-identy.interface';
import { Address } from '../../business-owner/models/address.intrerface';

export function toInvestorProfileGetResponse(
  email: string,
  investor: Investor,
): InvestorProfileGetResponse {
  let isVerified = false;
  if (investor.user.isVerified === true) {
    isVerified = true;
  }

  return {
    fullName: investor.fullName,
    email: email,
    comapnyName: investor.companyName,
    website: investor.website,
    isVerified: isVerified,
  };
}

export function toInvestorGetResponse(investor: Investor): InvestorGetResponse {
  let isVerified = false;
  if (investor.user.isVerified === true) {
    isVerified = true;
  }

  return {
    id: investor.id,
    companyName: investor.companyName,
    fullName: investor.fullName,
    joined: investor.user?.createdAt,
    alreadyInvested: sumInvestments(investor.investments),
    isActive:
      investor.user?.plaidToken &&
      investor.user?.emailConfirmed &&
      investor.user?.surveyStatus == SurveyStatus.QUALIFIES,
    isVerified: isVerified,
  };
}

export function toInvestorDetailsGetResponse(
  investor: Investor,
  userIdentity: UserIdentity,
): InvestorDetailsGetResponse {
  let extractedName: string = null;
  let extractedPhone: string = null;
  let extractedEmail: string = null;
  let extractedAddress: Address = null;

  if (userIdentity !== null) {
    extractedName = userIdentity.name;
    extractedPhone = userIdentity.phone;
    extractedEmail = userIdentity.email;
    extractedAddress = {
      city: userIdentity.city,
      street: userIdentity.street,
      zipCode: userIdentity.zip,
    };
  }

  let isVerified = false;
  if (investor.user.isVerified === true) {
    isVerified = true;
  }

  return {
    id: investor.id,
    companyName: investor.companyName,
    fullName: investor.fullName,
    registrationDate: investor.user?.createdAt,
    totalInvestments: sumInvestments(investor.investments),
    email: investor.user?.email,
    website: investor.website,
    isActive:
      investor.user?.plaidToken &&
      investor.user?.emailConfirmed &&
      investor.user?.surveyStatus == SurveyStatus.QUALIFIES,
    isBlocked: investor.user.surveyStatus == SurveyStatus.BLOCKED,
    investments: investor.investments
      .filter(
        (x, index) =>
          investor.investments.findIndex(
            (investment) =>
              investment.investmentRequest.businessOwner.id ==
              x.investmentRequest.businessOwner.id,
          ) == index,
      )
      .map((investment) => toInvestmentGetAdminResponse(investment, investor))
      .filter((x) => x.alreadyInvested > 0),
    extractedIdentity: {
      extractedName: extractedName,
      extractedPhone: extractedPhone,
      extractedEmail: extractedEmail,
      extractedAddress: extractedAddress,
    },
    isVerified: isVerified,
  };
}
