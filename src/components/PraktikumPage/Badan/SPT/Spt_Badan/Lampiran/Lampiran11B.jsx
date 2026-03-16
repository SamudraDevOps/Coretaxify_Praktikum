import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Header from "./Header";
import PerhitunganEBITDA from "./section/Lampiran11B/Bagian1";
import RataRataUtang from "./section/Lampiran11B/Bagian2/BagianA";
import RataRataModal from "./section/Lampiran11B/Bagian2/BagianB";
import PerhitunganDer from "./section/Lampiran11B/Bagian2/BagianC";
import BiayaPinjaman from "./section/Lampiran11B/Bagian3";

const Lampiran11B = ({ data }) => {
  const [showBagian1, setShowBagian1] = useState(true);
  const [showBagian2, setShowBagian2] = useState(true);
  const [showBagian3, setShowBagian3] = useState(true);

  const [showBagian2A, setShowBagian2A] = useState(true);
  const [showBagian2B, setShowBagian2B] = useState(true);
  const [showBagian2C, setShowBagian2C] = useState(true);

  // State untuk menerima total dari BagianA dan BagianB
  const [totalRataRataUtang, setTotalRataRataUtang] = useState(0);
  const [totalRataRataModal, setTotalRataRataModal] = useState(0);

  return (
    <div className="space-y-4">
      <Header />

      {/* I. PERHITUNGAN EBITDA */}
      <div>
        <div
          className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
          onClick={() => setShowBagian1(!showBagian1)}
        >
          <h3 className="text-lg font-semibold">I. PERHITUNGAN EBITDA</h3>
          <span
            className={`transition-transform duration-500 ease-in-out ${
              showBagian1 ? "rotate-180" : "rotate-0"
            }`}
          >
            <FaChevronDown />
          </span>
        </div>
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            showBagian1 ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="border rounded-md p-4 space-y-4">
            <div className="ml-4">
              <PerhitunganEBITDA />
            </div>
          </div>
        </div>
      </div>

      {/* II. PERBANDINGAN ANTARA UTANG DAN MODAL (DEBT TO EQUITY RATIO)  */}
      <div>
        <div
          className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
          onClick={() => setShowBagian2(!showBagian2)}
        >
          <h3 className="text-lg font-semibold">
            II. PERBANDINGAN ANTARA UTANG DAN MODAL (DEBT TO EQUITY RATIO){" "}
          </h3>
          <span
            className={`transition-transform duration-500 ease-in-out ${
              showBagian2 ? "rotate-180" : "rotate-0"
            }`}
          >
            <FaChevronDown />
          </span>
        </div>
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            showBagian2 ? " opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="border rounded-md p-4 space-y-4">
            {/* Sub-Bagian A PERHITUNGAN RATA-RATA SALDO UTANG  */}
            <div className="ml-4">
              <div
                className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
                onClick={() => setShowBagian2A(!showBagian2A)}
              >
                <h4 className="text-lg font-semibold">A PERHITUNGAN RATA-RATA SALDO UTANG </h4>
                <span
                  className={`transition-transform duration-500 ease-in-out ${
                    showBagian2A ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <FaChevronDown />
                </span>
              </div>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  showBagian2A ? " opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="border rounded-md p-4">
                  <RataRataUtang onTotalChange={setTotalRataRataUtang} />
                </div>
              </div>
            </div>
          </div>

          <div className="border rounded-md p-4 space-y-4">
            {/* Sub-Bagian B PERHITUNGAN RATA-RATA SALDO MODAL  */}
            <div className="ml-4">
              <div
                className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
                onClick={() => setShowBagian2B(!showBagian2B)}
              >
                <h4 className="text-lg font-semibold">B PERHITUNGAN RATA-RATA SALDO MODAL </h4>
                <span
                  className={`transition-transform duration-500 ease-in-out ${
                    showBagian2B ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <FaChevronDown />
                </span>
              </div>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  showBagian2B ? " opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="border rounded-md p-4">
                  <RataRataModal onTotalChange={setTotalRataRataModal} />
                </div>
              </div>
            </div>
          </div>

          <div className="border rounded-md p-4 space-y-4">
            {/* Sub-Bagian C PERHITUNGAN BESARNYA PERBANDINGAN ANTARA UTANG DAN MODAL (DEBT TO EQUITY RATIO)  */}
            <div className="ml-4">
              <div
                className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
                onClick={() => setShowBagian2C(!showBagian2C)}
              >
                <h4 className="text-lg font-semibold">
                  C PERHITUNGAN BESARNYA PERBANDINGAN ANTARA UTANG DAN MODAL (DEBT TO EQUITY RATIO){" "}
                </h4>
                <span
                  className={`transition-transform duration-500 ease-in-out ${
                    showBagian2C ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <FaChevronDown />
                </span>
              </div>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  showBagian2C ? " opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="border rounded-md p-4">
                  <PerhitunganDer
                    totalRataRataUtang={totalRataRataUtang}
                    totalRataRataModal={totalRataRataModal}
                  />{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* III. PERHITUNGAN BIAYA PIJAMAN */}
      <div>
        <div
          className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
          onClick={() => setShowBagian3(!showBagian3)}
        >
          <h3 className="text-lg font-semibold">III. PERHITUNGAN BIAYA PINJAMAN</h3>
          <span
            className={`transition-transform duration-500 ease-in-out ${
              showBagian3 ? "rotate-180" : "rotate-0"
            }`}
          >
            <FaChevronDown />
          </span>
        </div>
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            showBagian3 ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="border rounded-md p-4 space-y-4">
            <div className="ml-4">
              <BiayaPinjaman />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lampiran11B;
