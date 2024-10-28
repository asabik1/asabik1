import { Role } from '../src/modules/auth/enums/role.enum';
import { User } from '../src/modules/users/entities/users.entity';

export const mockUser: User = {
  id: 1,
  email: 'john.doe@example.com',
  password: '',
  emailConfirmed: true,
  accountActivatationToken: '',
  createdAt: new Date('2023-02-02T06:35:56.245Z'),
  updatedAt: new Date('2023-02-02T06:35:56.245Z'),
  role: Role.BusinessOwner,
};
