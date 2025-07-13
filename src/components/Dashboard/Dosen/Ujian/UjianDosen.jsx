import React, { useState, useEffect } from "react";
import { RoutesApi } from "@/Routes";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import { IntentEnum } from "@/enums/IntentEnum";
import { ClipLoader } from "react-spinners";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { useNavigate, useOutletContext } from "react-router-dom";

import { IoReload } from "react-icons/io5";
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
import { CookiesProvider, useCookies } from "react-cookie";

export default function UjianDosen() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [url, setUrl] = useState(RoutesApi.lecturer.assignments.index().url);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();
  const { user } = useOutletContext();

  const [selectedData, setSelectedData] = useState({
    name: "",
    task_id: "",
    assignment_code: "",
    supporting_file: null,
    start_period: "",
    end_period: "",
    duration: "",
  });

  const { isLoading, isError, data, error, refetch } = useQuery({
    queryKey: ["ujian_data"],
    queryFn: async () => {
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
          Accept: "application/json",
        },
        params: {
          column_filters: {
            tipe: "exam",
            user_id: user.data.id
          },
        },
      });
      return data;
    },
  });

  const { data: tasksData, isLoading: isTasksLoading } = useQuery({
    queryKey: ["soal_data"],
    queryFn: async () => {
      const { data } = await axios.get(RoutesApi.getTasksLecturer, {
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
        const showEndpoint = RoutesApi.lecturer.assignments.show(id);
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

        let filename = "file.pdf";
        const contentDisposition = response.headers["content-disposition"];

        if (contentDisposition) {
          const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
          const matches = filenameRegex.exec(contentDisposition);
          if (matches !== null && matches[1]) {
            filename = matches[1].replace(/['"]/g, "");
          }
        }

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
        formDataObj.append("assignment_code", examFormData.assignment_code);

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

        return await axios.post(
          RoutesApi.lecturer.assignments.store().url,
          formDataObj,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Accept: "application/json",
              "X-CSRF-TOKEN": response.data.token,
              Authorization: `Bearer ${cookies.token}`,
            },
            params: {
              intent: IntentEnum.API_USER_CREATE_EXAM,
            },
          }
        );
      } else if (action === "update" && id) {
        const formDataObj = new FormData();

        if (examFormData.name) formDataObj.append("name", examFormData.name);
        if (examFormData.task_id)
          formDataObj.append("task_id", examFormData.task_id);
        if (examFormData.duration)
          formDataObj.append("duration", examFormData.duration);

        // Only append supporting_file if it's a File object (newly selected file)
        if (examFormData.supporting_file instanceof File) {
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

        formDataObj.append("_method", "PUT");

        const updateEndpoint = RoutesApi.lecturer.assignments.update(id);
        return await axios.post(updateEndpoint.url, formDataObj, {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
            "X-CSRF-TOKEN": response.data.token,
            Authorization: `Bearer ${cookies.token}`,
          },
        });
      } else if (action === "delete" && id) {
        const deleteEndpoint = RoutesApi.lecturer.assignments.destroy(id);
        return await axios.delete(deleteEndpoint.url, {
          headers: {
            Accept: "application/json",
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
      setIsAddOpen(false);
      setIsOpen(false);
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

  const handleViewMembers = (examId, name) => {
    navigate(`/dosen/ujian/${examId}/members`);
  };

  const handleDownload = (id) => {
    downloadMutation.mutate(id);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    try {
      return format(new Date(dateString), "yyyy-MM-dd HH:mm");
    } catch (error) {
      return dateString;
    }
  };

  // Format datetime for input fields
  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toISOString().slice(0, 16); // Format: YYYY-MM-DDTHH:MM
    } catch (error) {
      console.error("Error formatting date:", error);
      return "";
    }
  };

  const getTaskName = (taskId) => {
    if (!tasksData) return "-";
    const task = tasksData.find((task) => task.id === taskId);
    return task ? task.name : "-";
  };

  const [formData, setFormData] = useState({
    name: "",
    task_id: "",
    assignment_code: "",
    start_period: "",
    end_period: "",
    duration: "",
    supporting_file: null,
  });

  const generateRandomCode = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";
    for (let i = 0; i < 5; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setSelectedData({ ...selectedData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, supporting_file: file });
    }
  };

  const handleUpdateFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedData({ ...selectedData, supporting_file: file });
    }
  };

  const handleSave = () => {
    mutation.mutate({ action: "create", formData });
  };

  const handleUpdate = () => {
    mutation.mutate({
      id: selectedData.id,
      action: "update",
      formData: selectedData,
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Hapus Ujian?",
      text: "Ujian akan dihapus secara permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    }).then((result) => {
      if (result.isConfirmed) {
        mutation.mutate({ id, action: "delete" });
      }
    });
  };

  const handleReloadCode = () => {
    setFormData({ ...formData, assignment_code: generateRandomCode() });
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const handleEditClick = (item) => {
    setSelectedData({
      id: item.id,
      name: item.name || "",
      task_id: item.task_id?.toString() || "",
      assignment_code: item.assignment_code || "",
      start_period: formatDateForInput(item.start_period) || "",
      end_period: formatDateForInput(item.end_period) || "",
      duration: item.duration?.toString() || "",
      supporting_file: null, // File can't be pre-filled
      original_supporting_file: item.supporting_file, // Keep track of original file
    });
    setIsOpen(true);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const [search, setSearch] = useState("");

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
    data?.data?.filter((item) =>
      item.name?.toLowerCase().includes(search.toLowerCase())
    ) || [];

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
    <div className="kontrak-container">
      <div className="header">
        <h2>Ujian</h2>
      </div>
      <div className="search-add-container">
        <div className="search-input-container">
          <input
            type="text"
            id="search"
            className="search-input"
            placeholder="Cari Ujian                       🔎"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button
          className="bg-blue-800 p-2 rounded-md text-white hover:bg-blue-900"
          onClick={() => {
            setIsAddOpen(true);
            setFormData({
              name: "",
              task_id: "",
              start_period: "",
              end_period: "",
              duration: "",
              supporting_file: null,
              assignment_code: generateRandomCode(),
            });
          }}
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
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedExams.length > 0 ? (
              sortedExams.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.assignment_code}</td>
                  <td>{getTaskName(item.task_id)}</td>
                  <td>{formatDate(item.start_period)}</td>
                  <td>{formatDate(item.end_period)}</td>
                  <td>{item.duration}</td>
                  <td>
                    {item.supporting_file ? (
                      <button
                        onClick={() => handleDownload(item.id)}
                        className="download-button"
                        disabled={downloadMutation.isPending}
                      >
                        {downloadMutation.isPending ? "Loading..." : "Download"}
                      </button>
                    ) : (
                      <span>-</span>
                    )}
                  </td>
                  <td>
                    <button
                      className="action-button edit"
                      onClick={() => handleEditClick(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="action-button delete"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                    <button
                      className="action-button view"
                      onClick={() => handleViewMembers(item.id, item.name)}
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
        <div className="pagination-container sticky">
          <div className="pagination-info">
            {`Showing ${indexOfFirstItem + 1} to ${Math.min(
              indexOfLastItem,
              filteredData.length
            )} of ${filteredData.length} entries`}
          </div>

          <div className="pagination ">
            <button
              className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              &lt;
            </button>
            {Array.from(
              { length: Math.ceil(filteredData.length / itemsPerPage) },
              (_, index) => (
                <button
                  key={index + 1}
                  className={`page-item ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </button>
              )
            )}
            <button
              className={`page-item ${
                currentPage === Math.ceil(filteredData.length / itemsPerPage)
                  ? "disabled"
                  : ""
              }`}
              onClick={() => paginate(currentPage + 1)}
              disabled={
                currentPage === Math.ceil(filteredData.length / itemsPerPage)
              }
            >
              &gt;
            </button>
          </div>
        </div>
      </div>

      {/* Create Exam Dialog */}
      <AlertDialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <AlertDialogContent className="max-w-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Tambah Ujian</AlertDialogTitle>
            <AlertDialogDescription className="w-full">
              <div className="max-h-[70vh] overflow-y-auto">
                <form>
                  <div className="edit-form-group-mahasiswa">
                    <label>Nama Ujian:</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Masukkan nama ujian"
                      required
                    />
                  </div>
                  <div className="edit-form-group-mahasiswa">
                    <label>Soal:</label>
                    <select
                      name="task_id"
                      value={formData.task_id}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Pilih soal</option>
                      {tasksData ? (
                        tasksData.map((task) => (
                          <option key={task.id} value={task.id.toString()}>
                            {task.name}
                          </option>
                        ))
                      ) : (
                        <option value="" disabled>
                          Tidak ada data soal
                        </option>
                      )}
                    </select>
                  </div>
                  <div className="edit-form-group-mahasiswa">
                    <label>Kode Ujian:</label>
                    <div className="flex items-center gap-2">
                      <input
                        className="text-black"
                        name="assignment_code"
                        value={formData.assignment_code}
                        onChange={handleChange}
                        readOnly
                      />
                      <button
                        type="button"
                        className="p-3 bg-purple-800 rounded-md hover:bg-purple-900"
                        onClick={handleReloadCode}
                      >
                        <IoReload className="text-lg text-white" />
                      </button>
                    </div>
                  </div>
                  <div className="edit-form-group-mahasiswa">
                    <label>Tanggal Mulai:</label>
                    <input
                      type="datetime-local"
                      name="start_period"
                      value={formData.start_period}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="edit-form-group-mahasiswa">
                    <label>Tanggal Selesai:</label>
                    <input
                      type="datetime-local"
                      name="end_period"
                      value={formData.end_period}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="edit-form-group-mahasiswa">
                    <label>Durasi (menit):</label>
                    <input
                      type="number"
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                      placeholder="Masukkan durasi ujian dalam menit"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>File Support:</label>
                    <div className="file-upload-container">
                      <div className="file-upload-box">
                        {formData.supporting_file ? (
                          <div className="file-selected">
                            <p>{formData.supporting_file.name}</p>
                          </div>
                        ) : (
                          <div className="file-upload-placeholder">
                            <p>Klik atau drop file di sini</p>
                            <small>
                              Format: PDF, DOC, DOCX, XLSX, XLS, etc.
                            </small>
                          </div>
                        )}
                        <input
                          type="file"
                          name="supporting_file"
                          onChange={handleFileChange}
                          className="file-input"
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-red-600 text-white hover:bg-red-800 hover:text-white">
              Batal
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-green-600"
              onClick={handleSave}
              disabled={mutation.isPending}
            >
              {mutation.isPending ? (
                <div className="flex items-center justify-center">
                  <ClipLoader color="#ffffff" size={16} />
                  <span className="ml-2">Menyimpan...</span>
                </div>
              ) : (
                "Simpan"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Edit Exam Dialog */}
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent className="max-w-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Edit Ujian</AlertDialogTitle>
            <AlertDialogDescription className="w-full">
              <div className="max-h-[70vh] overflow-y-auto">
                <form>
                  <div className="edit-form-group-mahasiswa">
                    <label>Nama Ujian:</label>
                    <input
                      type="text"
                      name="name"
                      value={selectedData.name}
                      onChange={handleUpdateChange}
                      required
                    />
                  </div>
                  <div className="edit-form-group-mahasiswa">
                    <label>Soal:</label>
                    <select
                      name="task_id"
                      value={selectedData.task_id}
                      onChange={handleUpdateChange}
                      required
                    >
                      <option value="">Pilih soal</option>
                      {tasksData ? (
                        tasksData.map((task) => (
                          <option key={task.id} value={task.id.toString()}>
                            {task.name}
                          </option>
                        ))
                      ) : (
                        <option value="" disabled>
                          Tidak ada data soal
                        </option>
                      )}
                    </select>
                  </div>
                  <div className="edit-form-group-mahasiswa">
                    <label>Kode Ujian:</label>
                    <input
                      className="text-black"
                      name="assignment_code"
                      value={selectedData.assignment_code}
                      readOnly
                    />
                    <small>Kode ujian tidak dapat diubah</small>
                  </div>
                  <div className="edit-form-group-mahasiswa">
                    <label>Tanggal Mulai:</label>
                    <input
                      className="text-black"
                      type="datetime-local"
                      name="start_period"
                      value={selectedData.start_period}
                      onChange={handleUpdateChange}
                    />
                  </div>
                  <div className="edit-form-group-mahasiswa">
                    <label>Tanggal Selesai:</label>
                    <input
                      className="text-black"
                      type="datetime-local"
                      name="end_period"
                      value={selectedData.end_period}
                      onChange={handleUpdateChange}
                    />
                  </div>
                  <div className="edit-form-group-mahasiswa">
                    <label>Durasi (menit):</label>
                    <input
                      type="number"
                      name="duration"
                      value={selectedData.duration}
                      onChange={handleUpdateChange}
                      placeholder="Masukkan durasi ujian dalam menit"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      File Support (Kosongkan jika tidak ingin mengubah):
                    </label>
                    <div className="file-upload-container">
                      <div className="file-upload-box">
                        {selectedData.supporting_file instanceof File ? (
                          <div className="file-selected">
                            <p>{selectedData.supporting_file.name}</p>
                          </div>
                        ) : (
                          <div className="file-upload-placeholder">
                            <p>Klik atau drop file di sini</p>
                            <small>
                              Format: PDF, DOC, DOCX, XLSX, XLS, etc.
                            </small>
                            {selectedData.original_supporting_file && (
                              <p className="mt-2 text-xs text-blue-500">
                                File saat ini:{" "}
                                {selectedData.original_supporting_file}
                              </p>
                            )}
                          </div>
                        )}
                        <input
                          type="file"
                          name="supporting_file"
                          onChange={handleUpdateFileChange}
                          className="file-input"
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-red-600 text-white">
              Kembali
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-green-600"
              onClick={handleUpdate}
              disabled={mutation.isPending}
            >
              {mutation.isPending ? (
                <div className="flex items-center justify-center">
                  <ClipLoader color="#ffffff" size={16} />
                  <span className="ml-2">Menyimpan...</span>
                </div>
              ) : (
                "Simpan"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
