import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  TransactionRepo,
  TRANSACTION_INTENTS,
  TransactionDTO,
  TRANSACTION_TYPES,
  TRANSACTION_PROVIDERS,
  TRANSACTION_STATUS,
  TransactionNotFound,
  BankDetailsNotFound,
} from '@app/transactions';
import { FundWalletDTO } from './bankdetails.validator';
import { AuthGuard } from '@app/http/middlewares';
import { Request } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  InvalidSignature,
  PaystackService,
  PAYSTACK_EVENTS,
} from '@app/internal/paystack';

import {
  HopperRepo,
  HopperNotFound,
  InvalidHopperStatusMove,
  
} from '@app/hoppers';

import { UnauthorizedRequest } from '@app/internal/errors';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UPDATE_WALLET_BALANCE } from '@app/internal/events';
import { UpdateHopperDTO } from '../users/hopper.validator';


@ApiTags('Transactions')
 @ApiBearerAuth('access-token')
@Controller('transactions')
export class TransactionController {
  constructor(
    private readonly transactionRepo: TransactionRepo,
    private readonly paystack: PaystackService,
    private readonly emitter: EventEmitter2,

    private readonly hopperRepo: HopperRepo,
  ) {}

  /**
   * Initializes a wallet funding process
   */
  @UseGuards(AuthGuard)
  @Post('wallet-funding')
  async initialize_wallet_funding(
    @Body() body: FundWalletDTO,
    @Req() req: Request,
  ) {
    const amount = body.amount;
    const user_in_session = req.user;
    const intent = TRANSACTION_INTENTS.WALLET_FUNDING;
    const metadata = {
      user_id: user_in_session.id,
      intent,
    };

    const { data } = await this.paystack.initialize_transaction(
      amount,
      JSON.stringify(metadata),
    );
    const { authorization_url, reference } = data;

    //DTO : data transfer object (DTO) is an object that carries data between processes.

    // create a new transaction
    const transactionDTO: TransactionDTO = {
      amount,
      intent,
      transaction_type: TRANSACTION_TYPES.CREDIT,
      user: user_in_session,
      provider: TRANSACTION_PROVIDERS.PAYSTACK,
      transaction_reference: reference,
    };
    const { id } = await this.transactionRepo.create_transaction(
      transactionDTO,
    );

    return { payment_url: authorization_url, transaction_id: id };
  }




  @Post('paystack-webhook')
  async update_transaction(@Req() req: Request) {
    try {
      const signature = req.headers['x-paystack-signature'] as string;
      const dto = this.paystack.verify_hash(signature, req.body);

      const transaction =
        await this.transactionRepo.find_transaction_by_reference(
          dto.data.reference,
        );
      if (!transaction) return;

      transaction.raw = JSON.stringify(dto);

      switch (dto.event) {
        case PAYSTACK_EVENTS.CHARGE_SUCCESS:
          transaction.status = TRANSACTION_STATUS.SUCCESSFUL;
          transaction.amount_paid = Number(dto.data.amount) / 100;
          transaction.native_amount =
            transaction.transaction_type == TRANSACTION_TYPES.CREDIT
              ? transaction.amount_paid
              : transaction.amount_paid * -1;
          break;

        default:
          break;
      }
      await this.transactionRepo.save(transaction);
      this.emitter.emit(UPDATE_WALLET_BALANCE, transaction.user);
      return 'ok';
    } catch (err) {
      if (err instanceof InvalidSignature) {
        throw new UnauthorizedRequest(
          'sorry we could not verify the source of this request',
        );
      }

      throw err;
    }
  }

  @Get('/:transaction_id')
  async get_transaction(
    @Param('transaction_id', new ParseUUIDPipe()) transaction_id: string,
  ) {
    try {
      const transaction = await this.transactionRepo.findOne(transaction_id);
      if (!transaction) throw new TransactionNotFound();
      return transaction;
    } catch (err) {
      if (err instanceof TransactionNotFound) {
        throw new BadRequestException(err.message);
      }
    }
  }


  /**
   *  Hopper Withdrawals
   * @param hopper_id
   * @param dto
   * @returns
   */
 @Post('hoppers/:hopper_id/withdraw')
 //@UseGuards(AdminGuard)
 async hopper_withdrawal(
   @Param('hopper_id') hopper_id: string,
   @Body() dto: UpdateHopperDTO,
   @Req() req: Request,
 ) {
   try {
     const hopper = await this.hopperRepo.get_hopper(hopper_id);


  //    const userData = req.user;

  //    const bankDetails = await Repository.findOne({
  //     where: {
  //      id: bankId,
  //      hopper_id,
  //    },
  //  });

  // if (!bankDetails) throw new BankDetailsNotFound();
 

  return await this.hopperRepo.update_hopper_status(hopper, dto.status);
    




   } catch (err) {
     if (err instanceof HopperNotFound) { 
       throw new BadRequestException(err.message);
     }
     if (err instanceof InvalidHopperStatusMove) {
       throw new BadRequestException(err.message);
     }
     throw err;
   }
 }



   /**
   *  Hopper Withdrawals
   * @param hopper_id
   * @param dto
   * @returns
   */
    @Post('admin/:admin_id/withdraw')
    //@UseGuards(AdminGuard)
    async admin_withdrawal(
      @Param('admin_id') hopper_id: string,
      @Body() dto: UpdateHopperDTO,
    ) {
      try {
        const hopper = await this.hopperRepo.get_hopper(hopper_id);
        return await this.hopperRepo.update_hopper_status(hopper, dto.status);
      } catch (err) {
        if (err instanceof HopperNotFound) {
          throw new BadRequestException(err.message);
        }
        if (err instanceof InvalidHopperStatusMove) {
          throw new BadRequestException(err.message);
        }
        throw err;
      }
    }
 
}
