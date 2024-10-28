import { BusinessOwnerGetAdminResponse } from '../src/modules/business-owner/models/business-owner-get-admin-response.interface';

export const mockBusinessOwnerGetAdminResponse: BusinessOwnerGetAdminResponse =
  {
    id: 12,
    companyName: 'Test Company',
    ownerName: 'John Doe',
    sector: 'Fishing',
    requiredInvestment: 10_000,
    isActive: true,
    isVerified: false,
  };
