import { parseFormattedNumber, toNumber } from "@utils/formatCurrency";

// Rumus subtotal untuk kode 4300 Laba Kotor
export function hitungSubtotal4300(rows) {
  if (!Array.isArray(rows)) return rows;

  const target = rows.find((r) => r.kodeAkun == "4300");
  if (!target) return rows;

  const tambah = ["4021"];
  const kurang = ["4013", "5020"];
  const kolom = ["nilaiKomersial", "nilaiFiskal"];

  kolom.forEach((key) => {
    let totalTambah = 0;
    let totalKurang = 0;

    tambah.forEach((kode) => {
      const row = rows.find((r) => r.kodeAkun == kode);
      totalTambah += toNumber(row?.[key]);
    });

    kurang.forEach((kode) => {
      const row = rows.find((r) => r.kodeAkun == kode);
      totalKurang += toNumber(row?.[key]);
    });

    target[key] = totalTambah - totalKurang;
  });

  return rows;
}

// Rumus subtotal untuk kode 5400 Beban Usaha
export function hitungSubtotal5400(rows) {
  if (!Array.isArray(rows)) return rows;

  const target = rows.find((r) => r.kodeAkun == "5400");
  if (!target) return rows;

  const sumber = [
    "5311",
    "5312",
    "5313",
    "5314",
    "5315",
    "5316",
    "5317",
    "5318",
    "5319",
    "5320",
    "5321",
    "5399",
  ];
  const kolom = ["nilaiKomersial", "nilaiFiskal"];

  kolom.forEach((key) => {
    let total = 0;
    sumber.forEach((kode) => {
      const row = rows.find((r) => r.kodeAkun == kode);
      total += toNumber(row?.[key]);
    });
    target[key] = total;
  });

  return rows;
}

// Rumus subtotal untuk kode 4500 Laba (Rugi) Usaha
export function hitungSubtotal4500(rows) {
  if (!Array.isArray(rows)) return rows;

  const target = rows.find((r) => r.kodeAkun == "4500");
  if (!target) return rows;

  const kolom = ["nilaiKomersial", "nilaiFiskal"];

  kolom.forEach((key) => {
    const labaKotor = toNumber(rows.find((r) => r.kodeAkun == "4300")?.[key]);
    const bebanUsaha = toNumber(rows.find((r) => r.kodeAkun == "5400")?.[key]);
    target[key] = labaKotor - bebanUsaha;
  });

  return rows;
}

// Rumus subtotal untuk kode 4500 Jumlah Pendapatan Non Usaha
export function hitungSubtotal4600(rows) {
  if (!Array.isArray(rows)) return rows;

  const target = rows.find((r) => r.kodeAkun == "4600");
  if (!target) return rows;

  const sumber = ["4501", "4503", "4511", "4599"];
  const kolom = ["nilaiKomersial", "nilaiFiskal"];

  kolom.forEach((key) => {
    let total = 0;
    sumber.forEach((kode) => {
      const row = rows.find((r) => r.kodeAkun == kode);
      total += toNumber(row?.[key]);
    });
    target[key] = total;
  });

  return rows;
}

// Rumus subtotal untuk kode 5500 Jumlah Beban Non Usaha

export function hitungSubtotal5500(rows) {
  if (!Array.isArray(rows)) return rows;

  const target = rows.find((r) => r.kodeAkun == "5500");
  if (!target) return rows;

  const sumber = ["5405", "5409", "5421", "5499"];
  const kolom = ["nilaiKomersial", "nilaiFiskal"];

  kolom.forEach((key) => {
    let total = 0;
    sumber.forEach((kode) => {
      const row = rows.find((r) => r.kodeAkun == kode);
      total += toNumber(row?.[key]);
    });
    target[key] = total;
  });

  return rows;
}
// Rumus total untuk kode 4700 Laba (Rugi) Non Usaha

export function hitungTotal4700(rows) {
  if (!Array.isArray(rows)) return rows;

  const target = rows.find((r) => r.kodeAkun == "4700");
  if (!target) return rows;

  const kolom = ["nilaiKomersial", "nilaiFiskal"];

  kolom.forEach((key) => {
    const pendapatan = toNumber(rows.find((r) => r.kodeAkun == "4600")?.[key]);
    const beban = toNumber(rows.find((r) => r.kodeAkun == "5500")?.[key]);
    target[key] = pendapatan - beban;
  });

  return rows;
}

// Rumus total untuk kode 4800 Laba (Rugi) Sebelum Pajak
export function hitungTotal4800(rows) {
  if (!Array.isArray(rows)) return rows;

  const target = rows.find((r) => r.kodeAkun == "4800");
  if (!target) return rows;

  const kolom = ["nilaiKomersial", "nilaiFiskal"];

  kolom.forEach((key) => {
    const labaKotor = toNumber(rows.find((r) => r.kodeAkun == "4300")?.[key]);
    const penyesuaian = toNumber(rows.find((r) => r.kodeAkun == "4199")?.[key]);
    const bebanUsaha = toNumber(rows.find((r) => r.kodeAkun == "5400")?.[key]);
    const pendapatanNonUsaha = toNumber(rows.find((r) => r.kodeAkun == "4600")?.[key]);
    const bebanNonUsaha = toNumber(rows.find((r) => r.kodeAkun == "5500")?.[key]);

    target[key] = labaKotor + penyesuaian - bebanUsaha + pendapatanNonUsaha - bebanNonUsaha;
  });

  return rows;
}
