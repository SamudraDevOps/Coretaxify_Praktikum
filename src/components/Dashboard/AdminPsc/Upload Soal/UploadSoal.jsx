import React, { useState } from "react";
import "./uploadSoal.css";
import CreateSoalPopup from "./CreateSoalPopup";
import UpdateSoalPopup from "./UpdateSoalPopup";
import Swal from "sweetalert2";
import { CookiesProvider, useCookies } from "react-cookie";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { RoutesApi } from "@/Routes";
import { ClipLoader } from "react-spinners";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { IntentEnum } from "@/enums/IntentEnum";
import { FaDownload, FaEdit, FaTrash } from "react-icons/fa";

export default function UploadSoal() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [selectedSoal, setSelectedSoal] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [cookies] = useCookies(["user"]);
  const [url, setUrl] = useState(RoutesApi.psc.tasks.index().url);
  const [search, setSearch] = useState("");

  // Form data state for creating/editing soal
  const [formData, setFormData] = useState({
    name: "",
    import_file: null
  });

  // Fetch tasks data
  const { isLoading, isError, data, error, refetch } = useQuery({
    queryKey: ["soal_data", url],
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

  // Mutation for task operations (create, update, delete)
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
      
      if (action === "create") {
        // Create new task
        const formDataObj = new FormData();
        const storeEndpoint = RoutesApi.psc.tasks.store();
        formDataObj.append("name", formData.name);
        formDataObj.append("import_file", formData.import_file);

        return await axios.post(
          storeEndpoint.url,
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
      } else if (action === "update" && id) {
        // Update existing task
        const formDataObj = new FormData();
        
        // Only append fields that have values
        if (formData.name) {
          formDataObj.append("name", formData.name);
        }
        
        if (formData.import_file) {
          formDataObj.append("import_file", formData.import_file);
        }
        
        // Append method to handle Laravel's form method spoofing
        formDataObj.append("_method", "PUT");

        const updateEndpoint = RoutesApi.psc.tasks.update(id);
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
        // Delete task
        const deleteEndpoint = RoutesApi.psc.tasks.destroy(id);
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
        import_file: null
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
  // Updated download mutation with proper filename extraction
// Updated download mutation with proper filename extraction
const downloadMutation = useMutation({
  mutationFn: async (id) => {
    try {
      const response = await axios.get(
        `${RoutesApi.psc.tasks.url}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
            Accept: "application/octet-stream",
          },
          params: {
            intent: IntentEnum.API_USER_DOWNLOAD_SOAL
          },
          responseType: 'blob'
        }
      );
      
      // Create a blob URL
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      
      // Extract filename from Content-Disposition header
      const contentDisposition = response.headers['content-disposition'];
      console.log(response.headers);
      let filename = 'soal.xlsx'; // Default fallback
      
      if (contentDisposition) {
        // Extract filename from the header
        const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
        const matches = filenameRegex.exec(contentDisposition);
        if (matches != null && matches[1]) {
          // Remove quotes if present
          filename = matches[1].replace(/['"]/g, '');
        }
      }
      
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


  const handleEdit = (soal) => {
    setSelectedSoal(soal);
    setFormData({
      name: soal.name,
      import_file: null // File can't be pre-filled
    });
    setIsUpdateOpen(true);
  };

  const handleCreate = () => {
    setFormData({
      name: "",
      import_file: null
    });
    setIsCreateOpen(true);
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
    item.name?.toLowerCase().includes(search.toLowerCase())
  ) || [];

  return (
    <div className="soal-container">
      <div className="header">
        <h2>Data Soal</h2>
      </div>
      <div className="search-add-container">
        <div className="search-input-container">
          <input
            type="text"
            id="search"
            className="search-input"
            placeholder="Cari Soal 🔎"
            value={search}
            onChange={handleSearchChange}
          />
        </div>
        <button
          className="add-button"
          onClick={handleCreate}
        >
          Tambah Soal
        </button>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th onClick={() => handleSort("name")}>
                Judul Soal{" "}
                {sortConfig.key === "name"
                  ? sortConfig.direction === "ascending"
                    ? "↑"
                    : "↓"
                  : ""}
              </th>
              <th>File</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>
                  <button
                    onClick={() => handleDownload(item.id)}
                    className="download-button"
                    disabled={downloadMutation.isPending}
                  >
                    <FaDownload className="download-icon" />
                    {downloadMutation.isPending ? "Loading..." : "Download"}
                  </button>
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
                        title: "Hapus Soal?",
                        text: "Soal akan dihapus secara permanen!",
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

      {/* Create Soal Popup */}
      <CreateSoalPopup
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSave={() => mutation.mutate({ action: "create" })}
        formData={formData}
        setFormData={setFormData}
        isLoading={mutation.isPending}
      />

      {/* Update Soal Popup */}
      <UpdateSoalPopup
        isOpen={isUpdateOpen}
        onClose={() => setIsUpdateOpen(false)}
        onSave={() => mutation.mutate({ id: selectedSoal.id, action: "update" })}
        formData={formData}
        setFormData={setFormData}
        isLoading={mutation.isPending}
      />
    </div>
  );
}
