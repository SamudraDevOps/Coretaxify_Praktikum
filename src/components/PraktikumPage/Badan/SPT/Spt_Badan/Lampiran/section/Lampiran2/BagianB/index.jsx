import React from "react";
import DaftarPenyetoran from "./DaftarPenyetoran";

//  CONFIG
const ConfigComponent = {
  baseFields: [
    "namaPemotong",
    "negara",
    "npwpPemotong",
    "nilaiModal",
    "persenModal",
    "nilaiUtang",
    "tahunUtang",
    "bungaHutang",
    "nilaiPiutang",
    "tahunPiutang",
    "bungaPiutang",
  ],

  customChildren: [
    {
      key: "nilaiModal",
      type: "currency",
      title: "Pernyetaan modal Nilai (Rp)",
      placeholder: "Masukkan nilai modal",
      required: false,
    },
    {
      key: "persenModal",
      type: "number",
      title: "Persentase Pernyataan Modal (%)",
      placeholder: "Masukkan persentase pernyataan modal",
      required: false,
    },
    {
      key: "nilaiUtang",
      type: "currency",
      title: "Nilai Utang (Rp)",
      placeholder: "Masukkan nilai utang",
      required: false,
    },
    {
      key: "tahunUtang",
      type: "year",
      title: "Tahun Hutang Pajak",
      placeholder: "Masukkan tahun hutang pajak",
      required: false,
    },
    {
      key: "bungaHutang",
      type: "currency",
      title: "Bunga Hutang Per Tahun (Rp)",
      placeholder: "Masukkan bunga hutang",
      required: false,
    },
    {
      key: "nilaiPiutang",
      type: "currency",
      title: "Nilai Piutang (Rp)",
      placeholder: "Masukkan nilai piutang",
      required: false,
    },
    {
      key: "tahunPiutang",
      type: "year",
      title: "Tahun Piutang Pajak",
      placeholder: "Masukkan tahun piutang pajak",
      required: false,
    },
    {
      key: "bungaPiutang",
      type: "currency",
      title: "Bunga Piutang Per Tahun (Rp)",
      placeholder: "Masukkan bunga piutang",
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

const DaftarPenyetoranIndex = () => {
  return (
    <div className="space-y-4">
      <DaftarPenyetoran config={ConfigComponent} />
    </div>
  );
};

console.log(" ConfigComponent component exported");

export default DaftarPenyetoranIndex;
