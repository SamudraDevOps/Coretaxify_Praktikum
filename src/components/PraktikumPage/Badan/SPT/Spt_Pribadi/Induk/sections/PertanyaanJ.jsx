import React, { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import Select from "react-select";
import { parseFormattedNumber, formatRupiah } from "@utils/formatCurrency";

const PertanyaanJ = () => {
  const [showLampiranTambahan, setShowLampiranTambahan] = useState(false);

  // State untuk Bagian J - LAMPIRAN TAMBAHAN
  const[radios, setRadios] = useState({
    ra: null,
    rb: null,
    rc: null,
    rd: null,
    re: null,
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
    ra: {
      yes: "Ya, Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      no: "Tidak, Lanjutkan pertanyaan berikutnya", 
    },
    rb: {
      yes: "Ya, Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      no: "Tidak, Tidak ada Berkas yang perlu dilampirkan ",
    },
    rc: {
      yes: "Ya, Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      no: "Tidak, Tidak ada Berkas yang perlu dilampirkan ",
    },
    rd: {
      yes: "Ya, Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      no: "Tidak, Tidak ada Berkas yang perlu dilampirkan ",
    },
    re: {
      yes: "Ya, Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      no: "Tidak, Tidak ada Berkas yang perlu dilampirkan ",
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
        onClick={() => setShowLampiranTambahan(!showLampiranTambahan)}
      >
        <h3 className="text-lg font-semibold">J. LAMPIRAN TAMBAHAN</h3>
        <span
          className={`transition-transform duration-500 ease-in-out ${
            showLampiranTambahan ? "rotate-180" : "rotate-0"
          }`}
        >
          <FaChevronDown />
        </span>
      </div>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          showLampiranTambahan ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="border rounded-md p-4 mb-4">
          <div className="divide-y">
            {/* J-a*/}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">a</span>
                <span className="text-gray-800 text-base font-medium">
                  Laporan Keuangan / Laporan keuangan yang telah diaudit
                </span>
              </div>
              <div className="col-span-12 md:col-span-2">
                <div className="flex items-center gap-6">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="ra"
                      checked={radios.ra === true}
                      // change
                      onChange={() => handleRadioChange("ra", true)}
                    />
                    <span>Ya</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="ra"
                      checked={radios.ra === false}
                      onChange={() => handleRadioChange("ra", false)}
                    />
                    <span>Tidak</span>
                  </label>
                </div>
              </div>
              <div className="col-span-12 md:col-span-3 text-sm">
                <div className="bg-blue-100 rounded px-3 py-2">
                  {getHelperMessage("ra", radios.ra)}
                </div>
              </div>
            </div>

            {/* J-b*/}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">b</span>
                <span className="text-gray-800 text-base font-medium">
                  Bukti Pembayaran Zakat /sumbangan keagamaan
                  {/* <span className="text-red-500">*</span> */}
                </span>
              </div>
              <div className="col-span-12 md:col-span-2">
                <div className="flex items-center gap-6">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="rb"
                      checked={radios.rb === true}
                      onChange={() => handleRadioChange("rb", true)}
                    />
                    <span>Ya</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="rb"
                      checked={radios.rb === false}
                      onChange={() => handleRadioChange("rb", false)}
                    />
                    <span>Tidak</span>
                  </label>
                </div>
              </div>
              <div className="col-span-12 md:col-span-3 text-sm">
                <div className="bg-blue-100 rounded px-3 py-2">
                  {getHelperMessage("rb", radios.rb)}
                </div>
              </div>
            </div>

            {/* J-c*/}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">c</span>
                <span className="text-gray-800 text-base font-medium">
                  Bukti Pemotongan/Pemumutan sehubung dengan kredit pajak luar negeri
                  {/* <span className="text-red-500">*</span> */}
                </span>
              </div>
              <div className="col-span-12 md:col-span-2">
                <div className="flex items-center gap-6">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="rc"
                      checked={radios.rc === true}
                      onChange={() => handleRadioChange("rc", true)}
                    />
                    <span>Ya</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="rc"
                      checked={radios.rc === false}
                      onChange={() => handleRadioChange("rc", false)}
                    />
                    <span>Tidak</span>
                  </label>
                </div>
              </div>
              <div className="col-span-12 md:col-span-3 text-sm">
                <div className="bg-blue-100 rounded px-3 py-2">
                  {getHelperMessage("rc", radios.rc)}
                </div>
              </div>
            </div>

            {/* J-d*/}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">d</span>
                <span className="text-gray-800 text-base font-medium">
                  Surat Kuasa (Hanya untuk SPT Kertas)
                  <span className="text-red-500">*</span>
                </span>
              </div>
              <div className="col-span-12 md:col-span-2">
                <div className="flex items-center gap-6">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="rd"
                      checked={radios.rd === true}
                      onChange={() => handleRadioChange("rd", true)}
                    />
                    <span>Ya</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="rd"
                      checked={radios.rd === false}
                      onChange={() => handleRadioChange("rd", false)}
                    />
                    <span>Tidak</span>
                  </label>
                </div>
              </div>
              <div className="col-span-12 md:col-span-3 text-sm">
                <div className="bg-blue-100 rounded px-3 py-2">
                  {getHelperMessage("rd", radios.rd)}
                </div>
              </div>
            </div>

            {/* J-e*/}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">e</span>
                <span className="text-gray-800 text-base font-medium">
                  Dokumen Lainnya
                  <span className="text-red-500">*</span>
                </span>
              </div>
              <div className="col-span-12 md:col-span-2">
                <div className="flex items-center gap-6">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="re"
                      checked={radios.re === true}
                      onChange={() => handleRadioChange("re", true)}
                    />
                    <span>Ya</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="re"
                      checked={radios.re === false}
                      onChange={() => handleRadioChange("re", false)}
                    />
                    <span>Tidak</span>
                  </label>
                </div>
              </div>
              <div className="col-span-12 md:col-span-3 text-sm">
                <div className="bg-blue-100 rounded px-3 py-2">
                  {getHelperMessage("re", radios.re)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PertanyaanJ;
