import React, { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { parseFormattedNumber, formatRupiah } from "@utils/formatCurrency";
import GlobalFormField from "@shared/GlobalFormField";

const Pertanyaan = ({ onAnswerChange, answersState }) => {
  const [showSection, setShowSection] = useState(false);

  const [r1_1, setR1_1] = useState(null);
  const [r1_2, setR1_2] = useState(null);
  const [r1_3, setR1_3] = useState(null);
  const [r1_4, setR1_4] = useState(null);
  const [r1_5, setR1_5] = useState(null);

  const [r2_1, setR2_1] = useState(null);
  const [r2_2, setR2_2] = useState(null);
  const [r2_3, setR2_3] = useState(null);
  const [r2_4, setR2_4] = useState(null);
  const [r2_5, setR2_5] = useState(null);

  const [checkbox, setCheckbox] = useState({
    r1_1: null,
    r1_2: null,
    r1_3: null,
    r1_4: null,
    r1_5: null,

    r2_1: null,
    r2_2: null,
    r2_3: null,
    r2_4: null,
    r2_5: null,
  });

  const handleCheckboxChange = (field, value) => {
    setCheckbox((prev) => ({ ...prev, [field]: value }));
    onAnswerChange?.(field, value);
    console.log("checkbox changed:", field, value);
  };
  const [form, setForm] = useState({
    TanggalInduk: "",
    TanggalLokal: "",
  });

  useEffect(() => {
    console.log("Tanggal Induk dipilih:", form.TanggalInduk);
    console.log("Tanggal Lokal dipilih:", form.TanggalLokal);
  }, [form.TanggalInduk, form.TanggalLokal]);

  return (
    <>
      <div>
        <div>
          <div className="divide-y">
            {/* Header Bagian I*/}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-8 flex gap-3 items-center">
                <span className=" text-gray-700 font-medium min-w-[3.5rem]">I.</span>
                <span className="text-gray-800 text-base font-bold">
                  Mengenai Hubungan Istimewa
                </span>
              </div>
            </div>

            {/* Sub Header Bagian I*/}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-8 flex gap-3 items-center my-3">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]"></span>
                <span className="text-gray-800 text-base font-medium">
                  Bahwasanya kami telah menyelenggarakan dokumen induk yang menjadi dasar penerapan
                  Prinsip Kewajaran dan Kelaziman Usaha (arm ’s length principle), yang memuat
                  informasi mengenai grup usaha sebagai berikut:
                  {/* <span className="text-red-500">*</span> */}
                </span>
              </div>
            </div>

            {/* 1 */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-8 flex gap-3 items-center my-3">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">
                  <label>
                    <input
                      type="checkbox"
                      name="r1_1"
                      checked={checkbox.r1_1 === true}
                      onChange={(e) => handleCheckboxChange("r1_1", e.target.checked)}
                      className="w-5 h-5 accent-blue-600"
                    />
                  </label>
                </span>
                <span className="text-gray-800 text-base font-medium">
                  Struktur dan bagan kepemilikan grup usaha serta negara atau yurisdiksi
                  masing-masing anggota grup usaha {/* <span className="text-red-500">*</span> */}
                </span>
              </div>
            </div>

            {/* 2 */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-8 flex gap-3 items-center my-3">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">
                  <label>
                    <input
                      type="checkbox"
                      name="r1_2"
                      checked={checkbox.r1_2 === true}
                      onChange={(e) => handleCheckboxChange("r1_2", e.target.checked)}
                      className="w-5 h-5 accent-blue-600"
                    />
                  </label>
                </span>
                <span className="text-gray-800 text-base font-medium">
                  Kegiatan usaha yang dilakukan oleh grup usaha
                  {/* <span className="text-red-500">*</span> */}
                </span>
              </div>
            </div>

            {/* 3 */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-8 flex gap-3 items-center my-3">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">
                  <label>
                    <input
                      type="checkbox"
                      name="r1_3"
                      checked={checkbox.r1_3 === true}
                      onChange={(e) => handleCheckboxChange("r1_3", e.target.checked)}
                      className="w-5 h-5 accent-blue-600"
                    />
                  </label>
                </span>
                <span className="text-gray-800 text-base font-medium">
                  Harta tidak berwujud yang dimiliki grup usaha{" "}
                  {/* <span className="text-red-500">*</span> */}
                </span>
              </div>
            </div>

            {/* 4 */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-8 flex gap-3 items-center my-3">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">
                  <label>
                    <input
                      type="checkbox"
                      name="r1_4"
                      checked={checkbox.r1_4 === true}
                      onChange={(e) => handleCheckboxChange("r1_4", e.target.checked)}
                      className="w-5 h-5 accent-blue-600"
                    />
                  </label>
                </span>
                <span className="text-gray-800 text-base font-medium">
                  Aktivitas pembiayaan dan keuangan dalam grup usaha
                  {/* <span className="text-red-500">*</span> */}
                </span>
              </div>
            </div>

            {/* 5 */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-8 flex gap-3 items-center my-3">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">
                  <label>
                    <input
                      type="checkbox"
                      name="r1_5"
                      checked={checkbox.r1_5 === true}
                      onChange={(e) => handleCheckboxChange("r1_5", e.target.checked)}
                      className="w-5 h-5 accent-blue-600"
                    />
                  </label>
                </span>
                <span className="text-gray-800 text-base font-medium">
                  Laporan keuangan konsolidasi entitas induk dan informasi perpajakan terkait
                  transaksi afiliasi
                  {/* <span className="text-red-500">*</span> */}
                </span>
              </div>
            </div>

            {/* Header Bagian II*/}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-8 flex gap-3 items-center">
                <span className=" text-gray-700 font-medium min-w-[3.5rem]">II.</span>
                <span className="text-gray-800 text-base font-bold">IKHTISAR DOKUMEN LOKAL </span>
              </div>
            </div>

            {/* Sub Header Bagian II*/}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-8 flex gap-3 items-center my-3">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]"></span>
                <span className="text-gray-800 text-base font-medium">
                  Bahwasanya kami telah menyelenggarakan dokumen lokal yang menjadi dasar penerapan
                  Prinsip Kewajaran dan Kelaziman Usaha (arm ’s length principle), yang memuat
                  informasi mengenai grup usaha sebagai berikut:
                  {/* <span className="text-red-500">*</span> */}
                </span>
              </div>
            </div>

            {/* 2.1 */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-8 flex gap-3 items-center my-3">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">
                  <label>
                    <input
                      type="checkbox"
                      name="r2_1"
                      checked={checkbox.r2_1 === true}
                      onChange={(e) => handleCheckboxChange("r2_1", e.target.checked)}
                      className="w-5 h-5 accent-blue-600"
                    />
                  </label>
                </span>
                <span className="text-gray-800 text-base font-medium">
                  Identitas dan kegiatan usaha yang dilakukan Wajib Pajak
                  {/* <span className="text-red-500">*</span> */}
                </span>
              </div>
            </div>

            {/* 2.2 */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-8 flex gap-3 items-center my-3">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">
                  <label>
                    <input
                      type="checkbox"
                      name="r2_2"
                      checked={checkbox.r2_2 === true}
                      onChange={(e) => handleCheckboxChange("r2_2", e.target.checked)}
                      className="w-5 h-5 accent-blue-600"
                    />
                  </label>
                </span>
                <span className="text-gray-800 text-base font-medium">
                  Informasi transaksi afiliasi dan transaksi independen yang dilakukan Wajib Pajak
                  {/* <span className="text-red-500">*</span> */}
                </span>
              </div>
            </div>

            {/* 2.3 */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-8 flex gap-3 items-center my-3">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">
                  <label>
                    <input
                      type="checkbox"
                      name="r2_3"
                      checked={checkbox.r2_3 === true}
                      onChange={(e) => handleCheckboxChange("r2_3", e.target.checked)}
                      className="w-5 h-5 accent-blue-600"
                    />
                  </label>
                </span>
                <span className="text-gray-800 text-base font-medium">
                  Penerapan prinsip kewajaran dan kelaziman usaha
                  {/* <span className="text-red-500">*</span> */}
                </span>
              </div>
            </div>

            {/* 2.4 */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-8 flex gap-3 items-center my-3">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">
                  <label>
                    <input
                      type="checkbox"
                      name="r2_4"
                      checked={checkbox.r2_4 === true}
                      onChange={(e) => handleCheckboxChange("r2_4", e.target.checked)}
                      className="w-5 h-5 accent-blue-600"
                    />
                  </label>
                </span>
                <span className="text-gray-800 text-base font-medium">
                  Informasi Keuangan Wajib Pajak
                  {/* <span className="text-red-500">*</span> */}
                </span>
              </div>
            </div>

            {/* 2.5 */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-8 flex gap-3 items-center my-3">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">
                  <label>
                    <input
                      type="checkbox"
                      name="r2_5"
                      checked={checkbox.r2_5 === true}
                      onChange={(e) => handleCheckboxChange("r2_5", e.target.checked)}
                      className="w-5 h-5 accent-blue-600"
                    />
                  </label>
                </span>
                <span className="text-gray-800 text-base font-medium">
                  Peristiwa-peristiwa/kejadian-kejadian/fakta-fakta non keuangan yang mempengaruhi
                  pembentukan harga atau tingkat laba
                  {/* <span className="text-red-500">*</span> */}
                </span>
              </div>
            </div>

            {/* Header Bagian III*/}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2 pt-10">
              <div className="col-span-12 md:col-span-8 flex gap-3 items-center">
                <span className=" text-gray-700 font-medium min-w-[3.5rem]">III.</span>
                <span className="text-gray-800 text-base font-bold">
                  PERNYATAAN PENYELENGGARAAN DAN PENYEDIAAN DOKUMEN INDUK DAN DOKUMEN LOKAL{" "}
                </span>
              </div>
            </div>

            {/* Sub Header Bagian III*/}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-8 flex gap-3 items-center my-3">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]"></span>
                <span className="text-gray-800 text-base font-medium">
                  Bahwasanya kami telah menyelenggarakan dokumen induk dan dokumen lokal berdasarkan
                  data dan informasi yang tersedia saat dilakukannya Transaksi Afiliasi, dan:
                  {/* <span className="text-red-500">*</span> */}
                </span>
              </div>
            </div>

            {/* 3.1 */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center my-3">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">1.</span>
                <span className="text-gray-800 text-base font-medium">
                  Dokumen Induk telah tersedia pada tanggal:{" "}
                </span>
              </div>
              <div className="col-span-12 md:col-span-4">
                <GlobalFormField
                  customChildren={[
                    {
                      key: "TanggalInduk",
                      type: "date",
                      title: "",
                      placeholder: "",
                      readOnly: false,
                      value: form.TanggalInduk,
                    },
                  ]}
                  formData={form}
                  onFieldChange={(key, value) => setForm((prev) => ({ ...prev, [key]: value }))}
                  labelWidth="w-80"
                />
              </div>
            </div>

            {/* 3.2 */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center my-3">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">2.</span>
                <span className="text-gray-800 text-base font-medium">
                  Dokumen Lokal telah tersedia pada tanggal:{" "}
                </span>
              </div>
              <div className="col-span-12 md:col-span-4">
                <GlobalFormField
                  customChildren={[
                    {
                      key: "TanggalLokal",
                      type: "date",
                      title: "",
                      placeholder: "",
                      readOnly: false,
                      value: form.TanggalLokal,
                    },
                  ]}
                  formData={form}
                  onFieldChange={(key, value) => setForm((prev) => ({ ...prev, [key]: value }))}
                  labelWidth="w-80"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pertanyaan;
