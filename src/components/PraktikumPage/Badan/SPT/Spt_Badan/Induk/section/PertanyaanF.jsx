import React, { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { parseFormattedNumber, formatRupiah } from "@utils/formatCurrency";

const PertanyaanF = ({ onAnswerChange, answersState }) => {
  const [showSection, setShowSection] = useState(false);

  const [r17a, setR17a] = useState(null);
  const [r17b, setR17b] = useState(null);
  const [r17c, setR17c] = useState(null);
  const [r18a, setR18a] = useState(null);
  const [r18b, setR18b] = useState(null);
  const [r19a, setR19a] = useState(null);

  // Daftar bank (opsional, bisa disesuaikan)
  const bankOptions = [
    { value: "", label: "-- Pilih Bank --" },
    { value: "BCA", label: "BCA" },
    { value: "Mandiri", label: "Mandiri" },
    { value: "BNI", label: "BNI" },
    { value: "BRI", label: "BRI" },
    { value: "CIMB", label: "CIMB Niaga" },
  ];

  // Load initial values from parent if available
  useEffect(() => {
    if (answersState) {
    }
  }, [answersState]);

  const [amounts, setAmounts] = useState({
    r17a: 0,
    r17b: 0,
    r17c: 0,
    r18a: 0,
    r18b: 0,
  });

  const [radios, setRadios] = useState({
    r17b: null,
    r19a: null,
  });

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

    // logic khusus: kalau r17b = false, reset amount r17b
    if (field === "r17b" && value === false) {
      setAmounts((prev) => ({ ...prev, r17b: 0 }));
    }
    console.log("Radio changed:", field, value);
  };

  const HELPER_CONFIG = {
    r17b: {
      yes: "Ya, silahkan mengisi jumlah pajak yang dapat diangsur/ditunda pembayarannya",
      no: "Tidak, silahkan lanjut pertanyaan berikutnya",
    },
  };

  const DEFAULT_NULL_TEXT = "Pilih salah satu Ya/Tidak";

  const getHelperMessage = (field, value) => {
    const cfg = HELPER_CONFIG[field];
    if (!cfg) return "";

    if (value === true) return cfg.yes;
    if (value === false) return cfg.no;

    return DEFAULT_NULL_TEXT;
  };

  return (
    <>
      <div
        className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
        onClick={() => setShowSection(!showSection)}
      >
        <h3 className="text-lg font-semibold">F. PPh KURANG/LEBIH BAYAR</h3>
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
          showSection ? " opacity-100 overflow-visible" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="border rounded-md p-4 mb-4">
          <div className="divide-y">
            {/* 17a */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">17.a</span>
                <span className="text-gray-800 text-base font-medium">
                  PPh yang Kurang/Lebih Bayar
                  {/* <span className="text-red-500">*</span> */}
                </span>
              </div>
              <div className="col-span-12 md:col-span-2"></div>
              <div className="col-span-12 md:col-span-2">
                <input
                  type="text"
                  min={0}
                  value={formatRupiah(amounts.r17a).replace(/^Rp\s?/, "")}
                  onChange={handleAmountChange("r17a")}
                  className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                />
              </div>
            </div>

            {/* 17b */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">17.b</span>
                <span className="text-gray-800 text-base font-medium">
                  Apakah terdapat Surat Keputusan Persetujuan Pengangsuran atau Penundaan Pembayaran
                  Pajak?
                  <span className="text-red-500">*</span>
                </span>
              </div>
              <div className="col-span-12 md:col-span-2">
                <div className="flex items-center gap-6">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r17b"
                      checked={radios.r17b === true}
                      onChange={() => handleRadioChange("r17b", true)}
                    />
                    <span>Ya</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r17b"
                      checked={radios.r17b === false}
                      onChange={() => handleRadioChange("r17b", false)}
                    />
                    <span>Tidak</span>
                  </label>
                </div>
              </div>
              <div className="col-span-12 md:col-span-2">
                <input
                  type="text"
                  min={0}
                  value={formatRupiah(amounts.r17b).replace(/^Rp\s?/, "")} // Hilangkan "Rp" di depan dengan menggunakan replace(/^Rp\s?/, "")
                  onChange={handleAmountChange("r17b")}
                  readOnly={radios.r17b !== true}
                  className={`w-full text-center p-2 border rounded-md text-sm ${
                    radios.r17b === true ? "bg-white" : "bg-gray-200"
                  }`}
                />
              </div>
              <div className="col-span-12 md:col-span-3 text-sm">
                <div className="bg-blue-100 rounded px-3 py-2 text-sm">
                  {getHelperMessage("r17b", radios.r17b)}
                </div>
              </div>
            </div>

            {/* 17c */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">17.c</span>
                <span className="text-gray-800 text-base font-medium">
                  PPh yang masih harus dibayar atau lebih dibayar
                  {/* <span className="text-red-500">*</span> */}
                </span>
              </div>
              <div className="col-span-12 md:col-span-2"></div>
              <div className="col-span-12 md:col-span-2">
                <input
                  type="text"
                  min={0}
                  value={formatRupiah(amounts.r17c).replace(/^Rp\s?/, "")}
                  onChange={handleAmountChange("r17c")}
                  className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                />
              </div>
            </div>

            {/* 18a */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">18.a</span>
                <span className="text-gray-800 text-base font-medium">
                  PPh yang kurang atau lebih bayar pada SPT yang dibetulkan
                  {/* <span className="text-red-500">*</span> */}
                </span>
              </div>
              <div className="col-span-12 md:col-span-2"></div>
              <div className="col-span-12 md:col-span-2">
                <input
                  type="text"
                  min={0}
                  value={formatRupiah(amounts.r18a).replace(/^Rp\s?/, "")}
                  onChange={handleAmountChange("r18a")}
                  className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                />
              </div>
            </div>

            {/* 18b */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">18.b</span>
                <span className="text-gray-800 text-base font-medium">
                  PPh yang kurang atau lebih bayar karena pembetulan
                  {/* <span className="text-red-500">*</span> */}
                </span>
              </div>
              <div className="col-span-12 md:col-span-2"></div>
              <div className="col-span-12 md:col-span-2">
                <input
                  type="text"
                  min={0}
                  value={formatRupiah(amounts.r18b).replace(/^Rp\s?/, "")}
                  onChange={handleAmountChange("r18b")}
                  className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                />
              </div>
            </div>

            {/* 19a */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">19.a</span>
                <span className="text-gray-800 text-base font-medium">
                  Lebih Bayar pada Angka 17.a. atau 18.b. mohon untuk: (pilih salah satu):
                  {/* <span className="text-red-500">*</span> */}
                </span>
              </div>
              <div className="col-span-12 md:col-span-3">
                {/* RADIO 1 */}
                <div className="text-sm">
                  <div className="flex items-center gap-2 mb-2 cursor-pointer">
                    <input
                      id="option1"
                      type="radio"
                      name="r19a"
                      value="Option 1"
                      checked={radios.r19a === "Option 1"}
                      onChange={() => handleRadioChange("r19a", "Option 1")}
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500"
                    />
                    <label htmlFor="option1" className="cursor-pointer">
                      dikembalikan melalui pemeriksaan
                    </label>
                  </div>

                  {/* RADIO 2 */}
                  <div className="flex items-center gap-2 mb-2 cursor-pointer">
                    <input
                      id="option2"
                      type="radio"
                      name="r19a"
                      value="Option 2"
                      checked={radios.r19a === "Option 2"}
                      onChange={() => handleRadioChange("r19a", "Option 2")}
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 font-small"
                    />
                    <label htmlFor="option2" className="cursor-pointer">
                      dikembalikan melalui Pengembalian Pendahuluan
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-span-12 md:col-span-2"></div>
            </div>

            {/* 19b */}

            <div className="col-span-12 mt-4 ">
              <div className="border rounded-md bg-white overflow-hidden">
                <div className="bg-gray-100 px-5 py-3 border-b">
                  <span className="text-gray-800 font-medium text-base">
                    19.b. Informasi Rekening
                  </span>
                </div>
                <div className="p-4 grid grid-cols-12 gap-3 ">
                  <div className="col-span-12 md:col-span-2"></div>
                  <div className="col-span-12 md:col-span-4"></div>
                  <div className="col-span-12 md:col-span-3 space-y-3">
                    <div className="flex items-center gap-2">
                      <label className="text-sm text-gray-700 w-40">Pilih Rekening Bank</label>
                      <button className="px-3 py-2 border rounded bg-gray-100 hover:bg-gray-200">
                        📂
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="text-sm text-gray-700 w-40">Nomor Rekening</label>
                      <input
                        type="text"
                        className="flex-1 p-2 border rounded-md bg-gray-100 text-sm"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="text-sm text-gray-700 w-40">Nama Bank</label>
                      <input
                        type="text"
                        className="flex-1 p-2 border rounded-md bg-gray-100 text-sm"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="text-sm text-gray-700 w-40">Nama Pemilik Rekening</label>
                      <input
                        type="text"
                        className="flex-1 p-2 border rounded-md bg-gray-100 text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PertanyaanF;
