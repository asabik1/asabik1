import { ApiResponseProperty } from '@nestjs/swagger';
import { ChartPoint } from './chart-point.interface';
import { RequestsByPurpose } from './requests-by-purpose.interface';

export class AdminCharts {
  @ApiResponseProperty()
  businessOwnersMonthlyReports: ChartPoint[];

  @ApiResponseProperty()
  requestsByPurpose: RequestsByPurpose[];
}
