import React, { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { parseFormattedNumber, formatRupiah } from "@utils/formatCurrency";

const PertanyaanE = ({ onAnswerChange, answersState }) => {
  const [showSection, setShowSection] = useState(false);

  const [r13, setR13] = useState(null);
  const [amt13, setAmt13] = useState(0);
  const [amt14, setAmt14] = useState(0);
  const [amt15, setAmt15] = useState(0);
  const [r16, setR16] = useState(null);
  const [amt16, setAmt16] = useState(0);

  useEffect(() => {
    if (answersState) {
    }
  }, [answersState]);

  const handler13Change = (value) => {
    console.log("13 changed:", value);
    setR13(value);
    onAnswerChange?.("r13", value);
  };

  const handler15Change = (value) => {
    const raw = value.target.value;
    // Jika kosong, set 0
    if (raw.trim() === "") {
      setAmt15(0);
      return;
    }
    // Ambil angka dari string
    const numeric = parseFormattedNumber(raw);
    setAmt15(numeric);
    // console.log("15 changed:", numeric);
  };
  const handler16Change = (value) => {
    console.log("16 changed:", value);
    setR16(value);
    onAnswerChange?.("r16", value);
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
          showSection
            ? "max-h-[1000px] opacity-100 overflow-visible"
            : "max-h-0 opacity-0 overflow-hidden"
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
                      checked={r13 === true}
                      // change
                      onChange={() => handler13Change(true)}
                    />
                    <span>Ya</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r13"
                      checked={r13 === false}
                      onChange={() => handler13Change(false)}
                    />
                    <span>Tidak</span>
                  </label>
                </div>
              </div>
              <div className="col-span-12 md:col-span-2">
                <input
                  type="number"
                  min={0}
                  value={amt13}
                  onChange={(e) => setAmt13(+e.target.value || 0)}
                  className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                />
              </div>
              <div className="col-span-12 md:col-span-3 text-sm">
                <div className="bg-blue-100 rounded px-3 py-2">
                  {r13 === true && "Ya, silahkan mengisi lampiran 3 "}
                  {r13 === false && "Tidak, silahkan lanjut pertanyaan berikutnya"}
                  {r13 === null && "Pilih salah satu Ya/Tidak"}
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
                  type="number"
                  min={0}
                  value={amt14}
                  onChange={(e) => setAmt14(+e.target.value || 0)}
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
                  value={formatRupiah(amt15).replace(/^Rp\s?/, "")} // Hilangkan "Rp" di depan dengan menggunakan replace(/^Rp\s?/, "")
                  onChange={handler15Change}
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
                      checked={r16 === true}
                      // change
                      onChange={() => handler16Change(true)}
                    />
                    <span>Ya</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r16"
                      checked={r16 === false}
                      onChange={() => handler16Change(false)}
                    />
                    <span>Tidak</span>
                  </label>
                </div>
              </div>
              <div className="col-span-12 md:col-span-2">
                <input
                  type="text"
                  min={0}
                  value={formatRupiah(amt16).replace(/^Rp\s?/, "")} // Hilangkan "Rp" di depan dengan menggunakan replace(/^Rp\s?/, "")
                  onChange={handler16Change}
                  className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                />
              </div>
              <div className="col-span-12 md:col-span-3 text-sm">
                <div className="bg-blue-100 rounded px-3 py-2">
                  {r16 === true && "Ya, silahkan mengisi lampiran 13C"}
                  {r16 === false && "Tidak, silahkan lanjut pertanyaan berikutnya"}
                  {r16 === null && "Pilih salah satu Ya/Tidak"}
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
