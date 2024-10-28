import { BusinessOwnerGetDetailedAdminResponse } from '../src/modules/business-owner/models/business-owner-get-detailed-admin-response.interface';

export const mockBusinessOwnerGetDetailedAdminResponse: BusinessOwnerGetDetailedAdminResponse =
  {
    id: 15,
    companyName: 'Sample Company',
    registrationDate: new Date(),
    ownerName: 'John Doe',
    sector: 'Technology',
    address: {
      street: '123 Main Street',
      city: 'Cityville',
      zipCode: '54321',
    },
    receivedInvestments: 0,
    requiredInvestments: 0,
    phoneNumber: '5559876543',
    email: 'john.doe@example.com',
    isActive: true,
    isBlocked: false,
    isReportAvailable: true,
    investors: [],
    investmentRequests: [],
    isVerified: true,
  };
