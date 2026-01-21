import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import HeaderLampiran from "./HeaderLampiran";
import LaporanLabaRugi from "@pribadiSections/Lampiran3/Lampiran3A-1/BagianA";
import Neraca from "@pribadiSections/Lampiran3/Lampiran3A-1/BagianB";
import LaporanKeuangan from "@pribadiSections/Lampiran3/Lampiran3A-1/BagianC/LaporanKeuangan";

export default function Lampiran_3A1({ data }) {
  const [showBagianA, setShowBagianA] = useState(true);
  const [showBagianB, setShowBagianB] = useState(true);
  const [showBagianC, setShowBagianC] = useState(true);

  // State untuk form laporan keuangan
  const [formLaporanKeuangan, setFormLaporanKeuangan] = useState({
    jenis_laporan: "",
    npwp_konsultan_pajak: "",
    nama_konsultan_pajak: "",
    npwp_kantor_akuntan_publik: "",
    nama_kantor_akuntan_publik: "",
  });

  // Handler perubahan field
  const handleLaporanKeuanganChange = (key, value) => {
    setFormLaporanKeuangan((prev) => ({
      ...prev,
      [key]: value,
      ...(key === "jenis_laporan" && value === "01"
        ? { npwp_kantor_akuntan_publik: "", nama_kantor_akuntan_publik: "" }
        : {}),
    }));
  };

  return (
    <div className="space-y-4">
      <HeaderLampiran />

      {/* Bagian A - Laporan Laba Rugi */}
      <div>
        <div
          className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
          onClick={() => setShowBagianA(!showBagianA)}
        >
          <h3 className="text-lg font-semibold">A.1. LAPORAN LABA RUGI</h3>
          <span
            className={`transition-transform duration-500 ease-in-out ${
              showBagianA ? "rotate-180" : "rotate-0"
            }`}
          >
            <FaChevronDown />
          </span>
        </div>
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            showBagianA ? "block" : "hidden"
          }`}
        >
          <div className="border rounded-md p-4 space-y-4">
            <div className="ml-4 ">
              <LaporanLabaRugi />
            </div>
          </div>
        </div>
      </div>

      {/* Bagian B - Laporan Posisi Keuangan (Neraca) */}
      <div>
        <div
          className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
          onClick={() => setShowBagianB(!showBagianB)}
        >
          <h3 className="text-lg font-semibold">A.2. LAPORAN POSISI KEUANGAN (NERACA)</h3>
          <span
            className={`transition-transform duration-500 ease-in-out ${
              showBagianB ? "rotate-180" : "rotate-0"
            }`}
          >
            <FaChevronDown />
          </span>
        </div>
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            showBagianB ? " opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="border rounded-md p-4 space-y-4">
            <div className="ml-4 ">
              <Neraca />
            </div>
          </div>
        </div>
      </div>

      {/* Bagian C - Laporan Keuangan */}
      <div>
        <div
          className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
          onClick={() => setShowBagianC(!showBagianC)}
        >
          <h3 className="text-lg font-semibold">A.3. LAPORAN KUANGAN</h3>
          <span
            className={`transition-transform duration-500 ease-in-out ${
              showBagianC ? "rotate-180" : "rotate-0"
            }`}
          >
            <FaChevronDown />
          </span>
        </div>
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            showBagianC ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="border rounded-md p-4 space-y-4">
            <div className="ml-4">
              <LaporanKeuangan
                formData={formLaporanKeuangan}
                onFieldChange={handleLaporanKeuanganChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
