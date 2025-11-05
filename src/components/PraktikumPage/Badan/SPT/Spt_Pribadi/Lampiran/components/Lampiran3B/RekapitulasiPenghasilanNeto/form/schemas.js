// opsi dropdown JENIS USAHA/PEKERJAAN BEBAS
export const KODE_JENIS_USAHA = [
  // { value: "", label: "Please Select" },
  { value: "01", label: "Dagang" },
  { value: "02", label: "Industri" },
  { value: "03", label: "Jasa" },
  { value: "04", label: "Pengacara" },
  { value: "05", label: "Akuntan" },
  { value: "06", label: "Konsultan" },
  { value: "07", label: "Aktuaris" },
  { value: "08", label: "Notaris/PPAT" },
  { value: "09", label: "Dokter" },
  { value: "10", label: "Penilai" },
  { value: "11", label: "Arsitek" },
  { value: "12", label: "Artis dan profesi sejenisnya" },
  { value: "13", label: "Pembuat konten" },
  { value: "14", label: "Penulis" },
  { value: "15", label: "Olahragawan" },
  { value: "16", label: "Pelatih/Pengajar" },
  { value: "17", label: "Distributor perusahaan pemasaran berjenjang" },
  { value: "18", label: "Peneliti" },
  { value: "19", label: "Petugas penjaja barang dagangan" },
  { value: "20", label: "Agen iklan" },
  { value: "21", label: "Agen asuransi" },
  { value: "22", label: "Perantara" },
  { value: "23", label: "Usaha/profesi Lainnya" },
];

export const BULAN_NAMES = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

export const BULAN_FIELDS = [
  "januari",
  "februari",
  "maret",
  "april",
  "mei",
  "juni",
  "juli",
  "agustus",
  "september",
  "oktober",
  "november",
  "desember",
];

/**
 * DEFAULT FIELD ORDER (semua bisa diisi; readOnly bisa dioverride)
 */
export const defaultFields = [
  { name: "namaTKU", label: "Nama TKU", type: "text", readOnly: false },
  {
    name: "kodeJenisUsaha",
    label: "Kode Jenis Usaha",
    type: "select",
    readOnly: false,
    options: KODE_JENIS_USAHA,
  },
  { name: "januari", label: "Januari", type: "number", readOnly: false },
  { name: "februari", label: "Februari", type: "number", readOnly: false },
  { name: "maret", label: "Maret", type: "number", readOnly: false },
  { name: "april", label: "April", type: "number", readOnly: false },
  { name: "mei", label: "Mei", type: "number", readOnly: false },
  { name: "juni", label: "Juni", type: "number", readOnly: false },
  { name: "juli", label: "Juli", type: "number", readOnly: false },
  { name: "agustus", label: "Agustus", type: "number", readOnly: false },
  { name: "september", label: "September", type: "number", readOnly: false },
  { name: "oktober", label: "Oktober", type: "number", readOnly: false },
  { name: "november", label: "November", type: "number", readOnly: false },
  { name: "desember", label: "Desember", type: "number", readOnly: false },
  { name: "total", label: "Total (Auto-calculated)", type: "number", readOnly: false },
];

const perId = {
  "pajak-1": [{ name: "namaTKU", readOnly: true }],
  "pajak-2": [{ name: "namaTKU", readOnly: true }],
  // bisa tambah kustomisasi per row jika perlu
};

export function buildSchema(row, dynamicOverrides = []) {
  const map = new Map(defaultFields.map((f) => [f.name, { ...f }]));
  [...(perId[row?.id] || []), ...dynamicOverrides].forEach((ov) => {
    if (map.has(ov.name)) map.set(ov.name, { ...map.get(ov.name), ...ov });
  });
  return Array.from(map.values());
}

export function isFieldReadonly(row, fieldName) {
  // non-line (header/label/subtotal) semuanya readonly
  if (row?.type && row.type !== "line") return true;
  const ov = (perId[row?.id] || []).find((f) => f.name === fieldName);
  return !!ov?.readOnly;
}

// opsional kawan : alias nama lain, kalau nanti import getSchemaForRow dari file ini

export const getSchemaForRow = (row, overrides = []) => buildSchema(row, overrides);
