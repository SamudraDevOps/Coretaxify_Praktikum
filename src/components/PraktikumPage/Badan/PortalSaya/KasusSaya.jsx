import React from "react";
import { IoDocumentTextOutline } from "react-icons/io5";
import { BsFiletypeXls } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";


const KasusSayaBadan = () => {
    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4 pb-3 border-b">
                <div className="flex items-center">
                    <IoDocumentTextOutline className="text-4xl text-blue-900" />
                    <h1 className="text-lg font-bold text-blue-900 ml-2">Dokumen Saya</h1>
                </div>
            </div>
            <div className="flex justify-between mb-4 border-b pb-3 ">
                <button className="flex items-center bg-blue-900 hover:bg-blue-950 text-white font-bold py-2 px-2 rounded">
                    <BsFiletypeXls className="text-2xl text-white" />
                </button>
            </div>
            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="min-w-full border border-gray-300 pb-4 ">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border">Nomor Kasus</th>
                            <th className="px-4 py-2 border">NPWP Wajib Pajak Pusat</th>
                            <th className="px-4 py-2 border">Nama Wajib Pajak Pusat</th>
                            <th className="px-4 py-2 border">Jenis Kasus</th>
                            <th className="px-4 py-2 border">Status Kasus</th>
                            <th className="px-4 py-2 border">Dibuat</th>
                            <th className="px-4 py-2 border">Dibuat Oleh Pengguna</th>
                            <th className="px-4 py-2 border">Selesai</th>
                            <th className="px-4 py-2 border">Langkah alur kerja</th>
                            <th className="px-4 py-2 border">Tanggal Jatuh Tempo Tertinggi</th>
                            <th className="px-4 py-2 border">Tanggal Akhir</th>
                            <th className="px-4 py-2 border">Kantor Wilayah</th>
                            <th className="px-4 py-2 border">Kantor Pelayanan Pajak</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="px-4 py-2 border">
                                <input type="text" className="px-2 w-40 h-8 border rounded " />
                            </td>
                            <td className="px-4 py-2 border">
                                <input type="text" className="px-2 w-40 h-8 border rounded " />
                            </td>
                            <td className="px-4 py-2 border">
                                <input type="text" className="px-2 w-40 h-8 border rounded " />
                            </td>
                            <td className="px-4 py-2 border">
                                <input type="text" className="px-2 w-40 h-8 border rounded " />
                            </td>
                            <td className="px-4 py-2 border">
                                <select className="px-2 w-40 h-8 border rounded ">
                                    <option value="option1">Option 1</option>
                                    <option value="option2">Option 2</option>
                                    <option value="option3">Option 3</option>
                                </select>
                            </td>
                            <td className="px-4 py-2 border">
                                <input type="date" className="px-2 w-40 h-8 border rounded " />
                            </td>
                            <td className="px-4 py-2 border">Riandika</td> {/* Dari nama akun yang sedang login */}
                            <td className="px-4 py-2 border">
                                <select className="px-2 w-40 h-8 border rounded" >
                                    <option value="option1">Selesai</option>
                                    <option value="option2">Belum Selesai</option>
                                </select>
                            </td>
                            <td className="px-4 py-2 border">
                                <input type="text" className="px-2 w-40 h-8 border rounded " />
                            </td>
                            <td className="px-4 py-2 border">Ngelink teko endi iki kang??</td>
                            <td className="px-4 py-2 border">
                                <input type="date" className="px-2 w-40 h-8 border rounded " />
                            </td>
                            <td className="px-4 py-2 border">
                                <select className="px-2 w-40 h-8 border rounded ">
                                    <option value="option1">Option 1</option>
                                    <option value="option2">Option 2</option>
                                    <option value="option3">Option 3</option>
                                </select>
                            </td>
                            <td className="px-4 py-2 border">
                                <select className="px-2 w-40 h-8 border rounded ">
                                    <option value="option1">Option 1</option>
                                    <option value="option2">Option 2</option>
                                    <option value="option3">Option 3</option>
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>


            <div className="pagination">
                <button className="bg-blue-900 hover:bg-blue-950 text-white font-bold py-2 px-4 rounded mr-2">
                    Previous
                </button>
                <button className="bg-blue-900 hover:bg-blue-950 text-white font-bold py-2 px-4 rounded">
                    Next
                </button>

            </div>


        </div>
    );
};

export default KasusSayaBadan;
