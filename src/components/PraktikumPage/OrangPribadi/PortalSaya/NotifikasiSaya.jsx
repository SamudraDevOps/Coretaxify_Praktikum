import React, { useState } from "react";
import { IoDocumentTextOutline } from "react-icons/io5";
import { BsFiletypeXls } from "react-icons/bs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const NotifikasiSaya = () => {
    const data = [
        { pengirim: "eTax Indonesia", subjek: "Pemberitahuan Pajak", tanggal: "12/12/2021", prioritas: "High", status: "Unread" },
        { pengirim: "eTax Indonesia", subjek: "Undangan Pajak", tanggal: "12/12/2021", prioritas: "Low", status: "Read" },
        { pengirim: "eTax Indonesia", subjek: "Pemberitahuan Pajak", tanggal: "12/12/2021", prioritas: "High", status: "Unread" },
    ];

    const renderTable = (filter) => {
        const filteredData = data.filter((item) => {
            if (filter === "All") return true;
            return item.status.toLowerCase() === filter.toLowerCase();
        });

        return (
            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="min-w-full border border-gray-300">
                    <thead className="!bg-yellow-500 text-white">
                        <tr>
                            <th className="px-4 py-2 border">Aksi</th>
                            <th className="px-4 py-2 border">Pengirim</th>
                            <th className="px-4 py-2 border">Subjek</th>
                            <th className="px-4 py-2 border">Tanggal Terkirim</th>
                            <th className="px-4 py-2 border">Prioritas</th>
                            {/* <th className="px-4 py-2 border">Status</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.length > 0 ? (
                            filteredData.map((item, index) => (
                                <tr key={index} className="hover:bg-gray-100">
                                    <td>
                                        <button className="bg-purple-900 hover:bg-purple-950 text-white font-bold py-2 px-4 rounded">
                                            Lihat
                                        </button>
                                    </td>
                                    <td className="px-4 py-2 border">{item.pengirim}</td>
                                    <td className="px-4 py-2 border">{item.subjek}</td>
                                    <td className="px-4 py-2 border">{item.tanggal}</td>
                                    <td className="px-4 py-2 border">{item.prioritas}</td>
                                    {/* <td className="px-4 py-2 border">{item.status}</td> */}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center py-4">Tidak ada data</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    };

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                    <IoDocumentTextOutline className="text-4xl text-blue-900" />
                    <h1 className="text-lg font-bold text-blue-900 ml-2">Notifikasi Saya</h1>
                </div>
                {/* <button className="bg-blue-900 hover:bg-blue-950 text-white font-bold py-2 px-4 rounded">
                                                  Baca Semua
                                        </button> */}
            </div>
            <div className="flex justify-between mb-4 border-b pb-3">
                <button className="flex items-center bg-blue-900 hover:bg-blue-950 text-white font-bold py-2 px-2 rounded">
                    <BsFiletypeXls className="text-2xl text-white" />
                </button>
            </div>
            <Tabs defaultValue="All">
                <TabsList className="flex justify-start gap-2">
                    <TabsTrigger value="All" className="text-blue-900">
                        Semua
                    </TabsTrigger>
                    <TabsTrigger value="Read" className="text-blue-900">
                        Dibaca
                    </TabsTrigger>
                    <TabsTrigger value="Unread" className="text-blue-900">
                        Belum Dibaca
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="All">{renderTable("All")}</TabsContent>
                <TabsContent value="Read">{renderTable("Read")}</TabsContent>
                <TabsContent value="Unread">{renderTable("Unread")}</TabsContent>
            </Tabs>
        </div>
    );
};

export default NotifikasiSaya;
