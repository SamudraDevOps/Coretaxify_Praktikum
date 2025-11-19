import React, { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { formatNumber, parseFormattedNumber, formatRupiah } from "@utils/formatCurrency";
import GlobalModal from "@shared/GlobalModal";
export default function DaftarBuktiPemotongan({ config }) {
  const {
    baseFields = [
      "nama",
      "npwp",
      "nomorBuktiPemotongan",
      "calender",
      "jenisPajak",
      "dasarPengenaanPajak",
      "pphdipotong",
    ],
    customChildren = [],
    defaultData = {
      nama: "",
      npwp: "",
      nomorBuktiPemotongan: "",
      calender: "",
      jenisPajak: "",
      dasarPengenaanPajak: 0,
      pphdipotong: 0,
    },
  } = config || {};

  const [rows, setRows] = useState([]);
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
    const toSave = { ...values };
    if (editingId) {
      setRows((prev) => prev.map((r) => (r.id === editingId ? { ...toSave, id: editingId } : r)));
    } else {
      setRows((prev) => [...prev, { ...toSave, id: Date.now() }]);
    }
    closeModal();
  };

  const deleteData = (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      setRows((prev) => prev.filter((r) => r.id !== id));
    }
  };

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
        <table className="table-auto text-sm text-left border overflow-hidden w-full">
          <thead className="bg-purple-700 text-white text-center">
            <tr>
              <th className="p-2 border-b">No</th>
              <th className="p-2 border-b min-w-[220px]">Nama Pemotong/Pemungut</th>
              <th className="p-2 border-b min-w-[160px]">NPWP</th>
              <th className="p-2 border-b min-w-[220px]">No. Bukti Pemotongan/Pemungutan</th>
              <th className="p-2 border-b min-w-[150px]">Tanggal Pemotongan</th>
              <th className="p-2 border-b min-w-[150px]">Jenis Pajak</th>
              <th className="p-2 border-b min-w-[170px]">Dasar Pengenaan Pajak</th>
              <th className="p-2 border-b min-w-[170px]">PPh Dipotong/Dipungut</th>
              <th className="p-2 border-b min-w-[100px]">Aksi</th>
            </tr>
          </thead>

          <tbody className="text-gray-700 text-center">
            {rows.length === 0 ? (
              <tr>
                <td colSpan={9} className="p-4 text-center text-gray-500">
                  Belum ada data. Klik "Tambah Data" untuk menambah data baru.
                </td>
              </tr>
            ) : (
              rows.map((item, index) => (
                <tr key={item.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="p-2 border-b">{index + 1}</td>
                  <td className="p-2 border-b max-w-xs truncate" title={item.nama || ""}>
                    {item.nama || "-"}
                  </td>
                  <td className="p-2 border-b">{item.npwp || "-"}</td>
                  <td
                    className="p-2 border-b max-w-xs truncate"
                    title={item.nomorBuktiPemotongan || ""}
                  >
                    {item.nomorBuktiPemotongan || "-"}
                  </td>
                  <td className="p-2 border-b">{item.calender || "-"}</td>

                  {/* Jenis Pajak -> ambil label dari customChildren */}
                  <td className="p-2 border-b max-w-xs truncate">
                    {customChildren
                      ?.find((f) => f.key === "jenisPajak")
                      ?.options?.find((opt) => opt.value === item.jenisPajak)?.label ||
                      item.jenisPajak ||
                      "-"}
                  </td>

                  <td className="p-2 border-b text-right tabular-nums">
                    {formatRupiah(item.dasarPengenaanPajak)}
                  </td>
                  <td className="p-2 border-b text-right tabular-nums">
                    {formatRupiah(item.pphdipotong)}
                  </td>

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

      {/* MODAL dengan Safe Config */}
      <GlobalModal
        isOpen={showModal}
        onClose={closeModal}
        onSave={saveData}
        title={editingId ? "Edit Data Pemotongan" : "Tambah Data Pemotongan"}
        baseFields={baseFields}
        customChildren={customChildren}
        data={selected || {}}
        size="2xl"
      />
    </div>
  );
}
