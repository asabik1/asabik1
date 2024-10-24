import { GetLoanBusinessOwnerResponse } from '../src/modules/loan/models/loan-get-business-owner-response.interface';

export const getLoanBusinessOwnerResponse: GetLoanBusinessOwnerResponse = {
  declaredMotnhlyProfit: 1000,
  declaredProfitToShare: 100,
  psr: '10%',
  installments: [
    {
      no: '1/12',
      paymentDate: '12/28/2023',
      totalRevenue: 6172,
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
      totalRevenue: 6855,
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
