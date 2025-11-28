import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { formatNumber, parseFormattedNumber, formatRupiah } from "@utils/formatCurrency";
import GlobalModal from "@shared/GlobalModal";
import GlobalTable from "@shared/GlobalTable";

import { hitungTotalGlobal, createTotalRow } from "@utils/helperTotal";

export default function PPhDipotong({ config }) {
  const {
    baseFields = [
      "namaPemotong",
      "negara",
      "tanggal",
      "jenis",
      "penghasilanNetto",
      "nilai",
      "mataUang",
      "nilaiUangAsing",
      "jumlahKredit",
    ],
    customChildren = [],
    defaultData = {
      namaPemotong: "GALIH PREVIAND WICAKSONO (PT)",
      negara: "",
      tanggal: "",
      jenis: "",
      penghasilanNetto: "",
      nilai: "",
      mataUang: "",
      nilaiUangAsing: "",
      jumlahKredit: "",
    },
  } = config || {};

  const [form, setForm] = useState({
    penguranganPajak: 0,
    jumlahPajakDibayarLuarNegeri: 0,
  });

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

  //  HITUNG TOTAL & BUAT BARIS TOTAL
  const totals = hitungTotalGlobal(data, ["penghasilanNetto", "nilai", "jumlahKredit"]);

  // RUMUS: jumlahPajakDibayarLuarNegeri = totals.jumlahKredit - penguranganPajak
  useEffect(() => {
    const totalKredit = totals.jumlahKredit || 0;
    const pengurangan = form.penguranganPajak || 0;
    const hasil = totalKredit - pengurangan;

    setForm((prev) => ({
      ...prev,
      jumlahPajakDibayarLuarNegeri: hasil, // Bisa minus
    }));
  }, [totals.jumlahKredit, form.penguranganPajak]);

  const tableData =
    data.length === 0
      ? []
      : [
          ...data,
          createTotalRow("JUMLAH", totals, {
            labelField: "jenis",
            base: {
              namaPemotong: "",
              negara: "",
              tanggal: "",
              mataUang: "",
              nilaiUangAsing: "",
              jumlahKredit: "",
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

    {
      title: "PEMOTONG PAJAK ",
      children: [
        {
          key: "namaPemotong",
          title: "NAMA",
          width: 140,
          align: "center",
        },
        {
          key: "negara",
          title: "NEGARA ",
          width: 80,
          align: "center",
        },
      ],
    },

    { key: "tanggal", title: "TANGGAL TRANSAKSI/PEMBAYARAN PPh ", width: 180 },
    { key: "jenis", title: " JENIS PENGHASILAN ", width: 120, align: "center" },
    {
      key: "penghasilanNetto",
      title: "PENGHASILAN NETO (RUPIAH) ",
      width: 160,
      align: "center",
      render: (r) => {
        if (r.type === "total" && r.penghasilanNetto === "") return "";
        return formatRupiah(r.penghasilanNetto);
      },
    },

    {
      title: "PPh YANG DIBAYAR/DIPOTONG/TERUTANG DI LUAR NEGERI ",
      children: [
        {
          key: "nilai",
          title: "NILAI (Rp)",
          width: 140,
          align: "center",
          render: (r) => {
            if (r.type === "total" && r.nilai === "") return "";
            return formatRupiah(r.nilai);
          },
        },
        {
          key: "mataUang",
          title: "MATA UANG",
          width: 80,
          align: "center",
        },
        {
          key: "nilaiUangAsing",
          title: "NILAI (UANG ASING)",
          width: 160,
          align: "center",
          render: (r) => {
            if (r.type === "total" && r.nilaiUangAsing === "") return "";
            return formatRupiah(r.nilaiUangAsing);
          },
        },
      ],
    },

    {
      key: "jumlahKredit",
      title: " JUMLAH KREDIT PAJAK YANG DAPAT DIPERHITUNGKAN (Rp)  ",
      width: 120,
      align: "center",
      render: (r) => {
        if (r.type === "total" && r.jumlahKredit === "") return "";
        return formatRupiah(r.jumlahKredit);
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

      <div className="space-y-3 pt-2 ">
        {/* Total Pengurang Manual */}

        <div className="border rounded-md p-4 w-full">
          <div className="grid grid-cols-[1fr_auto] gap-4 items-center">
            <div className="text-center font-medium text-gray-700">
              PENGEMBALIAN/PENGURANGAN PAJAK PENGHASILAN LUAR NEGERI (PASAL 24) YANG TELAH
              DIKREDITKAN UNTUK TAHUN SEBELUMNYA
            </div>
            <div style={{ width: "180px" }}>
              <input
                type="text"
                value={formatNumber(form.penguranganPajak)}
                onChange={(e) => {
                  const numericValue = parseFormattedNumber(e.target.value);
                  setForm((prev) => ({ ...prev, penguranganPajak: numericValue }));
                }}
                placeholder="0"
                className="w-full p-2 border rounded-md text-sm text-right"
                inputMode="numeric"
              />
            </div>
          </div>
        </div>

        {/* Hasil Perhitungan (ReadOnly) */}
        <div
          className={`border rounded-md p-4 w-full ${
            form.jumlahPajakDibayarLuarNegeri < 0 ? "bg-red-50" : "bg-blue-50"
          }`}
        >
          <div className="grid grid-cols-[1fr_auto] gap-4 items-center">
            <div
              className={`text-center font-semibold ${
                form.jumlahPajakDibayarLuarNegeri < 0 ? "text-red-900" : "text-blue-900"
              }`}
            >
              JUMLAH PAJAK PENGHASILAN YANG DIBAYAR DI LUAR NEGERI YANG DAPAT DIPERHITUNGKAN DALAM
              TAHUN BERJALAN
            </div>
            <div style={{ width: "180px" }}>
              <input
                type="text"
                readOnly={true}
                value={formatNumber(form.jumlahPajakDibayarLuarNegeri)}
                placeholder="0"
                className={`w-full p-2 border rounded-md text-sm text-right font-semibold cursor-not-allowed ${
                  form.jumlahPajakDibayarLuarNegeri < 0 ? "bg-red-100 text-red-700" : "bg-gray-100"
                }`}
                inputMode="numeric"
              />
            </div>
          </div>
        </div>
      </div>

      {/* MODAL */}
      <GlobalModal
        isOpen={showModal}
        onClose={closeModal}
        onSave={saveData}
        title={editingId ? "Edit Daftar Pemegang Saham" : "Tambah Daftar Pemegang Saham"}
        baseFields={baseFields}
        customChildren={customChildren}
        data={selected || {}}
        size="2xl"
      />
    </div>
  );
}
