import axios from 'axios';
import https from 'https';
import dotenv from 'dotenv';

const httpsAgent = new https.Agent({  
  rejectUnauthorized: false
});
dotenv.config({path:"./.env"});

export async function getToken() {
  const url = 'https://efatura.etrsoft.com/fmi/data/v1/databases/testdb/sessions';
  const response = await axios.post(
    url,
    {},
    {
      auth: {
        username: process.env.AUTH_USERNAME,
        password: process.env.AUTH_PASSWORD
      },
      headers: { 'Content-Type': 'application/json' },
      httpsAgent,
    }
  );
  console.log("Auth Başarılı! Token:" + response.data.response.token)
  return response.data.response.token;
}
