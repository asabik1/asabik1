import { Loan } from '../entities/loan.entity';
import { GetLoanBusinessOwnerResponse } from '../models/loan-get-business-owner-response.interface';
import { dateToString } from '../../investment-request/mapper/investment-request.mapper';
import { Installment } from '../entities/installment.entity';
import { InstallmentBusinessOwnerResponse } from '../models/installment-business-owner-response.interface';
import { InstallmentInfo } from '../enum/installment-info.enum';
import { GetLoanInvestorResponse } from '../models/loan-get-investor-response.interface';
import { InstallmentInvestorResponse } from '../models/installment-investor-response.interface';

export function toGetLoanBusinessOwnerResponse(
  loan: Loan,
  paymentsFromBusinessOwner: Installment[],
): GetLoanBusinessOwnerResponse {
  let psr =
    loan.investmentRequest.netReturnToShare / loan.investmentRequest.netReturn;

  return {
    declaredMotnhlyProfit: loan.investmentRequest.netReturn,
    declaredProfitToShare: loan.investmentRequest.netReturnToShare,
    psr: roundDownToTwoDecimalPlaces(psr) * 100 + '%',
    installments: toInstallmentBusinessOwnerResponse(
      psr,
      paymentsFromBusinessOwner,
      loan.investmentRequest.returnTerm,
    ),
  };
}

export function toInstallmentBusinessOwnerResponse(
  psr: number,
  installments: Installment[],
  term: number,
): InstallmentBusinessOwnerResponse[] {
  let totalNetProfit = 0;
  let inflowDescription = null;
  let outflowDescription = null;
  let profitToShareInfo = null;
  let installmentResponse: InstallmentBusinessOwnerResponse[] = [];

  for (let i = 0; i < installments.length; i++) {
    let currentInstallment = installments[i];
    let transferAmount = parseFloat(currentInstallment.amount.toString());

    while (
      i + 1 < installments.length &&
      isDateTheSameDay(installments[i].createdAt, installments[i + 1].createdAt)
    ) {
      transferAmount += parseFloat(installments[i + 1].amount.toString());
      i++;
    }

    totalNetProfit =
      currentInstallment.monthlyReport.inflow -
      Math.abs(currentInstallment.monthlyReport.outflow);
    if (transferAmount <= 0) {
      profitToShareInfo = InstallmentInfo.PROFIT_TO_SHARE_BUSINESS_OWNER;
    }

    if (currentInstallment.monthlyReport.originalMonthlyReport) {
      inflowDescription =
        currentInstallment.monthlyReport.originalMonthlyReport
          .inflowDescription;
      outflowDescription =
        currentInstallment.monthlyReport.originalMonthlyReport
          .outflowDescription;
    }

    installmentResponse.push({
      no: `${installmentResponse.length + 1}/${term}`,
      paymentDate: dateToString(currentInstallment.createdAt),
      totalRevenue: currentInstallment.monthlyReport.inflow,
      totalNetProfit: totalNetProfit,
      profitToShare: roundDownToTwoDecimalPlaces(totalNetProfit * psr),
      transfer: transferAmount,
      installmentData: {
        inflowDescription: inflowDescription,
        outflowDescription: outflowDescription,
        profitToShareInfo: profitToShareInfo,
      },
    });

    inflowDescription = null;
    outflowDescription = null;
    profitToShareInfo = null;
  }

  return installmentResponse;
}

export function toGetLoanInvestorResponse(
  investorId: number,
  loan: Loan,
  paymentsToInvestor: Installment[],
): GetLoanInvestorResponse {
  const raisedFunds = loan.investmentRequest.requiredCapital;
  const invested = loan.investmentRequest.investments
    .filter((investment) => investment.investor.id == investorId)
    .reduce((a, b) => a + b.amount, 0);
  const investedPart = invested / raisedFunds;

  return {
    declaredProfitToShare: loan.investmentRequest.netReturnToShare,
    raisedFunds: raisedFunds,
    invested: invested,
    investedPercentage: roundDownToTwoDecimalPlaces(investedPart * 100) + '%',
    installments: toInstallmentInvestorResponse(
      investedPart,
      loan.investmentRequest.returnTerm,
      paymentsToInvestor,
    ),
  };
}

export function toInstallmentInvestorResponse(
  investedPart: number,
  term: number,
  payments: Installment[],
): InstallmentInvestorResponse[] {
  let transferAmount: number;
  let count = 0;
  let inflowDescription = null;
  let outflowDescription = null;
  let profitToShareInfo = null;

  return payments.map((installment) => {
    transferAmount = parseFloat(installment.amount.toString());
    count++;
    const totalNetProfit =
      installment.monthlyReport.inflow -
      Math.abs(installment.monthlyReport.outflow);

    if (installment.monthlyReport.originalMonthlyReport) {
      inflowDescription =
        installment.monthlyReport.originalMonthlyReport.inflowDescription;
      outflowDescription =
        installment.monthlyReport.originalMonthlyReport.outflowDescription;
    }

    if (transferAmount <= 0) {
      profitToShareInfo = InstallmentInfo.PROFIT_TO_SHARE_INVESTOR;
    }

    return {
      no: `${count}/${term}`,
      paymentDate: dateToString(installment.createdAt),
      totalNetProfit: totalNetProfit,
      profitToShare: roundDownToTwoDecimalPlaces(totalNetProfit * investedPart),
      transfer: transferAmount,
      installmentData: {
        inflowDescription: inflowDescription,
        outflowDescription: outflowDescription,
        profitToShareInfo: profitToShareInfo,
      },
    };
  });
}

export function generateNextPlaidVerifDate(): string {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const nextTenthDate = new Date(currentYear, currentMonth, 10);
  if (currentDate.getDate() >= 10) {
    nextTenthDate.setMonth(currentMonth + 1);
  }

  return `${
    nextTenthDate.getMonth() + 1
  }/${nextTenthDate.getDate()}/${nextTenthDate.getFullYear()}`;
}

export function isDateTheSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
}

export function roundDownToTwoDecimalPlaces(amount: number): number {
  const rounded = Math.round(amount * 100) / 100;

  return +rounded.toFixed(2);
}
