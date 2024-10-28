import { MonthlyReportAdminResponse } from '../src/modules/business-owner/models/monthly-report-admin-response.interface';

export const mockMonthlyReportAdminResponse: MonthlyReportAdminResponse = {
  monthlyReportId: 11,
  monthlyReportFromPaid: {
    reportDate: '2023-01-31',
    inflow: 1500,
    outflow: 1200,
    vInflow: 1600,
    vTotal: 1300,
    outflowExceed: false,
    isNegativeBalance: false,
    noEarning: false,
  },
  monthlyReportUpdate: {
    reportDate: '2023-01-31',
    inflow: 1500,
    inflowDescription: 'Sample inflow description',
    outflow: 1200,
    outflowDescription: 'Sample outflow description',
    vInflow: 1600,
    vTotal: 1300,
    outflowExceed: false,
    isNegativeBalance: false,
    noEarning: false,
  },
};
