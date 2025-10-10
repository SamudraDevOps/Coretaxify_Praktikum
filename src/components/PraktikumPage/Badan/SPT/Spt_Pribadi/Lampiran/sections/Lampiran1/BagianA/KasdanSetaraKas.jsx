import React, { useState, useEffect } from "react";
import { FaPlus, FaSave, FaExclamationTriangle, FaCheck } from "react-icons/fa";
import TableA1 from "../../../components/Lampiran1/A1/TableA1";
import ModalA1 from "../../../components/Lampiran1/A1/ModalA1";

const KasdanSetaraKas = () => {
  const [dataA1, setDataA1] = useState([]);

  // State untuk modal
  const [showModalA1, setShowModalA1] = useState(false);
  const [modalDataA1, setModalDataA1] = useState({
    kode: 0,
    deskripsi: "",
    buktikepemilikan: 0,
    atasnama: "",
    namabank: "",
    lokasiharta: "",
    tahunperolehan: "",
    saldo: 0,
    keterangan: "",
  });
  const [editingId, setEditingId] = useState(null);

  // TAMBAHAN: State untuk save functionality
  const [saving, setSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [savedData, setSavedData] = useState([]);

  // Monitor perubahan data
  useEffect(() => {
    const hasChanges = JSON.stringify(dataA1) !== JSON.stringify(savedData);
    setHasUnsavedChanges(hasChanges && dataA1.length > 0);
  }, [dataA1, savedData]);

  // Load data tersimpan saat component mount
  useEffect(() => {
    loadSavedData();
  }, []);

  // Load data dari backend
  const loadSavedData = async () => {
    try {
      console.log(" Loading saved A1 data");

      const response = await fetch(`/api/harta/user123/A1`);
      if (response.ok) {
        const result = await response.json();
        const loadedData = result.data || [];

        setSavedData(loadedData);
        setDataA1(loadedData);
        setLastSaved(result.last_saved ? new Date(result.last_saved) : null);

        console.log(" A1 saved data loaded:", loadedData);
      }
    } catch (error) {
      console.error(" Error loading A1 saved data:", error);
    }
  };

  // Save data ke backend
  const saveDataA1 = async () => {
    
    try {
      setSaving(true);
      console.log(" Saving A1 data", dataA1);

      const response = await fetch(`/api/harta/user123/A1`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          data: dataA1,
          section: "A1",
          total_saldo: calculateTotalSaldo(),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      setSavedData([...dataA1]);
      setHasUnsavedChanges(false);
      setLastSaved(new Date());

      console.log(" A1 data saved successfully:", result);
      return result;
    } catch (error) {
      console.error(" Error saving A1 data:", error);
      throw error;
    } finally {
      setSaving(false);
    }
  };

  //  Handle save button click
  const handleSave = async () => {
    try {
      await saveDataA1();
      alert("Data A1 (Kas dan Setara Kas) berhasil disimpan!");
    } catch (error) {
      alert(" Gagal menyimpan data A1: " + error.message);
    }
  };

  //  Calculate total saldo
  const calculateTotalSaldo = () => {
    return dataA1.reduce(
      (total, item) => total + (parseFloat(item.saldo) || 0),
      0
    );
  };

  // Function untuk membuka modal tambah
  const openAddModal = () => {
    setModalDataA1({
      kode: 0,
      deskripsi: "",
      buktikepemilikan: 0,
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

       // FIXED: Validasi yang handle 0 dengan benar
    const isValidValue = (value) => {
      return value !== null && value !== undefined && value !== "";
    };

  // Convert null to 0 for saving

      const dataToSave = {
    ...modalDataA1,
    dasarPengenaanPajak: modalDataA1.dasarPengenaanPajak ?? 0,
    pphdipotong: modalDataA1.pphdipotong ?? 0,
  };
    // Validasi
    if (!modalDataA1.deskripsi || 
      !isValidValue(modalDataA1.saldo)) {
      alert("Deskripsi dan saldo wajib diisi!");
      return;
    }

    if (editingId) {
      // Update existing data
      setDataA1((prevData) =>
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
        <button
          onClick={openAddModal}
          className="text-base flex items-center bg-blue-900 hover:bg-blue-950 text-white font-bold py-2 px-2 rounded"
        >
          {/* <FaPlus className="text-sm" /> */}
          Tambah Data
        </button>
      </div>

      {/* Table */}
      <TableA1 data={dataA1} onEdit={openEditModal} onDelete={deleteData} />

      {/* Save Button */}
      <button
        onClick={handleSave}
        disabled={!hasUnsavedChanges || saving || dataA1.length === 0}
        className={`text-base flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
          hasUnsavedChanges && !saving && dataA1.length > 0
            ? "bg-blue-500 hover:bg-blue-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        <FaSave size={14} />
        {saving ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
            Menyimpan...
          </>
        ) : (
          "Simpan Data"
        )}
      </button>
    </div>
  );
};

export default KasdanSetaraKas;
