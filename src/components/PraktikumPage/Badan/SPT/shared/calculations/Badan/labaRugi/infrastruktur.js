import { parseFormattedNumber, toNumber } from "@utils/formatCurrency";

// Rumus subtotal untuk kode 4300 Hasil Usaha Investasi
export function hitungSubtotal4300(rows) {
  if (!Array.isArray(rows)) return rows;
  const target = rows.find((r) => r.kodeAkun === "4300");
  if (!target) return rows;

  const tambah = ["4001", "4026"];
  const kurang = ["4013", "5020"];
  const kolom = ["nilaiKomersial", "nilaiFiskal"];

  kolom.forEach((key) => {
    let totalTambah = 0;
    let totalKurang = 0;

    tambah.forEach((kode) => {
      const row = rows.find((r) => r.kodeAkun === kode);
      totalTambah += toNumber(row?.[key]);
    });

    kurang.forEach((kode) => {
      const row = rows.find((r) => r.kodeAkun === kode);
      totalKurang += toNumber(row?.[key]);
    });

    target[key] = totalTambah - totalKurang;
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

// Rumus total untuk kode 4600 Jumlah Pendapaatan Non Usaha

export function hitungTotal4600(rows) {
  if (!Array.isArray(rows)) return rows;
  const target = rows.find((r) => r.kodeAkun === "4600");
  if (!target) return rows;

  const sumber = ["4501", "4511", "4599"];
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

  const sumber = ["5405", "5409", "5421", "5499"];
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
  const target = rows.find((r) => r.kodeAkun === "4800");
  if (!target) return rows;

  const tambah = ["4300", "4199", "4153", "4154", "4155", "4156", "4600"];
  const kurang = ["5324", "5325", "5400", "5500"];
  const kolom = ["nilaiKomersial", "nilaiFiskal"];

  kolom.forEach((key) => {
    let totalTambah = 0;
    let totalKurang = 0;

    tambah.forEach((kode) => {
      const row = rows.find((r) => r.kodeAkun === kode);
      totalTambah += toNumber(row?.[key]);
    });

    kurang.forEach((kode) => {
      const row = rows.find((r) => r.kodeAkun === kode);
      totalKurang += toNumber(row?.[key]);
    });

    target[key] = totalTambah - totalKurang;
  });

  return rows;
}
