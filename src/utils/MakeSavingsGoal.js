// import React from "react";
import { getAccountsAPI } from "./APIMethods";

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

  console.log(accountsDetailsData);
};

export default makeSavingsGoal;
