import { InvestmentRequestsSummaryResponse } from '../modules/business-owner/models/investment-requests-summary-response';
import { InvestmentRequest } from '../modules/investment-request/entities/investment-request.entity';
import { Investment } from '../modules/investment/entities/investment.entity';
import { Investor } from '../modules/investor/entities/investor.entity';
import { SurveyStatus } from '../modules/survey/models/survey-status.enum';
import { TransactionEvent } from '../modules/plaid/enum/transaction-event.enum';
import { INVESTMENT_REQUEST_STATUS } from '../modules/investment-request/enum/investment-status-message.enum';
import { MonthlyReport } from '../modules/business-owner/entities/monthly-report.entity';
import { FinancialReport } from '../modules/business-owner/entities/financial-report.entity';

export function generateFinancialReport(
  monthlyReports: MonthlyReport[],
  businessOwnerId: number,
): FinancialReport {
  const reports = monthlyReports
    .sort((a, b) => b.reportDate.getTime() - a.reportDate.getTime())
    .slice(0, 24);

  let sumVInflow = 0;
  let sumVTotal = 0;
  reports.forEach((report) => {
    if (report.vInflow !== null) {
      sumVInflow += parseFloat(report.vInflow.toFixed(6));
    }
    if (report.vTotal !== null) {
      sumVTotal += parseFloat(report.vTotal.toFixed(6));
    }
  });

  let vInflowDivisor = reports.length;
  let vTotalDivisor = reports.length;
  reports.forEach((report) => {
    if (report.vInflow == null) {
      vInflowDivisor--;
    }
    if (report.vTotal == null) {
      vTotalDivisor--;
    }
  });

  const avrVInflow = sumVInflow / vInflowDivisor;
  const avrVTotal = sumVTotal / vTotalDivisor;

  return {
    vInflow: Math.sqrt(avrVInflow),
    vTotal: Math.sqrt(avrVTotal),
    averageE:
      reports
        .map((report) => report.inflow)
        .reduce((sum, value) => sum + value, 0) / monthlyReports.length,
    averageL:
      reports
        .map((report) => report.outflow)
        .reduce((sum, value) => sum + value, 0) / monthlyReports.length,
    totalNoMonth: reports.length,
    outflowExceed: reports.filter((report) => report.outflowExceed).length,
    negativeBalance: reports.filter((report) => report.isNegativeBalance)
      .length,
    noEarning: reports.filter((report) => report.noEarning).length,
    businessOwnerId: businessOwnerId,
  };
}

export function countInvestors(
  investmentRequests: InvestmentRequest[],
): number {
  return investmentRequests
    .reduce((investments, b) => {
      if (!b.investments) return [];
      return [...investments, ...b.investments];
    }, <Investment[]>[])
    .filter((x) =>
      [
        TransactionEvent.Created,
        TransactionEvent.Submitted,
        TransactionEvent.Cleared,
      ].includes(x.paymentFromInvestor?.eventName),
    )
    .filter(
      (value, index, array) => array.findIndex((x) => x.investor.id) === index,
    ).length;
}

export function countInvestedAmountByInvestor(
  investmentRequests: InvestmentRequest[],
  investorId: number,
) {
  return investmentRequests
    .reduce((investments, b) => {
      if (!b.investments) return [];
      return [...investments, ...b.investments];
    }, <Investment[]>[])
    .filter((x) => x.investor.id == investorId)
    .filter((x) =>
      [
        TransactionEvent.Created,
        TransactionEvent.Submitted,
        TransactionEvent.Cleared,
      ].includes(x.paymentFromInvestor?.eventName),
    )
    .reduce((a, b) => a + b.amount, 0);
}

export function countInvestedAmountForBusinessOwner(
  investments: Investment[],
  businessOwnerId: number,
) {
  return investments
    .filter((x) => x.investmentRequest.businessOwner.id == businessOwnerId)
    .filter((x) =>
      [
        TransactionEvent.Created,
        TransactionEvent.Submitted,
        TransactionEvent.Cleared,
      ].includes(x.paymentFromInvestor?.eventName),
    )
    .reduce((a, b) => a + b.amount, 0);
}

export function countTotalInvestedAmount(
  investmentRequests: InvestmentRequest[],
): number {
  return (
    investmentRequests
      .reduce((investments, b) => {
        if (!b.investments) return [];
        return [...investments, ...b.investments];
      }, <Investment[]>[])
      .filter((x) =>
        [
          TransactionEvent.Created,
          TransactionEvent.Submitted,
          TransactionEvent.Cleared,
        ].includes(x.paymentFromInvestor?.eventName),
      )
      .reduce((amount, b) => amount + b.amount, 0) || 0
  );
}

export function sumInvestments(investments: Investment[]): number {
  return (
    investments
      .filter((x) =>
        [
          TransactionEvent.Created,
          TransactionEvent.Submitted,
          TransactionEvent.Cleared,
        ].includes(x.paymentFromInvestor?.eventName),
      )
      .reduce((amount, b) => amount + b.amount, 0) || 0
  );
}

export function projectedNetReturn(
  investmentRequest: InvestmentRequest,
): string {
  return (
    (
      (Math.pow(
        (investmentRequest.netReturnToShare * investmentRequest.returnTerm) /
          investmentRequest.requiredCapital,
        1 / (investmentRequest.returnTerm / 12),
      ) -
        1) *
      100
    ).toFixed(3) + '%'
  );
}

export function profitSharingRatio(
  investmentRequest: InvestmentRequest,
): string {
  return (
    (
      (investmentRequest.netReturnToShare / investmentRequest.netReturn) *
      100
    ).toFixed(2) + '%'
  );
}

export function getNewestInvestmentRequest(
  investmentRequests: InvestmentRequest[],
): InvestmentRequest {
  const filteredRequests = investmentRequests.filter(
    (investmentRequest) =>
      investmentRequest.status ==
        INVESTMENT_REQUEST_STATUS.PROCESSING_FROM_SURVEY ||
      investmentRequest.status == INVESTMENT_REQUEST_STATUS.MANUAL_PROCESSING ||
      investmentRequest.status == INVESTMENT_REQUEST_STATUS.OPEN ||
      investmentRequest.status == INVESTMENT_REQUEST_STATUS.CLOSED ||
      investmentRequest.status == INVESTMENT_REQUEST_STATUS.TRANSFERED,
  );

  if (filteredRequests.length === 0) {
    return null;
  }

  return filteredRequests.reduce((accumulator, currentValue) =>
    accumulator.approvedAt < currentValue.approvedAt
      ? accumulator
      : currentValue,
  );
}

export function countProjectedNetReturnUpTo(
  investmentRequests: InvestmentRequest[] = [],
): number {
  return (
    investmentRequests?.reduce(
      (max, item) => (max > item.netReturn ? max : item.netReturn),
      0,
    ) || 0
  );
}

export function countMinRequiredInvestment(
  investmentRequests: InvestmentRequest[] = [],
): number {
  return (
    investmentRequests?.reduce(
      (min, item) => (min < item.requiredCapital ? min : item.requiredCapital),
      investmentRequests?.[0]?.requiredCapital || 0,
    ) || 0
  );
}

export function countTotalRequiredInvestment(
  investmentRequests: InvestmentRequest[] = [],
): number {
  return (
    investmentRequests?.reduce((sum, item) => sum + item.requiredCapital, 0) ||
    0
  );
}

export function countTotalProfitWillingToShare(
  investmentRequests: InvestmentRequest[] = [],
): number {
  return (
    investmentRequests?.reduce((sum, item) => sum + item.netReturnToShare, 0) ||
    0
  );
}

export function getAllInvestors(
  investmentRequests: InvestmentRequest[] = [],
): any[] {
  return investmentRequests
    .reduce((arr, investmentRequest) => {
      return [
        ...arr,
        ...investmentRequest.investments
          .filter((x: Investment) =>
            [
              TransactionEvent.Created,
              TransactionEvent.Submitted,
              TransactionEvent.Cleared,
            ].includes(x.paymentFromInvestor?.eventName),
          )
          .reduce((arr, investment) => [...arr, investment.investor], []),
      ];
    }, [])
    .filter(
      (x, index, arr) => arr.findIndex((item) => item.id == x.id) == index,
    )
    .map((investor: Investor) => {
      return {
        id: investor.id,
        companyName: investor.companyName,
        name: investor.fullName,
        alreadyInvested: countTotalInvestedAmount(
          investmentRequests.filter(
            (x) =>
              x.investments.findIndex((y) => y.investor.id == investor.id) >= 0,
          ),
        ),
        isActive:
          investor.user?.emailConfirmed &&
          investor.user?.plaidToken &&
          investor.user?.surveyStatus == SurveyStatus.QUALIFIES,
      };
    });
}

export function countInvestmentsRequestsSummary(
  investmentRequests: InvestmentRequest[],
): InvestmentRequestsSummaryResponse {
  return {
    projectedNetRunUpTo: countProjectedNetReturnUpTo(investmentRequests),
    totalInvestedAmount: countTotalInvestedAmount(investmentRequests),
    numberOfInvestors: countInvestors(investmentRequests),
    totalRequiredInvestment: countTotalRequiredInvestment(investmentRequests),
    minReturnTerm: countMinReturnTerm(investmentRequests),
  };
}

export function countMinReturnTerm(
  investmentRequests: InvestmentRequest[] = [],
): number {
  return investmentRequests.reduce(
    (min, b) => (min < b.returnTerm ? min : b.returnTerm),
    investmentRequests?.[0]?.returnTerm || 0,
  );
}

export function calculateRaisedPercentage(
  investmentRequest: InvestmentRequest,
): number {
  const investedAmount = countTotalInvestedAmount([investmentRequest]);
  const maxLoanApproved = investmentRequest.requiredCapital;
  const percentRaised = (investedAmount / maxLoanApproved) * 100;

  return Number(percentRaised.toFixed(2));
}

export function calculateTimeLeft(expirationDate: Date): string {
  const now = new Date();
  const expiresAt = expirationDate;

  const timeDiffMs = expiresAt.getTime() - now.getTime();

  let days = Math.floor(timeDiffMs / (1000 * 60 * 60 * 24));
  let hours = Math.floor(
    (timeDiffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  let minutes = Math.floor((timeDiffMs % (1000 * 60 * 60)) / (1000 * 60));

  if (now > expiresAt) {
    days = 0;
    hours = 0;
    minutes = 0;
  }

  return `${days}d, ${hours}h, ${minutes}min`;
}
