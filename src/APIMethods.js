const getAccountsAPI = async (setAccountUid) => {
  const response = await fetch('/api/v2/accounts', {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_STARLING_ACCESS_TOKEN}`,
    },
  });
  const accountsData = await response.json();
  

  const accountUid = accountsData.accounts[0].accountUid;
  setAccountUid(accountUid);
  return accountUid; 
};


export default getAccountsAPI