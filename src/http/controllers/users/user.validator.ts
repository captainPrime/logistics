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

  @IsOptional()
  picture_url?: string;
  
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


  @IsOptional()
  picture_url?: string;


}


export declare class userHopperRequestDTO {
  @IsNotEmpty()
  destination: string;
  @IsNotEmpty()
  destinationLat: string;
  @IsNotEmpty()
  destinationLng: string;
  @IsNotEmpty()
  pickup: string;
  @IsNotEmpty()
  pickupLat: string;
  @IsNotEmpty()
  pickupLng: string;
  @IsNotEmpty()
  hopper_id: string;
  @IsNotEmpty()
  totalRequestCost: string;
  @IsNotEmpty()
  totalRequestDistance: string;
  @IsNotEmpty()
  totalRequestDuration: string;
  @IsNotEmpty()
  requestPayType: string;
  @IsNotEmpty()
  requestPayStatus: string;
  @IsNotEmpty()
  requestMadeStatus: string;
  @IsNotEmpty()
  user_id: string;
  @IsNotEmpty()
  requestPaymentID: string;
  @IsNotEmpty()
  requestCreatedAt: string;



  @IsOptional()
  email_address?: string;
}