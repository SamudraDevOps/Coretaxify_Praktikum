import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import HeaderLampiran from "./HeaderLampiran";
import LabaRugi from "@sections/Lampiran3/Lampiran3A-1/BagianA";
import Neraca from "@sections/Lampiran3/Lampiran3A-1/BagianB";

export default function Lampiran_3A1({ data }) {
  const [showBagianA, setShowBagianA] = useState(true);
  const [showBagianB, setShowBagianB] = useState(true);

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
          {showBagianA ? <FaChevronUp /> : <FaChevronDown />}
        </div>

        {showBagianA && (
          <div className="border rounded-md p-4 space-y-4">
            <div className="ml-4">
              {/* tampilkan seluruh form + tabel di sini */}
              <LabaRugi />
            </div>
          </div>
        )}
      </div>

      {/* Bagian B - Laporan Posisi Keuangan (Neraca) */}
      <div>
        <div
          className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
          onClick={() => setShowBagianB(!showBagianB)}
        >
          <h3 className="text-lg font-semibold">A.2. LAPORAN POSISI KEUANGAN (NERACA)</h3>
          {showBagianB ? <FaChevronUp /> : <FaChevronDown />}
        </div>

        {showBagianB && (
          <div className="border rounded-md p-4 space-y-4">
            <div className="ml-4">
              {/* tampilkan seluruh form + tabel di sini */}
              <Neraca />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
