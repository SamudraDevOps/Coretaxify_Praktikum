import React, { useState, useEffect } from "react";
import "./editKelas.css";
import EditPopupKelas from "./EditPopupKelas";
import CreateGroupPopup from "./CreateGroupPopup"; // Import the new component
import Swal from "sweetalert2";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ClipLoader } from "react-spinners";
import { RoutesApi } from "@/Routes";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { IntentEnum } from "@/enums/IntentEnum"; // Import IntentEnum
import { RxCross1 } from "react-icons/rx";

const EditKelasPsc = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false); // New state for create popup
  const [selectedKelas, setSelectedKelas] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [currentPage, setCurrentPage] = useState(1);
  const [cookies] = useCookies(["user"]);
  const [url, setUrl] = useState(RoutesApi.psc.groups.index().url);
  const [search, setSearch] = useState("");

  // Form data state for creating/editing
  const [formData, setFormData] = useState({
    name: "",
    status: "",
    class_code: "",
    start_period: "",
    end_period: "",
    // import_file: null
  });

  const [createFormData, setCreateFormData] = useState({
    name: "",
    status: "ACTIVE",
    class_code: "",
    start_period: "",
    end_period: "",
    // import_file: null
  });

  // Generate random code for new groups
  const generateRandomCode = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  };

  // Fetch classes data
  const { isLoading, isError, data, error, refetch } = useQuery({
    queryKey: ["kelas_admin", url],
    queryFn: async () => {
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
          Accept: "application/json",
        },
        params: {
          intent: IntentEnum.API_GET_GROUP_BY_ROLES,
        },
      });
      return data;
    },
  });

  // Mutation for create, update, delete operations
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
        // Create new group
        const formDataObj = new FormData();

        // Add required fields
        formDataObj.append("name", createFormData.name);
        formDataObj.append("status", createFormData.status);
        formDataObj.append("class_code", createFormData.class_code);
        formDataObj.append("start_period", createFormData.start_period);
        formDataObj.append("end_period", createFormData.end_period);

        // Add optional import file if present
        // if (createFormData.import_file) {
        //   formDataObj.append("import_file", createFormData.import_file);
        // }

        return await axios.post(RoutesApi.psc.groups.store().url, formDataObj, {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
            "X-CSRF-TOKEN": response.data.token,
            Authorization: `Bearer ${cookies.token}`,
          },
          params: {
            intent: IntentEnum.API_USER_CREATE_GROUP,
          },
        });
      } else if (action === "update" && id) {
        // Update existing group
        const updateEndpoint = RoutesApi.psc.groups.update(id);
        return await axios.put(
          updateEndpoint.url,
          {
            name: formData.name,
            status: formData.status,
            class_code: formData.class_code,
            start_period: formData.start_period,
            end_period: formData.end_period,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              "X-CSRF-TOKEN": response.data.token,
              Authorization: `Bearer ${cookies.token}`,
            },
          }
        );
      } else if (action === "delete" && id) {
        // Delete group
        const deleteEndpoint = RoutesApi.psc.groups.destroy(id);
        return await axios.delete(deleteEndpoint.url, {
          headers: {
            "X-CSRF-TOKEN": response.data.token,
            Authorization: `Bearer ${cookies.token}`,
          },
        });
      }
    },
    _onSuccess: (data, variables) => {
      const { action } = variables;
      if (action === "create") {
        // Swal.fire("Berhasil!", "Kelas berhasil dibuat!", "success");
        Swal.fire({
          title: "Berhasil!",
          text: "Kelas berhasil dibuat!",
          icon: "success",
          timer: 2000, // auto close after 2 seconds
          showConfirmButton: false,
          timerProgressBar: true,
        }).then(() => {
          window.location.reload();
        });
      } else if (action === "update") {
        // Swal.fire("Berhasil!", "Kelas berhasil diperbarui!", "success");

        Swal.fire({
          title: "Berhasil!",
          text: "Kelas berhasil diperbarui!",
          icon: "success",
          timer: 2000, // auto close after 2 seconds
          showConfirmButton: false,
          timerProgressBar: true,
        }).then(() => {
          window.location.reload();
        });
      } else if (action === "delete") {
        // Swal.fire("Berhasil!", "Kelas berhasil dihapus!", "success");

        Swal.fire({
          title: "Berhasil!",
          text: "Kelas berhasil dihapus!",
          icon: "success",
          timer: 2000, // auto close after 2 seconds
          showConfirmButton: false,
          timerProgressBar: true,
        }).then(() => {
          window.location.reload();
        });
      }
      // refetch();
      // setIsOpen(false);
      // setIsCreateOpen(false);

      // // Reset form data
      // setCreateFormData({
      //   name: "",
      //   status: "ACTIVE",
      //   class_code: "",
      //   start_period: "",
      //   end_period: "",
      // });
    },
    get onSuccess() {
      return this._onSuccess;
    },
    set onSuccess(value) {
      this._onSuccess = value;
    },
    onError: (error) => {
      console.log(error.response);
      if (error.response === undefined) {
        Swal.fire("Gagal!", error?.message, "error");
        return;
      }
      Swal.fire("Gagal!", error?.response?.data?.message, "error");
    },
  });

  const handleEdit = (kelas) => {
    setSelectedKelas(kelas);
    setFormData({
      name: kelas.name,
      status: kelas.status,
      class_code: kelas.class_code,
      start_period: formatDateForInput(kelas.start_period),
      end_period: formatDateForInput(kelas.end_period),
    });
    setIsOpen(true);
  };

  const handleCreate = () => {
    setCreateFormData({
      ...createFormData,
      class_code: generateRandomCode(),
    });
    setIsCreateOpen(true);
  };

  const handleUpdateKelas = () => {
    mutation.mutate({ id: selectedKelas.id, action: "update" });
  };

  const handleCreateKelas = () => {
    mutation.mutate({ action: "create" });
  };

  const formatDateForInput = (apiDate) => {
    if (!apiDate) return "";

    // Convert from DD-MM-YYYY to YYYY-MM-DD
    const [day, month, year] = apiDate.split("-");
    return `${year}-${month}-${day}`;
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
            <p>{error?.message ?? "error!"}</p>
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
        item.class_code?.toLowerCase().includes(search.toLowerCase()) ||
        item.status?.toLowerCase().includes(search.toLowerCase())
    ) || [];

  return (
    <div className="kontrak-container">
      <div className="header">
        <h2>Data Kelas</h2>
      </div>
      <div className="search-add-container">
        <div className="search-input-container">
          <input
            type="text"
            id="search"
            className="search-input"
            placeholder="Cari Data Kelas 🔎"
            value={search}
            onChange={handleSearchChange}
          />
        </div>
        {/* Add Create button */}
        <button className="add-button" onClick={handleCreate}>
          Tambah Kelas
        </button>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort("name")}>
                Kelas{" "}
                {sortConfig.key === "name"
                  ? sortConfig.direction === "ascending"
                    ? "↑"
                    : "↓"
                  : ""}
              </th>
              <th onClick={() => handleSort("start_period")}>
                Periode Mulai{" "}
                {sortConfig.key === "start_period"
                  ? sortConfig.direction === "ascending"
                    ? "↑"
                    : "↓"
                  : ""}
              </th>
              <th onClick={() => handleSort("end_period")}>
                Periode Selesai{" "}
                {sortConfig.key === "end_period"
                  ? sortConfig.direction === "ascending"
                    ? "↑"
                    : "↓"
                  : ""}
              </th>
              <th onClick={() => handleSort("class_code")}>
                Kode Kelas{" "}
                {sortConfig.key === "class_code"
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
                <td>{item.start_period}</td>
                <td>{item.end_period}</td>
                <td>{item.class_code}</td>
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
                        title: "Hapus Kelas?",
                        text: "Kelas akan dihapus secara permanen!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonText: "Ya, hapus!",
                        cancelButtonText: "Batal",
                        dangerMode: true,
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
                    className="action-button edit"
                    onClick={() =>
                      (window.location.href = `/psc/kelas/${item.id}/mahasiswa`)
                    }
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
            {data?.meta
              ? `Showing ${data.meta.from} to ${data.meta.to} of ${data.meta.total} entries`
              : "No data available"}
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
            <button className="page-item active">
              {data?.meta?.current_page || 1}
            </button>
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

      {/* Edit Popup */}
      {isOpen && (
        <EditPopupKelas
          onClose={() => setIsOpen(false)}
          data={selectedKelas}
          onSave={handleUpdateKelas}
          formData={formData}
          setFormData={setFormData}
          isLoading={mutation.isPending}
        />
      )}

      {/* Create Popup */}
      <CreateGroupPopup
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSave={handleCreateKelas}
        formData={createFormData}
        setFormData={setCreateFormData}
        isLoading={mutation.isPending}
      />
    </div>
  );
};

export default EditKelasPsc;
