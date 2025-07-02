import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FaCalendarAlt, FaFilter, FaSearch, FaTimes, FaChevronDown, FaChevronUp } from "react-icons/fa";

const CreateKonsepUnifikasi = () => {
    const [activeTab, setActiveTab] = useState("induk");
    const [showHeaderInduk, setShowHeaderInduk] = useState(false);
    const [showIdentitasPemotong, setShowIdentitasPemotong] = useState(false);
    const [showPajakPenghasilan21, setShowPajakPenghasilan21] = useState(false);
    const [showPajakPenghasilan26, setShowPajakPenghasilan26] = useState(false);
    const [showPernyataan, setShowPernyataan] = useState(false);
    const [showTabelBPPUnifikasi, setShowTabelBPPUnifikasi] = useState(false);
    const [showTabelBPNRUnifikasi, setShowTabelBPNRUnifikasi] = useState(false);
    const [showTabelDaftarPPh, setShowTabelDaftarPPh] = useState(false);
    const [showTabelDaftarPajakPenghasilan, setShowTabelDaftarPajakPenghasilan] = useState(false);

    const [showHeadera1, setShowHeadera1] = useState(false);
    const [showHeadera2, setShowHeadera2] = useState(false);
    const [showHeaderb1, setShowHeaderb1] = useState(false);
    const [showHeaderb2, setShowHeaderb2] = useState(false);
    const [showHeaderb3, setShowHeaderb3] = useState(false);
    const [showHeaderc, setShowHeaderc] = useState(false);

    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 200);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <div className="flex-auto p-3 bg-white rounded-md h-full">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-light text-yellow-500 mt-4">SPT MASA PPH UNIFIKASI</h2>
                </div>
                <div className="w-full p-2 ml-0 border-t text-lg">
                    <Tabs defaultValue='induk' onValueChange={(val) => setActiveTab(val)} >
                        <TabsList className="flex justify-start gap-2 text-blue-700 text-lg">
                            <TabsTrigger value="induk">Induk</TabsTrigger>
                            <TabsTrigger value="l-ia">Daftar I</TabsTrigger>
                            <TabsTrigger value="l-ib">Daftar II</TabsTrigger>
                            <TabsTrigger value="l-ii">Lampiran</TabsTrigger>

                        </TabsList>
                        <TabsContent value="induk">
                            <div className="mt-4">
                                <div className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full" onClick={() => setShowHeaderInduk(!showHeaderInduk)}>
                                    <h3 className='text-lg font-semibold'>Header</h3>
                                    {showHeaderInduk ? <FaChevronUp /> : <FaChevronDown />}
                                </div>
                                {showHeaderInduk && (
                                    <div className="border rounded-md p-4 mb-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Periode Pajak Bulan</label>
                                                <input
                                                    type="text"
                                                    readOnly
                                                    value="05"
                                                    className='w-full p-2 border rounded-md bg-gray-100 text-gray-600'
                                                />
                                            </div>
                                            <div>
                                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Periode Pajak Tahun</label>
                                                <input
                                                    type="text"
                                                    readOnly
                                                    value="2025"
                                                    className='w-full p-2 border rounded-md bg-gray-100 text-gray-600'
                                                />
                                            </div>
                                            <div>
                                                <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Status</label>
                                                <select className='w-full p-2 border rounded-md bg-gray-100 text-gray-600'>
                                                    <option value="normal" >Normal</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full" onClick={() => setShowIdentitasPemotong(!showIdentitasPemotong)}>
                                    <h3 className='text-lg font-semibold'>1. Identitas Pemotong</h3>
                                    {showIdentitasPemotong ? <FaChevronUp /> : <FaChevronDown />}
                                </div>
                                {showIdentitasPemotong && (
                                    <div className="border rounded-md p-4 mb-4">
                                        <div className=''>
                                            <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>NPWP</label>
                                            <input
                                                type="text"
                                                readOnly
                                                value="2020082030020"
                                                className='w-full p-2 border rounded-md bg-gray-100 text-gray-600'
                                            />
                                        </div>
                                        <div className='mt-4'>
                                            <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Nama</label>
                                            <input
                                                type="text"
                                                readOnly
                                                value="2020082030020"
                                                className='w-full p-2 border rounded-md bg-gray-100 text-gray-600'
                                            />
                                        </div>
                                        <div className='mt-4'>
                                            <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Alamat</label>
                                            <input
                                                type="text"
                                                readOnly
                                                value="Jl. Pemotong No. 1, RT 1, RW 1, Desa Pemotong, Kecamatan Pemotong, Kabupaten Pemotong, Provinsi Pemotong"
                                                className='w-full p-2 border rounded-md bg-gray-100 text-gray-600'
                                            />
                                        </div>
                                        <div className='mt-4'>
                                            <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Nomor Telepon</label>
                                            <input
                                                type="text"
                                                readOnly
                                                value="2020082030020"
                                                className='w-full p-2 border rounded-md bg-gray-100 text-gray-600'
                                            />
                                        </div>
                                    </div>
                                )}
                                <div className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full" onClick={() => setShowPajakPenghasilan21(!showPajakPenghasilan21)}>
                                    <h3 className='text-lg font-semibold'>2. Pajak Penghasilan </h3>
                                    {showPajakPenghasilan21 ? <FaChevronUp /> : <FaChevronDown />}
                                </div>
                                {showPajakPenghasilan21 && (
                                    <div className="border rounded-md p-4 overflow-x-auto">
                                        <table className='min-w-full text-sm text-left border overflow-x-auto'>
                                            <thead className="bg-purple-700 text-white text-center">
                                                <tr>
                                                    <th rowSpan="2" className="border border-gray-300 px-2 py-1 whitespace-normal">NO</th>
                                                    <th rowSpan="2" className="border border-gray-300 px-2 py-1 whitespace-normal">DETIL</th>
                                                    <th colSpan="2" className="border border-gray-300 px-2 py-1 whitespace-normal">PAJAK PENGHASILAN</th>
                                                    <th rowSpan="2" className="border border-gray-300 px-2 py-1 whitespace-normal">PPh DITANGGUNG PEMERINTAH</th>
                                                    <th rowSpan="2" className="border border-gray-300 px-2 py-1 whitespace-normal">JUMLAH PPh DIBAYAR</th>
                                                    <th rowSpan="2" className="border border-gray-300 px-2 py-1 whitespace-normal max-w-[200px]">JUMLAH PPh DIBAYAR DARI SPT YANG DIBETULKAN</th>
                                                    <th rowSpan="2" className="border border-gray-300 px-2 py-1 whitespace-normal max-w-[200px]">PPh KURANG BAYAR / LEBIH BAYAR KARENA PEMBETULAN</th>

                                                </tr>
                                                <tr>
                                                    <th className="border border-gray-300 px-2 py-1">SETOR SENDIRI</th>
                                                    <th className="border border-gray-300 px-2 py-1">PEMOTONGAN / PEMUNGUTAN</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {/* Pasal 4 Ayat 2 */}
                                                <tr className='p-2'>
                                                    <td rowSpan="4" className="border border-gray-300 px-2 py-1 align-top text-center">1</td>
                                                    <td className="border border-gray-300 px-2 py-1 text-left">Pasal 4 Ayat 2</td>
                                                    <td className="border border-gray-300 px-2 py-1 text-right">0</td>
                                                    <td className="border border-gray-300 px-2 py-1 text-right">0</td>
                                                    <td className="border border-gray-300 px-2 py-1 text-right">0</td>
                                                    <td className="border border-gray-300 px-2 py-1 text-right">0</td>
                                                    <td className="border border-gray-300 px-2 py-1 text-right">0</td>
                                                    <td className="border border-gray-300 px-2 py-1 text-right">0</td>
                                                </tr>
                                                <tr>
                                                    <td className="border border-gray-300 px-2 py-1 text-left">KJS 411128-100</td>
                                                    <td className="border border-gray-300 px-2 py-1 text-right">0</td>
                                                    <td className="border border-gray-300 px-2 py-1 text-right">0</td>
                                                    <td className="border border-gray-300 px-2 py-1 text-right">0</td>
                                                    <td className="border border-gray-300 px-2 py-1 text-right">0</td>
                                                    <td className="border border-gray-300 px-2 py-1 text-right">0</td>
                                                    <td className="border border-gray-300 px-2 py-1 text-right">0</td>

                                                </tr>
                                                <tr>
                                                    <td className="border border-gray-300 px-2 py-1 text-left">KJS 411128-402</td>
                                                    <td className="border border-gray-300 px-2 py-1 text-right">0</td>
                                                    <td className="border border-gray-300 px-2 py-1 text-right">0</td>
                                                    <td className="border border-gray-300 px-2 py-1 text-right">0</td>
                                                    <td className="border border-gray-300 px-2 py-1 text-right">0</td>
                                                    <td className="border border-gray-300 px-2 py-1 text-right">0</td>
                                                    <td className="border border-gray-300 px-2 py-1 text-right">0</td>

                                                </tr>
                                                <tr>
                                                    <td className="border border-gray-300 px-2 py-1 text-left">KJS 411128-403</td>
                                                    <td className="border border-gray-300 px-2 py-1 text-right">0</td>
                                                    <td className="border border-gray-300 px-2 py-1 text-right">0</td>
                                                    <td className="border border-gray-300 px-2 py-1 text-right">0</td>
                                                    <td className="border border-gray-300 px-2 py-1 text-right">0</td>
                                                    <td className="border border-gray-300 px-2 py-1 text-right">0</td>
                                                    <td className="border border-gray-300 px-2 py-1 text-right">0</td>
                                                </tr>

                                                {/* Pasal 15 */}
                                                <tr>
                                                    <td rowSpan="3" className="border border-gray-300 px-2 py-1 align-top text-center">2</td>
                                                    <td className="border border-gray-300 px-2 py-1 text-left">Pasal 15</td>
                                                    <td className="border border-gray-300 px-2 py-1 text-right">0</td>
                                                    <td className="border border-gray-300 px-2 py-1 text-right">0</td>
                                                    <td className="border border-gray-300 px-2 py-1 text-right">0</td>
                                                    <td className="border border-gray-300 px-2 py-1 text-right">0</td>
                                                    <td className="border border-gray-300 px-2 py-1 text-right">0</td>
                                                    <td className="border border-gray-300 px-2 py-1 text-right">0</td>
                                                </tr>
                                                <tr>
                                                    <td className="border border-gray-300 px-2 py-1 text-left">KJS 411128-600</td>
                                                    <td className="border border-gray-300 px-2 py-1 text-right">0</td>
                                                    <td className="border border-gray-300 px-2 py-1 text-right">0</td>
                                                    <td className="border border-gray-300 px-2 py-1 text-right">0</td>
                                                    <td className="border border-gray-300 px-2 py-1 text-right">0</td>
                                                    <td className="border border-gray-300 px-2 py-1 text-right">0</td>
                                                    <td className="border border-gray-300 px-2 py-1 text-right">0</td>
                                                </tr>
                                                <tr>
                                                    <td className="border border-gray-300 px-2 py-1 text-left">KJS 411129-600</td>
                                                    <td className="border border-gray-300 px-2 py-1 text-right">0</td>
                                                    <td className="border border-gray-300 px-2 py-1 text-right">0</td>
                                                    <td className="border border-gray-300 px-2 py-1 text-right">0</td>
                                                    <td className="border border-gray-300 px-2 py-1 text-right">0</td>
                                                    <td className="border border-gray-300 px-2 py-1 text-right">0</td>
                                                    <td className="border border-gray-300 px-2 py-1 text-right">0</td>
                                                </tr>

                                                {/* pasal 22 */}
                                                <tr className='p-2'>
                                                    <td rowSpan="4" className="border border-gray-300 px-2 py-1 align-top text-center">3</td>
                                                    <td className="border border-gray-300 px-2 py-1 text-left">Pasal 22</td>
                                                    <td className="border border-gray-300 px-2 py-1 text-right">0</td>
                                                    <td className="border border-gray-300 px-2 py-1 text-right">0</td>
                                                    <td className="border border-gray-300 px-2 py-1 text-right">0</td>
                                                    <td className="border border-gray-300 px-2 py-1 text-right">0</td>
                                                    <td className="border border-gray-300 px-2 py-1 text-right">0</td>
                                                    <td className="border border-gray-300 px-2 py-1 text-right">0</td>
                                                </tr>
                                                <tr>
                                                    <td className="border border-gray-300 px-2 py-1 text-left">KJS 411122-100</td>
                                                    <td className="border border-gray-300 px-2 py-1 text-right">0</td>
                                                    <td className="border border-gray-300 px-2 py-1 text-right">0</td>
                                                    <td className="border border-gray-300 px-2 py-1 text-right">0</td>
                                                    <td className="border border-gray-300 px-2 py-1 text-right">0</td>
                                                    <td className="border border-gray-300 px-2 py-1 text-right">0</td>
                                                    <td className="border border-gray-300 px-2 py-1 text-right">0</td>
                                                </tr>
                                                <tr>
                                                    <td className="border border-gray-300 px-2 py-1 text-left">KJS 411122-900</td>
                                                    <td className="border border-gray-300 px-2 py-1 text-right">0</td>
                                                    <td className="border border-gray-300 px-2 py-1 text-right">0</td>
                                                    <td className="border border-gray-300 px-2 py-1 text-right">0</td>
                                                    <td className="border border-gray-300 px-2 py-1 text-right">0</td>
                                                    <td className="border border-gray-300 px-2 py-1 text-right">0</td>
                                                    <td className="border border-gray-300 px-2 py-1 text-right">0</td>

                                                </tr>
                                                <tr>
                                                    <td className="border border-gray-300 px-2 py-1 text-left">KJS 411122-910</td>
                                                    <td className="border border-gray-300 px-2 py-1 text-right">0</td>
                                                    <td className="border border-gray-300 px-2 py-1 text-right">0</td>
                                                    <td className="border border-gray-300 px-2 py-1 text-right">0</td>
                                                    <td className="border border-gray-300 px-2 py-1 text-right">0</td>
                                                    <td className="border border-gray-300 px-2 py-1 text-right">0</td>
                                                    <td className="border border-gray-300 px-2 py-1 text-right">0</td>
                                                </tr>

                                                {/* Pasal 23 */}
                                                <tr className='p-2'>
                                                    <td rowSpan="2" className="border border-gray-300 px-2 py-1 align-top text-center">4</td>
                                                    <td className="border border-gray-300 px-2 py-1 text-left">Pasal 23</td>
                                                    <td className="border border-gray-300 px-2 py-1 text-right">0</td>
                                                    <td className="border border-gray-300 px-2 py-1 text-right">0</td>
                                                    <td className="border border-gray-300 px-2 py-1 text-right">0</td>
                                                    <td className="border border-gray-300 px-2 py-1 text-right">0</td>
                                                    <td className="border border-gray-300 px-2 py-1 text-right">0</td>
                                                    <td className="border border-gray-300 px-2 py-1 text-right">0</td>
                                                </tr>
                                                <tr>
                                                    <td className="border border-gray-300 px-2 py-1 text-left">KJS 411124-100</td>
                                                    <td className="border border-gray-300 px-2 py-1 text-right">0</td>
                                                    <td className="border border-gray-300 px-2 py-1 text-right">0</td>
                                                    <td className="border border-gray-300 px-2 py-1 text-right">0</td>
                                                    <td className="border border-gray-300 px-2 py-1 text-right">0</td>
                                                    <td className="border border-gray-300 px-2 py-1 text-right">0</td>
                                                    <td className="border border-gray-300 px-2 py-1 text-right">0</td>
                                                </tr>
                                                {/* Pasal 26 */}
                                                <tr className='p-2'>
                                                    <td rowSpan="4" className="border border-gray-300 px-2 py-1 align-top text-center">5</td>
                                                    <td className="border border-gray-300 px-2 py-1 text-left">Pasal 26</td>
                                                    <td className="border border-gray-300 px-2 py-1 text-right">0</td>
                                                    <td className="border border-gray-300 px-2 py-1 text-right">0</td>
                                                    <td className="border border-gray-300 px-2 py-1 text-right">0</td>
                                                    <td className="border border-gray-300 px-2 py-1 text-right">0</td>
                                                    <td className="border border-gray-300 px-2 py-1 text-right">0</td>
                                                    <td className="border border-gray-300 px-2 py-1 text-right">0</td>
                                                </tr>
                                                <tr>
                                                    <td className="border border-gray-300 px-2 py-1 text-left">KJS 411127-110</td>
                                                    <td className="border border-gray-300 px-2 py-1 text-right">0</td>
                                                    <td className="border border-gray-300 px-2 py-1 text-right">0</td>
                                                    <td className="border border-gray-300 px-2 py-1 text-right">0</td>
                                                    <td className="border border-gray-300 px-2 py-1 text-right">0</td>
                                                    <td className="border border-gray-300 px-2 py-1 text-right">0</td>
                                                    <td className="border border-gray-300 px-2 py-1 text-right">0</td>
                                                </tr>
                                            </tbody>
                                        </table>

                                    </div>
                                )}

                                <div className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full" onClick={() => setShowPernyataan(!showPernyataan)}>
                                    <h3 className='text-lg font-semibold'>3. Pernyataan</h3>
                                    {showPernyataan ? <FaChevronUp /> : <FaChevronDown />}
                                </div>
                                {showPernyataan && (
                                    <div className="border rounded-md p-4 mb-4">
                                        <div className="text-sm font-bold italic">
                                            <input type="checkbox" className="m-2" />
                                            PERNYATAAN : DENGAN MENYADARI SEPENUHNYA AKAN SEGALA AKIBATNYA, SAYA MENYATAKAN BAHWA APA YANG TELAH SAYA BERITAHUKAN DI ATAS BESERTA LAMPIRAN-LAMPIRANNYA ADALAH BENAR, LENGKAP, JELAS, DAN TIDAK BERSYARAT
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <label className="block text-sm font-medium text-gray-700 col-span-1">DITANDATANGANI OLEH</label>
                                                <div className="flex items-center space-x-2">
                                                    <input type="radio" id="test1" name="ditandatangani" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                                                    <label htmlFor="PKP" className="text-gray-700 text-sm">TaxPayer</label>
                                                    <input type="radio" id="test2" name="ditandatangani" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" onClick={(e) => e.target.parentElement.previousElementSibling.click()} />
                                                    <label htmlFor="KuasaWajibPajak" className="text-gray-700 text-sm">Representative</label>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <label className="block text-sm font-medium text-gray-700 col-span-1">Nama</label>
                                                <div className="flex items-center space-x-2 w-full">
                                                    <input type="text" className="rounded w-full bg-gray-300 border-black text-sm p-2 flex-1" disabled />
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                )}
                                <div className="flex justify-start mt-4 gap-2">
                                    <button
                                        type="submit"
                                        className="bg-blue-700 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-sm"
                                    >
                                        Simpan Konsep
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-blue-700 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-sm"
                                    >
                                        Bayar dan Lapor
                                    </button>
                                </div>
                                {showScrollTop && (
                                    <button
                                        onClick={scrollToTop}
                                        className="fixed bottom-6 right-6 bg-purple-700 text-white p-3 rounded-full shadow-lg hover:bg-purple-800 transition duration-300 w-12 h-12 flex items-center justify-center"
                                        aria-label="Scroll to top"
                                    >
                                        ↑
                                    </button>
                                )}
                            </div>
                        </TabsContent>
                        <TabsContent value="l-ia">

                            <div className="mt-4">
                                <div className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full" onClick={() => setShowHeadera1(!showHeadera1)}>
                                    <h3 className='text-lg font-semibold'>Header</h3>
                                    {showHeadera1 ? <FaChevronUp /> : <FaChevronDown />}
                                </div>
                                {showHeadera1 && (
                                    <div className="border rounded-md p-4 mb-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                            <div>
                                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">NPWP</label>
                                                <input
                                                    type="text"
                                                    readOnly
                                                    value="2002909301990"
                                                    className='w-full p-2 border rounded-md bg-gray-100 text-gray-600'
                                                />
                                            </div>
                                            <div>
                                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Masa Pajak</label>
                                                <input
                                                    type="text"
                                                    readOnly
                                                    value="2025"
                                                    className='w-full p-2 border rounded-md bg-gray-100 text-gray-600'
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div className="mt-4">
                                    <div className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full" onClick={() => setShowTabelBPPUnifikasi(!showTabelBPPUnifikasi)} >
                                        <h3 className='text-lg font-semibold'>Tabel.I BPPU</h3>
                                        {showTabelBPPUnifikasi ? <FaChevronUp /> : <FaChevronDown />}
                                    </div>
                                    {showTabelBPPUnifikasi && (
                                        <div className="border rounded-md p-4 overflow-x-auto w-[1400px]">
                                            <table className='w-[1200px] text-sm text-left border overflow-x-auto'>
                                                <thead className="bg-purple-700 text-white text-center ">
                                                    <tr>
                                                        <th className='border border-gray-300 px-2 py-1 whitespace-normal'>No</th>
                                                        <th className='border border-gray-300 px-2 py-1 whitespace-normal'>NIK/NPWP</th>
                                                        <th className='border border-gray-300 px-2 py-1 whitespace-normal'>NAMA</th>
                                                        <th className='border border-gray-300 px-2 py-1 whitespace-normal'>NOMOR BUKTI POTONG</th>
                                                        <th className='border border-gray-300 px-2 py-1 whitespace-normal'>TANGGAL BUKTI POTONG</th>
                                                        <th className='border border-gray-300 px-2 py-1 whitespace-normal'>JENIS PAJAK </th>
                                                        <th className='border border-gray-300 px-2 py-1 whitespace-normal'>KODE OBJEK PAJAK</th>
                                                        <th className='border border-gray-300 px-2 py-1 whitespace-normal'>OBJEK PAJAK</th>
                                                        <th className='border border-gray-300 px-2 py-1 whitespace-normal'>DASAR PENGENAAN PAJAK</th>
                                                        <th className='border border-gray-300 px-2 py-1 whitespace-normal'>TARIF</th>
                                                        <th className='border border-gray-300 px-2 py-1 whitespace-normal'>PAJAK PENGHASILAN</th>
                                                        <th className='border border-gray-300 px-2 py-1 whitespace-normal'>FASILITAS PERPAJAKAN</th>
                                                        <th className='border border-gray-300 px-2 py-1 whitespace-normal'>UANG PERSEDIAAN / PEMBAYARAN LANGSUNG</th>
                                                        <th className='border border-gray-300 px-2 py-1 whitespace-normal'>NITKU</th>
                                                        <th className='border border-gray-300 px-2 py-1 whitespace-normal'>STATUS</th>
                                                        <th className='border border-gray-300 px-2 py-1 whitespace-normal'>KAP-KJS</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td className='border border-gray-300 px-2 py-1 text-center'>1</td>
                                                        <td className='border border-gray-300 px-2 py-1'>123456789012345</td>
                                                        <td className='border border-gray-300 px-2 py-1'>Budi Santoso</td>
                                                        <td className='border border-gray-300 px-2 py-1'>BP-001/2025</td>
                                                        <td className='border border-gray-300 px-2 py-1'>2025-05-10</td>
                                                        <td className='border border-gray-300 px-2 py-1'>PPh 21</td>
                                                        <td className='border border-gray-300 px-2 py-1'>21-100-01</td>
                                                        <td className='border border-gray-300 px-2 py-1'>Gaji</td>
                                                        <td className='border border-gray-300 px-2 py-1 text-right'>10.000.000</td>
                                                        <td className='border border-gray-300 px-2 py-1 text-right'>5%</td>
                                                        <td className='border border-gray-300 px-2 py-1 text-right'>500.000</td>
                                                        <td className='border border-gray-300 px-2 py-1'>Tidak Ada</td>
                                                        <td className='border border-gray-300 px-2 py-1'>-</td>
                                                        <td className='border border-gray-300 px-2 py-1'>NITKU-001</td>
                                                        <td className='border border-gray-300 px-2 py-1'>Valid</td>
                                                        <td className='border border-gray-300 px-2 py-1'>KAP-001</td>
                                                    </tr>
                                                    <tr>
                                                        <td className='border border-gray-300 px-2 py-1 text-center'>2</td>
                                                        <td className='border border-gray-300 px-2 py-1'>987654321098765</td>
                                                        <td className='border border-gray-300 px-2 py-1'>Siti Aminah</td>
                                                        <td className='border border-gray-300 px-2 py-1'>BP-002/2025</td>
                                                        <td className='border border-gray-300 px-2 py-1'>2025-05-15</td>
                                                        <td className='border border-gray-300 px-2 py-1'>PPh 23</td>
                                                        <td className='border border-gray-300 px-2 py-1'>23-200-02</td>
                                                        <td className='border border-gray-300 px-2 py-1'>Honorarium</td>
                                                        <td className='border border-gray-300 px-2 py-1 text-right'>5.000.000</td>
                                                        <td className='border border-gray-300 px-2 py-1 text-right'>2%</td>
                                                        <td className='border border-gray-300 px-2 py-1 text-right'>100.000</td>
                                                        <td className='border border-gray-300 px-2 py-1'>Ada</td>
                                                        <td className='border border-gray-300 px-2 py-1'>-</td>
                                                        <td className='border border-gray-300 px-2 py-1'>NITKU-002</td>
                                                        <td className='border border-gray-300 px-2 py-1'>Valid</td>
                                                        <td className='border border-gray-300 px-2 py-1'>KAP-002</td>
                                                    </tr>
                                                </tbody>

                                            </table>
                                        </div>
                                    )}
                                    <div className="mt-4">
                                        <div className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full" onClick={() => setShowTabelBPNRUnifikasi(!showTabelBPNRUnifikasi)} >
                                            <h3 className='text-lg font-semibold'>Tabel.II BPNR</h3>
                                            {showTabelBPNRUnifikasi ? <FaChevronUp /> : <FaChevronDown />}
                                        </div>
                                        {showTabelBPNRUnifikasi && (
                                            <div className="border rounded-md p-4 overflow-x-auto w-[1400px]">
                                                <table className='w-[1200px] text-sm text-left border overflow-x-auto'>
                                                    <thead className="bg-purple-700 text-white text-center ">
                                                        <tr>
                                                            <th className='border border-gray-300 px-2 py-1 whitespace-normal'>No</th>
                                                            <th className='border border-gray-300 px-2 py-1 whitespace-normal'>NIK/NPWP</th>
                                                            <th className='border border-gray-300 px-2 py-1 whitespace-normal'>NAMA</th>
                                                            <th className='border border-gray-300 px-2 py-1 whitespace-normal'>NOMOR BUKTI POTONG</th>
                                                            <th className='border border-gray-300 px-2 py-1 whitespace-normal'>TANGGAL BUKTI POTONG</th>
                                                            <th className='border border-gray-300 px-2 py-1 whitespace-normal'>JENIS PAJAK </th>
                                                            <th className='border border-gray-300 px-2 py-1 whitespace-normal'>KODE OBJEK PAJAK</th>
                                                            <th className='border border-gray-300 px-2 py-1 whitespace-normal'>OBJEK PAJAK</th>
                                                            <th className='border border-gray-300 px-2 py-1 whitespace-normal'>DASAR PENGENAAN PAJAK</th>
                                                            <th className='border border-gray-300 px-2 py-1 whitespace-normal'>TARIF</th>
                                                            <th className='border border-gray-300 px-2 py-1 whitespace-normal'>PAJAK PENGHASILAN</th>
                                                            <th className='border border-gray-300 px-2 py-1 whitespace-normal'>FASILITAS PERPAJAKAN</th>
                                                            <th className='border border-gray-300 px-2 py-1 whitespace-normal'>UANG PERSEDIAAN / PEMBAYARAN LANGSUNG</th>
                                                            <th className='border border-gray-300 px-2 py-1 whitespace-normal'>NITKU</th>
                                                            <th className='border border-gray-300 px-2 py-1 whitespace-normal'>STATUS</th>
                                                            <th className='border border-gray-300 px-2 py-1 whitespace-normal'>KAP-KJS</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td className='border border-gray-300 px-2 py-1 text-center'>1</td>
                                                            <td className='border border-gray-300 px-2 py-1'>123456789012345</td>
                                                            <td className='border border-gray-300 px-2 py-1'>Budi Santoso</td>
                                                            <td className='border border-gray-300 px-2 py-1'>BP-001/2025</td>
                                                            <td className='border border-gray-300 px-2 py-1'>2025-05-10</td>
                                                            <td className='border border-gray-300 px-2 py-1'>PPh 21</td>
                                                            <td className='border border-gray-300 px-2 py-1'>21-100-01</td>
                                                            <td className='border border-gray-300 px-2 py-1'>Gaji</td>
                                                            <td className='border border-gray-300 px-2 py-1 text-right'>10.000.000</td>
                                                            <td className='border border-gray-300 px-2 py-1 text-right'>5%</td>
                                                            <td className='border border-gray-300 px-2 py-1 text-right'>500.000</td>
                                                            <td className='border border-gray-300 px-2 py-1'>Tidak Ada</td>
                                                            <td className='border border-gray-300 px-2 py-1'>-</td>
                                                            <td className='border border-gray-300 px-2 py-1'>NITKU-001</td>
                                                            <td className='border border-gray-300 px-2 py-1'>Valid</td>
                                                            <td className='border border-gray-300 px-2 py-1'>KAP-001</td>
                                                        </tr>
                                                        <tr>
                                                            <td className='border border-gray-300 px-2 py-1 text-center'>2</td>
                                                            <td className='border border-gray-300 px-2 py-1'>987654321098765</td>
                                                            <td className='border border-gray-300 px-2 py-1'>Siti Aminah</td>
                                                            <td className='border border-gray-300 px-2 py-1'>BP-002/2025</td>
                                                            <td className='border border-gray-300 px-2 py-1'>2025-05-15</td>
                                                            <td className='border border-gray-300 px-2 py-1'>PPh 23</td>
                                                            <td className='border border-gray-300 px-2 py-1'>23-200-02</td>
                                                            <td className='border border-gray-300 px-2 py-1'>Honorarium</td>
                                                            <td className='border border-gray-300 px-2 py-1 text-right'>5.000.000</td>
                                                            <td className='border border-gray-300 px-2 py-1 text-right'>2%</td>
                                                            <td className='border border-gray-300 px-2 py-1 text-right'>100.000</td>
                                                            <td className='border border-gray-300 px-2 py-1'>Ada</td>
                                                            <td className='border border-gray-300 px-2 py-1'>-</td>
                                                            <td className='border border-gray-300 px-2 py-1'>NITKU-002</td>
                                                            <td className='border border-gray-300 px-2 py-1'>Valid</td>
                                                            <td className='border border-gray-300 px-2 py-1'>KAP-002</td>
                                                        </tr>
                                                    </tbody>
                                                    <tfoot>
                                                        <tr>
                                                            <td colSpan={15} className='border border-gray-300 px-2 py-1 text-right font-bold'>JUMLAH PAJAK PEMERINTAH DITANGGUNG PEMERINTAH DENGAN MENGGUNAKAN PEMBAYARAN LANGSUNG</td>
                                                            <td className='border border-gray-300 px-2 py-1 text-right font-bold'>15.000.000</td>
                                                        </tr>
                                                        <tr>
                                                            <td colSpan={15} className='border border-gray-300 px-2 py-1 text-right font-bold'>JUMLAH PAJAK PEMERINTAH DITANGGUNG PEMERINTAH </td>
                                                            <td className='border border-gray-300 px-2 py-1 text-right font-bold'>15.000.000</td>
                                                        </tr>
                                                        <tr>
                                                            <td colSpan={15} className='border border-gray-300 px-2 py-1 text-right font-bold'>JUMLAH PAJAK PENGHASILAN DITANGGUNG PEMERINTAH DENGAN MENGGUNAKAN PEMBAYARAN LANGSUNG</td>
                                                            <td className='border border-gray-300 px-2 py-1 text-right font-bold'>15.000.000</td>
                                                        </tr>
                                                        <tr>
                                                            <td colSpan={15} className='border border-gray-300 px-2 py-1 text-right font-bold'>JUMLAH PAJAK PENGHASILAN YANG HARUS DI BAYAR</td>
                                                            <td className='border border-gray-300 px-2 py-1 text-right font-bold'>15.000.000</td>
                                                        </tr>
                                                    </tfoot>
                                                </table>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end items-center mt-4">
                                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                                    Simpan
                                </button>
                            </div>
                        </TabsContent>
                        <TabsContent value="l-ib">

                            <div className="mt-4">
                                <div className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full" onClick={() => setShowHeadera2(!showHeadera2)}>
                                    <h3 className='text-lg font-semibold'>Header</h3>
                                    {showHeadera2 ? <FaChevronUp /> : <FaChevronDown />}
                                </div>
                                {showHeadera2 && (
                                    <div className="border rounded-md p-4 mb-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                            <div>
                                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">NPWP</label>
                                                <input
                                                    type="text"
                                                    readOnly
                                                    value="2002909301990"
                                                    className='w-full p-2 border rounded-md bg-gray-100 text-gray-600'
                                                />
                                            </div>
                                            <div>
                                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Masa Pajak</label>
                                                <input
                                                    type="text"
                                                    readOnly
                                                    value="2025"
                                                    className='w-full p-2 border rounded-md bg-gray-100 text-gray-600'
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full" onClick={() => setShowTabelDaftarPPh(!showTabelDaftarPPh)} >
                                    <h3 className='text-lg font-semibold'>Tabel.I DAFTAR PPh YANG DIBAYAR SENDIRI DAN/ ATAU DISETOR SENDIRI</h3>
                                    {showTabelDaftarPPh ? <FaChevronUp /> : <FaChevronDown />}
                                </div>
                                {showTabelDaftarPPh && (
                                    <div className="border rounded-md p-4 overflow-x-auto w-[1400px]">
                                        <table className='w-[1200px] text-sm text-left border overflow-x-auto'>
                                            <thead className="bg-purple-700 text-white text-center ">
                                                <tr>
                                                    <th className='border border-gray-300 px-2 py-1 whitespace-normal'>No</th>
                                                    <th className='border border-gray-300 px-2 py-1 whitespace-normal'>NIK/NPWP</th>
                                                    <th className='border border-gray-300 px-2 py-1 whitespace-normal'>NAMA</th>
                                                    <th className='border border-gray-300 px-2 py-1 whitespace-normal'>NOMOR BUKTI POTONG</th>
                                                    <th className='border border-gray-300 px-2 py-1 whitespace-normal'>TANGGAL BUKTI POTONG</th>
                                                    <th className='border border-gray-300 px-2 py-1 whitespace-normal'>JENIS PAJAK </th>
                                                    <th className='border border-gray-300 px-2 py-1 whitespace-normal'>KODE OBJEK PAJAK</th>
                                                    <th className='border border-gray-300 px-2 py-1 whitespace-normal'>OBJEK PAJAK</th>
                                                    <th className='border border-gray-300 px-2 py-1 whitespace-normal'>DASAR PENGENAAN PAJAK</th>
                                                    <th className='border border-gray-300 px-2 py-1 whitespace-normal'>TARIF</th>
                                                    <th className='border border-gray-300 px-2 py-1 whitespace-normal'>PAJAK PENGHASILAN</th>
                                                    <th className='border border-gray-300 px-2 py-1 whitespace-normal'>FASILITAS PERPAJAKAN</th>
                                                    <th className='border border-gray-300 px-2 py-1 whitespace-normal'>UANG PERSEDIAAN / PEMBAYARAN LANGSUNG</th>
                                                    <th className='border border-gray-300 px-2 py-1 whitespace-normal'>NITKU</th>
                                                    <th className='border border-gray-300 px-2 py-1 whitespace-normal'>STATUS</th>
                                                    <th className='border border-gray-300 px-2 py-1 whitespace-normal'>KAP-KJS</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className='border border-gray-300 px-2 py-1 text-center'>1</td>
                                                    <td className='border border-gray-300 px-2 py-1'>123456789012345</td>
                                                    <td className='border border-gray-300 px-2 py-1'>Budi Santoso</td>
                                                    <td className='border border-gray-300 px-2 py-1'>BP-001/2025</td>
                                                    <td className='border border-gray-300 px-2 py-1'>2025-05-10</td>
                                                    <td className='border border-gray-300 px-2 py-1'>PPh 21</td>
                                                    <td className='border border-gray-300 px-2 py-1'>21-100-01</td>
                                                    <td className='border border-gray-300 px-2 py-1'>Gaji</td>
                                                    <td className='border border-gray-300 px-2 py-1 text-right'>10.000.000</td>
                                                    <td className='border border-gray-300 px-2 py-1 text-right'>5%</td>
                                                    <td className='border border-gray-300 px-2 py-1 text-right'>500.000</td>
                                                    <td className='border border-gray-300 px-2 py-1'>Tidak Ada</td>
                                                    <td className='border border-gray-300 px-2 py-1'>-</td>
                                                    <td className='border border-gray-300 px-2 py-1'>NITKU-001</td>
                                                    <td className='border border-gray-300 px-2 py-1'>Valid</td>
                                                    <td className='border border-gray-300 px-2 py-1'>KAP-001</td>
                                                </tr>
                                                <tr>
                                                    <td className='border border-gray-300 px-2 py-1 text-center'>2</td>
                                                    <td className='border border-gray-300 px-2 py-1'>987654321098765</td>
                                                    <td className='border border-gray-300 px-2 py-1'>Siti Aminah</td>
                                                    <td className='border border-gray-300 px-2 py-1'>BP-002/2025</td>
                                                    <td className='border border-gray-300 px-2 py-1'>2025-05-15</td>
                                                    <td className='border border-gray-300 px-2 py-1'>PPh 23</td>
                                                    <td className='border border-gray-300 px-2 py-1'>23-200-02</td>
                                                    <td className='border border-gray-300 px-2 py-1'>Honorarium</td>
                                                    <td className='border border-gray-300 px-2 py-1 text-right'>5.000.000</td>
                                                    <td className='border border-gray-300 px-2 py-1 text-right'>2%</td>
                                                    <td className='border border-gray-300 px-2 py-1 text-right'>100.000</td>
                                                    <td className='border border-gray-300 px-2 py-1'>Ada</td>
                                                    <td className='border border-gray-300 px-2 py-1'>-</td>
                                                    <td className='border border-gray-300 px-2 py-1'>NITKU-002</td>
                                                    <td className='border border-gray-300 px-2 py-1'>Valid</td>
                                                    <td className='border border-gray-300 px-2 py-1'>KAP-002</td>
                                                </tr>
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <td colSpan={15} className='border border-gray-300 px-2 py-1 text-right font-bold'>JUMLAH PPh YANG DITANGGUNG PEMERINTAH</td>
                                                    <td className='border border-gray-300 px-2 py-1 text-right font-bold'>15.000.000</td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={15} className='border border-gray-300 px-2 py-1 text-right font-bold'>JUMLAH PPh YANG HARUS DIBAYAR</td>
                                                    <td className='border border-gray-300 px-2 py-1 text-right font-bold'>15.000.000</td>
                                                </tr>

                                            </tfoot>
                                        </table>
                                    </div>
                                )}
                                <div className="mt-4">
                                    <div className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full" onClick={() => setShowTabelDaftarPajakPenghasilan(!showTabelDaftarPajakPenghasilan)} >
                                        <h3 className='text-lg font-semibold'>Tabel.II DAFTAR PAJAK PENGHASILAN - PEMBAYARAN KUMULATIF</h3>
                                        {showTabelDaftarPajakPenghasilan ? <FaChevronUp /> : <FaChevronDown />}
                                    </div>
                                    {showTabelDaftarPajakPenghasilan && (
                                        <div className="border rounded-md p-4 overflow-x-auto w-[1400px]">
                                            <table className='w-[1200px] text-sm text-left border overflow-x-auto'>
                                                <thead className="bg-purple-700 text-white text-center ">
                                                    <tr>
                                                        <th className='border border-gray-300 px-2 py-1 whitespace-normal'>No</th>
                                                        <th className='border border-gray-300 px-2 py-1 whitespace-normal'>NIK/NPWP</th>
                                                        <th className='border border-gray-300 px-2 py-1 whitespace-normal'>NAMA</th>
                                                        <th className='border border-gray-300 px-2 py-1 whitespace-normal'>NOMOR BUKTI POTONG</th>
                                                        <th className='border border-gray-300 px-2 py-1 whitespace-normal'>TANGGAL BUKTI POTONG</th>
                                                        <th className='border border-gray-300 px-2 py-1 whitespace-normal'>JENIS PAJAK </th>
                                                        <th className='border border-gray-300 px-2 py-1 whitespace-normal'>KODE OBJEK PAJAK</th>
                                                        <th className='border border-gray-300 px-2 py-1 whitespace-normal'>OBJEK PAJAK</th>
                                                        <th className='border border-gray-300 px-2 py-1 whitespace-normal'>DASAR PENGENAAN PAJAK</th>
                                                        <th className='border border-gray-300 px-2 py-1 whitespace-normal'>TARIF</th>
                                                        <th className='border border-gray-300 px-2 py-1 whitespace-normal'>PAJAK PENGHASILAN</th>
                                                        <th className='border border-gray-300 px-2 py-1 whitespace-normal'>FASILITAS PERPAJAKAN</th>
                                                        <th className='border border-gray-300 px-2 py-1 whitespace-normal'>UANG PERSEDIAAN / PEMBAYARAN LANGSUNG</th>
                                                        <th className='border border-gray-300 px-2 py-1 whitespace-normal'>NITKU</th>
                                                        <th className='border border-gray-300 px-2 py-1 whitespace-normal'>STATUS</th>
                                                        <th className='border border-gray-300 px-2 py-1 whitespace-normal'>KAP-KJS</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td className='border border-gray-300 px-2 py-1 text-center'>1</td>
                                                        <td className='border border-gray-300 px-2 py-1'>123456789012345</td>
                                                        <td className='border border-gray-300 px-2 py-1'>Budi Santoso</td>
                                                        <td className='border border-gray-300 px-2 py-1'>BP-001/2025</td>
                                                        <td className='border border-gray-300 px-2 py-1'>2025-05-10</td>
                                                        <td className='border border-gray-300 px-2 py-1'>PPh 21</td>
                                                        <td className='border border-gray-300 px-2 py-1'>21-100-01</td>
                                                        <td className='border border-gray-300 px-2 py-1'>Gaji</td>
                                                        <td className='border border-gray-300 px-2 py-1 text-right'>10.000.000</td>
                                                        <td className='border border-gray-300 px-2 py-1 text-right'>5%</td>
                                                        <td className='border border-gray-300 px-2 py-1 text-right'>500.000</td>
                                                        <td className='border border-gray-300 px-2 py-1'>Tidak Ada</td>
                                                        <td className='border border-gray-300 px-2 py-1'>-</td>
                                                        <td className='border border-gray-300 px-2 py-1'>NITKU-001</td>
                                                        <td className='border border-gray-300 px-2 py-1'>Valid</td>
                                                        <td className='border border-gray-300 px-2 py-1'>KAP-001</td>
                                                    </tr>
                                                    <tr>
                                                        <td className='border border-gray-300 px-2 py-1 text-center'>2</td>
                                                        <td className='border border-gray-300 px-2 py-1'>987654321098765</td>
                                                        <td className='border border-gray-300 px-2 py-1'>Siti Aminah</td>
                                                        <td className='border border-gray-300 px-2 py-1'>BP-002/2025</td>
                                                        <td className='border border-gray-300 px-2 py-1'>2025-05-15</td>
                                                        <td className='border border-gray-300 px-2 py-1'>PPh 23</td>
                                                        <td className='border border-gray-300 px-2 py-1'>23-200-02</td>
                                                        <td className='border border-gray-300 px-2 py-1'>Honorarium</td>
                                                        <td className='border border-gray-300 px-2 py-1 text-right'>5.000.000</td>
                                                        <td className='border border-gray-300 px-2 py-1 text-right'>2%</td>
                                                        <td className='border border-gray-300 px-2 py-1 text-right'>100.000</td>
                                                        <td className='border border-gray-300 px-2 py-1'>Ada</td>
                                                        <td className='border border-gray-300 px-2 py-1'>-</td>
                                                        <td className='border border-gray-300 px-2 py-1'>NITKU-002</td>
                                                        <td className='border border-gray-300 px-2 py-1'>Valid</td>
                                                        <td className='border border-gray-300 px-2 py-1'>KAP-002</td>
                                                    </tr>
                                                </tbody>
                                                <tfoot>
                                                    <tr>
                                                        <td colSpan={15} className='border border-gray-300 px-2 py-1 text-right font-bold'>JUMLAH PPh YANG HARUS DIBAYAR</td>
                                                        <td className='border border-gray-300 px-2 py-1 text-right font-bold'>15.000.000</td>
                                                    </tr>
                                                    
                                                </tfoot>
                                            </table>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="l-ii">
                            <div className="mt-4">
                                <div className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full" onClick={() => setShowHeaderb1(!showHeaderb1)}>
                                    <h3 className='text-lg font-semibold'>Header</h3>
                                    {showHeaderb1 ? <FaChevronUp /> : <FaChevronDown />}
                                </div>
                                {showHeaderb1 && (
                                    <div className="border rounded-md p-4 mb-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">NPWP</label>
                                                <input
                                                    type="text"
                                                    readOnly
                                                    value="2002909301990"
                                                    className='w-full p-2 border rounded-md bg-gray-100 text-gray-600'
                                                />
                                            </div>
                                            <div>
                                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Masa Pajak</label>
                                                <input
                                                    type="text"
                                                    readOnly
                                                    value="2025"
                                                    className='w-full p-2 border rounded-md bg-gray-100 text-gray-600'
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div className="border rounded-md p-4 mb-4">
                                    <div className="border rounded-md p-4 mb-4 font-semibold">
                                        TABEL I. ATC
                                    </div>
                                    <div className="border rounded-md p-4 overflow-x-auto w-[1400px]">
                                        <table className='w-[1200px] text-sm text-left border overflow-x-auto'>
                                            <thead className="bg-purple-700 text-white text-center ">
                                                <tr>
                                                    <th className='border border-gray-300 px-2 py-1 whitespace-normal'>No</th>
                                                    <th className='border border-gray-300 px-2 py-1 whitespace-normal'>NIK/NPWP PENERIMA PENGHASILAN</th>
                                                    <th className='border border-gray-300 px-2 py-1 whitespace-normal'>NAMA PENERIMA PENGHASILAN</th>
                                                    <th className='border border-gray-300 px-2 py-1 whitespace-normal'>IDENTITAS AKUN PENERIMA PENGHASILAN</th>
                                                    <th className='border border-gray-300 px-2 py-1 whitespace-normal'>NIK/NPWP PEMBERI PENGHASILAN </th>
                                                    <th className='border border-gray-300 px-2 py-1 whitespace-normal'>NAMA PEMBERI PENGHASILAN </th>
                                                    <th className='border border-gray-300 px-2 py-1 whitespace-normal'>IDENTITAS AKUN PEMBERI PENGHASILAN</th>
                                                    <th className='border border-gray-300 px-2 py-1 whitespace-normal'>KODE OBJEK PAJAK</th>
                                                    <th className='border border-gray-300 px-2 py-1 whitespace-normal'>NOMOR DOKUMEN </th>
                                                    <th className='border border-gray-300 px-2 py-1 whitespace-normal'>TANGGAL DOKUMEN</th>
                                                    <th className='border border-gray-300 px-2 py-1 whitespace-normal'>DASAR PENGENAAN PAJAK(Rp)</th>
                                                    <th className='border border-gray-300 px-2 py-1 whitespace-normal'>TARIF %</th>
                                                    <th className='border border-gray-300 px-2 py-1 whitespace-normal'>PAJAK PENGHASILAN(Rp)</th>
                                                    <th className='border border-gray-300 px-2 py-1 whitespace-normal'>FASILITAS PERPAJAKAN</th>
                                                    <th className='border border-gray-300 px-2 py-1 whitespace-normal'>NITKU</th>
                                                    <th className='border border-gray-300 px-2 py-1 whitespace-normal'>STATUS</th>
                                                    <th className='border border-gray-300 px-2 py-1 whitespace-normal'>KAP-KJS</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className='border border-gray-300 px-2 py-1 text-center'>1</td>
                                                    <td className='border border-gray-300 px-2 py-1'>123456789012345</td>
                                                    <td className='border border-gray-300 px-2 py-1'>Budi Santoso</td>
                                                    <td className='border border-gray-300 px-2 py-1'>akun-budi</td>
                                                    <td className='border border-gray-300 px-2 py-1'>543210987654321</td>
                                                    <td className='border border-gray-300 px-2 py-1'>PT Maju Jaya</td>
                                                    <td className='border border-gray-300 px-2 py-1'>akun-majujaya</td>
                                                    <td className='border border-gray-300 px-2 py-1'>21-100-01</td>
                                                    <td className='border border-gray-300 px-2 py-1'>DOC-001/2025</td>
                                                    <td className='border border-gray-300 px-2 py-1'>2025-05-10</td>
                                                    <td className='border border-gray-300 px-2 py-1 text-right'>10.000.000</td>
                                                    <td className='border border-gray-300 px-2 py-1 text-right'>5</td>
                                                    <td className='border border-gray-300 px-2 py-1 text-right'>500.000</td>
                                                    <td className='border border-gray-300 px-2 py-1'>Tidak Ada</td>
                                                    <td className='border border-gray-300 px-2 py-1'>NITKU-001</td>
                                                    <td className='border border-gray-300 px-2 py-1'>Valid</td>
                                                    <td className='border border-gray-300 px-2 py-1'>KAP-001</td>
                                                </tr>
                                                <tr>
                                                    <td className='border border-gray-300 px-2 py-1 text-center'>2</td>
                                                    <td className='border border-gray-300 px-2 py-1'>987654321098765</td>
                                                    <td className='border border-gray-300 px-2 py-1'>Siti Aminah</td>
                                                    <td className='border border-gray-300 px-2 py-1'>akun-siti</td>
                                                    <td className='border border-gray-300 px-2 py-1'>678905432109876</td>
                                                    <td className='border border-gray-300 px-2 py-1'>PT Sejahtera</td>
                                                    <td className='border border-gray-300 px-2 py-1'>akun-sejahtera</td>
                                                    <td className='border border-gray-300 px-2 py-1'>23-200-02</td>
                                                    <td className='border border-gray-300 px-2 py-1'>DOC-002/2025</td>
                                                    <td className='border border-gray-300 px-2 py-1'>2025-05-15</td>
                                                    <td className='border border-gray-300 px-2 py-1 text-right'>5.000.000</td>
                                                    <td className='border border-gray-300 px-2 py-1 text-right'>2</td>
                                                    <td className='border border-gray-300 px-2 py-1 text-right'>100.000</td>
                                                    <td className='border border-gray-300 px-2 py-1'>Ada</td>
                                                    <td className='border border-gray-300 px-2 py-1'>NITKU-002</td>
                                                    <td className='border border-gray-300 px-2 py-1'>Valid</td>
                                                    <td className='border border-gray-300 px-2 py-1'>KAP-002</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                
                            </div>
                        </TabsContent>
                        
                    </Tabs>
                </div>
            </div>
        </div>

    )
}

export default CreateKonsepUnifikasi