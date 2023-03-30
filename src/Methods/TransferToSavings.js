import {v4 as uuidv4} from 'uuid';

const getTransferAmount = (amount) => {
  return {
    "amount": {
      "currency": "GBP",
      "minorUnits": amount
    }
  }
}

const putSavingsGoal = async (accountSpecs, savingsGoal, amount) => {
  const transferUid = uuidv4()
  const response = await fetch(`/api/v2/account/${accountSpecs.accountUid}/savings-goals/${savingsGoal.savingsGoalUid}/add-money/${transferUid}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_STARLING_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(getTransferAmount(amount))
  });
  // const accountsDetailsData = await response.json();
}

export default putSavingsGoal