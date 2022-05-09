import { Model } from '../internal/model';
import { User } from '@app/users';
import { CURRENCY } from '.';
export declare class Bankdetail extends Model {
    user: User;
    account_number: string;
    account_number_display: string;
    account_name: string;
    bank_name: string;
    bank_code: string;
    bank_id: string;
    raw?: JSON | string;
    currency?: CURRENCY;
}
export interface BankdetailDTO {
    user: User;
    account_number: string;
    account_number_display: string;
    account_name: string;
    bank_name: string;
    bank_code: string;
    bank_id: string;
    raw?: JSON | string;
    currency?: CURRENCY;
}
export declare class BankDetailsNotFound extends Error {
    constructor();
}
