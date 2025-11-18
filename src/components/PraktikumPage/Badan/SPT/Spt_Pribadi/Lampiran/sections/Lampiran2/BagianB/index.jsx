import React from "react";
import PenghasilanTidakObjekPajak from "./PenghasilanTidakObjekPajak";

//  CONFIG BAGIAN A 
const bagianBConfig = {
  baseFields: ["kode", "jenis", "npwpPemotong", "namaPemotong", "labakotor"],

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
          kode: "303",
          value: "303",
          label: "Dividen atau bagian laba",
        },
        {
          id: 2,
          kode: "401",
          value: "401",
          label: "Pembebasan utang",
        },
        {
          id: 3,
          kode: "402",
          value: "402",
          label: "Hibah",
        },
        {
          id: 4,
          kode: "403",
          value: "403",
          label: "Bantuan/sumbangan",
        },
        {
          id: 5,
          kode: "404",
          value: "404",
          label: "Warisan",
        },
        {
          id: 6,
          kode: "405",
          value: "405",
          label: "Penerima Zakat",
        },
        {
          id: 7,
          kode: "406",
          value: "406",
          label: "Bagian laba anggota CV",
        },
        {
          id: 8,
          kode: "407",
          value: "407",
          label: "Klaim asuransi",
        },
        {
          id: 9,
          kode: "408",
          value: "408",
          label: "Beasiswa",
        },
        {
          id: 10,
          kode: "409",
          value: "409",
          label: "Hadiah",
        },
        {
          id: 11,
          kode: "424",
          value: "424",
          label: "Natura dan kenikmatan yang dikecualikan",
        },
        {
          id: 12,
          kode: "425",
          value: "425",
          label: "SHU koperasi",
        },
        {
          id: 13,
          kode: "498",
          value: "498",
          label: "Penghasilan lain yang tidak termasuk objek pajak",
        },
      ],
      onChange: (value, updateField) => {
        updateField("kode", value);
      },
    },
  ],

  defaultData: {
    namaPemotong: "PT. Contoh Perusahaan",
    npwpPemotong: "",
    kode: "",
    jenis: "",
    labakotor: "",
  },
};

console.log(" BagianB Config defined:", bagianBConfig);

const BagianBIndex = () => {
  return (
    <div className="space-y-4">
      <PenghasilanTidakObjekPajak config={bagianBConfig} />
    </div>
  );
};

console.log(" BagianBIndex component exported");

export default BagianBIndex;
