import { mockUser } from './user.mock';

export const mockUserRepository = {
  findOneOrFail: jest.fn().mockResolvedValue(mockUser),
  save: jest.fn().mockResolvedValue(mockUser),
};
