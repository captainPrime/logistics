import { IsEmail, IsNotEmpty, IsOptional, Matches } from 'class-validator';
import {
  PHONE_NUMBER_REGEX,
  PHONE_NUMBER_REGEX_ERROR,
} from '@app/internal/constants';

export class UserDTO {
  @IsNotEmpty()
  first_name: string;

  @IsNotEmpty()
  last_name: string;

  @IsNotEmpty()
  @IsEmail()
  email_address: string;

  @IsNotEmpty()
  @Matches(PHONE_NUMBER_REGEX, { message: PHONE_NUMBER_REGEX_ERROR })
  phone_number: string;
}

export class UpdateUserDTO {
  @IsOptional()
  first_name?: string;

  @IsOptional()
  last_name?: string;

  @IsOptional()
  @IsEmail()
  email_address?: string;
}
