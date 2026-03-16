import React from "react";
import TablePajakPengusaha from "@lampiran/Lampiran3B/RekapitulasiPengusaha/TablePajakPengusaha";

export default function RekapitulasiPengusaha({ rows, openModal }) {
  return (
    <div className="space-y-4">
      <h2 className="text-l font-semibold py-1">METODE PEMBUKUAN : </h2>
      <div className="bg-white rounded-lg shadow p-6">
        <TablePajakPengusaha rows={rows} onEdit={openModal} />
      </div>
    </div>
  );
}
