import React, { useState } from "react";
import SideBarEFaktur from "./SideBarEFaktur";
import { GoArrowSwitch } from "react-icons/go";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useCookies } from "react-cookie";
import { useParams, useSearchParams } from "react-router";
import { useNavigateWithParams } from "@/hooks/useNavigateWithParams";
import { useMutation } from "@tanstack/react-query";
import { getCsrf } from "@/service/getCsrf";
import axios from "axios";
import { RoutesApi } from "@/Routes";
import Swal from "sweetalert2";
import FakturPenilaian from "./FakturPenilaian";

const PajakMasukan = ({
  data,
  sidebar,
  pagination,
  onPageChange,
  currentPage = 1,
}) => {
  console.log(data);
  const { id, akun } = useParams();
  const [cookies] = useCookies(["token"]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const viewAsCompanyId = searchParams.get("viewAs");
  const userId = searchParams.get("user_id");

  const formatRupiah = (number) => {
    // If data is null, undefined, or empty string, change it to 0
    if (number === null || number === undefined || number === "") {
      number = 0;
    }

    // Convert to string first to handle both string and number inputs
    let stringValue = String(number);

    // Normalize "0.00" to "0"
    if (stringValue === "0.00") stringValue = "0";

    // Remove any non-numeric characters except decimal point and negative sign
    const cleanedValue = stringValue.replace(/[^0-9.-]/g, "");

    // Convert to number
    const numericValue = parseFloat(cleanedValue);

    // Check if conversion was successful, if not return "0"
    if (isNaN(numericValue)) return "0";

    return new Intl.NumberFormat("id-ID", {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0, // This ensures no decimal places are shown
    }).format(numericValue);
  };

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

  // Handle checkbox selection
  const handleCheckboxChange = (itemId) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
    // alert(selectedItems)
  };

  // Handle select all checkbox
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      setSelectedItems(data?.map((item) => item.id) || []);
    }
    setSelectAll(!selectAll);
  };
  const navigate = useNavigateWithParams();
  const kreditkanFaktur = useMutation({
    mutationFn: async () => {
      const csrf = await getCsrf();
      const accountId = viewAsCompanyId ? viewAsCompanyId : akun;
      return axios.post(
        `${RoutesApi.apiUrl}student/assignments/${id}/sistem/${accountId}/faktur/kreditkan-multiple`,
        {
          faktur_ids: selectedItems,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-CSRF-TOKEN": csrf,
            Authorization: `Bearer ${cookies.token}`,
          },
          // params: {
          //   intent: "api.update.faktur.kreditkan",
          // },
        }
      );
    },
    onSuccess: (data) => {
      console.log(data);
      // Swal.fire("Berhasil!", "Faktur berhasil dikreditkan", "success").then(
      //   (result) => {
      //     if (result.isConfirmed) {
      //       window.location.reload();
      //     }
      //   }
      // );
      Swal.fire({
        title: "Berhasil!",
        text: "Faktur berhasil dikreditkan!",
        icon: "success",
        timer: 2000, // auto close after 2 seconds
        showConfirmButton: false,
        timerProgressBar: true,
      }).then(() => {
        // setTambahPopupOpen(false);
        window.location.reload();
      });
    },
    onError: (error) => {
      console.error("Error deleting data:", error);
      Swal.fire("Gagal!", "Terjadi kesalahan saat mengupload data.", "error");
    },
  });

  const tidakKreditkanFaktur = useMutation({
    mutationFn: async () => {
      const csrf = await getCsrf();
      const accountId = viewAsCompanyId ? viewAsCompanyId : akun;
      return axios.post(
        `${RoutesApi.apiUrl}student/assignments/${id}/sistem/${accountId}/faktur/unkreditkan-multiple`,
        {
          faktur_ids: selectedItems,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-CSRF-TOKEN": csrf,
            Authorization: `Bearer ${cookies.token}`,
          },
          // params: {
          //   intent: "api.update.faktur.kreditkan",
          // },
        }
      );
    },
    onSuccess: (data) => {
      console.log(data);
      // Swal.fire(
      //   "Berhasil!",
      //   "Faktur berhasil di Tidak Kreditkan",
      //   "success"
      // ).then((result) => {
      //   if (result.isConfirmed) {
      //     window.location.reload();
      //   }
      // });
      Swal.fire({
        title: "Berhasil!",
        text: "Faktur berhasil di Tidak Kreditkan!",
        icon: "success",
        timer: 2000, // auto close after 2 seconds
        showConfirmButton: false,
        timerProgressBar: true,
      }).then(() => {
        // setTambahPopupOpen(false);
        window.location.reload();
      });
    },
    onError: (error) => {
      console.error("Error deleting data:", error);
      Swal.fire("Gagal!", "Terjadi kesalahan saat mengupload data.", "error");
    },
  });

  return (
    <div className="flex h-screen">
      <SideBarEFaktur
        npwp_akun={sidebar.npwp_akun}
        nama_akun={sidebar.nama_akun}
        akun={{ id, akun }}
      />
      <div className="flex-auto p-3 bg-white rounded-md h-full min-w-0">
        <div className="flex justify-between items-center mb-4 pb-3 border-b">
          <div className="flex items-center">
            <IoDocumentTextOutline className="text-4xl text-blue-900" />
            <h1 className="text-lg font-bold text-blue-900 ml-2">
              Pajak Masukan
            </h1>
          </div>
          {userId ? <FakturPenilaian tipeFaktur="Faktur Masukan" /> : ""}
        </div>
        <div className="flex justify-between mb-4 border-b pb-3">
          <button
            className={
              userId
                ? "hidden"
                : "flex items-center bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-2 rounded text-sm"
            }
          >
            Import Excel
          </button>
          <div className="flex items-center gap-3 ">
            <button
              onClick={() => kreditkanFaktur.mutate()}
              disabled={selectedItems.length === 0 || kreditkanFaktur.isPending}
              className={
                userId
                  ? "hidden"
                  : `flex items-center justify-center gap-2 font-bold py-2 px-2 rounded text-sm ${
                      selectedItems.length === 0 || kreditkanFaktur.isPending
                        ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-blue-600 text-white"
                    }`
              }
            >
              {kreditkanFaktur.isPending ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                  Mengkreditkan...
                </>
              ) : (
                "Kreditkan Faktur"
              )}
            </button>

            <button
              onClick={() => tidakKreditkanFaktur.mutate()}
              disabled={
                selectedItems.length === 0 || tidakKreditkanFaktur.isPending
              }
              className={
                userId
                  ? "hidden"
                  : `flex items-center justify-center gap-2 font-bold py-2 px-2 rounded text-sm ${
                      selectedItems.length === 0 ||
                      tidakKreditkanFaktur.isPending
                        ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-blue-600 text-white"
                    }`
              }
            >
              {tidakKreditkanFaktur.isPending ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                  Mengabaikan...
                </>
              ) : (
                "Tidak Kreditkan Faktur"
              )}
            </button>
          </div>
        </div>
        {/* <div className="w-auto overflow-x-auto bg-white shadow-md rounded-lg overflow-hidden mt-4">
          <table className="table-auto border border-gray-300 w-full"> */}
        <div className="w-full overflow-x-auto bg-white shadow-md rounded-lg overflow-hidden mt-4">
          <table className="table-auto border border-gray-300 w-full min-w-max">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-2 border">No</th>
                <th className="px-8 py-2 border">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5"
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                </th>
                <th className="px-4 py-2 border">Aksi</th>
                <th className="px-4 py-2 border">NPWP Penjual</th>
                <th className="px-4 py-2 border">Nama Penjual</th>
                <th className="px-4 py-2 border">Kode Transaksi</th>
                <th className="px-4 py-2 border">Nomor Faktur Pajak</th>
                <th className="px-4 py-2 border">Tanggal Faktur Pajak</th>
                <th className="px-4 py-2 border">Masa Pajak</th>
                <th className="px-4 py-2 border">Tahun</th>
                <th className="px-4 py-2 border">Masa Pajak Pengkreditan</th>
                <th className="px-4 py-2 border">Tahun Pajak Pengkreditan</th>
                <th className="px-4 py-2 border">Status Faktur</th>
                <th className="px-4 py-2 border">Status Pengkreditan</th>
                <th className="px-4 py-2 border">
                  Harga Jual/Pengganti/DPP (Rp)
                </th>
                <th className="px-4 py-2 border">DPP Nilai Lain / DPP (Rp)</th>
                <th className="px-4 py-2 border">PPN (Rp)</th>
                <th className="px-4 py-2 border">PPnBM (Rp)</th>
                <th className="px-4 py-2 border">Perekam (Pengirim faktur)</th>
                <th className="px-4 py-2 border">Nomor SP2D</th>
                <th className="px-4 py-2 border">Valid</th>
                <th className="px-4 py-2 border">Dilaporkan</th>
                <th className="px-4 py-2 border">Dilaporkan Oleh Penjual</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {data && data.length > 0 ? (
                data.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-2 border">{index + 1}</td>
                    <td className="px-8 py-2 border">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5"
                        checked={selectedItems.includes(item.id)}
                        onChange={() => handleCheckboxChange(item.id)}
                      />
                    </td>
                    <td className="px-4 py-2 border">
                      {/* Action buttons can go here */}
                      <div className="flex space-x-2">
                        {/* <a
                          href={`/praktikum/${id}/sistem/${akun}/e-faktur/pajak-masukan/edit/${item.id}`}
                        >
                          <button className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs">
                            Edit
                          </button>
                        </a> */}
                        <button
                          onClick={() =>
                            navigate(
                              `/praktikum/${id}/sistem/${akun}/e-faktur/pdf/${item.id}`
                            )
                          }
                          className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs"
                        >
                          Lihat PDF
                        </button>
                        {/* <button
                          onClick={() =>
                            navigate(
                              `/praktikum/${id}/sistem/${akun}/e-faktur/retur-pajak/${item.id}`
                            )
                          }
                          className="bg-blue-900 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs"
                        >
                          <GoArrowSwitch></GoArrowSwitch>
                        </button> */}
                        {item.is_kredit === 1 && (
                          <button
                            onClick={() =>
                              navigate(
                                `/praktikum/${id}/sistem/${akun}/e-faktur/retur-pajak/${item.id}`
                              )
                            }
                            className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs"
                          >
                            <GoArrowSwitch />
                          </button>
                        )}

                        {/* <button className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs">
                          Hapus
                        </button> */}
                      </div>
                    </td>
                    <td className="px-4 py-2 border">
                      {item.akun_pengirim_id?.npwp_akun || "-"}
                    </td>
                    <td className="px-4 py-2 border">
                      {item.akun_pengirim_id?.nama_akun || "-"}
                    </td>
                    <td className="px-4 py-2 border">
                      {item.kode_transaksi || "-"}
                    </td>
                    <td className="px-4 py-2 border">
                      {item.nomor_faktur_pajak || "-"}
                    </td>
                    <td className="px-4 py-2 border">
                      {item.tanggal_faktur_pajak || "-"}
                    </td>
                    <td className="px-4 py-2 border">
                      {item.masa_pajak || "-"}
                    </td>
                    <td className="px-4 py-2 border">{item.tahun || "-"}</td>
                    <td className="px-4 py-2 border">{"-"}</td>
                    <td className="px-4 py-2 border">{"-"}</td>
                    <td className="px-4 py-2 border">{item.status || "-"}</td>
                    <td className="px-4 py-2 border">
                      {item.is_kredit === 1
                        ? "Sudah Dikreditkan"
                        : "Belum Dikreditkan"}
                    </td>
                    <td className="px-4 py-2 border">
                      {formatRupiah(item.dpp) || "-"}
                    </td>
                    <td className="px-4 py-2 border">
                      {formatRupiah(item.dpp_lain) || "-"}
                    </td>
                    <td className="px-4 py-2 border">
                      {formatRupiah(item.ppn) || "-"}
                    </td>
                    {/* <td className="px-4 py-2 border">{formatRupiah(item.ppn_lain) || "-"}</td> */}
                    <td className="px-4 py-2 border">
                      {formatRupiah(item.ppnbm) || "-"}
                    </td>
                    <td className="px-4 py-2 border">{"-"}</td>
                    <td className="px-4 py-2 border">{"-"}</td>
                    <td className="px-4 py-2 border">
                      {item.dilaporkan_oleh_penjual == 1 ? "Ya" : "Tidak"}
                    </td>
                    <td className="px-4 py-2 border">
                      {item.dilaporkan_oleh_pemungut_ppn == 1 ? "Ya" : "Tidak"}
                    </td>
                    <td className="px-4 py-2 border">
                      {item.dilaporkan_oleh_penjual == 1 ? "Ya" : "Tidak"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="20" className="text-center p-4 border">
                    Belum ada data
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination Controls */}
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

export default PajakMasukan;
