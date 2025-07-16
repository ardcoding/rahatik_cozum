import cron from 'node-cron';
import { fetchData } from '../services/dataService.js';
import { upsertRecord } from '../models/recordModel.js';

export default function fetchDataPer() {
  cron.schedule('*/5 * * * *', async () => {
    console.log('Veri çekiliyor...');

    try {
      const data = await fetchData();
      for (const record of data) {
        await upsertRecord(record);
      }
      console.log('Veri güncellendi.');
    } catch (error) {
      console.error('DB hatası:', error);
    }
  });
}
