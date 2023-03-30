import { assertTSExternalModuleReference } from "@babel/types";
import { useEffect, useState } from "react"
import { findRenderedDOMComponentWithClass } from "react-dom/test-utils";
import { getAccountsBalanceAPI, getAccountsIdentifiersAPI, getAccountsFeedAPI, getAccountsDetails, getAccountsFeedRangedAPI }from "./APIMethods"
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
  const [accountDetails, setAccountDetails] = useState([])
  const [identifiers, setIdentifiers] = useState([])
  const [balance, setBalance] = useState({
    amount: {currency: 'placeholder', minorUnits: 'placeholder'},
    clearedBalance: {currency: 'placeholder', minorUnits: 'placeholder'},
    pendingTransactions: {currency: 'placeholder', minorUnits: 'placeholder'}
  })
  const [feed,setFeed] = useState([]);
  const [feedAmount,setFeedAmount] = useState([]);
  const [sum, setSum] = useState(0);
  const [startDate, setStartDate] = useState(new Date("2023-01-01T12:34:56.000Z"));
  

  const getSum = async (setAccountSpecs, setFeed, setFeedAmount, startDate, endDate) => {
    // const accountsFeedData = await getAccountsFeedAPI(setAccountSpecs, setFeed, setFeedAmount, startDate);
    const accountsFeedData = await getAccountsFeedRangedAPI(setAccountSpecs, setFeed, setFeedAmount, startDate, endDate);
    const sum = sumDifferences(accountsFeedData);
    setSum(sum)
    // console.log(feed[0])
    // console.log(sum)
  }

  const PickDate = () => {
    // console.log(formatDate(startDate));
    return (
      <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
    );
  };

  useEffect(() => {
    getAccountsIdentifiersAPI(setAccountSpecs,setIdentifiers);
    getAccountsBalanceAPI(setAccountSpecs,setBalance);
    getAccountsDetails(setAccountDetails);
    // getAccountsFeedAPI();
    // console.log(formatDate(startDate))
    // getSum(setAccountSpecs, setFeed, setFeedAmount, formatDate(startDate));
    // console.log(startDate)
    // console.log(feed);
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
              <button onClick={() => {getSum(setAccountSpecs, setFeed, setFeedAmount, apiDateFormat(startDate), apiDateFormat(addSevenDays(startDate)))}}>Calculate</button>
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
            return <DisplayTransaction counterPartyName = {feed.counterPartyName} direction = {feed.direction} status = {feed.status} amount = {centsToDollars(feed.amount.minorUnits)}/>
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
