import React, { useState, useEffect } from 'react';
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const PertanyaanH = ({ onAnswerChange, answersState }) => {
    const [showSection, setShowSection] = useState(false);

    // State radio button
    const [r21a, setR21a] = useState(null);
    const [r21b, setR21b] = useState(null);
    const [r21c, setR21c] = useState(null);
    const [r21d, setR21d] = useState(null);
    const [r21e, setR21e] = useState(null);
    const [r21f, setR21f] = useState(null);
    const [r21g, setR21g] = useState(null);
    const [r21h, setR21h] = useState(null);
    const [r21i, setR21i] = useState(null);

    // State input
    const [kelebihanPphFinal, setKelebihanPphFinal] = useState(0);

    useEffect(() => {
        if (answersState) {
            setR21a(answersState.r21a || null);
            setR21b(answersState.r21b || null);
            setR21c(answersState.r21c || null);
            setR21d(answersState.r21d || null);
            setR21e(answersState.r21e || null);
            setR21f(answersState.r21f || null);
            setR21g(answersState.r21g || null);
            setR21h(answersState.r21h || null);
            setR21i(answersState.r21i || null);
            setKelebihanPphFinal(answersState.kelebihanPphFinal || 0);
        }
    }, [answersState]);

    const handleRadioChange = (field, value) => {
        console.log(`${field} changed to:`, value);
        switch (field) {
            case 'r21a': setR21a(value); onAnswerChange?.('r21a', value); break;
            case 'r21b': setR21b(value); onAnswerChange?.('r21b', value); break;
            case 'r21c': setR21c(value); onAnswerChange?.('r21c', value); break;
            case 'r21d': setR21d(value); onAnswerChange?.('r21d', value); break;
            case 'r21e': setR21e(value); onAnswerChange?.('r21e', value); break;
            case 'r21f': setR21f(value); onAnswerChange?.('r21f', value); break;
            case 'r21g': setR21g(value); onAnswerChange?.('r21g', value); break;
            case 'r21h': setR21h(value); onAnswerChange?.('r21h', value); break;
            case 'r21i': setR21i(value); onAnswerChange?.('r21i', value); break;
            default: break;
        }
    };

    const handleInputChange = (value) => {
        const num = parseFloat(value) || 0;
        setKelebihanPphFinal(num);
        onAnswerChange?.('kelebihanPphFinal', num);
    };

    const getHelperMessage = (field, value) => {
        if (field === 'r21a') {
            return value === "ya"
                ? "Ya, silahkan mengisi lampiran 10A, 10B, 10C"
                : value === "tidak"
                    ? "Tidak, silahkan lanjut pertanyaan berikutnya"
                    : "Pilih salah satu Ya/Tidak";
        }
        if (field === 'r21b') {
            return value === "tidak"
                ? "Tidak, silahkan lanjut pertanyaan berikutnya"
                : value === "ya"
                    ? "Ya, silahkan mengisi lampiran 10A, 10B, 10C"
                    : "Pilih salah satu Ya/Tidak";
        }
        if (field === 'r21c') {
            return value === "ya"
                ? "Ya, silahkan mengisi lampiran 2 Bagian B"
                : value === "tidak"
                    ? "Tidak, silahkan lanjut pertanyaan berikutnya"
                    : "Pilih salah satu Ya/Tidak";
        }
        if (field === 'r21d') {
            return value === "ya"
                ? "Ya, silahkan mengisi lampiran 2 Bagian B"
                : value === "tidak"
                    ? "Tidak, silahkan lanjut pertanyaan berikutnya"
                    : "Pilih salah satu Ya/Tidak";
        }
        if (field === 'r21e') {
            return value === "ya"
                ? "Ya, silahkan mengisi lampiran 9"
                : value === "tidak"
                    ? "Tidak, silahkan lanjut pertanyaan berikutnya"
                    : "Pilih salah satu Ya/Tidak";
        }
        if (field === 'r21f') {
            return value === "tidak"
                ? "Tidak, silahkan lanjut pertanyaan berikutnya"
                : value === "ya"
                    ? "Ya, silahkan mengisi lampiran 9"
                    : "Pilih salah satu Ya/Tidak";
        }
        if (field === 'r21g') {
            return value === "ya"
                ? "Ya, silahkan mengisi lampiran 13A"
                : value === "tidak"
                    ? "Tidak, silahkan lanjut pertanyaan berikutnya"
                    : "Pilih salah satu Ya/Tidak";
        }
        if (field === 'r21h') {
            return value === "tidak"
                ? "Tidak, silahkan lanjut pertanyaan berikutnya"
                : value === "ya"
                    ? "Ya, silahkan mengisi lampiran 13A"
                    : "Pilih salah satu Ya/Tidak";
        }
        if (field === 'r21i') {
            return value === "ya"
                ? "Ya, silahkan sampaikan laporan realisasi investasi secara terpisah pada menu layanan wajib pajak"
                : value === "tidak"
                    ? "Tidak, silahkan lanjut pertanyaan berikutnya"
                    : "Pilih salah satu Ya/Tidak";
        }
        return "";
    };

    return (
        <div>
            {/* Header Toggle */}
            <div
                className='border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full'
                onClick={() => setShowSection(!showSection)}
            >
                <h3 className='text-lg font-semibold'>H. PERNYATAAN TRANSAKSI</h3>
                {showSection ? <FaChevronUp /> : <FaChevronDown />}
            </div>

            {/* Konten Section */}
            {showSection && (
                <div className="border rounded-md p-4 mb-4">
                    {/* 21.a */}
                    <div className="grid grid-cols-12 gap-3 items-center px-3 py-2 border-b border-gray-200 pb-3">
                        <div className="col-span-12 md:col-span-5 flex gap-3 items-start">
                            <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">21.a.</span>
                            <span className="text-gray-700 font-normal text-base">
                                Apakah terdapat transaksi yang dipengaruhi hubungan istimewa atau transaksi dengan pihak yang merupakan penduduk tax haven country?
                            </span>
                        </div>
                        <div className="col-span-12 md:col-span-7 flex flex-col md:flex-row gap-4 md:gap-6 items-center">
                            <div className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="r21a"
                                    id="r21a-tidak"
                                    value="tidak"
                                    checked={r21a === "tidak"}
                                    onChange={(e) => handleRadioChange('r21a', e.target.value)}
                                />
                                <label htmlFor="r21a-tidak">Tidak</label>
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="r21a"
                                    id="r21a-ya"
                                    value="ya"
                                    checked={r21a === "ya"}
                                    onChange={(e) => handleRadioChange('r21a', e.target.value)}
                                />
                                <label htmlFor="r21a-ya">Ya</label>
                            </div>
                            <div className="md:col-span-3 text-sm">
                                <div className="bg-blue-100 rounded px-3 py-2">
                                    {getHelperMessage('r21a', r21a)}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 21.b */}
                    <div className="grid grid-cols-12 gap-3 items-center px-3 py-2 border-b border-gray-200 pb-3 pt-3">
                        <div className="col-span-12 md:col-span-5 flex gap-3 items-start">
                            <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">21.b.</span>
                            <span className="text-gray-700 font-normal text-base">
                                Apakah Wajib Pajak berkewajiban menyampaikan Dokumen Penentuan Harga Transfer?
                            </span>
                        </div>
                        <div className="col-span-12 md:col-span-7 flex flex-col md:flex-row gap-4 md:gap-6 items-center">
                            <div className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="r21b"
                                    id="r21b-tidak"
                                    value="tidak"
                                    checked={r21b === "tidak"}
                                    onChange={(e) => handleRadioChange('r21b', e.target.value)}
                                />
                                <label htmlFor="r21b-tidak">Tidak</label>
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="r21b"
                                    id="r21b-ya"
                                    value="ya"
                                    checked={r21b === "ya"}
                                    onChange={(e) => handleRadioChange('r21b', e.target.value)}
                                />
                                <label htmlFor="r21b-ya">Ya</label>
                            </div>
                            <div className="md:col-span-3 text-sm">
                                <div className="bg-blue-100 rounded px-3 py-2">
                                    {getHelperMessage('r21b', r21b)}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 21.c */}
                    <div className="grid grid-cols-12 gap-3 items-center px-3 py-2 border-b border-gray-200 pb-3 pt-3">
                        <div className="col-span-12 md:col-span-5 flex gap-3 items-start">
                            <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">21.c.</span>
                            <span className="text-gray-700 font-normal text-base">
                                Apakah terdapat penanaman modal pada perusahaan afiliasi?
                            </span>
                        </div>
                        <div className="col-span-12 md:col-span-7 flex flex-col md:flex-row gap-4 md:gap-6 items-center">
                            <div className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="r21c"
                                    id="r21c-tidak"
                                    value="tidak"
                                    checked={r21c === "tidak"}
                                    onChange={(e) => handleRadioChange('r21c', e.target.value)}
                                />
                                <label htmlFor="r21c-tidak">Tidak</label>
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="r21c"
                                    id="r21c-ya"
                                    value="ya"
                                    checked={r21c === "ya"}
                                    onChange={(e) => handleRadioChange('r21c', e.target.value)}
                                />
                                <label htmlFor="r21c-ya">Ya</label>
                            </div>
                            <div className="md:col-span-3 text-sm">
                                <div className="bg-blue-100 rounded px-3 py-2">
                                    {getHelperMessage('r21c', r21c)}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 21.d */}
                    <div className="grid grid-cols-12 gap-3 items-center px-3 py-2 border-b border-gray-200 pb-3 pt-3">
                        <div className="col-span-12 md:col-span-5 flex gap-3 items-start">
                            <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">21.d.</span>
                            <span className="text-gray-700 font-normal text-base">
                                Apakah Wajib Pajak memiliki utang dari pemilik modal atau perusahaan afiliasi, dan/atau piutang ke pemilik modal atau perusahaan afiliasi?
                            </span>
                        </div>
                        <div className="col-span-12 md:col-span-7 flex flex-col md:flex-row gap-4 md:gap-6 items-center">
                            <div className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="r21d"
                                    id="r21d-tidak"
                                    value="tidak"
                                    checked={r21d === "tidak"}
                                    onChange={(e) => handleRadioChange('r21d', e.target.value)}
                                />
                                <label htmlFor="r21d-tidak">Tidak</label>
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="r21d"
                                    id="r21d-ya"
                                    value="ya"
                                    checked={r21d === "ya"}
                                    onChange={(e) => handleRadioChange('r21d', e.target.value)}
                                />
                                <label htmlFor="r21d-ya">Ya</label>
                            </div>
                            <div className="md:col-span-3 text-sm">
                                <div className="bg-blue-100 rounded px-3 py-2">
                                    {getHelperMessage('r21d', r21d)}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 21.e */}
                    <div className="grid grid-cols-12 gap-3 items-center px-3 py-2 border-b border-gray-200 pb-3 pt-3">
                        <div className="col-span-12 md:col-span-5 flex gap-3 items-start">
                            <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">21.e.</span>
                            <span className="text-gray-700 font-normal text-base">
                                Apakah Wajib Pajak membebankan biaya penyusutan dan/atau amortisasi fiskal?
                            </span>
                        </div>
                        <div className="col-span-12 md:col-span-7 flex flex-col md:flex-row gap-4 md:gap-6 items-center">
                            <div className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="r21e"
                                    id="r21e-tidak"
                                    value="tidak"
                                    checked={r21e === "tidak"}
                                    onChange={(e) => handleRadioChange('r21e', e.target.value)}
                                />
                                <label htmlFor="r21e-tidak">Tidak</label>
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="r21e"
                                    id="r21e-ya"
                                    value="ya"
                                    checked={r21e === "ya"}
                                    onChange={(e) => handleRadioChange('r21e', e.target.value)}
                                />
                                <label htmlFor="r21e-ya">Ya</label>
                            </div>
                            <div className="md:col-span-3 text-sm">
                                <div className="bg-blue-100 rounded px-3 py-2">
                                    {getHelperMessage('r21e', r21e)}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 21.f */}
                    <div className="grid grid-cols-12 gap-3 items-center px-3 py-2 border-b border-gray-200 pb-3 pt-3">
                        <div className="col-span-12 md:col-span-5 flex gap-3 items-start">
                            <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">21.f.</span>
                            <span className="text-gray-700 font-normal text-base">
                                Apakah Wajib Pajak membebankan biaya entertainment, biaya promosi dan penjualan, penggantian atau imbalan dalam bentuk natura dan/atau kenikmatan, dan piutang yang nyata-nyata tidak dapat ditagih?
                            </span>
                        </div>
                        <div className="col-span-12 md:col-span-7 flex flex-col md:flex-row gap-4 md:gap-6 items-center">
                            <div className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="r21f"
                                    id="r21f-tidak"
                                    value="tidak"
                                    checked={r21f === "tidak"}
                                    onChange={(e) => handleRadioChange('r21f', e.target.value)}
                                />
                                <label htmlFor="r21f-tidak">Tidak</label>
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="r21f"
                                    id="r21f-ya"
                                    value="ya"
                                    checked={r21f === "ya"}
                                    onChange={(e) => handleRadioChange('r21f', e.target.value)}
                                />
                                <label htmlFor="r21f-ya">Ya</label>
                            </div>
                            <div className="md:col-span-3 text-sm">
                                <div className="bg-blue-100 rounded px-3 py-2">
                                    {getHelperMessage('r21f', r21f)}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 21.g */}
                    <div className="grid grid-cols-12 gap-3 items-center px-3 py-2 border-b border-gray-200 pb-3 pt-3">
                        <div className="col-span-12 md:col-span-5 flex gap-3 items-start">
                            <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">21.g.</span>
                            <span className="text-gray-700 font-normal text-base">
                                Apakah Wajib Pajak memperoleh fasilitas perpajakan dalam rangka penanaman modal di bidang-bidang usaha tertentu dan/atau daerah-daerah tertentu selain pengurangan penghasilan neto?
                            </span>
                        </div>
                        <div className="col-span-12 md:col-span-7 flex flex-col md:flex-row gap-4 md:gap-6 items-center">
                            <div className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="r21g"
                                    id="r21g-tidak"
                                    value="tidak"
                                    checked={r21g === "tidak"}
                                    onChange={(e) => handleRadioChange('r21g', e.target.value)}
                                />
                                <label htmlFor="r21g-tidak">Tidak</label>
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="r21g"
                                    id="r21g-ya"
                                    value="ya"
                                    checked={r21g === "ya"}
                                    onChange={(e) => handleRadioChange('r21g', e.target.value)}
                                />
                                <label htmlFor="r21g-ya">Ya</label>
                            </div>
                            <div className="md:col-span-3 text-sm">
                                <div className="bg-blue-100 rounded px-3 py-2">
                                    {getHelperMessage('r21g', r21g)}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 21.h */}
                    <div className="grid grid-cols-12 gap-3 items-center px-3 py-2 border-b border-gray-200 pb-3 pt-3">
                        <div className="col-span-12 md:col-span-5 flex gap-3 items-start">
                            <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">21.h.</span>
                            <span className="text-gray-700 font-normal text-base">
                                Apakah Wajib Pajak memiliki sisa lebih yang digunakan untuk pembangunan dan pengadaan sarana dan prasarana?
                            </span>
                        </div>
                        <div className="col-span-12 md:col-span-7 flex flex-col md:flex-row gap-4 md:gap-6 items-center">
                            <div className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="r21h"
                                    id="r21h-tidak"
                                    value="tidak"
                                    checked={r21h === "tidak"}
                                    onChange={(e) => handleRadioChange('r21h', e.target.value)}
                                />
                                <label htmlFor="r21h-tidak">Tidak</label>
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="r21h"
                                    id="r21h-ya"
                                    value="ya"
                                    checked={r21h === "ya"}
                                    onChange={(e) => handleRadioChange('r21h', e.target.value)}
                                />
                                <label htmlFor="r21h-ya">Ya</label>
                            </div>
                            <div className="md:col-span-3 text-sm">
                                <div className="bg-blue-100 rounded px-3 py-2">
                                    {getHelperMessage('r21h', r21h)}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 21.i */}
                    <div className="grid grid-cols-12 gap-3 items-center px-3 py-2 border-b border-gray-200 pb-3 pt-3">
                        <div className="col-span-12 md:col-span-5 flex gap-3 items-start">
                            <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">21.i.</span>
                            <span className="text-gray-700 font-normal text-base">
                                Apakah Wajib Pajak menerima atau memperoleh penghasilan dividen dari luar negeri dan melaporkannya sebagai penghasilan yang tidak termasuk objek pajak?
                            </span>
                        </div>
                        <div className="col-span-12 md:col-span-7 flex flex-col md:flex-row gap-4 md:gap-6 items-center">
                            <div className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="r21i"
                                    id="r21i-tidak"
                                    value="tidak"
                                    checked={r21i === "tidak"}
                                    onChange={(e) => handleRadioChange('r21i', e.target.value)}
                                />
                                <label htmlFor="r21i-tidak">Tidak</label>
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="r21i"
                                    id="r21i-ya"
                                    value="ya"
                                    checked={r21i === "ya"}
                                    onChange={(e) => handleRadioChange('r21i', e.target.value)}
                                />
                                <label htmlFor="r21i-ya">Ya</label>
                            </div>
                            <div className="md:col-span-3 text-sm">
                                <div className="bg-blue-100 rounded px-3 py-2">
                                    {getHelperMessage('r21i', r21i)}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 21.j */}
                    <div className="grid grid-cols-12 gap-3 items-center px-3 py-2 pt-3">
                        <div className="col-span-12 md:col-span-5 flex gap-3 items-start">
                            <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">21.j.</span>
                            <span className="text-gray-700 font-normal text-base">
                                Kelebihan PPh yang bersifat final atas penghasilan dari usaha dengan peredaran bruto tertentu yang dapat diajukan pengembalian pajak
                            </span>
                        </div>
                        <div className="col-span-12 md:col-span-7 flex items-center gap-4">
                            <input
                                type="number"
                                value={kelebihanPphFinal}
                                onChange={(e) => handleInputChange(e.target.value)}
                                className="w-full md:w-64 px-3 py-2 border border-gray-300 rounded"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PertanyaanH;