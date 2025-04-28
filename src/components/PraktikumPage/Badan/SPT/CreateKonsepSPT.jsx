import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FaCalendarAlt, FaFilter, FaSearch, FaTimes, FaChevronDown, FaChevronUp } from "react-icons/fa";


const CreateKonsepSPT = () => {
    const [activeTab, setActiveTab] = useState("induk");
    const [showHeaderInduk, setShowHeaderInduk] = useState(false);
    const [showPenyerahanBarangJasa, setShowPenyerahanBarangJasa] = useState(false);
    const [showPerolehanBarangJasa, setShowPerolehanBarangJasa] = useState(false);

    const [showHeadera1, setShowHeadera1] = useState(false);
    const [showHeadera2, setShowHeadera2] = useState(false);

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

    const rowsPenyerahanBarangdanJasa = [
        "Ekspor BKP/BKP Tidak Berwujud/JKP",
        "Penyerahan yang PPN atau PPN dan PPnBM-nya harus dipungut sendiri dengan DPP Nilai Lain atau Besaran Tertentu (dengan Faktur Pajak Kode 04 dan 05)",
        "Penyerahan yang PPN atau PPN dan PPnBM-nya harus dipungut sendiri kepada turis sesuai dengan Pasal 16E UU PPN (dengan Faktur Pajak Kode 06)",
        "Penyerahan yang PPN atau PPN dan PPnBM-nya harus dipungut sendiri lainnya (dengan Faktur Pajak Kode 01, 09 dan 10)",
        "Penyerahan yang PPN atau PPN dan PPnBM-nya harus dipungut sendiri dengan Faktur Pajak yang dilaporkan secara digunggung",
        "Penyerahan yang PPN atau PPN dan PPnBM-nya harus dipungut oleh Pemungut PPN (dengan Faktur Pajak Kode 02 dan 03)",
        "Penyerahan yang mendapat fasilitas PPN atau PPnBM Tidak Dipungut (dengan Faktur Pajak Kode 07)",
        "Penyerahan yang mendapat fasilitas PPN atau PPnBM Dibebaskan (dengan Faktur Pajak Kode 08)",
        "Penyerahan yang mendapat fasilitas PPN atau PPnBM dengan Faktur Pajak yang dilaporkan secara digunggung"
    ];

    const rowsPerolehanBarangdanJasa = [
        "A. Impor BKP, Pemanfaatan BKP Tidak Berwujud dan/atau JKP dari luar Daerah Pabean di dalam Daerah Pabean yang Pajak Masukannya dapat dikreditkan",
        "B. Perolehan BKP/JKP dari dalam negeri dengan DPP Nilai Lain atau Besaran Tertentu yang Pajak Masukannya dapat dikreditkan (dengan Faktur Pajak Kode 04 dan 05)",
        "C. Perolehan BKP dari dalam negeri selain dengan DPP Nilai Lain yang Pajak Masukannya dapat dikreditkan (dengan Faktur Pajak Kode 01, 09, dan 10)",
        "D. Perolehan BKP/JKP dari dalam negeri sebagai Pemungut PPN yang Pajak Masukannya dapat dikreditkan (dengan Faktur Pajak Kode 02 dan 03)",
        "E. Kompensasi kelebihan Pajak Masukan",
        "F. Hasil penghitungan kembali Pajak Masukan yang telah dikreditkan",
        "G. Jumlah Pajak Masukan yang dapat diperhitungkan (II.A + II.B + II.C + II.D + II.E + II.F)",
        "H. Impor atau perolehan BKP/JKP yang Pajak Masukannya tidak dikreditkan dan/atau impor atau perolehan BKP/JKP yang mendapat fasilitas",
        "I. Impor atau perolehan BKP/JKP dengan Faktur Pajak yang dilaporkan secara digunggung dan barang/jasa yang tidak terutang PPN",
        "J. Jumlah Perolehan (II.A + II.B + II.C + II.D + II.E + II.F + II.G + II.H + II.I)"
    ];

    const rowsPerhitunganPPNKurangBayarLebihBayar = [
        "A. Pajak Keluaran yang harus dipungut sendiri (I.A.2 + I.A.3 + I.A.4 + I.A.5)",
        "B. PPN Disetor di muka dalam masa pajak yang sama",
        "C. Pajak Masukan yang dapat diperhitungkan (II.G)",
        "D. Kelebihan pemungutan PPN oleh Pemungut PPN",
        "E. PPN kurang atau (lebih) bayar (III.A - III.B - III.C - III.D)",
        "F. PPN Kurang atau (lebih) bayar pada SPT yang dibetulkan sebelumnya",
        "G. PPN Kurang atau (lebih) bayar karena pembetulan SPT (III.E + III.F)",
        "H. Diminta Untuk"
    ];

    const getPrefilled = (i) => ({
        harga: (i === 1 && "105.500.000") || (i === 5 && "651.119.260") || (i === 8 && "756.619.260") || "0",
        dpp: (i === 1 && "96.708.334") || (i === 5 && "596.859.332") || "0",
        ppn: (i === 1 && "11.605.000") || (i === 5 && "71.623.128") || (i === 8 && "83.228.128") || "0",
        ppnbm: "0",
    });

    return (
        <div className="flex h-screen bg-gray-100">
            <div className="flex-auto p-3 bg-white rounded-md h-full">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-light text-yellow-500 mt-4">SURAT PEMBERITAHUAN MASA PAJAK PERTAMBAHAN NILAI (SPT MASA PPN)</h2>
                </div>
                <div className="w-full p-2 ml-0 border-t text-lg">
                    <Tabs defaultValue='induk' onValueChange={(val) => setActiveTab(val)}>
                        <TabsList className="flex justify-start gap-2 text-blue-700 text-lg">
                            <TabsTrigger value="induk">Induk</TabsTrigger>
                            <TabsTrigger value="a-1">A-1</TabsTrigger>
                            <TabsTrigger value="a-2">A-2</TabsTrigger>
                            <TabsTrigger value="b-1">B-1</TabsTrigger>
                            <TabsTrigger value="b-2">B-2</TabsTrigger>
                            <TabsTrigger value="c">C</TabsTrigger>
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
                                            {/* Kiri */}
                                            <div>
                                                <label className="block font-medium text-gray-700">Nama Pengusaha Kena Pajak *</label>
                                                <input
                                                    type="text"
                                                    readOnly
                                                    value="KANTOR AKUNTAN PUBLIK MOH WILDAN DAN ADI DARMAWAN"
                                                    className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                                                />
                                            </div>
                                            <div>
                                                <label className="block font-medium text-gray-700">NPWP*</label>
                                                <input
                                                    type="text"
                                                    readOnly
                                                    value="0934274002429000"
                                                    className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                                                />
                                            </div>

                                            <div className="md:col-span-1">
                                                <label className="block font-medium text-gray-700">Alamat *</label>
                                                <input
                                                    type="text"
                                                    readOnly
                                                    value="JL SOEKARNO HATTA NO.606, RT 001, RW 001, SEKejati, Buahbatu, Kota Bandung"
                                                    className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                                                />
                                            </div>
                                            <div>
                                                <label className="block font-medium text-gray-700">Klasifikasi Lapangan Usaha *</label>
                                                <input
                                                    type="text"
                                                    readOnly
                                                    value="AKTIVITAS AKUNTANSI, PEMBUKUAN DAN PEMERIKSA"
                                                    className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                                                />
                                            </div>

                                            <div>
                                                <label className="block font-medium text-gray-700">Nomor Telepon</label>
                                                <input
                                                    type="text"
                                                    readOnly
                                                    value="0227569464"
                                                    className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                                                />
                                            </div>
                                            <div>
                                                <label className="block font-medium text-gray-700">Periode</label>
                                                <input
                                                    type="text"
                                                    readOnly
                                                    value="032025"
                                                    className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                                                />
                                            </div>

                                            <div>
                                                <label className="block font-medium text-gray-700">Telepon Seluler *</label>
                                                <input
                                                    type="text"
                                                    readOnly
                                                    value="0227569464"
                                                    className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                                                />
                                            </div>
                                            <div className="flex gap-2">
                                                <div className="flex-1">
                                                    <label className="block font-medium text-gray-700">Periode Pembukuan</label>
                                                    <input
                                                        type="text"
                                                        readOnly
                                                        value="01-12"
                                                        className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <label className="block font-medium text-gray-700">Normal/Pembetulan</label>
                                                    <select disabled className="w-full p-2 border rounded-md bg-gray-100 text-gray-600 cursor-not-allowed">
                                                        <option>Normal</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-4 flex items-center gap-4">
                                            <button className="bg-yellow-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-yellow-600 transition">
                                                Posting SPT
                                            </button>
                                            <p className="text-sm text-gray-500">
                                                Last prefiling Returnsheet is on <strong>12 April 2025 23:24:46</strong>
                                            </p>
                                        </div>
                                    </div>
                                )}
                                <div className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100" onClick={() => setShowPenyerahanBarangJasa(!showPenyerahanBarangJasa)}>
                                    <h3 className="text-lg font-semibold">I. Penyerahan Barang dan Jasa</h3>
                                    {showPenyerahanBarangJasa ? <FaChevronUp /> : <FaChevronDown />}
                                </div>
                                {showPenyerahanBarangJasa && (
                                    <div className="border rounded-md p-4 overflow-x-auto" >
                                        <table className="min-w-full text-sm text-left border overflow-x-auto">
                                            <thead className="bg-purple-700 text-white text-center">
                                                <tr>
                                                    <th className="p-2 min-w-[300px]">Penyerahan BKP/JKP yang terutang PPN</th>
                                                    <th className="p-2 min-w-[150px]">Harga Jual/Penggantian/ <br />Nilai Ekspor/DPP</th>
                                                    <th className="p-2 min-w-[150px]">DPP Nilai Lain/ DPP</th>
                                                    <th className="p-2 min-w-[150px]">PPN</th>
                                                    <th className="p-2 min-w-[150px]">PPnBM</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {rowsPenyerahanBarangdanJasa.map((desc, i) => {
                                                    const prefilled = getPrefilled(i);
                                                    const isHargaDisabled = prefilled.harga !== "0";
                                                    const isDppDisabled = prefilled.dpp !== "0";
                                                    const isPpnDisabled = prefilled.ppn !== "0";

                                                    return (
                                                        <tr key={i} className="border-b">
                                                            <td className="p-2 whitespace-normal break-words text-sm">
                                                                {`${i + 1}. ${desc}`}
                                                            </td>

                                                            <td className="p-2">
                                                                <input
                                                                    type="text"
                                                                    className="w-full p-1 border rounded-md text-right text-sm"
                                                                    defaultValue={prefilled.harga}
                                                                    disabled={isHargaDisabled}
                                                                />
                                                            </td>

                                                            <td className="p-2">
                                                                <input
                                                                    type="text"
                                                                    className="w-full p-1 border rounded-md text-right text-sm"
                                                                    defaultValue={prefilled.dpp}
                                                                    disabled={isDppDisabled}
                                                                />
                                                            </td>

                                                            <td className="p-2">
                                                                <input
                                                                    type="text"
                                                                    className="w-full p-1 border rounded-md text-right text-sm"
                                                                    defaultValue={prefilled.ppn}
                                                                    disabled={isPpnDisabled}
                                                                />
                                                            </td>

                                                            <td className="p-2 flex items-center gap-2">
                                                                <input
                                                                    type="text"
                                                                    className="w-full p-1 border rounded-md text-right text-sm"
                                                                    defaultValue={prefilled.ppnbm}
                                                                />
                                                                {(i === 4 || i === 8) && (
                                                                    <button className="bg-blue-700 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap">
                                                                        Unggah XML
                                                                    </button>
                                                                )}
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>

                                    </div>
                                )}
                                <div className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100" onClick={() => setShowPerolehanBarangJasa(!showPerolehanBarangJasa)}>
                                    <h3 className="text-lg font-semibold">II. Perolehan Barang dan Jasa</h3>
                                    {showPerolehanBarangJasa ? <FaChevronUp /> : <FaChevronDown />}
                                </div>
                                {showPerolehanBarangJasa && (
                                    <div className="border rounded-md p-4 overflow-x-auto" >
                                        <table className="min-w-full text-sm text-left border overflow-x-auto">
                                            <thead className="bg-purple-700 text-white text-center">
                                                <tr>
                                                    <th className="p-2 min-w-[300px]"></th>
                                                    <th className="p-2 min-w-[150px]">Harga Jual/Penggantian/ <br />Nilai Ekspor/DPP</th>
                                                    <th className="p-2 min-w-[150px]">DPP Nilai Lain/ DPP</th>
                                                    <th className="p-2 min-w-[150px]">PPN</th>
                                                    <th className="p-2 min-w-[150px]">PPnBM</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {rowsPerolehanBarangdanJasa.map((desc, i) => {
                                                    const prefilled = getPrefilled(i);
                                                    const isHargaDisabled = prefilled.harga !== "0";
                                                    const isDppDisabled = prefilled.dpp !== "0";
                                                    const isPpnDisabled = prefilled.ppn !== "0";

                                                    return (
                                                        <tr key={i} className="border-b">
                                                            <td className="p-2 whitespace-normal break-words text-sm">
                                                                {` ${desc}`}
                                                            </td>

                                                            <td className="p-2">
                                                                <input
                                                                    type="text"
                                                                    className="w-full p-1 border rounded-md text-right text-sm"
                                                                    defaultValue={prefilled.harga}
                                                                    disabled={isHargaDisabled}
                                                                />
                                                            </td>

                                                            <td className="p-2">
                                                                <input
                                                                    type="text"
                                                                    className="w-full p-1 border rounded-md text-right text-sm"
                                                                    defaultValue={prefilled.dpp}
                                                                    disabled={isDppDisabled}
                                                                />
                                                            </td>

                                                            <td className="p-2">
                                                                <input
                                                                    type="text"
                                                                    className="w-full p-1 border rounded-md text-right text-sm"
                                                                    defaultValue={prefilled.ppn}
                                                                    disabled={isPpnDisabled}
                                                                />
                                                            </td>

                                                            <td className="p-2 flex items-center gap-2">
                                                                <input
                                                                    type="text"
                                                                    className="w-full p-1 border rounded-md text-right text-sm"
                                                                    defaultValue={prefilled.ppnbm}
                                                                />
                                                                {(i === 4 || i === 8) && (
                                                                    <button className="bg-blue-700 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap">
                                                                        Unggah XML
                                                                    </button>
                                                                )}
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>

                                    </div>
                                )}
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
                        <TabsContent value="a-1">
                            <div className="mt-4">
                                <div className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full" onClick={() => setShowHeadera1(!showHeadera1)}>
                                    <h3 className='text-lg font-semibold'>Header</h3>
                                    {showHeadera1 ? <FaChevronUp /> : <FaChevronDown />}
                                </div>
                                {showHeadera1 && (
                                    <div className="border rounded-md p-4 mb-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {/* Kiri */}
                                            <div>
                                                <label className="block font-medium text-gray-700">NAMA PKP *</label>
                                                <input
                                                    type="text"
                                                    readOnly
                                                    value="KANTOR AKUNTAN PUBLIK MOH WILDAN DAN ADI DARMAWAN"
                                                    className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                                                />
                                            </div>

                                            <div>
                                                <label className="block font-medium text-gray-700">MASA *</label>
                                                <input
                                                    type="text"
                                                    readOnly
                                                    value="032025"
                                                    className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                                                />
                                            </div>
                                            <div>
                                                <label className="block font-medium text-gray-700">NPWP*</label>
                                                <input
                                                    type="text"
                                                    readOnly
                                                    value="0934274002429000"
                                                    className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                                                />
                                            </div>
                                            <div>
                                                <label className="block font-medium text-gray-700">Normal/Pembetulan</label>
                                                <select disabled className="w-full p-2 border rounded-md bg-gray-100 text-gray-600 cursor-not-allowed">
                                                    <option>Normal</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div className="border">
                                    <table className="min-w-full text-sm text-left border overflow-x-auto">
                                        <thead className="bg-purple-700 text-white text-center">
                                            <tr>
                                                <th className="p-2 border-b ">No</th>
                                                <th className="p-2 border-b min-w-[200px]">Nama Pembeli BKP/Penerima Manfaat BKP Tidak Berwujud/Penerima JKP</th>
                                                <th className="p-2  border-b min-w-[150px]">Dokumen Tertentu Atau Nomor</th>
                                                <th className="p-2 border-b min-w-[150px]">Dokumen Tertentu Atau Tanggal</th>
                                                <th className="p-2 border-b min-w-[150px]">DP (Rupiah)</th>
                                                <th className="p-2 border-b min-w-[150px]">Keterangan</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-gray-600 text-center">
                                            <tr>
                                                <td className="p-2 border-b text-center">1</td>
                                                <td className="p-2 border-b">KANTOR AKUNTAN PUBLIK MOH WILDAN DAN ADI DARMAWAN</td>
                                                <td className="p-2 border-b">-</td>
                                                <td className="p-2 border-b">-</td>
                                                <td className="p-2 border-b">-</td>
                                                <td className="p-2 border-b">-</td>
                                            </tr>
                                        </tbody>
                                        <tfoot className="text-gray-800 font-semibold bg-gray-100">
                                            <tr>
                                                <td className="p-2 text-center min-w-[150px]" colSpan={4}>Jumlah</td>
                                                <td className="p-2 text-center">0</td>
                                                <td className="p-2"></td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="a-2">
                            <div className="mt-4">
                                <div className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full" onClick={() => setShowHeadera2(!showHeadera2)}>
                                    <h3 className='text-lg font-semibold'>Header</h3>
                                    {showHeadera2 ? <FaChevronUp /> : <FaChevronDown />}
                                </div>
                                {showHeadera2 && (
                                    <div className="border rounded-md p-4 mb-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {/* Kiri */}
                                            <div>
                                                <label className="block font-medium text-gray-700">NAMA PKP *</label>
                                                <input
                                                    type="text"
                                                    readOnly
                                                    value="KANTOR AKUNTAN PUBLIK MOH WILDAN DAN ADI DARMAWAN"
                                                    className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                                                />
                                            </div>

                                            <div>
                                                <label className="block font-medium text-gray-700">MASA *</label>
                                                <input
                                                    type="text"
                                                    readOnly
                                                    value="032025"
                                                    className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                                                />
                                            </div>
                                            <div>
                                                <label className="block font-medium text-gray-700">NPWP*</label>
                                                <input
                                                    type="text"
                                                    readOnly
                                                    value="0934274002429000"
                                                    className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                                                />
                                            </div>
                                            <div>
                                                <label className="block font-medium text-gray-700">Normal/Pembetulan</label>
                                                <select disabled className="w-full p-2 border rounded-md bg-gray-100 text-gray-600 cursor-not-allowed">
                                                    <option>Normal</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div className=" w-[1450px] overflow-x-auto bg-white shadow-md rounded-lg overflow-hidden ">
                                    <table className="table-auto text-sm text-left border overflow-hidden">
                                        <thead className="bg-purple-700 text-white text-center">
                                            <tr>
                                                <th className="p-2 border-b ">No</th>
                                                <th className="p-2 border-b min-w-[200px]">Nama Pembeli BKP/Penerima Manfaat BKP Tidak Berwujud/Penerima JKP</th>
                                                <th className="p-2  border-b min-w-[150px]">NPWP/NIK/Nomor Paspor</th>
                                                <th className="p-2 border-b min-w-[150px]">Faktur Pajak Dokumen Tertentu/Nota Retur/Nota Pembatalan - nomor</th>
                                                <th className="p-2 border-b min-w-[150px]">Harga Jual/Pengganti/DPP (Rupiah)</th>
                                                <th className="p-2 border-b min-w-[150px]">DPP Nilai Lain/DPP (Rupiah)</th>
                                                <th className="p-2 border-b min-w-[150px]">PPN (Rupiah)</th>
                                                <th className="p-2 border-b min-w-[150px]">PPnBM (Rupiah)</th>
                                                <th className="p-2 border-b min-w-[150px]">Kode dan Nomor Seri Faktur Pajak Diganti/Diretur</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-gray-600 text-center">
                                            <tr>
                                                <td className="p-2 border-b text-center">1</td>
                                                <td className="p-2 border-b">KANTOR AKUNTAN PUBLIK MOH WILDAN DAN ADI DARMAWAN</td>
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
                                                <td className="p-2 text-center min-w-[150px]" colSpan={4}>Jumlah</td>
                                                <td className="p-2 text-center">0</td>
                                                <td className="p-2"></td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="b-1">
                            <h2>Coming Soon</h2>
                        </TabsContent>
                        <TabsContent value="b-2">
                            <h2>Coming Soon</h2>
                        </TabsContent>
                        <TabsContent value="c">
                            <h2>Coming Soon</h2>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}

export default CreateKonsepSPT;
