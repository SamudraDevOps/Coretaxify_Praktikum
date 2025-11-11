import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import HeaderLampiran from "./HeaderLampiran";
import KompensasiKerugian from "@sections/Lampiran5";

export default function Lampiran_5({ data }) {
  const [showBagianA, setShowBagianA] = useState(true);

  return (
    <div className="space-y-4">
      <ul className="space-y-2 pl-3">
        {[
          "A. PERHITUNGAN ANGSURAN PAJAK PENGHASILAN UNTUK TAHUN PAJAK BERIKUTNYA",
          "B. PERHITUNGAN PPh TERUTANG WAJIB PAJAK DAN SUAMI/ISTRI",
        ].map((t, i) => (
          <li
            key={i}
            className="relative pl-5 uppercase tracking-wide
                       before:content-['•'] before:absolute before:left-0
                      before:text-black before:font-extrabold before:text-xl"
          >
            {t}
          </li>
        ))}
      </ul>
      <HeaderLampiran />

      {/* Bagian A */}
      <div>
        <div
          className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
          onClick={() => setShowBagianA(!showBagianA)}
        >
          <h3 className="text-lg font-semibold">A. PERHITUNGAN KOMPENSASI KERUGIAN FISKAL</h3>
          {showBagianA ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {showBagianA && (
          <div className="border rounded-md p-4 space-y-4">
            <KompensasiKerugian />
          </div>
        )}
      </div>
    </div>
  );
}
