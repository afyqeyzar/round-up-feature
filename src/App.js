import { useEffect } from "react"
// import { get } from 'https';
// import { react } from '@babel/types';

const App = () => {

  const getAccountsAPI = async () => {
    // console.log(process.env);
    const response = await fetch('/api/v2/accounts', {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_STARLING_ACCESS_TOKEN}`,
      },
    });
    const accountsData = await response.json();

    console.log(accountsData.accounts[0])
  };


  useEffect(() => {
    getAccountsAPI();
  }, []);

  return (
    <div className="App">
      test
    </div>
  );
}

export default App;
