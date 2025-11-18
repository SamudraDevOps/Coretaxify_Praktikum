import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import HeaderLampiran from "./HeaderLampiran";
import RekapitulasiPajakFinal from "@sections/Lampiran3/Lampiran3B/BagianA";
import RekapitulasiPengusaha from "@sections/Lampiran3/Lampiran3B/BagianB";
import RekapitulasiPenghasilanNeto from "@sections/Lampiran3/Lampiran3B/BagianC";

export default function Lampiran_3B({ data }) {
  const [showBagianA, setShowBagianA] = useState(true);
  const [showBagianB, setShowBagianB] = useState(true);
  const [showBagianC, setShowBagianC] = useState(true);

  return (
    <div className="space-y-4">
      <HeaderLampiran />

      {/* Bagian A - Rekapitulasi Peredaran Bruto Untuk WP Peredaran Bruto Tertentu yang Dikenai Pajak Final */}
      <div>
        <div
          className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
          onClick={() => setShowBagianA(!showBagianA)}
        >
          <h3 className="text-lg font-semibold">
            A. REKAPITULASI PEREDARAN BRUTO UNTUK WP PEREDARAN BRUTO TERTENTU YANG DIKENAI PAJAK
            FINAL
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
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            showBagianA ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="border rounded-md p-4 space-y-4">
            <div className="ml-4">
              <RekapitulasiPajakFinal />
            </div>
          </div>
      </div>
      </div>

      {/* Bagian B - Rekapitulasi Peredaran Bruto Untuk Wajib pajak Orang Pribadi Pengusaha Tertentu (OPPT) */}
      <div>
        <div
          className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
          onClick={() => setShowBagianB(!showBagianB)}
        >
          <h3 className="text-lg font-semibold">
            B. REKAPITULASI PEREDARAN BRUTO UNTUK WAJIB PAJAK ORANG PRIBADI PENGUSAHA TERTENTU
            (OPPT)
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
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            showBagianB ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="border rounded-md p-4 space-y-4">
            <div className="ml-4">
              <RekapitulasiPengusaha />
            </div>
          </div>
      </div>
      </div>

      {/* Bagian C  - Rekapitulasi Peredaran Bruto Untuk Pengguna norma perhitungan Penghasilan Neto (NPPN) */}
      <div>
        <div
          className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
          onClick={() => setShowBagianC(!showBagianC)}
        >
          <h3 className="text-lg font-semibold">
            C. REKAPITULASI PEREDARAN BRUTO UNTUK PENGGUNA NORMA PERHITUNGAN PENGHASILAN NETO (NPPN)
          </h3>
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
              <RekapitulasiPenghasilanNeto />
            </div>
          </div>
      </div>
      </div>
    </div>
  );
}
