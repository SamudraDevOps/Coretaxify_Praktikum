import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import TablePemotongan from "../../../components/Lampiran1/BuktiPemotongan/TablePemotongan";
import ModalPemotongan from "../../../components/Lampiran1/BuktiPemotongan/ModalPemotongan";

const Pemotongan = () => {
  const [dataPemotongan, setDataPemotongan] = useState([]);

  // State untuk modal
  const [showModalPemotongan, setShowModalPemotongan] = useState(false);
  const [modalDataAPemotongan, setModalDataPemotongan] = useState({
    namaPemotong: "",
    npwpPemotong: "",
    nomorBuktiPemotongan: "",
    tanggalPemotongan: "",
    jenisPajak: "",
    dasarPengenaanPajak: 0,
    pphdipotong: 0,
  });
  const [editingId, setEditingId] = useState(null);

  // Function untuk membuka modal tambah
  const openAddModal = () => {
    setModalDataPemotongan({
      namaPemotong: "",
      npwpPemotong: "",
      nomorBuktiPemotongan: "",
      tanggalPemotongan: "",
      jenisPajak: "",
      dasarPengenaanPajak: 0,
      pphdipotong: 0,
    });
    setEditingId(null);
    setShowModalPemotongan(true);
  };

  // Function untuk membuka modal edit
  const openEditModal = (item) => {
    setModalDataPemotongan(item);
    setEditingId(item.id);
    setShowModalPemotongan(true);
  };

  // Function untuk menutup modal
  const closeModal = () => {
    setShowModalPemotongan(false);
    setEditingId(null);
  };

  // Function untuk update modal data
  const updateModalData = (field, value) => {
    setModalDataPemotongan((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Function untuk validasi dan save data
  const saveData = () => {
    console.log("Data yang disimpan:", modalDataAPemotongan);

    // FIXED: Validasi yang handle 0 dengan benar
    const isValidValue = (value) => {
      return value !== null && value !== undefined && value !== "";
    };

    // Convert null to 0 for saving

    const dataToSave = {
      ...modalDataAPemotongan,
      dasarPengenaanPajak: modalDataAPemotongan.dasarPengenaanPajak ?? 0,
      pphdipotong: modalDataAPemotongan.pphdipotong ?? 0,
    };

    // Validasi
    if (
      !modalDataAPemotongan.npwpPemotong ||
      !modalDataAPemotongan.nomorBuktiPemotongan ||
      !modalDataAPemotongan.tanggalPemotongan ||
      !modalDataAPemotongan.jenisPajak ||
      !isValidValue(modalDataAPemotongan.dasarPengenaanPajak) ||
      !isValidValue(modalDataAPemotongan.pphdipotong)
    ) {
      alert("Semua field wajib diisi!");
      return;
    }

    if (editingId) {
      // Update existing data
      setDataPemotongan((prevData) =>
        prevData.map((item) =>
          item.id === editingId
            ? { ...dataToSave, id: editingId }
            : item
        )
      );
    } else {
      // Add new data
      const newData = {
        ...dataToSave,
        id: Date.now(), // Simple ID generation
      };
      setDataPemotongan((prevData) => [...prevData, newData]);
    }

    closeModal();
  };

  // Function untuk delete data
  const deleteData = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      setDataPemotongan((prevData) =>
        prevData.filter((item) => item.id !== id)
      );
    }
  };

  return (
    <div className="space-y-3">
      {/* Modal */}
      <ModalPemotongan
        showModal={showModalPemotongan}
        closeModal={closeModal}
        modalData={modalDataAPemotongan}
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
      <TablePemotongan
        data={dataPemotongan}
        onEdit={openEditModal}
        onDelete={deleteData}
      />
    </div>
  );
};

export default Pemotongan;
