import { parseFormattedNumber, toNumber } from "@utils/formatCurrency";

// Rumus subtotal untuk kode 4060 Jumlah Pendapatan Premi Neto
export function hitungSubtotal4060(rows) {
  if (!Array.isArray(rows)) return rows;

  const target = rows.find((r) => r.kodeAkun == "4060");
  if (!target) return rows;

  const kurang = ["4041"];
  const tambah = ["4045", "4047", "4051"];
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

// Rumus subtotal untuk kode 4200 Jumlah Pendapatan Underwriting

export function hitungSubtotal4200(rows) {
  if (!Array.isArray(rows)) return rows;

  const target = rows.find((r) => r.kodeAkun == "4200");
  if (!target) return rows;

  const sumber = ["4060", "4171"];
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

// Rumus subtotal untuk kode 5200 Jumlah Beban Underwriting

export function hitungSubtotal5200(rows) {
  if (!Array.isArray(rows)) return rows;

  const target = rows.find((r) => r.kodeAkun == "5200");
  if (!target) return rows;

  const sumber = ["5101", "5102", "5103", "5109"];
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

// Rumus subtotal untuk kode 4300 Laba Underwriting

export function hitungSubtotal4300(rows) {
  if (!Array.isArray(rows)) return rows;

  const target = rows.find((r) => r.kodeAkun == "4300");
  if (!target) return rows;

  const kolom = ["nilaiKomersial", "nilaiFiskal"];

  kolom.forEach((key) => {
    const pendapatan = toNumber(rows.find((r) => r.kodeAkun == "4200")?.[key]);
    const beban = toNumber(rows.find((r) => r.kodeAkun == "5200")?.[key]);

    target[key] = pendapatan - beban;
  });

  return rows;
}

// Rumus subtotal untuk kode 5400 Beban Operasional
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

// Rumus total untuk kode 4700 Laba Rugi Non Operasional

export function hitungTotal4700(rows) {
  if (!Array.isArray(rows)) return rows;

  const target = rows.find((r) => r.kodeAkun == "5400");
  if (!target) return rows;

  const sumber = ["4600", "5500"];
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

// Rumus total untuk kode 4800 Laba (Rugi) Sebelum Pajak
export function hitungTotal4800(rows) {
  if (!Array.isArray(rows)) return rows;

  const target = rows.find((r) => r.kodeAkun == "4800");
  if (!target) return rows;

  const kolom = ["nilaiKomersial", "nilaiFiskal"];

  kolom.forEach((key) => {
    const underwriting =
      toNumber(rows.find((r) => r.kodeAkun == "4200")?.[key]) -
      toNumber(rows.find((r) => r.kodeAkun == "5200")?.[key]);

    const pendapatanLain =
      toNumber(rows.find((r) => r.kodeAkun == "4120")?.[key]) +
      toNumber(rows.find((r) => r.kodeAkun == "4199")?.[key]);

    const bebanOperasional = toNumber(rows.find((r) => r.kodeAkun == "5400")?.[key]);

    const nonOperasional = toNumber(rows.find((r) => r.kodeAkun == "4700")?.[key]);

    target[key] = underwriting + pendapatanLain - bebanOperasional + nonOperasional;
  });

  return rows;
}
