import React, { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { formatRupiah } from "@utils/formatCurrency";

// CONFIG Bagian B
export const BagianBConfig = {
  baseFields: [
    "LabaKotorGroup",
    "penghasilanNetoGroup",
    "penghasilanNetoZakatSendiriGroup",
    "penghasilanNetoZakatGabunganGroup",
    "jenisPenghasilan",
    "penghasilanKenaPajakGabungan",
    "pphTerutangGabungan",
    "pphTerutangDitanggungWP",
    "pphTerutangDitanggungSuamiIstri",
  ],
  customChildren: [
    {
      key: "LabaKotorGroup",
      type: "group",
      title: "Laba Kotor",
      fields: [
        {
          key: "labaKotorWP",
          type: "currency",
          placeholder: "Wajib Pajak",
          required: false,
          readOnly: false,
        },
        {
          key: "labaKotorIstri",
          type: "currency",
          placeholder: "Istri",
          required: false,
          readOnly: false,
        },
      ],
    },

    {
      key: "penghasilanNetoGroup",
      type: "group",
      title: "Penghasilan Neto",
      fields: [
        {
          key: "penghasilanNetoWP",
          type: "currency",
          placeholder: "Wajib Pajak",
          required: false,
          readOnly: true,
        },
        {
          key: "penghasilanNetoIstri",
          type: "currency",
          placeholder: "Istri",
          required: false,
          readOnly: false,
        },
      ],
    },

    {
      key: "penghasilanNetoZakatSendiriGroup",
      type: "group",
      title: "Penghasilan Neto Setelah Dikurangi Zakat dan Kompensasi Kerugian",
      fields: [
        {
          key: "penghasilanNetoZakatSendiriWP",
          type: "currency",
          placeholder: "Wajib Pajak",
          required: false,
          readOnly: true,
        },
        {
          key: "penghasilanNetoZakatSendiriIstri",
          type: "currency",
          placeholder: "Istri",
          required: false,
          readOnly: false,
        },
      ],
    },

    {
      key: "penghasilanNetoZakatGabunganGroup",
      type: "currency",
      title: "Penghasilan Neto Setelah Dikurangi Zakat dan Kompensasi Kerugian Gabungan",
      placeholder: "",
      required: false,
      readOnly: true,
    },

    {
      key: "jenisPenghasilan",
      type: "select-search",
      title: "Penghasilan Tidak Kena Pajak Gabungan",
      placeholder: "Silahkan Pilih",
      required: true,
      span: 1,
      options: [
        {
          id: 1,
          kode: "K/I/0",
          value: "K/I/0",
          label: "K/I/0 - Kawin, penghasilan istri digabung, tanpa tanggungan (Rp 112.500.000)",
        },
        {
          id: 2,
          kode: "K/I/1",
          value: "K/I/1",
          label: "K/I/1 - Kawin, penghasilan istri digabung, dengan 1 tanggungan (Rp 117.000.000)",
        },
        {
          id: 3,
          kode: "K/I/2",
          value: "K/I/2",
          label: "K/I/2 - Kawin, penghasilan istri digabung, dengan 2 tanggungan (Rp 121.500.000)",
        },
        {
          id: 4,
          kode: "K/I/3",
          value: "K/I/3",
          label: "K/I/3 - Kawin, penghasilan istri digabung, dengan 3 tanggungan (Rp 126.000.000)",
        },
        {
          id: 5,
          kode: "K/0",
          value: "K/0",
          label: "K/0 - Kawin, tanpa tanggungan (Rp 58.500.000)",
        },
        {
          id: 6,
          kode: "K/1",
          value: "K/1",
          label: "K/1 - Kawin, 1 tanggungan (Rp 63.000.000)",
        },
        {
          id: 7,
          kode: "K/2",
          value: "K/2",
          label: "K/2 - Kawin, 2 tanggungan (Rp 67.500.000)",
        },
        {
          id: 8,
          kode: "K/3",
          value: "K/3",
          label: "K/3 - Kawin, 3 tanggungan (Rp 72.000.000)",
        },
        {
          id: 9,
          kode: "TK/0",
          value: "TK/0",
          label: "TK/0 - Tidak kawin, tanpa tanggungan (Rp 54.000.000)",
        },
        {
          id: 10,
          kode: "TK/1",
          value: "TK/1",
          label: "TK/1 - Tidak kawin, 1 tanggungan (Rp 58.500.000)",
        },
        {
          id: 11,
          kode: "TK/2",
          value: "TK/2",
          label: "TK/2 - Tidak kawin, 2 tanggungan (Rp 63.000.000)",
        },
        {
          id: 12,
          kode: "TK/3",
          value: "TK/3",
          label: "TK/3 - Tidak kawin, 3 tanggungan (Rp 67.500.000)",
        },
      ],
    },

    {
      key: "penghasilanKenaPajakGabungan",
      type: "currency",
      title: "Penghasilan Kena Pajak Gabungan",
      placeholder: "",
      required: false,
      readOnly: true,
    },

    {
      key: "pphTerutangGabungan",
      type: "currency",
      title: "PPh Terutang Gabungan",
      placeholder: "",
      required: false,
      readOnly: true,
    },

    {
      key: "pphTerutangDitanggungWP",
      type: "currency",
      title: "PPh Terutang yang Ditanggung Wajib Pajak",
      placeholder: "",
      required: false,
      readOnly: true,
    },

    {
      key: "pphTerutangDitanggungSuamiIstri",
      type: "currency",
      title: "PPh Terutang yang Ditanggung Suami/Istri",
      placeholder: "",
      required: false,
      readOnly: true,
    },
  ],
};

export const WajibPajakConfig = {
  baseFields: ["npwpPemotong", "namaPemotong"],
  customChildren: [],
};

export const SuamiIstriConfig = {
  baseFields: ["npwpPemotong", "namaPemotong"],
  customChildren: [],
};
