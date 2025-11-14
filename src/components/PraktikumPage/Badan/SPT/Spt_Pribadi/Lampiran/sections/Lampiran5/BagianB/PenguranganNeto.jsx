import React, { useState, useEffect, useRef, useMemo } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { formatRupiah } from "@utils/formatCurrency";
import GlobalModal from "@lampiran/shared/GlobalModal";

export default function PenguranganNeto({ config, totalKompensasi2025, onTotalChange }) {

  const {
    baseFields = ["kode", "jenis", "nilaiPengurang"],
    customChildren = [],
    defaultData = {
      kode: "",
      jenis: "",
      nilaiPengurang: "",
    },
  } = config || {};

  const [dataPenghasilan, setDataPenghasilan] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [selected, setSelected] = useState(null);

  const prevTotalRef = useRef(0);

  // Hitung total dari tabel manual (sumbangan, hiburan, dll)
  const totalPengurangManual = useMemo(() => {
    return dataPenghasilan.reduce(
      (sum, item) => sum + (item.nilaiPengurang ? Number(item.nilaiPengurang) : 0),
      0
    );
  }, [dataPenghasilan]);

  // Total akhir L-5 Bag. B = manual + kompensasi
  const totalPengurangL5B = useMemo(() => {
    return totalPengurangManual + (totalKompensasi2025 || 0);
  }, [totalPengurangManual, totalKompensasi2025]);

  // Kirim total L-5 Bag. B ke parent (untuk ke Bagian C.3)
  useEffect(() => {
    if (onTotalChange && totalPengurangL5B !== prevTotalRef.current) {
      prevTotalRef.current = totalPengurangL5B;
      onTotalChange(totalPengurangL5B);
    }
  }, [totalPengurangManual, totalKompensasi2025, onTotalChange]);

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
    console.log("Save data manual:", values);

    if (editingId) {
      setDataPenghasilan((prev) =>
        prev.map((item) => (item.id === editingId ? { ...values, id: editingId } : item))
      );
    } else {
      setDataPenghasilan((prev) => [...prev, { ...values, id: Date.now() }]);
    }
    closeModal();
  };

  const deleteData = (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      setDataPenghasilan((prev) => prev.filter((item) => item.id !== id));
    }
  };

  // console.log("totalPengurangManual:", totalPengurangManual);
  // console.log("totalKompensasi2025:", totalKompensasi2025);
  // console.log("totalPengurangL5B:", totalPengurangL5B);

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
              <th className="p-2 border-b min-w-[150px]">Jenis Pengurang Penghasilan Neto</th>
              <th className="p-2 border-b min-w-[150px]">Jumlah Pengurang Penghasilan Neto</th>
              <th className="p-2 border-b uppercase">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-center">
            {dataPenghasilan.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
                  Belum ada data. Klik "Tambah Data" untuk menambah data baru.
                </td>
              </tr>
            ) : (
              dataPenghasilan.map((item, index) => (
                <tr key={item.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="p-2 border-b text-center">{index + 1}</td>
                  <td className="p-2 border-b">{item.kode}</td>
                  <td className="p-2 border-b max-w-xs truncate">
                    {customChildren
                      ?.find((f) => f.key === "jenis")
                      ?.options?.find((opt) => opt.value === item.jenis)?.label || item.jenis}
                  </td>
                  <td className="p-2 border-b">{formatRupiah(item.nilaiPengurang)}</td>
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

      <div className="space-y-3 pt-4 border-t">
        {/* Total Pengurang Manual */}
        <div className="flex justify-between items-center font-semibold text-lg">
          <span>Total Pengurang (Manual):</span>
          <span>{formatRupiah(totalPengurangManual)}</span>
        </div>

        {/* Kompensasi Kerugian Fiskal 2025 */}
        <div className="flex justify-between items-center font-semibold text-lg text-blue-700 bg-blue-50 p-2 rounded">
          <span>Kompensasi Kerugian Fiskal (2025):</span>
          <span>{formatRupiah(totalKompensasi2025 || 0)}</span>
        </div>

        {/* TOTAL PENGURANG L-5 BAG. B (untuk ke C.3) */}
        {/* <div className="flex justify-between items-center font-bold text-xl text-purple-800 pt-3 border-t-2">
          <span>Total Pengurang Penghasilan Neto (L-5 Bag. B):</span>
          <span>{formatRupiah(totalPengurangL5B)}</span>
        </div> */}
      </div>

      {/* Modal */}
      <GlobalModal
        isOpen={showModal}
        onClose={closeModal}
        onSave={saveData}
        title={editingId ? "Edit Daftar Nominatif Biaya Hiburan" : "Daftar Nominatif Biaya Hiburan"}
        baseFields={baseFields}
        customChildren={customChildren}
        data={selected || {}}
        size="2xl"
      />
    </div>
  );
}
