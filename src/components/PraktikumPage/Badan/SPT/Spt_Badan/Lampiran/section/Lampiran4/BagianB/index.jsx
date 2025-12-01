import React from "react";
import PenghasilanTidakObjekPajak from "./PenghasilanTidakObjekPajak";

//  CONFIG
const ConfigComponent = {
  baseFields: ["kode", "jenisPenghasilan", "sumberPenghasilan", "penghasilanBruto"],
  customChildren: [
    {
      key: "jenisPenghasilan",
      type: "select-search",
      title: "Objek Pajak",
      placeholder: "Pilih Objek Pajak",
      required: true,
      span: 1,
      options: [
        {
          id: 1,
          kode: "penghasilan Kode 1",
          value: "Penghasilan 1",
          label: "Penghasilan 1",
        },
        {
          id: 2,
          kode: "penghasilan Kode 2",
          value: "Penghasilan 2",
          label: "Penghasilan 2",
        },
      ],
      onChange: (value, updateField, selectedOption) => {
        // Simpan value
        updateField("jenisPenghasilan", value);
        // Simpan kode
        updateField("kode", selectedOption?.kode || "");
      },
    },
    {
      key: "sumberPenghasilan",
      type: "text",
      title: "Sumber Penghasilan",
      placeholder: "Sumber Penghasilan",
      required: false,
    },
    {
      key: "penghasilanBruto",
      type: "currency",
      title: "Penghasilan Bruto",
      placeholder: "Penghasilan Bruto",
      required: false,
    },
  ],

};

console.log("  Config defined:", ConfigComponent);

const PenghasilanTidakObjekPajakIndex = () => {
  return (
    <div className="space-y-4">
      <PenghasilanTidakObjekPajak config={ConfigComponent} />
    </div>
  );
};

console.log(" ConfigComponent component exported");

export default PenghasilanTidakObjekPajakIndex;
