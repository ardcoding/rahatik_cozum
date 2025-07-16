import axios from 'axios';
import https from 'https';
import { getToken } from './authService.js';

const httpsAgent = new https.Agent({  
  rejectUnauthorized: false,
});

export async function fetchData() {
  try {
    const token = await getToken();
    const url = 'https://efatura.etrsoft.com/fmi/data/v1/databases/testdb/layouts/testdb/records/1';
    const response = await axios.patch(
      url,
      {
        fieldData: {},
        script: 'getData'
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        httpsAgent
      }
    );

    const scriptResult = response.data.response.scriptResult;
    console.log('scriptResult:', scriptResult);
    const data = JSON.parse(scriptResult);
    return data;
  } catch (error) {
    console.error('fetchData Hatası:', error);
    throw error;
  }
}
