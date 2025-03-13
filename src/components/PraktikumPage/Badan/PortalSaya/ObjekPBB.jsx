import React, { useState } from 'react'
import SidebarProfilSaya from './SidebarProfilSaya'
import { BsFiletypeXls } from "react-icons/bs"
import { IoDocumentTextOutline } from "react-icons/io5"

const ObjekPBB = () => {
    return (
        <div className='flex h-screen bg-gray-100'>
            <SidebarProfilSaya />
            <div className='flex-auto p-3 bg-white rounded-md h-full'>
                <div className='flex justify-between items-center mb-4 pb-3 border-b'>
                    <div className='flex items-center'>
                        <IoDocumentTextOutline className='text-4xl text-blue-900' />
                        <h1 className='text-lg font-bold text-blue-900 ml-2'>Objek Pajak Bumi dan Bangunan (PBB)</h1>
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
                                <th className="border border-gray-300 px-4 py-2">NOP</th>
                                <th className="border border-gray-300 px-4 py-2">Nama Objek Pajak</th>
                                <th className="border border-gray-300 px-4 py-2">Sektor</th>
                                <th className="border border-gray-300 px-4 py-2">Jenis/SubSektor</th>
                                <th className="border border-gray-300 px-4 py-2">Tipe Bumi</th>
                                <th className="border border-gray-300 px-4 py-2">Rincian</th>
                                <th className="border border-gray-300 px-4 py-2">Status Kegiatan</th>
                                <th className="border border-gray-300 px-4 py-2">Instansi Pemberi Izin</th>
                                <th className="border border-gray-300 px-4 py-2">Luas Objek Pajak</th>
                                <th className="border border-gray-300 px-4 py-2">Nomor Induk Berusaha</th>
                                <th className="border border-gray-300 px-4 py-2">Tanggal Nomor Induk Berusaha</th>
                                <th className="border border-gray-300 px-4 py-2">Nomor Ijin Objek</th>
                                <th className="border border-gray-300 px-4 py-2">Tanggal Ijin Objek</th>
                                <th className="border border-gray-300 px-4 py-2">Detail Alamat</th>
                                <th className="border border-gray-300 px-4 py-2">Provinsi</th>
                                <th className="border border-gray-300 px-4 py-2">Kota/Kabupaten</th>
                                <th className="border border-gray-300 px-4 py-2">Kecamatan</th>
                                <th className="border border-gray-300 px-4 py-2">Kelurahan/desa</th>
                                <th className="border border-gray-300 px-4 py-2">Kode Pos</th>
                                <th className="border border-gray-300 px-4 py-2">Data Geometri</th>
                                <th className="border border-gray-300 px-4 py-2">Tanggal Pendaftaran</th>
                                <th className="border border-gray-300 px-4 py-2">Tanggal Pencabutan Pendaftaran</th>
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

export default ObjekPBB;
