import React, { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { parseFormattedNumber, formatRupiah } from "@utils/formatCurrency";

const PertanyaanG = ({ onAnswerChange, answersState }) => {
  const [showSection, setShowSection] = useState(false);
  const [r20, setR20] = useState(null);

  useEffect(() => {
    if (answersState) {
    }
  }, [answersState]);

  const [amounts, setAmounts] = useState({
    r20: 0,
  });

  const [radios, setRadios] = useState({
    r20: null,
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
    if (field === "r20" && value === false) {
      setAmounts((prev) => ({ ...prev, r20: 0 }));
    }
  };

  const DEFAULT_NULL_TEXT = "Pilih salah satu Ya/Tidak";

  const HELPER_CONFIG = {
    r20: {
      yes: "Ya, silahkan lanjut pertanyaan berikutnya. Pastikan anda menyampaikan Laporan Penghitungan PPh Pasal 25",
      no: "Tidak, silahkan mengisi lampiran 6",
    },
  };

  const getHelperMessage = (field, value) => {
    const cfg = HELPER_CONFIG[field];
    if (!cfg) return "";

    if (value === null || value === undefined || value === "") {
      return DEFAULT_NULL_TEXT;
    }

    // Case 1: Boolean (YES/NO)
    if (typeof value === "boolean") {
      return value ? cfg.yes : cfg.no;
    }

    // Case 2: Option select (option1, option2, dst)
    if (cfg[value]) {
      return cfg[value];
    }

    return DEFAULT_NULL_TEXT;
  };

  return (
    <>
      <div
        className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
        onClick={() => setShowSection(!showSection)}
      >
        <h3 className="text-lg font-semibold">
          G. PERHITUNGAN ANGSURAN PPh PASAL 25 TAHUN BERJALAN
        </h3>
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
          showSection ? "opacity-100 overflow-visible" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="border rounded-md p-4 mb-4">
          <div className="divide-y">
            {/* 20 */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">20</span>
                <span className="text-gray-800 text-base font-medium">
                  Apakah Wajib Pajak merupakan Wajib Pajak tertentu yang harus menyampaikan Laporan
                  Penghitungan Angsuran PPh Pasal 25?
                  <span className="text-red-500">*</span>
                </span>
              </div>
              <div className="col-span-12 md:col-span-2">
                <div className="flex items-center gap-6">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r20"
                      checked={radios.r20 === true}
                      onChange={() => handleRadioChange("r20", true)}
                    />
                    <span>Ya</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r20"
                      checked={radios.r20 === false}
                      onChange={() => handleRadioChange("r20", false)}
                    />
                    <span>Tidak</span>
                  </label>
                </div>
              </div>
              <div className="col-span-12 md:col-span-2">
                <input
                  type="text"
                  min={0}
                  value={formatRupiah(amounts.r20).replace(/^Rp\s?/, "")} // Hilangkan "Rp" di depan dengan menggunakan replace(/^Rp\s?/, "")
                  onChange={handleAmountChange("r20")}
                  readOnly={radios.r20 !== true}
                  className={`w-full text-center p-2 border rounded-md text-sm ${
                    radios.r20 === true ? "bg-white" : "bg-gray-200"
                  }`}
                />
              </div>
              <div className="col-span-12 md:col-span-3 text-sm">
                <div className="bg-blue-100 rounded px-3 py-2">
                  {getHelperMessage("r20", radios.r20)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PertanyaanG;
