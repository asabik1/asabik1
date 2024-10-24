import { Role } from 'src/modules/auth/enums/role.enum';

export interface Payload {
  userId: number;
  email: string;
  role: Role;
  emailConfirmed: boolean;
  investorId: number;
  businessOwnerId: number;
  updatedAt: string;
  createdAt: string;
}
