import React from "react";
import Kelompok1 from "./Kelompok1";
import { jenisHartaGlobal } from "../../config/jenisHartaOptions";

//  CONFIG Bangunan Tidak Permanen
const ConfigComponent = {
  baseFields: [
    "kode",
    "jenis",
    "bulanTahun",
    "biayaPerolehan",
    "nilaiSisaBukuFiskal",
    "komersial",
    "fiskal",
    "penyusutanDanAmortisasi",
    "keterangan",
  ],

  customChildren: [
    {
      key: "jenis",
      type: "select-search",
      title: "Jenis Harta",
      placeholder: "Pilih Jenis Harta",
      required: true,
      span: 1,
      options: jenisHartaGlobal,
      onChange: (value, updateField) => {
        updateField("kode", value);
      },
    },
    {
      key: "komersial",
      type: "select-search",
      title: "metode Penyusutan Komersial ",
      placeholder: "Pilih Metode Penyusutan Komersial",
      required: true,
      span: 1,
      options: [
        {
          id: 1,
          kode: "01",
          value: "01",
          label: "Garis Lurus",
        },
        {
          id: 2,
          kode: "02",
          value: "02",
          label: "Jumlah Angka Tahun",
        },
        {
          id: 3,
          kode: "03",
          value: "03",
          label: "Saldo Menurun",
        },
        {
          id: 4,
          kode: "04",
          value: "04",
          label: "Saldo Menurun Ganda",
        },
        {
          id: 5,
          kode: "05",
          value: "05",
          label: "Jumlah Jam Jasa",
        },
        {
          id: 6,
          kode: "06",
          value: "06",
          label: "Jumlah Satuan Produksi",
        },
        {
          id: 7,
          kode: "07",
          value: "07",
          label: "Metode Lainnya",
        },
      ],
    },

    {
      key: "fiskal",
      type: "select-search",
      title: "metode Penyusutan Fiskal",
      placeholder: "Pilih Metode Penyusutan Fiskal",
      required: true,
      span: 1,
      options: [
        {
          id: 1,
          kode: "01",
          value: "01",
          label: "GL/Straight Line (Garus Lurus)",
        },
        {
          id: 2,
          kode: "02",
          value: "02",
          label: "JSP/Number Of Production Unit (Jumlah Satuan Produksi)",
        },
        {
          id: 3,
          kode: "03",
          value: "03",
          label: "SM/Declining Method (Saldo Menurun)",
        },
      ],
    },
    {
      key: "nilaiSisaBukuFiskal",
      type: "currency",
      title: "Nilai Sisa Buku Fiskal Pada Awal Tahun ",
      placeholder: "Nilai Sisa Buku Fiskal",
      required: false,
    },
    {
      key: "penyusutanDanAmortisasi",
      type: "currency",
      title: "PENYUSUTAN/AMORTISASI FISKAL TAHUN INI ",
      placeholder: "Pentusutan / Amortisasi",
      required: false,
    },
  ],

  // defaultData: {
  //   namaPemotong: "PT. Contoh Perusahaan",
  //   npwpPemotong: "",
  //   kode: "",
  //   jenis: "",
  //   labakotor: "",
  // },
};

// console.log(" Kelompok1 defined:", Kelompok1);

const Kelompok1Index = () => {
  return (
    <div className="space-y-4">
      <Kelompok1 config={ConfigComponent} />
    </div>
  );
};

// console.log(" Kelompok1Index component exported");

export default Kelompok1Index;
