import React, { useEffect, useState } from "react";
import EditPopupPraktikum from "./EditPopupPraktikum";
import Swal from "sweetalert2";
import { IntentEnum } from "@/enums/IntentEnum";
import { CookiesProvider, useCookies } from "react-cookie";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { RoutesApi } from "@/Routes";
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router-dom";

export default function Praktikum() {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [cookies, setCookie] = useCookies(["user"]);
  const navigate = useNavigate();

  const { isLoading, isError, data, error, refetch } = useQuery({
    queryKey: ["tasks_question"],
    queryFn: async () => {
      const { data } = await axios.get(
        RoutesApi.admin.assignments.index().url,
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
          params: {
            intent: IntentEnum.API_GET_ASSIGNMENT_ALL,
          },
        }
      );
      console.log(data);
      return data.data;
    },
  });

  
  const [formData, setFormData] = useState({
    name: "",
  });

  const mutation = useMutation({
    mutationFn: async ({ id, action }) => {
      const response = await axios.get(RoutesApi.csrf, {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          Accept: "application/json",
        },
      });

      axios.defaults.headers.common["X-CSRF-TOKEN"] = response.data.token;

      if (action === "update" && id) {
        const updateEndpoint = RoutesApi.admin.assignments.update(id);
        return await axios.put(updateEndpoint.url,
          {
            name: formData.name
          },
          {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-CSRF-TOKEN": response.data.token,
            Authorization: `Bearer ${cookies.token}`,
          },
        });
      } 
    },
    onSuccess: (data, variables) => {
      const { action } = variables;
      if (action === "update") {
        Swal.fire("Berhasil", "Praktikum berhasil diperbarui!", "success");
      } else if (action === "delete") {
        Swal.fire("Berhasil", "Praktikum berhasil dihapus!", "success");
      }
      refetch();
      setIsUpdateOpen(false);
      setFormData({
        name: "",
      });
    },
    onError: (error) => {
      console.log(error.message);
      if (error.response === undefined) {
        Swal.fire("Gagal!", error.message, "error");
        return;
      }
      Swal.fire("Gagal!", error.response.data.message, "error");
    },
  });

  const handleEdit = (assignment) => {
    setSelectedAssignment(assignment);
    setFormData({
      name: assignment.name,
    });

    setIsUpdateOpen(true);
  };

  const handleViewMembers = (assignmentId) => {
    navigate(`/admin/praktikum/${assignmentId}/members`);
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });

    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "ascending" ? -1 - mahasiswa : 1;
      }
      if (a[key] > b[key]) {
        return direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
    setData(sortedData);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (isLoading) {
    return (
      <div className="loading">
        <ClipLoader color="#7502B5" size={50} />
      </div>
      // <div className="h-full w-full text-2xl italic font-bold text-center flex items-center justify-center">Loading...</div>
    );
  }

  return (
    <div className="kontrak-container">
      <div className="header">
        <h2>Data Praktikum</h2>
        {/* <p>{cookies.user ? cookies.user : "no user"}</p>
        {processedData.map((item) => (
          <li key={item.id} style={{ color: item.highlight ? "red" : "black" }}>
            {item.namaPraktikum}
          </li>
        ))} */}
      </div>
      <div className="search-add-container">
        <div className="search-input-container">
          <input
            type="text"
            id="search"
            className="search-input"
            placeholder="Cari Praktikum   🔎"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th onClick={() => handleSort("name")}>
                Nama Praktikum{" "}
                {sortConfig.key === "name"
                  ? sortConfig.direction === "ascending"
                    ? "↑"
                    : "↓"
                  : sortConfig.direction === "descending"
                  ? "↓"
                  : "↑"}
              </th>
              <th className="">Nama Dosen</th>
              <th className="">Instansi</th>
              <th className="">Status</th>
              <th className="">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.group.teacher}</td>
                <td>{item.instansi}</td>
                <td>{item.group.status}</td>
                <td>
                  <button
                    className="action-button edit"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
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
        <div className="">
          {/* <div className="pagination-info">
            {`Showing ${indexOfFirstItem + 1} to ${Math.min(
              indexOfLastItem,
              data.length
            )} of ${data.length} entries`}
          </div> */}

          <div className="pagination">
            <button
              className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              &lt;
            </button>
          </div>
        </div>
      </div>
      <EditPopupPraktikum
        isOpen={isUpdateOpen}
        onClose={() => setIsUpdateOpen(false)}
        onSave={() =>
          mutation.mutate({ id: selectedAssignment.id, action: "update" })
        }
        formData={formData}
        setFormData={setFormData}
        isLoading={mutation.isPending}
      />
    </div>
  );
}
