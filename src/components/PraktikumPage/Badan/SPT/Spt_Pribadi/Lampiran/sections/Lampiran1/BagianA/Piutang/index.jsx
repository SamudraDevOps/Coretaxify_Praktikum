import React from "react";
import Piutang from "./Piutang";

const piutangConfig = {
  baseFields: [
    "kode",
    "deskripsi",
    "lokasipenerima",
    "nomoridentitas",
    "penerimaPinjaman",
    "nilaiPiutang",
    "tahunDimulai",
    "SaldoPiutang",
    "keterangan",
  ],
  customChildren: [
    {
      key: "kode",
      type: "text",
      title: "Kode",
      placeholder: "Kode akan otomatis terisi",
      required: true,
      readOnly: true,
      className: "bg-gray-100 text-gray-600",
    },
    {
      key: "deskripsi",
      type: "select-search",
      title: "Deskripsi",
      placeholder: "Pilih jenis harta",
      required: true,
      options: [
        {
          id: 1,
          kode: "0201",
          value: "0201: Piutang Usaha",
          label: "Piutang Usaha",
        },
        { id: 2, kode: "0202", value: "0202: Piutang Afiliasi", label: "Piutang Afiliasi" },
        { id: 3, kode: "0209", value: "0209: Piutang Lainnya", label: "Piutang Lainnya" },
      ],
      onChange: (value, updateField) => {
        // Ekstrak kode dari value (4 digit pertama)
        const kode = value ? value.substring(0, 4) : "";
        updateField("kode", kode);
        updateField("deskripsi", value);
      },
    },
    {
      key: "lokasipenerima",
      type: "text",
      title: "Lokasi Penerima",
      placeholder: "Lokasi Penerima",
      required: true,
    },

    {
      key: "penerimaPinjaman",
      type: "text",
      title: "Nama Penerima Pinjaman",
      placeholder: "Nama Penerima Pinjaman",
      required: true,
    },
    {
      key: "nilaiPiutang",
      type: "currency",
      title: "Nilai Piutang",
      placeholder: "Masukkan jumlah nilai piutang",
      required: true,
    },
    {
      key: "tahunDimulai",
      type: "select",
      title: "Tahun Dimulai",
      placeholder: "Pilih Tahun",
      required: false,
      options: Array.from({ length: 50 }, (_, i) => {
        const year = new Date().getFullYear() - i;
        return { value: String(year), label: String(year) };
      }),
    },
    {
      key: "SaldoPiutang",
      type: "currency",
      title: "Saldo Piutang Saat Ini",
      placeholder: "Saldo Piutang Saat Ini",
      required: true,
    },
    {
      key: "keterangan",
      type: "select",
      title: "Keterangan",
      placeholder: "Pilih Keterangan",
      required: false,
      options: [
        { value: "Harta PPS", label: "Harta PPS" },
        { value: "Harta Investasi", label: "Harta Investasi PPS" },
      ],
    },
  ],
};

const DaftarPiutangIndex = () => {
  return (
    <div className="space-y-4">
      <Piutang config={piutangConfig} />
    </div>
  );
};

export default DaftarPiutangIndex;
