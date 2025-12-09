import React, { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { formatRupiah } from "@utils/formatCurrency";
import GlobalModal from "@shared/GlobalModal";
import GlobalTable from "@shared/GlobalTable";
import { hitungTotalGlobal, createTotalRow } from "@utils/helperTotal";

export default function DaftarPenghasilanNeto({ config }) {
  const {
    baseFields = [
      "nomoridentitas",
      "nama",
      "penghasilanBruto",
      "pengurangan",
      "penghasilanNeto", // display only
      "keteranganHarta",
    ],
    customChildren = [],
    defaultData = {
      nomoridentitas: "",
      nama: "Contoh Nama Pemberi Kerja",
      penghasilanBruto: 0,
      pengurangan: 0,
      keteranganHarta: "",
    },
  } = config || {};

  const [rows, setRows] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [selected, setSelected] = useState(null);

  // ===== MODAL CONTROL =====
  const openAddModal = () => {
    setSelected({ ...defaultData });
    setEditingId(null);
    setShowModal(true);
  };

  const openEditModal = (item) => {
    setSelected(item);
    setEditingId(item.id);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setSelected(null);
  };

  // ===== SAVE =====
  const saveData = (values) => {
    const bruto = Number(values?.penghasilanBruto || 0);
    const kurang = Number(values?.pengurangan || 0);
    const neto = Math.max(0, bruto - kurang);

    const toSave = {
      ...values,
      penghasilanNeto: neto,
    };

    if (editingId) {
      setRows((prev) =>
        prev.map((r) => (r.id === editingId ? { ...toSave, id: editingId } : r))
      );
    } else {
      setRows((prev) => [...prev, { ...toSave, id: Date.now() }]);
    }

    closeModal();
  };

  // ===== DELETE =====
  const deleteData = (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      setRows((prev) => prev.filter((r) => r.id !== id));
    }
  };
  
  //  HITUNG TOTAL & BUAT BARIS TOTAL
  const totals = hitungTotalGlobal(rows, ["penghasilanBruto", "pengurangan", "penghasilanNeto"]);

  const tableData = 
    rows.length === 0 
    ? [] 
    : [
      ...rows,
       createTotalRow( "JUMLAH", totals, {
        labelField: "nama",
        base: {
          nomoridentitas: "",
          nama: "",
          keteranganHarta: "",
        },
       }
      )
    ];

  // ===== COLUMN DEFINITIONS =====
  const columnGroups = [
    {
      title: "TINDAKAN",
      children: [
        {
          key: "no",
          title: "No",
          width: 60,
          align: "center",
          render: (row, i) => (row.type === "total" ? "" : i + 1),
        },
        {
          key: "_aksi",
          title: "Aksi",
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
      key: "nomoridentitas",
      title: "No Identitas Pemberi Kerja",
      width: 220,
    },

    {
      key: "nama",
      title: "Nama Pemberi Kerja",
      width: 220,
    },

    {
      key: "penghasilanBruto",
      title: "Penghasilan Bruto",
      width: 180,
      align: "center",
      render: (r) => {
        if (r.type === "total" && r.penghasilanBruto === "") return "";
        return formatRupiah(r.penghasilanBruto);
      }
    },

    {
      key: "pengurangan",
      title: "Pengurangan",
      width: 180,
      align: "center",
      render: (r) => {
        if (r.type === "total" && r.pengurangan === "") return "";
        return formatRupiah(r.pengurangan);
      }
    },

    {
      key: "penghasilanNeto",
      title: "Penghasilan Neto",
      width: 180,
      align: "center",
      render: (r) =>
        formatRupiah(
          r.penghasilanNeto != null
            ? r.penghasilanNeto
            : Math.max(0, Number(r.penghasilanBruto || 0) - Number(r.pengurangan || 0))
        ),
    },

    {
      key: "keteranganHarta",
      title: "Keterangan",
      width: 200,
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
          <Plus size={16} />
          Tambah Data
        </button>
      </div>

      {/* TABLE */}
      <GlobalTable
        columnGroups={columnGroups}
        data={tableData}
        page={1}
        pageSize={9999}
        total={rows.length}
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
        title={editingId ? "Edit Data Penghasilan Neto" : "Tambah Data Penghasilan Neto"}
        baseFields={baseFields}
        customChildren={customChildren}
        data={selected || {}}
        size="2xl"
      />
    </div>
  );
}
