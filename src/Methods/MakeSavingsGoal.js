import React from "react";
import { getAccountsAPI } from "./APIMethods";

const savingGoal = {
  "name": "Trip to Paris",
  "currency": "GBP",
  "target": {
    "currency": "GBP",
    "minorUnits": 123456
  },
  "base64EncodedPhoto": "string"
}

const makeSavingsGoal = async () => {
  const accountSpecs = await getAccountsAPI();
  const response = await fetch(`/api/v2/account/${accountSpecs.accountUid}/savings-goals`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_STARLING_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(savingGoal)
  });
  const accountsDetailsData = await response.json();
  
  console.log(accountsDetailsData)
  
}

export default makeSavingsGoal;