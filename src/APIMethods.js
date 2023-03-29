// const getAccountsAPI = async () => {
//   // console.log(process.env);
//   const response = await fetch('/api/v2/accounts', {
//     method: "GET",
//     headers: {
//       Authorization: `Bearer ${process.env.REACT_APP_STARLING_ACCESS_TOKEN}`,
//     },
//   });
//   const accountsData = await response.json();

//   const accountUid = accountsData.accounts[0].accountUid;
//   // console.log(accountUid)
//   return accountUid;
// };

// export default getAccountsAPI