import { assertTSExternalModuleReference } from "@babel/types";
import { useEffect, useState } from "react"
import { findRenderedDOMComponentWithClass } from "react-dom/test-utils";
import { getAccountsBalanceAPI, getAccountsDetails, getAccountsFeedRangedAPI, getSavingsGoal }from "./APIMethods"
import moment from 'moment';
import './App.css'
import sumDifferences from "./RoundUpMethod";
import DisplayTransaction from "./Transaction"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import { apiDateFormat, readableDateFormat, addSevenDays } from "./DateMethod";

function centsToDollars(cents) {
  const dollars = (cents / 100).toFixed(2);
  return dollars;
}

const App = () => {

  // const STATIC_ACCOUNT_UID = 'b47101a3-dce8-48ea-89c5-ccb3ad486caf'
  // const STATIC_CATEGORY_UID = '17b963c6-2665-4599-868f-28e1aa3425a7'
  const [accountSpecs, setAccountSpecs] = useState([])
  const [accountDetails, setAccountDetails] = useState([]);
  const [balance, setBalance] = useState({
    amount: {currency: 'placeholder', minorUnits: 'placeholder'},
    clearedBalance: {currency: 'placeholder', minorUnits: 'placeholder'},
    pendingTransactions: {currency: 'placeholder', minorUnits: 'placeholder'}
  });
  const [savingsGoal,setSavingsGoal] = useState({
    target: {currency: 'placeholder', minorUnits: 'placeholder'},
    totalSaved: {currency: 'placeholder', minorUnits: 'placeholder'}
  });
  const [feed,setFeed] = useState([]);
  const [sum, setSum] = useState(0);
  const [startDate, setStartDate] = useState(new Date("2023-03-27T12:34:56.000Z"));

  const getSum = async (setFeed, startDate, endDate) => {
    const accountsFeedData = await getAccountsFeedRangedAPI(setFeed, startDate, endDate);
    const sum = sumDifferences(accountsFeedData);
    setSum(sum);
    // console.log(feed[0])
    // console.log(sum)
  }

  const PickDate = () => {
    // console.log(formatDate(startDate));
    return (
      <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
    );
  };

  const loadPage = async () => {
    getAccountsBalanceAPI(setBalance);
    getAccountsDetails(setAccountDetails);
    getSavingsGoal(setAccountSpecs, setSavingsGoal);
  }

  useEffect(() => {
    loadPage()
  }, []);

  return (
    <div className="App">
      
      <div className="header">
        <h1>Starling Bank Round-up Feature</h1>
      </div>
      
      <div className="second-header">
        <div>
          <h2> Welcome { accountDetails.title } { accountDetails.firstName } { accountDetails.lastName } </h2>
        </div>
        <div className="calculator">
          <div>
            <div className="date-inputs">
              <div>{ PickDate() }</div>
              <div>to</div>
              <div>{ readableDateFormat(addSevenDays(startDate))}</div>
            </div>

            <div>
              <button onClick={() => {getSum(setFeed, apiDateFormat(startDate), apiDateFormat(addSevenDays(startDate)))}}>Calculate</button>
            </div>
          </div>
          <div className="sumbox">
            <div className="sum">
              <div>Rounded-up Total</div> 
              <div>{ sum.toFixed(2) } GBP</div>
            </div>
            <div>
              <button>Add to Savings</button>
            </div>
          </div>
        </div>
      </div>

      <div className="current-balance">
        <div><h2>Current Account</h2></div>
        <div>Name: { accountSpecs.name}</div>
        <div>Type: { accountSpecs.accountType}</div>
        <div>Total Amount: { centsToDollars(balance.amount.minorUnits)} {balance.amount.currency}</div>

      </div>

      <div className="savings-balance">
        <div><h2>Savings</h2></div>
        <div>Name: { savingsGoal.name}</div>
        <div>Target: { centsToDollars(savingsGoal.target.minorUnits)} { savingsGoal.target.currency}</div>
        <div>Total Saved: { centsToDollars(savingsGoal.totalSaved.minorUnits)} { savingsGoal.target.currency}</div>
      </div>
      
      <div className="transactions">
        <div>Transactions</div>
        <div>
          {feed.map((feed) => {
            // console.log(typeof feed.feedItemUid)
            return <DisplayTransaction counterPartyName = {feed.counterPartyName} direction = {feed.direction} status = {feed.status} amount = {centsToDollars(feed.amount.minorUnits)}/>
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
