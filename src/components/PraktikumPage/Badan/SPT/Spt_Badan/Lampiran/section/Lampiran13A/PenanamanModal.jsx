// LargeInvestmentTable.jsx
import React, { useMemo, useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import GlobalTable from "@shared/GlobalTable";
import PenanamanModalModal from "./index";
import { formatRupiah } from "@utils/formatCurrency";

function hitungTotalGlobal(rows = [], fields = []) {
  const totals = {};
  fields.forEach((f) => {
    totals[f] = rows.reduce((s, r) => {
      const v =
        r && (typeof r[f] === "number" ? r[f] : Number(String(r[f] || 0).replace(/,/g, "")));
      return s + (isNaN(v) ? 0 : v);
    }, 0);
  });
  return totals;
}

function createTotalRow(label, totals = {}, opts = {}) {
  const { labelField = "namaPemotong", base = {} } = opts;
  const totalRow = { type: "total", id: `total-${Date.now()}`, ...base };
  Object.keys(totals || {}).forEach((k) => {
    totalRow[k] = totals[k];
  });
  totalRow[labelField] = label;
  return totalRow;
}

export default function LargeInvestmentTable() {
  // table data
  const [data, setData] = useState([]);
  // modal state
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editingData, setEditingData] = useState(null);

  const openAdd = () => {
    setEditingId(null);
    setEditingData(null);
    setShowModal(true);
  };

  const openEdit = (row) => {
    setEditingId(row.id);
    // ensure numeric fields are numbers
    const normalized = { ...row };
    setEditingData(normalized);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setEditingData(null);
  };

  const saveData = (values) => {
    if (editingId) {
      setData((prev) => prev.map((r) => (r.id === editingId ? { ...values, id: editingId } : r)));
    } else {
      setData((prev) => [...prev, { ...values, id: Date.now() }]);
    }
    closeModal();
  };

  const deleteData = (id) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus data ini?")) return;
    setData((prev) => prev.filter((r) => r.id !== id));
  };

  // totals
  const totals = useMemo(() => hitungTotalGlobal(data, ["jumlahPenguranganNeto"]), [data]);

  const tableData = useMemo(() => {
    if (!data || data.length === 0) return [];
    return [
      ...data,
      createTotalRow("JUMLAH", totals, {
        labelField: "tahunKet",
        base: {
          keputusanNomorA: "",
          keputusanTanggalA: "",
          keputusanNomorB: "",
          keputusanTanggalB: "",
          mataUangAsing: "",
          ekuivalen: "",
          dalamRupiah: "",
          jumlahTotal: "",
          bentukPenanaman: "baru",
          bidangDaerah: "",
          fasilitasPenguranganNeto: false,
          fasilitasPenyusutanCepat: false,
          fasilitasKompensasi: false,
          fasilitasPengenaanDividen: false,
          fasilitasPersentase: "",
          fasilitasTahun: "",
          akumulasiSDTahunIni: "",
          padaSaatMulaiBerproduksi: "",
          saatMulaiBerproduksiTanggal: "",
          tahunKet: "",
        },
      }),
    ];
  }, [data, totals]);

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
                  onClick={() => openEdit(row)}
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
      title: "KEPUTUSAN PEMBERIAN FASILITAS",
      children: [
        { key: "keputusanNomorA", title: "NOMOR ", width: 180 },
        { key: "keputusanTanggalA", title: "TANGGAL ", width: 140 },
      ],
    },

    {
      title: "KEPUTUSAN PEMANFAATAN FASILITAS",
      children: [
        { key: "keputusanNomorB", title: "NOMOR ", width: 180 },
        { key: "keputusanTanggalB", title: "TANGGAL ", width: 140 },
      ],
    },

    {
      title: "JUMLAH PENANAMAN MODAL YANG DISETUJUI",
      children: [
        {
          key: "mataUangAsing",
          title: "DALAM MATA UANG ASING",
          width: 180,
          align: "center",
          render: (r) =>
            r.type === "total"
              ? r.mataUangAsing
                ? formatRupiah(r.mataUangAsing)
                : ""
              : formatRupiah(r.mataUangAsing),
        },
        {
          key: "ekuivalen",
          title: "EKUIVALEN",
          width: 140,
          align: "center",
          render: (r) =>
            r.type === "total"
              ? r.ekuivalen
                ? formatRupiah(r.ekuivalen)
                : ""
              : formatRupiah(r.ekuivalen),
        },
        {
          key: "dalamRupiah",
          title: "DALAM RUPIAH",
          width: 140,
          align: "center",
          render: (r) =>
            r.type === "total"
              ? r.dalamRupiah
                ? formatRupiah(r.dalamRupiah)
                : ""
              : formatRupiah(r.dalamRupiah),
        },
        {
          key: "jumlahTotal",
          title: "JUMLAH TOTAL (Rp)",
          width: 160,
          align: "center",
          render: (r) =>
            r.type === "total"
              ? r.jumlahTotal
                ? formatRupiah(r.jumlahTotal)
                : ""
              : formatRupiah(r.jumlahTotal),
        },
      ],
    },

    { key: "bentukPenanaman", title: "BENTUK PENANAMAN MODAL", width: 180 },
    { key: "bidangDaerah", title: "BIDANG DAN/ATAU DAERAH ", width: 180 },
    { key: "fasilitasPenguranganNeto", title: "FASILITAS YANG DIBERIKAN ", width: 180 },
    {
      key: "fasilitasPersentase",
      title: "PERSENTASE PENGURANGAN PENGHASILAN NETO ",
      width: 140,
      align: "center",
    },
    {
      key: "fasilitasTahun",
      title: "PENAMBAHAN JANGKA WAKTU KOMPENSASI KERUGIAN  ",
      width: 140,
      align: "center",
    },

    {
      title: "REALISASI PENANAMAN MODAL",
      children: [
        {
          key: "akumulasiSDTahunIni",
          title: "PENYUSUTAN THAUN INI ",
          width: 180,
          render: (r) =>
            r.type === "total"
              ? r.akumulasiSDTahunIni
                ? formatRupiah(r.akumulasiSDTahunIni)
                : ""
              : formatRupiah(r.akumulasiSDTahunIni),
        },
        {
          key: "padaSaatMulaiBerproduksi",
          title: "S.D TAHUN INI ",
          width: 140,
          render: (r) =>
            r.type === "total"
              ? r.padaSaatMulaiBerproduksi
                ? formatRupiah(r.padaSaatMulaiBerproduksi)
                : ""
              : formatRupiah(r.padaSaatMulaiBerproduksi),
        },
      ],
    },

    {
      key: "saatMulaiBerproduksiTanggal",
      title: " SAAT MULAI BERPRODUKSI KOMERSIAL  ",
      width: 140,
    },

    {
      title: "FASILITAS PENGURANGAN PENGHASILAN NETO",
      children: [
        { key: "tahunKet", title: "TAHUN KE - ", width: 180 },
        {
          key: "jumlahPenguranganNeto",
          title: "JUMLAH (Rp) ",
          width: 140,
          render: (r) =>
            r.type === "total"
              ? r.jumlahPenguranganNeto
                ? formatRupiah(r.jumlahPenguranganNeto)
                : ""
              : formatRupiah(r.jumlahPenguranganNeto),
        },
      ],
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <button
          onClick={openAdd}
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
        total={data.length}
        onPageChange={() => {}}
        stickyHeader
        rowClassName={(row) => (row.type === "total" ? "bg-yellow-50 font-semibold" : "")}
      />

      <PenanamanModalModal
        isOpen={showModal}
        onClose={closeModal}
        onSave={saveData}
        initialData={editingData || {}}
      />
    </div>
  );
}
