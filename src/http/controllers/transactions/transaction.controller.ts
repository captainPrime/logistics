import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import {
  TransactionRepo,
  TRANSACTION_INTENTS,
  TransactionDTO,
  TRANSACTION_TYPES,
  TRANSACTION_PROVIDERS,
  TRANSACTION_STATUS,
} from '@app/transactions';
import { FundWalletDTO } from './transaction.validator';
import { AuthGuard } from '@app/http/middlewares';
import { Response, Request } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Helper } from '@app/internal/utils';
import {
  InvalidSignature,
  PaystackService,
  PAYSTACK_EVENTS,
} from '@app/internal/paystack';
import { UnauthorizedRequest } from '@app/internal/errors';

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
  @Post('wallet-funding')
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

  @Post('paystack-webhook')
  async update_transaction(@Req() req: Request) {
    try {
      console.log('hit!!!');
      const signature = req.headers['x-paystack-signature'] as string;
      const dto = this.paystack.verify_hash(signature, req.body);
      const event = dto.event;

      switch (event) {
        case PAYSTACK_EVENTS.CHARGE_SUCCESS:
          const transaction =
            await this.transactionRepo.find_transaction_by_reference(
              event.data.reference,
            );
          transaction.status = TRANSACTION_STATUS.SUCCESSFUL;
          transaction.raw = JSON.stringify(dto);
          this.transactionRepo.save(transaction);
          break;

        default:
          break;
      }
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
}
