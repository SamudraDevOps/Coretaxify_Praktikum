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
import { RxCross1 } from "react-icons/rx";

export default function UploadSoal() {
  const [isOpen, setIsOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [selectedData, setSelectedData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [cookies, setCookie] = useCookies(["user"]);
  const [url, setUrl] = useState(RoutesApi.tasksAdmin);

  const { isLoading, isError, data, error, refetch } = useQuery({
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
      Swal.fire("Berhasil!", "Data Soal berhasil dibuat !", "success").then(
        (result) => {
          if (result.isConfirmed) {
            refetch();
            // window.location.reload();
          }
        }
      );
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const mutationEdit = useMutation({
    mutationFn: async (id) => {
      console.log("button clicked");
      const response = await axios.get(`${RoutesApi.url}api/csrf-token`, {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          Accept: "application/json",
        },
      });
      axios.defaults.headers.common["X-CSRF-TOKEN"] = response.data.token;

      // Create a dynamic payload object
      const payload = {};

      // Only add properties that have values
      if (formData.name && formData.name.trim() !== "") {
        payload.name = formData.name;
      }

      if (formData.file) {
        payload.import_file = formData.file;
      }

      // Send the request with only non-empty fields
      const data = await axios.post(RoutesApi.tasksAdmin + "/" + id, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
          "X-CSRF-TOKEN": response.data.token,
          Authorization: `Bearer ${cookies.token}`,
        },
        params: {
          _method: "PUT",
        },
      });
      return data;
    },
    onSuccess: (data) => {
      console.log(data);
      Swal.fire("Berhasil!", "Soal berhasil diperbarui!", "success").then(
        (result) => {
          if (result.isConfirmed) {
            refetch();
          }
        }
      );
    },
    onError: (error) => {
      console.log(error);
      Swal.fire("Gagal!", "Gagal memperbarui soal.", "error");
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
      Swal.fire("Berhasil!", "Data Soal berhasil dihapus!", "success").then(
        (result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        }
      );
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
        <h2>Data Soal</h2>
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
              + Tambah Soal
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <div className="w-full flex justify-end">
                <AlertDialogCancel className="border-none shadow-none">
                  <RxCross1
                    className="text-2xl text-black hover:cursor-pointer"
                    // onClick={onClose}
                  />
                </AlertDialogCancel>
              </div>
              <AlertDialogTitle>Tambah Soal</AlertDialogTitle>
              <AlertDialogDescription className="w-full">
                <div className="">
                  <form>
                    <div className="edit-form-group-mahasiswa ">
                      <label>Judul Soal:</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="edit-form-group-mahasiswa">
                      <label>File Soal:</label>
                      <input
                        type="file"
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            file: e.target.files[0],
                          })
                        }
                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                      />
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
              <th onClick={() => handleSort("name")}>
                Judul Soal{" "}
                {sortConfig.key === "name"
                  ? sortConfig.direction === "ascending"
                    ? "↑"
                    : "↓"
                  : sortConfig.direction === "descending"
                  ? "↓"
                  : "↑"}
              </th>
              <th>File</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.data.map((item, index) => (
              <tr key={index}>
                <td>{indexOfFirstItem + index + 1}</td>
                <td>{item.name}</td>
                <td>
                  <a
                    href={item.file}
                    download
                    className="text-blue-500 hover:text-blue-700 hover:underline"
                  >
                    File
                  </a>
                </td>
                <td>
                  <AlertDialog>
                    <AlertDialogTrigger
                      className="action-button edit"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          name: item.name,
                          file: null,
                        })
                      }
                    >
                      Edit
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <div className="w-full flex justify-end">
                          <AlertDialogCancel className="border-none shadow-none">
                            <RxCross1
                              className="text-2xl text-black hover:cursor-pointer"
                              // onClick={onClose}
                            />
                          </AlertDialogCancel>
                        </div>
                        <AlertDialogTitle>Edit Soal</AlertDialogTitle>
                        <AlertDialogDescription className="w-full"></AlertDialogDescription>
                      </AlertDialogHeader>
                      <div className="">
                        <form>
                          <div className="edit-form-group-mahasiswa ">
                            <label>Judul Soal:</label>
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              required
                            />
                          </div>
                          <div className="edit-form-group-mahasiswa">
                            <label>File Soal:</label>
                            <input
                              type="file"
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  file: e.target.files[0],
                                })
                              }
                              // onChange={handleChangeFile}
                              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                            />
                          </div>
                        </form>
                      </div>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="bg-red-600 text-white">
                          Kembali
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => mutationEdit.mutate(item.id)}
                          className="bg-green-600 "
                        >
                          Simpan
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>

                  {/* <button
                    className="action-button edit"
                    onClick={() => handleEditClick(index)}
                  >
                    Edit
                  </button> */}
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
          onClose={() => setIsOpen(false)}
          data={selectedData}
        />
      )}
    </div>
  );
}
