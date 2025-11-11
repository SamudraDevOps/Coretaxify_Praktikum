// DEFAULT FIELD ORDER (semua bisa diisi; readOnly bisa dioverride)
export const defaultFields = [
  { name: "tahunPajak", label: "Tahun Pajak", type: "text", readOnly: false },
  { name: "labaRugi", label: "Laba/Rugi Penghasilan Fiskal", type: "number", readOnly: false },
  { name: "2021", label: "Tahun 2021", type: "number", readOnly: false },
  { name: "2022", label: "Tahun 2022", type: "number", readOnly: false },
  { name: "2023", label: "Tahun 2023", type: "number", readOnly: false },
  { name: "2024", label: "Tahun 2024", type: "number", readOnly: false },
  { name: "2025", label: "Tahun 2025", type: "number", readOnly: false },
  { name: "2026", label: "Tahun 2026", type: "number", readOnly: false },
];

// Setting kode berapa yang akan dibuat khusus (bisa lebih dari satu)
// misal: untuk kodeAkun 4002, keterangan dan kodeAkun dibuat readOnly
//      untuk kodeAkun 5001, nilaiFiskal dibuat readOnly OKEEE KING

const perTahun = {
  tahun: [{ name: "tahunPajak", readOnly: true }],
};

// Build SCHEMA lengkap untuk baris tertentu iki kudu di panggil di index.jsx
export function buildSchema(row, dynamicOverrides = []) {
  const map = new Map(defaultFields.map((f) => [f.name, { ...f }]));
  [...(perTahun[row?.id] || []), ...dynamicOverrides].forEach((ov) => {
    if (map.has(ov.name)) map.set(ov.name, { ...map.get(ov.name), ...ov });
  });
  return Array.from(map.values());
}

// Menampilkan apakah field tertentu readonly (untuk menampikan Rp0 di tabel)
export function isFieldReadonly(row, fieldName) {
  // non-line (header/label/subtotal)  semuanya readonly
  if (row?.type && row.type !== "line") return true;
  const ov = (perTahun[row?.id] || []).find((f) => f.name === fieldName);
  return !!ov?.readOnly;
}

// opsional kawan : alias nama lain, kalau nanti import getSchemaForRow dari file ini
export const getSchemaForRow = (row, overrides = []) => buildSchema(row, overrides);
