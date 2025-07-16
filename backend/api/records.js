import pool from '../db.js';
import cors from '../helpers/cors.js';

export default async function recordHandler(req, res) {
  await cors(req, res);

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'GET isteği gönderilmedi' });
  }

  try {
    const result = await pool.query('SELECT * FROM records');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Veri alınamadı' });
  }
}
