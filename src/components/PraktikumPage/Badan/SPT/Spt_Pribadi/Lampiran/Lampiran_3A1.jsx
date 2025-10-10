import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import HeaderLampiran from "./HeaderLampiran";
import { PenghasilanKenaPajak, PenghasilanTidakObjekPajak, PenghasilanLuarNegeri } from "./sections";

const Lampiran_3A1 = ({ data }) => {
  const [showBagianA, setShowBagianA] = useState(true);
  const [showBagianB, setShowBagianB] = useState(true);
  const [showBagianC, setShowBagianC] = useState(true);

  return (
    <div className="space-y-4">
      <HeaderLampiran />

      {/* Bagian A - Penghasilan yang dikenakan pajak penghasilan bersifat Final */}
      <div>
        <div
          className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
          onClick={() => setShowBagianA(!showBagianA)}
        >
          <h3 className="text-lg font-semibold">
            A. PENGHASILAN NETO DARI USAHA DAN/ATAU PROFESI BEDASARKAN LAPORAN KEUANGAN
          </h3>
          {showBagianA ? <FaChevronUp /> : <FaChevronDown />}
        </div>

        {showBagianA && (
          <div className="border rounded-md p-4 space-y-4">
            {/* Sub-Bagian A.1 - Harta Tidak Bergerak */}
            <div className="ml-4">
              {/* <PenghasilanKenaPajak /> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Lampiran_3A1;
