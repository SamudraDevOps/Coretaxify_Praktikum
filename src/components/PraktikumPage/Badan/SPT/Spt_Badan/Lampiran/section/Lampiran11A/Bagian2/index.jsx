import React from "react";
import BiayaEntertaiment from "./BiayaEntertaiment";

//  CONFIG
const ConfigComponent = {
  baseFields: [
    "calender",
    "tempat",
    "alamat",
    "jenis",
    "nilaiTransaksi",
    "namaUsaha",
    "jabatan",
    "namaPerusaahaan",
    "jenisUsaha",
    "keterangan",
  ],

  customChildren: [
    {
      key: "tempat",
      type: "text",
      title: "Tempat",
      placeholder: "Tempat",
      required: true,
    },
    {
      key: "jenis",
      type: "text",
      title: "Jenis",
      placeholder: "Jenis",
    },

    {
      key: "nilaiTransaksi",
      type: "currency",
      title: "Nilai ",
      required: false,
    },
    {
      key: "namaUsaha",
      type: "text",
      title: "Nama Relasi Usaha yang diberikan Entertaiment",
      required: false,
    },
    {
      key: "jabatan",
      type: "text",
      title: "Jabatan",
      required: false,
    },

    {
      key: "namaPerusaahaan",
      type: "text",
      title: "Nama Perusahaan",
      required: false,
    },
    {
      key: "jenisUsaha",
      type: "text",
      title: "Jenis Usaha",
      required: false,
    },
  ],
};

console.log("  Config defined:", ConfigComponent);

const BiayaEntertaimentIndex = () => {
  return (
    <div className="space-y-4">
      <BiayaEntertaiment config={ConfigComponent} />
    </div>
  );
};

console.log(" ConfigComponent component exported");

export default BiayaEntertaimentIndex;
