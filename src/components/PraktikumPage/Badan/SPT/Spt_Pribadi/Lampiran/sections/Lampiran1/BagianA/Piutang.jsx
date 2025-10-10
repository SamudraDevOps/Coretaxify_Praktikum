import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import TableA2 from "../../../components/Lampiran1/A2/TableA2";
import ModalA2 from "../../../components/Lampiran1/A2/ModalA2";

const Piutang = () => {
  const [dataA2, setDataA2] = useState([]);

  // State untuk modal
  const [showModalA2, setShowModalA2] = useState(false);
  const [modalDataA2, setModalDataA2] = useState({
    kode: 0,
    deskripsi: "",
    lokasipenerima: "",
    nomoridentitas: "",
    penerimaPinjaman: "",
    nilaiPiutang: "",
    tahunDimulai: "",
    SaldoPiutang: "",
    keterangan: "",
  });
  const [editingId, setEditingId] = useState(null);

  // Function untuk membuka modal tambah
  const openAddModal = () => {
    setModalDataA2({
      kode: 0,
      deskripsi: "",
      lokasipenerima: "",
      nomoridentitas: "",
      penerimaPinjaman: "",
      nilaiPiutang: "",
      tahunDimulai: "",
      SaldoPiutang: "",
      keterangan: "",
    });
    setEditingId(null);
    setShowModalA2(true);
  };

  // Function untuk membuka modal edit
  const openEditModal = (item) => {
    setModalDataA2(item);
    setEditingId(item.id);
    setShowModalA2(true);
  };

  // Function untuk menutup modal
  const closeModal = () => {
    setShowModalA2(false);
    setEditingId(null);
  };

  // Function untuk update modal data
  const updateModalData = (field, value) => {
    setModalDataA2((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Function untuk validasi dan save data
  const saveData = () => {
    console.log("Data yang disimpan:", modalDataA2);

     // FIXED: Validasi yang handle 0 dengan benar
    const isValidValue = (value) => {
      return value !== null && value !== undefined && value !== "";
    };

  // Convert null to 0 for saving

      const dataToSave = {
    ...modalDataA2,
    nilaiPiutang: modalDataA2.nilaiPiutang ?? 0,
    SaldoPiutang: modalDataA2.SaldoPiutang ?? 0,
  };

      // Validasi 
    if (
      !modalDataA2.deskripsi ||
      !modalDataA2.lokasipenerima ||
      !modalDataA2.nomoridentitas ||
      !modalDataA2.penerimaPinjaman ||
      !isValidValue(modalDataA2.nilaiPiutang) ||
      !modalDataA2.tahunDimulai ||
      !isValidValue(modalDataA2.SaldoPiutang) ||
      !modalDataA2.keterangan
    ) {
      alert("Semua field wajib diisi!");
      return;
    }

    if (editingId) {
      // Update existing data
      setDataA2((prevData) =>
        prevData.map((item) =>
          item.id === editingId ? { ...modalDataA2, id: editingId } : item
        )
      );
    } else {
      // Add new data
      const newData = {
        ...modalDataA2,
        id: Date.now(), // Simple ID generation
      };
      setDataA2((prevData) => [...prevData, newData]);
    }

    closeModal();
  };

  // Function untuk delete data
  const deleteData = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      setDataA2((prevData) => prevData.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="space-y-3">
      {/* Modal */}
      <ModalA2
        showModal={showModalA2}
        closeModal={closeModal}
        modalData={modalDataA2}
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
      <TableA2 data={dataA2} onEdit={openEditModal} onDelete={deleteData} />
    </div>
  );
};

export default Piutang;
