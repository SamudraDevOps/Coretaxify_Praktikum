import React, { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { parseFormattedNumber, formatRupiah } from "@utils/formatCurrency";

const PertanyaanE = ({ onAnswerChange, answersState }) => {
  const [showSection, setShowSection] = useState(false);

  const [r1_3, setR1_3] = useState(null);
  const [r1_4, setR1_4] = useState(null);
  const [r1_5, setR1_5] = useState(null);
  const [r1_6, setR1_6] = useState(null);
  const [r1_7, setR1_7] = useState(null);

  useEffect(() => {
    if (answersState) {
    }
  }, [answersState]);

  const [radios, setRadios] = useState({
    r1_3: null,
    r1_4: null,
    r1_5: null,
    r1_6: null,
    r1_7: null,
  });

  const handleRadioChange = (field, value) => {
    setRadios((prev) => ({ ...prev, [field]: value }));
    onAnswerChange?.(field, value);
    console.log("Radio changed:", field, value);
  };

  return (
    <>
      <div>
        <div>
          <div className="divide-y">
            {/* 1 */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-8 flex gap-3 items-center">
                <span className=" text-gray-700 font-medium min-w-[3.5rem]">1.</span>
                <span className="text-gray-800 text-base font-bold">
                  Mengenai Hubungan Istimewa
                </span>
              </div>
            </div>

            {/* 2 */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center my-3">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]"></span>
                <span className="text-gray-800 text-base font-bold">
                  Bahwasanya kami telah menerapkan Prinsip Kewajaran dan Kelaziman Usaha{" "}
                  {/* <span className="text-red-500">*</span> */}
                </span>
              </div>
            </div>

            {/* 3 */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-8 flex gap-3 items-center my-3">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]"></span>
                <span className="text-gray-800 text-base font-medium">
                  Transaksi dengan pihak yang memiliki hubungan istimewa karena kepemilikan
                  saham/penyertaan
                  {/* <span className="text-red-500">*</span> */}
                </span>
              </div>
              <div className="col-span-12 md:col-span-2">
                <div className="flex items-center gap-6">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r1_3"
                      checked={radios.r1_3 === true}
                      // change
                      onChange={() => handleRadioChange("r1_3", true)}
                    />
                    <span>Ya</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r1_3"
                      checked={radios.r1_3 === false}
                      onChange={() => handleRadioChange("r1_3", false)}
                    />
                    <span>Tidak</span>
                  </label>
                </div>
              </div>
            </div>

            {/* 4 */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-8 flex gap-3 items-center my-3">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]"></span>
                <span className="text-gray-800 text-base font-medium">
                  Transaksi dengan pihak yang memiliki hubungan istimewa karena penguasaan
                </span>
              </div>
              <div className="col-span-12 md:col-span-2">
                <div className="flex items-center gap-6">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r1_4"
                      checked={radios.r1_4 === true}
                      // change
                      onChange={() => handleRadioChange("r1_4", true)}
                    />
                    <span>Ya</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r1_4"
                      checked={radios.r1_4 === false}
                      onChange={() => handleRadioChange("r1_4", false)}
                    />
                    <span>Tidak</span>
                  </label>
                </div>
              </div>
            </div>

            {/* 5 */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-8 flex gap-3 items-center my-3">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]"></span>
                <span className="text-gray-800 text-base font-medium">
                  Transaksi dengan pihak yang memiliki hubungan istimewa karena kepemilikan
                  saham/penyertaan {/* <span className="text-red-500">*</span> */}
                </span>
              </div>
              <div className="col-span-12 md:col-span-2">
                <div className="flex items-center gap-6">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r1_4"
                      checked={radios.r1_4 === true}
                      // change
                      onChange={() => handleRadioChange("r1_4", true)}
                    />
                    <span>Ya</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r1_4"
                      checked={radios.r1_4 === false}
                      onChange={() => handleRadioChange("r1_4", false)}
                    />
                    <span>Tidak</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PertanyaanE;
