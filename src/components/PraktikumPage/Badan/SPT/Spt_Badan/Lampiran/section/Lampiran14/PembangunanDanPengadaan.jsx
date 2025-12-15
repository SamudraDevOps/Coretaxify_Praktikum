import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { formatNumber, parseFormattedNumber, formatRupiah } from "@utils/formatCurrency";
import GlobalModal from "@shared/GlobalModal";
import GlobalTable from "@shared/GlobalTable";

export default function PembangunanDanPengadaan({ configGenerator, form, setForm, getReadOnly }) {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [selected, setSelected] = useState(null);
  const [modalForm, setModalForm] = useState(form || {});
  const [config, setConfig] = useState(configGenerator ? configGenerator(modalForm) : {});

  // Update modalForm ketika form berubah
  useEffect(() => {
    setModalForm(form || {});
  }, [form]);

  // Regenerate config ketika modalForm.tahunPajak berubah
  useEffect(() => {
    if (configGenerator) {
      setConfig(configGenerator(modalForm));
    }
  }, [modalForm.tahunPajak, configGenerator]);

  const {
    baseFields = [
      "npwpMitra",
      "namaMitra",
      "negara",
      "hubungan",
      "kegiatanUsaha",
      "jenis-transaksi",
      "nilaiTransaksi",
      "metodePenentuanHarga",
      "alasanPemilihanMetode",
    ],
    customChildren = [],
    defaultData = {
      npwpMitra: "",
      namaMitra: "PT. Hj.Galih Previand Wicaksono",
    },
  } = config || {};

  // Open modal untuk add
  const openAddModal = () => {
    setSelected({
      ...defaultData,
      tahunPajak: form?.tahunPajak || "",
    });
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

    { key: "npwpMitra", title: " NPWP/TIN", width: 120, align: "center" },
    { key: "namaMitra", title: "Nama ", width: 180, align: "center" },
    { key: "negara", title: "Negara", width: 120, align: "center" },
    {
      key: "hubungan",
      title: "Bentuk Hubungan",
      width: 150,
      align: "center",
      render: (row) => getLabel("hubungan", row.hubungan),
    },
    { key: "kegiatanUsaha", title: "Kegiatan Usaha", width: 200, align: "center" },
    {
      key: "jenis-transaksi",
      title: "Jenis Transaksi",
      width: 150,
      align: "center",
      render: (row) => getLabel("jenis-transaksi", row["jenis-transaksi"]),
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
      key: "metodePenentuanHarga",
      title: "Metode Penentuan Transfer Yang Digunakan",
      width: 150,
      align: "center",
      render: (row) => getLabel("metodePenentuanHarga", row.metodePenentuanHarga),
    },
    {
      key: "alasanPemilihanMetode",
      title: "Alasan Pemilihan Metode",
      width: 200,
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
        // logic khusus jika ingin validasi sebelum simpan
        beforeSave={(formData) => {
          const tahunKeys = [
            "sisaLebihTahun1",
            "sisaLebihTahun2",
            "sisaLebihTahun3",
            "sisaLebihTahun4",
            "sisaLebihTahun5",
          ];

          for (const key of tahunKeys) {
            if (getReadOnly(key, formData.tahunPajak) && formData[key]) {
              return `Nilai ${key.replace(
                "sisaLebih",
                "Tahun ke-"
              )} tidak boleh diisi untuk tahun pajak ini    sa`;
            }
          }

          return true; // lanjut simpan
        }}
        title={
          editingId
            ? "EDIT PENGGUNAAN SISA LEBIH UNTUK PEMBANGUNAN DAN PENGADAAN SARANA DAN PRASARANA"
            : "TAMBAH PENGGUNAAN SISA LEBIH UNTUK PEMBANGUNAN DAN PENGADAAN SARANA DAN PRASARANA"
        }
        baseFields={baseFields}
        customChildren={customChildren}
        data={selected || {}}
        size="2xl"
        form={modalForm}
        setForm={(updatedForm) => {
          setModalForm(updatedForm);
          if (setForm) setForm(updatedForm);
        }}
      />
    </div>
  );
}
