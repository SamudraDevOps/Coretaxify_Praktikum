import React, { useState } from "react";
import RekapitulasiPengusaha from "./RekapitulasiPengusaha";
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
      baseFields: [],
      customChildren: [
        
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
      <RekapitulasiPengusaha rows={rows} openEditModal={openEditModal} />

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
