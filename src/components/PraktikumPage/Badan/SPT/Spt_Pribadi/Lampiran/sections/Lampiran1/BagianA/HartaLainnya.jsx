import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import TableA6 from "../../../components/Lampiran1/A6/TableA6";
import ModalA6 from "../../../components/Lampiran1/A6/ModalA6";

const HartaLainLain = () => {
  const [dataA6, setDataA6] = useState([]);

  // State untuk modal
  const [showModalA6, setShowModalA6] = useState(false);
  const [modalDataA6, setModalDataA6] = useState({
    kode: 0,
    deskripsi: "",
    tahunPerolehan: "",
    biayaPerolehan: "",
    nilaiSaatIni: "",
    buktiKepemilikan: "",
    InformasiTambahan: "",
    keterangan: "",
  });
  const [editingId, setEditingId] = useState(null);

  // Function untuk membuka modal tambah
  const openAddModal = () => {
    setModalDataA6({
      kode: 0,
      deskripsi: "",
      tahunPerolehan: "",
      biayaPerolehan: "",
      nilaiSaatIni: "",
      buktiKepemilikan: "",
      InformasiTambahan: "",
      keterangan: "",
    });
    setEditingId(null);
    setShowModalA6(true);
  };

  // Function untuk membuka modal edit
  const openEditModal = (item) => {
    setModalDataA6(item);
    setEditingId(item.id);
    setShowModalA6(true);
  };

  // Function untuk menutup modal
  const closeModal = () => {
    setShowModalA6(false);
    setEditingId(null);
  };

  // Function untuk update modal data
  const updateModalData = (field, value) => {
    setModalDataA6((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Function untuk validasi dan save data
  const saveData = () => {
    console.log("Data yang disimpan:", modalDataA6);
    // Validasi
    if (
      !modalDataA6.deskripsi ||
      !modalDataA6.tahunPerolehan ||
      !modalDataA6.biayaPerolehan ||
      !modalDataA6.nilaiSaatIni ||
      !modalDataA6.buktiKepemilikan ||
      !modalDataA6.InformasiTambahan ||
      !modalDataA6.keterangan
    ) {
      alert("Semua field wajib diisi!");
      return;
    }

    if (editingId) {
      // Update existing data
      setDataA6((prevData) =>
        prevData.map((item) =>
          item.id === editingId ? { ...modalDataA6, id: editingId } : item
        )
      );
    } else {
      // Add new data
      const newData = {
        ...modalDataA6,
        id: Date.now(), // Simple ID generation
      };
      setDataA6((prevData) => [...prevData, newData]);
    }

    closeModal();
  };

  // Function untuk delete data
  const deleteData = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      setDataA6((prevData) => prevData.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="space-y-3">
      {/* Modal */}
      <ModalA6
        showModal={showModalA6}
        closeModal={closeModal}
        modalData={modalDataA6}
        updateModalData={updateModalData}
        onSave={saveData}
        editingId={editingId}
      />

      {/* Header dengan tombol tambah */}
      <div className="flex justify-between items-center mb-4">
        {/* <h5 className="text-sm font-medium text-gray-700">
          Daftar Harta Tidak Bergerak
        </h5> */}
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          <FaPlus className="text-sm" />
          Tambah Data
        </button>
      </div>

      {/* Table */}
      <TableA6 data={dataA6} onEdit={openEditModal} onDelete={deleteData} />
    </div>
  );
};

export default HartaLainLain;
