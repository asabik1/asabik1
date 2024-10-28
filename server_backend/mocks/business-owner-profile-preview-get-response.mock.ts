import { BusinessOwnerProfilePreviewGetResponse } from '../src/modules/business-owner/models/business-owner-profile-preview-get-response.interface';

export const mockBusinessOwnerProfilePreviewGetResponse: BusinessOwnerProfilePreviewGetResponse =
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
    startDate: '02/02/2019',
    avrMonthlySales: 20000,
    avrMonthlyNetProfit: 10000,
    totalLastYearNetProfit: 120000,
    employeesNo: 3,
    businessDescription: 'Sample descr',
    investmentRequests: [],
    isProfileComplete: true,
    isValidForRequest: true,
    investmentsRequestsSummary: {
      projectedNetRunUpTo: 20_000,
      totalInvestedAmount: 5_000,
      numberOfInvestors: 2,
      totalRequiredInvestment: 0,
      minReturnTerm: 1,
    },
  };
