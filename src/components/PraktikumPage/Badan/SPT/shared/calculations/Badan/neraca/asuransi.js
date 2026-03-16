import { toNumber } from "@utils/formatCurrency";

export function hitungSubtotal1300(rows) {
  if (!Array.isArray(rows)) return rows;

  const kode1300 = rows.find((r) => r.kodeAkun == "1300");
  if (!kode1300) return rows;
  const akunTambah = [
    "1203",
    "1204",
    "1232",
    "1244",
    "1181",
    "1252",
    "1226",
    "1227",
    "1222",
    "1224",
    "1251",
    "1253",
    "1254",
    "1260",
    "1272",
    "1282",
    "1291",
    "1292",
    "1293",
    "1294",
    "1299",
  ];

  const akunKurang = ["1131"];

  let totalAsetTidakLancar = 0;

  akunTambah.forEach((kode) => {
    const row = rows.find((r) => r.kodeAkun == kode);
    totalAsetTidakLancar += toNumber(row?.nilaiKomersial);
  });

  akunKurang.forEach((kode) => {
    const row = rows.find((r) => r.kodeAkun == kode);
    totalAsetTidakLancar -= toNumber(row?.nilaiKomersial);
  });

  kode1300.nilaiKomersial = totalAsetTidakLancar;

  return rows;
}

export function hitungSubtotal1700(rows) {
  if (!Array.isArray(rows)) return rows;

  const kode1700 = rows.find((r) => r.kodeAkun == "1700");
  if (!kode1700) return rows;
  const akunTambah = [
    "1300",
    "1101",
    "1130",
    "1132",
    "1191",
    "1133",
    "1134",
    "1121",
    "1122",
    "1521",
    "1613",
    "1698",
  ];

  const akunKurang = ["1522"];

  let totalAsetTidakLancar = 0;

  akunTambah.forEach((kode) => {
    const row = rows.find((r) => r.kodeAkun == kode);
    totalAsetTidakLancar += toNumber(row?.nilaiKomersial);
  });

  akunKurang.forEach((kode) => {
    const row = rows.find((r) => r.kodeAkun == kode);
    totalAsetTidakLancar -= toNumber(row?.nilaiKomersial);
  });

  kode1700.nilaiKomersial = totalAsetTidakLancar;

  return rows;
}

export function hitungSubtotal2999(rows) {
  if (!Array.isArray(rows)) return rows;

  const kode2999 = rows.find((r) => r.kodeAkun == "2999");
  if (!kode2999) return rows;

  const akunLiabilitas = [
    "2167",
    "2168",
    "2165",
    "2166",
    "2186",
    "2191",
    "2195",
    "2322",
    "2194",
    "2171",
    "2172",
    "2173",
    "2174",
    "2361",
    "2998",
  ];

  let total = 0;

  akunLiabilitas.forEach((kode) => {
    const row = rows.find((r) => r.kodeAkun == kode);
    total += toNumber(row?.nilaiKomersial);
  });

  kode2999.nilaiKomersial = total;
  return rows;
}

export function hitungSubtotal3299(rows) {
  if (!Array.isArray(rows)) return rows;

  const kode3299 = rows.find((r) => r.kodeAkun == "3299");
  if (!kode3299) return rows;

  const akunEkuitas = ["3102", "3120", "3200", "3297", "3298"];

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
