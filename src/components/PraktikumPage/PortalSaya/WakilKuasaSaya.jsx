import React, { useState } from 'react';
import SidebarProfilSaya from './SidebarProfilSaya';
import { BsFiletypeXls } from "react-icons/bs";
import { IoDocumentTextOutline } from "react-icons/io5";

const WakilKuasaSaya = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className='flex h-screen bg-gray-100'>
            <SidebarProfilSaya />
            <div className='flex-auto p-3 bg-white rounded-md h-full'>
                <div className='flex justify-between items-center mb-4 pb-3 border-b'>
                    <div className='flex items-center'>
                        <IoDocumentTextOutline className='text-4xl text-blue-900' />
                        <h1 className='text-lg font-bold text-blue-900 ml-2'>Wakil Kuasa Saya</h1>
                    </div>
                </div>
                <div className="flex justify-between mb-4 border-b pb-3 ">
                    <button className="flex items-center bg-blue-900 hover:bg-blue-950 text-white font-bold py-2 px-2 rounded">
                        <BsFiletypeXls className="text-2xl text-white" />
                    </button>
                </div>
                <div className='w-[1050px] overflow-x-auto bg-white shadow-md rounded-lg overflow-hidden'>
                    <table className='table-auto border border-gray-300 overflow-hidden'>
                        <thead>
                            <tr>
                                <th className='border border-gray-300 px-1 py-2'>Open Request</th>
                                <th className='border border-gray-300 px-4 py-2'>Aksi</th>
                                <th className='border border-gray-300 px-4 py-2'>NPWP</th>
                                <th className='border border-gray-300 px-4 py-2'>Nama</th>
                                <th className='border border-gray-300 px-4 py-2'>Jenis Perwakilan</th>
                                <th className='border border-gray-300 px-4 py-2'>ID Penunjuk Perwakilan</th>
                                <th className='border border-gray-300 px-4 py-2'>Nomor Dokumen Penunjuk Perwakilan</th>
                                <th className='border border-gray-300 px-4 py-2'>Izin Perwakilan</th>
                                <th className='border border-gray-300 px-4 py-2'>Status Penunjukkan</th>
                                <th className="border border-gray-300 px-4 py-2">Tanggal Disetujui</th>
                                <th className="border border-gray-300 px-4 py-2">Tanggal Ditolak</th>
                                <th className="border border-gray-300 px-4 py-2">Tanggal Dibatalkan</th>
                                <th className="border border-gray-300 px-4 py-2">Tanggal Tertunda</th>
                                <th className="border border-gray-300 px-4 py-2">Alasan</th>
                                <th className="border border-gray-300 px-4 py-2">Tanggal Mulai</th>
                                <th className="border border-gray-300 px-4 py-2">Tanggal Berakhir</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className='border border-gray-300 px-1 py-2'></td>
                                <td className='border border-gray-300 px-4 py-2'>
                                    <button className='p-3 text-blue-700'>
                                        Assign Roles
                                    </button>
                                </td>
                                <td className='border border-gray-300 px-4 py-2'>126671352712</td>
                                <td className='border border-gray-300 px-4 py-2'>Sabela Samudera Balakosa</td>
                                <td className='border border-gray-300 px-4 py-2'></td>
                                <td className='border border-gray-300 px-4 py-2'>D4892991</td>
                                <td className='border border-gray-300 px-4 py-2'></td>
                                <td className='border border-gray-300 px-4 py-2'>License</td>
                                <td className='border border-gray-300 px-4 py-2'>Disetujui</td>
                                <td className='border border-gray-300 px-4 py-2'></td>
                                <td className='border border-gray-300 px-4 py-2'></td>
                                <td className='border border-gray-300 px-4 py-2'></td>
                                <td className='border border-gray-300 px-4 py-2'></td>
                                <td className='border border-gray-300 px-4 py-2'></td>
                                <td className='border border-gray-300 px-4 py-2'></td>
                                <td className='border border-gray-300 px-4 py-2'></td>
                                <td className='border border-gray-300 px-4 py-2'></td>
                                
                            </tr>
                            <tr>
                                <td className='border border-gray-300 px-1 py-2'></td>
                                <td className='border border-gray-300 px-4 py-2'>
                                    <button className='p-3 text-blue-700'>
                                        Assign Roles
                                    </button>
                                </td>
                                <td className='border border-gray-300 px-4 py-2'>126671352712</td>
                                <td className='border border-gray-300 px-4 py-2'>Sabela Samudera Balakosa</td>
                                <td className='border border-gray-300 px-4 py-2'></td>
                                <td className='border border-gray-300 px-4 py-2'>D4892991</td>
                                <td className='border border-gray-300 px-4 py-2'></td>
                                <td className='border border-gray-300 px-4 py-2'>License</td>
                                <td className='border border-gray-300 px-4 py-2'>Disetujui</td>
                                <td className='border border-gray-300 px-4 py-2'></td>
                                <td className='border border-gray-300 px-4 py-2'></td>
                                <td className='border border-gray-300 px-4 py-2'></td>
                                <td className='border border-gray-300 px-4 py-2'></td>
                                <td className='border border-gray-300 px-4 py-2'></td>
                                <td className='border border-gray-300 px-4 py-2'></td>
                                <td className='border border-gray-300 px-4 py-2'></td>
                                <td className='border border-gray-300 px-4 py-2'></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default WakilKuasaSaya

