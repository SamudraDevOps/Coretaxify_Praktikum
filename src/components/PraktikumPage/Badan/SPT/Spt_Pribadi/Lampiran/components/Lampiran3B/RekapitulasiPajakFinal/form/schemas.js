/**
 * Nama-nama bulan
 */
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

/**
 * Field names untuk bulan (lowercase)
 */
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

/**
 * Setting per id (seperti perKode di LaporanLabaRugi)
 * Contoh: untuk id tertentu, bisa set field tertentu readonly/hidden
 */
const perId = {
  "pajak-1": [{ name: "namaTKU", readOnly: true }],
  "pajak-2": [{ name: "namaTKU", readOnly: true }],
  // dst... bisa tambah kustomisasi per row jika perlu
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

/**
 * Alias untuk buildSchema (optional)
 */
export const getSchemaForRow = (row, overrides = []) => buildSchema(row, overrides);
