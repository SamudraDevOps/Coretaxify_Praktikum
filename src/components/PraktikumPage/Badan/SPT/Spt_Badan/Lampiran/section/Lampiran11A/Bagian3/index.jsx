import React from "react";
import DaftarPiutang from "./DaftarPiutang";

const metodePembebananOptions = [
  {
    id: 1,
    kode: "1",
    value: "1",
    label: "Beban Langusung ",
  },
  {
    id: 2,
    kode: "2",
    value: "2",
    label: "Beban Cadangan",
  },
];

const jenisDokumenOptions = [
  {
    id: 1,
    kode: "1",
    value: "1",
    label: "Penyerahan Perkara",
  },
  {
    id: 2,
    kode: "2",
    value: "2",
    label: "Perjanjian Tertulis ",
  },
  {
    id: 3,
    kode: "3",
    value: "3",
    label: "Publikasi Penerbitan ",
  },

  {
    id: 4,
    kode: "4",
    value: "4",
    label: "Pengakuan Debitur ",
  },
];
//  CONFIG
const ConfigComponent = {
  baseFields: [
    "nomorIdentitas",
    "nama",
    "alamat",
    "plafonPiutang",
    "piutangTidakDptDitagih",
    "metode-Pembebanan",
    "jenis-Dokumen",
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
      title: "NAMA ",
      placeholder: "Nama ",
    },
    {
      key: "plafonPiutang",
      type: "currency",
      title: "Plafon Piutang",
      required: false,
    },

    {
      key: "piutangTidakDptDitagih",
      type: "currency",
      title: "Piutang yang nyata-nyata Tidak Dapat Ditagih",
      required: false,
    },
    {
      key: "metode-Pembebanan",
      type: "select-search",
      title: "Metode Pembebanan",
      required: true,
      span: 1,
      options: metodePembebananOptions,
      onChange: (value, updateField, selectedOption) => {
        // Simpan value ke objekPajak
        updateField("metode-Pembebanan", value);
        // Simpan kode secara terpisah
        // updateField("kode", selectedOption?.kode || "");
      },
    },

    {
      key: "jenis-Dokumen",
      type: "select-search",
      title: "Jenis Dokumen",
      required: true,
      span: 1,
      options: jenisDokumenOptions,
      onChange: (value, updateField, selectedOption) => {
        // Simpan value ke objekPajak
        updateField("jenis-Dokumen", value);
        // Simpan kode secara terpisah
        // updateField("kode", selectedOption?.kode || "");
      },
    },
  ],
};

console.log("  Config defined:", ConfigComponent);

const DaftarPiutangIndex = () => {
  return (
    <div className="space-y-4">
      <DaftarPiutang config={ConfigComponent} />
    </div>
  );
};

console.log(" ConfigComponent component exported");

export default DaftarPiutangIndex;
