import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Header from "./Header";
import TempatTinggalIndex from "./section/Lampiran5/BagianA";
import RekapitulasiBruto from "./section/Lampiran5/BagianB/";

const Lampiran5 = ({ data }) => {
  const [showBagianA, setShowBagianA] = useState(true);
  const [showBagianB, setShowBagianB] = useState(true);

  return (
    <div className="space-y-4">
      <Header />
      {/* Bagian A - ALAMAT TEMPAT KEGIATAN USAHA */}
      <div>
        <div
          className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
          onClick={() => setShowBagianA(!showBagianA)}
        >
          <h3 className="text-lg font-semibold">A. ALAMAT TEMPAT KEGIATAN USAHA</h3>
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
              <TempatTinggalIndex />
            </div>
          </div>
        </div>
      </div>

      {/* Bagian B - REKAPITULASI PEREDARAN BRUTO DAN PPh YANG TELAH DIBAYAR :  */}
      <div>
        <div
          className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
          onClick={() => setShowBagianB(!showBagianB)}
        >
          <h3 className="text-lg font-semibold">
            B. REKAPITULASI PEREDARAN BRUTO DAN PPh YANG TELAH DIBAYAR
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
              <RekapitulasiBruto />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lampiran5;
