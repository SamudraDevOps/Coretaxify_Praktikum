import React, { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { formatRupiah, formatNumber, parseFormattedNumber } from "@utils/formatCurrency";
import HeaderLampiran from "./HeaderLampiran";
// import HartaBerjuwudIndex from "@sections/Lampiran3/Lampiran3C/HartaBerwujud"; // Atau BagianA/index
import Kelompok1IndexBerwujud from "./sections/Lampiran3/Lampiran3C/HartaBerwujud";
import Kelompok1IndexTidakBerwujud from "./sections/Lampiran3/Lampiran3C/HartaTidakBerwujud";
import BangunanTidakPermanenIndex from "@sections/Lampiran3/Lampiran3C/Bangunan";
import GlobalFormField from "./components/shared/GlobalFormField";

export default function Lampiran_3C({ data }) {
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
        <span
            className={`transition-transform duration-500 ease-in-out ${
              showBagianA ? "rotate-180" : "rotate-0"
            }`}
          >
            <FaChevronDown />
          </span>
        </div>
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            showBagianA ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="border rounded-md p-4 space-y-4">
            {/* Sub-Bagian Harta Berwujud - Kelompok 1 */}
            <div className="ml-4">
              <div
                className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
                onClick={() => setShowKelompok1Berwujud(!showKelompok1Berwujud)}
              >
                <h4 className="text-lg font-semibold">KELOMPOK 1</h4>
                <span
                  className={`transition-transform duration-500 ease-in-out ${
                    showKelompok1Berwujud ? "rotate-180" : "rotate-0"
                   }`}
                  >
                    <FaChevronDown />
                  </span>
                </div>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  showKelompok1Berwujud ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="border rounded-md p-4">
                  <Kelompok1IndexBerwujud />
                </div>
                </div>
            </div>
          </div>
          </div>
      </div>

      {/* Bagian B - BANGUNAN */}
      <div>
        <div
          className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
          onClick={() => setShowBagianB(!showBagianB)}
        >
          <h3 className="text-lg font-semibold">BAGUNAN</h3>
        <span
            className={`transition-transform duration-500 ease-in-out ${
              showBagianB ? "rotate-180" : "rotate-0"
            }`}
          >
            <FaChevronDown />
          </span>
        </div>
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            showBagianB ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="border rounded-md p-4 space-y-4">
            {/* Sub-Bagian Harta Berwujud - Kelompok 1 */}
            <div className="ml-4">
              <div
                className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
                onClick={() => setShowTidakPermanen(!showTidakPermanen)}
              >
                <h4 className="text-lg font-semibold"> TIDAK PERMANEN</h4>
                <span
                  className={`transition-transform duration-500 ease-in-out ${
                    showTidakPermanen ? "rotate-180" : "rotate-0"
                   }`}
                  >
                    <FaChevronDown />
                  </span>
                </div>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  showTidakPermanen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="border rounded-md p-4">
                  <BangunanTidakPermanenIndex />
                </div>
                </div>
            </div>
          </div>
          </div>
      </div>

      <div className="border rounded-md p-4 space-y-4">
        <GlobalFormField
          customChildren={[
            {
              key: "penFiskal",
              type: "currency",
              title: "Jumlah Penyusutan Fiskal Tahun ini",
              placeholder: "",
              readOnly: true,
            },

            {
              key: "penKomersial",
              type: "currency",
              title: "Jumlah Penyusutan Komersial",
              placeholder: "",
            },

            {
              key: "selisihPen",
              type: "currency",
              title: "Selisih Penyusutan",
              placeholder: "",
              readOnly: true,
            },
          ]}
          formData={form}
          onFieldChange={(key, value) => setForm((prev) => ({ ...prev, [key]: value }))}
          labelWidth="w-80"
        />
      </div>

      {/* Bagian C - Harta Tidak Berwujud */}
      <div>
        <div
          className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
          onClick={() => setShowBagianC(!showBagianC)}
        >
          <h3 className="text-lg font-semibold">HARTA TIDAK BERWUJUD</h3>
        <span
            className={`transition-transform duration-500 ease-in-out ${
              showBagianC ? "rotate-180" : "rotate-0"
            }`}
          >
            <FaChevronDown />
          </span>
        </div>
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            showBagianC ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="border rounded-md p-4 space-y-4">
            {/* Sub-Bagian Harta Tidak Berwujud - Kelompok 1 */}
            <div className="ml-4">
              <div
                className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
                onClick={() => setShowKelompok1TidakBerwujud(!showKelompok1TidakBerwujud)}
              >
                <h4 className="text-lg font-semibold">KELOMPOK 1</h4>
                <span
                  className={`transition-transform duration-500 ease-in-out ${
                    showKelompok1TidakBerwujud ? "rotate-180" : "rotate-0"
                   }`}
                  >
                    <FaChevronDown />
                  </span>
                </div>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  showKelompok1TidakBerwujud ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="border rounded-md p-4">
                  <Kelompok1IndexTidakBerwujud />
                </div>
                </div>
            </div>
          </div>
          </div>
      </div>

      <div className="border rounded-md p-4 space-y-4">
        <GlobalFormField
          customChildren={[
            {
              key: "amorFiskal",
              type: "currency",
              title: "Jumlah Amortisasi Fiskal Tahun ini",
              placeholder: "",
              readOnly: true,
            },

            {
              key: "amorKomersial",
              type: "currency",
              title: "Jumlah Amortisasi Komersial ",
              placeholder: "",
            },

            {
              key: "selisihAmor",
              type: "currency",
              title: "Selisih Amortisasi",
              placeholder: "",
              readOnly: true,
            },
          ]}
          formData={form}
          onFieldChange={(key, value) => setForm((prev) => ({ ...prev, [key]: value }))}
          labelWidth="w-80"
        />
      </div>
    </div>
  );
}
