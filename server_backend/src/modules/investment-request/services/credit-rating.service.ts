/* eslint-disable prettier/prettier */
import {
  Injectable,
  Logger,
  Inject,
  forwardRef,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FinancialReport } from '../../business-owner/entities/financial-report.entity';
import { Rating } from '../enum/rating.enum';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Observable,
  catchError,
  concatMap,
  delayWhen,
  filter,
  forkJoin,
  from,
  map,
  mergeMap,
  of,
  toArray,
  zip,
} from 'rxjs';
import { BusinessOwnerService } from '../../business-owner/services/business-owner.service';
import { DeepPartial, Repository } from 'typeorm';
import { InvestmentRequest } from '../entities/investment-request.entity';
import { Cron, CronExpression } from '@nestjs/schedule';
import { UsersService } from '../../users/services/users.service';
import { InvestmentRequestService } from './investment-request.service';
import { GlobalSettingsService } from '../../global-settings/services/global-settings.service';
import { MESSAGE_TO_BUSINESS_OWNER } from '../enum/message-to-business-owner.enum';
import { CreditRatingData } from '../entities/credit-rating-data.entity';
import { MailService } from '../../mail/services/mail.service';
import { EMAIL_SUBJECT } from '../../mail/enum/mail-subject.enum';
import { INVESTMENT_REQUEST_STATUS } from '../enum/investment-status-message.enum';
import { generateFinancialReport } from '../../../helpers/investment-requests-counters';
import { RatingSettingsService } from '../../global-settings/services/rating-settings.service';
import { BusinessOwnerRepository } from '../../business-owner/repository/business-owner.repository';
import { MonthlyReportRepository } from '../../business-owner/repository/monthly-report.repository';
import { GetGlobalSettingsResponse } from '../../global-settings/models/global-settings-response.interface';

@Injectable()
export class CreditRatingService {
  logger = new Logger('CreditRatingService');

  constructor(
    @InjectRepository(InvestmentRequest)
    private readonly investmentRequestRepository: Repository<InvestmentRequest>,
    @Inject(forwardRef(() => BusinessOwnerService))
    private readonly businessOwnerService: BusinessOwnerService,
    private readonly businessOwnerRepository: BusinessOwnerRepository,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    @Inject(forwardRef(() => InvestmentRequestService))
    private readonly investmentRequestService: InvestmentRequestService,
    private readonly monthlyReportRepository: MonthlyReportRepository,
    private readonly globalSettingsService: GlobalSettingsService,
    private readonly ratingSettingsService: RatingSettingsService,
    private readonly mailService: MailService,
  ) {}

  calculateCreditRating(
    financialReport: FinancialReport,
    termInMonths: number,
    globalSettings: GetGlobalSettingsResponse,
  ): Observable<DeepPartial<CreditRatingData>> {
    const Y: number = Math.ceil(termInMonths / 12);
    const E: number = financialReport.averageE;
    const L: number = financialReport.averageL;
    const VI: number = financialReport.vInflow;

    const O: number = 12 * L * Y;
    const I: number = 12 * E * Y;

    const d1: number =
      (Math.log(I / O) + (globalSettings.r + VI ** 2 / 2) * Y) /
      (VI * Y ** 0.5);
    const d2: number = d1 - VI * Y ** 0.5;
    const d0: number = d2 * globalSettings.m + globalSettings.a;
    const PoD: number = this.calculateNormSDist(-d0);

    return forkJoin({
      maxLoanCalc: this.calculateMaxLoan(Y, VI, E, L, globalSettings.r),
      rating: this.ratingSettingsService.getRatingByYearAndScore(Y, PoD),
    }).pipe(
      map((data) => {
        return {
          rating: data.rating.rating,
          low: data.rating.low,
          high: data.rating.high,
          o: O,
          i: I,
          d1: d1,
          d2: d2,
          d0: d0,
          pod: PoD,
          maxLoanCalc: data.maxLoanCalc,
        };
      }),
    );
  }

  calculateMaxLoan(
    Y: number,
    VI: number,
    E: number,
    L: number,
    R: number,
  ): Observable<number> {
    return this.ratingSettingsService
      .findRatingBoundary(Y)
      .pipe(
        mergeMap((crb) =>
          of(
            (12 * E * Y) /
              Math.exp(
                (-1 * this.normSInv(crb) + VI * Y ** 0.5) * (VI * Y ** 0.5) -
                  (R + VI ** 2 / 2) * Y,
              ) -
              12 * L * Y,
          ),
        ),
      );
  }

  calculateMaxLoanApproved(requestedAmount: number, maxLoan: number): number {
    if (maxLoan > requestedAmount) {
      return requestedAmount;
    }

    return Math.round(maxLoan / 500) * 500;
  }

  calculateDti(financialReport: FinancialReport, termInMonths: number): string {
    const Y = termInMonths / 12;
    const E = financialReport.averageE;
    const L = financialReport.averageL;

    const dti = ((12 * L * Y) / (12 * E * Y)) * 100;
    const roundedDti = dti.toFixed(2);

    return `${roundedDti}%`;
  }

  calculateNormSDist(x: number): number {
    const t = 1 / (1 + 0.2316419 * Math.abs(x));
    const d = 0.3989423 * Math.exp((-x * x) / 2);
    const p =
      d *
      t *
      (0.3193815 +
        t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
    const cdf = x < 0 ? p : 1 - p;

    return cdf;
  }

  normSInv(p: number): number {
    var a1 = -39.6968302866538,
      a2 = 220.946098424521,
      a3 = -275.928510446969;
    var a4 = 138.357751867269,
      a5 = -30.6647980661472,
      a6 = 2.50662827745924;
    var b1 = -54.4760987982241,
      b2 = 161.585836858041,
      b3 = -155.698979859887;
    var b4 = 66.8013118877197,
      b5 = -13.2806815528857,
      c1 = -7.78489400243029e-3;
    var c2 = -0.322396458041136,
      c3 = -2.40075827716184,
      c4 = -2.54973253934373;
    var c5 = 4.37466414146497,
      c6 = 2.93816398269878,
      d1 = 7.78469570904146e-3;
    var d2 = 0.32246712907004,
      d3 = 2.445134137143,
      d4 = 3.75440866190742;
    var p_low = 0.02425,
      p_high = 1 - p_low;
    var q, r;
    var retVal;

    if (p < 0 || p > 1) {
      alert('NormSInv: Argument out of range.');
      retVal = 0;
    } else if (p < p_low) {
      q = Math.sqrt(-2 * Math.log(p));
      retVal =
        (((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) /
        ((((d1 * q + d2) * q + d3) * q + d4) * q + 1);
    } else if (p <= p_high) {
      q = p - 0.5;
      r = q * q;
      retVal =
        ((((((a1 * r + a2) * r + a3) * r + a4) * r + a5) * r + a6) * q) /
        (((((b1 * r + b2) * r + b3) * r + b4) * r + b5) * r + 1);
    } else {
      q = Math.sqrt(-2 * Math.log(1 - p));
      retVal =
        -(((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) /
        ((((d1 * q + d2) * q + d3) * q + d4) * q + 1);
    }

    return retVal;
  }

  updateCreditRatingAndDti(
    investmentRequest: InvestmentRequest,
    rating: Rating,
    dti: string,
  ): Observable<void> {
    if (investmentRequest.investments.length == null) {
      return from(
        this.investmentRequestRepository.update(investmentRequest.id, {
          rating: rating,
          dti: dti,
        }),
      ).pipe(
        delayWhen(() =>
          this.businessOwnerService.updateProfileStatus(
            investmentRequest.businessOwner.id,
          ),
        ),
        map(() => {}),
      );
    } else {
      return from(
        this.investmentRequestRepository.update(investmentRequest.id, {
          ratingUpdate: rating,
          dti: dti,
        }),
      ).pipe(
        delayWhen(() =>
          this.businessOwnerService.updateProfileStatus(
            investmentRequest.businessOwner.id,
          ),
        ),
        map(() => {}),
      );
    }
  }

  @Cron('10 0 10 * *') // updated 10 minutes after plaid verification is updated
  updateInvestmentRequestsRatings(): void {
    this.logger.log(
      "Execute cron job - update users investment's credit ratings",
    );

    forkJoin({
      investmentRequests:
        this.investmentRequestService.findAllAcceptedInvestmentRequests(),
      globalSettings: this.globalSettingsService.getGlobalSettings(),
    })
      .pipe(
        mergeMap((data) =>
          data.investmentRequests.map((investmentRequest) =>
            this.calculateCreditRating(
              generateFinancialReport(
                investmentRequest.businessOwner.monthlyReports,
                investmentRequest.businessOwner.id,
              ),
              investmentRequest.returnTerm,
              data.globalSettings,
            )
              .pipe(
                mergeMap((rating) =>
                  this.updateCreditRatingAndDti(
                    investmentRequest,
                    rating.rating,
                    this.calculateDti(
                      generateFinancialReport(
                        investmentRequest.businessOwner.monthlyReports,
                        investmentRequest.businessOwner.id,
                      ),
                      investmentRequest.returnTerm,
                    ),
                  ),
                ),
              )
              .subscribe(() => {}),
          ),
        ),
        catchError((error) => {
          console.error(error);
          throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }),
      )
      .subscribe(() => {});
  }

  @Cron(CronExpression.EVERY_HOUR)
  updateInvestmentRequestsFromSurvey() {
    this.logger.log(
      'Execute cron job - process investment requests from survey',
    );

    try {
      forkJoin({
        businessOwners: this.businessOwnerRepository.findAllBusinessOwners(),
        globalSettings: this.globalSettingsService.getGlobalSettings(),
      })
        .pipe(
          concatMap((data) =>
            from(data.businessOwners).pipe(
              concatMap((businessOwner) =>
                this.monthlyReportRepository
                  .findMonthlyReportsByBusinessOwnerId(businessOwner.id)
                  .pipe(
                    mergeMap((monthlyReports) => {
                      if (monthlyReports === null) {
                        return of();
                      }

                      return from(businessOwner.investmentRequests).pipe(
                        filter(
                          (investmentRequest) =>
                            investmentRequest.status ===
                            INVESTMENT_REQUEST_STATUS.PROCESSING_FROM_SURVEY,
                        ),
                        mergeMap((investmentRequest) =>
                          this.investmentRequestService
                            .generateCreditRatingAndSaveNewInvestmentRequest(
                              businessOwner,
                              investmentRequest,
                              businessOwner.monthlyReports,
                              data.globalSettings,
                            )
                            .pipe(
                              mergeMap((investmentRequest) => {
                                let text =
                                  MESSAGE_TO_BUSINESS_OWNER.SUCCESSFUL_CREDIT_RATING.replace(
                                    '{approvedLoan}',
                                    investmentRequest.requiredCapital.toString(),
                                  );

                                if (
                                  investmentRequest.status ==
                                  INVESTMENT_REQUEST_STATUS.MANUAL_PROCESSING
                                ) {
                                  text =
                                    MESSAGE_TO_BUSINESS_OWNER.OVER_3_YEARS_MANUAL_APPROVAL;
                                } else {
                                  text =
                                    MESSAGE_TO_BUSINESS_OWNER.FROM_SURVEY_REJECTED;
                                }

                                return this.mailService.sendNotification(
                                  businessOwner.user.email,
                                  EMAIL_SUBJECT.INVESTMENT_FROM_SURVEY,
                                  text,
                                );
                              }),
                            ),
                        ),
                        catchError(() =>
                          from(
                            this.investmentRequestRepository.findOneOrFail({
                              where: {
                                businessOwner: {
                                  id: businessOwner.id,
                                },
                                status:
                                  INVESTMENT_REQUEST_STATUS.PROCESSING_FROM_SURVEY,
                              },
                            }),
                          ).pipe(
                            mergeMap((investmentRequest) =>
                              this.investmentRequestService.delete(
                                investmentRequest.id,
                              ),
                            ),
                            catchError(() => of()),
                          ),
                        ),
                        toArray(),
                      );
                    }),
                  ),
              ),
            ),
          ),
        )
        .subscribe(() => {});
    } catch (error) {
      this.logger.error(error);
    }
  }
}
