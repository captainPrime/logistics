import { Currency } from "../utils/helpers/transactionHelpers";
import { ONE_WEEK_IN_MS } from "../utils/constants";
import { RedisService, uuidGenerator } from "./cache";
import {
 providusClient,
} from "./externalApis/providus";
import { abokFxClient } from "./externalApis/abokifx";

export type DepositCurrency = "USD" | "NGN";

type AirtimeArgs = {
  amount: number;
  currency: DepositCurrency;
  customer: number;
  recurrence: string;
  type: string;
  reference: string;
};

type GenerateLinkArgs = {
  amount: number;
  email: string;
  name: string;
  userId: string;
  phonenumber: string;
  currency?: DepositCurrency;
  transactionInfo: {
    title: string;
    description: string;
  };
  meta: Record<string, any>;
};

type GenerateVirtualAccountNoArgs = {

  name: string;
  userId: string;

};
type ExchangeType = "USD_TO_NAIRA" | "NAIRA_TO_USD";

type WidrawArgumentType = {
  acountBankCode: string;
  accountNumber: string;
  amount: number | string;
  narration: string;
  beneficiaryName: string;
  callbackURL: string;
  reference: string;
  currency: Currency;
  bankId: string;
};
const exchangeArguments: Record<ExchangeType, any> = {
  USD_TO_NAIRA: {
    FromCurrency: "USD",
    ToCurrency: "NGN",
  },
  NAIRA_TO_USD: {
    FromCurrency: "NGN",
    ToCurrency: "USD",
  },
};
const FLUTTER_WAVE_LOGO =
  "https://res.cloudinary.com/wevesti/image/upload/v1618263060/WhatsApp_Image_2021-04-12_at_19.29.15_lh7uda.jpg";
export abstract class BasePaymentService {
  /**
   * This generates a payment link for the current transaction.
   * The user inputs the title of the transaction in the transaction info object
   * @param args This is the information about the request that was made
   */
  abstract generatePaymentLink(
    args: GenerateLinkArgs,
    redirectURL: string,
    frontendRedirectURL: string
  );
  abstract validatePaymentProvidus(reference: string);
}

class PaymentService extends BasePaymentService {
  // createVirtualAccount = async (
  //   args: GenerateVirtualAccountNoArgs,
  // ) => {
  //   const {
  //     name,
  //     userId,
  //   } = args;
  //   const transactionReference = uuidGenerator();
  //   try {
  //     const requestBody = {
       
  //       account_name: name,
  //       };
  //     const response = await providusClient.post("/PiPCreateDynamicAccountNumber", requestBody);
  //     console.log(requestBody);
  //     const data = await response.data;

  //     return [
  //       true,
  //       {
  //         ...data,
  //         userId: userId,
  //         reference: transactionReference,
  //       },
  //     ];
  //   } catch (error) {
  //     console.error(error);
  //     return [
  //       false,
  //       {
  //         message: "An error occured while Creating providus virtual account",
  //       },
  //     ];
  //   }
  // };
  generatePaymentLink = async (
    args: GenerateLinkArgs,
    redirectURL: string,
    frontendRedirectURL: string
  ) => {
    const {
      amount,
      email,
      phonenumber,
      name,
      userId,
      currency = "USD",
      transactionInfo: { title, description },
      meta,
    } = args;
    const transactionReference = uuidGenerator();
    try {
      const requestBody = {
        tx_ref: transactionReference,
        amount,
        currency,
        payment_options: "ussd,card",
        country: "NG",
        redirect_url: redirectURL,
        customer: {
          email,
          phonenumber,
          name,
        },
        meta: {
          reference: transactionReference,
          userId,
          frontendRedirectURL,
          ...meta,
        },
        customizations: {
          title,
          description,
          logo: FLUTTER_WAVE_LOGO,
        },
      };
      const response = await providusClient.post("/payments", requestBody);
      console.log(requestBody);
      const data = await response.data;

      return [
        true,
        {
          ...data,
          reference: transactionReference,
        },
      ];
    } catch (error) {
      console.error(error);
      return [
        false,
        {
          message: "An error occured while generating link",
        },
      ];
    }
  };
  buyAirtime = async (args: AirtimeArgs) => {
    const { currency, customer, amount, recurrence, reference } = args;

    try {
      const requestBody = {
        country: currency,
        customer: customer,
        amount: amount,
        recurrence: recurrence,
        type: "AIRTIME",
        reference: reference,
      };

      const response = await providusClient.post("/bills", requestBody);

      const data = await response.data;

      return [
        true,
        {
          ...data,
        },
      ];
    } catch (error) {
      return [false, await error.response.data];
    }
  };
  validatePaymentProvidus = async (transactionId: string) => {
    const VERIFY_PATH = `/transactions/${transactionId}/verify`;
    try {
      const response = await providusClient.get(VERIFY_PATH);
      const data = await response.data;
      return [true, data];
    } catch (error) {
      const response = await error.response;
      return [false, response.data, response.status];
    }
  };

  retrieveBanks = async (
    country = "NG"
  ): Promise<
    [success: boolean, data: Record<string, any>, status?: number]
  > => {
    const BANKS_URL = `/banks/${country}`;

    const cachedBanks = await RedisService.retrieveKey("BANKS");
    if (cachedBanks) {
      return [true, JSON.parse(cachedBanks)];
    }
    try {
      const response = await providusClient.get(BANKS_URL);
      const { data } = await response.data;
      RedisService.cacheData("BANKS", data, ONE_WEEK_IN_MS);

      return [true, data];
    } catch (error) {
      const response = await error.response;
      return [false, response.data, response.status];
    }
  };

  retrieveSingleBank = async (
    bankCode,
    country = "NG"
  ): Promise<
    [success: boolean, data: Record<string, any>, status?: number]
  > => {
    const [success, data, error] = await this.retrieveBanks(country);

    if (!success) {
      return [success, data, error];
    }

    const singleBank = data.find(
      (bank) => String(bank.code) === String(bankCode)
    );

    return [true, singleBank];
  };

  withdrawCash = async (
    withdrawArgument: WidrawArgumentType
  ): Promise<
    [success: boolean, data: Record<string, any>, status?: number]
  > => {
    const {
      acountBankCode,
      accountNumber,
      amount,
      narration,
      beneficiaryName,
      reference,
      callbackURL,
      currency,
      bankId,
    } = withdrawArgument;
    const widthdrawURL = "/transfers";
    // const callbackURL = `${req.protocol}://${req.headers.host}/api/wallet/pay/confirm`;
    const flutterCurrency = currency === "NGN_KOBO" ? "NGN" : "USD";
    try {
      const { data } = await providusClient.post(widthdrawURL, {
        account_bank: acountBankCode,
        account_number: accountNumber,
        amount,
        narration,
        currency: flutterCurrency,
        reference: reference,
        beneficiary_name: beneficiaryName,
        callback_url: callbackURL,
        debit_currency: flutterCurrency,
        meta: {
          bankId,
        },
      });
      return [true, data];
    } catch (error) {
      const response = await error.response;
      return [false, response.data, response.status];
    }
  };

  retrieveExchangeRate = async (
    amount: number,
    exchangeType: ExchangeType = "USD_TO_NAIRA"
  ) => {
    try {
      const url = `/usd_to_ngn.json?days=30`;

      const { data } = await abokFxClient.get(url);
      const dollarToNaira = data["usd"][0][1];

      let newAmount = dollarToNaira * amount;
      if (exchangeType === "NAIRA_TO_USD") {
        newAmount = amount / dollarToNaira;
      }

      return [true, { dollarToNaira, newAmount }];
    } catch (error) {
      const response = await error.response;
      console.log(error);
      return [false, response, error.isAxiosError];
    }
  };

  retrieveTransfer = async (transactionId: string) => {
    const url = `/transfers?reference=${transactionId}`;

    try {
      const {
        data: { data },
      } = await providusClient.get(url.trim());

      return [true, data[0]];
    } catch (error) {
      console.log(error.response);
      return [false, await error.response];
    }
  };
}

const flutterWaveService = new PaymentService();

export default flutterWaveService;
