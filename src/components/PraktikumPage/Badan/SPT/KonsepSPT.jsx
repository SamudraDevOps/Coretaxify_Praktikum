import React, { useState, useRef, useEffect } from "react";
import SideBarSPT from "./SideBarSPT";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa";
import { useParams } from "react-router";
import { useNavigateWithParams } from "@/hooks/useNavigateWithParams";

const KonsepSPT = ({ data, sidebar }) => {
  const { id, akun } = useParams();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const navigate = useNavigateWithParams();

  console.log(data);
  return (
    <div className="flex h-screen bg-gray-100">
      <SideBarSPT
        nama_akun={sidebar.nama_akun}
        npwp_akun={sidebar.npwp_akun}
        akun={{ id: id, akun: akun }}
      />
      <div className="flex-auto p-3 bg-white rounded-md h-full">
        <div className="flex justify-between items-center mb-4 pb-3 border-b">
          <div className="flex items-center">
            <IoDocumentTextOutline className="text-4xl text-blue-900" />
            <h1 className="text-lg font-bold text-blue-900 ml-2">Konsep SPT</h1>
          </div>
        </div>

        <div className="flex justify-between items-start mb-4 pb-3 border-b">
          <div className="flex items-center gap-3">
            <button
              className="flex items-center bg-blue-900 hover:bg-blue-950 text-white font-bold py-2 px-4 rounded"
              // onClick={() =>
              //   (window.location.href = `/praktikum/${id}/sistem/${akun}/buat-konsep-spt`)
              // }
              onClick={() => navigate(`/praktikum/${id}/sistem/${akun}/buat-konsep-spt`)}
            >
              Buat Konsep SPT
            </button>
            <div className="flex text-left text-sm" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded text-base"
              >
                Import <FaChevronDown className="ml-2" />
              </button>

              {isDropdownOpen && (
                <div className="absolute z-10 mt-1 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    <a
                      href="/template-import-pajak-keluaran.xlsx"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Download Template
                    </a>
                    <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                      Import Dokumen
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="w-[1200px] overflow-x-auto bg-white shadow-md rounded-lg overflow-hidden mt-4">
          <table className="table-auto w-full border border-gray-300 overflow-x-auto">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-2 border">No</th>
                <th className="px-4 py-2 border">Aksi</th>
                <th className="px-8 py-2 border">Jenis Pajak</th>
                <th className="px-4 py-2 border">
                  Jenis Surat Pemberitahuan Pajak
                </th>
                <th className="px-4 py-2 border">Masa Pajak</th>
                <th className="px-4 py-2 border">NOP</th>
                <th className="px-4 py-2 border">Nama Objek Pajak</th>
                <th className="px-4 py-2 border">Model SPT</th>
                <th className="px-4 py-2 border">Tanggal Jatuh Tempo</th>
                <th className="px-4 py-2 border">Tanggal Dibuat</th>
                <th className="px-4 py-2 border">Status SPT</th>
                <th className="px-4 py-2 border">Kanal</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {data && data.length > 0 ? (
                data.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-2 border text-center">
                      {index + 1}
                    </td>
                    <td className="px-4 py-2 border">
                      <div className="flex gap-2 justify-center">
                        {/* <button
                          className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs"
                          onClick={() =>
                            (window.location.href = `/praktikum/${id}/sistem/${akun}/detail-spt/${item.id}`)
                          }
                        >
                          Detail
                        </button> */}
                        <button
                          className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-xs"
                          // onClick={() =>
                          //   (window.location.href = `/praktikum/${id}/sistem/${akun}/buat-konsep-spt/${item.id}`)
                          // }
                          onClick={() =>
                            navigate(
                              `/praktikum/${id}/sistem/${akun}/buat-konsep-spt/${item.id}`
                            )
                          }
                        >
                          Edit
                        </button>
                      </div>
                    </td>
                    <td className="px-8 py-2 border">
                      {item.jenis_pajak || "-"}
                    </td>
                    <td className="px-4 py-2 border">
                      {item.model === "NORMAL"
                        ? "SPT Normal"
                        : "SPT Pembetulan"}
                    </td>
                    <td className="px-4 py-2 border">
                      {item.masa_bulan} {item.masa_tahun}
                    </td>
                    <td className="px-4 py-2 border">{item.npwp || "-"}</td>
                    <td className="px-4 py-2 border">
                      {item.nama_pengusaha || "-"}
                    </td>
                    <td className="px-4 py-2 border">{item.model || "-"}</td>
                    <td className="px-4 py-2 border">
                      {item.tanggal_jatuh_tempo || "-"}
                    </td>
                    <td className="px-4 py-2 border">
                      {item.tanggal_dibuat || "-"}
                    </td>
                    <td className="px-4 py-2 border">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          item.status === "KONSEP"
                            ? "bg-yellow-100 text-yellow-800"
                            : item.status === "SIAP LAPOR"
                            ? "bg-blue-100 text-blue-800"
                            : item.status === "SUDAH LAPOR"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {item.status || "-"}
                      </span>
                    </td>
                    <td className="px-4 py-2 border">-</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="12" className="text-center p-4 border">
                    Belum ada data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default KonsepSPT;
