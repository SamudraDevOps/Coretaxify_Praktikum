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
import { useParams, useNavigate, useLocation } from "react-router-dom";
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
import { RxCross1 } from "react-icons/rx";
import { IntentEnum } from "@/enums/IntentEnum";
// import AssignmentPscMemberDetailPopup from "./AssignmentPscMemberDetailPopup";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const AssignmentPscMember = () => {
  const { assignmentId } = useParams();
  const navigate = useNavigate();
  //   const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const currentUrl = window.location.href.split("?")[0];
  const [cookies] = useCookies(["user"]);
  const [url, setUrl] = useState(
    `${RoutesApi.psc.assignments.url}/${assignmentId}/members`
  );
  const [search, setSearch] = useState("");
  const [scoreModal, setScoreModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [scoreValue, setScoreValue] = useState("");
  const location = useLocation();

  const getRoute = () => {
    const pathSegments = location.pathname.split("/");
    const currentRoute = pathSegments.find((segment) =>
      ["penilaian"].includes(segment)
    );

    switch (currentRoute) {
      case "penilaian":
        return "penilaian";
      default:
        return "praktikum";
    }
  };

  const pathRoute = getRoute();

  // Fetch assignment details
  const { data: assignmentData } = useQuery({
    queryKey: ["assignment_detail", assignmentId],
    queryFn: async () => {
      const { data } = await axios.get(
        `${RoutesApi.psc.assignments.url}/${assignmentId}`,
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
            Accept: "application/json",
          },
        }
      );
      return data;
    },
    enabled: !!assignmentId,
  });

  // Fetch members data
  const { isLoading, isError, data, error, refetch } = useQuery({
    queryKey: ["assignment_members", url, currentPage],
    queryFn: async () => {
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
          Accept: "application/json",
        },
        params: {
          intent: IntentEnum.API_GET_ASSIGNMENT_MEMBERS_WITH_SISTEM_SCORES,
          page: currentPage,
        },
      });
      console.log(data);
      return data;
    },
    enabled: !!assignmentId,
  });

  const scoreMutation = useMutation({
    mutationFn: async ({ userId, score }) => {
      const response = await axios.put(
        `${RoutesApi.psc.assignments.url}/${assignmentId}/members/${userId}/score`,
        { score: parseFloat(score) },
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
            Accept: "application/json",
          },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      Swal.fire({
        title: "Berhasil!",
        text: "Nilai berhasil diberikan!",
        icon: "success",
      });
      setScoreModal(false);
      setScoreValue("");
      setSelectedUser(null);
      // Refetch data to update the UI
      window.location.reload(); // or use react-query's refetch
    },
    onError: (error) => {
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Gagal memberikan nilai",
        icon: "error",
      });
    },
  });

  // Member removal mutation
  const removeMemberMutation = useMutation({
    mutationFn: async (memberId) => {
      // Get CSRF token
      const response = await axios.get(`${RoutesApi.url}api/csrf-token`, {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          Accept: "application/json",
        },
      });

      axios.defaults.headers.common["X-CSRF-TOKEN"] = response.data.token;

      return await axios.delete(
        `${RoutesApi.psc.assignments.url}/${assignmentId}/members/${memberId}`,
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
        "Member berhasil dihapus dari praktikum!",
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

  // Member detail fetch mutation
  //   const memberDetailMutation = useMutation({
  //     mutationFn: async (memberId) => {
  //       return await axios.get(
  //         `${RoutesApi.psc.assignments.url}/${assignmentId}/members/${memberId}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${cookies.token}`,
  //             Accept: "application/json",
  //           }
  //         }
  //       );
  //     },
  //     onSuccess: (response) => {
  //       setSelectedMember(response.data);
  //       setIsDetailOpen(true);
  //     },
  //     onError: (error) => {
  //       console.log(error.response);
  //       Swal.fire("Gagal!", "Gagal mengambil detail member", "error");
  //     },
  //   });

  //   const handleViewDetail = (memberId) => {
  //     memberDetailMutation.mutate(memberId);
  //   };

  const handleRemoveMember = (memberId) => {
    Swal.fire({
      title: "Hapus Member?",
      text: "Member akan dihapus dari praktikum ini!",
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
    navigate(pathRoute === "penilaian" ? "/psc/penilaian" : "/psc/praktikum");
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="loading">
        <ClipLoader color="#7502B5" size={50} />
      </div>
    );
  }

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

  // Filter data based on search
  const filteredData =
    data?.data?.filter(
      (item) =>
        item.user.name?.toLowerCase().includes(search.toLowerCase()) ||
        item.user.email?.toLowerCase().includes(search.toLowerCase())
    ) || [];

  console.log("filtered data: ", filteredData);

  return (
    <div className="member-container">
      <div className="header">
        <h2>Peserta Praktikum: {assignmentData?.data?.name || "Loading..."}</h2>
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
        </div>
        <button className="back-button" onClick={handleBack}>
          Kembali
        </button>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th onClick={() => handleSort("name")}>
                Nama{" "}
                {sortConfig.key === "name"
                  ? sortConfig.direction === "ascending"
                    ? "↑"
                    : "↓"
                  : ""}
              </th>
              <th onClick={() => handleSort("email")}>
                Email{" "}
                {sortConfig.key === "email"
                  ? sortConfig.direction === "ascending"
                    ? "↑"
                    : "↓"
                  : ""}
              </th>
              <th>Status</th>
              {pathRoute === "penilaian" ? (
                <>
                  <th className="w-[2rem]">Nilai Bupot</th>
                  <th className="w-[2rem]">Nilai Faktur</th>
                  <th className="w-[2rem]">Nilai SPT</th>
                  <th className="w-[2rem]">Nilai Total</th>
                </>
              ) : (
                ""
              )}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.user.name}</td>
                  <td>{item.user.email}</td>
                  <td>{item.user.status}</td>
                  {pathRoute === "penilaian" ? (
                    <>
                      <td>
                        {item.sistem_scores.length > 0
                          ? item.summary.total_bupot_scores_across_all_sistems
                          : ""}
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
                    </>
                  ) : (
                    ""
                  )}
                  <td>
                    {/* <button
                      className="action-button view"
                      onClick={() => handleViewDetail(item.id)}
                    >
                      Detail
                    </button> */}
                    {pathRoute === "penilaian" ? (
                      <>
                        <button
                          className="action-button edit bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors"
                          onClick={() => {
                            localStorage.setItem("url_penilaian", currentUrl);
                            navigate(
                              `/praktikum/${assignmentId}?user_id=${item.user.id}`
                            );
                          }}
                        >
                          Cek Pengerjaan
                        </button>
                      </>
                    ) : (
                      <button
                        className="action-button delete"
                        onClick={() => handleRemoveMember(item.id)}
                      >
                        Remove
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">
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

      {/* Member Detail Popup */}
      {/* {isDetailOpen && (
        <AssignmentPscMemberDetailPopup
          onClose={() => setIsDetailOpen(false)}
          member={selectedMember}
        />
      )} */}
    </div>
  );
};

export default AssignmentPscMember;
