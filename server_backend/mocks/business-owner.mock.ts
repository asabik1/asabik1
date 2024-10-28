import { BusinessStructure } from '../src/modules/business-owner/enum/business-structure.enum';
import { BusinessOwner } from '../src/modules/business-owner/entities/business-owner.entity';
import { mockUser } from './user.mock';

export const mockBusinessOwner: BusinessOwner = {
  id: 3,
  startDate: new Date(),
  surveyCompletedAt: new Date(),
  businessStructure: BusinessStructure.Corporation,
  companyName: 'Sample Business Inc.',
  ownerName: 'John Doe',
  street: '123 Main St',
  city: 'Sample City',
  zipCode: '12345',
  phone: '555-1234',
  website: 'samplebusiness.com',
  description: 'Sample business description',
  user: mockUser,
  investmentRequests: [],
  avrMonthlySales: 10000,
  avrMonthlyNetProfit: 5000,
  totalLastYearNetProfit: 60000,
  employeesNo: 25,
  isProfileComplete: true,
  monthlyReports: [],
  penalties: [],
};
