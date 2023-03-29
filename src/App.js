import { useEffect } from "react"
// import { get } from 'https';
// import { react } from '@babel/types';

const ACCESS_TOKEN = 'eyJhbGciOiJQUzI1NiIsInppcCI6IkdaSVAifQ.H4sIAAAAAAAA_31Uy5KbMBD8lS3Oqy3xXOCWW34gHzBII1tlIVGS8MaVyr9HIGGM15Vjd8-jRzPwJ5POZX0GkyQcR_PhPFgl9WkAfflgZszeMzcPIaKry4rntCPwKSpS5YwSwKIhrGrqvC5oS5GFYPw9ZX3etDQv6yJv3jMJPhK0atuFAMbMrP1PozjaX5KH2kUnOBYMSNeFipXIKWlrWhJRNXlXU0Z5U4fa3lxQx4yqKHhVi5YUnwMnFW0G0nZFRZDTjtG6_BxoGTLCWD8YQ-diVleKhg9FSxjkoQ8ta9LlNRBsyzZv80KEbsvAzEy4PEp0SpgyDnlvEfjbxp1X-0TDiC8Ff5ueBMlReykk2iOvpPMHJgHObTDeI5f-DqLiPbDziPfIHX9Z6fENZn82VrqwRiI1l1fJZ1AxeAAFmiVrDCwnzGhvjYqNFiZpRgtpR_DSaGIEEbPm7i65e_cNxNZsdt6M24g4gkyFFQYj-tTDNKnbHa1RI2gOHnuOCkOJDSbNXtAvg0wWBVoM3t3_pGgjapMChuEFPJ7sOsdj4ncxpaJlZ9imG9FDcAM9C3BVE16HmuCGuEkRpCEi2IOIHOGUZkpE6Gz1tpYY_yB7C9oB210HmgyzuvTbdnGndgcR7yYi3gosNxLubZR-r6kMCyYeKqwEMcuRPLMpyxoh1TZSnPFArVEWGcrJH4A7SvHB1-VZUEl0cA07deRkdlsHLg134L5lxvcLhV-V2MUXtXYxFmVn5LNCTtL7JRq9D_POU4ITbN9U-IGut02M5Q_tj-zW98i-yCfmS995j-sCmbs-UxMXiZoHx2x43OVuti6P3Br1eFzr_p6vLfv7D75ixkQZBgAA.vObOD775F3-2S3teAAx0QVa1htiaco0UBO43sbQ4ZyBdebAI5MlXwVqIDdCa54u8Iw8MCscHeroJzzdWqneKJ59cmwD-M-u8JjrrD9avw-YzWsm3uUW5b1uC_IM-La6goLoUvCafdKnTYNHNLxxH080939153OSaWwcBlItMzqxXcO4zDKn1o2SbBLkH6F7H3tYOnuKrhQBXKQpu6FYGcwwx-TCuh8Q0uFtOUWyYxb2mELJOgtfWXqhn9sdqeaftnOpN3942RY0f80B4gN8FP0HuHtmBXjISBf6wJMOqPmxvHHkZvH-IS3AajmOrBo8p9SSBJ6JAAibwKUDp3d-vHjChxRehJU4gLLR4TnYkRyn313mAJC9bOxV-Fm773Lrvj5vPR8F1IZGwv5ydhsvXBS_rOWK1wuYPGK9hcvMfoHwMdm59rCJqwA81NY4zXYSh5stfwV8bYko7d21f6jdtS9tL_oC5PhTZnzx43OUtnmmf-MXsLcpGLcTBYstpBqkoX99tzhHQY5B5nzLkxdrnS8vqv6v0gUuyMujvRd44fRbBKPonbV09mIPW0Xosr6l14g0KM1qIjWWU2K3M-JjsiRYUt03Q3drCIaD3VXyoo1og387iu6K_I4ycK5PGdG6n7hGinY516Q1NVsDD9U4FyO8lpJeTqMDG9DRkzaF_sxg';
const bearer = 'Bearer ' + ACCESS_TOKEN;

const App = () => {

  const getAPI = async () => {
    // console.log(bearer);
    const response = await fetch('https://api-sandbox.starlingbank.com/api/v2/accounts', {
      method: "GET",
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
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
