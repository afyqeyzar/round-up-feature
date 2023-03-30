import { getAccountsBalanceAPI, getSavingsGoal } from "./APIMethods";

const loadBalances = (setBalance, setAccountSpecs, setSavingsGoal) => {
  getAccountsBalanceAPI(setBalance);
  getSavingsGoal(setAccountSpecs, setSavingsGoal);
  // console.log(savingsGoal)
}

export default loadBalances