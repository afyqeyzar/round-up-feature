import { useEffect } from "react"
// import { get } from 'https';
// import { react } from '@babel/types';

const App = () => {

  const getAPI = async () => {
    console.log(process.env);
    const response = await fetch('/api/v2/accounts', {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_STARLING_ACCESS_TOKEN}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
        // 'User-Agent': 'Nor Afyq Eyzar'
      },
      mode: 'no-cors',
      withCredentials: true,
      credentials: 'include'
      });
    const data = await response.json();

    console.log(data)

    
  };

  useEffect(() => {
    getAPI();
  }, []);

  return (
    <div className="App">
      test
    </div>
  );
}

export default App;
