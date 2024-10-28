import { ApiResponseProperty } from '@nestjs/swagger';
import { MonthlyReportFromPlaidAdminResponse } from './monthly-report-from-plaid-admin-response.interface';
import { MonthlyReportUsersUpdateAdminResponse } from './monthly-report-users-update-admin-response.interface';

export class MonthlyReportAdminResponse {
  @ApiResponseProperty()
  monthlyReportId: number;

  @ApiResponseProperty({ type: MonthlyReportFromPlaidAdminResponse })
  monthlyReportFromPaid: MonthlyReportFromPlaidAdminResponse;

  @ApiResponseProperty({ type: MonthlyReportUsersUpdateAdminResponse })
  monthlyReportUpdate: MonthlyReportUsersUpdateAdminResponse;
}
