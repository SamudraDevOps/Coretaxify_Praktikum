import React from "react";
import PenghasilanLuarNegeri from "./PenghasilanLuarNegeri";

//  CONFIG
const ConfigComponent = {
  baseFields: [
    "namaPemotong",
    "negara",
    "tanggal",
    "jenis",
    "penghasilanNetto",
    "nilai",
    "mataUang",
    "nilaiUangAsing",
    "jumlahKredit",
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
    {
      key: "tanggal",
      type: "date",
      title: "Tanggal Transaksi/Pembayaran PPh",
      placeholder: " tanggal transaksi/pembayaran PPh",
      required: false,
    },
    {
      key: "penghasilanNetto",
      type: "currency",
      title: "Penghasilan Neto (RUPIAH) ",
      placeholder: "Masukkan penghasilan neto",
      required: false,
    },
    {
      key: "nilai",
      type: "currency",
      title: "Nilai PPh yang dibayar di luar negeri (Rp)",
      placeholder: "Masukkan nilai PPh yang dibayar di luar negeri",
      required: false,
    },
    {
      key: "mataUang",
      type: "select-search",
      title: "Mata Uang",
      placeholder: "Pilih mata uang...",
      required: false,
      searchable: true,
    },
    {
      key: "nilaiUangAsing",
      type: "currency",
      title: "Nilai PPh yang dibayar di luar negeri (Uang Asing)",
      placeholder: "Masukkan nilai PPh yang dibayar di luar negeri",
      required: false,
    },
    {
      key: "jumlahKredit",
      type: "currency",
      title: "Jumlah Kredit Pajak (Rp)",
      placeholder: "Masukkan jumlah kredit pajak",
      required: false,
    },
  ],

  //   defaultData: {
  //     namaPemotong: "PT. Contoh Perusahaan",
  //     npwpPemotong: "",
  //     alamatPemotong: "",
  //     negara: "",
  //     jabatan: "",
  //     nilai: "",
  //     persen: "",
  //     dividen: "",
  //   },
};

console.log("  Config defined:", ConfigComponent);

const PenghasilanLuarNegeriIndex = () => {
  return (
    <div className="space-y-4">
      <PenghasilanLuarNegeri config={ConfigComponent} />
    </div>
  );
};

console.log(" ConfigComponent component exported");

export default PenghasilanLuarNegeriIndex;
