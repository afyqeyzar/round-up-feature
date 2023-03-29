import { assertTSExternalModuleReference } from "@babel/types";
import { useEffect, useState } from "react"
import { findRenderedDOMComponentWithClass } from "react-dom/test-utils";
// import getAccountsAPI from "./APIMethods"
import moment from 'moment';
import './App.css'
import sumDifferences from "./RoundUpMethod";

function centsToDollars(cents) {
  const dollars = (cents / 100).toFixed(2);
  return dollars;
}

const App = () => {

  // const STATIC_ACCOUNT_UID = 'b47101a3-dce8-48ea-89c5-ccb3ad486caf'
  // const STATIC_CATEGORY_UID = '17b963c6-2665-4599-868f-28e1aa3425a7'

  const [accountSpecs, setAccountSpecs] = useState([])
  const [identifiers, setIdentifiers] = useState([])
  const [balance, setBalance] = useState({
    amount: {currency: 'placeholder', minorUnits: 'placeholder'},
    clearedBalance: {currency: 'placeholder', minorUnits: 'placeholder'},
    pendingTransactions: {currency: 'placeholder', minorUnits: 'placeholder'}
  })
  const [feed,setFeed] = useState([]);
  const [feedAmount,setFeedAmount] = useState([]);


  // FETCHING API DATA

  const getAccountsAPI = async () => {
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

  const getAccountsIdentifiersAPI = async () => {
    const accountSpecs = await getAccountsAPI();
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

  const getAccountsBalanceAPI = async () => {
    const accountSpecs = await getAccountsAPI();
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

  const getAccountsFeedAPI = async () => {
    const accountSpecs = await getAccountsAPI();
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

  const getSum = async () => {
    const accountsFeedData = await getAccountsFeedAPI();
    const sum = sumDifferences(accountsFeedData);
    // console.log(accountsFeedData)
    // console.log(sum)
  }

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



  useEffect(() => {
    getAccountsIdentifiersAPI();
    getAccountsBalanceAPI();
    // getAccountsFeedAPI();
    getSum();

    // console.log(feed);
  }, []);

  return (
    <div className="App">
      <h1>Account Uid: { accountSpecs.accountUid }</h1>

      <div>
        <h1>Account Info</h1>
        <h2>Account Number: { identifiers.accountIdentifier }</h2>
        <h2>Sort Code: { identifiers.bankIdentifier }</h2>
        <h2>IBAN: { identifiers.iban }</h2>
        <h2>BIC: { identifiers.bic }</h2>
      </div>

      <div> 
        <h1>Balances</h1>
        <h2>Available Balance: { centsToDollars(balance.amount.minorUnits)} {balance.amount.currency}</h2>
        <h2>Cleared Balance: { centsToDollars(balance.clearedBalance.minorUnits)} {balance.clearedBalance.currency}</h2>
        <h2>Pending Balance: { centsToDollars(balance.pendingTransactions.minorUnits)} {balance.pendingTransactions.currency}</h2>
      </div>

    </div>
  );
}

export default App;
