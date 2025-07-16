import pool from '../db.js';

export async function upsertRecord(record) {
  const {
    id,
    hesap_kodu,
    hesap_adi,
    tipi,
    ust_hesap_id,
    borc,
    alacak,
    borc_sistem,
    alacak_sistem,
    borc_doviz,
    alacak_doviz,
    borc_islem_doviz,
    alacak_islem_doviz,
    birim_adi,
    bakiye_sekli,
    aktif,
    dovizkod
  } = record;

  const safeNumber = val => (val === '' || val === null ? 0 : val);

  const query = `
    INSERT INTO records (
      id, hesap_kodu, hesap_adi, tipi, ust_hesap_id,
      borc, alacak, borc_sistem, alacak_sistem,
      borc_doviz, alacak_doviz, borc_islem_doviz, alacak_islem_doviz,
      birim_adi, bakiye_sekli, aktif, dovizkod
    ) VALUES (
      $1, $2, $3, $4, $5,
      $6, $7, $8, $9,
      $10, $11, $12, $13,
      $14, $15, $16, $17
    )
    ON CONFLICT (id) DO UPDATE SET
      hesap_kodu = EXCLUDED.hesap_kodu,
      hesap_adi = EXCLUDED.hesap_adi,
      tipi = EXCLUDED.tipi,
      ust_hesap_id = EXCLUDED.ust_hesap_id,
      borc = EXCLUDED.borc,
      alacak = EXCLUDED.alacak,
      borc_sistem = EXCLUDED.borc_sistem,
      alacak_sistem = EXCLUDED.alacak_sistem,
      borc_doviz = EXCLUDED.borc_doviz,
      alacak_doviz = EXCLUDED.alacak_doviz,
      borc_islem_doviz = EXCLUDED.borc_islem_doviz,
      alacak_islem_doviz = EXCLUDED.alacak_islem_doviz,
      birim_adi = EXCLUDED.birim_adi,
      bakiye_sekli = EXCLUDED.bakiye_sekli,
      aktif = EXCLUDED.aktif,
      dovizkod = EXCLUDED.dovizkod
  `;

  await pool.query(query, [
    id,
    hesap_kodu,
    hesap_adi,
    tipi,
    ust_hesap_id,
    safeNumber(borc),
    safeNumber(alacak),
    safeNumber(borc_sistem),
    safeNumber(alacak_sistem),
    safeNumber(borc_doviz),
    safeNumber(alacak_doviz),
    safeNumber(borc_islem_doviz),
    safeNumber(alacak_islem_doviz),
    birim_adi,
    bakiye_sekli,
    aktif,
    dovizkod
  ]);
}
