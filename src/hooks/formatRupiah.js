export function formatRupiahUtils(value) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0, // optional: use 2 if you want "Rp3.000,00"
  }).format(value);
}