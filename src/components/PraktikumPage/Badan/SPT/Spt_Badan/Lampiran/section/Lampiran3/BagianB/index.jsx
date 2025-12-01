import React from "react";
import PPhDipotong from "./PPhDipotong";

//  CONFIG
const ConfigComponent = {
  baseFields: [
    "namaPemotong",
    "npwpPemotong",
    "jenis",
    "dasarPengenaanPajak",
    "pajakPenghasilan",
    "nomorBukti",
    "tanggal",
  ],

  customChildren: [
    {
      key: "jenis",
      type: "select-search",
      title: "Jenis Pajak",
      placeholder: "Pilih Jenis Pajak",
      required: true,
      span: 1,
      options: [
        {
          id: 1,
          kode: "pasal15",
          value: "pasal15",
          label: "PPh Pasal 15",
        },
        {
          id: 2,
          kode: "pasal21",
          value: "pasal21",
          label: "PPh Pasal 21",
        },
        {
          id: 3,
          kode: "pasal22",
          value: "pasal22",
          label: "PPh Pasal 22",
        },
        {
          id: 4,
          kode: "pasal23",
          value: "pasal23",
          label: "PPh Pasal 23",
        },

        {
          id: 5,
          kode: "pasal26",
          value: "pasal26",
          label: "PPh Pasal 26",
        },

        {
          id: 6,
          kode: "ditanggungPemerintah",
          value: "pphDitanggungPemerintah",
          label: "PPh Ditanggung Pemerintah",
        },
        {
          id: 7,
          kode: "ditanggungPemerintahProyek",
          value: "pphDitanggungPemerintahProyek",
          label: "PPh Ditanggung Pemerintah atas (Proyek Pinjaman Luar Negeri)",
        },
        {
          id: 8,
          kode: "sisaLB",
          value: "sisaLB",
          label: "Sisa LB Yang Tidak Dikembalikan Pada SKPPKP",
        },
      ],
      onChange: (value, updateField) => {
        updateField("kode", value);
      },
    },

    {
      key: "pajakPenghasilan",
      type: "currency",
      title: "Pajak Penghasilan (Rp) ",
      placeholder: "Masukkan pajak penghasilan",
      required: false,
    },
    {
      key: "nomorBukti",
      type: "text",
      title: "Nomor Bukti Pemotongan/SSP/SSPCP ",
      placeholder: " Nomor Bukti Pemotongan/SSP/SSPCP",
      required: false,
    },
    {
      key: "tanggal",
      type: "date",
      title: "Tanggal Transaksi/Pembayaran PPh",
      placeholder: " tanggal transaksi/pembayaran PPh",
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

const PPhDipotongIndex = () => {
  return (
    <div className="space-y-4">
      <PPhDipotong config={ConfigComponent} />
    </div>
  );
};

console.log(" ConfigComponent component exported");

export default PPhDipotongIndex;
