import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Param,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import {
  BankdetailRepo,
  BankdetailDTO

} from '@app/bankdetails';
import { AddBankdetailsDTO } from './bankdetail.validator';
import { AuthGuard } from '@app/http/middlewares';
import { Request } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  InvalidSignature,
  PaystackService,
  
} from '@app/internal/paystack';
import { v4 } from 'uuid'; 
import { UnauthorizedRequest } from '@app/internal/errors';

@ApiTags('Bankdetail')
 @ApiBearerAuth('access-token')
@Controller('bank-details')
export class BankdetailsController {
  constructor(
    private readonly bankdetailRepo: BankdetailRepo,
    private readonly paystack: PaystackService,
   
  ) {}

  /**
   * Add Bank account details for withdrawal
   *  * @param dto
   *  * @returns string
   */
  @UseGuards(AuthGuard)
  @Post('/add_bank_account')
  async add_bank_details(
    @Body() dto: AddBankdetailsDTO,
    @Req() req: Request,
  
  ) {

    const  user_in_session = req.user;
    const last_name = user_in_session.last_name;
    const first_name = user_in_session.first_name;
    const user_id = "3939djd"//user_in_session.email_address;
    const account_number = dto.account_number;
    
    const bank_code = dto.bank_code;
    

    const [success, bank] = await this.paystack.retrieveSingleBank(bank_code);
    

    //DTO : data transfer object (DTO) is an object that carries data between processes.
    if (!success || !bank) {
      return { message: "Bank was not found" };
    } 



    const exists = await this.bankdetailRepo.bank_exist(user_id, account_number);

    if (exists) {
      return { message: "Account Number already exist"};
    }
    const lastFiveAccountDigit = account_number.slice(-5);
    const account_number_display = "X".repeat(String(account_number).length - 5) + lastFiveAccountDigit;
    const account_name =  `${last_name} ${first_name}`;
    const bank_name = bank.bank_name;
    const bank_id = v4();
    const raw = bank.parse();
    //const currency = ;

    // create a new transaction
    const bankdetailsDTO: BankdetailDTO = {
      account_number,
      account_number_display,
      account_name,
      bank_name,
      bank_code,
      bank_id,
      raw,
      //currency,
      user : user_in_session,
    };
    const result  = await this.bankdetailRepo.add_bank_details(
      bankdetailsDTO,
    );

    return { result };
  }



 /**
   * Fetch bank details
   * @param user_id
   * @returns response of user bank details
   */
  @Get('/find_bank_details/:user_id')
  async update_transaction(@Param('user_id', new ParseUUIDPipe()) user_id: string,
  ) {
    try {
     
      const bank_detail =
        await this.bankdetailRepo.find_bank_by_userid(user_id);
      if (!bank_detail) return;

    
     
      return bank_detail;
    } catch (err) {
      if (err instanceof InvalidSignature) {
        throw new UnauthorizedRequest(
          'sorry we could not verify the source of this request',
        );
      }

      throw err;
    }
  }


 
}
