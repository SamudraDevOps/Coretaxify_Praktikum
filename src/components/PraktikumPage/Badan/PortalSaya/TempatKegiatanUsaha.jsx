import React, { useState } from 'react'
import SidebarProfilSayaBadan from './SidebarProfilSaya'
import { BsFiletypeXls } from "react-icons/bs"
import { IoDocumentTextOutline } from "react-icons/io5"

const TempatKegiatanUsahaBadan = () => {
    return (
        <div className='flex h-screen bg-gray-100'>
            <SidebarProfilSayaBadan />
            <div className='flex-auto p-3 bg-white rounded-md h-full'>
                <div className='flex justify-between items-center mb-4 pb-3 border-b'>
                    <div className='flex items-center'>
                        <IoDocumentTextOutline className='text-4xl text-blue-900' />
                        <h1 className='text-lg font-bold text-blue-900 ml-2'>Tempat Kegiatan Usaha</h1>
                    </div>
                </div>
                <div className="flex justify-between mb-4 border-b pb-3 ">
                    <button className="flex items-center bg-blue-900 hover:bg-blue-950 text-white font-bold py-2 px-2 rounded">
                        <BsFiletypeXls className="text-2xl text-white" />
                    </button>
                </div>
                <div className=" w-[1050px] overflow-x-auto bg-white shadow-md rounded-lg overflow-hidden ">
                    <table className="table-auto border border-gray-300 overflow-hidden">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 px-1 py-2">Aksi</th>
                                <th className="border border-gray-300 px-4 py-2">NITKU</th>
                                <th className="border border-gray-300 px-4 py-2">Jenis TKU</th>
                                <th className="border border-gray-300 px-4 py-2">Nama TKU</th>
                                <th className="border border-gray-300 px-4 py-2">KLU TKU</th>
                                <th className="border border-gray-300 px-4 py-2">Deskripsi KLU TKU</th>
                                <th className="border border-gray-300 px-4 py-2">Nama PIC Kegiatan</th>
                                <th className="border border-gray-300 px-4 py-2">Detail Alamat</th>
                                <th className="border border-gray-300 px-4 py-2">RT</th>
                                <th className="border border-gray-300 px-4 py-2">RW</th>
                                <th className="border border-gray-300 px-4 py-2">Provinsi</th>
                                <th className="border border-gray-300 px-4 py-2">Kabupaten/Kota</th>
                                <th className="border border-gray-300 px-4 py-2">Kecamatan</th>
                                <th className="border border-gray-300 px-4 py-2">Kelurahan/Desa</th>
                                <th className="border border-gray-300 px-4 py-2">Kode Wilayah</th>
                                <th className="border border-gray-300 px-4 py-2">Kode Pos</th>
                                <th className="border border-gray-300 px-4 py-2">Data Geometri</th>
                                <th className="border border-gray-300 px-4 py-2">Lokasi yang disewa</th>
                                <th className="border border-gray-300 px-4 py-2">Tanggal Mulai Sewa</th>
                                <th className="border border-gray-300 px-4 py-2">Tanggal Berakhir Sewa</th>
                                <th className="border border-gray-300 px-4 py-2">Tanggal Mulai</th>
                                <th className="border border-gray-300 px-4 py-2">Tanggal Berakhir</th>
                                <th className="border border-gray-300 px-4 py-2">Apakah Toko Eceran Pengembalian PPN?</th>
                                <th className="border border-gray-300 px-4 py-2">Apakah Zona Perdagangan Bebas?</th>
                                <th className="border border-gray-300 px-4 py-2">Kawasan Ekonomi Khusus?</th>
                                <th className="border border-gray-300 px-4 py-2">Tempat Penimbunan Berikat?</th>
                                <th className="border border-gray-300 px-4 py-2">Tempat Penimbunan Berikat</th>
                                <th className="border border-gray-300 px-4 py-2">Nomor Surat Keputusan</th>
                                <th className="border border-gray-300 px-4 py-2">Nomor Surat Keputusan Dari</th>
                                <th className="border border-gray-300 px-4 py-2">Tanggal Berakhirnya Keputusan</th>
                                <th className="border border-gray-300 px-4 py-2">Kantor Virtual</th>
                                <th className="border border-gray-300 px-4 py-2">Alamat PPN</th>
                                <th className="border border-gray-300 px-4 py-2">Kode KPP</th>
                                <th className="border border-gray-300 px-4 py-2">Seksi Pengawasan</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600">
                            <tr>
                                <td colSpan="24" className="text-center p-4 border">Belum ada Data</td>
                            </tr>
                            {/* <tr className="bg-gray-100">
                                <td className="px-1 py-4 border">
                                    <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-2 rounded">Edit</button>
                                </td>
                                <td className="px-4 py-4 border">Bank Syariah Indonesia</td>
                                <td className="px-4 py-4 border">1234567890</td>
                                <td className="px-4 py-4 border">Rekening Koran</td>
                                <td className="px-4 py-4 border">01-01-2023</td>
                                <td className="px-4 py-4 border">01-01-2023</td>
                            </tr> */}

                        </tbody>

                    </table>

                </div>
            </div>
        </div>
    )
}

export default TempatKegiatanUsahaBadan;
