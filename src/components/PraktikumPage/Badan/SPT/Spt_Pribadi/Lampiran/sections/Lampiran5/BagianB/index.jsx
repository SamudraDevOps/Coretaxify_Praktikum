import React from "react";
import PenguranganNeto from "./PenguranganNeto";

//  CONFIG Kelompok 1
const PenguranganNetoConfig = {
  // baseFields hanya yang ada di BASE_FIELD_TEMPLATES
  baseFields: ["kode", "jenis", "nilaiPengurang"],

  customChildren: [
    {
      key: "jenis",
      type: "select-search",
      title: "Jenis Pengurang Penghasilan Neto",
      placeholder: "Pilih Jenis Pengurang Penghasilan Neto ",
      required: true,
      span: 1,
      options: [
        { id: 1, kode: "01", value: "01", label: "Zakat" },
        { id: 2, kode: "02", value: "02", label: "Sumbangan Keagamaan" },
        {
          id: 3,
          kode: "03",
          value: "03",
          label: "Fasilitas Pengurang Penghasilan Kena Pajak (Tax Allowance)",
        },
        {
          id: 4,
          kode: "04",
          value: "04",
          label: "Fasilitas keringanan pajak lainnya (Tax Reliefs)",
        },
        {
          id: 5,
          kode: "05",
          value: "05",
          label: "Pengurang Penghasilan Neto lainnya",
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

// console.log(" PenguranganNetoConfig defined:", PenguranganNetoConfig);

const PenguranganNetoIndex = ({ totalKompensasi2025, onTotalChange }) => {
  return (
    <div className="space-y-4">
      <PenguranganNeto
        config={PenguranganNetoConfig}
        totalKompensasi2025={totalKompensasi2025}
        onTotalChange={onTotalChange}
      />
    </div>
  );
};


export default PenguranganNetoIndex;
