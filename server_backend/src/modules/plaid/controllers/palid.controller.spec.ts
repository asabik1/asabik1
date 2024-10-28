import { Test, TestingModule } from '@nestjs/testing';
import { PlaidController } from './plaid.controller';
import { PlaidService } from '../services/plaid.service';
import { IdentityVerificationStatus, LinkTokenCreateResponse } from 'plaid';
import { CreateAccessTokenDto } from '../dto/create-access-token.dto';
import { Observable, of } from 'rxjs';
import { UpdateResult } from 'typeorm';
import { Role } from '../../auth/enums/role.enum';

class PlaidServiceMock {
  getLinkToken(payload: any): Observable<LinkTokenCreateResponse> {
    return of({
      link_token: 'mocked-link-token',
      expiration: 'mocked-expiration',
      request_id: 'mocked-request-id',
    });
  }

  getIdentityVerificationLink(userId: number): Observable<string> {
    return of('mocked-verification-link');
  }

  getIdentityVerificationToken(): Observable<LinkTokenCreateResponse> {
    return of({
      link_token: 'mocked-link-token',
      expiration: 'mocked-expiration',
      request_id: 'mocked-request-id',
    });
  }

  getVerificationStatus(
    userId: number,
  ): Observable<IdentityVerificationStatus> {
    return of(IdentityVerificationStatus.PendingReview);
  }

  setAccessToken(
    createAccessTokenDto: CreateAccessTokenDto,
    payload: any,
  ): Observable<UpdateResult> {
    return of({ affected: 1 } as UpdateResult);
  }

  changeUserVerificationStatus(userId: number): Observable<void> {
    return of(undefined);
  }
}

describe('PlaidController', () => {
  let controller: PlaidController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlaidController],
      providers: [
        {
          provide: PlaidService,
          useClass: PlaidServiceMock,
        },
      ],
    }).compile();

    controller = module.get<PlaidController>(PlaidController);
  });

  it('should return a LinkTokenCreateResponse for getLinkToken', async () => {
    const result = await controller
      .getLinkToken({
        userId: 123,
        email: '',
        role: Role.Investor,
        emailConfirmed: false,
        investorId: 0,
        businessOwnerId: 0,
        updatedAt: '',
        createdAt: '',
      })
      .toPromise();
    expect(result).toBeDefined();
    expect(result.link_token).toBe('mocked-link-token');
  });

  it('should return a verification link for getIdentityVerificationLink', async () => {
    const result = await controller
      .getIdentityVerificationLink({
        userId: 123,
        email: '',
        role: Role.Investor,
        emailConfirmed: false,
        investorId: 0,
        businessOwnerId: 0,
        updatedAt: '',
        createdAt: '',
      })
      .toPromise();
    expect(result).toBeDefined();
    expect(result).toBe('mocked-verification-link');
  });
});
