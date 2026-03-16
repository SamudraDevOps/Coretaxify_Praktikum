import React from "react";
import TablePajakFinal from "@lampiran/Lampiran3B/RekapitulasiPajakFinal/TablePajakFinal";

export default function RekapitulasiPajakFinal({ rows, openModal }) {
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow p-6">
        <TablePajakFinal rows={rows} onEdit={openModal} />
      </div>
    </div>
  );
}
