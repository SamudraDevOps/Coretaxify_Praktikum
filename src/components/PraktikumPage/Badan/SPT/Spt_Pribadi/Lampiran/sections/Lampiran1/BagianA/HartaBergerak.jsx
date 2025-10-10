import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import TableA4 from "../../../components/Lampiran1/A4/TableA4";
import ModalA4 from "../../../components/Lampiran1/A4/ModalA4";

const HartaBergerak = () => {
  const [dataA4, setDataA4] = useState([]);

  // State untuk modal
  const [showModalA4, setShowModalA4] = useState(false);
  const [modalDataA4, setModalDataA4] = useState({
     kode: 0,
    tipe: "",
    merkModel: "",
    nomorPolisi: "",
    Kepemilikan: "", 
    buktiKepemilikan: "",
    npwp: "",
    namaPemotongPajak: "",
    tahunPerolehan: "",
    biayaPerolehan: "",
    nilaiSaatIni: "",
    keterangan: "",
  });
  const [editingId, setEditingId] = useState(null);

  // Function untuk membuka modal tambah
  const openAddModal = () => {
    setModalDataA4({
      kode: 0,
    tipe: "",
    merkModel: "",
    nomorPolisi: "",
    Kepemilikan: "", 
    buktiKepemilikan: "",
    npwp: "",
    namaPemotongPajak: "",
    tahunPerolehan: "",
    biayaPerolehan: "",
    nilaiSaatIni: "",
    keterangan: "",
    });
    setEditingId(null);
    setShowModalA4(true);
  };

  // Function untuk membuka modal edit
  const openEditModal = (item) => {
    setModalDataA4(item);
    setEditingId(item.id);
    setShowModalA4(true);
  };

  // Function untuk menutup modal
  const closeModal = () => {
    setShowModalA4(false);
    setEditingId(null);
  };

  // Function untuk update modal data
  const updateModalData = (field, value) => {
    setModalDataA4((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Function untuk validasi dan save data
  const saveData = () => {
    console.log("Data yang disimpan:", modalDataA4);

    // FIXED: Validasi yang handle 0 dengan benar
    const isValidValue = (value) => {
      return value !== null && value !== undefined && value !== "";
    };

  // Convert null to 0 for saving

      const dataToSave = {
    ...modalDataA4,
    biayaPerolehan: modalDataA4.biayaPerolehan ?? 0,
    nilaiSaatIni: modalDataA4.nilaiSaatIni ?? 0,
  };
    console.log("Data yang disimpan:", dataToSave);
    // Validasi
    if (
      !modalDataA4.tipe ||
      !modalDataA4.merkModel ||
      !modalDataA4.nomorPolisi ||
      !modalDataA4.Kepemilikan ||
      !modalDataA4.npwp ||
      !modalDataA4.namaPemotongPajak ||
      !modalDataA4.tahunPerolehan ||
      !isValidValue(modalDataA4.biayaPerolehan) ||
      !isValidValue(modalDataA4.nilaiSaatIni) ||
      !modalDataA4.keterangan
    ) {
      alert("Semua field wajib diisi!");
      return;
    }

    if (editingId) {
      // Update existing data
      setDataA4((prevData) =>
        prevData.map((item) =>
          item.id === editingId ? { ...dataToSave, id: editingId } : item
        )
      );
    } else {
      // Add new data
      const newData = {
        ...dataToSave,
        id: Date.now(), // Simple ID generation
      };
      setDataA4((prevData) => [...prevData, newData]);
    }

    closeModal();
  };

  // Function untuk delete data
  const deleteData = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      setDataA4((prevData) => prevData.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="space-y-3">
      {/* Modal */}
      <ModalA4
        showModal={showModalA4}
        closeModal={closeModal}
        modalData={modalDataA4}
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
      <TableA4 data={dataA4} onEdit={openEditModal} onDelete={deleteData} />
    </div>
  );
};

export default HartaBergerak;
