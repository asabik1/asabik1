import { InjectRepository } from '@nestjs/typeorm';
import {
  Between,
  DeepPartial,
  MoreThan,
  Repository,
  UpdateResult,
} from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Observable, catchError, from } from 'rxjs';
import { MonthlyReport } from '../entities/monthly-report.entity';

@Injectable()
export class MonthlyReportRepository {
  constructor(
    @InjectRepository(MonthlyReport)
    private readonly monthlyReportRepository: Repository<MonthlyReport>,
  ) {}

  findMonthlyReportsFromTwoYearsBack(): Observable<MonthlyReport[]> {
    const currentDate = new Date();
    const twoYearsBeforeNow = new Date(
      currentDate.getFullYear() - 2,
      currentDate.getMonth(),
      currentDate.getDate(),
    );

    return from(
      this.monthlyReportRepository.find({
        where: {
          reportDate: MoreThan(twoYearsBeforeNow),
        },
        order: { reportDate: 'ASC' },
      }),
    ).pipe(
      catchError(() => {
        throw new HttpException('No reports found.', HttpStatus.NOT_FOUND);
      }),
    );
  }

  findMonthlyReportByDateAndBusinessOwnerId(
    businessOwnerId: number,
    reportDate: Date,
  ): Observable<MonthlyReport> {
    const firstDayOfMonth = new Date(
      reportDate.getFullYear(),
      reportDate.getMonth(),
      1,
    );
    const lastDayOfMonth = new Date(
      reportDate.getFullYear(),
      reportDate.getMonth() + 1,
      0,
    );

    return from(
      this.monthlyReportRepository.findOne({
        where: {
          businessOwner: { id: businessOwnerId },
          reportDate: Between(firstDayOfMonth, lastDayOfMonth),
        },
      }),
    );
  }

  findMonthlyReportByMonthlyReportId(
    monthlyReportId: number,
  ): Observable<MonthlyReport> {
    return from(
      this.monthlyReportRepository.findOne({
        where: {
          id: monthlyReportId,
        },
        relations: {
          originalMonthlyReport: true,
        },
      }),
    );
  }

  findPreviousMonthlyReportByDateAndBusinessOwnerId(
    businessOwnerId: number,
    reportDate: Date,
  ): Observable<MonthlyReport> {
    const firstDayOfMonth = new Date(
      reportDate.getFullYear(),
      reportDate.getMonth(),
      1,
    );
    const lastDayOfMonth = new Date(
      reportDate.getFullYear(),
      reportDate.getMonth() + 1,
      0,
    );

    return from(
      this.monthlyReportRepository.findOne({
        where: {
          businessOwner: { id: businessOwnerId },
          reportDate: Between(firstDayOfMonth, lastDayOfMonth),
        },
      }),
    );
  }

  findMonthlyReportsByBusinessOwnerId(
    businessOwnerId: number,
  ): Observable<MonthlyReport[]> {
    return from(
      this.monthlyReportRepository.find({
        where: {
          businessOwner: { id: businessOwnerId },
        },
        order: { reportDate: 'DESC' },
      }),
    );
  }

  findNewestMonthlyReport(businessOwnerId: number): Observable<MonthlyReport> {
    return from(
      this.monthlyReportRepository.findOne({
        where: {
          businessOwner: { id: businessOwnerId },
        },
        relations: {
          originalMonthlyReport: true,
        },
        order: { reportDate: 'DESC' },
      }),
    ).pipe(
      catchError(() => {
        throw new HttpException(
          'Monthly report was not found.',
          HttpStatus.NOT_FOUND,
        );
      }),
    );
  }

  findLast24MonthlyReports(
    businessOwnerId: number,
  ): Observable<MonthlyReport[]> {
    return from(
      this.monthlyReportRepository.find({
        where: {
          businessOwner: { id: businessOwnerId },
        },
        order: { reportDate: 'DESC' },
        take: 24,
      }),
    );
  }

  saveMonthlyReport(
    monthlyReport: DeepPartial<MonthlyReport>,
  ): Observable<MonthlyReport> {
    return from(this.monthlyReportRepository.save(monthlyReport));
  }

  createMonthlyReport(
    monthlyReport: DeepPartial<MonthlyReport>,
  ): MonthlyReport {
    return this.monthlyReportRepository.create(monthlyReport);
  }

  updateMonthlyReport(
    monthlyReportId: number,
    monthlyReport: DeepPartial<MonthlyReport>,
  ): Observable<UpdateResult> {
    return from(
      this.monthlyReportRepository.update(monthlyReportId, monthlyReport),
    );
  }

  removeMonthlyReports(
    monthlyReports: MonthlyReport[],
  ): Observable<MonthlyReport[]> {
    return from(this.monthlyReportRepository.remove(monthlyReports));
  }
}
