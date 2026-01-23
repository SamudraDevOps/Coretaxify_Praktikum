import { parseFormattedNumber, toNumber } from "@utils/formatCurrency";

// Rumus subtotal untuk kode 4120 Jumlah Pendatapan Investasi
export function hitungSubtotal4120(rows) {
  if (!Array.isArray(rows)) return rows;

  const target = rows.find((r) => r.kodeAkun == "4120");
  if (!target) return rows;

  const sumber = ["4026", "4091", "4101", "4106", "4118"];
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

// Rumus subtotal untuk kode 5300 Jumlah Beban Investasi
export function hitungSubtotal5300(rows) {
  if (!Array.isArray(rows)) return rows;

  const target = rows.find((r) => r.kodeAkun == "5300");
  if (!target) return rows;

  const sumber = ["5201", "5202", "5203", "5204", "5205", "5299"];
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

// Rumus subtotal untuk kode 4300 Hasil Usaha Investasi
export function hitungSubtotal4300(rows) {
  if (!Array.isArray(rows)) return rows;

  const target = rows.find((r) => r.kodeAkun == "4300");
  if (!target) return rows;

  const kolom = ["nilaiKomersial", "nilaiFiskal"];

  kolom.forEach((key) => {
    const pendapatanInvestasi = toNumber(rows.find((r) => r.kodeAkun == "4120")?.[key]);
    const bebanInvestasi = toNumber(rows.find((r) => r.kodeAkun == "5300")?.[key]);

    target[key] = pendapatanInvestasi - bebanInvestasi;
  });

  return rows;
}

// Rumus subtotal untuk kode 5400 Jumlah Pendapatan Non Usaha
export function hitungSubtotal5400(rows) {
  if (!Array.isArray(rows)) return rows;

  const target = rows.find((r) => r.kodeAkun == "5400");
  if (!target) return rows;

  const sumber = ["5311", "5312", "5323", "5326", "5314", "5316", "5317", "5318", "5320", "5399"];
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

// Rumus total untuk kode 4700 Jumlah Pendapaatan (Beban) Non Operasional Lainnya

export function hitungTotal4700(rows) {
  if (!Array.isArray(rows)) return rows;

  const target = rows.find((r) => r.kodeAkun == "4700");
  if (!target) return rows;

  const kolom = ["nilaiKomersial", "nilaiFiskal"];

  kolom.forEach((key) => {
    const pendapatan = toNumber(rows.find((r) => r.kodeAkun == "4599")?.[key]);
    const beban = toNumber(rows.find((r) => r.kodeAkun == "5499")?.[key]);

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
    const hasilUsahaInvestasi = toNumber(rows.find((r) => r.kodeAkun == "4300")?.[key]);
    const pendapatanNonUsaha = toNumber(rows.find((r) => r.kodeAkun == "5400")?.[key]);
    const pendapatanLain1 = toNumber(rows.find((r) => r.kodeAkun == "4512")?.[key]);
    const pendapatanLain2 = toNumber(rows.find((r) => r.kodeAkun == "4513")?.[key]);
    const pendapatanLain3 = toNumber(rows.find((r) => r.kodeAkun == "4514")?.[key]);
    const nonOperasional = toNumber(rows.find((r) => r.kodeAkun == "4700")?.[key]);

    target[key] =
      hasilUsahaInvestasi -
      pendapatanNonUsaha +
      pendapatanLain1 +
      pendapatanLain2 +
      pendapatanLain3 +
      nonOperasional;
  });

  return rows;
}
