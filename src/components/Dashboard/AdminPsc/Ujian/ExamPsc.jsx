import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { RoutesApi } from "@/Routes";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { IntentEnum } from "@/enums/IntentEnum";
import { ClipLoader } from "react-spinners";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import CreateExamPopUp from "./CreateExamPopUp";
import UpdateExamPopUp from "./UpdateExamPopUp";
import ExamPscMembers from "./Members/ExamPscMembers";
import Swal from "sweetalert2";
import "./examPsc.css";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const ExamPsc = () => {
  const [cookies] = useCookies(["token"]);
  const [search, setSearch] = useState("");
  const [url, setUrl] = useState(RoutesApi.psc.exams.index().url);
  const [isCreateExamOpen, setIsCreateExamOpen] = useState(false);
  const [isUpdateExamOpen, setIsUpdateExamOpen] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);
  const [selectedExamId, setSelectedExamId] = useState(null);
  const [selectedExamName, setSelectedExamName] = useState("");
  const [isViewMembersOpen, setIsViewMembersOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const navigate = useNavigate();

  const { isLoading, isError, data, error, refetch } = useQuery({
    queryKey: ["exam_data", url],
    queryFn: async () => {
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
          Accept: "application/json",
        },
      });
      return data;
    },
  });

  const { data: tasksData, isLoading: isTasksLoading } = useQuery({
    queryKey: ["soal_data"],
    queryFn: async () => {
      const { data } = await axios.get(RoutesApi.psc.tasks.index().url, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
          Accept: "application/json",
        },
      });
      return data;
    },
  });

  const downloadMutation = useMutation({
    mutationFn: async (id) => {
      try {
        const showEndpoint = RoutesApi.psc.exams.show(id);
        const response = await axios.get(showEndpoint.url, {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
            Accept: "*/*",
          },
          params: {
            intent: IntentEnum.API_USER_DOWNLOAD_FILE,
          },
          responseType: "blob",
        });

        // Extract filename from Content-Disposition header if present
        let filename = "file.pdf"; // Default fallback name
        const contentDisposition = response.headers["content-disposition"];

        if (contentDisposition) {
          // Extract filename from the header
          const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
          const matches = filenameRegex.exec(contentDisposition);
          if (matches !== null && matches[1]) {
            // Clean up the filename
            filename = matches[1].replace(/['"]/g, "");
          }
        }

        // Create a blob URL and trigger download
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        return response;
      } catch (error) {
        console.error("Download error:", error);
        Swal.fire("Gagal!", "Gagal mengunduh file", "error");
        throw error;
      }
    },
  });

  const mutation = useMutation({
    mutationFn: async ({ id, action, formData: examFormData }) => {
      const response = await axios.get(RoutesApi.csrf, {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          Accept: "application/json",
        },
      });

      axios.defaults.headers.common["X-CSRF-TOKEN"] = response.data.token;

      const formatDateForBackend = (dateString) => {
        if (!dateString) return "";
        return dateString.replace("T", " ") + ":00";
      };

      if (action === "create") {
        const formDataObj = new FormData();

        formDataObj.append("name", examFormData.name);
        formDataObj.append("task_id", examFormData.task_id);
        formDataObj.append("duration", examFormData.duration);
        formDataObj.append("exam_code", examFormData.exam_code);

        if (examFormData.supporting_file) {
          formDataObj.append("supporting_file", examFormData.supporting_file);
        }

        if (examFormData.start_period) {
          formDataObj.append(
            "start_period",
            formatDateForBackend(examFormData.start_period)
          );
        }

        if (examFormData.end_period) {
          formDataObj.append(
            "end_period",
            formatDateForBackend(examFormData.end_period)
          );
        }

        return await axios.post(RoutesApi.psc.exams.store().url, formDataObj, {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
            "X-CSRF-TOKEN": response.data.token,
            Authorization: `Bearer ${cookies.token}`,
          },
          params: {
            intent: IntentEnum.API_USER_CREATE_EXAM,
          },
        });
      } else if (action === "update" && id) {
        // Update existing exam
        const formDataObj = new FormData();

        // append fields that have values
        if (examFormData.name) formDataObj.append("name", examFormData.name);
        if (examFormData.task_id)
          formDataObj.append("task_id", examFormData.task_id);
        if (examFormData.duration)
          formDataObj.append("duration", examFormData.duration);
        if (examFormData.supporting_file)
          formDataObj.append("supporting_file", examFormData.supporting_file);
        if (examFormData.start_period)
          formDataObj.append(
            "start_period",
            formatDateForBackend(examFormData.start_period)
          );
        if (examFormData.end_period)
          formDataObj.append(
            "end_period",
            formatDateForBackend(examFormData.end_period)
          );

        formDataObj.append("_method", "PUT");

        const updateEndpoint = RoutesApi.psc.exams.update(id);
        return await axios.post(updateEndpoint.url, formDataObj, {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
            "X-CSRF-TOKEN": response.data.token,
            Authorization: `Bearer ${cookies.token}`,
          },
        });
      } else if (action === "delete" && id) {
        // Delete existing exam
        const deleteEndpoint = RoutesApi.psc.exams.destroy(id);
        return await axios.delete(deleteEndpoint.url, {
          headers: {
            "X-CSRF-TOKEN": response.data.token,
            Authorization: `Bearer ${cookies.token}`,
          },
        });
      }
    },
    onSuccess: (data, variables) => {
      const { action } = variables;

      if (action === "create") {
        Swal.fire("Berhasil!", "Data berhasil ditambah!", "success");
      } else if (action === "update") {
        Swal.fire("Berhasil!", "Data berhasil diperbarui!", "success");
      } else if (action === "delete") {
        Swal.fire("Berhasil!", "Data berhasil dihapus!", "success");
      } else {
        Swal.fire("Berhasil!", "Operasi berhasil dilakukan!", "success");
      }

      refetch();
      setIsCreateExamOpen(false);
      setIsUpdateExamOpen(false);
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

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleCreate = () => {
    setIsCreateExamOpen(true);
  };

  const handleCreateExam = (formData) => {
    mutation.mutate({ action: "create", formData });
  };

  const handleUpdateExam = (id, formData) => {
    mutation.mutate({ id, action: "update", formData });
  };

  const handleDeleteExam = (id) => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Data ujian akan dihapus permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        mutation.mutate({ id, action: "delete" });
      }
    });
  };

  const handleViewMembers = (examId, name) => {
    navigate(`/psc/ujian/${examId}/members`);
  };

  const handleDownload = (id) => {
    downloadMutation.mutate(id);
  };

  const handleEditClick = (exam) => {
    setSelectedExam(exam);
    setIsUpdateExamOpen(true);
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    try {
      return format(new Date(dateString), "yyyy-MM-dd HH:mm");
    } catch (error) {
      return dateString;
    }
  };

  const getTaskName = (taskId) => {
    if (!tasksData || !tasksData.data) return "-";
    const task = tasksData.data.find((task) => task.id === taskId);
    return task ? task.name : "-";
  };

  if (isLoading) {
    return (
      <div className="loading">
        <ClipLoader color="#7502B5" size={50} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="h-screen w-full justify-center items-center flex">
        <Alert variant="destructive" className="w-1/2 bg-white">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error!</AlertTitle>
          <div className="">
            <p>{error?.message ?? "Error loading ujian!"}</p>
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

  const filteredData =
    data?.data?.filter(
      (item) =>
        item.name?.toLowerCase().includes(search.toLowerCase()) ||
        item.description?.toLowerCase().includes(search.toLowerCase()) ||
        item.status?.toLowerCase().includes(search.toLowerCase())
    ) || [];

  // Apply sorting if sortConfig is set
  const sortedExams = [...filteredData];
  if (sortConfig.key) {
    sortedExams.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
  }

  return (
    <div className="ujian-container">
      <div className="header">
        <h2>Data Ujian</h2>
      </div>
      <div className="search-add-container">
        <div className="search-input-container">
          <input
            type="text"
            id="search"
            className="search-input"
            placeholder="Cari Ujian                       🔎"
            value={search}
            onChange={handleSearchChange}
          />
        </div>
        <button
          className="bg-blue-800 p-2 rounded-md text-white hover:bg-blue-900"
          onClick={handleCreate}
        >
          Tambah Ujian
        </button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th onClick={() => handleSort("name")}>
                Nama Ujian{" "}
                {sortConfig.key === "name"
                  ? sortConfig.direction === "ascending"
                    ? "↑"
                    : "↓"
                  : "↑"}
              </th>
              <th>Kode Ujian</th>
              <th>Soal</th>
              <th>Tanggal Mulai</th>
              <th>Tanggal Selesai</th>
              <th>Durasi (menit)</th>
              <th>File Support</th>
              {/* <th>Status</th> */}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedExams.length > 0 ? (
              sortedExams.map((exam, index) => (
                <tr key={exam.id}>
                  <td>{index + 1}</td>
                  <td>{exam.name}</td>
                  <td>{exam.exam_code}</td>
                  <td>{getTaskName(exam.task_id)}</td>
                  <td>{formatDate(exam.start_period)}</td>
                  <td>{formatDate(exam.end_period)}</td>
                  <td>{exam.duration}</td>
                  <td>
                    {exam.supporting_file ? (
                      <button
                        onClick={() => handleDownload(exam.id)}
                        className="download-button"
                        disabled={downloadMutation.isPending}
                      >
                        {downloadMutation.isPending ? "Loading..." : "Download"}
                      </button>
                    ) : (
                      <span>-</span>
                    )}
                  </td>
                  {/* <td>
                    {exam.status === "ACTIVE" ? (
                      <span className="status-badge active">Aktif</span>
                    ) : exam.status === "COMPLETED" ? (
                      <span className="status-badge completed">Selesai</span>
                    ) : (
                      <span className="status-badge inactive">Tidak Aktif</span>
                    )}
                  </td> */}
                  <td>
                    <button
                      className="action-button edit"
                      onClick={() => handleEditClick(exam)}
                    >
                      Edit
                    </button>
                    <button
                      className="action-button delete"
                      onClick={() => handleDeleteExam(exam.id)}
                    >
                      Delete
                    </button>
                    <button
                      className="action-button view"
                      onClick={() => handleViewMembers(exam.id, exam.name)}
                    >
                      Detail
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center">
                  Tidak ada data ujian
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

      {/* Create Exam Modal */}
      {isCreateExamOpen && (
        <CreateExamPopUp
          isOpen={isCreateExamOpen}
          onClose={() => setIsCreateExamOpen(false)}
          onCreate={handleCreateExam}
          tasksData={tasksData}
          isLoading={mutation.isPending}
        />
      )}

      {/* Update Exam Modal */}
      {isUpdateExamOpen && selectedExam && (
        <UpdateExamPopUp
          isOpen={isUpdateExamOpen}
          onClose={() => setIsUpdateExamOpen(false)}
          onUpdate={handleUpdateExam}
          examData={selectedExam}
          tasksData={tasksData}
          isLoading={mutation.isPending}
        />
      )}

      {/* View Members Modal */}
      {isViewMembersOpen && selectedExamId && (
        <ExamPscMembers
          isOpen={isViewMembersOpen}
          onClose={() => setIsViewMembersOpen(false)}
          examId={selectedExamId}
          examName={selectedExamName}
        />
      )}
    </div>
  );
};

export default ExamPsc;
