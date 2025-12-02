// d:\Coretaxify_Praktikum\src\components\PraktikumPage\Badan\SPT\Spt_Pribadi\Lampiran\sections\Lampiran5\BagianA\index.jsx

import React, { useState, useMemo, useEffect } from "react";
import KompensasiKerugian from "./KompensasiKerugian";
import GlobalModal from "@shared/GlobalModal";

// Helper untuk convert value ke number
const toNum = (v) => (v === "" || v == null ? 0 : Number(v));

// INITIAL ROWS
const INITIAL_ROWS = [
  {
    id: "2016",
    tahunPajak: "2016",
    labaRugi: 0,
    type: "line",
    2021: 0,
    2022: 0,
    2023: 0,
    2024: 0,
    2025: 0,
    2026: 0,
  },
  {
    id: "2017",
    tahunPajak: "2017",
    labaRugi: 0,
    type: "line",
    2021: 0,
    2022: 0,
    2023: 0,
    2024: 0,
    2025: 0,
    2026: 0,
  },
  {
    id: "2018",
    tahunPajak: "2018",
    labaRugi: 0,
    type: "line",
    2021: 0,
    2022: 0,
    2023: 0,
    2024: 0,
    2025: 0,
    2026: 0,
  },
  {
    id: "2019",
    tahunPajak: "2019",
    labaRugi: 0,
    type: "line",
    2021: 0,
    2022: 0,
    2023: 0,
    2024: 0,
    2025: 0,
    2026: 0,
  },
  {
    id: "2020",
    tahunPajak: "2020",
    labaRugi: 0,
    type: "line",
    2021: 0,
    2022: 0,
    2023: 0,
    2024: 0,
    2025: 0,
    2026: 0,
  },
  {
    id: "2021",
    tahunPajak: "2021",
    labaRugi: 0,
    type: "line",
    2021: 0,
    2022: 0,
    2023: 0,
    2024: 0,
    2025: 0,
    2026: 0,
  },
  {
    id: "2022",
    tahunPajak: "2022",
    labaRugi: 0,
    type: "line",
    2021: 0,
    2022: 0,
    2023: 0,
    2024: 0,
    2025: 0,
    2026: 0,
  },
  {
    id: "2023",
    tahunPajak: "2023",
    labaRugi: 0,
    type: "line",
    2021: 0,
    2022: 0,
    2023: 0,
    2024: 0,
    2025: 0,
    2026: 0,
  },
  {
    id: "2024",
    tahunPajak: "2024",
    labaRugi: 0,
    type: "line",
    2021: 0,
    2022: 0,
    2023: 0,
    2024: 0,
    2025: 0,
    2026: 0,
  },
  {
    id: "2025",
    tahunPajak: "2025",
    labaRugi: 0,
    type: "line",
    2021: 0,
    2022: 0,
    2023: 0,
    2024: 0,
    2025: 0,
    2026: 0,
  },
  {
    id: "total-pajak",
    tahunPajak: "JUMLAH TOTAL",
    type: "total",
    level: 0,
    labaRugi: 0,
    2021: 0,
    2022: 0,
    2023: 0,
    2024: 0,
    2025: 0,
    2026: 0,
  },
];

export default function BagianA({ onTotalChange }) {
  const [rows, setRows] = useState(INITIAL_ROWS);
  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  // Auto-calculate total row
  const rowsWithCalculation = useMemo(() => {
    return rows.map((row) => {
      if (row.type === "total") {
        const lineRows = rows.filter((r) => r.type === "line");

        // Calculate labaRugi total
        const labaRugiTotal = lineRows.reduce((sum, r) => sum + toNum(r.labaRugi), 0);

        // Calculate totals untuk setiap tahun
        const yearTotals = {};
        [2021, 2022, 2023, 2024, 2025, 2026].forEach((year) => {
          yearTotals[year] = lineRows.reduce((sum, r) => sum + toNum(r[year]), 0);
        });

        return {
          ...row,
          labaRugi: labaRugiTotal,
          ...yearTotals,
        };
      }
      return row;
    });
  }, [rows]);

  // useEffect untuk kirim total ke parent (BUKAN di useMemo!)
  useEffect(() => {
    if (onTotalChange) {
      const totalRow = rowsWithCalculation.find((r) => r.type === "total");
      if (totalRow) {
        onTotalChange(totalRow[2025] || 0);
      }
    }
  }, [rowsWithCalculation, onTotalChange]);

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
    setSelectedRow((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Save & recalculate
  const handleSave = (values) => {
    // Update row yang diedit
    setRows((prev) => prev.map((r) => (r.id === selectedRow.id ? { ...r, ...values } : r)));
    closeModal();
  };

  // Build field config berdasarkan row type
  const getFieldConfig = () => {
    if (!selectedRow) return { baseFields: [], customChildren: [] };

    const isReadOnlyRow = selectedRow.type !== "line";

    return {
      baseFields: [],
      customChildren: [
        {
          key: "tahunPajak",
          type: "text",
          title: "Tahun Pajak/Bagian Tahun Pajak",
          placeholder: "Tahun Pajak",
          required: true,
          readOnly: true,
          className: "bg-gray-100 text-gray-600",
        },
        {
          key: "labaRugi",
          type: "currency",
          title: "Laba/Rugi Penghasilan Fiskal",
          placeholder: "0",
          required: false,
          readOnly: isReadOnlyRow,
          className: isReadOnlyRow ? "bg-gray-100 text-gray-600" : "",
        },
        {
          key: "group-kompensasi",
          type: "group-label",
          title: "Kompensasi Kerugian Fiskal",
        },
        {
          key: "2021",
          type: "currency",
          title: "Tahun 2021",
          placeholder: "0",
          required: false,
          readOnly: isReadOnlyRow,
          className: isReadOnlyRow ? "bg-gray-100 text-gray-600" : "",
        },
        {
          key: "2022",
          type: "currency",
          title: "Tahun 2022",
          placeholder: "0",
          required: false,
          readOnly: isReadOnlyRow,
          className: isReadOnlyRow ? "bg-gray-100 text-gray-600" : "",
        },
        {
          key: "2023",
          type: "currency",
          title: "Tahun 2023",
          placeholder: "0",
          required: false,
          readOnly: isReadOnlyRow,
          className: isReadOnlyRow ? "bg-gray-100 text-gray-600" : "",
        },
        {
          key: "2024",
          type: "currency",
          title: "Tahun 2024",
          placeholder: "0",
          required: false,
          readOnly: isReadOnlyRow,
          className: isReadOnlyRow ? "bg-gray-100 text-gray-600" : "",
        },
        {
          key: "2025",
          type: "currency",
          title: "Tahun 2025",
          placeholder: "0",
          required: false,
          readOnly: isReadOnlyRow,
          className: isReadOnlyRow ? "bg-gray-100 text-gray-600" : "",
        },
        {
          key: "2026",
          type: "currency",
          title: "Tahun 2026",
          placeholder: "0",
          required: false,
          readOnly: isReadOnlyRow,
          className: isReadOnlyRow ? "bg-gray-100 text-gray-600" : "",
        },
      ],
    };
  };

  const fieldConfig = getFieldConfig();

  return (
    <>
      <KompensasiKerugian rows={rowsWithCalculation} openEditModal={openEditModal} />

      <GlobalModal
        isOpen={showModal}
        onClose={closeModal}
        onSave={handleSave}
        title="Perhitungan Kompensasi Kerugian Fiskal"
        baseFields={fieldConfig.baseFields}
        customChildren={fieldConfig.customChildren}
        data={selectedRow || {}}
        size="2xl"
        onFieldChange={handleFieldChange}
      />
    </>
  );
}