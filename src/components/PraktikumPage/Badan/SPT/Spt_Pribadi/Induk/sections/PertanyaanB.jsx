import React, { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const PertanyaanB = ({ onAnswerChange, answersState }) => {
  const [showIkhtisarPenghasilanNeto, setShowIkhtisarPenghasilanNeto] = useState(false);

  // State untuk Bagian B - IKHTISAR PENGHASILAN NETO
  const [r1a, setR1a] = useState(null);
  const [amt1a, setAmt1a] = useState(0);
  const [r1b1, setR1b1] = useState(null);
  const [amt1b1, setAmt1b1] = useState(0);
  const [r1b2, setR1b2] = useState("");
  const [amt1b2, setAmt1b2] = useState(0);
  const [r1b3, setR1b3] = useState("");
  const [amt1b3, setAmt1b3] = useState(0);
  const [r1b4, setR1b4] = useState("");
  const [amt1b4, setAmt1b4] = useState(0);
  const [r1b5, setR1b5] = useState(null);
  const [amt1b5, setAmt1b5] = useState(0);
  const [r1c, setR1c] = useState(null);
  const [amt1c, setAmt1c] = useState(0);
  const [r1d, setR1d] = useState(null);
  const [amt1d, setAmt1d] = useState(0);

  // STEP 1: Sync dengan parent state

  useEffect(() => {
    if (answersState) {
      // Pertayaan 1.a
      setR1a(answersState.r1a ?? null);
      setAmt1a(answersState.amt1a ?? 0);

      // Pertanyaan 1.b.1
      setR1b1(answersState.r1b1 ?? null);
      setAmt1b1(answersState.amt1b1 ?? 0);

      // Pertanyaan 1.b.2
      setR1b2(answersState.r1b2 ?? "");
      setAmt1b2(answersState.amt1b2 ?? 0);

      // Pertanyaan 1.b.3
      setR1b3(answersState.r1b3 ?? "");
      setAmt1b3(answersState.amt1b3 ?? 0);

      // Pertanyaan 1.b.4
      setR1b4(answersState.r1b4 ?? "");
      setAmt1b4(answersState.amt1b4 ?? 0);

      // Pertanyaan 1.C
      setR1c(answersState.r1c ?? null);
      setAmt1c(answersState.amt1c ?? 0);

      // Pertanyaan 1.D
      setR1d(answersState.r1d ?? null);
      setAmt1d(answersState.amt1d ?? 0);

      // setR1b1(answersState.hasPenghasilanUsaha ?? null);
      //   setAmt1b1(answersState.amt1b1 ?? 0);
      //   setR1b2(answersState.r1b2 ?? "");
      //   setAmt1b2(answersState.amt1b2 ?? 0);
      //   setR1b3(answersState.r1b3 ?? "");
      //   setAmt1b3(answersState.amt1b3 ?? 0);
      //   setR1b4(answersState.r1b4 ?? "");
      //   setAmt1b4(answersState.amt1b4 ?? 0);
      //   setR1b5(answersState.r1b5 ?? null);
      //   setAmt1b5(answersState.amt1b5 ?? 0);
      //   setR1c(answersState.hasPenghasilanLainnya ?? null);
      //   setAmt1c(answersState.amt1c ?? 0);
      //   setR1d(answersState.hasPenghasilanLuarNegeri ?? null);
      //   setAmt1d(answersState.amt1d ?? 0);
    }
  }, [answersState]);

  // STEP 2: Handler untuk mengirim data ke parent
  const handleR1aChange = (value) => {
    console.log("🔄 1.a changed to:", value); // Debug log

    // Update local state dulu
    setR1a(value);

    // Kirim ke parent melalui onAnswerChange
    onAnswerChange?.("r1a", value);

    // Kirim amount juga jika diperlukan
    if (value) {
      onAnswerChange?.("amt1a", amt1a);
    }
  };

  const handleR1b1Change = (value) => {
    console.log("🔄 1.b.1 changed to:", value); // Debug log
    setR1b1(value);
    onAnswerChange?.("r1b1", value);
  };

  const handleR1b2Change = (value) => {
    console.log("🔄 1.b.2 changed to:", value); // Debug log

    setR1b2(value);
    onAnswerChange?.("r1b2", value);
  };

  const handleR1B3Change = (value) => {
    console.log("🔄 1.b.3 changed to:", value);
    setR1b3(value);
    onAnswerChange?.("r1b3", value);
  };

  const handleR1b4Change = (value) => {
    console.log("🔄 1.b.4 changed to:", value); // Debug log
    setR1b4(value);
    onAnswerChange?.("r1b4", value);
  };

  const handleR1cChange = (value) => {
    console.log("🔄 1.c changed to:", value); // Debug log
    setR1c(value);
    onAnswerChange?.("r1c", value);
  };

  const handleR1dChange = (value) => {
    console.log("🔄 1.d changed to:", value);
    setR1d(value);
    onAnswerChange?.("r1d", value);
  };

  // Handler untuk amount 1.a
  const handleAmt1aChange = (value) => {
    setAmt1a(value);
    onAnswerChange?.("amt1a", value);
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
                      checked={r1a === true}
                      // change
                      onChange={() => handleR1aChange(true)}
                    />
                    <span>Ya</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r1a"
                      checked={r1a === false}
                      onChange={() => handleR1aChange(false)}
                    />
                    <span>Tidak</span>
                  </label>
                </div>
              </div>
              <div className="col-span-12 md:col-span-3 text-sm">
                <div className="bg-blue-100 rounded px-3 py-2">
                  {r1a === true && "Ya, silahkan mengisi lampiran I Bagian D"}
                  {r1a === false && "Tidak, Lanjutkan pertanyaan 1.b.1"}
                  {r1a === null && "Pilih salah satu Ya/Tidak"}
                </div>
              </div>
              <div className="col-span-12 md:col-span-2">
                <input
                  type="number"
                  min={0}
                  value={amt1a}
                  onChange={(e) => handleAmt1aChange(+e.target.value || 0)}
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
                      checked={r1b1 === true}
                      onChange={() => handleR1b1Change(true)}
                    />
                    <span>Ya</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r1b1"
                      checked={r1b1 === false}
                      onChange={() => handleR1b1Change(false)}
                    />
                    <span>Tidak</span>
                  </label>
                </div>
              </div>
              <div className="col-span-12 md:col-span-3 text-sm">
                <div className="bg-blue-100 rounded px-3 py-2">
                  {r1b1 === true && "Ya, silahkan mengisi jumlah pajak yang dapat diangsur/ditunda"}
                  {r1b1 === false && "Tidak, Lanjutkan pertanyaan 1.c"}
                  {r1b1 === null && "Pilih salah satu Ya/Tidak"}
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
                <select
                  className="w-full p-2 border rounded-md text-sm truncate"
                  value={r1b2}
                  onChange={(e) => handleR1b2Change(e.target.value)}
                >
                  <option value="">Please select</option>
                  <option value="ya_final" className="whitespace-normal break-words">
                    Ya, termasuk WP OP yang memiliki peredaran bruto tertentu yang dikenakan PPh
                    final
                  </option>
                  <option value="ya_oppt">Ya, termasuk WP OPPT</option>
                  <option value="tidak">Tidak</option>
                </select>
              </div>
              <div className="col-span-12 md:col-span-3 text-sm">
                <div className="bg-blue-100 rounded px-3 py-2">
                  {r1b2 === "ya_final" &&
                    "Anda memilih WP OP dengan peredaran bruto tertentu yang dikenakan PPh final. Silakan isi Lampiran 3B."}
                  {r1b2 === "ya_oppt" && "Anda termasuk WP OPPT. Silakan isi Lampiran 3B Bagian B."}
                  {r1b2 === "tidak" &&
                    "Anda tidak termasuk kategori ini. Lanjutkan ke pertanyaan berikutnya 1.b.4."}
                  {r1b2 === "" && "Pilih salah satu opsi"}
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
                <select
                  className="w-full p-2 border rounded-md text-sm"
                  value={r1b3}
                  onChange={(e) => handleR1B3Change(e.target.value)}
                >
                  <option value="">Please select</option>
                  <option value="ya">Ya, saya menggunakan Norma.</option>
                  <option value="tidak">Tidak, saya menyelenggarakan pembukuan.</option>
                </select>
              </div>
              <div className="col-span-12 md:col-span-3 text-sm">
                <div className="bg-blue-100 rounded px-3 py-2">
                  {r1b3 === "ya" &&
                    "Ya, saya menyusun laporan keuangan berbasis kas/laporan keuangan."}
                  {r1b3 === "tidak" &&
                    "Tidak, saya tidak menyusun laporan keuangan berbasis kas/laporan keuangan. Lanjutkan ke pertanyaan berikutnya."}
                  {r1b3 === "" && "Pilih salah satu opsi"}
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
                <select
                  className="w-full p-2 border rounded-md text-sm"
                  value={r1b4}
                  onChange={(e) => handleR1b4Change(e.target.value)}
                >
                  <option value="">Please select</option>
                  <option value="Dagang">Dagang</option>
                  <option value="Jasa">Jasa</option>
                  <option value="Manufaktur">Manufaktur</option>
                  <option value="Umum">Umum</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>
              <div className="col-span-12 md:col-span-3 text-sm">
                <div className="bg-blue-100 rounded px-3 py-2">
                  {r1b4 === "Dagang" &&
                    "Anda memilih sektor usaha Dagang. Silakan isi Lampiran 3A-4 Bagian A."}
                  {r1b4 === "Jasa" &&
                    "Anda memilih sektor usaha Jasa. Silakan isi Lampiran 3A-4 Bagian A."}
                  {r1b4 === "Manufaktur" &&
                    "Anda memilih sektor usaha Manufaktur. Silakan isi Lampiran 3A-4 Bagian A."}
                  {r1b4 === "Lainnya" &&
                    "Anda memilih sektor usaha Lainnya. Silakan isi Lampiran 3A-4 Bagian A."}
                  {r1b4 === "" && "Pilih salah satu opsi"}
                </div>
              </div>
              <div className="col-span-12 md:col-span-2">{/* Tidak ada input untuk 1.b.4 */}</div>
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
                  type="number"
                  min={0}
                  value={amt1b5}
                  onChange={(e) => setAmt1b5(+e.target.value || 0)}
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
                      checked={r1c === true}
                      onChange={() => handleR1cChange(true)}
                    />
                    <span>Ya</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r1c"
                      checked={r1c === false}
                      onChange={() => handleR1cChange(false)}
                    />
                    <span>Tidak</span>
                  </label>
                </div>
              </div>
              <div className="col-span-12 md:col-span-3 text-sm">
                <div className="bg-blue-100 rounded px-3 py-2">
                  {r1c === true && "Ya. Silahkan mengisi lampiran 3A-4 Bagian B"}
                  {r1c === false && "Tidak. Silahkan Melanjutkan ke pertanyaan berikutnya 1.d."}
                  {r1c === null && "Pilih salah satu Ya/Tidak"}
                </div>
              </div>
              <div className="col-span-12 md:col-span-2">
                <input
                  type="number"
                  min={0}
                  value={amt1c}
                  onChange={(e) => setAmt1c(+e.target.value || 0)}
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
                      checked={r1d === true}
                      onChange={() => handleR1dChange(true)}
                    />
                    <span>Ya</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r1d"
                      checked={r1d === false}
                      onChange={() => handleR1dChange(false)}
                    />
                    <span>Tidak</span>
                  </label>
                </div>
              </div>
              <div className="col-span-12 md:col-span-3 text-sm">
                <div className="bg-blue-100 rounded px-3 py-2">
                  {r1d === true && "Ya, silahkan mengisi lampiran 2 Bagian C"}
                  {r1d === false && "Tidak. Silahkan Melanjutkan ke pertanyaan berikutnya."}
                  {r1d === null && "Pilih salah satu Ya/Tidak"}
                </div>
              </div>
              <div className="col-span-12 md:col-span-2">
                <input
                  type="number"
                  min={0}
                  value={amt1d}
                  onChange={(e) => setAmt1d(+e.target.value || 0)}
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
