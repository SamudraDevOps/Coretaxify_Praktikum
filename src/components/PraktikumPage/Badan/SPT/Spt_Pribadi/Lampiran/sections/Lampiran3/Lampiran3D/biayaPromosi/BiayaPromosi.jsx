import React, { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { formatRupiah } from "@utils/formatCurrency";
import GlobalModal from "@shared/GlobalModal";
import GlobalTable from "@shared/GlobalTable";
import { hitungTotalGlobal, createTotalRow } from "@utils/helperTotal";

export default function BiayaPromosi({ config }) {
  const {
    baseFields = [
      "namaPemotong",
      "npwpPemotong",
      "alamat",
      "calender",
      "jenisBiaya",
      "biayaPromosi",
      "keterangan",
      "pphdipotong",
      "nomorBuktiPotong",
    ],
    customChildren = [],
    defaultData = {
      namaPemotong: "PT. Contoh Perusahaan",
      npwp: "",
      alamat: "",
      calender: "",
      jenisBiaya: "",
      biayaPromosi: 0,
      keterangan: "",
      pphdipotong: 0,
      nomorBuktiPotong: "",
    },
  } = config || {};

  const [dataPenghasilan, setDataPenghasilan] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [selected, setSelected] = useState(null);

  // ================= CRUD =================
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
      setDataPenghasilan((prev) =>
        prev.map((item) => (item.id === editingId ? { ...values, id: editingId } : item))
      );
    } else {
      setDataPenghasilan((prev) => [...prev, { ...values, id: Date.now() }]);
    }
    closeModal();
  };

  const deleteData = (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      setDataPenghasilan((prev) => prev.filter((item) => item.id !== id));
    }
  };

  // =============== HELPERS ===============
  const getLabel = (key, value) => {
    const field = customChildren?.find((f) => f.key === key);
    const option = field?.options?.find((o) => o.value === value);
    return option?.label || value || "-";
  };

  const totals = hitungTotalGlobal(dataPenghasilan, ["biayaPromosi", "pphdipotong"]);

  const tableData =
    dataPenghasilan.length === 0
      ? []
      : [
          ...dataPenghasilan,
          createTotalRow("JUMLAH", totals, {
            labelField: "jenisBiaya",
            base: {
              namaPemotong: "",
              npwp: "",
              alamat: "",
              calender: "",
              keterangan: "",
              nomorBuktiPotong: "",
            },
          }),
        ];
  // ================= COLUMN GROUP =================
  const columnGroups = [
    {
      title: "TINDAKAN",
      children: [
        {
          key: "no",
          title: "NO",
          width: 60,
          align: "center",
          render: (row, i) => row.type === "total" ? "" : i + 1,
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

    { key: "namaPemotong", title: "NAMA", width: 200 },
    { key: "npwp", title: "NPWP", width: 160, align: "center" },
    { key: "alamat", title: "ALAMAT", width: 220 },
    { key: "calender", title: "TANGGAL", width: 140, align: "center" },

    {
      key: "jenisBiaya",
      title: "JENIS BIAYA",
      width: 300,
      render: (row) => row.type === "total" ? row.jenisBiaya : getLabel("jenisBiaya", row.jenisBiaya)
    },

    {
      key: "biayaPromosi",
      title: "BIAYA PROMOSI",
      width: 160,
      align: "center",
      render: (row) => {
        if (row.type === "total" && row.biayaPromosi === "") return "";
        return formatRupiah(row.biayaPromosi);
      },
    },

    { key: "keterangan", title: "KETERANGAN", width: 200 },

    {
      key: "pphdipotong",
      title: "PPh DIPOTONG",
      width: 150,
      align: "center",
      render: (row) => {
        if (row.type === "total" && row.pphdipotong === "") return "";
        return formatRupiah(row.pphdipotong);
      }
    },

    { key: "nomorBuktiPotong", title: "NOMOR BUKTI POTONG", width: 200 },
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
        total={dataPenghasilan.length}
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
        title={editingId ? "Edit Biaya Promosi" : "Tambah Biaya Promosi"}
        baseFields={baseFields}
        customChildren={customChildren}
        data={selected || {}}
        size="2xl"
      />
    </div>
  );
}
