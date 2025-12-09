import React from "react";
import BiayaPromosi from "./BiayaPromosi";

const jenisBaiayaOptions = [
  {
    id: 1,
    kode: "1",
    value: "1",
    label: "Biaya Pameran Produk",
  },
  {
    id: 2,
    kode: "2",
    value: "2",
    label: "Biaya Pengenalan Produk",
  },
  {
    id: 3,
    kode: "3",
    value: "3",
    label: "Biaya Periklanan di Media Elektronik, Media Cetak, dan/atau Media Lainnya",
  },
  {
    id: 4,
    kode: "4",
    value: "4",
    label: "Biaya Sponsorship yang berkaitan dengan Promosi Produk",
  },
  {
    id: 5,
    kode: "5",
    value: "5",
    label: "Penggantian atau Imbalan yang Diberikan dalam Bentuk Natura atau Kenikmatan",
  },
];
//  CONFIG
const ConfigComponent = {
  baseFields: [
    "npwpPenerima",
    "namaPenerima",
    "alamat",
    "calender",
    "jenisBiaya",
    "nilaiTransaksi",
    "keterangan",
    "pphdipotong",
    "nomorBuktiPemotongan",
  ],

  customChildren: [
    {
      key: "npwpPenerima",
      type: "text",
      title: "NPWP Penerima",
      placeholder: "NPWP Penerima",
    },
    {
      key: "namaPenerima",
      type: "text",
      title: "NAMA PENERIMA",
      placeholder: "Nama Penerima",
    },
    {
      key: "jenisBiaya",
      type: "select-search",
      title: "Jenis Biaya",
      required: true,
      span: 1,
      options: jenisBaiayaOptions,
      onChange: (value, updateField, selectedOption) => {
        // Simpan value ke objekPajak
        updateField("jenis-biaya", value);
        // Simpan kode secara terpisah
        // updateField("kode", selectedOption?.kode || "");
      },
    },
    {
      key: "nilaiTransaksi",
      type: "currency",
      title: "Nilai Transaksi",
      required: false,
    },
    {
      key: "nomorBuktiPemotongan",
      type: "text",
      title: "Nomor Bukti Pemotongan",
      required: false,
    },
  ],
};

console.log("  Config defined:", ConfigComponent);

const BiayaPromosiIndex = () => {
  return (
    <div className="space-y-4">
      <BiayaPromosi config={ConfigComponent} />
    </div>
  );
};

console.log(" ConfigComponent component exported");

export default BiayaPromosiIndex;
