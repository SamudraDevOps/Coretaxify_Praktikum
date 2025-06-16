import React, { useState, useRef, useEffect } from "react";
import SideBarSPT from "./SideBarSPT";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FaChevronDown, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useParams } from "react-router";
import { useNavigateWithParams } from "@/hooks/useNavigateWithParams";

const KonsepSPT = ({
  data,
  sidebar,
  pagination,
  onPageChange,
  currentPage = 1,
}) => {
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

  // Extract page numbers from pagination URLs
  const getPageFromUrl = (url) => {
    if (!url) return null;
    const matches = url.match(/[?&]page=(\d+)/);
    return matches ? parseInt(matches[1]) : null;
  };

  // Get page numbers from links
  const firstPage = pagination?.links?.first
    ? getPageFromUrl(pagination.links.first)
    : 1;
  const lastPage = pagination?.links?.last
    ? getPageFromUrl(pagination.links.last)
    : 1;
  const nextPage = pagination?.links?.next
    ? getPageFromUrl(pagination.links.next)
    : null;
  const prevPage = pagination?.links?.prev
    ? getPageFromUrl(pagination.links.prev)
    : null;

  // Use either meta data or calculate from links
  const totalItems = pagination?.meta?.total || data?.length || 0;
  const itemsPerPage =
    pagination?.meta?.per_page ||
    (pagination?.meta?.last_page
      ? Math.ceil(totalItems / pagination.meta.last_page)
      : 10);

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
              onClick={() =>
                navigate(`/praktikum/${id}/sistem/${akun}/buat-konsep-spt`)
              }
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
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>
                    <td className="px-4 py-2 border">
                      <div className="flex gap-2 justify-center">
                        <button
                          className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-xs"
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

          {/* Pagination Component */}
          {pagination?.links && (
            <div className="flex justify-between items-center px-4 py-3 bg-white border-t border-gray-200">
              <div>
                <p className="text-sm text-gray-700">
                  Page {currentPage} of {lastPage || 1}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => onPageChange(firstPage)}
                  disabled={!prevPage}
                  className={`px-3 py-1 rounded ${
                    !prevPage
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  First
                </button>
                <button
                  onClick={() => onPageChange(prevPage || 1)}
                  disabled={!prevPage}
                  className={`px-3 py-1 rounded ${
                    !prevPage
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  <FaChevronLeft className="h-4 w-4" />
                </button>

                {/* Show page numbers */}
                <div className="flex space-x-1">
                  {Array.from({ length: lastPage }, (_, i) => i + 1)
                    .filter((pageNum) => {
                      // Show first, last, and pages around current
                      return (
                        pageNum === 1 ||
                        pageNum === lastPage ||
                        (pageNum >= currentPage - 1 &&
                          pageNum <= currentPage + 1)
                      );
                    })
                    .map((pageNum, index, array) => {
                      // Add ellipsis if needed
                      const showEllipsisBefore =
                        index > 0 && array[index - 1] !== pageNum - 1;
                      const showEllipsisAfter =
                        index < array.length - 1 &&
                        array[index + 1] !== pageNum + 1;

                      return (
                        <React.Fragment key={pageNum}>
                          {showEllipsisBefore && (
                            <span className="px-3 py-1 bg-gray-100 rounded">
                              ...
                            </span>
                          )}
                          <button
                            onClick={() => onPageChange(pageNum)}
                            className={`px-3 py-1 rounded ${
                              currentPage === pageNum
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200 hover:bg-gray-300"
                            }`}
                          >
                            {pageNum}
                          </button>
                          {showEllipsisAfter && (
                            <span className="px-3 py-1 bg-gray-100 rounded">
                              ...
                            </span>
                          )}
                        </React.Fragment>
                      );
                    })}
                </div>

                <button
                  onClick={() => onPageChange(nextPage || lastPage)}
                  disabled={!nextPage}
                  className={`px-3 py-1 rounded ${
                    !nextPage
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  <FaChevronRight className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onPageChange(lastPage)}
                  disabled={!nextPage}
                  className={`px-3 py-1 rounded ${
                    !nextPage
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  Last
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default KonsepSPT;
