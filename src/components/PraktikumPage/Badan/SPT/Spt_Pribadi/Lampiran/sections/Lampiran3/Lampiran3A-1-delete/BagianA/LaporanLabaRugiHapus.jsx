import React from "react";
import { TableLabaRugi } from "@lampiran/Lampiran3/LaporanLabaRugi";

export default function LaporanLabaRugi({ rows, openModal }) {
  return <TableLabaRugi rows={rows} onEdit={openModal} />;
}
