import { Role } from 'src/modules/auth/enums/role.enum';
import { User } from 'src/modules/users/entities/users.entity';

export const mockUsers: User[] = [
  {
    id: 1,
    email: 'joe.doe@example.com',
    password: '',
    emailConfirmed: true,
    accountActivatationToken: '',
    createdAt: undefined,
    updatedAt: undefined,
    role: Role.BusinessOwner,
  },
  {
    id: 2,
    email: 'joe.doe@example.com',
    password: '',
    emailConfirmed: true,
    accountActivatationToken: '',
    createdAt: undefined,
    updatedAt: undefined,
    role: Role.BusinessOwner,
  },
  {
    id: 3,
    email: 'joe.doe@example.com',
    password: '',
    emailConfirmed: true,
    accountActivatationToken: '',
    createdAt: undefined,
    updatedAt: undefined,
    role: Role.BusinessOwner,
  },
  {
    id: 4,
    email: 'joe.doe@example.com',
    password: '',
    emailConfirmed: true,
    accountActivatationToken: '',
    createdAt: undefined,
    updatedAt: undefined,
    role: Role.BusinessOwner,
  },
  {
    id: 5,
    email: 'joe.doe@example.com',
    password: '',
    emailConfirmed: true,
    accountActivatationToken: '',
    createdAt: undefined,
    updatedAt: undefined,
    role: Role.BusinessOwner,
  },
];
