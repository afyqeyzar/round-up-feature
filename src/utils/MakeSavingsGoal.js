import { getAccountsAPI } from "./APIMethods";

// All Starling API calls are being proxied through the dev server to avoid CORS issues.
// https://create-react-app.dev/docs/proxying-api-requests-in-development/
// In production setting, all API calls will be made on the server side.

const headers = {
  Authorization: `Bearer ${process.env.REACT_APP_STARLING_ACCESS_TOKEN}`,
  Accept: "application/json",
  "User-Agent": "Nor Afyq Eyzar bin Abu Zaharoff",
  "Content-Type": "application/json",
};

const savingGoal = {
  name: "House Renovation for Baby",
  currency: "GBP",
  target: {
    currency: "GBP",
    minorUnits: 800000,
  },
  base64EncodedPhoto: "string",
};

const makeSavingsGoal = async () => {
  const accountSpecs = await getAccountsAPI();
  const response = await fetch(
    `/api/v2/account/${accountSpecs.accountUid}/savings-goals`,
    {
      method: "PUT",
      headers,
      body: JSON.stringify(savingGoal),
    }
  );
  const accountsDetailsData = await response.json();
};

export default makeSavingsGoal;
