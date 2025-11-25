// src/components/PraktikumPage/Badan/SPT/utils/helperTotal.js

/**
 * Helper TOTAL GLOBAL (generic)
 * -----------------------------
 * Menjumlahkan beberapa field numerik dari array rows.
 *
 * @param {Array<object>} rows   - data tabel
 * @param {Array<string>} fields - nama field yg ingin ditotal
 * @returns {object}             - { field1: total, field2: total, ... }
 */
export function hitungTotalGlobal(rows = [], fields = []) {
  const totals = {};

  fields.forEach((f) => {
    totals[f] = rows.reduce((sum, row) => sum + (Number(row?.[f]) || 0), 0);
  });

  return totals;
}

/**
 * Membuat 1 baris TOTAL yang bisa dikirim ke GlobalTable.
 *
 * @param {string} label          - teks label, misal "JUMLAH" / "TOTAL"
 * @param {object} totals         - object hasil hitung total (misal { kolom1: 100, kolom2: 200 })
 * @param {object} options        - opsi tambahan:
 *   - labelField {string}        - nama field yang menampung label (misal "namaPemotong")
 *   - base {object}              - field default lain (npwp: "", kode: "", dst)
 */
export function createTotalRow(label = "TOTAL", totals = {}, options = {}) {
  const { labelField, base = {} } = options;

  const row = {
    id: "total-row",
    type: "total",
    ...base,
    ...totals,
  };

  if (labelField) {
    row[labelField] = label;
  } else {
    row.label = label;
  }

  return row;
}
