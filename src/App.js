import { useEffect } from "react"
// import { get } from 'https';
// import { react } from '@babel/types';

const ACCESS_TOKEN = 'eyJhbGciOiJQUzI1NiIsInppcCI6IkdaSVAifQ.H4sIAAAAAAAA_31Uy5KbMBD8lS3Oqy0wjwVuueUH8gHj0chWWUiUJLxxpfLvEUgY43Xl2N3z6NEM_Mmkc1mfwSgZp8F8OA9WSX06gr58oBmy98xNxxDR1WXFi7xj8CkqVhWYM6BDw7Bq6qI-5G1OGILp95j1RdPmRVl8Nt17JsFHIq_qciYA0Uza_zSKk_0leah96ASnAwLrulCxEkXO2jovmaiaoqtzzHlTh9reXEjHjKoQFRR5CP4sS1ZVgKxtsWO8rnjLy0o01IaMMNYPRHIuZnWlaPjx0DKEIqTmZc26ogZGbdkWbXEQods8MJqR5keJThkq44j3loC_rdx5sc80DPRS8LfxSZCctJdCkt3zSjq_YxLg3AbjPXHp7yAq3gOeB7pHbvjLSk9vMPmzsdKFNTKpubxKPoGKwUdQoDFZQ7CcodHeGhUbzUzSjBbSDuCl0cwIJibN3V1y9-4riK1xct4M64g0gEyFFQUj-tTDOKrbHS1RA2gOnnpOikKJFSbNXsjPg4yWBFkK3t3_pGgjaqMCpPACnk52meMx8buYUsniGdbpBvIQ3ECPAS5qwstQI9yIVimCNEQEWxCTA5zSTIkIna1e1xLjH2RvQTvAzXWg2XFSl37dLm3U5iDizUTEa4H5RsK9DdJvNZXBYOKhwkIwMx_JM5uyrBFSrSPFGXfUEmUJSY5-B9xeig--LM-CSqKDa9ipYyez2dpxabgd9y0zvl8o_KrEJr6otYmxKJ6JT4o4S--XaPI-zDuNCY6wflPhB7rcNjOWP7Tfs2vfPfsin5kvfec9LQtEd32mRi4SNR0d2vC4892sXR65JerxuJb9PV9b9vcf7ca26RkGAAA.Zwnd0QF-RZxDW_J9X4kI6lqf_DZK2q1TCW_ieGuVUdW4XdJ1PWUz1w_e3wLn02o5EPwUQUvQdxCocBsYUzRRJ0UK2yKeo97bZfn9XECebgIEFDRn0K81bIut7U8E8P4Cws9Y3-HkYdvAFMtA1VQFrIEq8N54UMmMyYfy0cDfcPEeOZuNTH-tuLz6l2H6OaaWV94a9xEEbGN7J07NcjdaXGeOexiXeqkQH2uNdWVKmZcNQcV3ZNIy5Be7q84K5WXS_b3lRdjmhwp9klBtShJW2yosfMmz7oGtsfLZY0YzOlTUavl5ct93zeNKehpjEJaLlXSYxOR2UbyRqRh8JPskCIAvmVZog1Lls-FCNSKgZHyL4mleZjsngYSPm9QQnz5941kNvKoOiadPGM97rExz0yKY9LBNulC_Jc4FKHcOGQNMZRyiHQ4d-_dZSMm5CGBG-siImkMtadjW9IMyMfFycWiQ_DDvzbttCT63O3xrC0EV7R58BXEenGAOy3RBQNCqva32JSps_hGn-d_ZHv3dx68y18jDOn38BxWHGUNHvxYviHHTnfboRZ3JiPNZFOalpOCdSB1KR8x-0IbxUDXnAjJ5094kJyoBwd-dxEKnyVsjnamzAo9cWYSittkB4UhoYRUynGdG5IBv-jPazwrVd-OnmcsENUbWPM7bbKvsKGk';
const bearer = 'Bearer' + ACCESS_TOKEN;

function App() {

  const getAPI = async () => {
    const response = await fetch('https://api-sandbox.starlingbank.com/api/v2/accounts', {
      method: "GET",
      mode: 'no-cors',
      withCredentials: true,
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json",
        'Authorization': bearer
      }
      });
    const data = await response.json();

    console.log('test');
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
