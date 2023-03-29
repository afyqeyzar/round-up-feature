import { useEffect, useState } from "react"
import { findRenderedDOMComponentWithClass } from "react-dom/test-utils";
import getAccountsAPI from "./APIMethods"

const App = () => {

  const [searchTerm, setSearchTerm] = useState('first')

  const getAccountsAPI = async () => {
    const response = await fetch('/api/v2/accounts', {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_STARLING_ACCESS_TOKEN}`,
      },
    });
    const accountsData = await response.json();

    const accountUid = accountsData.accounts[0].accountUid;
    return accountUid 
  };


  useEffect(() => {
    const b = getAccountsAPI();
    console.log(b);
  }, []);

  return (
    <div className="App">
      <h1>test</h1>
    </div>
  );
}

export default App;
