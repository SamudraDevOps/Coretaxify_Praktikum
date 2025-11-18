import React, { useState, useCallback } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import HeaderLampiran from "./HeaderLampiran";
import KompensasiKerugian from "@sections/Lampiran5/BagianA";
import PenguranganNeto from "@sections/Lampiran5/BagianB";
import PengurangPph from "@sections/Lampiran5/BagianC";
import GlobalFormField from "@lampiran/shared/GlobalFormField";

export default function Lampiran_5({ data }) {
  const [showBagianA, setShowBagianA] = useState(true);
  const [showBagianB, setShowBagianB] = useState(true);
  const [showBagianC, setShowBagianC] = useState(true);

  const [form, setForm] = useState({
    komFiskal: 0,
    PenguranganNeto: 0,
  });

  // Handler untuk menerima total dari BagianA
  const handleKompensasiTotal = (total2025) => {
    setForm((prev) => ({ ...prev, komFiskal: total2025 }));
  };

  // Handler untuk menerima total dari BagianB (totalPengurangL5B)
  // const handlePenguranganTotal = (totalPengurangL5B) => {
  //   setForm((prev) => ({ ...prev, PenguranganNeto: totalPengurangL5B }));

  // };

  const handlePenguranganTotal = (totalPengurangL5B) => {
    console.log("Parent menerima PenguranganNeto:", totalPengurangL5B);
    setForm((prev) => ({ ...prev, PenguranganNeto: totalPengurangL5B }));
  };

  return (
    <div className="space-y-4">
      <ul className="space-y-2 pl-3">
        {[
          "A. PERHITUNGAN ANGSURAN PAJAK PENGHASILAN UNTUK TAHUN PAJAK BERIKUTNYA",
          "B. PERHITUNGAN PPh TERUTANG WAJIB PAJAK DAN SUAMI/ISTRI",
        ].map((t, i) => (
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

      {/* Bagian A */}
      <div>
        <div
          className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
          onClick={() => setShowBagianA(!showBagianA)}
        >
          <h3 className="text-lg font-semibold">A. PERHITUNGAN KOMPENSASI KERUGIAN FISKAL</h3>
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
            <KompensasiKerugian onTotalChange={handleKompensasiTotal} />
          </div>
        </div>
      </div>

      {/* Bagian B */}
      <div>
        <div
          className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
          onClick={() => setShowBagianB(!showBagianB)}
        >
          <h3 className="text-lg font-semibold">B. PENGURANGAN PENGHASILAN NETO</h3>
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
            <PenguranganNeto
              totalKompensasi2025={form.komFiskal || 0}
              onTotalChange={handlePenguranganTotal}
            />
          </div>
        </div>
      </div>

      <div className="border rounded-md p-4 space-y-4">
        <GlobalFormField
          customChildren={[
            {
              key: "komFiskal",
              type: "currency",
              title: "Kompensasi Kerugian Fiskal",
              placeholder: "",
              readOnly: true,
            },
            {
              key: "PenguranganNeto",
              type: "currency",
              title: "Pengurangan Neto",
              placeholder: "",
              readOnly: true,
            },
          ]}
          formData={form}
          onFieldChange={(key, value) => setForm((prev) => ({ ...prev, [key]: value }))}
          labelWidth="w-80"
        />
      </div>

      {/* Bagian C */}
      <div>
        <div
          className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
          onClick={() => setShowBagianC(!showBagianC)}
        >
          <h3 className="text-lg font-semibold">C. PENGURANGAN PPh Terutang</h3>
          {showBagianC ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {showBagianC && (
          <div className="border rounded-md p-4 space-y-4">
            <PengurangPph />
          </div>
        )}
      </div>
    </div>
  );
}
