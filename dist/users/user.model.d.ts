import { Model } from '@app/internal/model';
import { Hopper } from '../hoppers/hopper.model';
import { Order } from '@app/orders/';
export declare class User extends Model {
    first_name?: string;
    last_name?: string;
    email_address?: string;
    phone_number: string;
    account_type: ACCOUNT_TYPE;
    account_balance: number;
    transform_fields_to_lowercase(): void;
    hopper: Hopper;
    orders: Order[];
}
export declare enum ACCOUNT_TYPE {
    USER = "user",
    HOPPER = "hopper",
    ADMIN = "admin"
}
export interface FindUser {
    user_id?: string;
    email_address?: string;
    phone_number?: string;
    first_name?: string;
    last_name?: string;
}
