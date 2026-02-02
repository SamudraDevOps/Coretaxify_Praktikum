import { toNumber } from "@utils/formatCurrency";

export function hitungSubtotal1500(rows) {
  if (!Array.isArray(rows)) return rows;

  const kode1500 = rows.find((r) => r.kodeAkun == "1500");
  if (!kode1500) return rows;

  const akunTambah = [
    "1101",
    "1211",
    "1212",
    "1213",
    "1180",
    "1181",
    "1401",
    "1421",
    "1422",
    "1423",
    "1499",
  ];

  const akunKurang = ["1131"];

  let total = 0;

  akunTambah.forEach((kode) => {
    const row = rows.find((r) => r.kodeAkun == kode);
    total += toNumber(row?.nilaiKomersial);
  });

  akunKurang.forEach((kode) => {
    const row = rows.find((r) => r.kodeAkun == kode);
    total -= toNumber(row?.nilaiKomersial);
  });

  kode1500.nilaiKomersial = total;

  return rows;
}

export function hitungSubtotal1699(rows) {
  if (!Array.isArray(rows)) return rows;

  const kode1699 = rows.find((r) => r.kodeAkun == "1699");
  if (!kode1699) return rows;

  const akunTambah = [
    "1518",
    "1519",
    "1551",
    "1571",
    "1573",
    "1574",
    "1611",
    "1621",
    "1521",
    "1655",
    "1698",
  ];

  const akunKurang = ["1522", "1658"];

  let total = 0;

  akunTambah.forEach((kode) => {
    const row = rows.find((r) => r.kodeAkun == kode);
    total += toNumber(row?.nilaiKomersial);
  });

  akunKurang.forEach((kode) => {
    const row = rows.find((r) => r.kodeAkun == kode);
    total -= toNumber(row?.nilaiKomersial);
  });

  kode1699.nilaiKomersial = total;

  return rows;
}

export function hitungSubtotal1700(rows) {
  if (!Array.isArray(rows)) return rows;

  const kode1700 = rows.find((r) => r.kodeAkun == "1700");
  if (!kode1700) return rows;

  const kode1500 = rows.find((r) => r.kodeAkun == "1500");
  const kode1699 = rows.find((r) => r.kodeAkun == "1699");

  const totalAsetLancar = toNumber(kode1500?.nilaiKomersial);
  const totalAsetTidakLancar = toNumber(kode1699?.nilaiKomersial);
  kode1700.nilaiKomersial = totalAsetLancar + totalAsetTidakLancar;
  return rows;
}

export function hitungSubtotal2229(rows) {
  if (!Array.isArray(rows)) return rows;

  const kode2229 = rows.find((r) => r.kodeAkun == "2229");
  if (!kode2229) return rows;

  const akunLiabilitas = [
    "2201",
    "2121",
    "2194",
    "2203",
    "2191",
    "2186",
    "2187",
    "2193",
    "2202",
    "2228",
  ];

  let total = 0;

  akunLiabilitas.forEach((kode) => {
    const row = rows.find((r) => r.kodeAkun == kode);
    total += toNumber(row?.nilaiKomersial);
  });

  kode2229.nilaiKomersial = total;
  return rows;
}

export function hitungSubtotal2900(rows) {
  if (!Array.isArray(rows)) return rows;

  const kode2900 = rows.find((r) => r.kodeAkun == "2900");
  if (!kode2900) return rows;

  const akunLiabilitas = [
    "2321",
    "2344",
    "2345",
    "2312",
    "2322",
    "2301",
    "2302",
    "2306",
    "2311",
    "2313",
    "2998",
  ];

  let total = 0;

  akunLiabilitas.forEach((kode) => {
    const row = rows.find((r) => r.kodeAkun == kode);
    total += toNumber(row?.nilaiKomersial);
  });

  kode2900.nilaiKomersial = total;
  return rows;
}

export function hitungSubtotal2999(rows) {
  if (!Array.isArray(rows)) return rows;

  const kode2999 = rows.find((r) => r.kodeAkun == "2999");
  if (!kode2999) return rows;

  const kode2229 = rows.find((r) => r.kodeAkun == "2229");
  const kode2900 = rows.find((r) => r.kodeAkun == "2900");

  const totalLiabilitasPendek = toNumber(kode2229?.nilaiKomersial);
  const totalLiabilitasPanjang = toNumber(kode2900?.nilaiKomersial);

  kode2999.nilaiKomersial = totalLiabilitasPendek + totalLiabilitasPanjang;
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
