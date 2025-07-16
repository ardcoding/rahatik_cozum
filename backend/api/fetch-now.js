import cors from "../helpers/cors.js";
import { upsertRecord } from "../models/recordModel.js";
import { fetchData } from "../services/dataService.js";

export default async function fetchNowHandler(req, res) {
  await cors(req, res);

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'GET isteği gönderilmedi.' });
  }

  try {
    const data = await fetchData();

    for (const record of data) {
      await upsertRecord(record);
    }

    res.status(200).json({ message: 'Veriler başarıyla işlendi.', count: data.length });
  } catch (error) {
    console.error('DB hatası:', error);
    res.status(500).json({ error: 'DB hatası.' });
  }
}
