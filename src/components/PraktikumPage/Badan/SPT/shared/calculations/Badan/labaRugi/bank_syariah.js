import { parseFormattedNumber, toNumber } from "@utils/formatCurrency";

// Rumus subtotal untuk kode 4130 Total Pendapatan Dari Piutang
export function hitungSubtotal4130(rows) {
  if (!Array.isArray(rows)) return rows;

  const target = rows.find((r) => r.kodeAkun == "4130");
  if (!target) return rows;

  const sumber = ["4121", "4122", "4123"];
  const kolom = ["nilaiKomersial", "nilaiFiskal"];

  kolom.forEach((key) => {
    let total = 0;
    sumber.forEach((kode) => {
      total += toNumber(rows.find((r) => r.kodeAkun == kode)?.[key]);
    });
    target[key] = total;
  });

  return rows;
}

// Rumus subtotal untuk kode 4140 Jumlah Pnedapatan Bagi Hasil

export function hitungSubtotal4140(rows) {
  if (!Array.isArray(rows)) return rows;

  const target = rows.find((r) => r.kodeAkun == "4140");
  if (!target) return rows;

  const sumber = ["4131", "4132"];
  const kolom = ["nilaiKomersial", "nilaiFiskal"];

  kolom.forEach((key) => {
    let total = 0;
    sumber.forEach((kode) => {
      total += toNumber(rows.find((r) => r.kodeAkun == kode)?.[key]);
    });
    target[key] = total;
  });

  return rows;
}

// Rumus subtotal untuk kode 4150 Jumlah Pendapatan Dari Penyaluran Dana

export function hitungSubtotal4150(rows) {
  if (!Array.isArray(rows)) return rows;

  const target = rows.find((r) => r.kodeAkun == "4150");
  if (!target) return rows;

  const sumber = ["4130", "4140", "4149"];
  const kolom = ["nilaiKomersial", "nilaiFiskal"];

  kolom.forEach((key) => {
    let total = 0;
    sumber.forEach((kode) => {
      total += toNumber(rows.find((r) => r.kodeAkun == kode)?.[key]);
    });
    target[key] = total;
  });

  return rows;
}

// Rumus subtotal untuk kode 5310 Jumlah Bagi Hasil Untuk Pemilih Dana Investasi

export function hitungSubtotal5310(rows) {
  if (!Array.isArray(rows)) return rows;

  const target = rows.find((r) => r.kodeAkun == "5310");
  if (!target) return rows;

  const sumber = ["5301", "5302"];
  const kolom = ["nilaiKomersial", "nilaiFiskal"];

  kolom.forEach((key) => {
    let total = 0;
    sumber.forEach((kode) => {
      total += toNumber(rows.find((r) => r.kodeAkun == kode)?.[key]);
    });
    target[key] = total;
  });

  return rows;
}

// Rumus subtotal untuk kode 4300 Pendapatan setelah distribusi bagi hasil
export function hitungSubtotal4300(rows) {
  if (!Array.isArray(rows)) return rows;

  const target = rows.find((r) => r.kodeAkun == "4300");
  if (!target) return rows;

  const kolom = ["nilaiKomersial", "nilaiFiskal"];

  kolom.forEach((key) => {
    const pendapatan = toNumber(rows.find((r) => r.kodeAkun == "4150")?.[key]);
    const bagiHasil = toNumber(rows.find((r) => r.kodeAkun == "5310")?.[key]);
    target[key] = pendapatan - bagiHasil;
  });

  return rows;
}
// Rumus subtotal untuk kode 4210 Jumlah Pendapatan Operasional Lainnya
export function hitungSubtotal4210(rows) {
  if (!Array.isArray(rows)) return rows;

  const target = rows.find((r) => r.kodeAkun == "4210");
  if (!target) return rows;

  const sumber = ["4071", "4073", "4074", "4084", "4092", "4093", "4094", "4199"];
  const kolom = ["nilaiKomersial", "nilaiFiskal"];

  kolom.forEach((key) => {
    let total = 0;
    sumber.forEach((kode) => {
      total += toNumber(rows.find((r) => r.kodeAkun == kode)?.[key]);
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
    "5341",
    "5342",
    "5343",
    "5344",
    "5345",
    "5346",
    "5347",
    "5348",
    "5349",
    "5311",
    "5313",
    "5320",
    "5321",
    "5314",
    "5399",
  ];
  const kolom = ["nilaiKomersial", "nilaiFiskal"];

  kolom.forEach((key) => {
    let total = 0;
    sumber.forEach((kode) => {
      total += toNumber(rows.find((r) => r.kodeAkun == kode)?.[key]);
    });
    target[key] = total;
  });

  return rows;
}
// Rumus subtotal untuk kode 4220 Pendapatan Beban Operasional Lain
export function hitungSubtotal4220(rows) {
  if (!Array.isArray(rows)) return rows;

  const target = rows.find((r) => r.kodeAkun == "4220");
  if (!target) return rows;

  const kolom = ["nilaiKomersial", "nilaiFiskal"];

  kolom.forEach((key) => {
    const pendapatan = toNumber(rows.find((r) => r.kodeAkun == "4210")?.[key]);
    const beban = toNumber(rows.find((r) => r.kodeAkun == "5401")?.[key]);
    target[key] = pendapatan - beban;
  });

  return rows;
}

// Rumus subtotal untuk kode 4500 Jumlah Laba Rudi Operasional
export function hitungSubtotal4500(rows) {
  if (!Array.isArray(rows)) return rows;

  const target = rows.find((r) => r.kodeAkun == "4500");
  if (!target) return rows;

  const kolom = ["nilaiKomersial", "nilaiFiskal"];

  kolom.forEach((key) => {
    target[key] =
      toNumber(rows.find((r) => r.kodeAkun == "4300")?.[key]) +
      toNumber(rows.find((r) => r.kodeAkun == "4220")?.[key]) -
      toNumber(rows.find((r) => r.kodeAkun == "5401")?.[key]);
  });

  return rows;
}

// Rumus subtotal untuk kode 4700 Laba (Rugi) Non Operasional-Bersih

export function hitungSubtotal4700(rows) {
  if (!Array.isArray(rows)) return rows;

  const target = rows.find((r) => r.kodeAkun == "4700");
  if (!target) return rows;

  const tambah = ["4502", "4501", "4599"];
  const kurang = ["5422", "5421", "5499"];
  const kolom = ["nilaiKomersial", "nilaiFiskal"];

  kolom.forEach((key) => {
    let totalTambah = 0;
    let totalKurang = 0;

    tambah.forEach((kode) => {
      totalTambah += toNumber(rows.find((r) => r.kodeAkun == kode)?.[key]);
    });

    kurang.forEach((kode) => {
      totalKurang += toNumber(rows.find((r) => r.kodeAkun == kode)?.[key]);
    });

    target[key] = totalTambah - totalKurang;
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
    target[key] =
      toNumber(rows.find((r) => r.kodeAkun == "4300")?.[key]) +
      (toNumber(rows.find((r) => r.kodeAkun == "4210")?.[key]) -
        toNumber(rows.find((r) => r.kodeAkun == "5401")?.[key])) +
      toNumber(rows.find((r) => r.kodeAkun == "4700")?.[key]);
  });

  return rows;
}
