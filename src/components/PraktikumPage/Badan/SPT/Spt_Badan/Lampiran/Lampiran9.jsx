import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Header from "./Header";
import Kelompok1Index from "./section/Lampiran9/HartaBerwujud/Kelompok1";
import Kelompok2Index from "./section/Lampiran9/HartaBerwujud/Kelompok2";
import Kelompok3Index from "./section/Lampiran9/HartaBerwujud/Kelompok3";
import Kelompok4Index from "./section/Lampiran9/HartaBerwujud/Kelompok4";
import KelompokLainnyaIndex from "./section/Lampiran9/HartaBerwujud/kelompokLainnya";

// import RekapitulasiBruto from "./section/Lampiran5/BagianB/";

const Lampiran5 = ({ data }) => {
  const [showBagian1, setShowBagian1] = useState(true);
  const [showBagianB, setShowBagianB] = useState(true);

  const [showsubKelompok1, setShowsubKelompok1] = useState(false);
  const [showsubKelompok2, setShowsubKelompok2] = useState(false);
  const [showsubKelompok3, setShowsubKelompok3] = useState(false);
  const [showsubKelompok4, setShowsubKelompok4] = useState(false);
  const [showsubKelompokLainnya, setShowsubKelompokLainnya] = useState(false);

  return (
    <div className="space-y-4">
      <Header />
      {/* Bagian A - HARTA BERWUJUD */}
      <div>
        <div
          className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
          onClick={() => setShowBagian1(!showBagian1)}
        >
          <h3 className="text-lg font-semibold">A. HARTA BERWUJUD </h3>
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
            showBagian1 ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="border rounded-md p-4 space-y-4">
            {/* Sub-Bagian Kelompok 1  */}
            <div className="ml-4">
              <div
                className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
                onClick={() => setShowsubKelompok1(!showsubKelompok1)}
              >
                <h4 className="text-lg font-semibold">KELOMPOK 1</h4>
                <span
                  className={`transition-transform duration-500 ease-in-out ${
                    showsubKelompok1 ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <FaChevronDown />
                </span>
              </div>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  showsubKelompok1 ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="border rounded-md p-4">
                  <Kelompok1Index />
                </div>
              </div>
            </div>

            {/* Sub-Bagian Kelompok 2  */}
            <div className="ml-4">
              <div
                className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
                onClick={() => setShowsubKelompok2(!showsubKelompok2)}
              >
                <h4 className="text-lg font-semibold">KELOMPOK 2</h4>
                <span
                  className={`transition-transform duration-500 ease-in-out ${
                    showsubKelompok2 ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <FaChevronDown />
                </span>
              </div>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  showsubKelompok2 ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="border rounded-md p-4">
                  <Kelompok2Index />
                </div>
              </div>
            </div>

            {/* Sub-Bagian Kelompok 3  */}
            <div className="ml-4">
              <div
                className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
                onClick={() => setShowsubKelompok3(!showsubKelompok3)}
              >
                <h4 className="text-lg font-semibold">KELOMPOK 3</h4>
                <span
                  className={`transition-transform duration-500 ease-in-out ${
                    showsubKelompok3 ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <FaChevronDown />
                </span>
              </div>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  showsubKelompok3 ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="border rounded  npm-md p-4">
                  <Kelompok3Index />
                </div>
              </div>
            </div>

            {/* Sub-Bagian Kelompok 4  */}
            <div className="ml-4">
              <div
                className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
                onClick={() => setShowsubKelompok4(!showsubKelompok4)}
              >
                <h4 className="text-lg font-semibold">KELOMPOK 4</h4>
                <span
                  className={`transition-transform duration-500 ease-in-out ${
                    showsubKelompok4 ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <FaChevronDown />
                </span>
              </div>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  showsubKelompok4 ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="border rounded  npm-md p-4">
                  <Kelompok4Index />
                </div>
              </div>
            </div>

            {/* Sub-Bagian Kelompok Lainnya */}
            <div className="ml-4">
              <div
                className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
                onClick={() => setShowsubKelompokLainnya(!showsubKelompokLainnya)}
              >
                <h4 className="text-lg font-semibold">KELOMPOK LAINNYA</h4>
                <span
                  className={`transition-transform duration-500 ease-in-out ${
                    showsubKelompok4 ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <FaChevronDown />
                </span>
              </div>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  showsubKelompokLainnya ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="border rounded  npm-md p-4">
                  <KelompokLainnyaIndex />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lampiran5;
