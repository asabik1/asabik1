import { Rating } from '../src/modules/investment-request/enum/rating.enum';
import { BusinessOwnerGetResponse } from '../src/modules/business-owner/models/business-owner-get-response.interface';
import { BusinessStructure } from '../src/modules/business-owner/enum/business-structure.enum';

export const businessOwnerGetResponseForGuest: BusinessOwnerGetResponse[] = [
  {
    id: 1,
    investmentRequestId: 2,
    isInvested: true,
    isRepaying: false,
    investedAmount: 2000,
    companyName: 'Small Fishing Company',
    rating: Rating.Aaa,
    projectedNetReturn: '12.500%',
    psr: '52.85%',
    expirationDate: '8/11/2023',
    returnTerm: 12,
    amountToMeetTarget: 8000,
    businessSubsector: {
      id: 10101,
      name: 'Fishing',
      businessSector: {
        id: 1010,
        name: 'Fishing',
        business: {
          id: 10,
          name: 'Agriculture Forestry Fishing and Hunting',
        },
      },
    },
    businessStructure: BusinessStructure.LLC,
  },
  {
    id: 2,
    investmentRequestId: 1,
    isInvested: false,
    isRepaying: false,
    investedAmount: 0,
    companyName: 'Big Shoemaking Company',
    rating: Rating.Aa1,
    projectedNetReturn: '35.000%',
    psr: '26.20%',
    expirationDate: '9/1/2023',
    returnTerm: 12,
    amountToMeetTarget: 0,
    businessSubsector: {
      id: 30303,
      name: 'Footwear Manufacturing',
      businessSector: {
        id: 3030,
        name: 'Footwear Manufacturing',
        business: {
          id: 30,
          name: 'Manufacturing',
        },
      },
    },
    businessStructure: BusinessStructure.LLC,
  },
];
