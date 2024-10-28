import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import {
  AddressData,
  Configuration,
  CountryCode,
  IdentityVerificationStatus,
  ItemPublicTokenExchangeResponse,
  LinkTokenCreateResponse,
  Owner,
  PlaidApi,
  PlaidEnvironments,
  ProcessorTokenCreateRequestProcessorEnum,
  ProcessorTokenCreateResponse,
  Products,
  TransactionsGetResponse,
} from 'plaid';
import {
  catchError,
  forkJoin,
  from,
  iif,
  map,
  mergeMap,
  Observable,
  of,
  tap,
} from 'rxjs';
import { dateToString } from '../../../helpers/date-to-string';
import { UsersService } from '../../users/services/users.service';
import { UserIdentity } from '../models/user-identy.interface';
import { Payload } from '../../users/models/payload-interface';
import { Role } from '../../auth/enums/role.enum';
import { UpdateResult } from 'typeorm';
import { MonthlyReportService } from '../../business-owner/services/monthly-report.service';
import { CreateAccessTokenDto } from '../dto/create-access-token.dto';
import { IdentityScoreResponse } from '../models/identity-score-response.interface';

@Injectable()
export class PlaidService {
  private plaidClient: PlaidApi;

  constructor(
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    @Inject(forwardRef(() => MonthlyReportService))
    private monthlyReportService: MonthlyReportService,
  ) {
    this.plaidClient = new PlaidApi(
      new Configuration({
        basePath: PlaidEnvironments[process.env.PLAID_ENV],
        baseOptions: {
          headers: {
            'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
            'PLAID-SECRET': process.env.PLAID_SECRET,
            'Plaid-Version': '2020-09-14',
          },
        },
      }),
    );
  }

  getAdminLinkToken(): Observable<LinkTokenCreateResponse> {
    return this.usersService.getAdmin().pipe(
      tap((adminUser) => {
        if (adminUser.plaidToken) {
          throw new HttpException(
            'Your account is already connected with Plaid.',
            HttpStatus.CONFLICT,
          );
        }
      }),
      mergeMap(() => this.getBusinessownerLinkToken()),
    );
  }

  getLinkToken(payload: Payload): Observable<LinkTokenCreateResponse> {
    return this.usersService.findOne(payload.userId).pipe(
      tap((user) => {
        if (user.plaidToken) {
          throw new HttpException(
            'Your account is already connected with Plaid.',
            HttpStatus.CONFLICT,
          );
        }
      }),
      mergeMap(() =>
        iif(
          () => payload.role == Role.BusinessOwner,
          this.getBusinessownerLinkToken(),
          this.getInvestorLinkToken(),
        ),
      ),
      catchError((err) => {
        console.error(err);
        throw new HttpException(err, HttpStatus.BAD_REQUEST);
      }),
    );
  }

  setAdminsAccessToken(
    createAccessTokenDto: CreateAccessTokenDto,
  ): Observable<UpdateResult> {
    let adminId: number;
    return this.usersService.getAdmin().pipe(
      tap((adminUser) => {
        adminId = adminUser.id;
        if (adminUser.plaidToken) {
          throw new HttpException(
            'Your account is already connected with Plaid',
            HttpStatus.CONFLICT,
          );
        }
      }),
      mergeMap(() => this.getAccesToken(createAccessTokenDto.publicToken)),
      mergeMap((data) =>
        this.usersService.update(adminId, {
          plaidToken: data.access_token,
        }),
      ),
    );
  }

  setAccessToken(
    createAccessTokenDto: CreateAccessTokenDto,
    payload: Payload,
  ): Observable<UpdateResult> {
    return this.usersService.findOne(payload.userId).pipe(
      tap((user) => {
        if (user.plaidToken) {
          throw new HttpException(
            'Your account is already connected with Plaid',
            HttpStatus.CONFLICT,
          );
        }
      }),
      mergeMap(() => this.getAccesToken(createAccessTokenDto.publicToken)),
      mergeMap((data) =>
        this.usersService.update(payload.userId, {
          plaidToken: data.access_token,
        }),
      ),
      tap(() => {
        if (payload.businessOwnerId) {
          this.monthlyReportService
            .generateTwoYearMonthlyReport(
              payload.businessOwnerId,
              payload.userId,
            )
            .subscribe();
        }
      }),
      tap(() =>
        this.monthlyReportService.verifyReports(
          payload.businessOwnerId,
          payload.email,
        ),
      ),
    );
  }

  updateAccessToken(accessToken: string): Observable<LinkTokenCreateResponse> {
    return from([
      this.plaidClient.linkTokenCreate({
        user: { client_user_id: process.env.PLAID_CLIENT_ID },
        client_name: 'Asabik',
        access_token: accessToken,
        country_codes: [CountryCode.Us],
        language: 'en',
        products: [Products.Transactions, Products.Auth],
      }),
    ]).pipe(
      mergeMap((axiosPromise) => axiosPromise),
      map((data) => {
        return data.data;
      }),
    );
  }

  getBusinessownerLinkToken(): Observable<LinkTokenCreateResponse> {
    return from([
      this.plaidClient.linkTokenCreate({
        user: { client_user_id: process.env.PLAID_CLIENT_ID },
        client_name: 'Asabik',
        language: 'en',
        products: [Products.Transactions, Products.Auth],
        country_codes: [CountryCode.Us],
      }),
    ]).pipe(
      mergeMap((axiosPromise) => axiosPromise),
      map((data) => {
        return data.data;
      }),
    );
  }

  getInvestorLinkToken(): Observable<LinkTokenCreateResponse> {
    return from([
      this.plaidClient.linkTokenCreate({
        user: { client_user_id: process.env.PLAID_CLIENT_ID },
        client_name: 'Asabik',
        language: 'en',
        products: [Products.Transactions, Products.Auth],
        // link_customization_name: LinkCustomizationName.Investor,
        country_codes: [CountryCode.Us],
      }),
    ]).pipe(
      mergeMap((axiosPromise) => axiosPromise),
      map((data) => {
        return data.data;
      }),
    );
  }

  getIdentityVerificationToken(): Observable<LinkTokenCreateResponse> {
    return from([
      this.plaidClient.linkTokenCreate({
        user: { client_user_id: process.env.PLAID_CLIENT_ID },
        client_name: 'Asabik',
        language: 'en',
        products: [Products.IdentityVerification],
        country_codes: [CountryCode.Us],
        identity_verification: {
          template_id: process.env.PLAID_IDENTITY_VERIF_TEMP_ID,
        },
      }),
    ]).pipe(
      mergeMap((axiosPromise) => axiosPromise),
      map((data) => {
        return data.data;
      }),
    );
  }

  getIdentityVerificationLink(userId: number): Observable<string> {
    return this.usersService.findOne(userId).pipe(
      tap((user) => {
        if (user.isVerified === true) {
          throw new HttpException(
            'You have already conducted Verification Process.',
            HttpStatus.BAD_REQUEST,
          );
        }
      }),
      mergeMap(() =>
        from([
          this.plaidClient.linkTokenCreate({
            user: { client_user_id: process.env.PLAID_CLIENT_ID },
            client_name: 'Asabik',
            language: 'en',
            products: [Products.IdentityVerification],
            country_codes: [CountryCode.Us],
            identity_verification: {
              template_id: process.env.PLAID_IDENTITY_VERIF_TEMP_ID,
            },
          }),
        ]),
      ),
      mergeMap((axiosPromise) => axiosPromise),
      mergeMap((data) =>
        of(
          this.plaidClient.identityVerificationCreate({
            is_shareable: true,
            template_id: process.env.PLAID_IDENTITY_VERIF_TEMP_ID,
            gave_consent: false,
            user: {
              client_user_id: data.data.link_token,
            },
          }),
        ),
      ),
      mergeMap((axiosPromise) => axiosPromise),
      mergeMap((data) =>
        this.usersService
          .update(userId, {
            identityVerifId: data.data.id,
          })
          .pipe(map(() => data.data.shareable_url)),
      ),
      catchError((err) => {
        console.error(err);
        throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
      }),
    );
  }

  getIdentityVerificationStatus(
    identityVerifId: string,
  ): Observable<IdentityVerificationStatus> {
    return of(
      this.plaidClient.identityVerificationGet({
        identity_verification_id: identityVerifId,
      }),
    ).pipe(
      mergeMap((axiosPromise) => axiosPromise),
      map((identityVerifResp) => identityVerifResp.data.status),
      catchError(() => {
        throw new HttpException(
          'Identity Verification was not found.',
          HttpStatus.NOT_FOUND,
        );
      }),
    );
  }

  changeUserVerificationStatus(userId: number): Observable<any> {
    return this.usersService.findOne(userId).pipe(
      tap((user) => {
        if (!user.identityVerifId) {
          throw new HttpException(
            "User didn't conducted Identity Verification process yet.",
            HttpStatus.BAD_REQUEST,
          );
        }
      }),
      mergeMap((user) =>
        this.getIdentityVerificationStatus(user.identityVerifId),
      ),
      mergeMap((resp) => {
        let isVerif = false;
        if (resp == IdentityVerificationStatus.Success) {
          isVerif = true;
        }

        return this.usersService.update(userId, {
          isVerified: isVerif,
        });
      }),
      map(() => {}),
    );
  }

  getVerificationStatus(
    userId: number,
  ): Observable<IdentityVerificationStatus> {
    return this.usersService.findOne(userId).pipe(
      tap((user) => {
        if (!user.identityVerifId) {
          throw new HttpException(
            "User didn't conducted Identity Verification process yet.",
            HttpStatus.BAD_REQUEST,
          );
        }
      }),
      mergeMap((user) =>
        this.getIdentityVerificationStatus(user.identityVerifId),
      ),
    );
  }

  getAccountId(userId: number): Observable<string> {
    return this.usersService.findOne(userId).pipe(
      tap((data) => {
        if (data.plaidToken == null) {
          throw new HttpException(
            'User account is not linked with plaid',
            HttpStatus.CONFLICT,
          );
        }
      }),
      mergeMap((user) =>
        from([
          this.plaidClient.accountsGet({
            access_token: user.plaidToken,
          }),
        ]),
      ),
      mergeMap((axiosPromise) => axiosPromise),
      catchError((err) => {
        console.error(err);
        throw new HttpException(
          'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }),
      map((data) => {
        return data.data.accounts[0]?.account_id;
      }),
    );
  }

  getProcessorToken(userId: number): Observable<ProcessorTokenCreateResponse> {
    return forkJoin({
      accountId: this.getAccountId(userId),
      user: this.usersService.findOne(userId),
    }).pipe(
      mergeMap((data) =>
        this.plaidClient.processorTokenCreate({
          access_token: data.user.plaidToken,
          processor: ProcessorTokenCreateRequestProcessorEnum.Achq,
          account_id: data.accountId,
        }),
      ),
      catchError((e) => {
        console.error('getProcessorToken: ' + e);
        throw new HttpException(
          'Error occured while retrieving Processor Token: ' + e,
          HttpStatus.BAD_REQUEST,
        );
      }),
      map((data) => {
        return data.data;
      }),
    );
  }

  getIdentity(userId: number): Observable<UserIdentity> {
    return this.usersService.findOne(userId).pipe(
      mergeMap((user) =>
        this.plaidClient.identityGet({
          access_token: user.plaidToken,
        }),
      ),
      catchError((e) => {
        console.error('getIdentity: ' + e);
        throw new HttpException(
          'Error occured while retrieving Identity: ' + e,
          HttpStatus.BAD_REQUEST,
        );
      }),
      map((res) => {
        const owner: Owner = res.data.accounts[0].owners[0];
        const addressData: AddressData = owner.addresses[0].data;
        return {
          name: owner.names[0],
          street: addressData.street,
          city: addressData.city,
          state: addressData.region,
          zip: addressData.postal_code,
          phone: owner.phone_numbers[0].data,
          email: owner.emails[0].data,
        };
      }),
    );
  }

  getIdentityMatch(userId: number): Observable<IdentityScoreResponse> {
    return this.usersService.findOne(userId).pipe(
      tap((user) => {
        if (user.role !== Role.BusinessOwner) {
          throw new HttpException(
            'Available for Business Owners only.',
            HttpStatus.BAD_REQUEST,
          );
        }
      }),
      mergeMap((user) =>
        this.plaidClient.identityMatch({
          access_token: user.plaidToken,
          user: {
            legal_name: user.businessOwner.ownerName,
            phone_number: '+1' + user.businessOwner.phone, // US in E.164 format
            email_address: user.email,
            address: {
              city: user.businessOwner.city,
              region: this.getState(user.businessOwner.zipCode),
              street: user.businessOwner.street,
              postal_code: user.businessOwner.zipCode,
              country: 'US',
            },
          },
        }),
      ),
      catchError(() => {
        throw new HttpException(
          'Invalid public token.',
          HttpStatus.BAD_REQUEST,
        );
      }),
      map((identity) => {
        let highestName = -1;
        let highestPhoneNumber = -1;
        let highestEmail = -1;
        let highestAddress = -1;

        identity.data.accounts.forEach((account) => {
          if (account.legal_name && account.legal_name.score > highestName) {
            highestName = account.legal_name.score;
          }

          if (
            account.phone_number &&
            account.phone_number.score > highestPhoneNumber
          ) {
            highestPhoneNumber = account.phone_number.score;
          }

          if (
            account.email_address &&
            account.email_address.score > highestEmail
          ) {
            highestEmail = account.email_address.score;
          }

          if (account.address && account.address.score > highestAddress) {
            highestAddress = account.address.score;
          }
        });

        return {
          name: highestName !== -1 ? highestName : null,
          phoneNumber: highestPhoneNumber !== -1 ? highestPhoneNumber : null,
          email: highestEmail !== -1 ? highestEmail : null,
          address: highestAddress !== -1 ? highestAddress : null,
        };
      }),
    );
  }

  getAccesToken(
    publicToken: string,
  ): Observable<ItemPublicTokenExchangeResponse> {
    return from([
      this.plaidClient.itemPublicTokenExchange({ public_token: publicToken }),
    ]).pipe(
      mergeMap((axiosPromise) => axiosPromise),
      catchError((err) => {
        throw new HttpException(
          'Invalid public token.',
          HttpStatus.BAD_REQUEST,
        );
      }),
      map((data) => {
        return data.data;
      }),
    );
  }

  getTransactions(
    userId: number,
    year: number,
    monthIndex: number,
  ): Observable<TransactionsGetResponse> {
    return this.usersService.findOne(userId).pipe(
      tap((data) => {
        if (data.plaidToken == null) {
          throw new HttpException(
            'User account is not linked with plaid',
            HttpStatus.CONFLICT,
          );
        }
      }),
      mergeMap((user) =>
        from([
          this.plaidClient.transactionsGet({
            access_token: user.plaidToken,
            start_date: dateToString(new Date(year, monthIndex, 1)),
            end_date: dateToString(new Date(year, monthIndex + 1, 0)),
          }),
        ]),
      ),
      mergeMap((axiosPromise) => axiosPromise),
      catchError((err) => {
        console.error(err);
        throw new HttpException(
          'Error occured while fetching transactions from Plaid.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }),
      map((data) => {
        return data.data;
      }),
    );
  }

  getState(zipCode: string) {
    if (zipCode.length !== 5) {
      throw new HttpException(
        'Error occured while processing zipcode.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const zipcode = parseInt(zipCode, 10);

    let stateCode = null;
    let stateName = null;

    if (zipcode >= 35000 && zipcode <= 36999) {
      stateCode = 'AL';
      stateName = 'Alabama';
    } else if (zipcode >= 99500 && zipcode <= 99999) {
      stateCode = 'AK';
      stateName = 'Alaska';
    } else if (zipcode >= 85000 && zipcode <= 86999) {
      stateCode = 'AZ';
      stateName = 'Arizona';
    } else if (zipcode >= 71600 && zipcode <= 72999) {
      stateCode = 'AR';
      stateName = 'Arkansas';
    } else if (zipcode >= 90000 && zipcode <= 96699) {
      stateCode = 'CA';
      stateName = 'California';
    } else if (zipcode >= 80000 && zipcode <= 81999) {
      stateCode = 'CO';
      stateName = 'Colorado';
    } else if (
      (zipcode >= 6000 && zipcode <= 6389) ||
      (zipcode >= 6391 && zipcode <= 6999)
    ) {
      stateCode = 'CT';
      stateName = 'Connecticut';
    } else if (zipcode >= 19700 && zipcode <= 19999) {
      stateCode = 'DE';
      stateName = 'Delaware';
    } else if (zipcode >= 32000 && zipcode <= 34999) {
      stateCode = 'FL';
      stateName = 'Florida';
    } else if (
      (zipcode >= 30000 && zipcode <= 31999) ||
      (zipcode >= 39800 && zipcode <= 39999)
    ) {
      stateCode = 'GA';
      stateName = 'Georgia';
    } else if (zipcode >= 96700 && zipcode <= 96999) {
      stateCode = 'HI';
      stateName = 'Hawaii';
    } else if (zipcode >= 83200 && zipcode <= 83999 && zipcode != 83414) {
      stateCode = 'ID';
      stateName = 'Idaho';
    } else if (zipcode >= 60000 && zipcode <= 62999) {
      stateCode = 'IL';
      stateName = 'Illinois';
    } else if (zipcode >= 46000 && zipcode <= 47999) {
      stateCode = 'IN';
      stateName = 'Indiana';
    } else if (zipcode >= 50000 && zipcode <= 52999) {
      stateCode = 'IA';
      stateName = 'Iowa';
    } else if (zipcode >= 66000 && zipcode <= 67999) {
      stateCode = 'KS';
      stateName = 'Kansas';
    } else if (zipcode >= 40000 && zipcode <= 42999) {
      stateCode = 'KY';
      stateName = 'Kentucky';
    } else if (zipcode >= 70000 && zipcode <= 71599) {
      stateCode = 'LA';
      stateName = 'Louisiana';
    } else if (zipcode >= 3900 && zipcode <= 4999) {
      stateCode = 'ME';
      stateName = 'Maine';
    } else if (zipcode >= 20600 && zipcode <= 21999) {
      stateCode = 'MD';
      stateName = 'Maryland';
    } else if (
      (zipcode >= 1000 && zipcode <= 2799) ||
      zipcode == 5501 ||
      zipcode == 5544
    ) {
      stateCode = 'MA';
      stateName = 'Massachusetts';
    } else if (zipcode >= 48000 && zipcode <= 49999) {
      stateCode = 'MI';
      stateName = 'Michigan';
    } else if (zipcode >= 55000 && zipcode <= 56899) {
      stateCode = 'MN';
      stateName = 'Minnesota';
    } else if (zipcode >= 38600 && zipcode <= 39999) {
      stateCode = 'MS';
      stateName = 'Mississippi';
    } else if (zipcode >= 63000 && zipcode <= 65999) {
      stateCode = 'MO';
      stateName = 'Missouri';
    } else if (zipcode >= 59000 && zipcode <= 59999) {
      stateCode = 'MT';
      stateName = 'Montana';
    } else if (zipcode >= 27000 && zipcode <= 28999) {
      stateCode = 'NC';
      stateName = 'North Carolina';
    } else if (zipcode >= 58000 && zipcode <= 58999) {
      stateCode = 'ND';
      stateName = 'North Dakota';
    } else if (zipcode >= 68000 && zipcode <= 69999) {
      stateCode = 'NE';
      stateName = 'Nebraska';
    } else if (zipcode >= 88900 && zipcode <= 89999) {
      stateCode = 'NV';
      stateName = 'Nevada';
    } else if (zipcode >= 3000 && zipcode <= 3899) {
      stateCode = 'NH';
      stateName = 'New Hampshire';
    } else if (zipcode >= 7000 && zipcode <= 8999) {
      stateCode = 'NJ';
      stateName = 'New Jersey';
    } else if (zipcode >= 87000 && zipcode <= 88499) {
      stateCode = 'NM';
      stateName = 'New Mexico';
    } else if (
      (zipcode >= 10000 && zipcode <= 14999) ||
      zipcode == 6390 ||
      zipcode == 501 ||
      zipcode == 544
    ) {
      stateCode = 'NY';
      stateName = 'New York';
    } else if (zipcode >= 43000 && zipcode <= 45999) {
      stateCode = 'OH';
      stateName = 'Ohio';
    } else if (
      (zipcode >= 73000 && zipcode <= 73199) ||
      (zipcode >= 73400 && zipcode <= 74999)
    ) {
      stateCode = 'OK';
      stateName = 'Oklahoma';
    } else if (zipcode >= 97000 && zipcode <= 97999) {
      stateCode = 'OR';
      stateName = 'Oregon';
    } else if (zipcode >= 15000 && zipcode <= 19699) {
      stateCode = 'PA';
      stateName = 'Pennsylvania';
    } else if (zipcode >= 300 && zipcode <= 999) {
      stateCode = 'PR';
      stateName = 'Puerto Rico';
    } else if (zipcode >= 2800 && zipcode <= 2999) {
      stateCode = 'RI';
      stateName = 'Rhode Island';
    } else if (zipcode >= 29000 && zipcode <= 29999) {
      stateCode = 'SC';
      stateName = 'South Carolina';
    } else if (zipcode >= 57000 && zipcode <= 57999) {
      stateCode = 'SD';
      stateName = 'South Dakota';
    } else if (zipcode >= 37000 && zipcode <= 38599) {
      stateCode = 'TN';
      stateName = 'Tennessee';
    } else if (
      (zipcode >= 75000 && zipcode <= 79999) ||
      (zipcode >= 73301 && zipcode <= 73399) ||
      (zipcode >= 88500 && zipcode <= 88599)
    ) {
      stateCode = 'TX';
      stateName = 'Texas';
    } else if (zipcode >= 84000 && zipcode <= 84999) {
      stateCode = 'UT';
      stateName = 'Utah';
    } else if (zipcode >= 5000 && zipcode <= 5999) {
      stateCode = 'VT';
      stateName = 'Vermont';
    } else if (
      (zipcode >= 20100 && zipcode <= 20199) ||
      (zipcode >= 22000 && zipcode <= 24699) ||
      zipcode == 20598
    ) {
      stateCode = 'VA';
      stateName = 'Virginia';
    } else if (
      (zipcode >= 20000 && zipcode <= 20099) ||
      (zipcode >= 20200 && zipcode <= 20599) ||
      (zipcode >= 56900 && zipcode <= 56999)
    ) {
      stateCode = 'DC';
      stateName = 'Washington DC';
    } else if (zipcode >= 98000 && zipcode <= 99499) {
      stateCode = 'WA';
      stateName = 'Washington';
    } else if (zipcode >= 24700 && zipcode <= 26999) {
      stateCode = 'WV';
      stateName = 'West Virginia';
    } else if (zipcode >= 53000 && zipcode <= 54999) {
      stateCode = 'WI';
      stateName = 'Wisconsin';
    } else if ((zipcode >= 82000 && zipcode <= 83199) || zipcode == 83414) {
      stateCode = 'WY';
      stateName = 'Wyoming';
    } else {
      stateCode = null;
      stateName = null;
    }

    return stateCode;
  }
}
