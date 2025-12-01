import React, { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import Select from "react-select";
import { parseFormattedNumber, formatRupiah } from "@utils/formatCurrency";

const PertanyaanH = ({ onAnswerChange, answersState }) => {
  const [showAngsuran, setShowAngsuran] = useState(false);

  const [amounts, setAmounts] = useState({    
    r13a: 0,
    r13b: 0,
    r13c: 0,
  });

  const[radios, setRadios] = useState({
    r13a: null,
    r13b: null,
    r13c: null,
  })
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

  const handleSelectChange = (field, value) => {
    setRadios((prev) => ({ ...prev, [field]: value }));
    onAnswerChange?.(field, value);
  };

  const DEFAULT_NULL_TEXT = "Pilih salah satu Ya/Tidak";

    const HELPER_CONFIG = {
    r13a: {
      yes: "Ya, angsuran PPh pasal 25nya adalah 1/(12 atau banyaknya bulan dalam bagian tahun pajak) x Point (9-10a)",
      no: "Tidak, Lanjutkan ke pertanyaan berikutnya",
    },
    r13b: {
      yes: "Ya, Isi lampiran 4 (L-4) Bagian A",
      no: "Tidak, Lanjutkan ke pertanyaan berikutnya",
    },
    r13c: {
      yes: "Ya, Angsuran PPh Pasal 25 adalah 0.75% dari penghasilan bruto setiap bulan dari masing-masing tempat usaha",
      no: "Tidak, Tidak memiliki kewajiban untuk membayar angsuran PPh Pasal 25",
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
      {/* H. Angsuran PPh Pasal 25 Tahun Pajak Berikutnya */}
      <div
        className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
        onClick={() => setShowAngsuran(!showAngsuran)}
      >
        <h3 className="text-lg font-semibold">H. ANGSURAN PPh PASAL 25 TAHUN PAJAK BERIKUTNYA</h3>
        <span
          className={`transition-transform duration-500 ease-in-out ${
            showAngsuran ? "rotate-180" : "rotate-0"
          }`}
        >
          <FaChevronDown />
        </span>{" "}
      </div>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          showAngsuran ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="border rounded-md p-4 mb-4">
          <div className="divide-y">
            {/* 13a */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">13a</span>
                <span className="text-gray-800 text-base font-medium">
                  Apakah Hanya Menerima Penghasilan Teratur dan berkewajiban membayar angsuran PPh
                  Pasal 25 tahun pajak berikutnya
                  <span className="text-red-500">*</span>
                </span>
              </div>
              <div className="col-span-12 md:col-span-2">
                <div className="flex items-center gap-6">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r13a"
                      checked={radios.r13a === true}
                      // change
                      onChange={() => handleRadioChange("r13a", true)}
                    />
                    <span>Ya</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r13a"
                      checked={radios.r13a === false}
                      onChange={() => handleRadioChange("r13a", false)}
                    />
                    <span>Tidak</span>
                  </label>
                </div>
              </div>
              <div className="col-span-12 md:col-span-3 text-sm">
                <div className="bg-blue-100 rounded px-3 py-2">
                  {getHelperMessage("r13a", radios.r13a)}
                </div>
              </div>
              <div className="col-span-12 md:col-span-2">
                <input
                  type="text"
                  min={0}
                  value={formatRupiah(amounts.r13a).replace(/^Rp\s?/, "")} // Hilangkan "Rp" di depan dengan menggunakan replace(/^Rp\s?/, "")
                  onChange={handleAmountChange("r13a")}
                  className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                />
              </div>
            </div>

            {/* 13b */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">13b</span>
                <span className="text-gray-800 text-base font-medium">
                  Apakah anda menyusun perhitungan tersendiri angsuran PPh pasal 25 Tahun pajak
                  berikutnya ?<span className="text-red-500">*</span>
                </span>
              </div>
              <div className="col-span-12 md:col-span-2">
                <div className="flex items-center gap-6">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r13b"
                      checked={radios.r13b === true}
                      onChange={() => handleRadioChange("r13b", true)}
                    />
                    <span>Ya</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r13b"
                      checked={radios.r13b === false}
                      onChange={() => handleRadioChange("r13b", false)}
                    />
                    <span>Tidak</span>
                  </label>
                </div>
              </div>
              <div className="col-span-12 md:col-span-3 text-sm">
                <div className="bg-blue-100 rounded px-3 py-2">
                  {getHelperMessage("r13b", radios.r13b)}
                </div>
              </div>
              <div className="col-span-12 md:col-span-2">
                <input
                  type="text"
                  min={0}
                  value={formatRupiah(amounts.r13b).replace(/^Rp\s?/, "")} // Hilangkan "Rp" di depan dengan menggunakan replace(/^Rp\s?/, "")
                  onChange={handleAmountChange("r13b")}
                  className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                />
              </div>
            </div>

            {/* 13c */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">13c</span>
                <span className="text-gray-800 text-base font-medium">
                  Apakah anda membayar angsuran PPh Pasal 25 OPPT Tahun Pajak Berikutnya{" "}
                  <span className="text-red-500">*</span>
                </span>
              </div>
              <div className="col-span-12 md:col-span-2">
                <div className="flex items-center gap-6">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r13c"
                      checked={radios.r13c === true}
                      onChange={() => handleRadioChange("r13c", true)}
                    />
                    <span>Ya</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r13c"
                      checked={radios.r13c === false}
                      onChange={() => handleRadioChange("r13c", false)}
                    />
                    <span>Tidak</span>
                  </label>
                </div>
              </div>
              <div className="col-span-12 md:col-span-3 text-sm">
                <div className="bg-blue-100 rounded px-3 py-2">
                  {getHelperMessage("r13c", radios.r13c)}
                </div>
              </div>
              <div className="col-span-12 md:col-span-2">
                <input
                  type="text"
                  min={0}
                  value={formatRupiah(amounts.r13c).replace(/^Rp\s?/, "")} // Hilangkan "Rp" di depan dengan menggunakan replace(/^Rp\s?/, "")
                  onChange={handleAmountChange("r13c")}
                  className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PertanyaanH;
