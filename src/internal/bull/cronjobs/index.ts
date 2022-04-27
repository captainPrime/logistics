//all cron jobs here

import { RedisService } from "../../../services/cache";
import { depositToSavingsQueue, endSavingsQueue } from "../queues";
//, verifyWithdrawalsQueue
const depositToSavingsCronjobs = [
  {
    repeat: {
      cron: `0 9 * * *`,
    },
  },
  {
    repeat: {
      cron: `0 21 * * *`,
    },
  },
];



const endSavingsPlanCronJob = [
  {
    repeat: {
      cron: `0 9 * * *`,
    },
  },
  {
    repeat: {
      cron: `0 21 * * *`,
    },
  },
];

// const confirmPendingWithdrawalsCronjobs = [
//   {
//     repeat: {
//       cron: `40 */6 * * *`, //runs every 6 hours
//     },
//   },
// ];

export async function initializeCronJobs(): Promise<any> {
  await RedisService.delete("bull:*");

  for (const option of depositToSavingsCronjobs) {
    await depositToSavingsQueue.add({}, option);
  }


  for (const option of endSavingsPlanCronJob) {
    await endSavingsQueue.add({}, option);
  }

  // for (const option of confirmPendingWithdrawalsCronjobs) {
  //   await verifyWithdrawalsQueue.add({}, option);
  // }
}
