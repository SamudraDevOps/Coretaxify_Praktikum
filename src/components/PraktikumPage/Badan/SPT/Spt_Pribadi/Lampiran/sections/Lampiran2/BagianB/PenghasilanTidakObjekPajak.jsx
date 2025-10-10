import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import TablePenghasilanB from "../../../components/Lampiran2/PenghasilanTidakObjekPajak/TablePenghasilanB";
import ModalPenghasilanB from "../../../components/Lampiran2/PenghasilanTidakObjekPajak/ModalPenghasilanB";

const PenghasilanTidakObjekPajak = () => {
  const [dataPenghasilanB, setDataPenghasilanB] = useState([]);

  // State untuk modal
  const [showModalPenghasilanB, setShowModalPenghasilanB] = useState(false);
  const [modalDataAPenghasilanB, setModalDataPenghasilanB] = useState({
    kode: "",
    jenis: "",
    npwpPemotong: "",
    namaPemotong: "",
    labaKotor: "",
  });
  const [editingId, setEditingId] = useState(null);

  // Function untuk membuka modal tambah
  const openAddModal = () => {
    setModalDataPenghasilanB({
      kode: "",
      jenis: "",
      npwpPemotong: "",
      namaPemotong: "",
      labaKotor: "",
    });
    setEditingId(null);
    setShowModalPenghasilanB(true);
  };

  // Function untuk membuka modal edit
  const openEditModal = (item) => {
    setModalDataPenghasilanB(item);
    setEditingId(item.id);
    setShowModalPenghasilanB(true);
  };

  // Function untuk menutup modal
  const closeModal = () => {
    setShowModalPenghasilanB(false);
    setEditingId(null);
  };

  // Function untuk update modal data
  const updateModalData = (field, value) => {
    setModalDataPenghasilanB((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Function untuk validasi dan save data
  const saveData = () => {
    console.log("Data yang disimpan:", modalDataAPenghasilanB);

       const isValidValue = (value) => {
      return value !== null && value !== undefined && value !== "";
    };

         const dataToSave = {
    ...modalDataAPenghasilanB,
    dasarPengenaanPajak: modalDataAPenghasilanB.dasarPengenaanPajak ?? 0,
    pphdipotong: modalDataAPenghasilanB.pphdipotong ?? 0,
  };


    // Validasi
    if (
      !modalDataAPenghasilanB.jenis ||
      !modalDataAPenghasilanB.npwpPemotong ||
      !modalDataAPenghasilanB.namaPemotong ||
      !isValidValue(modalDataAPenghasilanB.labaKotor)
    ) {
      alert("Semua field wajib diisi!");
      return;
    }

    if (editingId) {
      // Update existing data
      setDataPenghasilanB((prevData) =>
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
      setDataPenghasilanB((prevData) => [...prevData, newData]);
    }

    closeModal();
  };

  // Function untuk delete data
  const deleteData = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      setDataPenghasilanB((prevData) => prevData.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="space-y-3">
      {/* Modal */}
      <ModalPenghasilanB
        showModal={showModalPenghasilanB}
        closeModal={closeModal}
        modalData={modalDataAPenghasilanB}
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
      <TablePenghasilanB data={dataPenghasilanB} onEdit={openEditModal} onDelete={deleteData} />
    </div>
  );
};

export default PenghasilanTidakObjekPajak;
