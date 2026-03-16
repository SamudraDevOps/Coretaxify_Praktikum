import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { formatNumber, parseFormattedNumber, formatRupiah } from "@utils/formatCurrency";
import GlobalModal from "@shared/GlobalModal";
import GlobalTable from "@shared/GlobalTable";

export default function DaftarPiutang({ config }) {
  const {
    baseFields = [
      "npwpPenerima",
      "namaPenerima",
      "alamat",
      "calender",
      "jenisBiaya",
      "nilaiTransaksi",
      "keterangan",
      "pphdipotong",
      "nomorBuktiPemotongan",
    ],
    customChildren = [],
    defaultData = {
      namaPenerima: " PT HJ.GALIH PREVIAND WICAKSONO",
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

    { key: "npwpPenerima", title: "NPWP PENERIMA", width: 180, align: "center" },
    { key: "namaPenerima", title: " NAMA PENERIMA", width: 120, align: "center" },
    { key: "alamat", title: "ALAMAT", width: 120, align: "center" },
    {
      key: "calender",
      title: "TANGGAL",
      width: 150,
      align: "center",
    },
    {
      key: "jenisBiaya",
      title: "JENIS BIAYA",
      width: 150,
      align: "center",
      render: (row) => getLabel("jenisBiaya", row["jenisBiaya"]),
    },
    {
      key: "nilaiTransaksi",
      title: "Nilai Transaksi",
      width: 150,
      align: "center",
      render: (r) => {
        if (r.type === "total" && r.nilaiTransaksi === "") return "";
        return formatRupiah(r.nilaiTransaksi);
      },
    },

    {
      key: "keterangan",
      title: "KETERANGAN",
      width: 150,
      align: "center",
    },

    {
      key: "pphdipotong",
      title: "PPH DIPOTONG/DIPUNGUT",
      width: 150,
      align: "center",
      render: (r) => {
        if (r.type === "total" && r.pphdipotong === "") return "";
        return formatRupiah(r.pphdipotong);
      },
    },
    {
      key: "nomorBuktiPemotongan",
      title: "NOMOR BUKTI PEMOTONGAN",
      width: 150,
      align: "center",
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
        data={data}
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
        title={editingId ? "Edit Tempat Kegiatan Usaha" : "Tambah Tempat Kegiatan Usaha"}
        baseFields={baseFields}
        customChildren={customChildren}
        data={selected || {}}
        size="2xl"
      />
    </div>
  );
}
