import React from "react";
import UtangSwastaLuarNegeri from "./UtangSwastaLuarNegeri";

//  CONFIG
const ConfigComponent = {
  baseFields: [
    "pemberiPinjaman",
    "alamat",
    "negara",
    "kodeNegara",
    "mataUang",
    "kursAkhirTahun",
    "UtangAwalTahun",
    "penambahanUtang",
    "penguranganUtang",
    "totalUtangAkhirTahun",
    "tanggalMulaiPinjaman",
    "akhirTempoPinjaman",
    "tingkatBungaPinjaman",
    "jumlahBunga",
    "biayaSelainBunga",
    "peruntukanPinjaman",
  ],

  customChildren: [
    {
      key: "pemberiPinjaman",
      type: "text",
      title: "NAMA PEMBERI PINJAMAN",
      placeholder: "",
    },
    {
      key: "kodeNegara",
      type: "text",
      title: "Kode Negara",
      placeholder: "",
      readOnly: true,
      searchable: true,
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
      key: "kursAkhirTahun",
      type: "currency",
      title: "KURS AKHIR TAHUN",
      placeholder: "",
    },

    {
      key: "UtangAwalTahun",
      type: "currency",
      title: "Pokok Utang (Rp.) pada Awal Tahun ",
      placeholder: "",
    },
    {
      key: "penambahanUtang",
      type: "currency",
      title: "Penambahan Pokok Utang (Rp.)",
      placeholder: "",
    },

    {
      key: "penguranganUtang",
      type: "currency",
      title: "Pengurangan Pokok Utang (Rp.)",
      placeholder: "",
    },

    {
      key: "totalUtangAkhirTahun",
      type: "currency",
      title: " Pokok Utang (Rp.) pada Akhir Tahun",
      placeholder: "",
      readOnly: true,
    },
    {
      key: "tanggalMulaiPinjaman",
      type: "date",
      title: "TANGGAL MULAI PINJAMAN",
      placeholder: "",
    },
    {
      key: "akhirTempoPinjaman",
      type: "date",
      title: "TANGGAL JATUH TEMPO PINJAMAN",
      placeholder: "",
    },

    {
      key: "tingkatBungaPinjaman",
      type: "currency",
      title: " TINGKAT SUKU BUNGA (%)",
      placeholder: "Dalam Persen",
    },

    {
      key: "jumlahBunga",
      type: "currency",
      title: " JUMLAH BUNGA  (Rp.)",
      placeholder: "",
    },

    {
      key: "biayaSelainBunga",
      type: "currency",
      title: " BIAYA TERKAIT PEROLEHAN PINJAMAN SELAIN BUNGA (Rp)",
      placeholder: "",
    },

    {
      key: "peruntukanPinjaman",
      type: "text",
      title: " PERUNTUKAN PINJAMAN",
      placeholder: "",
    },
  ],
};

console.log("  Config defined:", ConfigComponent);

const UtangSwastaLuarNegeriIndex = () => {
  return (
    <div className="space-y-4">
      <UtangSwastaLuarNegeri config={ConfigComponent} />
    </div>
  );
};

console.log(" ConfigComponent component exported");

export default UtangSwastaLuarNegeriIndex;
