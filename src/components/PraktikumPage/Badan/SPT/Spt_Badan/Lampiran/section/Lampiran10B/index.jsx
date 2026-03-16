import React, { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { parseFormattedNumber, formatRupiah } from "@utils/formatCurrency";

const Pertanyaan = ({ onAnswerChange, answersState }) => {
  const [showSection, setShowSection] = useState(false);

  const [r1_3, setR1_3] = useState(null);
  const [r1_4, setR1_4] = useState(null);
  const [r1_5, setR1_5] = useState(null);
  const [r1_6, setR1_6] = useState(null);

  const [r2_3, setR2_3] = useState(null);
  const [r2_4, setR2_4] = useState(null);
  const [r2_5, setR2_5] = useState(null);

  const [r3_3, setR3_3] = useState(null);
  const [r3_4, setR3_4] = useState(null);
  const [r3_5, setR3_5] = useState(null);
  const [r3_6, setR3_6] = useState(null);
  const [r3_7, setR3_7] = useState(null);

  const [r4_3, setR4_3] = useState(null);
  const [r4_4, setR4_4] = useState(null);
  const [r4_5, setR4_5] = useState(null);

  useEffect(() => {
    if (answersState) {
    }
  }, [answersState]);

  const [radios, setRadios] = useState({
    r1_3: null,
    r1_4: null,
    r1_5: null,
    r1_6: null,

    r2_3: null,
    r2_4: null,
    r2_5: null,

    r3_3: null,
    r3_4: null,
    r3_5: null,
    r3_6: null,
    r3_7: null,

    r4_3: null,
    r4_4: null,
    r4_5: null,
  });

  const handleRadioChange = (field, value) => {
    setRadios((prev) => ({ ...prev, [field]: value }));
    onAnswerChange?.(field, value);
    console.log("Radio changed:", field, value);
  };

  return (
    <>
      <div>
        <div>
          <div className="divide-y">
            {/* 1 */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-8 flex gap-3 items-center">
                <span className=" text-gray-700 font-medium min-w-[3.5rem]">1.</span>
                <span className="text-gray-800 text-base font-bold">
                  Mengenai Hubungan Istimewa
                </span>
              </div>
            </div>
            {/* 2 */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center my-3">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]"></span>
                <span className="text-gray-800 text-base font-bold">
                  Bahwasanya kami telah menerapkan Prinsip Kewajaran dan Kelaziman Usaha{" "}
                  {/* <span className="text-red-500">*</span> */}
                </span>
              </div>
            </div>
            {/* 3 */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-8 flex gap-3 items-center my-3">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]"></span>
                <span className="text-gray-800 text-base font-medium">
                  Transaksi dengan pihak yang memiliki hubungan istimewa karena kepemilikan
                  saham/penyertaan
                  {/* <span className="text-red-500">*</span> */}
                </span>
              </div>
              <div className="col-span-12 md:col-span-2">
                <div className="flex items-center gap-6">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r1_3"
                      checked={radios.r1_3 === true}
                      // change
                      onChange={() => handleRadioChange("r1_3", true)}
                    />
                    <span>Ya</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r1_3"
                      checked={radios.r1_3 === false}
                      onChange={() => handleRadioChange("r1_3", false)}
                    />
                    <span>Tidak</span>
                  </label>
                </div>
              </div>
            </div>
            {/* 4 */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-8 flex gap-3 items-center my-3">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]"></span>
                <span className="text-gray-800 text-base font-medium">
                  Transaksi dengan pihak yang memiliki hubungan istimewa karena penguasaan
                </span>
              </div>
              <div className="col-span-12 md:col-span-2">
                <div className="flex items-center gap-6">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r1_4"
                      checked={radios.r1_4 === true}
                      // change
                      onChange={() => handleRadioChange("r1_4", true)}
                    />
                    <span>Ya</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r1_4"
                      checked={radios.r1_4 === false}
                      onChange={() => handleRadioChange("r1_4", false)}
                    />
                    <span>Tidak</span>
                  </label>
                </div>
              </div>
            </div>
            {/* 5 */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-8 flex gap-3 items-center my-3">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]"></span>
                <span className="text-gray-800 text-base font-medium">
                  Transaksi dengan pihak yang memiliki hubungan istimewa karena hubungan keluarga
                  {/* <span className="text-red-500">*</span> */}
                </span>
              </div>
              <div className="col-span-12 md:col-span-2">
                <div className="flex items-center gap-6">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r1_5"
                      checked={radios.r1_5 === true}
                      // change
                      onChange={() => handleRadioChange("r1_5", true)}
                    />
                    <span>Ya</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r1_5"
                      checked={radios.r1_5 === false}
                      onChange={() => handleRadioChange("r1_5", false)}
                    />
                    <span>Tidak</span>
                  </label>
                </div>
              </div>
            </div>

            {/* 6 */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-8 flex gap-3 items-center my-3">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]"></span>
                <span className="text-gray-800 text-base font-medium">
                  Transaksi yang dilakukan antarpihak yang tidak memiliki hubungan istimewa tetapi
                  Pihak Afiliasi dari salah satu atau kedua pihak yang bertransaksi tersebut
                  menentukan lawan transaksi dan harga transaksi.{" "}
                  {/* <span className="text-red-500">*</span> */}
                </span>
              </div>
              <div className="col-span-12 md:col-span-2">
                <div className="flex items-center gap-6">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r1_6"
                      checked={radios.r1_6 === true}
                      // change
                      onChange={() => handleRadioChange("r1_6", true)}
                    />
                    <span>Ya</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r1_6"
                      checked={radios.r1_6 === false}
                      onChange={() => handleRadioChange("r1_6", false)}
                    />
                    <span>Tidak</span>
                  </label>
                </div>
              </div>
            </div>

            {/* 2-1 */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2 mt-2">
              <div className="col-span-12 md:col-span-8 flex gap-3 items-center">
                <span className=" text-gray-700 font-medium min-w-[3.5rem]">2.</span>
                <span className="text-gray-800 text-base font-bold">Mengenai transaksi </span>
              </div>
            </div>
            {/* 2-2 */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center my-3">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]"></span>
                <span className="text-gray-800 text-base font-bold">
                  Bahwasanya kami telah menerapkan Prinsip Kewajaran dan Kelaziman Usaha{" "}
                  {/* <span className="text-red-500">*</span> */}
                </span>
              </div>
            </div>
            {/* 2-3 */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-8 flex gap-3 items-center my-3">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]"></span>
                <span className="text-gray-800 text-base font-medium">
                  berdasarkan keadaan yang sebenarnya.
                  {/* <span className="text-red-500">*</span> */}
                </span>
              </div>
              <div className="col-span-12 md:col-span-2">
                <div className="flex items-center gap-6">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r2_3"
                      checked={radios.r2_3 === true}
                      // change
                      onChange={() => handleRadioChange("r2_3", true)}
                    />
                    <span>Ya</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r2_3"
                      checked={radios.r2_3 === false}
                      onChange={() => handleRadioChange("r2 _3", false)}
                    />
                    <span>Tidak</span>
                  </label>
                </div>
              </div>
            </div>

            {/* 2-4 */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-8 flex gap-3 items-center my-3">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]"></span>
                <span className="text-gray-800 text-base font-medium">
                  pada saat Penentuan Harga Transfer dan/ atau saat terjadinya Transaksi yang
                  Dipengaruhi Hubungan Istimewa.
                  {/* <span className="text-red-500">*</span> */}
                </span>
              </div>
              <div className="col-span-12 md:col-span-2">
                <div className="flex items-center gap-6">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r2_4"
                      checked={radios.r2_4 === true}
                      // change
                      onChange={() => handleRadioChange("r2_4", true)}
                    />
                    <span>Ya</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r2_4"
                      checked={radios.r2_4 === false}
                      onChange={() => handleRadioChange("r2_4", false)}
                    />
                    <span>Tidak</span>
                  </label>
                </div>
              </div>
            </div>

            {/* 2-  : */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-8 flex gap-3 items-center my-3">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]"></span>
                <span className="text-gray-800 text-base font-medium">
                  sesuai dengan:
                  {/* <span className="text-red-500">*</span> */}
                </span>
              </div>
            </div>

            {/* 2-5 dan 2-6 dengan radio button lurus kanan */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-8 flex gap-10 items-center my-3">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]"></span>
                <div>
                  <div className="text-gray-800 text-base font-medium mb-5">
                    - tahapan penerapan Prinsip Kewajaran dan Kelaziman Usaha; dan
                  </div>
                  <div className="text-gray-800 text-base font-medium">
                    - tahapan pendahuluan dalam hal terdapat Transaksi Yang Dipengaruhi Hubungan
                    Istimewa tertentu.
                  </div>
                </div>
              </div>
              <div className="col-span-12 md:col-span-2 flex items-center gap-6">
                <label className="inline-flex items-center gap-2">
                  <input
                    type="radio"
                    name="r2_5"
                    checked={radios.r2_5 === true}
                    onChange={() => handleRadioChange("r2_5", true)}
                  />
                  <span>Ya</span>
                </label>
                <label className="inline-flex items-center gap-2">
                  <input
                    type="radio"
                    name="r2_5"
                    checked={radios.r2_5 === false}
                    onChange={() => handleRadioChange("r2_5", false)}
                  />
                  <span>Tidak</span>
                </label>
              </div>
            </div>

            {/* 3-1 */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2 mt-2">
              <div className="col-span-12 md:col-span-8 flex gap-3 items-center">
                <span className=" text-gray-700 font-medium min-w-[3.5rem]">3.</span>
                <span className="text-gray-800 text-base font-bold">
                  Mengenai Dokumentasi Penerapan Prinsip Kewajaran dan Kelaziman Usaha{" "}
                </span>
              </div>
            </div>
            {/* 3-2 */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center my-3">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]"></span>
                <span className="text-gray-800 text-base font-bold">
                  Bahwasanya kami memiliki {/* <span className="text-red-500">*</span> */}
                </span>
              </div>
            </div>

            {/* 3-3 */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-8 flex gap-3 items-center my-3">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">a .</span>
                <span className="text-gray-800 text-base font-medium">
                  nilai peredaran bruto tahun pajak sebelumnya dalam satu tahun pajak lebih dari
                  Rp50.000.000.000,00 (lima puluh miliar rupiah);{" "}
                  {/* <span className="text-red-500">*</span> */}
                </span>
              </div>
              <div className="col-span-12 md:col-span-2">
                <div className="flex items-center gap-6">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r3_3"
                      checked={radios.r3_3 === true}
                      // change
                      onChange={() => handleRadioChange("r3_3", true)}
                    />
                    <span>Ya</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r3_3"
                      checked={radios.r3_3 === false}
                      onChange={() => handleRadioChange("r3_3", false)}
                    />
                    <span>Tidak</span>
                  </label>
                </div>
              </div>
            </div>

            {/* 3-4 */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-8 flex gap-3 items-center my-3">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">b .</span>
                <span className="text-gray-800 text-base font-medium">
                  nilai Transaksi Afiliasi tahun pajak sebelumnya dalam satu tahun pajak lebih dari
                  Rp20.000.000.000,00 (dua puluh miliar rupiah) untuk transaksi barang berwujud;
                  {/* <span className="text-red-500">*</span> */}
                </span>
              </div>
              <div className="col-span-12 md:col-span-2">
                <div className="flex items-center gap-6">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r3_4"
                      checked={radios.r3_4 === true}
                      // change
                      onChange={() => handleRadioChange("r3_4", true)}
                    />
                    <span>Ya</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r3_4"
                      checked={radios.r3_4 === false}
                      onChange={() => handleRadioChange("r3_4", false)}
                    />
                    <span>Tidak</span>
                  </label>
                </div>
              </div>
            </div>

            {/* 3-5 */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-8 flex gap-3 items-center my-3">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">c .</span>
                <span className="text-gray-800 text-base font-medium">
                  nilai Transaksi Afiliasi tahun pajak sebelumnya dalam satu tahun pajak: lebih dari
                  Rp5.000.000.000,00 (lima miliar rupiah) untuk masing-masing penyediaan jasa,
                  pembayaran bunga, pemanfaatan barang tidak berwujud, atau Transaksi Afiliasi
                  lainnya;
                  {/* <span className="text-red-500">*</span> */}
                </span>
              </div>
              <div className="col-span-12 md:col-span-2">
                <div className="flex items-center gap-6">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r3_5"
                      checked={radios.r3_5 === true}
                      // change
                      onChange={() => handleRadioChange("r3_5", true)}
                    />
                    <span>Ya</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r3_5"
                      checked={radios.r3_5 === false}
                      onChange={() => handleRadioChange("r3_5", false)}
                    />
                    <span>Tidak</span>
                  </label>
                </div>
              </div>
            </div>

            {/* 3-6 */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-8 flex gap-3 items-center my-3">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">d .</span>
                <span className="text-gray-800 text-base font-medium">
                  Pihak Afiliasi yang berada di negara atau yurisdiksi dengan tarif pajak
                  penghasilan lebih rendah daripada tarif pajak penghasilan
                  {/* <span className="text-red-500">*</span> */}
                </span>
              </div>
              <div className="col-span-12 md:col-span-2">
                <div className="flex items-center gap-6">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r3_6"
                      checked={radios.r3_6 === true}
                      // change
                      onChange={() => handleRadioChange("r3_6", true)}
                    />
                    <span>Ya</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r3_6"
                      checked={radios.r3_6 === false}
                      onChange={() => handleRadioChange("r3_6", false)}
                    />
                    <span>Tidak</span>
                  </label>
                </div>
              </div>
            </div>

            {/* 3-7 */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-8 flex gap-3 items-center my-3">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">d .</span>
                <span className="text-gray-800 text-base font-medium">
                  Grup Usaha dengan peredaran bruto konsolidasi paling sedikit
                  Rp11.000.000.000.000,00 (sebelas triliun rupiah) pada tahun pajak sebelumnya
                  {/* <span className="text-red-500">*</span> */}
                </span>
              </div>
              <div className="col-span-12 md:col-span-2">
                <div className="flex items-center gap-6">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r3_7"
                      checked={radios.r3_7 === true}
                      // change
                      onChange={() => handleRadioChange("r3_7", true)}
                    />
                    <span>Ya</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r3_7"
                      checked={radios.r3_7 === false}
                      onChange={() => handleRadioChange("r3_7", false)}
                    />
                    <span>Tidak</span>
                  </label>
                </div>
              </div>
            </div>

            {/* 4-1 */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2 mt-2">
              <div className="col-span-12 md:col-span-8 flex gap-3 items-center">
                <span className=" text-gray-700 font-medium min-w-[3.5rem]">4.</span>
                <span className="text-gray-800 text-base font-bold">
                  Mengenai Dokumen Penentuan Harga Transfer
                </span>
              </div>
            </div>
            {/* 4-2 */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-5 flex gap-3 items-center my-3">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]"></span>
                <span className="text-gray-800 text-base font-bold">
                  Bahwasanya kami telah menyelenggarakan:
                  {/* <span className="text-red-500">*</span> */}
                </span>
              </div>
            </div>
            {/* 4-3 */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-8 flex gap-3 items-center my-3">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]"></span>
                <span className="text-gray-800 text-base font-medium">
                  Dokumen Induk {/* <span className="text-red-500">*</span> */}
                </span>
              </div>
              <div className="col-span-12 md:col-span-2">
                <div className="flex items-center gap-6">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r4_3"
                      checked={radios.r4_3 === true}
                      // change
                      onChange={() => handleRadioChange("r4_3", true)}
                    />
                    <span>Ya</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r4_3"
                      checked={radios.r4_3 === false}
                      onChange={() => handleRadioChange("r4_3", false)}
                    />
                    <span>Tidak</span>
                  </label>
                </div>
              </div>
            </div>

            {/* 4-4 */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-8 flex gap-3 items-center my-3">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]"></span>
                <span className="text-gray-800 text-base font-medium">
                  Dokumen Lokal {/* <span className="text-red-500">*</span> */}
                </span>
              </div>
              <div className="col-span-12 md:col-span-2">
                <div className="flex items-center gap-6">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r4_4"
                      checked={radios.r4_4 === true}
                      // change
                      onChange={() => handleRadioChange("r4_4", true)}
                    />
                    <span>Ya</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r4_4"
                      checked={radios.r4_4 === false}
                      onChange={() => handleRadioChange("r4_4", false)}
                    />
                    <span>Tidak</span>
                  </label>
                </div>
              </div>
            </div>

            {/* 4-5 */}
            <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
              <div className="col-span-12 md:col-span-8 flex gap-3 items-center my-3">
                <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]"></span>
                <span className="text-gray-800 text-base font-medium">
                  Laporan per Negara {/* <span className="text-red-500">*</span> */}
                </span>
              </div>
              <div className="col-span-12 md:col-span-2">
                <div className="flex items-center gap-6">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r4_5"
                      checked={radios.r4_5 === true}
                      // change
                      onChange={() => handleRadioChange("r4_5", true)}
                    />
                    <span>Ya</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="r4_5"
                      checked={radios.r4_5 === false}
                      onChange={() => handleRadioChange("r4_5", false)}
                    />
                    <span>Tidak</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pertanyaan;
