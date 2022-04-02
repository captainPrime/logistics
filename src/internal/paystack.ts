import { Env } from '@app/config/env.keys';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createHmac } from 'crypto';
import { HttpClient, HttpMethod, RequestDTO } from './http';
import { v4 } from 'uuid';
import { Repository } from 'typeorm';
import { UserRepo } from '@app/users';
import { Request } from 'express';

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

export enum PAYSTACK_EVENTS {
  CHARGE_SUCCESS = 'charge.success',
}

@Injectable()
export class PaystackService {
  /**
   * paystack API base URL
   */
  private readonly base_url: string = 'https://api.paystack.co/transaction/';
  /**
   * Paystack secret key for making authorized requests
   */
  private secret_key: string;

  private email_address: string;

  /**
   *
   * @param http http client for making requests to paystack
   * @param config config service for accessing enviroment variables
   */
  constructor(private http: HttpClient, config: ConfigService) {
    this.secret_key = config.get(Env.paystack_sk);
    this.email_address = config.get(Env.paystack_account_email);
  }

  /**
   * Creates a new request config object
   * @param url url
   * @param method http method
   * @param data request data
   * @param headers request headers
   * @returns
   */
  private make_request(
    url: string,
    method: HttpMethod,
    data = {},
    headers = {},
  ): RequestDTO {
    headers['Authorization'] = `Bearer ${this.secret_key}`;
    headers['Content-Type'] = 'application/json';
    

    return { url, headers, method, data };
  }

  /**
   * initializes a new paystack charge transactions
   * @param amount_in_naira amount to be paid
   * @param meta metadata to be sent to paystack

   * @returns paystack transaction response
   */
  initialize_transaction(amount_in_naira: number, meta: JSON | string) {
    const url = `${this.base_url}initialize`;
    const data = {};
    data['amount'] = amount_in_naira * 100;
    data['metadata'] = meta;
    data['email'] = this.email_address;

    const request = this.make_request(url, HttpMethod.POST, data);

    return this.http.do<PaystackResponse<InitializedTransactionResponse>>(
      request,
    );
  }


  withdraw_transaction(amount_in_naira: number, meta: JSON | string, bankDetails: JSON | string, userData: JSON | string) {

      const transferUrl = `${this.base_url}initialize`;
      const data = {};
      data['type'] = ""; //amount_in_naira * 100;
      data['name'] = ""; //`${userData.first_name} ${userData.lastName}`;
      data['bank_code'] =""; //bankDetails.bankCode;
      data['account_number'] = ""; //bankDetails.accountNumber;
      data['currency'] = "NGN";
  
  
      const request = this.make_request(transferUrl, HttpMethod.POST, data);
  
    
    
    const responseCreateReciepientData = request.data;

    console.log(
      "responseCreateReciepientData============>",
      responseCreateReciepientData
    );

    const recipientCode = responseCreateReciepientData.recipient_code; //e.g RCP_1i2k27vk4suemug
    if (recipientCode) {
   
    const referenceId = v4();
    const url = `${this.base_url}transfer`;
    const data = {};
    data['amount'] = amount_in_naira * 100;
    data['metadata'] = meta;
    data['email'] = this.email_address;
    data['reason'] = `Withdrawal from your Quickbunny wallet`;
    data['currency'] = "NGN";
    data['reference'] = referenceId;
    data['callbackURL'] =  "https://webhook.site/041a3538-d5d3-4a37-a9c1-2dcab86f88ff";




    const withdrawRequest = this.make_request(url, HttpMethod.POST, data);

    return this.http.do<PaystackResponse<InitializedTransactionResponse>>(
      withdrawRequest,
    );
  }
}

  /**
   * Fetches transaction from paystack
   * @param reference paystack transaction reference
   * @returns paystack transaction
   */
  get_transaction(reference: string) {
    const url = `${this.base_url}verify/${reference}`;
    const request = this.make_request(url, HttpMethod.GET);

    return this.http.do<PaystackResponse<GetTransactionResponse>>(request);
  }

  verify_hash(signature: string, request_body) {
    const hash = createHmac('sha512', this.secret_key)
      .update(JSON.stringify(request_body))
      .digest('hex');

    if (hash !== signature) throw new InvalidSignature();

    return request_body;
  }
}

export class InvalidSignature extends Error {
  constructor() {
    super('invalid request signature');
  }
}
