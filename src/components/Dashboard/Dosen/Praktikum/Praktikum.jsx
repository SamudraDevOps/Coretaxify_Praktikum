// import React from "react";
import React, { useState } from "react";
// import "../Pengguna/Mahasiswa/editMahasiswa.css";
// import EditPopupMahasiswa from "../Pengguna/Mahasiswa/EditPopupMahasiswa";
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
import { FaFile } from "react-icons/fa";

export default function Praktikum() {
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState(RoutesApi.assignment.url);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [selectedData, setSelectedData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [cookies, setCookie] = useCookies(["user"]);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview({ name: file.name, url: reader.result });
      };
      reader.readAsDataURL(file);
    }
    setFormData({ ...formData, supportingFile: file });
  };

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["praktikum", url],
    queryFn: async () => {
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      });
      console.log(data.data);
      return data;
    },
  });

  const {
    isLoading: isLoadingClass,
    isError: isErrorClass,
    data: dataClass,
  } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const { data } = await axios.get(RoutesApi.classAdmin, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      });
      console.log(data);
      return data;
    },
  });

  const mutation = useMutation({
    mutationFn: async () => {
      console.log("button clicked");
      // const { response } = await axios.post(RoutesApi.login, {
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
        RoutesApi.assignment.url,
        {
          name: formData.name,
          assignment_code: formData.assignment_code,
          groups: [formData.group_id],
          start_period: formData.start_period,
          end_period: formData.end_period,
          supporting_files: formData.supporting_files,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-CSRF-TOKEN": response.data.token,
            Authorization: `Bearer ${cookies.token}`,
          },
          params: {
            intent: RoutesApi.assignment.intent,
          },
        }
      );
      return data;
    },
    onSuccess: (data) => {
      console.log(data);
      window.location.reload();

      // queryClient.invalidateQueries({ queryKey: ["praktikum"] });
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
    assignment_code: "",
    group_id: "",
    start_period: "",
    end_period: "",
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

  if (isLoading || isLoadingClass) {
    return (
      <div className="loading">
        <ClipLoader color="#7502B5" size={50} />
      </div>
    );
  }
  // if (isLoadingClass) {
  //   return (
  //     <div className="loading">
  //       <ClipLoader color="#7502B5" size={50} />
  //     </div>
  //   );
  // }

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
        <AlertDialog>
          <AlertDialogTrigger>
            <div className="bg-blue-800 p-2 rounded-lg text-white">
              + Tambah Praktikum
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Tambah Praktikum</AlertDialogTitle>
              <AlertDialogDescription className="w-full">
                <div className="">
                  <form>
                    <div className="edit-form-group-mahasiswa ">
                      <label>Judul Praktikum:</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="edit-form-group-mahasiswa">
                      <label>Kode Praktikum:</label>
                      <input
                        className="text-black"
                        name="assignment_code"
                        value={formData.assignment_code}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="edit-form-group-mahasiswa">
                      <label>Kelas Praktikum:</label>
                      <select name="group_id" onChange={handleChange} id="">
                        <option value="">Pilih Kelas</option>
                        {dataClass.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="edit-form-group-mahasiswa">
                      <label>File Support:</label>
                      <div className="flex items-center justify-center w-full ">
                        <label
                          htmlFor="dropzone-file"
                          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            {filePreview ? (
                              <>
                                <div className="grid justify-center items-center p-20">
                                  <FaFile className="w-8 h-8 text-gray-500 dark:text-gray-400 mb-2" />
                                  <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {filePreview.name}
                                  </p>
                                </div>
                              </>
                            ) : (
                              <>
                                <svg
                                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 20 16"
                                >
                                  <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                  />
                                </svg>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                  <span className="font-semibold">
                                    Click to upload
                                  </span>{" "}
                                  or drag and drop
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  ZIP, RAR atau PDF (MAX. 10mb)
                                </p>
                              </>
                            )}
                          </div>

                          <input
                            id="dropzone-file"
                            type="file"
                            className="hidden"
                            accept=".zip, .rar, .pdf"
                            onChange={handleFileChange}
                          />
                        </label>
                      </div>
                    </div>
                    <div className="edit-form-group-mahasiswa">
                      <label>Tanggal Mulai:</label>
                      <input
                        type="date"
                        name="start_period"
                        onChange={handleChange}
                        min={new Date().toISOString().split("T")[0]}
                      />
                    </div>
                    <div className="edit-form-group-mahasiswa">
                      <label>Tanggal Selesai:</label>
                      <input
                        type="date"
                        name="end_period"
                        onChange={handleChange}
                        min={formData.start_period || new Date().toISOString().split("T")[0]}
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
              <AlertDialogAction
                onClick={() => mutation.mutate()}
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
              <th onClick={() => handleSort("namaPraktikum")}>
                Judul Praktikum{" "}
                {sortConfig.key === "namaPraktikum"
                  ? sortConfig.direction === "ascending"
                    ? "↑"
                    : "↓"
                  : sortConfig.direction === "descending"
                    ? "↓"
                    : "↑"}
              </th>
              <th className="">Kode Praktikum</th>
              <th className="">Tanggal Praktikum</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.data.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td className="max-w-5">
                  <p className="truncate">{item.assignment_code}</p>
                </td>
                <td className="max-w-5">
                  <p className="">{item.start_period}</p>
                </td>
                <td>
                  <AlertDialog>
                    <AlertDialogTrigger className="action-button edit">
                      Edit
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Edit Praktikum</AlertDialogTitle>
                        <AlertDialogDescription className="w-full">
                          <div className="">
                            <form>
                              <div className="edit-form-group-mahasiswa ">
                                <label>Judul Praktikum:</label>
                                <input
                                  type="text"
                                  name="namaPraktikum"
                                  value={formData.namaPraktikum}
                                  onChange={handleChange}
                                  required
                                />
                              </div>
                              <div className="edit-form-group-mahasiswa">
                                <label>Kode Praktikum:</label>
                                <input
                                  className="text-black"
                                  name="kodePraktikum"
                                  value={formData.kodePraktikum}
                                  onChange={handleChange}
                                />
                              </div>
                              <div className="edit-form-group-mahasiswa">
                                <label>Tanggal Praktikum:</label>
                                <input type="date" onChange={handleChange} />
                              </div>
                            </form>
                          </div>
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="bg-red-600 text-white">
                          Kembali
                        </AlertDialogCancel>
                        <AlertDialogAction className="bg-green-600 ">
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
                        title: "Hapus Praktikum?",
                        text: "Praktikum akan dihapus secara permanen!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonText: "Ya, hapus!",
                        cancelButtonText: "Batal",
                        dangerMode: true,
                      }).then((result) => {
                        if (result.isConfirmed) {
                          const newData = data.filter(
                            (itemData) => itemData.id !== item.id
                          );
                          setData(newData);
                          Swal.fire(
                            "Berhasil!",
                            "Praktikum berhasil dihapus!",
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
        <div className="">
          <div className="pagination-info">
            {`Showing ${indexOfFirstItem + 1} to ${Math.min(
              indexOfLastItem,
              data.length
            )} of ${data.length} entries`}
          </div>

          <div className="pagination">
            <button
              className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              &lt;
            </button>
            {Array.from(
              { length: Math.ceil(data.length / itemsPerPage) },
              (_, index) => (
                <button
                  key={index + 1}
                  className={`page-item ${currentPage === index + 1 ? "active" : ""
                    }`}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </button>
              )
            )}
            <button
              className={`page-item ${currentPage === Math.ceil(data.length / itemsPerPage)
                  ? "disabled"
                  : ""
                }`}
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === Math.ceil(data.length / itemsPerPage)}
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
