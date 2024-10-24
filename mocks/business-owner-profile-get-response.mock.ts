import { BusinessOwnerProfileGetResponse } from '../src/modules/business-owner/models/business-owner-profile-get-response.interface';

export const mockBusinessOwnerProfileGetResponse: BusinessOwnerProfileGetResponse =
  {
    imgUrl: '',
    companyName: 'Small Fishing Company',
    ownerName: 'John Fisherman',
    street: 'Shark Street 1',
    city: 'Fishcity',
    zipCode: '12345',
    phone: '1234567890',
    website: 'johnfisherman.fish.com',
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
    businessDescription: 'Sample description',
    investmentRequests: [],
    isProfileComplete: true,
    isValidForRequest: true,
  };
