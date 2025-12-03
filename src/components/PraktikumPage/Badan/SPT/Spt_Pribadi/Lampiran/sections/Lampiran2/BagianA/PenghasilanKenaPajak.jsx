import React, { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { formatNumber, parseFormattedNumber, formatRupiah } from "@utils/formatCurrency";
import GlobalModal from "@shared/GlobalModal";
import GlobalTable from "@shared/GlobalTable";

import { hitungTotalGlobal, createTotalRow } from "@utils/helperTotal";

export default function PenghasilanKenaPajak({ config }) {
  const {
    baseFields = [
      "namaPemotong", 
      "npwp", 
      "kode", 
      "jenis", 
      "dasarPengenaanPajak", 
      "pphdipotong"
    ],
    customChildren = [],
    defaultData = {
      namaPemotong: "PT. Contoh Perusahaan",
      npwpPemotong: "",
      kode: "",
      jenis: "",
      dasarPengenaanPajak: "",
      pphdipotong: "",
    },
  } = config || {};

  const [dataPenghasilan, setDataPenghasilan] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [selected, setSelected] = useState(null);

  // Open modal add
  const openAddModal = () => {
    setSelected({ ...defaultData });
    setEditingId(null);
    setShowModal(true);
  };

  // Open modal edit
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

  // Save
  const saveData = (values) => {
    if (editingId) {
      setDataPenghasilan((prev) =>
        prev.map((item) => (item.id === editingId ? { ...values, id: editingId } : item))
      );
    } else {
      setDataPenghasilan((prev) => [...prev, { ...values, id: Date.now() }]);
    }
    closeModal();
  };

  // Delete
  const deleteData = (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      setDataPenghasilan((prev) => prev.filter((item) => item.id !== id));
    }
  };

  // TOTAL
  const totals = hitungTotalGlobal(dataPenghasilan, ["dasarPengenaanPajak", "pphdipotong"]);

  const tableData =
    dataPenghasilan.length === 0
      ? []
      : [
          ...dataPenghasilan,
          createTotalRow("JUMLAH", totals, {
            labelField: "namaPemotong",
            base: {
              npwp: "",
              kode: "",
              jenis: "",
            },
          }),
        ];

  // ============================
  // COLUMN GROUPS (LIKE PPhDipotong)
  // ============================
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

    {
      title: "IDENTITAS PEMOTONG",
      children: [
        {
          key: "namaPemotong",
          title: "NAMA PEMOTONG",
          width: 200,
        },
        {
          key: "npwp",
          title: "NPWP",
          width: 150,
        },
      ],
    },

    { key: "kode", title: "KODE", width: 100 },
    { key: "jenis", title: "JENIS PENGHASILAN", width: 200 },

    {
      key: "dasarPengenaanPajak",
      title: "DASAR PENGENAAN PAJAK",
      width: 160,
      align: "center",
      render: (r) => {
        if (r.type === "total" && r.dasarPengenaanPajak === "") return "";
        return formatRupiah(r.dasarPengenaanPajak);
      },
    },

    {
      key: "pphdipotong",
      title: "PPH YANG DIPOTONG",
      width: 150,
      align: "center",
      render: (r) => {
        if (r.type === "total" && r.pphdipotong === "") return "";
        return formatRupiah(r.pphdipotong);
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
        pageSize={9999}
        total={dataPenghasilan.length}
        onPageChange={() => {}}
        stickyHeader
        rowClassName={(row) => (row.type === "total" ? "bg-yellow-50 font-semibold" : "")}
      />

      {/* MODAL */}
      <GlobalModal
        isOpen={showModal}
        onClose={closeModal}
        onSave={saveData}
        title={editingId ? "Edit Penghasilan Kena Pajak" : "Tambah Penghasilan Kena Pajak"}
        baseFields={baseFields}
        customChildren={customChildren}
        data={selected || {}}
        size="2xl"
      />
    </div>
  );
}
