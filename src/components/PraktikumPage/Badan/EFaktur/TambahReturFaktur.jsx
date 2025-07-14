import React, { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp, } from "react-icons/fa";
import { FaSquarePen } from "react-icons/fa6";
import SideBarEfaktur from "./SideBarEFaktur";
import { IoDocumentTextOutline } from "react-icons/io5";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogAction,
    AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { NumericFormat } from "react-number-format";
import { FiX } from "react-icons/fi";
import Select from "react-select";

const TambahReturFaktur = () => {
    const [showDokumenTransaksi, setShowDokumenTransaksi] = useState(true);
    const [showDetailTransaksi, setShowDetailTransaksi] = useState(true);
    const [tipe, setTipe] = useState("");
    const [namaBarang, setNamaBarang] = useState("");
    const [kode, setKode] = useState("");
    const [satuan, setSatuan] = useState("");
    const [hargaSatuan, setHargaSatuan] = useState("");
    const [kuantitas, setKuantitas] = useState(0);
    const [totalHarga, setTotalHarga] = useState("");
    const [potonganHarga, setPotonganHarga] = useState("");
    const [dpp, setDPP] = useState("");
    const [jumlah, setJumlah] = useState("");
    const [ppn, setPPN] = useState("");
    const [tarifPPnBM, setTarifPPnBM] = useState("");
    const [ppnbm, setPPnBM] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    const [dppRetur, setDppRetur] = useState('');
    const [ppnRetur, setPpnRetur] = useState('');

    function formatRupiah(value) {
        const numberString = value?.toString().replace(/[^0-9]/g, "") || "0";
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(numberString || 0);
    }

    function updatePPN(newJumlah) {
        const numericJumlah = parseInt(newJumlah || "0", 10) || 0;
        setPPN(formatRupiah((numericJumlah * 0.12).toString())); // 12%
        // Hitung PPnBM jika tarif diisi
        if (tarifPPnBM) {
            const numericPPnBM = parseInt(tarifPPnBM.replace(/\D/g, ""), 10) || 0;
            setPPnBM(formatRupiah(((numericJumlah * numericPPnBM) / 100).toString()));
        }
    }

    // Handler untuk perubahan input
    const handleHargaSatuanChange = (value) => {
        setHargaSatuan(value);
        const numericHarga = parseInt(value || "0", 10) || 0;
        const newTotal = numericHarga * (parseInt(kuantitas, 10) || 0);
        setTotalHarga(newTotal);
        const newDPP = newTotal - (parseInt(potonganHarga, 10) || 0);
        setDPP(newDPP);
        if (!isChecked) setJumlah(newDPP);
        updatePPN(newDPP);
    };

    const handleKuantitasChange = (value) => {
        setKuantitas(value);
        const numericHarga = parseInt(hargaSatuan || "0", 10) || 0;
        const newTotal = numericHarga * (parseInt(value, 10) || 0);
        setTotalHarga(newTotal);
        const newDPP = newTotal - (parseInt(potonganHarga, 10) || 0);
        setDPP(newDPP);
        if (!isChecked) setJumlah(newDPP);
        updatePPN(newDPP);
    };

    const handlePotonganHargaChange = (value) => {
        setPotonganHarga(value);
        const numericTotal = parseInt(totalHarga || "0", 10) || 0;
        const numericPotongan = parseInt(value || "0", 10) || 0;
        const newDPP = numericTotal - numericPotongan;
        setDPP(newDPP);
        if (!isChecked) setJumlah(newDPP);
        updatePPN(newDPP);
    };

    const handleTarifPPnBMChange = (value) => {
        setTarifPPnBM(value);
        const numericJumlah = parseInt(jumlah || "0", 10) || 0;
        const numericPPnBM = parseInt(value.replace(/\D/g, ""), 10) || 0;
        setPPnBM(formatRupiah(((numericJumlah * numericPPnBM) / 100).toString()));
    };

    const handleJumlahChange = (value) => {
        if (isChecked) {
            setJumlah(value);
            updatePPN(value);
        }
    };

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
        if (!isChecked) {
            setJumlah(dpp);
            updatePPN(dpp);
        }
    };

    return (
        <div className="flex items-start">
            <SideBarEfaktur />
            <div className="w-full flex-grow p-6 bg-white h-full">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Edit Faktur Pajak Masukan
                </h2>
                <div
                    className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 "
                    onClick={() => setShowDokumenTransaksi(!showDokumenTransaksi)}
                >
                    <h3 className="text-lg font-semibold">Dokumen Transaksi</h3>
                    {showDokumenTransaksi ? <FaChevronUp /> : <FaChevronDown />}
                </div>
                {showDokumenTransaksi && (
                    <div className="border rounded-md p-2 mb-2">
                        <div className=" rounded-md p-4 mb-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium">
                                    Nomor Faktur
                                </label>
                                <input type="text"
                                    className="border rounded-md p-2 w-full" />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium">
                                    Tanggal Faktur
                                </label>
                                <input type="date"
                                    className="border rounded-md p-2 w-full" />
                            </div>
                            <div className="space-y-2"></div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium">
                                    NPWP
                                </label>
                                <input type="text"
                                    className="border rounded-md p-2 w-full cursor-not-allowed bg-gray-100" disabled />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium">
                                    Nama Penjual
                                </label>
                                <input type="text"
                                    className="border rounded-md p-2 w-full cursor-not-allowed bg-gray-100" disabled />
                            </div>
                            <div className="space-y-2"></div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium">
                                    Nomor Retur
                                </label>
                                <input type="text"
                                    className="border rounded-md p-2 w-full cursor-not-allowed bg-gray-100" disabled />
                            </div>
                            <div className="space-y-2"></div>
                            <div className="space-y-2"></div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium">
                                    Tanggal Retur
                                </label>
                                <input type="date"
                                    className="border rounded-md p-2 w-full" />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium">
                                    Periode Retur
                                </label>
                                <input type="month"
                                    className="border rounded-md p-2 w-full" />
                            </div>
                            <div className="space-y-2"></div>
                        </div>
                        <div className="rounded-md p-4 mb-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium">
                                    DPP diretur *
                                </label>
                                <input type="text"
                                    className="border rounded-md p-2 w-full cursor-not-allowed bg-gray-100" disabled />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium">
                                    Maks *
                                </label>
                                <input type="text"
                                    className="border rounded-md p-2 w-full cursor-not-allowed bg-gray-100" disabled />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium">
                                    DPP Nilai Lain diretur *
                                </label>
                                <input type="text"
                                    className="border rounded-md p-2 w-full cursor-not-allowed bg-gray-100" disabled />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium">
                                    Maks *
                                </label>
                                <input type="text"
                                    className="border rounded-md p-2 w-full cursor-not-allowed bg-gray-100" disabled />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium">
                                    PPN diretur *
                                </label>
                                <input type="text"
                                    className="border rounded-md p-2 w-full cursor-not-allowed bg-gray-100" disabled />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium">
                                    Maks *
                                </label>
                                <input type="text"
                                    className="border rounded-md p-2 w-full cursor-not-allowed bg-gray-100" disabled />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium">
                                    PPnBM diretur *
                                </label>
                                <input type="text"
                                    className="border rounded-md p-2 w-full cursor-not-allowed bg-gray-100" disabled />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium">
                                    Maks *
                                </label>
                                <input type="text"
                                    className="border rounded-md p-2 w-full cursor-not-allowed bg-gray-100" disabled />
                            </div>
                        </div>
                    </div>
                )}
                <div
                    className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 "
                    onClick={() => setShowDetailTransaksi(!showDetailTransaksi)}
                >
                    <h3 className="text-lg font-semibold">Dokumen Transaksi</h3>
                    {showDetailTransaksi ? <FaChevronUp /> : <FaChevronDown />}
                </div>
                {showDetailTransaksi && (
                    <div className="border rounded-md p-2 mb-2">
                        <div className="w-auto overflow-x-auto bg-white shadow-md rounded-lg overflow-hidden">
                            <table className="table-auto border border-gray-300 overflow-hidden">
                                <thead>
                                    <tr>
                                        <th className="border border-gray-300 px-2 py-2">

                                        </th>
                                        <th className="border border-gray-300 px-2 py-2">

                                        </th>
                                        <th className="border border-gray-300 px-4 py-2">
                                            Tipe
                                        </th>
                                        <th className="border border-gray-300 px-4 py-2">
                                            Nama
                                        </th>
                                        <th className="border border-gray-300 px-4 py-2">
                                            Kode
                                        </th>
                                        <th className="border border-gray-300 px-4 py-2">
                                            Kuantitas
                                        </th>
                                        <th className="border border-gray-300 px-4 py-2">
                                            Satuan
                                        </th>
                                        <th className="border border-gray-300 px-4 py-2">
                                            Harga Satuan
                                        </th>
                                        <th className="border border-gray-300 px-4 py-2">
                                            Total Harga
                                        </th>
                                        <th className="border border-gray-300 px-4 py-2">
                                            Potongan Harga
                                        </th>
                                        <th className="border border-gray-300 px-4 py-2">
                                            Tarif PPN
                                        </th>
                                        <th className="border border-gray-300 px-4 py-2">
                                            DPP
                                        </th>
                                        <th className="border border-gray-300 px-4 py-2">
                                            PPN
                                        </th>
                                        <th className="border border-gray-300 px-4 py-2">
                                            DPP Nilai Lain/DPP
                                        </th>
                                        <th className="border border-gray-300 px-4 py-2">
                                            PPnBM
                                        </th>
                                        <th className="border border-gray-300 px-4 py-2">
                                            Tarif PPnBM
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    <tr>
                                        <td className="border border-gray-300 px-2 py-2" >
                                            <input type="checkbox" />
                                        </td>
                                        <td className="border border-gray-300 px-2 py-2">
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <button>
                                                        <FaSquarePen className="text-lg text-blue-900" />
                                                    </button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent className="bg-white rounded-md shadow-md p-4 !min-w-[1000px]">
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>
                                                            Edit Transaksi
                                                        </AlertDialogTitle>
                                                    </AlertDialogHeader>
                                                    <div className="grid grid-cols-2 gap-6 w-full overflow-auto h-96">
                                                        <div className="space-y-4 h-full">
                                                            <div className="space-y-2">
                                                                <label className="block text-sm font-medium">Tipe</label>
                                                                <div className="grid grid-cols-2 gap-3">
                                                                    <label className="flex items-center gap-2">
                                                                        <input
                                                                            type="radio"
                                                                            name="tipe"
                                                                            value="Barang"
                                                                            checked={tipe === "Barang"}
                                                                            onChange={() => setTipe("Barang")}
                                                                        />
                                                                        Barang
                                                                    </label>
                                                                    <label className="flex items-center gap-2">
                                                                        <input
                                                                            type="radio"
                                                                            name="tipe"
                                                                            value="Jasa"
                                                                            checked={tipe === "Jasa"}
                                                                            onChange={() => setTipe("Jasa")}
                                                                        />
                                                                        Jasa
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <div className="space-y-2">
                                                                <label className="block text-sm font-medium">
                                                                    Kode
                                                                </label>
                                                                <Select
                                                                    placeholder="Pilih kode barang/jasa"
                                                                    className="w-full"
                                                                />
                                                            </div>
                                                            <div className="space-y-2">
                                                                <label className="block text-sm font-medium">Nama</label>
                                                                <input
                                                                    type="text"
                                                                    className="p-2 border rounded w-full bg-gray-100"
                                                                    value={namaBarang}
                                                                    onChange={e => setNamaBarang(e.target.value)}
                                                                    placeholder="Galeh Ganteng Serigala"
                                                                    readOnly
                                                                />
                                                            </div>
                                                            <div className="space-y-2">
                                                                <label className="block text-sm font-medium">Satuan</label>
                                                                <select id=""
                                                                    className="p-2 border rounded w-full bg-gray-100"
                                                                ></select>
                                                            </div>
                                                            <div className="space-y-2">
                                                                <label className="block text-sm font-medium">Harga Satuan</label>
                                                                <NumericFormat
                                                                    value={hargaSatuan}
                                                                    onValueChange={({ value }) => handleHargaSatuanChange(value)}
                                                                    thousandSeparator="."
                                                                    decimalSeparator=","
                                                                    prefix="Rp "
                                                                    className="p-2 border rounded w-full bg-gray-100"
                                                                    placeholder="Rp 0"
                                                                    allowNegative={false}
                                                                    readOnly
                                                                />
                                                            </div>
                                                            {/* <div className="space-y-2">
                                                                <label className="block text-sm font-medium">Kuantitas</label>
                                                                <input
                                                                    type="number"
                                                                    className="p-2 border rounded w-full"
                                                                    min="0"
                                                                    step="1"
                                                                    value={kuantitas === 0 ? "" : kuantitas}
                                                                    onChange={e => handleKuantitasChange(e.target.value)}
                                                                    placeholder="0"
                                                                />
                                                            </div> */}
                                                            <div className="grid grid-cols-2 gap-4">
                                                                <div className="space-y-2">
                                                                    <label className="block text-sm font-medium">
                                                                        Jumlah Barang Diretur
                                                                    </label>
                                                                    <input
                                                                        type="number"
                                                                        className="p-2 border rounded w-full bg-gray-100"
                                                                        placeholder="0"
                                                                        readOnly
                                                                    />
                                                                </div>
                                                                <div className="space-y-2">
                                                                    <label className="block text-sm font-medium">
                                                                        KUANTITAS
                                                                    </label>
                                                                    <input className="p-2 border rounded w-full bg-gray-100"
                                                                        type="number"
                                                                        placeholder="0"
                                                                        readOnly
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="space-y-2">
                                                                <label className="block text-sm font-medium">
                                                                    Total Harga
                                                                </label>
                                                                <input
                                                                    type="number"
                                                                    className="p-2 border rounded w-full bg-gray-100"
                                                                    readOnly
                                                                />
                                                            </div>
                                                            <div className="grid grid-cols-2 gap-4">
                                                                <div className="space-y-2">
                                                                    <label className="block text-sm font-medium">
                                                                        Potongan Harga Diretur
                                                                    </label>
                                                                    <input
                                                                        type="number"
                                                                        className="p-2 border rounded w-full bg-gray-100"
                                                                        placeholder="0"
                                                                        readOnly
                                                                    />
                                                                </div>
                                                                <div className="space-y-2">
                                                                    <label className="block text-sm font-medium">
                                                                        Potongan Harga
                                                                    </label>
                                                                    <input className="p-2 border rounded w-full bg-gray-100"
                                                                        type="number"
                                                                        placeholder="0"
                                                                        readOnly
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="space-y-4 h-full">
                                                            <div className="text-center">
                                                                PPN dan PPnBM
                                                            </div>
                                                            <div className="grid grid-cols-2 gap-4">
                                                                <div className="space-y-2">
                                                                    <label className="block text-sm font-medium">
                                                                        DPP diretur
                                                                    </label>
                                                                    <NumericFormat
                                                                        className="p-2 border rounded w-full bg-gray-100"
                                                                        placeholder="0"
                                                                        thousandSeparator="."
                                                                        decimalSeparator=","
                                                                        prefix="Rp "
                                                                        allowNegative={false}
                                                                        readOnly
                                                                    />
                                                                </div>
                                                                <div className="space-y-2">
                                                                    <label className="">
                                                                        DPP
                                                                    </label>
                                                                    <NumericFormat
                                                                        className="p-2 border rounded w-full bg-gray-100"
                                                                        placeholder="0"
                                                                        thousandSeparator="."
                                                                        decimalSeparator=","
                                                                        prefix="Rp "
                                                                        allowNegative={false}
                                                                        readOnly
                                                                    />
                                                                </div>
                                                                <div className="space-y-2">
                                                                    <label className="block text-sm font-medium">
                                                                        DPP Nilai Lain diretur
                                                                    </label>
                                                                    <NumericFormat
                                                                        className="p-2 border rounded w-full"
                                                                        placeholder="0"
                                                                        thousandSeparator="."
                                                                        decimalSeparator=","
                                                                        prefix="Rp "
                                                                        allowNegative={false}
                                                                        value={dppRetur}
                                                                        onValueChange={({ value }) => {
                                                                            setDppRetur(value);
                                                                            const dppNumber = parseInt(value || '0', 10);
                                                                            setPpnRetur((dppNumber * 0.12).toString());
                                                                        }}
                                                                        
                                                                    />
                                                                </div>
                                                                <div className="space-y-2">
                                                                    <label className="">
                                                                        DPP Nilai Lain/DPP
                                                                    </label>
                                                                    <NumericFormat
                                                                        className="p-2 border rounded w-full bg-gray-100"
                                                                        placeholder="0"
                                                                        thousandSeparator="."
                                                                        decimalSeparator=","
                                                                        prefix="Rp "
                                                                        allowNegative={false}
                                                                        readOnly
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="space-y-2">
                                                                <label className="block text-sm font-medium">
                                                                    Tarif PPN
                                                                </label>
                                                                <input type="text"
                                                                    className="p-2 rounded-md border w-full bg-gray-100"
                                                                    value="12%"
                                                                    readOnly
                                                                />
                                                            </div>
                                                            <div className="grid grid-cols-2 gap-4">
                                                                <div className="space-y-2">
                                                                    <label className="block text-sm font-medium">
                                                                        PPN diretur
                                                                    </label>
                                                                    <NumericFormat
                                                                        className="p-2 border rounded w-full bg-gray-100"
                                                                        placeholder="0"
                                                                        thousandSeparator="."
                                                                        decimalSeparator=","
                                                                        prefix="Rp "
                                                                        allowNegative={false}
                                                                        value={ppnRetur}
                                                                        displayType="input"
                                                                        readOnly
                                                                    />
                                                                </div>
                                                                <div className="space-y-2">
                                                                    <label className="block text-sm font-medium">
                                                                        PPN
                                                                    </label>
                                                                    <NumericFormat
                                                                        className="p-2 border rounded w-full bg-gray-100"
                                                                        placeholder="0"
                                                                        thousandSeparator="."
                                                                        decimalSeparator=","
                                                                        prefix="Rp "
                                                                        allowNegative={false}
                                                                        value={ppnRetur}
                                                                        displayType="input"
                                                                        readOnly
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="grid grid-cols-2 gap-4">
                                                                <div className="space-y-2">
                                                                    <label className="block text-sm font-medium">
                                                                        PPN diretur
                                                                    </label>
                                                                    <NumericFormat
                                                                        className="p-2 border rounded w-full bg-gray-100"
                                                                        placeholder="0"
                                                                        thousandSeparator="."
                                                                        decimalSeparator=","
                                                                        prefix="Rp "
                                                                        allowNegative={false}
                                                                        readOnly
                                                                    />
                                                                </div>
                                                                <div className="space-y-2">
                                                                    <label className="block text-sm font-medium">
                                                                        PPN
                                                                    </label>
                                                                    <NumericFormat
                                                                        className="p-2 border rounded w-full"
                                                                        placeholder="0"
                                                                        thousandSeparator="."
                                                                        decimalSeparator=","
                                                                        prefix="Rp "
                                                                        allowNegative={false}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="space-y-2">
                                                                <label className="block text-sm font-medium">
                                                                    Tarif PPnBM (%)
                                                                </label>
                                                                <input type="text"
                                                                    className="p-2 rounded-md border w-full bg-gray-100"
                                                                    readOnly
                                                                />
                                                            </div>
                                                            <div className="grid grid-cols-2 gap-4">
                                                                <div className="space-y-2">
                                                                    <label className="block text-sm font-medium">
                                                                        PPnBM diretur
                                                                    </label>
                                                                    <NumericFormat
                                                                        className="p-2 border rounded w-full bg-gray-100"
                                                                        placeholder="0"
                                                                        thousandSeparator="."
                                                                        decimalSeparator=","
                                                                        prefix="Rp "
                                                                        allowNegative={false}
                                                                        readOnly
                                                                    />
                                                                </div>
                                                                <div className="space-y-2">
                                                                    <label className="block text-sm font-medium">
                                                                        PPnBM
                                                                    </label>
                                                                    <NumericFormat
                                                                        className="p-2 border rounded w-full bg-gray-100"
                                                                        placeholder="0"
                                                                        thousandSeparator="."
                                                                        decimalSeparator=","
                                                                        prefix="Rp "
                                                                        allowNegative={false}
                                                                        readOnly
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">Batal</AlertDialogCancel>
                                                        <AlertDialogAction className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-950">Simpan</AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </td>
                                        <td colSpan={14} className="text-gray-400">
                                            lanjut bang
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
                <div className="flex space-x-4 mt-4">
                    <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
                        Batalkan Konsep
                    </button>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                                Upload Konsep
                            </button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-white rounded-md shadow-md p-4 !min-w-[1000px]">
                            <AlertDialogHeader className="flex flex-row items-center justify-between gap-4">
                                <AlertDialogTitle className="text-lg font-semibold">
                                    Tanda Tangan Dokumen
                                </AlertDialogTitle>
                                <AlertDialogCancel asChild>
                                    <button
                                        className="text-gray-500 hover:text-gray-700 text-2xl font-bold px-2 py-0 rounded-md focus:outline-none"
                                        aria-label="Close"
                                    >
                                        <FiX />
                                    </button>
                                </AlertDialogCancel>
                            </AlertDialogHeader>
                            <div className="p-2 border rounded-md">
                                <div className="block text-sm font-bold">Tanda Tangan</div>
                                <div className=" p-2 rounded-md border">
                                    <div className="space-y-2 grid grid-cols-2 items-center">
                                        <label className="block text-sm font-medium">Jenis Penandatanganan *</label>
                                        <input type="text"
                                            className="w-full p-2 border rounded-md bg-gray-100" readOnly />
                                    </div>
                                    <div className="space-y-2 grid grid-cols-2 items-center">
                                        <label className="block text-sm font-medium">Penyedia Penandatangan *</label>
                                        <input type="text"
                                            className="w-full p-2 border rounded-md bg-gray-100" readOnly />
                                    </div>
                                    <div className="space-y-2 grid grid-cols-2 items-center">
                                        <label className="block text-sm font-medium">ID Penandatangan *</label>
                                        <input type="text"
                                            className="w-full p-2 border rounded-md bg-gray-100" readOnly />
                                    </div>
                                    <div className="space-y-2 grid grid-cols-2 items-center">
                                        <label className="block text-sm font-medium">Kata Sandi Penandatangan *</label>
                                        <input type="text"
                                            className="w-full p-2 border rounded-md " />
                                    </div>
                                </div>
                            </div>
                            <AlertDialogFooter>
                                <AlertDialogAction className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Simpan</AlertDialogAction>
                                <AlertDialogAction className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-950">Konfirmasi Tanda Tangan</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>

            </div>
        </div>
    )
}

export default TambahReturFaktur
