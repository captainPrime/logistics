import { TRANSACTION_INTENTS, TRANSACTION_PROVIDERS, TRANSACTION_STATUS, TRANSACTION_TYPES } from './transaction.constant';
import { Model } from '../internal/model';
import { User } from '@app/users';
import { CURRENCY } from '.';
export declare class Transaction extends Model {
    user: User;
    intent: TRANSACTION_INTENTS;
    transaction_type: TRANSACTION_TYPES;
    amount_intended: number;
    amount_paid: number;
    native_amount: number;
    status: TRANSACTION_STATUS;
    provider: TRANSACTION_PROVIDERS;
    transaction_reference: string;
    raw?: JSON | string;
    currency?: CURRENCY;
}
export interface TransactionDTO {
    user: User;
    intent: TRANSACTION_INTENTS;
    transaction_type: TRANSACTION_TYPES;
    amount: number;
    provider: TRANSACTION_PROVIDERS;
    transaction_reference: string;
    raw?: JSON;
    currency?: CURRENCY;
}
export declare class TransactionNotFound extends Error {
    constructor();
}
