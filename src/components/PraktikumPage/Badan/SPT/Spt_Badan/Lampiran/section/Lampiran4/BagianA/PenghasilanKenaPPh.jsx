import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { formatNumber, parseFormattedNumber, formatRupiah } from "@utils/formatCurrency";
import GlobalModal from "@shared/GlobalModal";
import GlobalTable from "@shared/GlobalTable";

import { hitungTotalGlobal, createTotalRow } from "@utils/helperTotal";

export default function PenghasilanTidakObjekPajak({ config }) {
  const {
    baseFields = [
      "namaPemotong",
      "npwp",
      "objekPajak",
      "dasarPengenaanPajak",
      "tingkat",
      "pphFinalTerutang",
    ],
    customChildren = [],
    defaultData = {
      namaPemotong: "GALIH PREVIAND WICAKSONO (PT)",
      npwp: "",
      dasarPengenaanPajak: "",
      objekPajak: "",
      tingkat: "",
      pphFinalTerutang: "",
    },
  } = config || {};

  const [data, setData] = useState([]);
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

  //  HITUNG TOTAL & BUAT BARIS TOTAL
  const totals = hitungTotalGlobal(data, ["dasarPengenaanPajak", "pphFinalTerutang"]);

  const tableData =
    data.length === 0
      ? []
      : [
          ...data,
          createTotalRow("JUMLAH", totals, {
            labelField: "objekPajak",
            base: {
              namaPemotong: "",
              npwp: "",
              kode: "",
              objekPajak: "JUMLAH",
              tingkat: "",
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

    { key: "npwp", title: "NPWP PEMOTONG/PEMUNGUT ", width: 180, align: "center" },
    { key: "namaPemotong", title: " NAMA PEMOTONG/PEMUNGUT", width: 120, align: "center" },
    { key: "kode", title: "KODE OBJEK PAJAK", width: 120, align: "center" },
    { key: "objekPajak", title: "OBJEK PAJAK", width: 120, align: "center" },

    {
      key: "dasarPengenaanPajak",
      title: "DASAR PENGENAAN PAJAK (RUPIAH) ",
      width: 160,
      align: "center",
      render: (r) => {
        if (r.type === "total" && r.dasarPengenaanPajak === "") return "";
        return formatRupiah(r.dasarPengenaanPajak);
      },
    },
    { key: "tingkat", title: "TINGKAT", width: 120, align: "center" },

    {
      key: "pphFinalTerutang",
      title: "PPh FINAL TERUTANG (RUPIAH) ",
      width: 120,
      align: "center",
      render: (r) => {
        if (r.type === "total" && r.pphFinalTerutang === "") return "";
        return formatRupiah(r.pphFinalTerutang);
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
            ? "Edit Penghasilan yang dikenakan PPh Bersifat Final"
            : "Tambah Penghasilan yang dikenakan PPh Bersifat Final"
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
