import React from "react";
import Kelompok1 from "./Kelompok1";

//  CONFIG Kelompok 1
const Kelompok1Config = {
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
      options: [
        {
          id: 1,
          kode: "01",
          value: "01",
          label: "Paten",
        },
        {
          id: 2,
          kode: "02",
          value: "02",
          label: "Royalti",
        },
        {
          id: 3,
          kode: "03",
          value: "03",
          label: "Merek Dagang",
        },
        {
          id: 4,
          kode: "04",
          value: "04",
          label: "Merek Hak Bangunan",
        },
        {
          id: 5,
          kode: "05",
          value: "05",
          label: "Merek Hak Budidaya",
        },
        {
          id: 6,
          kode: "06",
          value: "06",
          label: "Niat Baik / Goodwill",
        },
        {
          id: 7,
          kode: "07",
          value: "07",
          label: "Hak Pengusahaan Hutan",
        },
        {
          id: 8,
          kode: "08",
          value: "08",
          label: "Hak di Lapangan Minyak dan Gas",
        },
        {
          id: 9,
          kode: "09",
          value: "09",
          label: "Hak Eksploitasi Sumber Daya Alam dan Hasil Alam Lainnya",
        },
        {
          id: 10,
          kode: "10",
          value: "10",
          label: "Hak Penggunaan",
        },
        {
          id: 11,
          kode: "11",
          value: "11",
          label: "Harta Tidak Berwujud Lainnya",
        },
      ],

      onChange: (value, updateField) => {
        updateField("kode", value);
      },
    },

    {
      key: "biayaPerolehan",
      type: "currency",
      title: "Biaya Perolehan",
      placeholder: "Masukkan jumlah biaya perolehan",
      required: true,
    },
    {
      key: "nilaiSisaBukuFiskal",
      type: "currency",
      title: "Nilai Sisa Buku Fiskal",
      placeholder: "Masukkan jumlah nilai sisa buku fiskal",
      required: true,
    },
    {
      key: "penyusutanDanAmortisasi",
      type: "currency",
      title: "Penyusutan dan Amortisasi",
      placeholder: "Masukkan jumlah penyusutan dan amortisasi",
      required: true,
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
  ],

  // defaultData: {
  //   namaPemotong: "PT. Contoh Perusahaan",
  //   npwpPemotong: "",
  //   kode: "",
  //   jenis: "",
  //   labakotor: "",
  // },
};

// console.log(" Kelompok1Config defined:", Kelompok1Config);

const Kelompok1Index = () => {
  return (
    <div className="space-y-4">
      <Kelompok1 config={Kelompok1Config} />
    </div>
  );
};

// console.log(" Kelompok1Index component exported");

export default Kelompok1Index;
