import express from 'express';
import bodyParser from 'body-parser';
import fetchDataPer from './cron/fetchDataPer.js';
import cors from 'cors';
import recordHandler from './api/records.js';
import fetchNowHandler from './api/fetch-now.js';

const app = express();
const PORT = 5000;

app.use(cors({
  origin: 'https://rahatik-cozum.vercel.app',
  credentials: true
}));
app.use(bodyParser.json());
app.get('/', (_, res) => res.send('API çalışıyor'));
app.get('/api/fetch-now', async (req, res) => fetchNowHandler(req, res));
app.get('/api/records', async (req, res) => recordHandler(req, res));

fetchDataPer();
app.listen(PORT, () => console.log(`Backend ${PORT} portunda çalışıyor`));