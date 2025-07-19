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
// import AssignmentPscMemberDetailPopup from "./AssignmentPscMemberDetailPopup";

const AssignmentPscMember = () => {
  const { assignmentId } = useParams();
  const navigate = useNavigate();
  //   const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
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
    queryKey: ["assignment_members", url],
    queryFn: async () => {
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
          Accept: "application/json",
        },
      });
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
        item.name?.toLowerCase().includes(search.toLowerCase()) ||
        item.email?.toLowerCase().includes(search.toLowerCase())
    ) || [];

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
                <th className="w-[2rem]">Nilai </th>
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
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.status}</td>
                  {pathRoute === "penilaian" ? <td>{item.pivot.score}</td> : ""}
                  <td>
                    {/* <button
                      className="action-button view"
                      onClick={() => handleViewDetail(item.id)}
                    >
                      Detail
                    </button> */}
                    {pathRoute === "penilaian" ? (
                      <>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <button
                              className="action-button score bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                              onClick={() => {
                                setSelectedUser(item);
                                setScoreValue("");
                              }}
                            >
                              Beri Nilai
                            </button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <div className="w-full flex justify-end">
                                <AlertDialogCancel className="border-none shadow-none">
                                  <RxCross1 className="text-2xl text-black hover:cursor-pointer" />
                                </AlertDialogCancel>
                              </div>
                              <AlertDialogTitle>Beri Nilai</AlertDialogTitle>
                              <AlertDialogDescription className="w-full">
                                <div className="">
                                  <p className="mb-4">
                                    Beri nilai untuk:{" "}
                                    <strong>{item.name}</strong>
                                  </p>
                                  <div className="edit-form-group-mahasiswa">
                                    <label>Nilai (0-100):</label>
                                    <input
                                      type="number"
                                      min="0"
                                      max="100"
                                      step="0.01"
                                      value={scoreValue}
                                      onChange={(e) =>
                                        setScoreValue(e.target.value)
                                      }
                                      className="text-black"
                                      placeholder="Masukkan nilai..."
                                    />
                                  </div>
                                </div>
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="bg-red-600 text-white hover:bg-red-800 hover:text-white">
                                Batal
                              </AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-green-600"
                                onClick={() => {
                                  if (
                                    !scoreValue ||
                                    scoreValue < 0 ||
                                    scoreValue > 100
                                  ) {
                                    Swal.fire({
                                      title: "Error!",
                                      text: "Nilai harus antara 0-100",
                                      icon: "error",
                                    });
                                    return;
                                  }
                                  scoreMutation.mutate({
                                    userId: item.id,
                                    score: scoreValue,
                                  });
                                }}
                              >
                                {scoreMutation.status === "pending" ? (
                                  <p>Loading...</p>
                                ) : (
                                  <>Simpan Nilai</>
                                )}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                            <div className="text-xs mt-2 text-red-700">
                              {scoreMutation.isError &&
                                scoreMutation.error.response?.data.message}
                            </div>
                          </AlertDialogContent>
                        </AlertDialog>
                        <button
                          className="action-button edit bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors"
                          onClick={() => {
                            navigate(
                              `/praktikum/${assignmentId}?user_id=${item.id}`
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
        <div className="pagination-container">
          <div className="pagination-info">
            {data?.meta
              ? `Showing ${data.meta.from} to ${data.meta.to} of ${data.meta.total} entries`
              : "No data available"}
          </div>
          <div className="pagination">
            <button
              className="page-item"
              onClick={() => {
                if (data?.links?.prev) setUrl(data.links.prev);
              }}
              disabled={!data?.links?.prev}
            >
              &lt;
            </button>
            <button className="page-item active">
              {data?.meta?.current_page || 1}
            </button>
            <button
              className="page-item"
              onClick={() => {
                if (data?.links?.next) setUrl(data.links.next);
              }}
              disabled={!data?.links?.next}
            >
              &gt;
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
