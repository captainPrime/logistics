// import Queue from "bull";
// import { verifyWithdrawals } from "./verifyWithdrawals";

// export const verifyWithdrawalsQueue = new Queue(
//   "depositToSavingsQueue",
//   process.env.REDIS_SERVER_URL
// );

// verifyWithdrawalsQueue.process(async () => {
//   const now = new Date();
//   console.log("Running Cronjob ran at " + now.toISOString());
//   await verifyWithdrawals();
//   console.log("Successfully verified pending withdrawals");

//   return "Success";
// });
