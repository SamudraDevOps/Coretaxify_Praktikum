import React, { useState } from 'react';
import SideBarEFaktur from './SideBarEFaktur';
import { IoDocumentTextOutline } from "react-icons/io5";
import { BsFiletypeXls } from "react-icons/bs";
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

const PajakKeluaran = () => {
    const [contacts, setContacts] = useState([]);
    return (
        <div className='flex h-screen bg-gray-100'>
            <SideBarEFaktur />

            <div className='flex-auto p-3 bg-white rounded-md h-full'>
                <div className='flex justify-between items-center mb-4 pb-3 border-b'>
                    <div className='flex items-center'>
                        <IoDocumentTextOutline className='text-4xl text-blue-900' />
                        <h1 className='text-lg font-bold text-blue-900 ml-2'>Pajak Keluaran</h1>
                    </div>
                </div>
                <div className="flex justify-between mb-4 border-b pb-3 ">
                    <div className="flex items-center gap-3">
                        <div className="relative inline-block text-left">
                            <div>
                                <button type="button" className="flex items-center bg-blue-900 hover:bg-blue-950 text-white font-bold py-2 px-2 rounded" id="menu-button" aria-expanded="true" aria-haspopup="true">
                                    Import
                                    <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>

                            <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                                <div className="py-1" role="none">
                                    <a href="/template-import-pajak-keluaran.xlsx" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">
                                        Download Template
                                    </a>
                                    <a className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-1">
                                        Import Dokumen 
                                    </a>
                                </div>
                            </div>
                        </div>
                        <button className="flex items-center bg-blue-900 hover:bg-blue-950 text-white font-bold py-2 px-2 rounded" onClick={() => window.location.href = '/admin/praktikum/2/e-faktur/pajak-keluaran/tambah-faktur-keluaran'}>
                            Tambah
                        </button>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className='flex items-center bg-blue-900 hover:bg-blue-950 text-white font-bold py-2 px-2 rounded'>
                            Upload Faktur
                        </button>
                        <button className='flex items-center bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-2 rounded'>
                            Hapus Dokumen
                        </button>
                    </div>
                </div>
                <div className="w-[1100px] overflow-x-auto bg-white shadow-md rounded-lg overflow-hidden mt-4">
                    <table className="table-auto border border-gray-300 w-full">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="px-6 py-2 border">No</th>
                                <th className="px-8 py-2 border">Checklist</th>
                                <th className="px-4 py-2 border">Aksi</th>
                                <th className="px-4 py-2 border">NPWP Pembeli / Identitas Lainnya</th>
                                <th className="px-4 py-2 border">Nama Pembeli</th>
                                <th className="px-4 py-2 border">Kode Transaksi</th>
                                <th className="px-4 py-2 border">Nomor Faktur Pajak</th>
                                <th className="px-4 py-2 border">Tanggal Faktur Pajak</th>
                                <th className="px-4 py-2 border">Masa Pajak</th>
                                <th className="px-4 py-2 border">Tahun</th>
                                <th className="px-4 py-2 border">Status Faktur</th>
                                <th className="px-4 py-2 border">ESignStatus</th>
                                <th className="px-4 py-2 border">Harga Jual / Penggantian / DPP</th>
                                <th className="px-4 py-2 border">PPn</th>
                                <th className="px-4 py-2 border">PPnBM</th>
                                <th className="px-4 py-2 border">Penandatanganan</th>
                                <th className="px-4 py-2 border">Referensi</th>
                                <th className="px-4 py-2 border">Dilaporkan Oleh Penjuak</th>
                                <th className="px-4 py-2 border">Dilaporkan Oleh Pemungutan PPN</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600">
                            {contacts.length === 0 ? (
                                <tr>
                                    <td colSpan="19" className="text-center p-4 border">Belum ada data</td>
                                </tr>
                            ) : (
                                contacts.map((contact, index) => (
                                    <tr key={index} className="bg-gray-100">
                                        <td className="px-4 py-4 border"><button>Edit</button></td>
                                        <td className="px-2 py-4 border">{contact.jenis}</td>
                                        <td className="px-4 py-4 border">{contact.telepon}</td>
                                        <td className="px-4 py-4 border">{contact.handphone}</td>
                                        <td className="px-4 py-4 border">{contact.faksimile}</td>
                                        <td className="px-4 py-4 border">{contact.email}</td>
                                        <td className="px-4 py-4 border">{contact.situsweb}</td>
                                        <td className="px-4 py-4 border">{contact.keterangan}</td>
                                        <td className="px-4 py-4 border">{contact.tanggalMulai}</td>
                                        <td className="px-4 py-4 border">{contact.tanggalBerakhir}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default PajakKeluaran;
