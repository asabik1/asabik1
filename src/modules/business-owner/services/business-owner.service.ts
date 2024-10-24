import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import {
  catchError,
  delayWhen,
  forkJoin,
  from,
  map,
  mergeMap,
  Observable,
  of,
  tap,
} from 'rxjs';
import { BusinessOwner } from '../entities/business-owner.entity';
import { SurveyStatus } from '../../survey/models/survey-status.enum';
import { BusinessOwnerGetResponse } from '../models/business-owner-get-response.interface';
import { BusinessOwnerGetDetailedResponse } from '../models/business-owner-get-detailed-response.interface';
import { BusinessOwnerGetAdminResponse } from '../models/business-owner-get-admin-response.interface';
import { INVESTMENT_REQUEST_STATUS } from '../../investment-request/enum/investment-status-message.enum';
import { InvestmentRequest } from '../../investment-request/entities/investment-request.entity';
import { LoanStatus } from '../../loan/enum/loan-status.enum';
import { BusinessOwnerGetDetailedAdminResponse } from '../models/business-owner-get-detailed-admin-response.interface';
import { BusinessOwnerProfilePreviewGetResponse } from '../models/business-owner-profile-preview-get-response.interface';
import FileService from '../../files/service/file.service';
import { Payload } from '../../users/models/payload-interface';
import { BusinessOwnerProfileGetResponse } from '../models/business-owner-profile-get-response.interface';
import {
  toBusinessOwnerGetAdminResponse,
  toBusinessOwnerGetDetailedAdminResponse,
  toBusinessOwnerGetDetailedResponse,
  toBusinessOwnerGetResponse,
  toBusinessOwnerProfileGetResponse,
  toBusinessOwnerProfilePreviewGetResponse,
  toBusinessOwnerSurveyAnswers,
  toMonthlyReportAdminResponse,
  toChartPoint,
  toNewestMonthlyReportAdminResponse,
  toAdminCharts,
  toIdentityScoreAdminResponse,
} from '../mapper/business-owner.mapper';
import { MonthlyReportService } from './monthly-report.service';
import { UsersService } from '../../users/services/users.service';
import { InvestmentRequestService } from '../../investment-request/services/investment-request.service';
import { BlockBusinessOwnerRequest } from '../dto/block-business-owner-request.dto';
import { DecideInvestmentRequest } from '../dto/decide-investment-request.dto';
import { BusinessOwnerSurveyAnswers } from '../models/business-owner-survey-answers.interface';
import { getNewestInvestmentRequest } from '../../../helpers/investment-requests-counters';
import { MonthlyReportRatingResponse } from '../models/monthly-report-rating-response.interface';
import {
  isInvestedInRequestByInvestor,
  toMonthlyReportRatingResponse,
} from '../../investment-request/mapper/investment-request.mapper';
import { UpdateMonthlyReportDto } from '../dto/update-monthly-report.dto';
import { ConfirmMonthlyReportDto } from '../dto/confirm-monthly-report.dto';
import { BusinessOwnerAlertsResponse } from '../models/get-business-owner-alerts.interface';
import { DecideMonthlyReport } from '../dto/decide-monthly-report.dto';
import { MonthlyReportAdminResponse } from '../models/monthly-report-admin-response.interface';
import { ChartPoint } from '../models/chart-point.interface';
import { NewestMonthlyReportAdminResponse } from '../models/newest-monthly-report-admin-response.interface';
import { CsvParserService } from './csv-parser.service';
import { AdminCharts } from '../models/admin-charts.interface';
import { PlaidService } from '../../plaid/services/plaid.service';
import { IdentityScore } from '../entities/identity-score.entity';
import { IdentityScoreResponse } from '../../plaid/models/identity-score-response.interface';
import { BusinessOwnerProfilePatchDto } from '../dto/business-owner-profile-update.dto';
import { IdentityScoreAdminResponse } from '../models/identity-score-admin-response.interface';
import { BusinessOwnerRepository } from '../repository/business-owner.repository';
import { IdentityScoreRepository } from '../repository/identity-score.repository';
import { MonthlyReportRepository } from '../repository/monthly-report.repository';
import { CreditRatingService } from '../../investment-request/services/credit-rating.service';

@Injectable()
export class BusinessOwnerService {
  constructor(
    private readonly businessOwnerRepository: BusinessOwnerRepository,
    private readonly fileService: FileService,
    @Inject(forwardRef(() => MonthlyReportService))
    private readonly monthlyReportService: MonthlyReportService,
    private readonly monthlyReportRepository: MonthlyReportRepository,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    @Inject(forwardRef(() => InvestmentRequestService))
    private readonly investmentRequestService: InvestmentRequestService,
    private readonly csvParserService: CsvParserService,
    @Inject(forwardRef(() => PlaidService))
    private readonly plaidService: PlaidService,
    private readonly identityScoreRepository: IdentityScoreRepository,
    private readonly creditRatingService: CreditRatingService,
  ) {}

  getBusinessOwners(
    payload: Payload,
    companyName?: string,
  ): Observable<BusinessOwnerGetResponse[]> {
    return this.businessOwnerRepository
      .findAllBusinessOwnersForInvestor(companyName, true)
      .pipe(
        map((businessOwnerList) => {
          return businessOwnerList
            .filter((businessOwner) =>
              this.viewBusinessOwner(
                businessOwner.investmentRequests,
                payload.investorId,
              ),
            )
            .map((businessOwner) =>
              toBusinessOwnerGetResponse(
                payload.investorId,
                businessOwner,
                this.isInvestedInCompanyByInvestor(
                  payload.investorId,
                  businessOwner,
                ),
              ),
            );
        }),
      );
  }

  getBusinessOwnerByBusinessOwnerIdForInvestor(
    businessOwnerId: number,
  ): Observable<BusinessOwnerGetDetailedResponse> {
    return this.businessOwnerRepository
      .findBusinessOwnerByBusinessOwnerIdOrFailOptionalActive(
        businessOwnerId,
        true,
      )
      .pipe(
        map((businessOwner) =>
          toBusinessOwnerGetDetailedResponse(businessOwner),
        ),
      );
  }

  getBusinessOwnersForAdmin(
    companyName?: string,
  ): Observable<BusinessOwnerGetAdminResponse[]> {
    return this.businessOwnerRepository
      .findBusinessOwnersByCompanyNameForAdmin(companyName)
      .pipe(
        map((businessOwnerList) => {
          return businessOwnerList.map((businessOwner) =>
            toBusinessOwnerGetAdminResponse(businessOwner),
          );
        }),
      );
  }

  getBusinessOwnerForAdminById(
    id: number,
  ): Observable<BusinessOwnerGetDetailedAdminResponse> {
    return forkJoin({
      businessOwner:
        this.businessOwnerRepository.findBusinessOwnerByBusinessOwnerIdOrFailOptionalActive(
          id,
        ),
      monthlyReport: this.monthlyReportRepository.findNewestMonthlyReport(id),
    }).pipe(
      map((data) =>
        toBusinessOwnerGetDetailedAdminResponse(
          data.businessOwner,
          data.monthlyReport,
        ),
      ),
      catchError((e) => {
        console.error(e);
        throw new HttpException(
          'An error occured while retrieving business owner.',
          HttpStatus.NOT_FOUND,
        );
      }),
    );
  }

  getBusinessOwnersMonthlyReport(
    businessOwnerId: number,
  ): Observable<MonthlyReportRatingResponse> {
    return this.monthlyReportRepository
      .findNewestMonthlyReport(businessOwnerId)
      .pipe(
        tap((monthlyReport) => {
          const fiveDaysFromReport = new Date(
            monthlyReport.createdAt.getTime() + 5 * 24 * 60 * 60 * 1000,
          );

          if (
            monthlyReport.isConfirmed == true ||
            fiveDaysFromReport <= new Date()
          ) {
            throw new HttpException(
              'You have no pending reports.',
              HttpStatus.BAD_REQUEST,
            );
          }
        }),
        map((monthlyReport) => toMonthlyReportRatingResponse(monthlyReport)),
      );
  }

  getBusinessOwnerAlerts(
    businessOwnerId: number,
  ): Observable<BusinessOwnerAlertsResponse> {
    return forkJoin({
      investmentRequest:
        this.investmentRequestService.getNewestInvestmentRequest(
          businessOwnerId,
        ),
      monthlyReport:
        this.monthlyReportRepository.findNewestMonthlyReport(businessOwnerId),
      businessOwner:
        this.businessOwnerRepository.findBusinessOwnerByBusinessOwnerId(
          businessOwnerId,
        ),
    }).pipe(
      map((data) => {
        const monthlyReport = data.monthlyReport;
        let isInvestmentRequestExpired = false;

        if (
          data.investmentRequest &&
          data.investmentRequest.status == INVESTMENT_REQUEST_STATUS.CLOSED
        ) {
          isInvestmentRequestExpired = true;
        }

        let isReportPending = false;
        if (monthlyReport !== null) {
          isReportPending = !monthlyReport.isConfirmed;

          if (
            !monthlyReport.isConfirmed &&
            monthlyReport.originalMonthlyReport
          ) {
            isReportPending = false;
          }
        }

        let isVerified = false;
        if (data.businessOwner.user.isVerified) {
          isVerified = data.businessOwner.user.isVerified;
        }

        return {
          isReportPending: isReportPending,
          isProfileIncomplete: !data.businessOwner.isProfileComplete,
          isInvestmentRequestExpired: isInvestmentRequestExpired,
          isVerified: isVerified,
        };
      }),
    );
  }

  getMonthlyReportChartData(businessOwnerId: number): Observable<ChartPoint[]> {
    return this.monthlyReportRepository
      .findLast24MonthlyReports(businessOwnerId)
      .pipe(
        map((monthlyReports) => monthlyReports.reverse()),
        map((monthlyReports) =>
          monthlyReports.map((monthlyReport) => toChartPoint(monthlyReport)),
        ),
      );
  }

  updateBusinessOwnersMonthlyReport(
    updateMonthlyReportDto: UpdateMonthlyReportDto,
    businessOwnerId: number,
  ): Observable<void> {
    return forkJoin({
      currentMonthlyReport:
        this.monthlyReportRepository.findMonthlyReportByMonthlyReportId(
          updateMonthlyReportDto.monthlyReportId,
        ),
      previousReport:
        this.monthlyReportRepository.findPreviousMonthlyReportByDateAndBusinessOwnerId(
          businessOwnerId,
          new Date(),
        ),
    }).pipe(
      tap((data) => {
        const fiveDaysFromReport = new Date(
          data.currentMonthlyReport.reportDate.getTime() +
            5 * 24 * 60 * 60 * 1000,
        );

        if (fiveDaysFromReport <= new Date()) {
          throw new HttpException(
            "You can't alter the report after five days from receiving it.",
            HttpStatus.BAD_REQUEST,
          );
        }
      }),
      mergeMap((data) =>
        this.monthlyReportService.updateMonthlyReport(
          updateMonthlyReportDto,
          data.currentMonthlyReport,
          data.previousReport,
          false,
        ),
      ),
    );
  }

  confirmMonthlyReportByBusinessOwner(
    confirmMonthlyReportDto: ConfirmMonthlyReportDto,
  ): Observable<void> {
    return this.monthlyReportRepository
      .findMonthlyReportByMonthlyReportId(
        confirmMonthlyReportDto.monthlyReportId,
      )
      .pipe(
        tap((monthlyReport) => {
          if (monthlyReport.originalMonthlyReport) {
            throw new HttpException(
              'Admin will now confirm your updates of Monthly Report.',
              HttpStatus.BAD_REQUEST,
            );
          }
        }),
        mergeMap((monthlyReport) =>
          this.monthlyReportService.confirmMonthlyReport(monthlyReport.id),
        ),
      );
  }

  getSurveyAnswers(
    businessOwnerId: number,
  ): Observable<BusinessOwnerSurveyAnswers> {
    return this.businessOwnerRepository
      .findBusinessOwnerByBusinessOwnerId(businessOwnerId)
      .pipe(
        map((businessOwner) =>
          toBusinessOwnerSurveyAnswers(
            businessOwner,
            getNewestInvestmentRequest(businessOwner.investmentRequests),
          ),
        ),
      );
  }

  getBusinessOwnersProfile(
    businessOwnerId: number,
  ): Observable<BusinessOwnerProfileGetResponse> {
    this.investmentRequestService.updateInvestmentRequestsStatuses(
      businessOwnerId,
    );

    return this.businessOwnerRepository
      .findBusinessOwnerByBusinessOwnerIdOrFailOptionalActive(businessOwnerId)
      .pipe(
        map((businessOwner) => {
          return toBusinessOwnerProfileGetResponse(
            businessOwner,
            this.isValidForRequest(
              getNewestInvestmentRequest(businessOwner.investmentRequests),
            ),
          );
        }),
      );
  }

  getBusinessOwnersProfilePreview(
    businessOwnerId: number,
  ): Observable<BusinessOwnerProfilePreviewGetResponse> {
    return this.businessOwnerRepository
      .findBusinessOwnerByBusinessOwnerIdOrFailOptionalActive(businessOwnerId)
      .pipe(
        map((businessOwner) => {
          return toBusinessOwnerProfilePreviewGetResponse(
            businessOwner,
            this.isValidForRequest(
              getNewestInvestmentRequest(businessOwner.investmentRequests),
            ),
          );
        }),
      );
  }

  getBusinessOwnersNewestMonthlyReport(
    businessOwnerId: number,
  ): Observable<NewestMonthlyReportAdminResponse> {
    return this.monthlyReportRepository
      .findNewestMonthlyReport(businessOwnerId)
      .pipe(
        map((monthlyReport) =>
          toNewestMonthlyReportAdminResponse(monthlyReport),
        ),
        catchError((err) => {
          throw new HttpException(
            'No reports found.',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }),
      );
  }

  getBusinessOwnersMonthlyReportForAdmin(
    businessOwnerId: number,
  ): Observable<MonthlyReportAdminResponse> {
    return this.monthlyReportRepository
      .findNewestMonthlyReport(businessOwnerId)
      .pipe(
        tap((monthlyReport) => {
          if (monthlyReport !== null) {
            if (monthlyReport.isConfirmed) {
              throw new HttpException(
                'Monthly report is already confirmed.',
                HttpStatus.BAD_REQUEST,
              );
            }

            if (!monthlyReport.originalMonthlyReport) {
              throw new HttpException(
                "User haven't updated his report yet.",
                HttpStatus.BAD_REQUEST,
              );
            }
          } else {
            throw new HttpException(
              'No reports found.',
              HttpStatus.BAD_REQUEST,
            );
          }
        }),
        map((monthlyReport) => toMonthlyReportAdminResponse(monthlyReport)),
      );
  }

  getAdminCharts(): Observable<AdminCharts> {
    return forkJoin({
      monthlyReports:
        this.monthlyReportRepository.findMonthlyReportsFromTwoYearsBack(),
      investmentRequests:
        this.investmentRequestService.findAllAcceptedInvestmentRequests(),
    }).pipe(
      map((data) =>
        toAdminCharts(data.monthlyReports, data.investmentRequests),
      ),
      catchError((err) => {
        throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
      }),
    );
  }

  uploadProfileImage(
    userId: number,
    file: Express.Multer.File,
  ): Observable<void> {
    return this.businessOwnerRepository
      .findBusinessOwnerByUserIdOrFail(userId)
      .pipe(
        mergeMap((businessOwner) =>
          this.fileService.uploadFile(
            file.buffer,
            file.originalname,
            businessOwner?.image?.id,
          ),
        ),
        mergeMap((file) =>
          this.updateByUserId(userId, {
            image: file,
          }),
        ),
        map(() => {}),
      );
  }

  deleteProfileImage(
    userId: number,
    businessOwnerId: number,
  ): Observable<void> {
    return this.businessOwnerRepository
      .findBusinessOwnerByUserIdOrFail(userId)
      .pipe(
        tap((businessOwner) => {
          if (!businessOwner.image) {
            throw new HttpException(
              'Image does not exist',
              HttpStatus.NOT_FOUND,
            );
          }
        }),
        delayWhen(() =>
          this.updateBusinessOwner(businessOwnerId, {
            image: null,
          }),
        ),
        mergeMap((businessOwner) =>
          this.fileService.deleteFile(businessOwner.image.id),
        ),
        map(() => {}),
      );
  }

  deleteBusinessOwner(payload: Payload): Observable<void> {
    return this.businessOwnerRepository
      .findBusinessOwnerByBusinessOwnerId(payload.businessOwnerId)
      .pipe(
        tap((businessOwner) => {
          if (
            !this.isValidForRequest(
              getNewestInvestmentRequest(businessOwner.investmentRequests),
            )
          ) {
            throw new HttpException(
              'You cannot remove your account, due to an active investment request.',
              HttpStatus.FORBIDDEN,
            );
          } else if (!this.canDelete(businessOwner.investmentRequests)) {
            return this.usersService.freezeAccount(payload.userId);
          }
        }),
        mergeMap((businessOwner) =>
          this.monthlyReportService
            .removeReportsForBusinessOwner(businessOwner.id)
            .pipe(
              mergeMap(() => this.usersService.removeUser(payload.userId)),
              mergeMap((user) =>
                this.businessOwnerRepository.removeBusinessOwner(
                  user.businessOwner,
                ),
              ),
            ),
        ),
        map(() => {}),
      );
  }

  decideInvestmentRequestForManualProcessing(
    decideInvestmentRequest: DecideInvestmentRequest,
  ): Observable<void> {
    return this.investmentRequestService
      .findOneOrFail(decideInvestmentRequest.investmentRequestId)
      .pipe(
        tap((investmentRequest) => {
          if (
            investmentRequest.status !==
            INVESTMENT_REQUEST_STATUS.MANUAL_PROCESSING
          ) {
            throw new HttpException(
              'Request is not valid for manual processing',
              HttpStatus.BAD_REQUEST,
            );
          }
        }),
        mergeMap((investmentRequest) =>
          this.investmentRequestService.approveInvestmentRequestFromManualProcessing(
            investmentRequest,
            decideInvestmentRequest.isApproved,
          ),
        ),
      );
  }

  decideMonthlyReport(
    decideMonthlyReport: DecideMonthlyReport,
  ): Observable<void> {
    return this.monthlyReportService.confirmReportByAdmin(decideMonthlyReport);
  }

  blockOrUnblockBusinessOwner(
    businessOwnerId: number,
    blockBusinessOwner: BlockBusinessOwnerRequest,
  ): Observable<void> {
    return this.businessOwnerRepository
      .findBusinessOwnerByBusinessOwnerId(businessOwnerId)
      .pipe(
        tap((businessOwner) => {
          if (
            !this.isValidForRequest(
              getNewestInvestmentRequest(businessOwner.investmentRequests),
            )
          ) {
            throw new HttpException(
              'You cannot block business owner with an active investment request.',
              HttpStatus.BAD_REQUEST,
            );
          }
        }),
        mergeMap((businessOwner) => {
          const surveyStatus = blockBusinessOwner.isBlocked
            ? SurveyStatus.BLOCKED
            : SurveyStatus.QUALIFIES;

          return from(
            this.usersService.update(businessOwner.user.id, {
              surveyStatus: surveyStatus,
            }),
          );
        }),
        map(() => {}),
      );
  }

  isComplete(businessOwnerId: number): Observable<boolean> {
    return this.businessOwnerRepository
      .findCompletedBusinessOwnerByBusinessOwnerId(businessOwnerId)
      .pipe(map((businessOwner) => !!businessOwner));
  }

  isInvestedInCompanyByInvestor(
    investorId: number,
    businessOwner: BusinessOwner,
  ): boolean {
    return businessOwner.investmentRequests.some((investmentRequest) =>
      investmentRequest.investments.some(
        (investment) => investment.investor.id === investorId,
      ),
    );
  }

  updateProfileStatus(businessOwnerId: number): Observable<BusinessOwner> {
    return this.businessOwnerRepository
      .findBusinessOwnerByBusinessOwnerIdOrFailOptionalActive(businessOwnerId)
      .pipe(
        delayWhen((businessOwner) =>
          this.isComplete(businessOwner.id).pipe(
            tap((isComplete) => {
              businessOwner.isProfileComplete = isComplete;
            }),
          ),
        ),
        mergeMap((businessOwner) =>
          this.businessOwnerRepository.saveBusinessOwner(businessOwner),
        ),
      );
  }

  createBusinessOwner(
    businessOwner: Partial<BusinessOwner> = {},
  ): Observable<BusinessOwner> {
    const newBusinessOwner =
      this.businessOwnerRepository.createBusinessOwner(businessOwner);
    newBusinessOwner.isProfileComplete = false;

    return from(
      this.businessOwnerRepository.saveBusinessOwner(newBusinessOwner),
    );
  }

  updateByUserId(
    userId: number,
    updateProfileDto: Partial<BusinessOwner>,
  ): Observable<BusinessOwner> {
    return this.businessOwnerRepository
      .findBusinessOwnerByUserIdOrFail(userId)
      .pipe(
        map((businessOwner) => {
          return this.businessOwnerRepository.createBusinessOwner({
            ...businessOwner,
            ...updateProfileDto,
          });
        }),
        mergeMap((businessOwner) =>
          this.businessOwnerRepository.saveBusinessOwner(businessOwner),
        ),
        delayWhen((businessOwner) =>
          this.updateProfileStatus(businessOwner.id),
        ),
      );
  }

  updateBusinessOwner(
    businessOwnerId: number,
    updateProfileDto: Partial<BusinessOwner>,
  ): Observable<BusinessOwner> {
    return this.businessOwnerRepository
      .findBusinessOwnerByBusinessOwnerIdOrFailOptionalActive(businessOwnerId)
      .pipe(
        map((businessOwner) => {
          return this.businessOwnerRepository.createBusinessOwner({
            ...businessOwner,
            ...updateProfileDto,
          });
        }),
        mergeMap((businessOwner) =>
          this.businessOwnerRepository.saveBusinessOwner(businessOwner),
        ),
        delayWhen((businessOwner) =>
          this.updateProfileStatus(businessOwner.id),
        ),
      );
  }

  patchProfile(
    businessOwnerId: number,
    bisnessOwnerPatchDto: BusinessOwnerProfilePatchDto,
  ): Observable<void> {
    return this.updateBusinessOwner(businessOwnerId, bisnessOwnerPatchDto).pipe(
      mergeMap((businessOwner) =>
        this.createOrUpdateIdentityScore(businessOwner),
      ),
      map(() => {}),
    );
  }

  createOrUpdateIdentityScore(businessOwner: BusinessOwner): Observable<void> {
    return this.plaidService.getIdentityMatch(businessOwner.user.id).pipe(
      mergeMap((identityScoreResponse) => {
        if (businessOwner.identityScore == null) {
          return this.createIdentityScore(
            businessOwner,
            identityScoreResponse,
          ).pipe(
            mergeMap((identityScore) =>
              this.businessOwnerRepository.updateBusinessOwner(
                businessOwner.id,
                {
                  identityScore: identityScore,
                },
              ),
            ),
          );
        } else {
          return this.updateBusinessOwnersIdentityScore(businessOwner.id, {
            ownerNameScore: identityScoreResponse.name,
            phoneScore: identityScoreResponse.phoneNumber,
            emailScore: identityScoreResponse.email,
            addressScore: identityScoreResponse.address,
          });
        }
      }),
      map(() => {}),
    );
  }

  createIdentityScore(
    businessOwner: BusinessOwner,
    identityScoreResponse: IdentityScoreResponse,
  ): Observable<IdentityScore> {
    const identity: DeepPartial<IdentityScore> = {
      ownerNameScore: identityScoreResponse.name,
      phoneScore: identityScoreResponse.phoneNumber,
      emailScore: identityScoreResponse.email,
      addressScore: identityScoreResponse.address,
      businessOwner: businessOwner,
    };

    return from(this.identityScoreRepository.saveIdentityScore(identity));
  }

  updateBusinessOwnersIdentityScore(
    businessOwnerId: number,
    identityScoreUpdate: DeepPartial<IdentityScore>,
  ): Observable<void> {
    return this.identityScoreRepository
      .findIdentityScoreByBusinessOwnerId(businessOwnerId)
      .pipe(
        mergeMap((identityScore) =>
          this.identityScoreRepository.updateIdentityScore(
            identityScore.id,
            identityScoreUpdate,
          ),
        ),
        map(() => {}),
      );
  }

  getBusinessOwnersIdentityScore(
    businessOwnerId: number,
  ): Observable<IdentityScoreAdminResponse> {
    return this.businessOwnerRepository
      .findBusinessOwnerByBusinessOwnerId(businessOwnerId)
      .pipe(
        mergeMap((businessOwner) =>
          forkJoin({
            extractedIdentity: this.plaidService.getIdentity(
              businessOwner.user.id,
            ),
            identityScore:
              this.identityScoreRepository.findIdentityScoreByBusinessOwnerId(
                businessOwner.id,
              ),
          }).pipe(
            map((data) =>
              toIdentityScoreAdminResponse(
                data.extractedIdentity,
                data.identityScore,
              ),
            ),
          ),
        ),
      );
  }

  viewBusinessOwner(
    investmentRequests: InvestmentRequest[],
    investorId: number,
  ): boolean {
    const sortedRequests = [...investmentRequests].sort((a, b) => {
      return b.approvedAt.getTime() - a.approvedAt.getTime();
    });

    if (
      sortedRequests.length > 0 &&
      (sortedRequests[0].status === INVESTMENT_REQUEST_STATUS.CLOSED ||
        sortedRequests[0].status === INVESTMENT_REQUEST_STATUS.OPEN ||
        sortedRequests[0].status === INVESTMENT_REQUEST_STATUS.TRANSFERED)
    ) {
      if (sortedRequests[0].loan) {
        return isInvestedInRequestByInvestor(investorId, sortedRequests[0]);
      }
      return true;
    }

    return false;
  }

  isValidForRequest(investmentRequest: InvestmentRequest): boolean {
    if (investmentRequest == null) {
      return true;
    }

    if (investmentRequest.loan) {
      if (investmentRequest.loan.loanStatus == LoanStatus.FULLY_PAYED) {
        return true;
      } else {
        return false;
      }
    } else {
      if (investmentRequest.status == INVESTMENT_REQUEST_STATUS.CANCELLED) {
        return true;
      } else {
        return false;
      }
    }
  }

  canDelete(investmentRequests: InvestmentRequest[]): boolean {
    if (investmentRequests == null) {
      return true;
    }

    investmentRequests.some((investmentRequest) => {
      if (investmentRequest.investments !== null) {
        return false;
      }
    });

    return true;
  }

  uploadReports(
    businessOwnerId: number,
    csvFile: Express.Multer.File,
  ): Observable<void> {
    return this.investmentRequestService
      .getAllByBusinessOwnerId(businessOwnerId)
      .pipe(
        // tap((investmentRequests) => {
        //   if (investmentRequests.length !== 0) {
        //     throw new HttpException(
        //       'You cannot upload reports because business owner has an active Investment Request.',
        //       HttpStatus.BAD_REQUEST,
        //     );
        //   }
        // }),
        mergeMap(() =>
          this.csvParserService.generateMonthlyReportsFromCsv(
            businessOwnerId,
            csvFile,
          ),
        ),
        mergeMap(() =>
          of(this.creditRatingService.updateInvestmentRequestsRatings()),
        ),
        catchError((e) => {
          throw new HttpException(
            'An error occured during reports upload.',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }),
      );
  }
}
