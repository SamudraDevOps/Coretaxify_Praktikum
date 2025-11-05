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
          label: "Sepeda",
        },
        {
          id: 2,
          kode: "02",
          value: "02",
          label: "Motor",
        },
        {
          id: 3,
          kode: "03",
          value: "03",
          label: "Mobil Penumpang",
        },
        {
          id: 4,
          kode: "04",
          value: "04",
          label: "Bus",
        },
        {
          id: 5,
          kode: "05",
          value: "05",
          label: "Kendaraan Angkutan",
        },
        {
          id: 6,
          kode: "06",
          value: "06",
          label: "Kendaraan Khusus",
        },
        {
          id: 7,
          kode: "07",
          value: "07",
          label: "Kereta",
        },
        {
          id: 8,
          kode: "08",
          value: "08",
          label: "Pesawat Terbang",
        },
        {
          id: 9,
          kode: "09",
          value: "09",
          label: "Kapal Laut",
        },
        {
          id: 10,
          kode: "10",
          value: "10",
          label: "Mesin",
        },
        {
          id: 11,
          kode: "11",
          value: "11",
          label: "Cart",
        },
        {
          id: 12,
          kode: "12",
          value: "12",
          label: "Kapal Pesiar",
        },
        {
          id: 13,
          kode: "13",
          value: "13",
          label: "Peralatan",
        },
        {
          id: 14,
          kode: "14",
          value: "14",
          label: "Aset Bergerak Lainnya",
        },
        {
          id: 15,
          kode: "15",
          value: "15",
          label: "Peralatan Olahraga Khusus",
        },
        {
          id: 16,
          kode: "16",
          value: "16",
          label: "Peralatan Elektronik",
        },
        {
          id: 17,
          kode: "17",
          value: "17",
          label: "Rumah Tangga/Furnitur",
        },
        {
          id: 18,
          kode: "18",
          value: "18",
          label: "Peralatan Lainnya",
        },
        {
          id: 19,
          kode: "19",
          value: "19",
          label: "Jet Ski",
        },
        {
          id: 20,
          kode: "20",
          value: "20",
          label: "Aset Lainnya",
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
