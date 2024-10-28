import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OriginalMonthlyReport } from '../entities/original-monthly-report.entity';
import { Repository } from 'typeorm';
import { Observable, from, map } from 'rxjs';
import { MonthlyReport } from '../entities/monthly-report.entity';
import { UpdateMonthlyReportDto } from '../dto/update-monthly-report.dto';

@Injectable()
export class OriginalMonthlyReportService {
  constructor(
    @InjectRepository(OriginalMonthlyReport)
    private readonly originalMonthlyReportRepository: Repository<OriginalMonthlyReport>,
  ) {}

  findOriginalMonthlyReportByMonthlyReportId(
    monthlyReportId: number,
  ): Observable<OriginalMonthlyReport> {
    return from(
      this.originalMonthlyReportRepository.findOne({
        where: {
          monthyReport: {
            id: monthlyReportId,
          },
        },
        relations: {
          monthyReport: true,
        },
      }),
    );
  }

  createOriginalMonthlyReport(
    monthlyReport: MonthlyReport,
    updateMonthlyReportDto: UpdateMonthlyReportDto,
  ): Observable<OriginalMonthlyReport> {
    const originalMonthlyReport = {
      reportDate: monthlyReport.reportDate,
      inflow: monthlyReport.inflow,
      outflow: monthlyReport.outflow,
      vInflow: monthlyReport.vInflow,
      vTotal: monthlyReport.vTotal,
      outflowExceed: monthlyReport.outflowExceed,
      isNegativeBalance: monthlyReport.isNegativeBalance,
      noEarning: monthlyReport.noEarning,
      inflowDescription: updateMonthlyReportDto.inflowDescription,
      outflowDescription: updateMonthlyReportDto.outflowDescription,
      monthyReport: monthlyReport,
    };

    return from(
      this.originalMonthlyReportRepository.save(originalMonthlyReport),
    );
  }

  removeOriginalMonthlyReport(
    originalMonthlyReport: OriginalMonthlyReport,
  ): Observable<void> {
    return from(
      this.originalMonthlyReportRepository.remove(originalMonthlyReport),
    ).pipe(map(() => {}));
  }
}
