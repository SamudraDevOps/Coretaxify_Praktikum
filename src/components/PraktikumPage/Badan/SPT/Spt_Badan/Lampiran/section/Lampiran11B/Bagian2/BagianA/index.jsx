import React, { useState, useEffect } from "react";
import RataRataUtang from "./RataRataUtang";
import { parseFormattedNumber } from "@utils/formatCurrency";

const hubunganOptions = [
  { id: 1, kode: "1", value: "1", label: "Affiliation" },
  { id: 2, kode: "2", value: "2", label: "Independent" },
];

//  CONFIG
const ConfigComponent = {
  baseFields: [
    "nomorIdentitas",
    "nama",
    "hubungan",
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
      key: "nomorIdentitas",
      type: "text",
      title: "Nomor Identitas",
      placeholder: "(NPWP/NIK/LAINNYA)",
    },
    {
      key: "nama",
      type: "text",
      title: "NAMA ",
      placeholder: "Nama ",
    },
    {
      key: "hubungan",
      type: "select-search",
      title: "hubungan",
      required: true,
      span: 1,
      options: hubunganOptions,
      onChange: (value, updateField, selectedOption) => {
        updateField("hubungan", value);
      },
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

const RataRataUtangIndex = ({ onTotalChange }) => {
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
      <RataRataUtang config={ConfigComponent} data={data} setData={setData} />
    </div>
  );
};

export default RataRataUtangIndex;
