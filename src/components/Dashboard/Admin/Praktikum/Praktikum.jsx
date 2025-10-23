import React, { useEffect, useState } from "react";
import EditPopupPraktikum from "./EditPopupPraktikum";
import Swal from "sweetalert2";
import { IntentEnum } from "@/enums/IntentEnum";
import { CookiesProvider, useCookies } from "react-cookie";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { RoutesApi } from "@/Routes";
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Praktikum() {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [search, setSearch] = useState("");
  const [cookies, setCookie] = useCookies(["user"]);
  const navigate = useNavigate();
  const [url, setUrl] = useState(RoutesApi.admin.assignments.index().url);

  const { isLoading, isError, data, error, refetch } = useQuery({
    queryKey: ["tasks_question", url],
    queryFn: async () => {
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
          Accept: "application/json",
        },
        params: {
          intent: IntentEnum.API_GET_ASSIGNMENT_ALL,
          search: search,
        },
      });

      console.log(data);
      return data;
    },
  });

  const [formData, setFormData] = useState({
    name: "",
  });

  const mutation = useMutation({
    mutationFn: async ({ id, action }) => {
      const response = await axios.get(RoutesApi.csrf, {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          Accept: "application/json",
        },
      });

      axios.defaults.headers.common["X-CSRF-TOKEN"] = response.data.token;

      if (action === "update" && id) {
        const updateEndpoint = RoutesApi.admin.assignments.update(id);
        return await axios.put(
          updateEndpoint.url,
          {
            name: formData.name,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              "X-CSRF-TOKEN": response.data.token,
              Authorization: `Bearer ${cookies.token}`,
            },
          }
        );
      }
    },
    onSuccess: (data, variables) => {
      const { action } = variables;
      if (action === "update") {
        // Swal.fire("Berhasil", "Praktikum berhasil diperbarui!", "success");

        Swal.fire({
          title: "Berhasil!",
          text: "Praktikum berhasil diperbarui!",
          icon: "success",
          timer: 2000, // auto close after 2 seconds
          showConfirmButton: false,
          timerProgressBar: true,
        }).then(() => {
          window.location.reload();
        });
      } else if (action === "delete") {
        // Swal.fire("Berhasil", "Praktikum berhasil dihapus!", "success");

        Swal.fire({
          title: "Berhasil!",
          text: "Praktikum berhasil dihapus!",
          icon: "success",
          timer: 2000, // auto close after 2 seconds
          showConfirmButton: false,
          timerProgressBar: true,
        }).then(() => {
          window.location.reload();
        });
      }
      refetch();
      setIsUpdateOpen(false);
      setFormData({
        name: "",
      });
    },
    onError: (error) => {
      console.log(error.message);
      if (error.response === undefined) {
        // Swal.fire("Gagal!", error?.message, "error");
        Swal.fire({
          title: "Gagal!",
          text: error?.message,
          icon: "error",
          timer: 2000, // auto close after 2 seconds
          showConfirmButton: false,
          timerProgressBar: true,
        }).then(() => {
          window.location.reload();
        });
        return;
      }
      // Swal.fire("Gagal!", error?.response?.data?.message, "error");
      Swal.fire({
        title: "Gagal!",
        text: error?.response?.data?.message,
        icon: "error",
        timer: 2000, // auto close after 2 seconds
        showConfirmButton: false,
        timerProgressBar: true,
      }).then(() => {
        window.location.reload();
      });
    },
  });

  const handleEdit = (assignment) => {
    setSelectedAssignment(assignment);
    setFormData({
      name: assignment.name,
    });

    setIsUpdateOpen(true);
  };

  const handleViewMembers = (assignmentId) => {
    navigate(`/admin/praktikum/${assignmentId}/members`);
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });

    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "ascending" ? -1 - mahasiswa : 1;
      }
      if (a[key] > b[key]) {
        return direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
    setData(sortedData);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (isLoading) {
    return (
      <div className="loading">
        <ClipLoader color="#7502B5" size={50} />
      </div>
      // <div className="h-full w-full text-2xl italic font-bold text-center flex items-center justify-center">Loading...</div>
    );
  }

  return (
    <div className="kontrak-container">
      <div className="header">
        <h2>Data Praktikum</h2>
        {/* <p>{cookies.user ? cookies.user : "no user"}</p>
        {processedData.map((item) => (
          <li key={item.id} style={{ color: item.highlight ? "red" : "black" }}>
            {item.namaPraktikum}
          </li>
        ))} */}
      </div>
      <div className="search-add-container">
        <div className="search-input-container">
          <input
            type="text"
            id="search"
            className="search-input"
            placeholder="Cari Praktikum   🔎"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="bg-blue-500 p-2 rounded-md text-white text-sm ml-2 hover:cursor-pointer hover:bg-blue-700"
            onClick={() => refetch()}
          >
            Cari
          </button>
        </div>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th onClick={() => handleSort("name")}>
                Nama Praktikum{" "}
                {sortConfig.key === "name"
                  ? sortConfig.direction === "ascending"
                    ? "↑"
                    : "↓"
                  : sortConfig.direction === "descending"
                  ? "↓"
                  : "↑"}
              </th>
              <th className="">Nama Dosen</th>
              <th className="">Instansi</th>
              <th className="">Status</th>
              <th className="">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.data.map((item, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.group ? item.group.teacher : item.user.name}</td>
                  <td>{item.instansi}</td>
                  <td>{item.group ? item.group.status : "-"}</td>
                  <td>
                    <button
                      className="action-button edit"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="action-button view"
                      onClick={() => handleViewMembers(item.id)}
                    >
                      Detail
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
      <EditPopupPraktikum
        isOpen={isUpdateOpen}
        onClose={() => setIsUpdateOpen(false)}
        onSave={() =>
          mutation.mutate({ id: selectedAssignment.id, action: "update" })
        }
        formData={formData}
        setFormData={setFormData}
        isLoading={mutation.isPending}
      />
    </div>
  );
}
