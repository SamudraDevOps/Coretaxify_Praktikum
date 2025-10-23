import React, { useState, useEffect } from 'react';
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const PertanyaanD = ({ onAnswerChange, answersState }) => {
    const [showSection, setShowSection] = useState(false);

    // State untuk radio button
    const [r5, setR5] = useState(null);   // Pertanyaan 5
    const [r6, setR6] = useState(null);   // Pertanyaan 6
    const [r8, setR8] = useState(null);   // Pertanyaan 8
    const [r10, setR10] = useState(null); // Pertanyaan 10

    // State untuk input angka (bisa diisi otomatis atau manual)
    const [penghasilanNetoSebelumFasilitas, setPenghasilanNetoSebelumFasilitas] = useState();
    const [penghasilanNetoSetelahFasilitas, setPenghasilanNetoSetelahFasilitas] = useState();
    const [penghasilanKenaPajak, setPenghasilanKenaPajak] = useState();
    const [pphTerutang, setPphTerutang] = useState();

    
    const [tarifPajak, setTarifPajak] = useState('22'); 

    // Daftar tarif pajak (opsional, bisa disesuaikan)
    const tarifOptions = [
        { value: '15', label: '15%' },
        { value: '22', label: '22%' },
        { value: '25', label: '25%' },
        { value: '30', label: '30%' },
    ];

    // Load initial values from parent if available
    useEffect(() => {
        if (answersState) {
            setR5(answersState.r5 || null);
            setR6(answersState.r6 || null);
            setR8(answersState.r8 || null);
            setR10(answersState.r10 || null);
            setPenghasilanNetoSebelumFasilitas(answersState.penghasilanNetoSebelumFasilitas || 975980474);
            setPenghasilanNetoSetelahFasilitas(answersState.penghasilanNetoSetelahFasilitas || 975980474);
            setPenghasilanKenaPajak(answersState.penghasilanKenaPajak || 975980000);
            setPphTerutang(answersState.pphTerutang || 167434921);
            setTarifPajak(answersState.tarifPajak || '22');
        }
    }, [answersState]);

    const handleRadioChange = (field, value) => {
        console.log(`${field} changed to:`, value);
        switch (field) {
            case 'r5':
                setR5(value);
                onAnswerChange?.('r5', value);
                break;
            case 'r6':
                setR6(value);
                onAnswerChange?.('r6', value);
                break;
            case 'r8':
                setR8(value);
                onAnswerChange?.('r8', value);
                break;
            case 'r10':
                setR10(value);
                onAnswerChange?.('r10', value);
                break;
            default:
                break;
        }
    };

    // Handler input number
    const handleInputChange = (field, value) => {
        const num = parseFloat(value) || 0;
        switch (field) {
            case 'penghasilanNetoSebelumFasilitas':
                setPenghasilanNetoSebelumFasilitas(num);
                onAnswerChange?.('penghasilanNetoSebelumFasilitas', num);
                break;
            case 'penghasilanNetoSetelahFasilitas':
                setPenghasilanNetoSetelahFasilitas(num);
                onAnswerChange?.('penghasilanNetoSetelahFasilitas', num);
                break;
            case 'penghasilanKenaPajak':
                setPenghasilanKenaPajak(num);
                onAnswerChange?.('penghasilanKenaPajak', num);
                break;
            case 'pphTerutang':
                setPphTerutang(num);
                onAnswerChange?.('pphTerutang', num);
                break;
            default:
                break;
        }
    };

    // Handler dropdown
    const handleTarifChange = (e) => {
        const value = e.target.value;
        setTarifPajak(value);
        onAnswerChange?.('tarifPajak', value);
    };

    // Fungsi helper untuk pesan bantuan
    const getHelperMessage = (field, value) => {
        if (field === 'r5') {
            return value === "ya"
                ? "Ya, silahkan mengisi lampiran 13A"
                : value === "tidak"
                    ? "Tidak, silahkan lanjut pertanyaan berikutnya"
                    : "Pilih salah satu Ya/Tidak";
        }

        if (field === 'r6') {
            return value === "tidak"
                ? "Tidak, silahkan lanjut pertanyaan berikutnya"
                : value === "ya"
                    ? "Ya, silahkan mengisi lampiran 13A"
                    : "Pilih salah satu Ya/Tidak";
        }

        if (field === 'r8') {
            return value === "ya"
                ? "Ya, silahkan mengisi lampiran 7"
                : value === "tidak"
                    ? "Tidak, silahkan lanjut pertanyaan berikutnya"
                    : "Pilih salah satu Ya/Tidak";
        }

        if (field === 'r10') {
            return value === "tidak"
                ? "Tidak, silahkan lanjut pertanyaan berikutnya"
                : value === "ya"
                    ? "Ya, silahkan mengisi lampiran 13A"
                    : "Pilih salah satu Ya/Tidak";
        }

        return "";
    };

    return (
        <div>
            <div
                className='border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full'
                onClick={() => setShowSection(!showSection)}
            >
                <h3 className='text-lg font-semibold'>D. PENGHITUNGAN PPh</h3>
                {showSection ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            {showSection && (
                <div className="border rounded-md p-4 mb-4">
                    {/* Pertanyaan 4 */}
                    <div className="grid grid-cols-12 gap-3 items-center px-3 py-2 border-b border-gray-200 pb-3">
                        <div className="col-span-12 md:col-span-5 flex gap-3 items-start">
                            <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">4.</span>
                            <span className="text-gray-700 font-normal text-base">
                                Penghasilan Neto Fiskal sebelum Fasilitas Pajak
                            </span>
                        </div>
                        <div className="col-span-12 md:col-span-7 flex items-center gap-4">
                            <input
                                type="number"
                                value={penghasilanNetoSebelumFasilitas}
                                onChange={(e) => handleInputChange('penghasilanNetoSebelumFasilitas', e.target.value)}
                                className="w-full md:w-64 px-3 py-2 border border-gray-300 rounded"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-12 gap-3 items-center px-3 py-2 border-b border-gray-200 pb-3 pt-3">
                        <div className="col-span-12 md:col-span-5 flex gap-3 items-start">
                            <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">5.</span>
                            <span className="text-gray-700 font-normal text-base">
                                Apakah Wajib Pajak memperoleh Fasilitas Perpajakan Dalam Rangka Penanaman Modal berupa pengurangan penghasilan neto?
                            </span>
                        </div>
                        <div className="col-span-12 md:col-span-7 flex flex-col md:flex-row gap-4 md:gap-6 items-center">
                            <div className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="r5"
                                    id="r5-tidak"
                                    value="tidak"
                                    checked={r5 === "tidak"}
                                    onChange={(e) => handleRadioChange('r5', e.target.value)}
                                />
                                <label htmlFor="r5-tidak">Tidak</label>
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="r5"
                                    id="r5-ya"
                                    value="ya"
                                    checked={r5 === "ya"}
                                    onChange={(e) => handleRadioChange('r5', e.target.value)}
                                />
                                <label htmlFor="r5-ya">Ya</label>
                            </div>
                            <div className="md:col-span-3 text-sm">
                                <div className="bg-blue-100 rounded px-3 py-2">
                                    {getHelperMessage('r5', r5)}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-12 gap-3 items-center px-3 py-2 border-b border-gray-200 pb-3 pt-3">
                        <div className="col-span-12 md:col-span-5 flex gap-3 items-start">
                            <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">6.</span>
                            <span className="text-gray-700 font-normal text-base">
                                Apakah Wajib Pajak memperoleh Fasilitas Pengurangan Penghasilan Bruto untuk Kegiatan Praktik Kerja, Pemagangan, dan/atau Pembelajaran Dalam Rangka Pembinaan dan Pengembangan Sumber daya Manusia Berbasis Kompetensi Tertentu?
                            </span>
                        </div>
                        <div className="col-span-12 md:col-span-7 flex flex-col md:flex-row gap-4 md:gap-6 items-center">
                            <div className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="r6"
                                    id="r6-tidak"
                                    value="tidak"
                                    checked={r6 === "tidak"}
                                    onChange={(e) => handleRadioChange('r6', e.target.value)}
                                />
                                <label htmlFor="r6-tidak">Tidak</label>
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="r6"
                                    id="r6-ya"
                                    value="ya"
                                    checked={r6 === "ya"}
                                    onChange={(e) => handleRadioChange('r6', e.target.value)}
                                />
                                <label htmlFor="r6-ya">Ya</label>
                            </div>
                            <div className="md:col-span-3 text-sm">
                                <div className="bg-blue-100 rounded px-3 py-2">
                                    {getHelperMessage('r6', r6)}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Pertanyaan 7 */}
                    <div className="grid grid-cols-12 gap-3 items-center px-3 py-2 border-b border-gray-200 pb-3 pt-3">
                        <div className="col-span-12 md:col-span-5 flex gap-3 items-start">
                            <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">7.</span>
                            <span className="text-gray-700 font-normal text-base">
                                Penghasilan Neto Fiskal Setelah Fasilitas Pajak
                            </span>
                        </div>
                        <div className="col-span-12 md:col-span-7 flex items-center gap-4">
                            <input
                                type="number"
                                value={penghasilanNetoSetelahFasilitas}
                                onChange={(e) => handleInputChange('penghasilanNetoSetelahFasilitas', e.target.value)}
                                className="w-full md:w-64 px-3 py-2 border border-gray-300 rounded"
                            />
                        </div>
                    </div>

                    {/* Pertanyaan 8 */}
                    <div className="grid grid-cols-12 gap-3 items-center px-3 py-2 border-b border-gray-200 pb-3 pt-3">
                        <div className="col-span-12 md:col-span-5 flex gap-3 items-start">
                            <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">8.</span>
                            <span className="text-gray-700 font-normal text-base">
                                Apakah terdapat kerugian fiskal yang dapat dikompensasikan?
                            </span>
                        </div>
                        <div className="col-span-12 md:col-span-7 flex flex-col md:flex-row gap-4 md:gap-6 items-center">
                            <div className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="r8"
                                    id="r8-tidak"
                                    value="tidak"
                                    checked={r8 === "tidak"}
                                    onChange={(e) => handleRadioChange('r8', e.target.value)}
                                />
                                <label htmlFor="r8-tidak">Tidak</label>
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="r8"
                                    id="r8-ya"
                                    value="ya"
                                    checked={r8 === "ya"}
                                    onChange={(e) => handleRadioChange('r8', e.target.value)}
                                />
                                <label htmlFor="r8-ya">Ya</label>
                            </div>
                            <div className="md:col-span-3 text-sm">
                                <div className="bg-blue-100 rounded px-3 py-2">
                                    {getHelperMessage('r8', r8)}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Pertanyaan 9 */}
                    <div className="grid grid-cols-12 gap-3 items-center px-3 py-2 border-b border-gray-200 pb-3 pt-3">
                        <div className="col-span-12 md:col-span-5 flex gap-3 items-start">
                            <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">9.</span>
                            <span className="text-gray-700 font-normal text-base">
                                Penghasilan Kena Pajak
                            </span>
                        </div>
                        <div className="col-span-12 md:col-span-7 flex items-center gap-4">
                            <input
                                type="number"
                                value={penghasilanKenaPajak}
                                onChange={(e) => handleInputChange('penghasilanKenaPajak', e.target.value)}
                                className="w-full md:w-64 px-3 py-2 border border-gray-300 rounded"
                            />
                        </div>
                    </div>

                    {/* Pertanyaan 10 */}
                    <div className="grid grid-cols-12 gap-3 items-center px-3 py-2 border-b border-gray-200 pb-3 pt-3">
                        <div className="col-span-12 md:col-span-5 flex gap-3 items-start">
                            <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">10.</span>
                            <span className="text-gray-700 font-normal text-base">
                                Apakah Wajib Pajak memperoleh Fasilitas Pengurangan Penghasilan Bruto untuk Kegiatan Penelitian dan Pengembangan Tertentu?
                            </span>
                        </div>
                        <div className="col-span-12 md:col-span-7 flex flex-col md:flex-row gap-4 md:gap-6 items-center">
                            <div className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="r10"
                                    id="r10-tidak"
                                    value="tidak"
                                    checked={r10 === "tidak"}
                                    onChange={(e) => handleRadioChange('r10', e.target.value)}
                                />
                                <label htmlFor="r10-tidak">Tidak</label>
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="r10"
                                    id="r10-ya"
                                    value="ya"
                                    checked={r10 === "ya"}
                                    onChange={(e) => handleRadioChange('r10', e.target.value)}
                                />
                                <label htmlFor="r10-ya">Ya</label>
                            </div>
                            <div className="md:col-span-3 text-sm">
                                <div className="bg-blue-100 rounded px-3 py-2">
                                    {getHelperMessage('r10', r10)}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Pertanyaan 11 */}
                    <div className="grid grid-cols-12 gap-3 items-center px-3 py-2 border-b border-gray-200 pb-3 pt-3">
                        <div className="col-span-12 md:col-span-5 flex gap-3 items-start">
                            <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">11.</span>
                            <span className="text-gray-700 font-normal text-base">
                                Tarif Pajak *
                            </span>
                        </div>
                        <div className="col-span-12 md:col-span-7 flex items-center gap-4">
                            <select
                                value={tarifPajak}
                                onChange={handleTarifChange}
                                className="w-full md:w-64 px-3 py-2 border border-gray-300 rounded"
                            >
                                <option value="">-- Pilih Tarif --</option>
                                {tarifOptions.map((opt) => (
                                    <option key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Pertanyaan 12 */}
                    <div className="grid grid-cols-12 gap-3 items-center px-3 py-2 pt-3">
                        <div className="col-span-12 md:col-span-5 flex gap-3 items-start">
                            <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">12.</span>
                            <span className="text-gray-700 font-normal text-base">
                                PPh Terutang
                            </span>
                        </div>
                        <div className="col-span-12 md:col-span-7 flex items-center gap-4">
                            <input
                                type="number"
                                value={pphTerutang}
                                onChange={(e) => handleInputChange('pphTerutang', e.target.value)}
                                className="w-full md:w-64 px-3 py-2 border border-gray-300 rounded"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PertanyaanD;