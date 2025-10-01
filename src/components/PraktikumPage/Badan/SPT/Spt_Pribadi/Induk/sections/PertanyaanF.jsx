import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const PertanyaanF = () => {
  const [showPembetulanSPT, setShowPembetulanSPT] = useState(false);
  
  // State untuk Bagian F - PEMBETULAN
  const [r12a, setR12a] = useState(null);
  const [amt12a, setAmt12a] = useState(0);
  const [r12b, setR12b] = useState(null);
  const [amt12b, setAmt12b] = useState(0);

  return (
    <>
      {/* F. PEMBETULAN */}
      <div
        className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
        onClick={() => setShowPembetulanSPT(!showPembetulanSPT)}
      >
        <h3 className="text-lg font-semibold">
          F. PEMBETULAN (DIISI JIKA STATUS SPT ADALAH PEMBETULAN)
        </h3>
        {showPembetulanSPT ? <FaChevronUp /> : <FaChevronDown />}
      </div>
      {showPembetulanSPT && (
        <div className="border rounded-md p-4 mb-4">
          <div className="divide-y">
            {/* 12a */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">
                  12a
                </span>
                <span className="text-gray-800 text-base font-medium">
                  PPh Kurang/Lebih Bayar pada SPT yang dibetulkan{" "}
                </span>
              </div>
              <div className="col-span-12 md:col-span-5"></div>
              <div className="col-span-12 md:col-span-2">
                <input
                  type="number"
                  min={0}
                  value={amt12a}
                  onChange={(e) => setAmt12a(+e.target.value || 0)}
                  className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                />
              </div>
            </div>

            {/* 12b */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">
                  12b
                </span>
                <span className="text-gray-800 text-base font-medium">
                  PPh Kurang/Lebih Bayar Karena Pembetulan (11a - 12a){" "}
                </span>
              </div>
              <div className="col-span-12 md:col-span-5"></div>
              <div className="col-span-12 md:col-span-2">
                <input
                  type="number"
                  min={0}
                  value={amt12b}
                  onChange={(e) => setAmt12b(+e.target.value || 0)}
                  className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PertanyaanF;