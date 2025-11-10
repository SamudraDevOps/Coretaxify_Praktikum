import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const PertanyaanC = () => {
  const [showPerhitunganPajakTerutang, setShowPerhitunganPajakTerutang] = useState(false);

  // State untuk Bagian C - PERHITUNGAN PAJAK TERUTANG
  const [r2, setR2] = useState(null);
  const [amt2, setAmt2] = useState(0);
  const [r3, setR3] = useState(null);
  const [amt3, setAmt3] = useState(0);
  const [r4, setR4] = useState(null);
  const [amt4, setAmt4] = useState(0);
  const [r5, setR5] = useState(null);
  const [amt5, setAmt5] = useState(0);
  const [r6, setR6] = useState(null);
  const [amt6, setAmt6] = useState(0);
  const [r7, setR7] = useState(null);
  const [amt7, setAmt7] = useState(0);
  const [r8, setR8] = useState(null);
  const [amt8, setAmt8] = useState(0);

  return (
    <>
      {/* Perhitungan Pajak Terutang */}
      <div
        className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
        onClick={() => setShowPerhitunganPajakTerutang(!showPerhitunganPajakTerutang)}
      >
        <h3 className="text-lg font-semibold">C. PERHITUNGAN PAJAK TERUTANG</h3>
        <span
          className={`transition-transform duration-500 ease-in-out ${
            showPerhitunganPajakTerutang ? "rotate-180" : "rotate-0"
          }`}
        >
          <FaChevronDown />
        </span>
      </div>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          showPerhitunganPajakTerutang ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="border rounded-md p-4 mb-4">
          <div className="divide-y">
            {/* 2 */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">2</span>
                <span className="text-gray-800 text-base font-medium">
                  Penghasilan neto Setahun (1a + 1b + 1c + 1d){" "}
                  <span className="text-red-500">*</span>
                </span>
              </div>
              <div className="col-span-12 md:col-span-5"></div>
              <div className="col-span-12 md:col-span-2">
                <input
                  type="number"
                  min={0}
                  value={amt2}
                  onChange={(e) => setAmt2(+e.target.value || 0)}
                  className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                />
              </div>
            </div>

            {/* 3 */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">3</span>
                <span className="text-gray-800 text-base font-medium">
                  Apakah Terdapat Pengurangan Penghasilan Neto seperti Kompensasi Kerugian Atau
                  Zakat yang dibayarkan selain yang telah diperhitungkan dalam formulir BPA1 dan/
                  Atau BPA2
                </span>
              </div>
              <div className="col-span-12 md:col-span-2">
                <div className="flex items-center gap-6">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r3"
                      checked={r3 === true}
                      onChange={() => setR3(true)}
                    />
                    <span>Ya</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r3"
                      checked={r3 === false}
                      onChange={() => setR3(false)}
                    />
                    <span>Tidak</span>
                  </label>
                </div>
              </div>
              <div className="col-span-12 md:col-span-3 text-sm">
                <div className="bg-blue-100 rounded px-3 py-2">
                  {r3 === true && "Ya, Isi Lampiran 5 Bagian A dan/Atau Bagian B"}
                  {r3 === false && "Tidak. Silahkan Melanjutkan ke pertanyaan berikutnya."}
                  {r3 === null && "Pilih salah satu Ya/Tidak"}
                </div>
              </div>
              <div className="col-span-12 md:col-span-2">
                <input
                  type="number"
                  min={0}
                  value={amt3}
                  onChange={(e) => setAmt3(+e.target.value || 0)}
                  className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                />
              </div>
            </div>

            {/* 4 */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">4</span>
                <span className="text-gray-800 text-base font-medium">
                  Penghasilan Neto Setelah Pengurangan Penghasilan Neto (2-3){" "}
                </span>
              </div>
              <div className="col-span-12 md:col-span-5"></div>
              <div className="col-span-12 md:col-span-2">
                <input
                  type="number"
                  min={0}
                  value={amt4}
                  onChange={(e) => setAmt4(+e.target.value || 0)}
                  className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                />
              </div>
            </div>

            {/* 5 */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">5</span>
                <span className="text-gray-800 text-base font-medium">
                  Penghasilan Tidak Kena Pajak
                </span>
              </div>
              <div className="col-span-12 md:col-span-2">
                <select
                  className="w-full p-2 border rounded-md text-sm"
                  value={r5}
                  onChange={(e) => setR5(e.target.value)}
                >
                  <option value="">Please select</option>
                  <option value="K/0">K/0</option>
                  <option value="K/1">K/1</option>
                  <option value="K/2">K/2</option>
                  <option value="K/3">K/3</option>
                  <option value="TK/0">TK/0</option>
                  <option value="TK/1">TK/1</option>
                  <option value="TK/2">TK/2</option>
                  <option value="TK/3">TK/3</option>
                </select>
              </div>
              <div className="col-span-12 md:col-span-3 text-sm"></div>
              <div className="col-span-12 md:col-span-2">
                <input
                  type="number"
                  min={0}
                  value={amt5}
                  onChange={(e) => setAmt5(+e.target.value || 0)}
                  className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                />
              </div>
            </div>

            {/* 6 */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">6</span>
                <span className="text-gray-800 text-base font-medium">
                  Penghasilan Kena Pajak (4-5){" "}
                </span>
              </div>
              <div className="col-span-12 md:col-span-5"></div>
              <div className="col-span-12 md:col-span-2">
                <input
                  type="number"
                  min={0}
                  value={amt6}
                  onChange={(e) => setAmt6(+e.target.value || 0)}
                  className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                />
              </div>
            </div>

            {/* 7 */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">7</span>
                <span className="text-gray-800 text-base font-medium">Pph Terutang</span>
              </div>
              <div className="col-span-12 md:col-span-5"></div>
              <div className="col-span-12 md:col-span-2">
                <input
                  type="number"
                  min={0}
                  value={amt7}
                  onChange={(e) => setAmt7(+e.target.value || 0)}
                  className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                />
              </div>
            </div>

            {/* 8 */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">8</span>
                <span className="text-gray-800 text-base font-medium">
                  Apakah Terdapat Pengurangan PPh Terutang ?<span className="text-red-500">*</span>
                </span>
              </div>
              <div className="col-span-12 md:col-span-2">
                <div className="flex items-center gap-6">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r8"
                      checked={r8 === true}
                      onChange={() => setR8(true)}
                    />
                    <span>Ya</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r8"
                      checked={r8 === false}
                      onChange={() => setR8(false)}
                    />
                    <span>Tidak</span>
                  </label>
                </div>
              </div>
              <div className="col-span-12 md:col-span-3 text-sm">
                <div className="bg-blue-100 rounded px-3 py-2">
                  {r8 === true && "Ya, Isi Lampiran 5 Bagian C "}
                  {r8 === false && "Tidak. Silahkan Melanjutkan ke pertanyaan berikutnya."}
                  {r8 === null && "Pilih salah satu Ya/Tidak"}
                </div>
              </div>
              <div className="col-span-12 md:col-span-2">
                <input
                  type="number"
                  min={0}
                  value={amt8}
                  onChange={(e) => setAmt8(+e.target.value || 0)}
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

export default PertanyaanC;
