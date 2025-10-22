// // @lampiran/Lampiran3/LaporanLabaRugi/form/helpers.js
// export const toNum = (v) => (v === "" || v == null ? 0 : Number(v));

// // contoh hitung otomatis nilaiFiskal (opsional, panggil di modal)
// export function computeNilaiFiskal(form) {
//   const k = toNum(form.nilaiKomersial);
//   const ttop = toNum(form.nonObjekPajak) + toNum(form.pphFinal);
//   const tf = toNum(form.tidakFinal);
//   const adj = toNum(form.penyesuaianPositif) - toNum(form.penyesuaianNegatif);
//   // rumus contoh → silakan sesuaikan
//   return k - ttop + tf + adj;
// }

export const sumBetween = (rows, startId, endId) => {
  let on = false,
    total = 0;
  for (const r of rows) {
    if (r.id === startId) on = true;
    else if (r.id === endId) break;
    else if (on && r.type === "line") total += Number(r.nilaiKomersial || 0);
  }
  return total;
};

export const isBalanced = (totalAset, totalLiabEquity) =>
  Number(totalAset) === Number(totalLiabEquity);
