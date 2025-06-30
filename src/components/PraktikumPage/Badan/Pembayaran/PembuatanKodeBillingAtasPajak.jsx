import React from "react";
import { Plus } from "lucide-react";

const PembuatanKodeBillingAtasPajak = () => {
    const dummyData = [
        // {
        //     id: 1,
        //     tanggal: "30 Juni 2025",
        //     npwp: "3510145907990002",
        //     nama: "PUTRI NURIL WULANATINING ASIH",
        //     kodeBilling: "123456789012345",
        //     jumlah: "Rp. 1.000.000",
        // },
    ];

    return (
        <div className="w-full bg-white p-6 rounded-md shadow-md">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                <div>
                    <h1 className="text-lg font-semibold text-gray-800">
                        Kode Billing Tagihan Pajak
                    </h1>
                    <p className="text-sm text-gray-600">
                        3510145907990002 - PUTRI NURIL WULANATINING ASIH
                    </p>
                </div>
                <div className="flex items-center gap-2 mt-4 md:mt-0">
                    <button className="flex items-center gap-2 bg-gray-200 text-gray-500 px-4 py-2 rounded-md cursor-not-allowed" disabled>
                        <Plus className="w-4 h-4" /> Buat Kode Billing
                    </button>
                    <button className="flex items-center gap-2 bg-gray-200 text-gray-500 px-4 py-2 rounded-md cursor-not-allowed" disabled>
                        💳 Bayar dengan Pemindahbukuan Deposit Pajak
                    </button>
                </div>
            </div>

            <div className="border-b border-gray-300 mb-4 flex">
                <button className="px-4 py-2 text-sm font-medium text-purple-800 border-b-2 border-purple-800">
                    Rp IDR
                </button>
                <button className="px-4 py-2 text-sm text-gray-500">
                    $ USD
                </button>
            </div>

            {/* Filter & Search */}
            <div className="flex items-center mb-3">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm text-gray-700 mr-2">Pilih Semua</span>
                <span className="text-sm text-gray-700 mr-2">|</span>
                <span className="text-sm text-gray-700 mr-2">Search By :</span>
                <select className="border border-gray-300 rounded px-2 py-1 text-sm">
                    <option>Select Search Option</option>
                </select>
            </div>

            {/* Tabel */}
            {dummyData.length > 0 ? (
                <div className="overflow-auto border rounded-md">
                    <table className="min-w-full text-sm text-left">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr>
                                <th className="px-4 py-2">
                                    <input type="checkbox" />
                                </th>
                                <th className="px-4 py-2">Tanggal</th>
                                <th className="px-4 py-2">NPWP</th>
                                <th className="px-4 py-2">Nama</th>
                                <th className="px-4 py-2">Kode Billing</th>
                                <th className="px-4 py-2 text-right">Jumlah</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dummyData.map((item) => (
                                <tr key={item.id} className="border-t">
                                    <td className="px-4 py-2">
                                        <input type="checkbox" />
                                    </td>
                                    <td className="px-4 py-2">{item.tanggal}</td>
                                    <td className="px-4 py-2">{item.npwp}</td>
                                    <td className="px-4 py-2">{item.nama}</td>
                                    <td className="px-4 py-2">{item.kodeBilling}</td>
                                    <td className="px-4 py-2 text-right">{item.jumlah}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="border rounded-md p-6 flex flex-col items-center justify-center bg-gray-50">
                    <span className="text-yellow-500 text-sm font-semibold mb-2">⚠️ No Data Found!</span>
                    <p className="text-sm text-gray-500">Total Amount to be Paid</p>
                    <p className="text-xl font-bold text-purple-900">Rp. 0,00</p>
                </div>
            )}
        </div>
    );
};

export default PembuatanKodeBillingAtasPajak;
