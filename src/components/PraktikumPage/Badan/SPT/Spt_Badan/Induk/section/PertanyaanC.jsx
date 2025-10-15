import React, { useState, useEffect } from 'react';
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const PertanyaanC = ({ onAnswerChange, answersState }) => {
    const [showSection, setShowSection] = useState(false);

    // State untuk masing-masing pertanyaan
    const [r1a, setR1a] = useState(null); // 1.a
    const [r2a, setR2a] = useState(null); // 2
    const [r3a, setR3a] = useState(null); // 3

    // State untuk input angka (jika diperlukan)
    const [input2, setInput2] = useState(0);
    const [input3, setInput3] = useState(0);

    // Load initial values from parent if available
    useEffect(() => {
        if (answersState) {
            setR1a(answersState.r1a || null);
            setR2a(answersState.r2a || null);
            setR3a(answersState.r3a || null);
            setInput2(answersState.input2 || 0);
            setInput3(answersState.input3 || 0);
        }
    }, [answersState]);

    // Handler untuk radio button
    const handleRadioChange = (field, value) => {
        console.log(`${field} changed to:`, value);
        switch (field) {
            case 'r1a':
                setR1a(value);
                onAnswerChange?.('r1a', value);
                break;
            case 'r2a':
                setR2a(value);
                onAnswerChange?.('r2a', value);
                break;
            case 'r3a':
                setR3a(value);
                onAnswerChange?.('r3a', value);
                break;
            default:
                break;
        }
    };

    // Handler untuk input number
    const handleInputChange = (field, value) => {
        const num = parseFloat(value) || 0;
        switch (field) {
            case 'input2':
                setInput2(num);
                onAnswerChange?.('input2', num);
                break;
            case 'input3':
                setInput3(num);
                onAnswerChange?.('input3', num);
                break;
            default:
                break;
        }
    };

    // Fungsi helper untuk pesan bantuan
    const getHelperMessage = (field, value) => {
        if (field === 'r1a') {
            return value === "tidak"
                ? "Tidak, silahkan lanjut pertanyaan berikutnya"
                : value === "ya"
                    ? "Ya, silahkan mengisi Lampiran 4 Bagian A"
                    : "Pilih salah satu Ya/Tidak";
        }

        if (field === 'r2a') {
            return value === "ya"
                ? "Ya, silahkan mengisi Lampiran 4 Bagian A"
                : value === "tidak"
                    ? "Tidak, silahkan lanjut pertanyaan berikutnya"
                    : "Pilih salah satu Ya/Tidak";
        }

        if (field === 'r3a') {
            return value === "ya"
                ? "Ya, silahkan mengisi Lampiran 4 Bagian B"
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
                <h3 className='text-lg font-semibold'>C. PENGHASILAN YANG DIKENAKAN PPh YANG BERSIFAT FINAL DAN YANG TIDAK TERMASUK OBJEK PAJAK</h3>
                {showSection ? <FaChevronUp /> : <FaChevronDown />}
            </div>

            {/* Konten Section */}
            {showSection && (
                <div className="border rounded-md p-4 mb-4">
                    {/* Pertanyaan 1.a */}
                    <div className="grid grid-cols-12 gap-3 items-center px-3 py-2 border-b border-gray-200 pb-3">
                        <div className="col-span-12 md:col-span-5 flex gap-3 items-start">
                            <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">1.a.</span>
                            <span className="text-gray-700 font-normal text-base">
                                Apakah Wajib Pajak menerima atau memperoleh penghasilan dari usaha dengan peredaran bruto tertentu yang dikenakan PPh yang bersifat Final?
                            </span>
                        </div>
                        <div className="col-span-12 md:col-span-7 flex flex-col md:flex-row gap-4 md:gap-6 items-center">
                            <div className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="r1a"
                                    id="r1a-tidak-1"
                                    value="tidak"
                                    checked={r1a === "tidak"}
                                    onChange={(e) => handleRadioChange('r1a', e.target.value)}
                                />
                                <label htmlFor="r1a-tidak-1">Tidak</label>
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="r1a"
                                    id="r1a-ya-1"
                                    value="ya"
                                    checked={r1a === "ya"}
                                    onChange={(e) => handleRadioChange('r1a', e.target.value)}
                                />
                                <label htmlFor="r1a-ya-1">Ya</label>
                            </div>
                            <div className="md:col-span-3 text-sm">
                                <div className="bg-blue-100 rounded px-3 py-2">
                                    {getHelperMessage('r1a', r1a)}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Pertanyaan 2 */}
                    <div className="grid grid-cols-12 gap-3 items-center px-3 py-2 border-b border-gray-200 pt-3 pb-3">
                        <div className="col-span-12 md:col-span-5 flex gap-3 items-start">
                            <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">2.</span>
                            <span className="text-gray-700 font-normal text-base">
                                Apakah Wajib Pajak menerima atau memperoleh penghasilan yang dikenakan PPh yang bersifat final?
                            </span>
                        </div>
                        <div className="col-span-12 md:col-span-7 flex flex-col md:flex-row gap-4 md:gap-6 items-center">
                            <div className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="r2a"
                                    id="r2a-tidak"
                                    value="tidak"
                                    checked={r2a === "tidak"}
                                    onChange={(e) => handleRadioChange('r2a', e.target.value)}
                                />
                                <label htmlFor="r2a-tidak">Tidak</label>
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="r2a"
                                    id="r2a-ya"
                                    value="ya"
                                    checked={r2a === "ya"}
                                    onChange={(e) => handleRadioChange('r2a', e.target.value)}
                                />
                                <label htmlFor="r2a-ya">Ya</label>
                            </div>
                            <input
                                type="number"
                                value={input2}
                                onChange={(e) => handleInputChange('input2', e.target.value)}
                                disabled={r2a !== "ya"}
                                className={`w-20 px-2 py-1 border rounded ${r2a === "ya" ? "border-gray-300" : "border-gray-200 bg-gray-100 cursor-not-allowed"}`}
                            />
                            <div className="md:col-span-3 text-sm">
                                <div className="bg-blue-100 rounded px-3 py-2">
                                    {getHelperMessage('r2a', r2a)}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Pertanyaan 3 */}
                    <div className="grid grid-cols-12 gap-3 items-center px-3 py-2 pt-3">
                        <div className="col-span-12 md:col-span-5 flex gap-3 items-start">
                            <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">3.</span>
                            <span className="text-gray-700 font-normal text-base">
                                Apakah Wajib Pajak menerima atau memperoleh penghasilan yang tidak termasuk objek pajak?
                            </span>
                        </div>
                        <div className="col-span-12 md:col-span-7 flex flex-col md:flex-row gap-4 md:gap-6 items-center">
                            <div className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="r3a"
                                    id="r3a-tidak"
                                    value="tidak"
                                    checked={r3a === "tidak"}
                                    onChange={(e) => handleRadioChange('r3a', e.target.value)}
                                />
                                <label htmlFor="r3a-tidak">Tidak</label>
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="r3a"
                                    id="r3a-ya"
                                    value="ya"
                                    checked={r3a === "ya"}
                                    onChange={(e) => handleRadioChange('r3a', e.target.value)}
                                />
                                <label htmlFor="r3a-ya">Ya</label>
                            </div>
                            <input
                                type="number"
                                value={input3}
                                onChange={(e) => handleInputChange('input3', e.target.value)}
                                disabled={r3a !== "ya"}
                                className={`w-20 px-2 py-1 border rounded ${r3a === "ya" ? "border-gray-300" : "border-gray-200 bg-gray-100 cursor-not-allowed"}`}
                            />
                            <div className="md:col-span-3 text-sm">
                                <div className="bg-blue-100 rounded px-3 py-2">
                                    {getHelperMessage('r3a', r3a)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PertanyaanC;