import { useEffect, useState } from "react";
import {
  getAccountsDetails,
  getSavingsGoal,
  getAccountsBalanceAPI,
} from "./utils/APIMethods";
import "./App.css";
import DisplayTransaction from "./components/Transaction";
import "react-datepicker/dist/react-datepicker.css";
import { readableDateFormat, addSevenDays } from "./utils/DateMethod";
import DisplayAccountBalance from "./components/AccountBalance";
import DisplaySavingsBalance from "./components/SavingsBalance";
import { centsToDollars, dollarsToCents } from "./utils/DollarToCentsMethod";
import PickDate from "./components/PickDate";
import makeSavingsGoal from "./utils/MakeSavingsGoal";
import { getSum } from "./utils/RoundUpMethod";
import putSavingsGoal from "./utils/TransferToSavings";
import { apiDateFormat } from "./utils/DateMethod";
import refreshPage from "./utils/RefreshMethod";

const App = () => {
  const [haveSavingsGoal, setHaveSavingsGoal] = useState(true);
  const [accountSpecs, setAccountSpecs] = useState([]);
  const [accountDetails, setAccountDetails] = useState([]);
  const [balance, setBalance] = useState({
    amount: { currency: "placeholder", minorUnits: "placeholder" },
  });
  const [savingsGoal, setSavingsGoal] = useState({
    name: "N/A",
    target: { currency: "N/A", minorUnits: "N/A" },
    totalSaved: { currency: "N/A", minorUnits: "N/A" },
  });
  const [feed, setFeed] = useState([]);
  const [sum, setSum] = useState(0);
  const [startDate, setStartDate] = useState(
    new Date("2023-03-27T12:34:56.000Z")
  );

  const makeSavingsGoalButton = async () => {
    await makeSavingsGoal();
    refreshPage();
  };

  const loadBalances = () => {
    getAccountsBalanceAPI(setBalance);
    getSavingsGoal(setAccountSpecs, setSavingsGoal, setHaveSavingsGoal);
    // console.log(savingsGoal)
  };

  const calculateButton = (setFeed, setSum) => {
    console.log(startDate);

    // First
    getSum(
      setFeed,
      apiDateFormat(startDate),
      apiDateFormat(addSevenDays(startDate)),
      setSum
    );

    // Then
    loadBalances();
    // makeSavingsGoal()
  };

  const transferButton = (accountSpecs, savingsGoal, sum, setSum) => {
    putSavingsGoal(accountSpecs, savingsGoal, dollarsToCents(sum));
    setSum(0);
    loadBalances();
  };

  useEffect(() => {
    getAccountsDetails(setAccountDetails);
    loadBalances();
    console.log(haveSavingsGoal);
  }, []);

  // const { minorUnits = "Placeholder", currency = "Placeholder" } =
  //   balance?.amount;

  return (
    <div className="App">
      <div className="header">
        <h1>Starling Bank Round-up Feature</h1>
        <div>
          <h2>
            {" "}
            Welcome {accountDetails.title} {accountDetails.firstName}{" "}
            {accountDetails.lastName}{" "}
          </h2>
        </div>
      </div>

      {haveSavingsGoal ? (
        <>
          <button className="button make-goal" onClick={makeSavingsGoalButton}>
            Make Savings Goal
          </button>
        </>
      ) : (
        <>
          <div className="calculator">
            <div>
              <div className="date-inputs">
                <div>{PickDate(startDate, setStartDate)}</div>
                <div>
                  <h3>to</h3>
                </div>
                <div>
                  <p className="end-date">
                    {readableDateFormat(addSevenDays(startDate))}
                  </p>
                </div>
              </div>

              <div>
                <button
                  className="button"
                  onClick={() => {
                    calculateButton(setFeed, setSum);
                  }}
                >
                  Calculate
                </button>
              </div>
            </div>

            <div className="sumbox">
              <div className="total">Rounded-up Total</div>
              <div className="sum">
                <div>{sum.toFixed(2)} GBP</div>
              </div>

              <div>
                <button
                  className="button"
                  onClick={() => {
                    transferButton(accountSpecs, savingsGoal, sum, setSum);
                  }}
                >
                  Add to Savings
                </button>
              </div>
            </div>
          </div>

          <div className="current-balance">
            <div className="title">Current Account</div>

            <DisplayAccountBalance
              name={accountSpecs.name}
              accountType={accountSpecs.accountType}
              minorUnits={
                centsToDollars(balance?.amount?.minorUnits) || "Placeholder"
              }
              currency={balance?.amount?.currency}
            />
          </div>

          <div className="savings-balance">
            <div className="title">Savings</div>

            <DisplaySavingsBalance
              name={savingsGoal.name}
              targetMinorUnits={centsToDollars(savingsGoal?.target?.minorUnits)}
              targetCurrency={savingsGoal?.target?.currency || "Placeholder"}
              totalSavedMinorUnits={centsToDollars(
                savingsGoal.totalSaved.minorUnits
              )}
              totalSavedCurrency={savingsGoal.totalSaved.currency}
            />
          </div>

          <div className="transactions">
            <div className="title">Transactions</div>
            <div>
              {feed.map((feed) => {
                // console.log(typeof feed.feedItemUid)
                return (
                  <DisplayTransaction
                    counterPartyName={feed.counterPartyName}
                    direction={feed.direction}
                    status={feed.status}
                    amount={centsToDollars(feed.amount.minorUnits)}
                  />
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
