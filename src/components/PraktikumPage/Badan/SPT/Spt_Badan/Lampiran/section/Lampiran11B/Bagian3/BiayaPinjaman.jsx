import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { formatNumber, parseFormattedNumber, formatRupiah } from "@utils/formatCurrency";
import GlobalModal from "@shared/GlobalModal";
import GlobalTable from "@shared/GlobalTable";
import { hitungTotalGlobal, createTotalRow } from "@utils/helperTotal";

export default function BiayaPinjaman({ config, onAnswerChange }) {
  const {
    baseFields = [
      "pemberiPinjaman",
      "saldoRataRataUtang",
      "biayaPinjamanBunga",
      "biayaPinjamanDptDiperhitungkan",
      "biayaPinjamanTdkDiperhitungkan",
    ],
    customChildren = [],
    defaultData = {},
    onFieldChange,
  } = config || {};

  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [selected, setSelected] = useState(null);

  const [pertanyaan, setPertanyaan] = useState(0);

  const [radios, setRadios] = useState({
    pertanyaan: null,
  });

  const handleRadioChange = (field, value) => {
    setRadios((prev) => ({ ...prev, [field]: value }));
    onAnswerChange?.(field, value);
    console.log("Radio changed:", field, value);
  };

  const HELPER_CONFIG = {
    pertanyaan: {
      yes: "Ya, silakan mengisi lampiran 11C",
      no: "",
    },
  };

  const getHelperMessage = (field, value) => {
    const cfg = HELPER_CONFIG[field];
    if (!cfg) return "";

    // Case 1: Boolean (YES/NO)
    if (typeof value === "boolean") {
      return value ? cfg.yes : cfg.no;
    }

    // Case 2: Option select (option1, option2, dst)
    if (cfg[value]) {
      return cfg[value];
    }
  };

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

      // Auto calculate  ketika biayaPinjamanBunga atau biayaPinjamanDptDiperhitungkan berubah
      if (key === "biayaPinjamanBunga" || key === "biayaPinjamanDptDiperhitungkan") {
        const biayaPinjamanBunga =
          key === "biayaPinjamanBunga" ? value : newData.biayaPinjamanBunga || 0;
        const biayaPinjamanDptDiperhitungkan =
          key === "biayaPinjamanDptDiperhitungkan"
            ? value
            : newData.biayaPinjamanDptDiperhitungkan || 0;
        const biayaPinjamanTdkDiperhitungkan = biayaPinjamanBunga - biayaPinjamanDptDiperhitungkan;
        newData.biayaPinjamanTdkDiperhitungkan = biayaPinjamanTdkDiperhitungkan;

        console.log("Auto Calculate:", {
          biayaPinjamanBunga,
          biayaPinjamanDptDiperhitungkan,
          biayaPinjamanTdkDiperhitungkan,
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
  const totals = hitungTotalGlobal(data, [
    "saldoRataRataUtang",
    "biayaPinjamanBunga",
    "biayaPinjamanDptDiperhitungkan",
    "biayaPinjamanTdkDiperhitungkan",
  ]);

  const tableData =
    data.length === 0
      ? []
      : [
          ...data,
          createTotalRow("JUMLAH", totals, {
            labelField: "pemberiPinjaman",
            base: {
              pemberiPinjaman: "",
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

    //  "pemberiPinjaman",
    //   "saldoRataRataUtang",
    //   "biayaPinjamanBunga",
    //   "biayaPinjamanDptDiperhitungkan",
    //   "biayaPinjamanTdkDiperhitungkan",

    {
      key: "pemberiPinjaman",
      title: "PEMBERI PINJAMAN",
      width: 150,
      align: "center",
      render: (r) => {
        if (r.type === "total" && r.pemberiPinjaman === "") return "";
        return formatRupiah(r.pemberiPinjaman);
      },
    },

    {
      key: "saldoRataRataUtang",
      title: "Saldo Rata-Rata Utang",
      width: 150,
      align: "center",
      render: (r) => {
        if (r.type === "total" && r.saldoRataRataUtang === "") return "";
        return formatRupiah(r.saldoRataRataUtang);
      },
    },

    {
      key: "biayaPinjamanBunga",
      title: "Biaya Pinjaman (Bunga)",
      width: 150,
      align: "center",
      render: (r) => {
        if (r.type === "total" && r.biayaPinjamanBunga === "") return "";
        return formatRupiah(r.biayaPinjamanBunga);
      },
    },

    {
      key: "biayaPinjamanDptDiperhitungkan",
      title: "Biaya Pinjaman yang Dapat Diperhitungkan",
      width: 150,
      align: "center",
      render: (r) => {
        if (r.type === "total" && r.biayaPinjamanDptDiperhitungkan === "") return "";
        return formatRupiah(r.biayaPinjamanDptDiperhitungkan);
      },
    },

    {
      key: "biayaPinjamanTdkDiperhitungkan",
      title: "Biaya Pinjaman yang TidakDapat Diperhitungkan",
      width: 150,
      align: "center",
      render: (r) => {
        if (r.type === "total" && r.biayaPinjamanTdkDiperhitungkan === "") return "";
        return formatRupiah(r.biayaPinjamanTdkDiperhitungkan);
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

      <div className="grid grid-cols-17 gap-3 items-center px-3 py-2">
        <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
          <span className="text-gray-800 text-base font-medium">
            Apakah Anda mempunyai utang swasta luar negeri?
            <span className="text-red-500"></span>
          </span>
        </div>
        <div className="col-span-12 md:col-span-2">
          <div className="flex items-center gap-6">
            <label className="inline-flex items-center gap-2">
              <input
                type="radio"
                name="pertanyaan"
                checked={radios.pertanyaan === true}
                // change
                onChange={() => handleRadioChange("pertanyaan", true)}
              />
              <span>Ya</span>
            </label>
            <label className="inline-flex items-center gap-2">
              <input
                type="radio"
                name="pertanyaan"
                checked={radios.pertanyaan === false}
                onChange={() => handleRadioChange("pertanyaan", false)}
              />
              <span>Tidak</span>
            </label>
          </div>
        </div>
        <div className="col-span-12 md:col-span-1 text-sm">
          <div className={radios.pertanyaan === true ? "bg-blue-100 rounded px-3 py-2" : ""}>
            {getHelperMessage("pertanyaan", radios.pertanyaan)}
          </div>
        </div>
      </div>

      {/* MODAL */}
      <GlobalModal
        columnGroups={columnGroups}
        isOpen={showModal}
        onClose={closeModal}
        onSave={saveData}
        title={
          editingId ? "Edit PENGHITUNGAN BIAYA PINJAMAN" : "Tambah PENGHITUNGAN BIAYA PINJAMAN"
        }
        baseFields={baseFields}
        customChildren={customChildren}
        data={selected || {}}
        size="2xl"
        onFieldChange={handleFieldChange}
      />
    </div>
  );
}
