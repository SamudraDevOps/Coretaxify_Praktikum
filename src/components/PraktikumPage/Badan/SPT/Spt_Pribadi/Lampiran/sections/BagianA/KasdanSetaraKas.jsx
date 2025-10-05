import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import TableA1 from "../../components/A1/TableA1";
import ModalA1 from "../../components/A1/ModalA1";

const KasdanSetaraKas = () => {
  const [dataA1, setDataA1] = useState([]);

  // State untuk modal
  const [showModalA1, setShowModalA1] = useState(false);
  const [modalDataA1, setModalDataA1] = useState({
    kode: 0,
    deskripsi: '',
    buktikepemilikan: 0,
    atasnama: '',
    namabank: '',
    lokasiharta: '',
    tahunperolehan: '',
    saldo: 0,
    keterangan: '',
  });
  const [editingId, setEditingId] = useState(null);

  // Function untuk membuka modal tambah
  const openAddModal = () => {
    setModalDataA1({
      kode: 0,
      deskripsi: "",
      Buktikepemilikan: 0,
      atasnama: "",
      namabank: "",
      lokasiharta: "",
      tahunperolehan: 0,
      saldo: 0,
      keterangan: "",
    });
    setEditingId(null);
    setShowModalA1(true);
  };

  // Function untuk membuka modal edit
  const openEditModal = (item) => {
    setModalDataA1(item);
    setEditingId(item.id);
    setShowModalA1(true);
  };

  // Function untuk menutup modal
  const closeModal = () => {
    setShowModalA1(false);
    setEditingId(null);
  };

  // Function untuk update modal data
  const updateModalData = (field, value) => {
    setModalDataA1((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Function untuk validasi dan save data
  const saveData = () => {
    // Validasi
    if (!modalDataA1.deskripsi || !modalDataA1.saldo) {
      alert("Deskripsi dan saldo wajib diisi!");
      return;
    }

    if (editingId) {
      // Update existing data
      setDataA1((prevData) =>
        prevData.map((item) =>
          item.id === editingId ? { ...modalDataA1, id: editingId } : item
        )
      );
    } else {
      // Add new data
      const newData = {
        ...modalDataA1,
        id: Date.now(), // Simple ID generation
      };
      setDataA1((prevData) => [...prevData, newData]);
    }

    closeModal();
  };

  // Function untuk delete data
  const deleteData = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      setDataA1((prevData) => prevData.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="space-y-3">
      {/* Modal */}
      <ModalA1
        showModal={showModalA1}
        closeModal={closeModal}
        modalData={modalDataA1}
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
      <TableA1 data={dataA1} onEdit={openEditModal} onDelete={deleteData} />
    </div>
  );
};

export default KasdanSetaraKas;
