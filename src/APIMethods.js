

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

const getAccountsDetails = async (setAccountDetails) => {
  const response = await fetch('/api/v2/account-holder/individual', {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_STARLING_ACCESS_TOKEN}`,
    },
  });
  const accountsDetailsData = await response.json();
  

  // const accountsDetails = accountsDetailsData;
  setAccountDetails(accountsDetailsData);
  // console.log(accountsSpecs)
  // return accountsSpecs; 
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

const getAccountsFeedAPI = async (setAccountSpecs, setFeed, setFeedAmount, startDate) => {
  const accountSpecs = await getAccountsAPI(setAccountSpecs);
  const response = await fetch(`/api/v2/feed/account/${accountSpecs.accountUid}/category/${accountSpecs.defaultCategory}?changesSince=${startDate}`, {
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


const getAccountsFeedRangedAPI = async (setAccountSpecs, setFeed, setFeedAmount, startDate, endDate) => {
  const accountSpecs = await getAccountsAPI(setAccountSpecs);

  const response = await fetch(`/api/v2/feed/account/${accountSpecs.accountUid}/category/${accountSpecs.defaultCategory}/transactions-between?minTransactionTimestamp=${startDate}&maxTransactionTimestamp=${endDate}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_STARLING_ACCESS_TOKEN}`,
    },
  });
  const accountsFeedData = await response.json();

  setFeed(accountsFeedData.feedItems);
  setFeedAmount(accountsFeedData.feedItems.amount);

  // console.log(accountsFeedData)
  return accountsFeedData.feedItems;
};



export {getAccountsBalanceAPI, getAccountsFeedAPI, getAccountsIdentifiersAPI, getAccountsDetails, getAccountsFeedRangedAPI}



