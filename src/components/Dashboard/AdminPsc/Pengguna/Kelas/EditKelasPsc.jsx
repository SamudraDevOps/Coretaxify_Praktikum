import React, { useState, useEffect } from "react";
import "./editKelas.css";
import EditPopupKelas from "./EditPopupKelas";
import Swal from "sweetalert2";
import { CookiesProvider, useCookies } from "react-cookie";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ClipLoader } from "react-spinners";
import { RoutesApi } from "@/Routes";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const EditKelasPsc = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedKelas, setSelectedKelas] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [cookies, setCookie] = useCookies(["user"]);
  const [url, setUrl] = useState(RoutesApi.psc.groups.url);
  const [search, setSearch] = useState("");

  useEffect(() => {
    console.log("isOpen state changed to:", isOpen);
  }, [isOpen]);

  // Form data state for creating/editing
  const [formData, setFormData] = useState({
    name: "",
    status: "",
    class_code: "",
    start_period: "",
    end_period: "",
  });

  // Fetch classes data
  const { isLoading, isError, data, error, refetch } = useQuery({
    queryKey: ["kelas_admin", url],
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

  // Mutation for create, update, delete operations
  const mutation = useMutation({
    mutationFn: async ({ id, action }) => {
      // Get CSRF token
      const response = await axios.get(`${RoutesApi.url}api/csrf-token`, {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          Accept: "application/json",
        },
      });

      axios.defaults.headers.common["X-CSRF-TOKEN"] = response.data.token;
      let apiUrl = RoutesApi.classAdmin.url;

      if (action === "update" && id) {
        apiUrl = `${RoutesApi.psc.groups.url}/${id}`;
        return await axios.put(
          apiUrl,
          {
            name: formData.name,
            status: formData.status,
            class_code: formData.class_code,
            start_period: formData.start_period, // Don't format this
            end_period: formData.end_period,     // Don't format this
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
        apiUrl = `${RoutesApi.psc.groups.url}/${id}`;
        return await axios.delete(apiUrl, {
          headers: {
            "X-CSRF-TOKEN": response.data.token,
            Authorization: `Bearer ${cookies.token}`,
          },
        });
      }
    },
    onSuccess: () => {
      Swal.fire("Berhasil!", "Operasi berhasil dilakukan!", "success");
      refetch();
      setIsOpen(false);
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

  // Add these helper functions to your component
  const formatDateForInput = (apiDate) => {
    if (!apiDate) return '';
    
    // Convert from DD-MM-YYYY to YYYY-MM-DD
    const [day, month, year] = apiDate.split('-');
    return `${year}-${month}-${day}`;
  };
  
  const formatDateForApi = (inputDate) => {
    if (!inputDate) return '';
    
    // Convert from YYYY-MM-DD to DD-MM-YYYY
    const [year, month, day] = inputDate.split('-');
    return `${day}-${month}-${year}`;
  };

  const handleEdit = (kelas) => {
    console.log("Edit button clicked", kelas);
    setSelectedKelas(kelas);
    setFormData({
      name: kelas.name,
      status: kelas.status,
      class_code: kelas.class_code,
      start_period: formatDateForInput(kelas.start_period),
      end_period: formatDateForInput(kelas.end_period)
    });
    setIsOpen(true);
    console.log("isOpen set to:", true); // Check if this is executed
  };
  

  const handleUpdateKelas = () => {
    mutation.mutate({ id: selectedKelas.id, action: "update" });
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
  const filteredData = data.data.filter(item => 
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.class_code.toLowerCase().includes(search.toLowerCase()) ||
    item.status.toLowerCase().includes(search.toLowerCase())
  );

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
              <th onClick={() => handleSort("name")}>
                Periode Mulai{" "}
                {sortConfig.key === "start_period"
                  ? sortConfig.direction === "ascending"
                    ? "↑"
                    : "↓"
                  : ""}
              </th>
              <th onClick={() => handleSort("name")}>
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
                    onClick={() => (window.location.href = `/psc/kelas/${item.id}/mahasiswa`)}
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
            {`Showing ${data.meta.from} to ${data.meta.to} of ${data.meta.total} entries`}
          </div>
          <div className="pagination">
            <button
              className={`page-item`}
              onClick={() => {
                setUrl(data.links.prev);
              }}
              disabled={!data.links.prev}
            >
              &lt;
            </button>
            <button className="page-item active">{data.meta.current_page}</button>
            <button
              className={`page-item`}
              onClick={() => {
                setUrl(data.links.next);
              }}
              disabled={!data.links.next}
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
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
    </div>
  );
};

export default EditKelasPsc;
