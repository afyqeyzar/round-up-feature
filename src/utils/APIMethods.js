const headers = {
  Authorization: `Bearer ${process.env.REACT_APP_STARLING_ACCESS_TOKEN}`,
  Accept: "application/json",
  "User-Agent": "Nor Afyq Eyzar bin Abu Zaharoff",
};

const getAccountsAPI = async () => {
  const response = await fetch("/api/v2/accounts", {
    method: "GET",
    headers,
  });
  const accountsData = await response.json();

  const accountsSpecs = accountsData.accounts[0];
  // (accountsSpecs);
  // console.log(accountsSpecs)
  return accountsSpecs;
};

const getAccountsDetails = async (setAccountDetails) => {
  const response = await fetch("/api/v2/account-holder/individual", {
    method: "GET",
    headers,
  });
  const accountsDetailsData = await response.json();

  // const accountsDetails = accountsDetailsData;
  setAccountDetails(accountsDetailsData);
  // console.log(accountsSpecs)
  // return accountsSpecs;
};

const getSavingsGoal = async (
  setAccountSpecs,
  setSavingsGoal,
  setHaveSavingsGoal
) => {
  const accountSpecs = await getAccountsAPI();
  const response = await fetch(
    `/api/v2/account/${accountSpecs.accountUid}/spaces`,
    {
      method: "GET",
      headers,
    }
  );
  const accountsData = await response.json();

  if (accountsData.savingsGoals.length === 0) {
    console.log("No savings goal");
  } else {
    setHaveSavingsGoal(false);
    setAccountSpecs(accountSpecs);
    // console.log("yes savings goal");
    if (Object.keys(accountsData).length > 0) {
      // console.log(accountsData.savingsGoals[0]);
      setSavingsGoal(accountsData.savingsGoals[0]);
    }
  }

  // console.log(Object.keys(accountsData).length);

  // console.log(accountsData)
};

const getAccountsIdentifiersAPI = async (setIdentifiers) => {
  const accountSpecs = await getAccountsAPI();
  const response = await fetch(
    `/api/v2/accounts/${accountSpecs.accountUid}/identifiers`,
    {
      method: "GET",
      headers,
    }
  );
  const accountsIdentifiersData = await response.json();

  setIdentifiers(accountsIdentifiersData);
  // console.log(accountsIdentifiersData)
};

const getAccountsBalanceAPI = async (setBalance) => {
  const accountSpecs = await getAccountsAPI();
  const response = await fetch(
    `/api/v2/accounts/${accountSpecs.accountUid}/balance`,
    {
      method: "GET",
      headers,
    }
  );
  const accountsBalanceData = await response.json();

  setBalance(accountsBalanceData);
  // console.log(accountsBalanceData.clearedBalance)
};

const getAccountsFeedRangedAPI = async (setFeed, startDate, endDate) => {
  const accountSpecs = await getAccountsAPI();

  const response = await fetch(
    `/api/v2/feed/account/${accountSpecs.accountUid}/category/${accountSpecs.defaultCategory}/transactions-between?minTransactionTimestamp=${startDate}&maxTransactionTimestamp=${endDate}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_STARLING_ACCESS_TOKEN}`,
      },
    }
  );
  const accountsFeedData = await response.json();

  setFeed(accountsFeedData.feedItems);
  // setFeedAmount(accountsFeedData.feedItems.amount);

  // console.log(accountsFeedData)
  return accountsFeedData.feedItems;
};

export {
  getAccountsBalanceAPI,
  getAccountsDetails,
  getAccountsFeedRangedAPI,
  getSavingsGoal,
  getAccountsAPI,
};