import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const PertanyaanJ = () => {
  const [showLampiranTambahan, setShowLampiranTambahan] = useState(false);
  
  // State untuk Bagian J - LAMPIRAN TAMBAHAN
  const [ra, setRa] = useState(null);
  const [rb, setRb] = useState(null);
  const [rc, setRc] = useState(null);
  const [rd, setRd] = useState(null);
  const [re, setRe] = useState(null);

  return (
    <>
      <div
        className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
        onClick={() => setShowLampiranTambahan(!showLampiranTambahan)}
      >
        <h3 className="text-lg font-semibold">
          J. LAMPIRAN TAMBAHAN
        </h3>
        {showLampiranTambahan ? <FaChevronUp /> : <FaChevronDown />}
      </div>
      {showLampiranTambahan && (
        <div className="border rounded-md p-4 mb-4">
          <div className="divide-y">
            {/* J-a*/}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">
                  a
                </span>
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
                      checked={ra === true}
                      onChange={() => setRa(true)}
                    />
                    <span>Ya</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="ra"
                      checked={ra === false}
                      onChange={() => setRa(false)}
                    />
                    <span>Tidak</span>
                  </label>
                </div>
              </div>
              <div className="col-span-12 md:col-span-3 text-sm">
                <div className="bg-blue-100 rounded px-3 py-2">
                  {ra === true &&
                    "Ya, Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
                  {ra === false &&
                    "Tidak, Jenis Pembukaan adalah Pembukaan Sederhana"}
                  {ra === null && "Pilih salah satu Ya/Tidak"}
                </div>
              </div>
            </div>

  {/* J-b*/}
                    <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
                      <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                        <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">
                          b
                        </span>
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
                              checked={rb === true}
                              onChange={() => setRb(true)}
                            />
                            <span>Ya</span>
                          </label>
                          <label className="inline-flex items-center gap-2">
                            <input
                              type="radio"
                              name="rb"
                              checked={rb === false}
                              onChange={() => setRb(false)}
                            />
                            <span>Tidak</span>
                          </label>
                        </div>
                      </div>
                      <div className="col-span-12 md:col-span-3 text-sm">
                        <div className="bg-blue-100 rounded px-3 py-2">
                          {rb === true &&
                            "Ya, Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
                          {rb === false &&
                            "Tidak, Tidak ada Berkas yang perlu dilampirkan "}
                          {rb === null && "Pilih salah satu Ya/Tidak"}
                        </div>
                      </div>
                    </div>

                    {/* J-c*/}
                    <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
                      <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                        <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">
                          c
                        </span>
                        <span className="text-gray-800 text-base font-medium">
                          Bukti Pemotongan/Pemumutan sehubung dengan kredit
                          pajak luar negeri
                          {/* <span className="text-red-500">*</span> */}
                        </span>
                      </div>
                      <div className="col-span-12 md:col-span-2">
                        <div className="flex items-center gap-6">
                          <label className="inline-flex items-center gap-2">
                            <input
                              type="radio"
                              name="rc"
                              checked={rc === true}
                              onChange={() => setRc(true)}
                            />
                            <span>Ya</span>
                          </label>
                          <label className="inline-flex items-center gap-2">
                            <input
                              type="radio"
                              name="rc"
                              checked={rc === false}
                              onChange={() => setRc(false)}
                            />
                            <span>Tidak</span>
                          </label>
                        </div>
                      </div>
                      <div className="col-span-12 md:col-span-3 text-sm">
                        <div className="bg-blue-100 rounded px-3 py-2">
                          {rc === true &&
                            "Ya, Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
                          {rc === false &&
                            "Tidak, Tidak ada Berkas yang perlu dilampirkan "}
                          {rc === null && "Pilih salah satu Ya/Tidak"}
                        </div>
                      </div>
                    </div>

                    {/* J-d*/}
                    <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
                      <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                        <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">
                          d
                        </span>
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
                              checked={rd === true}
                              onChange={() => setRd(true)}
                            />
                            <span>Ya</span>
                          </label>
                          <label className="inline-flex items-center gap-2">
                            <input
                              type="radio"
                              name="rd"
                              checked={rd === false}
                              onChange={() => setRd(false)}
                            />
                            <span>Tidak</span>
                          </label>
                        </div>
                      </div>
                      <div className="col-span-12 md:col-span-3 text-sm">
                        <div className="bg-blue-100 rounded px-3 py-2">
                          {rd === true &&
                            "Ya, Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
                          {rd === false &&
                            "Tidak, Lorem ipsum dolor sit amet, consectetur adipiscing elit. "}
                          {rd === null && "Pilih salah satu Ya/Tidak"}
                        </div>
                      </div>
                    </div>

                    {/* J-e*/}
                    <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
                      <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                        <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">
                          e
                        </span>
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
                              checked={re === true}
                              onChange={() => setRe(true)}
                            />
                            <span>Ya</span>
                          </label>
                          <label className="inline-flex items-center gap-2">
                            <input
                              type="radio"
                              name="re"
                              checked={re === false}
                              onChange={() => setRe(false)}
                            />
                            <span>Tidak</span>
                          </label>
                        </div>
                      </div>
                      <div className="col-span-12 md:col-span-3 text-sm">
                        <div className="bg-blue-100 rounded px-3 py-2">
                          {re === true &&
                            "Ya, Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
                          {re === false &&
                            "Tidak, Lorem ipsum dolor sit amet, consectetur adipiscing elit. "}
                          {re === null && "Pilih salah satu Ya/Tidak"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>         
    
      )}
    </>
  );
};

export default PertanyaanJ;