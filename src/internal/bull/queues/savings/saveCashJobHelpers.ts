import db from "../../../../models";
import { Transaction } from "sequelize";
import { CURRENCY_WALLET_MAPPER } from "../../../../utils/constants";
import { UPDATE_SAVINGS_NEXT_PAYMENT_QUERY } from "./deductSavingFromUserWallet";
import { SendGridMailService } from "../../../../services/emails/EmailService";

export function savingsTransactionInfoArray(
  savings: Record<string, any>[]
): Record<string, any>[] {
  const savingsTransactionInfo = [];

  for (const saving of savings) {
    const ownerOfSavingsPlan = saving.user;
    const savingsTransactionInfoObject: Record<string, any> = {
      user: ownerOfSavingsPlan,
      currency: saving.currency,
      amountToDeduct: saving.amountToBeSaved,
      savings: saving.dataValues || saving,
    };
    if (saving.currency === "USD_CENTS") {
      if (ownerOfSavingsPlan.walletAmountInUSCents > saving.amountToBeSaved) {
        savingsTransactionInfoObject.hasSufficientFund = true;
      } else {
        savingsTransactionInfoObject.hasSufficientFund = false;
      }
    } else if (saving.currency === "NGN_KOBO") {
      if (ownerOfSavingsPlan.walletInNGNKobo > saving.amountToBeSaved) {
        savingsTransactionInfoObject.hasSufficientFund = true;
      } else {
        savingsTransactionInfoObject.hasSufficientFund = false;
      }
    }

    savingsTransactionInfo.push(savingsTransactionInfoObject);
  }

  console.log("savingsTransactionInfoObject===>", savingsTransactionInfo);

  return savingsTransactionInfo;
}

export function createDollarAndNairaCaseQuery(
  savingsTransactionInfo: Record<string, any>[]
) {
  let dollarWalletCaseQuery = "";
  let nairaWalletCaseQuery = "";

  const userIdsInDeductQuery = [];
  const savingsTransactionList = [];
  const successfulSavingsIds = [];
  const emailServices = [];

  for (const deductInfo of savingsTransactionInfo) {
    const walletToDeduct = CURRENCY_WALLET_MAPPER[deductInfo.currency];
    const currentUserId = deductInfo.user.id;
    const savingsId = deductInfo.savings.id;
    const savingsTransaction: Record<string, any> = {
      amountDeducted: deductInfo.amountToDeduct,
      savingsId,
      currency: deductInfo.currency,
    };

    const deductedAmountFormatted = deductInfo.amountToDeduct / 100;

    if (!deductInfo.hasSufficientFund) {
      savingsTransaction.status = "FAILURE";
      savingsTransaction.failureMsg =
        "You had insufficient funds when this attempt was made";

      const service = new SendGridMailService(
        `<h5>Failed to deduct your fixed deposit amount of <b> ${deductedAmountFormatted}${deductInfo.currency} </b> from your wallet due to insufficcient balance. Kindly fund your wallet to continue your savings plan</h5>`,
        "Vesti savings"
      );
      emailServices.push({ service, email: deductInfo.user.email });
    } else {
      savingsTransaction.status = "SUCCESS";
      successfulSavingsIds.push(savingsId);
      const currentInfoCase = `
                      WHEN id = '${currentUserId}' 
                      THEN "${walletToDeduct}" - ${deductInfo.amountToDeduct}
  `;

      userIdsInDeductQuery.push(currentUserId);
      if (deductInfo.currency === "USD_CENTS") {
        dollarWalletCaseQuery = dollarWalletCaseQuery + currentInfoCase;
      } else if (deductInfo.currency === "NGN_KOBO") {
        nairaWalletCaseQuery = nairaWalletCaseQuery + currentInfoCase;
      }
      const body = `A savings transaction of ${deductedAmountFormatted}${deductInfo.currency} has occured in your Vesti wallet`;
      const service = new SendGridMailService(body, "Vesti savings");
      emailServices.push({
        service,
        email: deductInfo.user.email,
        firstName: deductInfo.user.firstName,
        lastName: deductInfo.user.lastName,
        body,
      });
    }
    savingsTransactionList.push(savingsTransaction);
  }
  return {
    dollarWalletCaseQuery,
    nairaWalletCaseQuery,
    savingsTransactionList,
    userIdsInDeductQuery,
    successfulSavingsIds,
    emailServices,
  };
}

export const updateSavingsNextPaymentDate = async (
  savingsId: string[],
  sqlTransaction: Transaction
): Promise<any[]> => {
  if (savingsId.length === 0) return [];

  return db.sequelize.query(UPDATE_SAVINGS_NEXT_PAYMENT_QUERY, {
    replacements: {
      savingsIdToUpdate: savingsId,
    },
    transaction: sqlTransaction,
  });
};


export function getInterestAmount(savingsObj) {
  //calculate interest here

  const startDate = new Date(`${savingsObj.startDate}`);
  const endDate = new Date(`${savingsObj.startDate}`);

  const diffTime = Math.abs(+endDate - +startDate);

  const principal = savingsObj.amountSaved;
  const rate = 0.00;
  
  //set rate here 
  //const rate = 0.02;
  const timeInDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const compoundInterest =
    principal * Math.pow(1 + rate / 365, 365 * timeInDays);

  // const interest = (principal * rate * timeInDays)/100

  return compoundInterest;
}




