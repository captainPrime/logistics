import { Currency } from "../utils/helpers/transactionHelpers";
import { ONE_WEEK_IN_MS } from "../utils/constants";
import { RedisService, uuidGenerator } from "./cache";
import {
  stripeClient,
} from "./externalApis/stripe";
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
  metadata: Record<string, any>;
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
  type: string;
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

const PAYSTACK_LOGO =
  "https://res.cloudinary.com/wevesti/image/upload/v1618263060/WhatsApp_Image_2021-04-12_at_19.29.15_lh7uda.jpg";

  
export abstract class BaseStripePaymentService {
  /**
   * This generates a payment link for the current transaction.
   * The user inputs the title of the transaction in the transaction info object
   * @param args This is the information about the request that was made
   */
  abstract createSource(
    redirectURL: string,
    callbackURL: string
  );
  abstract validatePayment(reference: string);
}
//CARD

// POST 
// /v1/issuing/cards
//    GET 
// /v1/issuing/cards/:id
//   POST 
// /v1/issuing/cards/:id
//    GET 
// /v1/issuing/cards


class StripePaymentService extends BaseStripePaymentService {
  createSource = async (
    redirectURL: string,
    callbackURL: string
  ) => {
    const transactionReference = uuidGenerator();

    console.log("transactionReference===>",transactionReference);
    //const callbackURL = `https://api.wevesti.com/api/paystack/wallet/pay/confirm`;

    //confirm withdrawal https://api.wevesti.com/api/wallet/withdraw/confirm

 
    try {
      const requestBody = {
       
        redirect_url: redirectURL,
        callback_url : callbackURL,
        
      };
      const response = await stripeClient.post("/v1/issuing/cards", requestBody);



      console.log(requestBody);
      const data = await response.data;

      console.log("my data", data);

      // const stripe = require('stripe')('sk_test_51IvEhlHAoqrtq32w5PfwwRTLxV7kDW4m1aJZBlQldDE2firF7abIwAJdv0pZ3AXekscsD7vgwafmZxFaFOxM3UfP00rNn4Iud0');

      // const card = await stripe.customers.createSource(
      //   'cus_JiYmqdyVHq2h0Y',
      //   {source: 'tok_mastercard'}
      // );
    
    
     

      return [
        true,
        {
          ...data,
       },
      ];
    } catch (error) {
      console.error(error);
      return [
        false,
        {
          message: "An error occurred while generating link",
        },
      ];
    }
  };

  validatePayment = async (reference: string) => {
    const VERIFY_PATH = `/transaction/verify/${reference}`;
    try {
      const response = await stripeClient.get(VERIFY_PATH);
      const data = await response.data;

      console.log("paystack verify Payment", data);
      return [true, data];
    } catch (error) {
      const response = await error.response;
      return [false, response.data, response.status];
    }
  };

  retrieveBanks = async (
    country = "nigeria"
  ): Promise<
    [success: boolean, data: Record<string, any>, status?: number]
  > => {
    const BANKS_URL = `/bank/country=${country}`;

    const cachedBanks = await RedisService.retrieveKey("BANKS");
    if (cachedBanks) {
      return [true, JSON.parse(cachedBanks)];
    }
    try {
      const response = await stripeClient.get(BANKS_URL);
      const { data } = await response.data;
      //cache abokifx
      RedisService.cacheData("BANKS", data, ONE_WEEK_IN_MS);

      return [true, data];
    } catch (error) {
      const response = await error.response;
      return [false, response.data, response.status];
    }
  };

  retrieveSingleBank = async (
    bankCode,
    country = "nigeria"
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

    console.log("paystack single bank", data);
    return [true, singleBank];
  };

  createRecipientBank = async (
    type,
    accountNumber,
    acountBankCode,
    beneficiaryName,


    
  ): Promise<
    [success: boolean, data: Record<string, any>, status?: number]
    > => {
    
    const TRANSFER_URL = `/transferrecipient`;


      
    try {
      const response = await stripeClient.post(TRANSFER_URL, {

       
        type, 
        name: beneficiaryName,
        bank_code: acountBankCode,
        account_number: accountNumber,
        currency: "NGN"
        
      });



      const { data } = await response.data;
      
      console.log("createRecipientBank============>", response);
  
       
        return [true, data];
      } catch (error) {
        const response = await error.response;
        return [false, response.data, response.status];
      }
   
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
      type,
    } = withdrawArgument;


    const widthdrawURL = "/transfer";
    // const callbackURL = `${req.protocol}://${req.headers.host}/api/wallet/pay/confirm`;
    const flutterCurrency = currency === "NGN_KOBO" ? "NGN" : "USD";

    const [success, data, error] = await this.createRecipientBank(type, accountNumber, acountBankCode, beneficiaryName);
    console.log("before reciepient==========>", error);

    if (!success) {
      return [success, data, error];
    }
  
    console.log("reciepient==========>", data);

    const recipientCode = data.recipient_code; //e.g RCP_1i2k27vk4suemug
    

    
    try {


      const { data } = await stripeClient.post(widthdrawURL, {
        source: "balance",
        amount,
        recipient: recipientCode,
        reason: narration,
        currency: flutterCurrency,
        reference: reference,
        
       
      });

      console.log("paystack withdrawal==========>", data);
      return [true, data];
    } catch (error) {
      console.log(error);
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

  retrieveTransfer = async (transfer_code: string) => {
    const FinalizeUrl = `/transfer/finalize_transfer`;

    try {
      const { data } = await stripeClient.post(FinalizeUrl, {
        transfer_code,       
      });
      console.log("paystack transfer", data);
      

      return [true, data];
    } catch (error) {
      console.log(error.response);
      return [false, await error.response];
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

      const response = await stripeClient.post("/bills", requestBody);

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
}

const stripeService = new StripePaymentService();

export default stripeService;
