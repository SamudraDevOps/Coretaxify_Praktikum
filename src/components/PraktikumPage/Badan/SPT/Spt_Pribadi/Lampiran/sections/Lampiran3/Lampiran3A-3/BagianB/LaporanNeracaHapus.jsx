import React from "react";
import { FieldNeraca } from "../../../../components/Lampiran3/LaporanNeraca";

export default function LaporanNeraca({ leftRows, rightRows, onValueChange, jumlahtotal }) {
  console.log("LaporanNeraca props:", { leftRows, rightRows }); // Debug log

  return (
    <div className="space-y-4">
      <FieldNeraca
        leftRows={leftRows}
        rightRows={rightRows}
        onValueChange={onValueChange}
        jumlahtotal={jumlahtotal}
      />
    </div>
  );
}
