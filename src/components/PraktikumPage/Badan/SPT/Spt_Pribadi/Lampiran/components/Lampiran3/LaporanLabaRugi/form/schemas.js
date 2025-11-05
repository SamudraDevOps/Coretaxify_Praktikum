// opsi dropdown Kode Koreksi Fiskal (contoh e dibawah)
export const KODE_KOREKSI_OPTIONS = [
  { value: "", label: "— pilih —" },
  { value: "FPO-01", label: "FPO-01 Biaya yang dibebankan/..." },
  { value: "FPO-02", label: "FPO-02 Biaya natura/kenikmatan" },
];

// DEFAULT FIELD ORDER (semua bisa diisi; readOnly bisa dioverride)
export const defaultFields = [
  { name: "kodeAkun", label: "Kode Akun", type: "text", readOnly: false },
  { name: "keterangan", label: "Keterangan", type: "text", readOnly: false },
  { name: "nilaiKomersial", label: "NILAI (KOMERSIAL)", type: "number", readOnly: false },
  { name: "nonObjekPajak", label: "NON OBJEK PAJAK", type: "number", readOnly: false },
  { name: "pphFinal", label: "DIKENAKAN PPh FINAL", type: "number", readOnly: false },
  { name: "tidakFinal", label: "TIDAK FINAL", type: "number", readOnly: false },
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
    label: "NILAI FISKAL (Sebelum Fasilitas Perpajakan)",
    type: "number",
    readOnly: false,
  },
];

// Setting kode berapa yang akan dibuat khusus (bisa lebih dari satu)
// misal: untuk kodeAkun 4002, keterangan dan kodeAkun dibuat readOnly
//      untuk kodeAkun 5001, nilaiFiskal dibuat readOnly OKEEE KING

const perKode = {
  // contoh: untuk 4002, kunci identitas dibuat baca-saja
  4002: [
    { name: "kodeAkun", readOnly: true },
    { name: "keterangan", readOnly: true },
  ],
  5001: [
    { name: "nilaiFiskal", readOnly: true },
    { name: "nilaiKomersial", hidden: true },
    { name: "pphFinal", readOnly: true },
  ],
  // dst, OKEEE KING
};

// Build SCHEMA lengkap untuk baris tertentu iki kudu di panggil di index.jsx
export function buildSchema(row, dynamicOverrides = []) {
  const map = new Map(defaultFields.map((f) => [f.name, { ...f }]));
  [...(perKode[row?.kodeAkun] || []), ...dynamicOverrides].forEach((ov) => {
    if (map.has(ov.name)) map.set(ov.name, { ...map.get(ov.name), ...ov });
  });
  return Array.from(map.values());
}

// Menampilkan apakah field tertentu readonly (untuk menampikan Rp0 di tabel)
export function isFieldReadonly(row, fieldName) {
  // non-line (header/label/subtotal)  semuanya readonly
  if (row?.type && row.type !== "line") return true;
  const ov = (perKode[row?.kodeAkun] || []).find((f) => f.name === fieldName);
  return !!ov?.readOnly;
}

// opsional kawan : alias nama lain, kalau nanti import getSchemaForRow dari file ini
export const getSchemaForRow = (row, overrides = []) => buildSchema(row, overrides);
