import { Role } from '../src/modules/auth/enums/role.enum';
import { Payload } from '../src/modules/users/models/payload-interface';

export const payload: Payload = {
  userId: 1,
  email: 'test@example.com',
  role: Role.Investor,
  emailConfirmed: true,
  investorId: 1,
  businessOwnerId: 1,
  updatedAt: '2024-01-03T12:00:00Z',
  createdAt: '2024-01-03T12:00:00Z',
};
