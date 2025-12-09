import React, { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { formatRupiah } from "@utils/formatCurrency";
import GlobalModal from "@shared/GlobalModal";
import GlobalTable from "@shared/GlobalTable";
import { hitungTotalGlobal, createTotalRow } from "@utils/helperTotal";

export default function PenghasilanTidakObjekPajak({ config }) {
  const {
    baseFields = ["namaPemotong", "npwpPemotong", "kode", "jenis", "labakotor"],
    customChildren = [],
    defaultData = {
      namaPemotong: "PT. Contoh Perusahaan",
      npwp: "",
      kode: "",
      jenis: "",
      labakotor: "",
    },
  } = config || {};

  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [selected, setSelected] = useState(null);

  // Add
  const openAddModal = () => {
    setSelected({ ...defaultData });
    setEditingId(null);
    setShowModal(true);
  };

  // Edit
  const openEditModal = (item) => {
    setSelected(item);
    setEditingId(item.id);
    setShowModal(true);
  };

  // Close
  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setSelected(null);
  };

  // Save
  const saveData = (values) => {
    if (editingId) {
      setData((prev) =>
        prev.map((item) => (item.id === editingId ? { ...values, id: editingId } : item))
      );
    } else {
      setData((prev) => [...prev, { ...values, id: Date.now() }]);
    }
    closeModal();
  };

  // Delete
  const deleteData = (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      setData((prev) => prev.filter((item) => item.id !== id));
    }
  };

  // Ambil label jenis
  const getJenisLabel = (value) => {
    const field = customChildren?.find((f) => f.key === "jenis");
    const option = field?.options?.find((o) => o.value === value);
    return option?.label || value || "-";
  };

  const totals = hitungTotalGlobal(data, ["labakotor"]);

      const tableData =
        data.length === 0
          ? []
          : [
              ...data,
              createTotalRow("JUMLAH", totals, {
                labelField: "npwp",
                base: {
                  namaPemotong: "",
                  kode: "",
                  jenis: "",
                },
              }),
            ];

  // === COLUMN GROUPS (SAMA STRUKTUR DENGAN CONTOH) ===
  const columnGroups = [
    {
      title: "TINDAKAN",
      children: [
        {
          key: "no",
          title: "NO",
          width: 60,
          align: "center",
          render: (row, i) => row.type === "total" ? "" : i + 1
        },
        {
          key: "_aksi",
          title: "AKSI",
          width: 100,
          align: "center",
          render: (row) => 
            row.type === "total" ? null : (
            <div className="flex justify-center gap-2">
              <button
                onClick={() => openEditModal(row)}
                className="p-1 text-blue-600 hover:bg-blue-50 rounded"
              >
                <Edit size={16} />
              </button>
              <button
                onClick={() => deleteData(row.id)}
                className="p-1 text-red-600 hover:bg-red-50 rounded"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ),
        },
      ],
    },

    {
      key: "jenis",
      title: "JENIS PENGHASILAN",
      width: 180,
      render: (row) => row.type === "total" ? "" : getJenisLabel(row.jenis),
    },
    { key: "kode", title: "KODE", width: 120 },
    { key: "namaPemotong", title: "NAMA PEMOTONG", width: 220 },
    { key: "npwp", title: "NPWP", width: 160, align: "center" },
    {
      key: "labakotor",
      title: "LABA KOTOR",
      width: 160,
      align: "center",
      render: (row) => {
        if (row.type === "total" && row.labakotor === "") return "";
        return formatRupiah(row.labakotor);
      },
    },
  ];

  return (
    <div className="space-y-4">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus size={16} /> Tambah Data
        </button>
      </div>

      {/* TABLE */}
      <GlobalTable
        columnGroups={columnGroups}
        data={tableData}
        page={1}
        pageSize={9999}
        total={data.length}
        onPageChange={() => {}}
        stickyHeader
        //emptyText='Belum ada data. Klik "Tambah Data" untuk menambah data baru.'
        rowClassName={(row) => (row.type === "total" ? "bg-yellow-50 font-semibold" : "")}
      />

      {/* MODAL */}
      <GlobalModal
        isOpen={showModal}
        onClose={closeModal}
        onSave={saveData}
        title={editingId ? "Edit Penghasilan" : "Tambah Penghasilan"}
        baseFields={baseFields}
        customChildren={customChildren}
        data={selected || {}}
        size="2xl"
      />
    </div>
  );
}
