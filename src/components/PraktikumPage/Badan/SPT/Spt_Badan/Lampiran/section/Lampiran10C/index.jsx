import React from "react";
import Transaksi from "./Transaksi";

const optionsJenisTransaksi = [
  {
    id: 1,
    kode: "1",
    value: "1",
    label: "Pejualan Barang Berwujud (Bahan Baku, Barang Jadi, dan Barang Dagangan)",
  },
  {
    id: 2,
    kode: "2",
    value: "2",
    label: "Penjualan Barang Modal, Termasuk Aktiva Tetap",
  },
  {
    id: 3,
    kode: "3",
    value: "3",
    label: "Penyerahan Barang Tidak Berwujud ",
  },
  {
    id: 4,
    kode: "4",
    value: "4",
    label: "Peminjaman Uang ke Pihak yang Memiliki Hubungan Istimewa",
  },

  {
    id: 5,
    kode: "5",
    value: "5",
    label: "Pinjaman Uang ke Pihak yang Memiliki Hubungan Istimewa",
  },
  {
    id: 6,
    kode: "6",
    value: "6",
    label: "Penyerahan Jasa",
  },
  {
    id: 7,
    kode: "7",
    value: "7",
    label: "Pemanfaaatan Jasa",
  },
  {
    id: 8,
    kode: "8",
    value: "8",
    label: "Penyerahan Instrumen Keuangan Seperti Saham dan Obligasi",
  },
  {
    id: 9,
    kode: "9",
    value: "9",
    label: "Perolehan Instrumen Keuangan Seperti Saham dan Obligasi",
  },
  {
    id: 10,
    kode: "10",
    value: "10",
    label: "Transaksi Penyerahan Lainnya",
  },
  {
    id: 11,
    kode: "11",
    value: "11",
    label: "Transaksi Pembelian Lainnya",
  },
];

//  CONFIG
const ConfigComponent = {
  baseFields: [
    "namaMitra",
    "jenis-transaksi",
    "negara",
    "nilaiTransaksi",
  ],

  customChildren: [
    {
      key: "namaMitra",
      type: "text",
      title: "Nama ",
      placeholder: "Nama Mitra Transaksi",
    },
    {
      key: "negara",
      type: "select-search",
      title: "Negara ",
      required: false,
    },
    {
      key: "jenis-transaksi",
      type: "select-search",
      title: "Jenis Transaksi ",
      placeholder: "Pilih Jenis Transaksi",
      required: false,
      span: 1,
      options: optionsJenisTransaksi,
      onChange: (value, updateField, selectedOption) => {
        // Simpan value ke objekPajak
        updateField("jenis-transaksi", value);
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
  ],
};

console.log("  Config defined:", ConfigComponent);

const TransaksiIndex = () => {
  return (
    <div className="space-y-4">
      <Transaksi config={ConfigComponent} />
    </div>
  );
};

console.log(" ConfigComponent component exported");

export default TransaksiIndex;
