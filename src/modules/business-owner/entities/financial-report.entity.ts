import { DataSource, ViewColumn, ViewEntity } from 'typeorm';
import { MonthlyReport } from './monthly-report.entity';

@ViewEntity({
  expression: (dataSource: DataSource) =>
    dataSource
      .createQueryBuilder()
      .select('SQRT(AVG(monthly_reports.v_inflow))', 'v_inflow')
      .addSelect('SQRT(AVG(monthly_reports.v_total))', 'v_total')
      .addSelect('AVG(monthly_reports.inflow)', 'average_e')
      .addSelect('AVG(monthly_reports.outflow)', 'average_l')
      .addSelect('COUNT(monthly_reports.id)', 'total_no_month')
      .addSelect(
        'COUNT(CASE WHEN monthly_reports.outflow_exceed THEN 1 END)',
        'outflow_exceed',
      )
      .addSelect(
        'COUNT(CASE WHEN monthly_reports.is_negative_balance THEN 1 END)',
        'negative_balance',
      )
      .addSelect(
        'COUNT(CASE WHEN monthly_reports.no_earning THEN 1 END)',
        'no_earning',
      )
      .addSelect('monthly_reports.business_owner_id', 'business_owner_id')
      .from(MonthlyReport, 'monthly_reports')
      .groupBy('monthly_reports.business_owner_id'),
})
export class FinancialReport {
  @ViewColumn({ name: 'v_inflow' })
  vInflow: number;

  @ViewColumn({ name: 'v_total' })
  vTotal: number;

  @ViewColumn({ name: 'average_e' })
  averageE: number;

  @ViewColumn({ name: 'average_l' })
  averageL: number;

  @ViewColumn({ name: 'total_no_month' })
  totalNoMonth: number;

  @ViewColumn({ name: 'outflow_exceed' })
  outflowExceed: number;

  @ViewColumn({ name: 'negative_balance' })
  negativeBalance: number;

  @ViewColumn({ name: 'no_earning' })
  noEarning: number;

  @ViewColumn({ name: 'business_owner_id' })
  businessOwnerId: number;
}
