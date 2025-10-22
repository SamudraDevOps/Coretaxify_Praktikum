// opsi dropdown Kode Koreksi Fiskal
export const KODE_KOREKSI_OPTIONS = [
  { value: "", label: "— pilih —" },
  { value: "FPO-01", label: "FPO-01 Biaya yang dibebankan/..." },
  { value: "FPO-02", label: "FPO-02 Biaya natura/kenikmatan" },
];

// Schema untuk form Aset (sisi kiri)
export const leftSchema = [
  { name: "kodeAkun", label: "Kode Akun", type: "text", readOnly: false },
  { name: "keterangan", label: "Keterangan", type: "text", readOnly: false },
  { name: "nilaiKomersial", label: "NILAI KOMERSIAL", type: "number", readOnly: false },
  { name: "penyesuaianPositif", label: "KOREKSI FISKAL POSITIF", type: "number", readOnly: false },
  { name: "penyesuaianNegatif", label: "KOREKSI FISKAL NEGATIF", type: "number", readOnly: false },
  {
    name: "kodePenyesuaian",
    label: "KODE KOREKSI FISKAL",
    type: "select",
    readOnly: false,
    options: KODE_KOREKSI_OPTIONS,
  },
  {
    name: "nilaiFiskal",
    label: "NILAI FISKAL",
    type: "number",
    readOnly: true,
  },
];

// Schema untuk form Liabilitas & Ekuitas (sisi kanan)
export const rightSchema = [
  { name: "kodeAkun", label: "Kode Akun", type: "text", readOnly: false },
  { name: "keterangan", label: "Keterangan", type: "text", readOnly: false },
  { name: "nilaiKomersial", label: "NILAI KOMERSIAL", type: "number", readOnly: false },
  { name: "penyesuaianPositif", label: "KOREKSI FISKAL POSITIF", type: "number", readOnly: false },
  { name: "penyesuaianNegatif", label: "KOREKSI FISKAL NEGATIF", type: "number", readOnly: false },
  {
    name: "kodePenyesuaian",
    label: "KODE KOREKSI FISKAL",
    type: "select",
    readOnly: false,
    options: KODE_KOREKSI_OPTIONS,
  },
  {
    name: "nilaiFiskal",
    label: "NILAI FISKAL",
    type: "number",
    readOnly: true,
  },
];

// Data tabel untuk sisi kiri (Aset) - akan dipindah ke BagianB
export const defaultFieldsLeft = [
  { id: "h-aset-lancar", type: "header", level: 0, keterangan: "Aset Lancar" },
  {
    id: 1101,
    kodeAkun: "1101",
    keterangan: "Kas dan Setara Kas",
    type: "line",
    level: 1,
    nilaiKomersial: "",
  },
  {
    id: 1200,
    kodeAkun: "1200",
    keterangan: "Penyertaan Modal",
    type: "line",
    level: 1,
    nilaiKomersial: "",
  },
  {
    id: 1123,
    kodeAkun: "1123",
    keterangan: "Piutang Usaha - Pihak Ketiga",
    type: "line",
    level: 1,
    nilaiKomersial: "",
  },
  {
    id: "s-aset-lancar",
    type: "subtotal",
    level: 0,
    keterangan: "Jumlah Aset Lancar",
    nilaiKomersial: 0,
  },
  { id: "h-aset-tidak-lancar", type: "header", level: 0, keterangan: "Aset Tidak Lancar" },
  {
    id: 1523,
    kodeAkun: "1523",
    keterangan: "Tanah dan Bangunan",
    type: "line",
    level: 1,
    nilaiKomersial: "",
  },
  { id: "s-aset", type: "subtotal", level: 0, keterangan: "Jumlah ASET", nilaiKomersial: 0 },
];

// Data tabel untuk sisi kanan (Liabilitas & Ekuitas) - akan dipindah ke BagianB
export const defaultFieldsRight = [
  { id: "h-liab-pendek", type: "header", level: 0, keterangan: "Liabilitas Jangka Pendek" },
  {
    id: 2102,
    kodeAkun: "2102",
    keterangan: "Utang Usaha - Pihak Ketiga",
    type: "line",
    level: 1,
    nilaiKomersial: "",
  },
  {
    id: 2111,
    kodeAkun: "2111",
    keterangan: "Utang Bunga",
    type: "line",
    level: 1,
    nilaiKomersial: "",
  },
  {
    id: "s-liab-pendek",
    type: "subtotal",
    level: 0,
    keterangan: "Jumlah Liabilitas Jangka Pendek",
    nilaiKomersial: 0,
  },
  { id: "h-ekuitas", type: "header", level: 0, keterangan: "Ekuitas" },
  {
    id: 3102,
    kodeAkun: "3102",
    keterangan: "Modal Saham",
    type: "line",
    level: 1,
    nilaiKomersial: "",
  },
  {
    id: 3210,
    kodeAkun: "3210",
    keterangan: "Laba Ditahan",
    type: "line",
    level: 1,
    nilaiKomersial: "",
  },
  {
    id: "s-liab-ekuitas",
    type: "subtotal",
    level: 0,
    keterangan: "Jumlah Liabilitas dan Ekuitas",
    nilaiKomersial: 0,
  },
];
