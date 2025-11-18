import React from "react";
import PengurangPph from "./PengurangPph";

//  CONFIG BAGIAN A
const PengurangPphConfig = {
  baseFields: ["kode", "jenis", "nilaiPengurang"],

  customChildren: [
    {
      key: "jenis",
      type: "select",
      title: "Jenis Penghasilan",
      placeholder: "Pilih Jenis Penghasilan",
      required: true,
      span: 1,
      options: [
        {
          id: 1,
          kode: "28-423-01",
          value: "28-423-01",
          label:
            "Fasilitas Pembebasan Atau Pengurangan npm run",
        },
        {
          id: 2,
          kode: "28-423-99",
          value: "28-423-99",
          label: "PPh final sesuai PP-55/2022 (Disetor Sendiri)",
        },
      ],
      onChange: (value, updateField) => {
        updateField("kode", value);
      },
    },
    {
      key: "nilaiPengurang",
      type: "currency",
      title: "Nilai Pengurang Penghasilan Neto",
      placeholder: "Masukkan nilai pengurang penghasilan neto",
      required: false,
    },
  ],

  // defaultData: {
  //   namaPemotong: "PT. Contoh Perusahaan",
  //   npwpPemotong: "",
  //   kode: "",
  //   jenis: "",
  //   labakotor: "",
  // },
};

const PengurangPphIndex = () => {
  return (
    <div className="space-y-4">
      <PengurangPph config={PengurangPphConfig} />
    </div>
  );
};

// console.log(" BagianAIndex component exported");

export default PengurangPphIndex;
