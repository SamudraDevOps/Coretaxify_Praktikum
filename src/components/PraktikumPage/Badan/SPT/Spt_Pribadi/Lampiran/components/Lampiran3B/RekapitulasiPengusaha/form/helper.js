import { BULAN_FIELDS } from "./schemas";

/**
 * Format input value real-time (add dots while typing)
 * DEPRECATED: Use formatNumber from formatCurrency.js instead
 */
export const formatInputValue = (value) => {
  if (!value) return "";

  // Hapus semua non-digit characters
  const numericValue = value.replace(/[^\d]/g, "");

  // Tambahkan titik setiap 3 digit dari kanan
  if (numericValue.length > 0) {
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  return numericValue; 
};

/**
 * Calculate row total (sum of all months)
 */
export const calculateRowTotal = (row) => {
  return BULAN_FIELDS.reduce((sum, field) => sum + (row[field] || 0), 0);
};

/**
 * Update subtotal rows (belum diimplementasi full, placeholder)
 * Untuk auto-calculate subtotal berdasarkan line rows sebelumnya
 */
export const updateSubtotalRows = (rows) => {
  // Implement jika diperlukan
  return rows;
};

//  Update total row based on line rows (grand total)

export const updateTotalRow = (rows, ppnRate = 0) => {
  const totalBrutoRow = rows.find((r) => r.id === "total-Bruto");
  const totalPphRow = rows.find((r) => r.id === "total-pajak-final-pph");

  if (!totalBrutoRow || !totalPphRow) return rows;

  // Hitung total untuk total-Bruto
  BULAN_FIELDS.forEach((field) => {
    totalBrutoRow[field] = rows
      .filter((r) => r.type === "line")
      .reduce((sum, row) => sum + (row[field] || 0), 0);
  });
  totalBrutoRow.total = calculateRowTotal(totalBrutoRow);

  // Hitung total untuk total-pajak-final-pph (hanya PPN)
  BULAN_FIELDS.forEach((field) => {
    totalPphRow[field] = totalBrutoRow[field] * (ppnRate / 100); // Hanya 11% dari bruto
  });
  totalPphRow.total = calculateRowTotal(totalPphRow);

  return rows.map((r) => {
    if (r.id === "total-Bruto") return totalBrutoRow;
    if (r.id === "total-pajak-final-pph") return totalPphRow;
    return r;
  });
};

/**
 * Calculate grand total (total from total row)
 */
export const calculateGrandTotal = (rows) => {
  const totalRow = rows.find((r) => r.type === "total");
  return totalRow ? totalRow.total : 0;
};
