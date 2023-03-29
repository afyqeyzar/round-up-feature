import { assertTSExternalModuleReference } from "@babel/types";
import { useEffect, useState } from "react"
import { findRenderedDOMComponentWithClass } from "react-dom/test-utils";
import getAccountsAPI from "./APIMethods"
import moment from 'moment';
import './App.css'

const App = () => {

  // const STATIC_ACCOUNT_UID = 'b47101a3-dce8-48ea-89c5-ccb3ad486caf'
  const STATIC_CATEGORY_UID = '17b963c6-2665-4599-868f-28e1aa3425a7'

  const [accountUid, setAccountUid] = useState([])

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

    console.log(accountsIdentifiersData)
  };

  const getAccountsBalanceAPI = async () => {
    const accountUid = await getAccountsAPI();
    const response = await fetch(`/api/v2/accounts/${accountUid}/balance`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_STARLING_ACCESS_TOKEN}`,
      },
    });
    const accountsBalanceData = await response.json();

    console.log(accountsBalanceData)
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
    // getAccountsFeedAPI();
    // console.log(moment().format());
  }, []);

  return (
    <div className="App">
      <h1>Account Uid: { accountUid }</h1>
      <h2>test</h2>
    </div>
  );
}

export default App;
