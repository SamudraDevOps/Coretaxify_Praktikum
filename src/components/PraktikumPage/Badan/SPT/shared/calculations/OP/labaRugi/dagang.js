import { toNumber } from "@utils/formatCurrency";

//  4004 – PENJUALAN BRUTO

export function hitungSubtotal4004(rows) {
  if (!Array.isArray(rows)) return rows;

  const target = rows.find((r) => r.kodeAkun == "4004");
  if (!target) return rows;

  const sumber = ["4003", "4002"];
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

//  4020 – PENJUALAN BERSIH

export function hitungSubtotal4020(rows) {
  if (!Array.isArray(rows)) return rows;

  const target = rows.find((r) => r.kodeAkun == "4020");
  if (!target) return rows;

  const tambah = ["4004"];
  const kurang = ["4011", "4012"];
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

//  5020 – HARGA POKOK PENJUALAN

export function hitungSubtotal5020(rows) {
  if (!Array.isArray(rows)) return rows;

  const target = rows.find((r) => r.kodeAkun == "5020");
  if (!target) return rows;

  const tambah = ["5001", "5008"];
  const kurang = ["5009"];
  const kolom = ["nilaiKomersial", "nilaiFiskal"];

  kolom.forEach((key) => {
    let total = 0;

    tambah.forEach((kode) => {
      const row = rows.find((r) => r.kodeAkun == kode);
      total += toNumber(row?.[key]);
    });

    kurang.forEach((kode) => {
      const row = rows.find((r) => r.kodeAkun == kode);
      total -= toNumber(row?.[key]);
    });

    target[key] = total;
  });

  return rows;
}

//  4300 – LABA KOTOR

export function hitungSubtotal4300(rows) {
  if (!Array.isArray(rows)) return rows;

  const target = rows.find((r) => r.kodeAkun == "4300");
  if (!target) return rows;

  const kolom = ["nilaiKomersial", "nilaiFiskal"];

  kolom.forEach((key) => {
    const penjualan = toNumber(rows.find((r) => r.kodeAkun == "4020")?.[key]);
    const hpp = toNumber(rows.find((r) => r.kodeAkun == "5020")?.[key]);
    target[key] = penjualan - hpp;
  });

  return rows;
}

//  5400 – BEBAN USAHA

export function hitungSubtotal5400(rows) {
  if (!Array.isArray(rows)) return rows;

  const target = rows.find((r) => r.kodeAkun == "5400");
  if (!target) return rows;

  const sumber = [
    "5311",
    "5313",
    "5314",
    "5315",
    "5316",
    "5317",
    "5318",
    "5320",
    "5321",
    "5322",
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

//  4800 – LABA (RUGI) SEBELUM PAJAK

export function hitungTotal4800(rows) {
  if (!Array.isArray(rows)) return rows;

  const target = rows.find((r) => r.kodeAkun == "4800");
  if (!target) return rows;

  const kolom = ["nilaiKomersial", "nilaiFiskal"];

  kolom.forEach((key) => {
    const labaKotor = toNumber(rows.find((r) => r.kodeAkun == "4300")?.[key]);
    const bebanusaha = toNumber(rows.find((r) => r.kodeAkun == "5400")?.[key]);

    target[key] = labaKotor - bebanusaha;
  });

  return rows;
}
