import loadBalances from "./LoadBalances"
import { apiDateFormat, addSevenDays } from "./DateMethod"
import { dollarsToCents } from "./DollarToCentsMethod"
import { getSum } from "./RoundUpMethod"
import putSavingsGoal from "./TransferToSavings"

const calculateButton = (setFeed, startDate, setSum, setBalance, setAccountSpecs, setSavingsGoal) => {
  console.log(startDate)
  getSum(setFeed, apiDateFormat(startDate), apiDateFormat(addSevenDays(startDate)), setSum)
  loadBalances(setBalance, setAccountSpecs, setSavingsGoal)
  // makeSavingsGoal()
}

const transferButton = (accountSpecs, savingsGoal, sum, setSum, setBalance, setAccountSpecs, setSavingsGoal) => {
  putSavingsGoal(accountSpecs, savingsGoal, dollarsToCents(sum))
  setSum(0)
  loadBalances(setBalance, setAccountSpecs, setSavingsGoal)
}

export { calculateButton, transferButton }