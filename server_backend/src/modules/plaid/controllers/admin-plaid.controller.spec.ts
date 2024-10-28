import { Test, TestingModule } from '@nestjs/testing';
import { AdminPlaidController } from './admin-plaid.controller';
import { PlaidService } from '../services/plaid.service';
import { LinkTokenCreateResponse } from 'plaid';
import { Observable, of } from 'rxjs';

class PlaidServiceMock {
  getAdminLinkToken(): Observable<LinkTokenCreateResponse> {
    return of({ link_token: 'mocked-link-token' } as LinkTokenCreateResponse);
  }
}

describe('AdminPlaidController', () => {
  let controller: AdminPlaidController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminPlaidController],
      providers: [
        {
          provide: PlaidService,
          useClass: PlaidServiceMock,
        },
      ],
    }).compile();

    controller = module.get<AdminPlaidController>(AdminPlaidController);
  });

  it('should return a LinkTokenCreateResponse', async () => {
    const result = await controller.getAdminLinkToken().toPromise();

    expect(result).toBeDefined();
    expect(result.link_token).toBe('mocked-link-token');
  });
});
