import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { Observable, catchError, from, map, mergeMap, of } from 'rxjs';
import { UpdateGlobalSettingsDto } from '../dto/global-settings-update.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { GlobalSettings } from '../entities/global-settings.entity';
import { Repository } from 'typeorm';
import { CreateGlobalSettingsDto } from '../dto/global-settings-create.dto';
import { GetGlobalSettingsResponse } from '../models/global-settings-response.interface';
import { UserIdentity } from '../../plaid/models/user-identy.interface';
import { PlaidService } from '../../plaid/services/plaid.service';
import { CreditRatingService } from '../../investment-request/services/credit-rating.service';

@Injectable()
export class GlobalSettingsService {
  constructor(
    @InjectRepository(GlobalSettings)
    private readonly globalSettingsRepository: Repository<GlobalSettings>,
    @Inject(forwardRef(() => PlaidService))
    private readonly plaidService: PlaidService,
    @Inject(forwardRef(() => CreditRatingService))
    private readonly creditRatingService: CreditRatingService,
  ) {}

  MAX_RETURN_TERM_WO_MANUAL_PROCESSING = 3;
  R = 0.0;
  M = 1.05;
  A = 0.0;
  RAISING_TIME_LIMIT = 7;
  APPLICATION_FEE = 500;
  MIN_LOAN = 2000;
  MAX_LOAN = 50000;
  INVALID_TRANSACTION_PENALTY = 10;
  PLAID_TOKEN_PENALTY = 50;

  private getGlobalSettingsOrFail(): Observable<GlobalSettings> {
    return from(this.globalSettingsRepository.find()).pipe(
      mergeMap((settings) => {
        if (settings.length != 1) {
          const defaultSettings: CreateGlobalSettingsDto = {
            maxReturnTermWOManualProcessing:
              this.MAX_RETURN_TERM_WO_MANUAL_PROCESSING,
            r: this.R,
            m: this.M,
            a: this.A,
            raisingTimeLimit: this.RAISING_TIME_LIMIT,
            applicationFee: this.APPLICATION_FEE,
            minLoan: this.MIN_LOAN,
            maxLoan: this.MAX_LOAN,
            invalidTransactionPenalty: this.INVALID_TRANSACTION_PENALTY,
            plaidTokenPenalty: this.PLAID_TOKEN_PENALTY,
          };

          return from(this.globalSettingsRepository.save(defaultSettings));
        }

        return of(settings[0]);
      }),
    );
  }

  getGlobalSettings(): Observable<GetGlobalSettingsResponse> {
    return this.getGlobalSettingsOrFail().pipe(
      mergeMap((settings) => {
        const getGlobalSettingsResponse: GetGlobalSettingsResponse = {
          maxReturnTermWOManualProcessing:
            settings.maxReturnTermWOManualProcessing,
          r: settings.r,
          m: settings.m,
          a: settings.a,
          raisingTimeLimit: settings.raisingTimeLimit,
          applicationFee: settings.applicationFee,
          minLoan: settings.minLoan,
          maxLoan: settings.maxLoan,
          invalidTransactionPenalty: settings.invalidTransactionPenalty,
          plaidTokenPenalty: settings.plaidTokenPenalty,
        };

        this.MAX_RETURN_TERM_WO_MANUAL_PROCESSING =
          settings.maxReturnTermWOManualProcessing;
        this.R = settings.r;
        this.M = settings.m;
        this.A = settings.a;
        this.RAISING_TIME_LIMIT = settings.raisingTimeLimit;
        this.APPLICATION_FEE = settings.applicationFee;
        this.MIN_LOAN = settings.minLoan;
        this.MAX_LOAN = settings.maxLoan;
        this.INVALID_TRANSACTION_PENALTY = settings.invalidTransactionPenalty;
        this.PLAID_TOKEN_PENALTY = settings.plaidTokenPenalty;

        return of(getGlobalSettingsResponse);
      }),
    );
  }

  getAdminPaymentData(userId: number): Observable<UserIdentity> {
    return this.plaidService.getIdentity(userId);
  }

  updateGlobalSettings(updateDto: UpdateGlobalSettingsDto): Observable<void> {
    return this.getGlobalSettingsOrFail().pipe(
      mergeMap((existingSettings) => {
        if (!existingSettings) {
          throw new Error('Global settings not found.');
        }

        existingSettings.maxReturnTermWOManualProcessing =
          updateDto.maxReturnTermWOManualProcessing;
        existingSettings.r = updateDto.r;
        existingSettings.m = updateDto.m;
        existingSettings.a = updateDto.a;
        existingSettings.raisingTimeLimit = updateDto.raisingTimeLimit;
        existingSettings.applicationFee = updateDto.applicationFee;
        existingSettings.minLoan = updateDto.minLoan;
        existingSettings.maxLoan = updateDto.maxLoan;
        existingSettings.invalidTransactionPenalty =
          updateDto.invalidTransactionPenalty;
        existingSettings.plaidTokenPenalty = updateDto.plaidTokenPenalty;

        return from(this.globalSettingsRepository.save(existingSettings)).pipe(
          mergeMap(() =>
            of(this.creditRatingService.updateInvestmentRequestsRatings()),
          ),
          map(() => {}),
        );
      }),
      catchError((error) => {
        console.error(error);
        throw new HttpException(
          'Error occured during updating ratings',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }),
    );
  }
}
