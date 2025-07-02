import React, { useState, useCallback, useMemo } from "react";
import Swal from "sweetalert2";

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
import { useCookies } from "react-cookie";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { RoutesApi } from "@/Routes";
import { ClipLoader } from "react-spinners";
import { FaFile } from "react-icons/fa";
import { IntentEnum } from "@/enums/IntentEnum";
import { RxCross1 } from "react-icons/rx";
import { FaRegCopy } from "react-icons/fa";
import { useToast } from "@/hooks/use-toast";

const AdminPscCoretaxify = () => {
  // State management
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [selectedData, setSelectedData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [filePreview, setFilePreview] = useState(null);
  const [editFilePreview, setEditFilePreview] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    task_id: "",
    supporting_file: null,
  });
  const [editFormData, setEditFormData] = useState({
    name: "",
    task_id: "",
    supporting_file: null,
  });

  const itemsPerPage = 20;
  const [cookies] = useCookies(["user"]);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // API URL with pagination
  const apiUrl = useMemo(() => {
    const params = new URLSearchParams({
      // intent: IntentEnum.API_GET_SELF_ASSIGNMENT_ALL,
      page: currentPage,
      per_page: itemsPerPage,
    });
    if (search) params.append("search", search);
    return `${RoutesApi.url}api/lecturer/assignment-user?${params}`;
  }, [currentPage, search]);

  // Queries
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["self_assignments", currentPage, search],
    queryFn: async () => {
      const { data } = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      });
      return data;
    },
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Get users for display (since user_id is in the response)
  const { isLoading: isLoadingUsers, data: dataUsers } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axios.get(`${RoutesApi.url}api/admin/users`, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      });
      return data;
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  });

  // Get tasks for dropdown
  const { isLoading: isLoadingTasks, data: dataTasks } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const { data } = await axios.get(`${RoutesApi.url}api/psc/tasks`, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      });
      return data;
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  });

  // Create lookup maps for users and tasks
  const usersMap = useMemo(() => {
    if (!dataUsers?.data) return {};
    return dataUsers.data.reduce((acc, user) => {
      acc[user.id] = user;
      return acc;
    }, {});
  }, [dataUsers?.data]);

  const tasksMap = useMemo(() => {
    if (!dataTasks?.data) return {};
    return dataTasks?.data.reduce((acc, task) => {
      acc[task.id] = task;
      return acc;
    }, {});
  }, [dataTasks?.data]);

  // Mutations
  const createMutation = useMutation({
    mutationFn: async (formData) => {
      // Get CSRF token
      const csrfResponse = await axios.get(`${RoutesApi.url}api/csrf-token`, {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          Accept: "application/json",
        },
      });

      const csrfToken = csrfResponse.data.token;

      // Create FormData for file upload
      const submitData = new FormData();
      submitData.append("name", formData.name);
      submitData.append("task_id", formData.task_id);

      if (formData.supporting_file) {
        submitData.append("supporting_file", formData.supporting_file);
      }

      const response = await axios.post(
        `${RoutesApi.url}api/psc/assignments`,
        submitData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
            "X-CSRF-TOKEN": csrfToken,
            Authorization: `Bearer ${cookies.token}`,
          },
          params: {
            intent: IntentEnum.API_USER_CREATE_ASSIGNMENT,
          },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["self_assignments"] });
      resetForm();
      toast({
        title: "Berhasil",
        description: "Praktikum berhasil ditambahkan",
      });
    },
    onError: (error) => {
      console.error("Error creating assignment:", error);
      const errorMessage =
        error.response?.data?.message || "Gagal menambahkan praktikum";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, formData }) => {
      // Get CSRF token
      const csrfResponse = await axios.get(`${RoutesApi.url}api/csrf-token`, {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          Accept: "application/json",
        },
      });

      const csrfToken = csrfResponse.data.token;

      // Create FormData for file upload
      const submitData = new FormData();
      submitData.append("_method", "PUT"); // Laravel method spoofing

      if (formData.name) submitData.append("name", formData.name);
      if (formData.task_id) submitData.append("task_id", formData.task_id);
      if (formData.supporting_file) {
        submitData.append("supporting_file", formData.supporting_file);
      }

      const response = await axios.post(
        `${RoutesApi.url}api/psc/assignments/${id}`,
        submitData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
            "X-CSRF-TOKEN": csrfToken,
            Authorization: `Bearer ${cookies.token}`,
          },
          params: {
            intent: IntentEnum.API_UPDATE_SELF_ASSIGNMENT,
          },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["self_assignments"] });
      setSelectedData(null);
      resetEditForm();
      toast({
        title: "Berhasil",
        description: "Praktikum berhasil diperbarui",
      });
    },
    onError: (error) => {
      console.error("Error updating assignment:", error);
      const errorMessage =
        error.response?.data?.message || "Gagal memperbarui praktikum";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const response = await axios.delete(
        `${RoutesApi.url}api/admin/assignment-user/${id}`,
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
          params: {
            intent: IntentEnum.API_DELETE_SELF_ASSIGNMENT,
          },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["self_assignments"] });
      toast({
        title: "Berhasil",
        description: "Praktikum berhasil dihapus",
      });
    },
    onError: (error) => {
      console.error("Error deleting assignment:", error);
      const errorMessage =
        error.response?.data?.message || "Gagal menghapus praktikum";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });

  const startPraktikum = useMutation({
    mutationFn: async (assignment_id) => {
      console.log("Start button clicked");
      const csrfResponse = await axios.get(`${RoutesApi.url}api/csrf-token`, {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          Accept: "application/json",
        },
      });

      const csrfToken = csrfResponse.data.token;

      const data = await axios.post(
        `${RoutesApi.url}api/student/sistem`,
        {
          assignment: String(assignment_id),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-CSRF-TOKEN": csrfToken,
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );
      return data;
    },
    onSuccess: (data, variables) => {
      console.log(data);
      Swal.fire("Berhasil!", "Praktikum berhasil dimulai!", "success").then(
        (result) => {
          if (result.isConfirmed) {
            // Navigate to the praktikum system or refresh
            window.location.href = `/praktikum/${variables}`;
            refetch();
          }
        }
      );
    },
    onError: (error) => {
      console.log("Error starting praktikum:", error);
      Swal.fire("Gagal!", error.message, "error");
    },
  });

  // Event handlers
  const handleFileChange = useCallback(
    (e) => {
      const file = e.target.files[0];
      if (file) {
        // Validate file size (10MB)
        if (file.size > 10 * 1024 * 1024) {
          toast({
            title: "Error",
            description: "File terlalu besar. Maksimal 10MB",
            variant: "destructive",
          });
          return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
          setFilePreview({ name: file.name, url: reader.result });
        };
        reader.readAsDataURL(file);
        setFormData((prev) => ({ ...prev, supporting_file: file }));
      }
    },
    [toast]
  );

  const handleEditFileChange = useCallback(
    (e) => {
      const file = e.target.files[0];
      if (file) {
        // Validate file size (10MB)
        if (file.size > 10 * 1024 * 1024) {
          toast({
            title: "Error",
            description: "File terlalu besar. Maksimal 10MB",
            variant: "destructive",
          });
          return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
          setEditFilePreview({ name: file.name, url: reader.result });
        };
        reader.readAsDataURL(file);
        setEditFormData((prev) => ({ ...prev, supporting_file: file }));
      }
    },
    [toast]
  );

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleEditChange = useCallback((e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSort = useCallback((key) => {
    setSortConfig((prev) => {
      const direction =
        prev.key === key && prev.direction === "ascending"
          ? "descending"
          : "ascending";
      return { key, direction };
    });
  }, []);

  const handleCopyId = useCallback(
    (id) => {
      navigator.clipboard.writeText(id.toString());
      toast({
        title: "Copy berhasil",
        description: "ID berhasil dicopy",
      });
    },
    [toast]
  );

  const handleDelete = useCallback(
    (item) => {
      Swal.fire({
        title: "Hapus Praktikum?",
        text: "Praktikum akan dihapus secara permanen!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya, hapus!",
        cancelButtonText: "Batal",
        dangerMode: true,
      }).then((result) => {
        if (result.isConfirmed) {
          deleteMutation.mutate(item.id);
        }
      });
    },
    [deleteMutation]
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      // Validation
      if (!formData.name.trim()) {
        toast({
          title: "Error",
          description: "Nama praktikum harus diisi",
          variant: "destructive",
        });
        return;
      }

      if (!formData.task_id) {
        toast({
          title: "Error",
          description: "Task harus dipilih",
          variant: "destructive",
        });
        return;
      }

      createMutation.mutate(formData);
    },
    [formData, createMutation, toast]
  );

  const handleEditSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (!selectedData?.id) return;

      updateMutation.mutate({
        id: selectedData.assignment.id,
        formData: editFormData,
      });
    },
    [editFormData, selectedData, updateMutation]
  );

  const handleEditClick = useCallback((item) => {
    setSelectedData(item);
    setEditFormData({
      name: item.name || "",
      task_id: item.task_id || "",
      supporting_file: null,
    });
    setEditFilePreview(null);
  }, []);

  const resetForm = useCallback(() => {
    setFormData({
      name: "",
      task_id: "",
      supporting_file: null,
    });
    setFilePreview(null);
  }, []);

  const resetEditForm = useCallback(() => {
    setEditFormData({
      name: "",
      task_id: "",
      supporting_file: null,
    });
    setEditFilePreview(null);
  }, []);

  // Memoized filtered and sorted data
  const processedData = useMemo(() => {
    if (!data?.data) return [];

    let filtered = data.data;

    // Apply search filter
    if (search) {
      filtered = filtered.filter((item) => {
        const user = usersMap[item.user_id];
        const task = tasksMap[item.task_id];

        return (
          item.name?.toLowerCase().includes(search.toLowerCase()) ||
          user?.name?.toLowerCase().includes(search.toLowerCase()) ||
          user?.email?.toLowerCase().includes(search.toLowerCase()) ||
          task?.name?.toLowerCase().includes(search.toLowerCase()) ||
          item.id.toString().includes(search)
        );
      });
    }

    // Apply sorting
    if (sortConfig.key) {
      filtered = [...filtered].sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        // Handle nested properties for sorting
        if (sortConfig.key === "user_name") {
          aValue = usersMap[a.user_id]?.name || "";
          bValue = usersMap[b.user_id]?.name || "";
        } else if (sortConfig.key === "task_name") {
          aValue = tasksMap[a.task_id]?.name || "";
          bValue = tasksMap[b.task_id]?.name || "";
        } else if (
          sortConfig.key === "created_at" ||
          sortConfig.key === "updated_at"
        ) {
          aValue = new Date(aValue);
          bValue = new Date(bValue);
        }

        if (aValue < bValue) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  }, [data?.data, search, sortConfig, usersMap, tasksMap]);

  // Pagination info
  const paginationInfo = useMemo(() => {
    if (!data?.meta) return null;

    const { current_page, per_page, total } = data.meta;
    const from = (current_page - 1) * per_page + 1;
    const to = Math.min(current_page * per_page, total);

    return { from, to, total, current_page };
  }, [data?.meta]);

  // Format date helper
  const formatDate = useCallback((dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString("id-ID"),
      time: date.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  }, []);

  // Loading state
  if (isLoading || isLoadingUsers || isLoadingTasks) {
    return (
      <div className="loading">
        <ClipLoader color="#7502B5" size={50} />
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="error-container">
        <p>Error loading data: {error?.message}</p>
        <button
          onClick={() =>
            queryClient.invalidateQueries({ queryKey: ["self_assignments"] })
          }
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="kontrak-container">
      <div className="header">
        <h2>Data Praktikum Mandiri</h2>
      </div>

      <div className="search-add-container">
        <div className="search-input-container">
          <input
            type="text"
            id="search"
            className="search-input"
            placeholder="Cari Praktikum   🔎"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <AlertDialog>
          <AlertDialogTrigger>
            <div className="bg-blue-800 p-2 rounded-lg text-white hover:bg-blue-700 transition-colors">
              + Tambah Praktikum
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent className="max-w-2xl">
            <AlertDialogHeader>
              <AlertDialogTitle>Tambah Praktikum</AlertDialogTitle>
              <AlertDialogDescription className="w-full">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="edit-form-group-mahasiswa">
                    <label htmlFor="name">Nama Praktikum: *</label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full p-2 border rounded-md"
                      placeholder="Masukkan nama praktikum"
                    />
                  </div>

                  <div className="edit-form-group-mahasiswa">
                    <label htmlFor="task_id">Soal: *</label>
                    <select
                      id="task_id"
                      name="task_id"
                      value={formData.task_id}
                      onChange={handleChange}
                      required
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="">Pilih Soal</option>
                      {dataTasks?.data.map((task) => (
                        <option key={task.id} value={task.id}>
                          {task.name}
                          {task.file_path && " (Ada File)"}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="edit-form-group-mahasiswa">
                    <label htmlFor="supportingFile">File Support:</label>
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="dropzone-file"
                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          {filePreview ? (
                            <div className="text-center">
                              <FaFile className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                              <p className="text-sm text-gray-500 truncate max-w-xs">
                                {filePreview.name}
                              </p>
                              <button
                                type="button"
                                onClick={() => {
                                  setFilePreview(null);
                                  setFormData((prev) => ({
                                    ...prev,
                                    supporting_file: null,
                                  }));
                                }}
                                className="text-red-500 text-xs mt-1 hover:underline"
                              >
                                Hapus file
                              </button>
                            </div>
                          ) : (
                            <>
                              <svg
                                className="w-8 h-8 mb-4 text-gray-500"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 16"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                />
                              </svg>
                              <p className="mb-2 text-sm text-gray-500">
                                <span className="font-semibold">
                                  Click to upload
                                </span>{" "}
                                or drag and drop
                              </p>
                              <p className="text-xs text-gray-500">
                                ZIP, RAR atau PDF (MAX. 10MB)
                              </p>
                            </>
                          )}
                        </div>
                        <input
                          id="dropzone-file"
                          type="file"
                          className="hidden"
                          accept=".zip,.rar,.pdf"
                          onChange={handleFileChange}
                        />
                      </label>
                    </div>
                  </div>
                </form>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                className="bg-red-600 text-white hover:bg-red-700"
                onClick={resetForm}
              >
                Batal
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleSubmit}
                disabled={createMutation.isLoading}
                className="bg-green-600 hover:bg-green-700"
              >
                {createMutation.isLoading ? (
                  <ClipLoader color="white" size={16} />
                ) : (
                  "Simpan"
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <div className="table-container">
        <table className="w-full">
          <thead>
            <tr>
              <th
              // className="cursor-pointer hover:bg-gray-100 transition-colors"
              >
                No{" "}
              </th>
              <th
                onClick={() => handleSort("name")}
                // className="cursor-pointer hover:bg-gray-100 transition-colors"
              >
                Nama Praktikum{" "}
                {sortConfig.key === "name" && (
                  <span>
                    {sortConfig.direction === "ascending" ? "↑" : "↓"}
                  </span>
                )}
              </th>
              <th
                onClick={() => handleSort("user_name")}
                className="cursor-pointer transition-colors"
              >
                Pembuat{" "}
                {sortConfig.key === "user_name" && (
                  <span>
                    {sortConfig.direction === "ascending" ? "↑" : "↓"}
                  </span>
                )}
              </th>
              <th
                onClick={() => handleSort("task_name")}
                className="cursor-pointer transition-colors"
              >
                Soal{" "}
                {sortConfig.key === "task_name" && (
                  <span>
                    {sortConfig.direction === "ascending" ? "↑" : "↓"}
                  </span>
                )}
              </th>
              <th
                onClick={() => handleSort("created_at")}
                className="cursor-pointer transition-colors"
              >
                Dibuat{" "}
                {sortConfig.key === "created_at" && (
                  <span>
                    {sortConfig.direction === "ascending" ? "↑" : "↓"}
                  </span>
                )}
              </th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {processedData.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-8 text-gray-500">
                  {search
                    ? "Tidak ada data yang sesuai dengan pencarian"
                    : "Belum ada data praktikum"}
                </td>
              </tr>
            ) : (
              processedData.map((item, index) => {
                const user = usersMap[item.user_id];
                const task = tasksMap[item.assignment.task_id];
                const createdDate = formatDate(item.assignment.created_at);

                return (
                  <tr
                    key={item.id || index}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td>
                      <div className="items-center gap-2">
                        <span className="font-mono text-sm">{index + 1}</span>
                      </div>
                    </td>
                    <td className="font-medium">{item.assignment.name}</td>
                    <td>
                      {/* {user ? (
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-gray-500">
                            {user.email}
                          </div>
                        </div>
                      ) : item.user ? ( */}
                      {item.user ? (
                        <div>
                          <div className="font-medium">{item.user.name}</div>
                          <div className="text-sm text-gray-500">
                            {item.user.email}
                          </div>
                        </div>
                      ) : (
                        <span className="text-gray-400">
                          User tidak ditemukan
                        </span>
                      )}
                    </td>
                    <td>
                      {task ? (
                        <div>
                          <span className="font-medium">{task.name}</span>
                          {/* {task.file_path && (
                            <div className="text-xs text-blue-500 mt-1">
                              <a
                                href={task.file_path}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline"
                              >
                                📎 Lihat File Soal
                              </a>
                            </div>
                          )} */}
                        </div>
                      ) : (
                        <span className="text-gray-400">
                          Soal tidak ditemukan
                        </span>
                      )}
                    </td>
                    <td>
                      <div>
                        <div className="text-sm">{createdDate.date}</div>
                        <div className="text-xs text-gray-500">
                          {createdDate.time}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div>
                        <AlertDialog>
                          <AlertDialogTrigger
                            className="action-button edit bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors"
                            onClick={() => handleEditClick(item)}
                          >
                            Edit
                          </AlertDialogTrigger>
                          <AlertDialogContent className="max-w-2xl">
                            <AlertDialogHeader>
                              <div className="w-full flex justify-between items-center">
                                <AlertDialogTitle>
                                  Edit Praktikum
                                </AlertDialogTitle>
                                <AlertDialogCancel className="border-none shadow-none p-0">
                                  <RxCross1 className="text-xl hover:text-red-500 transition-colors" />
                                </AlertDialogCancel>
                              </div>
                              <AlertDialogDescription className="w-full">
                                <form
                                  onSubmit={handleEditSubmit}
                                  className="space-y-4"
                                >
                                  <div className="edit-form-group-mahasiswa">
                                    <label htmlFor={`edit-name-${item.id}`}>
                                      Nama Praktikum:
                                    </label>
                                    <input
                                      id={`edit-name-${item.id}`}
                                      type="text"
                                      name="name"
                                      value={editFormData.name}
                                      onChange={handleEditChange}
                                      className="w-full p-2 border rounded-md"
                                      placeholder="Masukkan nama praktikum"
                                    />
                                  </div>

                                  <div className="edit-form-group-mahasiswa">
                                    <label htmlFor={`edit-task-${item.id}`}>
                                      Soal:
                                    </label>
                                    <select
                                      id={`edit-task-${item.id}`}
                                      name="task_id"
                                      value={editFormData.task_id}
                                      onChange={handleEditChange}
                                      className="w-full p-2 border rounded-md"
                                    >
                                      <option value="">Pilih Soal</option>
                                      {dataTasks?.data.map((task) => (
                                        <option key={task.id} value={task.id}>
                                          {task.name}
                                          {task.file_path && " (Ada File)"}
                                        </option>
                                      ))}
                                    </select>
                                  </div>

                                  <div className="edit-form-group-mahasiswa">
                                    <label htmlFor={`edit-file-${item.id}`}>
                                      File Support:
                                    </label>
                                    <div className="flex items-center justify-center w-full">
                                      <label
                                        htmlFor={`edit-dropzone-file-${item.id}`}
                                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                                      >
                                        <div className="flex flex-col items-center justify-center pt-2 pb-6">
                                          {editFilePreview ? (
                                            <div className="text-center">
                                              <FaFile className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                                              <p className="text-sm text-gray-500 truncate max-w-xs">
                                                {editFilePreview.name}
                                              </p>
                                              <button
                                                type="button"
                                                onClick={() => {
                                                  setEditFilePreview(null);
                                                  setEditFormData((prev) => ({
                                                    ...prev,
                                                    supporting_file: null,
                                                  }));
                                                }}
                                                className="text-red-500 text-xs mt-1 hover:underline"
                                              >
                                                Hapus file
                                              </button>
                                            </div>
                                          ) : (
                                            <>
                                              <svg
                                                className="w-8 h-8 mb-4 text-gray-500"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 20 16"
                                              >
                                                <path
                                                  stroke="currentColor"
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                  strokeWidth="2"
                                                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                                />
                                              </svg>
                                              <p className="mb-2 text-sm text-gray-500">
                                                <span className="font-semibold">
                                                  Click to upload
                                                </span>{" "}
                                                or drag and drop
                                              </p>
                                              <p className="text-xs text-gray-500">
                                                ZIP, RAR atau PDF (MAX. 10MB)
                                              </p>
                                              <p className="text-xs text-gray-400 mt-1">
                                                Kosongkan jika tidak ingin
                                                mengubah file
                                              </p>
                                            </>
                                          )}
                                        </div>
                                        <input
                                          id={`edit-dropzone-file-${item.id}`}
                                          type="file"
                                          className="hidden"
                                          accept=".zip,.rar,.pdf"
                                          onChange={handleEditFileChange}
                                        />
                                      </label>
                                    </div>
                                  </div>
                                </form>
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel
                                className="bg-red-600 text-white hover:bg-red-700"
                                onClick={resetEditForm}
                              >
                                Batal
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={handleEditSubmit}
                                disabled={updateMutation.isLoading}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                {updateMutation.isLoading ? (
                                  <ClipLoader color="white" size={16} />
                                ) : (
                                  "Simpan"
                                )}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>

                        <button
                          className="action-button delete bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
                          onClick={() => handleDelete(item)}
                          disabled={deleteMutation.isLoading}
                        >
                          {deleteMutation.isLoading ? (
                            <ClipLoader color="white" size={12} />
                          ) : (
                            "Delete"
                          )}
                        </button>
                        <button
                          className="action-button"
                          // onClick={() => {
                          //   startPraktikum.mutate(item.id);
                          // }}
                          disabled={startPraktikum.isPending}
                          onClick={() => {
                            console.log(item);
                            if (item.is_start === 1) {
                              // If already started, redirect directly
                              window.location.href = `/praktikum/${item.assignment.id}`;
                            } else {
                              // If not started, call the mutation to start
                              startPraktikum.mutate(item.assignment.id);
                            }
                          }}
                        >
                          {startPraktikum.isPending ? (
                            <div className="flex items-center gap-2">
                              <ClipLoader color="#ffffff" size={16} />
                              Loading...
                            </div>
                          ) : (
                            "Mulai"
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>

        {/* Pagination */}
        {paginationInfo && (
          <div className="flex justify-between items-center mt-4">
            <div className="pagination-info text-sm text-gray-600">
              Showing {paginationInfo.from} to {paginationInfo.to} of{" "}
              {paginationInfo.total} entries
            </div>

            <div className="pagination flex gap-2">
              <button
                className="page-item px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={paginationInfo.current_page === 1}
              >
                &lt;
              </button>

              <span className="px-3 py-1 bg-blue-500 text-white rounded">
                {paginationInfo.current_page}
              </span>

              <button
                className="page-item px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                onClick={() => setCurrentPage((prev) => prev + 1)}
                disabled={!data?.links?.next}
              >
                &gt;
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPscCoretaxify;
