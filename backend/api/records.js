import { PrismaClient } from '@prisma/client';
import cors from '../helpers/cors.js';

const prisma = new PrismaClient();

export default async function recordHandler(req, res) {
  await cors(req, res);

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'GET isteği gönderilmedi' });
  }

  try {
    const records = await prisma.records.findMany();
    res.status(200).json(records);
  } catch (err) {
    console.error('Prisma error:', err);
    res.status(500).json({ error: 'Veri alınamadı' });
  }
}