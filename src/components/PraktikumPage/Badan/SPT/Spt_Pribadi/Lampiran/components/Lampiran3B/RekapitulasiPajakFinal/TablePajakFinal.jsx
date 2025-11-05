import React from "react";
import { FaPen } from "react-icons/fa";
import { formatRupiah } from "@utils/formatCurrency";
import { BULAN_NAMES, BULAN_FIELDS, isFieldReadonly } from "./form/schemas";

export default function TablePajakFinal({ rows = [], onEdit }) {
  // Helper untuk padding berdasarkan level (sama seperti LaporanLabaRugi)
  const pad = (lvl = 0) => ({ paddingLeft: `${lvl * 20 + 10}px` });

  // Helper untuk render cell nilai (sama seperti moneyCell di LaporanLabaRugi)
  const moneyCell = (row, value, field) => {
    if (row.type === "header") return "";
    if (row.type === "subtotal") return formatRupiah(value || 0);
    if (row.type === "total") return formatRupiah(value || 0);
    if (value == null || value === "") return "";
    return formatRupiah(value);
  };

  return (
    <div className="overflow-x-auto rounded-xl shadow border border-gray-200">
      <table className="min-w-full text-sm border-collapse">
        {/* Header */}
        <thead className="bg-purple-700 text-white font-semibold text-center">
          <tr>
            <th className="border p-2 w-10">Aksi</th>
            <th className="border p-2 text-center min-w-[250px]">KETERANGAN</th>
            {BULAN_NAMES.map((bulan) => (
              <th key={bulan} className="border p-2 w-32">
                {bulan}
              </th>
            ))}
            <th className="border p-2 w-32">JUMLAH </th>
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {rows.map((r) => {
            const readonlyRow = r.type && r.type !== "line";
            const rowTotal = BULAN_FIELDS.reduce((sum, field) => sum + (r[field] || 0), 0);

            return (
              <tr key={r.id} className="border-b hover:bg-gray-50">
                {/* Aksi */}
                <td className="border p-2 text-center">
                  {!readonlyRow && r.type !== "header" && r.type !== "total" && (
                    <button
                      type="button"
                      onClick={() => onEdit?.(r)}
                      className={
                        readonlyRow
                          ? "text-gray-300 cursor-not-allowed"
                          : "text-blue-600 hover:text-blue-800"
                      }
                    >
                      <FaPen size={14} />
                    </button>
                  )}
                </td>

                {/* Keterangan / Nama TKU (dengan padding berdasarkan level) */}
                <td
                  className={`border p-2 text-left pl-4 ${
                    r.type === "header" || r.type === "subtotal" || r.type === "total"
                      ? "font-semibold"
                      : ""
                  }`}
                  style={pad(r.level)}
                >
                  {r.namaTKU || r.keterangan || ""}
                </td>

                {/* Bulan Januari - Desember */}
                {BULAN_FIELDS.map((field) => (
                  <td key={field} className="border p-2 text-right pr-10">
                    {moneyCell(r, r[field], field)}
                  </td>
                ))}

                {/* Total (Jumlah dalam 1 Tahun) */}
                <td className="border p-2 text-right font-semibold">
                  {moneyCell(r, rowTotal, "total")}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
