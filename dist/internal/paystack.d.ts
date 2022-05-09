import { ConfigService } from '@nestjs/config';
import { HttpClient } from './http';
export interface PaystackResponse<T> {
    status: boolean;
    message: string;
    data: T;
}
export interface InitializedTransactionResponse {
    authorization_url: string;
    access_code: string;
    reference: string;
}
export interface GetTransactionResponse {
    status: string;
    reference: string;
    amount: number;
    metadata: any;
}
export declare enum PAYSTACK_EVENTS {
    CHARGE_SUCCESS = "charge.success"
}
export declare class PaystackService {
    private http;
    private readonly base_url;
    private secret_key;
    private email_address;
    constructor(http: HttpClient, config: ConfigService);
    private make_request;
    initialize_transaction(amount_in_naira: number, meta: JSON | string): Promise<PaystackResponse<InitializedTransactionResponse>>;
    retrieveBanks: (country?: string) => Promise<[
        success: boolean,
        data: Record<string, any>,
        status?: number
    ]>;
    retrieveSingleBank: (bankCode: any, country?: string) => Promise<[success: boolean, data: Record<string, any>, status?: number]>;
    withdraw_transaction(amount_in_naira: number, meta: JSON | string, bankDetails: JSON | string, userData: JSON | string): Promise<PaystackResponse<InitializedTransactionResponse>>;
    get_transaction(reference: string): Promise<PaystackResponse<GetTransactionResponse>>;
    verify_hash(signature: string, request_body: any): any;
}
export declare class InvalidSignature extends Error {
    constructor();
}
