import React from "react";
import PenghasilanKenaPPh from "./PenghasilanKenaPPh";

//  CONFIG
const ConfigComponent = {
  baseFields: [
    "namaPemotong",
    "npwpPemotong",
    "objekPajak",
    "kode",
    "dasarPengenaanPajak",
    "tingkat",
    "pphFinalTerutang",
  ],

  customChildren: [
    {
      key: "objekPajak",
      type: "select-search",
      title: "Objek Pajak",
      placeholder: "Pilih Objek Pajak",
      required: true,
      span: 1,
      options: [
        {
          id: 1,
          kode: "Obj Kode 1",
          value: "Obj 1",
          label: "Objek Pajak 1",
        },
        {
          id: 2,
          kode: "Obj Kode 2",
          value: "Obj 2",
          label: "Objek Pajak 2",
        },
      ],
      onChange: (value, updateField, selectedOption) => {
        // Simpan value ke objekPajak
        updateField("objekPajak", value);
        // Simpan kode secara terpisah
        updateField("kode", selectedOption?.kode || "");
      },
    },
    {
      key: "tingkat",
      type: "number",
      title: "Tingkat (%)",
      placeholder: "",
      required: false,
      min: 0,
      max: 100,
    },
    {
      key: "pphFinalTerutang",
      type: "currency",
      title: "PPh Final Terutang (Rupiah)",
      placeholder: "Auto Calculate",
      required: false,
      readOnly: true,
    },
  ],

  onFieldChange: (key, value, formData, updateField) => {
    if (key === "dasarPengenaanPajak") {
      // Auto calculate ketika dasar pengenaan berubah
      const tingkatPersen = formData.tingkat || 0;
      const hasil = (value * tingkatPersen) / 100;
      updateField("pphFinalTerutang", hasil);
    }
  },
};

console.log("  Config defined:", ConfigComponent);

const PenghasilanKenaPPhIndex = () => {
  return (
    <div className="space-y-4">
      <PenghasilanKenaPPh config={ConfigComponent} />
    </div>
  );
};

console.log(" ConfigComponent component exported");

export default PenghasilanKenaPPhIndex;
