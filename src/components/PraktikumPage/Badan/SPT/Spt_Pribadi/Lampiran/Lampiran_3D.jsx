import React, { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import HeaderLampiran from "./HeaderLampiran";
import BiayaEntertainment from "./sections/Lampiran3/Lampiran3D/BiayaEntertainment";

export default function Lampiran_3({ data }) {
  const [showBagianA, setShowBagianA] = useState(true);

  const [showBiayaHiburan, setShowBiayaHiburan] = useState(false);

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
          {showBagianA ? <FaChevronUp /> : <FaChevronDown />}
        </div>

        {showBagianA && (
          <div className="border rounded-md p-4 space-y-4">
            <div className="ml-4">
              <BiayaEntertainment />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
