import { InvestmentRequest } from '../entities/investment-request.entity';
import { InvestmentRequestGetBusinessOwnerResponse } from '../models/investment-request-get-business-owner-response.interface';
import { INVESTMENT_REQUEST_STATUS } from '../enum/investment-status-message.enum';
import { InvestmentRequestGetAdminResponse } from '../models/investment-request-get-admin-response.interface';
import {
  calculateRaisedPercentage,
  calculateTimeLeft,
  countInvestors,
  profitSharingRatio,
  projectedNetReturn,
  sumInvestments,
} from '../../../helpers/investment-requests-counters';
import { InvestmentRequestGetInvestorResponse } from '../models/investment-request-get-investor-response.interface';
import { CreditRatingData } from '../entities/credit-rating-data.entity';
import { CreditRatingDataResponse } from '../models/credit-rating-data-response.interface';
import { MonthlyReport } from '../../business-owner/entities/monthly-report.entity';
import { MonthlyReportRatingResponse } from '../../business-owner/models/monthly-report-rating-response.interface';
import { InvestmentRequestGetDetailedResponse } from '../models/investment-request-get-detailed-response.interface';
import {
  generateNextPlaidVerifDate,
  roundDownToTwoDecimalPlaces,
} from '../../loan/mapper/loan.mapper';

export function toCreditRatingDataResponse(
  creditRatingData: CreditRatingData,
): CreditRatingDataResponse {
  return {
    psr: profitSharingRatio(creditRatingData.investmentRequest),
    r: creditRatingData.r,
    m: creditRatingData.m,
    a: creditRatingData.a,
    returnTerm: creditRatingData.investmentRequest.returnTerm / 12,
    requestedAmount: creditRatingData.requestedAmount,
    netReturn: creditRatingData.investmentRequest.netReturn,
    netReturnToShare: creditRatingData.investmentRequest.netReturnToShare,
    totalNoMonth: creditRatingData.totalNoMonth,
    outflowExceed: creditRatingData.outflowExceed,
    negativeBalance: creditRatingData.negativeBalance,
    noEarning: creditRatingData.noEarning,
    vInflow: creditRatingData.vInflow,
    vTotal: creditRatingData.vTotal,
    averageE: creditRatingData.averageE,
    averageL: creditRatingData.averageL,
    o: creditRatingData.o,
    i: creditRatingData.i,
    d1: creditRatingData.d1,
    d2: creditRatingData.d2,
    d0: creditRatingData.d0,
    pod: creditRatingData.pod,
    maxLoanCalc: creditRatingData.maxLoanCalc,
    rating: creditRatingData.rating,
    low: creditRatingData.low,
    high: creditRatingData.high,
  };
}

export function toMonthlyReportRatingResponse(
  monthlyReport: MonthlyReport,
): MonthlyReportRatingResponse {
  return {
    id: monthlyReport.id,
    givenMonth: dateToReportString(monthlyReport.reportDate),
    monthlyIn: monthlyReport.inflow,
    monthlyOut: monthlyReport.outflow,
  };
}

export function toInvestmentRequestGetDetailedResponse(
  monthlyReport: MonthlyReport,
  investmentRequest: InvestmentRequest,
): InvestmentRequestGetDetailedResponse {
  const psr = investmentRequest.netReturnToShare / investmentRequest.netReturn;
  const balance = monthlyReport.inflow - Math.abs(monthlyReport.outflow);

  let nextInstallmentAmount = investmentRequest.netReturnToShare;
  let nextInstallmentDate = '-';
  let finalPaymentAmount = investmentRequest.netReturnToShare;
  let finalPaymentDate = '-';

  if (balance <= 0) {
    nextInstallmentAmount = 0;
  }

  if (investmentRequest.loan) {
    nextInstallmentDate = dateToString(investmentRequest.loan.nextPaymentDate);
    nextInstallmentAmount = balance * psr;
    finalPaymentDate = dateToString(investmentRequest.loan.finalPaymentDate);

    const npd = investmentRequest.loan.nextPaymentDate;
    const fpd = investmentRequest.loan.finalPaymentDate;
    if (
      npd.getMonth() == fpd.getMonth() &&
      npd.getFullYear() == fpd.getFullYear()
    ) {
      nextInstallmentDate = finalPaymentDate;
      nextInstallmentAmount = finalPaymentAmount;
    }
  }

  return {
    id: investmentRequest.id,
    psr: roundDownToTwoDecimalPlaces(psr * 100) + '%',
    projectedNetReturn: projectedNetReturn(investmentRequest),
    nextInstallmentAmount: nextInstallmentAmount,
    nextInstallmentDate: nextInstallmentDate,
    nextPlaidVerifDate: generateNextPlaidVerifDate(),
    finalPaymentAmount: finalPaymentAmount,
    finalPaymentDate: finalPaymentDate,
    dti: investmentRequest.dti,
    rating: investmentRequest.rating,
    approvedAt: dateToString(investmentRequest.approvedAt),
  };
}

export function toInvestmentRequestGetBusinessOwnerResponse(
  investmentRequest: InvestmentRequest,
): InvestmentRequestGetBusinessOwnerResponse {
  let investmentStatus = investmentRequest.status;

  if (investmentStatus == INVESTMENT_REQUEST_STATUS.OPEN) {
    investmentStatus = INVESTMENT_REQUEST_STATUS.OPEN_BUSINESS_OWNER_RESPONSE;
  } else if (investmentStatus == INVESTMENT_REQUEST_STATUS.CLOSED) {
    investmentStatus = INVESTMENT_REQUEST_STATUS.CLOSED_BUSINESS_OWNER_RESPONSE;
  }

  let isEligible = false;
  if (investmentRequest.status == INVESTMENT_REQUEST_STATUS.CLOSED) {
    isEligible = true;
  }

  return {
    id: investmentRequest.id,
    purposeOfTheLoan: investmentRequest.purposeOfTheLoan,
    loanPurpose: investmentRequest.loanPurpose,
    helpIncreaseProfit: investmentRequest.helpIncreaseProfit,
    profitIncrease: investmentRequest.profitIncrease,
    returnTerm: investmentRequest.returnTerm,
    requiredCapital: investmentRequest.requiredCapital,
    netReturn: investmentRequest.netReturn,
    netReturnToShare: investmentRequest.netReturnToShare,
    status: investmentStatus,
    percentageRaised: calculateRaisedPercentage(investmentRequest),
    timeLeft: calculateTimeLeft(investmentRequest.expiresAt),
    isEligible: isEligible,
    canEdit:
      investmentRequest.investments.length < 1 &&
      investmentRequest.expiresAt < new Date(),
  };
}

export function toInvestmentRequestGetAdminResponse(
  investmentRequest: InvestmentRequest,
): InvestmentRequestGetAdminResponse {
  let status = investmentRequest.status;
  if (status == INVESTMENT_REQUEST_STATUS.MANUAL_PROCESSING) {
    status = INVESTMENT_REQUEST_STATUS.ADMIN_MANUAL_PROCESSING;
  }

  return {
    id: investmentRequest.id,
    purposeOfTheLoan: investmentRequest.purposeOfTheLoan,
    approvedAt: dateToString(investmentRequest.approvedAt),
    returnTerm: investmentRequest.returnTerm,
    loanPurpose: investmentRequest.loanPurpose,
    helpIncreaseProfit: investmentRequest.helpIncreaseProfit,
    profitIncrease: investmentRequest.profitIncrease,
    requiredCapital: investmentRequest.requiredCapital,
    dti: investmentRequest.dti,
    rating: investmentRequest.rating,
    ratingUpdate:
      investmentRequest.ratingUpdate === null
        ? investmentRequest.rating
        : investmentRequest.ratingUpdate,
    status: status,
  };
}

export function toInvestmentRequestGetInvestorResponse(
  investmentRequests: InvestmentRequest[],
): InvestmentRequestGetInvestorResponse[] {
  return investmentRequests
    .filter(
      (investmentRequest) =>
        investmentRequest.status === INVESTMENT_REQUEST_STATUS.OPEN ||
        investmentRequest.status === INVESTMENT_REQUEST_STATUS.CLOSED ||
        investmentRequest.status === INVESTMENT_REQUEST_STATUS.TRANSFERED,
    )
    .map((investmentRequest) => {
      let status = investmentRequest.status;
      if (status === INVESTMENT_REQUEST_STATUS.OPEN) {
        status = INVESTMENT_REQUEST_STATUS.OPEN_INVESTOR_RESPONSE;
      } else {
        status = INVESTMENT_REQUEST_STATUS.CLOSED_INVESTOR_RESPONSE;
      }

      return {
        id: investmentRequest.id,
        purposeOfTheLoan: investmentRequest.purposeOfTheLoan,
        loanPurpose: investmentRequest.loanPurpose,
        helpIncreaseProfit: investmentRequest.helpIncreaseProfit,
        profitIncrease: investmentRequest.profitIncrease,
        rating: investmentRequest.rating,
        dti: investmentRequest.dti,
        projectedNetReturn: projectedNetReturn(investmentRequest),
        psr: profitSharingRatio(investmentRequest),
        status: status,
        expirationDate: dateToString(investmentRequest.expiresAt),
        returnTerm: investmentRequest.returnTerm,
        requiredCapital: investmentRequest.requiredCapital,
        amountToMeetTarget:
          investmentRequest.requiredCapital -
          sumInvestments(investmentRequest.investments),
        netReturnToShare: investmentRequest.netReturnToShare,
        numberOfInvestors: countInvestors([investmentRequest]),
      };
    });
}

export function dateToString(date: Date): string {
  if (date == null) {
    return '-';
  }

  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}

export function dateToReportString(date: Date): string {
  const month = date.toLocaleString('en-US', { month: 'short' });
  const year = date.getFullYear();

  return `${month}-${year}`;
}

export function isInvestedInRequestByInvestor(
  investorId: number,
  investmentRequest: InvestmentRequest,
): boolean {
  return investmentRequest.investments.some(
    (investment) => investment.investor.id === investorId,
  );
}
