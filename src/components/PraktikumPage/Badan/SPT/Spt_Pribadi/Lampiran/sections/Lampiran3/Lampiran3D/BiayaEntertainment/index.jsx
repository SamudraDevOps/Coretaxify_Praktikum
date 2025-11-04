import React from "react";
import BiayaEntertainment from "./BiayaEntertainment";

//  CONFIG Kelompok 1
const BiayaEntertainmentConfig = {
  baseFields: [
    "calender",
    "namaTempatEntertainment",
    "alamat",
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
      title: "Jenis Entertainment",
      placeholder: "Pilih Jenis Entertainment",
      required: true,
      span: 1,
      options: [
        {
          id: 1,
          kode: "01",
          value: "01",
          label: "Jamuan makan/minum dengan relasi usaha",
        },
        {
          id: 2,
          kode: "02",
          value: "02",
          label: "Coffee meeting atau pertemuan bisnis di restoran/hotel",
        },
        {
          id: 3,
          kode: "03",
          value: "03",
          label: "Biaya representasi pimpinan atau staf marketing",
        },
        {
          id: 4,
          kode: "04",
          value: "04",
          label: "Biaya tamu/penginapan relasi usaha (hotel, transport, konsumsi)",
        },
        {
          id: 5,
          kode: "05",
          value: "05",
          label: "Pemberian cinderamata atau souvenir kepada relasi usaha",
        },
        {
          id: 6,
          kode: "06",
          value: "06",
          label: "Sponsorship atau dukungan acara promosi pelanggan",
        },
        {
          id: 7,
          kode: "07",
          value: "07",
          label: "Customer gathering atau distributor appreciation event",
        },
        {
          id: 8,
          kode: "08",
          value: "08",
          label: "Seminar, workshop, atau pelatihan promosi produk",
        },
        {
          id: 9,
          kode: "09",
          value: "09",
          label: "Kegiatan CSR yang bernilai promosi (branding perusahaan)",
        },
        {
          id: 10,
          kode: "10",
          value: "10",
          label: "Kunjungan bisnis dan perjalanan hubungan relasi usaha",
        },
        {
          id: 11,
          kode: "11",
          value: "11",
          label: "Hiburan seperti karaoke, konser, atau pertunjukan bersama klien",
        },
        {
          id: 12,
          kode: "12",
          value: "12",
          label: "Hadiah atau bingkisan promosi untuk relasi bisnis",
        },
        {
          id: 13,
          kode: "13",
          value: "13",
          label: "Sponsorship media atau influencer dalam rangka promosi",
        },
        {
          id: 14,
          kode: "14",
          value: "14",
          label: "Partisipasi pameran, expo, atau bazar promosi produk",
        },
        {
          id: 15,
          kode: "15",
          value: "15",
          label: "Demonstrasi produk, product launch, atau test drive",
        },
        {
          id: 16,
          kode: "16",
          value: "16",
          label: "Biaya hiburan dalam acara peluncuran atau promosi langsung",
        },
        {
          id: 17,
          kode: "17",
          value: "17",
          label: "Biaya ulang tahun perusahaan atau anniversary dengan relasi usaha",
        },
        {
          id: 18,
          kode: "18",
          value: "18",
          label: "Family gathering atau kegiatan internal yang melibatkan relasi bisnis",
        },
        {
          id: 19,
          kode: "19",
          value: "19",
          label: "Perayaan hari besar dengan pelanggan atau mitra usaha",
        },
        {
          id: 20,
          kode: "20",
          value: "20",
          label: "Biaya entertainment lainnya yang terkait kegiatan usaha",
        },
      ],

      onChange: (value, updateField) => {
        updateField("kode", value);
      },
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

// console.log(" BiayaEntertainmentConfig defined:", BiayaEntertainmentConfig);

const BiayaEntertainmentIndex = () => {
  return (
    <div className="space-y-4">
      <BiayaEntertainment config={BiayaEntertainmentConfig} />
    </div>
  );
};

// console.log(" BiayaEntertainmentIndex component exported");

export default BiayaEntertainmentIndex;
