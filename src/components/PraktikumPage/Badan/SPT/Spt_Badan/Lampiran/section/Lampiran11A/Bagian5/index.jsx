import React from "react";
import DaftarDebitur from "./DaftarDebitur";

const kategoriOptions = [
  {
    id: 1,
    kode: "1",
    value: "1",
    label: "Kurang Lancar ",
  },
  {
    id: 2,
    kode: "2",
    value: "2",
    label: "Diragukan",
  },

  {
    id: 3,
    kode: "3",
    value: "3",
    label: "Macet",
  },
];

//  CONFIG
const ConfigComponent = {
  baseFields: [
    "nomorIdentitas",
    "nama",
    "alamat",
    "kreditKurangLancarAwalTahun",
    "kreditKurangLancarAkhirTahun",
    "jumlahBunga",
    "kategori",
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
      title: "NAMA DEBITUR",
      placeholder: "Nama ",
    },
    {
      key: "kreditKurangLancarAwalTahun",
      type: "currency",
      title: "NILAI KREDIT KURANG LANCAR - AWAL TAHUN BUKU",
      required: false,
    },

    {
      key: "kreditKurangLancarAkhirTahun",
      type: "currency",
      title: "NILAI KREDIT KURANG LANCAR - AKHIR TAHUN BUKU",
      required: false,
    },

    {
      key: "jumlahBunga",
      type: "currency",
      title: "JUMLAH BUNGA PADA TAHUN BUKU (AKRUAL)",
      required: false,
    },
    {
      key: "kategori",
      type: "select-search",
      title: "kategori",
      required: true,
      span: 1,
      options: kategoriOptions,
      onChange: (value, updateField, selectedOption) => {
        // Simpan value ke objekPajak
        updateField("kategori", value);
        // Simpan kode secara terpisah
        // updateField("kode", selectedOption?.kode || "");
      },
    },
  ],
};

console.log("  Config defined:", ConfigComponent);

const DaftarDebiturIndex = () => {
  return (
    <div className="space-y-4">
      <DaftarDebitur config={ConfigComponent} />
    </div>
  );
};

console.log(" ConfigComponent component exported");

export default DaftarDebiturIndex;
