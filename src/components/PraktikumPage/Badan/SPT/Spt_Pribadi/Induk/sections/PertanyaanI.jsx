import React, { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const PertanyaanI = ({ onAnswerChange, answersState }) => {
  const [showTransaksiLainnya, setShowTransaksiLainnya] = useState(false);

  // State untuk Bagian I - PERNYATAAN TRANSAKSI LAINNYA
  const [r14a, setR14a] = useState(null);
  const [amt14a, setAmt14a] = useState(0);
  const [r14b, setR14b] = useState(null);
  const [amt14b, setAmt14b] = useState(0);
  const [r14c, setR14c] = useState(null);
  const [amt14c, setAmt14c] = useState(0);
  const [r14d, setR14d] = useState(null);
  const [amt14d, setAmt14d] = useState(0);
  const [r14e, setR14e] = useState(null);
  const [amt14e, setAmt14e] = useState(0);
  const [r14f, setR14f] = useState(null);
  const [amt14f, setAmt14f] = useState(0);
  const [r14g, setR14g] = useState(null);
  const [amt14g, setAmt14g] = useState(0);

  useEffect(() => {
    if (answersState) {
      // Pertayaan 14b
      setR14b(answersState.r14b ?? null);
      setAmt14b(answersState.amt14b ?? 0);

      // Pertayaan 14c
      setR14c(answersState.r14c ?? null);
      setAmt14c(answersState.amt14c ?? 0);

      // Pertanyaan D
      setR14d(answersState.r14d ?? null);
      setAmt14d(answersState.amt14d ?? 0);

      // Pertanyaan E
      setR14e(answersState.r14e ?? null);
      setAmt14e(answersState.amt14e ?? 0);

      // Pertanyaan F
      setR14f(answersState.r14f ?? null);
      setAmt14f(answersState.amt14f ?? 0);

  
    }
  }, [answersState]);

  const handleR14bChange = (value) => {
    console.log("🔄 14b changed to:", value); // Debug log
    setR14b(value);
    onAnswerChange?.("r14b", value);
  };

  const handleR14cChange = (value) => {
    console.log("🔄 14c changed to:", value);
    setR14c(value);
    onAnswerChange?.("r14c", value);
  };

  const handleR14dChange = (value) => {
    console.log("🔄 14d changed to:", value);
    setR14d(value);
    onAnswerChange?.("r14d", value);
  };

  const handleR14eChange = (value) => {
    console.log("🔄 14e changed to:", value);
    setR14e(value);
    onAnswerChange?.("r14e", value);
  };

  const handleR14fChange = (value) => {
    console.log("🔄 14f changed to:", value);
    setR14f(value);
    onAnswerChange?.("r14f", value);
  };
  return (
    <>
      <div
        className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
        onClick={() => setShowTransaksiLainnya(!showTransaksiLainnya)}
      >
        <h3 className="text-lg font-semibold">I. PERNYATAAN TRANSAKSI LAINNYA</h3>
        <span
          className={`transition-transform duration-500 ease-in-out ${
            showTransaksiLainnya ? "rotate-180" : "rotate-0"
          }`}
        >
          <FaChevronDown />
        </span>
      </div>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          showTransaksiLainnya ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {" "}
        <div className="border rounded-md p-4 mb-4">
          <div className="divide-y">
            {/* 14a */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">14a</span>
                <span className="text-gray-800 text-base font-medium">
                  Harta pada akhir tahun pajak* (Isi lampiran 1 Bagian A, lalu ke pertanyaan
                  selanjutnya)
                  <span className="text-red-500">*</span>
                </span>
              </div>
              <div className="col-span-12 md:col-span-2"></div>
              <div className="col-span-12 md:col-span-3 text-sm"></div>
              <div className="col-span-12 md:col-span-2">
                <input
                  type="number"
                  min={0}
                  value={amt14a}
                  onChange={(e) => setAmt14a(+e.target.value || 0)}
                  className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                />
              </div>
            </div>

            {/* 14b */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">14b</span>
                <span className="text-gray-800 text-base font-medium">
                  Apakah anda memiliki utang pada akhir tahun pajak?
                  <span className="text-red-500">*</span>
                </span>
              </div>
              <div className="col-span-12 md:col-span-2">
                <div className="flex items-center gap-6">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r14b"
                      checked={r14b === true}
                      onChange={() => handleR14bChange(true)}
                    />
                    <span>Ya</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r14b"
                      checked={r14b === false}
                      onChange={() => handleR14bChange(false)}
                    />
                    <span>Tidak</span>
                  </label>
                </div>
              </div>
              <div className="col-span-12 md:col-span-3 text-sm">
                <div className="bg-blue-100 rounded px-3 py-2">
                  {r14b === true && "Ya, Silahkan mengisi lampiran 1 Tabel B "}
                  {r14b === false && "Tidak, Silahkan Melanjutkan ke pertanyaan berikutnya"}
                  {r14b === null && "Pilih salah satu Ya/Tidak"}
                </div>
              </div>
              <div className="col-span-12 md:col-span-2">
                <input
                  type="number"
                  min={0}
                  value={amt14b}
                  onChange={(e) => setAmt14b(+e.target.value || 0)}
                  className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                />
              </div>
            </div>

            {/* 14c */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">14c</span>
                <span className="text-gray-800 text-base font-medium">
                  Apakah anda Menerima penghasilan yang dikenakan pajak penghasilan bersifat final?
                  <span className="text-red-500">*</span>
                </span>
              </div>
              <div className="col-span-12 md:col-span-2">
                <div className="flex items-center gap-6">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r14c"
                      checked={r14c === true}
                      onChange={() => handleR14cChange(true)}
                    />
                    <span>Ya</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r14c"
                      checked={r14c === false}
                      onChange={() => handleR14cChange(false)}
                    />
                    <span>Tidak</span>
                  </label>
                </div>
              </div>
              <div className="col-span-12 md:col-span-3 text-sm">
                <div className="bg-blue-100 rounded px-3 py-2">
                  {r14c === true && "Ya, Silahkan mengisi lampiran 2 Tabel A "}
                  {r14c === false && "Tidak, Silahkan Melanjutkan ke pertanyaan berikutnya"}
                  {r14c === null && "Pilih salah satu Ya/Tidak"}
                </div>
              </div>
              <div className="col-span-12 md:col-span-2">
                <input
                  type="number"
                  min={0}
                  value={amt14c}
                  onChange={(e) => setAmt14c(+e.target.value || 0)}
                  className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                />
              </div>
            </div>

            {/* 14d */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">14d</span>
                <span className="text-gray-800 text-base font-medium">
                  Apakah anda Menerima penghasilan yang termasuk obajek pajak?
                  <span className="text-red-500">*</span>
                </span>
              </div>
              <div className="col-span-12 md:col-span-2">
                <div className="flex items-center gap-6">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r14d"
                      checked={r14d === true}
                      onChange={() => handleR14dChange(true)}
                    />
                    <span>Ya</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r14d"
                      checked={r14d === false}
                      onChange={() => handleR14dChange(false)}
                    />
                    <span>Tidak</span>
                  </label>
                </div>
              </div>
              <div className="col-span-12 md:col-span-3 text-sm">
                <div className="bg-blue-100 rounded px-3 py-2">
                  {r14d === true && "Ya, Silahkan mengisi lampiran 2 Tabel B "}
                  {r14d === false && "Tidak, Silahkan Melanjutkan ke pertanyaan berikutnya"}
                  {r14d === null && "Pilih salah satu Ya/Tidak"}
                </div>
              </div>
              <div className="col-span-12 md:col-span-2">
                <input
                  type="number"
                  min={0}
                  value={amt14d}
                  onChange={(e) => setAmt14d(+e.target.value || 0)}
                  className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                />
              </div>
            </div>

            {/* 14e */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">14e</span>
                <span className="text-gray-800 text-base font-medium">
                  Apakah anda Melaporkan biaya penyusutan dan/atau amortisasi fiskal?
                  <span className="text-red-500">*</span>
                </span>
              </div>
              <div className="col-span-12 md:col-span-2">
                <div className="flex items-center gap-6">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r14e"
                      checked={r14e === true}
                      onChange={() => handleR14eChange(true)}
                    />
                    <span>Ya</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r14e"
                      checked={r14e === false}
                      onChange={() => handleR14eChange(false)}
                    />
                    <span>Tidak</span>
                  </label>
                </div>
              </div>
              <div className="col-span-12 md:col-span-3 text-sm">
                <div className="bg-blue-100 rounded px-3 py-2">
                  {r14e === true && "Ya, Silahkan mengisi lampiran 3C "}
                  {r14e === false && "Tidak, Silahkan Melanjutkan ke pertanyaan berikutnya"}
                  {r14e === null && "Pilih salah satu Ya/Tidak"}
                </div>
              </div>
              <div className="col-span-12 md:col-span-2">
                <input
                  type="number"
                  min={0}
                  value={amt14e}
                  onChange={(e) => setAmt14e(+e.target.value || 0)}
                  className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                />
              </div>
            </div>

            {/* 14f */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">14f</span>
                <span className="text-gray-800 text-base font-medium">
                  Apakah anda melaporkan biaya entertainment, buaya promosi, penggantian atau
                  imbalan dalam bentuk natura dan/atau kenikmatan, serta piutang yang nyata-nyata
                  tidak dapat ditagih?
                  <span className="text-red-500">*</span>
                </span>
              </div>
              <div className="col-span-12 md:col-span-2">
                <div className="flex items-center gap-6">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r14f"
                      checked={r14f === true}
                      onChange={() => handleR14fChange(true)}
                    />
                    <span>Ya</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r14f"
                      checked={r14f === false}
                      onChange={() => handleR14fChange(false)}
                    />
                    <span>Tidak</span>
                  </label>
                </div>
              </div>
              <div className="col-span-12 md:col-span-3 text-sm">
                <div className="bg-blue-100 rounded px-3 py-2">
                  {r14f === true && "Ya, Silahkan mengisi lampiran 3D "}
                  {r14f === false && "Tidak, Silahkan Melanjutkan ke pertanyaan berikutnya"}
                  {r14f === null && "Pilih salah satu Ya/Tidak"}
                </div>
              </div>
              <div className="col-span-12 md:col-span-2">
                <input
                  type="number"
                  min={0}
                  value={amt14f}
                  onChange={(e) => setAmt14f(+e.target.value || 0)}
                  className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                />
              </div>
            </div>

            {/* 14g */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">14g</span>
                <span className="text-gray-800 text-base font-medium">
                  Apakah anda Menerima Dividen dan/atau penghasilan lain dari neger dan
                  melaporkannya sebagai penghasilan tidak termasuk obejek pajak?
                  <span className="text-red-500">*</span>
                </span>
              </div>
              <div className="col-span-12 md:col-span-2">
                <div className="flex items-center gap-6">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r14g"
                      checked={r14g === true}
                      onChange={() => setR14g(true)}
                    />
                    <span>Ya</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r14g"
                      checked={r14g === false}
                      onChange={() => setR14g(false)}
                    />
                    <span>Tidak</span>
                  </label>
                </div>
              </div>
              <div className="col-span-12 md:col-span-3 text-sm">
                <div className="bg-blue-100 rounded px-3 py-2">
                  {r14g === true &&
                    "Ya, Pastikan anda sudah menyampiakan laporan realisasi investasi secara terpisah"}
                  {r14g === false && "Tidak, Silahkan Melanjutkan ke pertanyaan berikutnya"}
                  {r14g === null && "Pilih salah satu Ya/Tidak"}
                </div>
              </div>
              <div className="col-span-12 md:col-span-2">
                <input
                  type="number"
                  min={0}
                  value={amt14g}
                  onChange={(e) => setAmt14g(+e.target.value || 0)}
                  className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                />
              </div>
            </div>

            {/* 14h */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">14h</span>
                <span className="text-gray-800 text-base font-medium">
                  Kelebihan PPh Final atas penghasilan dari usaha dengan peredaran Bruto tertentu
                  yang dapat dimintakan pengembalian. (Silahkan mengajukan permohonan pengembalian
                  pajak yang seharusnya tidak terhutang secara terpisah){" "}
                  <span className="text-red-500">*</span>
                </span>
              </div>
              <div className="col-span-12 md:col-span-2"></div>
              <div className="col-span-12 md:col-span-3 text-sm"></div>
              <div className="col-span-12 md:col-span-2">
                <input
                  type="number"
                  min={0}
                  value={amt14g}
                  onChange={(e) => setAmt14g(+e.target.value || 0)}
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

export default PertanyaanI;
