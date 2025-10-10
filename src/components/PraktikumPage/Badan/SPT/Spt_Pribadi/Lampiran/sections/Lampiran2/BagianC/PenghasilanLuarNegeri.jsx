import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import TablePenghasilanC from "../../../components/Lampiran2/PenghasilanLuarNegeri/TablePenghasilanC";
import ModalPenghasilanC from "../../../components/Lampiran2/PenghasilanLuarNegeri/ModalPenghasilanC";

const PenghasilanLuarNegeri = () => {
  const [dataPenghasilanC, setDataPenghasilanC] = useState([]);

  // State untuk modal
  const [showModalPenghasilanC, setShowModalPenghasilanC] = useState(false);
  const [modalDataAPenghasilanC, setModalDataPenghasilanC] = useState({
    namaPemberi: "",
    negara: "",
    tanggalPemotongan: "",
    jenis: "",
    kode: 0,
    penghasilanNeto: "",
    pajakDibayarLuarNegeri: "",
    mataUang: "",
    pajakDibayarRupiah: "",
    kreditYangDapatDiperhitungkan: "",
  });
  const [editingId, setEditingId] = useState(null);

  // Function untuk membuka modal tambah
  const openAddModal = () => {
    setModalDataPenghasilanC({
      namaPemberi: "",
      negara: "",
      tanggalPemotongan: "",
      jenis: "",
      kode: 0,
      penghasilanNeto: "",
      pajakDibayarLuarNegeri: "",
      mataUang: "",
      pajakDibayarRupiah: "",
      kreditYangDapatDiperhitungkan: "",
    });
    setEditingId(null);
    setShowModalPenghasilanC(true);
  };

  // Function untuk membuka modal edit
  const openEditModal = (item) => {
    setModalDataPenghasilanC(item);
    setEditingId(item.id);
    setShowModalPenghasilanC(true);
  };

  // Function untuk menutup modal
  const closeModal = () => {
    setShowModalPenghasilanC(false);
    setEditingId(null);
  };

  // Function untuk update modal data
  const updateModalData = (field, value) => {
    setModalDataPenghasilanC((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Function untuk validasi dan save data
  const saveData = () => {
    console.log("Data yang disimpan:", modalDataAPenghasilanC);

    const isValidValue = (value) => {
      return value !== null && value !== undefined && value !== "";
    };

    const dataToSave = {
      ...modalDataAPenghasilanC,
      penghasilanNeto: modalDataAPenghasilanC.penghasilanNeto ?? 0,
      pajakDibayarLuarNegeri: modalDataAPenghasilanC.pajakDibayarLuarNegeri ?? 0,
      pajakDibayarRupiah: modalDataAPenghasilanC.pajakDibayarRupiah ?? 0,
      kreditYangDapatDiperhitungkan: modalDataAPenghasilanC.kreditYangDapatDiperhitungkan ?? 0,
    };

    // Validasi
    if (
      !modalDataAPenghasilanC.namaPemberi ||
      !modalDataAPenghasilanC.negara ||
      !modalDataAPenghasilanC.tanggalPemotongan ||
      !modalDataAPenghasilanC.jenis ||
      !modalDataAPenghasilanC.kode ||
      !isValidValue(modalDataAPenghasilanC.penghasilanNeto) ||
      !isValidValue(modalDataAPenghasilanC.pajakDibayarLuarNegeri) ||
      !modalDataAPenghasilanC.mataUang ||
      !isValidValue(modalDataAPenghasilanC.pajakDibayarRupiah) ||
      !isValidValue(modalDataAPenghasilanC.kreditYangDapatDiperhitungkan)
    ) {
      alert("Semua field wajib diisi!");
      return;
    }

    if (editingId) {
      // Update existing data
      setDataPenghasilanC((prevData) =>
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
      setDataPenghasilanC((prevData) => [...prevData, newData]);
    }

    closeModal();
  };

  // Function untuk delete data
  const deleteData = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      setDataPenghasilanC((prevData) => prevData.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="space-y-3">
      {/* Modal */}
      <ModalPenghasilanC
        showModal={showModalPenghasilanC}
        closeModal={closeModal}
        modalData={modalDataAPenghasilanC}
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
      <TablePenghasilanC data={dataPenghasilanC} onEdit={openEditModal} onDelete={deleteData} />
    </div>
  );
};

export default PenghasilanLuarNegeri;
