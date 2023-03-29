import { assertTSExternalModuleReference } from "@babel/types";
import { useEffect, useState } from "react"
import { findRenderedDOMComponentWithClass } from "react-dom/test-utils";
import getAccountsAPI from "./APIMethods"

const App = () => {

  // const STATIC_ACCOUNT_UID = 'b47101a3-dce8-48ea-89c5-ccb3ad486caf'

  const [accountUid, setAccountUid] = useState([])

  const getAccountsAPI = async () => {
    const response = await fetch('/api/v2/accounts', {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_STARLING_ACCESS_TOKEN}`,
      },
    });
    const accountsData = await response.json();
    

    const accountUid = accountsData.accounts[0].accountUid;
    setAccountUid(accountUid);
    return accountUid; 
  };

  const getAccountsIdentifiersAPI = async () => {
    const accountUid = await getAccountsAPI();
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


  useEffect(() => {
    // getAccountsAPI();
    getAccountsBalanceAPI();
  }, []);

  return (
    <div className="App">
      <h1>{ accountUid }</h1>
    </div>
  );
}

export default App;
