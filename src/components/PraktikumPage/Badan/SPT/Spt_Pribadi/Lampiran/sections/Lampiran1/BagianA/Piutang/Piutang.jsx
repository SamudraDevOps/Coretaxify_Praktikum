import React, { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { formatRupiah } from "../../../../utils/formatCurrency";
import GlobalModal from "../../../../components/shared/GlobalModal";

export default function DaftarPiutang({ config }) {
  const {
    baseFields = [
      "kode",
      "deskripsi",
      "lokasipenerima",
      "nomoridentitas",
      "penerimaPinjaman",
      "nilaiPiutang",
      "tahunDimulai",
      "SaldoPiutang",
      "keterangan",
    ],
    customChildren = [],
    defaultData = {
      kode: "",
      deskripsi: "",
      lokasipenerima: "",
      nomoridentitas: "",
      penerimaPinjaman: "",
      nilaiPiutang: 0,
      tahunDimulai: "",
      SaldoPiutang: 0,
      keterangan: "",
    },
  } = config || {};

  const [dataPiutang, setData] = useState([]);
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

  // Tabel Piutang
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
              <th className="p-2 border-b min-w-[200px]">Kode</th>
              <th className="p-2 border-b min-w-[200px]">Deskripsi</th>
              <th className="p-2 border-b min-w-[200px]">Lokasi Penerima</th>
              <th className="p-2 border-b min-w-[150px]">Nomor Identitas</th>
              <th className="p-2 border-b min-w-[200px]">Nama Penerima Pinjaman</th>
              <th className="p-2 border-b min-w-[150px]">Nilai Piutang</th>
              <th className="p-2 border-b min-w-[150px]">Tahun Dimulai</th>
              <th className="p-2 border-b min-w-[150px]">Saldo Piutang</th>
              <th className="p-2 border-b min-w-[150px]">Keterangan</th>
              <th className="p-2 border-b min-w-[100px]">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-center">
            {dataPiutang.length === 0 ? (
              <tr>
                <td colSpan="11" className="p-4 text-center text-gray-500">
                  Belum ada data. Klik "Tambah Data" untuk menambah data baru.
                </td>
              </tr>
            ) : (
              dataPiutang.map((item, index) => (
                <tr key={item.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="p-2 border-b text-center">{index + 1}</td>
                  <td className="p-2 border-b">{item.kode || "-"}</td>
                  <td className="p-2 border-b">
                    {item.deskripsi?.replace(/^\d{4}:\s*/, "") || "-"}
                  </td>
                  <td className="p-2 border-b">{item.lokasipenerima || "-"}</td>
                  <td className="p-2 border-b">{item.nomoridentitas || "-"}</td>
                  <td className="p-2 border-b">{item.penerimaPinjaman || "-"}</td>
                  <td className="p-2 border-b">{formatRupiah(item.nilaiPiutang)}</td>
                  <td className="p-2 border-b">{item.tahunDimulai || "-"}</td>
                  <td className="p-2 border-b">{formatRupiah(item.SaldoPiutang)}</td>
                  <td className="p-2 border-b">{item.keterangan || "-"}</td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex gap-2">
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
        title={editingId ? "Edit Data Piutang" : "Tambah Data Piutang"}
        baseFields={baseFields}
        customChildren={customChildren}
        data={selected || {}}
        size="2xl"
      />
    </div>
  );
}
