// Fungsi helper untuk membuat line row neraca
export const createLineRow = (akun, level = 0, options = {}) => ({
  id: akun.kodeAkun,
  type: "line",
  variant: options.variant ?? "normal",
  kodeAkun: akun.kodeAkun,
  keterangan: akun.namaAkun,
  level: akun.level ?? level,
  nilai: 0,
});

// Master Akun ASET
export const MASTER_AKUN_ASET = [
  // Aset Lancar
  {
    kodeAkun: "1101",
    namaAkun: "Kas dan Setara Kas",
    level: 1,
  },
  {
    kodeAkun: "1200",
    namaAkun: "Penyertaan Modal",
    level: 1,
  },
  {
    kodeAkun: "1122",
    namaAkun: "Piutang Usaha - Pihak Ketiga",
    level: 1,
  },
  {
    kodeAkun: "1123",
    namaAkun: "Piutang Usaha - Pihak Yang Mempunyai Hubungan Istimewa",
    level: 1,
  },
  {
    kodeAkun: "1124",
    namaAkun: "Piutang Lainnya - Pihak Ketiga",
    level: 1,
  },
  {
    kodeAkun: "1125",
    namaAkun: "Piutang Lainnya - Pihak Yang Mempunyai Hubungan Istimewa",
    level: 1,
  },
  {
    kodeAkun: "1131",
    namaAkun: "(Dikurangi : Cadangan Piutang Tak Tertagih)",
    level: 3,
    isDeduction: true,
  },
  {
    kodeAkun: "1401",
    namaAkun: "Persediaan",
    level: 1,
  },
  {
    kodeAkun: "1421",
    namaAkun: "Biaya Dibayar Dimuka",
    level: 1,
  },
  {
    kodeAkun: "1422",
    namaAkun: "Pendapatan Dibayar Dimuka",
    level: 1,
  },
  {
    kodeAkun: "1423",
    namaAkun: "Pajak Dibayar Dimuka",
    level: 1,
  },
  {
    kodeAkun: "1499",
    namaAkun: "Aset Lancar Lainnya",
    level: 1,
  },
  // Aset Tidak Lancar
  {
    kodeAkun: "1501",
    namaAkun: "Piutang Jangka Panjang",
    level: 1,
  },
  {
    kodeAkun: "1523",
    namaAkun: "Tanah Dan Bangunan",
    level: 1,
  },
  {
    kodeAkun: "1524",
    namaAkun: "(Dikurangi : Akumulasi Penyusutan)",
    level: 3,
    isDeduction: true,
  },
  {
    kodeAkun: "1529",
    namaAkun: "Aset Tetap Lainnya",
    level: 1,
  },
  {
    kodeAkun: "1530",
    namaAkun: "(Dikurangi : Akumulasi Penyusutan)",
    level: 3,
    isDeduction: true,
  },
  {
    kodeAkun: "1541",
    namaAkun: "Investasi pada Perusahaan Asosiasi",
    level: 1,
  },
  {
    kodeAkun: "1599",
    namaAkun: "Investasi Jangka Panjang",
    level: 1,
  },
  {
    kodeAkun: "1600",
    namaAkun: "Aset Tak Berwujud - net",
    level: 1,
  },
  {
    kodeAkun: "1611",
    namaAkun: "Aktiva Pajak Tangguhan",
    level: 1,
  },
  {
    kodeAkun: "1698",
    namaAkun: "Aset Tidak Lancar Lainnya",
    level: 1,
  },
];

// Master Akun LIABILITAS
export const MASTER_AKUN_LIABILITAS = [
  // Liabilitas Jangka Pendek
  {
    kodeAkun: "2102",
    namaAkun: "Utang Usaha - Pihak Ketiga",
    level: 1,
  },
  {
    kodeAkun: "2103",
    namaAkun: "Utang Usaha - Pihak Yang Mempunyai Hubungan Istimewa",
    level: 1,
  },
  {
    kodeAkun: "2111",
    namaAkun: "Utang Bunga",
    level: 1,
  },
  {
    kodeAkun: "2191",
    namaAkun: "Utang Pajak",
    level: 1,
  },
  {
    kodeAkun: "2192",
    namaAkun: "Utang Dividen",
    level: 1,
  },
  {
    kodeAkun: "2195",
    namaAkun: "Beban Yang Masih Harus Dibayar",
    level: 1,
  },
  {
    kodeAkun: "2201",
    namaAkun: "Utang Bank Jangka Pendek",
    level: 1,
  },
  {
    kodeAkun: "2202",
    namaAkun: "Utang Bank Jangka Panjang yang Jatuh Tempo Dalam Satu Tahun",
    level: 1,
  },
  {
    kodeAkun: "2203",
    namaAkun: "Pendapatan Diterima Dimuka",
    level: 1,
  },
  {
    kodeAkun: "2228",
    namaAkun: "Liabilitas Jangka Pendek Lainnya",
    level: 1,
  },
  // Liabilitas Jangka Panjang
  {
    kodeAkun: "2301",
    namaAkun: "Utang Bank Jangka Panjang",
    level: 1,
  },
  {
    kodeAkun: "2303",
    namaAkun: "Utang Jangka Panjang-pihak Ketiga",
    level: 1,
  },
  {
    kodeAkun: "2304",
    namaAkun: "Utang Jangka Panjang-pihak Yang Mempunyai Hubungan Istimewa",
    level: 1,
  },
  {
    kodeAkun: "2321",
    namaAkun: "Liabilitas Pajak Tangguhan",
    level: 1,
  },
  {
    kodeAkun: "2998",
    namaAkun: "Liabilitas Jangka Panjang Lainnya",
    level: 1,
  },
];

// Master Akun EKUITAS
export const MASTER_AKUN_EKUITAS = [
  {
    kodeAkun: "3102",
    namaAkun: "Modal Saham",
    level: 1,
  },
  {
    kodeAkun: "3120",
    namaAkun: "Tambahan Modal Disetor",
    level: 1,
  },
  {
    kodeAkun: "3200",
    namaAkun: "Laba Ditahan",
    level: 1,
  },
  {
    kodeAkun: "3298",
    namaAkun: "Ekuitas Lainnya",
    level: 1,
  },
];

// Helper function untuk pick akun berdasarkan kode
export const pickByKodeNeraca = (kodeList, masterAkun) => {
  return kodeList
    .map((kode) => {
      const akun = masterAkun.find((a) => a.kodeAkun === kode);
      return akun ? createLineRowNeraca(akun) : null;
    })
    .filter(Boolean);
};
