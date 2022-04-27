import Queue from "bull";
import { endSavingsPlanJob } from "./endSavingsPlanJob";
import { deductSavingsMoney } from "./saveCashJob";
export const depositToSavingsQueue = new Queue(
  "depositToSavingsQueue",
  process.env.REDIS_SERVER_URL
);


export const endSavingsQueue = new Queue(
  "endSavingsQueue",
  process.env.REDIS_SERVER_URL
);

depositToSavingsQueue.process(async () => {
  const now = new Date();
  console.log("Running Cronjob ran at " + now.toISOString());
  await deductSavingsMoney();
  console.log("Successfully completed savings");

  return "Success";
});


endSavingsQueue.process(async () => {
  const now = new Date();
  console.log("Running End savings Cronjob ran at " + now.toISOString());
  await endSavingsPlanJob();
  console.log("Successfully completed savings");

  return "Success";
});
