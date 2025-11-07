import React, { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { formatRupiah } from "@utils/formatCurrency";

// CONFIG Bagian A
export const BagianAConfig = {
  baseFields: [
    "penghasilanNeto",
    "kompensasiTahunBerikutnya",
    "zakatDanSumbangan",
    "jumlahPenghasilanNeto",
    "penghasilanTidakKenaPajak",
    "penghasilanKenaPajak",
    "pphTerutang",
    "pengurangPphTerutang",
    "kreditPajak",
    "pphYangHarusDibayar",
    "angsuranPphPasal25",
  ],
  customChildren: [
    {
      key: "penghasilanNeto",
      type: "currency",
      title: "Penghasilan Neto",
      placeholder: "Masukkan penghasilan neto",
      required: true,
      readOnly: false,
    },
    {
      key: "kompensasiTahunBerikutnya",
      type: "currency",
      title: "Kompensasi Kerugian Tahun Berikutnya",
      placeholder: "Kompensasi akan otomatis terhitung",
      required: false,
      readOnly: true,
    },
    {
      key: "zakatDanSumbangan",
      type: "currency",
      title: "Zakat/Sumbangan Keagamaan yang bersifat wajib",
      placeholder: "Masukkan zakat/sumbangan",
      required: false,
      readOnly: false,
    },

    {
      key: "jumlahPenghasilanNeto",
      type: "currency",
      title: "Jumlah Penghasilan Neto ",
      placeholder: "Jumlah penghasilan neto akan otomatis terhitung",
      required: false,
      readOnly: true,
    },

    {
      key: "penghasilanTidakKenaPajak",
      type: "currency",
      title: "Penghasilan Tidak Kena Pajak",
      placeholder: "-/-",
      required: false,
      readOnly: true,
    },

    {
      key: "penghasilanKenaPajak",
      type: "currency",
      title: "Penghasilan Kena Pajak",
      placeholder: "Penghasilan kena pajak akan otomatis terhitung",
      required: false,
      readOnly: true,
    },

    {
      key: "pphTerutang",
      type: "currency",
      title: "PPh Terutang",
      placeholder: "PPh terutang akan otomatis terhitung",
      required: false,
      readOnly: true,
    },

    {
      key: "pengurangPphTerutang",
      type: "currency",
      title: "Pengurang PPh Terutang",
      placeholder: "Masukkan pengurang PPh terutang",
      required: false,
      readOnly: false,
    },

    {
      key: "kreditPajak",
      type: "currency",
      title: "Kredit Pajak",
      placeholder: "Masukkan kredit pajak",
      required: false,
      readOnly: false,
    },

    {
      key: "pphYangHarusDibayar",
      type: "currency",
      title: "PPh Yang Harus Dibayar",
      placeholder: "PPh yang harus dibayar akan otomatis terhitung",
      required: false,
      readOnly: true,
    },

    {
      key: "angsuranPphPasal25",
      type: "currency",
      title: "Angsuran PPh Pasal 25 Tahun Pajak Berikutnya",
      placeholder: "Angsuran PPh Pasal 25 akan otomatis terhitung",
      required: false,
      readOnly: true,
    },
    // {
    //   key: "angsuranPph",
    //   type: "currency",
    //   title: "Angsuran PPh Pasal 25 Tahun Berikutnya",
    //   placeholder: "Angsuran akan otomatis terhitung",
    //   required: false,
    //   readOnly: true,
    // },
  ],
};
