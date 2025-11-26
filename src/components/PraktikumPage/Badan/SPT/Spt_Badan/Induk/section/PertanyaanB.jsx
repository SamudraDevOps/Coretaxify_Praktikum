import React, { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Select from "react-select";
import { parseFormattedNumber, formatRupiah } from "@utils/formatCurrency";

const PertanyaanB = ({ onAnswerChange, answersState }) => {
  const [showInformasiLaporanKeuangan, setShowInformasiLaporanKeuangan] = useState(false);
  const [r1, setR1] = useState(null);
  const [r2, setR2] = useState(null);
  const [r2a, setR2a] = useState(null);
  const [r2b, setR2b] = useState(null);
  const [r2c, setR2c] = useState(null);

  const [sektorUsaha, setSektorUsaha] = useState("");

  const jenisUsahaOptions = [
    { value: "", label: "Please select" },
    { value: "Dagang", label: "Dagang" },
    { value: "Jasa", label: "Jasa" },
    { value: "Umum", label: "Umum" },
    { value: "Manufaktur", label: "Manufaktur" },
    { value: "Lainnya", label: "Lainnya" },
  ];

  const opiniAuditorOptions = [
    { value: "", label: "Please select" },
    { value: "1", label: "Wajar Tanpa Pengecualian" },
    { value: "2", label: "Wajar Tanpa Pengecualian Dengan Paragraf Jelas" },
    { value: "3", label: "Wajar dengan Pengecualian" },
    { value: "4", label: "Tidak Wajar" },
    { value: "5", label: "Tidak Menyatakan pendapat" },
  ];

  const namaKAPOptions = [
    { value: "", label: "Please select" },
    { value: "1", label: "KAP A" },
    { value: "2", label: "KAP B" },
  ];

  useEffect(() => {
    if (r2 === false) {
      setR2a(null);
      setR2b(null);
      setR2c(null);
      onAnswerChange?.("r2a", null);
      onAnswerChange?.("r2b", null);
      onAnswerChange?.("r2c", null);
    }
  }, [r2, onAnswerChange]);

  useEffect(() => {
    if (answersState) {
      // Pertayaan 1.a
      setR1(answersState.r1 ?? null);
      setAmt1(answersState.amt1 ?? 0);
    }
  }, [answersState]);

  const [amounts, setAmounts] = useState({
    r2: 0,
    r3: 0,
  });

  const [radios, setRadios] = useState({
    r1a: null,
    r1b: null,
    r2: null,
    r3: null,
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
    r2: {
      yes: "Ya, Silangkan Mengisi Pertanyaan Selanjutnya",
      no: "Tidak, silahkan lanjut pertanyaan berikutnya",
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
        onClick={() => setShowInformasiLaporanKeuangan(!showInformasiLaporanKeuangan)}
      >
        <h3 className="text-lg font-semibold">B. INFORMASI LAPORAN KEUANGAN</h3>
        <span
          className={`transition-transform duration-500 ease-in-out ${
            showInformasiLaporanKeuangan ? "rotate-180" : "rotate-0"
          }`}
        >
          <FaChevronDown />
        </span>
      </div>

      <div
        className={`transition-all duration-500 ease-in-out ${
          showInformasiLaporanKeuangan
            ? "opacity-100 overflow-visible"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="border rounded-md p-4 mb-4">
          <div className="divide-y">
            {/* 1 */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">1.</span>
                <span className="text-gray-800 text-base font-medium">
                  Sektor Usaha Laporan Keuangan pada Lampiran 1 *
                </span>
              </div>
              <div className="col-span-12 md:col-span-2">
                <Select
                  value={jenisUsahaOptions.find((option) => option.value === radios.r1) || null}
                  onChange={(selectedOption) =>
                    handleSelectChange("r1", selectedOption?.value || "")
                  }
                  options={jenisUsahaOptions}
                  className="text-sm"
                  classNamePrefix="react-select"
                  placeholder="Please select"
                  isClearable={false} // opsional, jika ingin membiarkan "Please select" tetap terpilih
                />
              </div>
              <div className="col-span-12 md:col-span-2">{/* Tidak ada input untuk 1.b.2 */}</div>
            </div>

            {/* 2 */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">2.</span>
                <span className="text-gray-800 text-base font-medium">
                  Apakah Laporan Keuangan diaudit oleh Akuntan Publik? *
                  <span className="text-red-500">*</span>
                </span>
              </div>
              <div className="col-span-12 md:col-span-4">
                <div className="flex items-center gap-6">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r2"
                      checked={radios.r2 === true}
                      onChange={() => handleRadioChange("r2", true)}
                    />
                    <span>Ya</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r2"
                      checked={radios.r2 === false}
                      onChange={() => handleRadioChange("r2", false)}
                    />
                    <span>Tidak</span>
                  </label>
                </div>
              </div>
              <div className="col-span-12 md:col-span-3 text-sm">
                <div className="bg-blue-100 rounded px-3 py-2">
                  {getHelperMessage("r2", radios.r2)}
                </div>
              </div>
              <div className="col-span-12 md:col-span-2">{/* Tidak ada input untuk 2 */}</div>
            </div>
            {radios.r2 === true && (
              <>
                {/* 2.a */}
                <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
                  <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                    <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">2.a</span>
                    <span className="text-gray-800 text-base font-medium">Opini Auditor</span>
                  </div>
                  <div className="col-span-12 md:col-span-4">
                    <Select
                      value={
                        opiniAuditorOptions.find((option) => option.value === radios.r2a) || null
                      }
                      onChange={(selectedOption) =>
                        handleRadioChange("r2a", selectedOption?.value || "")
                      }
                      options={opiniAuditorOptions}
                      className="text-sm"
                      classNamePrefix="react-select"
                      placeholder="Please select"
                      isClearable={false} // opsional, jika ingin membiarkan "Please select" tetap terpilih
                    />
                  </div>
                  <div className="col-span-12 md:col-span-2">{/* Tidak ada input untuk 2.a */}</div>
                </div>

                {/* 2.b */}
                <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
                  <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                    <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">2.b</span>
                    <span className="text-gray-800 text-base font-medium">
                      NPWP Kantor Akuntan Publik
                    </span>
                  </div>
                  <div className="col-span-12 md:col-span-2">
                    <Select
                      value={namaKAPOptions.find((option) => option.value === radios.r2b) || null}
                      onChange={(selectedOption) =>
                        handleRadioChange("r2b", selectedOption?.value || "")
                      }
                      options={namaKAPOptions}
                      className="text-sm"
                      classNamePrefix="react-select"
                      placeholder="Please select"
                      isClearable={false} // opsional, jika ingin membiarkan "Please select" tetap terpilih
                    />
                  </div>
                  <div className="col-span-12 md:col-span-2">{/* Tidak ada input untuk 2.b */}</div>
                </div>

                {/* 2.c */}
                <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
                  <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                    <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">2.c</span>
                    <span className="text-gray-800 text-base font-medium">
                      Nama Kantor Akuntan Publik
                    </span>
                  </div>
                  <div className="col-span-12 md:col-span-2">
                    <input
                      type="text"
                      // min={0}
                      value={formatRupiah(amounts.r2c).replace(/^Rp\s?/, "")} // Hilangkan "Rp" di depan dengan menggunakan replace(/^Rp\s?/, "")
                      onChange={handleAmountChange("r2c")}
                      className="w-full text-center p-2 border rounded-md bg-gray-200    text-sm"
                      placeholder=" Nama KAP Akan Terisi Otomatis"
                      readOnly={false}
                    />
                  </div>

                  <div className="col-span-12 md:col-span-2">{/* Tidak ada input untuk 2.c */}</div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PertanyaanB;
