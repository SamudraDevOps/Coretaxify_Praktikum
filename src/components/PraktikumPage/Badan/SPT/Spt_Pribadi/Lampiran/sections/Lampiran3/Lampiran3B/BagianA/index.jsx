import React, { useState } from "react";
import RekapitulasiPajakFinal from "./RekapitulasiPajakFinal";
import GlobalModal from "@shared/GlobalModal";

// ROWS STATIS (tidak bisa add/delete, hanya edit)
const INITIAL_ROWS = [
  {
    id: "TKU-1",
    type: "line",
    level: 0,
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
    id: "TKU-2",
    type: "line",
    level: 0,
    namaTKU: "AKUMULASI PEREDARAN BRUTO",
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
    id: "TKU-3",
    type: "header",
    level: 0,
    namaTKU: "PEREDARAN BRUTO TIDAK KENA PAJAK",
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
    id: "TKU-4",
    type: "line",
    level: 0,
    namaTKU: "PEREDARAN BRUTO KENA PAJAK",
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
    id: "TKU-5",
    type: "line",
    level: 0,
    namaTKU: "JUMLAH Pph BERSIFAT FINAL TERUTANG",
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
    id: "TKU-6",
    type: "line",
    level: 0,
    namaTKU: "Pph FINAL YANG DI SETOR SENDIRI",
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
    id: "TKU-7",
    type: "line",
    level: 0,
    namaTKU: "Pph FINAL YANG DIPOTONG/DIPUNGUT OLEH PIHAK LAIN",
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
    id: "total-pajak-final",
    type: "total",
    level: 0,
    namaTKU: "JUMLAH TOTAL",
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

const BULAN_FIELDS = [
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

export default function BagianA() {
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
      if (BULAN_FIELDS.includes(key)) {
        const total = BULAN_FIELDS.reduce((sum, field) => {
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

    // Auto-calculate total row (grand total)
    const lineRows = updatedRows.filter((r) => r.type === "line");
    const totalRow = updatedRows.find((r) => r.type === "total");

    if (totalRow) {
      // Calculate sum untuk setiap bulan
      BULAN_FIELDS.forEach((field) => {
        totalRow[field] = lineRows.reduce((sum, row) => sum + (row[field] || 0), 0);
      });

      // Calculate total untuk total row
      totalRow.total = BULAN_FIELDS.reduce((sum, field) => sum + (totalRow[field] || 0), 0);
    }

    setRows(updatedRows);
    closeModal();
    console.log("Saved values:", values);
  };

  // Build field config berdasarkan row type
  const getFieldConfig = () => {
    if (!selectedRow) return { baseFields: [], customChildren: [] };

    const isReadOnlyRow = selectedRow.type !== "line";

    return {
      baseFields: [],
      customChildren: [
        {
          key: "namaTKU",
          type: "text",
          title: "Keterangan",
          placeholder: "Keterangan",
          required: true,
          readOnly: true,
          className: "bg-gray-100 text-gray-600",
        },
        ...BULAN_FIELDS.map((field) => ({
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
      <RekapitulasiPajakFinal rows={rows} openEditModal={openEditModal} />

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
