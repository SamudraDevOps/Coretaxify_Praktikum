import React from "react";
import { FaPen } from "react-icons/fa";
import { formatRupiah } from "@utils/formatCurrency";
import { isFieldReadonly } from "./form/schemas";

export default function TableLabaRugi({ rows = [], onEdit }) {
  const pad = (lvl = 0) => ({ paddingLeft: `${lvl * 20 + 10}px` });

  const moneyCell = (row, value, field) => {
    if (row.type === "header") return "";
    if (row.type === "subtotal") return formatRupiah(value || 0);
    if (value == null || value === "") return "";
    return formatRupiah(value);
  };

  return (
    <div className="overflow-x-auto rounded-xl shadow border border-gray-200">
      <table className="min-w-full text-sm border-collapse">
        <thead className="bg-purple-700 text-white font-semibold text-center">
          <tr>
            <th className="border p-2 w-10">Aksi</th>
            <th className="border p-2 w-24">KODE AKUN</th>
            <th className="border p-2 text-center min-w-[250px]">NAMA AKUN</th>
            <th className="border p-2 w-32">NILAI KOMERSIAL</th>
            <th className="border p-2 w-32">TIDAK TERMASUK OBJEK PAJAK</th>
            <th className="border p-2 w-32">DIKENAKAN PPh FINAL</th>
            <th className="border p-2 w-32">OBJEK PAJAK TIDAK FINAL</th>
            <th className="border p-2 w-32">KOREKSI FISKAL (+)</th>
            <th className="border p-2 w-32">KOREKSI FISKAL (−)</th>
            <th className="border p-2 w-40">KODE KOREKSI FISKAL</th>
            <th className="border p-2 w-32">NILAI FISKAL</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => {
            const readonlyRow = r.type && r.type !== "line";
            return (
              <tr key={r.id} className="border-b hover:bg-gray-50">
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
                      // disabled={readonlyRow}
                      // title={readonlyRow ? "Tidak dapat diedit" : "Edit"}
                    >
                      <FaPen size={14} />
                    </button>
                  )}
                </td>

                <td className="border p-2 text-center font-medium">{r.kodeAkun || ""}</td>

                <td
                  className={`border p-2 text-left pl-4 ${
                    r.type === "header" || r.type === "subtotal" ? "font-semibold" : ""
                  }`}
                  style={pad(r.level)}
                >
                  {r.keterangan}
                </td>

                {/* kolom angka: pakai moneyCell Bakal diganti menggunakan format Currency iki lek */}
                <td className="border p-2 text-right">
                  {moneyCell(r, r.nilaiKomersial, "nilaiKomersial")}
                </td>
                <td className="border p-2 text-right">
                  {moneyCell(r, r.nonObjekPajak, "nonObjekPajak")}
                </td>
                <td className="border p-2 text-right">{moneyCell(r, r.pphFinal, "pphFinal")}</td>
                <td className="border p-2 text-right">
                  {moneyCell(r, r.tidakFinal, "tidakFinal")}
                </td>
                <td className="border p-2 text-right">
                  {moneyCell(r, r.penyesuaianPositif, "penyesuaianPositif")}
                </td>
                <td className="border p-2 text-right">
                  {moneyCell(r, r.penyesuaianNegatif, "penyesuaianNegatif")}
                </td>
                <td className="border p-2 text-left">
                  {isFieldReadonly(r, "kodePenyesuaian") ? "" : r.kodePenyesuaian || ""}
                </td>
                <td className="border p-2 text-right font-semibold">
                  {moneyCell(r, r.nilaiFiskal, "nilaiFiskal")}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
