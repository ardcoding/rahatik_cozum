import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function upsertRecord(records) {
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
  } = records;

  const safeFloat = val => {
    const num = parseFloat(val);
    return isNaN(num) ? null : num;
  };

  const safeInt = val => {
    const num = parseInt(val);
    return isNaN(num) ? null : num;
  };

  try {
    return await prisma.records.upsert({
      where: { id: Number(id) },
      update: {
        hesap_kodu: hesap_kodu || null,
        hesap_adi: hesap_adi || null,
        tipi: tipi || null,
        ust_hesap_id: safeInt(ust_hesap_id),
        borc: safeFloat(borc),
        alacak: safeFloat(alacak),
        borc_sistem: safeFloat(borc_sistem),
        alacak_sistem: safeFloat(alacak_sistem),
        borc_doviz: safeFloat(borc_doviz),
        alacak_doviz: safeFloat(alacak_doviz),
        borc_islem_doviz: safeFloat(borc_islem_doviz),
        alacak_islem_doviz: safeFloat(alacak_islem_doviz),
        birim_adi: birim_adi || null,
        bakiye_sekli: safeInt(bakiye_sekli),
        aktif: safeInt(aktif),
        dovizkod: safeInt(dovizkod)
      },
      create: {
        id: Number(id),
        hesap_kodu: hesap_kodu || null,
        hesap_adi: hesap_adi || null,
        tipi: tipi || null,
        ust_hesap_id: safeInt(ust_hesap_id),
        borc: safeFloat(borc),
        alacak: safeFloat(alacak),
        borc_sistem: safeFloat(borc_sistem),
        alacak_sistem: safeFloat(alacak_sistem),
        borc_doviz: safeFloat(borc_doviz),
        alacak_doviz: safeFloat(alacak_doviz),
        borc_islem_doviz: safeFloat(borc_islem_doviz),
        alacak_islem_doviz: safeFloat(alacak_islem_doviz),
        birim_adi: birim_adi || null,
        bakiye_sekli: safeInt(bakiye_sekli),
        aktif: safeInt(aktif),
        dovizkod: safeInt(dovizkod)
      }
    });
  } catch (error) {
    console.error('Prisma upsert error:', error);
    throw error;
  }
}
