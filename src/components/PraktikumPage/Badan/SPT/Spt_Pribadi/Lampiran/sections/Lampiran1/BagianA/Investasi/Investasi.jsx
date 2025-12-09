import React, { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { formatRupiah } from "@utils/formatCurrency";
import GlobalModal from "@shared/GlobalModal";
import GlobalTable from "@shared/GlobalTable";
import { hitungTotalGlobal, createTotalRow } from "@utils/helperTotal";

export default function DaftarInvestasi({ config }) {
  const {
    baseFields = [
      "kode",
      "deskripsi",
      "lokasiharta",
      "nomoridentitas",
      "penerimaInvestasi",
      "buktiKepemilikan",
      "biayaPerolehan",
      "tahunPerolehan",
      "nilaiSaatIni",
      "keteranganHarta",
    ],
    customChildren = [],
    defaultData = {
      kode: "",
      deskripsi: "",
      lokasiharta: "",
      nomoridentitas: "",
      penerimaInvestasi: "",
      buktiKepemilikan: "",
      biayaPerolehan: 0,
      tahunPerolehan: "",
      nilaiSaatIni: 0,
      keteranganHarta: "",
    },
  } = config || {};

  const [dataInvestasi, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [selected, setSelected] = useState(null);

  // ===== Modal Handler =====
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

  //  HITUNG TOTAL & BUAT BARIS TOTAL
  const totals = hitungTotalGlobal(dataInvestasi, ["biayaPerolehan", "nilaiSaatIni"]);

  // ===== Helper Label Option =====
  const getLabel = (key, value) => {
    const field = customChildren?.find((f) => f.key === key);
    const option = field?.options?.find((o) => o.value === value);
    return option?.label || value || "-";
  };

      const tableData =
        dataInvestasi.length === 0
          ? []
          : [
              ...dataInvestasi,
              createTotalRow("JUMLAH", totals, {
                labelField: "buktiKepemilikan",
                base: {
                  kode: "",
                  deskripsi: "",
                  lokasiharta: "",
                  nomoridentitas: "",
                  penerimaInvestasi: "",
                  tahunPerolehan: "",
                  keteranganHarta: "",
                },
              }),
            ];
  

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
          render: (row, i) => row.type === "total" ? "" : i + 1,
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

    { key: "kode", title: "Kode", width: 200 },

    {
      key: "deskripsi",
      title: "Deskripsi",
      width: 200,
      render: (r) => r.type === "total" ? "" : getLabel("deskripsi", r.deskripsi),
    },

    { key: "lokasiharta", title: "Lokasi Harta", width: 200 },

    { key: "nomoridentitas", title: "Nomor Identitas", width: 150 },

    {
      key: "penerimaInvestasi",
      title: "Nama Bank/Institusi/Penerima Investasi",
      width: 220,
    },

    { key: "buktiKepemilikan", title: "Bukti Kepemilikan/Nomor Akun", width: 180 },

    {
      key: "biayaPerolehan",
      title: "Biaya Perolehan",
      width: 150,
      align: "center",
      render: (r) => {
        if (r.type === "total" && r.biayaPerolehan === "") return "";
        return formatRupiah(r.biayaPerolehan);
      },
    },

    { key: "tahunPerolehan", title: "Tahun Perolehan", width: 150, align: "center" },

    {
      key: "nilaiSaatIni",
      title: "Nilai Saat ini",
      width: 150,
      align: "center",
      render: (r) => {
        if (r.type === "total" && r.nilaiSaatIni === "") return "";
        return formatRupiah(r.nilaiSaatIni);
      },
    },

    {
      key: "keteranganHarta",
      title: "Keterangan",
      width: 150,
      render: (r) => r.type === "total" ? "" : getLabel("keterangan", r.keteranganHarta || r.keterangan),
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
        total={dataInvestasi.length}
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
        title={editingId ? "Edit Data Investasi" : "Tambah Data Investasi"}
        baseFields={baseFields}
        customChildren={customChildren}
        data={selected || {}}
        size="2xl"
      />
    </div>
  );
}
