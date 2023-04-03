import { v4 as uuidv4 } from "uuid";

// All Starling API calls are being proxied through the dev server to avoid CORS issues.
// https://create-react-app.dev/docs/proxying-api-requests-in-development/
// In production setting, all API calls will be made on the server side.

const headers = {
  Authorization: `Bearer ${process.env.REACT_APP_STARLING_ACCESS_TOKEN}`,
  Accept: "application/json",
  "User-Agent": "Nor Afyq Eyzar bin Abu Zaharoff",
  "Content-Type": "application/json",
};

const getTransferAmount = (amount) => {
  return {
    amount: {
      currency: "GBP",
      minorUnits: amount,
    },
  };
};

const putSavingsGoal = async (accountSpecs, savingsGoal, amount) => {
  const transferUid = uuidv4();
  await fetch(
    `/api/v2/account/${accountSpecs.accountUid}/savings-goals/${savingsGoal.savingsGoalUid}/add-money/${transferUid}`,
    {
      method: "PUT",
      headers,
      body: JSON.stringify(getTransferAmount(amount)),
    }
  );
};

export default putSavingsGoal;
