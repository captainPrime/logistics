import {
  IsEmail,
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsOptional,
  Matches,
} from 'class-validator';
import {
  PHONE_NUMBER_REGEX,
  PHONE_NUMBER_REGEX_ERROR,
} from '@app/internal/constants';

export class CreateSessionDTO {
  @IsOptional()
  first_name?: string;

  @IsOptional()
  last_name?: string;

  @IsOptional()
  @IsEmail()
  email_address?: string;

  @IsOptional()
  @Matches(PHONE_NUMBER_REGEX, { message: PHONE_NUMBER_REGEX_ERROR })
  phone_number?: string;
}

export class LocationDTO {
  @IsNotEmpty()
  @IsLongitude()
  lng: number;

  @IsNotEmpty()
  @IsLatitude()
  lat: number;
}
