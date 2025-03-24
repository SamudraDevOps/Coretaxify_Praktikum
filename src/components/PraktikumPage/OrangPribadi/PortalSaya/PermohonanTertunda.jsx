import { useState } from 'react';
import SidebarProfilSaya from './SidebarProfilSaya';
import { BsFiletypeXls } from "react-icons/bs";
import { IoDocumentTextOutline } from "react-icons/io5";


const PermohonanTertunda = () => {
    return (
        <div className='flex h-screen bg-gray-100'>
            <SidebarProfilSaya />
            <div className='flex-auto p-3 bg-white rounded-md h-full'>
                <div className='flex justify-between items-center mb-4 pb-3 border-b'>
                    <div className='flex items-center'>
                        <IoDocumentTextOutline className='text-4xl text-blue-900' />
                        <h1 className='text-lg font-bold text-blue-900 ml-2'>Permohonan Tertunda</h1>
                    </div>
                </div>
                <div className="flex justify-between mb-4 border-b pb-3 " >
                    <button className="flex items-center bg-blue-900 hover:bg-blue-950 text-white font-bold py-2 px-2 rounded">
                        <BsFiletypeXls className="text-2xl text-white" />
                    </button>
                </div>
                <div className=' w-[1050px] overflow-x-auto bg-white shadow-md rounded-lg overflow-hidden mx-4 '>
                    <table className='table-auto border border-gray-300 overflow-hidden'>
                        <thead>
                            <tr>
                                <th className='border border-gray-300 px-1 py-2'>Permintaan Terbuka</th>
                                <th className='border border-gray-300 px-4 py-2'>Status Pemberian Akses Portal</th>
                                <th className='border border-gray-300 px-4 py-2'>Nama Wajib Pajak</th>
                                <th className='border border-gray-300 px-4 py-2'>NPWP</th>
                                <th className='border border-gray-300 px-4 py-2'>Nomor Penunjukan</th>
                                <th className="border border-gray-300 px-4 py-2">Tanggal Mulai</th>
                                <th className="border border-gray-300 px-4 py-2">Tanggal Berakhir</th>
                                <th className='border border-gray-300 px-4 py-2'>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan="24" className="text-center p-4 border">Belum ada Data</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default PermohonanTertunda;
