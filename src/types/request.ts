import { Request } from 'express';
import { AuthTokenedUserDto } from 'src/modules/auth/dto/auth.dto';

interface AppRequest extends Request {
  user?: AuthTokenedUserDto;
  fileValidationError?: string;
}

export { AppRequest };
