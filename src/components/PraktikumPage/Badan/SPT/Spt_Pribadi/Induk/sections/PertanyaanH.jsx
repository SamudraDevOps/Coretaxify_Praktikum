import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const PertanyaanH = () => {
  const [showAngsuran, setShowAngsuran] = useState(false);
  
  // State untuk Bagian H - ANGSURAN PPh PASAL 25
  const [r13a, setR13a] = useState(null);
  const [amt13a, setAmt13a] = useState(0);
  const [r13b, setR13b] = useState(null);
  const [amt13b, setAmt13b] = useState(0);
  const [r13c, setR13c] = useState(null);
  const [amt13c, setAmt13c] = useState(0);

  return (
    <>
      {/* H. Angsuran PPh Pasal 25 Tahun Pajak Berikutnya */}
      <div
        className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
        onClick={() => setShowAngsuran(!showAngsuran)}
      >
        <h3 className="text-lg font-semibold">
          H. ANGSURAN PPh PASAL 25 TAHUN PAJAK BERIKUTNYA
        </h3>
        {showAngsuran ? <FaChevronUp /> : <FaChevronDown />}
      </div>
      {showAngsuran && (
        <div className="border rounded-md p-4 mb-4">
          <div className="divide-y">
            {/* 13a */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">
                  13a
                </span>
                <span className="text-gray-800 text-base font-medium">
                  Apakah Hanya Menerima Penghasilan Teratur dan
                  berkewajiban membayar angsuran PPh Pasal 25 tahun
                  pajak berikutnya
                  <span className="text-red-500">*</span>
                </span>
              </div>
              <div className="col-span-12 md:col-span-2">
                <div className="flex items-center gap-6">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r13a"
                      checked={r13a === true}
                      onChange={() => setR13a(true)}
                    />
                    <span>Ya</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r13a"
                      checked={r13a === false}
                      onChange={() => setR13a(false)}
                    />
                    <span>Tidak</span>
                  </label>
                </div>
              </div>
              <div className="col-span-12 md:col-span-3 text-sm">
                <div className="bg-blue-100 rounded px-3 py-2">
                  {r13a === true &&
                    "Ya, angsuran PPh pasal 25nya adalah 1/(12 atau banyaknya bulan dalam bagian tahun pajak) x Point (9-10a)"}
                  {r13a === false &&
                    "Tidak, Lanjutkan ke pertanyaan berikutnya"}
                  {r13a === null && "Pilih salah satu Ya/Tidak"}
                </div>
              </div>
              <div className="col-span-12 md:col-span-2">
                <input
                  type="number"
                  min={0}
                  value={amt13a}
                  onChange={(e) => setAmt13a(+e.target.value || 0)}
                  className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                />
              </div>
            </div>

            {/* 13b */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">
                  13b
                </span>
                <span className="text-gray-800 text-base font-medium">
                  Apakah anda menyusun perhitungan tersendiri angsuran
                  PPh pasal 25 Tahun pajak berikutnya ?
                  <span className="text-red-500">*</span>
                </span>
              </div>
              <div className="col-span-12 md:col-span-2">
                <div className="flex items-center gap-6">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r13b"
                      checked={r13b === true}
                      onChange={() => setR13b(true)}
                    />
                    <span>Ya</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r13b"
                      checked={r13b === false}
                      onChange={() => setR13b(false)}
                    />
                    <span>Tidak</span>
                  </label>
                </div>
              </div>
              <div className="col-span-12 md:col-span-3 text-sm">
                <div className="bg-blue-100 rounded px-3 py-2">
                  {r13b === true &&
                    "Ya, Isi lampiran 4 (L-4) Bagian A "}
                  {r13b === false &&
                    "Tidak, Lanjutkan ke pertanyaan berikutnya"}
                  {r13b === null && "Pilih salah satu Ya/Tidak"}
                </div>
              </div>
              <div className="col-span-12 md:col-span-2">
                <input
                  type="number"
                  min={0}
                  value={amt13b}
                  onChange={(e) => setAmt13b(+e.target.value || 0)}
                  className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                />
              </div>
            </div>

            {/* 13c */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">
                  13c
                </span>
                <span className="text-gray-800 text-base font-medium">
                  Apakah anda membayar angsuran PPh Pasal 25 OPPT Tahun
                  Pajak Berikutnya{" "}
                  <span className="text-red-500">*</span>
                </span>
              </div>
              <div className="col-span-12 md:col-span-2">
                <div className="flex items-center gap-6">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r13c"
                      checked={r13c === true}
                      onChange={() => setR13c(true)}
                    />
                    <span>Ya</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r13c"
                      checked={r13c === false}
                      onChange={() => setR13c(false)}
                    />
                    <span>Tidak</span>
                  </label>
                </div>
              </div>
              <div className="col-span-12 md:col-span-3 text-sm">
                <div className="bg-blue-100 rounded px-3 py-2">
                  {r13c === true &&
                    "Ya, Angsuran PPh Pasal 25 adalah 0.75% dari penghasilan bruto setiap bulan dari masing-masing tempat usaha"}
                  {r13c === false &&
                    "Tidak, Tidak memiliki kewajiban untuk membayar angsuran PPh Pasal 25"}
                  {r13c === null && "Pilih salah satu Ya/Tidak"}
                </div>
              </div>
              <div className="col-span-12 md:col-span-2">
                <input
                  type="number"
                  min={0}
                  value={amt13c}
                  onChange={(e) => setAmt13c(+e.target.value || 0)}
                  className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PertanyaanH;