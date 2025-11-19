import React, { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { formatNumber, parseFormattedNumber, formatRupiah } from "@utils/formatCurrency";
import GlobalModal from "@shared/GlobalModal";
export default function DaftarHartaBergerak({ config }) {
  const {
    baseFields = [
      "kode",
      "deskripsi",
      "npwp",
      "negara",
      "tahunPerolehan",
      "saldo",
      "keteranganHarta",
    ],
    customChildren = [],
    defaultData = {
      kode: "",
      deskripsi: "",
      npwp: "",
      negara: "",
      tahunPerolehan: "",
      saldo: 0,
      keteranganHarta: "",
    },
  } = config || {};

  const [dataUtang, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [selected, setSelected] = useState(null);

  // Open modal untuk tambah data
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

  // Tutup modal
  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setSelected(null);
  };

  // Simpan data
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

  // Hapus data
  const deleteData = (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      setData((prev) => prev.filter((item) => item.id !== id));
    }
  };

  // Template tabel
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus size={16} />
          Tambah Data
        </button>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="table-auto text-sm text-left border overflow-hidden">
          <thead className="bg-purple-700 text-white text-center">
            <tr>
              <th className="p-2 border-b">No</th>
              <th className="p-2 border-b min-w-[150px]">Kode</th>
              <th className="p-2 border-b min-w-[250px]">Deskripsi</th>
              <th className="p-2 border-b min-w-[180px]">NPWP Kreditur</th>
              <th className="p-2 border-b min-w-[180px]">Negara Kreditur</th>
              <th className="p-2 border-b min-w-[150px]">Tahun Perolehan</th>
              <th className="p-2 border-b min-w-[150px]">Saldo</th>
              <th className="p-2 border-b min-w-[150px]">Keterangan</th>
              <th className="p-2 border-b min-w-[100px]">Aksi</th>
            </tr>
          </thead>

          <tbody className="text-gray-600 text-center">
            {dataUtang.length === 0 ? (
              <tr>
                <td colSpan="9" className="p-4 text-center text-gray-500">
                  Belum ada data. Klik "Tambah Data" untuk menambah data baru.
                </td>
              </tr>
            ) : (
              dataUtang.map((item, index) => (
                <tr key={item.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="p-2 border-b text-center">{index + 1}</td>
                  <td className="p-2 border-b">{item.kode || "-"}</td>

                  {/* Deskripsi lookup dari customChildren */}
                  <td className="p-2 border-b max-w-xs truncate">
                    {customChildren
                      ?.find((f) => f.key === "deskripsi")
                      ?.options?.find((opt) => opt.value === item.deskripsi)?.label ||
                      item.deskripsi ||
                      "-"}
                  </td>

                  <td className="p-2 border-b">{item.npwp || "-"}</td>
                  <td className="p-2 border-b">{item.negara || "-"}</td>
                  <td className="p-2 border-b">{item.tahunPerolehan || "-"}</td>
                  <td className="p-2 border-b">{formatRupiah(item.saldo)}</td>
                  <td className="p-2 border-b">{item.keteranganHarta || "-"}</td>

                  <td className="px-4 py-3 text-sm">
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => openEditModal(item)}
                        className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => deleteData(item.id)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <GlobalModal
        isOpen={showModal}
        onClose={closeModal}
        onSave={saveData}
        title={editingId ? "Edit Data Utang" : "Tambah Data Utang"}
        baseFields={baseFields}
        customChildren={customChildren}
        data={selected || {}}
        size="2xl"
      />
    </div>
  );
}
