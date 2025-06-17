import React, { useState } from "react";
import "./praktikumPsc.css";
import CreateAssignmentPopup from "./CreateAssignmentPopup";
import UpdateAssignmentPopup from "./UpdateAssignmentPopup";
import Swal from "sweetalert2";
import { useCookies } from "react-cookie";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { RoutesApi } from "@/Routes";
import { ClipLoader } from "react-spinners";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { IntentEnum } from "@/enums/IntentEnum";
import { useNavigate } from "react-router-dom";

const PraktikumPsc = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [cookies] = useCookies(["user"]);
  const [url, setUrl] = useState(RoutesApi.psc.assignments.index().url);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // Add a new query to fetch groups by role
  const { data: groupsData, isLoading: groupsLoading } = useQuery({
    queryKey: ["groups_by_role"],
    queryFn: async () => {
      const { data } = await axios.get(RoutesApi.psc.groups.index().url, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
          Accept: "application/json",
        },
        params: {
          intent: IntentEnum.API_GET_GROUP_BY_ROLES
        }
      });
      return data;
    },
  });


  // Load tasks for the dropdown
  const { data: tasksData } = useQuery({
    queryKey: ["soal_data"],
    queryFn: async () => {
      const { data } = await axios.get(RoutesApi.psc.tasks.index().url, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
          Accept: "application/json",
        }
      });
      return data;
    },
  });

  // Form data state for creating/editing assignments
  const [formData, setFormData] = useState({
    name: "",
    task_id: "",
    start_period: "",
    end_period: "",
    supporting_file: null,
    groups: []
  });

  // Fetch assignments data
  const { isLoading, isError, data, error, refetch } = useQuery({
    queryKey: ["assignments_data", url],
    queryFn: async () => {
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
          Accept: "application/json",
        }
      });
      return data;
    },
  });

  // Mutation for assignment operations (create, update, delete)
  const mutation = useMutation({
    mutationFn: async ({ id, action }) => {
      // Get CSRF token
      const response = await axios.get(RoutesApi.csrf, {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          Accept: "application/json",
        },
      });

      axios.defaults.headers.common["X-CSRF-TOKEN"] = response.data.token;
      
      // Format date to backend format (Y-m-d H:i:s)
      const formatDateForBackend = (dateString) => {
          if (!dateString) return "";
          // Convert from "YYYY-MM-DDThh:mm" to "YYYY-MM-DD hh:mm:00"
          return dateString.replace('T', ' ') + ':00';
      };

      if (action === "create") {
        // Create new assignment
        const formDataObj = new FormData();
        
        // Add required fields
        formDataObj.append("name", formData.name);
        formDataObj.append("task_id", formData.task_id);
        
        // Add optional fields
        if (formData.start_period) {
          formDataObj.append("start_period", formatDateForBackend(formData.start_period));
        }

        if (formData.end_period) {
          formDataObj.append("end_period", formatDateForBackend(formData.end_period));
        }

        if (formData.supporting_file) {
          formDataObj.append("supporting_file", formData.supporting_file);
        }
        
        if (formData.groups && formData.groups.length > 0) {
          formData.groups.forEach((groupId, index) => {
            formDataObj.append(`groups[${index}]`, groupId);
          });
        }

        return await axios.post(
          RoutesApi.psc.assignments.store().url,
          formDataObj,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Accept: "application/json",
              "X-CSRF-TOKEN": response.data.token,
              Authorization: `Bearer ${cookies.token}`,
            },
            params: {
              intent: IntentEnum.API_USER_CREATE_ASSIGNMENT
            }
          }
        );
      } else if (action === "update" && id) {
        // Update existing assignment
        const formDataObj = new FormData();
        
        // Only append fields that have values
        if (formData.name) {
          formDataObj.append("name", formData.name);
        }
        
        if (formData.task_id) {
          formDataObj.append("task_id", formData.task_id);
        }
        
        if (formData.start_period) {
          formDataObj.append("start_period", formatDateForBackend(formData.start_period));
        }
        
        if (formData.end_period) {
          formDataObj.append("end_period", formatDateForBackend(formData.end_period));
        }
        
        if (formData.supporting_file) {
          formDataObj.append("supporting_file", formData.supporting_file);
        }
        
        if (formData.assignment_code) {
          formDataObj.append("assignment_code", formData.assignment_code);
        }
        
        // Append method to handle Laravel's form method spoofing
        formDataObj.append("_method", "PUT");

        const updateEndpoint = RoutesApi.psc.assignments.update(id);
        return await axios.post(
          updateEndpoint.url,
          formDataObj,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Accept: "application/json",
              "X-CSRF-TOKEN": response.data.token,
              Authorization: `Bearer ${cookies.token}`,
            }
          }
        );
      } else if (action === "delete" && id) {
        // Delete assignment
        const deleteEndpoint = RoutesApi.psc.assignments.destroy(id);
        return await axios.delete(
          deleteEndpoint.url,
          {
            headers: {
              "X-CSRF-TOKEN": response.data.token,
              Authorization: `Bearer ${cookies.token}`,
            }
          }
        );
      }
    },
    onSuccess: () => {
      Swal.fire("Berhasil!", "Operasi berhasil dilakukan!", "success");
      refetch();
      setIsCreateOpen(false);
      setIsUpdateOpen(false);
      setFormData({
        name: "",
        task_id: "",
        start_period: "",
        end_period: "",
        supporting_file: null,
        groups: []
      });
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

  // Download file mutation
  const downloadMutation = useMutation({
    mutationFn: async (id) => {
      try {
        const showEndpoint = RoutesApi.psc.assignments.show(id);
        const response = await axios.get(
          showEndpoint.url,
          {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
              Accept: "*/*",
            },
            params: {
              intent: IntentEnum.API_USER_DOWNLOAD_FILE
            },
            responseType: 'blob'
          }
        );
        
        // Extract filename from Content-Disposition header if present
        let filename = 'file.pdf'; // Default fallback name
        const contentDisposition = response.headers['content-disposition'];
        
        if (contentDisposition) {
          // Extract filename from the header
          const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
          const matches = filenameRegex.exec(contentDisposition);
          if (matches !== null && matches[1]) {
            // Clean up the filename
            filename = matches[1].replace(/['"]/g, '');
          }
        }
        
        // Create a blob URL and trigger download
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        return response;
      } catch (error) {
        console.error("Download error:", error);
        Swal.fire("Gagal!", "Gagal mengunduh file", "error");
        throw error;
      }
    }
  });

  const handleEdit = (assignment) => {
    setSelectedAssignment(assignment);
    
    // Format the datetime strings for the datetime-local input
    const formatDatetimeForInput = (datetimeStr) => {
      if (!datetimeStr) return "";
      try {
        // Parse the DD-MM-YYYY HH:MM:SS format
        const [datePart, timePart] = datetimeStr.split(' ');
        const [day, month, year] = datePart.split('-');
        
        return `${year}-${month}-${day}T${timePart.substring(0, 5)}`;
        
        // Convert from "YYYY-MM-DD HH:MM:SS" to "YYYY-MM-DDThh:mm" format
        // return datetimeStr.substring(0, 16).replace(' ', 'T');
      } catch (error) {
        console.error("Error formatting date:", error);
        return "";
      }
    };
    
    // Ensure task data is loaded before setting form data
    if (!tasksData?.data) {
      Swal.fire("Error", "Task data is not loaded yet. Please try again.", "error");
      return;
    }
    
    // Check if task_id exists in loaded tasks
    const taskExists = tasksData.data.some(task => 
      parseInt(task.id) === parseInt(assignment.task_id)
    );
    
    // If task doesn't exist, log an error but still show the form
    if (!taskExists && assignment.task_id) {
      console.warn(`Task ID ${assignment.task_id} not found in available tasks`);
    }
    
    console.log("Setting form data:", {
      name: assignment.name,
      task_id: assignment.task_id,
      start_period: formatDatetimeForInput(assignment.start_period),
      end_period: formatDatetimeForInput(assignment.end_period)
    });
    
    setFormData({
      name: assignment.name,
      task_id: assignment.task_id, // Keep original task_id even if not found
      start_period: formatDatetimeForInput(assignment.start_period),
      end_period: formatDatetimeForInput(assignment.end_period),
      assignment_code: assignment.assignment_code,
      supporting_file: null
    });
    
    setIsUpdateOpen(true);
  };

  const handleCreate = () => {
    setFormData({
      name: "",
      task_id: "",
      start_period: "",
      end_period: "",
      supporting_file: null,
      groups: []
    });
    setIsCreateOpen(true);
  };

  const handleViewMembers = (assignmentId) => {
    navigate(`/psc/praktikum/${assignmentId}/members`);
  };

  const handleDownload = (id) => {
    downloadMutation.mutate(id);
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
  const filteredData = data?.data?.filter(item => 
    item.name?.toLowerCase().includes(search.toLowerCase()) ||
    item.assignment_code?.toLowerCase().includes(search.toLowerCase())
  ) || [];

  return (
    <div className="praktikum-container">
      <div className="header">
        <h2>Data Praktikum</h2>
      </div>
      <div className="search-add-container">
        <div className="search-input-container">
          <input
            type="text"
            id="search"
            className="search-input"
            placeholder="Cari Praktikum 🔎"
            value={search}
            onChange={handleSearchChange}
          />
        </div>
        <button
          className="add-button"
          onClick={handleCreate}
        >
          Tambah Praktikum
        </button>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th onClick={() => handleSort("name")}>
                Judul Praktikum{" "}
                {sortConfig.key === "name"
                  ? sortConfig.direction === "ascending"
                    ? "↑"
                    : "↓"
                  : ""}
              </th>
              <th onClick={() => handleSort("assignment_code")}>
                Kode Praktikum{" "}
                {sortConfig.key === "assignment_code"
                  ? sortConfig.direction === "ascending"
                    ? "↑"
                    : "↓"
                  : ""}
              </th>
              <th>Kelas</th>
              <th>Soal</th>
              <th>Jumlah Mahasiswa</th>
              <th>Periode Mulai</th>
              <th>Periode Selesai</th>
              <th>File Pendukung</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.assignment_code}</td>
                <td>{item.group ? item.group.name : '-'}</td>
                <td>{item.task ? item.task.name : '-'}</td>
                <td>{item.users_count}</td>
                {/* <td>{item.task_id}</td> */}
                <td>{item.start_period}</td>
                <td>{item.end_period}</td>
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
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="action-button delete"
                    onClick={() => {
                      Swal.fire({
                        title: "Hapus Praktikum?",
                        text: "Praktikum akan dihapus secara permanen!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonText: "Ya, hapus!",
                        cancelButtonText: "Batal",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          mutation.mutate({
                            id: item.id,
                            action: "delete",
                          });
                        }
                      });
                    }}
                  >
                    Delete
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
        <div className="pagination-container">
          <div className="pagination-info">
            {data?.meta ? `Showing ${data.meta.from} to ${data.meta.to} of ${data.meta.total} entries` : "No data available"}
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
            <button className="page-item active">{data?.meta?.current_page || 1}</button>
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

      {/* Create Assignment Popup */}
      <CreateAssignmentPopup
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSave={() => mutation.mutate({ action: "create" })}
        formData={formData}
        setFormData={setFormData}
        isLoading={mutation.isPending}
        tasks={tasksData?.data || []}
        groups={groupsData?.data || []}
      />

      {/* Update Assignment Popup */}
      <UpdateAssignmentPopup
        isOpen={isUpdateOpen}
        onClose={() => setIsUpdateOpen(false)}
        onSave={() => mutation.mutate({ id: selectedAssignment.id, action: "update" })}
        formData={formData}
        setFormData={setFormData}
        isLoading={mutation.isPending}
        tasks={tasksData?.data || []}
      />
    </div>
  );
};

export default PraktikumPsc;
