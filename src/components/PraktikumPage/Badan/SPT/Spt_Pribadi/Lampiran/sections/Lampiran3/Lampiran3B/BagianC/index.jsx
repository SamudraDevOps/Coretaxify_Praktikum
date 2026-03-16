// d:/Coretaxify_Praktikum/src/components/PraktikumPage/Badan/SPT/Spt_Pribadi/Lampiran/sections/Lampiran3/Lampiran3B/BagianB/index.jsx
import React, { useState } from "react";
import RekapitulasiPenghasilanNeto from "./RekapitulasiPenghasilanNeto";
import GlobalModal from "@shared/GlobalModal";

// ROWS STATIS (tidak bisa add/delete, hanya edit)
const INITIAL_ROWS = [
  {
    id: "TKU-1",
    type: "line",
    namaTKU: "PT HJ.GALIH PREVIAND WICAKSONO",
    januari: 0,
    februari: 0,
    maret: 0,
    april: 0,
    mei: 0,
    juni: 0,
    juli: 0,
    agustus: 0,
    september: 0,
    oktober: 0,
    november: 0,
    desember: 0,
    total: 0,
  },
  {
    id: "total-Bruto",
    type: "total",
    namaTKU: "JUMLAH PEREDARAN BRUTO",
    januari: 0,
    februari: 0,
    maret: 0,
    april: 0,
    mei: 0,
    juni: 0,
    juli: 0,
    agustus: 0,
    september: 0,
    oktober: 0,
    november: 0,
    desember: 0,
    total: 0,
  },
  {
    id: "total-pajak-final-pph",
    type: "total",
    namaTKU: "JUMLAH PPh (11%)",
    januari: 0,
    februari: 0,
    maret: 0,
    april: 0,
    mei: 0,
    juni: 0,
    juli: 0,
    agustus: 0,
    september: 0,
    oktober: 0,
    november: 0,
    desember: 0,
    total: 0,
  },
];

const JENIS_USAHA_OPTIONS = [
  { id: 1, kode: "01", value: "01", label: "Dagang" },
  { id: 2, kode: "02", value: "02", label: "Industri" },
  { id: 3, kode: "03", value: "03", label: "Jasa" },
  { id: 4, kode: "04", value: "04", label: "Pengacara" },
  { id: 5, kode: "05", value: "05", label: "Akuntan" },
  { id: 6, kode: "06", value: "06", label: "Konsultan" },
  { id: 7, kode: "07", value: "07", label: "Aktuaris" },
  { id: 8, kode: "08", value: "08", label: "Notaris/PPAT" },
  { id: 9, kode: "09", value: "09", label: "Dokter" },
  { id: 10, kode: "10", value: "10", label: "Penilai" },
  { id: 11, kode: "11", value: "11", label: "Arsitek" },
  { id: 12, kode: "12", value: "12", label: "Artis dan profesi sejenisnya" },
  { id: 13, kode: "13", value: "13", label: "Pembuat konten" },
  { id: 14, kode: "14", value: "14", label: "Penulis" },
  { id: 15, kode: "15", value: "15", label: "Olahragawan" },
  { id: 16, kode: "16", value: "16", label: "Pelatih/Pengajar" },
  { id: 17, kode: "17", value: "17", label: "Distributor perusahaan pemasaran berjenjang" },
  { id: 18, kode: "18", value: "18", label: "Peneliti" },
  { id: 19, kode: "19", value: "19", label: "Petugas penjaja barang dagangan" },
  { id: 20, kode: "20", value: "20", label: "Agen iklan" },
  { id: 21, kode: "21", value: "21", label: "Agen asuransi" },
  { id: 22, kode: "22", value: "22", label: "Perantara" },
  { id: 23, kode: "23", value: "23", label: "Usaha/profesi Lainnya" },
];

export default function BagianB() {
  const [rows, setRows] = useState(INITIAL_ROWS);
  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  // Open modal edit
  const openEditModal = (row) => {
    setSelectedRow(row);
    setShowModal(true);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedRow(null);
  };

  // Auto-calculate handler (real-time di modal)
  const handleFieldChange = (key, value) => {
    setSelectedRow((prev) => {
      const newData = { ...prev, [key]: value };

      // Auto-calculate total (sum semua bulan)
      const bulanFields = [
        "januari",
        "februari",
        "maret",
        "april",
        "mei",
        "juni",
        "juli",
        "agustus",
        "september",
        "oktober",
        "november",
        "desember",
      ];

      if (bulanFields.includes(key)) {
        const total = bulanFields.reduce((sum, field) => {
          const val = field === key ? value : newData[field] || 0;
          return sum + Number(val);
        }, 0);
        newData.total = total;
      }

      return newData;
    });
  };

  // Save & recalculate
  const handleSave = (values) => {
    // Update row yang diedit
    const updatedRows = rows.map((r) => (r.id === selectedRow.id ? { ...r, ...values } : r));

    // Auto-calculate total rows
    const lineRow = updatedRows.find((r) => r.id === "TKU-1");
    const totalBrutoRow = updatedRows.find((r) => r.id === "total-Bruto");
    const totalPphRow = updatedRows.find((r) => r.id === "total-pajak-final-pph");

    if (lineRow && totalBrutoRow && totalPphRow) {
      const bulanFields = [
        "januari",
        "februari",
        "maret",
        "april",
        "mei",
        "juni",
        "juli",
        "agustus",
        "september",
        "oktober",
        "november",
        "desember",
      ];

      // Total Bruto = copy dari line row
      bulanFields.forEach((field) => {
        totalBrutoRow[field] = lineRow[field];
      });
      totalBrutoRow.total = lineRow.total;

      // Total PPh = 11% dari total bruto
      bulanFields.forEach((field) => {
        totalPphRow[field] = (totalBrutoRow[field] * 11) / 100;
      });
      totalPphRow.total = (totalBrutoRow.total * 11) / 100;
    }

    setRows(updatedRows);
    closeModal();
    console.log("Saved values:", values);
  };

  // Build field config berdasarkan row type
  const getFieldConfig = () => {
    if (!selectedRow) return { baseFields: [], customChildren: [] };

    const isReadOnlyRow = selectedRow.type === "total";
    const bulanFields = [
      "januari",
      "februari",
      "maret",
      "april",
      "mei",
      "juni",
      "juli",
      "agustus",
      "september",
      "oktober",
      "november",
      "desember",
    ];

    return {
      baseFields: ["jenis"],
      customChildren: [
        {
          key: "jenis",
          type: "select-search",
          title: "Jenis Penghasilan",
          placeholder: "Pilih Jenis Penghasilan",
          required: true,
          span: 1,
          options: JENIS_USAHA_OPTIONS,
          onChange: (value, updateField) => {
            updateField("kode", value);
          },
        },
        {
          key: "namaTKU",
          type: "text",
          title: "Nama TKU",
          placeholder: "Nama TKU",
          required: true,
          readOnly: true,
          className: "bg-gray-100 text-gray-600",
        },
        ...bulanFields.map((field) => ({
          key: field,
          type: "currency",
          title: field.charAt(0).toUpperCase() + field.slice(1),
          placeholder: "0",
          required: false,
          readOnly: isReadOnlyRow,
          className: isReadOnlyRow ? "bg-gray-100 text-gray-600" : "",
        })),
        {
          key: "total",
          type: "currency",
          title: "Total",
          placeholder: "Auto Calculate",
          required: false,
          readOnly: true,
          className: "bg-gray-100 text-gray-600",
        },
      ],
    };
  };

  const fieldConfig = getFieldConfig();

  return (
    <>
      <RekapitulasiPenghasilanNeto
        rows={rows}
        openEditModal={openEditModal}
        jenisOptions={JENIS_USAHA_OPTIONS}
      />

      <GlobalModal
        isOpen={showModal}
        onClose={closeModal}
        onSave={handleSave}
        title={`Edit ${selectedRow?.namaTKU || ""}`}
        baseFields={fieldConfig.baseFields}
        customChildren={fieldConfig.customChildren}
        data={selectedRow || {}}
        size="2xl"
        onFieldChange={handleFieldChange}
      />
    </>
  );
}
