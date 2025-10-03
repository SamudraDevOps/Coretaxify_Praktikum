import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import TableA3 from "../../components/A3/TableA3";
import ModalA3 from "../../components/A3/ModalA3";

const Investasi = () => {
  // State untuk data A.2
  const [dataA3, setDataA3] = useState([]);

  // State untuk modal
  const [showModalA3, setShowModalA3] = useState(false);
  const [modalDataA3, setModalDataA3] = useState({
    kode: 0,
    deskripsi: "",
    lokasiharta: "",
    nomoridentitas: "",
    penerimaInvestasi: "", 
    buktiKepemilikan: "",
    biayaPerolehan: 0,
    tahunPerolehan: "",
    nilaiSaatIni: 0,
    keterangan: "",
  });
  const [editingId, setEditingId] = useState(null);

  // Function untuk membuka modal tambah
  const openAddModal = () => {
    setModalDataA3({
      kode: 0,
    deskripsi: "",
    lokasiharta: "",
    nomoridentitas: "",
    penerimaInvestasi: "", 
    buktiKepemilikan: "",
    biayaPerolehan: 0,
    tahunPerolehan: "",
    nilaiSaatIni: 0,
    keterangan: "",
    });
    setEditingId(null);
    setShowModalA3(true);
  };

  // Function untuk membuka modal edit
  const openEditModal = (item) => {
    setModalDataA3(item);
    setEditingId(item.id);
    setShowModalA3(true);
  };

  // Function untuk menutup modal
  const closeModal = () => {
    setShowModalA3(false);
    setEditingId(null);
  };

  // Function untuk update modal data
  const updateModalData = (field, value) => {
    setModalDataA3((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Function untuk validasi dan save data
  const saveData = () => {
    // Validasi
    if (
      !modalDataA3.deskripsi ||
      !modalDataA3.lokasiharta ||
      !modalDataA3.nomoridentitas ||
      !modalDataA3.penerimaInvestasi ||
      !modalDataA3.buktiKepemilikan ||
      !modalDataA3.biayaPerolehan ||
      !modalDataA3.tahunPerolehan ||
      !modalDataA3.nilaiSaatIni ||
      !modalDataA3.keterangan
    ) {
      alert("Semua field wajib diisi!");
      return;
    }

    if (editingId) {
      // Update existing data
      setDataA3((prevData) =>
        prevData.map((item) =>
          item.id === editingId ? { ...modalDataA3, id: editingId } : item
        )
      );
    } else {
      // Add new data
      const newData = {
        ...modalDataA3,
        id: Date.now(), // Simple ID generation
      };
      setDataA3((prevData) => [...prevData, newData]);
    }

    closeModal();
  };

  // Function untuk delete data
  const deleteData = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      setDataA3((prevData) => prevData.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="space-y-3">
      {/* Modal */}
      <ModalA3
        showModal={showModalA3}
        closeModal={closeModal}
        modalData={modalDataA3}
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
      <TableA3 data={dataA3} onEdit={openEditModal} onDelete={deleteData} />
    </div>
  );
};

export default Investasi;
