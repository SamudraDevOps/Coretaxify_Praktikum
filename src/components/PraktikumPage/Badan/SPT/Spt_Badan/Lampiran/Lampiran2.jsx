import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Header from "./Header";
// import Lampiran2Section from './section/Lampiran2';
import PemegangSahamIndex from "./section/Lampiran2/BagianA";
import DaftarPenyetoranIndex from "./section/Lampiran2/BagianB";

const Lampiran2 = ({ data }) => {
  const [showBagianA, setShowBagianA] = useState(true);
  const [showBagianB, setShowBagianB] = useState(true);

  return (
    <div className="space-y-4">
      <Header />

      {/* Bagian A - DAFTAR PEMEGANG SAHAM/PEMILIK MODAL DAN JUMLAH DIVIDEN/PEMBAGIAN LABA YANG DIBAGIKAN
            DAFTAR SUSUNAN PENGIRIS DAN KOMISARIS */}
      <div>
        <div
          className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
          onClick={() => setShowBagianA(!showBagianA)}
        >
          <h3 className="text-lg font-semibold">
            A. DAFTAR PEMEGANG SAHAM/PEMILIK MODAL DAN JUMLAH DIVIDEN/PEMBAGIAN LABA YANG DIBAGIKAN
            DAFTAR SUSUNAN PENGIRIS DAN KOMISARIS
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
              <PemegangSahamIndex />
            </div>
          </div>
        </div>
      </div>

      {/* Bagian B - DAFTAR PENYERTAAN MODAL, UTANG, DAN/ATAU PIUTANG PADA PERUSAHAAN AFILIASI  */}
      <div>
        <div
          className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
          onClick={() => setShowBagianB(!showBagianB)}
        >
          <h3 className="text-lg font-semibold">
            B. DAFTAR PENYERTAAN MODAL, UTANG, DAN/ATAU PIUTANG PADA PERUSAHAAN AFILIASI
          </h3>
          <span
            className={`transition-transform duration-500 ease-in-out ${
              showBagianB ? "rotate-180" : "rotate-0"
            }`}
          >
            <FaChevronDown />
          </span>
        </div>
        <div
          className={`overflow-hidden transition-all duration-1000 ease-in-out ${
            showBagianB ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="border rounded-md p-4 space-y-4">
            <div className="ml-4">
              <DaftarPenyetoranIndex />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lampiran2;
