// Dokumentasi cara menggunakan
// Untuk menampilkan akun tertentu:
//    ...pickByKode(["1101", "1200", "2102"])

export const createLineRow = (akun, level = 0, options = {}) => ({
  id: akun.kodeAkun,
  type: "line",
  variant: options.variant ?? "normal",
  kodeAkun: akun.kodeAkun,
  keterangan: akun.namaAkun,
  level: akun.level ?? level,
  nilai: 0,
  isDeduction: akun.isDeduction ?? false,
});

// MASTER AKUN NERACA (ASET + LIABILITAS + EKUITAS)

export const MASTER_AKUN_NERACA = [
  // AKTIVA
  {
    kodeAkun: "1101",
    jenisPerusahaan: [
      "umum",
      "manufaktur",
      "dagang",
      "jasa",
      "properti",
      "infrastruktur",
      "bank_konvensional",
      "bank_syariah",
      "asuransi",
      "sekuritas",
    ],
    namaAkun: "Kas dan Setara Kas",
  },

  {
    kodeAkun: "1101",
    jenisPerusahaan: ["dana_pensiun"],
    namaAkun: "Kas dan Bank",
  },

  {
    kodeAkun: "1102",
    jenisPerusahaan: ["pembiayaan"],
    namaAkun: "Kas",
  },

  {
    kodeAkun: "1103",
    jenisPerusahaan: ["pembiayaan"],
    namaAkun: "Simpanan Pada Bank Dalam Negeri",
  },

  {
    kodeAkun: "1104",
    jenisPerusahaan: ["pembiayaan"],
    namaAkun: "Simpanan Pada Bank Luar Negeri",
  },

  {
    kodeAkun: "1105",
    jenisPerusahaan: ["bank_konvensional", "bank_syariah"],
    namaAkun: "Penempatan Pada Bank Indonesia",
  },

  {
    kodeAkun: "1106",
    jenisPerusahaan: ["bank_konvensional", "bank_syariah"],
    namaAkun: "Penempatan Pada Bank Lain",
  },
  {
    kodeAkun: "1111",
    jenisPerusahaan: ["dana_pensiun"],
    namaAkun: "Piutang Bunga Keterlambatan Iuran",
  },

  {
    kodeAkun: "1121",
    jenisPerusahaan: ["dana_pensiun"],
    namaAkun: "Piutang Investasi",
  },
  {
    kodeAkun: "1121",
    jenisPerusahaan: ["asuransi"],
    namaAkun: "Tagihan Investasi",
  },
  {
    kodeAkun: "1122",
    jenisPerusahaan: ["umum", "manufaktur", "dagang", "jasa"],
    namaAkun: "Piutang Usaha - Pihak Ketiga",
  },
  {
    kodeAkun: "1122",
    jenisPerusahaan: ["dana_pensiun"],
    namaAkun: "Piutang Hasil Investasi",
  },
  {
    kodeAkun: "1122",
    jenisPerusahaan: ["asuransi"],
    namaAkun: "Tagihan Hasil Investasi",
  },
  {
    kodeAkun: "1123",
    jenisPerusahaan: ["umum", "manufaktur", "dagang", "jasa"],
    namaAkun: "Piutang Usaha - Pihak yang Mempunyai Hubungan Istimewa",
  },
  {
    kodeAkun: "1124",
    jenisPerusahaan: ["umum", "manufaktur", "dagang", "jasa"],
    namaAkun: "Piutang Lainnya - Pihak Ketiga",
  },
  {
    kodeAkun: "1125",
    jenisPerusahaan: ["umum", "manufaktur", "dagang", "jasa"],
    namaAkun: "Piutang Lainnya - Pihak yang Mempunyai Hubungan Istimewa",
  },
  {
    kodeAkun: "1130",
    jenisPerusahaan: ["asuransi"],
    namaAkun: "Tagihan Premi",
  },
  {
    kodeAkun: "1131",
    jenisPerusahaan: ["umum", "manufaktur", "dagang", "properti", "infrastruktur"],
    namaAkun: "Cadangan Kerugian Penurunan Nilai - Aset Lancar",
  },
  {
    kodeAkun: "1131",
    jenisPerusahaan: ["jasa", "asuransi"],
    namaAkun: "Cadangan Kerugian Penurunan Nilai Aset Keuangan",
  },
  {
    kodeAkun: "1131",
    jenisPerusahaan: ["sekuritas"],
    namaAkun: "Cadangan Kerugian Penurunan Nilai",
  },

  {
    kodeAkun: "1131",
    namaAkun: "Cadangan kerugian penurunan nilai Aset Keuangan",
    jenisPerusahaan: ["bank_konvensional", "bank_syariah"],
  },
  {
    kodeAkun: "1132",
    namaAkun: "Tagihan Premi Reasuransi",
    jenisPerusahaan: ["asuransi"],
  },
  {
    kodeAkun: "1133",
    namaAkun: "Tagihan Klaim Koasuransi",
    jenisPerusahaan: ["asuransi"],
  },
  {
    kodeAkun: "1134",
    namaAkun: "Tagihan Klaim Reasuransi",
    jenisPerusahaan: ["asuransi"],
  },
  {
    kodeAkun: "1141",
    namaAkun: "Aset Tagihan Derivatif",
    jenisPerusahaan: ["pembiayaan"],
  },
  {
    kodeAkun: "1141",
    namaAkun: "Pembiayaan Syariah",
    jenisPerusahaan: ["bank_konvensional"],
  },
  {
    kodeAkun: "1142",
    namaAkun: "Pembiayaan bagi hasil Mudharabah",
    jenisPerusahaan: ["bank_syariah"],
  },
  {
    kodeAkun: "1143",
    namaAkun: "Pembiayaan bagi hasil Musyarokah",
    jenisPerusahaan: ["bank_syariah"],
  },
  {
    kodeAkun: "1149",
    namaAkun: "Pembiayaan bagi hasil lainnya",
    jenisPerusahaan: ["bank_syariah"],
  },
  {
    kodeAkun: "1151",
    namaAkun: "Investasi Jangka Pendek dalam Surat Berharga",
    jenisPerusahaan: ["pembiayaan"],
  },
  {
    kodeAkun: "1152",
    namaAkun: "Surat berharga",
    jenisPerusahaan: ["bank_konvensional"],
  },
  {
    kodeAkun: "1152",
    namaAkun: "Surat berharga yang dimiliki",
    jenisPerusahaan: ["bank_syariah"],
  },
  {
    kodeAkun: "1153",
    namaAkun: "Surat berharga yang dijual dengan janji dibeli kembali (repo)",
    jenisPerusahaan: ["bank_konvensional"],
  },
  {
    kodeAkun: "1154",
    namaAkun: "Tagihan atas surat berharga yang dibeli dengan janji dijual kembali",
    jenisPerusahaan: ["bank_konvensional"],
  },
  {
    kodeAkun: "1154",
    namaAkun: "Efek yang dibeli dengan janji dijual kembali",
    jenisPerusahaan: ["sekuritas"],
  },
  {
    kodeAkun: "1155",
    namaAkun: "Tagihan spot dan derivatif",
    jenisPerusahaan: ["bank_konvensional"],
  },
  {
    kodeAkun: "1155",
    namaAkun: "Tagihan spot dan forward - Net",
    jenisPerusahaan: ["bank_syariah"],
  },
  {
    kodeAkun: "1156",
    namaAkun: "Kredit yang diberikan",
    jenisPerusahaan: ["bank_konvensional"],
  },
  {
    kodeAkun: "1157",
    namaAkun: "Tagihan Akseptasi",
    jenisPerusahaan: ["bank_konvensional"],
  },
  {
    kodeAkun: "1158",
    namaAkun: "Efek yang Diperdagangkan",
    jenisPerusahaan: ["sekuritas"],
  },
  {
    kodeAkun: "1159",
    namaAkun: "Deposito pada Lembaga Kliring dan Penjaminan",
    jenisPerusahaan: ["sekuritas"],
  },
  {
    kodeAkun: "1160",
    namaAkun: "Piutang (Murabahah, Istishna, Multijasa, Qardh, Piutang Sewa)",
    jenisPerusahaan: ["bank_syariah"],
  },

  {
    kodeAkun: "1161",
    namaAkun: "Piutang Pembiayaan Investasi Neto",
    jenisPerusahaan: ["pembiayaan"],
  },
  {
    kodeAkun: "1161",
    namaAkun: "Piutang Lembaga Kliring dan Penjaminan",
    jenisPerusahaan: ["sekuritas"],
  },
  {
    kodeAkun: "1162",
    namaAkun: "Piutang Pembiayaan Modal Kerja Neto",
    jenisPerusahaan: ["pembiayaan"],
  },
  {
    kodeAkun: "1163",
    namaAkun: "Piutang Pembiayaan Multiguna Neto",
    jenisPerusahaan: ["pembiayaan"],
  },
  {
    kodeAkun: "1164",
    namaAkun: "Piutang Pembiayaan Jual Beli Berdasarkan Prinsip Syariah Neto",
    jenisPerusahaan: ["pembiayaan"],
  },
  {
    kodeAkun: "1165",
    namaAkun: "Piutang Pembiayaan Investasi Berdasarkan Prinsip Syariah Neto",
    jenisPerusahaan: ["pembiayaan"],
  },
  {
    kodeAkun: "1166",
    namaAkun: "Piutang Pembiayaan Jasa Berdasarkan Prinsip Syariah Neto",
    jenisPerusahaan: ["pembiayaan"],
  },
  {
    kodeAkun: "1171",
    namaAkun: "Piutang Nasabah - Pihak Berelasi",
    jenisPerusahaan: ["sekuritas"],
  },
  {
    kodeAkun: "1172",
    namaAkun: "Piutang Nasabah - Pihak Ketiga",
    jenisPerusahaan: ["sekuritas"],
  },
  {
    kodeAkun: "1173",
    namaAkun: "Piutang Perusahaan Efek lain",
    jenisPerusahaan: ["sekuritas"],
  },
  {
    kodeAkun: "1175",
    namaAkun: "Piutang Kegiatan Manajer Investasi",
    jenisPerusahaan: ["sekuritas"],
  },
  {
    kodeAkun: "1176",
    namaAkun: "Piutang Kegiatan Penjaminan Emisi Efek",
    jenisPerusahaan: ["sekuritas"],
  },
  {
    kodeAkun: "1180",
    namaAkun: "Piutang Lain‐lain",
    jenisPerusahaan: ["properti", "infrastruktur", "sekuritas", "dana_pensiun"],
  },
  {
    kodeAkun: "1180",
    namaAkun: "Piutang Pembiayaan Neto lainnya",
    jenisPerusahaan: ["pembiayaan"],
  },
  {
    kodeAkun: "1181",
    namaAkun: "Aset Kontrak",
    jenisPerusahaan: [
      "umum",
      "manufaktur",
      "dagang",
      "jasa",
      "asuransi",
      "properti",
      "infrastruktur",
      "sekuritas",
      "pembiayaan",
    ],
  },
  {
    kodeAkun: "1191",
    namaAkun: "Aset Reasuransi",
    jenisPerusahaan: ["asuransi"],
  },
  {
    kodeAkun: "1193",
    namaAkun: "Iuran Normal Pemberi Kerja",
    jenisPerusahaan: ["dana_pensiun"],
  },
  {
    kodeAkun: "1194",
    namaAkun: "Iuran Normal Peserta",
    jenisPerusahaan: ["dana_pensiun"],
  },
  {
    kodeAkun: "1195",
    namaAkun: "Iuran Sukarela Peserta",
    jenisPerusahaan: ["dana_pensiun"],
  },
  {
    kodeAkun: "1200",
    namaAkun: "Investasi",
    jenisPerusahaan: ["umum", "manufaktur", "dagang", "jasa"],
  },

  {
    kodeAkun: "1201",
    namaAkun: "Tabungan pada Bank",
    jenisPerusahaan: ["dana_pensiun"],
  },
  {
    kodeAkun: "1202",
    namaAkun: "Deposit on call pada Bank",
    jenisPerusahaan: ["dana_pensiun"],
  },
  {
    kodeAkun: "1203",
    namaAkun: "Deposito Berjangka pada Bank",
    jenisPerusahaan: ["dana_pensiun"],
  },
  {
    kodeAkun: "1203",
    namaAkun: "Deposito Berjangka",
    jenisPerusahaan: ["asuransi"],
  },
  {
    kodeAkun: "1204",
    namaAkun: "Sertifikat Deposito pada Bank",
    jenisPerusahaan: ["dana_pensiun"],
  },
  {
    kodeAkun: "1204",
    namaAkun: "Sertifikat Deposito",
    jenisPerusahaan: ["asuransi"],
  },
  {
    kodeAkun: "1211",
    namaAkun: "Investasi jangka pendek",
    jenisPerusahaan: ["properti", "infrastruktur"],
  },
  {
    kodeAkun: "1212",
    namaAkun: "Aset Keuangan Lancar",
    jenisPerusahaan: ["properti", "infrastruktur"],
  },
  {
    kodeAkun: "1213",
    namaAkun: "Piutang Usaha",
    jenisPerusahaan: ["properti", "infrastruktur"],
  },
  {
    kodeAkun: "1214",
    namaAkun: "Piutang Retensi",
    jenisPerusahaan: ["properti"],
  },
  {
    kodeAkun: "1222",
    namaAkun: "Surat Berharga yang Diterbitkan oleh Bank Indonesia",
    jenisPerusahaan: ["asuransi"],
  },
  {
    kodeAkun: "1223",
    namaAkun: "Surat Berharga yang diterbitkan oleh Bank Indonesia",
    jenisPerusahaan: ["dana_pensiun"],
  },
  {
    kodeAkun: "1224",
    namaAkun: "Surat Berharga yang Diterbitkan oleh Lembaga Multinasional",
    jenisPerusahaan: ["asuransi"],
  },
  {
    kodeAkun: "1225",
    namaAkun: "Surat Berharga Negara",
    jenisPerusahaan: ["dana_pensiun"],
  },
  {
    kodeAkun: "1226",
    namaAkun: "Surat Berharga yang Diterbitkan oleh RI",
    jenisPerusahaan: ["asuransi"],
  },
  {
    kodeAkun: "1227",
    namaAkun: "Surat Berharga yang Diterbitkan oleh Negara Selain RI",
    jenisPerusahaan: ["asuransi"],
  },
  {
    kodeAkun: "1232",
    namaAkun: "Saham",
    jenisPerusahaan: ["asuransi"],
  },
  {
    kodeAkun: "1241",
    namaAkun: "Saham yang Tercatat di Bursa Efek di Indonesia",
    jenisPerusahaan: ["dana_pensiun"],
  },
  {
    kodeAkun: "1241",
    namaAkun: "Penyertaan pada bursa efek indonesia",
    jenisPerusahaan: ["sekuritas"],
  },
  {
    kodeAkun: "1242",
    namaAkun: "Obligasi Korporasi yang Tercatat di Bursa Efek di Indonesia",
    jenisPerusahaan: ["dana_pensiun"],
  },
  {
    kodeAkun: "1243",
    namaAkun: "Sukuk Korporasi yang Tercatat di Bursa Efek di Indonesia",
    jenisPerusahaan: ["dana_pensiun"],
  },
  {
    kodeAkun: "1244",
    namaAkun: "Obligasi/Sukuk Daerah",
    jenisPerusahaan: ["dana_pensiun"],
  },
  {
    kodeAkun: "1244",
    namaAkun: "Obligasi Korporasi",
    jenisPerusahaan: ["asuransi"],
  },
  {
    kodeAkun: "1251",
    namaAkun: "Reksa Dana",
    jenisPerusahaan: ["dana_pensiun", "asuransi"],
  },
  {
    kodeAkun: "1252",
    namaAkun: "Medium Term Note (MTN)",
    jenisPerusahaan: ["dana_pensiun", "asuransi"],
  },
  {
    kodeAkun: "1253",
    namaAkun: "Efek Bangun Aset",
    jenisPerusahaan: ["dana_pensiun", "asuransi"],
  },
  {
    kodeAkun: "1254",
    namaAkun: "Dana investasi real estat berbentuk kontrak investasi kolektif",
    jenisPerusahaan: ["dana_pensiun"],
  },
  {
    kodeAkun: "1254",
    namaAkun: "Dana Investasi Real Estate",
    jenisPerusahaan: ["asuransi"],
  },
  {
    kodeAkun: "1255",
    namaAkun: "Dana investasi infrastruktur berbentuk kontrak investasi kolektif",
    jenisPerusahaan: ["dana_pensiun"],
  },
  {
    kodeAkun: "1256",
    namaAkun: "Kontrak opsi dan kontrak berjangka efek yang tercatat di Bursa Efek di Indonesia",
    jenisPerusahaan: ["dana_pensiun"],
  },
  {
    kodeAkun: "1260",
    namaAkun: "REPO",
    jenisPerusahaan: ["dana_pensiun", "asuransi"],
  },

  {
    kodeAkun: "1261",
    namaAkun: "Piutang Reverse Repo",
    jenisPerusahaan: ["sekuritas"],
  },
  {
    kodeAkun: "1271",
    namaAkun: "Penyertaan",
    jenisPerusahaan: ["bank_konvensional"],
  },
  {
    kodeAkun: "1271",
    namaAkun: "Penyertaan Modal",
    jenisPerusahaan: ["bank_syariah"],
  },
  {
    kodeAkun: "1272",
    namaAkun: "Penyertaan Langsung",
    jenisPerusahaan: ["dana_pensiun", "asuransi"],
  },
  {
    kodeAkun: "1281",
    namaAkun: "Tanah di Indonesia",
    jenisPerusahaan: ["dana_pensiun"],
  },
  {
    kodeAkun: "1282",
    namaAkun: "Bangunan di Indonesia",
    jenisPerusahaan: ["dana_pensiun"],
  },
  {
    kodeAkun: "1282",
    namaAkun: "Tanah, Bangunan dengan Hak Strata, atau Tanah dengan Bangunan, untuk Investasi",
    jenisPerusahaan: ["asuransi"],
  },
  {
    kodeAkun: "1283",
    namaAkun: "Tanah dan Bangunan di Indonesia",
    jenisPerusahaan: ["dana_pensiun"],
  },
  {
    kodeAkun: "1290",
    namaAkun: "Akumulasi Penyusutan Bangunan",
    jenisPerusahaan: ["dana_pensiun"],
  },
  {
    kodeAkun: "1291",
    namaAkun: "Pembiayaan Melalui Kerjasama dengan Pihak Lain (Executing)",
    jenisPerusahaan: ["asuransi"],
  },
  {
    kodeAkun: "1292",
    namaAkun: "Emas Murni",
    jenisPerusahaan: ["asuransi"],
  },
  {
    kodeAkun: "1293",
    namaAkun: "Pinjaman yang Dijamin dengan Hak Tanggungan",
    jenisPerusahaan: ["asuransi"],
  },
  {
    kodeAkun: "1294",
    namaAkun: "Pinjaman Polis",
    jenisPerusahaan: ["asuransi"],
  },
  {
    kodeAkun: "1299",
    namaAkun: "Investasi Lain",
    jenisPerusahaan: ["asuransi"],
  },
  {
    kodeAkun: "1300",
    namaAkun: "Jumlah Investasi",
    jenisPerusahaan: ["dana_pensiun", "asuransi"],
  },
  {
    kodeAkun: "1301",
    namaAkun: "Selisih Penilaian Investasi",
    jenisPerusahaan: ["dana_pensiun"],
  },
  {
    kodeAkun: "1401",
    namaAkun: "Persediaan",
    jenisPerusahaan: ["umum", "dagang", "jasa", "infrastruktur"],
  },
  {
    kodeAkun: "1401",
    namaAkun: "Persediaan Lancar",
    jenisPerusahaan: ["properti"],
  },
  {
    kodeAkun: "1401",
    namaAkun: "Persediaan (Aset untuk dijual kembali)",
    jenisPerusahaan: ["bank_syariah"],
  },
  {
    kodeAkun: "1402",
    namaAkun: "Persediaan Bahan Baku",
    jenisPerusahaan: ["manufaktur"],
  },
  {
    kodeAkun: "1403",
    namaAkun: "Persediaan Barang Dalam Proses",
    jenisPerusahaan: ["manufaktur"],
  },
  {
    kodeAkun: "1404",
    namaAkun: "Persediaan Barang Jadi",
    jenisPerusahaan: ["manufaktur"],
  },
  {
    kodeAkun: "1405",
    namaAkun: "Aset yang Dimiliki untuk Dijual",
    jenisPerusahaan: ["umum", "manufaktur"],
  },
  {
    kodeAkun: "1421",
    namaAkun: "Beban Dibayar di Muka",
    jenisPerusahaan: [
      "umum",
      "manufaktur",
      "dagang",
      "jasa",
      "properti",
      "infrastruktur",
      "bank_konvensional",
      "bank_syariah",
      "sekuritas",
      "dana_pensiun",
    ],
  },
  {
    kodeAkun: "1422",
    namaAkun: "Uang Muka",
    jenisPerusahaan: ["umum", "manufaktur", "dagang", "jasa", "properti", "infrastruktur"],
  },
  {
    kodeAkun: "1423",
    namaAkun: "Pajak Dibayar di Muka",
    jenisPerusahaan: [
      "umum",
      "manufaktur",
      "dagang",
      "jasa",
      "properti",
      "infrastruktur",
      "sekuritas",
      "pembiayaan",
      "dana_pensiun",
    ],
  },
  {
    kodeAkun: "1499",
    namaAkun: "Aset Lancar Lainnya",
    jenisPerusahaan: ["umum", "manufaktur", "dagang", "jasa", "properti", "infrastruktur"],
  },
  {
    kodeAkun: "1500",
    namaAkun: "Jumlah Aset Lancar",
    jenisPerusahaan: ["dagang", "properti", "infrastruktur"],
  },
  {
    kodeAkun: "1500",
    namaAkun: "Jumlah Aset Lancar di Luar Investasi",
    jenisPerusahaan: ["dana_pensiun"],
  },

  {
    kodeAkun: "1501",
    namaAkun: "Piutang Jangka Panjang",
    jenisPerusahaan: ["umum", "manufaktur", "dagang", "jasa"],
  },
  {
    kodeAkun: "1511",
    namaAkun: "Investasi pada Perusahaan Asosiasi, Ventura Bersama, dan Anak Perusahaan",
    jenisPerusahaan: ["pembiayaan"],
  },
  {
    kodeAkun: "1518",
    namaAkun: "Piutang Konsesi",
    jenisPerusahaan: ["infrastruktur"],
  },
  {
    kodeAkun: "1519",
    namaAkun: "Piutang tidak lancar lainnya",
    jenisPerusahaan: ["properti", "infrastruktur"],
  },
  {
    kodeAkun: "1520",
    namaAkun: "Properti Investasi",
    jenisPerusahaan: ["umum", "manufaktur", "dagang"],
  },
  {
    kodeAkun: "1521",
    namaAkun: "Aset tetap dan inventaris",
    jenisPerusahaan: ["jasa", "infrastruktur", "bank_konvensional"],
  },
  {
    kodeAkun: "1521",
    namaAkun: "Aset Operasional",
    jenisPerusahaan: ["dana_pensiun"],
  },
  {
    kodeAkun: "1521",
    namaAkun:
      "Bangunan dengan Hak Strata atau Tanah dengan Bangunan untuk Dipakai Sendiri dan Aset Tetap Lain",
    jenisPerusahaan: ["asuransi"],
  },
  {
    kodeAkun: "1521",
    namaAkun: "Aset tetap",
    jenisPerusahaan: ["properti", "bank_syariah", "pembiayaan"],
  },

  {
    kodeAkun: "1521",
    namaAkun: "Aset tetap (Property, Plant, & Equipment)",
    jenisPerusahaan: ["sekuritas"],
  },
  {
    kodeAkun: "1522",
    namaAkun: "Akumulasi Penyusutan Aset Operasional",
    jenisPerusahaan: ["dana_pensiun"],
  },
  {
    kodeAkun: "1522",
    namaAkun: "Akumulasi penyusutan aset tetap dan inventaris",
    jenisPerusahaan: ["jasa", "properti", "infrastruktur", "bank_konvensional", "bank_syariah"],
  },
  {
    kodeAkun: "1522",
    namaAkun: "Beban Akumulasi Penyusutan",
    jenisPerusahaan: ["asuransi"],
  },
  {
    kodeAkun: "1522",
    namaAkun: "Akumulasi penyusutan-Aset tetap",
    jenisPerusahaan: ["sekuritas", "pembiayaan"],
  },
  {
    kodeAkun: "1523",
    namaAkun: "Tanah dan Bangunan",
    jenisPerusahaan: ["umum", "manufaktur", "dagang"],
  },
  {
    kodeAkun: "1524",
    namaAkun: "Akumulasi Penyusutan - Tanah dan Bangunan",
    jenisPerusahaan: ["umum", "manufaktur", "dagang"],
  },
  {
    kodeAkun: "1525",
    namaAkun: "Peralatan",
    jenisPerusahaan: ["manufaktur"],
  },
  {
    kodeAkun: "1526",
    namaAkun: "Akumulasi Penyusutan - Peralatan",
    jenisPerusahaan: ["manufaktur"],
  },
  {
    kodeAkun: "1527",
    namaAkun: "Mesin",
    jenisPerusahaan: ["manufaktur"],
  },
  {
    kodeAkun: "1528",
    namaAkun: "Akumulasi Penyusutan - Mesin",
    jenisPerusahaan: ["manufaktur"],
  },
  {
    kodeAkun: "1529",
    namaAkun: "Aset Tetap Lainnya",
    jenisPerusahaan: ["umum", "manufaktur", "dagang"],
  },
  {
    kodeAkun: "1530",
    namaAkun: "Akumulasi Penyusutan - Aset Tetap Lainnya",
    jenisPerusahaan: ["umum", "manufaktur", "dagang"],
  },

  {
    kodeAkun: "1531",
    namaAkun: "Aset Biologis",
    jenisPerusahaan: ["umum"],
  },
  {
    kodeAkun: "1533",
    namaAkun: "Aset Hak Guna",
    jenisPerusahaan: ["umum", "manufaktur", "dagang", "pembiayaan", "properti"],
  },

  {
    kodeAkun: "1534",
    namaAkun: "Akumulasi Penyusutan - Aset Hak Guna",
    jenisPerusahaan: ["umum", "manufaktur", "dagang", "pembiayaan", "properti"],
  },
  {
    kodeAkun: "1535",
    namaAkun: "Aset Non Produktif",
    jenisPerusahaan: ["bank_konvensional"],
  },
  {
    kodeAkun: "1535",
    namaAkun: "Properti terbengkalai",
    jenisPerusahaan: ["bank_syariah"],
  },
  {
    kodeAkun: "1541",
    namaAkun: "Investasi Pada Perusaaan Asosiasi",
    jenisPerusahaan: ["dagang"],
  },
  {
    kodeAkun: "1542",
    namaAkun: "Investasi yang dicatat dengan menggunakan metode ekuitas",
    jenisPerusahaan: ["properti"],
  },
  {
    kodeAkun: "1551",
    namaAkun: "Investasi pada Perusahaan Asosiasi, Ventura Bersama, dan Anak Perusahaan",
    jenisPerusahaan: [
      "umum",
      "manufaktur",
      "dagang",
      "jasa",
      "properti",
      "infrastruktur",
      "sekuritas",
    ],
  },
  {
    kodeAkun: "1555",
    namaAkun: "Penyertaan Modal Pada Bank",
    jenisPerusahaan: ["pembiayaan"],
  },
  {
    kodeAkun: "1556",
    namaAkun: "Penyertaan Modal pada Perusahaan Jasa Keuangan Lainnya",
    jenisPerusahaan: ["pembiayaan"],
  },
  {
    kodeAkun: "1561",
    namaAkun: "Sewa Pembiayaan",
    jenisPerusahaan: ["bank_konvensional"],
  },
  {
    kodeAkun: "1561",
    namaAkun:
      "Pembiayaan sewa (Ijarah, Akumulasi Penyusutan, cadangan kerugian penurunan nilai (impairment))",
    jenisPerusahaan: ["bank_syariah"],
  },
  {
    kodeAkun: "1571",
    namaAkun: "Aset Keuangan-Tidak Lancar",
    jenisPerusahaan: ["infrastruktur"],
  },

  {
    kodeAkun: "1573",
    namaAkun: "Biaya Dibayar di Muka-Tidak Lancar",
    jenisPerusahaan: ["properti", "infrastruktur"],
  },
  {
    kodeAkun: "1574",
    namaAkun: "Pajak Dibayar di Muka-Tidak Lancar",
    jenisPerusahaan: ["properti", "infrastruktur"],
  },
  {
    kodeAkun: "1583",
    namaAkun: "Persediaan tidak lancar",
    jenisPerusahaan: ["properti"],
  },
  {
    kodeAkun: "1590",
    namaAkun: "Investasi jangka panjang dalam Surat Berharga",
    jenisPerusahaan: ["pembiayaan"],
  },
  {
    kodeAkun: "1599",
    namaAkun: "Investasi Jangka Panjang Lainnya",
    jenisPerusahaan: ["umum", "manufaktur", "dagang", "jasa"],
  },
  {
    kodeAkun: "1600",
    namaAkun: "Aset Tak Berwujud",
    jenisPerusahaan: ["umum", "manufaktur", "dagang", "jasa", "bank_konvensional", "bank_syariah"],
  },

  {
    kodeAkun: "1601",
    namaAkun: "Akumulasi Amortisasi - Aset Tak Berwujud",
    jenisPerusahaan: [
      "umum",
      "manufaktur",
      "dagang",
      "jasa",
      "properti",
      "infrastruktur",
      "bank_konvensional",
      "bank_syariah",
    ],
  },
  {
    kodeAkun: "1611",
    namaAkun: "Aset Pajak Tangguhan",
    jenisPerusahaan: [
      "umum",
      "manufaktur",
      "dagang",
      "jasa",
      "properti",
      "infrastruktur",
      "bank_konvensional",
      "bank_syariah",
      "sekuritas",
      "pembiayaan",
    ],
  },
  {
    kodeAkun: "1612",
    namaAkun: "Beban tangguhan",
    jenisPerusahaan: ["properti"],
  },
  {
    kodeAkun: "1613",
    namaAkun: "Biaya Akuisisi yang Ditangguhkan",
    jenisPerusahaan: ["asuransi"],
  },
  {
    kodeAkun: "1621",
    namaAkun: "Properti investasi",
    jenisPerusahaan: ["properti", "infrastruktur", "sekuritas"],
  },
  {
    kodeAkun: "1631",
    namaAkun: "Salam",
    jenisPerusahaan: ["bank_syariah"],
  },
  {
    kodeAkun: "1633",
    namaAkun: "Aset Istishna' dalam penyelesaian",
    jenisPerusahaan: ["bank_syariah"],
  },
  {
    kodeAkun: "1634",
    namaAkun: "Termin Istishna'",
    jenisPerusahaan: ["bank_syariah"],
  },
  {
    kodeAkun: "1651",
    namaAkun: "Klaim atas Pengembalian Pajak",
    jenisPerusahaan: ["umum", "manufaktur", "dagang", "jasa", "sekuritas", "pembiayaan"],
  },
  {
    kodeAkun: "1655",
    namaAkun: "Hak Konsesi",
    jenisPerusahaan: ["infrastruktur"],
  },
  {
    kodeAkun: "1658",
    namaAkun: "Cadangan Kerugian Penurunan Nilai - Aset Tidak Lancar",
    jenisPerusahaan: ["umum", "manufaktur", "dagang", "jasa", "properti", "infrastruktur"],
  },
  {
    kodeAkun: "1658",
    namaAkun: "Cadangan kerugian penurunan nilai aset non keuangan",
    jenisPerusahaan: ["bank_konvensional", "bank_syariah"],
  },
  {
    kodeAkun: "1658",
    namaAkun: "Cadangan Kerugian Penurunan Nilai",
    jenisPerusahaan: ["pembiayaan"],
  },
  {
    kodeAkun: "1679",
    namaAkun: "Jumlah Aset Operasional",
    jenisPerusahaan: ["dana_pensiun"],
  },
  {
    kodeAkun: "1698",
    namaAkun: "Aset Tidak Lancar Lainnya",
    jenisPerusahaan: ["umum", "manufaktur", "dagang", "jasa", "infrastruktur"],
  },
  {
    kodeAkun: "1698",
    namaAkun: "Aset Lainnya",
    jenisPerusahaan: [
      "bank_konvensional",
      "bank_syariah",
      "sekuritas",
      "asuransi",
      "pembiayaan",
      "dana_pensiun",
    ],
  },
  {
    kodeAkun: "1699",
    namaAkun: "Jumlah Aset Tidak Lancar",
    jenisPerusahaan: ["dagang", "properti", "infrastruktur"],
  },
  {
    kodeAkun: "1700",
    namaAkun: "Jumlah Aset",
    jenisPerusahaan: [
      "umum",
      "manufaktur",
      "dagang",
      "jasa",
      "bank_konvensional",
      "dana_pensiun",
      "asuransi",
      "properti",
      "bank_syariah",
      "infrastruktur",
      "sekuritas",
      "pembiayaan",
    ],
  },

  // PASIVA

  {
    kodeAkun: "2102",
    namaAkun: "Utang Usaha - Pihak Ketiga",
    jenisPerusahaan: ["umum", "manufaktur", "dagang", "jasa"],
  },
  {
    kodeAkun: "2103",
    namaAkun: "Utang Usaha - Pihak yang Mempunyai Hubungan Istimewa",
    jenisPerusahaan: ["umum", "manufaktur", "dagang", "jasa"],
  },
  {
    kodeAkun: "2111",
    namaAkun: "Utang Bunga",
    jenisPerusahaan: ["umum", "manufaktur", "dagang", "jasa"],
  },
  {
    kodeAkun: "2121",
    namaAkun: "Utang Usaha",
    jenisPerusahaan: ["properti", "infrastruktur"],
  },
  {
    kodeAkun: "2122",
    namaAkun: "Surat Utang Jangka Pendek",
    jenisPerusahaan: ["sekuritas"],
  },
  {
    kodeAkun: "2123",
    namaAkun: "Utang Repo",
    jenisPerusahaan: ["sekuritas"],
  },
  {
    kodeAkun: "2124",
    namaAkun: "Utang Obligasi",
    jenisPerusahaan: ["sekuritas"],
  },
  {
    kodeAkun: "2126",
    namaAkun: "Utang pada Lembaga Kliring dan Penjaminan",
    jenisPerusahaan: ["sekuritas"],
  },
  {
    kodeAkun: "2131",
    namaAkun: "Utang Nasabah - Pihak Berelasi",
    jenisPerusahaan: ["sekuritas"],
  },
  {
    kodeAkun: "2132",
    namaAkun: "Utang Nasabah - Pihak Ketiga",
    jenisPerusahaan: ["sekuritas"],
  },
  {
    kodeAkun: "2133",
    namaAkun: "Utang Perusahaan Efek lain",
    jenisPerusahaan: ["sekuritas"],
  },
  {
    kodeAkun: "2134",
    namaAkun: "Utang Kegiatan Manajer Investasi",
    jenisPerusahaan: ["sekuritas"],
  },
  {
    kodeAkun: "2135",
    namaAkun: "Utang Kegiatan Penjaminan Emisi Efek",
    jenisPerusahaan: ["sekuritas"],
  },
  {
    kodeAkun: "2140",
    namaAkun: "Giro",
    jenisPerusahaan: ["bank_konvensional"],
  },
  {
    kodeAkun: "2141",
    namaAkun: "Tabungan",
    jenisPerusahaan: ["bank_konvensional"],
  },
  {
    kodeAkun: "2141",
    namaAkun: "Dana simpanan (Tabungan dan Giro Wadiah)",
    jenisPerusahaan: ["bank_syariah"],
  },
  {
    kodeAkun: "2142",
    namaAkun: "Dana investasi non profit sharing (Giro + Tabungan + Deposito)",
    jenisPerusahaan: ["bank_syariah"],
  },
  {
    kodeAkun: "2151",
    namaAkun: "Uang Jaminan Jangka Pendek",
    jenisPerusahaan: ["properti"],
  },
  {
    kodeAkun: "2152",
    namaAkun: "Simpanan berjangka",
    jenisPerusahaan: ["bank_konvensional"],
  },
  {
    kodeAkun: "2155",
    namaAkun: "Utang atas surat berharga yang dijual dengan janji dibeli kembali (repo)",
    jenisPerusahaan: ["bank_konvensional"],
  },
  {
    kodeAkun: "2156",
    namaAkun: "Liabilitas spot dan derivatif",
    jenisPerusahaan: ["bank_konvensional"],
  },
  {
    kodeAkun: "2156",
    namaAkun: "Liabilitas spot dan forward",
    jenisPerusahaan: ["bank_syariah"],
  },
  {
    kodeAkun: "2157",
    namaAkun: "Utang Akseptasi",
    jenisPerusahaan: ["bank_konvensional"],
  },
  {
    kodeAkun: "2160",
    namaAkun: "Dana investasi revenue sharing",
    jenisPerusahaan: ["bank_konvensional"],
  },
  {
    kodeAkun: "2161",
    namaAkun: "Liabilitas kepada bank lain",
    jenisPerusahaan: ["bank_syariah"],
  },
  {
    kodeAkun: "2162",
    namaAkun: "Pinjaman dari Bank Indonesia",
    jenisPerusahaan: ["bank_konvensional"],
  },
  {
    kodeAkun: "2162",
    namaAkun: "Liabilitas kepada Bank Indonesia",
    jenisPerusahaan: ["bank_syariah"],
  },
  {
    kodeAkun: "2163",
    namaAkun: "Pinjaman dari Bank Lain",
    jenisPerusahaan: ["bank_konvensional"],
  },
  {
    kodeAkun: "2164",
    namaAkun: "Liabilitas Derivatif",
    jenisPerusahaan: ["pembiayaan"],
  },
  {
    kodeAkun: "2165",
    namaAkun: "Utang Reasuransi",
    jenisPerusahaan: ["asuransi"],
  },
  {
    kodeAkun: "2166",
    namaAkun: "Utang Komisi",
    jenisPerusahaan: ["asuransi"],
  },
  {
    kodeAkun: "2167",
    namaAkun: "Utang Klaim",
    jenisPerusahaan: ["asuransi"],
  },
  {
    kodeAkun: "2168",
    namaAkun: "Utang Koasuransi",
    jenisPerusahaan: ["asuransi"],
  },
  {
    kodeAkun: "2171",
    namaAkun: "Cadangan Premi",
    jenisPerusahaan: ["asuransi"],
  },
  {
    kodeAkun: "2172",
    namaAkun: "Cadangan atas Premi Yang Belum Merupakan Pendapatan (CAPYBMP)",
    jenisPerusahaan: ["asuransi"],
  },
  {
    kodeAkun: "2173",
    namaAkun: "Cadangan Klaim",
    jenisPerusahaan: ["asuransi"],
  },
  {
    kodeAkun: "2174",
    namaAkun: "Cadangan atas Risiko Bencana",
    jenisPerusahaan: ["asuransi"],
  },
  {
    kodeAkun: "2181",
    namaAkun: "Liabilitas Manfaat Pensiun",
    jenisPerusahaan: ["dana_pensiun"],
  },
  {
    kodeAkun: "2183",
    namaAkun: "Utang Manfaat Pensiun dan Manfaat Lain Jatuh Tempo",
    jenisPerusahaan: ["dana_pensiun"],
  },
  {
    kodeAkun: "2184",
    namaAkun: "Utang Manfaat Sukarela",
    jenisPerusahaan: ["dana_pensiun"],
  },
  {
    kodeAkun: "2185",
    namaAkun: "Utang Investasi",
    jenisPerusahaan: ["dana_pensiun"],
  },
  {
    kodeAkun: "2186",
    namaAkun: "Liabilitas Kontrak",
    jenisPerusahaan: [
      "umum",
      "manufaktur",
      "dagang",
      "jasa",
      "properti",
      "infrastruktur",
      "asuransi",
      "sekuritas",
    ],
  },
  {
    kodeAkun: "2187",
    namaAkun: "Liabilitas Sewa Jangka Pendek",
    jenisPerusahaan: ["umum", "manufaktur", "dagang", "jasa", "properti"],
  },
  {
    kodeAkun: "2187",
    namaAkun: "Liabilitas Sewa",
    jenisPerusahaan: ["infrastruktur"],
  },
  {
    kodeAkun: "2191",
    namaAkun: "Utang Pajak",
    jenisPerusahaan: [
      "umum",
      "manufaktur",
      "dagang",
      "jasa",
      "properti",
      "infrastruktur",
      "pembiayaan",
      "bank_konvensional",
      "asuransi",
      "sekuritas",
    ],
  },
  {
    kodeAkun: "2192",
    namaAkun: "Utang Dividen",
    jenisPerusahaan: ["umum", "manufaktur", "dagang", "jasa", "properti"],
  },
  {
    kodeAkun: "2193",
    namaAkun: "Utang Proyek",
    jenisPerusahaan: ["infrastruktur"],
  },

  {
    kodeAkun: "2194",
    namaAkun: "Utang Lainnya",
    jenisPerusahaan: ["asuransi", "properti", "infrastruktur"],
  },
  {
    kodeAkun: "2195",
    namaAkun: "Beban yang Masih Harus Dibayar",
    jenisPerusahaan: [
      "umum",
      "manufaktur",
      "dagang",
      "jasa",
      "dana_pensiun",
      "asuransi",
      "sekuritas",
    ],
  },
  {
    kodeAkun: "2195",
    namaAkun: "Biaya yang Masih Harus Dibayar-Jangka Pendek",
    jenisPerusahaan: ["properti"],
  },
  {
    kodeAkun: "2196",
    namaAkun: "Beban Yang Masih Harus Dibayar",
    jenisPerusahaan: ["dagang"],
  },
  {
    kodeAkun: "2201",
    namaAkun: "Utang Bank Jangka Pendek",
    jenisPerusahaan: ["umum", "manufaktur", "dagang", "jasa"],
  },
  {
    kodeAkun: "2201",
    namaAkun: "Pinjaman jangka pendek",
    jenisPerusahaan: ["properti", "infrastruktur"],
  },
  {
    kodeAkun: "2201",
    namaAkun: "Liabilitas Jangka Pendek Kepada Bank",
    jenisPerusahaan: ["pembiayaan"],
  },

  {
    kodeAkun: "2202",
    namaAkun: "Utang Jangka Panjang yang Jatuh Tempo dalam Satu Tahun",
    jenisPerusahaan: ["umum", "manufaktur", "dagang", "jasa", "infrastruktur"],
  },
  {
    kodeAkun: "2202",
    namaAkun: "Utang Jangka Panjang",
    jenisPerusahaan: ["sekuritas"],
  },
  {
    kodeAkun: "2203",
    namaAkun: "Pendapatan Diterima di Muka",
    jenisPerusahaan: [
      "umum",
      "manufaktur",
      "dagang",
      "jasa",
      "properti",
      "infrastruktur",
      "dana_pensiun",
    ],
  },
  {
    kodeAkun: "2204",
    namaAkun: "Surat Berharga yang Diterbitkan",
    jenisPerusahaan: ["bank_konvensional", "bank_syariah", "pembiayaan"],
  },
  {
    kodeAkun: "2205",
    namaAkun: "Liabilitas akseptasi",
    jenisPerusahaan: ["bank_syariah"],
  },
  {
    kodeAkun: "2211",
    namaAkun: "Pinjaman yang Diterima",
    jenisPerusahaan: ["bank_konvensional", "bank_syariah"],
  },
  {
    kodeAkun: "2212",
    namaAkun: "Pinjaman yang Diterima Dalam Negeri",
    jenisPerusahaan: ["pembiayaan"],
  },
  {
    kodeAkun: "2213",
    namaAkun: "Pinjaman yang Diterima dari Luar Negeri",
    jenisPerusahaan: ["pembiayaan"],
  },
  {
    kodeAkun: "2214",
    namaAkun: "Setoran Jaminan",
    jenisPerusahaan: ["bank_konvensional", "bank_syariah"],
  },
  {
    kodeAkun: "2221",
    namaAkun: "Dana Investasi Profit Sharing",
    jenisPerusahaan: ["bank_konvensional", "bank_syariah"],
  },
  {
    kodeAkun: "2228",
    namaAkun: "Liabilitas Jangka Pendek Lainnya",
    jenisPerusahaan: [
      "umum",
      "manufaktur",
      "dagang",
      "jasa",
      "properti",
      "infrastruktur",
      "pembiayaan",
    ],
  },
  {
    kodeAkun: "2229",
    namaAkun: "Jumlah Liabilitas Jangka Pendek",
    jenisPerusahaan: ["dagang", "properti", "infrastruktur"],
  },
  {
    kodeAkun: "2301",
    namaAkun: "Utang Bank Jangka Panjang",
    jenisPerusahaan: ["umum", "manufaktur", "dagang", "jasa"],
  },
  {
    kodeAkun: "2301",
    namaAkun: "Pinjaman Jangka Panjang-Pinjaman Lembaga Keuangan",
    jenisPerusahaan: ["properti"],
  },
  {
    kodeAkun: "2301",
    namaAkun: "Utang Jangka Panjang - Pinjaman Lembaga Keuangan",
    jenisPerusahaan: ["infrastruktur"],
  },
  {
    kodeAkun: "2302",
    namaAkun: "Pinjaman Jangka Panjang-Surat Berharga",
    jenisPerusahaan: ["properti"],
  },
  {
    kodeAkun: "2302",
    namaAkun: "Utang Jangka Panjang - Surat Berharga",
    jenisPerusahaan: ["infrastruktur"],
  },
  {
    kodeAkun: "2303",
    namaAkun: "Utang Jangka Panjang - Pihak Ketiga",
    jenisPerusahaan: ["umum", "manufaktur", "dagang", "jasa"],
  },
  {
    kodeAkun: "2304",
    namaAkun: "Utang Jangka Panjang - Pihak yang Mempunyai Hubungan Istimewa",
    jenisPerusahaan: ["umum", "manufaktur", "dagang", "jasa"],
  },
  {
    kodeAkun: "2306",
    namaAkun: "Pinjaman Jangka Panjang-Lainnya",
    jenisPerusahaan: ["properti"],
  },
  {
    kodeAkun: "2306",
    namaAkun: "Utang Jangka Panjang - Lainnya",
    jenisPerusahaan: ["infrastruktur"],
  },
  {
    kodeAkun: "2311",
    namaAkun: "Liabilitas Kontrak",
    jenisPerusahaan: ["infrastruktur", "pembiayaan"],
  },
  {
    kodeAkun: "2312",
    namaAkun: "Liabilitas Sewa Jangka Panjang",
    jenisPerusahaan: ["umum", "manufaktur", "dagang", "jasa", "properti", "infrastruktur"],
  },
  {
    kodeAkun: "2312",
    namaAkun: "Liabilitas Sewa",
    jenisPerusahaan: ["pembiayaan"],
  },
  {
    kodeAkun: "2313",
    namaAkun: "Provisi",
    jenisPerusahaan: ["infrastruktur"],
  },

  {
    kodeAkun: "2321",
    namaAkun: "Liabilitas Pajak Tangguhan",
    jenisPerusahaan: [
      "umum",
      "manufaktur",
      "dagang",
      "jasa",
      "properti",
      "infrastruktur",
      "bank_konvensional",
      "sekuritas",
      "pembiayaan",
      "bank_syariah",
    ],
  },
  {
    kodeAkun: "2322",
    namaAkun: "Liabilitas Imbalan Kerja",
    jenisPerusahaan: [
      "umum",
      "manufaktur",
      "dagang",
      "jasa",
      "properti",
      "infrastruktur",
      "dana_pensiun",
      "asuransi",
      "sekuritas",
      "pembiayaan",
    ],
  },
  {
    kodeAkun: "2323",
    namaAkun: "Kewajiban Imbalan Pasca Kerja",
    jenisPerusahaan: ["sekuritas"],
  },
  {
    kodeAkun: "2341",
    namaAkun: "Uang Jaminan Jangka Panjang",
    jenisPerusahaan: ["properti"],
  },
  {
    kodeAkun: "2342",
    namaAkun: "Uang Muka Pelanggan Jangka Panjang",
    jenisPerusahaan: ["properti"],
  },
  {
    kodeAkun: "2344",
    namaAkun: "Utang Pihak Berelasi Jangka Panjang",
    jenisPerusahaan: ["infrastruktur"],
  },
  {
    kodeAkun: "2345",
    namaAkun: "Utang Pemegang Saham Jangka Panjang",
    jenisPerusahaan: ["infrastruktur"],
  },
  {
    kodeAkun: "2361",
    namaAkun: "Pinjaman Subordinasi",
    jenisPerusahaan: ["asuransi"],
  },
  {
    kodeAkun: "2361",
    namaAkun: "Utang Subordinasi",
    jenisPerusahaan: ["sekuritas"],
  },
  {
    kodeAkun: "2362",
    namaAkun: "Pinjaman Subordinasi Dalam Negeri",
    jenisPerusahaan: ["pembiayaan"],
  },
  {
    kodeAkun: "2363",
    namaAkun: "Pinjaman Subordinasi Luar Negeri",
    jenisPerusahaan: ["pembiayaan"],
  },
  {
    kodeAkun: "2900",
    namaAkun: "Jumlah Liabilitas di Luar Liabilitas Manfaat Pensiun",
    jenisPerusahaan: ["dana_pensiun"],
  },
  {
    kodeAkun: "2900",
    namaAkun: "Jumlah liabilitas jangka panjang",
    jenisPerusahaan: ["properti", "infrastruktur"],
  },
  {
    kodeAkun: "2998",
    namaAkun: "Liabilitas Jangka Panjang Lainnya",
    jenisPerusahaan: ["umum", "manufaktur", "dagang", "jasa", "properti", "infrastruktur"],
  },
  {
    kodeAkun: "2998",
    namaAkun: "Utang lainnya",
    jenisPerusahaan: ["bank_konvensional"],
  },
  {
    kodeAkun: "2998",
    namaAkun: "Liabilitas Lainnya",
    jenisPerusahaan: ["dana_pensiun", "asuransi", "bank_syariah", "sekuritas"],
  },
  {
    kodeAkun: "2999",
    namaAkun: "Jumlah Liabilitas",
    jenisPerusahaan: [
      "umum",
      "manufaktur",
      "dagang",
      "jasa",
      "properti",
      "infrastruktur",
      "bank_konvensional",
      "bank_syariah",
      "sekuritas",
      "dana_pensiun",
      "asuransi",
      "pembiayaan",
    ],
  },
  {
    kodeAkun: "3102",
    namaAkun: "Modal Saham",
    jenisPerusahaan: [
      "umum",
      "manufaktur",
      "dagang",
      "jasa",
      "bank_konvensional",
      "asuransi",
      "properti",
      "bank_syariah",
      "infrastruktur",
      "sekuritas",
      "pembiayaan",
    ],
  },
  {
    kodeAkun: "3120",
    namaAkun: "Tambahan Modal Disetor",
    jenisPerusahaan: [
      "umum",
      "manufaktur",
      "dagang",
      "jasa",
      "bank_konvensional",
      "asuransi",
      "properti",
      "bank_syariah",
      "infrastruktur",
      "sekuritas",
      "pembiayaan",
    ],
  },
  {
    kodeAkun: "3200",
    namaAkun: "Laba Ditahan",
    jenisPerusahaan: [
      "umum",
      "manufaktur",
      "dagang",
      "jasa",
      "bank_konvensional",
      "asuransi",
      "properti",
      "bank_syariah",
      "infrastruktur",
      "sekuritas",
      "pembiayaan",
    ],
  },
  {
    kodeAkun: "3297",
    namaAkun: "Pendapatan Komprehensif Lainnya",
    jenisPerusahaan: [
      "umum",
      "manufaktur",
      "dagang",
      "jasa",
      "bank_konvensional",
      "asuransi",
      "properti",
      "bank_syariah",
      "infrastruktur",
      "sekuritas",
      "pembiayaan",
    ],
  },
  {
    kodeAkun: "3298",
    namaAkun: "Ekuitas Lainnya",
    jenisPerusahaan: [
      "umum",
      "manufaktur",
      "dagang",
      "jasa",
      "bank_konvensional",
      "asuransi",
      "properti",
      "bank_syariah",
      "infrastruktur",
      "sekuritas",
      "pembiayaan",
    ],
  },
  {
    kodeAkun: "3299",
    namaAkun: "Jumlah Ekuitas",
    jenisPerusahaan: [
      "umum",
      "manufaktur",
      "dagang",
      "jasa",
      "bank_konvensional",
      "asuransi",
      "properti",
      "bank_syariah",
      "infrastruktur",
      "sekuritas",
      "pembiayaan",
    ],
  },
  {
    kodeAkun: "3300",
    namaAkun: "Jumlah Liabilitas dan Ekuitas",
    jenisPerusahaan: [
      "asuransi",
      "umum",
      "manufaktur",
      "dagang",
      "jasa",
      "bank_konvensional",
      "asuransi",
      "properti",
      "bank_syariah",
      "infrastruktur",
      "sekuritas",
      "pembiayaan",
    ],
  },
];

// Helper function untuk pick akun berdasarkan kode
export const pickByKodeNeraca = (kodeList, masterAkun = MASTER_AKUN_NERACA) => {
  return kodeList
    .map((kode) => {
      const akun = masterAkun.find((a) => a.kodeAkun === kode);
      return akun ? createLineRow(akun) : null;
    })
    .filter(Boolean);
};
