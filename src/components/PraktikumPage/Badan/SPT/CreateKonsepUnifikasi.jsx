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
                            <TabsTrigger value="l-ia">L-IA</TabsTrigger>
                            <TabsTrigger value="l-ib">L-IB</TabsTrigger>
                            <TabsTrigger value="l-ii">L-II</TabsTrigger>
                            <TabsTrigger value="l-iii">L-III</TabsTrigger>
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
                                    <h3 className='text-lg font-semibold'>2. Pajak Penghasilan Pasal 21</h3>
                                    {showPajakPenghasilan21 ? <FaChevronUp /> : <FaChevronDown />}
                                </div>
                                {showPajakPenghasilan21 && (
                                    <div className="border rounded-md p-4 overflow-x-auto">
                                        <div className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full">
                                            <h3 className='text-lg font-semibold'>I. Pajak Penghasilan Pasal 21 yang dipotong</h3>
                                        </div>
                                        <table className='min-w-full text-sm text-left border overflow-x-auto'>
                                            <thead className="bg-purple-700 text-white text-center">
                                                <tr>
                                                    <th className="p-2 min-w-[10px]">No</th>
                                                    <th className="p-2 min-w-[200px]">Uraian</th>
                                                    <th className="p-2 min-w-[100px]">KAP-KJS</th>
                                                    <th className="p-2 min-w-[100px]">Jumlah(RP)</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className='border-b'>
                                                    <td className='p-2 whitespace-normal break-words text-sm text-center'>
                                                        1
                                                    </td>
                                                    <td className='p-2 whitespace-normal break-words text-sm text-center'>
                                                        Pajak Penghasilan Pasal 21 Yang dilakukan Pemotongan
                                                    </td>
                                                    <td className='p-2 whitespace-normal break-words text-sm text-center'>
                                                        0
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm bg-gray-100"
                                                            defaultValue="0"
                                                            disabled
                                                        />
                                                    </td>
                                                </tr>
                                                <tr className='border-b'>
                                                    <td className='p-2 whitespace-normal break-words text-sm text-center'>
                                                        2
                                                    </td>
                                                    <td className='p-2 whitespace-normal break-words text-sm text-center'>
                                                        Penyerahan Kelebihan Pembayaran Pajak Penghasilan <br /> Pasal 21 dari Periode Sebelumnya
                                                    </td>
                                                    <td className='p-2 whitespace-normal break-words text-sm text-center'>
                                                        0
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm bg-gray-100"
                                                            defaultValue="0"
                                                            disabled
                                                        />
                                                    </td>
                                                </tr>
                                                <tr className='border-b'>
                                                    <td className='p-2 whitespace-normal break-words text-sm text-center'>
                                                        3
                                                    </td>
                                                    <td className='p-2 whitespace-normal break-words text-sm text-center'>
                                                        Pembayaran Pajak Penghasilan <br /> Dengan SP2D (Hanya Untuk Instansi Pemerintah)
                                                    </td>
                                                    <td className='p-2 whitespace-normal break-words text-sm text-center'>
                                                        0
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm bg-gray-100"
                                                            defaultValue="0"
                                                            disabled
                                                        />
                                                    </td>
                                                </tr>
                                                <tr className='border-b'>
                                                    <td className='p-2 whitespace-normal break-words text-sm text-center'>
                                                        4
                                                    </td>
                                                    <td className='p-2 whitespace-normal break-words text-sm text-center'>
                                                        Pajak Penghasilan Pasal 21 Yang Kurang (Lebih Bayar)<br /> (1-2-3) (Setiap Kelebihan Pembayaran akan Diteruskan )
                                                    </td>
                                                    <td className='p-2 whitespace-normal break-words text-sm text-center'>
                                                        0
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm bg-gray-100"
                                                            defaultValue="0"
                                                            disabled
                                                        />
                                                    </td>
                                                </tr>
                                                <tr className='border-b'>
                                                    <td className='p-2 whitespace-normal break-words text-sm text-center'>
                                                        5
                                                    </td>
                                                    <td className='p-2 whitespace-normal break-words text-sm text-center'>
                                                        Pajak Penghasilan Pasal 21<br /> Yang Dibayar Pada SPT yang Diperbaiki
                                                    </td>
                                                    <td className='p-2 whitespace-normal break-words text-sm text-center'>
                                                        0
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm bg-gray-100"
                                                            defaultValue="0"
                                                            disabled
                                                        />
                                                    </td>
                                                </tr>
                                                <tr className='border-b'>
                                                    <td className='p-2 whitespace-normal break-words text-sm text-center'>
                                                        6
                                                    </td>
                                                    <td className='p-2 whitespace-normal break-words text-sm text-center'>
                                                        Pajak Penghasilan Pasal 21 Yang Kurang (Lebih Bayar)<br /> Akibat Perbaikan(4-5)(Setiap Kelebihan Pembayaran akan diteruskan)
                                                    </td>
                                                    <td className='p-2 whitespace-normal break-words text-sm text-center'>
                                                        0
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm bg-gray-100"
                                                            defaultValue="0"
                                                            disabled
                                                        />
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full mt-4">
                                            <h3 className='text-lg font-semibold'>II. Pajak Penghasilan Pasal 21 yang Ditanggung Pemerintah</h3>
                                        </div>
                                        <table className='min-w-full text-sm text-left border overflow-x-auto'>
                                            <thead className="bg-purple-700 text-white text-center">
                                                <tr>
                                                    <th className="p-2 min-w-[10px]">No</th>
                                                    <th className="p-2 min-w-[200px]">Uraian</th>
                                                    <th className="p-2 min-w-[100px]">KAP-KJS</th>
                                                    <th className="p-2 min-w-[100px]">Jumlah(RP)</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className='border-b'>
                                                    <td className='p-2 whitespace-normal break-words text-sm text-center'>
                                                        1
                                                    </td>
                                                    <td className='p-2 whitespace-normal break-words text-sm text-center'>
                                                        Pajak Penghasilan Pasal 21 ditanggung Pemerintah
                                                    </td>
                                                    <td className='p-2 whitespace-normal break-words text-sm text-center'>
                                                        0
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm bg-gray-100"
                                                            defaultValue="0"
                                                            disabled
                                                        />
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                                <div className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full" onClick={() => setShowPajakPenghasilan26(!showPajakPenghasilan26)}>
                                    <h3 className='text-lg font-semibold'>3. Pajak Penghasilan Pasal 26</h3>
                                    {showPajakPenghasilan26 ? <FaChevronUp /> : <FaChevronDown />}
                                </div>
                                {showPajakPenghasilan26 && (
                                    <div className="border rounded-md p-4 overflow-x-auto">
                                        <div className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full">
                                            <h3 className='text-lg font-semibold'>I. Pajak Penghasilan Pasal 26 yang dipotong</h3>
                                        </div>
                                        <table className='min-w-full text-sm text-left border overflow-x-auto'>
                                            <thead className="bg-purple-700 text-white text-center">
                                                <tr>
                                                    <th className="p-2 min-w-[10px]">No</th>
                                                    <th className="p-2 min-w-[200px]">Uraian</th>
                                                    <th className="p-2 min-w-[100px]">KAP-KJS</th>
                                                    <th className="p-2 min-w-[100px]">Jumlah(RP)</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className='border-b'>
                                                    <td className='p-2 whitespace-normal break-words text-sm text-center'>
                                                        1
                                                    </td>
                                                    <td className='p-2 whitespace-normal break-words text-sm text-center'>
                                                        Pajak Penghasilan Pasal 26 Yang dilakukan Pemotongan
                                                    </td>
                                                    <td className='p-2 whitespace-normal break-words text-sm text-center'>
                                                        0
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm bg-gray-100"
                                                            defaultValue="0"
                                                            disabled
                                                        />
                                                    </td>
                                                </tr>
                                                <tr className='border-b'>
                                                    <td className='p-2 whitespace-normal break-words text-sm text-center'>
                                                        2
                                                    </td>
                                                    <td className='p-2 whitespace-normal break-words text-sm text-center'>
                                                        Penyerahan Kelebihan Pembayaran Pajak Penghasilan <br /> Pasal 26 dari Periode Sebelumnya
                                                    </td>
                                                    <td className='p-2 whitespace-normal break-words text-sm text-center'>
                                                        0
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm bg-gray-100"
                                                            defaultValue="0"
                                                            disabled
                                                        />
                                                    </td>
                                                </tr>
                                                <tr className='border-b'>
                                                    <td className='p-2 whitespace-normal break-words text-sm text-center'>
                                                        3
                                                    </td>
                                                    <td className='p-2 whitespace-normal break-words text-sm text-center'>
                                                        Pembayaran Pajak Penghasilan Pasal 26<br /> Dengan SP2D (Hanya Untuk Instansi Pemerintah)
                                                    </td>
                                                    <td className='p-2 whitespace-normal break-words text-sm text-center'>
                                                        0
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm bg-gray-100"
                                                            defaultValue="0"
                                                            disabled
                                                        />
                                                    </td>
                                                </tr>
                                                <tr className='border-b'>
                                                    <td className='p-2 whitespace-normal break-words text-sm text-center'>
                                                        4
                                                    </td>
                                                    <td className='p-2 whitespace-normal break-words text-sm text-center'>
                                                        Pajak Penghasilan Pasal 26 Yang Kurang (Lebih Bayar)<br /> (1-2-3) (Setiap Kelebihan Pembayaran akan Diteruskan )
                                                    </td>
                                                    <td className='p-2 whitespace-normal break-words text-sm text-center'>
                                                        0
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm bg-gray-100"
                                                            defaultValue="0"
                                                            disabled
                                                        />
                                                    </td>
                                                </tr>
                                                <tr className='border-b'>
                                                    <td className='p-2 whitespace-normal break-words text-sm text-center'>
                                                        5
                                                    </td>
                                                    <td className='p-2 whitespace-normal break-words text-sm text-center'>
                                                        Pajak Penghasilan Pasal 26<br /> Yang Dibayar Pada SPT yang Diperbaiki
                                                    </td>
                                                    <td className='p-2 whitespace-normal break-words text-sm text-center'>
                                                        0
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm bg-gray-100"
                                                            defaultValue="0"
                                                            disabled
                                                        />
                                                    </td>
                                                </tr>
                                                <tr className='border-b'>
                                                    <td className='p-2 whitespace-normal break-words text-sm text-center'>
                                                        6
                                                    </td>
                                                    <td className='p-2 whitespace-normal break-words text-sm text-center'>
                                                        Pajak Penghasilan Pasal 26 Yang Kurang (Lebih Bayar)<br /> Akibat Perbaikan(4-5)(Setiap Kelebihan Pembayaran akan diteruskan)
                                                    </td>
                                                    <td className='p-2 whitespace-normal break-words text-sm text-center'>
                                                        0
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm bg-gray-100"
                                                            defaultValue="0"
                                                            disabled
                                                        />
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full mt-4">
                                            <h3 className='text-lg font-semibold'>II. Pajak Penghasilan Pasal 26 yang Ditanggung Pemerintah</h3>
                                        </div>
                                        <table className='min-w-full text-sm text-left border overflow-x-auto'>
                                            <thead className="bg-purple-700 text-white text-center">
                                                <tr>
                                                    <th className="p-2 min-w-[10px]">No</th>
                                                    <th className="p-2 min-w-[200px]">Uraian</th>
                                                    <th className="p-2 min-w-[100px]">KAP-KJS</th>
                                                    <th className="p-2 min-w-[100px]">Jumlah(RP)</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className='border-b'>
                                                    <td className='p-2 whitespace-normal break-words text-sm text-center'>
                                                        1
                                                    </td>
                                                    <td className='p-2 whitespace-normal break-words text-sm text-center'>
                                                        Pajak Penghasilan Pasal 26 ditanggung Pemerintah
                                                    </td>
                                                    <td className='p-2 whitespace-normal break-words text-sm text-center'>
                                                        0
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm bg-gray-100"
                                                            defaultValue="0"
                                                            disabled
                                                        />
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                                <div className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full" onClick={() => setShowPernyataan(!showPernyataan)}>
                                    <h3 className='text-lg font-semibold'>4. Pernyataan</h3>
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
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-lg font-light text-yellow-500 mt-4">DAFTAR PEMOTONGAN BULANAN PAJAK PENGHASILAN PASAL 21 BAGI PEGAWAI TETAP DAN PENSIUNAN YANG MENERIMA UANG TERKAIT PENSIUN SECARA BERKALA SERTA BAGI PEGAWAI
                                    NEGERI SIPIL, ANGGOTA TENTARA NASIONAL INDONESIA, ANGGOTA KEPOLISIAN REPUBLIK INDONESIA, PEJABAT NEGARA DAN PENSIUNANNYA
                                </h2>
                            </div>
                            <div className="mt-4">
                                <div className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full" onClick={() => setShowHeadera1(!showHeadera1)}>
                                    <h3 className='text-lg font-semibold'>Header</h3>
                                    {showHeadera1 ? <FaChevronUp /> : <FaChevronDown />}
                                </div>
                                {showHeadera1 && (
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
                                    <div className="w-[1450px] overflow-x-auto bg-white shadow-md rounded-lg overflow-hidden">
                                        <table className="table-auto text-sm text-left border overflow-hidden">
                                            <thead className="bg-purple-700 text-white text-center">
                                                <tr>
                                                    <th className="p-2 border-b ">No</th>
                                                    <th className="p-2 border-b min-w-[200px]">NIK/NPWP</th>
                                                    <th className="p-2  border-b min-w-[150px]">Nama</th>
                                                    <th className="p-2 border-b min-w-[150px]">Nomor Bukti Potong </th>
                                                    <th className="p-2 border-b min-w-[150px]">Tanggal Bukti Pemotongan </th>
                                                    <th className="p-2 border-b min-w-[150px]">Kode Objek Pajak</th>
                                                    <th className="p-2 border-b min-w-[150px]">Penghasilan Bruto (Rp)</th>
                                                    <th className="p-2 border-b min-w-[150px]">Pajak Penghasilan (Rp)</th>
                                                </tr>
                                            </thead>
                                            <tbody className="text-gray-600 text-center">
                                                <tr>
                                                    <td className="p-2 border-b text-center">1</td>
                                                    <td className="p-2 border-b">881381978971381309</td>
                                                    <td className="p-2 border-b">-</td>
                                                    <td className="p-2 border-b">-</td>
                                                    <td className="p-2 border-b">-</td>
                                                    <td className="p-2 border-b">-</td>
                                                    <td className="p-2 border-b">-</td>
                                                    <td className="p-2 border-b">-</td>
                                                </tr>
                                            </tbody>
                                            <tfoot className="text-gray-800 font-semibold bg-gray-100">
                                                <tr>
                                                    <td className="p-2 text-right min-w-[150px]" colSpan={7}>Jumlah Pendapatan Kotor dan Pajak Penghasilan Yang Ditanggung Oleh Pemerintah</td>
                                                    <td className="p-2 text-center">0</td>
                                                    <td className="p-2"></td>
                                                </tr>
                                                <tr>
                                                    <td className="p-2 text-right min-w-[150px]" colSpan={7}>Jumlah Pendapatan Kotor dan Pajak Penghasilan Yang Dipotong</td>
                                                    <td className="p-2 text-center">0</td>
                                                    <td className="p-2"></td>
                                                </tr>
                                                <tr>
                                                    <td className="p-2 text-right min-w-[150px]" colSpan={7}>Jumlah Total Pendapatan Kotor Dan Pajak Penghasilan Yang Ditanggung Oleh Pemerintah <br /> serta Pajak penghasilan Yang Dipotong</td>
                                                    <td className="p-2 text-center">0</td>
                                                    <td className="p-2"></td>
                                                </tr>
                                            </tfoot>
                                        </table>
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
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-lg font-light text-yellow-500 mt-4">DAFTAR PEMOTONGAN PAJAK PENGHASILAN PASAL 21 BAGI PEGAWAI TETAP DAN PENSIUNAN YANG MENERIMA UANG TERKAIT PENSIUN SECARA BERKALA SERTA BAGI PEGAWAI NEGERI SIPIL,
                                    ANGGOTA TENTARA NASIONAL INDONESIA, ANGGOTA KEPOLISIAN REPUBLIK INDONESIA, PEJABAT NEGARA, DAN PENSIUNANNYA UNTUK MASA PAJAK TERAKKHIR
                                </h2>
                            </div>
                            <div className="mt-4">
                                <div className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full" onClick={() => setShowHeadera2(!showHeadera2)}>
                                    <h3 className='text-lg font-semibold'>Header</h3>
                                    {showHeadera2 ? <FaChevronUp /> : <FaChevronDown />}
                                </div>
                                {showHeadera2 && (
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
                                        BPA1
                                    </div>
                                    <div className="w-[1400px] overflow-x-auto bg-white shadow-md rounded-lg overflow-hidden">
                                        <table className="table-auto text-sm text-left border overflow-hidden">
                                            <thead className="bg-purple-700 text-white text-center">
                                                <tr>
                                                    <th className="p-2 border-b ">No</th>
                                                    <th className="p-2 border-b min-w-[200px]">NIK/NPWP</th>
                                                    <th className="p-2  border-b min-w-[150px]">Nama</th>
                                                    <th className="p-2 border-b min-w-[150px]">Nomor Bukti Potong </th>
                                                    <th className="p-2 border-b min-w-[150px]">Tanggal Bukti Pemotongan </th>
                                                    <th className="p-2 border-b min-w-[150px]">Kode Objek Pajak</th>
                                                    <th className="p-2 border-b min-w-[150px]">Penghasilan Bruto (Rp)</th>
                                                    <th className="p-2 border-b min-w-[150px]">Pajak Penghasilan (Rp)</th>
                                                    <th className="p-2 border-b min-w-[150px]">Fasilitas Perpajakan</th>
                                                    <th className="p-2 border-b min-w-[150px]">Negara</th>
                                                    <th className="p-2 border-b min-w-[150px]">ID Tempat Kegiatan Usaha</th>
                                                    <th className="p-2 border-b min-w-[150px]">KAP-KJS</th>
                                                    <th className="p-2 border-b min-w-[150px]">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody className="text-gray-600 text-center">
                                                <tr>
                                                    <td className="p-2 border-b text-center">1</td>
                                                    <td className="p-2 border-b">881381978971381309</td>
                                                    <td className="p-2 border-b">-</td>
                                                    <td className="p-2 border-b">-</td>
                                                    <td className="p-2 border-b">-</td>
                                                    <td className="p-2 border-b">-</td>
                                                    <td className="p-2 border-b">-</td>
                                                    <td className="p-2 border-b">-</td>
                                                    <td className="p-2 border-b">-</td>
                                                    <td className="p-2 border-b">-</td>
                                                    <td className="p-2 border-b">-</td>
                                                    <td className="p-2 border-b">-</td>
                                                    <td className="p-2 border-b">-</td>
                                                </tr>
                                            </tbody>
                                            {/* <tfoot className="text-gray-800 font-semibold bg-gray-100">
                                                   <tr>
                                                       <td className="p-2 text-right min-w-[150px]" colSpan={11}>Jumlah Pendapatan Kotor dan Pajak Penghasilan Yang Ditanggung Oleh Pemerintah</td>
                                                       <td className="p-2 text-center">0</td>
                                                       <td className="p-2"></td>
                                                   </tr>
                                                   <tr>
                                                       <td className="p-2 text-right min-w-[150px]" colSpan={11}>Jumlah Pendapatan Kotor dan Pajak Penghasilan Yang Dipotong</td>
                                                       <td className="p-2 text-center">0</td>
                                                       <td className="p-2"></td>
                                                   </tr>
                                                   <tr>
                                                       <td className="p-2 text-right min-w-[150px]" colSpan={11}>Jumlah Total Pendapatan Kotor Dan Pajak Penghasilan Yang Ditanggung Oleh Pemerintah <br /> serta Pajak penghasilan Yang Dipotong</td>
                                                       <td className="p-2 text-center">0</td>
                                                       <td className="p-2"></td>
                                                   </tr>
                                               </tfoot> */}
                                        </table>
                                    </div>
                                </div>
                                <div className="border rounded-md p-4 mb-4">
                                    <div className="border rounded-md p-4 mb-4 font-semibold">
                                        BPA2
                                    </div>
                                    <div className="w-[1400px] overflow-x-auto bg-white shadow-md rounded-lg overflow-hidden">
                                        <table className="table-auto text-sm text-left border overflow-hidden">
                                            <thead className="bg-purple-700 text-white text-center">
                                                <tr>
                                                    <th className="p-2 border-b ">No</th>
                                                    <th className="p-2 border-b min-w-[200px]">NIK/NPWP</th>
                                                    <th className="p-2  border-b min-w-[150px]">Nama</th>
                                                    <th className="p-2 border-b min-w-[150px]">Nomor Bukti Potong </th>
                                                    <th className="p-2 border-b min-w-[150px]">Tanggal Bukti Pemotongan </th>
                                                    <th className="p-2 border-b min-w-[150px]">Kode Objek Pajak</th>
                                                    <th className="p-2 border-b min-w-[150px]">Penghasilan Bruto (Rp)</th>
                                                    <th className="p-2 border-b min-w-[150px]">Pajak Penghasilan (Rp)</th>
                                                    <th className="p-2 border-b min-w-[150px]">Fasilitas Perpajakan</th>
                                                    <th className="p-2 border-b min-w-[150px]">Negara</th>
                                                    <th className="p-2 border-b min-w-[150px]">ID Tempat Kegiatan Usaha</th>
                                                    <th className="p-2 border-b min-w-[150px]">KAP-KJS</th>
                                                    <th className="p-2 border-b min-w-[150px]">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody className="text-gray-600 text-center">
                                                <tr>
                                                    <td className="p-2 border-b text-center">1</td>
                                                    <td className="p-2 border-b">881381978971381309</td>
                                                    <td className="p-2 border-b">-</td>
                                                    <td className="p-2 border-b">-</td>
                                                    <td className="p-2 border-b">-</td>
                                                    <td className="p-2 border-b">-</td>
                                                    <td className="p-2 border-b">-</td>
                                                    <td className="p-2 border-b">-</td>
                                                    <td className="p-2 border-b">-</td>
                                                    <td className="p-2 border-b">-</td>
                                                    <td className="p-2 border-b">-</td>
                                                    <td className="p-2 border-b">-</td>
                                                    <td className="p-2 border-b">-</td>
                                                </tr>
                                            </tbody>
                                            <tfoot className="text-gray-800 font-semibold bg-gray-100">
                                                <tr>
                                                    <td className="p-2 text-right min-w-[150px]" colSpan={11}>Jumlah Pendapatan Kotor dan Pajak Penghasilan Yang Ditanggung Oleh Pemerintah</td>
                                                    <td className="p-2 text-center">0</td>
                                                    <td className="p-2"></td>
                                                </tr>
                                                <tr>
                                                    <td className="p-2 text-right min-w-[150px]" colSpan={11}>Jumlah Pendapatan Kotor dan Pajak Penghasilan Yang Dipotong</td>
                                                    <td className="p-2 text-center">0</td>
                                                    <td className="p-2"></td>
                                                </tr>
                                                <tr>
                                                    <td className="p-2 text-right min-w-[150px]" colSpan={11}>Jumlah Total Pendapatan Kotor Dan Pajak Penghasilan Yang Ditanggung Oleh Pemerintah <br /> serta Pajak penghasilan Yang Dipotong</td>
                                                    <td className="p-2 text-center">0</td>
                                                    <td className="p-2"></td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="l-ii">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-lg font-light text-yellow-500 mt-4">DAFTAR PEMOTONGAN SATU TAHUN PAJAK ATAU BAGIAN TAHUN PAJAK PAJAK PENGHASILAN PASAL 21 BAGI PEGAWAI TETAP DAN PENSIUNAN YANG MENERIMA UANG TERKAIT
                                    PENSIUN SECARA BERKALA SERTA BAGI PEGAWAI NEGERI SIPIL, ANGGOTA TENTARA NASIONAL INDONESIA, ANGGOTA KEPOLISIAN REPUBLIK INDONESIA, PEJABAT NEGARA, DAN PENSIUNANNYA
                                </h2>
                            </div>
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
                                        BPA1
                                    </div>
                                    <div className="w-[1400px] overflow-x-auto bg-white shadow-md rounded-lg overflow-hidden">
                                        <table className="table-auto text-sm text-left border overflow-hidden">
                                            <thead className="bg-purple-700 text-white text-center">
                                                <tr>
                                                    <th className="p-2 border-b ">No</th>
                                                    <th className="p-2 border-b min-w-[200px]">NIK/NPWP</th>
                                                    <th className="p-2  border-b min-w-[150px]">Nama</th>
                                                    <th className="p-2 border-b min-w-[150px]">Nomor Bukti Potong </th>
                                                    <th className="p-2 border-b min-w-[150px]">Tanggal Bukti Pemotongan </th>
                                                    <th className="p-2 border-b min-w-[150px]">Kode Objek Pajak</th>
                                                    <th className="p-2 border-b min-w-[150px]">Penghasilan Bruto (Rp)</th>
                                                    <th className="p-2 border-b min-w-[150px]">Pajak Penghasilan (Rp)</th>
                                                    <th className="p-2 border-b min-w-[150px]">Fasilitas Perpajakan</th>
                                                    <th className="p-2 border-b min-w-[150px]">Negara</th>
                                                    <th className="p-2 border-b min-w-[150px]">ID Tempat Kegiatan Usaha</th>
                                                    <th className="p-2 border-b min-w-[150px]">KAP-KJS</th>
                                                    <th className="p-2 border-b min-w-[150px]">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody className="text-gray-600 text-center">
                                                <tr>
                                                    <td className="p-2 border-b text-center">1</td>
                                                    <td className="p-2 border-b">881381978971381309</td>
                                                    <td className="p-2 border-b">-</td>
                                                    <td className="p-2 border-b">-</td>
                                                    <td className="p-2 border-b">-</td>
                                                    <td className="p-2 border-b">-</td>
                                                    <td className="p-2 border-b">-</td>
                                                    <td className="p-2 border-b">-</td>
                                                    <td className="p-2 border-b">-</td>
                                                    <td className="p-2 border-b">-</td>
                                                    <td className="p-2 border-b">-</td>
                                                    <td className="p-2 border-b">-</td>
                                                    <td className="p-2 border-b">-</td>
                                                </tr>
                                            </tbody>
                                            {/* <tfoot className="text-gray-800 font-semibold bg-gray-100">
                                                   <tr>
                                                       <td className="p-2 text-right min-w-[150px]" colSpan={11}>Jumlah Pendapatan Kotor dan Pajak Penghasilan Yang Ditanggung Oleh Pemerintah</td>
                                                       <td className="p-2 text-center">0</td>
                                                       <td className="p-2"></td>
                                                   </tr>
                                                   <tr>
                                                       <td className="p-2 text-right min-w-[150px]" colSpan={11}>Jumlah Pendapatan Kotor dan Pajak Penghasilan Yang Dipotong</td>
                                                       <td className="p-2 text-center">0</td>
                                                       <td className="p-2"></td>
                                                   </tr>
                                                   <tr>
                                                       <td className="p-2 text-right min-w-[150px]" colSpan={11}>Jumlah Total Pendapatan Kotor Dan Pajak Penghasilan Yang Ditanggung Oleh Pemerintah <br /> serta Pajak penghasilan Yang Dipotong</td>
                                                       <td className="p-2 text-center">0</td>
                                                       <td className="p-2"></td>
                                                   </tr>
                                               </tfoot> */}
                                        </table>
                                    </div>
                                </div>
                                <div className="border rounded-md p-4 mb-4">
                                    <div className="border rounded-md p-4 mb-4 font-semibold">
                                        BPA2
                                    </div>
                                    <div className="w-[1400px] overflow-x-auto bg-white shadow-md rounded-lg overflow-hidden">
                                        <table className="table-auto text-sm text-left border overflow-hidden">
                                            <thead className="bg-purple-700 text-white text-center">
                                                <tr>
                                                    <th className="p-2 border-b ">No</th>
                                                    <th className="p-2 border-b min-w-[200px]">NIK/NPWP</th>
                                                    <th className="p-2  border-b min-w-[150px]">Nama</th>
                                                    <th className="p-2 border-b min-w-[150px]">Nomor Bukti Potong </th>
                                                    <th className="p-2 border-b min-w-[150px]">Tanggal Bukti Pemotongan </th>
                                                    <th className="p-2 border-b min-w-[150px]">Kode Objek Pajak</th>
                                                    <th className="p-2 border-b min-w-[150px]">Penghasilan Bruto (Rp)</th>
                                                    <th className="p-2 border-b min-w-[150px]">Pajak Penghasilan (Rp)</th>
                                                    <th className="p-2 border-b min-w-[150px]">Fasilitas Perpajakan</th>
                                                    <th className="p-2 border-b min-w-[150px]">Negara</th>
                                                    <th className="p-2 border-b min-w-[150px]">ID Tempat Kegiatan Usaha</th>
                                                    <th className="p-2 border-b min-w-[150px]">KAP-KJS</th>
                                                    <th className="p-2 border-b min-w-[150px]">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody className="text-gray-600 text-center">
                                                <tr>
                                                    <td className="p-2 border-b text-center">1</td>
                                                    <td className="p-2 border-b">881381978971381309</td>
                                                    <td className="p-2 border-b">-</td>
                                                    <td className="p-2 border-b">-</td>
                                                    <td className="p-2 border-b">-</td>
                                                    <td className="p-2 border-b">-</td>
                                                    <td className="p-2 border-b">-</td>
                                                    <td className="p-2 border-b">-</td>
                                                    <td className="p-2 border-b">-</td>
                                                    <td className="p-2 border-b">-</td>
                                                    <td className="p-2 border-b">-</td>
                                                    <td className="p-2 border-b">-</td>
                                                    <td className="p-2 border-b">-</td>
                                                </tr>
                                            </tbody>
                                            <tfoot className="text-gray-800 font-semibold bg-gray-100">
                                                <tr>
                                                    <td className="p-2 text-right min-w-[150px]" colSpan={11}>Total</td>
                                                    <td className="p-2 text-center">0</td>
                                                    <td className="p-2"></td>
                                                </tr>

                                            </tfoot>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="l-iii">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-lg font-light text-yellow-500 mt-4">DAFTAR PEMOTONGAN PAJAK PENGHASILAN PASAL 21
                                    DAN/ATAU PASAL 26 SELAIN PEGAWAI TETAP ATAU PENSIUNAN YANG MENERIMA UANG TERKAIT PENSIUN SECARA BERKALA
                                </h2>
                            </div>
                            <div className="mt-4">
                                <div className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full" onClick={() => setShowHeaderb2(!showHeaderb2)}>
                                    <h3 className='text-lg font-semibold'>Header</h3>
                                    {showHeaderb2 ? <FaChevronUp /> : <FaChevronDown />}
                                </div>
                                {showHeaderb2 && (
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
                                        BP21
                                    </div>
                                    <div className="w-[1400px] overflow-x-auto bg-white shadow-md rounded-lg overflow-hidden">
                                        <table className="table-auto text-sm text-left border overflow-hidden">
                                            <thead className="bg-purple-700 text-white text-center">
                                                <tr>
                                                    <th className="p-2 border-b ">No</th>
                                                    <th className="p-2 border-b min-w-[200px]">NIK/NPWP</th>
                                                    <th className="p-2  border-b min-w-[150px]">Nama</th>
                                                    <th className="p-2 border-b min-w-[150px]">Nomor Bukti Potong </th>
                                                    <th className="p-2 border-b min-w-[150px]">Tanggal Bukti Pemotongan </th>
                                                    <th className="p-2 border-b min-w-[150px]">Kode Objek Pajak</th>
                                                    <th className="p-2 border-b min-w-[150px]">Objek Pajak</th>
                                                    <th className="p-2 border-b min-w-[150px]">Penghasilan Bruto (Rp)</th>
                                                    <th className="p-2 border-b min-w-[150px]">Pajak Penghasilan (Rp)</th>
                                                    <th className="p-2 border-b min-w-[150px]">Fasilitas Perpajakan</th>
                                                    <th className="p-2 border-b min-w-[150px]">ID Tempat Kegiatan Usaha</th>
                                                    <th className="p-2 border-b min-w-[150px]">Negara</th>
                                                    <th className="p-2 border-b min-w-[150px]">ID Tempat Kegiatan Usaha</th>
                                                    <th className="p-2 border-b min-w-[150px]">KAP-KJS</th>
                                                    <th className="p-2 border-b min-w-[150px]">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody className="text-gray-600 text-center">
                                                <tr>
                                                    <td className="p-2 border-b text-center">1</td>
                                                    <td className="p-2 border-b">881381978971381309</td>
                                                    <td className="p-2 border-b">-</td>
                                                    <td className="p-2 border-b">-</td>
                                                    <td className="p-2 border-b">-</td>
                                                    <td className="p-2 border-b">-</td>
                                                    <td className="p-2 border-b">-</td>
                                                    <td className="p-2 border-b">-</td>
                                                    <td className="p-2 border-b">-</td>
                                                    <td className="p-2 border-b">-</td>
                                                    <td className="p-2 border-b">-</td>
                                                    <td className="p-2 border-b">-</td>
                                                    <td className="p-2 border-b">-</td>
                                                    <td className="p-2 border-b">-</td>
                                                    <td className="p-2 border-b">-</td>
                                                </tr>
                                            </tbody>
                                            <tfoot className="text-gray-800 font-semibold bg-gray-100">
                                                <tr>
                                                    <td className="p-2 text-right min-w-[150px]" colSpan={13}>JUMLAH PENDAPATAN KOTOR UNTUK PASAL 21 DAN PAJAK PENGHASILAN PASAL 21 YANG DITANGGUNG OLEH PEMERINTAH</td>
                                                    <td className="p-2 text-center">0</td>
                                                    <td className="p-2">0</td>
                                                </tr>
                                                <tr>
                                                    <td className="p-2 text-right min-w-[150px]" colSpan={13}>JUMLAH UNTUK PASAL 21 DAN PENDAPATAN KOTOR PASAL 21 SERTA PAJAK PENGHASILAN YANG DIPOTONG</td>
                                                    <td className="p-2 text-center">0</td>
                                                    <td className="p-2">0</td>
                                                </tr>
                                                {/* <tr>
                                                       <td className="p-2 text-right min-w-[150px]" colSpan={13}>Jumlah Total Pendapatan Kotor Dan Pajak Penghasilan Yang Ditanggung Oleh Pemerintah <br /> serta Pajak penghasilan Yang Dipotong</td>
                                                       <td className="p-2 text-center">0</td>
                                                       <td className="p-2"></td>
                                                   </tr> */}
                                            </tfoot>
                                        </table>
                                    </div>
                                </div>
                                <div className="border rounded-md p-4 mb-4">
                                    <div className="border rounded-md p-4 mb-4 font-semibold">
                                        BP26
                                    </div>
                                    <div className="w-[1400px] overflow-x-auto bg-white shadow-md rounded-lg overflow-hidden">
                                        <table className="table-auto text-sm text-left border overflow-hidden">
                                            <thead className="bg-purple-700 text-white text-center">
                                                <tr>
                                                    <th className="p-2 border-b ">No</th>
                                                    <th className="p-2 border-b min-w-[200px]">NIK/NPWP</th>
                                                    <th className="p-2  border-b min-w-[150px]">Nama</th>
                                                    <th className="p-2 border-b min-w-[150px]">Nomor Bukti Potong </th>
                                                    <th className="p-2 border-b min-w-[150px]">Tanggal Bukti Pemotongan </th>
                                                    <th className="p-2 border-b min-w-[150px]">Kode Objek Pajak</th>
                                                    <th className="p-2 border-b min-w-[150px]">Objek Pajak</th>
                                                    <th className="p-2 border-b min-w-[150px]">Penghasilan Bruto (Rp)</th>
                                                    <th className="p-2 border-b min-w-[150px]">Pajak Penghasilan (Rp)</th>
                                                    <th className="p-2 border-b min-w-[150px]">Fasilitas Perpajakan</th>
                                                    <th className="p-2 border-b min-w-[150px]">ID Tempat Kegiatan Usaha</th>
                                                    <th className="p-2 border-b min-w-[150px]">Negara</th>
                                                    <th className="p-2 border-b min-w-[150px]">ID Tempat Kegiatan Usaha</th>
                                                    <th className="p-2 border-b min-w-[150px]">KAP-KJS</th>
                                                    <th className="p-2 border-b min-w-[150px]">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody className="text-gray-600 text-center">
                                                <tr>
                                                    <td className="p-2 border-b text-center">1</td>
                                                    <td className="p-2 border-b">881381978971381309</td>
                                                    <td className="p-2 border-b">-</td>
                                                    <td className="p-2 border-b">-</td>
                                                    <td className="p-2 border-b">-</td>
                                                    <td className="p-2 border-b">-</td>
                                                    <td className="p-2 border-b">-</td>
                                                    <td className="p-2 border-b">-</td>
                                                    <td className="p-2 border-b">-</td>
                                                    <td className="p-2 border-b">-</td>
                                                    <td className="p-2 border-b">-</td>
                                                    <td className="p-2 border-b">-</td>
                                                    <td className="p-2 border-b">-</td>
                                                    <td className="p-2 border-b">-</td>
                                                    <td className="p-2 border-b">-</td>
                                                </tr>
                                            </tbody>
                                            <tfoot className="text-gray-800 font-semibold bg-gray-100">
                                                <tr>
                                                    <td className="p-2 text-right min-w-[150px]" colSpan={13}>JUMLAH PENDAPATAN KOTOR UNTUK PASAL 26 DAN PAJAK PENGHASILAN PASAL 26 YANG DITANGGUNG OLEH PEMERINTAH
                                                    </td>
                                                    <td className="p-2 text-center">0</td>
                                                    <td className="p-2"></td>
                                                </tr>
                                                <tr>
                                                    <td className="p-2 text-right min-w-[150px]" colSpan={13}>JUMLAH UNTUK PASAL 26 DAN PENDAPATAN KOTOR PASAL 26 SERTA PAJAK PENGHASILAN YANG DIPOTONG</td>
                                                    <td className="p-2 text-center">0</td>
                                                    <td className="p-2"></td>
                                                </tr>
                                                <tr>
                                                    <td className="p-2 text-right min-w-[150px]" colSpan={13}>JUMLAH TOTAL PENDAPATAN KOTOR DAN PAJAK PENGHASILAN YANG DITANGGUNG OLEH PEMERINTAH SERTA PAJAK PENGHASILAN YANG DIPOTONG</td>
                                                    <td className="p-2 text-center">0</td>
                                                    <td className="p-2"></td>
                                                </tr>
                                            </tfoot>
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
