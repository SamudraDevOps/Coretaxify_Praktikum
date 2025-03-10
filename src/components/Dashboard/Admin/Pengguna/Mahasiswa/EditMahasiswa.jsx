import React, { useState } from "react";
import "./editPopupMahasiswa.css";
import EditPopupMahasiswa from "./EditPopupMahasiswa";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { RoutesApi } from "@/Routes";
import { ClipLoader } from "react-spinners";
import { useCookies } from "react-cookie";
import { deleteMahasiswa, getMahasiswa } from "@/hooks/dashboard/useMahasiswa";
import { getCookie } from "@/service";

const EditMahasiswa = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [selectedData, setSelectedData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [cookies, setCookie] = useCookies(["user"]);
  const itemsPerPage = 10;
  const [url, setUrl] = useState(RoutesApi.getUserAdmin.url);

  const { isLoading, isError, data, error } = getMahasiswa(url, getCookie());
  const mutation = deleteMahasiswa(getCookie());

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });

    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "ascending" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
    setData(sortedData);
  };

  const handleEditClick = (data) => {
    setSelectedData(data);
    console.log(data);
    setIsOpen(true);
  };
  const handleUpdateMahasiswa = (updatedMahasiswa) => {
    setData(
      data.map((item) =>
        item.id === updatedMahasiswa.id ? updatedMahasiswa : item
      )
    );
    setIsOpen(false);
  };
  // console.log(RoutesApi.getUserAdmin.intent.mahasiswa);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  // console.log(RoutesApi.getUserAdmin.url);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  if (isLoading) {
    return (
      <div className="loading">
        <ClipLoader color="#7502B5" size={50} />
      </div>
      // <div className="h-full w-full text-2xl italic font-bold text-center flex items-center justify-center">Loading...</div>
    );
  }

  if (isError) {
    console.log(error);
    return "error";
  }

  return (
    <div className="">
      <div className="">
        <div className="kontrak-container">
          <div className="header">
            <h2>Data Mahasiswa</h2>
          </div>
          <div className="search-add-container">
            <div className="search-input-container">
              <input
                type="text"
                id="search"
                className="search-input"
                placeholder="Cari Data Mahasiswa 🔎"
              />
            </div>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th onClick={() => handleSort("namaMahasiswa")}>
                    Nama Mahasiswa{" "}
                    {sortConfig.key === "namaMahasiswa"
                      ? sortConfig.direction === "ascending"
                        ? "↑"
                        : "↓"
                      : ""}
                  </th>
                  <th>Email</th>
                  {/* <th>Instansi</th>
                  <th>Kelas</th> */}
                  <th>Tanggal Registrasi</th>
                  {/* <th>Kode Registrasi</th>
                  <th>Status</th> */}
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* {data} */}
                {data.data.map((item, index) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    {/* <td>{item.instansi}</td>
                    <td>{item.kelas}</td> */}
                    <td>{item.email_verified_at.slice(0, 10)}</td>
                    {/* <td>{item.kodeRegistrasi}</td>
                    <td>{item.status}</td> */}
                    <td>
                      <button
                        className="action-button edit"
                        onClick={() => handleEditClick(data.data[index])}
                      >
                        Edit
                      </button>
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
                              mutation.mutate(item.id);
                              // setData(
                              //   data.filter(
                              //     (itemData) => itemData.id !== item.id
                              //   )
                              // );
                              // Swal.fire(
                              //   "Berhasil!",
                              //   "Data mahasiswa berhasil dihapus!",
                              //   "success"
                              // );
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
              {/* <div className="pagination-info">
                {`Showing ${indexOfFirstItem + 1} to ${Math.min(
                  indexOfLastItem,
                  data.length
                )} of ${data.length} entries`}
              </div> */}

              <div className="pagination">
                <button
                  className={`page-item`}
                  onClick={() => {
                    setUrl(data.links.prev);
                  }}
                  disabled={data.meta.current_page === 1}
                >
                  &lt;
                </button>
                <button className="page-item">{data.meta.current_page}</button>
                {/* {Array.from({ length: Math.ceil(data.length / itemsPerPage) }, (_, index) => (
                            <button key={index + 1} className={`page-item ${currentPage === index + 1 ? "active" : ""}`} onClick={() => paginate(index + 1)}>
                                {index + 1}
                            </button>
                        ))} */}
                <button
                  className={`page-item ${
                    currentPage === Math.ceil(data.length / itemsPerPage)
                      ? "disabled"
                      : ""
                  }`}
                  onClick={() => {
                    console.log(data.links.next);
                    setUrl(data.links.next);
                  }}
                  disabled={data.links.next == null}
                >
                  &gt;
                </button>
              </div>
            </div>
          </div>
          {isOpen && (
            <EditPopupMahasiswa
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              data={selectedData}
              onSave={handleUpdateMahasiswa}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default EditMahasiswa;
