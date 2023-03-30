import { useEffect, useState } from "react"
import { getAccountsDetails }from "./Methods/APIMethods"
import './App.css'
import DisplayTransaction from "./components/Transaction"
import "react-datepicker/dist/react-datepicker.css"
import { readableDateFormat, addSevenDays } from "./Methods/DateMethod";
import DisplayAccountBalance from "./components/AccountBalance";
import DisplaySavingsBalance from "./components/SavingsBalance";
import { centsToDollars } from "./Methods/DollarToCentsMethod";
import PickDate from "./components/PickDate";
import { calculateButton, transferButton } from "./Methods/ButtonMethods";
import loadBalances from "./Methods/LoadBalances";
import makeSavingsGoal from "./Methods/MakeSavingsGoal"

const App = () => {

  const [accountSpecs, setAccountSpecs] = useState([])
  const [accountDetails, setAccountDetails] = useState([]);
  const [balance, setBalance] = useState({
    amount: {currency: 'placeholder', minorUnits: 'placeholder'},
    clearedBalance: {currency: 'placeholder', minorUnits: 'placeholder'},
    pendingTransactions: {currency: 'placeholder', minorUnits: 'placeholder'}
  });
  const [savingsGoal,setSavingsGoal] = useState({
    name: 'N/A',
    target: {currency: 'N/A', minorUnits: 'N/A'},
    totalSaved: {currency: 'N/A', minorUnits: 'N/A'}
  });
  const [feed,setFeed] = useState([]);
  const [sum, setSum] = useState(0);
  const [startDate, setStartDate] = useState(new Date("2023-03-27T12:34:56.000Z"));

  useEffect(() => {
    getAccountsDetails(setAccountDetails);
    loadBalances(setBalance, setAccountSpecs, setSavingsGoal);
  }, []);

  return (
    <div className="App">
      
      <div className="header">
        <h1>Starling Bank Round-up Feature</h1>
        <div>
          <h2> Welcome { accountDetails.title } { accountDetails.firstName } { accountDetails.lastName } </h2>
        </div>
      </div>
      
      
      <div className="calculator">
        <div>
          <div className="date-inputs">
            <div>{ PickDate(startDate, setStartDate) }</div>
            <div><h3>to</h3></div>
            <div><p className="end-date">{ readableDateFormat(addSevenDays(startDate))}</p></div>
          </div>

          <div>
            <button className="button" onClick={ () => {calculateButton(setFeed, startDate, setSum, setBalance, setAccountSpecs, setSavingsGoal)} }>Calculate</button>
          </div>
        </div>

        <div className="sumbox">
          <div className="total">Rounded-up Total</div>
          <div className="sum">
            <div>{ sum.toFixed(2) } GBP</div>
          </div>

          <div>
            <button className="button" onClick={ () => {transferButton(accountSpecs, savingsGoal, sum, setSum, setBalance, setAccountSpecs, setSavingsGoal)} }>Add to Savings</button>
          </div>
        </div>
      </div>
      

      <div className="current-balance">
        <div className="title">Current Account</div>

        <DisplayAccountBalance 
          name = { accountSpecs.name } 
          accountType = { accountSpecs.accountType } 
          minorUnits = {centsToDollars(balance.amount.minorUnits)} 
          currency = {balance.amount.currency}
        />

      </div>

      <div className="savings-balance">
        <div className="title">Savings</div>

          <DisplaySavingsBalance 
            name = { savingsGoal.name } 
            targetMinorUnits = { centsToDollars(savingsGoal.target.minorUnits) }
            targetCurrency = { savingsGoal.target.currency }
            totalSavedMinorUnits = { centsToDollars(savingsGoal.totalSaved.minorUnits) }
            totalSavedCurrency = { savingsGoal.totalSaved.currency }
          />
      </div>

      {/* UNCOMMENT THIS BUTTON TO CREATE A SAVINGS GOAL */}
      {/* <button onClick={makeSavingsGoal}>Make Savings Goal</button> */}
      
      <div className="transactions">
        <div className="title">Transactions</div>
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
