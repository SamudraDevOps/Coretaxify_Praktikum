import React, { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { parseFormattedNumber, formatRupiah } from "@utils/formatCurrency";

const PertanyaanE = ({ onAnswerChange, answersState }) => {
  const [showSection, setShowSection] = useState(false);

  const [r13, setR13] = useState(null);
  const [r14, setR14] = useState(null);
  const [r15, setR15] = useState(null);
  const [r16, setR16] = useState(null);

  useEffect(() => {
    if (answersState) {
    }
  }, [answersState]);

  const [amounts, setAmounts] = useState({
    r13: 0,
    r14: 0,
    r15: 0,
    r16: 0,
  });

  const [radios, setRadios] = useState({
    r13: null,
    r16: null,
  });

  const handleAmountChange = (field) => (e) => {
    const raw = e.target.value;

    if (raw.trim() === "") {
      setAmounts((prev) => ({ ...prev, [field]: 0 }));
      return;
    }

    const numeric = parseFormattedNumber(raw);
    setAmounts((prev) => ({ ...prev, [field]: numeric }));
    console.log("Amount changed:", field, numeric);
  };

  const handleRadioChange = (field, value) => {
    setRadios((prev) => ({ ...prev, [field]: value }));
    onAnswerChange?.(field, value);
    console.log("Radio changed:", field, value);

    // logic khusus: kalau field = false, reset amount
    // if (field === "r13" && value === false) {
    //   setAmounts((prev) => ({ ...prev, r13: 0 }));
    // }
  };

  const HELPER_CONFIG = {
    r13: {
      yes: "Ya, silahkan mengisi lampiran 3",
      no: "Tidak, silahkan lanjut pertanyaan berikutnya",
    },
    r16: {
      yes: "Ya, silahkan mengisi lampiran 13C",
      no: "Tidak, silahkan lanjut pertanyaan berikutnya",
    },
  };

  const DEFAULT_NULL_TEXT = "Pilih salah satu Ya/Tidak";

  const getHelperMessage = (field, value) => {
    const cfg = HELPER_CONFIG[field];
    if (!cfg) return "";

    if (value === true) return cfg.yes;
    if (value === false) return cfg.no;

    return DEFAULT_NULL_TEXT;
  };

  return (
    <>
      <div
        className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
        onClick={() => setShowSection(!showSection)}
      >
        <h3 className="text-lg font-semibold">E. PENGURANGAN PPh TERUTANG</h3>
        <span
          className={`transition-transform duration-500 ease-in-out ${
            showSection ? "rotate-180" : "rotate-0"
          }`}
        >
          <FaChevronDown />
        </span>
      </div>

      <div
        className={`transition-all duration-500 ease-in-out ${
          showSection ? " opacity-100 overflow-visible" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="border rounded-md p-4 mb-4">
          <div className="divide-y">
            {/* 13 */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">13</span>
                <span className="text-gray-800 text-base font-medium">
                  Apakah terdapat kredit pajak yang dibayarkan di luar negeri dan/atau
                  dipotong/pungut oleh pihak lain?
                  {/* <span className="text-red-500">*</span> */}
                </span>
              </div>
              <div className="col-span-12 md:col-span-2">
                <div className="flex items-center gap-6">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r13"
                      checked={radios.r13 === true}
                      // change
                      onChange={() => handleRadioChange("r13", true)}
                    />
                    <span>Ya</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r13"
                      checked={radios.r13 === false}
                      onChange={() => handleRadioChange("r13", false)}
                    />
                    <span>Tidak</span>
                  </label>
                </div>
              </div>
              <div className="col-span-12 md:col-span-2">
                <input
                  type="text"
                  min={0}
                  value={formatRupiah(amounts.r13).replace(/^Rp\s?/, "")} // Hilangkan "Rp" di depan dengan menggunakan replace(/^Rp\s?/, "")
                  onChange={handleAmountChange("r13")}
                  className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                />
              </div>
              <div className="col-span-12 md:col-span-3 text-sm">
                <div className="bg-blue-100 rounded px-3 py-2">
                  {getHelperMessage("r13", radios.r13)}
                </div>
              </div>
            </div>

            {/* 14 */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">14</span>
                <span className="text-gray-800 text-base font-medium">
                  Angsuran PPh Pasal 25
                  {/* <span className="text-red-500">*</span> */}
                </span>
              </div>
              <div className="col-span-12 md:col-span-2"></div>
              <div className="col-span-12 md:col-span-2">
                <input
                  type="text"
                  min={0}
                  value={formatRupiah(amounts.r14).replace(/^Rp\s?/, "")}
                  onChange={handleAmountChange("r14")}
                  className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                />
              </div>
            </div>

            {/* 15 */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">15</span>
                <span className="text-gray-800 text-base font-medium">
                  Surat Tagihan Pajak PPh Pasal 25 (hanya pokok pajak)
                  {/* <span className="text-red-500">*</span> */}
                </span>
              </div>
              <div className="col-span-12 md:col-span-2"></div>
              <div className="col-span-12 md:col-span-2">
                <input
                  type="text"
                  min={0}
                  value={formatRupiah(amounts.r15).replace(/^Rp\s?/, "")} // Hilangkan "Rp" di depan dengan menggunakan replace(/^Rp\s?/, "")
                  onChange={handleAmountChange("r15")}
                  className="w-full text-center p-2 border rounded-md text-sm"
                />
              </div>
            </div>

            {/* 16 */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">16</span>
                <span className="text-gray-800 text-base font-medium">
                  Apakah Wajib Pajak memperoleh Fasilitas Pengurangan PPh Badan?
                  <span className="text-red-500">*</span>
                </span>
              </div>
              <div className="col-span-12 md:col-span-2">
                <div className="flex items-center gap-6">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r16"
                      checked={radios.r16 === true}
                      // change
                      onChange={() => handleRadioChange("r16", true)}
                    />
                    <span>Ya</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r16"
                      checked={radios.r16 === false}
                      onChange={() => handleRadioChange("r16", false)}
                    />
                    <span>Tidak</span>
                  </label>
                </div>
              </div>
              <div className="col-span-12 md:col-span-2">
                <input
                  type="text"
                  min={0}
                  value={formatRupiah(amounts.r16).replace(/^Rp\s?/, "")} // Hilangkan "Rp" di depan dengan menggunakan replace(/^Rp\s?/, "")
                  onChange={handleAmountChange("r16")}
                  className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                />
              </div>
              <div className="col-span-12 md:col-span-3 text-sm">
                <div className="bg-blue-100 rounded px-3 py-2">
                  {getHelperMessage("r16", radios.r16)}
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
