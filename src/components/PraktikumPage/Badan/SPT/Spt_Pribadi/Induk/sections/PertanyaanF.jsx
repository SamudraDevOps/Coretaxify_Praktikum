import React, { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import Select from "react-select";
import { parseFormattedNumber, formatRupiah } from "@utils/formatCurrency";

const PertanyaanF = () => {
  const [showPembetulanSPT, setShowPembetulanSPT] = useState(false);

  // State untuk Bagian F - PEMBETULAN
  const [amounts, setAmounts] = useState({
    r12a: 0,
    r12b: 0,
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
      r10a: {
        yes: "Ya, Silahkan Mengisi Lampiran 1 Bagian E",
        no: "Tidak, Lanjutkan pertanyaan 1.b.1",
      },
      r10d: {
        yes: "Ya, Isi dengan Jumlah Pengembalian/Pengurangan Kredit PPh Luar Negeri",
        no: "Tidak, Lanjutkan pertanyaan 1.c",
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
      {/* F. PEMBETULAN */}
      <div
        className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
        onClick={() => setShowPembetulanSPT(!showPembetulanSPT)}
      >
        <h3 className="text-lg font-semibold">
          F. PEMBETULAN (DIISI JIKA STATUS SPT ADALAH PEMBETULAN)
        </h3>
        <span
          className={`transition-transform duration-500 ease-in-out ${
            showPembetulanSPT ? "rotate-180" : "rotate-0"
          }`}
        >
          <FaChevronDown />
        </span>
      </div>

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          showPembetulanSPT ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="border rounded-md p-4 mb-4">
          <div className="divide-y">
            {/* 12a */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">12a</span>
                <span className="text-gray-800 text-base font-medium">
                  PPh Kurang/Lebih Bayar pada SPT yang dibetulkan{" "}
                </span>
              </div>
              <div className="col-span-12 md:col-span-5"></div>
              <div className="col-span-12 md:col-span-2">
                <input
                  type="text"
                  min={0}
                  value={formatRupiah(amounts.r12a).replace(/^Rp\s?/, "")} // Hilangkan "Rp" di depan dengan menggunakan replace(/^Rp\s?/, "")
                  onChange={handleAmountChange("r12a")}
                  className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                />
              </div>
            </div>

            {/* 12b */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">12b</span>
                <span className="text-gray-800 text-base font-medium">
                  PPh Kurang/Lebih Bayar Karena Pembetulan (11a - 12a){" "}
                </span>
              </div>
              <div className="col-span-12 md:col-span-5"></div>
              <div className="col-span-12 md:col-span-2">
                <input
                  type="text"
                  min={0}
                  value={formatRupiah(amounts.r12b).replace(/^Rp\s?/, "")} // Hilangkan "Rp" di depan dengan menggunakan replace(/^Rp\s?/, "")
                  onChange={handleAmountChange("r12b")}
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

export default PertanyaanF;
