import { TransactionRepo } from '@app/transactions';
import { FundWalletDTO, priceAlgorithmDTO } from './transaction.validator';
import { Request } from 'express';
import { PaystackService } from '@app/internal/paystack';
import { HopperRepo } from '@app/hoppers';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UpdateHopperDTO } from '../users/hopper.validator';
export declare class TransactionController {
    private readonly transactionRepo;
    private readonly paystack;
    private readonly emitter;
    private readonly hopperRepo;
    constructor(transactionRepo: TransactionRepo, paystack: PaystackService, emitter: EventEmitter2, hopperRepo: HopperRepo);
    initialize_wallet_funding(body: FundWalletDTO, req: Request): Promise<{
        payment_url: string;
        transaction_id: string;
    }>;
    update_transaction(req: Request): Promise<string>;
    get_transaction(transaction_id: string): Promise<import("@app/transactions").Transaction>;
    hopper_withdrawal(hopper_id: string, dto: UpdateHopperDTO, req: Request): Promise<import("@app/hoppers").Hopper>;
    admin_withdrawal(hopper_id: string, dto: UpdateHopperDTO): Promise<import("@app/hoppers").Hopper>;
    destination_price(hopper_id: string, dto: priceAlgorithmDTO): Promise<string>;
}
