import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { Observable, concatMap, forkJoin, map, mergeMap } from 'rxjs';
import { ParseMonthlyReportDto } from '../dto/parse-monthly-report.dto';
import * as csvParser from 'csv-parser';
import { MonthlyReportService } from './monthly-report.service';
import { Readable } from 'stream';
import { createObjectCsvWriter } from 'csv-writer';
import { Writable } from 'stream';
import { ReportData } from '../enum/report-data.enum';
import { DeepPartial } from 'typeorm';
import { MonthlyReport } from '../entities/monthly-report.entity';
import { MonthlyReportRepository } from '../repository/monthly-report.repository';

@Injectable()
export class CsvParserService {
  constructor(
    @Inject(forwardRef(() => MonthlyReportService))
    private readonly monthlyReportService: MonthlyReportService,
    private readonly monthlyReportRepository: MonthlyReportRepository,
  ) {}

  createCsvAttachment(reports: ParseMonthlyReportDto[]) {
    const columns: string[] = ['date', 'inflow', 'outflow'];
    let csv = columns.join(';') + '\n';

    reports.forEach((report) => {
      columns.forEach((column, i) => {
        if (i === 0) {
          csv += report[column];
        } else {
          csv += ';' + report[column];
        }
      });
      csv += '\n';
    });

    return csv;
  }

  writeMonthlyReports(data: ParseMonthlyReportDto[]): Writable {
    const csvStream = new Writable({ objectMode: true });

    const csvWriter = createObjectCsvWriter({
      path: 'dummy.csv',
      header: [
        { id: 'date', title: 'date' },
        { id: 'inflow', title: 'inflow' },
        { id: 'outflow', title: 'outflow' },
      ],
    });

    csvStream._write = (chunk, encoding, callback) => {
      csvWriter
        .writeRecords([chunk])
        .then(() => {
          callback();
        })
        .catch((error) => {
          callback(error);
        });
    };

    csvWriter.writeRecords([
      {
        date: 'date',
        inflow: 'inflow',
        outflow: 'outflow',
      },
    ]);

    data.forEach((row) => {
      csvStream.write(row);
    });

    csvStream.end();

    return csvStream;
  }

  generateMonthlyReportsFromCsv(
    businessOwnerId: number,
    file: Express.Multer.File,
  ): Observable<void> {
    let previousReportUpload: ParseMonthlyReportDto | null = null;

    return this.parseMonthlyReports(file).pipe(
      concatMap((reports) =>
        forkJoin(
          reports
            .sort((a, b) => a.date.getTime() - b.date.getTime())
            .map((reportUpload) => {
              const currentReport = reportUpload;
              let previousReport = previousReportUpload;

              previousReportUpload = reportUpload;

              return forkJoin({
                monthlyReport:
                  this.monthlyReportRepository.findMonthlyReportByDateAndBusinessOwnerId(
                    businessOwnerId,
                    reportUpload.date,
                  ),
                previousReport:
                  this.monthlyReportRepository.findMonthlyReportByDateAndBusinessOwnerId(
                    businessOwnerId,
                    new Date(
                      reportUpload.date.getFullYear(),
                      reportUpload.date.getMonth() - 1,
                    ),
                  ),
              }).pipe(
                mergeMap((data) => {
                  if (data.monthlyReport == null) {
                    return this.monthlyReportService.generateMonthlyReportFromUpload(
                      businessOwnerId,
                      currentReport.date,
                      currentReport,
                      previousReport,
                    );
                  }

                  let oldReport: DeepPartial<MonthlyReport> = null;
                  if (previousReport !== null) {
                    oldReport = {
                      inflow: previousReport.inflow,
                      outflow: previousReport.outflow,
                    };
                  } else if (
                    previousReport == null &&
                    data.previousReport !== null
                  ) {
                    oldReport = data.previousReport;
                  }

                  return this.monthlyReportService.updateMonthlyReport(
                    {
                      monthlyReportId: data.monthlyReport.id,
                      inflow: currentReport.inflow,
                      inflowDescription: ReportData.UPLOAD,
                      outflow: currentReport.outflow,
                      outflowDescription: ReportData.UPLOAD,
                    },
                    data.monthlyReport,
                    oldReport,
                    true,
                  );
                }),
              );
            }),
        ),
      ),
      map(() => {}),
    );
  }

  parseMonthlyReports(
    file: Express.Multer.File,
  ): Observable<ParseMonthlyReportDto[]> {
    return new Observable<ParseMonthlyReportDto[]>((observer) => {
      const parsedData: ParseMonthlyReportDto[] = [];

      const bufferStream = new Readable();
      bufferStream.push(file.buffer);
      bufferStream.push(null);

      bufferStream
        .pipe(csvParser())
        .on('data', (row) => {
          const date = row.date.split('-');
          const year = parseInt(date[0]);
          let month = date[1];
          month = parseInt(month, 10) - 1;

          const parsedRow: ParseMonthlyReportDto = {
            date: new Date(year, month),
            inflow: parseFloat(row.inflow),
            outflow: parseFloat(row.outflow),
          };

          parsedData.push(parsedRow);
        })
        .on('end', () => {
          observer.next(parsedData);
          observer.complete();
        })
        .on('error', (error) => {
          observer.error(error);
        });
    });
  }
}
