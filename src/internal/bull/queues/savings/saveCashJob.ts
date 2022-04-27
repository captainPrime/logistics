import sequelize, { QueryTypes } from "sequelize";
import { format } from "util";
import db from "../../../../models";
import { DEDUCT_USER_WALLET_QUERY } from "./deductSavingFromUserWallet";
import {
  createDollarAndNairaCaseQuery as generateCaseQueriesAndSavingsTransactionList,
  savingsTransactionInfoArray,
  updateSavingsNextPaymentDate,
} from "./saveCashJobHelpers";
// getInterestAmount,

const Savings = db.Savings;
const User = db.User;
const SavingsTransactions = db.SavingsTransactions;

export async function deductSavingsMoney(): Promise<any> {
  const sqlTransaction = await db.sequelize.transaction({
    isolationLevel: sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE,
  });

  try {
    console.log("1. Retrieve all savings plan that need to be deducted");

    const todaysDate = new Date();
    const savings = await Savings.findAll({
      where: { nextPaymentDate: todaysDate, status: "ACTIVE" },
      include: [{ model: User, as: "user" }],
      transaction: sqlTransaction,
    });

    if (!savings.length) {
      console.log("----No Savings to deduct today. We love holidays-----");
      return;
    }

    console.log(
      "2. Validating the user's that do not have enough money to withdraw from their wallet and removing invalid ones"
    );

    const savingsTransactionInfo = await savingsTransactionInfoArray(savings);

    console.log(
      "3. Build query to deduct validated users wallet and SavingsTransaction list to be bulkCrated"
    );
    const {
      dollarWalletCaseQuery,
      nairaWalletCaseQuery,
      savingsTransactionList,
      userIdsInDeductQuery,
      successfulSavingsIds,
      emailServices,
    } = generateCaseQueriesAndSavingsTransactionList(savingsTransactionInfo);

    const finalDeductQuery = format(
      DEDUCT_USER_WALLET_QUERY,
      dollarWalletCaseQuery,
      nairaWalletCaseQuery
    );

    if (userIdsInDeductQuery.length) {
      const [updatedUsers] = await db.sequelize.query(finalDeductQuery, {
        replacements: {
          usersIdsWalletToDeduct: userIdsInDeductQuery,
        },
        type: QueryTypes.UPDATE,
        transaction: sqlTransaction,
      });
      console.log("updated", updatedUsers);
    }

    console.log(
      "4. Bulk insert all the transactions to the SavingsTransactions"
    );

    //   savingsTransactionList

    await SavingsTransactions.bulkCreate(savingsTransactionList, {
      transaction: sqlTransaction,
    });

    await updateSavingsNextPaymentDate(successfulSavingsIds, sqlTransaction);
    // TODO: Change this to commit
    await sqlTransaction.commit();

    await Promise.all(
      emailServices.map(({ service, email, firstName, lastName, body }) =>
        service.sendEmail(email, "transactionEmail", {
          username: `${firstName} ${lastName}`,
          body,
        })
      )
    );
  } catch (error) {
    console.log(error);

    await sqlTransaction.rollback();
  }
}
