import { toNumber } from "@utils/formatCurrency";

export function hitungSubtotal1300(rows) {
  if (!Array.isArray(rows)) return rows;

  const kode1300 = rows.find((r) => r.kodeAkun == "1300");
  if (!kode1300) return rows;
  const akunTambah = [
    "1201",
    "1202",
    "1203",
    "1204",
    "1223",
    "1225",
    "1241",
    "1242",
    "1243",
    "1244",
    "1251",
    "1252",
    "1253",
    "1254",
    "1255",
    "1256",
    "1260",
    "1272",
    "1281",
    "1282",
    "1283",
  ];

  const akunKurang = ["1290"];

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

export function hitungSubtotal1500(rows) {
  if (!Array.isArray(rows)) return rows;

  const kode1500 = rows.find((r) => r.kodeAkun == "1500");
  if (!kode1500) return rows;
  const akunTambah = ["1111", "1423", "1421", "1121", "1122", "1180"];

  const akunKurang = ["1193", "1194", "1195"];

  let totalAsetTidakLancar = 0;

  akunTambah.forEach((kode) => {
    const row = rows.find((r) => r.kodeAkun == kode);
    totalAsetTidakLancar += toNumber(row?.nilaiKomersial);
  });

  akunKurang.forEach((kode) => {
    const row = rows.find((r) => r.kodeAkun == kode);
    totalAsetTidakLancar -= toNumber(row?.nilaiKomersial);
  });
  kode1500.nilaiKomersial = totalAsetTidakLancar;

  return rows;
}

export function hitungSubtotal1679(rows) {
  if (!Array.isArray(rows)) return rows;

  const kode1679 = rows.find((r) => r.kodeAkun == "1679");
  if (!kode1679) return rows;
  const akunTambah = ["1521"];

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
  kode1679.nilaiKomersial = totalAsetTidakLancar;

  return rows;
}

export function hitungSubtotal1700(rows) {
  if (!Array.isArray(rows)) return rows;

  const kode1700 = rows.find((r) => r.kodeAkun == "1700");
  if (!kode1700) return rows;

  const kode1300 = rows.find((r) => r.kodeAkun == "1300");
  const kode1301 = rows.find((r) => r.kodeAkun == "1301");
  const kode1101 = rows.find((r) => r.kodeAkun == "1101");
  const kode1500 = rows.find((r) => r.kodeAkun == "1500");
  const kode1679 = rows.find((r) => r.kodeAkun == "1679");
  const kode1698 = rows.find((r) => r.kodeAkun == "1698");

  const totalInvestasi = toNumber(kode1300?.nilaiKomersial);
  const totalSelisihInvestasi = toNumber(kode1301?.nilaiKomersial);
  const totalKasDanBank = toNumber(kode1101?.nilaiKomersial);
  const totalAsetLancar = toNumber(kode1500?.nilaiKomersial);
  const totalAsetOperasional = toNumber(kode1679?.nilaiKomersial);
  const totalAsetLainLain = toNumber(kode1698?.nilaiKomersial);

  kode1700.nilaiKomersial =
    totalInvestasi +
    totalSelisihInvestasi +
    totalKasDanBank +
    totalAsetLancar +
    totalAsetOperasional +
    totalAsetLainLain;
  return rows;
}

export function hitungSubtotal2900(rows) {
  if (!Array.isArray(rows)) return rows;

  const kode2900 = rows.find((r) => r.kodeAkun == "2900");
  if (!kode2900) return rows;

  const akunEkuitas = ["2183", "2184", "2185", "2203", "2195", "2322", "2998"];

  let total = 0;

  akunEkuitas.forEach((kode) => {
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

  const kode2181 = rows.find((r) => r.kodeAkun == "2181");
  const kode2900 = rows.find((r) => r.kodeAkun == "2900");

  const totalLiabilitasPensiun = toNumber(kode2181?.nilaiKomersial);
  const totalLiabilitasDiluarPensiun = toNumber(kode2900?.nilaiKomersial);

  kode2999.nilaiKomersial = totalLiabilitasPensiun + totalLiabilitasDiluarPensiun;
  return rows;
}
