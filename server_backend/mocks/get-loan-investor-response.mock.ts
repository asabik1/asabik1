import { GetLoanInvestorResponse } from '../src/modules/loan/models/loan-get-investor-response.interface';

export const getLoanInvestorResponse: GetLoanInvestorResponse = {
  declaredProfitToShare: 100,
  raisedFunds: 3000,
  invested: 3000,
  investedPercentage: '100%',
  installments: [
    {
      no: '1/12',
      paymentDate: '12/28/2023',
      totalNetProfit: 2287,
      profitToShare: 2287,
      transfer: 228.7,
      installmentData: {
        inflowDescription: null,
        outflowDescription: null,
        profitToShareInfo: null,
      },
    },
    {
      no: '2/12',
      paymentDate: '01/28/2024',
      totalNetProfit: 2569,
      profitToShare: 2569,
      transfer: 256.9,
      installmentData: {
        inflowDescription: null,
        outflowDescription: null,
        profitToShareInfo: null,
      },
    },
  ],
};
