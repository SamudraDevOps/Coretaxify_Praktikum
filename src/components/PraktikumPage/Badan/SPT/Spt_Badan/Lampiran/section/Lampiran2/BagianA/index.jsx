import React from "react";
import PemegangSaham from "./PemegangSaham";

//  CONFIG
const ConfigComponent = {
  baseFields: ["namaPemotong", "npwp", "alamatPemotong", "negara", "jabatan", "nilai", "persen", "dividen"],

  customChildren: [
    {
      key: "jabatan",
      type: "text",
      title: "jabatan",
      placeholder: "Masukkan jabatan",
      required: false,
    },
    {
      key: "nilai",
      type: "currency",
      title: "Nilai Modal Disetor (Rp)",
      placeholder: "Masukkan nilai modal disetor",
      required: false,
    },
    {
      key: "persen",
      type: "number",
      title: "Persentase (%)",
      placeholder: "Masukkan persentase",
      required: false,
    },
    {
      key: "dividen",
      type: "currency",
      title: "Dividen yang Diterima (Rp)",
      placeholder: "Masukkan dividen yang diterima",
      required: false,
    },
  ],

  //   defaultData: {
  //     namaPemotong: "PT. Contoh Perusahaan",
  //     npwpPemotong: "",
  //     alamatPemotong: "",
  //     negara: "",
  //     jabatan: "",
  //     nilai: "",
  //     persen: "",
  //     dividen: "",
  //   },
};

console.log("  Config defined:", ConfigComponent);

const PemegangSahamIndex = () => {
  return (
    <div className="space-y-4">
      <PemegangSaham config={ConfigComponent} />
    </div>
  );
};

console.log(" ConfigComponent component exported");

export default PemegangSahamIndex;
