export const DEDUCT_USER_WALLET_QUERY = `

UPDATE "Users"
	SET "walletAmountInUSCents" = 
		CASE 
                    WHEN FALSE THEN "walletAmountInUSCents"
            %s
                    ELSE "walletAmountInUSCents"
		END, 
		
		"walletInNGNKobo" = 
		CASE 
                    WHEN FALSE THEN "walletInNGNKobo"
			%s
			        ELSE "walletInNGNKobo"
		END

    WHERE id::TEXT = 

    ANY(ARRAY[:usersIdsWalletToDeduct])

    RETURNING id, "firstName", "lastName", "walletAmountInUSCents", "walletInNGNKobo"
;

`;



export const UPDATE_SAVINGS_NEXT_PAYMENT_QUERY = `

UPDATE
  "Savings"
SET
  "nextPaymentDate" = "nextPaymentDate" + ("frequencyInDays" * interval '1 day'),
  "previousPaymentDate" = NOW() :: date
WHERE
id ::TEXT = ANY(ARRAY[:savingsIdToUpdate])

RETURNING ID,
  "frequencyInDays",
  "previousPaymentDate",
  "nextPaymentDate";

`;
