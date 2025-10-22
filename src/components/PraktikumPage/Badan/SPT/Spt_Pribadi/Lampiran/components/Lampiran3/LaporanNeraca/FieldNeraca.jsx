// src/components/.../LaporanNeraca/container.jsx
import React from "react";
import TableNeraca from "./TableNeraca";

export default function FieldNeraca({ leftRows = [], rightRows = [], onValueChange }) {
  console.log("FieldNeraca props:", { leftRows, rightRows }); // Debug log

  return (
    <TableNeraca
      leftRows={leftRows}
      rightRows={rightRows}
      onValueChange={onValueChange}
      titleLeft="ASET"
      titleRight="LIABILITAS & EKUITAS"
    />
  );
}
