import React, { useState, useEffect } from 'react';
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const PertanyaanI = ({ onAnswerChange, answersState }) => {
    const [showSection, setShowSection] = useState(false);

    // State untuk file upload (contoh sederhana)
    const [uploadedFiles, setUploadedFiles] = useState({
        laporanKeuangan: null,
        laporanKonsolidasianGrup: null,
        opiniAudit: null,
        buktiKreditPajakLuarNegeri: null,
        buktiPenanamanKembali: null,
        suratPenghitunganDividen: null,
    });

    // Load initial state dari parent jika ada
    useEffect(() => {
        if (answersState) {
            setUploadedFiles(prev => ({
                ...prev,
                ...answersState.uploadedFiles,
            }));
        }
    }, [answersState]);

    // Handler upload file
    const handleFileUpload = (field, event) => {
        const file = event.target.files[0];
        if (!file) return;

        const newFile = {
            name: file.name,
            size: file.size,
            type: file.type,
            url: URL.createObjectURL(file), // Untuk preview
        };

        setUploadedFiles(prev => {
            const updated = { ...prev, [field]: newFile };
            onAnswerChange?.('uploadedFiles', updated);
            return updated;
        });
    };

    // Handler hapus file
    const handleRemoveFile = (field) => {
        setUploadedFiles(prev => {
            const updated = { ...prev, [field]: null };
            onAnswerChange?.('uploadedFiles', updated);
            return updated;
        });
    };

    // Fungsi helper untuk menampilkan nama file atau placeholder
    const getFileName = (file) => {
        return file ? file.name : "Belum diunggah";
    };

    return (
        <div>
            {/* Header Toggle */}
            <div
                className='border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full'
                onClick={() => setShowSection(!showSection)}
            >
                <h3 className='text-lg font-semibold'>I. LAMPIRAN LAINNYA</h3>
                {showSection ? <FaChevronUp /> : <FaChevronDown />}
            </div>

            {/* Konten Section */}
            {showSection && (
                <div className="border rounded-md p-4 mb-4">
                    {/* a.1 Laporan Keuangan/Laporan Keuangan yang Telah Diaudit */}
                    <div className="grid grid-cols-12 gap-3 items-start px-3 py-2 border-b border-gray-200 pb-3">
                        <div className="col-span-12 md:col-span-5 flex gap-3 items-start">
                            <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">a.1.</span>
                            <span className="text-gray-700 font-normal text-base">
                                Laporan Keuangan/Laporan Keuangan yang Telah Diaudit*
                            </span>
                        </div>
                        <div className="col-span-12 md:col-span-7 flex flex-col gap-2">
                            <div className="flex gap-2">
                                <label className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Pilih
                                    <input
                                        type="file"
                                        onChange={(e) => handleFileUpload('laporanKeuangan', e)}
                                        className="hidden"
                                        accept=".pdf,.doc,.docx,.xls,.xlsx"
                                    />
                                </label>
                                <button
                                    onClick={() => document.querySelector(`input[type="file"][data-field="laporanKeuangan"]`)?.click()}
                                    className={`px-4 py-2 border border-gray-300 rounded ${uploadedFiles.laporanKeuangan ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'} cursor-pointer`}
                                    disabled={!uploadedFiles.laporanKeuangan}
                                >
                                    Unggah
                                </button>
                                <button
                                    onClick={() => handleRemoveFile('laporanKeuangan')}
                                    className={`px-4 py-2 border border-gray-300 rounded ${uploadedFiles.laporanKeuangan ? 'bg-red-50 text-red-700' : 'bg-gray-100 text-gray-500'} cursor-pointer`}
                                    disabled={!uploadedFiles.laporanKeuangan}
                                >
                                    Batalkan
                                </button>
                            </div>
                            {uploadedFiles.laporanKeuangan && (
                                <div className="mt-2 text-sm text-gray-600">
                                    <span className="font-medium">Dipilih:</span> {getFileName(uploadedFiles.laporanKeuangan)}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* a.2 Laporan Keuangan Konsolidasian untuk Wajib Pajak Grup */}
                    <div className="grid grid-cols-12 gap-3 items-start px-3 py-2 border-b border-gray-200 pb-3 pt-3">
                        <div className="col-span-12 md:col-span-5 flex gap-3 items-start">
                            <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">a.2.</span>
                            <span className="text-gray-700 font-normal text-base">
                                Laporan Keuangan Konsolidasian untuk Wajib Pajak Grup
                            </span>
                        </div>
                        <div className="col-span-12 md:col-span-7 flex flex-col gap-2">
                            <div className="flex gap-2">
                                <label className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Pilih
                                    <input
                                        type="file"
                                        onChange={(e) => handleFileUpload('laporanKonsolidasianGrup', e)}
                                        className="hidden"
                                        accept=".pdf,.doc,.docx,.xls,.xlsx"
                                    />
                                </label>
                                <button
                                    onClick={() => document.querySelector(`input[type="file"][data-field="laporanKonsolidasianGrup"]`)?.click()}
                                    className={`px-4 py-2 border border-gray-300 rounded ${uploadedFiles.laporanKonsolidasianGrup ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'} cursor-pointer`}
                                    disabled={!uploadedFiles.laporanKonsolidasianGrup}
                                >
                                    Unggah
                                </button>
                                <button
                                    onClick={() => handleRemoveFile('laporanKonsolidasianGrup')}
                                    className={`px-4 py-2 border border-gray-300 rounded ${uploadedFiles.laporanKonsolidasianGrup ? 'bg-red-50 text-red-700' : 'bg-gray-100 text-gray-500'} cursor-pointer`}
                                    disabled={!uploadedFiles.laporanKonsolidasianGrup}
                                >
                                    Batalkan
                                </button>
                            </div>
                            {uploadedFiles.laporanKonsolidasianGrup && (
                                <div className="mt-2 text-sm text-gray-600">
                                    <span className="font-medium">Dipilih:</span> {getFileName(uploadedFiles.laporanKonsolidasianGrup)}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* b. Opini Audit */}
                    <div className="grid grid-cols-12 gap-3 items-start px-3 py-2 border-b border-gray-200 pb-3 pt-3">
                        <div className="col-span-12 md:col-span-5 flex gap-3 items-start">
                            <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">b.</span>
                            <span className="text-gray-700 font-normal text-base">
                                Opini Audit
                            </span>
                        </div>
                        <div className="col-span-12 md:col-span-7 flex flex-col gap-2">
                            <div className="flex gap-2">
                                <label className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Pilih
                                    <input
                                        type="file"
                                        onChange={(e) => handleFileUpload('opiniAudit', e)}
                                        className="hidden"
                                        accept=".pdf,.doc,.docx,.jpg,.png"
                                    />
                                </label>
                                <button
                                    onClick={() => document.querySelector(`input[type="file"][data-field="opiniAudit"]`)?.click()}
                                    className={`px-4 py-2 border border-gray-300 rounded ${uploadedFiles.opiniAudit ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'} cursor-pointer`}
                                    disabled={!uploadedFiles.opiniAudit}
                                >
                                    Unggah
                                </button>
                                <button
                                    onClick={() => handleRemoveFile('opiniAudit')}
                                    className={`px-4 py-2 border border-gray-300 rounded ${uploadedFiles.opiniAudit ? 'bg-red-50 text-red-700' : 'bg-gray-100 text-gray-500'} cursor-pointer`}
                                    disabled={!uploadedFiles.opiniAudit}
                                >
                                    Batalkan
                                </button>
                            </div>
                            {uploadedFiles.opiniAudit && (
                                <div className="mt-2 text-sm text-gray-600">
                                    <span className="font-medium">Dipilih:</span> {getFileName(uploadedFiles.opiniAudit)}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* c. Laporan Keuangan Konsolidasian untuk Bentuk Usaha Tetap */}
                    <div className="grid grid-cols-12 gap-3 items-start px-3 py-2 border-b border-gray-200 pb-3 pt-3">
                        <div className="col-span-12 md:col-span-5 flex gap-3 items-start">
                            <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">c.</span>
                            <span className="text-gray-700 font-normal text-base">
                                Laporan Keuangan Konsolidasian untuk Bentuk Usaha Tetap
                            </span>
                        </div>
                        <div className="col-span-12 md:col-span-7 flex flex-col gap-2">
                            <div className="flex gap-2">
                                <label className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Pilih
                                    <input
                                        type="file"
                                        onChange={(e) => handleFileUpload('laporanKonsolidasianBUT', e)}
                                        className="hidden"
                                        accept=".pdf,.doc,.docx,.xls,.xlsx"
                                    />
                                </label>
                                <button
                                    onClick={() => document.querySelector(`input[type="file"][data-field="laporanKonsolidasianBUT"]`)?.click()}
                                    className={`px-4 py-2 border border-gray-300 rounded ${uploadedFiles.laporanKonsolidasianBUT ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'} cursor-pointer`}
                                    disabled={!uploadedFiles.laporanKonsolidasianBUT}
                                >
                                    Unggah
                                </button>
                                <button
                                    onClick={() => handleRemoveFile('laporanKonsolidasianBUT')}
                                    className={`px-4 py-2 border border-gray-300 rounded ${uploadedFiles.laporanKonsolidasianBUT ? 'bg-red-50 text-red-700' : 'bg-gray-100 text-gray-500'} cursor-pointer`}
                                    disabled={!uploadedFiles.laporanKonsolidasianBUT}
                                >
                                    Batalkan
                                </button>
                            </div>
                            {uploadedFiles.laporanKonsolidasianBUT && (
                                <div className="mt-2 text-sm text-gray-600">
                                    <span className="font-medium">Dipilih:</span> {getFileName(uploadedFiles.laporanKonsolidasianBUT)}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* d. Salinan Bukti Pembayaran atau Bukti Pemotongan sehubungan dengan Kredit Pajak Luar Negeri */}
                    <div className="grid grid-cols-12 gap-3 items-start px-3 py-2 border-b border-gray-200 pb-3 pt-3">
                        <div className="col-span-12 md:col-span-5 flex gap-3 items-start">
                            <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">d.</span>
                            <span className="text-gray-700 font-normal text-base">
                                Salinan Bukti Pembayaran atau Bukti Pemotongan sehubungan dengan Kredit Pajak Luar Negeri
                            </span>
                        </div>
                        <div className="col-span-12 md:col-span-7 flex flex-col gap-2">
                            <div className="flex gap-2">
                                <label className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Pilih
                                    <input
                                        type="file"
                                        onChange={(e) => handleFileUpload('buktiKreditPajakLuarNegeri', e)}
                                        className="hidden"
                                        accept=".pdf,.jpg,.png,.jpeg"
                                    />
                                </label>
                                <button
                                    onClick={() => document.querySelector(`input[type="file"][data-field="buktiKreditPajakLuarNegeri"]`)?.click()}
                                    className={`px-4 py-2 border border-gray-300 rounded ${uploadedFiles.buktiKreditPajakLuarNegeri ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'} cursor-pointer`}
                                    disabled={!uploadedFiles.buktiKreditPajakLuarNegeri}
                                >
                                    Unggah
                                </button>
                                <button
                                    onClick={() => handleRemoveFile('buktiKreditPajakLuarNegeri')}
                                    className={`px-4 py-2 border border-gray-300 rounded ${uploadedFiles.buktiKreditPajakLuarNegeri ? 'bg-red-50 text-red-700' : 'bg-gray-100 text-gray-500'} cursor-pointer`}
                                    disabled={!uploadedFiles.buktiKreditPajakLuarNegeri}
                                >
                                    Batalkan
                                </button>
                            </div>
                            {uploadedFiles.buktiKreditPajakLuarNegeri && (
                                <div className="mt-2 text-sm text-gray-600">
                                    <span className="font-medium">Dipilih:</span> {getFileName(uploadedFiles.buktiKreditPajakLuarNegeri)}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* e. Bukti Jenis Penanaman Kembali dan Realisasi Penanaman kembali untuk Bentuk Usaha Tetap */}
                    <div className="grid grid-cols-12 gap-3 items-start px-3 py-2 border-b border-gray-200 pb-3 pt-3">
                        <div className="col-span-12 md:col-span-5 flex gap-3 items-start">
                            <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">e.</span>
                            <span className="text-gray-700 font-normal text-base">
                                Bukti Jenis Penanaman Kembali dan Realisasi Penanaman kembali untuk Bentuk Usaha Tetap
                            </span>
                        </div>
                        <div className="col-span-12 md:col-span-7 flex flex-col gap-2">
                            <div className="flex gap-2">
                                <label className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Pilih
                                    <input
                                        type="file"
                                        onChange={(e) => handleFileUpload('buktiPenanamanKembali', e)}
                                        className="hidden"
                                        accept=".pdf,.doc,.docx,.jpg,.png"
                                    />
                                </label>
                                <button
                                    onClick={() => document.querySelector(`input[type="file"][data-field="buktiPenanamanKembali"]`)?.click()}
                                    className={`px-4 py-2 border border-gray-300 rounded ${uploadedFiles.buktiPenanamanKembali ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'} cursor-pointer`}
                                    disabled={!uploadedFiles.buktiPenanamanKembali}
                                >
                                    Unggah
                                </button>
                                <button
                                    onClick={() => handleRemoveFile('buktiPenanamanKembali')}
                                    className={`px-4 py-2 border border-gray-300 rounded ${uploadedFiles.buktiPenanamanKembali ? 'bg-red-50 text-red-700' : 'bg-gray-100 text-gray-500'} cursor-pointer`}
                                    disabled={!uploadedFiles.buktiPenanamanKembali}
                                >
                                    Batalkan
                                </button>
                            </div>
                            {uploadedFiles.buktiPenanamanKembali && (
                                <div className="mt-2 text-sm text-gray-600">
                                    <span className="font-medium">Dipilih:</span> {getFileName(uploadedFiles.buktiPenanamanKembali)}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* f. Surat Penghitungan Pengkreditan Pajak yang Telah Dibayar atau Dipotong/Dipungut atas Dividen yang Diterima dari Badan Usaha */}
                    <div className="grid grid-cols-12 gap-3 items-start px-3 py-2 pt-3">
                        <div className="col-span-12 md:col-span-5 flex gap-3 items-start">
                            <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">f.</span>
                            <span className="text-gray-700 font-normal text-base">
                                Surat Penghitungan Pengkreditan Pajak yang Telah Dibayar atau Dipotong/Dipungut atas Dividen yang Diterima dari Badan Usaha
                            </span>
                        </div>
                        <div className="col-span-12 md:col-span-7 flex flex-col gap-2">
                            <div className="flex gap-2">
                                <label className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Pilih
                                    <input
                                        type="file"
                                        onChange={(e) => handleFileUpload('suratPenghitunganDividen', e)}
                                        className="hidden"
                                        accept=".pdf,.doc,.docx"
                                    />
                                </label>
                                <button
                                    onClick={() => document.querySelector(`input[type="file"][data-field="suratPenghitunganDividen"]`)?.click()}
                                    className={`px-4 py-2 border border-gray-300 rounded ${uploadedFiles.suratPenghitunganDividen ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'} cursor-pointer`}
                                    disabled={!uploadedFiles.suratPenghitunganDividen}
                                >
                                    Unggah
                                </button>
                                <button
                                    onClick={() => handleRemoveFile('suratPenghitunganDividen')}
                                    className={`px-4 py-2 border border-gray-300 rounded ${uploadedFiles.suratPenghitunganDividen ? 'bg-red-50 text-red-700' : 'bg-gray-100 text-gray-500'} cursor-pointer`}
                                    disabled={!uploadedFiles.suratPenghitunganDividen}
                                >
                                    Batalkan
                                </button>
                            </div>
                            {uploadedFiles.suratPenghitunganDividen && (
                                <div className="mt-2 text-sm text-gray-600">
                                    <span className="font-medium">Dipilih:</span> {getFileName(uploadedFiles.suratPenghitunganDividen)}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="grid grid-cols-12 gap-3 items-start px-3 py-2 pt-3">
                        <div className="col-span-12 md:col-span-5 flex gap-3 items-start">
                            <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">f.1</span>
                            <span className="text-gray-700 font-normal text-base">
                                Laporan Keuangan BULN Nonbursa Terkendali Langsung
                            </span>
                        </div>
                        <div className="col-span-12 md:col-span-7 flex flex-col gap-2">
                            <div className="flex gap-2">
                                <label className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Pilih
                                    <input
                                        type="file"
                                        onChange={(e) => handleFileUpload('suratPenghitunganDividen', e)}
                                        className="hidden"
                                        accept=".pdf,.doc,.docx"
                                    />
                                </label>
                                <button
                                    onClick={() => document.querySelector(`input[type="file"][data-field="suratPenghitunganDividen"]`)?.click()}
                                    className={`px-4 py-2 border border-gray-300 rounded ${uploadedFiles.suratPenghitunganDividen ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'} cursor-pointer`}
                                    disabled={!uploadedFiles.suratPenghitunganDividen}
                                >
                                    Unggah
                                </button>
                                <button
                                    onClick={() => handleRemoveFile('suratPenghitunganDividen')}
                                    className={`px-4 py-2 border border-gray-300 rounded ${uploadedFiles.suratPenghitunganDividen ? 'bg-red-50 text-red-700' : 'bg-gray-100 text-gray-500'} cursor-pointer`}
                                    disabled={!uploadedFiles.suratPenghitunganDividen}
                                >
                                    Batalkan
                                </button>
                            </div>
                            {uploadedFiles.suratPenghitunganDividen && (
                                <div className="mt-2 text-sm text-gray-600">
                                    <span className="font-medium">Dipilih:</span> {getFileName(uploadedFiles.suratPenghitunganDividen)}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="grid grid-cols-12 gap-3 items-start px-3 py-2 pt-3">
                        <div className="col-span-12 md:col-span-5 flex gap-3 items-start">
                            <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">f.2</span>
                            <span className="text-gray-700 font-normal text-base">
                                Salinan surat pemberitahuan tahunan PPh BULN Nonbursa Terkendali Langsung
                            </span>
                        </div>
                        <div className="col-span-12 md:col-span-7 flex flex-col gap-2">
                            <div className="flex gap-2">
                                <label className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Pilih
                                    <input
                                        type="file"
                                        onChange={(e) => handleFileUpload('suratPenghitunganDividen', e)}
                                        className="hidden"
                                        accept=".pdf,.doc,.docx"
                                    />
                                </label>
                                <button
                                    onClick={() => document.querySelector(`input[type="file"][data-field="suratPenghitunganDividen"]`)?.click()}
                                    className={`px-4 py-2 border border-gray-300 rounded ${uploadedFiles.suratPenghitunganDividen ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'} cursor-pointer`}
                                    disabled={!uploadedFiles.suratPenghitunganDividen}
                                >
                                    Unggah
                                </button>
                                <button
                                    onClick={() => handleRemoveFile('suratPenghitunganDividen')}
                                    className={`px-4 py-2 border border-gray-300 rounded ${uploadedFiles.suratPenghitunganDividen ? 'bg-red-50 text-red-700' : 'bg-gray-100 text-gray-500'} cursor-pointer`}
                                    disabled={!uploadedFiles.suratPenghitunganDividen}
                                >
                                    Batalkan
                                </button>
                            </div>
                            {uploadedFiles.suratPenghitunganDividen && (
                                <div className="mt-2 text-sm text-gray-600">
                                    <span className="font-medium">Dipilih:</span> {getFileName(uploadedFiles.suratPenghitunganDividen)}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="grid grid-cols-12 gap-3 items-start px-3 py-2 pt-3">
                        <div className="col-span-12 md:col-span-5 flex gap-3 items-start">
                            <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">f.3</span>
                            <span className="text-gray-700 font-normal text-base">
                                Penghitngan atau Rincian Laba Setelah Pajak dalam 5 (lima) Tahun Terakhir BULN Nonbursa Terkendali Langsung
                            </span>
                        </div>
                        <div className="col-span-12 md:col-span-7 flex flex-col gap-2">
                            <div className="flex gap-2">
                                <label className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Pilih
                                    <input
                                        type="file"
                                        onChange={(e) => handleFileUpload('suratPenghitunganDividen', e)}
                                        className="hidden"
                                        accept=".pdf,.doc,.docx"
                                    />
                                </label>
                                <button
                                    onClick={() => document.querySelector(`input[type="file"][data-field="suratPenghitunganDividen"]`)?.click()}
                                    className={`px-4 py-2 border border-gray-300 rounded ${uploadedFiles.suratPenghitunganDividen ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'} cursor-pointer`}
                                    disabled={!uploadedFiles.suratPenghitunganDividen}
                                >
                                    Unggah
                                </button>
                                <button
                                    onClick={() => handleRemoveFile('suratPenghitunganDividen')}
                                    className={`px-4 py-2 border border-gray-300 rounded ${uploadedFiles.suratPenghitunganDividen ? 'bg-red-50 text-red-700' : 'bg-gray-100 text-gray-500'} cursor-pointer`}
                                    disabled={!uploadedFiles.suratPenghitunganDividen}
                                >
                                    Batalkan
                                </button>
                            </div>
                            {uploadedFiles.suratPenghitunganDividen && (
                                <div className="mt-2 text-sm text-gray-600">
                                    <span className="font-medium">Dipilih:</span> {getFileName(uploadedFiles.suratPenghitunganDividen)}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="grid grid-cols-12 gap-3 items-start px-3 py-2 pt-3">
                        <div className="col-span-12 md:col-span-5 flex gap-3 items-start">
                            <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">f.4</span>
                            <span className="text-gray-700 font-normal text-base">
                                Bukti Pembyaran Pajak Penghasilan atau Bukti Pemotongan Pajak Penghasilan atas Dividen yang Diterima dari BULN Nonbursa Terkendali Langsung
                            </span>
                        </div>
                        <div className="col-span-12 md:col-span-7 flex flex-col gap-2">
                            <div className="flex gap-2">
                                <label className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Pilih
                                    <input
                                        type="file"
                                        onChange={(e) => handleFileUpload('suratPenghitunganDividen', e)}
                                        className="hidden"
                                        accept=".pdf,.doc,.docx"
                                    />
                                </label>
                                <button
                                    onClick={() => document.querySelector(`input[type="file"][data-field="suratPenghitunganDividen"]`)?.click()}
                                    className={`px-4 py-2 border border-gray-300 rounded ${uploadedFiles.suratPenghitunganDividen ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'} cursor-pointer`}
                                    disabled={!uploadedFiles.suratPenghitunganDividen}
                                >
                                    Unggah
                                </button>
                                <button
                                    onClick={() => handleRemoveFile('suratPenghitunganDividen')}
                                    className={`px-4 py-2 border border-gray-300 rounded ${uploadedFiles.suratPenghitunganDividen ? 'bg-red-50 text-red-700' : 'bg-gray-100 text-gray-500'} cursor-pointer`}
                                    disabled={!uploadedFiles.suratPenghitunganDividen}
                                >
                                    Batalkan
                                </button>
                            </div>
                            {uploadedFiles.suratPenghitunganDividen && (
                                <div className="mt-2 text-sm text-gray-600">
                                    <span className="font-medium">Dipilih:</span> {getFileName(uploadedFiles.suratPenghitunganDividen)}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="grid grid-cols-12 gap-3 items-start px-3 py-2 pt-3">
                        <div className="col-span-12 md:col-span-5 flex gap-3 items-start">
                            <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">g.</span>
                            <span className="text-gray-700 font-normal text-base">
                                Bukti Pembayaran Zakat atau Sumbangan Keagamaan yang Sifatnya Wajib
                            </span>
                        </div>
                        <div className="col-span-12 md:col-span-7 flex flex-col gap-2">
                            <div className="flex gap-2">
                                <label className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Pilih
                                    <input
                                        type="file"
                                        onChange={(e) => handleFileUpload('suratPenghitunganDividen', e)}
                                        className="hidden"
                                        accept=".pdf,.doc,.docx"
                                    />
                                </label>
                                <button
                                    onClick={() => document.querySelector(`input[type="file"][data-field="suratPenghitunganDividen"]`)?.click()}
                                    className={`px-4 py-2 border border-gray-300 rounded ${uploadedFiles.suratPenghitunganDividen ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'} cursor-pointer`}
                                    disabled={!uploadedFiles.suratPenghitunganDividen}
                                >
                                    Unggah
                                </button>
                                <button
                                    onClick={() => handleRemoveFile('suratPenghitunganDividen')}
                                    className={`px-4 py-2 border border-gray-300 rounded ${uploadedFiles.suratPenghitunganDividen ? 'bg-red-50 text-red-700' : 'bg-gray-100 text-gray-500'} cursor-pointer`}
                                    disabled={!uploadedFiles.suratPenghitunganDividen}
                                >
                                    Batalkan
                                </button>
                            </div>
                            {uploadedFiles.suratPenghitunganDividen && (
                                <div className="mt-2 text-sm text-gray-600">
                                    <span className="font-medium">Dipilih:</span> {getFileName(uploadedFiles.suratPenghitunganDividen)}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="grid grid-cols-12 gap-3 items-start px-3 py-2 pt-3">
                        <div className="col-span-12 md:col-span-5 flex gap-3 items-start">
                            <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">h. </span>
                            <span className="text-gray-700 font-normal text-base">
                                Laporan Wajib Pajak Dalam Rangka Pemenuhan Persyaratan Penurunan Tarif PPh bagi Wajib Pajak 
                                Badan Dalam Negeri Yang Berbentuk Perseroan Terbuka 
                            </span>
                        </div>
                        <div className="col-span-12 md:col-span-7 flex flex-col gap-2">
                            <div className="flex gap-2">
                                <label className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Pilih
                                    <input
                                        type="file"
                                        onChange={(e) => handleFileUpload('suratPenghitunganDividen', e)}
                                        className="hidden"
                                        accept=".pdf,.doc,.docx"
                                    />
                                </label>
                                <button
                                    onClick={() => document.querySelector(`input[type="file"][data-field="suratPenghitunganDividen"]`)?.click()}
                                    className={`px-4 py-2 border border-gray-300 rounded ${uploadedFiles.suratPenghitunganDividen ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'} cursor-pointer`}
                                    disabled={!uploadedFiles.suratPenghitunganDividen}
                                >
                                    Unggah
                                </button>
                                <button
                                    onClick={() => handleRemoveFile('suratPenghitunganDividen')}
                                    className={`px-4 py-2 border border-gray-300 rounded ${uploadedFiles.suratPenghitunganDividen ? 'bg-red-50 text-red-700' : 'bg-gray-100 text-gray-500'} cursor-pointer`}
                                    disabled={!uploadedFiles.suratPenghitunganDividen}
                                >
                                    Batalkan
                                </button>
                            </div>
                            {uploadedFiles.suratPenghitunganDividen && (
                                <div className="mt-2 text-sm text-gray-600">
                                    <span className="font-medium">Dipilih:</span> {getFileName(uploadedFiles.suratPenghitunganDividen)}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="grid grid-cols-12 gap-3 items-start px-3 py-2 pt-3">
                        <div className="col-span-12 md:col-span-5 flex gap-3 items-start">
                            <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">h.1</span>
                            <span className="text-gray-700 font-normal text-base">
                                Laporan Bulanan
                            </span>
                        </div>
                        <div className="col-span-12 md:col-span-7 flex flex-col gap-2">
                            <div className="flex gap-2">
                                <label className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Pilih
                                    <input
                                        type="file"
                                        onChange={(e) => handleFileUpload('suratPenghitunganDividen', e)}
                                        className="hidden"
                                        accept=".pdf,.doc,.docx"
                                    />
                                </label>
                                <button
                                    onClick={() => document.querySelector(`input[type="file"][data-field="suratPenghitunganDividen"]`)?.click()}
                                    className={`px-4 py-2 border border-gray-300 rounded ${uploadedFiles.suratPenghitunganDividen ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'} cursor-pointer`}
                                    disabled={!uploadedFiles.suratPenghitunganDividen}
                                >
                                    Unggah
                                </button>
                                <button
                                    onClick={() => handleRemoveFile('suratPenghitunganDividen')}
                                    className={`px-4 py-2 border border-gray-300 rounded ${uploadedFiles.suratPenghitunganDividen ? 'bg-red-50 text-red-700' : 'bg-gray-100 text-gray-500'} cursor-pointer`}
                                    disabled={!uploadedFiles.suratPenghitunganDividen}
                                >
                                    Batalkan
                                </button>
                            </div>
                            {uploadedFiles.suratPenghitunganDividen && (
                                <div className="mt-2 text-sm text-gray-600">
                                    <span className="font-medium">Dipilih:</span> {getFileName(uploadedFiles.suratPenghitunganDividen)}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="grid grid-cols-12 gap-3 items-start px-3 py-2 pt-3">
                        <div className="col-span-12 md:col-span-5 flex gap-3 items-start">
                            <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">h.2</span>
                            <span className="text-gray-700 font-normal text-base">
                                Laporan Kepemilikan Saham yang Memiliki Hubungan Istimewa
                            </span>
                        </div>
                        <div className="col-span-12 md:col-span-7 flex flex-col gap-2">
                            <div className="flex gap-2">
                                <label className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Pilih
                                    <input
                                        type="file"
                                        onChange={(e) => handleFileUpload('suratPenghitunganDividen', e)}
                                        className="hidden"
                                        accept=".pdf,.doc,.docx"
                                    />
                                </label>
                                <button
                                    onClick={() => document.querySelector(`input[type="file"][data-field="suratPenghitunganDividen"]`)?.click()}
                                    className={`px-4 py-2 border border-gray-300 rounded ${uploadedFiles.suratPenghitunganDividen ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'} cursor-pointer`}
                                    disabled={!uploadedFiles.suratPenghitunganDividen}
                                >
                                    Unggah
                                </button>
                                <button
                                    onClick={() => handleRemoveFile('suratPenghitunganDividen')}
                                    className={`px-4 py-2 border border-gray-300 rounded ${uploadedFiles.suratPenghitunganDividen ? 'bg-red-50 text-red-700' : 'bg-gray-100 text-gray-500'} cursor-pointer`}
                                    disabled={!uploadedFiles.suratPenghitunganDividen}
                                >
                                    Batalkan
                                </button>
                            </div>
                            {uploadedFiles.suratPenghitunganDividen && (
                                <div className="mt-2 text-sm text-gray-600">
                                    <span className="font-medium">Dipilih:</span> {getFileName(uploadedFiles.suratPenghitunganDividen)}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="grid grid-cols-12 gap-3 items-start px-3 py-2 pt-3">
                        <div className="col-span-12 md:col-span-5 flex gap-3 items-start">
                            <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">i.</span>
                            <span className="text-gray-700 font-normal text-base">
                                Tanda Terima Elektronik Penyampaian Laporan Per Negara
                                (Country-by-Country-Report)
                            </span>
                        </div>
                        <div className="col-span-12 md:col-span-7 flex flex-col gap-2">
                            <div className="flex gap-2">
                                <label className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Pilih
                                    <input
                                        type="file"
                                        onChange={(e) => handleFileUpload('suratPenghitunganDividen', e)}
                                        className="hidden"
                                        accept=".pdf,.doc,.docx"
                                    />
                                </label>
                                <button
                                    onClick={() => document.querySelector(`input[type="file"][data-field="suratPenghitunganDividen"]`)?.click()}
                                    className={`px-4 py-2 border border-gray-300 rounded ${uploadedFiles.suratPenghitunganDividen ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'} cursor-pointer`}
                                    disabled={!uploadedFiles.suratPenghitunganDividen}
                                >
                                    Unggah
                                </button>
                                <button
                                    onClick={() => handleRemoveFile('suratPenghitunganDividen')}
                                    className={`px-4 py-2 border border-gray-300 rounded ${uploadedFiles.suratPenghitunganDividen ? 'bg-red-50 text-red-700' : 'bg-gray-100 text-gray-500'} cursor-pointer`}
                                    disabled={!uploadedFiles.suratPenghitunganDividen}
                                >
                                    Batalkan
                                </button>
                            </div>
                            {uploadedFiles.suratPenghitunganDividen && (
                                <div className="mt-2 text-sm text-gray-600">
                                    <span className="font-medium">Dipilih:</span> {getFileName(uploadedFiles.suratPenghitunganDividen)}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="grid grid-cols-12 gap-3 items-start px-3 py-2 pt-3">
                        <div className="col-span-12 md:col-span-5 flex gap-3 items-start">
                            <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">j.</span>
                            <span className="text-gray-700 font-normal text-base">
                                Dokumen Lainnya
                            </span>
                        </div>
                        <div className="col-span-12 md:col-span-7 flex flex-col gap-2">
                            <div className="flex gap-2">
                                <label className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Pilih
                                    <input
                                        type="file"
                                        onChange={(e) => handleFileUpload('suratPenghitunganDividen', e)}
                                        className="hidden"
                                        accept=".pdf,.doc,.docx"
                                    />
                                </label>
                                <button
                                    onClick={() => document.querySelector(`input[type="file"][data-field="suratPenghitunganDividen"]`)?.click()}
                                    className={`px-4 py-2 border border-gray-300 rounded ${uploadedFiles.suratPenghitunganDividen ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'} cursor-pointer`}
                                    disabled={!uploadedFiles.suratPenghitunganDividen}
                                >
                                    Unggah
                                </button>
                                <button
                                    onClick={() => handleRemoveFile('suratPenghitunganDividen')}
                                    className={`px-4 py-2 border border-gray-300 rounded ${uploadedFiles.suratPenghitunganDividen ? 'bg-red-50 text-red-700' : 'bg-gray-100 text-gray-500'} cursor-pointer`}
                                    disabled={!uploadedFiles.suratPenghitunganDividen}
                                >
                                    Batalkan
                                </button>
                            </div>
                            {uploadedFiles.suratPenghitunganDividen && (
                                <div className="mt-2 text-sm text-gray-600">
                                    <span className="font-medium">Dipilih:</span> {getFileName(uploadedFiles.suratPenghitunganDividen)}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PertanyaanI;