import React from "react";
import TablePenghasilanNeto from "@lampiran/Lampiran3B/RekapitulasiPenghasilanNeto/TablePenghasilanNeto";

export default function RekapitulasiPenghasilanNeto({ rows, openModal }) {
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow p-6">
        <TablePenghasilanNeto rows={rows} onEdit={openModal} />
      </div>
    </div>
  );
}
