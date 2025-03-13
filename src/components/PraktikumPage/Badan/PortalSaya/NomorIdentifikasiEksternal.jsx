import React, { useState } from 'react';
import SidebarProfilSaya from './SidebarProfilSaya';
import { BsFiletypeXls } from "react-icons/bs";
import { IoDocumentTextOutline } from "react-icons/io5";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const NomorIdentifikasiEksternal = () => {
    const [activeTab, setActiveTab] = useState("external-identification-numbers");
    return (
        <div className='flex h-screen bg-gray-100'>
            <SidebarProfilSaya />
            <div className='flex-auto p-3 bg-white rounded-md h-full'>
                <div className='flex justify-between items-center mb-4 pb-3 border-b'>
                    <div className='flex items-center'>
                        <IoDocumentTextOutline className='text-4xl text-blue-900' />
                        <h1 className='text-lg font-bold text-blue-900 ml-2'>Nomor Identifikasi Eksternal</h1>
                    </div>
                </div>
                <div className="w-full p-2 ml-0 border-t">
                    <Tabs defaultValue="external-identification-numbers" onValueChange={(val) => setActiveTab(val)}>
                        <TabsList className="flex justify-start gap-2 text-blue-700">
                            <TabsTrigger value="external-identification-numbers">External Identification Numbers</TabsTrigger>
                            <TabsTrigger value="digital-certificate">Digital Certificate</TabsTrigger>
                        </TabsList>

                        <TabsContent value="external-identification-numbers">
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
                                            <th className="border border-gray-300 px-4 py-2">Tipe</th>
                                            <th className="border border-gray-300 px-4 py-2">Nomor Identifikasi</th>
                                            <th className="border border-gray-300 px-4 py-2">Tanggal Mulai</th>
                                            <th className="border border-gray-300 px-4 py-2">Tanggal Berakhir</th>
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
                        </TabsContent>

                        <TabsContent value="digital-certificate">
                            <div className="flex justify-between mb-4 border-b pb-3 ">
                                <button className="flex items-center bg-blue-900 hover:bg-blue-950 text-white font-bold py-2 px-2 rounded">
                                    <BsFiletypeXls className="text-2xl text-white" />
                                </button>
                            </div>
                            <div className=" w-[1050px] overflow-x-auto bg-white shadow-md rounded-lg overflow-hidden ">
                                <table className="table-auto border border-gray-300 overflow-hidden">
                                    <thead>
                                        <tr>
                                            <th className="border border-gray-300 px-1 py-2">Jenis Sertifikat Digital</th>
                                            <th className="border border-gray-300 px-4 py-2">ID Penanda tangan</th>
                                            <th className="border border-gray-300 px-4 py-2">Status Kepemilikan</th>
                                            <th className="border border-gray-300 px-4 py-2">Tanggal Mulai</th>
                                            <th className="border border-gray-300 px-4 py-2">Tanggal Berakhir</th>
                                            <th className="border border-gray-300 px-4 py-2">Aksi</th>
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
                        </TabsContent>
                    </Tabs>

                </div>
            </div>
        </div>
    )
}

export default NomorIdentifikasiEksternal;


