import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const PertanyaanE = () => {
  const [showKurangLebihBayar, setShowKurangLebihBayar] = useState(false);

  // State untuk Bagian E - PPh KURANG/LEBIH BAYAR
  const [r11a, setR11a] = useState(null);
  const [amt11a, setAmt11a] = useState(0);
  const [r11b, setR11b] = useState(null);
  const [amt11b, setAmt11b] = useState(0);
  const [r11c, setR11c] = useState(null);
  const [amt11c, setAmt11c] = useState(0);

  return (
    <>
      {/* PPh KURANG/LEBIH BAYAR */}
      <div 
        className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
        onClick={() => setShowKurangLebihBayar(!showKurangLebihBayar)}
      >
        <h3 className="text-lg font-semibold">E. PPh KURANG/LEBIH BAYAR</h3>
        <span
          className={`transition-transform duration-500 ease-in-out ${
            showKurangLebihBayar ? "rotate-180" : "rotate-0"
          }`}
        >
          <FaChevronDown />
        </span>
      </div>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          showKurangLebihBayar ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="border rounded-md p-4 mb-4">
          <div className="divide-y">
            {/* 11a */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">11a</span>
                <span className="text-gray-800 text-base font-medium">
                  PPh Kurang/Lebih Bayar (9 - 10a - 10b - 10c + 10d){" "}
                </span>
              </div>
              <div className="col-span-12 md:col-span-5"></div>
              <div className="col-span-12 md:col-span-2">
                <input
                  type="number"
                  min={0}
                  value={amt11a}
                  onChange={(e) => setAmt11a(+e.target.value || 0)}
                  className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                />
              </div>
            </div>

            {/* 11b */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">11b</span>
                <span className="text-gray-800 text-base font-medium">
                  Apakah Terdapat Surat Keputusan Persetujuan Pengangsuran atau Penundaan Pembayaran
                  Pajak?
                </span>
              </div>
              <div className="col-span-12 md:col-span-2">
                <div className="flex items-center gap-6">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r11b"
                      checked={r11b === true}
                      onChange={() => setR11b(true)}
                    />
                    <span>Ya</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r11b"
                      checked={r11b === false}
                      onChange={() => setR11b(false)}
                    />
                    <span>Tidak</span>
                  </label>
                </div>
              </div>
              <div className="col-span-12 md:col-span-3 text-sm">
                <div className="bg-blue-100 rounded px-3 py-2">
                  {r11b === true &&
                    "Ya, Isi dengan Jumlah yang telah disetujui untuk diangsur/ditunda "}
                  {r11b === false && "Tidak. Saya tidak Memiliki"}
                  {r11b === null && "Pilih salah satu Ya/Tidak"}
                </div>
              </div>
              <div className="col-span-12 md:col-span-2">
                <input
                  type="number"
                  min={0}
                  value={amt11b}
                  onChange={(e) => setAmt11b(+e.target.value || 0)}
                  className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                />
              </div>
            </div>

            {/* 11c */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">11c</span>
                <span className="text-gray-800 text-base font-medium">
                  PPh yang masih harus dibayar (11a-11b){" "}
                </span>
              </div>
              <div className="col-span-12 md:col-span-5"></div>
              <div className="col-span-12 md:col-span-2">
                <input
                  type="number"
                  min={0}
                  value={amt11c}
                  onChange={(e) => setAmt11c(+e.target.value || 0)}
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

export default PertanyaanE;
