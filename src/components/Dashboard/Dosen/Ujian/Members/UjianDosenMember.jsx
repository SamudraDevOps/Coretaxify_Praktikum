import React, { useState } from "react";
import "./memberStyles.css";
import Swal from "sweetalert2";
import { useCookies } from "react-cookie";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { RoutesApi } from "@/Routes";
import { ClipLoader } from "react-spinners";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { IntentEnum } from "@/enums/IntentEnum";
import { useParams, useNavigate } from "react-router-dom";
import { FaDownload, FaEdit, FaTrash } from "react-icons/fa";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const UjianDosenMember = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const [selectedMember, setSelectedMember] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const [cookies] = useCookies(["token"]);
  const currentUrl = window.location.href.split("?")[0];
  const [url, setUrl] = useState(
    `${RoutesApi.lecturer.assignments.url}/${examId}/members`
  );
  const [search, setSearch] = useState("");

  // Fetch exam details
  const { data: examData } = useQuery({
    queryKey: ["exam_detail", examId],
    queryFn: async () => {
      const { data } = await axios.get(
        `${RoutesApi.lecturer.assignments.url}/${examId}`,
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
            Accept: "application/json",
          },
        }
      );
      return data;
    },
    enabled: !!examId,
  });

  // Fetch members data
  const { isLoading, isError, data, error, refetch } = useQuery({
    queryKey: ["exam_members", url, currentPage],
    queryFn: async () => {
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
          Accept: "application/json",
        },
        params: {
          intent: IntentEnum.API_GET_ASSIGNMENT_MEMBERS_WITH_SISTEM_SCORES,
          page: currentPage,
          search: search,
        },
      });

      console.log("data asli: ", data);
      return data;
    },
    enabled: !!examId,
  });

  const downloadMutation = useMutation({
    mutationFn: async () => {
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
            Accept: "application/octet-stream",
          },
          params: {
            intent: IntentEnum.API_USER_EXPORT_SCORE,
          },
          responseType: "blob",
        });

        // Create blob URL from response
        const blob = new Blob([response.data], {
          type: response.headers["content-type"],
        });
        const blobUrl = window.URL.createObjectURL(blob);

        // Extract filename from header
        const contentDisposition = response.headers["content-disposition"];
        let filename = "soal.xlsx";
        if (contentDisposition) {
          const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
          const matches = filenameRegex.exec(contentDisposition);
          if (matches?.[1]) {
            filename = matches[1].replace(/['"]/g, "");
          }
        }

        // Trigger download
        const link = document.createElement("a");
        link.href = blobUrl;
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Clean up
        window.URL.revokeObjectURL(blobUrl);

        return response;
      } catch (error) {
        console.error("Download error:", error);
        Swal.fire("Gagal!", "Gagal mengunduh file", "error");
        throw error;
      }
    },
  });

  const handleDownload = () => {
    downloadMutation.mutate();
  };

  // Member removal mutation
  const removeMemberMutation = useMutation({
    mutationFn: async (memberId) => {
      // Get CSRF token
      const response = await axios.get(`${RoutesApi.csrf}`, {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          Accept: "application/json",
        },
      });

      axios.defaults.headers.common["X-CSRF-TOKEN"] = response.data.token;

      return await axios.delete(
        `${RoutesApi.lecturer.assignments.url}/${examId}/members/${memberId}`,
        {
          headers: {
            "X-CSRF-TOKEN": response.data.token,
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );
    },
    onSuccess: () => {
      Swal.fire(
        "Berhasil!",
        "Member berhasil dikeluarkan dari ujian!",
        "success"
      );
      refetch();
    },
    onError: (error) => {
      console.log(error.response);
      if (error.response === undefined) {
        Swal.fire("Gagal!", error.message, "error");
        return;
      }
      Swal.fire("Gagal!", error.response.data.message, "error");
    },
  });

  const handleRemoveMember = (memberId) => {
    Swal.fire({
      title: "Hapus Anggota?",
      text: "Anggota akan dikeluarkan dari ujian ini!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        removeMemberMutation.mutate(memberId);
      }
    });
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleBack = () => {
    navigate("/dosen/ujian");
  };

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

  // Loading state
  if (isLoading) {
    return (
      <div className="loading">
        <ClipLoader color="#7502B5" size={50} />
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="h-screen w-full justify-center items-center flex">
        <Alert variant="destructive" className="w-1/2 bg-white">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error!</AlertTitle>
          <div className="">
            <p>{error?.message ?? "Error!"}</p>
            <div className="w-full flex justify-end">
              <button
                className="bg-green-500 p-2 rounded-md text-white"
                onClick={() => refetch()}
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
    <div className="member-container">
      <div className="header">
        <h2>Peserta Ujian: {examData?.data?.name || "Loading..."}</h2>
      </div>
      <div className="search-add-container">
        <div className="search-input-container">
          <input
            type="text"
            id="search"
            className="search-input"
            placeholder="Cari Peserta 🔎"
            value={search}
            onChange={handleSearchChange}
          />
          <button
            className="bg-blue-500 p-2 rounded-md text-white text-sm ml-2 hover:cursor-pointer hover:bg-blue-700"
            onClick={() => handleDataRefresh()}
          >
            Cari
          </button>
        </div>
        <div className="flex justify-between gap-4">
          <button
            onClick={() => handleDownload()}
            className="download-button"
            disabled={downloadMutation.isPending}
          >
            <FaDownload className="download-icon" />
            {downloadMutation.isPending ? "Loading..." : "Export Nilai"}
          </button>
          <button
            className="rounded-md bg-[#7502B5] px-4 py-2 text-white"
            onClick={handleBack}
          >
            Kembali
          </button>
        </div>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th className="w-[2rem]">No</th>
              <th className="w-[2rem]" onClick={() => handleSort("name")}>
                Nama{" "}
                {sortConfig.key === "name"
                  ? sortConfig.direction === "ascending"
                    ? "↑"
                    : "↓"
                  : ""}
              </th>
              <th className="w-[2rem]" onClick={() => handleSort("email")}>
                Email{" "}
                {sortConfig.key === "email"
                  ? sortConfig.direction === "ascending"
                    ? "↑"
                    : "↓"
                  : ""}
              </th>
              <th className="w-[2rem]">Nilai Bupot</th>
              <th className="w-[2rem]">Nilai Faktur</th>
              <th className="w-[2rem]">Nilai SPT</th>
              <th className="w-[2rem]">Nilai Total</th>
              <th className="w-[2rem]">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.data.length > 0 ? (
              data.data.map((item, index) => (
                <tr key={item.id}>
                  <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td>{item.user.name}</td>
                  <td>{item.user.email}</td>
                  <td>
                    {item.sistem_scores.length > 0
                      ? // <button
                        //   className="download-button"
                        //   onClick={() => handleOpenNilai(item.sistem_scores)}
                        // >
                        //   Lihat Nilai
                        // </button>
                        item.summary.total_bupot_scores_across_all_sistems
                      : "-"}
                  </td>
                  <td>
                    {item.sistem_scores.length > 0
                      ? item.summary.total_faktur_scores_across_all_sistems
                      : "-"}
                  </td>
                  <td>
                    {item.sistem_scores.length > 0
                      ? item.summary.total_spt_scores_across_all_sistems
                      : "-"}
                  </td>
                  <td>
                    {item.sistem_scores.length > 0
                      ? item.summary.total_scores_across_all_sistems
                      : "-"}
                  </td>
                  <td>
                    {/* <button
                      className="action-button delete"
                      onClick={() => handleRemoveMember(item.id)}
                    >
                      Remove
                    </button> */}
                    <button
                      className="action-button edit bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors"
                      onClick={() => {
                        localStorage.setItem("url_penilaian", currentUrl);
                        navigate(
                          `/praktikum/${examId}?user_id=${item.user.id}`
                        );
                      }}
                    >
                      Cek Pengerjaan
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  Belum ada peserta yang bergabung
                </td>
              </tr>
            )}
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

export default UjianDosenMember;
