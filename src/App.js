import { assertTSExternalModuleReference } from "@babel/types";
import { useEffect, useState } from "react"
import { findRenderedDOMComponentWithClass } from "react-dom/test-utils";
import { getAccountsBalanceAPI, getAccountsIdentifiersAPI, getAccountsFeedAPI }from "./APIMethods"
import moment from 'moment';
import './App.css'
import sumDifferences from "./RoundUpMethod";
import DisplayTransaction from "./Transaction"

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
  const [sum, setSum] = useState(0);

  const getSum = async (setAccountSpecs, setFeed, setFeedAmount) => {
    const accountsFeedData = await getAccountsFeedAPI(setAccountSpecs, setFeed, setFeedAmount);
    const sum = sumDifferences(accountsFeedData);
    setSum(sum)
    // console.log(feed[0])
    // console.log(sum)
  }

  useEffect(() => {
    getAccountsIdentifiersAPI(setAccountSpecs,setIdentifiers);
    getAccountsBalanceAPI(setAccountSpecs,setBalance);
    // getAccountsFeedAPI();
    getSum(setAccountSpecs, setFeed, setFeedAmount);

    // console.log(feed);
  }, []);

  return (
    <div className="App">
      
      <div className="header">
        <h1>Starling Bank Round-up Feature</h1>
      </div>
      
      <div className="second-header">
        <div>
          Welcome (name here)
        </div>
        <div className="calculator">
          <div>
            <div className="date-inputs">
              <div>Date 1 input</div>
              <div>to</div>
              <div>Date 2 input</div>
            </div>
            <div>
              <button>Calculate</button>
            </div>
          </div>
          <div className="sum">
            <div>Rounded-up Total</div> 
            <div>{ sum.toFixed(2) } GBP</div>
          </div>
          <div>
            <button>Add to Savings</button>
          </div>
        </div>
      </div>

      <div className="current-balance">
        <div>Current Account</div>
        <div>{ centsToDollars(balance.amount.minorUnits)} {balance.amount.currency}</div>

      </div>

      <div className="savings-balance">
        <div>Savings</div>
        <div>amount goes here</div>
      </div>
      
      <div className="transactions">
        <div>Transactions</div>
        <div>
          {/* <DisplayTransaction Uid = '69'/> */}
          {feed.map((feed) => {
            // console.log(typeof feed.feedItemUid)
            return <DisplayTransaction Uid = {feed.feedItemUid} />
          })}
        </div>
      </div>
      
      {/* <h1>Account Uid: { accountSpecs.accountUid }</h1>

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
      </div> */}

    </div>
  );
}

export default App;
