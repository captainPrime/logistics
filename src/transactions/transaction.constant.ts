export enum TRANSACTION_INTENTS {
  WALLET_FUNDING = 'wallet funding',
  WITHDRAWAL = 'withdrawal',
}

export enum TRANSACTION_TYPES {
  CREDIT = 'credit',
  DEBIT = 'debit',
}

export enum TRANSACTION_STATUS {
  INITIATED = 'initiated',
  PENDING = 'pending',
  SUCCESSFUL = 'successful',
  CANCELED = 'canceled',
  FAILED = 'failed',
}

export enum TRANSACTION_PROVIDERS {
  PAYSTACK = 'paystack',
}

export enum CURRENCY {
  NAIRA = 'NGN',
}

export const MINIMUM_AMOUNT = 500.0;
