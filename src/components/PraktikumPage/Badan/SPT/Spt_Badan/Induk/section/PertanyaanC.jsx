import React, { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { parseFormattedNumber, formatRupiah } from "@utils/formatCurrency";

const PertanyaanC = ({ onAnswerChange, answersState }) => {
  const [showSection, setShowSection] = useState(false);

  const [r1a, setR1a] = useState(null);
  const [r1b, setR1b] = useState(null);
  const [r2, setR2] = useState(null);
  const [r3, setR3] = useState(null);

  useEffect(() => {
    if (answersState) {
    }
  }, [answersState]);

  const [amounts, setAmounts] = useState({
    r2: 0,
    r3: 0,
  });

  const [radios, setRadios] = useState({
    r1a: null,
    r1b: null,
    r2: null,
    r3: null,
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

  const handleSelectChange = (field, value) => {
    setRadios((prev) => ({ ...prev, [field]: value }));
    onAnswerChange?.(field, value);
  };

  const DEFAULT_NULL_TEXT = "Pilih salah satu Ya/Tidak";

  const HELPER_CONFIG = {
    r1a: {
      yes: "Ya, silahkan mengisi lampiran 5",
      no: "Tidak, silahkan lanjut pertanyaan berikutnya",
    },
    r2: {
      yes: "Ya, silahkan mengisi Lampiran 4 Bagian A ",
      no: "Tidak, silahkan lanjut pertanyaan berikutnya",
    },
    r3: {
      yes: "Ya, silahkan mengisi Lampiran 4 Bagian B ",
      no: "Tidak, silahkan lanjut pertanyaan berikutnya",
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
          C. PENGHASILAN YANG DIKENAKAN PPh YANG BERSIFAT FINAL DAN YANG TIDAK TERMASUK OBJEK PAJAK
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
          showSection ? " opacity-100 overflow-visible" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="border rounded-md p-4 mb-4">
          <div className="divide-y">
            {/* 1.a */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">1.a.</span>
                <span className="text-gray-800 text-base font-medium">
                  Apakah Wajib Pajak menerima atau memperoleh penghasilan dari usaha dengan
                  peredaran bruto tertentu yang dikenakan PPh yang bersifat Final?
                  <span className="text-red-500">*</span>
                </span>
              </div>
              <div className="col-span-12 md:col-span-2">
                <div className="flex items-center gap-6">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r1a"
                      checked={radios.r1a === true}
                      // change
                      onChange={() => handleRadioChange("r1a", true)}
                    />
                    <span>Ya</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r1a"
                      checked={radios.r1a === false}
                      onChange={() => handleRadioChange("r1a", false)}
                    />
                    <span>Tidak</span>
                  </label>
                </div>
              </div>
              <div className="col-span-12 md:col-span-2">{/* Tidak ada input  */}</div>
              <div className="col-span-12 md:col-span-3 text-sm">
                <div className="bg-blue-100 rounded px-3 py-2">
                  {getHelperMessage("r1a", radios.r1a)}
                </div>
              </div>
            </div>

            {/* 1.b */}
            {/* <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">1.b.</span>
                <span className="text-gray-800 text-base font-medium">
                  Apakah penghasilan Wajib Pajak semata-mata hanya penghasilan dari usaha dengan
                  peredaran bruto tertentu yang dikenakan PPh yang bersifat Final?
                  <span className="text-red-500">*</span>
                </span>
              </div>
              <div className="col-span-12 md:col-span-2">
                <div className="flex items-center gap-6">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r1b"
                      checked={r1b === true}
                      // change
                      onChange={() => handler1bChange(true)}
                    />
                    <span>Ya</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r1b"
                      checked={r1b === false}
                      onChange={() => handler1bChange(false)}
                    />
                    <span>Tidak</span>
                  </label>
                </div>
              </div>
              <div className="col-span-12 md:col-span-2">
                <input
                  type="number"
                  min={0}
                  value={amt1b}
                  onChange={(e) => setamt1b(+e.target.value || 0)}
                  className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                />
              </div>{" "}
              <div className="col-span-12 md:col-span-3 text-sm">
                <div className="bg-blue-100 rounded px-3 py-2">
                  {r1b === true && "Ya, silahkan lanjut pertanyaan berikutnya. "}
                  {r1b === false && "Tidak, jawablah pertanyaan di bagian D dibawah"}
                  {r1b === null && "Pilih salah satu Ya/Tidak"}
                </div>
              </div>
            </div> */}

            {/* 2 */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">1.b.</span>
                <span className="text-gray-800 text-base font-medium">
                  Apakah Wajib Pajak menerima atau memperoleh penghasilan yang dikenakan PPh yang
                  bersifat final? <span className="text-red-500">*</span>
                </span>
              </div>
              <div className="col-span-12 md:col-span-2">
                <div className="flex items-center gap-6">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r2"
                      checked={radios.r2 === true}
                      // change
                      onChange={() => handleRadioChange("r2", true)}
                    />
                    <span>Ya</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r2"
                      checked={radios.r2 === false}
                      onChange={() => handleRadioChange("r2", false)}
                    />
                    <span>Tidak</span>
                  </label>
                </div>
              </div>
              <div className="col-span-12 md:col-span-2">
                <input
                  type="text"
                  min={0}
                  value={formatRupiah(amounts.r2).replace(/^Rp\s?/, "")} // Hilangkan "Rp" di depan dengan menggunakan replace(/^Rp\s?/, "")
                  onChange={handleAmountChange("r2")}
                  className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                />
              </div>
              <div className="col-span-12 md:col-span-3 text-sm">
                <div className="bg-blue-100 rounded px-3 py-2">
                  {getHelperMessage("r2", radios.r2)}
                </div>
              </div>
            </div>

            {/* 3 */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">1.b.</span>
                <span className="text-gray-800 text-base font-medium">
                  Apakah Wajib Pajak menerima atau memperoleh penghasilan yang tidak termasuk objek
                  pajak? <span className="text-red-500">*</span>
                </span>
              </div>
              <div className="col-span-12 md:col-span-2">
                <div className="flex items-center gap-6">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r3"
                      checked={radios.r3 === true}
                      // change
                      onChange={() => handleRadioChange("r3", true)}
                    />
                    <span>Ya</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r3"
                      checked={radios.r3 === false}
                      onChange={() => handleRadioChange("r3", false)}
                    />
                    <span>Tidak</span>
                  </label>
                </div>
              </div>
              <div className="col-span-12 md:col-span-2">
                <input
                  type="text"
                  min={0}
                  value={formatRupiah(amounts.r3).replace(/^Rp\s?/, "")} // Hilangkan "Rp" di depan dengan menggunakan replace(/^Rp\s?/, "")
                  onChange={handleAmountChange("r3")}
                  className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                />
              </div>
              <div className="col-span-12 md:col-span-3 text-sm">
                <div className="bg-blue-100 rounded px-3 py-2">
                  {getHelperMessage("r3", radios.r3)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PertanyaanC;
