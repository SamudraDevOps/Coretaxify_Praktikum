import { toNumber } from "@utils/formatCurrency";

export function hitungSubtotal1700(rows) {
  if (!Array.isArray(rows)) return rows;

  const kode1700 = rows.find((r) => r.kodeAkun == "1700");
  if (!kode1700) return rows;

  const akunTambah = [
    "1101",
    "1105",
    "1106",
    "1155",
    "1152",
    "1160",
    "1142",
    "1143",
    "1149",
    "1561",
    "1271",
    "1600",
    "1631",
    "1633",
    "1634",
    "1521",
    "1535",
    "1401",
    "1611",
    "1421",
    "1698",
  ];

  const akunKurang = ["1131", "1601", "1522", "1658"];

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
    "2141",
    "2142",
    "2162",
    "2161",
    "2156",
    "2204",
    "2205",
    "2211",
    "2214",
    "2314",
    "2321",
    "2998",
    "2221",
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
