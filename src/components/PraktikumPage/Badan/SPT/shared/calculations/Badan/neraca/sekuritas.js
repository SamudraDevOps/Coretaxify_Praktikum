import { toNumber } from "@utils/formatCurrency";

export function hitungSubtotal1700(rows) {
  if (!Array.isArray(rows)) return rows;

  const kode1700 = rows.find((r) => r.kodeAkun == "1700");
  if (!kode1700) return rows;

  const akunTambah = [
    "1101",
    "1159",
    "1261",
    "1171",
    "1172",
    "1173",
    "1176",
    "1175",
    "1180",
    "1158",
    "1154",
    "1421",
    "1423",
    "1241",
    "1181",
    "1521",
    "1551",
    "1621",
    "1599",
    "1611",
    "1651",
    "1698",
  ];

  const akunKurang = ["1131", "1522"];

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
    "2122",
    "2123",
    "2126",
    "2131",
    "2132",
    "2133",
    "2135",
    "2134",
    "2191",
    "2186",
    "2195",
    "2202",
    "2124",
    "2322",
    "2323",
    "2361",
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
