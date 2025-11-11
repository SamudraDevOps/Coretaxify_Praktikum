import React from "react";
import { TableA } from "@lampiran/Lampiran5/BagianA";

export default function KompensasiKerugian({ rows, openModal }) {
  return <TableA rows={rows} onEdit={openModal} />;
}
