import { assertTSExternalModuleReference } from "@babel/types";
import { useEffect, useState } from "react"
import { findRenderedDOMComponentWithClass } from "react-dom/test-utils";
import getAccountsAPI from "./APIMethods"
import moment from 'moment';
import './App.css'

function centsToDollars(cents) {
  const dollars = (cents / 100).toFixed(2);
  return dollars;
}

const App = () => {

  // const STATIC_ACCOUNT_UID = 'b47101a3-dce8-48ea-89c5-ccb3ad486caf'
  const STATIC_CATEGORY_UID = '17b963c6-2665-4599-868f-28e1aa3425a7'

  const [accountUid, setAccountUid] = useState([])
  const [identifiers, setIdentifiers] = useState([])
  const [balance, setBalance] = useState({
    amount: {currency: 'placeholder', minorUnits: 'placeholder'},
    clearedBalance: {currency: 'placeholder', minorUnits: 'placeholder'},
    pendingTransactions: {currency: 'placeholder', minorUnits: 'placeholder'}
  })

  // GETTING DATES
  const moment = require('moment-timezone');
  const now = moment.tz('Europe/London'); // get the current time in London time zone
  const formattedDate = now.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');

  // FETCHING API DATA
  const getAccountsIdentifiersAPI = async () => {
    const accountUid = await getAccountsAPI(setAccountUid);
    const response = await fetch(`/api/v2/accounts/${accountUid}/identifiers`, {
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
    const accountUid = await getAccountsAPI(setAccountUid);
    const response = await fetch(`/api/v2/accounts/${accountUid}/balance`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_STARLING_ACCESS_TOKEN}`,
      },
    });
    const accountsBalanceData = await response.json();

    setBalance(accountsBalanceData);
    console.log(accountsBalanceData.clearedBalance)
  };

  const getAccountsFeedAPI = async () => {
    const accountUid = await getAccountsAPI();
    const response = await fetch(`/api/v2/accounts/${accountUid}/category/${STATIC_CATEGORY_UID}?changesSince=${formattedDate}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_STARLING_ACCESS_TOKEN}`,
      },
    });
    const accountsFeedData = await response.json();

    console.log(accountsFeedData)
  };


  useEffect(() => {
    getAccountsIdentifiersAPI();
    getAccountsBalanceAPI();
    // getAccountsFeedAPI();
    // console.log(moment().format());
  }, []);

  return (
    <div className="App">
      <h1>Account Uid: { accountUid }</h1>

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
