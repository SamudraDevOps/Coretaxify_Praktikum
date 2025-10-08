import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import TableA5 from "../../../components/Lampiran1/A5/TableA5";
import ModalA5 from "../../../components/Lampiran1/A5/ModalA5";

const HartaTidakBergerak = () => {
  const [dataA5, setDataA5] = useState([]);

  // State untuk modal
  const [showModalA5, setShowModalA5] = useState(false);
  const [modalDataA5, setModalDataA5] = useState({
     kode: 0,
    deskripsi: "",
    lokasiHarta: "",
    ukuranTanah: "",
    ukuranBangunan: "", 
    sumberKepemilikan: "",
    nomorSertifikat: "",
    tahunPerolehan: "",
    biayaPerolehan: 0,
    nilaiSaatIni: 0,
    keterangan: "",
  });
  const [editingId, setEditingId] = useState(null);

  // Function untuk membuka modal tambah
  const openAddModal = () => {
    setModalDataA5({
    kode: 0,
    deskripsi: "",
    lokasiHarta: "",
    ukuranTanah: "",
    ukuranBangunan: "", 
    sumberKepemilikan: "",
    nomorSertifikat: "",
    tahunPerolehan: "",
    biayaPerolehan: 0,
    nilaiSaatIni: 0,
    keterangan: "",
    });
    setEditingId(null);
    setShowModalA5(true);
  };

  // Function untuk membuka modal edit
  const openEditModal = (item) => {
    setModalDataA5(item);
    setEditingId(item.id);
    setShowModalA5(true);
  };

  // Function untuk menutup modal
  const closeModal = () => {
    setShowModalA5(false);
    setEditingId(null);
  };

  // Function untuk update modal data
  const updateModalData = (field, value) => {
    setModalDataA5((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Function untuk validasi dan save data
  const saveData = () => {
    console.log("Data yang disimpan:", modalDataA5);
    // Validasi
    if (
      !modalDataA5.kode ||
      !modalDataA5.deskripsi ||
      !modalDataA5.lokasiHarta ||
      !modalDataA5.ukuranTanah ||
      !modalDataA5.ukuranBangunan ||
      !modalDataA5.sumberKepemilikan ||
      !modalDataA5.nomorSertifikat ||
      !modalDataA5.tahunPerolehan ||
      !modalDataA5.biayaPerolehan ||
      !modalDataA5.nilaiSaatIni ||
      !modalDataA5.keterangan
    ) {
      alert("Semua field wajib diisi!");
      return;
    }

    if (editingId) {
      // Update existing data
      setDataA5((prevData) =>
        prevData.map((item) =>
          item.id === editingId ? { ...modalDataA5, id: editingId } : item
        )
      );
    } else {
      // Add new data
      const newData = {
        ...modalDataA5,
        id: Date.now(), // Simple ID generation
      };
      setDataA5((prevData) => [...prevData, newData]);
    }

    closeModal();
  };

  // Function untuk delete data
  const deleteData = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      setDataA5((prevData) => prevData.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="space-y-3">
      {/* Modal */}
      <ModalA5
        showModal={showModalA5}
        closeModal={closeModal}
        modalData={modalDataA5}
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
      <TableA5 data={dataA5} onEdit={openEditModal} onDelete={deleteData} />
    </div>
  );
};

export default HartaTidakBergerak;
