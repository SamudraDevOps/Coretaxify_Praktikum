import React, { useState, useEffect } from 'react';
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const PertanyaanJ = ({ onAnswerChange, answersState }) => {
    const [showSection, setShowSection] = useState(false);

    // State untuk checkbox pernyataan
    const [isConfirmed, setIsConfirmed] = useState(false);

    // State untuk radio penandatangan
    const [penandatangan, setPenandatangan] = useState('wajibPajak'); // default: Wajib Pajak

    // State untuk input teks
    const [npwp, setNpwp] = useState('210683975602000');
    const [nama, setNama] = useState('HOKI LANGGENG MAKMUR');
    const [jabatan, setJabatan] = useState('');

    // Load initial values from parent if available
    useEffect(() => {
        if (answersState) {
            setIsConfirmed(answersState.isConfirmed || false);
            setPenandatangan(answersState.penandatangan || 'wajibPajak');
            setNpwp(answersState.npwp || '210683975602000');
            setNama(answersState.nama || 'HOKI LANGGENG MAKMUR');
            setJabatan(answersState.jabatan || '');
        }
    }, [answersState]);

    // Handler checkbox
    const handleConfirmChange = (e) => {
        const checked = e.target.checked;
        setIsConfirmed(checked);
        onAnswerChange?.('isConfirmed', checked);
    };

    // Handler radio penandatangan
    const handlePenandatanganChange = (value) => {
        setPenandatangan(value);
        onAnswerChange?.('penandatangan', value);
    };

    // Handler input
    const handleInputChange = (field, value) => {
        switch (field) {
            case 'npwp':
                setNpwp(value);
                onAnswerChange?.('npwp', value);
                break;
            case 'nama':
                setNama(value);
                onAnswerChange?.('nama', value);
                break;
            case 'jabatan':
                setJabatan(value);
                onAnswerChange?.('jabatan', value);
                break;
            default:
                break;
        }
    };

    return (
        <div>
            {/* Header Toggle */}
            <div
                className='border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full'
                onClick={() => setShowSection(!showSection)}
            >
                <h3 className='text-lg font-semibold'>J. PERNYATAAN</h3>
                {showSection ? <FaChevronUp /> : <FaChevronDown />}
            </div>

            {/* Konten Section */}
            {showSection && (
                <div className="border rounded-md p-4 mb-4">
                    {/* Pernyataan Checkbox */}
                    <div className="mb-4">
                        <label className="flex items-start gap-2">
                            <input
                                type="checkbox"
                                checked={isConfirmed}
                                onChange={handleConfirmChange}
                                className="mt-1"
                            />
                            <span className="text-sm text-gray-700">
                                Dengan menyadari sepenuhnya akan segala akibatnya termasuk sanksi-sanksi sesuai dengan ketentuan perundang-undangan yang berlaku, Saya menyatakan bahwa apa yang Saya beritahukan di atas adalah benar, lengkap, dan jelas.
                            </span>
                        </label>
                    </div>

                    {/* Penandatangan */}
                    <div className="grid grid-cols-12 gap-3 items-center px-3 py-2 border-b border-gray-200 pb-3">
                        <div className="col-span-12 md:col-span-5 flex gap-3 items-start">
                            <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">Penandatangan *</span>
                        </div>
                        <div className="col-span-12 md:col-span-7 flex gap-6">
                            <div className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="penandatangan"
                                    id="penandatangan-wajib"
                                    value="wajibPajak"
                                    checked={penandatangan === "wajibPajak"}
                                    onChange={() => handlePenandatanganChange("wajibPajak")}
                                />
                                <label htmlFor="penandatangan-wajib">Wajib Pajak</label>
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="penandatangan"
                                    id="penandatangan-kuasa"
                                    value="kuasaWajibPajak"
                                    checked={penandatangan === "kuasaWajibPajak"}
                                    onChange={() => handlePenandatanganChange("kuasaWajibPajak")}
                                />
                                <label htmlFor="penandatangan-kuasa">Kuasa Wajib Pajak</label>
                            </div>
                        </div>
                    </div>

                    {/* Tanda Tangan (placeholder) */}
                    <div className="grid grid-cols-12 gap-3 items-center px-3 py-2 border-b border-gray-200 pb-3 pt-3">
                        <div className="col-span-12 md:col-span-5 flex gap-3 items-start">
                            <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">Tanda Tangan</span>
                        </div>
                        <div className="col-span-12 md:col-span-7">
                            <div className="bg-gray-100 rounded px-3 py-2 text-gray-500 text-sm italic">
                                (Tanda tangan digital akan muncul di sini saat diklik atau diunggah)
                            </div>
                        </div>
                    </div>

                    {/* NPWP */}
                    <div className="grid grid-cols-12 gap-3 items-center px-3 py-2 border-b border-gray-200 pb-3 pt-3">
                        <div className="col-span-12 md:col-span-5 flex gap-3 items-start">
                            <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">NPWP</span>
                        </div>
                        <div className="col-span-12 md:col-span-7">
                            <input
                                type="text"
                                value={npwp}
                                onChange={(e) => handleInputChange('npwp', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded"
                                placeholder="Masukkan NPWP"
                            />
                        </div>
                    </div>

                    {/* Nama */}
                    <div className="grid grid-cols-12 gap-3 items-center px-3 py-2 border-b border-gray-200 pb-3 pt-3">
                        <div className="col-span-12 md:col-span-5 flex gap-3 items-start">
                            <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">Nama</span>
                        </div>
                        <div className="col-span-12 md:col-span-7">
                            <input
                                type="text"
                                value={nama}
                                onChange={(e) => handleInputChange('nama', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded"
                                placeholder="Masukkan nama lengkap"
                            />
                        </div>
                    </div>

                    {/* Jabatan */}
                    <div className="grid grid-cols-12 gap-3 items-center px-3 py-2 pt-3">
                        <div className="col-span-12 md:col-span-5 flex gap-3 items-start">
                            <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">Jabatan</span>
                        </div>
                        <div className="col-span-12 md:col-span-7">
                            <input
                                type="text"
                                value={jabatan}
                                onChange={(e) => handleInputChange('jabatan', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded"
                                placeholder="Contoh: Direktur Utama"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PertanyaanJ;