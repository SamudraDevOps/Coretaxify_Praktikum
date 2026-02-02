import React, { useState, Suspense, lazy } from "react";
import { FaChevronDown } from "react-icons/fa";
import Header from "./Header";

import LaporanLabaRugi from "@badanSections/Lampiran1/Lampiran1I/BagianA";
import Neraca from "@badanSections/Lampiran1/Lampiran1I/BagianB";

const Lampiran1I = ({ data }) => {
  const [showBagianA, setShowBagianA] = useState(true);
  const [showBagianB, setShowBagianB] = useState(true);

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

      {/* PENGGUNAAN SISA LEBIH UNTUK PEMBANGUNAN DAN PENGADAAN SARANA DAN PRASARANA
       */}
      <div>
        <div
          className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
          onClick={() => setShowBagianA(!showBagianA)}
        >
          <h3 className="text-lg font-semibold">
            PENGGUNAAN SISA LEBIH UNTUK PEMBANGUNAN DAN PENGADAAN SARANA DAN PRASARANA
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
            showBagianA ? " opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="border rounded-md p-4 space-y-4">
            <div className="ml-4">
              <LaporanLabaRugi />
            </div>
          </div>
        </div>
      </div>

      <div>
        <div
          className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
          onClick={() => setShowBagianB(!showBagianB)}
        >
          <h3 className="text-lg font-semibold">Neraca </h3>
          <span
            className={`transition-transform duration-500 ease-in-out ${
              showBagianB ? "rotate-180" : "rotate-0"
            }`}
          >
            <FaChevronDown />
          </span>
        </div>

        <div
          className={`overflow-hidden transition-all duration-700 ease-in-out ${
            showBagianB ? " opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="border rounded-md p-4 space-y-4">
            <div className="ml-4">
              <Neraca />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lampiran1I;
