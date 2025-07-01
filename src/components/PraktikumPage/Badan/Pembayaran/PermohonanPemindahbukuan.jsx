import React from "react";
import { Plus, Trash2, RefreshCcw, FileText, Filter, Edit } from "lucide-react";

const PermohonanPemindahBukuan = () => {
    const dummyData = [
        {
            id: 1,
            referensi: "REF-20250630-01",
            nomorPermohonan: "PMB-0012025",
            kap: "411128",
            kodeSetoran: "100",
        },
    ];

    return (
        <div className="flex bg-white overflow-hidden h-auto">
            {/* Sidebar Status */}
            <aside className="w-48 bg-slate-100 border-r">
                <ul className="text-sm text-gray-800 p-4 space-y-3">
                    {["Telah Diajukan", "Diproses", "Telah Diajukan", "Diproses", "Telah diajukan", "Selesai proses"].map(
                        (item, idx) => (
                            <li
                                key={idx}
                                className="px-3 py-3 hover:bg-blue-700 hover:text-white rounded cursor-pointer"
                            >
                                {item}
                            </li>
                        )
                    )}
                </ul>
            </aside>

            {/* Konten Utama */}
            <main className="flex-1 p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-gray-700">
                        Permohonan Pemindahbukuan Belum Diajukan
                    </h2>
                    <div className="flex gap-2">
                        <button className="flex items-center gap-2 bg-blue-800 text-white px-4 py-2 text-sm rounded-md">
                            <Plus className="w-4 h-4" />
                            Buat Permohonan Pemindahbukuan Baru
                        </button>
                        <button className="flex items-center gap-2 bg-gray-300 text-gray-500 px-4 py-2 text-sm rounded-md cursor-not-allowed" disabled>
                            <Trash2 className="w-4 h-4" />
                            Hapus
                        </button>
                    </div>
                </div>

                {/* Aksi Icon */}
                <div className="flex gap-2 mb-4">
                    <button className="bg-slate-100 p-2 rounded hover:bg-slate-200">
                        <RefreshCcw className="w-4 h-4 text-gray-700" />
                    </button>
                    <button className="bg-gray-700 p-2 rounded hover:bg-gray-800">
                        <FileText className="w-4 h-4 text-white" />
                    </button>
                    <button className="bg-green-600 p-2 rounded hover:bg-green-700">
                        <FileText className="w-4 h-4 text-white" />
                    </button>
                    <button className="bg-red-600 p-2 rounded hover:bg-red-700">
                        <FileText className="w-4 h-4 text-white" />
                    </button>
                    <button className="bg-blue-100 p-2 rounded hover:bg-blue-200">
                        <Filter className="w-4 h-4 text-blue-600" />
                    </button>
                </div>

                {/* Tabel */}
                <div className="overflow-x-auto border rounded-md">
                    <table className="min-w-full text-sm text-left border-collapse">
                        <thead>
                            <tr className="bg-purple-700 text-gray-900">
                                <th className="px-3 py-2 border-r">
                                    <input type="checkbox" />
                                </th>
                                <th className="px-3 py-2 border-r">Edit</th>
                                <th className="px-3 py-2 border-r">Referensi ⬍</th>
                                <th className="px-3 py-2 border-r">Nomor Permohonan ⬍</th>
                                <th className="px-3 py-2 border-r">KAP ⬍</th>
                                <th className="px-3 py-2">Kode Jenis Setoran ⬍</th>
                            </tr>
                            <tr className="bg-white">
                                <td className="px-3 py-2 border-t"></td>
                                {Array(5)
                                    .fill(0)
                                    .map((_, idx) => (
                                        <td key={idx} className="px-3 py-2 border-t border-r">
                                            <div className="flex items-center gap-1">
                                                <input
                                                    type="text"
                                                    className="border px-2 py-1 rounded w-full text-xs"
                                                    placeholder=""
                                                />
                                                <Filter className="w-3 h-3 text-gray-500" />
                                            </div>
                                        </td>
                                    ))}
                            </tr>
                        </thead>
                        <tbody>
                            {dummyData.length > 0 ? (
                                dummyData.map((item) => (
                                    <tr key={item.id} className="border-t">
                                        <td className="px-3 py-2 border-r">
                                            <input type="checkbox" />
                                        </td>
                                        <td className="px-3 py-2 border-r">
                                            <button className="text-blue-600 hover:underline flex items-center gap-1 text-xs">
                                                <Edit className="w-4 h-4" /> Edit
                                            </button>
                                        </td>
                                        <td className="px-3 py-2 border-r">{item.referensi}</td>
                                        <td className="px-3 py-2 border-r">{item.nomorPermohonan}</td>
                                        <td className="px-3 py-2 border-r">{item.kap}</td>
                                        <td className="px-3 py-2">{item.kodeSetoran}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="text-center text-gray-500 py-6">
                                        Tidak ada data yang ditemukan.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex justify-end items-center mt-4">
                    <select className="border px-2 py-1 rounded text-sm">
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                    </select>
                </div>
            </main>
        </div>
    );
};

export default PermohonanPemindahBukuan;
