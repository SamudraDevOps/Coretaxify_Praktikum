import { defaultFields } from "./schemas";

export const toNum = (v) => (v === "" || v == null ? 0 : Number(v));

// Ambil hanya field tahun-tahun (exclude labaRugi)
const yearFields = [2021, 2022, 2023, 2024, 2025, 2026];

export const updateTotalRow = (rows) => {
  const lineRows = rows.filter((r) => r.type === "line");
  const totalRow = rows.find((r) => r.type === "total");

  if (!totalRow) return rows;

  console.log("=== updateTotalRow ===");
  console.log("lineRows:", lineRows);

  // Calculate sum untuk labaRugi
  totalRow.labaRugi = lineRows.reduce((sum, row) => {
    console.log(`labaRugi row ${row.id}:`, row.labaRugi, typeof row.labaRugi);
    return sum + toNum(row.labaRugi);
  }, 0);

  // Calculate sum untuk setiap tahun
  yearFields.forEach((year) => {
    totalRow[year] = lineRows.reduce((sum, row) => {
      console.log(`Year ${year} row ${row.id}:`, row[year], typeof row[year]);
      return sum + toNum(row[year]);
    }, 0);
  });

  // Set label untuk baris total
  totalRow.tahunPajak = "Jumlah Total";

  console.log("totalRow result:", totalRow);

  return rows.map((r) => (r.type === "total" ? totalRow : r));
};
