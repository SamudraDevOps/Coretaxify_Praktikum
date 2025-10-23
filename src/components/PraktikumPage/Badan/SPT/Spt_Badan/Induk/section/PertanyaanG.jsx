import React, { useState, useEffect } from 'react';
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const PertanyaanG = ({ onAnswerChange, answersState }) => {
    const [showSection, setShowSection] = useState(false);
    const [r20, setR20] = useState(null); // Pertanyaan 20
    const [angsuranPphPasal25, setAngsuranPphPasal25] = useState(13952910);

    useEffect(() => {
        if (answersState) {
            setR20(answersState.r20 || null);
            setAngsuranPphPasal25(answersState.angsuranPphPasal25 || 13952910);
        }
    }, [answersState]);

    const handleRadioChange = (value) => {
        setR20(value);
        onAnswerChange?.('r20', value);
    };

    const handleInputChange = (value) => {
        const num = parseFloat(value) || 0;
        setAngsuranPphPasal25(num);
        onAnswerChange?.('angsuranPphPasal25', num);
    };

    const getHelperMessage = () => {
        if (r20 === "ya") {
            return "Ya, silahkan mengisi lampiran 6";
        } else if (r20 === "tidak") {
            return "Tidak, silahkan lanjut pertanyaan berikutnya";
        } else {
            return "Pilih salah satu Ya/Tidak";
        }
    };

    return (
        <div>
            {/* Header Toggle */}
            <div
                className='border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full'
                onClick={() => setShowSection(!showSection)}
            >
                <h3 className='text-lg font-semibold'>G. PENGHITUNGAN ANGSURAN PPh PASAL 25 TAHUN BERJALAN</h3>
                {showSection ? <FaChevronUp /> : <FaChevronDown />}
            </div>

            {/* Konten Section */}
            {showSection && (
                <div className="border rounded-md p-4 mb-4">
                    {/* Pertanyaan 20 */}
                    <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
                        <div className="col-span-12 md:col-span-5 flex gap-3 items-start">
                            <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">20.</span>
                            <span className="text-gray-700 font-normal text-base">
                                Apakah Wajib Pajak merupakan Wajib Pajak tertentu yang harus menyampaikan Laporan Penghitungan Angsuran PPh Pasal 25?
                            </span>
                        </div>
                        <div className="col-span-12 md:col-span-7 flex flex-col md:flex-row gap-4 md:gap-6 items-center">
                            <div className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="r20"
                                    id="r20-tidak"
                                    value="tidak"
                                    checked={r20 === "tidak"}
                                    onChange={(e) => handleRadioChange(e.target.value)}
                                />
                                <label htmlFor="r20-tidak">Tidak</label>
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="r20"
                                    id="r20-ya"
                                    value="ya"
                                    checked={r20 === "ya"}
                                    onChange={(e) => handleRadioChange(e.target.value)}
                                />
                                <label htmlFor="r20-ya">Ya</label>
                            </div>
                            <input
                                type="number"
                                value={angsuranPphPasal25}
                                onChange={(e) => handleInputChange(e.target.value)}
                                className="w-20 px-2 py-1 border rounded"
                            />
                            <div className="md:col-span-3 text-sm">
                                <div className="bg-blue-100 rounded px-3 py-2">
                                    {getHelperMessage()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PertanyaanG;