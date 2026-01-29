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

const UjianDosenMember = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const [selectedMember, setSelectedMember] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [currentPage, setCurrentPage] = useState(1);
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
    queryKey: ["exam_members", url],
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
        item.user.name?.toLowerCase().includes(search.toLowerCase()) ||
        item.user.email?.toLowerCase().includes(search.toLowerCase())
    ) || [];

  // Apply sorting if sortConfig is set
  const sortedMembers = [...filteredData];
  if (sortConfig.key) {
    sortedMembers.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
  }

  console.log("filtered data: ", filteredData);
  console.log("sorted member: ", sortedMembers);

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
          <button className="rounded-md bg-[#7502B5] px-4 py-2 text-white" onClick={handleBack}>
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
            {sortedMembers.length > 0 ? (
              sortedMembers.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
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
    </div>
  );
};

export default UjianDosenMember;
