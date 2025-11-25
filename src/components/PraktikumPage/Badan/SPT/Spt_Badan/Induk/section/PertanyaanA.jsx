import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const PertanyaanA = () => {
  const [showIdentitasWajibPajak, setShowIdentitasWajibPajak] = useState(false);

  return (
    <>
      <div
        className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
        onClick={() => setShowIdentitasWajibPajak(!showIdentitasWajibPajak)}
      >
        <h3 className="text-lg font-semibold">A. IDENTITAS WAJIB PAJAK</h3>
        <span
          className={`transition-transform duration-500 ease-in-out ${
            showIdentitasWajibPajak ? "rotate-180" : "rotate-0"
          }`}
        >
          <FaChevronDown />
        </span>
      </div>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          showIdentitasWajibPajak ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="border rounded-md p-4 mb-4">
          <div className="mt-4 flex justify-between gap-4">
            <label className="w-64 flex-none block text-sm font-base text-gray-700 font-semibold">
              NPWP
            </label>
            <input
              type="text"
              readOnly
              // value={data.npwp}
              className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
            />
          </div>
          <div className="mt-4 flex justify-between gap-4">
            <label className="w-64 flex-none block text-sm font-base text-gray-700 font-semibold">
              NAMA
            </label>
            <input
              type="text"
              readOnly
              // value={data.nama_pengusaha}
              className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
            />
          </div>
          {/* <div className="mt-4 flex justify-between gap-4">
                        <label className="w-64 flex-none block text-sm font-base text-gray-700 font-semibold">
                            JENIS ID
                        </label>
                        <input
                            type="text"
                            readOnly
                            // value={data.alamat}
                            className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                        />
                    </div> */}
          {/* <div className="mt-4 flex justify-between gap-4">
                        <label className="w-64 flex-none block text-sm font-base text-gray-700 font-semibold">
                            NOMOR ID
                        </label>
                        <input
                            type="text"
                            readOnly
                            // value={data.nomor_telpon}
                            className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                        />
                    </div> */}
          <div className="mt-4 flex justify-between gap-4">
            <label className="w-64 flex-none block text-sm font-base text-gray-700 font-semibold">
              NOMOR TELEPON
            </label>
            <input
              type="text"
              readOnly
              // value={data.nomor_telpon}
              className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
            />
          </div>
          <div className="mt-4 flex justify-between gap-4">
            <label className="w-64 flex-none block text-sm font-base text-gray-700 font-semibold">
              EMAIL
            </label>
            <input
              type="email"
              readOnly
              // value={data.nomor_telpon}
              className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
            />
          </div>
          {/* <div className="mt-4 flex justify-between gap-4">
                        <label className="w-64 flex-none block text-sm font-base text-gray-700 font-semibold">
                            STATUS KEWAJIBAN PERPAJAKAN SUAMI DAN ISTRI
                            <span className="text-red-500 text-xs">
                                (Isi Jika Status adalah PH/MT)
                            </span>
                        </label>
                        <select className="w-64 flex-auto border p-2 rounded text-base">
                            <option value="">Please Select</option>
                            <option value="fasilitas_lainnya">Pisah Harta (PH)</option>
                            <option value="pph_ditanggung_pemerintah">
                                Memilih Terpisah (MT){" "}
                            </option>
                        </select>
                    </div>
                    <div className="mt-4 flex justify-between gap-4">
                        <label className="w-64 flex-none block text-sm font-base text-gray-700 font-semibold">
                            NIK/NPWP SUAMI/ISTRI
                        </label>
                        <input
                            type="text"
                            readOnly
                            // value={}
                            className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                        />
                    </div> */}
        </div>
      </div>
    </>
  );
};

export default PertanyaanA;
