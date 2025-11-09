import React, { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { formatRupiah } from "../../../../utils/formatCurrency";
import GlobalModal from "../../../../components/shared/GlobalModal";

export default function DaftarPenghasilanNeto({ config }) {
  const {
    baseFields = [
      "nomoridentitas",
      "nama",
      "penghasilanBruto",
      "pengurangan",
      "penghasilanNeto",
      "keteranganHarta",
    ],
    customChildren = [],
    defaultData = {
      nomoridentitas: "",
      nama: "Contoh Nama Pemberi Kerja",
      penghasilanBruto: 0,
      pengurangan: 0,
      keteranganHarta: "", 
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
    // penghasilanNeto tidak disimpan oleh GlobalModal (display),
    // hitung manual saat simpan agar bisa ditampilkan di tabel
    const bruto = Number(values?.penghasilanBruto || 0);
    const kurang = Number(values?.pengurangan || 0);
    const neto = Math.max(0, bruto - kurang);

    const toSave = { ...values, penghasilanNeto: neto };

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
              <th className="p-2 border-b min-w-[220px]">Nomor Identitas Pemberi Kerja</th>
              <th className="p-2 border-b min-w-[220px]">Nama Pemberi Kerja</th>
              <th className="p-2 border-b min-w-[180px]">Penghasilan Bruto</th>
              <th className="p-2 border-b min-w-[180px]">Pengurangan</th>
              <th className="p-2 border-b min-w-[180px]">Penghasilan Neto</th>
              <th className="p-2 border-b min-w-[160px]">Keterangan</th>
              <th className="p-2 border-b min-w-[100px]">Aksi</th>
            </tr>
          </thead>

          <tbody className="text-gray-700 text-center">
            {rows.length === 0 ? (
              <tr>
                <td colSpan={8} className="p-4 text-center text-gray-500">
                  Belum ada data. Klik "Tambah Data" untuk menambah data baru.
                </td>
              </tr>
            ) : (
              rows.map((item, index) => (
                <tr key={item.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="p-2 border-b">{index + 1}</td>
                  <td className="p-2 border-b max-w-xs truncate" title={item.nomoridentitas || ""}>
                    {item.nomoridentitas || "-"}
                  </td>
                  <td className="p-2 border-b max-w-xs truncate" title={item.nama || ""}>
                    {item.nama || "-"}
                  </td>
                  <td className="p-2 border-b text-right tabular-nums">
                    {formatRupiah(item.penghasilanBruto)}
                  </td>
                  <td className="p-2 border-b text-right tabular-nums">
                    {formatRupiah(item.pengurangan)}
                  </td>
                  <td className="p-2 border-b text-right tabular-nums">
                    {/* fallback: hitung on the fly jika belum tersimpan */}
                    {formatRupiah(
                      item.penghasilanNeto != null
                        ? item.penghasilanNeto
                        : Math.max(
                            0,
                            Number(item.penghasilanBruto || 0) - Number(item.pengurangan || 0)
                          )
                    )}
                  </td>
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
        title={editingId ? "Edit Data Penghasilan" : "Tambah Data Penghasilan"}
        baseFields={baseFields}
        customChildren={customChildren}
        data={selected || {}}
        size="2xl"
      />
    </div>
  );
}
