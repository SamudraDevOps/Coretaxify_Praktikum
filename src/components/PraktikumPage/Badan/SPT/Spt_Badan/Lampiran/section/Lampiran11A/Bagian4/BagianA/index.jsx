import React from "react";
import PemberiNatura from "./PemberiNatura";

const jenisHarta = [
  { id: 1, kode: "01", value: "01", label: "Sepeda" },
  { id: 2, kode: "02", value: "02", label: "Motor" },
  { id: 3, kode: "03", value: "03", label: "Mobil Penumpang" },
  { id: 4, kode: "04", value: "04", label: "Bus" },
  { id: 5, kode: "05", value: "05", label: "Kendaraan Angkutan" },
  { id: 6, kode: "06", value: "06", label: "Kendaraan Khusus" },
  { id: 7, kode: "07", value: "07", label: "Kereta Api" },
  { id: 8, kode: "08", value: "08", label: "Pesawat Terbang" },
  { id: 9, kode: "09", value: "09", label: "Kapal Laut" },
  { id: 10, kode: "10", value: "10", label: "Mesin" },
  { id: 11, kode: "11", value: "11", label: "Gerobak/Troli" },
  { id: 12, kode: "12", value: "12", label: "Kapal Pesiar" },
  { id: 13, kode: "13", value: "13", label: "Peralatan" },
  { id: 14, kode: "14", value: "14", label: "Aset Bergerak Lainnya" },
  { id: 15, kode: "15", value: "15", label: "Peralatan Olahraga Khusus" },
  { id: 16, kode: "16", value: "16", label: "Peralatan Elektronik" },
  { id: 17, kode: "17", value: "17", label: "Rumah Tangga Furnitur" },
  { id: 18, kode: "18", value: "18", label: "Peralatan Lainnya" },
  { id: 19, kode: "19", value: "19", label: "Jet Ski" },
  { id: 20, kode: "20", value: "20", label: "Aset Lainnya" },
];

//  CONFIG
const ConfigComponent = {
  baseFields: [
    "jenis-Harta",
    "tahun",
    "biayaPerolehan",
    "penyusutanTahunLalu",
    "penyusutanTahunIni",
    "penyusutanCalculate",
  ],

  customChildren: [
    {
      key: "jenis-Harta",
      type: "select-search",
      title: "Jenis Harta Berwujud",
      required: true,
      span: 1,
      options: jenisHarta,
      onChange: (value, updateField, selectedOption) => {
        // Simpan value ke objekPajak
        updateField("jenis-harta", value);
        // Simpan kode secara terpisah
        // updateField("kode", selectedOption?.kode || "");
      },
    },
    {
      key: "penyusutanTahunLalu",
      type: "currency",
      title: "PENYUSUTAN S.D. tahun Lalu",
      placeholder: "Penyusutan S.D. Tahun Lalu",
    },

    {
      key: "penyusutanTahunIni",
      type: "currency",
      title: "PENYUSUTAN Tahun Ini",
      placeholder: "Penyusutan S.D. Tahun ini",
    },
    {
      key: "penyusutanCalculate",
      type: "currency",
      title: "PENYUSUTAN S.D. Tahun Ini",
      placeholder: "Akan Terhitung otomatis",
      readOnly: true,
    },
  ],
};

console.log("  Config defined:", ConfigComponent);

const PemberiNaturaIndex = () => {
  return (
    <div className="space-y-4">
      <PemberiNatura config={ConfigComponent} />
    </div>
  );
};

console.log(" ConfigComponent component exported");

export default PemberiNaturaIndex;
