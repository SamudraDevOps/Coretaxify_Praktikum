import React, { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const PertanyaanJ = ({ onAnswerChange, answersState }) => {
  const [showSection, setShowSection] = useState(false);
  const [isStatementChecked, setIsStatementChecked] = useState(false);

  const [persetujuan, setPersetujuan] = useState(null);
  const [penandatangan, setPenandatangan] = useState(null);

  // Load initial values from parent if available
  useEffect(() => {
    if (answersState) {
    }
  }, [answersState]);

  const [textInputStyle, setTextInputStyle] = useState({
    nama: "",
    npwp: "",
    jabatan: "",
  });

  const [radios, setRadios] = useState({
    penandatangan: null,
    persetujuan: null,
  });

  const handleRadioChange = (field, value) => {
    setRadios((prev) => ({ ...prev, [field]: value }));
    onAnswerChange?.(field, value);
    console.log("Radio changed:", field, value);

    // logic khusus: kalau field = false, reset
    if (field === "persetujuan" && value === false) {
      setRadios((prev) => ({ ...prev, nama: "", npwp: "", jabatan: "" }));
    }
  };

  return (
    <>
      <div
        className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
        onClick={() => setShowSection(!showSection)}
      >
        <h3 className="text-lg font-semibold">J. PERNYATAAN</h3>
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
          showSection ? "opacity-100 overflow-visible" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="divide-y">
          <div className="border rounded-md p-4 mb-4">
            <div className="text-sm font-bold italic">
              <input
                type="checkbox"
                className="m-2"
                checked={radios.persetujuan === true}
                onChange={(e) => handleRadioChange("persetujuan", e.target.checked)}
              />
              Dengan menyadari sepenuhnya akan segala akibatnya termasuk sanksi-sanksi sesuai dengan
              ketentuan perundang-undangan yang berlaku, saya menyatakan bahwa apa yang telah saya
              beritahukan di atas beserta lampiran-lampirannya adalah benar, lengkap dan jelas.
              Penandatangan
              {radios.persetujuan !== true && (
                <span className="text-red-500 text-l ml-2"> (Wajib dicentang)</span>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <label className="block text-sm font-medium text-gray-700 col-span-1">
                  Penandatangan
                  <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="TaxPayer"
                    checked={radios.penandatangan === "TaxPayer"}
                    onChange={() => handleRadioChange("penandatangan", "TaxPayer")}
                    name="ditandatangani"
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                  <label htmlFor="PKP" className="text-gray-700 text-sm">
                    TaxPayer
                  </label>
                  <input
                    type="radio"
                    id="Representative"
                    checked={radios.penandatangan === "Representative"}
                    onChange={() => handleRadioChange("penandatangan", "Representative")}
                    name="ditandatangani"
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    // onClick={(e) => e.target.parentElement.previousElementSibling.click()}
                  />
                  <label htmlFor="Representative" className="text-gray-700 text-sm">
                    Representative
                  </label>
                </div>
              </div>
            </div>
            <label className="block text-sm font-medium text-gray-700 col-span-1 pt-5">
              Tanda Tangan
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <label className="block text-sm font-medium text-gray-700 col-span-1">NPWP</label>
                <div className="flex items-center space-x-2 w-full">
                  <input
                    type="text"
                    value={textInputStyle.npwp}
                    readOnly={radios.persetujuan !== true}
                    onChange={(e) => setTextInputStyle({ ...textInputStyle, npwp: e.target.value })}
                    className={`w-full text-center p-2 border rounded-md text-sm ${
                      radios.persetujuan === true ? "bg-white" : "bg-gray-200"
                    }`}
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <label className="block text-sm font-medium text-gray-700 col-span-1">Nama</label>
                <div className="flex items-center space-x-2 w-full">
                  <input
                    type="text"
                    value={textInputStyle.nama}
                    readOnly={radios.persetujuan !== true}
                    onChange={(e) => setTextInputStyle({ ...textInputStyle, nama: e.target.value })}
                    className={`w-full text-center p-2 border rounded-md text-sm ${
                      radios.persetujuan === true ? "bg-white" : "bg-gray-200"
                    }`}
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <label className="block text-sm font-medium text-gray-700 col-span-1">
                  Jabatan
                </label>
                <div className="flex items-center space-x-2 w-full">
                  <input
                    type="text"
                    value={textInputStyle.jabatan}
                    readOnly={radios.persetujuan !== true}
                    onChange={(e) =>
                      setTextInputStyle({ ...textInputStyle, jabatan: e.target.value })
                    }
                    className={`w-full text-center p-2 border rounded-md text-sm ${
                      radios.persetujuan === true ? "bg-white" : "bg-gray-200"
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PertanyaanJ;
