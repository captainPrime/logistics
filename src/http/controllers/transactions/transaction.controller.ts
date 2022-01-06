import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import {
  TransactionRepo,
  TRANSACTION_INTENTS,
  TransactionDTO,
  TRANSACTION_TYPES,
  TRANSACTION_PROVIDERS,
} from '@app/transactions';
import { FundWalletDTO } from './transaction.validator';
import { AuthGuard } from '@app/http/middlewares';
import { Response } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Helper } from '@app/internal/utils';
import { PaystackService } from '@app/internal/paystack';

@ApiTags('Transactions')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('transactions')
export class TransactionController {
  constructor(
    private readonly transactionRepo: TransactionRepo,
    private readonly helper: Helper,
    private readonly paystack: PaystackService,
  ) {}

  /**
   * Initializes a wallet funding process
   */
  @Post('wallet')
  async initialize_wallet_funding(
    @Body() body: FundWalletDTO,
    @Res() _res: Response,
  ) {
    const amount = body.amount;
    const user_in_session = this.helper.get_user_session(_res);
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

    // create a new transaction
    const transactionDTO: TransactionDTO = {
      amount,
      intent,
      transaction_type: TRANSACTION_TYPES.CREDIT,
      user: user_in_session,
      provider: TRANSACTION_PROVIDERS.PAYSTACK,
      transaction_reference: reference,
    };
    await this.transactionRepo.create_transaction(transactionDTO);

    return _res.json({ payment_url: authorization_url });
  }
}
