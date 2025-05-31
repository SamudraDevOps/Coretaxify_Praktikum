import { React, useState } from 'react'
import SideBarEFaktur from './SideBarEFaktur'
import { IoDocumentTextOutline } from "react-icons/io5";
import { FaCalendarAlt, FaFilter, FaSearch, FaTimes, FaChevronDown, FaChevronUp } from "react-icons/fa";

const TambahFakturKeluaranDokumenLain = () => {
    const [showDokumenTransaksiDokumenLain, setShowDokumenTransaksiDokumenLain] = useState(false);
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
                    <div className=' border rounded-md p-4 mb-2 mr-3 grid grid-cols-3 gap-4 min-w-full'>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-900">Jenis Transaksi <span className="text-red-500">*</span></label>
                            <select className="p-2 border rounded w-full">
                                <option value="">Pilih Jenis Transaksi</option>
                                <option value="ekspor">Ekspor</option>
                                <option value="penyerahan dengan menggunakan dokumen tertentu">Penyerahan dengan Menggunakan Dokumen Tertentu</option>
                            </select>
                        </div>
                        <div className="space-y-2" >
                            <label className="text-sm font-medium text-gray-900">Jenis Dokumen <span className="text-red-500">*</span></label>
                            <select className="p-2 border rounded w-full bg-gray-100" disabled>
                                <option value="normal">Normal</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-900">Detil Transaksi <span className="text-red-500">*</span></label>
                            <select className="p-2 border rounded w-full">
                                <option value="">Pilih Kode Transaksi</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-900">Dokumen Transaksi <span className="text-red-500">*</span></label>
                            <select className="p-2 border rounded w-full">
                                <option value="">Pilih Dokumen Transaksi</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-900">Nomor Dokumen <span className="text-red-500">*</span></label>
                            <input type="text" className="p-2 border rounded w-full" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default TambahFakturKeluaranDokumenLain
