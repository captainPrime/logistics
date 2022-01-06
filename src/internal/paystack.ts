import { Env } from '@app/config/env.keys';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpClient, HttpMethod, RequestDTO } from './http';

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

  get_transaction(reference: string) {
    const url = `${this.base_url}verify/${reference}`;
    const request = this.make_request(url, HttpMethod.GET);

    return this.http.do<PaystackResponse<GetTransactionResponse>>(request);
  }
}
