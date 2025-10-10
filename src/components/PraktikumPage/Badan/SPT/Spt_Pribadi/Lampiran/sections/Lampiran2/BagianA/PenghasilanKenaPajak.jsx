import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import TablePenghasilan from "../../../components/Lampiran2/PenghasilanKenaPajak/TablePenghasilanA";
import ModalPenghasilan from "../../../components/Lampiran2/PenghasilanKenaPajak/ModalPenghasilanA";

const PenghasilanKenaPajak = () => {
  const [dataPenghasilan, setDataPenghasilan] = useState([]);

  // State untuk modal
  const [showModalPenghasilan, setShowModalPenghasilan] = useState(false);
  const [modalDataAPenghasilan, setModalDataPenghasilan] = useState({
    namaPemotong: "",
    npwpPemotong: "",
    kode: "",
    jenis: "",
    dasarPengenaanPajak: "",
    pphdipotong: "",
  });
  const [editingId, setEditingId] = useState(null);

  // Function untuk membuka modal tambah
  const openAddModal = () => {
    setModalDataPenghasilan({
      namaPemotong: "",
      npwpPemotong: "",
      kode: "",
      jenis: "",
      dasarPengenaanPajak: "",
      pphdipotong: "",
    });
    setEditingId(null);
    setShowModalPenghasilan(true);
  };

  // Function untuk membuka modal edit
  const openEditModal = (item) => {
    setModalDataPenghasilan(item);
    setEditingId(item.id);
    setShowModalPenghasilan(true);
  };

  // Function untuk menutup modal
  const closeModal = () => {
    setShowModalPenghasilan(false);
    setEditingId(null);
  };

  // Function untuk update modal data
  const updateModalData = (field, value) => {
    setModalDataPenghasilan((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Function untuk validasi dan save data
  const saveData = () => {
    console.log("Data yang disimpan:", modalDataAPenghasilan);

    // FIXED: Validasi yang handle 0 dengan benar
    const isValidValue = (value) => {
      return value !== null && value !== undefined && value !== "";
    };

    // Convert null to 0 for saving

    const dataToSave = {
      ...modalDataAPenghasilan,
      dasarPengenaanPajak: modalDataAPenghasilan.dasarPengenaanPajak ?? 0,
      pphdipotong: modalDataAPenghasilan.pphdipotong ?? 0,
    };

    // Validasi
    if (
      !modalDataAPenghasilan.npwpPemotong ||
      !modalDataAPenghasilan.kode ||
      !modalDataAPenghasilan.jenis ||
      !isValidValue(modalDataAPenghasilan.dasarPengenaanPajak) ||
      !isValidValue(modalDataAPenghasilan.pphdipotong)
    ) {
      alert("Semua field wajib diisi!");
      return;
    }

    if (editingId) {
      // Update existing data
      setDataPenghasilan((prevData) =>
        prevData.map((item) => (item.id === editingId ? { ...dataToSave, id: editingId } : item))
      );
    } else {
      // Add new data
      const newData = {
        ...dataToSave,
        id: Date.now(), // Simple ID generation
      };
      setDataPenghasilan((prevData) => [...prevData, newData]);
    }

    closeModal();
  };

  // Function untuk delete data
  const deleteData = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      setDataPenghasilan((prevData) => prevData.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="space-y-3">
      {/* Modal */}
      <ModalPenghasilan
        showModal={showModalPenghasilan}
        closeModal={closeModal}
        modalData={modalDataAPenghasilan}
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
      <TablePenghasilan data={dataPenghasilan} onEdit={openEditModal} onDelete={deleteData} />
    </div>
  );
};

export default PenghasilanKenaPajak;
