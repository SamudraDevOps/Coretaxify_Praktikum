import React, { useState } from "react";
import "./editPengajar.css";
import EditPopupPengajar from "./EditPopupPengajar";
import TambahDosen from "./TambahDosen";
import Swal from "sweetalert2";
import { CookiesProvider, useCookies } from "react-cookie";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ClipLoader } from "react-spinners";
import { RoutesApi } from "@/Routes";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { IntentEnum } from "@/enums/IntentEnum";

const EditPengajar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isMultipleCreateOpen, setIsMultipleCreateOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [selectedData, setSelectedData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [cookies, setCookie] = useCookies(["user"]);
  const [url, setUrl] = useState(`${RoutesApi.psc.users.url}`);
  const [search, setSearch] = useState("");

  // Form data state for editing/creating instructor
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    status: "ACTIVE"
  });

  // Fetch instructors data
  const { isLoading, isError, data, error, refetch } = useQuery({
    queryKey: ["pengajar_psc", url],
    queryFn: async () => {
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
          Accept: "application/json",
        },
        params: {
          intent: IntentEnum.API_USER_GET_INSTRUKTUR // Filter for instructors
        }
      });
      return data;
    },
  });

  // Mutation for instructor operations (create, update, delete)
  const mutation = useMutation({
    mutationFn: async ({ id, action, multipleInstructors = null }) => {
      // Get CSRF token
      const response = await axios.get(`${RoutesApi.url}api/csrf-token`, {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          Accept: "application/json",
        },
      });

      axios.defaults.headers.common["X-CSRF-TOKEN"] = response.data.token;
      let apiUrl;

      if (action === "create") {
        apiUrl = RoutesApi.psc.users.url;
        
        // Check if we're creating multiple instructors
        if (multipleInstructors && multipleInstructors.length > 0) {
          // For bulk creation, we need to make multiple requests
          const createPromises = multipleInstructors.map(instructor => {
            return axios.post(
              apiUrl,
              {
                name: instructor.name,
                email: instructor.email,
                status: instructor.status || "ACTIVE",
                intent: IntentEnum.API_USER_CREATE_INSTRUKTUR
              },
              {
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                  "X-CSRF-TOKEN": response.data.token,
                  Authorization: `Bearer ${cookies.token}`,
                },
                params: {
                  intent: IntentEnum.API_USER_CREATE_INSTRUKTUR
                }
              }
            );
          });
          
          // Execute all requests and return the combined result
          return Promise.all(createPromises);
        } else {
          // Create single instructor
          return await axios.post(
            apiUrl,
            {
              name: formData.name,
              email: formData.email,
              status: formData.status,
              intent: IntentEnum.API_USER_CREATE_INSTRUKTUR
            },
            {
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "X-CSRF-TOKEN": response.data.token,
                Authorization: `Bearer ${cookies.token}`,
              },
              params: {
                intent: IntentEnum.API_USER_CREATE_INSTRUKTUR
              }
            }
          );
        }
      } else if (action === "update" && id) {
        apiUrl = `${RoutesApi.psc.users.url}/${id}`;
        return await axios.put(
          apiUrl,
          {
            name: formData.name,
            email: formData.email,
            status: formData.status,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              "X-CSRF-TOKEN": response.data.token,
              Authorization: `Bearer ${cookies.token}`,
            }
          }
        );
      } else if (action === "delete" && id) {
        apiUrl = `${RoutesApi.psc.users.url}/${id}`;
        return await axios.delete(apiUrl, {
          headers: {
            "X-CSRF-TOKEN": response.data.token,
            Authorization: `Bearer ${cookies.token}`,
          }
        });
      }
    },
    onSuccess: () => {
      Swal.fire("Berhasil!", "Operasi berhasil dilakukan!", "success");
      refetch();
      setIsOpen(false);
      setIsCreateOpen(false);
      setIsMultipleCreateOpen(false);
    },
    onError: (error) => {
      console.log(error.response);
      if (error.response === undefined) {
        Swal.fire("Gagal !", error.message, "error");
        return;
      }
      Swal.fire("Gagal !", error.response.data.message, "error");
    },
  });

  const handleEdit = (instructor) => {
    setSelectedData(instructor);
    setFormData({
      name: instructor.name,
      email: instructor.email,
      status: instructor.status,
    });
    setIsOpen(true);
  };

  const handleCreate = () => {
    setFormData({
      name: "",
      email: "",
      status: "ACTIVE",
    });
    setIsCreateOpen(true);
  };

  const handleMultipleCreate = () => {
    setIsMultipleCreateOpen(true);
  };

  const handleUpdateInstructor = () => {
    mutation.mutate({ id: selectedData.id, action: "update" });
  };

  const handleCreateInstructor = () => {
    mutation.mutate({ action: "create" });
  };

  const handleCreateMultipleInstructors = (instructors) => {
    mutation.mutate({ action: "create", multipleInstructors: instructors });
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
      <div className="h-screen w-full justify-center items-center flex ">
        <Alert variant="destructive" className="w-1/2 bg-white ">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error !</AlertTitle>
          <div className="">
            <p>{error?.message ?? "error !"}</p>
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
    item.email?.toLowerCase().includes(search.toLowerCase()) ||
    (item.status && item.status.toLowerCase().includes(search.toLowerCase()))
  ) || [];

  return (
    <div className="kontrak-container">
      <div className="header">
        <h2>Data Pengajar</h2>
      </div>
      <div className="search-add-container">
        <div className="search-input-container">
          <input
            type="text"
            id="search"
            className="search-input"
            placeholder="Cari Data Pengajar 🔎"
            value={search}
            onChange={handleSearchChange}
          />
        </div>
        <div className="button-group">
          {/* <button
            className="add-button"
            onClick={handleCreate}
          >
            Tambah Pengajar
          </button> */}
          <button
            className="add-button"
            onClick={handleMultipleCreate}
          >
            Tambah Pengajar
          </button>
        </div>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort("name")}>
                Nama Pengajar{" "}
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
              <th onClick={() => handleSort("status")}>
                Status{" "}
                {sortConfig.key === "status"
                  ? sortConfig.direction === "ascending"
                    ? "↑"
                    : "↓"
                  : ""}
              </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.status}</td>
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
                        title: "Hapus Pengajar?",
                        text: "Data akan dihapus secara permanen!",
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
              className={`page-item`}
              onClick={() => {
                if (data?.links?.prev) setUrl(data.links.prev);
              }}
              disabled={!data?.links?.prev}
            >
              &lt;
            </button>
            <button className="page-item active">{data?.meta?.current_page || 1}</button>
            <button
              className={`page-item`}
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
      
      {/* Edit Instructor Popup */}
      {isOpen && (
        <EditPopupPengajar
          onClose={() => setIsOpen(false)}
          data={selectedData}
          onSave={handleUpdateInstructor}
          formData={formData}
          setFormData={setFormData}
          isLoading={mutation.isPending}
          title="Edit Pengajar"
        />
      )}
      
      {/* Create Single Instructor Popup */}
      {isCreateOpen && (
        <TambahDosen
          isOpen={isCreateOpen}
          onClose={() => setIsCreateOpen(false)}
          onSave={handleCreateInstructor}
          formData={formData}
          setFormData={setFormData}
          isLoading={mutation.isPending}
        />
      )}
      
      {/* Create Multiple Instructors Popup */}
      {isMultipleCreateOpen && (
        <TambahDosen
          isOpen={isMultipleCreateOpen}
          onClose={() => setIsMultipleCreateOpen(false)}
          onSave={handleCreateMultipleInstructors}
          isLoading={mutation.isPending}
          isMultipleMode={true}
        />
      )}
    </div>
  );
};

export default EditPengajar;
