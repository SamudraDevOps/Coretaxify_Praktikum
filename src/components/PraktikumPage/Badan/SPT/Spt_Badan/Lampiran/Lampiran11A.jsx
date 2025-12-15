import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Header from "./Header";
import BiayaPromosi from "./section/Lampiran11A/Bagian1";
import BiayaEntertaiment from "./section/Lampiran11A/Bagian2";
import DaftarPiutang from "./section/Lampiran11A/Bagian3";
import PemberiNatura from "./section/Lampiran11A/Bagian4/BagianA";
import RincianAtauPenggantian from "./section/Lampiran11A/Bagian4/BagianB";
import DaftarDebitur from "./section/Lampiran11A/Bagian5";

const Lampiran11A = ({ data }) => {
  const [showBagian1, setShowBagian1] = useState(true);
  const [showBagian2, setShowBagian2] = useState(true);
  const [showBagian3, setShowBagian3] = useState(true);
  const [showBagian4, setShowBagian4] = useState(true);
  const [showBagian5, setShowBagian5] = useState(true);

  const [showBagian4A, setShowBagian4A] = useState(true);
  const [showBagian4B, setShowBagian4B] = useState(true);

  return (
    <div className="space-y-4">
      <Header />

      {/* I. DAFTAR NOMINATIF BIAYA PROMOSI DAN PENJUAAN, SERTA PENGGANTIAN ATAU IMBALAN DALAM BENTUK NATURA DAN/ATAU KENIKMATAN */}
      <div>
        <div
          className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
          onClick={() => setShowBagian1(!showBagian1)}
        >
          <h3 className="text-lg font-semibold">
            I. DAFTAR NOMINATIF BIAYA PROMOSI DAN PENJUAAN, SERTA PENGGANTIAN ATAU IMBALAN DALAM
            BENTUK NATURA DAN/ATAU KENIKMATAN
          </h3>
          <span
            className={`transition-transform duration-500 ease-in-out ${
              showBagian1 ? "rotate-180" : "rotate-0"
            }`}
          >
            <FaChevronDown />
          </span>
        </div>
        <div
          className={`overflow-hidden transition-all duration-1000 ease-in-out ${
            showBagian1 ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="border rounded-md p-4 space-y-4">
            <div className="ml-4">
              <BiayaPromosi />
            </div>
          </div>
        </div>
      </div>

      {/* II. DAFTAR NOMINATIF BIAYA ENTERTAINMENT*/}
      <div>
        <div
          className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
          onClick={() => setShowBagian2(!showBagian2)}
        >
          <h3 className="text-lg font-semibold">II. DAFTAR NOMINATIF BIAYA ENTERTAINMENT</h3>
          <span
            className={`transition-transform duration-500 ease-in-out ${
              showBagian2 ? "rotate-180" : "rotate-0"
            }`}
          >
            <FaChevronDown />
          </span>
        </div>
        <div
          className={`overflow-hidden transition-all duration-1000 ease-in-out ${
            showBagian2 ? " opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="border rounded-md p-4 space-y-4">
            <div className="ml-4">
              <BiayaEntertaiment />
            </div>
          </div>
        </div>
      </div>

      {/* III. DAFTAR PIUTANG YANG NYATA-NYATA TIDAK DAPAT DITAGIH*/}
      <div>
        <div
          className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
          onClick={() => setShowBagian3(!showBagian3)}
        >
          <h3 className="text-lg font-semibold">
            III. DAFTAR PIUTANG YANG NYATA-NYATA TIDAK DAPAT DITAGIH
          </h3>
          <span
            className={`transition-transform duration-1000 ease-in-out ${
              showBagian3 ? "rotate-180" : "rotate-0"
            }`}
          >
            <FaChevronDown />
          </span>
        </div>
        <div
          className={`overflow-hidden transition-all duration-1000 ease-in-out ${
            showBagian3 ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="border rounded-md p-4 space-y-4">
            <div className="ml-4">
              <DaftarPiutang />
            </div>
          </div>
        </div>
      </div>

      {/* Bagian IV. RINCIAN BAGI WAJIB PAJAK PEMBERI NATURA DAN/ATAU KENIKMATAN */}
      <div>
        <div
          className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
          onClick={() => setShowBagian4(!showBagian4)}
        >
          <h3 className="text-lg font-semibold">
            IV. RINCIAN BAGI WAJIB PAJAK PEMBERI NATURA DAN/ATAU KENIKMATAN{" "}
          </h3>
          <span
            className={`transition-transform duration-500 ease-in-out ${
              showBagian4 ? "rotate-180" : "rotate-0"
            }`}
          >
            <FaChevronDown />
          </span>
        </div>
        <div
          className={`overflow-hidden transition-all duration-1000 ease-in-out ${
            showBagian4 ? " opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="border rounded-md p-4 space-y-4">
            {/* Sub-Bagian IV.A DAFTAR SARAN DAN FASILITAS SERTA PENYUSUTAN  */}
            <div className="ml-4">
              <div
                className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
                onClick={() => setShowBagian4A(!showBagian4A)}
              >
                <h4 className="text-lg font-semibold">
                  IV.A DAFTAR SARAN DAN FASILITAS SERTA PENYUSUTAN
                </h4>
                <span
                  className={`transition-transform duration-500 ease-in-out ${
                    showBagian4A ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <FaChevronDown />
                </span>
              </div>
              <div
                className={`overflow-hidden transition-all duration-1000 ease-in-out ${
                  showBagian4A ? " opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="border rounded-md p-4">
                  <PemberiNatura />
                </div>
              </div>
            </div>

            {/* Sub-Bagian IV.B RINCIAN PENGGANTIAN ATAU IMBALAN DALAM BENTUK NATURA DAN/ATAU KENIKMATAN YANG DIBERIKAN BERKENAAN DENGAN PELAKSANAAN PEKERJAAN DI DAERAH TERTENTU    */}
            <div className="ml-4">
              <div
                className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
                onClick={() => setShowBagian4B(!showBagian4B)}
              >
                <h4 className="text-lg font-semibold">
                  IV.A RINCIAN PENGGANTIAN ATAU IMBALAN DALAM BENTUK NATURA DAN/ATAU KENIKMATAN YANG
                  DIBERIKAN BERKENAAN DENGAN PELAKSANAAN PEKERJAAN DI DAERAH TERTENTU
                </h4>
                <span
                  className={`transition-transform duration-1000 ease-in-out ${
                    showBagian4B ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <FaChevronDown />
                </span>
              </div>
              <div
                className={`overflow-hidden transition-all duration-1000 ease-in-out ${
                  showBagian4B ? " opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="border rounded-md p-4">
                  <RincianAtauPenggantian />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* V. DAFTAR DEBITUR NON-PERFORMING LOAN*/}
      <div>
        <div
          className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
          onClick={() => setShowBagian5(!showBagian5)}
        >
          <h3 className="text-lg font-semibold">V. DAFTAR DEBITUR NON-PERFORMING LOAN</h3>
          <span
            className={`transition-transform duration-500 ease-in-out ${
              showBagian5 ? "rotate-180" : "rotate-0"
            }`}
          >
            <FaChevronDown />
          </span>
        </div>
        <div
          className={`overflow-hidden transition-all duration-1000 ease-in-out ${
            showBagian5 ? " opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="border rounded-md p-4 space-y-4">
            <div className="ml-4">
              <DaftarDebitur />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lampiran11A;
