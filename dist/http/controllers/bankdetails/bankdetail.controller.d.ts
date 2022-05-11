import { BankdetailRepo } from '@app/bankdetails';
import { AddBankdetailsDTO } from './bankdetail.validator';
import { Request } from 'express';
import { PaystackService } from '@app/internal/paystack';
export declare class BankdetailsController {
    private readonly bankdetailRepo;
    private readonly paystack;
    constructor(bankdetailRepo: BankdetailRepo, paystack: PaystackService);
    add_bank_details(dto: AddBankdetailsDTO, req: Request): Promise<{
        message: string;
        result?: undefined;
    } | {
        result: import("@app/bankdetails").Bankdetail;
        message?: undefined;
    }>;
    update_transaction(user_id: string): Promise<import("@app/bankdetails").Bankdetail[]>;
}
