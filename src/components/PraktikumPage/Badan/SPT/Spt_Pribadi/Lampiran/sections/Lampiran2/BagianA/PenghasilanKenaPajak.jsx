import React, { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { formatNumber, parseFormattedNumber, formatRupiah } from "@utils/formatCurrency";
import GlobalModal from "@shared/GlobalModal";
import GlobalTable from "@shared/GlobalTable";

const PenghasilanKenaPajak = ({ config }) => {
  const {
    baseFields = ["namaPemotong", "npwp", "kode", "jenis", "dasarPengenaanPajak", "pphdipotong"],
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

  // Save data
  const saveData = (values) => {
    console.log("Saved values:", values);
    if (editingId) {
      setDataPenghasilan((prev) =>
        prev.map((item) => (item.id === editingId ? { ...values, id: editingId } : item))
      );
    } else {
      setDataPenghasilan((prev) => [...prev, { ...values, id: Date.now() }]);
    }
    closeModal();
  };

  // Delete data
  const deleteData = (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      setDataPenghasilan((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const columns = [
    {
      key: "no",
      title: "NO",
      width: 60,
      align: "center",
      render: (_r, i) => i + 1,
    },
    {
      key: "namaPemotong",
      title: "NAMA PEMOTONG",
      width: 200,
      render: (r) => r.namaPemotong,
    },
    {
      key: "npwp",
      title: "NPWP",
      width: 150,
      render: (r) => r.npwp,
    },
    {
      key: "kode",
      title: "KODE",
      width: 100,
      render: (r) => r.kode,
    },
    {
      key: "Jenis Penhasilan",
      title: "JENIS PENHASILAN",
      width: 200,
      render: (r) => r.jenis,
    },
    {
      key: "dasarpengenaanpajak",
      title: "DASAR PENGENAAN PAJAK",
      width: 150,
      render: (r) => formatRupiah(r.dasarPengenaanPajak),
    },
    {
      key: "pphdipotong",
      title: "PPH YANG DIPOTONG",
      width: 150,
      render: (r) => formatRupiah(r.pphdipotong),
    },
    {
      key: "_aksi",
      title: "AKSI",
      width: 100,
      align: "center",
      render: (row) => (
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
        columns={columns}
        data={dataPenghasilan}
        page={1}
        pageSize={9999} // Tidak pakai pagination
        total={dataPenghasilan.length}
        onPageChange={() => {}}
        stickyHeader
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
};

export default PenghasilanKenaPajak;
