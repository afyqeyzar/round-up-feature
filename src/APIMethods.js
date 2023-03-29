const getAccountsAPI = async (setAccountSpecs) => {
  const response = await fetch('/api/v2/accounts', {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_STARLING_ACCESS_TOKEN}`,
    },
  });
  const accountsData = await response.json();
  

  const accountsSpecs = accountsData.accounts[0];
  setAccountSpecs(accountsSpecs);
  // console.log(accountsSpecs)
  return accountsSpecs; 
};

const getAccountsIdentifiersAPI = async (setAccountSpecs, setIdentifiers) => {
  const accountSpecs = await getAccountsAPI(setAccountSpecs);
  const response = await fetch(`/api/v2/accounts/${accountSpecs.accountUid}/identifiers`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_STARLING_ACCESS_TOKEN}`,
    },
  });
  const accountsIdentifiersData = await response.json();

  setIdentifiers(accountsIdentifiersData)
  // console.log(accountsIdentifiersData)
};

const getAccountsBalanceAPI = async (setAccountSpecs, setBalance) => {
  const accountSpecs = await getAccountsAPI(setAccountSpecs);
  const response = await fetch(`/api/v2/accounts/${accountSpecs.accountUid}/balance`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_STARLING_ACCESS_TOKEN}`,
    },
  });
  const accountsBalanceData = await response.json();

  setBalance(accountsBalanceData);
  // console.log(accountsBalanceData.clearedBalance)
};

const getAccountsFeedAPI = async (setAccountSpecs, setFeed, setFeedAmount) => {
  const accountSpecs = await getAccountsAPI(setAccountSpecs);
  const response = await fetch(`/api/v2/feed/account/${accountSpecs.accountUid}/category/${accountSpecs.defaultCategory}?changesSince=${accountSpecs.createdAt}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_STARLING_ACCESS_TOKEN}`,
    },
  });
  const accountsFeedData = await response.json();

  setFeed(accountsFeedData.feedItems);
  setFeedAmount(accountsFeedData.feedItems.amount);
  return accountsFeedData.feedItems;
  // console.log(accountsFeedData.feedItems[0]);
};

export {getAccountsBalanceAPI, getAccountsFeedAPI, getAccountsIdentifiersAPI}



  // const getAccountsFeedAPI = async () => {
  //   const accountSpecs = await getAccountsAPI();
  //   const response = await fetch(`/api/v2/feed/account/${accountSpecs.accountUid}/category/${accountSpecs.defaultCategory}/transactions-between?minTransactionTimestamp=${accountSpecs.createdAt}&maxTransactionTimestamp=2023-03-29T18:21:22.945Z`, {
  //     method: "GET",
  //     headers: {
  //       Authorization: `Bearer ${process.env.REACT_APP_STARLING_ACCESS_TOKEN}`,
  //     },
  //   });
  //   const accountsFeedData = await response.json();

  //   console.log(accountsFeedData)
  // };
