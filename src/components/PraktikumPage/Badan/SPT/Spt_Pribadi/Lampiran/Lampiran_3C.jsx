import React, { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { formatRupiah, formatNumber, parseFormattedNumber } from "@utils/formatCurrency";
import HeaderLampiran from "./HeaderLampiran";
// import HartaBerjuwudIndex from "@sections/Lampiran3/Lampiran3C/HartaBerwujud"; // Atau BagianA/index
import Kelompok1IndexBerwujud from "./sections/Lampiran3/Lampiran3C/HartaBerwujud";
import Kelompok1IndexTidakBerwujud from "./sections/Lampiran3/Lampiran3C/HartaTidakBerwujud";
import BangunanTidakPermanenIndex from "@sections/Lampiran3/Lampiran3C/Bangunan";

export default function Lampiran_3({ data }) {
  const [showBagianA, setShowBagianA] = useState(true);
  const [showBagianB, setShowBagianB] = useState(true);
  const [showBagianC, setShowBagianC] = useState(true);

  const [showKelompok1Berwujud, setShowKelompok1Berwujud] = useState(false);
  const [showKelompok1TidakBerwujud, setShowKelompok1TidakBerwujud] = useState(false);
  const [showTidakPermanen, setShowTidakPermanen] = useState(false);

  // useEffect(() => {
  //   const base = {};
  //   schema.forEach((f) => {
  //     const defVal = f.type === "number" ? 0 : "";
  //     base[f.name] = initialData?.[f.name] ?? defVal;
  //   });
  //   setForm(base);
  // }, [schema, initialData]);

  const [form, setForm] = useState({
    penFiskal: "",
    penKomersial: "",
    selisihPen: "",
    amorFiskal: "",
    amorKomersial: "",
    selisihAmor: "",
  });
  const handleNumericChange = (fieldName) => (e) => {
    const numericValue = parseFormattedNumber(e.target.value);
    setForm((prev) => ({
      ...prev,
      [fieldName]: numericValue === null ? "" : numericValue,
    }));
  };

  return (
    <div className="space-y-4 ">
      <ul className="space-y-2 pl-3">
        {["A. INCOME - SUBJECT TO FINAL TAX", "B. INCOME - EXCLUDE FROM TAX"].map((t, i) => (
          <li
            key={i}
            className="relative pl-5 uppercase tracking-wide
                       before:content-['•'] before:absolute before:left-0
                      before:text-black before:font-extrabold before:text-xl"
          >
            {t}
          </li>
        ))}
      </ul>
      <HeaderLampiran />

      {/* Bagian A - Harta Berwujud */}
      <div>
        <div
          className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
          onClick={() => setShowBagianA(!showBagianA)}
        >
          <h3 className="text-lg font-semibold">HARTA BERWUJUD</h3>
          {showBagianA ? <FaChevronUp /> : <FaChevronDown />}
        </div>

        {showBagianA && (
          <div className="border rounded-md p-4 space-y-4">
            {/* Sub-Bagian Harta Berwujud - Kelompok 1 */}
            <div className="ml-4">
              <div
                className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
                onClick={() => setShowKelompok1Berwujud(!showKelompok1Berwujud)}
              >
                <h4 className="text-lg font-semibold">KELOMPOK 1</h4>
                {showKelompok1Berwujud ? <FaChevronUp /> : <FaChevronDown />}
              </div>

              {showKelompok1Berwujud && (
                <div className="border rounded-md p-4">
                  <Kelompok1IndexBerwujud />
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Bagian B - BANGUNAN */}
      <div>
        <div
          className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
          onClick={() => setShowBagianB(!showBagianB)}
        >
          <h3 className="text-lg font-semibold">BAGUNAN</h3>
          {showBagianB ? <FaChevronUp /> : <FaChevronDown />}
        </div>

        {showBagianB && (
          <div className="border rounded-md p-4 space-y-4">
            {/* Sub-Bagian Harta Berwujud - Kelompok 1 */}
            <div className="ml-4">
              <div
                className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
                onClick={() => setShowTidakPermanen(!showTidakPermanen)}
              >
                <h4 className="text-lg font-semibold"> TIDAK PERMANEN</h4>
                {showTidakPermanen ? <FaChevronUp /> : <FaChevronDown />}
              </div>

              {showTidakPermanen && (
                <div className="border rounded-md p-4">
                  <BangunanTidakPermanenIndex />
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="border rounded-md p-4 space-y-4">
        {/* Jumlah Penyusutan Fiskal Tahun ini */}
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium w-80 flex-shrink-0">
            Jumlah Penyusutan Fiskal Tahun ini
          </label>
          <input
            readOnly
            type="text"
            value={formatNumber(form.penFiskal || 0)}
            onChange={handleNumericChange("penFiskal")}
            className="flex-1 p-2 border rounded-md bg-gray-100 text-sm"
          />
        </div>

        {/* Jumlah Penyusutan Komersial Tahun ini */}
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium w-80 flex-shrink-0">
            Jumlah Penyusutan Komersial Tahun ini
          </label>
          <input
            // readOnly
            type="text"
            value={formatNumber(form.penKomersial || 0)}
            onChange={handleNumericChange("penKomersial")}
            className="flex-1 p-2 border rounded-md text-sm font-medium"
          />
        </div>

        {/* Selisih Penyusutan */}
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium w-80 flex-shrink-0">Selisih Penyusutan</label>
          <input
            readOnly
            type="text"
            value={formatNumber(form.penFiskal || 0)}
            onChange={handleNumericChange("penFiskal")}
            className="flex-1 p-2 border rounded-md bg-gray-100 text-sm"
          />
        </div>
      </div>

      {/* Bagian C - Harta Tidak Berwujud */}
      <div>
        <div
          className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
          onClick={() => setShowBagianC(!showBagianC)}
        >
          <h3 className="text-lg font-semibold">HARTA TIDAK BERWUJUD</h3>
          {showBagianC ? <FaChevronUp /> : <FaChevronDown />}
        </div>

        {showBagianC && (
          <div className="border rounded-md p-4 space-y-4">
            {/* Sub-Bagian Harta Tidak Berwujud - Kelompok 1 */}
            <div className="ml-4">
              <div
                className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
                onClick={() => setShowKelompok1TidakBerwujud(!showKelompok1TidakBerwujud)}
              >
                <h4 className="text-lg font-semibold">KELOMPOK 1</h4>
                {showKelompok1TidakBerwujud ? <FaChevronUp /> : <FaChevronDown />}
              </div>

              {showKelompok1TidakBerwujud && (
                <div className="border rounded-md p-4">
                  <Kelompok1IndexTidakBerwujud />
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="border rounded-md p-4 space-y-4">
        {/* Jumlah Amortisasi Fiskal Tahun ini */}
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium w-80 flex-shrink-0">
            Jumlah Amortisasi Fiskal Tahun ini
          </label>
          <input
            readOnly
            type="text"
            value={formatNumber(form.amorFiskal || 0)}
            onChange={handleNumericChange("amorFiskal")}
            className="flex-1 p-2 border rounded-md bg-gray-100 text-sm"
          />
        </div>

        {/* Jumlah Amortiasasi Komersial Tahun ini */}
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium w-80 flex-shrink-0">
            Jumlah Amortisasi Komersial Tahun ini
          </label>
          <input
            // readOnly
            type="text"
            value={formatNumber(form.amorKomersial || 0)}
            onChange={handleNumericChange("amorKomersial")}
            className="flex-1 p-2 border rounded-md text-sm font-medium"
          />
        </div>

        {/* Selisih Amortisasi */}
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium w-80 flex-shrink-0">Selisih Amortisasi</label>
          <input
            readOnly
            type="text"
            value={formatNumber(form.selisihAmor || 0)}
            onChange={handleNumericChange("selisihAmor")}
            className="flex-1 p-2 border rounded-md bg-gray-100 text-sm"
          />
        </div>
      </div>
    </div>
  );
}
