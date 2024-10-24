import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

class AuthLoginDto {
  @ApiProperty()
  @IsEmail()
  @IsString()
  @Transform((param) => String(param.value).toLocaleLowerCase())
  email: string;

  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, {
    message: 'Your password is too weak',
  })
  password: string;
}

class AuthRegisterDto {
  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, {
    message: 'Your password is too weak',
  })
  password: string;
}

class IAuthToken {
  expiresIn: number;
  accessToken: string;
}

class AuthTokenDto {
  expiresIn: number;
  accessToken: string;

  constructor(authToken: IAuthToken) {
    this.expiresIn = authToken.expiresIn;
    this.accessToken = authToken.accessToken;
  }
}

class AuthTokenedUserDto {
  id: string;
  email: string;
  created_at: Date;
  updated_at: Date;
  iat: number;
  exp: number;
}

class AuthForgotPasswordDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  constructor(email: string) {
    this.email = email;
  }
}

class AuthResetPasswordDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, {
    message: 'Your password is too weak',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  token: string;
}

class AuthActivateDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  token: string;
}

class AuthDecryptedTokenDto {
  id: number;
  iat: number;
  exp: number;
}

export {
  AuthLoginDto,
  AuthRegisterDto,
  AuthTokenDto,
  AuthTokenedUserDto,
  AuthForgotPasswordDto,
  AuthResetPasswordDto,
  AuthDecryptedTokenDto,
  AuthActivateDto,
};
