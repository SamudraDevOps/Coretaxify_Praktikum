import React, { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Select from "react-select";

const PertanyaanD = ({ onAnswerChange, answersState }) => {
  const [showSection, setShowSection] = useState(false);

  const [amt4, setAmt4] = useState(0);
  const [r5, setR5] = useState(null);
  const [amt5, setAmt5] = useState(0);
  const [r6, setR6] = useState(null);
  const [amt6, setAmt6] = useState(0);
  const [amt7, setAmt7] = useState(0);
  const [r8, setR8] = useState(null);
  const [amt8, setAmt8] = useState(0);
  const [r9, setR9] = useState(null);
  const [amt9, setAmt9] = useState(0);
  const [r10, setR10] = useState(null);
  const [amt10, setAmt10] = useState(0);
  const [r11, setR11] = useState(null);
  const [amt11, setAmt11] = useState(0);
  const [amt12, setAmt12] = useState(0);

  // Daftar tarif pajak (opsional, bisa disesuaikan)
  const tarifPajakOptions = [
    { value: "1", label: "Tarif Ketentuan Umum Sebagaimana Pasal 17 ayat (1) huruf b UU PPh " },
    { value: "2", label: "Tarif Fasilitas Sebagaimana Pasal 17 ayat (2b) UU PPh" },
    { value: "3", label: "Tarif Fasilitas Sebagaimana Pasal 31E ayat (1) UU PPh" },
    { value: "4", label: "Tarif Pajak Lainnya" },
  ];

  useEffect(() => {
    if (answersState) {
    }
  }, [answersState]);

  const handler5Change = (value) => {
    console.log("5 changed:", value);
    setR5(value);
    onAnswerChange?.("r5", value);
  };

  const handler6Change = (value) => {
    console.log("6 changed:", value);
    setR6(value);
    onAnswerChange?.("r6", value);
  };

  const handler8Change = (value) => {
    console.log("8 changed:", value);
    setR8(value);
    onAnswerChange?.("r8", value);
  };

  const handler10Change = (value) => {
    console.log("10 changed:", value);
    setR10(value);
    onAnswerChange?.("r10", value);
  };

  const handler11Change = (value) => {
    console.log("11 changed:", value);
    setR11(value);
    onAnswerChange?.("r11", value);
  };
  return (
    <>
      <div
        className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
        onClick={() => setShowSection(!showSection)}
      >
        <h3 className="text-lg font-semibold">D. PERHITUNGAN PPh</h3>
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
          showSection
            ? "max-h-[1000px] opacity-100 overflow-visible"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="border rounded-md p-4 mb-4">
          <div className="divide-y">
            {/* 4 */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">4</span>
                <span className="text-gray-800 text-base font-medium">
                  Penghasilan Neto Fiskal sebelum Fasilitas Pajak
                  <span className="text-red-500">*</span>
                </span>
              </div>
              <div className="col-span-12 md:col-span-2"></div>
              <div className="col-span-12 md:col-span-2">
                <input
                  type="number"
                  min={0}
                  value={amt4}
                  onChange={(e) => setAmt4(+e.target.value || 0)}
                  className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                />
              </div>
            </div>

            {/* 5 */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">5</span>
                <span className="text-gray-800 text-base font-medium">
                  Apakah Wajib Pajak memperoleh Fasilitas Perpajakan Dalam Rangka Penanaman Modal
                  berupa pengurangan penghasilan neto?
                  <span className="text-red-500">*</span>
                </span>
              </div>
              <div className="col-span-12 md:col-span-2">
                <div className="flex items-center gap-6">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r5"
                      checked={r5 === true}
                      // change
                      onChange={() => handler5Change(true)}
                    />
                    <span>Ya</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r5"
                      checked={r5 === false}
                      onChange={() => handler5Change(false)}
                    />
                    <span>Tidak</span>
                  </label>
                </div>
              </div>
              <div className="col-span-12 md:col-span-2">
                <input
                  type="number"
                  min={0}
                  value={amt5}
                  onChange={(e) => setAmt5(+e.target.value || 0)}
                  className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                />
              </div>{" "}
              <div className="col-span-12 md:col-span-3 text-sm">
                <div className="bg-blue-100 rounded px-3 py-2">
                  {r5 === true && "Ya, silahkan mengisi lampiran 13A"}
                  {r5 === false && "Tidak, silahkan lanjut pertanyaan berikutnya"}
                  {r5 === null && "Pilih salah satu Ya/Tidak"}
                </div>
              </div>
            </div>

            {/* 6 */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">6</span>
                <span className="text-gray-800 text-base font-medium">
                  Apakah Wajib Pajak memperoleh Fasilitas Pengurangan Penghasilan Bruto untuk
                  Kegiatan Praktik Kerja, Pemagangan, dan/atau Pembelajaran Dalam Rangka Pembinaan
                  dan Pengembangan Sumber daya Manusia Berbasis Kompetensi Tertentu?
                  <span className="text-red-500">*</span>
                </span>
              </div>
              <div className="col-span-12 md:col-span-2">
                <div className="flex items-center gap-6">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r6"
                      checked={r6 === true}
                      // change
                      onChange={() => handler6Change(true)}
                    />
                    <span>Ya</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r6"
                      checked={r6 === false}
                      onChange={() => handler6Change(false)}
                    />
                    <span>Tidak</span>
                  </label>
                </div>
              </div>
              <div className="col-span-12 md:col-span-2">
                <input
                  type="number"
                  min={0}
                  value={amt6}
                  onChange={(e) => setAmt6(+e.target.value || 0)}
                  className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                />
              </div>{" "}
              <div className="col-span-12 md:col-span-3 text-sm">
                <div className="bg-blue-100 rounded px-3 py-2">
                  {r6 === true && "Ya, silahkan mengisi lampiran 13B tabel A dan B"}
                  {r6 === false && "Tidak, silahkan lanjut pertanyaan berikutnya"}
                  {r6 === null && "Pilih salah satu Ya/Tidak"}
                </div>
              </div>
            </div>

            {/* 7 */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">7</span>
                <span className="text-gray-800 text-base font-medium">
                  Penghasilan Neto Fiskal Setelah Fasilitas Pajak
                  {/* <span className="text-red-500">*</span> */}
                </span>
              </div>
              <div className="col-span-12 md:col-span-2"></div>
              <div className="col-span-12 md:col-span-2">
                <input
                  type="number"
                  min={0}
                  value={amt7}
                  onChange={(e) => setAmt7(+e.target.value || 0)}
                  className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                />
              </div>
            </div>

            {/* 8 */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">8</span>
                <span className="text-gray-800 text-base font-medium">
                  Apakah terdapat kerugian fiskal yang dapat dikompensasikan?
                  <span className="text-red-500">*</span>
                </span>
              </div>
              <div className="col-span-12 md:col-span-2">
                <div className="flex items-center gap-6">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r8"
                      checked={r8 === true}
                      // change
                      onChange={() => handler8Change(true)}
                    />
                    <span>Ya</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r8"
                      checked={r8 === false}
                      onChange={() => handler8Change(false)}
                    />
                    <span>Tidak</span>
                  </label>
                </div>
              </div>
              <div className="col-span-12 md:col-span-2">
                <input
                  type="number"
                  min={0}
                  value={amt8}
                  onChange={(e) => setAmt8(+e.target.value || 0)}
                  className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                />
              </div>{" "}
              <div className="col-span-12 md:col-span-3 text-sm">
                <div className="bg-blue-100 rounded px-3 py-2">
                  {r8 === true && "Ya, silahkan mengisi lampiran 7"}
                  {r8 === false && "Tidak, silahkan lanjut pertanyaan berikutnya"}
                  {r8 === null && "Pilih salah satu Ya/Tidak"}
                </div>
              </div>
            </div>

            {/* 9 */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">9</span>
                <span className="text-gray-800 text-base font-medium">
                  Penghasilan Kena Pajak
                  {/* <span className="text-red-500">*</span> */}
                </span>
              </div>
              <div className="col-span-12 md:col-span-2"></div>
              <div className="col-span-12 md:col-span-2">
                <input
                  type="number"
                  min={0}
                  value={amt9}
                  onChange={(e) => setAmt9(+e.target.value || 0)}
                  className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                />
              </div>
            </div>

            {/* 10 */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">10</span>
                <span className="text-gray-800 text-base font-medium">
                  Apakah Wajib Pajak memperoleh Fasilitas Pengurangan Penghasilan Bruto untuk
                  Kegiatan Penelitian dan Pengembangan Tertentu?{" "}
                  <span className="text-red-500">*</span>
                </span>
              </div>
              <div className="col-span-12 md:col-span-2">
                <div className="flex items-center gap-6">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r10"
                      checked={r10 === true}
                      // change
                      onChange={() => handler10Change(true)}
                    />
                    <span>Ya</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r10"
                      checked={r10 === false}
                      onChange={() => handler10Change(false)}
                    />
                    <span>Tidak</span>
                  </label>
                </div>
              </div>
              <div className="col-span-12 md:col-span-2">
                <input
                  type="number"
                  min={0}
                  value={amt10}
                  onChange={(e) => setAmt10(+e.target.value || 0)}
                  className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                />
              </div>{" "}
              <div className="col-span-12 md:col-span-3 text-sm">
                <div className="bg-blue-100 rounded px-3 py-2">
                  {r10 === true && "Ya, silahkan mengisi lampiran 13B tabel C dan D "}
                  {r10 === false && "Tidak, silahkan lanjut pertanyaan berikutnya"}
                  {r10 === null && "Pilih salah satu Ya/Tidak"}
                </div>
              </div>
            </div>

            {/* 11 */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">11</span>
                <span className="text-gray-800 text-base font-medium">
                  Tarif Pajak
                  <span className="text-red-500">*</span>
                </span>
              </div>
              <div className="col-span-12 md:col-span-2"></div>
              <div className="col-span-12 md:col-span-2">
                <Select
                  value={tarifPajakOptions.find((option) => option.value === r11) || null}
                  onChange={(selectedOption) => handler11Change(selectedOption?.value || "")}
                  options={tarifPajakOptions}
                  className="text-sm"
                  classNamePrefix="react-select"
                  placeholder="Please select"
                  isClearable={false} // opsional, jika ingin membiarkan "Please select" tetap terpilih
                />
              </div>
              <div className="col-span-12 md:col-span-3 text-sm">
                <div className="bg-blue-100 rounded px-3 py-2">
                  {r11 === "1" && "Comming soon... "}
                  {r11 === "2" && "Comming soon... "}
                  {r11 === "3" && "Silakan isi Lampiran 8"}
                  {r11 === "4" && "Silakan masukkan persentase tarif pajak (kolom 11.a)"}
                  {r11 === "" && "Pilih salah satu opsi"}
                </div>
              </div>
            </div>

            {/* 12 */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">12</span>
                <span className="text-gray-800 text-base font-medium">
                  PPh Terutang
                  {/* <span className="text-red-500">*</span> */}
                </span>
              </div>
              <div className="col-span-12 md:col-span-2"></div>
              <div className="col-span-12 md:col-span-2">
                <input
                  type="number"
                  min={0}
                  value={amt12}
                  onChange={(e) => setAmt12(+e.target.value || 0)}
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

export default PertanyaanD;
