import React from "react";
import PenghasilanKenaPajak from "./PenghasilanKenaPajak";

//  CONFIG BAGIAN A 
const bagianAConfig = {
  baseFields: [
    "namaPemotong",
    "npwpPemotong",
    "kode",
    "jenis",
    "dasarPengenaanPajak",
    "pphdipotong",
  ],

  customChildren: [
    {
      key: "jenis",
      type: "select",
      title: "Jenis Penghasilan",
      placeholder: "Pilih Jenis Penghasilan",
      required: true,
      span: 1,
      options: [
        {
          id: 1,
          kode: "28-423-01",
          value: "28-423-01",
          label:
            "Gaji, upah, honorarium, tunjangan, dan pembayaran lain sehubungan dengan pekerjaan atau jabatan",
        },
        {
          id: 2,
          kode: "28-423-99",
          value: "28-423-99",
          label: "PPh final sesuai PP-55/2022 (Disetor Sendiri)",
        },
        {
          id: 3,
          kode: "28-404-01",
          value: "28-404-01",
          label: "Bunga tabungan dan bunga deposito yang ditempatkan di DN (selain dari DHE)",
        },
        {
          id: 4,
          kode: "28-401-01",
          value: "28-401-01",
          label: "Bunga obligasi, SUN, atau obligasi daerah yang diterima WP DN dan BUT",
        },
        {
          id: 5,
          kode: "28-406-01",
          value: "28-406-01",
          label: "Transaksi penjualan saham di bursa efek (bukan saham pendiri)",
        },
        {
          id: 6,
          kode: "21-401-01",
          value: "21-401-01",
          label: "Uang pesangon yang dibayarkan sekaligus",
        },
        {
          id: 7,
          kode: "21-402-02",
          value: "21-402-02",
          label:
            "Honor atau imbalan lain APBN atau APBD yang diterima PNS/TNI/POLRI dan pensiunannya",
        },
        {
          id: 8,
          kode: "28-417-02",
          value: "28-417-02",
          label: "Bunga simpanan yang dibayarkan oleh koperasi kepada anggota WP OP",
        },
        {
          id: 9,
          kode: "28-419-01",
          value: "28-419-01",
          label: "Dividen yang diterima/diperoleh WP OP DN",
        },
        {
          id: 10,
          kode: "28-402-01",
          value: "28-402-01",
          label: "Pengalihan hak atas tanah dan/atau bangunan",
        },
        {
          id: 11,
          kode: "28-403-02",
          value: "28-403-02",
          label: "Persewaan tanah dan/atau bangunan",
        },
        {
          id: 12,
          kode: "28-409-10",
          value: "28-409-10",
          label: "Jasa konstruksi berupa jasa pelaksanaan konstruksi (kualifikasi usaha kecil)",
        },
        {
          id: 13,
          kode: "28-499-99",
          value: "28-499-99",
          label:
            "Penghasilan istri dari satu pemberi kerja yang hak dan kewajiban perpajakannya dilaksanakan oleh kepala keluarga",
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

console.log(" BagianA Config defined:", bagianAConfig);

const BagianAIndex = () => {
  return (
    <div className="space-y-4">
      <PenghasilanKenaPajak config={bagianAConfig} />
    </div>
  );
};

console.log(" BagianAIndex component exported");

export default BagianAIndex;
