import React, { useState } from 'react';
import Swal from "sweetalert2";
import { useCookies } from "react-cookie";
import axios from "axios";
import { RoutesApi } from "@/Routes";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import EditBupotObjekPajak from "./Edit";
import TambahBupotObjekPajak from "./Create";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Routes } from 'react-router';
import { ClipLoader } from "react-spinners";

const BupotObjekPajak = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [idEdit, setIdEdit] = useState(-1);
  const [namaEdit, setNamaEdit] = useState();
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const itemsPerPage = 20;
  const [cookies, setCookie] = useCookies([]);
  const [url, setUrl] = useState(`${RoutesApi.apiUrl}bupot-objek-pajaks`);
  const { toast } = useToast();

  const { isLoading, isError, data, error, refetch } = useQuery({
    queryKey: ["bupot_objek_pajak", url, currentPage],
    queryFn: async () => {
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
        params: {
          page: currentPage,
          perPage: itemsPerPage,
          search: search,
          intent: "api.admin",
        },
      });
      return data;
    },
  });

  console.log(data);

  const mutation = useMutation({
    mutationFn: async ({id}) => {
      const response = await axios.get(RoutesApi.csrf, {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          Accept: "application/json",
        },
      })
      axios.defaults.headers.common["X-CSRF-TOKEN"] = response.data.token;
      const deleteEndpoint = RoutesApi.admin.universities.destroy(id);
      return await axios.delete(deleteEndpoint.url, {
        headers: {
          "X-CSRF-TOKEN": response.data.token,
          Authorization: `Bearer ${cookies.token}`,
        },
      })
    },
    onSuccess: () => {
      Swal.fire({
        title: "Berhasil!",
        text: "Objek Pajak Bupot Berhasil Dihapus!",
        icon: "success",
        timer: 2000, // auto close after 2 seconds
        showConfirmButton: false,
        timerProgressBar: true,
      }).then(() => {
        refetch();
      });
    },
    onError: (error) => {
      console.log(error);
      Swal.fire({
        title: "Gagal!",
        text: error.message,
        icon: "error",
        timer: 2000, // auto close after 2 seconds
        showConfirmButton: false,
        timerProgressBar: true,
      }).then(() => {
        refetch();
      });
    },
  });

  const handleDataRefresh = () => {
    refetch();
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Pagination
  const getPageFromUrl = (url) => {
    if (!url) return null;
    const matches = url.match(/[?&]page=(\d+)/);
    return matches ? parseInt(matches[1]) : null;
  };

  let totalPages = null;
  let firstPage = null;
  let lastPage = null;
  let nextPage = null;
  let prevPage = null;

  if (!isLoading) {
    // Get page numbers from links
    totalPages = data.meta?.last_page;
    firstPage = data.links?.first ? getPageFromUrl(data.links.first) : 1;
    lastPage = data.links?.last ? getPageFromUrl(data.links.last) : totalPages;
    nextPage = data.links?.next ? getPageFromUrl(data.links.next) : null;
    prevPage = data.links?.prev ? getPageFromUrl(data.links.prev) : null;
  }

  const handlePageClick = (page) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      handlePageChange(page);
    }
  };

  if (isError) {
    {
      console.log(error);
    }
    return (
      <div className="h-screen w-full justify-center items-center flex ">
        <Alert variant="destructive" className="w-1/2 bg-white ">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error !</AlertTitle>
          <div className="">
            <p>{error?.message ?? "error !"}</p>
            <div className="w-full flex justify-end">
              <button
                className="bg-green-500 p-2 rounded-md text-white"
                onClick={() => handleDataRefresh()}
              >
                Ulangi
              </button>
            </div>
          </div>
        </Alert>
      </div>
    );
  }

  return (
    <div className="kontrak-container">
      <div className="header-kontrak">
        <h2>Data Objek Pajak Bupot</h2>
      </div>
      <div className="search-add-container">
        <div className="flex items-center">
          <input
            type="text"
            className="search-input"
            placeholder="Cari Data Objek Pajak Bupot"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="bg-blue-500 p-2 rounded-md text-white text-sm ml-2 hover:cursor-pointer hover:bg-blue-700"
            onClick={() => handleDataRefresh()}
          >
            Cari
          </button>
        </div>
        <button className="add-button" onClick={() => setIsOpen(true)}>
          Tambah Data Objek Pajak Bupot
        </button>
      </div>
      <TambahBupotObjekPajak
        refetch={refetch}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSave={handleDataRefresh}
        setOpen={setIsOpen} 
      />
      <EditBupotObjekPajak 
        refetch={refetch}
        isOpen={isOpenEdit}
        id={idEdit}
        onClose={() => setIsOpenEdit(false)}
        onSave={handleDataRefresh}
        setOpen={setIsOpenEdit}
        data={data?.data?.find((item) => item.id === idEdit)}
      />

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Tipe Bupot</th>
              <th>Nama Objek Pajak</th>
              <th>Jenis Pajak</th>
              <th>Kode Objek Pajak</th>
              <th>Tarif Pajak</th>
              <th>KAP</th>
              <th>Persentase Penghasilan Bersih</th>
              <th>Sifat Pajak Penghasilan</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {!isLoading &&
              data?.data?.map((item, index) => (
                <tr key={index}>
                  <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td className="text-left whitespace-normal break-words max-w-[200px]">{item.tipe_bupot}</td>
                  <td className="whitespace-normal break-words max-w-[200px]">{item.nama_objek_pajak}</td>
                  <td className="whitespace-normal break-words max-w-[200px]">{item.jenis_pajak}</td>
                  <td className="whitespace-normal break-words max-w-[200px]">{item.kode_objek_pajak}</td>
                  <td className="whitespace-normal break-words max-w-[200px]">{item.tarif_pajak}</td>
                  <td className="whitespace-normal break-words max-w-[200px]">{item.kap}</td>
                  <td className="whitespace-normal break-words max-w-[200px]">{item.persentase_penghasilan_bersih}</td>
                  <td className="whitespace-normal break-words max-w-[200px]">{item.sifat_pajak_penghasilan}</td>
                  <td>
                    <button
                      className="bg-blue-500 p-2 rounded-md text-white text-sm hover:cursor-pointer hover:bg-blue-700"
                      onClick={() => {
                        setIdEdit(item.id);
                        setIsOpenEdit(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 p-2 rounded-md text-white text-sm ml-2 hover:cursor-pointer hover:bg-red-700"
                      onClick={() => {
                        Swal.fire({
                          title: "Hapus Objek Pajak Bupot?",
                          text: "Objek Pajak akan dihapus secara permanen!",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonText: "Ya, hapus!",
                          cancelButtonText: "Batal",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            mutation.mutate({ id: item.id });
                          }
                        })
                      }}
                    >
                      {mutation.status == "pending" ? (
                        <p>Loading...</p>
                      ) : (
                        <>Hapus</>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
              {isLoading && <tr><td colSpan="50" className="text-center"><ClipLoader /></td></tr>}
          </tbody>
        </table>
        <div className="pagination-container flex-justify-between">
          <div className="flex space-x-2">
            <p className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => handlePageChange(firstPage)}
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
              onClick={() => handlePageChange(prevPage || 1)}
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
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((pageNum) => {
                  // Show first, last, and pages around current
                  return (
                    pageNum === 1 ||
                    pageNum === totalPages ||
                    (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
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
                        onClick={() => handlePageClick(pageNum)}
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
              onClick={() => handlePageChange(nextPage || totalPages)}
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
              onClick={() => handlePageChange(lastPage)}
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
      </div>
    </div>
  )
}

export default BupotObjekPajak;