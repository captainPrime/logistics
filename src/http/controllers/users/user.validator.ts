import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserDTO {
  @IsNotEmpty()
  first_name: string;

  @IsNotEmpty()
  last_name: string;

  @IsNotEmpty()
  @IsEmail()
  email_address: string;

  @IsNotEmpty()
  phone_number: string;

  @IsNotEmpty()
  password: string;
}
