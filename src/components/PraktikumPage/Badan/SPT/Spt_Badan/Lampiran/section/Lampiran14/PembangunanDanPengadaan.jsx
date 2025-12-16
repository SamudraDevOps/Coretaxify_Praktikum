import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { formatNumber, parseFormattedNumber, formatRupiah } from "@utils/formatCurrency";
import GlobalModal from "@shared/GlobalModal";
import GlobalTable from "@shared/GlobalTable";
import { hitungTotalGlobal, createTotalRow } from "@utils/helperTotal";

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
      "tahunPajak",
      "sisaLebih4Tahun",
      "sisahLebih",
      "sisaLebihTahun1",
      "sisaLebihTahun2",
      "sisaLebihTahun3",
      "sisaLebihTahun4",
      "sisaLebihTahun5",
      "jumlahTotalSisaLebih",
      "sisahLebihBelumDitanamkan",
      "sisahLebihLeat4Tahun",
    ],
    customChildren = [],
    defaultData = {},
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

  // AUTO CALCULATE FUNCTION - Real-time di modal
  const handleFieldChange = (key, value) => {
    setSelected((prev) => {
      const newData = { ...prev, [key]: value };

      const sisaLebihKeys = [
        "sisaLebihTahun1",
        "sisaLebihTahun2",
        "sisaLebihTahun3",
        "sisaLebihTahun4",
        "sisaLebihTahun5",
      ];

      // Hitung total sisa lebih
      let total = 0;
      sisaLebihKeys.forEach((k) => {
        const val = k === key ? parseFloat(value) || 0 : parseFloat(newData[k]) || 0;

        total += val;
      });

      newData.jumlahTotalSisaLebih = total;

      return newData;
    });
  };

  // Delete data
  const deleteData = (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      setData((prev) => prev.filter((item) => item.id !== id));
    }
  };

  //  HITUNG TOTAL & BUAT BARIS TOTAL
  const totals = hitungTotalGlobal(data, ["sisahLebihBelumDitanamkan", "sisahLebihLeat4Tahun"]);

  const tableData =
    data.length === 0
      ? []
      : [
          ...data,
          createTotalRow("JUMLAH", totals, {
            labelField: "jumlahTotalSisaLebih",
            base: {
              tahunPajak: "",
              sisaLebih4Tahun: "",
              sisahLebih: "",
              sisaLebihTahun1: "",
              sisaLebihTahun2: "",
              sisaLebihTahun3: "",
              sisaLebihTahun4: "",
              sisaLebihTahun5: "",
              jumlahTotalSisaLebih: "",
            },
          }),
        ];

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

    { key: "tahunPajak", title: " Tahun Pajak Bagian Tahun Pajak", width: 120, align: "center" },

    {
      title: "PENYEDIAAN SISA LEBIH UNTUK DITANAMKAN KEMBALI SELAMA 4 TAHUN",
      children: [{ key: "sisaLebih4Tahun", title: "RUPIAH ", width: 180 }],
    },
    {
      key: "sisahLebih",
      title: " BENTUK PENANAMAN KEMBALI SISA LEBIH ",
      width: 120,
      align: "center",
      render: (row) => (row.type === "total" ? "" : getLabel("sisahLebih", row.sisahLebih)),
    },

    {
      title: "PENGGUNAAN SISA LEBIH UNTUK PEMBANGUNAN DAN PENGADAAN SARANA DAN PRASARANA",
      children: [
        {
          title: "Tahun ke-1",
          children: [
            {
              key: "sisaLebihTahun1",
              title: "RUPIAH",
              width: 120,
              align: "center",
              render: (r) => {
                if (r.type === "total" && r.sisaLebihTahun1 === "") return "";
                return formatRupiah(r.sisaLebihTahun1);
              },
            },
          ],
        },

        {
          title: "Tahun ke-2",
          children: [
            {
              key: "sisaLebihTahun2",
              title: "RUPIAH",
              width: 120,
              align: "center",
              render: (r) => {
                if (r.type === "total" && r.sisaLebihTahun2 === "") return "";
                return formatRupiah(r.sisaLebihTahun2);
              },
            },
          ],
        },

        {
          title: "Tahun ke-3",
          children: [
            {
              key: "sisaLebihTahun3",
              title: "RUPIAH",
              width: 120,
              align: "center",
              render: (r) => {
                if (r.type === "total" && r.sisaLebihTahun3 === "") return "";
                return formatRupiah(r.sisaLebihTahun3);
              },
            },
          ],
        },

        {
          title: "Tahun ke-4",
          children: [
            {
              key: "sisaLebihTahun4",
              title: "RUPIAH",
              width: 120,
              align: "center",
              render: (r) => {
                if (r.type === "total" && r.sisaLebihTahun4 === "") return "";
                return formatRupiah(r.sisaLebihTahun4);
              },
            },
          ],
        },

        {
          title: "Tahun ke-5",
          children: [
            {
              key: "sisaLebihTahun5",
              title: "RUPIAH",
              width: 120,
              align: "center",
              render: (r) => {
                if (r.type === "total" && r.sisaLebihTahun5 === "") return "";
                return formatRupiah(r.sisaLebihTahun5);
              },
            },
          ],
        },
      ],
    },

    {
      title: "JUMLAH PENGGUNAAN SISA LEBIH",
      children: [
        {
          key: "jumlahTotalSisaLebih",
          title: "RUPIAH ",
          width: 180,
          render: (r) => (r.type === "total" ? "JUMLAH" : formatRupiah(r.jumlahTotalSisaLebih)),
        },
      ],
    },

    {
      title: "SISA LEBIH YANG BELUM DITANAMKAN KEMBALI",
      children: [
        {
          key: "sisahLebihBelumDitanamkan",
          title: "RUPIAH ",
          width: 180,
          render: (r) => {
            if (r.type === "total" && r.sisahLebihBelumDitanamkan === "") return "";
            return formatRupiah(r.sisahLebihBelumDitanamkan);
          },
        },
      ],
    },

    {
      title: " SISA LEBIH YANG MELEWATI JANGKA WAKTU PENANAMAN KEMBALI DALAM JANGKA WAKTU 4 TAHUN ",
      children: [
        {
          key: "sisahLebihLeat4Tahun",
          title: "RUPIAH ",
          width: 180,
          render: (r) => {
            if (r.type === "total" && r.sisahLebihLeat4Tahun === "") return "";
            return formatRupiah(r.sisahLebihLeat4Tahun);
          },
        },
      ],
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
        onFieldChange={handleFieldChange}
      />
    </div>
  );
}
