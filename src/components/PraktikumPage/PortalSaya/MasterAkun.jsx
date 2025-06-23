import React, { useState, useRef } from "react";
// import SideBarEFaktur from "./SideBarEFaktur";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FaChevronDown, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useParams, useSearchParams } from "react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import axios from "axios";
import { getCsrf } from "@/service/getCsrf";
import { RoutesApi } from "@/Routes";
import { useCookies } from "react-cookie";
import { useUserType } from "@/components/context/userTypeContext";
import { useNavigate } from "react-router-dom";
import { useNavigateWithParams } from "@/hooks/useNavigateWithParams";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
export default function MasterAkun({
  data,
  sidebar,
  pagination,
  onPageChange,
  currentPage = 1,
}) {
  const { id, akun } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const viewAsCompanyId = searchParams.get("viewAs");
  const [cookies] = useCookies(["token"]);
  const accountId = viewAsCompanyId ? viewAsCompanyId : akun;
  const [formData, setFormData] = useState({
    nama_akun: "",
    tipe_akun: "",
    npwp_akun: "",
    alamat_utama_akun: "",
    email_akun: "",
    negara_asal: "",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Reset form data
  const resetForm = () => {
    setFormData({
      nama_akun: "",
      nik_npwp: "",
      alamat: "",
      email: "",
      negara_asal: "",
    });
  };

  // return axios.post(
  //   `${RoutesApiReal.url}api/student/assignments/${id}/sistem/${accountId}/faktur`,
  //   data,
  const navigate = useNavigateWithParams();

  const createMasterAkun = useMutation({
    mutationFn: async () => {
      const csrf = await getCsrf();
      return axios.post(
        `${RoutesApi.apiUrl}student/assignments/${id}/sistem/${accountId}/sistem-tambahan`,
        { ...formData },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-CSRF-TOKEN": csrf,
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );
    },
    onSuccess: (data) => {
      console.log(data);
      Swal.fire("Berhasil!", "Master Akun berhasil dibuat", "success").then(
        (result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        }
      );
    },
    onError: (error) => {
      console.error("Error Creating data:", error);
      Swal.fire("Gagal!", "Terjadi kesalahan saat membuat data.", "error");
    },
  });

  //   const approveMultipleFaktur = useMutation({
  //     mutationFn: async () => {
  //       const csrf = await getCsrf();
  //       const accountId = viewAsCompanyId ? viewAsCompanyId : akun;
  //       return axios.post(
  //         `${RoutesApi.apiUrl}student/assignments/${id}/sistem/${accountId}/faktur/approve-multiple`,
  //         {
  //           faktur_ids: selectedFakturIds,
  //         },
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //             Accept: "application/json",
  //             "X-CSRF-TOKEN": csrf,
  //             Authorization: `Bearer ${cookies.token}`,
  //           },
  //         }
  //       );
  //     },
  //     onSuccess: (data) => {
  //       console.log(data);
  //       Swal.fire("Berhasil!", "Faktur berhasil diupload", "success").then(
  //         (result) => {
  //           if (result.isConfirmed) {
  //             window.location.reload();
  //           }
  //         }
  //       );
  //     },
  //     onError: (error) => {
  //       console.error("Error deleting data:", error);
  //       Swal.fire("Gagal!", "Terjadi kesalahan saat mengupload data.", "error");
  //     },
  //   });

  const handleCheckboxChange = (fakturId) => {
    if (selectedFakturIds.includes(fakturId)) {
      setSelectedFakturIds(selectedFakturIds.filter((id) => id !== fakturId));
    } else {
      setSelectedFakturIds([...selectedFakturIds, fakturId]);
    }
  };

  const handleSelectAll = () => {
    if (isSelectAll) {
      setSelectedFakturIds([]);
    } else {
      const allFakturIds = data?.map((item) => item.id) || [];
      setSelectedFakturIds(allFakturIds);
    }
    setIsSelectAll(!isSelectAll);
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [selectedFakturIds, setSelectedFakturIds] = useState([]);
  const [isSelectAll, setIsSelectAll] = useState(false);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };
  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  console.log(data);

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

  // console.log(representedCompanies);

  // Rest of your state and mutation code...
  // [Keep all your existing state and mutations]

  const item = localStorage.getItem("selectedCompanyId");
  console.log(item);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* <SideBarEFaktur
        nama_akun={sidebar.nama_akun}
        npwp_akun={sidebar.npwp_akun}
        akun={{ id, akun }}
      /> */}
      <div className="flex-auto p-3 bg-white rounded-md h-full">
        <div className="flex justify-between items-center mb-4 pb-3 border-b">
          <div className="flex items-center">
            <IoDocumentTextOutline className="text-4xl text-blue-900" />
            <h1 className="text-lg font-bold text-blue-900 ml-2">
              Master Akun
            </h1>
          </div>
        </div>
        <div className="flex justify-between mb-4 border-b pb-3">
          <div className="flex items-center gap-3">
            {item && (
              <div className="flex  text-left text-sm" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-2 rounded"
                >
                  Import <FaChevronDown className="ml-2" />
                </button>
                {isDropdownOpen && (
                  <div className="absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
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
            )}
            {/* {item && ( */}
            {/* <button
              className="flex items-center bg-blue-900 hover:bg-blue-950 text-white font-bold py-2 px-2 rounded text-sm"
              // onClick={
              //   () =>
              //     (window.location.href = `/praktikum/${id}/sistem/${akun}/e-faktur/pajak-keluaran/tambah-faktur-keluaran`)
              //   // (window.location.href =
              //   //   "/admin/praktikum/2/e-faktur/pajak-keluaran/tambah-faktur-keluaran")
              // }
            //   onClick={() =>
            //     navigate(
            //       `/praktikum/${id}/sistem/${akun}/e-faktur/pajak-keluaran/tambah-faktur-keluaran`
            //     )
            //   }
            >
              Tambah
            </button> */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button className="bg-blue-900 hover:bg-blue-950 text-white font-bold py-2 px-2 rounded text-sm">
                  Tambah
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent className="max-w-md">
                <AlertDialogHeader>
                  <AlertDialogTitle>Tambah Master Akun</AlertDialogTitle>
                  <AlertDialogDescription>
                    Masukkan data untuk membuat akun baru.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <label htmlFor="nama_akun">Nama Akun</label>
                    <input
                      id="nama_akun"
                      name="nama_akun"
                      value={formData.nama_akun}
                      onChange={handleInputChange}
                      placeholder="Masukkan nama"
                      className="w-full"
                    />
                  </div>

                  <div className="grid gap-2">
                    <label htmlFor="npwp_akun">NIK/NPWP</label>
                    <input
                      id="npwp_akun"
                      name="npwp_akun"
                      value={formData.npwp_akun}
                      onChange={handleInputChange}
                      placeholder="Masukkan NIK/NPWP"
                      className="w-full"
                    />
                  </div>

                  <div classname="grid gap-2">
                    <label htmlfor="alamat_utama_akun">Alamat : </label>
                    <input
                      id="alamat_utama_akun"
                      name="alamat_utama_akun"
                      value={formData.alamat_utama_akun}
                      onChange={handleInputChange}
                      placeholder="masukkan alamat"
                      classname="w-full min-h-[80px]"
                    />
                  </div>
                  <div classname="grid gap-2">
                    <label htmlfor="tipe_akun">Tipe Akun : </label>
                    <select
                      name="tipe_akun"
                      id=""
                      value={formData.tipe_akun}
                      onChange={handleInputChange}
                    >
                      <option value="Orang Pribadi">Orang Pribadi</option>
                      <option value="Badan">Badan</option>
                    </select>
                  </div>

                  <div className="grid gap-2">
                    <label htmlFor="email_akun">Email</label>
                    <input
                      id="email_akun"
                      name="email_akun"
                      type="email_akun"
                      value={formData.email_akun}
                      onChange={handleInputChange}
                      placeholder="Masukkan Email"
                      className="w-full"
                    />
                    <div className="grid gap-2">
                      <label htmlFor="negara_asal">Negara Asal</label>
                      <input
                        id="negara_asal"
                        name="negara_asal"
                        // type=""
                        value={formData.negara_asal}
                        onChange={handleInputChange}
                        placeholder="Masukkan Negara Asal"
                        className="w-full"
                      />
                    </div>{" "}
                  </div>
                </div>

                <AlertDialogFooter>
                  <AlertDialogCancel
                    onClick={() => {
                      resetForm();
                      //   setIsDialogOpen(false);
                    }}
                  >
                    Batal
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => createMasterAkun.mutate()}
                    disabled={createMasterAkun.isLoading}
                    className="bg-blue-900 hover:bg-blue-950 text-white font-bold py-2 px-4 rounded"
                  >
                    {createMasterAkun.isLoading ? "Menyimpan..." : "Simpan"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            {/* )} */}
          </div>

          {item && (
            <div className="flex items-center gap-3">
              {/* <button
                onClick={() => approveMultipleFaktur.mutate()}
                disabled={selectedFakturIds.length === 0}
                className="flex items-center bg-blue-900 hover:bg-blue-950 text-white font-bold py-2 px-2 rounded text-sm"
              >
                Upload Faktur
              </button> */}
              {/* <button className="flex items-center bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-2 rounded text-sm">
                Hapus Dokumen
              </button> */}
            </div>
          )}
        </div>

        <div className="w-[1200px] overflow-x-auto bg-white shadow-md rounded-lg overflow-hidden mt-4">
          <table className="table-auto border border-gray-300 w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-2 border">No</th>
                <th className="px-6 py-2 border">Aksi</th>
                <th className="px-8 py-2 border">Nama Akun</th>
                <th className="px-4 py-2 border">NPWP</th>
                <th className="px-4 py-2 border">Alamat</th>
                <th className="px-4 py-2 border">Tipe Akun</th>
                <th className="px-4 py-2 border">Email Akun</th>
                <th className="px-4 py-2 border">Negara Asal</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {data && data.length > 0 ? (
                data.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-2 border">{index + 1}</td>
                    {/* <td className="px-8 py-2 border">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5"
                        checked={selectedFakturIds.includes(item.id)}
                        onChange={() => handleCheckboxChange(item.id)}
                      />
                    </td> */}
                    <td className="px-4 py-2 border">
                      <div className="flex space-x-2">
                        {/* <a
                          href={`/praktikum/${id}/sistem/${akun}/e-faktur/pajak-keluaran/edit-faktur-keluaran/${item.id}`}
                        > */}
                        <button
                          onClick={() =>
                            navigate(
                              `/praktikum/${id}/sistem/${akun}/e-faktur/pajak-keluaran/edit-faktur-keluaran/${item.id}`
                            )
                          }
                          className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs"
                        >
                          Edit
                        </button>
                        {/* </a> */}
                        <button
                          onClick={() => deleteFaktur.mutate(item.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs"
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-2 border">
                      {item.nama_akun || "-"}
                    </td>
                    <td className="px-4 py-2 border">
                      {item.npwp_akun || "-"}
                    </td>
                    <td className="px-4 py-2 border">
                      {item.alamat_utama_akun || "-"}
                    </td>
                    <td className="px-4 py-2 border">
                      {item.tipe_akun || "-"}
                    </td>
                    <td className="px-4 py-2 border">
                      {item.email_akun || "-"}
                    </td>
                    <td className="px-4 py-2 border">
                      {item.negara_asal || "-"}
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
}
