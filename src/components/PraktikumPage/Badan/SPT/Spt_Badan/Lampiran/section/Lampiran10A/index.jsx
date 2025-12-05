import React from "react";
import DaftarTransaksi from "./DaftarTransaksi";

const optionsHubungan = [
  {
    id: 1,
    kode: "1",
    value: "1",
    label:
      "Hubungan Istimewa Karena Kepemilikan saham/penyertaan Sebagaimana Diatur oleh pasal 18 ayat (4) huruf a Undang-Undang Pajak Penghasilan",
  },
  {
    id: 2,
    kode: "2",
    value: "2",
    label:
      "Hubungan Istimewa Karena Penguasaan Sebagaimana Diatur oleh pasal 18 ayat (4) huruf b Undang-Undang Pajak Penghasilan",
  },
  {
    id: 3,
    kode: "3",
    value: "3",
    label:
      "Hubungan Istimewa Karena Hubungan Keluarga Sebagaimana Diatur oleh pasal 18 ayat (4) huruf c Undang-Undang Pajak Penghasilan",
  },
  {
    id: 4,
    kode: "4",
    value: "4",
    label:
      "Hubungan Istimewa Karena Pengendalian Sebagaimana Diatur oleh pasal 9 ayat (1) Perjanjian Penghindaran Pajak Berganda (tax treaty) Antara Indonesia dengan Negara Domisili Pihak yang  Mempunyai hubungan Istimewa dengan Wajib Pajak",
  },
];

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

const optionMetodePenentuanHarga = [
  {
    id: 1,
    kode: "1",
    value: "1",
    label: "Metode Perbandingan Harga AntarPihak yang Independen",
  },
  {
    id: 2,
    kode: "2",
    value: "2",
    label: "Metode Biaya-Plus",
  },
  {
    id: 3,
    kode: "3",
    value: "3",
    label: "Metode Harga Penjualan Kembali",
  },
  {
    id: 4,
    kode: "4",
    value: "4",
    label: "Metode Laba Bersih Transaksional",
  },
  {
    id: 5,
    kode: "5",
    value: "5",
    label: "Metode Pembagian Laba",
  },
  {
    id: 6,
    kode: "6",
    value: "6",
    label: "Metode Pembagian Transaksi Independen",
  },
  {
    id: 7,
    kode: "7",
    value: "7",
    label: "Metode Dalam Penialian Harta Berwujud dan/atau Harta tidak Berwujud",
  },
  {
    id: 8,
    kode: "8",
    value: "8",
    label: "Metode Dalam Penialian Bisnis",
  },
  {
    id: 9,
    kode: "9",
    value: "9",
    label: "Metode Biaya-Plus Dengan Besaran Kenaikan",
  },
];

//  CONFIG
const ConfigComponent = {
  baseFields: [
    "npwpPemotong",
    "namaPemotong",
    "negara",
    "hubungan",
    "kegiatanUsaha",
    "jenis-transaksi",
    "nilaiTransaksi",
    "metodePenentuanHarga",
    "alasanPemilihanMetode",
  ],

  customChildren: [
    {
      key: "npwpPemotong",
      type: "text",
      title: "NPWP/TIN (Pihak Yang Dipengaruhi Hubungan Istimewa)",
      placeholder: "NPWP/TIN Mitra Transaksi",
    },
    {
      key: "namaPemotong",
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
      key: "hubungan",
      type: "select-search",
      title: "Bentuk Hubungan ",
      placeholder: "Pilih Bentuk Hubungan",
      required: false,
      span: 1,
      options: optionsHubungan,
      onChange: (value, updateField, selectedOption) => {
        // Simpan value ke objekPajak
        updateField("hubungan", value);
        // Simpan kode secara terpisah
        // updateField("kode", selectedOption?.kode || "");
      },
    },

    {
      key: "kegiatanUsaha",
      type: "text",
      title: "Kegiatan Usaha",
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

    {
      key: "metodePenentuanHarga",
      type: "select-search",
      title: "Metode Penentuan Harga Transfer Yang Digunakan ",
      placeholder: "Pilih Metode Penentuan Harga",
      required: false,
      span: 1,
      options: optionMetodePenentuanHarga,
      onChange: (value, updateField, selectedOption) => {
        // Simpan value ke objekPajak
        updateField("metodePenentuanHarga", value);
        // Simpan kode secara terpisah
        // updateField("kode", selectedOption?.kode || "");
      },
    },

    {
      key: "alasanPemilihanMetode",
      type: "text",
      title: "Alasan Pemilihan Metode",
      required: false,
    },
  ],
};

console.log("  Config defined:", ConfigComponent);

const DaftarTransaksiIndex = () => {
  return (
    <div className="space-y-4">
      <DaftarTransaksi config={ConfigComponent} />
    </div>
  );
};

console.log(" ConfigComponent component exported");

export default DaftarTransaksiIndex;
