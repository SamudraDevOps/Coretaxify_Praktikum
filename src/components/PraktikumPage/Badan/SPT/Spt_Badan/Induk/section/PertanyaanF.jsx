import React, { useState, useEffect } from 'react';
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const PertanyaanF = ({ onAnswerChange, answersState }) => {
    const [showSection, setShowSection] = useState(false);

    const [r17b, setR17b] = useState(null);   
    const [r19a, setR19a] = useState(null);   

    const [pphKurangLebihBayar, setPphKurangLebihBayar] = useState(7114096);
    const [pphMasihHarusDibayar, setPphMasihHarusDibayar] = useState(7114096);
    const [pphKurangLebihBayarSptDibetulkan, setPphKurangLebihBayarSptDibetulkan] = useState(0);
    const [pphKurangLebihBayarKarenaPembetulan, setPphKurangLebihBayarKarenaPembetulan] = useState(0);

    // State untuk informasi rekening
    const [rekeningBank, setRekeningBank] = useState('');
    const [nomorRekening, setNomorRekening] = useState('');
    const [namaBank, setNamaBank] = useState('');
    const [namaPemilikRekening, setNamaPemilikRekening] = useState('');

    // Daftar bank (opsional, bisa disesuaikan)
    const bankOptions = [
        { value: '', label: '-- Pilih Bank --' },
        { value: 'BCA', label: 'BCA' },
        { value: 'Mandiri', label: 'Mandiri' },
        { value: 'BNI', label: 'BNI' },
        { value: 'BRI', label: 'BRI' },
        { value: 'CIMB', label: 'CIMB Niaga' },
    ];

    // Load initial values from parent if available
    useEffect(() => {
        if (answersState) {
            setR17b(answersState.r17b || null);
            setR19a(answersState.r19a || null);
            setPphKurangLebihBayar(answersState.pphKurangLebihBayar || 7114096);
            setPphMasihHarusDibayar(answersState.pphMasihHarusDibayar || 7114096);
            setPphKurangLebihBayarSptDibetulkan(answersState.pphKurangLebihBayarSptDibetulkan || 0);
            setPphKurangLebihBayarKarenaPembetulan(answersState.pphKurangLebihBayarKarenaPembetulan || 0);
            setRekeningBank(answersState.rekeningBank || '');
            setNomorRekening(answersState.nomorRekening || '');
            setNamaBank(answersState.namaBank || '');
            setNamaPemilikRekening(answersState.namaPemilikRekening || '');
        }
    }, [answersState]);

    // Handler radio button
    const handleRadioChange = (field, value) => {
        console.log(`${field} changed to:`, value);
        switch (field) {
            case 'r17b':
                setR17b(value);
                onAnswerChange?.('r17b', value);
                break;
            case 'r19a':
                setR19a(value);
                onAnswerChange?.('r19a', value);
                break;
            default:
                break;
        }
    };

    // Handler input number
    const handleInputChange = (field, value) => {
        const num = parseFloat(value) || 0;
        switch (field) {
            case 'pphKurangLebihBayar':
                setPphKurangLebihBayar(num);
                onAnswerChange?.('pphKurangLebihBayar', num);
                break;
            case 'pphMasihHarusDibayar':
                setPphMasihHarusDibayar(num);
                onAnswerChange?.('pphMasihHarusDibayar', num);
                break;
            case 'pphKurangLebihBayarSptDibetulkan':
                setPphKurangLebihBayarSptDibetulkan(num);
                onAnswerChange?.('pphKurangLebihBayarSptDibetulkan', num);
                break;
            case 'pphKurangLebihBayarKarenaPembetulan':
                setPphKurangLebihBayarKarenaPembetulan(num);
                onAnswerChange?.('pphKurangLebihBayarKarenaPembetulan', num);
                break;
            case 'nomorRekening':
                setNomorRekening(value);
                onAnswerChange?.('nomorRekening', value);
                break;
            case 'namaBank':
                setNamaBank(value);
                onAnswerChange?.('namaBank', value);
                break;
            case 'namaPemilikRekening':
                setNamaPemilikRekening(value);
                onAnswerChange?.('namaPemilikRekening', value);
                break;
            default:
                break;
        }
    };

    // Handler dropdown
    const handleRekeningBankChange = (e) => {
        const value = e.target.value;
        setRekeningBank(value);
        onAnswerChange?.('rekeningBank', value);
    };

    // Fungsi helper untuk pesan bantuan
    const getHelperMessage = (field, value) => {
        if (field === 'r17b') {
            return value === "ya"
                ? "Ya, silahkan mengisi jumlah pajak yang dapat diangsur/ditunda pembayarannya"
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
                <h3 className='text-lg font-semibold'>F. PPh KURANG/LEBIH BAYAR</h3>
                {showSection ? <FaChevronUp /> : <FaChevronDown />}
            </div>

            {/* Konten Section */}
            {showSection && (
                <div className="border rounded-md p-4 mb-4">
                    {/* Pertanyaan 17.a */}
                    <div className="grid grid-cols-12 gap-3 items-center px-3 py-2 border-b border-gray-200 pb-3">
                        <div className="col-span-12 md:col-span-5 flex gap-3 items-start">
                            <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">17.a.</span>
                            <span className="text-gray-700 font-normal text-base">
                                PPh yang Kurang/Lebih Bayar
                            </span>
                        </div>
                        <div className="col-span-12 md:col-span-7 flex items-center gap-4">
                            <input
                                type="number"
                                value={pphKurangLebihBayar}
                                onChange={(e) => handleInputChange('pphKurangLebihBayar', e.target.value)}
                                className="w-full md:w-64 px-3 py-2 border border-gray-300 rounded"
                            />
                        </div>
                    </div>

                    {/* Pertanyaan 17.b */}
                    <div className="grid grid-cols-12 gap-3 items-center px-3 py-2 border-b border-gray-200 pb-3 pt-3">
                        <div className="col-span-12 md:col-span-5 flex gap-3 items-start">
                            <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">17.b.</span>
                            <span className="text-gray-700 font-normal text-base">
                                Apakah terdapat Surat Keputusan Persetujuan Pengangsuran atau Penundaan Pembayaran Pajak?
                            </span>
                        </div>
                        <div className="col-span-12 md:col-span-7 flex flex-col md:flex-row gap-4 md:gap-6 items-center">
                            <div className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="r17b"
                                    id="r17b-tidak"
                                    value="tidak"
                                    checked={r17b === "tidak"}
                                    onChange={(e) => handleRadioChange('r17b', e.target.value)}
                                />
                                <label htmlFor="r17b-tidak">Tidak</label>
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="r17b"
                                    id="r17b-ya"
                                    value="ya"
                                    checked={r17b === "ya"}
                                    onChange={(e) => handleRadioChange('r17b', e.target.value)}
                                />
                                <label htmlFor="r17b-ya">Ya</label>
                            </div>
                            <div className="md:col-span-3 text-sm">
                                <div className="bg-blue-100 rounded px-3 py-2">
                                    {getHelperMessage('r17b', r17b)}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Pertanyaan 17.c */}
                    <div className="grid grid-cols-12 gap-3 items-center px-3 py-2 border-b border-gray-200 pb-3 pt-3">
                        <div className="col-span-12 md:col-span-5 flex gap-3 items-start">
                            <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">17.c.</span>
                            <span className="text-gray-700 font-normal text-base">
                                PPh yang masih harus dibayar atau lebih bayar
                            </span>
                        </div>
                        <div className="col-span-12 md:col-span-7 flex items-center gap-4">
                            <input
                                type="number"
                                value={pphMasihHarusDibayar}
                                onChange={(e) => handleInputChange('pphMasihHarusDibayar', e.target.value)}
                                className="w-full md:w-64 px-3 py-2 border border-gray-300 rounded"
                            />
                        </div>
                    </div>

                    {/* Pertanyaan 18.a */}
                    <div className="grid grid-cols-12 gap-3 items-center px-3 py-2 border-b border-gray-200 pb-3 pt-3">
                        <div className="col-span-12 md:col-span-5 flex gap-3 items-start">
                            <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">18.a.</span>
                            <span className="text-gray-700 font-normal text-base">
                                PPh yang kurang atau lebih bayar pada SPT yang dibetulkan
                            </span>
                        </div>
                        <div className="col-span-12 md:col-span-7 flex items-center gap-4">
                            <input
                                type="number"
                                value={pphKurangLebihBayarSptDibetulkan}
                                onChange={(e) => handleInputChange('pphKurangLebihBayarSptDibetulkan', e.target.value)}
                                className="w-full md:w-64 px-3 py-2 border border-gray-300 rounded"
                            />
                        </div>
                    </div>

                    {/* Pertanyaan 18.b */}
                    <div className="grid grid-cols-12 gap-3 items-center px-3 py-2 border-b border-gray-200 pb-3 pt-3">
                        <div className="col-span-12 md:col-span-5 flex gap-3 items-start">
                            <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">18.b.</span>
                            <span className="text-gray-700 font-normal text-base">
                                PPh yang kurang atau lebih bayar karena pembetulan
                            </span>
                        </div>
                        <div className="col-span-12 md:col-span-7 flex items-center gap-4">
                            <input
                                type="number"
                                value={pphKurangLebihBayarKarenaPembetulan}
                                onChange={(e) => handleInputChange('pphKurangLebihBayarKarenaPembetulan', e.target.value)}
                                className="w-full md:w-64 px-3 py-2 border border-gray-300 rounded"
                            />
                        </div>
                    </div>

                    {/* Pertanyaan 19.a */}
                    <div className="grid grid-cols-12 gap-3 items-center px-3 py-2 border-b border-gray-200 pb-3 pt-3">
                        <div className="col-span-12 md:col-span-5 flex gap-3 items-start">
                            <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">19.a.</span>
                            <span className="text-gray-700 font-normal text-base">
                                Lebih Bayar pada Angka 17.a. atau 18.b. mohon untuk: (pilih salah satu):
                            </span>
                        </div>
                        <div className="col-span-12 md:col-span-7 flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="r19a"
                                    id="r19a-pemeriksaan"
                                    value="pemeriksaan"
                                    checked={r19a === "pemeriksaan"}
                                    onChange={(e) => handleRadioChange('r19a', e.target.value)}
                                />
                                <label htmlFor="r19a-pemeriksaan">dikembalikan melalui pemeriksaan</label>
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="r19a"
                                    id="r19a-pendahuluan"
                                    value="pendahuluan"
                                    checked={r19a === "pendahuluan"}
                                    onChange={(e) => handleRadioChange('r19a', e.target.value)}
                                />
                                <label htmlFor="r19a-pendahuluan">dikembalikan melalui Pengembalian Pendahuluan</label>
                            </div>
                        </div>
                    </div>

                    {/* Pertanyaan 19.b - Informasi Rekening */}
                    <div className="grid grid-cols-12 gap-3 items-start px-3 py-2 pt-3">
                        <div className="col-span-12 md:col-span-5 flex gap-3 items-start">
                            <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">19.b.</span>
                            <span className="text-gray-700 font-normal text-base">
                                Informasi rekening
                            </span>
                        </div>
                        <div className="col-span-12 md:col-span-7">
                            <div className="bg-gray-50 rounded p-4">
                                <div className="grid grid-cols-12 gap-3 items-center mb-2">
                                    <label className="col-span-12 md:col-span-4 text-sm font-medium text-gray-700">
                                        Pilih Rekening Bank
                                    </label>
                                    <div className="col-span-12 md:col-span-8">
                                        <select
                                            value={rekeningBank}
                                            onChange={handleRekeningBankChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded"
                                        >
                                            {bankOptions.map((opt) => (
                                                <option key={opt.value} value={opt.value}>
                                                    {opt.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-12 gap-3 items-center mb-2">
                                    <label className="col-span-12 md:col-span-4 text-sm font-medium text-gray-700">
                                        Nomor Rekening
                                    </label>
                                    <div className="col-span-12 md:col-span-8">
                                        <input
                                            type="text"
                                            value={nomorRekening}
                                            onChange={(e) => handleInputChange('nomorRekening', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-12 gap-3 items-center mb-2">
                                    <label className="col-span-12 md:col-span-4 text-sm font-medium text-gray-700">
                                        Nama Bank
                                    </label>
                                    <div className="col-span-12 md:col-span-8">
                                        <input
                                            type="text"
                                            value={namaBank}
                                            onChange={(e) => handleInputChange('namaBank', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-12 gap-3 items-center">
                                    <label className="col-span-12 md:col-span-4 text-sm font-medium text-gray-700">
                                        Nama Pemilik Rekening
                                    </label>
                                    <div className="col-span-12 md:col-span-8">
                                        <input
                                            type="text"
                                            value={namaPemilikRekening}
                                            onChange={(e) => handleInputChange('namaPemilikRekening', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PertanyaanF;