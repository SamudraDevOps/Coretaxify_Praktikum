import React from "react";
import DaftarPiutang from "./DaftarPiutang";

//  CONFIG Kelompok 1
const DaftarPiutangConfig = {
  baseFields: [
    "namaPemotong",
    "npwpPemotong",
    "alamat",
    "jumlahPiutangDitagih",
    "jumlahPiutangTidakDitagih",
    "metodepembebanan",
    "jenisDokumen",
  ],

  customChildren: [
    {
      key: "metodepembebanan",
      type: "select-search",
      title: "METODE PEMBEBANAN",
      placeholder: "Pilih Metode Pembebanan",
      required: true,
      span: 1,
      options: [
        {
          id: 1,
          kode: "01",
          value: "01",
          label: " Beban Langsung",
        },
        {
          id: 2,
          kode: "02",
          value: "02",
          label: "Beban Cadangan",
        },
      ],
    },
    {
      key: "jenisDokumen",
      type: "select-search",
      title: "JENIS DOKUMEN PEMBUKTIAN YANG DISYARATKAN",
      placeholder: "Pilih Jenis Dokumen",
      required: true,
      span: 1,
      options: [
        {
          id: 1,
          kode: "01",
          value: "01",
          label: " Penyerahan Perkara",
        },
        {
          id: 2,
          kode: "02",
          value: "02",
          label: "Perjanjian Tertulis",
        },
        {
          id: 3,
          kode: "03",
          value: "03",
          label: "Publikasi Penerbitan",
        },
        {
          id: 4,
          kode: "04",
          value: "04",
          label: "Pengakuan Debitur",
        },
      ],
    },

    {
      key: "jumlahPiutangDitagih",
      type: "currency",
      title: "Jumlah Plafon Piutang",
      placeholder: "Masukkan jumlah piutang",
      required: true,
    },

    {
      key: "jumlahPiutangTidakDitagih",
      type: "currency",
      title: "Jumlah Piutang Yang Nyata-Nyata Tidak Dapat Ditagih",
      placeholder: "Masukkan jumlah piutang",
      required: true,
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

// console.log(" DaftarPiutangConfig defined:", DaftarPiutangConfig);

const DaftarPiutangIndex = () => {
  return (
    <div className="space-y-4">
      <DaftarPiutang config={DaftarPiutangConfig} />
    </div>
  );
};

// console.log(" DaftarPiutangIndex component exported");

export default DaftarPiutangIndex;
