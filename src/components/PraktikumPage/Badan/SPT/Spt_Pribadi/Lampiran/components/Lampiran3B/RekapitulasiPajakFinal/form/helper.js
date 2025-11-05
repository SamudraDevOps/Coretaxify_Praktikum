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
  // TODO: Implement jika diperlukan
  return rows;
};

/**
 * Update total row based on line rows (grand total)
 */
export const updateTotalRow = (rows) => {
  const lineRows = rows.filter((r) => r.type === "line");
  const totalRow = rows.find((r) => r.type === "total");

  if (!totalRow) return rows;

  // Calculate sum for each month
  BULAN_FIELDS.forEach((field) => {
    totalRow[field] = lineRows.reduce((sum, row) => sum + (row[field] || 0), 0);
  });

  // Calculate total for total row
  totalRow.total = calculateRowTotal(totalRow);

  return rows.map((r) => (r.type === "total" ? totalRow : r));
};

/**
 * Calculate grand total (total from total row)
 */
export const calculateGrandTotal = (rows) => {
  const totalRow = rows.find((r) => r.type === "total");
  return totalRow ? totalRow.total : 0;
};
