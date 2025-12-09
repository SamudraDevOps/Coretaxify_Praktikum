import React from "react";
import BangunanTidakPermanen from "./BangunanTidakPermanen";

//  CONFIG Bangunan Tidak Permanen
const BangunanTidakPermanenConfig = {
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
          label: "Bangunan untuk tempat tinggal",
        },
        {
          id: 2,
          kode: "02",
          value: "02",
          label: "Bangunan untuk usaha (toko, pabrik, kantor, gudang, dan sejenisnya)",
        },
        {
          id: 3,
          kode: "03",
          value: "03",
          label: " Bangunan yang disewakan",
        },
        {
          id: 4,
          kode: "04",
          value: "04",
          label: "Apartemen",
        },
        {
          id: 5,
          kode: "05",
          value: "05",
          label: "Aset tidak Bergerak Lainnya",
        },
      ],

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

// console.log(" BangunanTidakPermanenConfig defined:", BangunanTidakPermanenConfig);

const BangunanTidakPermanenIndex = () => {
  return (
    <div className="space-y-4">
      <BangunanTidakPermanen config={BangunanTidakPermanenConfig} />
    </div>
  );
};

// console.log(" BangunanTidakPermanenIndex component exported");

export default BangunanTidakPermanenIndex;
