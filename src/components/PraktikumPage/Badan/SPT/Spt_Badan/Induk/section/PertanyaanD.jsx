import React, { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { parseFormattedNumber, formatRupiah } from "@utils/formatCurrency";

import Select from "react-select";

const PertanyaanD = ({ onAnswerChange, answersState }) => {
  const [showSection, setShowSection] = useState(false);

  const [r4, setR4] = useState(0);
  const [r5, setR5] = useState(null);
  const [r6, setR6] = useState(null);
  const [r7, setR7] = useState(0);
  const [r8, setR8] = useState(null);
  const [r9, setR9] = useState(null);
  const [r10, setR10] = useState(null);
  const [r11, setR11] = useState(null);
  const [r12, setR12] = useState(0);

  // Daftar tarif pajak (opsional, bisa disesuaikan)
  const tarifPajakOptions = [
    {
      value: "option1",
      label: "Tarif Ketentuan Umum Sebagaimana Pasal 17 ayat (1) huruf b UU PPh",
    },
    { value: "option2", label: "Tarif Fasilitas Sebagaimana Pasal 17 ayat (2b) UU PPh" },
    { value: "option3", label: "Tarif Fasilitas Sebagaimana Pasal 31E ayat (1) UU PPh" },
    { value: "option4", label: "Tarif Pajak Lainnya" },
  ];

  useEffect(() => {
    if (answersState) {
    }
  }, [answersState]);

  const [amounts, setAmounts] = useState({
    r4: 0,
    r5: 0,
    r6: 0,
    r7: 0,
    r8: 0,
    r9: 0,
    r10: 0,
    r12: 0,
  });

  const [radios, setRadios] = useState({
    r5: null,
    r6: null,
    r8: null,
    r10: null,
    r11: "",
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
    r5: {
      yes: "Ya, silahkan mengisi lampiran 13A",
      no: "Tidak, silahkan lanjut pertanyaan berikutnya",
    },
    r6: {
      yes: "Ya, silahkan mengisi lampiran 13B tabel A dan B",
      no: "Tidak, silahkan lanjut pertanyaan berikutnya",
    },
    r8: {
      yes: "Ya, silahkan mengisi lampiran 7",
      no: "Tidak, silahkan lanjut pertanyaan berikutnya",
    },
    r10: {
      yes: "Ya, silahkan mengisi lampiran 13B tabel C dan D ",
      no: "Tidak, silahkan lanjut pertanyaan berikutnya",
    },
    r11: {
      option1: "Comming soon... ",
      option2: "Comming soon... ",
      option3: "Silakan isi Lampiran 8",
      option4: "Silakan masukkan persentase tarif pajak (kolom 11.a)",
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
        <h3 className="text-lg font-semibold">D. PERHITUNGAN PPh</h3>
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
            {/* 4 */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">4</span>
                <span className="text-gray-800 text-base font-medium">
                  Penghasilan Neto Fiskal sebelum Fasilitas Pajak
                  <span className="text-red-500">*</span>
                </span>
              </div>
              <div className="col-span-12 md:col-span-2"></div>
              <div className="col-span-12 md:col-span-2">
                <input
                  type="text"
                  min={0}
                  value={formatRupiah(amounts.r4).replace(/^Rp\s?/, "")} // Hilangkan "Rp" di depan dengan menggunakan replace(/^Rp\s?/, "")
                  onChange={handleAmountChange("r4")}
                  className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                />
              </div>
            </div>

            {/* 5 */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">5</span>
                <span className="text-gray-800 text-base font-medium">
                  Apakah Wajib Pajak memperoleh Fasilitas Perpajakan Dalam Rangka Penanaman Modal
                  berupa pengurangan penghasilan neto?
                  <span className="text-red-500">*</span>
                </span>
              </div>
              <div className="col-span-12 md:col-span-2">
                <div className="flex items-center gap-6">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r5"
                      checked={radios.r5 === true}
                      // change
                      onChange={() => handleRadioChange("r5", true)}
                    />
                    <span>Ya</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r5"
                      checked={radios.r5 === false}
                      onChange={() => handleRadioChange("r5", false)}
                    />
                    <span>Tidak</span>
                  </label>
                </div>
              </div>
              <div className="col-span-12 md:col-span-2">
                <input
                  type="text"
                  min={0}
                  value={formatRupiah(amounts.r5).replace(/^Rp\s?/, "")} // Hilangkan "Rp" di depan dengan menggunakan replace(/^Rp\s?/, "")
                  onChange={handleAmountChange("r5")}
                  className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                />
              </div>
              <div className="col-span-12 md:col-span-3 text-sm">
                <div className="bg-blue-100 rounded px-3 py-2">
                  {getHelperMessage("r5", radios.r5)}
                </div>
              </div>
            </div>

            {/* 6 */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">6</span>
                <span className="text-gray-800 text-base font-medium">
                  Apakah Wajib Pajak memperoleh Fasilitas Pengurangan Penghasilan Bruto untuk
                  Kegiatan Praktik Kerja, Pemagangan, dan/atau Pembelajaran Dalam Rangka Pembinaan
                  dan Pengembangan Sumber daya Manusia Berbasis Kompetensi Tertentu?
                  <span className="text-red-500">*</span>
                </span>
              </div>
              <div className="col-span-12 md:col-span-2">
                <div className="flex items-center gap-6">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r6"
                      checked={radios.r6 === true}
                      // change
                      onChange={() => handleRadioChange("r6", true)}
                    />
                    <span>Ya</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r6"
                      checked={radios.r6 === false}
                      onChange={() => handleRadioChange("r6", false)}
                    />
                    <span>Tidak</span>
                  </label>
                </div>
              </div>
              <div className="col-span-12 md:col-span-2">
                <input
                  type="text"
                  min={0}
                  value={formatRupiah(amounts.r6).replace(/^Rp\s?/, "")} // Hilangkan "Rp" di depan dengan menggunakan replace(/^Rp\s?/, "")
                  onChange={handleAmountChange("r6")}
                  className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                />
              </div>{" "}
              <div className="col-span-12 md:col-span-3 text-sm">
                <div className="bg-blue-100 rounded px-3 py-2">
                  {getHelperMessage("r6", radios.r6)}
                </div>
              </div>
            </div>

            {/* 7 */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">7</span>
                <span className="text-gray-800 text-base font-medium">
                  Penghasilan Neto Fiskal Setelah Fasilitas Pajak
                  {/* <span className="text-red-500">*</span> */}
                </span>
              </div>
              <div className="col-span-12 md:col-span-2"></div>
              <div className="col-span-12 md:col-span-2">
                <input
                  type="text"
                  min={0}
                  value={formatRupiah(amounts.r7).replace(/^Rp\s?/, "")} // Hilangkan "Rp" di depan dengan menggunakan replace(/^Rp\s?/, "")
                  onChange={handleAmountChange("r7")}
                  className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                />
              </div>
            </div>

            {/* 8 */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">8</span>
                <span className="text-gray-800 text-base font-medium">
                  Apakah terdapat kerugian fiskal yang dapat dikompensasikan?
                  <span className="text-red-500">*</span>
                </span>
              </div>
              <div className="col-span-12 md:col-span-2">
                <div className="flex items-center gap-6">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r8"
                      checked={radios.r8 === true}
                      // change
                      onChange={() => handleRadioChange("r8", true)}
                    />
                    <span>Ya</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r8"
                      checked={radios.r8 === false}
                      onChange={() => handleRadioChange("r8", false)}
                    />
                    <span>Tidak</span>
                  </label>
                </div>
              </div>
              <div className="col-span-12 md:col-span-2">
                <input
                  type="text"
                  min={0}
                  value={formatRupiah(amounts.r8).replace(/^Rp\s?/, "")} // Hilangkan "Rp" di depan dengan menggunakan replace(/^Rp\s?/, "")
                  onChange={handleAmountChange("r8")}
                  className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                />
              </div>
              <div className="col-span-12 md:col-span-3 text-sm">
                <div className="bg-blue-100 rounded px-3 py-2">
                  {getHelperMessage("r8", radios.r8)}
                </div>
              </div>
            </div>

            {/* 9 */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">9</span>
                <span className="text-gray-800 text-base font-medium">
                  Penghasilan Kena Pajak
                  {/* <span className="text-red-500">*</span> */}
                </span>
              </div>
              <div className="col-span-12 md:col-span-2"></div>
              <div className="col-span-12 md:col-span-2">
                <input
                  type="text"
                  min={0}
                  value={formatRupiah(amounts.r9).replace(/^Rp\s?/, "")} // Hilangkan "Rp" di depan dengan menggunakan replace(/^Rp\s?/, "")
                  onChange={handleAmountChange("r9")}
                  className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                />
              </div>
            </div>

            {/* 10 */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">10</span>
                <span className="text-gray-800 text-base font-medium">
                  Apakah Wajib Pajak memperoleh Fasilitas Pengurangan Penghasilan Bruto untuk
                  Kegiatan Penelitian dan Pengembangan Tertentu?{" "}
                  <span className="text-red-500">*</span>
                </span>
              </div>
              <div className="col-span-12 md:col-span-2">
                <div className="flex items-center gap-6">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r10"
                      checked={radios.r10 === true}
                      // change
                      onChange={() => handleRadioChange("r10", true)}
                    />
                    <span>Ya</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r10"
                      checked={radios.r10 === false}
                      onChange={() => handleRadioChange("r10", false)}
                    />
                    <span>Tidak</span>
                  </label>
                </div>
              </div>
              <div className="col-span-12 md:col-span-2">
                <input
                  type="text"
                  min={0}
                  value={formatRupiah(amounts.r10).replace(/^Rp\s?/, "")} // Hilangkan "Rp" di depan dengan menggunakan replace(/^Rp\s?/, "")
                  onChange={handleAmountChange("r10")}
                  className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                />
              </div>{" "}
              <div className="col-span-12 md:col-span-3 text-sm">
                <div className="bg-blue-100 rounded px-3 py-2">
                  {getHelperMessage("r10", radios.r10)}
                </div>
              </div>
            </div>

            {/* 11 */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">11</span>
                <span className="text-gray-800 text-base font-medium">
                  Tarif Pajak
                  <span className="text-red-500">*</span>
                </span>
              </div>
              <div className="col-span-12 md:col-span-2"></div>
              <div className="col-span-12 md:col-span-2">
                <Select
                  value={tarifPajakOptions.find((option) => option.value === radios.r11) || null}
                  onChange={(opt) => handleSelectChange("r11", opt?.value || "")}
                  options={tarifPajakOptions}
                  className="text-sm"
                  classNamePrefix="react-select"
                  placeholder="Please select"
                  isClearable={false} // opsional, jika ingin membiarkan "Please select" tetap terpilih
                />
              </div>
              <div className="col-span-12 md:col-span-3 text-sm">
                <div className="bg-blue-100 rounded px-3 py-2">
                  {getHelperMessage("r11", radios.r11)}
                </div>
              </div>
            </div>

            {/* 12 */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">12</span>
                <span className="text-gray-800 text-base font-medium">
                  PPh Terutang
                  {/* <span className="text-red-500">*</span> */}
                </span>
              </div>
              <div className="col-span-12 md:col-span-2"></div>
              <div className="col-span-12 md:col-span-2">
                <input
                  type="text"
                  min={0}
                  value={formatRupiah(amounts.r12).replace(/^Rp\s?/, "")} // Hilangkan "Rp" di depan dengan menggunakan replace(/^Rp\s?/, "")
                  onChange={handleAmountChange("r12")}
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

export default PertanyaanD;
