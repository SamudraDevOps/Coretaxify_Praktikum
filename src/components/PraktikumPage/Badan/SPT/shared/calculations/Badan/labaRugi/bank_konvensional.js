import { parseFormattedNumber, toNumber } from "@utils/formatCurrency";

// Rumus subtotal untuk kode 4040 Pendapatan (Beban) Bunga bersih
export function hitungSubtotal4040(rows) {
  if (!Array.isArray(rows)) return rows;

  const target = rows.find((r) => r.kodeAkun == "4040");
  if (!target) return rows;

  const tambah = ["4027", "4028", "4033"];
  const kurang = ["4031"];
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

// Rumus subtotal untuk kode 4210 Jumlah Pendapatan Operasional Lain

export function hitungSubtotal4210(rows) {
  if (!Array.isArray(rows)) return rows;

  const target = rows.find((r) => r.kodeAkun == "4210");
  if (!target) return rows;

  const sumber = ["4071", "4073", "4074", "4091", "4092", "4093", "4094", "4199"];
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

// Rumus subtotal untuk kode 5401 Jumlah Beban Operasional Lain

export function hitungSubtotal5401(rows) {
  if (!Array.isArray(rows)) return rows;

  const target = rows.find((r) => r.kodeAkun == "5401");
  if (!target) return rows;

  const sumber = [
    "5350",
    "5351",
    "5352",
    "5353",
    "5354",
    "5346",
    "5356",
    "5348",
    "5358",
    "5311",
    "5312",
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

// Rumus subtotal untuk kode 4400 Laba Rugi Operasional Lain-Bersih

export function hitungSubtotal4400(rows) {
  if (!Array.isArray(rows)) return rows;

  const target = rows.find((r) => r.kodeAkun == "4400");
  if (!target) return rows;

  const kolom = ["nilaiKomersial", "nilaiFiskal"];

  kolom.forEach((key) => {
    const bungaBersih = toNumber(rows.find((r) => r.kodeAkun == "4040")?.[key]);
    const pendapatanLain = toNumber(rows.find((r) => r.kodeAkun == "4210")?.[key]);
    const bebanLain = toNumber(rows.find((r) => r.kodeAkun == "5401")?.[key]);

    target[key] = bungaBersih + (pendapatanLain - bebanLain);
  });

  return rows;
}

// Rumus subtotal untuk kode 4700 Laba (Rugi) Non Operasional-Bersih

export function hitungSubtotal4700(rows) {
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

// Rumus subtotal untuk kode 4800 Laba (Rugi) Sebelum Pajak

export function hitungSubtotal4800(rows) {
  if (!Array.isArray(rows)) return rows;

  const target = rows.find((r) => r.kodeAkun == "4800");
  if (!target) return rows;

  const kolom = ["nilaiKomersial", "nilaiFiskal"];

  kolom.forEach((key) => {
    const bungaBersih = toNumber(rows.find((r) => r.kodeAkun == "4040")?.[key]);
    const pendapatanOperasional = toNumber(rows.find((r) => r.kodeAkun == "4210")?.[key]);
    const bebanOperasional = toNumber(rows.find((r) => r.kodeAkun == "5401")?.[key]);
    const pendapatanNonOp = toNumber(rows.find((r) => r.kodeAkun == "4600")?.[key]);
    const bebanNonOp = toNumber(rows.find((r) => r.kodeAkun == "5500")?.[key]);

    target[key] =
      bungaBersih + (pendapatanOperasional - bebanOperasional) + (pendapatanNonOp - bebanNonOp);
  });

  return rows;
}
