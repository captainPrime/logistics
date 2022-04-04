import {  IsNotEmpty } from 'class-validator';


export class AddBankdetailsDTO {
 
  @IsNotEmpty()

  account_number: string;
  bank_code: string;
 
}

