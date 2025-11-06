import React, { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { formatRupiah } from "../../../../utils/formatCurrency";
import GlobalModal from "../../../../components/shared/GlobalModal";

export default function DaftarPiutang({ config }) {
  const {
    baseFields = [
      "namaPemotong",
      "npwpPemotong",
      "alamat",
      "jumlahPiutangDitagih",
      "jumlahPiutangTidakDitagih",
      "metodepembebanan",
      "jenisDokumen",
    ],
    customChildren = [],
    defaultData = {
      namaPemotong: "PT. Contoh Perusahaan",
      npwp: "",
      alamat: "",
      calender: "",
      jenisBiaya: "",
      biayaPromosi: "",
      keterangan: "",
      pphdipotong: "",
      nomorBuktiPotong: "",
    },
  } = config || {};

  const [dataPenghasilan, setDataPenghasilan] = useState([]);
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
    console.log("Saved values:", values);
    if (editingId) {
      setDataPenghasilan((prev) =>
        prev.map((item) => (item.id === editingId ? { ...values, id: editingId } : item))
      );
    } else {
      setDataPenghasilan((prev) => [...prev, { ...values, id: Date.now() }]);
    }
    closeModal();
  };

  // Delete data
  const deleteData = (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      setDataPenghasilan((prev) => prev.filter((item) => item.id !== id));
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
        <table className="table-auto text-sm text-left border overflow-hidden">
          <thead className="bg-purple-700 text-white text-center">
            <tr>
              <th className="p-2 border-b">No</th>
              <th className="p-2 border-b min-w-[150px]">nama</th>
              <th className="p-2 border-b min-w-[150px]">NPWP</th>
              <th className="p-2 border-b min-w-[150px]">Alamat</th>
              <th className="p-2 border-b min-w-[150px]">Jumlah Plafon Piutang </th>
              <th className="p-2 border-b min-w-[150px]">
                Jumlah Piutang yang Nyata-Nyata Tidak Dapat Ditagih
              </th>
              <th className="p-2 border-b min-w-[150px]">Metode Pembebanan</th>
              <th className="p-2 border-b min-w-[150px]">
                Jenis Dokumen Pembuktian Yang Disyaratkan
              </th>
              <th className="p-2 border-b uppercase">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-center">
            {dataPenghasilan.length === 0 ? (
              <tr>
                <td colSpan="8" className="px-4 py-8 text-center text-gray-500">
                  Belum ada data. Klik "Tambah Data" untuk menambah data baru.
                </td>
              </tr>
            ) : (
              dataPenghasilan.map((item, index) => (
                <tr key={item.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="p-2 border-b text-center">{index + 1}</td>
                  <td className="p-2 border-b">{item.namaPemotong}</td>
                  <td className="p-2 border-b">{item.npwp}</td>
                  <td className="p-2 border-b">{item.alamat}</td>
                  <td className="p-2 border-b ">{formatRupiah(item.jumlahPiutangDitagih)}</td>
                  <td className="p-2 border-b ">{formatRupiah(item.jumlahPiutangTidakDitagih)}</td>
                  <td className="p-2 border-b max-w-xs trunate">
                    {customChildren
                      ?.find((f) => f.key === "metodepembebanan")
                      ?.options?.find((opt) => opt.value === item.metodepembebanan)?.label ||
                      item.metodepembebanan}
                  </td>
                  <td className="p-2 border-b max-w-xs trunate">
                    {customChildren
                      ?.find((f) => f.key === "jenisDokumen")
                      ?.options?.find((opt) => opt.value === item.jenisDokumen)?.label ||
                      item.jenisDokumen}
                  </td>

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

      {/*  MODAL dengan Safe Config */}
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
