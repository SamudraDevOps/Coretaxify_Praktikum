import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Header from "./Header";
import Transaksi from "./section/Lampiran10C";

const Lampiran10C = ({ data }) => {
  const [showBagianA, setShowBagianA] = useState(true);

  return (
    <div className="space-y-4">
      <Header />

      {/* Bagian DAFTAR TRANSAKSI YANG DIPENGARUHI HUBUNGAN ISTIMEWA */}
      <div>
        <div
          className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
          onClick={() => setShowBagianA(!showBagianA)}
        >
          <h3 className="text-lg font-semibold">
            I. DALAM HAL WAJIB PAJAK DALAM TAHUN PAJAK INI MELAKUKAN TRANSAKSI DENGAN PIHAK-PIHAK
            YANG MERUPAKAN PENDUDUK TAX HAVEN COUNTRY{" "}
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
          className={`overflow-hidden transition-all duration-1000 ease-in-out ${
            showBagianA ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="border rounded-md p-4 space-y-4">
            <div className="ml-4">
              <Transaksi />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lampiran10C;
