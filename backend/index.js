import express from 'express';
import bodyParser from 'body-parser';
import fetchDataPer from './cron/fetchDataPer.js';
import pool from './db.js';
import { fetchData } from './services/dataService.js';
import { upsertRecord } from './models/recordModel.js';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors({
  origin: '*',
  credentials: false
}));
app.use(bodyParser.json());
app.get('/', (_, res) => res.send('API çalışıyor'));
app.get('/api/fetch-now', async (_, res) => {
  try {
    const data = await fetchData();

    for (const record of data) {
      await upsertRecord(record);
    }

    res.json({ message: 'Veriler başarıyla işlendi.', count: data.length });
  } catch (error) {
    console.error('DB hatası:', error);
    res.status(500).json({ error: 'DB hatası.' });
  }
});

app.get('/api/records', async (_, res) => {
  try {
    const result = await pool.query('SELECT * FROM records');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Veri alınamadı' });
  }
});
fetchDataPer();
app.listen(PORT, () => console.log(`Backend ${PORT} portunda çalışıyor`));