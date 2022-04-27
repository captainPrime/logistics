import { format } from "util";
import db from "../../../../models";
import sequelize, { Op, QueryTypes } from "sequelize";
import { getInterestAmount } from "./saveCashJobHelpers";

const Savings = db.Savings;
const User = db.User;
export async function endSavingsPlanJob(): Promise<any> {
  console.log("1.  Retrieving all savings plan whose end date is due");

  const sqlTransaction = await db.sequelize.transaction({
    isolationLevel: sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE,
  });

  try {
    const todaysDate = new Date();

    const savingsDue = await Savings.findAll({
      where: {
        endDate: {
          [Op.lt]: todaysDate,
        },
        status: "ACTIVE",
      },
      include: [{ model: User, as: "user" }],
      transaction: sqlTransaction,
    });

    if (!savingsDue.length) {
      console.log("----No Savings operation today. We love holidays-----");
      return;
    }

    console.log("2. Deactivating all due savings transaction");

    const savingsIds = [];
    const usersIds = [];

    const UPDATE_QUERY = `
  UPDATE "Users"
	SET 
"walletInNGNKobo" = 
	CASE 
        WHEN FALSE THEN "walletInNGNKobo"
				%s
				ELSE "walletInNGNKobo"
	END,
		"walletAmountInUSCents" = 
	CASE 
        WHEN FALSE THEN "walletAmountInUSCents"
			  %s
				ELSE "walletAmountInUSCents"
	END
WHERE id IN (:userIds)
RETURNING * ;

  `;
    let dollarLiteral = "";
    let nairaLiteral = "";

    const userMapper: Record<
      string,
      {
        totalCents: number;
        totalKobo: number;
      }
    > = {};

    for (const savingsObj of savingsDue) {
      savingsIds.push(savingsObj.id);
      const { userId } = savingsObj;
      usersIds.push(userId);
      if (!userMapper[userId]) {
        userMapper[userId] = {
          totalCents: 0,
          totalKobo: 0,
        };
      }
      //getting interest amount
      const interest = await getInterestAmount(savingsObj);

      console.log("3. Transfering all saved amount to user wallet");

      if (savingsObj.currency === "NGN_KOBO") {
        userMapper[userId].totalKobo += interest;
      } else if (savingsObj.currency === "USD_CENTS") {
        userMapper[userId].totalCents += interest;
      }
    }

    for (const [userId, interestObject] of Object.entries(userMapper)) {
      if (interestObject.totalKobo) {
        nairaLiteral =
          nairaLiteral +
          `
        WHEN id  = '${userId}' THEN "walletInNGNKobo" + ${interestObject.totalKobo} 
`;
      }
      if (interestObject.totalCents) {
        dollarLiteral =
          dollarLiteral +
          `
        WHEN id = '${userId}' THEN "walletAmountInUSCents" + ${interestObject.totalCents}
`;
      }
    }

    const updateUserWalletQuery = format(
      UPDATE_QUERY,
      nairaLiteral,
      dollarLiteral
    );

    await Savings.update(
      { status: "INACTIVE" },
      {
        transaction: sqlTransaction,
        where: {
          id: savingsIds,
        },
      }
    );

    db.sequelize.query(updateUserWalletQuery);

    const [updatedUsers] = await db.sequelize.query(updateUserWalletQuery, {
      replacements: {
        userIds: usersIds,
      },
      type: QueryTypes.UPDATE,
      transaction: sqlTransaction,
    });

    console.log("updatedUsers===> ", updatedUsers);

    await sqlTransaction.commit();
  } catch (error) {
    await sqlTransaction.rollback();
  }
}
