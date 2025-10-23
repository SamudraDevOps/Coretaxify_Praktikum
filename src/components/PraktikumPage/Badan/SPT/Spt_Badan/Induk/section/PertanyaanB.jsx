import React, { useState, useEffect } from 'react';
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const PertanyaanB = ({ onAnswerChange, answersState }) => {
    const [showInformasiLaporanKeuangan, setShowInformasiLaporanKeuangan] = useState(false);
    const [r1a, setR1a] = useState(null);
    const [sektorUsaha, setSektorUsaha] = useState('');

    const sektorOptions = [
        'Manufaktur',
        'Jasa',
        'Perdagangan',
        'Pertanian',
        'Konstruksi',
        'Lainnya'
    ];

    useEffect(() => {
        if (answersState) {
            setR1a(answersState.r1a || null);
        }
    }, [answersState]);

    const handleR1aChange = (value) => {
        console.log("1.a changed:", value);
        setR1a(value);
        onAnswerChange?.("r1a", value);
    };

    // Fungsi helper untuk mendapatkan pesan
    const getHelperMessage = () => {
        if (r1a === "ya") {
            return "Ya, silahkan mengisi lampiran I Bagian D";
        } else if (r1a === "tidak") {
            return "Tidak, Lanjutkan pertanyaan 1.b.1";
        } else {
            return "Pilih salah satu Ya/Tidak";
        }
    };

    return (
        <div>
            <div
                className='border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full'
                onClick={() => setShowInformasiLaporanKeuangan(!showInformasiLaporanKeuangan)}
            >
                <h3 className='text-lg font-semibold'>B. INFORMASI LAPORAN KEUANGAN</h3>
                {showInformasiLaporanKeuangan ? <FaChevronUp /> : <FaChevronDown />}
            </div>

            {showInformasiLaporanKeuangan && (
                <div className="border rounded-md p-4 mb-4">
                    <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
                        {/* Label Pertanyaan */}

                        <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                            <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">1.</span>
                            <span className="text-gray-700 font-normal text-base">
                                Jenis Perusahaan
                            </span>
                        </div>

                        {/* Radio Button + Pesan */}
                        <div className="col-span-12 md:col-span-7 flex flex-col md:flex-row gap-4 md:gap-6">
                            <select
                                value={sektorUsaha}
                                onChange={(e) => setSektorUsaha(e.target.value)}
                                className="flex-grow border border-gray-300 rounded-md px-3 py-2"
                            >
                                <option value="">-- Pilih Sektor --</option>
                                {sektorOptions.map((option, index) => (
                                    <option key={index} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
                        {/* Label Pertanyaan */}
                        
                        <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                            <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">1.</span>
                            <span className="text-gray-700 font-normal text-base">
                                Apakah laporan keuangan telah diaudit oleh akuntan publik?
                            </span>
                        </div>

                        {/* Radio Button + Pesan */}
                        <div className="col-span-12 md:col-span-7 flex flex-col md:flex-row gap-4 md:gap-6">
                            {/* Opsi Ya */}
                            <div className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="r1a"
                                    id="r1a-ya"
                                    value="ya"
                                    checked={r1a === "ya"}
                                    onChange={(e) => handleR1aChange(e.target.value)}
                                />
                                <label htmlFor="r1a-ya">Ya</label>
                            </div>

                            {/* Opsi Tidak */}
                            <div className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="r1a"
                                    id="r1a-tidak"
                                    value="tidak"
                                    checked={r1a === "tidak"}
                                    onChange={(e) => handleR1aChange(e.target.value)}
                                />
                                <label htmlFor="r1a-tidak">Tidak</label>
                            </div>

                            {/* Pesan Bantuan */}
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

export default PertanyaanB;