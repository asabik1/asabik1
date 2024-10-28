import { MonthlyReport } from 'src/modules/business-owner/entities/monthly-report.entity';
import { mockBusinessOwner } from './business-owner.mock';

export const mockMonthlyReport: MonthlyReport = {
  id: 51,
  createdAt: new Date(),
  reportDate: new Date(),
  inflow: 5000.0,
  outflow: 3000.0,
  vInflow: 4800.0,
  vTotal: 2800.0,
  outflowExceed: false,
  isNegativeBalance: false,
  noEarning: false,
  isConfirmed: true,
  businessOwner: mockBusinessOwner,
};
