import React from "react";
import KasDanSetaraKas from "./KasDanSetaraKas";

const kasdanSetaraKasConfig = {
  baseFields: [
    "kode",
    "deskripsi",
    "buktikepemilikan",
    "atasnama",
    "namabank",
    "lokasiHarta",
    "tahunPerolehan",
    "saldo",
    "keterangan",
  ],
  customChildren: [
    {
      key: "deskripsi",
      type: "select-search",
      title: "Deskripsi",
      placeholder: "Pilih jenis harta",
      required: true,
      span: 1,
      options: [
        {
          id: 1,
          kode: "0101",
          value: "0101",
          label: "Uang Tunai / Bank Note / Koin",
        },
        {
          id: 2,
          kode: "0102",
          value: "0102",
          label: "Tabungan (Bank / Lembaga Keuangan)",
        },
        {
          id: 3,
          kode: "0103",
          value: "0103",
          label: "Giro",
        },
        {
          id: 4,
          kode: "0104",
          value: "0104",
          label: "Deposito",
        },
        {
          id: 5,
          kode: "0105",
          value: "0105",
          label: "Uang Elektronik",
        },
        {
          id: 6,
          kode: "0106",
          value: "0106",
          label: "Cek",
        },
        {
          id: 7,
          kode: "0107",
          value: "0107",
          label: "Wessel",
        },
        {
          id: 8,
          kode: "0108",
          value: "0108",
          label: "Kertas Komersial",
        },
        {
          id: 9,
          kode: "0109",
          value: "0109",
          label: "Setara Kas Lainnya",
        },
      ],

      onChange: (value, updateField) => {
        updateField("kode", value);
      },
    },

    {
      key: "buktikepemilikan",
      type: "text",
      title: "Bukti Kepemilikan",
      placeholder: "Masukkan bukti kepemilikan",
      required: true,
    },
    {
      key: "atasnama",
      type: "text",
      title: "Atas Nama",
      placeholder: "Masukkan atas nama",
      required: true,
    },
    {
      key: "namabank",
      type: "text",
      title: "Nama Bank",
      placeholder: "Masukkan nama bank",
      required: true,
    },
    // {
    //   key: "tahunperolehan",
    //   type: "number",
    //   title: "Tahun Perolehan",
    //   placeholder: "Masukkan tahun perolehan",
    //   required: true,
    // },
    {
      key: "saldo",
      type: "currency",
      title: "Saldo",
      placeholder: "Masukkan saldo",
      required: true,
    },
  ],
};

const DaftarKasDanSetaraKasIndex = () => {
  return (
    <div className="space-y-4">
      <KasDanSetaraKas config={kasdanSetaraKasConfig} />
    </div>
  );
};

export default DaftarKasDanSetaraKasIndex;
