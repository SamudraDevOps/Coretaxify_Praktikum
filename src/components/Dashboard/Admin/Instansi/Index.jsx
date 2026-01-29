import React, { useState } from "react";
import TambahInstansi from "./Create";
import Swal from "sweetalert2";
import { CookiesProvider, useCookies } from "react-cookie";
import axios from "axios";
import { RoutesApi } from "@/Routes";
import { useQuery, useMutation } from "@tanstack/react-query";
import ClipLoader from "react-spinners/ClipLoader";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { FaRegCopy } from "react-icons/fa";

import EditInstansi from "./Edit";
import { deleteContract, getContracts, testAlert } from "@/hooks/dashboard";
import { getCookie, getCookieToken } from "@/service";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Instansi = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [idEdit, setIdEdit] = useState(-1);
  const [namaEdit, setNamaEdit] = useState();
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const [cookies, setCookie] = useCookies([]);
  const [url, setUrl] = useState(RoutesApi.admin.universities.index().url);
  const { toast } = useToast();

  const { isLoading, isError, data, error, refetch } = useQuery({
    queryKey: ["instansi", url, currentPage],
    queryFn: async () => {
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
        params: {
          page: currentPage,
          perPage: itemsPerPage,
        },
      });
      return data;
    },
  });

  console.log(data);

  const mutation = useMutation({
    mutationFn: async ({ id }) => {
      const response = await axios.get(RoutesApi.csrf, {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          Accept: "application/json",
        },
      });
      axios.defaults.headers.common["X-CSRF-TOKEN"] = response.data.token;
      const deleteEndpoint = RoutesApi.admin.universities.destroy(id);
      return await axios.delete(deleteEndpoint.url, {
        headers: {
          "X-CSRF-TOKEN": response.data.token,
          Authorization: `Bearer ${cookies.token}`,
        },
      });
    },
    onSuccess: () => {
      Swal.fire({
        title: "Berhasil!",
        text: "Instansi berhasil dihapus!",
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

  // Function to refresh data after actions
  const handleDataRefresh = () => {
    refetch();
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleData = (newData) => {
    refetch();
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });

    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) return direction === "ascending" ? -1 : 1;
      if (a[key] > b[key]) return direction === "ascending" ? 1 : -1;
      return 0;
    });
    setData(sortedData);
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
            {/* <p>{!error.message ? error.message : "Error ! "}</p> */}
            <div className="w-full flex justify-end">
              <button
                className="bg-green-500 p-2 rounded-md text-white"
                onClick={() => refetch()}
              >
                Ulangi
              </button>
            </div>
          </div>
          {/* <AlertDescription>
            {error.message}</AlertDescription> */}
        </Alert>
      </div>
    );
  }

  return (
    <div className="kontrak-container">
      <div className="header-kontrak ">
        <h2>Data Instansi</h2>
      </div>
      <div className="search-add-container">
        <input
          type="text"
          className="search-input"
          placeholder="Cari Data Instansi 🔎"
        />
        <button className="add-button" onClick={() => setIsOpen(true)}>
          + Tambah Data Instansi
        </button>
      </div>
      <TambahInstansi
        refetch={refetch}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSave={handleData}
        setOpen={setIsOpen}
      />
      <EditInstansi
        refetch={refetch}
        isOpen={isOpenEdit}
        instansi={namaEdit}
        id={idEdit}
        onClose={() => setIsOpenEdit(false)}
        onSave={handleData}
        setEdit={setIdEdit}
      ></EditInstansi>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th style={{ textAlign: "left" }}>Nama Instansi</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {!isLoading &&
              data.data.map((item, index) => (
                <tr key={index}>
                  <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td style={{ textAlign: "left" }}>{item.name}</td>
                  <td>
                    <button
                      className="action-button"
                      onClick={() => {
                        setIdEdit(item.id);
                        setNamaEdit(item.name);
                        setIsOpenEdit(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="action-button delete"
                      onClick={() => {
                        Swal.fire({
                          title: "Hapus Instansi?",
                          text: "Instansi akan dihapus secara permanen!",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonText: "Ya, hapus!",
                          cancelButtonText: "Batal",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            mutation.mutate({ id: item.id });
                          }
                        });
                      }}
                    >
                      {mutation.status == "pending" ? (
                        <p>Loading...</p>
                      ) : (
                        <>Delete</>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
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
  );
};

export default Instansi;
