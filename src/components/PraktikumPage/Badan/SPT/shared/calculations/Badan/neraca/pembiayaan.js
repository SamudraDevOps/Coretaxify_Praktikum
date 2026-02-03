import { toNumber } from "@utils/formatCurrency";

export function hitungSubtotal1700(rows) {
  if (!Array.isArray(rows)) return rows;

  const kode1700 = rows.find((r) => r.kodeAkun == "1700");
  if (!kode1700) return rows;

  const akunTambah = [
    "1102",
    "1103",
    "1104",
    "1141",
    "1151",
    "1161",
    "1162",
    "1163",
    "1164",
    "1165",
    "1166",
    "1180",
    "1423",
    "1181",
    "1555",
    "1565",
    "1590",
    "1533",
    "1521",
    "1511",
    "1611",
    "1698",
  ];

  const akunKurang = ["1658", "1534", "1522"];

  let total = 0;

  akunTambah.forEach((kode) => {
    const row = rows.find((r) => r.kodeAkun == kode);
    total += toNumber(row?.nilaiKomersial);
  });

  akunKurang.forEach((kode) => {
    const row = rows.find((r) => r.kodeAkun == kode);
    total -= toNumber(row?.nilaiKomersial);
  });

  kode1700.nilaiKomersial = total;

  return rows;
}

export function hitungSubtotal2999(rows) {
  if (!Array.isArray(rows)) return rows;

  const kode2999 = rows.find((r) => r.kodeAkun == "2999");
  if (!kode2999) return rows;

  const akunTambah = ["2164", "2191", "2311", "2312", "2204", "2321", "2322", "2988"];

  const akunKurang = ["2201", "2228", "2212", "2213", "2362", "2363"];

  let total = 0;

  akunTambah.forEach((kode) => {
    const row = rows.find((r) => r.kodeAkun == kode);
    total += toNumber(row?.nilaiKomersial);
  });

  akunKurang.forEach((kode) => {
    const row = rows.find((r) => r.kodeAkun == kode);
    total -= toNumber(row?.nilaiKomersial);
  });

  kode2999.nilaiKomersial = total;

  return rows;
}

export function hitungSubtotal3299(rows) {
  if (!Array.isArray(rows)) return rows;

  const kode3299 = rows.find((r) => r.kodeAkun == "3299");
  if (!kode3299) return rows;

  const akunEkuitas = ["3102", "3110", "3120", "3200", "3297", "3298"];

  let total = 0;

  akunEkuitas.forEach((kode) => {
    const row = rows.find((r) => r.kodeAkun == kode);
    total += toNumber(row?.nilaiKomersial);
  });

  kode3299.nilaiKomersial = total;
  return rows;
}

export function hitungSubtotal3300(rows) {
  if (!Array.isArray(rows)) return rows;

  const kode3300 = rows.find((r) => r.kodeAkun == "3300");
  if (!kode3300) return rows;

  const kode2999 = rows.find((r) => r.kodeAkun == "2999");
  const kode3299 = rows.find((r) => r.kodeAkun == "3299");

  const totalLiabilitas = toNumber(kode2999?.nilaiKomersial);
  const totalEkuitas = toNumber(kode3299?.nilaiKomersial);

  kode3300.nilaiKomersial = totalLiabilitas + totalEkuitas;
  return rows;
}
