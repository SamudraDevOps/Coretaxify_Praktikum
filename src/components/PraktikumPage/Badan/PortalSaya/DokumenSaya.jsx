import { useState } from "react";
import { IoDocumentTextOutline } from "react-icons/io5";
import Bupot21ViewPDFDokumen from "../BUPOT/Bupot21ViewPDFDokumen";
import { useNavigate, useParams } from "react-router-dom";


const DokumenSayaBadan = ({ data }) => {
    const navigate = useNavigate();
    const { id, akun } = useParams();

    const dokumenList = (data || [])
    .map((item) => {
        let bupotResource = null;
        if (item.bupot_resource) {
            if (typeof item.bupot_resource === "string") {
                try {
                    bupotResource = JSON.parse(item.bupot_resource);
                } catch {
                    bupotResource = null;
                }
            } else {
                bupotResource = item.bupot_resource;
            }
        }
        return { ...item, bupotResource };
    })
        .filter((item) => item.bupotResource?.tipe_bupot === "BP 21");


    // console.log("Dokumen List:", dokumenList);

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4 pb-3 border-b">
                <div className="flex items-center">
                    <IoDocumentTextOutline className="text-4xl text-blue-900" />
                    <h1 className="text-lg font-bold text-blue-900 ml-2">Dokumen Saya</h1>
                </div>
            </div>
            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="min-w-full border border-gray-300">
                    <thead className="!bg-yellow-500 text-white">
                        <tr>
                            <th className="px-4 py-2 border">Nomor Dokumen</th>
                            <th className="px-4 py-2 border">Tanggal Dokumen</th>
                            <th className="px-4 py-2 border">Jenis Dokumen</th>
                            <th className="px-4 py-2 border">Nama Akun</th>
                            <th className="px-4 py-2 border">NPWP Akun</th>
                            <th className="px-4 py-2 border">Jenis Pajak</th>
                            {/* <th className="px-4 py-2 border">Dasar Pengenaan Pajak</th>
                            <th className="px-4 py-2 border">Pajak Penghasilan</th> */}
                            <th className="px-4 py-2 border">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dokumenList.length === 0 ? (
                            <tr>
                                <td colSpan={9} className="text-center py-4 text-gray-400">
                                    Tidak ada dokumen
                                </td>
                            </tr>
                        ) : (
                            dokumenList.map((item, idx) => (
                                <tr key={idx}>
                                    <td className="px-4 py-2 border">
                                        {item.bupotResource?.nomor_pemotongan || item.bupotResource?.nomor_dokumen || "-"}
                                    </td>
                                    <td className="px-4 py-2 border">
                                        {item.bupotResource?.tanggal_dokumen || item.bupotResource?.created_at?.split("T")[0] || "-"}
                                    </td>
                                    <td className="px-4 py-2 border">
                                        {item.bupotResource?.jenis_dokumen || item.bupotResource?.tipe_bupot || "-"}
                                    </td>
                                    <td className="px-4 py-2 border">
                                        {item.bupotResource?.nama_akun || "-"}
                                    </td>
                                    <td className="px-4 py-2 border">
                                        {item.bupotResource?.npwp_akun || "-"}
                                    </td>
                                    <td className="px-4 py-2 border">
                                        {item.bupotResource?.jenis_pajak || "-"}
                                    </td>
                                    {/* <td className="px-4 py-2 border">
                                        {item.bupotResource?.dasar_pengenaan_pajak || "-"}
                                    </td>
                                    <td className="px-4 py-2 border">
                                        {item.bupotResource?.pajak_penghasilan || "-"}
                                    </td> */}
                                    <td>
                                        {item.bupotResource ? (
                                            <button
                                                className="bg-purple-900 hover:bg-purple-950 text-white font-bold py-2 px-4 rounded"
                                                onClick={() =>
                                                    navigate(`/praktikum/${id}/sistem/${akun}/dokumen-saya/pdf/${item.id}`)
                                                  
                                                }>
                                                Lihat PDF
                                            </button>
                                        ) : (
                                            <span className="text-gray-400">-</span>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
       
        </div>
    );
};

export default DokumenSayaBadan;