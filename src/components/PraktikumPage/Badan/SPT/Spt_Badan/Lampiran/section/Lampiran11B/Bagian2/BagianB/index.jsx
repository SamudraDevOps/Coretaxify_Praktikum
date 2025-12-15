import React, { useState, useEffect } from "react";
import RataRataModal from "./RataRataModal";
import { parseFormattedNumber } from "@utils/formatCurrency";

//  CONFIG
const ConfigComponent = {
  baseFields: [
    "rincianModal",
    "saldoBulanke1",
    "saldoBulanke2",
    "saldoBulanke3",
    "saldoBulanke4",
    "saldoBulanke5",
    "saldoBulanke6",
    "saldoBulanke7",
    "saldoBulanke8",
    "saldoBulanke9",
    "saldoBulanke10",
    "saldoBulanke11",
    "saldoBulanke12",
    "rata-rata",
  ],

  customChildren: [
    {
      key: "rincianModal",
      type: "currency",
      title: "Rincian Modal",
      placeholder: "",
    },
    ...Array.from({ length: 12 }, (_, i) => ({
      key: `saldoBulanke${i + 1}`,
      type: "currency",
      title: `SALDO UTANG BULAN KE-${i + 1}`,
      placeholder: "",
    })),
    {
      key: "rata-rata",
      type: "currency",
      title: "RATA-RATA",
      placeholder: "",
      readOnly: true,
    },
  ],
};

const RataRataModalIndex = ({ onTotalChange }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const total = data.reduce((sum, item) => {
      const rataRata = parseFormattedNumber(String(item["rata-rata"] ?? 0)) || 0;
      return sum + rataRata;
    }, 0);

    // Kirim total ke parent
    if (onTotalChange) {
      onTotalChange(total);
    }
  }, [data, onTotalChange]);

  return (
    <div className="space-y-4">
      <RataRataModal config={ConfigComponent} data={data} setData={setData} />
    </div>
  );
};

export default RataRataModalIndex;
