import React, { Component } from 'react';
import { IoDocumentTextOutline } from "react-icons/io5";
import { BsFiletypeXls } from "react-icons/bs";

const NotifikasiSaya = () => {
          const data = [
                             { nomor: "-", tanggal: "18-02-2025", judul: "SPT Masa PPh Pasal 21/26", jenis: "SPT Masa PPh Pasal 21/26", kasus: "", pembuatan: "18-02-2025" },
                             { nomor: "BPE-01438/CT/KPP.1214/2025", tanggal: "18-02-2025", judul: "Bukti Penerimaan Elektronik (BPE)", jenis: "Bukti Penerimaan Elektronik (BPE)", kasus: "", pembuatan: "18-02-2025", penggunaPembuatan:"", },
                             { nomor: "-", tanggal: "17-02-2025", judul: "SPT Masa PPh Pasal 21/26", jenis: "SPT Masa PPh Pasal 21/26", kasus: "", pembuatan: "17-02-2025" },
                             { nomor: "BPE-01234/CT/KPP.1214/2025", tanggal: "17-02-2025", judul: "Bukti Penerimaan Elektronik (BPE)", jenis: "Bukti Penerimaan Elektronik (BPE)", kasus: "", pembuatan: "17-02-2025" ,penggunaPembuatan:"",},
                             { nomor: "BPE-00111/CT/KPP.1214/2025", tanggal: "30-01-2025", judul: "Bukti Penerimaan Elektronik (BPE)", jenis: "Bukti Penerimaan Elektronik (BPE)", kasus: "", pembuatan: "30-01-2025", penggunaPembuatan: "", },
                             { nomor: "040476316341050", tanggal: "30-01-2025", judul: "BILLING_CODE", jenis: "Cetakan Kode Billing", kasus: "", pembuatan: "30-01-2025", penggunaPembuatan: "", },
                             { nomor: "-", tanggal: "30-01-2025", judul: "Kartu NPWP Printer", jenis: "Kartu NPWP Printer", kasus: "", pembuatan: "30-01-2025", penggunaPembuatan:"", },
                             { nomor: "S-01853/SKT-WP-CT/KPP.1214/2025", tanggal: "30-01-2025", judul: "Surat Keterangan Terdaftar", jenis: "Surat Keterangan Terdaftar", kasus: "", pembuatan: "30-01-2025", penggunaPembuatan: "", },
                             { nomor: "-", tanggal: "30-01-2025", judul: "Kartu NPWP", jenis: "Kartu NPWP", kasus: "", pembuatan: "30-01-2025",penggunaPembuatan:"", },
                   ];
                   
         
                   return (
                             <div className="p-4">
                                       <div className="flex justify-between items-center mb-4">
                                                 <div className="flex items-center">
                                                           <IoDocumentTextOutline className="text-4xl text-blue-900" />
                                                           <h1 className="text-lg font-bold text-blue-900 ml-2">Dokumen Saya</h1>
                                                 </div>
                                       <button className="bg-blue-900 hover:bg-blue-950 text-white font-bold py-2 px-4 rounded">
                                                 Upload Dokumen
                                       </button>
                                       </div>
                                       <div className="flex justify-between mb-4 ">
                                                 <button className="flex items-center bg-blue-900 hover:bg-blue-950 text-white font-bold py-2 px-2 rounded">
                                                           <BsFiletypeXls className="text-2xl text-white" />
                                                 </button>
                                       </div>
                                       <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                                                 <table className="min-w-full border border-gray-300">
                                                           <thead className="!bg-yellow-500 text-white">
                                                                     <tr>
                                                                               <th className="px-4 py-2 border">Nomor Dokumen</th>
                                                                               <th className="px-4 py-2 border">Tanggal Dokumen</th>
                                                                               <th className="px-4 py-2 border">Judul Dokumen</th>
                                                                               <th className="px-4 py-2 border">Jenis Dokumen</th>
                                                                               <th className="px-4 py-2 border">Nomor Kasus</th>
                                                                               <th className="px-4 py-2 border">Tanggal Pembuatan</th>
                                                                               <th className="px-4 py-2 border">Pengguna Pembuatan</th>
                                                                               <th className="px-4 py-2 border">Aksi</th>
                                                                     </tr>
                                                           </thead>
                                                           <tbody>
                                                                     {data.map((item, index) => (
                                                                               <tr key={index} className="hover:bg-gray-100">
                                                                                         <td className="px-4 py-2 border">{item.nomor}</td>
                                                                                         <td className="px-4 py-2 border">{item.tanggal}</td>
                                                                                         <td className="px-4 py-2 border">{item.judul}</td>
                                                                                         <td className="px-4 py-2 border">{item.jenis}</td>
                                                                                         <td className="px-4 py-2 border">{item.kasus}</td>
                                                                                         <td className="px-4 py-2 border">{item.pembuatan}</td>
                                                                                         <td className="px-4 py-2 border">{item.penggunaPembuatan}</td>
                                                                                         <td>
                                                                                                   <button className="bg-purple-900 hover:bg-purple-950 text-white font-bold py-2 px-4 rounded">
                                                                                                             Unduh
                                                                                                   </button>
                                                                                         </td>
                                                                               </tr>
                                                                     ))}
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
}

export default NotifikasiSaya;