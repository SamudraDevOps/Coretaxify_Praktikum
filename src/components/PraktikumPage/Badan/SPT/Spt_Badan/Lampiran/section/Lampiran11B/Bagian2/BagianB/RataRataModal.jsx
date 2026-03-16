import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { formatNumber, parseFormattedNumber, formatRupiah } from "@utils/formatCurrency";
import GlobalModal from "@shared/GlobalModal";
import GlobalTable from "@shared/GlobalTable";

import { hitungTotalGlobal, createTotalRow } from "@utils/helperTotal";

export default function RataRataModal({ config, data = [], setData = [] }) {
  const { baseFields = [], customChildren = [], defaultData = {} } = config || {};

  // const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [selected, setSelected] = useState(null);

  // Open modal untuk add
  const openAddModal = () => {
    setSelected({ ...defaultData });
    setEditingId(null);
    setShowModal(true);
  };

  // Open modal untuk edit
  const openEditModal = (item) => {
    setSelected(item);
    setEditingId(item.id);
    setShowModal(true);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setSelected(null);
  };

  //  AUTO CALCULATE FUNCTION - Real-time di modal
  const handleFieldChange = (key, value) => {
    setSelected((prev) => {
      const newData = { ...prev, [key]: value };

      // Daftar key saldo
      const saldoKeys = [
        "saldoBulanke1",
        "saldoBulanke2",
        "saldoBulanke3",
        "saldoBulanke4",
        "saldoBulanke5",
        "saldoBulanke6",
        "saldoBulanke7",
        "saldoBulanke8",
        "saldoBulanke9",
        "saldoBulanke10",
        "saldoBulanke11",
        "saldoBulanke12",
      ];

      // Jika field saldo diubah, hitung rata-rata HANYA dari field yang terisi
      if (saldoKeys.includes(key)) {
        const filled = saldoKeys
          .map((k) => parseFormattedNumber(String(newData[k] ?? "")))
          .filter((v) => typeof v === "number" && !isNaN(v) && v !== 0);

        const total = filled.reduce((a, b) => a + b, 0);
        const rataRata = filled.length > 0 ? total / filled.length : 0;
        newData["rata-rata"] = rataRata;
      }

      // Auto calculate pphFinalTerutang ketika dasarPengenaanPajak atau tingkat berubah
      if (key === "dasarPengenaanPajak" || key === "tingkat") {
        const dasarPengenaan =
          key === "dasarPengenaanPajak" ? value : newData.dasarPengenaanPajak || 0;
        const tingkatPersen = key === "tingkat" ? value : newData.tingkat || 0;

        const hasil = (dasarPengenaan * tingkatPersen) / 100;
        newData.pphFinalTerutang = hasil;

        console.log("Auto Calculate:", {
          dasarPengenaan,
          tingkatPersen,
          hasil,
        });
      }

      return newData;
    });
  };

  // Save data
  const saveData = (values) => {
    console.log("Saved values:", values);
    if (editingId) {
      setData((prev) =>
        prev.map((item) => (item.id === editingId ? { ...values, id: editingId } : item))
      );
    } else {
      setData((prev) => [...prev, { ...values, id: Date.now() }]);
    }
    closeModal();
  };

  // Delete data
  const deleteData = (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      setData((prev) => prev.filter((item) => item.id !== id));
    }
  };

  // Get utnuk mengambil Label dari Option

  const getLabel = (key, value) => {
    const field = customChildren.find((f) => f.key === key);
    if (!field || !field.options) return value || "-";
    const opt = field.options.find((o) => o.value === value);
    return opt ? opt.label : value || "-";
  };

  //  HITUNG TOTAL & BUAT BARIS TOTAL
  const totals = hitungTotalGlobal(data, [
    "saldoBulanke1",
    "saldoBulanke2",
    "saldoBulanke3",
    "saldoBulanke4",
    "saldoBulanke5",
    "saldoBulanke6",
    "saldoBulanke7",
    "saldoBulanke8",
    "saldoBulanke9",
    "saldoBulanke10",
    "saldoBulanke11",
    "saldoBulanke12",
    "rata-rata",
  ]);

  const tableData =
    data.length === 0
      ? []
      : [
          ...data,
          createTotalRow("JUMLAH", totals, {
            labelField: "rincianModal",
            base: {
              rincianModal: "",
            },
          }),
        ];

  const columnGroups = [
    {
      title: "TINDAKAN",
      children: [
        {
          key: "no",
          title: "NO",
          width: 60,
          align: "center",
          render: (row, i) => (row.type === "total" ? "" : i + 1),
        },
        {
          key: "_aksi",
          title: "AKSI",
          width: 100,
          align: "center",
          render: (row) =>
            row.type === "total" ? null : (
              <div className="flex items-center justify-center gap-2">
                <button
                  className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                  onClick={() => openEditModal(row)}
                >
                  <Edit size={16} />
                </button>
                <button
                  className="p-1 text-red-600 hover:bg-red-50 rounded"
                  onClick={() => deleteData(row.id)}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ),
        },
      ],
    },

    { key: "rincianModal", title: "Rincian Modal", width: 180, align: "center" },
    {
      key: "saldoBulanke1",
      title: "Bulan -1 ",
      width: 160,
      align: "center",
      render: (r) => {
        if (r.type === "total" && r.saldoBulanke1 === "") return "";
        return formatRupiah(r.saldoBulanke1);
      },
    },
    {
      key: "saldoBulanke2",
      title: "Bulan -2 ",
      width: 160,
      align: "center",
      render: (r) => {
        if (r.type === "total" && r.saldoBulanke2 === "") return "";
        return formatRupiah(r.saldoBulanke2);
      },
    },
    {
      key: "saldoBulanke3",
      title: "Bulan -3 ",
      width: 160,
      align: "center",
      render: (r) => {
        if (r.type === "total" && r.saldoBulanke3 === "") return "";
        return formatRupiah(r.saldoBulanke3);
      },
    },
    {
      key: "saldoBulanke4",
      title: "Bulan -4 ",
      width: 160,
      align: "center",
      render: (r) => {
        if (r.type === "total" && r.saldoBulanke4 === "") return "";
        return formatRupiah(r.saldoBulanke4);
      },
    },

    {
      key: "saldoBulanke5",
      title: "Bulan -5 ",
      width: 160,
      align: "center",
      render: (r) => {
        if (r.type === "total" && r.saldoBulanke5 === "") return "";
        return formatRupiah(r.saldoBulanke5);
      },
    },

    {
      key: "saldoBulanke6",
      title: "Bulan -6 ",
      width: 160,
      align: "center",
      render: (r) => {
        if (r.type === "total" && r.saldoBulanke6 === "") return "";
        return formatRupiah(r.saldoBulanke6);
      },
    },
    {
      key: "saldoBulanke7",
      title: "Bulan -7 ",
      width: 160,
      align: "center",
      render: (r) => {
        if (r.type === "total" && r.saldoBulanke7 === "") return "";
        return formatRupiah(r.saldoBulanke7);
      },
    },

    {
      key: "saldoBulanke8",
      title: "Bulan -8 ",
      width: 160,
      align: "center",
      render: (r) => {
        if (r.type === "total" && r.saldoBulanke8 === "") return "";
        return formatRupiah(r.saldoBulanke8);
      },
    },

    {
      key: "saldoBulanke9",
      title: "Bulan -9 ",
      width: 160,
      align: "center",
      render: (r) => {
        if (r.type === "total" && r.saldoBulanke9 === "") return "";
        return formatRupiah(r.saldoBulanke9);
      },
    },

    {
      key: "saldoBulanke10",
      title: "Bulan -10 ",
      width: 160,
      align: "center",
      render: (r) => {
        if (r.type === "total" && r.saldoBulanke10 === "") return "";
        return formatRupiah(r.saldoBulanke10);
      },
    },

    {
      key: "saldoBulanke11",
      title: "Bulan -11 ",
      width: 160,
      align: "center",
      render: (r) => {
        if (r.type === "total" && r.saldoBulanke11 === "") return "";
        return formatRupiah(r.saldoBulanke11);
      },
    },

    {
      key: "saldoBulanke12",
      title: "Bulan -12 ",
      width: 160,
      align: "center",
      render: (r) => {
        if (r.type === "total" && r.saldoBulanke12 === "") return "";
        return formatRupiah(r.saldoBulanke12);
      },
    },

    {
      key: "rata-rata",
      title: "RATA-RATA ",
      width: 160,
      align: "center",
      render: (r) => {
        if (r.type === "total" && r["rata-rata"] === "") return "";
        return formatRupiah(r["rata-rata"]);
      },
    },
  ];

  return (
    <div className="space-y-4">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus size={16} /> Tambah Data
        </button>
      </div>

      <GlobalTable
        columnGroups={columnGroups}
        data={tableData}
        page={1}
        pageSize={9999} // Tidak pakai pagination
        total={data.length}
        onPageChange={() => {}}
        stickyHeader
        // emptyText="Belum ada data daftar pemegang saham."
        rowClassName={(row) => (row.type === "total" ? "bg-yellow-50 font-semibold" : "")}
      />

      {/* MODAL */}
      <GlobalModal
        isOpen={showModal}
        onClose={closeModal}
        onSave={saveData}
        title={
          editingId
            ? "Edit PERHITUNGAN RATA-RATA SALDO UTANG"
            : "Tambah PERHITUNGAN RATA-RATA SALDO UTANG"
        }
        baseFields={baseFields}
        customChildren={customChildren}
        data={selected || {}}
        size="2xl"
        onFieldChange={handleFieldChange} // Real-time calculation
      />
    </div>
  );
}
