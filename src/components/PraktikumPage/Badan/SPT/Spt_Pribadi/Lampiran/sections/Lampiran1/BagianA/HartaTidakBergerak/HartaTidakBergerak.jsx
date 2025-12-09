import React, { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { formatRupiah } from "@utils/formatCurrency";
import GlobalModal from "@shared/GlobalModal";
import GlobalTable from "@shared/GlobalTable";

export default function DaftarHartaBergerak({ config }) {
  const {
    baseFields = [
      "kode",
      "deskripsi",
      "lokasiHarta",
      "ukuranTanah",
      "ukuranBangunan",
      "sumberKepemilikan",
      "nomorSertifikat",
      "tahunPerolehan",
      "biayaPerolehan",
      "nilaiSaatIni",
      "keteranganHarta",
    ],
    customChildren = [],
    defaultData = {
      kode: "",
      deskripsi: "",
      lokasiHarta: "",
      ukuranTanah: "",
      ukuranBangunan: "",
      sumberKepemilikan: "",
      nomorSertifikat: "",
      tahunPerolehan: "",
      biayaPerolehan: 0,
      nilaiSaatIni: 0,
      keteranganHarta: "",
    },
  } = config || {};

  const [dataHarta, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [selected, setSelected] = useState(null);

  // ===== Modal =====
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

  const saveData = (values) => {
    if (editingId) {
      setData((prev) =>
        prev.map((item) =>
          item.id === editingId ? { ...values, id: editingId } : item
        )
      );
    } else {
      setData((prev) => [...prev, { ...values, id: Date.now() }]);
    }
    closeModal();
  };

  const deleteData = (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      setData((prev) => prev.filter((item) => item.id !== id));
    }
  };

  // ===== Helper Label Option =====
  const getLabel = (key, value) => {
    const field = customChildren?.find((f) => f.key === key);
    return field?.options?.find((o) => o.value === value)?.label || value || "-";
  };

  // ===== Column GlobalTable =====
  const columnGroups = [
    {
      title: "TINDAKAN",
      children: [
        {
          key: "no",
          title: "No",
          width: 60,
          align: "center",
          render: (row, i) => i + 1,
        },
        {
          key: "_aksi",
          title: "Aksi",
          width: 100,
          align: "center",
          render: (row) => (
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

    { key: "kode", title: "Kode", width: 140 },

    {
      key: "deskripsi",
      title: "Deskripsi",
      width: 220,
      render: (r) => getLabel("deskripsi", r.deskripsi),
    },

    { key: "lokasiHarta", title: "Lokasi Harta", width: 200 },

    { key: "ukuranTanah", title: "Ukuran Tanah (m²)", width: 160, align: "right" },

    { key: "ukuranBangunan", title: "Ukuran Bangunan (m²)", width: 180, align: "right" },

    {
      key: "sumberKepemilikan",
      title: "Sumber Kepemilikan",
      width: 200,
      render: (r) => getLabel("sumberKepemilikan", r.sumberKepemilikan),
    },

    { key: "nomorSertifikat", title: "Nomor Sertifikat", width: 200 },

    { key: "tahunPerolehan", title: "Tahun Perolehan", width: 140, align: "center" },

    {
      key: "biayaPerolehan",
      title: "Biaya Perolehan",
      width: 160,
      align: "center",
      render: (r) => formatRupiah(r.biayaPerolehan),
    },

    {
      key: "nilaiSaatIni",
      title: "Nilai Saat Ini",
      width: 160,
      align: "center",
      render: (r) => formatRupiah(r.nilaiSaatIni),
    },

    {
      key: "keteranganHarta",
      title: "Keterangan",
      width: 180,
      render: (r) => r.keterangan || r.keteranganHarta || "-",
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
        data={dataHarta}
        page={1}
        pageSize={9999}
        total={dataHarta.length}
        onPageChange={() => {}}
        stickyHeader
        emptyText='Belum ada data. Klik "Tambah Data" untuk menambah data baru.'
      />

      {/* MODAL */}
      <GlobalModal
        isOpen={showModal}
        onClose={closeModal}
        onSave={saveData}
        title={
          editingId
            ? "Edit Data Harta Tidak Bergerak"
            : "Tambah Data Harta Tidak Bergerak"
        }
        baseFields={baseFields}
        customChildren={customChildren}
        data={selected || {}}
        size="2xl"
      />
    </div>
  );
}
