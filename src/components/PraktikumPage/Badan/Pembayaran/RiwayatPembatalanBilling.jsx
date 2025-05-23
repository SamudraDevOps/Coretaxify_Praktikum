import React from 'react'
import { IoDocumentTextOutline } from 'react-icons/io5';

const RiwayatPembatalanBilling = () => {
    return (
        <div className='m-4 rounded-md'>
            {/* Header */}
            <div className='flex items-center mb-2 pb-3 '>
                <IoDocumentTextOutline className='text-4xl text-blue-900' />
                <h1 className='text-lg font-bold text-blue-900 ml-2'>Riwayat Pembatalan</h1>
            </div>

            {/* Table Headers */}
            <div className="flex flex-row mt-4 border-b p-3">
                <div className="font-semibold mr-2">3812837197237812</div>
                <div className="font-semibold mr-2">-</div>
                <div className="font-normal">Putri Nuril Wulan</div>
            </div>
            {/* <div className="flex flex-col items-end mt-3 p-3 border-t ml-auto w-fit">
                  <p>Total Pembayaran untuk Penagihan Aktif</p>
                  <p className="font-semibold mt-1">Rp 10.000.000</p>
              </div> */}
            <div className="overflow-x-auto mt-4">
                <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-md">
                    <thead className="bg-yellow-400 text-white">
                        <tr>
                            <th className="py-2 px-4 border-b text-center">Nama Wajib Pajak</th>
                            <th className="py-2 px-4 border-b text-center">NPWP</th>
                            <th className="py-2 px-4 border-b text-center">Kode Billing</th>
                            <th className="py-2 px-4 border-b text-center">Returnsheet Type</th>
                            <th className="py-2 px-4 border-b text-center">Mata Uang</th>
                            <th className="py-2 px-4 border-b text-center">Jumlah Total</th>
                            <th className="py-2 px-4 border-b text-center">Masa Aktif</th>
                            {/* <th className="py-2 px-4 border-b text-center">Aksi</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="hover:bg-gray-100 ">
                            <td className="py-4 px-4 border-b">Putri Nuril Wulan</td>
                            <td className="py-4 px-4 border-b">38.128.371.972.378.12</td>
                            <td className="py-4 px-4 border-b">BILLING-1234567890</td>
                            <td className="py-4 px-4 border-b">SPT Masa PPN</td>
                            <td className="py-4 px-4 border-b">IDR</td>
                            <td className="py-4 px-4 border-b">Rp 10.000.000</td>
                            <td className="py-4 px-4 border-b">25 Apr 2025 - 25 Mei 2025</td>
                            {/* <td className="py-4 px-4 border-b space-x-2">
                                <button className="bg-blue-100 text-blue-600 hover:bg-blue-200 hover:underline rounded px-3 py-1">
                                    Lihat
                                </button>
                                <button className="bg-red-100 text-red-600 hover:bg-red-200 hover:underline rounded px-3 py-1">
                                    Bayar
                                </button>
                            </td> */}
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default RiwayatPembatalanBilling
