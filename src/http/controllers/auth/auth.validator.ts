import { IsNotEmpty, Matches } from 'class-validator';
import {
  PHONE_NUMBER_REGEX,
  PHONE_NUMBER_REGEX_ERROR,
} from '@app/internal/constants';

export class SendCodeDTO {
  @IsNotEmpty()
  @Matches(PHONE_NUMBER_REGEX, { message: PHONE_NUMBER_REGEX_ERROR })
  phone_number: string;
}

export class VerifyPhoneDTO {
  @IsNotEmpty()
  @Matches(PHONE_NUMBER_REGEX, { message: PHONE_NUMBER_REGEX_ERROR })
  phone_number: string;

  @IsNotEmpty()
  code: string;
}
