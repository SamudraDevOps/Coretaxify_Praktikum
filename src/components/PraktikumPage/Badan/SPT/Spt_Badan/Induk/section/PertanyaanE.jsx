import React, { useState, useEffect } from 'react';
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const PertanyaanE = ({ onAnswerChange, answersState }) => {
    const [showSection, setShowSection] = useState(false);

    // State untuk radio button
    const [r13, setR13] = useState(null);   // Pertanyaan 13
    const [r16, setR16] = useState(null);   // Pertanyaan 16

    // State untuk input angka
    const [angsuranPphPasal25, setAngsuranPphPasal25] = useState(160320825);
    const [suratTagihanPphPasal25, setSuratTagihanPphPasal25] = useState(0);

    
    useEffect(() => {
        if (answersState) {
            setR13(answersState.r13 || null);
            setR16(answersState.r16 || null);
            setAngsuranPphPasal25(answersState.angsuranPphPasal25 || 160320825);
            setSuratTagihanPphPasal25(answersState.suratTagihanPphPasal25 || 0);
        }
    }, [answersState]);

    // Handler radio button
    const handleRadioChange = (field, value) => {
        console.log(`${field} changed to:`, value);
        switch (field) {
            case 'r13':
                setR13(value);
                onAnswerChange?.('r13', value);
                break;
            case 'r16':
                setR16(value);
                onAnswerChange?.('r16', value);
                break;
            default:
                break;
        }
    };

    // Handler input number
    const handleInputChange = (field, value) => {
        const num = parseFloat(value) || 0;
        switch (field) {
            case 'angsuranPphPasal25':
                setAngsuranPphPasal25(num);
                onAnswerChange?.('angsuranPphPasal25', num);
                break;
            case 'suratTagihanPphPasal25':
                setSuratTagihanPphPasal25(num);
                onAnswerChange?.('suratTagihanPphPasal25', num);
                break;
            default:
                break;
        }
    };

    // Fungsi helper untuk pesan bantuan
    const getHelperMessage = (field, value) => {
        if (field === 'r13') {
            return value === "ya"
                ? "Ya, silahkan mengisi lampiran 3"
                : value === "tidak"
                    ? "Tidak, silahkan lanjut pertanyaan berikutnya"
                    : "Pilih salah satu Ya/Tidak";
        }

        if (field === 'r16') {
            return value === "tidak"
                ? "Tidak, silahkan lanjut pertanyaan berikutnya"
                : value === "ya"
                    ? "Ya, silahkan mengisi lampiran 3"
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
                <h3 className='text-lg font-semibold'>E. PENGURANG PPh TERUTANG</h3>
                {showSection ? <FaChevronUp /> : <FaChevronDown />}
            </div>

            {/* Konten Section */}
            {showSection && (
                <div className="border rounded-md p-4 mb-4">
                    {/* Pertanyaan 13 */}
                    <div className="grid grid-cols-12 gap-3 items-center px-3 py-2 border-b border-gray-200 pb-3">
                        <div className="col-span-12 md:col-span-5 flex gap-3 items-start">
                            <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">13.</span>
                            <span className="text-gray-700 font-normal text-base">
                                Apakah terdapat kredit pajak yang dibayarkan di luar negeri dan/atau dipotong/pungut oleh pihak lain?
                            </span>
                        </div>
                        <div className="col-span-12 md:col-span-7 flex flex-col md:flex-row gap-4 md:gap-6 items-center">
                            <div className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="r13"
                                    id="r13-tidak"
                                    value="tidak"
                                    checked={r13 === "tidak"}
                                    onChange={(e) => handleRadioChange('r13', e.target.value)}
                                />
                                <label htmlFor="r13-tidak">Tidak</label>
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="r13"
                                    id="r13-ya"
                                    value="ya"
                                    checked={r13 === "ya"}
                                    onChange={(e) => handleRadioChange('r13', e.target.value)}
                                />
                                <label htmlFor="r13-ya">Ya</label>
                            </div>
                            <div className="md:col-span-3 text-sm">
                                <div className="bg-blue-100 rounded px-3 py-2">
                                    {getHelperMessage('r13', r13)}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Pertanyaan 14 */}
                    <div className="grid grid-cols-12 gap-3 items-center px-3 py-2 border-b border-gray-200 pb-3 pt-3">
                        <div className="col-span-12 md:col-span-5 flex gap-3 items-start">
                            <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">14.</span>
                            <span className="text-gray-700 font-normal text-base">
                                Angsuran PPh Pasal 25
                            </span>
                        </div>
                        <div className="col-span-12 md:col-span-7 flex items-center gap-4">
                            <input
                                type="number"
                                value={angsuranPphPasal25}
                                onChange={(e) => handleInputChange('angsuranPphPasal25', e.target.value)}
                                className="w-full md:w-64 px-3 py-2 border border-gray-300 rounded"
                            />
                        </div>
                    </div>

                    {/* Pertanyaan 15 */}
                    <div className="grid grid-cols-12 gap-3 items-center px-3 py-2 border-b border-gray-200 pb-3 pt-3">
                        <div className="col-span-12 md:col-span-5 flex gap-3 items-start">
                            <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">15.</span>
                            <span className="text-gray-700 font-normal text-base">
                                Surat Tagihan Pajak PPh Pasal 25 (hanya pokok pajak)
                            </span>
                        </div>
                        <div className="col-span-12 md:col-span-7 flex items-center gap-4">
                            <input
                                type="number"
                                value={suratTagihanPphPasal25}
                                onChange={(e) => handleInputChange('suratTagihanPphPasal25', e.target.value)}
                                className="w-full md:w-64 px-3 py-2 border border-gray-300 rounded"
                            />
                        </div>
                    </div>

                    {/* Pertanyaan 16 */}
                    <div className="grid grid-cols-12 gap-3 items-center px-3 py-2 pt-3">
                        <div className="col-span-12 md:col-span-5 flex gap-3 items-start">
                            <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">16.</span>
                            <span className="text-gray-700 font-normal text-base">
                                Apakah Wajib Pajak memperoleh Fasilitas Pengurangan PPh Badan?
                            </span>
                        </div>
                        <div className="col-span-12 md:col-span-7 flex flex-col md:flex-row gap-4 md:gap-6 items-center">
                            <div className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="r16"
                                    id="r16-tidak"
                                    value="tidak"
                                    checked={r16 === "tidak"}
                                    onChange={(e) => handleRadioChange('r16', e.target.value)}
                                />
                                <label htmlFor="r16-tidak">Tidak</label>
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="r16"
                                    id="r16-ya"
                                    value="ya"
                                    checked={r16 === "ya"}
                                    onChange={(e) => handleRadioChange('r16', e.target.value)}
                                />
                                <label htmlFor="r16-ya">Ya</label>
                            </div>
                            <div className="md:col-span-3 text-sm">
                                <div className="bg-blue-100 rounded px-3 py-2">
                                    {getHelperMessage('r16', r16)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PertanyaanE;