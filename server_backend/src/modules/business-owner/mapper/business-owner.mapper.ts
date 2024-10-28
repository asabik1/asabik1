import { BusinessOwner } from '../entities/business-owner.entity';
import {
  countTotalRequiredInvestment,
  getAllInvestors,
  countTotalInvestedAmount,
  countInvestmentsRequestsSummary,
  countInvestedAmountByInvestor,
  getNewestInvestmentRequest,
  projectedNetReturn,
  sumInvestments,
  profitSharingRatio,
} from '../../../helpers/investment-requests-counters';
import { BusinessOwnerGetResponse } from '../models/business-owner-get-response.interface';
import { BusinessOwnerGetAdminResponse } from '../models/business-owner-get-admin-response.interface';
import { BusinessOwnerGetDetailedResponse } from '../models/business-owner-get-detailed-response.interface';
import { BusinessOwnerGetDetailedAdminResponse } from '../models/business-owner-get-detailed-admin-response.interface';
import { BusinessOwnerProfilePreviewGetResponse } from '../models/business-owner-profile-preview-get-response.interface';
import { BusinessOwnerProfileGetResponse } from '../models/business-owner-profile-get-response.interface';
import {
  dateToReportString,
  dateToString,
  isInvestedInRequestByInvestor,
  toInvestmentRequestGetAdminResponse,
  toInvestmentRequestGetBusinessOwnerResponse,
  toInvestmentRequestGetInvestorResponse,
} from '../../investment-request/mapper/investment-request.mapper';
import { INVESTMENT_REQUEST_STATUS } from '../../investment-request/enum/investment-status-message.enum';
import { SurveyStatus } from '../../survey/models/survey-status.enum';
import { InvestmentRequest } from '../../investment-request/entities/investment-request.entity';
import { BusinessOwnerSurveyAnswers } from '../models/business-owner-survey-answers.interface';
import { LoanPurpose } from '../../investment-request/enum/loan-purpose.enum';
import { MonthlyReport } from '../entities/monthly-report.entity';
import { MonthlyReportAdminResponse } from '../models/monthly-report-admin-response.interface';
import { ChartPoint } from '../models/chart-point.interface';
import { NewestMonthlyReportAdminResponse } from '../models/newest-monthly-report-admin-response.interface';
import { AdminCharts } from '../models/admin-charts.interface';
import { RequestsByPurpose } from '../models/requests-by-purpose.interface';
import { ParseMonthlyReportDto } from '../dto/parse-monthly-report.dto';
import { IdentityScore } from '../entities/identity-score.entity';
import { IdentityScoreAdminResponse } from '../models/identity-score-admin-response.interface';
import { UserIdentity } from '../../plaid/models/user-identy.interface';

export function toBusinessOwnerProfilePreviewGetResponse(
  businessOwner: BusinessOwner,
  isValidForRequest: boolean,
): BusinessOwnerProfilePreviewGetResponse {
  return {
    imgUrl: businessOwner?.image?.url,
    companyName: businessOwner.companyName,
    ownerName: businessOwner.ownerName,
    street: businessOwner.street,
    city: businessOwner.city,
    zipCode: businessOwner.zipCode,
    phone: businessOwner.phone,
    website: businessOwner.website,
    businessSubsector: businessOwner?.businessSubsector,
    businessDescription: businessOwner.description,
    startDate: dateToString(businessOwner.startDate),
    avrMonthlySales: businessOwner.avrMonthlySales,
    avrMonthlyNetProfit: businessOwner.avrMonthlyNetProfit,
    totalLastYearNetProfit: businessOwner.totalLastYearNetProfit,
    employeesNo: businessOwner.employeesNo,
    investmentRequests: toInvestmentRequestGetInvestorResponse(
      businessOwner.investmentRequests,
    ),
    isProfileComplete: businessOwner.isProfileComplete,
    isValidForRequest: isValidForRequest,
    investmentsRequestsSummary: countInvestmentsRequestsSummary(
      businessOwner.investmentRequests,
    ),
  };
}

export function toBusinessOwnerProfileGetResponse(
  businessOwner: BusinessOwner,
  isValidForRequest: boolean,
): BusinessOwnerProfileGetResponse {
  return {
    imgUrl: businessOwner?.image?.url,
    companyName: businessOwner.companyName,
    ownerName: businessOwner.ownerName,
    street: businessOwner.street,
    city: businessOwner.city,
    zipCode: businessOwner.zipCode,
    phone: businessOwner.phone,
    website: businessOwner.website,
    businessSubsector: businessOwner?.businessSubsector,
    businessDescription: businessOwner.description,
    investmentRequests: businessOwner.investmentRequests
      .filter(
        (investmentRequest) =>
          investmentRequest.status ==
            INVESTMENT_REQUEST_STATUS.PROCESSING_FROM_SURVEY ||
          investmentRequest.status == INVESTMENT_REQUEST_STATUS.OPEN ||
          investmentRequest.status == INVESTMENT_REQUEST_STATUS.CLOSED ||
          investmentRequest.status ==
            INVESTMENT_REQUEST_STATUS.MANUAL_PROCESSING ||
          investmentRequest.status == INVESTMENT_REQUEST_STATUS.TRANSFERED,
      )
      .map((investmentRequest) =>
        toInvestmentRequestGetBusinessOwnerResponse(investmentRequest),
      ),
    isProfileComplete: businessOwner.isProfileComplete,
    isValidForRequest: isValidForRequest,
  };
}

export function toBusinessOwnerGetResponse(
  investorId: number,
  businessOwner: BusinessOwner,
  isInvested: boolean,
): BusinessOwnerGetResponse {
  const investmentRequest = getNewestInvestmentRequest(
    businessOwner.investmentRequests,
  );

  return {
    id: businessOwner.id,
    investmentRequestId: investmentRequest.id ?? null,
    isInvested: isInvested,
    isRepaying:
      isInvestedInRequestByInvestor(investorId, investmentRequest) &&
      investmentRequest.loan !== null,
    investedAmount: countInvestedAmountByInvestor(
      businessOwner.investmentRequests,
      investorId,
    ),
    companyName: businessOwner.companyName,
    rating: investmentRequest.rating,
    projectedNetReturn: projectedNetReturn(investmentRequest),
    psr: profitSharingRatio(investmentRequest),
    expirationDate: dateToString(investmentRequest.expiresAt),
    returnTerm: investmentRequest.returnTerm,
    amountToMeetTarget:
      investmentRequest.requiredCapital -
      sumInvestments(investmentRequest.investments),
    businessSubsector: businessOwner.businessSubsector,
    businessStructure: businessOwner.businessStructure,
  };
}

export function toBusinessOwnerGetDetailedResponse(
  businessOwner: BusinessOwner,
): BusinessOwnerGetDetailedResponse {
  return {
    imgUrl: businessOwner?.image?.url,
    companyName: businessOwner.companyName,
    description: businessOwner.description,
    ownerName: businessOwner.ownerName,
    businessSubsector: businessOwner.businessSubsector,
    startDate: dateToString(businessOwner.startDate),
    avrMonthlySales: businessOwner.avrMonthlySales,
    avrMonthlyNetProfit: businessOwner.avrMonthlyNetProfit,
    totalLastYearNetProfit: businessOwner.totalLastYearNetProfit,
    employeesNo: businessOwner.employeesNo,
    phone: businessOwner.phone,
    website: businessOwner.website,
    adress: {
      city: businessOwner.city,
      street: businessOwner.street,
      zipcode: businessOwner.zipCode,
    },
    investmentRequests: toInvestmentRequestGetInvestorResponse(
      businessOwner.investmentRequests,
    ),
  };
}

export function toBusinessOwnerGetAdminResponse(
  businessOwner: BusinessOwner,
): BusinessOwnerGetAdminResponse {
  let isVerified = false;
  if (businessOwner.user.isVerified === true) {
    isVerified = true;
  }

  return {
    id: businessOwner.id,
    companyName: businessOwner.companyName,
    ownerName: businessOwner.ownerName,
    sector: businessOwner.businessSubsector?.businessSector?.name,
    requiredInvestment: countTotalRequiredInvestment(
      businessOwner.investmentRequests,
    ),
    isActive:
      businessOwner.isProfileComplete &&
      (businessOwner.user.surveyStatus ?? false) == SurveyStatus.QUALIFIES,
    isVerified: isVerified,
  };
}

export function toBusinessOwnerGetDetailedAdminResponse(
  businessOwner: BusinessOwner,
  monthlyReport: MonthlyReport,
): BusinessOwnerGetDetailedAdminResponse {
  let isReportAvailable = false;
  if (monthlyReport) {
    if (
      monthlyReport.originalMonthlyReport !== null &&
      monthlyReport.isConfirmed == false
    ) {
      isReportAvailable = true;
    }
  }

  let isVerified = false;
  if (businessOwner.user.isVerified === true) {
    isVerified = true;
  }

  return {
    id: businessOwner.id,
    companyName: businessOwner.companyName,
    registrationDate: businessOwner.user.createdAt,
    ownerName: businessOwner.ownerName,
    sector: businessOwner.businessSubsector?.businessSector?.name,
    address: {
      city: businessOwner.city,
      street: businessOwner.street,
      zipCode: businessOwner.zipCode,
    },
    receivedInvestments: countTotalInvestedAmount(
      businessOwner.investmentRequests,
    ),
    requiredInvestments: countTotalRequiredInvestment(
      businessOwner.investmentRequests,
    ),
    phoneNumber: businessOwner.phone,
    email: businessOwner?.user?.email,
    isActive:
      businessOwner.isProfileComplete &&
      (businessOwner.user.surveyStatus ?? false) == SurveyStatus.QUALIFIES,
    isBlocked: businessOwner.user.surveyStatus == SurveyStatus.BLOCKED,
    isReportAvailable: isReportAvailable,
    investors: getAllInvestors(businessOwner.investmentRequests),
    investmentRequests: businessOwner.investmentRequests.map(
      (investmentRequest) =>
        toInvestmentRequestGetAdminResponse(investmentRequest),
    ),
    isVerified: isVerified,
  };
}

export function toBusinessOwnerSurveyAnswers(
  businessOwner: BusinessOwner,
  investmentRequest: InvestmentRequest,
): BusinessOwnerSurveyAnswers {
  const business = businessOwner.businessSubsector.businessSector.business;
  const businessSector = businessOwner.businessSubsector.businessSector;
  const businessSubsector = businessOwner.businessSubsector;

  let businessId = business.id.toString();
  if (business.id > 999) {
    businessId =
      business.id.toString().substring(0, 2) +
      business.id.toString().substring(2);
  }

  let loanPurpose = '-';
  if (investmentRequest !== null) {
    loanPurpose = investmentRequest.purposeOfTheLoan;
  }

  let businessOwnerDescription = '-';
  if (businessOwner.description !== null) {
    businessOwnerDescription = businessOwner.description;
  }

  return {
    id: businessOwner.id,
    startDate: dateToString(businessOwner.startDate),
    business: businessId + ' - ' + business.name,
    businessSector: businessSector.id + ' - ' + businessSector.name,
    businessSubsector: businessSubsector.id + ' - ' + businessSubsector.name,
    businessStructure: businessOwner.businessStructure,
    avrMonthlySales: businessOwner.avrMonthlySales,
    avrMonthlyNetProfit: businessOwner.avrMonthlyNetProfit,
    totalLastYearNetProfit: businessOwner.totalLastYearNetProfit,
    employeesNo: businessOwner.employeesNo,
    website: businessOwner.website ?? '-',
    loanPurpose: loanPurpose,
    businessOwnerDescription: businessOwnerDescription,
    surveyValidations: {
      isStartDateValid:
        new Date(businessOwner.startDate) >
        new Date(businessOwner.surveyCompletedAt.getFullYear() - 3),
      isBusinessSubsectorValid: businessOwner.businessSubsector.forbidden,
      isLoanPurposeValid:
        loanPurpose == LoanPurpose.FinanceDebtObligation.toString(),
    },
  };
}

export function toParseMonthlyReportDto(
  monthlyReport: MonthlyReport,
): ParseMonthlyReportDto {
  return {
    date: new Date(
      monthlyReport.reportDate.getFullYear(),
      monthlyReport.reportDate.getMonth(),
    ),
    inflow: monthlyReport.inflow,
    outflow: monthlyReport.outflow,
  };
}

export function toMonthlyReportAdminResponse(
  monthlyReport: MonthlyReport,
): MonthlyReportAdminResponse {
  return {
    monthlyReportId: monthlyReport.id,
    monthlyReportFromPaid: {
      reportDate: dateToReportString(
        monthlyReport.originalMonthlyReport.reportDate,
      ),
      inflow: monthlyReport.originalMonthlyReport.inflow,
      outflow: monthlyReport.originalMonthlyReport.outflow,
      vInflow: monthlyReport.originalMonthlyReport.vInflow,
      vTotal: monthlyReport.originalMonthlyReport.vTotal,
      outflowExceed: monthlyReport.originalMonthlyReport.outflowExceed,
      isNegativeBalance: monthlyReport.originalMonthlyReport.isNegativeBalance,
      noEarning: monthlyReport.originalMonthlyReport.noEarning,
    },
    monthlyReportUpdate: {
      reportDate: dateToReportString(monthlyReport.reportDate),
      inflow: monthlyReport.inflow,
      inflowDescription: monthlyReport.originalMonthlyReport.inflowDescription,
      outflow: monthlyReport.outflow,
      outflowDescription:
        monthlyReport.originalMonthlyReport.outflowDescription,
      vInflow: monthlyReport.vInflow,
      vTotal: monthlyReport.vTotal,
      outflowExceed: monthlyReport.outflowExceed,
      isNegativeBalance: monthlyReport.isNegativeBalance,
      noEarning: monthlyReport.noEarning,
    },
  };
}

export function toNewestMonthlyReportAdminResponse(
  monthlyReport: MonthlyReport,
): NewestMonthlyReportAdminResponse {
  let actionRequired = false;
  let inflowDescription = null;
  let outflowDescription = null;
  if (monthlyReport.originalMonthlyReport) {
    inflowDescription = monthlyReport.originalMonthlyReport.inflowDescription;
    outflowDescription = monthlyReport.originalMonthlyReport.outflowDescription;

    if (
      !isWithin20PercentRange(
        monthlyReport.originalMonthlyReport.inflow,
        monthlyReport.originalMonthlyReport.outflow,
        monthlyReport.inflow,
        monthlyReport.outflow,
      ) &&
      monthlyReport.isConfirmed == false
    ) {
      actionRequired = true;
    }
  }

  return {
    actionRequired: actionRequired,
    reportDate: dateToReportString(monthlyReport.reportDate),
    isConfirmed: monthlyReport.isConfirmed,
    isOriginal: monthlyReport.originalMonthlyReport == null,
    inflow: monthlyReport.inflow,
    inflowDescription: inflowDescription,
    outflow: monthlyReport.outflow,
    outflowDescription: outflowDescription,
    vInflow: monthlyReport.vInflow,
    vTotal: monthlyReport.vTotal,
    outflowExceed: monthlyReport.outflowExceed,
    isNegativeBalance: monthlyReport.isNegativeBalance,
    noEarning: monthlyReport.noEarning,
  };
}

export function toAdminCharts(
  monthlyReports: MonthlyReport[],
  investmentRequests: InvestmentRequest[],
): AdminCharts {
  return {
    businessOwnersMonthlyReports: toAdminChartPoint(monthlyReports),
    requestsByPurpose: Object.values(LoanPurpose).map((purpose) =>
      toRequestsByPurpose(purpose, investmentRequests),
    ),
  };
}

export function toAdminChartPoint(
  monthlyReports: MonthlyReport[],
): ChartPoint[] {
  const reports = monthlyReports.map((report) => toChartPoint(report));
  let inflow = 0;
  let outflow = 0;
  let response: ChartPoint[] = [];

  let currentReportDate: string | null = null;

  for (let i = 0; i < reports.length; i++) {
    inflow += reports[i].inflowAsY;
    outflow += reports[i].outflowAsY;

    if (currentReportDate !== reports[i].reportDateAsX) {
      response.push({
        reportDateAsX: reports[i].reportDateAsX,
        inflowAsY: inflow,
        outflowAsY: outflow,
      });

      currentReportDate = reports[i].reportDateAsX;
      inflow = 0;
      outflow = 0;
    }
  }

  return response;
}

export function toRequestsByPurpose(
  purpose: LoanPurpose,
  investmentRequests: InvestmentRequest[],
): RequestsByPurpose {
  return {
    purpose: purpose,
    count: investmentRequests.filter(
      (request) => request.purposeOfTheLoan == purpose,
    ).length,
  };
}

export function toChartPoint(monthlyReport: MonthlyReport): ChartPoint {
  return {
    reportDateAsX: dateToChartString(monthlyReport.reportDate),
    inflowAsY: monthlyReport.inflow,
    outflowAsY: monthlyReport.outflow,
  };
}

export function dateToChartString(date: Date): string {
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${year}-${month}`;
}

export function toIdentityScoreAdminResponse(
  extractedIdentity: UserIdentity,
  identityScore: IdentityScore,
): IdentityScoreAdminResponse {
  let ownerNameScore = null;
  let phoneScore = null;
  let emailScore = null;
  let addressScore = null;

  if (identityScore) {
    ownerNameScore = identityScore.ownerNameScore;
    phoneScore = identityScore.phoneScore;
    emailScore = identityScore.emailScore;
    addressScore = identityScore.addressScore;
  }

  return {
    extractedName: extractedIdentity.name,
    ownerNameScore: ownerNameScore,
    extractedPhone: extractedIdentity.phone,
    phoneScore: phoneScore,
    extractedEmail: extractedIdentity.email,
    emailScore: emailScore,
    extractedAddress: {
      city: extractedIdentity.city,
      street: extractedIdentity.street,
      zipCode: extractedIdentity.zip,
    },
    addressScore: addressScore,
  };
}

export function isWithin20PercentRange(
  origIn: number,
  origOut: number,
  newIn: number,
  newOut: number,
): boolean {
  return (
    newIn >= 0.8 * origIn &&
    newIn <= 1.2 * origIn &&
    newOut >= 0.8 * origOut &&
    newOut <= 1.2 * origOut
  );
}
