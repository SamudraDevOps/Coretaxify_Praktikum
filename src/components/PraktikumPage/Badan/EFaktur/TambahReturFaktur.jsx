import React, { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp, } from "react-icons/fa";
import SideBarEfaktur from "./SideBarEFaktur";
import { IoDocumentTextOutline } from "react-icons/io5";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TambahReturFaktur = () => {
    const [showDokumenTransaksi, setShowDokumenTransaksi] = useState(true);
    const [showDetailTransaksi, setShowDetailTransaksi] = useState(false);

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
                                        <td className="border border-gray-300 px-2 py-2">
                                            2
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default TambahReturFaktur
