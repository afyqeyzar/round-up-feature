import { useEffect, useState } from "react"
import { getAccountsBalanceAPI, getAccountsDetails, getAccountsFeedRangedAPI, getSavingsGoal, getAccountsAPI }from "./Methods/APIMethods"
import './App.css'
import sumDifferences from "./Methods/RoundUpMethod";
import DisplayTransaction from "./components/Transaction"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import { apiDateFormat, readableDateFormat, addSevenDays } from "./Methods/DateMethod";
import {v4 as uuidv4} from 'uuid';
import DisplayAccountBalance from "./components/AccountBalance";
import DisplaySavingsBalance from "./components/SavingsBalance";

function centsToDollars(cents) {
  const dollars = (cents / 100).toFixed(2);
  return dollars;
}

function dollarsToCents(dollars) {
  const cents = Number.parseFloat(dollars) * 100;
  return Math.round(cents);
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
      <DatePicker 
        dateFormat="dd/MM/yyyy"
        selected={startDate} 
        onChange={(date) => setStartDate(date)} 
      />
    );
  };

  const savingGoal = {
    "name": "Trip to Paris",
    "currency": "GBP",
    "target": {
      "currency": "GBP",
      "minorUnits": 123456
    },
    "base64EncodedPhoto": "string"
  }

  const makeSavingsGoal = async () => {
    const accountSpecs = await getAccountsAPI();
    const response = await fetch(`/api/v2/account/${accountSpecs.accountUid}/savings-goals`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_STARLING_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(savingGoal)
    });
    const accountsDetailsData = await response.json();
    
    console.log(accountsDetailsData)
    
  }

  const loadBalances = async () => {
    getAccountsBalanceAPI(setBalance);
    getSavingsGoal(setAccountSpecs, setSavingsGoal);
  }

  const calculateButton = () => {
    getSum(setFeed, apiDateFormat(startDate), apiDateFormat(addSevenDays(startDate)))
    loadBalances()
    console.log(typeof accountSpecs)
  }

  const transferButton = () => {
    putSavingsGoal(dollarsToCents(sum))
    setSum(0)
    loadBalances()
  }

  
  const getTransferAmount = (amount) => {
    return {
      "amount": {
        "currency": "GBP",
        "minorUnits": amount
      }
    }
  }
  
  const putSavingsGoal = async (amount) => {
    const transferUid = uuidv4()
    const response = await fetch(`/api/v2/account/${accountSpecs.accountUid}/savings-goals/${savingsGoal.savingsGoalUid}/add-money/${transferUid}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_STARLING_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(getTransferAmount(amount))
    });
    const accountsDetailsData = await response.json();
    
    // console.log(accountsDetailsData)
    
  }


  useEffect(() => {
    getAccountsDetails(setAccountDetails);
    loadBalances();
    // makeSavingsGoal()
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
              <button onClick={ calculateButton }>Calculate</button>
            </div>
          </div>
          <div className="sumbox">
            <div className="sum">
              <div>Rounded-up Total</div> 
              <div>{ sum.toFixed(2) } GBP</div>
            </div>
            <div>
              <button onClick={ transferButton }>Add to Savings</button>
            </div>
          </div>
        </div>
      </div>

      <div className="current-balance">
        <div><h2>Current Account</h2></div>

        <DisplayAccountBalance 
          name = { accountSpecs.name } 
          accountType = { accountSpecs.accountType } 
          minorUnits = {centsToDollars(balance.amount.minorUnits)} 
          currency = {balance.amount.currency}
        />

      </div>

      <div className="savings-balance">
        <div><h2>Savings</h2></div>

        <DisplaySavingsBalance 
          name = { savingsGoal.name } 
          targetMinorUnits = { centsToDollars(savingsGoal.target.minorUnits) }
          targetCurrency = { savingsGoal.target.currency }
          totalSavedMinorUnits = { centsToDollars(savingsGoal.totalSaved.minorUnits) }
          totalSavedCurrency = { savingsGoal.totalSaved.currency }
        />
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
