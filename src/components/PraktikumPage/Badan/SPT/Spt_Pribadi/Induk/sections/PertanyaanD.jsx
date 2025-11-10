import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const PertanyaanD = () => {
  const [showKreditPajak, setShowKreditPajak] = useState(false);

  // State untuk Bagian D - KREDIT PAJAK
  const [r10a, setR10a] = useState(null);
  const [amt10a, setAmt10a] = useState(0);
  const [r10b, setR10b] = useState(null);
  const [amt10b, setAmt10b] = useState(0);
  const [r10c, setR10c] = useState(null);
  const [amt10c, setAmt10c] = useState(0);
  const [r10d, setR10d] = useState(null);
  const [amt10d, setAmt10d] = useState(0);

  return (
    <>
      {/* Kredit Pajak */}
      <div
        className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
        onClick={() => setShowKreditPajak(!showKreditPajak)}
      >
        <h3 className="text-lg font-semibold">D. KREDIT PAJAK</h3>
        <span
          className={`transition-transform duration-500 ease-in-out ${
            showKreditPajak ? "rotate-180" : "rotate-0"
          }`}
        >
          <FaChevronDown />
        </span>
      </div>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          showKreditPajak ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="border rounded-md p-4 mb-4">
          <div className="divide-y">
            {/* 10a */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">10a</span>
                <span className="text-gray-800 text-base font-medium">
                  Apakah Terdapat Pengurangan PPh Yang Telah Dipotong/Dipungut oleh pihak lain ?
                  <span className="text-red-500">*</span>
                </span>
              </div>
              <div className="col-span-12 md:col-span-2">
                <div className="flex items-center gap-6">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r10a"
                      checked={r10a === true}
                      onChange={() => setR10a(true)}
                    />
                    <span>Ya</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r10a"
                      checked={r10a === false}
                      onChange={() => setR10a(false)}
                    />
                    <span>Tidak</span>
                  </label>
                </div>
              </div>
              <div className="col-span-12 md:col-span-3 text-sm">
                <div className="bg-blue-100 rounded px-3 py-2">
                  {r10a === true && "Ya, Silahkan Mengisi Lampiran 1 Bagian E "}
                  {r10a === false && "Tidak. Silahkan Melanjutkan ke pertanyaan berikutnya."}
                  {r10a === null && "Pilih salah satu Ya/Tidak"}
                </div>
              </div>
              <div className="col-span-12 md:col-span-2">
                <input
                  type="number"
                  min={0}
                  value={amt10a}
                  onChange={(e) => setAmt10a(+e.target.value || 0)}
                  className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                />
              </div>
            </div>

            {/* 10b */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">10b</span>
                <span className="text-gray-800 text-base font-medium">Angsuran Pph Pasal 25</span>
              </div>
              <div className="col-span-12 md:col-span-5"></div>
              <div className="col-span-12 md:col-span-2">
                <input
                  type="number"
                  min={0}
                  value={amt10b}
                  onChange={(e) => setAmt10b(+e.target.value || 0)}
                  className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                />
              </div>
            </div>

            {/* 10c */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">10c</span>
                <span className="text-gray-800 text-base font-medium">
                  SPT PPh pasal 25 (Hanya Pokok Pajak){" "}
                </span>
              </div>
              <div className="col-span-12 md:col-span-5"></div>
              <div className="col-span-12 md:col-span-2">
                <input
                  type="number"
                  min={0}
                  value={amt10c}
                  onChange={(e) => setAmt10c(+e.target.value || 0)}
                  className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                />
              </div>
            </div>

            {/* 10d */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">10d</span>
                <span className="text-gray-800 text-base font-medium">
                  Apakah Terdapat Pengurangan PPh Yang Telah Dipotong/Dipungut oleh pihak lain ?
                  <span className="text-red-500">*</span>
                </span>
              </div>
              <div className="col-span-12 md:col-span-2">
                <div className="flex items-center gap-6">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r10d"
                      checked={r10d === true}
                      onChange={() => setR10d(true)}
                    />
                    <span>Ya</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r10d"
                      checked={r10d === false}
                      onChange={() => setR10d(false)}
                    />
                    <span>Tidak</span>
                  </label>
                </div>
              </div>
              <div className="col-span-12 md:col-span-3 text-sm">
                <div className="bg-blue-100 rounded px-3 py-2">
                  {r10d === true &&
                    "Ya, Isi dengan Jumlah Pengembalian/Pengurangan Kredit PPh Luar Negeri "}
                  {r10d === false && "Tidak. Silahkan Melanjutkan ke pertanyaan berikutnya."}
                  {r10d === null && "Pilih salah satu Ya/Tidak"}
                </div>
              </div>
              <div className="col-span-12 md:col-span-2">
                <input
                  type="number"
                  min={0}
                  value={amt10d}
                  onChange={(e) => setAmt10d(+e.target.value || 0)}
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
