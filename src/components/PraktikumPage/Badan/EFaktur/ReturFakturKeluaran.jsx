import React, { useState, useRef } from 'react';
import SideBarEFaktur from "./SideBarEFaktur";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FaChevronDown, FaEdit, FaFilePdf } from "react-icons/fa";
import { TiDeleteOutline } from "react-icons/ti";

const ReturFakturKeluaran = () => {
    return (
        <div className='flex h-screen bg-gray-100'>
            <SideBarEFaktur />
            <div className="flex-auto p-3 bg-white rounded-md h-full w-min-0">
                <div className="flex justify-between items-center mb-4 pb-3 border-b">
                    <div className="flex items-center">
                        <IoDocumentTextOutline className="text-4xl text-blue-900" />
                        <h1 className="text-lg font-bold text-blue-900 ml-2">Retur Pajak Keluaran</h1>
                    </div>
                </div>
                <div className="flex justify-end mb-4 border-b pb-3">
                    <button className="flex items-center bg-red-800 hover:bg-red-900 text-white font-bold py-2 px-2 rounded">
                        <TiDeleteOutline className="text-2xl text-white mr-2" />
                        Batalkan Retur
                    </button>
                </div>
                <div className="w-[1040px] overflow-x-auto bg-white shadow-md rounded-lg overflow-hidden mx-4">
                    <table className='table-auto border border-gray-300 overflow-hidden'>
                        <thead className="bg-gray-200">
                            <tr>
                                <th className='border border-gray-300 px-1 py-2'>No</th>
                                <th className="px-4 py-2 border">NPWP Pembeli</th>
                                <th className="px-4 py-2 border">Nama Pembeli</th>
                                <th className="px-4 py-2 border">Kode Transaksi</th>
                                <th className="px-4 py-2 border">Nomor Faktur Pajak</th>
                                <th className="px-4 py-2 border">Tanggal Faktur Pajak</th>
                                <th className="px-4 py-2 border">Masa Pajak</th>
                                <th className="px-4 py-2 border">Tahun</th>
                                <th className="px-4 py-2 border">Status Faktur</th>
                                <th className="px-4 py-2 border">ESignStatus</th>
                                <th className="px-4 py-2 border">Harga Jual / Penggantian / DPP</th>
                                <th className="px-4 py-2 border">DPP Nilai Lain / DPP</th>
                                <th className="px-4 py-2 border">PPN</th>
                                <th className="px-4 py-2 border">PPnMB</th>
                                <th className="px-4 py-2 border">Penandatanganan</th>
                                <th className="px-4 py-2 border">Referensi</th>
                                <th className="px-4 py-2 border">Dilaporkan Oleh Pengguna</th>
                                <th className="px-4 py-2 border">Dilaporkan Oleh Pemungut PPN</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600">
                            <tr>
                                <td colSpan={17}>tidak ada data</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ReturFakturKeluaran;
