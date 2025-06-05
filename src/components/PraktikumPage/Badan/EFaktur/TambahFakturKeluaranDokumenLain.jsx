import React, { useState, useEffect } from 'react'
import SideBarEFaktur from './SideBarEFaktur'
import { IoDocumentTextOutline } from "react-icons/io5";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import DatePicker from "react-datepicker";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel } from "@/components/ui/alert-dialog";
import Select from "react-select";


// Data dummy untuk tabel transaksi
const dummyRows = [
    {
        tipe: "Barang",
        nama: "Laptop",
        kuantitas: 2,
        satuan: "Unit",
        hargaSatuan: 10000000,
        totalHarga: 20000000,
        potonganHarga: 1000000,
        tarifPPN: "11%",
        DPP: 19000000,
        PPN: 2090000,
        PPnBM: 0
    },
    {
        tipe: "Jasa",
        nama: "Servis AC",
        kuantitas: 1,
        satuan: "Paket",
        hargaSatuan: 500000,
        totalHarga: 500000,
        potonganHarga: 0,
        tarifPPN: "11%",
        DPP: 500000,
        PPN: 55000,
        PPnBM: 0
    }
];

// Fungsi untuk menjumlahkan kolom tertentu
const sumField = (rows, field) =>
    rows.reduce((sum, row) => sum + (Number(row[field]) || 0), 0);

const listKode = [
    { id: 1, kode: "01", nama_transaksi: "Penyerahan Barang Kena Pajak" },
    { id: 2, kode: "02", nama_transaksi: "Penyerahan Jasa Kena Pajak" }
];
const listSatuan = [
    { id: 1, satuan: "Unit" },
    { id: 2, satuan: "Paket" }
];

const defaultTarifPPN = "12%";

const kodeTransaksiOptions = [
    { value: "01", label: "1 - Kepada selain pemungut PPN" },
    { value: "02", label: "2 - Kepada Pemungut PPN instansi Pemerintahan" },
    { value: "03", label: "3 - Kepada Pemungut PPN selain Instansi Pemerintahan" },
    { value: "04", label: "4 - DPP Nilai lain" },
    { value: "05", label: "5 - Besaran tertentu" },
    { value: "06", label: "6 - Kepada Orang Pribadi Pemegang Paspor Luar Negeri ( 16E UU PPN)" },
    { value: "07", label: "7 - penyerahan dengan fasilitas PPN atau PPN dan PPnBM tidak" },
    { value: "08", label: "8 - penyerahan dengan fasilitas dibebaskan PPN atau PPN dan PPnBM" },
    { value: "09", label: "9 - penyerahan aktiva yang menurut tujuan semula tidak diperjualbelikan (16D UU PPN)" },
    { value: "10", label: "10 - penyerahan lainnya" },
];

const eksporOptions = [
    { value: "1", label: "1 - ekspor BKP Berwujud" },
    { value: "2", label: "2 - ekspor BKP tidak berwujud" },
    { value: "3", label: "3 - ekspor JKP" },
];

const TambahFakturKeluaranDokumenLain = () => {
    const [showDokumenTransaksiDokumenLain, setShowDokumenTransaksiDokumenLain] = useState(false);
    const [showInformasiPembeliDokumenLain, setShowInformasiPembeliDokumenLain] = useState(false);
    const [showDetailTransaksiDokumenLain, setShowDetailTransaksiDokumenLain] = useState(false);
    const [selectedYear, setSelectedYear] = useState(new Date());
    const [jenisTransaksi, setJenisTransaksi] = useState("");
    const [detilTransaksi, setDetilTransaksi] = useState(null);

    // State untuk AlertDialog Transaksi
    const [tipe, setTipe] = useState("");
    const [selectedKode, setSelectedKode] = useState("");
    const [selectedSatuan, setSelectedSatuan] = useState("");
    const [namaBarang, setNamaBarang] = useState("");
    const [harga, setHarga] = useState("");
    const [kuantitas, setKuantitas] = useState(0);
    const [totalHarga, setTotalHarga] = useState("");
    const [potonganHarga, setPotonganHarga] = useState("");
    const [dpp, setDpp] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    const [jumlah, setJumlah] = useState("");
    const [tarifPPN, setTarifPPN] = useState(defaultTarifPPN);
    const [tarifPPnBM, setTarifPPnBM] = useState("");
    const [ppnBM, setPpnBM] = useState("");
    const [kodeTransaksi, setKodeTransaksi] = useState("");

    // Hitung jumlah total harga, potongan harga, DPP, PPN
    const totalTotalHarga = sumField(dummyRows, "totalHarga");
    const totalPotonganHarga = sumField(dummyRows, "potonganHarga");
    const totalDPP = sumField(dummyRows, "DPP");
    const totalPPN = sumField(dummyRows, "PPN");

    // Untuk reset form
    const resetForm = () => {
        setTipe("");
        setSelectedKode("");
        setSelectedDokumenTransaksiDokumenLain("");
        setSelectedSatuan("");
        setNamaBarang("");
        setHarga("");
        setKuantitas(0);
        setTotalHarga("");
        setPotonganHarga("");
        setDpp("");
        setIsChecked(false);
        setJumlah("");
        setTarifPPN(defaultTarifPPN);
        setTarifPPnBM("");
        setPpnBM("");
        setKodeTransaksi("");
    };

    // Handler
    const handleTipeChange = (e) => {
        setTipe(e.target.value);
        setSelectedKode("");
        setSelectedSatuan("");
    };

    const handleHargaChange = (e) => {
        const value = e.target.value.replace(/[^0-9]/g, "");
        setHarga(value);
        updateTotalHarga(value, kuantitas);
    };

    const handleKuantitasChange = (e) => {
        const value = e.target.value === "" ? 0 : parseInt(e.target.value, 10);
        setKuantitas(value);
        updateTotalHarga(harga, value);
    };

    const updateTotalHarga = (hargaValue, kuantitasValue) => {
        const total = (parseInt(hargaValue || 0, 10) * parseInt(kuantitasValue || 0, 10));
        setTotalHarga(total ? total.toLocaleString("id-ID") : "");
        // DPP default mengikuti total harga - potongan harga
        const potongan = parseInt(potonganHarga || 0, 10);
        setDpp((total - potongan) > 0 ? (total - potongan).toLocaleString("id-ID") : "");
    };

    const handlePotonganHargaChange = (e) => {
        const value = e.target.value.replace(/[^0-9]/g, "");
        setPotonganHarga(value);
        // Update DPP jika totalHarga sudah ada
        const total = parseInt(harga || 0, 10) * parseInt(kuantitas || 0, 10);
        setDpp((total - parseInt(value || 0, 10)) > 0 ? (total - parseInt(value || 0, 10)).toLocaleString("id-ID") : "");
    };

    const handleDppChange = (e) => {
        // DPP readonly, tidak bisa diubah manual
    };

    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
        if (!e.target.checked) setJumlah("");
    };

    const handleJumlahChange = (e) => {
        const value = e.target.value.replace(/[^0-9]/g, "");
        setJumlah(value);
        // Jika DPP Nilai Lain, DPP = jumlah
        setDpp(value ? parseInt(value, 10).toLocaleString("id-ID") : "");
    };

    const handleTarifPPnBMChange = (e) => {
        const value = e.target.value.replace(/[^0-9.]/g, "");
        setTarifPPnBM(value);
    };

    const handlePPnBMChange = (e) => {
        const value = e.target.value.replace(/[^0-9]/g, "");
        setPpnBM(value);
    };

    // Simpan Transaksi
    const handleSimpanTransaksi = () => {
        // Validasi sederhana
        if (!tipe || !selectedKode || !namaBarang || !selectedSatuan || !harga || !kuantitas) {
            alert("Mohon lengkapi data transaksi!");
            return;
        }
        // Simpan ke backend atau ke state transaksi (tambahkan sesuai kebutuhan)
        alert("Transaksi berhasil disimpan!");
        resetForm();
    };
    
    // Tentukan opsi detil transaksi berdasarkan jenis transaksi
    const detilTransaksiOptions =
        jenisTransaksi === "ekspor"
            ? eksporOptions
            : jenisTransaksi === "penyerahan dengan menggunakan dokumen tertentu"
            ? kodeTransaksiOptions
            : [];

    // Tentukan opsi dokumen transaksi berdasarkan jenis transaksi dan detil transaksi
    let dokumenTransaksiOptions = [];
    if (jenisTransaksi === "ekspor") {
        if (detilTransaksi?.value === "1") {
            dokumenTransaksiOptions = [
                { value: "peb", label: "Pemberitahuan Ekspor Barang" }
            ];
        } else if (detilTransaksi?.value === "2") {
            dokumenTransaksiOptions = [
                { value: "peb_bkp_jkp", label: "Pemberitahuan Ekspor BKP berwujud/pemberitahuan ekspor JKP" }
            ];
        } else if (detilTransaksi?.value === "3") {
            dokumenTransaksiOptions = [
                { value: "peb_bkp_tidak_berwujud_jkp", label: "Pemberitahuan Ekspor BKP Tidak berwujud/pemberitahuan ekspor JKP" }
            ];
        }
    } else if (jenisTransaksi === "penyerahan dengan menggunakan dokumen tertentu") {
        dokumenTransaksiOptions = [
            { value: "1", label: "1 - Dokumen Tertentu yang kedudukannya Dipersamakan dengan Faktur Pajak" },
            { value: "2", label: "2 - Dokumen Cukai CK1" },
            { value: "3", label: "3 - Dokumen Kawasan Berikat" },
        ];
    }

    // Untuk kodeTransaksi (agar disable DPP Nilai Lain jika kode 01)
    useEffect(() => {
        setKodeTransaksi(selectedKode);
    }, [selectedKode]);

    return (
        <div className='flex h-screen bg-gray-100'>
            <SideBarEFaktur />
            <div className="flex-grow p-6 bg-white h-full overflow-y-auto">
                <div className="flex justify-between items-center mb-4 pb-3 border-b">
                    <div className="flex items-center">
                        <IoDocumentTextOutline className="text-4xl text-blue-900" />
                        <h1 className="text-lg font-bold text-blue-900 ml-2">Tambah Faktur Keluaran Dokumen Lain</h1>
                    </div>
                </div>
                <div className='border rounded-md p-4 mb-2 cursor-pointer flex justify-between bg-gray-100' onClick={() => setShowDokumenTransaksiDokumenLain(!showDokumenTransaksiDokumenLain)}>
                    <h3 className='text-lg font-semibold'>Dokumen Transaksi</h3>
                    {showDokumenTransaksiDokumenLain ? <FaChevronUp /> : <FaChevronDown />}
                </div>
                {showDokumenTransaksiDokumenLain && (
                    <div className=' border rounded-md p-4 mb-2 mr-3 grid grid-cols-3 gap-4 w-auto'>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-900">
                                Jenis Transaksi <span className="text-red-500">*</span>
                            </label>
                            <select
                                className="p-2 border rounded w-full"
                                value={jenisTransaksi}
                                onChange={e => {
                                    setJenisTransaksi(e.target.value);
                                    setDetilTransaksi(null); // reset detil transaksi jika jenis berubah
                                }}
                            >
                                <option value="">Pilih Jenis Transaksi</option>
                                <option value="ekspor">Ekspor</option>
                                <option value="penyerahan dengan menggunakan dokumen tertentu">
                                    Penyerahan dengan Menggunakan Dokumen Tertentu
                                </option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-900">
                                Jenis Dokumen <span className="text-red-500">*</span>
                            </label>
                            <select className="p-2 border rounded w-full bg-gray-100" disabled>
                                <option value="normal">Normal</option>
                            </select>
                        </div>
                        <div className='space-y-2'>
                            <label className="block text-sm font-medium">Detil Transaksi</label>
                            <Select
                                className="w-full max-w-full"
                                options={detilTransaksiOptions}
                                value={detilTransaksi}
                                onChange={option => setDetilTransaksi(option)}
                                placeholder="Pilih Kode Transaksi"
                                isClearable
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-900">
                                Dokumen Transaksi <span className="text-red-500">*</span>
                            </label>
                            <Select
                                className='w-full max-w-full'
                                options={dokumenTransaksiOptions}
                                placeholder="Pilih Dokumen Transaksi"
                                isClearable
                            />
                        </div>
                        {(detilTransaksi?.value === "2" || detilTransaksi?.value === "3") && (
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-900">Kode</label>
                                <input
                                    type="text"
                                    className="p-2 border rounded w-full bg-gray-100"
                                    value={
                                        detilTransaksi?.value === "2"
                                            ? "EBPKPTB untuk ekspor BKP tidak berwujud"
                                            : detilTransaksi?.value === "3"
                                                ? "EJKP untuk ekspor JKP"
                                                : ""
                                    }
                                    disabled
                                    readOnly
                                />
                            </div>
                        )}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-900">Nomor Dokumen <span className="text-red-500">*</span></label>
                            <input type="text" className="p-2 border rounded w-full" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-900">Tanggal Dokumen <span className="text-red-500">*</span></label>
                            <input type="date" className="p-2 border rounded w-full" />
                        </div>
                        <div className='space-y-2'>
                            <label className='block text-sm font-medium'>Masa Pajak</label>
                            {/* <input type="month" className='p-2 border rounded w-full' /> */}
                            <select className='p-2 border rounded w-full' name='masaPajak' >
                                <option value="">Pilih Masa Pajak</option>
                                <option value="Januari">Januari</option>
                                <option value="Februari">Februari</option>
                                <option value="Maret">Maret</option>
                                <option value="April">April</option>
                                <option value="Mei">Mei</option>
                                <option value="Juni">Juni</option>
                                <option value="Juli">Juli</option>
                                <option value="Agustus">Agustus</option>
                                <option value="September">September</option>
                                <option value="Oktober">Oktober</option>
                                <option value="November">November</option>
                                <option value="Desember">Desember</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium">Tahun</label>
                            <Popover className="w-full p-2">
                                <PopoverTrigger asChild >
                                    <Button variant="outline" className="w-full justify-start ">
                                        {selectedYear.getFullYear()}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent align="start" className="w-auto p-0">
                                    <DatePicker
                                        selected={selectedYear}
                                        onChange={(date) => setSelectedYear(date)}
                                        showYearPicker
                                        dateFormat="yyyy"
                                        className="border p-2 rounded-md w-full text-center"
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                )}
                <div className='border rounded-md p-4 mb-2 cursor-pointer flex justify-between bg-gray-100' onClick={() => setShowInformasiPembeliDokumenLain(!showInformasiPembeliDokumenLain)}>
                    <h3 className='text-lg font-semibold'>Informasi Pembeli</h3>
                    {showInformasiPembeliDokumenLain ? <FaChevronUp /> : <FaChevronDown />}
                </div>
                {showInformasiPembeliDokumenLain && (
                    <div className="border rounded-md p-4 mb-2 mr-3 grid grid-cols-3 gap-4 w-auto">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-900">NPWP <span className="text-red-500">*</span></label>
                            <input type="text" className="p-2 border rounded w-full" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-900">Nama <span className="text-red-500">*</span></label>
                            <input type="text" className="p-2 border rounded w-full" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-900">Alamat <span className="text-red-500">*</span></label>
                            <input type="text" className="p-2 border rounded w-full" />
                        </div>
                    </div>
                )}
                <div className='border rounded-md p-4 mb-2 cursor-pointer flex justify-between bg-gray-100' onClick={() => setShowDetailTransaksiDokumenLain(!showDetailTransaksiDokumenLain)}>
                    <h3 className='text-lg font-semibold'>Detail Transaksi</h3>
                    {showDetailTransaksiDokumenLain ? <FaChevronUp /> : <FaChevronDown />}
                </div>
                {showDetailTransaksiDokumenLain && (
                    <div className="border rounded-md p-4 mb-2 mr-3">
                        {detilTransaksi?.value === "1" && (
                            <div className="border rounded-md p-4 mb-2 mr-3 grid grid-cols-3 gap-4 w-auto">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-900">DPP <span className="text-red-500">*</span></label>
                                    <input type="text" className="p-2 border rounded w-full" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-900">PPN <span className="text-red-500">*</span></label>
                                    <input type="text" className="p-2 border rounded w-full" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-900">PPnBM <span className="text-red-500">*</span></label>
                                    <input type="text" className="p-2 border rounded w-full" />
                                </div>
                            </div>
                        )}

                        {(detilTransaksi?.value === "2" || detilTransaksi?.value === "3") && (
                            <div className="border rounded-md p-4 mb-2 mr-3">
                                {/* AlertDialog & Tabel Transaksi */}
                                <div className="mt-8">
                                    <div className="flex gap-2 mb-4">
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <button className="flex items-center bg-blue-900 hover:bg-blue-950 text-white font-bold py-2 px-2 rounded">
                                                    Tambah
                                                </button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent className="bg-white rounded-md shadow-md p-4 !min-w-[1000px]">
                                                <AlertDialogHeader className="text-lg font-semibold ">
                                                    <AlertDialogTitle className="text-lg font-semibold border-b pb-2 w-full">
                                                        Tambah Transaksi
                                                    </AlertDialogTitle>
                                                </AlertDialogHeader>
                                                <div className="grid grid-cols-2 gap-6 w-full overflow-auto h-96">
                                                    {/* Kolom Kiri */}
                                                    <div className="space-y-4 h-full">
                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-medium">Tipe</label>
                                                            <div className="grid grid-cols-2 gap-3">
                                                                <div className="flex items-center gap-2">
                                                                    <label className="flex items-center gap-2">
                                                                        <input
                                                                            type="radio"
                                                                            name="tipe"
                                                                            value="Barang"
                                                                            checked={tipe === "Barang"}
                                                                            onChange={handleTipeChange}
                                                                        />
                                                                        Barang
                                                                    </label>
                                                                </div>
                                                                <div className="flex items-center gap-2">
                                                                    <label className="flex items-center gap-2">
                                                                        <input
                                                                            type="radio"
                                                                            name="tipe"
                                                                            value="Jasa"
                                                                            checked={tipe === "Jasa"}
                                                                            onChange={handleTipeChange}
                                                                        />
                                                                        Jasa
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {tipe && (
                                                            <div>
                                                                <label className="block text-sm font-medium">Kode Transaksi</label>
                                                                <select
                                                                    className="p-2 border rounded w-[250px] max-w-full"
                                                                    value={selectedKode}
                                                                    onChange={(e) => setSelectedKode(e.target.value)}
                                                                >
                                                                    <option value="">Pilih Kode Transaksi</option>
                                                                    {listKode.map(item => (
                                                                        <option key={item.id} value={item.kode}>
                                                                            {item.kode} - {item.nama_transaksi}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                        )}

                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-medium">Nama </label>
                                                            <input
                                                                type="text"
                                                                className="p-2 border rounded w-full"
                                                                value={namaBarang}
                                                                onChange={(e) => setNamaBarang(e.target.value)}
                                                                placeholder="Masukkan nama barang/jasa"
                                                            />
                                                        </div>
                                                        {tipe && (
                                                            <div className='space-y-2'>
                                                                <label className='block text-sm font-medium'>Satuan</label>
                                                                <select
                                                                    className="p-2 border rounded w-[250px] max-w-full"
                                                                    value={selectedSatuan}
                                                                    onChange={(e) => setSelectedSatuan(e.target.value)}
                                                                >
                                                                    <option value="">Pilih Satuan</option>
                                                                    {listSatuan.map(item => (
                                                                        <option key={item.id} value={item.satuan}>
                                                                            {item.satuan}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                        )}
                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-medium">Harga Satuan</label>
                                                            <input
                                                                type="text"
                                                                className="p-2 border rounded w-full"
                                                                value={harga}
                                                                onChange={handleHargaChange}
                                                                placeholder="Rp 0"
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-medium">Kuantitas</label>
                                                            <input
                                                                type="number"
                                                                className="p-2 border rounded w-full"
                                                                min="0"
                                                                step="1"
                                                                value={kuantitas === 0 ? '' : kuantitas}
                                                                onChange={handleKuantitasChange}
                                                                placeholder="0"
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-medium">Total Harga</label>
                                                            <input
                                                                type="text"
                                                                className="p-2 border rounded w-full bg-gray-100"
                                                                value={totalHarga}
                                                                readOnly
                                                                placeholder="Rp 0"
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-medium">Potongan Harga</label>
                                                            <input
                                                                type="text"
                                                                className="p-2 border rounded w-full"
                                                                value={potonganHarga}
                                                                onChange={handlePotonganHargaChange}
                                                                placeholder="Rp 0"
                                                            />
                                                        </div>

                                                    </div>

                                                    {/* Kolom Kanan */}
                                                    <div className="space-y-4 h-full ">
                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-medium">DPP</label>
                                                            <input
                                                                type="text"
                                                                className="p-2 border rounded w-full bg-gray-100"
                                                                value={dpp}
                                                                onChange={handleDppChange}
                                                                readOnly
                                                                placeholder="Rp 0"
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <div className="flex items-center gap-2 ">
                                                                <input
                                                                    type="checkbox"
                                                                    className="justify-start p-3 border rounded"
                                                                    checked={isChecked}
                                                                    onChange={handleCheckboxChange}
                                                                    disabled={kodeTransaksi === "01"}
                                                                />
                                                                <label className="block text-sm font-medium">
                                                                    DPP Nilai Lain / DPP
                                                                </label>
                                                            </div>

                                                            <div className="space-y-2">
                                                                <label className="block text-sm font-medium"></label>
                                                                <input
                                                                    type="text"
                                                                    className={`
                                                                                            p-2 border rounded w-full
                                                                                            ${isChecked ? '' : 'bg-gray-100'}
                                                                                        `}
                                                                    value={jumlah}
                                                                    onChange={handleJumlahChange}
                                                                    disabled={!isChecked}
                                                                    placeholder="Rp 0"
                                                                />
                                                            </div>
                                                            <div className="space-y-2">
                                                                <label className="block text-sm font-medium">PPN</label>
                                                                <input
                                                                    type="text"
                                                                    className="p-2 border rounded w-full bg-gray-100"
                                                                    value="12%"
                                                                    readOnly
                                                                />
                                                            </div>
                                                            <div className="space-y-2">
                                                                <label className="block text-sm font-medium">Tarif PPN</label>
                                                                <input
                                                                    type="text"
                                                                    className="p-2 border rounded w-full bg-gray-100"
                                                                    value={tarifPPN}
                                                                    readOnly
                                                                    placeholder="Rp 0"
                                                                />
                                                            </div>
                                                            <div className="space-y-2">
                                                                <label className="block text-sm font-medium">Tarif PPnBM (%)</label>
                                                                <input
                                                                    type="text"
                                                                    className="p-2 border rounded w-full"
                                                                    value={tarifPPnBM}
                                                                    onChange={handleTarifPPnBMChange}
                                                                    placeholder="Masukkan persen"
                                                                />
                                                            </div>
                                                            <div className="space-y-2">
                                                                <label className="block text-sm font-medium">PPnBM</label>
                                                                <input
                                                                    type="text"
                                                                    className="p-2 border rounded w-full"
                                                                    value={ppnBM}
                                                                    onChange={handlePPnBMChange}
                                                                    placeholder="Rp 0"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <AlertDialogFooter className="flex justify-end mt-6 space-x-2">
                                                    <AlertDialogCancel
                                                        className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                                                        onClick={resetForm}
                                                    >
                                                        Batal
                                                    </AlertDialogCancel>
                                                    <AlertDialogAction
                                                        className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-950"
                                                        onClick={handleSimpanTransaksi}
                                                    >
                                                        Simpan
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                        <button
                                            type="button"
                                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                            disabled
                                        >
                                            Hapus Transaksi
                                        </button>
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full border border-gray-300 rounded text-sm">
                                            <thead className="bg-gray-200">
                                                <tr>
                                                    <th className="p-2 border">Tipe</th>
                                                    <th className="p-2 border">Nama</th>
                                                    <th className="p-2 border">Kuantitas</th>
                                                    <th className="p-2 border">Satuan</th>
                                                    <th className="p-2 border">Harga Satuan</th>
                                                    <th className="p-2 border">Total Harga</th>
                                                    <th className="p-2 border">Potongan Harga</th>
                                                    <th className="p-2 border">Tarif PPN</th>
                                                    <th className="p-2 border">DPP</th>
                                                    <th className="p-2 border">PPN</th>
                                                    <th className="p-2 border">PPnBM</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {dummyRows.map((row, idx) => (
                                                    <tr key={idx} className="even:bg-gray-50">
                                                        <td className="p-2 border">{row.tipe}</td>
                                                        <td className="p-2 border">{row.nama}</td>
                                                        <td className="p-2 border">{row.kuantitas}</td>
                                                        <td className="p-2 border">{row.satuan}</td>
                                                        <td className="p-2 border">{row.hargaSatuan.toLocaleString('id-ID')}</td>
                                                        <td className="p-2 border">{row.totalHarga.toLocaleString('id-ID')}</td>
                                                        <td className="p-2 border">{row.potonganHarga.toLocaleString('id-ID')}</td>
                                                        <td className="p-2 border">{row.tarifPPN}</td>
                                                        <td className="p-2 border">{row.DPP.toLocaleString('id-ID')}</td>
                                                        <td className="p-2 border">{row.PPN.toLocaleString('id-ID')}</td>
                                                        <td className="p-2 border">{row.PPnBM.toLocaleString('id-ID')}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                            <tfoot>
                                                <tr className="font-semibold bg-gray-100">
                                                    <td className="p-2 border text-right" colSpan={5}>Jumlah</td>
                                                    <td className="p-2 border">{totalTotalHarga.toLocaleString('id-ID')}</td>
                                                    <td className="p-2 border">{totalPotonganHarga.toLocaleString('id-ID')}</td>
                                                    <td className="p-2 border"></td>
                                                    <td className="p-2 border">{totalDPP.toLocaleString('id-ID')}</td>
                                                    <td className="p-2 border">{totalPPN.toLocaleString('id-ID')}</td>
                                                    <td className="p-2 border"></td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default TambahFakturKeluaranDokumenLain
