import React from "react";
import BiayaPinjaman from "./BiayaPinjaman";

//  CONFIG
const ConfigComponent = {
  baseFields: [
    "pemberiPinjaman",
    "saldoRataRataUtang",
    "biayaPinjamanBunga",
    "biayaPinjamanDptDiperhitungkan",
    "biayaPinjamanTdkDiperhitungkan",
  ],

  customChildren: [
    {
      key: "pemberiPinjaman",
      type: "text",
      title: "PEMBERI PINJAMAN",
      placeholder: "",
    },
    {
      key: "saldoRataRataUtang",
      type: "currency",
      title: "PENYUSUTAN S.D. tahun Lalu",
      placeholder: "Penyusutan S.D. Tahun Lalu",
    },

    {
      key: "biayaPinjamanBunga",
      type: "currency",
      title: "PENYUSUTAN Tahun Ini",
      placeholder: "Penyusutan S.D. Tahun ini",
    },
    {
      key: "biayaPinjamanDptDiperhitungkan",
      type: "currency",
      title: "PENYUSUTAN S.D. Tahun Ini",
      placeholder: "Akan Terhitung otomatis",
    },

    {
      key: "biayaPinjamanTdkDiperhitungkan",
      type: "currency",
      title: "PENYUSUTAN S.D. Tahun Ini",
      placeholder: "Akan Terhitung otomatis",
      readOnly: true,
    },
  ],
  
};

console.log("  Config defined:", ConfigComponent);

const BiayaPinjamanIndex = () => {
  return (
    <div className="space-y-4">
      <BiayaPinjaman config={ConfigComponent} />
    </div>
  );
};

console.log(" ConfigComponent component exported");

export default BiayaPinjamanIndex;
