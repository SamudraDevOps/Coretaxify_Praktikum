import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Header from "./Header";

import PenghasilanKenaPPhIndex from "./section/Lampiran4/BagianA";
import PenghasilanTidakObjekPajakIndex from "./section/Lampiran4/BagianB";

const Lampiran4 = ({ data }) => {
  const [showBagianA, setShowBagianA] = useState(true);
  const [showBagianB, setShowBagianB] = useState(true);

  return (
    <div className="space-y-4">
      <Header />

      {/* Bagian A - PENGHASILAN YANG DIKENAKAN PPh BERSIFAT FINAL */}
      <div>
        <div
          className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
          onClick={() => setShowBagianA(!showBagianA)}
        >
          <h3 className="text-lg font-semibold">
            A. PENGHASILAN YANG DIKENAKAN PPh BERSIFAT FINAL
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
              <PenghasilanKenaPPhIndex />
            </div>
          </div>
        </div>
      </div>

      {/* Bagian B - PENGHASILAN YANG TIDAK TERMASUK OBEJEK PAJAK */}
      <div>
        <div
          className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
          onClick={() => setShowBagianB(!showBagianB)}
        >
          <h3 className="text-lg font-semibold">A. PENGHASILAN YANG TIDAK TERMASUK OBEJEK PAJAK</h3>
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
              <PenghasilanTidakObjekPajakIndex />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lampiran4;
