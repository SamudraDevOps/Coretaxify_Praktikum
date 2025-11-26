import React, { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { parseFormattedNumber, formatRupiah } from "@utils/formatCurrency";

const PertanyaanH = ({ onAnswerChange, answersState }) => {
  const [showSection, setShowSection] = useState(false);

  // State radio button
  const [r21a, setR21a] = useState(null);
  const [r21b, setR21b] = useState(null);
  const [r21c, setR21c] = useState(null);
  const [r21d, setR21d] = useState(null);
  const [r21e, setR21e] = useState(null);
  const [r21f, setR21f] = useState(null);
  const [r21g, setR21g] = useState(null);
  const [r21h, setR21h] = useState(null);
  const [r21i, setR21i] = useState(null);

  // State input
  const [kelebihanPphFinal, setKelebihanPphFinal] = useState(0);

  useEffect(() => {
    if (answersState) {
    }
  }, [answersState]);

  const [amounts, setAmounts] = useState({
    r21j: 0,
  });

  const [radios, setRadios] = useState({
    r21a: null,
    r21b: null,
    r21c: null,
    r21d: null,
    r21e: null,
    r21f: null,
    r21g: null,
    r21h: null,
    r21i: null,
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
    r21a: {
      yes: "Ya, silahkan mengisi lampiran 10A, 10B, 10C",
      no: "Tidak, silahkan lanjut pertanyaan berikutnya",
    },
    r21b: {
      yes: "Ya, silahkan mengisi lampiran 10D",
      no: "Tidak, silahkan lanjut pertanyaan berikutnya",
    },
    r21c: {
      yes: "Ya, silahkan mengisi lampiran 2 Bagian B",
      no: "Tidak, silahkan lanjut pertanyaan berikutnya",
    },
    r21d: {
      yes: "Ya, silahkan mengisi lampiran 2 Bagian B",
      no: "Tidak, silahkan lanjut pertanyaan berikutnya",
    },
    r21e: {
      yes: "Ya, silahkan mengisi lampiran 9",
      no: "Tidak, silahkan lanjut pertanyaan berikutnya",
    },
    r21f: {
      yes: "Ya, silahkan mengisi lampiran 11A",
      no: "Tidak, silahkan lanjut pertanyaan berikutnya",
    },
    r21g: {
      yes: "Ya, silahkan mengisi lampiran 13A",
      no: "Tidak, silahkan lanjut pertanyaan berikutnya",
    },
    r21h: {
      yes: "Ya, silahkan mengisi lampiran 14",
      no: "Tidak, silahkan lanjut pertanyaan berikutnya",
    },
    r21i: {
      yes: "Ya, silahkan sampaikan laporan realisasi investasi secara terpisah pada menu layanan wajib pajak",
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
        <h3 className="text-lg font-semibold">H. PERNYATAAN TRANSAKSI</h3>
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
            {/* 21.a */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">21.a</span>
                <span className="text-gray-800 text-base font-medium">
                  Apakah terdapat transaksi yang dipengaruhi hubungan istimewa atau transaksi dengan
                  pihak yang merupakan penduduk tax haven country?
                  {/* <span className="text-red-500">*</span> */}
                </span>
              </div>
              <div className="col-span-12 md:col-span-2">
                <div className="flex items-center gap-6">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r21a"
                      checked={radios.r21a === true}
                      onChange={() => handleRadioChange("r21a", true)}
                    />
                    <span>Ya</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r21a"
                      checked={radios.r21a === false}
                      onChange={() => handleRadioChange("r21a", false)}
                    />
                    <span>Tidak</span>
                  </label>
                </div>
              </div>
              <div className="col-span-12 md:col-span-2"></div>
              <div className="col-span-12 md:col-span-3 text-sm">
                <div className="bg-blue-100 rounded px-3 py-2">
                  {getHelperMessage("r21a", radios.r21a)}
                </div>
              </div>
            </div>

            {/* 21.b */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">21.b</span>
                <span className="text-gray-800 text-base font-medium">
                  Apakah Wajib Pajak berkewajiban menyampaikan Dokumen Penentuan Harga Transfer?
                  <span className="text-red-500">*</span>
                </span>
              </div>
              <div className="col-span-12 md:col-span-2">
                <div className="flex items-center gap-6">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r21b"
                      checked={radios.r21b === true}
                      onChange={() => handleRadioChange("r21b", true)}
                    />
                    <span>Ya</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r21b"
                      checked={radios.r21b === false}
                      onChange={() => handleRadioChange("r21b", false)}
                    />
                    <span>Tidak</span>
                  </label>
                </div>
              </div>
              <div className="col-span-12 md:col-span-2"></div>
              <div className="col-span-12 md:col-span-3 text-sm">
                <div className="bg-blue-100 rounded px-3 py-2">
                  {getHelperMessage("r21b", radios.r21b)}
                </div>
              </div>
            </div>
            {/* 21.c */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">21.c</span>
                <span className="text-gray-800 text-base font-medium">
                  Apakah terdapat penanaman modal pada perusahaan afiliasi?
                  <span className="text-red-500">*</span>
                </span>
              </div>
              <div className="col-span-12 md:col-span-2">
                <div className="flex items-center gap-6">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r21c"
                      checked={radios.r21c === true}
                      onChange={() => handleRadioChange("r21c", true)}
                    />
                    <span>Ya</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r21c"
                      checked={radios.r21c === false}
                      onChange={() => handleRadioChange("r21c", false)}
                    />
                    <span>Tidak</span>
                  </label>
                </div>
              </div>
              <div className="col-span-12 md:col-span-2"></div>
              <div className="col-span-12 md:col-span-3 text-sm">
                <div className="bg-blue-100 rounded px-3 py-2">
                  {getHelperMessage("r21c", radios.r21c)}
                </div>
              </div>
            </div>
            {/* 21.c */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">21.d</span>
                <span className="text-gray-800 text-base font-medium">
                  Apakah Wajib Pajak memiliki utang dari pemilik modal atau perusahaan afiliasi,
                  dan/atau piutang ke pemilik modal atau perusahaan afiliasi?
                  <span className="text-red-500">*</span>
                </span>
              </div>
              <div className="col-span-12 md:col-span-2">
                <div className="flex items-center gap-6">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r21d"
                      checked={radios.r21d === true}
                      onChange={() => handleRadioChange("r21d", true)}
                    />
                    <span>Ya</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r21d"
                      checked={radios.r21d === false}
                      onChange={() => handleRadioChange("r21d", false)}
                    />
                    <span>Tidak</span>
                  </label>
                </div>
              </div>
              <div className="col-span-12 md:col-span-2"></div>
              <div className="col-span-12 md:col-span-3 text-sm">
                <div className="bg-blue-100 rounded px-3 py-2">
                  {getHelperMessage("r21d", radios.r21d)}
                </div>
              </div>
            </div>
            {/* 21.e */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">21.e</span>
                <span className="text-gray-800 text-base font-medium">
                  Apakah Wajib Pajak membebankan biaya penyusutan dan/atau amortisasi fiskal?
                  <span className="text-red-500">*</span>
                </span>
              </div>
              <div className="col-span-12 md:col-span-2">
                <div className="flex items-center gap-6">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r21e"
                      checked={radios.r21e === true}
                      onChange={() => handleRadioChange("r21e", true)}
                    />
                    <span>Ya</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r21e"
                      checked={radios.r21e === false}
                      onChange={() => handleRadioChange("r21e", false)}
                    />
                    <span>Tidak</span>
                  </label>
                </div>
              </div>
              <div className="col-span-12 md:col-span-2"></div>
              <div className="col-span-12 md:col-span-3 text-sm">
                <div className="bg-blue-100 rounded px-3 py-2">
                  {getHelperMessage("r21e", radios.r21e)}
                </div>
              </div>
            </div>
            {/* 21.f */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">21.f</span>
                <span className="text-gray-800 text-base font-medium">
                  Apakah Wajib Pajak membebankan biaya entertainment, biaya promosi dan penjualan,
                  penggantian atau imbalan dalam bentuk natura dan/atau kenikmatan, dan piutang yang
                  nyata-nyata tidak dapat ditagih?
                  <span className="text-red-500">*</span>
                </span>
              </div>
              <div className="col-span-12 md:col-span-2">
                <div className="flex items-center gap-6">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r21f"
                      checked={radios.r21f === true}
                      onChange={() => handleRadioChange("r21f", true)}
                    />
                    <span>Ya</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r21f"
                      checked={radios.r21f === false}
                      onChange={() => handleRadioChange("r21f", false)}
                    />
                    <span>Tidak</span>
                  </label>
                </div>
              </div>
              <div className="col-span-12 md:col-span-2"></div>
              <div className="col-span-12 md:col-span-3 text-sm">
                <div className="bg-blue-100 rounded px-3 py-2">
                  {getHelperMessage("r21f", radios.r21f)}
                </div>
              </div>
            </div>
            {/* 21.g */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">21.g</span>
                <span className="text-gray-800 text-base font-medium">
                  Apakah Wajib Pajak memperoleh fasilitas perpajakan dalam rangka penanaman modal di
                  bidang-bidang usaha tertentu dan/atau daerah-daerah tertentu selain pengurangan
                  penghasilan neto
                  <span className="text-red-500">*</span>
                </span>
              </div>
              <div className="col-span-12 md:col-span-2">
                <div className="flex items-center gap-6">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r21g"
                      checked={radios.r21g === true}
                      onChange={() => handleRadioChange("r21g", true)}
                    />
                    <span>Ya</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r21g"
                      checked={radios.r21g === false}
                      onChange={() => handleRadioChange("r21g", false)}
                    />
                    <span>Tidak</span>
                  </label>
                </div>
              </div>
              <div className="col-span-12 md:col-span-2"></div>
              <div className="col-span-12 md:col-span-3 text-sm">
                <div className="bg-blue-100 rounded px-3 py-2">
                  {getHelperMessage("r21g", radios.r21g)}
                </div>
              </div>
            </div>
            {/* 21.h */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">21.h</span>
                <span className="text-gray-800 text-base font-medium">
                  Apakah Wajib Pajak memiliki sisa lebih yang digunakan untuk pembangunan dan
                  pengadaan sarana dan prasarana?
                  <span className="text-red-500">*</span>
                </span>
              </div>
              <div className="col-span-12 md:col-span-2">
                <div className="flex items-center gap-6">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r21h"
                      checked={radios.r21h === true}
                      onChange={() => handleRadioChange("r21h", true)}
                    />
                    <span>Ya</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r21h"
                      checked={radios.r21h === false}
                      onChange={() => handleRadioChange("r21h", false)}
                    />
                    <span>Tidak</span>
                  </label>
                </div>
              </div>
              <div className="col-span-12 md:col-span-2"></div>
              <div className="col-span-12 md:col-span-3 text-sm">
                <div className="bg-blue-100 rounded px-3 py-2">
                  {getHelperMessage("r21h", radios.r21h)}
                </div>
              </div>
            </div>
            {/* 21.i */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">21.i</span>
                <span className="text-gray-800 text-base font-medium">
                  Apakah Wajib Pajak menerima atau memperoleh penghasilan dividen dari luar negeri
                  dan melaporkannya sebagai penghasilan yang tidak termasuk objek pajak?
                  <span className="text-red-500">*</span>
                </span>
              </div>
              <div className="col-span-12 md:col-span-2">
                <div className="flex items-center gap-6">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r21i"
                      checked={radios.r21i === true}
                      onChange={() => handleRadioChange("r21i", true)}
                    />
                    <span>Ya</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r21i"
                      checked={radios.r21i === false}
                      onChange={() => handleRadioChange("r21i", false)}
                    />
                    <span>Tidak</span>
                  </label>
                </div>
              </div>
              <div className="col-span-12 md:col-span-2"></div>
              <div className="col-span-12 md:col-span-3 text-sm">
                <div className="bg-blue-100 rounded px-3 py-2">
                  {getHelperMessage("r21i", radios.r21i)}
                </div>
              </div>
            </div>
            {/* 21.j */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">21.j</span>
                <span className="text-gray-800 text-base font-medium">
                  Kelebihan PPh yang bersifat final atas penghasilan dari usaha dengan peredaran
                  bruto tertentu yang dapat diajukan pengembalian pajak
                  <span className="text-red-500">*</span>
                </span>
              </div>
              <div className="col-span-12 md:col-span-2"></div>
              <div className="col-span-12 md:col-span-2">
                <input
                  type="text"
                  min={0}
                  value={formatRupiah(amounts.r21j).replace(/^Rp\s?/, "")} // Hilangkan "Rp" di depan dengan menggunakan replace(/^Rp\s?/, "")
                  onChange={handleAmountChange("r21j")}
                  className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                />
              </div>
              <div className="col-span-12 md:col-span-3 text-sm"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PertanyaanH;
