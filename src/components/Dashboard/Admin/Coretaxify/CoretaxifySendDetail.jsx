// import React from "react";
import React, { useState } from "react";
// import "../Pengguna/Mahasiswa/editMahasiswa.css";
import EditPopupMahasiswa from "../Pengguna/Mahasiswa/EditPopupMahasiswa";
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
import { CookiesProvider, useCookies } from "react-cookie";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { RoutesApi } from "@/Routes";
import { ClipLoader } from "react-spinners";
import { IoClose } from "react-icons/io5";


export default function CoretaxifySendDetail() {
          const [isOpen, setIsOpen] = useState(false);
          const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
          const [selectedData, setSelectedData] = useState(null);
          const [currentPage, setCurrentPage] = useState(1);
          const itemsPerPage = 10;
          const [cookies, setCookie] = useCookies(["user"]);
          const [url, setUrl] = useState(RoutesApi.tasksAdmin);

          const { isLoading, isError, data, error } = useQuery({
                    queryKey: ["kelas_dosen", url],
                    queryFn: async () => {
                              const { data } = await axios.get(url, {
                                        headers: {
                                                  Authorization: `Bearer ${cookies.token}`,
                                                  Accept: "application/json",
                                        },
                              });
                              console.log(data);
                              return data;
                    },
          });

          const mutation = useMutation({
                    mutationFn: async (id) => {
                              console.log("button clicked");
                              const response = await axios.get(`${RoutesApi.url}api/csrf-token`, {
                                        // withCredentials: true,
                                        headers: {
                                                  "X-Requested-With": "XMLHttpRequest",
                                                  Accept: "application/json",
                                        },
                              });
                              console.log(response.data.token);
                              axios.defaults.headers.common["X-CSRF-TOKEN"] = response.data.token;
                              console.log(cookies.token);
                              const data = await axios.post(
                                        RoutesApi.tasksAdmin,
                                        {
                                                  name: formData.name,
                                                  import_file: formData.file,
                                        },
                                        {
                                                  headers: {
                                                            "Content-Type": "multipart/form-data",
                                                            Accept: "application/json",
                                                            "X-CSRF-TOKEN": response.data.token,
                                                            Authorization: `Bearer ${cookies.token}`,
                                                  },
                                        }
                              );
                              return data;
                    },
                    onSuccess: (data) => {
                              console.log(data);
                    },
                    onError: (error) => {
                              console.log(error);
                    },
          });
          const mutationEdit = useMutation({
                    mutationFn: async (id) => {
                              console.log("button clicked");
                              const response = await axios.get(`${RoutesApi.url}api/csrf-token`, {
                                        // withCredentials: true,
                                        headers: {
                                                  "X-Requested-With": "XMLHttpRequest",
                                                  Accept: "application/json",
                                        },
                              });
                              console.log(response.data.token);
                              axios.defaults.headers.common["X-CSRF-TOKEN"] = response.data.token;
                              console.log(cookies.token);
                              const data = await axios.post(
                                        RoutesApi.tasksAdmin + "/" + id,
                                        {
                                                  name: formData.name,
                                                  import_file: formData.file,
                                        },
                                        {
                                                  headers: {
                                                            "Content-Type": "multipart/form-data",
                                                            Accept: "application/json",
                                                            "X-CSRF-TOKEN": response.data.token,
                                                            Authorization: `Bearer ${cookies.token}`,
                                                  },
                                        }
                              );
                              return data;
                    },
                    onSuccess: (data) => {
                              console.log(data);
                    },
                    onError: (error) => {
                              console.log(error);
                    },
          });
          const mutationDelete = useMutation({
                    mutationFn: async (id) => {
                              console.log("button clicked");
                              const response = await axios.get(`${RoutesApi.url}api/csrf-token`, {
                                        // withCredentials: true,
                                        headers: {
                                                  "X-Requested-With": "XMLHttpRequest",
                                                  Accept: "application/json",
                                        },
                              });
                              console.log(response.data.token);
                              axios.defaults.headers.common["X-CSRF-TOKEN"] = response.data.token;
                              console.log(cookies.token);
                              const data = await axios.delete(RoutesApi.tasksAdmin + `/${id}`, {
                                        headers: {
                                                  "Content-Type": "multipart/form-data",
                                                  Accept: "application/json",
                                                  "X-CSRF-TOKEN": response.data.token,
                                                  Authorization: `Bearer ${cookies.token}`,
                                        },
                              });
                              return data;
                    },
                    onSuccess: (data) => {
                              console.log(data);
                    },
                    onError: (error) => {
                              console.log(error);
                    },
          });

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

          const handleEditClick = (index) => {
                    setSelectedData(data[index]);
                    setIsOpen(true);
          };

          const [dosenList, setDosenList] = useState([{ id: 1 }]);

          const handleAddDosen = () => {
                    setDosenList([...dosenList, { id: dosenList.length + 1 }]); 
          };

          const handleRemoveDosen = (id) => {
                    setDosenList(dosenList.filter((dosen) => dosen.id !== id)); 
          };

          const indexOfLastItem = currentPage * itemsPerPage;
          const indexOfFirstItem = indexOfLastItem - itemsPerPage;
          // const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

          const paginate = (pageNumber) => setCurrentPage(pageNumber);

          const [formData, setFormData] = useState({
                    name: "",
                    file: "",
          });

          const handleChange = (e) => {
                    const { name, value } = e.target;
                    setFormData({ ...formData, [name]: value });
          };

          const handleSave = () => {
                    // Logic to save the data
                    onClose();
          };

          const [file, setFile] = useState();
          function handleChangeFile(e) {
                    console.log(e.target.files);
                    setFile(URL.createObjectURL(e.target.files[0]));
          }
          const [search, setSearch] = useState("");

          // const processedData = data.map((item) => ({
          //   ...item,
          //   highlight:
          //     search &&
          //     Object.values(item).some((value) =>
          //       String(value).toLowerCase().includes(search.toLowerCase())
          //     ),
          // }));
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
                                        <h2>Data Coretaxify</h2>
                                        {/* <p>{cookies.user ? cookies.user : "no user"}</p>
        {processedData.map((item) => (
          <li key={item.id} style={{ color: item.highlight ? "red" : "black" }}>
            {item.namaSoal}
          </li>
        ))} */}
                              </div>
                              <div className="search-add-container">
                                        <div className="search-input-container">
                                                  <input
                                                            type="text"
                                                            id="search"
                                                            className="search-input"
                                                            placeholder="Cari Soal   🔎"
                                                            onChange={(e) => setSearch(e.target.value)}
                                                  />
                                        </div>
                                        <AlertDialog>
                                                  <AlertDialogTrigger>
                                                            <div className="bg-blue-800 p-2 rounded-lg text-white">
                                                                      + Tambah Penerima
                                                            </div>
                                                  </AlertDialogTrigger>
                                                  <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                      <AlertDialogTitle>Tambah Penerima</AlertDialogTitle>
                                                                      <AlertDialogDescription className="w-full">
                                                                                <div className="">
                                                                                          <form>
                                                                                                    <div className="edit-form-group-mahasiswa ">
                                                                                                              <label>Nama Praktikum:</label>
                                                                                                              <input
                                                                                                                        type="text"
                                                                                                                        name="name"
                                                                                                                        value="test"
                                                                                                                        onChange={handleChange}
                                                                                                                        required
                                                                                                                        disabled
                                                                                                                        className="cursor-not-allowed bg-gray-200"
                                                                                                              />
                                                                                                    </div>
                                                                                                    <div className="edit-form-group-mahasiswa mb-4 space-y-2">
                                                                                                              <label>Pilih Dosen</label>
                                                                                                              {dosenList.map((dosen) => (
                                                                                                                        <div key={dosen.id} className="flex items-center gap-2">
                                                                                                                                  <select className="select select-bordered w-full">
                                                                                                                                            <option value="">Pilih Dosen</option>
                                                                                                                                            <option value="dosen1">Dosen 1</option>
                                                                                                                                            <option value="dosen2">Dosen 2</option>
                                                                                                                                  </select>
                                                                                                                                  {dosenList.length > 1 && (
                                                                                                                                            <button
                                                                                                                                                      onClick={() => handleRemoveDosen(dosen.id)}
                                                                                                                                                      className="p-2 text-red-500 hover:text-red-700"
                                                                                                                                            >
                                                                                                                                                      <IoClose size={24} />
                                                                                                                                            </button>
                                                                                                                                  )}
                                                                                                                        </div>
                                                                                                              ))}

                                                                                                              <button
                                                                                                                        type="button" 
                                                                                                                        onClick={handleAddDosen}
                                                                                                                        className="bg-purple-900 text-white p-2 rounded hover:bg-purple-800"
                                                                                                              >
                                                                                                                        + Tambah Dosen
                                                                                                              </button>
                                                                                                    </div>
                                                                                          </form>
                                                                                </div>
                                                                      </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                      <AlertDialogCancel className="bg-red-600 text-white">
                                                                                Kembali
                                                                      </AlertDialogCancel>
                                                                      {/* <AlertDialogAction
                onClick={() => mutation.mutate()}
                className="bg-green-600"
              > */}
                                                                      <AlertDialogAction
                                                                                onClick={() => mutation.mutate()}
                                                                                // onClick={() => console.log(formData)}
                                                                                className="bg-green-600"
                                                                      >
                                                                                Simpan
                                                                      </AlertDialogAction>
                                                            </AlertDialogFooter>
                                                  </AlertDialogContent>
                                        </AlertDialog>
                              </div>
                              <div className="table-container">
                                        <table>
                                                  <thead>
                                                            <tr>
                                                                      <th onClick={() => handleSort("id")}>
                                                                                No{" "}
                                                                                {sortConfig.key === "id"
                                                                                          ? sortConfig.direction === "ascending"
                                                                                                    ? "↑"
                                                                                                    : "↓"
                                                                                          : sortConfig.direction === "descending"
                                                                                                    ? "↓"
                                                                                                    : "↑"}
                                                                      </th>
                                                                      <th onClick={() => handleSort("namaSoal")}>
                                                                                Nama Praktikum{" "}
                                                                                {sortConfig.key === "namaSoal"
                                                                                          ? sortConfig.direction === "ascending"
                                                                                                    ? "↑"
                                                                                                    : "↓"
                                                                                          : sortConfig.direction === "descending"
                                                                                                    ? "↓"
                                                                                                    : "↑"}
                                                                      </th>
                                                                      <th>Nama Dosen</th>
                                                                      <th>Aksi</th>
                                                            </tr>
                                                  </thead>
                                                  <tbody>
                                                            {data.data.map((item, index) => (
                                                                      <tr key={index}>
                                                                                <td>{indexOfFirstItem + index + 1}</td>
                                                                                <td>{item.name}</td>
                                                                                <td>
                                                                                          hendro
                                                                                </td>
                                                                                <td>
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
                                                                                                                        dangerMode: true,
                                                                                                              }).then((result) => {
                                                                                                                        if (result.isConfirmed) {
                                                                                                                                  mutationDelete.mutate(item.id);
                                                                                                                                  // const newData = data.filter(
                                                                                                                                  //   (itemData) => itemData.id !== item.id
                                                                                                                                  // );
                                                                                                                                  // setData(newData);
                                                                                                                                  Swal.fire(
                                                                                                                                            "Berhasil!",
                                                                                                                                            "Soal berhasil dihapus!",
                                                                                                                                            "success"
                                                                                                                                  );
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
                                                            {`Showing ${indexOfFirstItem + 1} to ${Math.min(
                                                                      indexOfLastItem,
                                                                      data.length
                                                            )} of ${data.length} entries`}
                                                  </div>

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
                                                                      className={`page-item ${currentPage === Math.ceil(data.length / itemsPerPage)
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
                                                  onClose={() => setIsOpen(false)}
                                                  data={selectedData}
                                        />
                              )}
                    </div>
          );
}
