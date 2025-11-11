import React from "react";
import { FaPen } from "react-icons/fa";
import { formatRupiah } from "@utils/formatCurrency";
import { isFieldReadonly } from "./form/schemas";
// import { sumPerTahun, calculateRowTotal } from "./form/helper";

export default function TableA({
  rows = [],
  onEdit,
  years = [2021, 2022, 2023, 2024, 2025, 2026],
}) {
  // Semua tahun 2021-2026
  const yRange = years.filter((y) => y >= 2021 && y <= 2026);
  const kompColspan = yRange.length;
  // const totalPerTahun = sumPerTahun(rows, [2021, 2022, 2023, 2024, 2025, 2026]);

  return (
    <div className="overflow-x-auto rounded-xl shadow border border-gray-200">
      <table className="min-w-full text-sm border-collapse">
        <thead className="bg-purple-700 text-white font-semibold text-center sticky top-0 z-10">
          <tr>
            <th rowSpan={3} className="border p-2 w-16">
              TINDAKAN
            </th>
            <th rowSpan={3} className="border p-2 w-10">
              NO.
            </th>
            <th colSpan={2} className="border p-2">
              LABA/RUGI PENGHASILAN FISKAL
            </th>
            <th colSpan={kompColspan} className="border p-2">
              KOMPENSASI KERUGIAN FISKAL
            </th>
          </tr>
          <tr>
            <th rowSpan={2} className="border p-2 min-w-[220px]">
              Tahun Pajak/Bagian Tahun Pajak
            </th>
            <th rowSpan={2} className="border p-2 w-44">
              BESARAN BIAYA (RUPIAH)
            </th>
            {yRange.map((y) => (
              <th key={`y-${y}`} className="border p-2">
                YEAR {y}
              </th>
            ))}
          </tr>
          <tr>
            {yRange.map((y) => (
              <th key={`yl-${y}`} className="border p-2">
                NILAI (Rp)
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="[&_tr:nth-child(even)]:bg-white [&_tr:nth-child(odd)]:bg-gray-50/30">
          {rows.map((r, idx) => {
            const isTotal = r.type === "total";
            // const rowTotal = isTotal ? r.total : calculateRowTotal(r);
            return (
              <tr
                key={r.id ?? idx}
                className={`border-b hover:bg-gray-50 ${isTotal ? "font-bold bg-yellow-50" : ""}`}
              >
                <td className="border p-2 text-center">
                  {!isTotal && (
                    <button
                      type="button"
                      onClick={() => onEdit?.(r)}
                      title="Edit baris ini"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaPen size={14} />
                    </button>
                  )}
                </td>
                <td className="border p-2 text-center tabular-nums">{isTotal ? "" : idx + 1}</td>
                <td className="border p-2 text-center">{r.tahunPajak || r.keterangan || ""}</td>
                <td className="border p-2 text-right tabular-nums">{formatRupiah(r.labaRugi)}</td>
                {yRange.map((y) => (
                  <td key={`v-${r.id ?? idx}-${y}`} className="border p-2 text-right tabular-nums">
                    {formatRupiah(r[y])}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
