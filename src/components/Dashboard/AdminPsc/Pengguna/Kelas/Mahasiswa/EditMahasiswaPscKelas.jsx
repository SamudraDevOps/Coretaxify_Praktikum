import React, { useState, useEffect } from "react";
import "./editMahasiswa.css";
import EditPopupMahasiswa from "./EditPopupMahasiswa";
import Swal from "sweetalert2";
import { CookiesProvider, useCookies } from "react-cookie";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ClipLoader } from "react-spinners";
import { RoutesApi } from "@/Routes";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useParams } from "react-router-dom";

const EditMahasiswaPscKelas = () => {
  const { groupId } = useParams(); // Get groupId from URL params
  const [isViewOpen, setIsViewOpen] = useState(false); // Renamed from isOpen to isViewOpen
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [selectedData, setSelectedData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [cookies, setCookie] = useCookies(["user"]);
  const [search, setSearch] = useState("");
  const [url, setUrl] = useState(`${RoutesApi.psc.groups.url}/${groupId}/members`);
  const [klassInfo, setKlassInfo] = useState(null);

  // Form data state for member details (view-only)
  // const [formData, setFormData] = useState({
  //   name: "",
  //   email: "",
  //   // status: "",
  // });

  // Fetch class info
  const { data: classData } = useQuery({
    queryKey: ["kelas_detail", groupId],
    queryFn: async () => {
      const { data } = await axios.get(`${RoutesApi.psc.groups.url}/${groupId}`, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
          Accept: "application/json",
        },
      });
      setKlassInfo(data.data);
      return data;
    },
    enabled: !!groupId
  });

  // Fetch members data
  const { isLoading, isError, data, error, refetch } = useQuery({
    queryKey: ["kelas_members", url],
    queryFn: async () => {
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
          Accept: "application/json",
        },
      });
      return data;
    },
    enabled: !!groupId
  });

  // After the useQuery call, add this:
  useEffect(() => {
    if (data) {
      console.log("API Response:", data);
      console.log("Members data:", data.data);
      console.log("Filtered data:", filteredData);
    }
  }, [data]);

  // Mutation for delete operation only
  const mutation = useMutation({
    mutationFn: async ({ id }) => {
      // Get CSRF token
      const response = await axios.get(`${RoutesApi.url}api/csrf-token`, {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          Accept: "application/json",
        },
      });

      axios.defaults.headers.common["X-CSRF-TOKEN"] = response.data.token;
      const apiUrl = `${RoutesApi.psc.groups.url}/${groupId}/members/${id}`;
      
      return await axios.delete(apiUrl, {
        headers: {
          "X-CSRF-TOKEN": response.data.token,
          Authorization: `Bearer ${cookies.token}`,
        }
      });
    },
    onSuccess: () => {
      Swal.fire("Berhasil!", "Anggota berhasil dihapus!", "success");
      refetch();
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

  // View details handler (no editing functionality)
  // const handleViewDetails = (member) => {
  //   setSelectedData(member);
  //   setFormData({
  //     name: member.name,
  //     email: member.email,
  //     // status: member.status
  //   });
  //   setIsViewOpen(true);
  // };

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
    item.email?.toLowerCase().includes(search.toLowerCase())
    // item.status?.toLowerCase().includes(search.toLowerCase())
  ) || [];

  return (
    <div className="kontrak-container">
      <div className="header">
        <h2>Data Mahasiswa - {klassInfo?.name || "Loading..."}</h2>
      </div>
      <div className="search-add-container">
        <div className="search-input-container">
          <input
            type="text"
            id="search"
            className="search-input"
            placeholder="Cari Data Mahasiswa 🔎"
            value={search}
            onChange={handleSearchChange}
          />
        </div>
        {/* Remove the "Tambah Mahasiswa" button since we can't add members */}
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort("name")}>
                Nama Mahasiswa{" "}
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
              {/* <th onClick={() => handleSort("status")}>
                Status{" "}
                {sortConfig.key === "status"
                  ? sortConfig.direction === "ascending"
                    ? "↑"
                    : "↓"
                  : ""}
              </th> */}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                {/* <td>{item.status}</td> */}
                <td>
                  <button
                    className="action-button delete"
                    onClick={() => {
                      Swal.fire({
                        title: "Hapus Mahasiswa?",
                        text: "Data akan dihapus secara permanen!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonText: "Ya, hapus!",
                        cancelButtonText: "Batal",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          mutation.mutate({
                            id: item.id
                          });
                        }
                      });
                    }}
                  >
                    Delete
                  </button>
                  {/* <button
                    className="action-button edit"
                    onClick={() => handleViewDetails(item)}
                  >
                    Detail
                  </button> */}
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
      
      {/* View-only Member Popup */}
      {/* {isViewOpen && (
        <EditPopupMahasiswa
          onClose={() => setIsViewOpen(false)}
          data={selectedData}
          formData={formData}
          setFormData={setFormData}
          isReadOnly={true}
          title="Detail Mahasiswa"
        />
      )} */}
    </div>
  );
};

export default EditMahasiswaPscKelas;
