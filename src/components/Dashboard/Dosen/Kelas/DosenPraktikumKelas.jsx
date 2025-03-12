// import React from "react";
import React, { useEffect, useState } from "react";
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
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { RoutesApi } from "@/Routes";
import { ClipLoader } from "react-spinners";
import { useParams } from "react-router";
import { FaFile } from "react-icons/fa";
import {
  createPraktikumDosen,
  deletePraktikumDosen,
  getDosenPraktikumKelas,
  getOneDosenPraktikumKelas,
  getTaskContract,
  updatePraktikumDosen,
} from "@/hooks/dashboard";
import { getCookie } from "@/service";
import { RxCross1 } from "react-icons/rx";

export default function DosenPraktikumKelas() {
  const [isOpen, setIsOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [selectedData, setSelectedData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [cookies, setCookie] = useCookies(["user"]);
  const [url, setUrl] = useState(RoutesApi.classGroup.url);
  const [updateUrl, setUpdateUrl] = useState("");
  const [filePreview, setFilePreview] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    // assignment_code: "",
    task_id: "",
    start_period: "",
    end_period: "",
  });
  let { id } = useParams();

  const { isLoading, isError, data, error, refetch } = getDosenPraktikumKelas(
    url,
    id,
    getCookie()
  );

  const {
    isLoading: isLoadingOne,
    isError: isErrorOne,
    data: dataOne,
    error: errorOne,
  } = getOneDosenPraktikumKelas(url, id, updateUrl, getCookie());

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

  // const [formData, setFormData] = useState({
  //   assignment_code: "",
  // });

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

    setFilePreview(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
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
  const taskData = getTaskContract(RoutesApi.tasksContract, getCookie());
  const mutation = createPraktikumDosen(
    getCookie(),
    id,
    formData,
    file,
    refetch
  );
  const mutationUpdate = updatePraktikumDosen(
    getCookie(),
    id,
    formData,
    file,
    refetch
  );

  const mutationDelete = deletePraktikumDosen(getCookie(), id, refetch);
  useEffect(() => {
    if (dataOne) {
      setFormData({
        name: dataOne.data.name,
        task_id: dataOne.data.task_id,
        start_period: dataOne.data.start_period.split("-").reverse().join("-"),
        end_period: dataOne.data.end_period.split("-").reverse().join("-"),
      });
    }
  }, [dataOne]);
  // const mutationDelete
  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (isLoading || taskData.isLoading) {
    return (
      <div className="loading">
        <ClipLoader color="#7502B5" size={50} />
      </div>
      // <div className="h-full w-full text-2xl italic font-bold text-center flex items-center justify-center">Loading...</div>
    );
  }

  // console.log(taskData.data);
  console.log("hi");
  console.log(formData);
  return (
    <div className="kontrak-container">
      {/* {id} */}
      <div className="header">
        <h2>Data Praktikum</h2>
        {/* <p>{cookies.user ? cookies.user : "no user"}</p>
        {processedData.map((item) => (
          <li key={item.id} style={{ color: item.highlight ? "red" : "black" }}>
            {item.namaPraktikum}
          </li>
        ))} */}
      </div>
      <div className="search-add-container flex justify-between">
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
          <AlertDialogTrigger
            onClick={() =>
              setFormData({
                name: "",
                task_id: "",
                start_period: "",
                end_period: "",
              })
            }
          >
            <div className="bg-blue-800 p-2 rounded-lg text-white">
              + Tambah Praktikum
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
              <AlertDialogTitle>Tambah Praktikum</AlertDialogTitle>
              <AlertDialogDescription className="w-full">
                <div className=" h-96 overflow-scroll">
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
                    {/* <div className="edit-form-group-mahasiswa">
                      <label>Kode Praktikum:</label>
                      <input
                        className="text-black"
                        name="assignment_code"
                        value={formData.assignment_code}
                        onChange={handleChange}
                      />
                    </div> */}
                    <div className="edit-form-group-mahasiswa">
                      <label>Soal :</label>
                      <select name="task_id" onChange={handleChange} id="">
                        <option value="">Pilih Soal</option>
                        {taskData.data.map((item) => (
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
                            onChange={handleChangeFile}
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
                      />
                    </div>
                    <div className="edit-form-group-mahasiswa">
                      <label>Tanggal Selesai:</label>
                      <input
                        type="date"
                        name="end_period"
                        onChange={handleChange}
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
              <th
                className="max-w-5"
                onClick={() => handleSort("namaPraktikum")}
              >
                Nomor{" "}
                {sortConfig.key === "namaPraktikum"
                  ? sortConfig.direction === "ascending"
                    ? "↑"
                    : "↓"
                  : sortConfig.direction === "descending"
                  ? "↓"
                  : "↑"}
              </th>
              <th className="">Nama Praktikum </th>
              <th className="">Kode Praktikum </th>
              <th className="">Deadline </th>
              <th className="">Supporting File</th>
              <th className="">Aksi</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.data.assignments.map((item, index) => (
              <tr key={index}>
                <td className="max-w-5">{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.assignment_code}</td>
                <td>{item.end_period}</td>
                <td>
                  {/* <a href="/google">tes</a> */}
                  <a href={item.supporting_file_url}>Download File</a>
                </td>
                {/* <td className="max-w-5">
                  <p className="truncate">{item.supporting_file}</p>
                </td> */}
                <td>
                  <AlertDialog>
                    <AlertDialogTrigger>
                      <div
                        className="action-button"
                        onClick={() => setUpdateUrl(item.id)}
                      >
                        Edit
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
                        <AlertDialogTitle>Edit Praktikum</AlertDialogTitle>
                        <AlertDialogDescription className="w-full">
                          <div className=" h-96 overflow-scroll">
                            <form>
                              {isLoadingOne ? (
                                <div className="loading">
                                  <ClipLoader color="#7502B5" size={50} />
                                </div>
                              ) : dataOne?.data ? (
                                <>
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
                                    <label>Soal :</label>
                                    <select
                                      name="task_id"
                                      onChange={handleChange}
                                      id=""
                                      value={formData.task_id}
                                    >
                                      <option>Pilih Soal</option>
                                      {taskData.data.map((item) => (
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
                                          onChange={handleChangeFile}
                                        />
                                      </label>
                                    </div>
                                  </div>
                                  <div className="edit-form-group-mahasiswa">
                                    <label>Tanggal Mulai:</label>
                                    {/* <input
                                  type="text"
                                  value={formData.start_period}
                                /> */}
                                    <input
                                      type="date"
                                      name="start_period"
                                      onChange={handleChange}
                                      // className="bg-red-400"
                                      value={formData.start_period}
                                      // value={formData.start_period
                                      //   .split("-")
                                      //   .reverse()
                                      //   .join("-")}
                                      // value={
                                      //   formData.start_period
                                      //     ? new Date(formData.start_period)
                                      //         .toISOString()
                                      //         .split("T")[0]
                                      //     : ""
                                      // }
                                    />
                                  </div>
                                  <div className="edit-form-group-mahasiswa">
                                    <label>Tanggal Selesai:</label>
                                    <input
                                      type="date"
                                      name="end_period"
                                      onChange={handleChange}
                                      value={formData.end_period}
                                      // value={formData.end_period
                                      //   .split("-")
                                      //   .reverse()
                                      //   .join("-")}
                                      // value={
                                      //   formData.end_period
                                      //     ? new Date(formData.end_period)
                                      //         .toISOString()
                                      //         .split("T")[0]
                                      //     : ""
                                      // }
                                    />
                                  </div>
                                </>
                              ) : null}
                            </form>
                          </div>
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="bg-red-600 text-white">
                          Kembali
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => mutationUpdate.mutate(item.id)}
                          className="bg-green-600"
                        >
                          Simpan
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  <button
                    className="action-button delete"
                    onClick={() => {
                      Swal.fire({
                        title: "Hapus Praktikum?",
                        text: " akan dihapus secara permanen!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonText: "Ya, hapus!",
                        cancelButtonText: "Batal",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          mutationDelete.mutate(item.id);
                          // mutation.mutate(item.id);
                          //   window.location.reload();
                          //   const newData = data.filter(
                          //     (itemData) =>
                          //       itemData.kodePembelian !== item.kodePembelian
                          //   );
                          //   setData(newData);
                        }
                      });
                    }}
                  >
                    {mutationDelete.status == "pending" ? (
                      <p>Loading...</p>
                    ) : (
                      <>Delete</>
                    )}
                  </button>
                  <button
                    className="action-button"
                    onClick={() => {
                      window.location.href = `/dosen/kelas/${data.data.id}/praktikum/${item.id}`;
                    }}
                  >
                    Detail
                  </button>
                </td>
                {/* <td>
                  <button className="action-button">Mulai</button>
                </td> */}
              </tr>
            ))}
            {/* {id} */}
          </tbody>
        </table>
        <div className="pagination-container">
          <div className="pagination-info">
            {/* Total Entries: {data.data.assignment.length} */}
            {/* {`Showing ${indexOfFirstItem + 1} to ${Math.min(
              indexOfLastItem,
              data.data.length
            )} of ${data.data.length} entries`} */}
          </div>

          {/* <div className="pagination">
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
            {Array.from({ length: Math.ceil(data.length / itemsPerPage) }, (_, index) => (
                            <button key={index + 1} className={`page-item ${currentPage === index + 1 ? "active" : ""}`} onClick={() => paginate(index + 1)}>
                                {index + 1}
                            </button>
                        ))}
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
          </div> */}
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
