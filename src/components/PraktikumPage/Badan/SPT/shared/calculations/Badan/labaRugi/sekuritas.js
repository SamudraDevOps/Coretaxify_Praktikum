import { parseFormattedNumber, toNumber } from "@utils/formatCurrency";

// Rumus subtotal untuk kode 4201 Jumlah Pendapatan Usaha
export function hitungSubtotal4201(rows) {
  if (!Array.isArray(rows)) return rows;
  const target = rows.find((r) => r.kodeAkun === "4201");
  if (!target) return rows;

  const sumber = ["4081", "4082", "4083", "4026", "4091", "4199"];
  const kolom = ["nilaiKomersial", "nilaiFiskal"];

  kolom.forEach((key) => {
    let total = 0;
    sumber.forEach((kode) => {
      const row = rows.find((r) => r.kodeAkun === kode);
      total += toNumber(row?.[key]);
    });
    target[key] = total;
  });

  return rows;
}

// Rumus subtotal untuk kode 5400 Jumlah Beban Usaha
export function hitungSubtotal5400(rows) {
  if (!Array.isArray(rows)) return rows;
  const target = rows.find((r) => r.kodeAkun === "5400");
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
    "5322",
    "5205",
    "5399",
  ];
  const kolom = ["nilaiKomersial", "nilaiFiskal"];

  kolom.forEach((key) => {
    let total = 0;
    sumber.forEach((kode) => {
      const row = rows.find((r) => r.kodeAkun === kode);
      total += toNumber(row?.[key]);
    });
    target[key] = total;
  });

  return rows;
}

// Rumus total untuk kode 4600 Jumlah Pendapaatan diluar Usaha

export function hitungTotal4600(rows) {
  if (!Array.isArray(rows)) return rows;
  const target = rows.find((r) => r.kodeAkun === "4600");
  if (!target) return rows;

  const sumber = ["4511", "4503", "4501", "4599"];
  const kolom = ["nilaiKomersial", "nilaiFiskal"];

  kolom.forEach((key) => {
    let total = 0;
    sumber.forEach((kode) => {
      const row = rows.find((r) => r.kodeAkun === kode);
      total += toNumber(row?.[key]);
    });
    target[key] = total;
  });

  return rows;
}

// Rumus total untuk kode 5500 Jumlah Beban Non Usaha
export function hitungTotal5500(rows) {
  if (!Array.isArray(rows)) return rows;
  const target = rows.find((r) => r.kodeAkun === "5500");
  if (!target) return rows;

  const sumber = ["5405", "5421", "5409", "5499"];
  const kolom = ["nilaiKomersial", "nilaiFiskal"];

  kolom.forEach((key) => {
    let total = 0;
    sumber.forEach((kode) => {
      const row = rows.find((r) => r.kodeAkun === kode);
      total += toNumber(row?.[key]);
    });
    target[key] = total;
  });

  return rows;
}

export function hitungTotal4800(rows) {
  if (!Array.isArray(rows)) return rows;

  const target = rows.find((r) => r.kodeAkun == "4800");
  if (!target) return rows;

  const kolom = ["nilaiKomersial", "nilaiFiskal"];

  kolom.forEach((key) => {
    const pendapatanUsaha = toNumber(rows.find((r) => r.kodeAkun == "4201")?.[key]);
    const bebanUsaha = toNumber(rows.find((r) => r.kodeAkun == "5400")?.[key]);
    const pendapatanLain = toNumber(rows.find((r) => r.kodeAkun == "4600")?.[key]);
    const bebanDiluarUsaha = toNumber(rows.find((r) => r.kodeAkun == "5500")?.[key]);

    target[key] = pendapatanUsaha - bebanUsaha + pendapatanLain - bebanDiluarUsaha;
  });
  return rows;
}
