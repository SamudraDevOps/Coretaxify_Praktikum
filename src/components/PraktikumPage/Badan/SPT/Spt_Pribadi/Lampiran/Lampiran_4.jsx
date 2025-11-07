import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import HeaderLampiran from "./HeaderLampiran";
import GlobalFormField from "./components/shared/GlobalFormField";
import { BagianAConfig } from "./sections/Lampiran4/PerhitunganAngsuran";
import {
  BagianBConfig,
  WajibPajakConfig,
  SuamiIstriConfig,
} from "./sections/Lampiran4/PerhitunganWajibPajak";

export default function Lampiran_4({ data }) {
  const [showBagianA, setShowBagianA] = useState(true);
  const [showBagianB, setShowBagianB] = useState(true);
  const [showBagianC, setShowBagianC] = useState(true);
  const [showBagianD, setShowBagianD] = useState(true);

  const [formBagianA, setFormBagianA] = useState({
    pphTerutang: "",
    pphDipotong: "",
    pphDisetor: "",
    angsuranPph: "",
  });

  const [formBagianB, setFormBagianB] = useState({
    LabaKotorGroup: "",
    penghasilanNetoGroup: "",
    penghasilanNetoZakatSendiriGroup: "",
    penghasilanNetoZakatGabunganGroup: "",
    jenisPenghasilan: "",
    penghasilanKenaPajakGabungan: "",
    pphTerutangGabungan: "",
    pphTerutangDitanggungSuamiIstri: "",
  });

  const [formWajibPajak, setFormWajibPajak] = useState({
    npwpPemotong: "",
    namaPemotong: "",
  });

  const [formSuamiIstri, setFormSuamiIstri] = useState({
    npwpPemotong: "",
    namaPemotong: "",
  });

  const handleFieldChangeBagianA = (key, value) => {
    setFormBagianA((prev) => {
      const newForm = { ...prev, [key]: value };
      // Auto-calculate angsuranPph
      if (["pphTerutang", "pphDipotong", "pphDisetor"].includes(key)) {
        const terutang = key === "pphTerutang" ? value : newForm.pphTerutang;
        const dipotong = key === "pphDipotong" ? value : newForm.pphDipotong;
        const disetor = key === "pphDisetor" ? value : newForm.pphDisetor;
        newForm.angsuranPph = ((terutang || 0) - (dipotong || 0) - (disetor || 0)) / 12;
      }
      return newForm;
    });
  };

  const handleFieldChangeBagianB = (key, value) => {
    setFormBagianB((prev) => {
      const newForm = { ...prev, [key]: value };
      // Auto-calculate pphTerutang (contoh: 5% dari penghasilan kena pajak)
      if (key === "penghasilanKenaPajak") {
        newForm.pphTerutang = (value || 0) * 0.05;
      }
      return newForm;
    });
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
          <h3 className="text-lg font-semibold">
            A. PERHITUNGAN ANGSURAN PAJAK PENGHASILAN UNTUK TAHUN PAJAK BERIKUTNYA
          </h3>
          {showBagianA ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {showBagianA && (
          <div className="border rounded-md p-4 space-y-4">
            <GlobalFormField
              baseFields={BagianAConfig.baseFields}
              customChildren={BagianAConfig.customChildren}
              formData={formBagianA}
              onFieldChange={handleFieldChangeBagianA}
            />
          </div>
        )}
      </div>

      {/* Bagian B */}
      <div>
        <div
          className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
          onClick={() => setShowBagianB(!showBagianB)}
        >
          <h3 className="text-lg font-semibold">
            B. PERHITUNGAN PPh TERUTANG WAJIB PAJAK DAN SUAMI/ISTRI
          </h3>
          {showBagianB ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {showBagianB && (
          <div className="border rounded-md p-4 space-y-4">
            <GlobalFormField
              baseFields={BagianBConfig.baseFields}
              customChildren={BagianBConfig.customChildren}
              formData={formBagianB}
              onFieldChange={handleFieldChangeBagianB}
            />
          </div>
        )}
      </div>

      {/* Bagian C */}
      <div>
        <div
          className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
          onClick={() => setShowBagianC(!showBagianC)}
        >
          <h3 className="text-lg font-semibold">Wajib Pajak</h3>
          {showBagianC ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {showBagianC && (
          <div className="border rounded-md p-4 space-y-4">
            <GlobalFormField
              baseFields={WajibPajakConfig.baseFields}
              customChildren={WajibPajakConfig.customChildren}
              formData={formWajibPajak}
              // onFieldChange={handleFieldChangeWajibPajak}
            />
          </div>
        )}
      </div>

      {/* Bagian D */}
      <div>
        <div
          className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
          onClick={() => setShowBagianD(!showBagianD)}
        >
          <h3 className="text-lg font-semibold">Suami/Istri</h3>
          {showBagianD ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {showBagianD && (
          <div className="border rounded-md p-4 space-y-4">
            <GlobalFormField
              baseFields={SuamiIstriConfig.baseFields}
              customChildren={SuamiIstriConfig.customChildren}
              formData={formSuamiIstri}
              // onFieldChange={handleFieldChangeSuamiIstri}
            />
          </div>
        )}
      </div>
    </div>
  );
}
