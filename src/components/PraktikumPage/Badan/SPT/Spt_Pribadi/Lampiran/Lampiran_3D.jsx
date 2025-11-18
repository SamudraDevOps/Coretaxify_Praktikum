import React, { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import HeaderLampiran from "./HeaderLampiran";
import BiayaEntertainment from "./sections/Lampiran3/Lampiran3D/BiayaEntertainment";
import BiayaPromosi from "./sections/Lampiran3/Lampiran3D/biayaPromosi";
import DaftarPiutang from "./sections/Lampiran3/Lampiran3D/DaftarPiutang";

export default function Lampiran_3D({ data }) {
  const [showBagianA, setShowBagianA] = useState(true);
  const [showBagianB, setShowBagianB] = useState(true);
  const [showBagianC, setShowBagianC] = useState(true);

  return (
    <div className="space-y-4 ">
      <ul className="space-y-2 pl-3">
        {[
          "A. DAFTAR NOMINATOF BIAYA ENTERTAIMENT",
          "B. DAFTAR NOMINATOF BIAYA PROMOSI SERTA PENGGANTIAN ATAU IMBALAN DALAM BENTUK NATURA DAN/ATAU KENIKMATAN",
          "C. DAFTAR PIUTANG YANG NYATA-NYATA TIDAK DAPAT DITAGIH",
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

      {/* Bagian A - DAFTAR NOMINATIF BIAYA ENTERTAINMEN */}
      <div>
        <div
          className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
          onClick={() => setShowBagianA(!showBagianA)}
        >
          <h3 className="text-lg font-semibold">A. DAFTAR NOMINATIF BIAYA ENTERTAINMEN</h3>
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
              <BiayaEntertainment />
            </div>
          </div>
          </div>
      </div>

      {/* Bagian B - Daftar Nominatif Biaya Promosi Serta Penggantian Atau 
Imbalan Dalam Bentuk Naturan Dan/Atau Kenikmatan  */}
      <div>
        <div
          className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
          onClick={() => setShowBagianB(!showBagianB)}
        >
          <h3 className="text-lg font-semibold">
            B. DAFTAR NOMINATIF BIAYA PROMOSI SERTA PENGGANTIAN ATAU IMBALAN DALAM BENTUK NATURAN
            DAN/ATAU KENIKMATAN
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
              <BiayaPromosi />
            </div>
          </div>
          </div>
      </div>

      {/* Bagian C - Daftar Piutang Yang Nyata-Nyata Tidak Dapat Ditagih   */}
      <div>
        <div
          className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
          onClick={() => setShowBagianC(!showBagianC)}
        >
          <h3 className="text-lg font-semibold">
            C. DAFTAR PIUTANG YANG NYATA-NYATA TIDAK DAPAT DITAGIH
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
              <DaftarPiutang />
            </div>
          </div>
      </div>
    </div>
    </div>
  );
}
