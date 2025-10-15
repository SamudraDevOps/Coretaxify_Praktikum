import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import HeaderLampiran from "./HeaderLampiran";
import { PenghasilanKenaPajak, PenghasilanTidakObjekPajak, PenghasilanLuarNegeri } from "./sections/Lampiran2";

const Lampiran_2 = ({ data }) => {
  const [showBagianA, setShowBagianA] = useState(true);
  const [showBagianB, setShowBagianB] = useState(true);
  const [showBagianC, setShowBagianC] = useState(true);

  return (
    <div className="space-y-4">
      <ul className="space-y-2 pl-3">
        {["A. INCOME - SUBJECT TO FINAL TAX", "B. INCOME - EXCLUDE FROM TAX"].map((t, i) => (
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

      {/* Bagian A - Penghasilan yang dikenakan pajak penghasilan bersifat Final */}
      <div>
        <div
          className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
          onClick={() => setShowBagianA(!showBagianA)}
        >
          <h3 className="text-lg font-semibold">
            A. PENGHASILAN YANG DIKENAKAN PAJAK PENGHASILAN BERSIFAT FINAL
          </h3>
          {showBagianA ? <FaChevronUp /> : <FaChevronDown />}
        </div>

        {showBagianA && (
          <div className="border rounded-md p-4 space-y-4">
            {/* Sub-Bagian A.1 - Harta Tidak Bergerak */}
            <div className="ml-4">
              <PenghasilanKenaPajak />
            </div>
          </div>
        )}
      </div>

      {/* Bagian B - Penghasilan yang Tidak Termasuk Objek Pajak */}
      <div>
        <div
          className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
          onClick={() => setShowBagianB(!showBagianB)}
        >
          <h3 className="text-lg font-semibold">B. PENGHASILAN YANG TIDAK TERMASUK OBJEK PAJAK</h3>
          {showBagianB ? <FaChevronUp /> : <FaChevronDown />}
        </div>

        {showBagianB && (
          <div className="border rounded-md p-4 space-y-4">
            {/* Sub-Bagian B.1 - Penghasilan Tidak Objek Pajak */}
            <div className="ml-4">
              <PenghasilanTidakObjekPajak />
            </div>
          </div>
        )}
      </div>

       {/* Bagian C - Penghasilan Luar Negeri */}
      <div>
        <div
          className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
          onClick={() => setShowBagianC(!showBagianC  )}
        >
          <h3 className="text-lg font-semibold">C. PENGHASILAN LUAR NEGERI</h3>
          {showBagianC ? <FaChevronUp /> : <FaChevronDown />}
        </div>

        {showBagianC && (
          <div className="border rounded-md p-4 space-y-4">
            {/* Sub-Bagian C.1 - Penghasilan Luar Negeri */}
            <div className="ml-4">
              <PenghasilanLuarNegeri />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Lampiran_2;
