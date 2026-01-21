import { toNumber } from "@utils/formatCurrency";

export function hitungSubtotal1700(rows) {
  if (!Array.isArray(rows)) return rows;

  const kode1700 = rows.find((r) => r.kodeAkun == "1700");
  if (!kode1700) return rows;

  const akunTambah = [
    "1101",
    "1122",
    "1123",
    "1124",
    "1125",
    "1181",
    "1200",
    "1401",
    "1405",
    "1421",
    "1422",
    "1423",
    "1499",
    "1501",
    "1520",
    "1523",
    "1529",
    "1531",
    "1533",
    "1551",
    "1599",
    "1600",
    "1611",
    "1651",
    "1698",
  ];

  const akunKurang = ["1131", "1524", "1530", "1534", "1601", "1658"];

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

  const akunLiabilitas = [
    "2102",
    "2103",
    "2111",
    "2186",
    "2187",
    "2191",
    "2192",
    "2195",
    "2201",
    "2202",
    "2203",
    "2228",
    "2301",
    "2303",
    "2304",
    "2312",
    "2322",
    "2321",
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
