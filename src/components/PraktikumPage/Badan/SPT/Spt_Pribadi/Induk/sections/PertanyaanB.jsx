import React, { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import Select from "react-select";
import { parseFormattedNumber, formatRupiah } from "@utils/formatCurrency";

const PertanyaanB = ({ onAnswerChange, answersState }) => {
  const [showIkhtisarPenghasilanNeto, setShowIkhtisarPenghasilanNeto] = useState(false);

  const r1b2Options = [
    { value: 0, label: "Please select" },
    {
      value: 1,
      label: "Ya, termasuk WP OP yang memiliki peredaran bruto tertentu yang dikenakan PPh final",
    },
    { value: 2, label: "Ya, termasuk WP OPPT" },
    { value: 3, label: "Tidak" },
  ];

  const r1b3Options = [
    { value: 0, label: "Please select" },
    { value: 1, label: "Ya, saya menggunakan Norma." },
    { value: 2, label: "Tidak, saya menyelenggarakan pembukuan." },
  ];

  const r1b4Options = [
    { value: 0, label: "Please select" },
    { value: 1, label: "Dagang" },
    { value: 2, label: "Jasa" },
    { value: 3, label: "Umum" },
    { value: 4, label: "Manufaktur" },
    { value: 5, label: "Lainnya" },
  ];

  useEffect(() => {
    if (answersState) {
    }
  }, [answersState]);

  const [amounts, setAmounts] = useState({
    r1a: 0,
    r1b1: 0,
    r1b5: 0,
    r1c: 0,
    r1d: 0,
  });

  const [radios, setRadios] = useState({
    r1a: null,
    r1b1: null,
    r1c: null,
    r1d: null,
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
    console.log("Radio changed:", field, value);
  };

  const DEFAULT_NULL_TEXT = "Pilih salah satu Ya/Tidak";

  const HELPER_CONFIG = {
    r1a: {
      yes: "Ya, silahkan mengisi lampiran I Bagian D",
      no: "Tidak, Lanjutkan pertanyaan 1.b.1",
    },
    r1b1: {
      yes: "Ya, silahkan mengisi jumlah pajak yang dapat diangsur/ditunda",
      no: "Tidak, Lanjutkan pertanyaan 1.c",
    },
    r1b2: {
      1: "Anda memilih WP OP dengan peredaran bruto tertentu yang dikenakan PPh final. Silakan isi Lampiran 3B.",
      2: "Anda termasuk WP OPPT. Silakan isi Lampiran 3B Bagian B.",
      3: "Anda tidak termasuk kategori ini. Lanjutkan ke pertanyaan berikutnya 1.b.4.",
    },
    r1b3: {
      1: "Ya, saya menyusun laporan keuangan berbasis kas/laporan keuangan.",
      2: "Tidak, saya tidak menyusun laporan keuangan berbasis kas/laporan keuangan. Lanjutkan ke pertanyaan berikutnya.",
    },
    r1b4: {
      0: "Pilih salah satu opsi",
      1: "Anda memilih sektor usaha Dagang. Silakan isi Lampiran 3A-1 Bagian A.",
      2: "Anda memilih sektor usaha Jasa. Silakan isi Lampiran 3A-2 Bagian A.",
      3: "Anda memilih sektor usaha Umum. Silakan isi Lampiran 3A-4 Bagian A.",
      4: "Anda memilih sektor usaha Manufaktur. Silakan isi Lampiran 3A-3 Bagian A.",
      5: "Anda memilih sektor usaha Lainnya. Silakan isi Lampiran 3A-1 Bagian A.",
    },
    r1c: {
      yes: "Ya. Silahkan mengisi lampiran 3A-4 Bagian B",
      no: "Tidak. Silahkan Melanjutkan ke pertanyaan berikutnya 1.d.",
    },
    r1d: {
      yes: "Ya, silahkan mengisi lampiran 2 Bagian C",
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
      {/* Ikhtisar Penghasilan Neto */}
      <div
        className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
        onClick={() => setShowIkhtisarPenghasilanNeto(!showIkhtisarPenghasilanNeto)}
      >
        <h3 className="text-lg font-semibold">B. IKHTISAR PENGHASILAN NETO</h3>
        <span
          className={`transition-transform duration-500 ease-in-out ${
            showIkhtisarPenghasilanNeto ? "rotate-180" : "rotate-0"
          }`}
        >
          <FaChevronDown />
        </span>
      </div>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          showIkhtisarPenghasilanNeto ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="border rounded-md p-4 mb-4">
          <div className="divide-y">
            {/* 1.a */}
            {/* STEP 3: Radio button yang trigger lampiran */}

            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">1.a.</span>
                <span className="text-gray-800 text-base font-medium">
                  Apakah Anda menerima penghasilan dalam negeri dari pekerjaan?{" "}
                  <span className="text-red-500">*</span>
                </span>
              </div>
              <div className="col-span-12 md:col-span-2">
                <div className="flex items-center gap-6">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r1a"
                      checked={radios.r1a === true}
                      // change
                      onChange={() => handleRadioChange("r1a", true)}
                    />
                    <span>Ya</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r1a"
                      checked={radios.r1a === false}
                      onChange={() => handleRadioChange("r1a", false)}
                    />
                    <span>Tidak</span>
                  </label>
                </div>
              </div>
              <div className="col-span-12 md:col-span-3 text-sm">
                <div className="bg-blue-100 rounded px-3 py-2">
                  {getHelperMessage("r1a", radios.r1a)}
                </div>
              </div>
              <div className="col-span-12 md:col-span-2">
                <input
                  type="text"
                  min={0}
                  value={formatRupiah(amounts.r3).replace(/^Rp\s?/, "")} // Hilangkan "Rp" di depan dengan menggunakan replace(/^Rp\s?/, "")
                  onChange={handleAmountChange("r3")}
                  className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                />
              </div>
            </div>

            {/* 1.b.1 */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">1. b. 1</span>
                <span className="text-gray-800 text-base font-medium">
                  Apakah Anda menerima penghasilan dari usaha dan/atau pekerjaan bebas?{" "}
                  <span className="text-red-500">*</span>
                </span>
              </div>
              <div className="col-span-12 md:col-span-2">
                <div className="flex items-center gap-6">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r1b1"
                      checked={radios.r1b1 === true}
                      // change
                      onChange={() => handleRadioChange("r1b1", true)}
                    />
                    <span>Ya</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r1b1"
                      checked={radios.r1b1 === false}
                      // change
                      onChange={() => handleRadioChange("r1b1", false)}
                    />
                    <span>Tidak</span>
                  </label>
                </div>
              </div>
              <div className="col-span-12 md:col-span-3 text-sm">
                <div className="bg-blue-100 rounded px-3 py-2">
                  {getHelperMessage("r1b1", radios.r1b1)}
                </div>
              </div>
              <div className="col-span-12 md:col-span-2">{/* Tidak ada input untuk 1.b.1 */}</div>
            </div>

            {/* 1.b.2 */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">1. b. 2</span>
                <span className="text-gray-800 text-base font-medium">
                  Apakah Anda termasuk Wajib Pajak Orang Pribadi yang memiliki peredaran bruto
                  tertentu atau Orang Pribadi Pengusaha Tertentu (OPPT)?
                </span>
              </div>
              <div className="col-span-12 md:col-span-2">
                <Select
                  value={r1b2Options.find((option) => option.value === radios.r1b2) || null}
                  onChange={(selectedOption) =>
                    handleSelectChange("r1b2", selectedOption?.value || "")
                  }
                  options={r1b2Options}
                  className="text-sm"
                  classNamePrefix="react-select"
                  placeholder="Please select"
                  isClearable={false} // opsional, jika ingin membiarkan "Please select" tetap terpilih
                />
              </div>
              <div className="col-span-12 md:col-span-3 text-sm">
                <div className="bg-blue-100 rounded px-3 py-2">
                  {getHelperMessage("r1b2", radios.r1b2)}
                </div>
              </div>
              <div className="col-span-12 md:col-span-2">{/* Tidak ada input untuk 1.b.2 */}</div>
            </div>

            {/* 1.b.3 */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">1. b. 3</span>
                <span className="text-gray-800 text-base font-medium">
                  Apakah Anda menggunakan Norma dalam menghitung penghasilan neto?
                </span>
              </div>
              <div className="col-span-12 md:col-span-2">
                <Select
                  value={r1b3Options.find((option) => option.value === radios.r1b3) || null}
                  onChange={(selectedOption) =>
                    handleSelectChange("r1b3", selectedOption?.value || "")
                  }
                  options={r1b3Options}
                  className="text-sm"
                  classNamePrefix="react-select"
                  placeholder="Please select"
                  isClearable={false} // opsional, jika ingin membiarkan "Please select" tetap terpilih
                />
              </div>
              <div className="col-span-12 md:col-span-3 text-sm">
                <div className="bg-blue-100 rounded px-3 py-2">
                  {getHelperMessage("r1b3", radios.r1b3)}
                </div>
              </div>
              <div className="col-span-12 md:col-span-2">{/* Tidak ada input untuk 1.b.3 */}</div>
            </div>

            {/* 1.b.4 */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">1. b. 4</span>
                <span className="text-gray-800 text-base font-medium">
                  Anda menyelenggarakan pembukuan. Sebutkan sektor usaha yang Anda lakukan?
                </span>
              </div>
              <div className="col-span-12 md:col-span-2">
                <Select
                  value={r1b4Options.find((option) => option.value === radios.r1b4) || null}
                  onChange={(selectedOption) =>
                    handleSelectChange("r1b4", selectedOption?.value || "")
                  }
                  options={r1b4Options}
                  className="text-sm"
                  classNamePrefix="react-select"
                  placeholder="Please select"
                  isClearable={false} // opsional, jika ingin membiarkan "Please select" tetap terpilih
                />
              </div>
              <div className="col-span-12 md:col-span-3 text-sm">
                <div className="bg-blue-100 rounded px-3 py-2">
                  {getHelperMessage("r1b4", radios.r1b4)}
                </div>
              </div>
              <div className="col-span-12 md:col-span-2">{/* Tidak ada input untuk 2 */}</div>
            </div>

            {/* 1.b.5 */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">1. b. 5</span>
                <span className="text-gray-800 text-base font-medium">
                  Penghasilan neto dari usaha dan/atau pekerjaan bebas
                </span>
              </div>
              <div className="col-span-12 md:col-span-5"></div>
              <div className="col-span-12 md:col-span-2">
                <input
                  type="text"
                  min={0}
                  value={formatRupiah(amounts.r1b5).replace(/^Rp\s?/, "")} // Hilangkan "Rp" di depan dengan menggunakan replace(/^Rp\s?/, "")
                  onChange={handleAmountChange("r1b5")}
                  className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                />
              </div>
            </div>

            {/* 1.c */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">1.c.</span>
                <span className="text-gray-800 text-base font-medium">
                  Apakah Anda menerima penghasilan dalam negeri lainnya?
                </span>
              </div>
              <div className="col-span-12 md:col-span-2">
                <div className="flex items-center gap-6">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r1c"
                      checked={radios.r1c === true}
                      // change
                      onChange={() => handleRadioChange("r1c", true)}
                    />
                    <span>Ya</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r1c"
                      checked={radios.r1c === false}
                      // change
                      onChange={() => handleRadioChange("r1c", false)}
                    />
                    <span>Tidak</span>
                  </label>
                </div>
              </div>
              <div className="col-span-12 md:col-span-3 text-sm">
                <div className="bg-blue-100 rounded px-3 py-2">
                  {getHelperMessage("r1c", radios.r1c)}
                </div>
              </div>
              <div className="col-span-12 md:col-span-2">
                <input
                  type="text"
                  min={0}
                  value={formatRupiah(amounts.r1c).replace(/^Rp\s?/, "")} // Hilangkan "Rp" di depan dengan menggunakan replace(/^Rp\s?/, "")
                  onChange={handleAmountChange("r1c")}
                  className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                />
              </div>
            </div>

            {/* 1.d */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">1.d.</span>
                <span className="text-gray-800 text-base font-medium">
                  Apakah Anda menerima penghasilan luar negeri?
                </span>
              </div>
              <div className="col-span-12 md:col-span-2">
                <div className="flex items-center gap-6">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r1d"
                      checked={radios.r1d === true}
                      // change
                      onChange={() => handleRadioChange("r1d", true)}
                    />
                    <span>Ya</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r1d"
                      checked={radios.r1d === false}
                      onChange={() => handleRadioChange("r1d", false)}
                    />
                    <span>Tidak</span>
                  </label>
                </div>
              </div>
              <div className="col-span-12 md:col-span-3 text-sm">
                <div className="bg-blue-100 rounded px-3 py-2">
                  {getHelperMessage("r1d", radios.r1d)}
                </div>
              </div>
              <div className="col-span-12 md:col-span-2">
                <input
                  type="text"
                  min={0}
                  value={formatRupiah(amounts.r1d).replace(/^Rp\s?/, "")} // Hilangkan "Rp" di depan dengan menggunakan replace(/^Rp\s?/, "")
                  onChange={handleAmountChange("r1d")}
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

export default PertanyaanB;
