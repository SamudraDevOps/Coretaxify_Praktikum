import React, { useState } from 'react';
import SidebarProfilSaya from './SidebarProfilSaya';
import { BsFiletypeXls } from "react-icons/bs";
import { IoDocumentTextOutline } from "react-icons/io5";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const JenisPajak = () => {
    const [activeTab, setActiveTab] = useState("pending-regitration");
    return (
        <div className='flex h-screen bg-gray-100'>
            <SidebarProfilSaya />
            <div className='flex-auto p-3 bg-white rounded-md h-full'>
                <div className='flex justify-between items-center mb-4 pb-3 border-b'>
                    <div className='flex items-center'>
                        <IoDocumentTextOutline className='text-4xl text-blue-900' />
                        <h1 className='text-lg font-bold text-blue-900 ml-2'>Jenis Pajak</h1>
                    </div>
                </div>
                <div className="w-[1050px] overflow-x-auto p-2 ml-0 border-t">
                    <Tabs defaultValue="pending-registration" onValueChange={(val) => setActiveTab(val)}>
                        <TabsList className="flex justify-start gap-2 text-blue-700 w-[150%] ">
                            <TabsTrigger value="pending-registration">Pending Registration</TabsTrigger>
                            <TabsTrigger value="registered-for-the-following-tax-types">Registered for the following tax types</TabsTrigger>
                            <TabsTrigger value="rejected-request-for-the-following-tax-types">Rejected request for the following tax types</TabsTrigger>
                            <TabsTrigger value="withdrawal-during-the-process-for-following-tax-types">Withdrawal during the process for following tax types</TabsTrigger>
                            <TabsTrigger value="de-registered-for-following-tax-types">De-registered for following tax types</TabsTrigger>
                        </TabsList>

                        <TabsContent value="pending-registration">
                            <div className="flex justify-between mb-4 border-b pb-3 ">
                                <button className="flex items-center bg-blue-900 hover:bg-blue-950 text-white font-bold py-2 px-2 rounded">
                                    <BsFiletypeXls className="text-2xl text-white" />
                                </button>
                            </div>
                            <div className=" w-[150%] overflow-x-auto bg-white shadow-md rounded-lg overflow-hidden ">
                                <table className="table-auto border border-gray-300 overflow-hidden">
                                    <thead>
                                        <tr>
                                            <th className="border border-gray-300 px-1 py-2">Jenis Pajak</th>
                                            <th className="border border-gray-300 px-4 py-2">Tanggal Permohonan</th>
                                            <th className="border border-gray-300 px-4 py-2">Tanggal Mulai Transaksi</th>
                                            <th className="border border-gray-300 px-4 py-2">Tanggal Pendaftaran</th>
                                            <th className="border border-gray-300 px-4 py-2">Tanggal Pencabutan Pendaftaran</th>
                                            <th className="border border-gray-300 px-4 py-2">Nomor Kasus</th>
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
                        <TabsContent value="registered-for-the-following-tax-types">
                            <div className="flex justify-between mb-4 border-b pb-3 ">
                                <button className="flex items-center bg-blue-900 hover:bg-blue-950 text-white font-bold py-2 px-2 rounded">
                                    <BsFiletypeXls className="text-2xl text-white" />
                                </button>
                            </div>
                            <div className=" w-[150%] overflow-x-auto bg-white shadow-md rounded-lg overflow-hidden ">
                                <table className="table-auto border border-gray-300 overflow-hidden">
                                    <thead>
                                        <tr>
                                            <th className="border border-gray-300 px-1 py-2">Jenis Pajak</th>
                                            <th className="border border-gray-300 px-4 py-2">Tanggal Permohonan</th>
                                            <th className="border border-gray-300 px-4 py-2">Tanggal Mulai Transaksi</th>
                                            <th className="border border-gray-300 px-4 py-2">Tanggal Pendaftaran</th>
                                            <th className="border border-gray-300 px-4 py-2">Tanggal Pencabutan Pendaftaran</th>
                                            <th className="border border-gray-300 px-4 py-2">Nomor Kasus</th>
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
                        <TabsContent value="rejected-request-for-the-following-tax-types">
                            <div className="flex justify-between mb-4 border-b pb-3 ">
                                <button className="flex items-center bg-blue-900 hover:bg-blue-950 text-white font-bold py-2 px-2 rounded">
                                    <BsFiletypeXls className="text-2xl text-white" />
                                </button>
                            </div>
                            <div className=" w-[150%] overflow-x-auto bg-white shadow-md rounded-lg overflow-hidden ">
                                <table className="table-auto border border-gray-300 overflow-hidden">
                                    <thead>
                                        <tr>
                                            <th className="border border-gray-300 px-1 py-2">Jenis Pajak</th>
                                            <th className="border border-gray-300 px-4 py-2">Tanggal Permohonan</th>
                                            <th className="border border-gray-300 px-4 py-2">Tanggal Mulai Transaksi</th>
                                            <th className="border border-gray-300 px-4 py-2">Tanggal Pendaftaran</th>
                                            <th className="border border-gray-300 px-4 py-2">Tanggal Ditolak</th>
                                            <th className="border border-gray-300 px-4 py-2">Nomor Kasus</th>
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

                        <TabsContent value="withdrawal-during-the-process-for-following-tax-types">
                            <div className="flex justify-between mb-4 border-b pb-3 ">
                                <button className="flex items-center bg-blue-900 hover:bg-blue-950 text-white font-bold py-2 px-2 rounded">
                                    <BsFiletypeXls className="text-2xl text-white" />
                                </button>
                            </div>
                            <div className=" w-[150%] overflow-x-auto bg-white shadow-md rounded-lg overflow-hidden ">
                                <table className="table-auto border border-gray-300 overflow-hidden">
                                    <thead>
                                        <tr>
                                            <th className="border border-gray-300 px-1 py-2">Jenis Pajak</th>
                                            <th className="border border-gray-300 px-4 py-2">Tanggal Permohonan</th>
                                            <th className="border border-gray-300 px-4 py-2">Tanggal Mulai Transaksi</th>
                                            <th className="border border-gray-300 px-4 py-2">Tanggal Pendaftaran</th>
                                            <th className="border border-gray-300 px-4 py-2">Tanggal Pencabutan Pendaftaran</th>
                                            <th className="border border-gray-300 px-4 py-2">Nomor Kasus</th>
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
                        <TabsContent value="de-registered-for-following-tax-types">
                            <div className="flex justify-between mb-4 border-b pb-3 ">
                                <button className="flex items-center bg-blue-900 hover:bg-blue-950 text-white font-bold py-2 px-2 rounded">
                                    <BsFiletypeXls className="text-2xl text-white" />
                                </button>
                            </div>
                            <div className=" w-[150%] overflow-x-auto bg-white shadow-md rounded-lg overflow-hidden ">
                                <table className="table-auto border border-gray-300 overflow-hidden">
                                    <thead>
                                        <tr>
                                            <th className="border border-gray-300 px-1 py-2">Jenis Pajak</th>
                                            <th className="border border-gray-300 px-4 py-2">Tanggal Permohonan</th>
                                            <th className="border border-gray-300 px-4 py-2">Tanggal Mulai Transaksi</th>
                                            <th className="border border-gray-300 px-4 py-2">Tanggal Pendaftaran</th>
                                            <th className="border border-gray-300 px-4 py-2">Tanggal Pencabutan Pendaftaran</th>
                                            <th className="border border-gray-300 px-4 py-2">Nomor Kasus</th>
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

export default JenisPajak;


