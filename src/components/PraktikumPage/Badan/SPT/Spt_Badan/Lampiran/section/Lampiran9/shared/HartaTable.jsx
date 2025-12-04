import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { formatNumber, parseFormattedNumber, formatRupiah } from "@utils/formatCurrency";
import GlobalModal from "@shared/GlobalModal";
import GlobalTable from "@shared/GlobalTable";
import { hitungTotalGlobal, createTotalRow } from "@utils/helperTotal";

export default function HartaTable({
  jenisHartaOptions,
  title = "Daftar Harta",
  customConfig = {},
  onTotalChange,
}) {
  const defaultBaseFields = [
    "kode",
    "jenis",
    "bulanTahun",
    "biayaPerolehan",
    "nilaiSisaBukuFiskal",
    "komersial",
    "fiskal",
    "penyusutanDanAmortisasi",
    "keterangan",
  ];

  const defaultCustomChildren = [
    {
      key: "jenis",
      type: "select-search",
      title: "Jenis Harta",
      placeholder: "Pilih Jenis Harta",
      required: true,
      span: 1,
      options: jenisHartaOptions,
      onChange: (value, updateField) => {
        updateField("kode", value);
      },
    },
    {
      key: "komersial",
      type: "select-search",
      title: "Metode Penyusutan Komersial",
      placeholder: "Pilih Metode Penyusutan Komersial",
      required: true,
      span: 1,
      options: [
        { id: 1, kode: "01", value: "01", label: "Garis Lurus" },
        { id: 2, kode: "02", value: "02", label: "Jumlah Angka Tahun" },
        { id: 3, kode: "03", value: "03", label: "Saldo Menurun" },
        { id: 4, kode: "04", value: "04", label: "Saldo Menurun Ganda" },
        { id: 5, kode: "05", value: "05", label: "Jumlah Jam Jasa" },
        { id: 6, kode: "06", value: "06", label: "Jumlah Satuan Produksi" },
        { id: 7, kode: "07", value: "07", label: "Metode Lainnya" },
      ],
    },
    {
      key: "fiskal",
      type: "select-search",
      title: "Metode Penyusutan Fiskal",
      placeholder: "Pilih Metode Penyusutan Fiskal",
      required: true,
      span: 1,
      options: [
        { id: 1, kode: "01", value: "01", label: "GL/Straight Line (Garus Lurus)" },
        {
          id: 2,
          kode: "02",
          value: "02",
          label: "JSP/Number Of Production Unit (Jumlah Satuan Produksi)",
        },
        { id: 3, kode: "03", value: "03", label: "SM/Declining Method (Saldo Menurun)" },
      ],
    },
    {
      key: "nilaiSisaBukuFiskal",
      type: "currency",
      title: "Nilai Sisa Buku Fiskal Pada Awal Tahun",
      placeholder: "Nilai Sisa Buku Fiskal",
      required: false,
    },
    {
      key: "penyusutanDanAmortisasi",
      type: "currency",
      title: "PENYUSUTAN/AMORTISASI FISKAL TAHUN INI",
      placeholder: "Penyusutan / Amortisasi",
      required: false,
    },
  ];

  const defaultDefaultData = {
    kode: "",
    jenis: "",
    bulanTahun: "",
    biayaPerolehan: "",
    nilaiSisaBukuFiskal: "",
    komersial: "",
    fiskal: "",
    penyusutanDanAmortisasi: "",
    keterangan: "",
  };

  const baseFields = customConfig.baseFields || defaultBaseFields;
  const customChildren = (customConfig.customChildren || defaultCustomChildren).map((field) => {
    if (field.key === "jenis") {
      return { ...field, options: jenisHartaOptions };
    }
    return field;
  });

  const defaultData = customConfig.defaultData || defaultDefaultData;
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [selected, setSelected] = useState(null);

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
        prev.map((item) => (item.id === editingId ? { ...values, id: editingId } : item))
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

  const totals = useMemo(() => {
    return hitungTotalGlobal(data, ["penyusutanDanAmortisasi"]);
  }, [data]);

  useEffect(() => {
    if (onTotalChange) {
      const total = totals.penyusutanDanAmortisasi || 0;
      onTotalChange(total);
    }
  }, [totals.penyusutanDanAmortisasi]);
  const tableData =
    data.length === 0
      ? []
      : [
          ...data,
          createTotalRow("JUMLAH", totals, {
            labelField: "fiskal",
            base: {
              kode: "",
              jenis: "",
              bulanTahun: "",
              biayaPerolehan: "",
              nilaiSisaBukuFiskal: "",
              komersial: "",
              keterangan: "",
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
      key: "kode",
      title: "KODE HARTA",
      width: 180,
      render: (row) =>
        row.type === "total"
          ? ""
          : customChildren
              ?.find((f) => f.key === "jenis")
              ?.options?.find((opt) => opt.value === row.jenis)?.kode ||
            row.kode ||
            "-",
    },
    {
      key: "jenis",
      title: "JENIS HARTA",
      width: 200,
      align: "left",
      render: (row) =>
        row.type === "total"
          ? ""
          : customChildren
              ?.find((f) => f.key === "jenis")
              ?.options?.find((opt) => opt.value === row.jenis)?.label ||
            row.jenis ||
            "-",
    },
    {
      key: "biayaPerolehan",
      title: "BIAYA PEROLEHAN",
      width: 180,
      render: (r) => {
        if (r.type === "total" && r.biayaPerolehan === "") return "";
        return formatRupiah(r.biayaPerolehan);
      },
    },
    {
      key: "nilaiSisaBukuFiskal",
      title: "NILAI SISA BUKU FISKAL PADA AWAL TAHUN (Rp)",
      width: 160,
      align: "center",
      render: (r) => {
        if (r.type === "total" && r.nilaiSisaBukuFiskal === "") return "";
        return formatRupiah(r.nilaiSisaBukuFiskal);
      },
    },
    {
      title: "METODE PENYUSUTAN DAN AMORTISASI",
      children: [
        {
          key: "komersial",
          title: "KOMERSIAL",
          width: 140,
          align: "center",
          render: (row) =>
            row.type === "total"
              ? ""
              : customChildren
                  ?.find((f) => f.key === "komersial")
                  ?.options?.find((opt) => opt.value === row.komersial)?.label ||
                row.komersial ||
                "-",
        },
        {
          key: "fiskal",
          title: "FISKAL",
          width: 80,
          align: "center",
          render: (row) =>
            row.type === "total"
              ? "JUMLAH"
              : customChildren
                  ?.find((f) => f.key === "fiskal")
                  ?.options?.find((opt) => opt.value === row.fiskal)?.label ||
                row.fiskal ||
                "-",
        },
      ],
    },
    {
      key: "penyusutanDanAmortisasi",
      title: "PENYUSUTAN/AMORTISASI FISKAL TAHUN INI",
      width: 180,
      render: (r) => {
        if (r.type === "total" && r.penyusutanDanAmortisasi === "") return "";
        return formatRupiah(r.penyusutanDanAmortisasi);
      },
    },
    { key: "keterangan", title: "KETERANGAN", width: 180 },
  ];

  return (
    <div className="space-y-4">
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
        pageSize={9999}
        total={data.length}
        onPageChange={() => {}}
        stickyHeader
        rowClassName={(row) => (row.type === "total" ? "bg-yellow-50 font-semibold" : "")}
      />

      <GlobalModal
        isOpen={showModal}
        onClose={closeModal}
        onSave={saveData}
        title={editingId ? `Edit ${title}` : `Tambah ${title}`}
        baseFields={baseFields}
        customChildren={customChildren}
        data={selected || {}}
        size="2xl"
      />
    </div>
  );
}
