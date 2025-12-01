import React, { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import Select from "react-select";
import { parseFormattedNumber, formatRupiah } from "@utils/formatCurrency";

const PertanyaanI = ({ onAnswerChange, answersState }) => {
  const [showTransaksiLainnya, setShowTransaksiLainnya] = useState(false);

  const [amounts, setAmounts] = useState({    
    r14a: 0,
    r14b: 0,
    r14c: 0,
    r14d: 0,
    r14e: 0,
    r14f: 0,
    r14g: 0,
    r14h: 0,
  });

  const[radios, setRadios] = useState({
    r14b: null,
    r14c: null,
    r14d: null,
    r14e: null,
    r14f: null,
    r14g: null,
  })
const handleAmountChange = (field) => (e) => {
    const raw = e.target.value;

    if (raw.trim() === "") {
      setAmounts((prev) => ({ ...prev, [field]: 0 }));
      return;
    }

    const numeric = parseFormattedNumber(raw);
    setAmounts((prev) => ({ ...prev, [field]: numeric }));
    console.log("Amount changed:", field, numeric);
  };

  const handleRadioChange = (field, value) => {
    setRadios((prev) => ({ ...prev, [field]: value }));
    onAnswerChange?.(field, value);
    console.log("Radio changed:", field, value);

    // logic khusus: kalau field = false, reset amount
    // if (field === "r13" && value === false) {
    //   setAmounts((prev) => ({ ...prev, r13: 0 }));
    // }
  };

  const handleSelectChange = (field, value) => {
    setRadios((prev) => ({ ...prev, [field]: value }));
    onAnswerChange?.(field, value);
  };

  const DEFAULT_NULL_TEXT = "Pilih salah satu Ya/Tidak";

    const HELPER_CONFIG = {
    r14b: {
      yes: "Ya, Silahkan mengisi lampiran 1 Tabel B ",
      no: "Tidak, Silahkan Melanjutkan ke pertanyaan berikutnya",
    },  
    r14c: {
      yes: "Ya, Silahkan mengisi lampiran 2 Tabel A ",
      no: "Tidak, Silahkan Melanjutkan ke pertanyaan berikutnya",
    },  
    r14d: {
      yes: "Ya, Silahkan mengisi lampiran 2 Tabel B ",
      no: "Tidak, Silahkan Melanjutkan ke pertanyaan berikutnya",
    },
    r14e: {
      yes: "Ya, Silahkan mengisi lampiran 3C",
      no: "Tidak, Silahkan Melanjutkan ke pertanyaan berikutnya",
    },
    r14f: {
      yes: "Ya, Silahkan mengisi lampiran 3D ",
      no: "Tidak, Silahkan Melanjutkan ke pertanyaan berikutnya",
    },
    r14g: {
      yes: "Ya, Pastikan anda sudah menyampiakan laporan realisasi investasi secara terpisah",
      no: "Tidak, Silahkan Melanjutkan ke pertanyaan berikutnya",
    },
  };

    const getHelperMessage = (field, value) => {
    const cfg = HELPER_CONFIG[field];
    if (!cfg) return "";

    if (value === null || value === undefined || value === "") {
      return DEFAULT_NULL_TEXT;
    }

    // Case 1: Boolean (YES/NO)
    if (typeof value === "boolean") {
      return value ? cfg.yes : cfg.no;
    }

    // Case 2: Option select (option1, option2, dst)
    if (cfg[value]) {
      return cfg[value];
    }

    return DEFAULT_NULL_TEXT;
  };

  
  return (
    <>
      <div
        className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
        onClick={() => setShowTransaksiLainnya(!showTransaksiLainnya)}
      >
        <h3 className="text-lg font-semibold">I. PERNYATAAN TRANSAKSI LAINNYA</h3>
        <span
          className={`transition-transform duration-500 ease-in-out ${
            showTransaksiLainnya ? "rotate-180" : "rotate-0"
          }`}
        >
          <FaChevronDown />
        </span>
      </div>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          showTransaksiLainnya ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {" "}
        <div className="border rounded-md p-4 mb-4">
          <div className="divide-y">
            {/* 14a */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">14a</span>
                <span className="text-gray-800 text-base font-medium">
                  Harta pada akhir tahun pajak* (Isi lampiran 1 Bagian A, lalu ke pertanyaan
                  selanjutnya)
                  <span className="text-red-500">*</span>
                </span>
              </div>
              <div className="col-span-12 md:col-span-2"></div>
              <div className="col-span-12 md:col-span-3 text-sm"></div>
              <div className="col-span-12 md:col-span-2">
                <input
                  type="text"
                  min={0}
                  value={formatRupiah(amounts.r14a).replace(/^Rp\s?/, "")} // Hilangkan "Rp" di depan dengan menggunakan replace(/^Rp\s?/, "")
                  onChange={handleAmountChange("r14a")}
                  className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                />
              </div>
            </div>

            {/* 14b */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">14b</span>
                <span className="text-gray-800 text-base font-medium">
                  Apakah anda memiliki utang pada akhir tahun pajak?
                  <span className="text-red-500">*</span>
                </span>
              </div>
              <div className="col-span-12 md:col-span-2">
                <div className="flex items-center gap-6">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r14b"
                      checked={radios.r14b === true}
                      onChange={() => handleRadioChange("r14b", true)}
                    />
                    <span>Ya</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r14b"
                      checked={radios.r14b === false}
                      onChange={() => handleRadioChange("r14b", false)}
                    />
                    <span>Tidak</span>
                  </label>
                </div>
              </div>
              <div className="col-span-12 md:col-span-3 text-sm">
                <div className="bg-blue-100 rounded px-3 py-2">
                    {getHelperMessage("r14b", radios.r14b)}
                </div>
              </div>
              <div className="col-span-12 md:col-span-2">
                <input
                  type="text"
                  min={0}
                  value={formatRupiah(amounts.r14b).replace(/^Rp\s?/, "")} // Hilangkan "Rp" di depan dengan menggunakan replace(/^Rp\s?/, "")
                  onChange={handleAmountChange("r14b")}
                  className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                />
              </div>
            </div>

            {/* 14c */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">14c</span>
                <span className="text-gray-800 text-base font-medium">
                  Apakah anda Menerima penghasilan yang dikenakan pajak penghasilan bersifat final?
                  <span className="text-red-500">*</span>
                </span>
              </div>
              <div className="col-span-12 md:col-span-2">
                <div className="flex items-center gap-6">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r14c"
                      checked={radios.r14c === true}
                      onChange={() => handleRadioChange("r14c", true)}
                    />
                    <span>Ya</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r14c"
                      checked={radios.r14c === false}
                      onChange={() => handleRadioChange("r14c", false)}
                    />
                    <span>Tidak</span>
                  </label>
                </div>
              </div>
              <div className="col-span-12 md:col-span-3 text-sm">
                <div className="bg-blue-100 rounded px-3 py-2">
                    {getHelperMessage("r14c", radios.r14c)}
                </div>
              </div>
              <div className="col-span-12 md:col-span-2">
                <input
                  type="text"
                  min={0}
                  value={formatRupiah(amounts.r14c).replace(/^Rp\s?/, "")} // Hilangkan "Rp" di depan dengan menggunakan replace(/^Rp\s?/, "")
                  onChange={handleAmountChange("r14c")}
                  className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                />
              </div>
            </div>

            {/* 14d */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">14d</span>
                <span className="text-gray-800 text-base font-medium">
                  Apakah anda Menerima penghasilan yang termasuk obajek pajak?
                  <span className="text-red-500">*</span>
                </span>
              </div>
              <div className="col-span-12 md:col-span-2">
                <div className="flex items-center gap-6">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r14d"
                      checked={radios.r14d === true}
                      onChange={() => handleRadioChange("r14d", true)}
                    />
                    <span>Ya</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r14d"
                      checked={radios.r14d === false}
                      onChange={() => handleRadioChange("r14d", false)}
                    />
                    <span>Tidak</span>
                  </label>
                </div>
              </div>
              <div className="col-span-12 md:col-span-3 text-sm">
                <div className="bg-blue-100 rounded px-3 py-2">
                  {getHelperMessage("r14d", radios.r14d)}
                </div>
              </div>
              <div className="col-span-12 md:col-span-2">
                <input
                  type="text"
                    min={0}
                    value={formatRupiah(amounts.r14d).replace(/^Rp\s?/, "")} // Hilangkan "Rp" di depan dengan menggunakan replace(/^Rp\s?/, "")
                    onChange={handleAmountChange("r14d")}
                    className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                  />
              </div>
            </div>

            {/* 14e */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">14e</span>
                <span className="text-gray-800 text-base font-medium">
                  Apakah anda Melaporkan biaya penyusutan dan/atau amortisasi fiskal?
                  <span className="text-red-500">*</span>
                </span>
              </div>
              <div className="col-span-12 md:col-span-2">
                <div className="flex items-center gap-6">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r14e"
                      checked={radios.r14e === true}
                      onChange={() => handleRadioChange("r14e", true)}
                    />
                    <span>Ya</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r14e"
                      checked={radios.r14e === false}
                      onChange={() => handleRadioChange("r14e", false)}
                    />
                    <span>Tidak</span>
                  </label>
                </div>
              </div>
              <div className="col-span-12 md:col-span-3 text-sm">
                <div className="bg-blue-100 rounded px-3 py-2">
e                  {getHelperMessage("r14e", radios.r14e)}
                </div>
              </div>
              <div className="col-span-12 md:col-span-2">
                <input
                  type="text"
                  min={0}
                  value={formatRupiah(amounts.r14e).replace(/^Rp\s?/, "")} // Hilangkan "Rp" di depan dengan menggunakan replace(/^Rp\s?/, "")
                  onChange={handleAmountChange("r14e")}
                  className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                />
              </div>
            </div>

            {/* 14f */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">14f</span>
                <span className="text-gray-800 text-base font-medium">
                  Apakah anda melaporkan biaya entertainment, buaya promosi, penggantian atau
                  imbalan dalam bentuk natura dan/atau kenikmatan, serta piutang yang nyata-nyata
                  tidak dapat ditagih?
                  <span className="text-red-500">*</span>
                </span>
              </div>
              <div className="col-span-12 md:col-span-2">
                <div className="flex items-center gap-6">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r14f"
                      checked={radios.r14f === true}
                      onChange={() => handleRadioChange("r14f", true)}
                    />
                    <span>Ya</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r14f"
                      checked={radios.r14f === false}
                      onChange={() => handleRadioChange("r14f", false)}
                    />
                    <span>Tidak</span>
                  </label>
                </div>
              </div>
              <div className="col-span-12 md:col-span-3 text-sm">
                <div className="bg-blue-100 rounded px-3 py-2">
                    {getHelperMessage("r14f", radios.r14f)}
                </div>
              </div>
              <div className="col-span-12 md:col-span-2">
                <input
                  type="text"
                  min={0}
                  value={formatRupiah(amounts.r14f).replace(/^Rp\s?/, "")} // Hilangkan "Rp" di depan dengan menggunakan replace(/^Rp\s?/, "")
                  onChange={handleAmountChange("r14f")}
                  className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                />
              </div>
            </div>

            {/* 14g */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">14g</span>
                <span className="text-gray-800 text-base font-medium">
                  Apakah anda Menerima Dividen dan/atau penghasilan lain dari neger dan
                  melaporkannya sebagai penghasilan tidak termasuk obejek pajak?
                  <span className="text-red-500">*</span>
                </span>
              </div>
              <div className="col-span-12 md:col-span-2">
                <div className="flex items-center gap-6">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r14g"
                      checked={radios.r14g === true}
                      onChange={() => handleRadioChange("r14g", true)}
                    />
                    <span>Ya</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r14g"
                      checked={radios.r14g === false}
                      onChange={() => handleRadioChange("r14g", false)}
                    />
                    <span>Tidak</span>
                  </label>
                </div>
              </div>
              <div className="col-span-12 md:col-span-3 text-sm">
                <div className="bg-blue-100 rounded px-3 py-2">
                  {getHelperMessage("r14g", radios.r14g)}
                </div>
              </div>
              <div className="col-span-12 md:col-span-2">
                <input
                  type="text"
                  min={0}
                  value={formatRupiah(amounts.r14g).replace(/^Rp\s?/, "")} // Hilangkan "Rp" di depan dengan menggunakan replace(/^Rp\s?/, "")
                  onChange={handleAmountChange("r14g")}
                  className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                />
              </div>
            </div>

            {/* 14h */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">14h</span>
                <span className="text-gray-800 text-base font-medium">
                  Kelebihan PPh Final atas penghasilan dari usaha dengan peredaran Bruto tertentu
                  yang dapat dimintakan pengembalian. (Silahkan mengajukan permohonan pengembalian
                  pajak yang seharusnya tidak terhutang secara terpisah){" "}
                  <span className="text-red-500">*</span>
                </span>
              </div>
              <div className="col-span-12 md:col-span-2"></div>
              <div className="col-span-12 md:col-span-3 text-sm"></div>
              <div className="col-span-12 md:col-span-2">
                <input
                  type="text"
                  min={0}
                  value={formatRupiah(amounts.r14h).replace(/^Rp\s?/, "")} // Hilangkan "Rp" di depan dengan menggunakan replace(/^Rp\s?/, "")
                  onChange={handleAmountChange("r14h")}
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

export default PertanyaanI;
