import React from "react";
import GlobalFormField from "@shared/GlobalFormField";

const laporanKeuanganFields = [
  {
    key: "jenis_laporan",
    type: "select",
    title: "Laporan Keuangan",
    placeholder: "Pilih Laporan Keuangan",
    required: true,
    options: [
      { value: "01", label: "Tidak Diaudit" },
      { value: "02", label: "Diaudit" },
    ],
  },
  {
    key: "npwp_konsultan_pajak",
    type: "text",
    title: "NPWP Konsultan Pajak",
    placeholder: "Masukkan NPWP Konsultan Pajak",
    required: false,
    inputMode: "numeric",
    maxLength: 16,
    pattern: "[0-9]*",
  },
  {
    key: "nama_konsultan_pajak",
    type: "text",
    title: "Nama Konsultan Pajak",
    placeholder: "Nama Konsultan Pajak",
    required: false,
  },
  {
    key: "npwp_kantor_akuntan_publik",
    type: "text",
    title: "NPWP Kantor Akuntan Publik",
    placeholder: "Masukkan NPWP Kantor Akuntan Publik",
    required: false,
    inputMode: "numeric",
    maxLength: 16,
    pattern: "[0-9]*",
    showIf: (form) => form.jenis_laporan !== "01",
  },
  {
    key: "nama_kantor_akuntan_publik",
    type: "text",
    title: "Nama Kantor Akuntan Publik",
    placeholder: "Nama Kantor Akuntan Publik",
    required: false,
    showIf: (form) => form.jenis_laporan !== "01",
  },
];

export default function LaporanKeuangan({ formData = {}, onFieldChange }) {
  // Filter field yang perlu ditampilkan (showIf)
  const visibleFields = laporanKeuanganFields.filter((f) => !f.showIf || f.showIf(formData));

  // Handler khusus untuk NPWP hanya angka dan reset jika jenis_laporan "01"
  const handleChange = (key, value) => {
    let val = value;
    if (key === "npwp_konsultan_pajak" || key === "npwp_kantor_akuntan_publik") {
      val = value.replace(/[^0-9]/g, "");
    }
    if (key === "jenis_laporan" && val === "01") {
      onFieldChange("jenis_laporan", val);
      onFieldChange("npwp_kantor_akuntan_publik", "");
      onFieldChange("nama_kantor_akuntan_publik", "");
    } else {
      onFieldChange(key, val);
    }
  };

  return (
    <div className="border rounded-md p-4 mb-4">
      <GlobalFormField
        fields={visibleFields}
        formData={formData}
        onFieldChange={handleChange}
        labelWidth="w-64"
      />
    </div>
  );
}
