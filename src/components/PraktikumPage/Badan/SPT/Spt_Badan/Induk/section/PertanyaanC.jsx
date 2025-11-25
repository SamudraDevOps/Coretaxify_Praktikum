import React, { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const PertanyaanC = ({ onAnswerChange, answersState }) => {
  const [showSection, setShowSection] = useState(false);

  const [r1a, setR1a] = useState(null);
  const [amt1a, setAmt1a] = useState(0);
  const [r1b, setR1b] = useState(null);
  const [amt1b, setAmt1b] = useState(0);
  const [r2, setR2] = useState(null);
  const [amt2, setAmt2] = useState(0);
  const [r3, setR3] = useState(null);
  const [amt3, setAmt3] = useState(0);

  useEffect(() => {
    if (answersState) {
    }
  }, [answersState]);

  const handler1aChange = (value) => {
    console.log("1.a changed:", value);
    setR1a(value);
    onAnswerChange?.("r1a", value);
  };

  const handler1bChange = (value) => {
    console.log("1.b changed:", value);
    setR1b(value);
    onAnswerChange?.("r1b", value);
  };

  const handler2Change = (value) => {
    console.log("2 changed:", value);
    setR2(value);
    onAnswerChange?.("r2", value);
  };

  const handler3Change = (value) => {
    console.log("3 changed:", value);
    setR3(value);
    onAnswerChange?.("r3", value);
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
          showSection
            ? "max-h-[1000px] opacity-100 overflow-visible"
            : "max-h-0 opacity-0 overflow-hidden"
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
                      checked={r1a === true}
                      // change
                      onChange={() => handler1aChange(true)}
                    />
                    <span>Ya</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r1a"
                      checked={r1a === false}
                      onChange={() => handler1aChange(false)}
                    />
                    <span>Tidak</span>
                  </label>
                </div>
              </div>
              <div className="col-span-12 md:col-span-2">{/* Tidak ada input  */}</div>
              <div className="col-span-12 md:col-span-3 text-sm">
                <div className="bg-blue-100 rounded px-3 py-2">
                  {r1a === true && "Ya, silahkan mengisi lampiran 5 "}
                  {r1a === false && "Tidak, silahkan lanjut pertanyaan berikutnya"}
                  {r1a === null && "Pilih salah satu Ya/Tidak"}
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
                      checked={r2 === true}
                      // change
                      onChange={() => handler2Change(true)}
                    />
                    <span>Ya</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r2"
                      checked={r2 === false}
                      onChange={() => handler2Change(false)}
                    />
                    <span>Tidak</span>
                  </label>
                </div>
              </div>
              <div className="col-span-12 md:col-span-2">
                <input
                  type="number"
                  min={0}
                  value={amt2}
                  onChange={(e) => setamt2(+e.target.value || 0)}
                  className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                />
              </div>
              <div className="col-span-12 md:col-span-3 text-sm">
                <div className="bg-blue-100 rounded px-3 py-2">
                  {r2 === true && "Ya, silahkan mengisi Lampiran 4 Bagian A "}
                  {r2 === false && "Tidak, silahkan lanjut pertanyaan berikutnya"}
                  {r2 === null && "Pilih salah satu Ya/Tidak"}
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
                      checked={r3 === true}
                      // change
                      onChange={() => handler3Change(true)}
                    />
                    <span>Ya</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r3"
                      checked={r3 === false}
                      onChange={() => handler3Change(false)}
                    />
                    <span>Tidak</span>
                  </label>
                </div>
              </div>
              <div className="col-span-12 md:col-span-2">
                <input
                  type="number"
                  min={0}
                  value={amt3}
                  onChange={(e) => setamt3(+e.target.value || 0)}
                  className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                />
              </div>
              <div className="col-span-12 md:col-span-3 text-sm">
                <div className="bg-blue-100 rounded px-3 py-2">
                  {r3 === true && "Ya, silahkan mengisi Lampiran 4 Bagian B "}
                  {r3 === false && "Tidak, silahkan lanjut pertanyaan berikutnya"}
                  {r3 === null && "Pilih salah satu Ya/Tidak"}
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
