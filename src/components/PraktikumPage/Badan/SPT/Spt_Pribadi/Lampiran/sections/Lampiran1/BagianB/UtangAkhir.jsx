import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import TableUtang from "../../../components/Lampiran1/UtangAkhir/TableUtang";
import ModalUtang from "../../../components/Lampiran1/UtangAkhir/ModalUtang";


const UtangAkhir = () => {
  const [dataUtang, setDataUtang] = useState([]);

  // State untuk modal
  const [showModalUtang, setShowModalUtang] = useState(false);
  const [modalDataAUtang, setModalDataUtang] = useState({
    kode: 0,
    deskripsi: "",
    npwpKreditur: "",
    negara: "",
    tahunPerolehan: "",
    saldo: 0,
  });
  const [editingId, setEditingId] = useState(null);

  // Function untuk membuka modal tambah
  const openAddModal = () => {
    setModalDataUtang({
      kode: 0,
    deskripsi: "",
    npwpKreditur: "",
    negara: "",
    tahunPerolehan: "",
    saldo: 0,
    });
    setEditingId(null);
    setShowModalUtang(true);
  };

  // Function untuk membuka modal edit
  const openEditModal = (item) => {
    setModalDataUtang(item);
    setEditingId(item.id);
    setShowModalUtang(true);
  };

  // Function untuk menutup modal
  const closeModal = () => {
    setShowModalUtang(false);
    setEditingId(null);
  };

  // Function untuk update modal data
  const updateModalData = (field, value) => {
    setModalDataUtang((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Function untuk validasi dan save data
  const saveData = () => {
        console.log("Data yang disimpan:", modalDataAUtang);

    // Validasi
    if (
      !modalDataAUtang.deskripsi ||
      !modalDataAUtang.npwpKreditur ||
      !modalDataAUtang.negara ||
      !modalDataAUtang.tahunPerolehan ||
      !modalDataAUtang.saldo
   
      
    ) {
      alert("Semua field wajib diisi!");
      return;
    }

    if (editingId) {
      // Update existing data
      setDataUtang((prevData) =>
        prevData.map((item) =>
          item.id === editingId ? { ...modalDataAUtang, id: editingId } : item
        )
      );
    } else {
      // Add new data
      const newData = {
        ...modalDataAUtang,
        id: Date.now(), // Simple ID generation
      };
      setDataUtang((prevData) => [...prevData, newData]);
    }

    closeModal();
  };

  // Function untuk delete data
  const deleteData = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      setDataUtang((prevData) => prevData.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="space-y-3">
      {/* Modal */}
      <ModalUtang
        showModal={showModalUtang}
        closeModal={closeModal}
        modalData={modalDataAUtang}
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
      <TableUtang data={dataUtang} onEdit={openEditModal} onDelete={deleteData} />
    </div>
  );
};

export default UtangAkhir;
