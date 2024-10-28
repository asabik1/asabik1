import { Injectable } from '@nestjs/common';
import { businessOwnerGetResponseForGuest } from '../../../../mocks/business-owner-get-response-guest.mock';
import { businessOwnerGetDetailedResponse } from '../../../../mocks/business-owner-get-detailed-response-guest.mock';
import { Observable, of } from 'rxjs';
import { BusinessOwnerGetResponse } from '../../business-owner/models/business-owner-get-response.interface';
import { BusinessOwnerGetDetailedResponse } from 'src/modules/business-owner/models/business-owner-get-detailed-response.interface';

@Injectable()
export class GuestService {
  constructor() {}

  getBusinessOwnersForGuest(
    companyName?: string,
  ): Observable<BusinessOwnerGetResponse[]> {
    return of(businessOwnerGetResponseForGuest);
  }

  getBusinessOwnerByIdForGuest(
    id: number,
  ): Observable<BusinessOwnerGetDetailedResponse> {
    switch (id) {
      case 1:
        return of(businessOwnerGetDetailedResponse[0]);
      case 2:
        return of(businessOwnerGetDetailedResponse[1]);
    }
  }
}
