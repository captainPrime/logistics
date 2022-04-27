// import "dotenv/config";
// import sequelize from "sequelize";
// import { verifyTransactionHelper } from "../../../../endpoints/wallet/controllers/verfiyWithdrawal";
// import db from "../../../../models";

// const Transaction = db.Transaction;
// const User = db.User;

// export const verifyWithdrawals = async (): Promise<unknown> => {
//   const transactions = await Transaction.findAll({
//     where: {
//       type: "WITHDRAWAL_FROM_WALLET",
//       status: "PENDING",
//     },
//     include: [{ model: User, as: "user" }],
//     limit: 15,
//     order: [["createdAt", "DESC"]],
//   });

//   if (!transactions.length) {
//     console.log("All withdrawals look good. We love holiday");
//   }

//   const operations = [];

//   for (const transaction of transactions) {
//     const sqlTransaction = await db.sequelize.transaction({
//       isolationLevel: sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE,
//     });
//     try {
//       operations.push(
//         await verifyTransactionHelper(transaction, sqlTransaction)
//       );
//     } catch (error) {
//       console.log(error);
//     }
//   }
//   return;
// };
