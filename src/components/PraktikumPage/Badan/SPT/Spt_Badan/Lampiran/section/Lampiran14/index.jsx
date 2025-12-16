import React, { useState, useEffect } from "react";
import PembangunanDanPengadaan from "./PembangunanDanPengadaan";

const optionsSisahLebih = [
  {
    id: 1,
    kode: "1",
    value: "1",
    label:
      "Ditanamkan dalam bentuk pembangunan dan pengadaan sarana dan prasarana untuk fasilitas umum",
  },
  {
    id: 2,
    kode: "2",
    value: "2",
    label:
      "Ditanamkan dalam bentuk pembangunan dan pengadaan sarana dan prasarana yang diberikan kepada badan dan lembaga sosial dan/atau keagamaan Lainnya",
  },
  {
    id: 3,
    kode: "3",
    value: "3",
    label:
      "Ditanamkan dalam bentuk pembangunan dan pengadaan sarana dan prasarana yang digunakan sendiri",
  },
  {
    id: 4,
    kode: "4",
    value: "4",
    label: "Ditanamkan dalam dana abadi",
  },
];

const optionsTahunPajak = [
  {
    id: 1,
    kode: "2020",
    value: "2020",
    label: "2020",
  },
  {
    id: 2,
    kode: "2021",
    value: "2021",
    label: "2021",
  },
  {
    id: 3,
    kode: "2022",
    value: "2022",
    label: "2022",
  },
  {
    id: 4,
    kode: "2023",
    value: "2023",
    label: "2023",
  },
  {
    id: 5,
    kode: "2024",
    value: "2024",
    label: "2024",
  },
  {
    id: 6,
    kode: "2025",
    value: "2025",
    label: "2025",
  },
];

// Helper function untuk readonly dinamis
function getReadOnly(fieldKey, tahunPajak) {
  if (!tahunPajak) return true;

  // Ambil angka tahun ke-n dari key (1,2,3,4,5)
  const match = fieldKey.match(/\d+/);
  if (!match) return true;

  const tahunKe = Number(match[0]); // 1 - 5
  const tahun = Number(tahunPajak);

  // Mapping: tahun pajak → maksimal tahun yang boleh diisi
  const maxEditableByYear = {
    2020: 5,
    2021: 4,
    2022: 3,
    2023: 2,
    2024: 1,
  };

  const maxEditable = maxEditableByYear[tahun] ?? 0;

  // Jika nomor tahun lebih besar → readonly
  return tahunKe > maxEditable;
}

//  CONFIG - Ubah jadi function yang menerima form
const ConfigComponent = (form = {}) => ({
  baseFields: [
    "tahunPajak",
    "sisaLebih4Tahun",
    "sisahLebih",
    "sisaLebihTahun1",
    "sisaLebihTahun2",
    "sisaLebihTahun3",
    "sisaLebihTahun4",
    "sisaLebihTahun5",
    "jumlahTotalSisaLebih",
    "sisahLebihBelumDitanamkan",
    "sisahLebihLeat4Tahun",
  ],

  customChildren: [
    {
      key: "tahunPajak",
      type: "select-search",
      title: "TAHUN PAJAK/BAGIAN TAHUN PAJAK",
      required: false,
      span: 1,
      options: optionsTahunPajak,
      onChange: (value, updateField, selectedOption) => {
        updateField("tahunPajak", value);
      },
    },
    {
      key: "sisaLebih4Tahun",
      type: "currency",
      title: "PENYEDIAAN SISA LEBIH UNTUK DITANAMKAN KEMBALI SELAMA 4 TAHUN",
      required: false,
      readOnly: true,
    },
    {
      key: "sisahLebih",
      type: "select-search",
      title: "BENTUK PENANAMAN KEMBALI SISA LEBIH",
      required: false,
      span: 1,
      options: optionsSisahLebih,
      onChange: (value, updateField, selectedOption) => {
        updateField("sisahLebih", value);
      },
    },

    {
      key: "sisaLebihTahun1",
      type: "currency",
      title:
        "PENGGUNAAN SISA LEBIH UNTUK PEMBANGUNAN DAN PENGADAAN SARANA DAN PRASARANA - TAHUN KE-1",
      required: false,
      readOnly: (form) => getReadOnly("sisaLebihTahun1", form.tahunPajak),
    },
    {
      key: "sisaLebihTahun2",
      type: "currency",
      title:
        "PENGGUNAAN SISA LEBIH UNTUK PEMBANGUNAN DAN PENGADAAN SARANA DAN PRASARANA - TAHUN KE-2",
      required: false,
      readOnly: (form) => getReadOnly("sisaLebihTahun2", form.tahunPajak),
    },
    {
      key: "sisaLebihTahun3",
      type: "currency",
      title:
        "PENGGUNAAN SISA LEBIH UNTUK PEMBANGUNAN DAN PENGADAAN SARANA DAN PRASARANA - TAHUN KE-3",
      required: false,
      readOnly: (form) => getReadOnly("sisaLebihTahun3", form.tahunPajak),
    },
    {
      key: "sisaLebihTahun4",
      type: "currency",
      title:
        "PENGGUNAAN SISA LEBIH UNTUK PEMBANGUNAN DAN PENGADAAN SARANA DAN PRASARANA - TAHUN KE-4",
      required: false,
      readOnly: (form) => getReadOnly("sisaLebihTahun4", form.tahunPajak),
    },

    {
      key: "sisaLebihTahun5",
      type: "currency",
      title:
        "PENGGUNAAN SISA LEBIH UNTUK PEMBANGUNAN DAN PENGADAAN SARANA DAN PRASARANA - TAHUN KE-5",
      required: false,
      readOnly: (form) => getReadOnly("sisaLebihTahun5", form.tahunPajak),
    },

    {
      key: "jumlahTotalSisaLebih",
      type: "currency",
      title: "JUMLAH PENGGUNAAN SISA LEBIH",
      required: false,
      readOnly: true,
    },

    {
      key: "sisahLebihBelumDitanamkan",
      type: "currency",
      title: "SISA LEBIH YANG BELUM DITANAMKAN KEMBALI",
      required: false,
      readOnly: true,
    },
    {
      key: "sisahLebihLeat4Tahun",
      type: "currency",
      title: "SISA LEBIH YANG MELEWATI JANGKA WAKTU PENANAMAN KEMBALI DALAM JANGKA WAKTU 4 TAHUN",
      required: false,
      readOnly: true,
    },
  ],
});

console.log("  Config defined:", ConfigComponent);

const PembangunanDanPengadaanIndex = () => {
  const [form, setForm] = useState({ tahunPajak: "" });

  return (
    <div className="space-y-4">
      <PembangunanDanPengadaan
        configGenerator={ConfigComponent}
        form={form}
        setForm={setForm}
        getReadOnly={getReadOnly}
      />
    </div>
  );
};

console.log(" ConfigComponent component exported");

export default PembangunanDanPengadaanIndex;
