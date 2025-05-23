import React, { useState } from "react";
import SidebarProfilSayaBadan from "./SidebarProfilSaya";
import { BsFiletypeXls } from "react-icons/bs";
import { IoDocumentTextOutline } from "react-icons/io5";
import { useParams } from "react-router";

const DetailBankBadan = ({ data, sidebar }) => {
  const { id, akun } = useParams();
  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarProfilSayaBadan
        nama_akun={sidebar.nama_akun}
        npwp_akun={sidebar.npwp_akun}
        akun={{ id, akun }}
      />
      <div className="flex-auto p-3 bg-white rounded-md h-full">
        <div className="flex justify-between items-center mb-4 pb-3 border-b">
          <div className="flex items-center">
            <IoDocumentTextOutline className="text-4xl text-blue-900" />
            <h1 className="text-lg font-bold text-blue-900 ml-2">
              Detail Bank
            </h1>
          </div>
        </div>
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
                <th className="border border-gray-300 px-4 py-2">Nama Bank</th>
                <th className="border border-gray-300 px-4 py-2">
                  Nomor Rekening
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  Jenis Rekening Bank
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  Tanggal Mulai
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  Tanggal Berakhir
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              <tr className="bg-gray-100">
                <td className="px-1 py-4 border">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-2 rounded">
                    Edit
                  </button>
                </td>
                <td className="px-4 py-4 border">Bank Syariah Indonesia</td>
                <td className="px-4 py-4 border">1234567890</td>
                <td className="px-4 py-4 border">Rekening Koran</td>
                <td className="px-4 py-4 border">01-01-2023</td>
                <td className="px-4 py-4 border">01-01-2023</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DetailBankBadan;
