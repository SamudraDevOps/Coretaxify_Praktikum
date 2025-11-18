import React from "react";
import PenghasilanLuarNegeri from "./PenghasilanLuarNegeri";

//  CONFIG BAGIAN A
const bagianCConfig = {
  baseFields: [
    "namaPemotong",
    "npwpPemotong",
    "kode",
    "jenis",
    "namaPemberi",
    "negara",
    "tanggalPemotongan",
    "penghasilanNeto",
    "pajakDibayarLuarNegeri",
    "mataUang",
    "pajakDibayarRupiah",
    "kreditYangDapatDiperhitungkan",
  ],
  customChildren: [
    {
      key: "jenis",
      type: "select-search",
      title: "Jenis Penghasilan",
      placeholder: "Pilih Jenis Penghasilan",
      required: true,
      span: 1,
      options: [
        {
          id: 1,
          kode: "101",
          value: "101",
          label: "Penghasilan dari pekerjaan dalam hubungan kerja",
        },
        {
          id: 2,
          kode: "102",
          value: "102",
          label: "Penghasilan dari usaha dan/atau pekerjaan bebas",
        },
        {
          id: 3,
          kode: "103",
          value: "103",
          label: "Penghasilan dari modal (dividen, bunga, royalti)",
        },
        {
          id: 4,
          kode: "104",
          value: "104",
          label: "Penghasilan dari pekerjaan bebas (profesi luar negeri)",
        },
        {
          id: 5,
          kode: "105",
          value: "105",
          label: "Penghasilan dari pengalihan harta (capital gain)",
        },
        {
          id: 6,
          kode: "106",
          value: "106",
          label: "Penghasilan lainnya (hadiah, pensiun, dan sebagainya)",
        },
      ],
      onChange: (value, updateField) => {
        updateField("kode", value);
      },
    },
    {
      key: "namaPemberi",
      type: "text",
      title: "Nama Pemberi Penghasilan",
      placeholder: "Masukkan nama pemberi penghasilan",
      required: true,
    },

    {
      // Api Negara
      key: "negara",
      type: "select-search",
      title: "Nama Negara",
      placeholder: "Cari atau pilih negara...",
      required: true,
      apiEndpoint: "https://restcountries.com/v3.1/all?fields=name,currencies,cca2",
      searchable: true,
      onChange: (value, updateField, selectedOption) => {
        updateField("negara", value);
        updateField("kodeNegara", selectedOption?.kodeNegara || "");
        updateField("nama", value);

        if (selectedOption?.mataUangPrefill && selectedOption.mataUangPrefill !== "—") {
          updateField("mataUang", selectedOption.mataUangPrefill);
        }
      },
    },

    {
      key: "tanggalPemotongan",
      type: "date",
      title: "Tanggal Pemotongan",
      placeholder: "Pilih tanggal pemotongan",
      required: false,
    },
    {
      key: "penghasilanNeto",
      type: "currency",
      title: "Penghasilan Neto",
      placeholder: "Masukkan jumlah penghasilan neto",
      required: false,
    },

    {
      key: "pajakDibayarLuarNegeri",
      type: "currency",
      title: "Pajak yang Dibayar/Dipotong di Luar Negeri (Mata Uang Asing)",
      placeholder: "Masukkan jumlah pajak yang dibayar",
      required: true,
    },

    {
      // Auto dari API Negara dan bisa di rubah lagi bang
      key: "mataUang",
      type: "select-search",
      title: "Mata Uang",
      placeholder: "Cari atau pilih mata uang...",
      required: false,
      searchable: true,
    },
    {
      key: "pajakDibayarRupiah",
      type: "currency",
      title: "Pajak yang Dibayar/Dipotong di Luar Negeri (Rupiah)",
      placeholder: "Masukkan jumlah pajak dalam rupiah",
      required: true,
    },

    {
      key: "kreditYangDapatDiperhitungkan",
      type: "currency",
      title: "Kredit yang Dapat Diperhitungkan",
      placeholder: "Masukkan jumlah kredit yang dapat diperhitungkan",
      required: true,
    },
  ],

  defaultData: {
    namaPemotong: "PT. Contoh Perusahaan",
    npwpPemotong: "",
    kode: "",
    jenis: "",
    namaPemberi: "",
    negara: "",
    tanggalPemotongan: "",
    penghasilanNeto: "",
    pajakDibayarLuarNegeri: "",
    mataUang: "",
    pajakDibayarRupiah: "",
    kreditYangDapatDiperhitungkan: "",
  },
};

console.log(" BagianC Config defined:", bagianCConfig);

const BagianCIndex = () => {
  return (
    <div className="space-y-4">
      <PenghasilanLuarNegeri config={bagianCConfig} />
    </div>
  );
};

console.log(" BagianBIndex component exported");

export default BagianCIndex;
