import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { formatNumber, parseFormattedNumber, formatRupiah } from "@utils/formatCurrency";
import GlobalModal from "@shared/GlobalModal";
import GlobalTable from "@shared/GlobalTable";
import { hitungTotalGlobal, createTotalRow } from "@utils/helperTotal";

export default function UtangSwastaLuarNegeri({ config, onAnswerChange }) {
  const {
    baseFields = [
      "pemberiPinjaman",
      "alamat",
      "negara",
      "kodeNegara",
      "mataUang",
      "kursAkhirTahun",
      "UtangAwalTahun",
      "penambahanUtang",
      "penguranganUtang",
      "totalUtangAkhirTahun",
      "tanggalMulaiPinjaman",
      "akhirTempoPinjaman",
      "tingkatBungaPinjaman",
      "jumlahBunga",
      "biayaSelainBunga",
      "peruntukanPinjaman",
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
  // ...existing code...
  const handleFieldChange = (key, value) => {
    setSelected((prev) => {
      const newData = { ...prev, [key]: value };

      // Auto calculate totalUtangAkhirTahun jika salah satu field terkait berubah
      if (key === "UtangAwalTahun" || key === "penambahanUtang" || key === "penguranganUtang") {
        const UtangAwalTahun = parseFloat(
          key === "UtangAwalTahun" ? value : newData.UtangAwalTahun || 0
        );
        const penambahanUtang = parseFloat(
          key === "penambahanUtang" ? value : newData.penambahanUtang || 0
        );
        const penguranganUtang = parseFloat(
          key === "penguranganUtang" ? value : newData.penguranganUtang || 0
        );

        newData.totalUtangAkhirTahun =
          (UtangAwalTahun || 0) + (penambahanUtang || 0) - (penguranganUtang || 0);
      }

      return newData;
    });
  };
  // ...existing code...
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
    "UtangAwalTahun",
    "penambahanUtang",
    "penguranganUtang",
    "totalUtangAkhirTahun",
    "jumlahBunga",
    "biayaSelainBunga",
  ]);

  const tableData =
    data.length === 0
      ? []
      : [
          ...data,
          createTotalRow("JUMLAH", totals, {
            labelField: "kursAkhirTahun",
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

    {
      title: "PEMBERI PINJAMAN",
      children: [
        {
          key: "pemberiPinjaman",
          title: "NAMA",
          width: 80,
          align: "center",
        },
        {
          key: "alamat",
          title: "ALAMAT",
          width: 80,
          align: "center",
        },
        {
          key: "negara",
          title: "NEGARA/YURISDIKSI ",
          width: 80,
          align: "center",
        },
      ],
    },

    {
      title: "MATA UANG",
      children: [
        {
          key: "kodeNegara",
          title: "KODE NEGARA",
          width: 80,
          align: "center",
        },
        {
          key: "kursAkhirTahun",
          title: "KURS AKHIR TAHUN",
          width: 80,
          align: "center",
        },
      ],
    },
    {
      title: "POKOK UTANG (Rp)",
      children: [
        {
          key: "UtangAwalTahun",
          title: "AWAL TAHUN",
          width: 80,
          align: "center",
          render: (r) => {
            if (r.type === "total" && r.UtangAwalTahun === "") return "";
            return formatRupiah(r.UtangAwalTahun);
          },
        },
        {
          title: "MUTASI",
          children: [
            {
              key: "penambahanUtang",
              title: "PENAMBAHAN",
              width: 120,
              align: "center",
              render: (r) => {
                if (r.type === "total" && r.penambahanUtang === "") return "";
                return formatRupiah(r.penambahanUtang);
              },
            },
            {
              key: "penguranganUtang",
              title: "PENGURANGAN",
              width: 120,
              align: "center",
              render: (r) => {
                if (r.type === "total" && r.penguranganUtang === "") return "";
                return formatRupiah(r.penguranganUtang);
              },
            },
          ],
        },
        {
          key: "totalUtangAkhirTahun",
          title: "AKHIR TAHUN",
          width: 80,
          align: "center",
          render: (r) => {
            if (r.type === "total" && r.totalUtangAkhirTahun === "") return "";
            return formatRupiah(r.totalUtangAkhirTahun);
          },
        },
      ],
    },

    {
      title: "JANGKA WAKTU PINJAMAN",
      children: [
        {
          key: "tanggalMulaiPinjaman",
          title: "TANGGAL MULAI ",
          width: 80,
          align: "center",
        },
        {
          key: "akhirTempoPinjaman",
          title: "TANGGAL JATUH TEMPO",
          width: 80,
          align: "center",
        },
      ],
    },

    {
      title: "BUNGA (%)",
      children: [
        {
          key: "tingkatBungaPinjaman",
          title: "TINGKAT (%) ",
          width: 80,
          align: "center",
        },
        {
          key: "jumlahBunga",
          title: "JUMLAH BUNGA",
          width: 80,
          align: "center",
          render: (r) => {
            if (r.type === "total" && r.jumlahBunga === "") return "";
            return formatRupiah(r.jumlahBunga);
          },
        },
      ],
    },

    {
      key: "biayaSelainBunga",
      title: "BIAYA TERKAIT PEROLEHAN PINJAMAN SELAIN BUNGA(Rp)",
      width: 160,
      align: "center",
      render: (r) => {
        if (r.type === "total" && r.biayaSelainBunga === "") return "";
        return formatRupiah(r.biayaSelainBunga);
      },
    },
    {
      key: "peruntukanPinjaman",
      title: "PERUNTUKAN PINJAMAN",
      width: 160,
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
        data={tableData}
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
        columnGroups={columnGroups}
        isOpen={showModal}
        onClose={closeModal}
        onSave={saveData}
        title={
          editingId
            ? "Edit ADD LAPORAN UTANG SWASTA LUAR NEGERI"
            : "Tambah ADD LAPORAN UTANG SWASTA LUAR NEGERI"
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
