import React, { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { formatNumber, parseFormattedNumber, formatRupiah } from "@utils/formatCurrency";
import GlobalModal from "@shared/GlobalModal";
export default function DaftarHartaBergerak({ config }) {
  const {
    baseFields = [
      "kode",
      "deskripsi",
      "lokasiHarta",
      "ukuranTanah",
      "ukuranBangunan",
      "sumberKepemilikan",
      "nomorSertifikat",
      "tahunPerolehan",
      "biayaPerolehan",
      "nilaiSaatIni",
      "keteranganHarta",
    ],
    customChildren = [],
    defaultData = {
      kode: "",
      deskripsi: "",
      lokasiHarta: "",
      ukuranTanah: "",
      ukuranBangunan: "",
      sumberKepemilikan: "",
      nomorSertifikat: "",
      tahunPerolehan: "",
      biayaPerolehan: 0,
      nilaiSaatIni: 0,
      keteranganHarta: "",
    },
  } = config || {};

  const [dataHarta, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [selected, setSelected] = useState(null);

  // Buka modal tambah data
  const openAddModal = () => {
    setSelected({ ...defaultData });
    setEditingId(null);
    setShowModal(true);
  };

  // Buka modal edit
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

  return (
    <div className="space-y-4">
      {/* Tombol Tambah */}
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
              <th className="p-2 border-b min-w-[140px]">Kode</th>
              <th className="p-2 border-b min-w-[240px]">Deskripsi</th>
              <th className="p-2 border-b min-w-[200px]">Lokasi Harta</th>
              <th className="p-2 border-b min-w-[160px]">Ukuran Tanah (m²)</th>
              <th className="p-2 border-b min-w-[180px]">Ukuran Bangunan (m²)</th>
              <th className="p-2 border-b min-w-[200px]">Sumber Kepemilikan</th>
              <th className="p-2 border-b min-w-[200px]">Nomor Sertifikat</th>
              <th className="p-2 border-b min-w-[140px]">Tahun Perolehan</th>
              <th className="p-2 border-b min-w-[160px]">Biaya Perolehan</th>
              <th className="p-2 border-b min-w-[160px]">Nilai Saat Ini</th>
              <th className="p-2 border-b min-w-[180px]">Keterangan</th>
              <th className="p-2 border-b min-w-[100px]">Aksi</th>
            </tr>
          </thead>

          <tbody className="text-gray-700 text-center">
            {dataHarta.length === 0 ? (
              <tr>
                <td colSpan={13} className="p-4 text-center text-gray-500">
                  Belum ada data. Klik "Tambah Data" untuk menambah data baru.
                </td>
              </tr>
            ) : (
              dataHarta.map((item, index) => (
                <tr key={item.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="p-2 border-b">{index + 1}</td>
                  <td className="p-2 border-b">{item.kode || "-"}</td>

                  {/* Deskripsi */}
                  <td className="p-2 border-b max-w-xs truncate">
                    {customChildren
                      ?.find((f) => f.key === "deskripsi")
                      ?.options?.find((opt) => opt.value === item.deskripsi)?.label ||
                      item.deskripsi}
                  </td>

                  {/* Lokasi Harta */}
                  <td className="p-2 border-b">{item.lokasiHarta || "-"}</td>

                  {/* Ukuran Tanah */}
                  <td className="p-2 border-b">{item.ukuranTanah || "-"}</td>

                  {/* Ukuran Bangunan */}
                  <td className="p-2 border-b">{item.ukuranBangunan || "-"}</td>

                  {/* Sumber Kepemilikan */}
                  <td className="p-2 border-b max-w-xs truncate">
                    {customChildren
                      ?.find((f) => f.key === "sumberKepemilikan")
                      ?.options?.find((opt) => opt.value === item.sumberKepemilikan)?.label ||
                      item.sumberKepemilikan}
                  </td>

                  {/* Nomor Sertifikat */}
                  <td className="p-2 border-b">{item.nomorSertifikat || "-"}</td>

                  {/* Tahun Perolehan */}
                  <td className="p-2 border-b">{item.tahunPerolehan || "-"}</td>

                  {/* Biaya Perolehan */}
                  <td className="p-2 border-b">{formatRupiah(item.biayaPerolehan)}</td>

                  {/* Nilai Saat Ini */}
                  <td className="p-2 border-b">{formatRupiah(item.nilaiSaatIni)}</td>

                  {/* Keterangan */}
                  <td className="p-2 border-b">{item.keteranganHarta || "-"}</td>

                  {/* Aksi */}
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

      {/* MODAL */}
      <GlobalModal
        isOpen={showModal}
        onClose={closeModal}
        onSave={saveData}
        title={editingId ? "Edit Data Harta Tidak Bergerak" : "Tambah Data Harta Tidak Bergerak"}
        baseFields={baseFields}
        customChildren={customChildren}
        data={selected || {}}
        size="2xl"
      />
    </div>
  );
}
