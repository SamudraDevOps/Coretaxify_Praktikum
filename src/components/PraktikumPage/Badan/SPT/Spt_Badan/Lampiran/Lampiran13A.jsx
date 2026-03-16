// Lampiran13A.jsx
import React, { useState, Suspense, lazy } from "react";
import { FaChevronDown } from "react-icons/fa";
import Header from "./Header";
import PenanamanModalTable from "./Section/Lampiran13A/PenanamanModal";
import ModalIndex from "./Section/Lampiran13A/index.jsx";

const Lampiran13A = ({ data }) => {
  const [showBagianA, setShowBagianA] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInitialData, setModalInitialData] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const handleOpenAdd = () => {
    setEditingId(null);
    setModalInitialData(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (row) => {
    setEditingId(row?.id ?? null);
    setModalInitialData(row);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalInitialData(null);
    setEditingId(null);
  };

  const handleSaveModal = (values) => {
    console.log("Saved from modal:", values);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-4">
      <Header />

      {/* FASILITAS PERPAJAKAN DALAM RANGKA PENANAMAN MODAL */}
      <div>
        <div
          className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
          onClick={() => setShowBagianA(!showBagianA)}
        >
          <h3 className="text-lg font-semibold">
            FASILITAS PERPAJAKAN DALAM RANGKA PENANAMAN MODAL
          </h3>
          <span
            className={`transition-transform duration-500 ease-in-out ${
              showBagianA ? "rotate-180" : "rotate-0"
            }`}
          >
            <FaChevronDown />
          </span>
        </div>

        <div
          className={`overflow-hidden transition-all duration-700 ease-in-out ${
            showBagianA ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="border rounded-md p-4 space-y-4">
            <div className="ml-4">
              <PenanamanModalTable data={data} onAdd={handleOpenAdd} onEdit={handleOpenEdit} />

              <ModalIndex
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSave={handleSaveModal}
                initialData={modalInitialData || {}}
                size="2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lampiran13A;
