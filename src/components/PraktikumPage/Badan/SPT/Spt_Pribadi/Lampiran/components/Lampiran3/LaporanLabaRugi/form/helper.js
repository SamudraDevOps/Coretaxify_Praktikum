// @lampiran/Lampiran3/LaporanLabaRugi/form/helpers.js
export const toNum = (v) => (v === "" || v == null ? 0 : Number(v));

// contoh hitung otomatis nilaiFiskal (opsional, panggil di modal)
export function computeNilaiFiskal(form) {
  const k = toNum(form.nilaiKomersial);
  const ttop = toNum(form.nonObjekPajak) + toNum(form.pphFinal);
  const tf = toNum(form.tidakFinal);
  const adj = toNum(form.penyesuaianPositif) - toNum(form.penyesuaianNegatif);
  // rumus contoh → silakan sesuaikan
  return k - ttop + tf + adj;
}
