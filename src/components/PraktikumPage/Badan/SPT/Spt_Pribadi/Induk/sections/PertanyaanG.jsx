import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const PertanyaanG = () => {
  const [showPengembalianPPh, setShowPengembalianPPh] = useState(false);
  const [pilihan, setPilihan] = useState("");

  return (
    <>
      {/* G. Permohonan Pengembalian PPh Lebih Bayar */}
      <div
        className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
        onClick={() => setShowPengembalianPPh(!showPengembalianPPh)}
      >
        <h3 className="text-lg font-semibold">
          G. PERMOHONAN PENGEMBALIAN PPh LEBIH BAYAR (DIISI JIKA STATUS
          SPT ADALAH LEBIH BAYAR)
        </h3>
        {showPengembalianPPh ? <FaChevronUp /> : <FaChevronDown />}
      </div>
      {showPengembalianPPh && (
        <div className="border rounded-md p-4 mb-4">
          <div className="divide-y">
            <div className="grid grid-cols-12 gap-4 items-start">
              {/* Kolom Kiri */}
              <div className="col-span-12 md:col-span-6 self-start">
                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    PPh lebih bayar pada 11a atau 12b mohon:
                  </label>
                  <select
                    className="w-full p-2 border rounded-md text-sm bg-white"
                    value={pilihan}
                    onChange={(e) => setPilihan(e.target.value)}
                  >
                    <option value="">Silakan Pilih</option>
                    <option value="rekening1">Rekening 1</option>
                    <option value="rekening2">Rekening 2</option>
                  </select>
                </div>
              </div>

              {/* Kolom Kanan */}
              <div className="col-span-12 md:col-span-6 space-y-3">
                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-700 w-40">
                    Pilih Rekening Bank
                  </label>
                  <button className="px-3 py-2 border rounded bg-gray-100 hover:bg-gray-200">
                    📂
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-700 w-40">
                    Nomor Rekening
                  </label>
                  <input
                    type="text"
                    className="flex-1 p-2 border rounded-md bg-gray-100 text-sm"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-700 w-40">
                    Nama Bank
                  </label>
                  <input
                    type="text"
                    className="flex-1 p-2 border rounded-md bg-gray-100 text-sm"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-700 w-40">
                    Nama Pemilik Rekening
                  </label>
                  <input
                    type="text"
                    className="flex-1 p-2 border rounded-md bg-gray-100 text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PertanyaanG;