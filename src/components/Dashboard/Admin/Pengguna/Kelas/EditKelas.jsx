import React, { useState } from "react";
import "./editKelas.css";
import EditPopupKelas from "./EditPopupKelas";
import Swal from "sweetalert2";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { RoutesApi } from "@/Routes";
import ClipLoader from "react-spinners/ClipLoader";
import { CookiesProvider, useCookies } from "react-cookie";
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
import { RxCross1 } from "react-icons/rx";
import { FaRegCopy } from "react-icons/fa";
import { useToast } from "@/hooks/use-toast";

const EditKelas = () => {
  const [url, setUrl] = useState(RoutesApi.classAdmin);
  const [cookies, setCookie] = useCookies(["token"]);
  const { toast } = useToast();
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["classes", url],
    queryFn: async () => {
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
        params: {
          intent: "api.get.group.all",
        },
      });
      console.log(data.data);
      return data;
    },
  });
  const mutation = useMutation({
    mutationFn: async (id) => {
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
      const data = await axios.put(
        RoutesApi.url + `api/admin/groups/${id}`,
        {
          name: formData.namaKelas,
          start_period: formData.start_period,
          end_period: formData.end_period,
          class_code: formData.kodeKelas,
          status: formData.status,
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
      return data;
    },
    onSuccess: (data) => {
      console.log(data);
      // Swal.fire("Berhasil!", "Data Kelas berhasil diubah!", "success").then(
      //   (result) => {
      //     if (result.isConfirmed) {
      //       window.location.reload();
      //     }
      //   }
      // );

      Swal.fire({
        title: "Berhasil!",
        text: "Data Kelas berhasil diubah!",
        icon: "success",
        timer: 2000, // auto close after 2 seconds
        showConfirmButton: false,
        timerProgressBar: true,
      }).then(() => {
        window.location.reload();
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const mutationDelete = useMutation({
    mutationFn: async (id) => {
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
      const data = await axios.delete(
        RoutesApi.url + `api/admin/groups/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
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
      // Swal.fire("Berhasil!", "Data Kelas berhasil dihapus!", "success").then(
      //   (result) => {
      //     if (result.isConfirmed) {
      //       window.location.reload();
      //     }
      //   }
      // );
      Swal.fire({
        title: "Berhasil!",
        text: "Data Kelas berhasil dihapus!",
        icon: "success",
        timer: 2000, // auto close after 2 seconds
        showConfirmButton: false,
        timerProgressBar: true,
      }).then(() => {
        window.location.reload();
      });
    },
    onError: (error) => {
      // Swal.fire("Gagal !", error, "success");
      Swal.fire({
        title: "Gagal!",
        text: "Terjadi kesalahan!",
        icon: "error",
        timer: 2000, // auto close after 2 seconds
        showConfirmButton: false,
        timerProgressBar: true,
      }).then(() => {
        window.location.reload();
      });
    },
  });
  const [isOpen, setIsOpen] = useState(false);
  const [selectedKelas, setSelectedKelas] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [currentPage, setCurrentPage] = useState(1);
  const [updateId, setUpdateId] = useState(0);
  const itemsPerPage = 10;
  const [formData, setFormData] = useState({
    namaKelas: "",
    kodeKelas: "",
    status: "",
    start_period: "",
    end_period: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEdit = (kelas) => {
    setFormData({
      namaKelas: kelas.name,
      kodeKelas: kelas.class_code,
      status: kelas.status,
      start_period: kelas.start_period.split("-").reverse().join("-"),
      end_period: kelas.end_period.split("-").reverse().join("-"),
    });
    // setSelectedKelas(kelas);
    // setIsOpen(true);
  };

  const handleUpdateKelas = (updatedKelas) => {
    setData(
      data.map((item) => (item.id === updatedKelas.id ? updatedKelas : item))
    );
    setIsOpen(false);
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });

    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) return direction === "ascending" ? -1 : 1;
      if (a[key] > b[key]) return direction === "ascending" ? 1 : -1;
      return 0;
    });

    setData(sortedData);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  //   const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

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
    return <div>Error: {error.message}</div>;
  }

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
          />
        </div>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort("kelas")}>
                Nama Kelas{" "}
                {sortConfig.key === "kelas"
                  ? sortConfig.direction === "ascending"
                    ? "↑"
                    : "↓"
                  : ""}
              </th>
              {/* <th>Instansi</th> */}
              <th>Nama Dosen</th>
              <th>Kode Kelas</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.data.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.teacher}</td>
                {/* <td>{item.qty_student}</td> */}
                <td>
                  <div className="flex gap-2 items-center justify-center">
                    {item.class_code}

                    <FaRegCopy
                      onClick={(e) => {
                        // e.stopPropagation();

                        e.preventDefault();
                        navigator.clipboard.writeText(item.class_code);
                        toast({
                          title: "Copy berhasil",
                          description: "Kode Kelas berhasil dicopy",
                        });
                        // alert("miaw");
                      }}
                      className="hover:bg-slate-300 p-1 rounded-md"
                      size={25}
                    />
                  </div>
                </td>
                <td>{item.status}</td>
                <td>
                  <AlertDialog>
                    <AlertDialogTrigger onClick={() => handleEdit(item)}>
                      <div className="bg-green-500 p-[0.5rem] px-5  mr-2 rounded-md text-white">
                        Edit
                      </div>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Edit Kelas</AlertDialogTitle>
                        <AlertDialogDescription className="w-full">
                          <div className="w-full">
                            <div className="w-full flex justify-end">
                              <AlertDialogCancel className="border-none shadow-none">
                                <RxCross1
                                  className="text-2xl text-black hover:cursor-pointer"
                                // onClick={onClose}
                                />
                              </AlertDialogCancel>
                            </div>
                            <form>
                              <div className="edit-form-group-mahasiswa ">
                                <label>Nama Kelas:</label>
                                <input
                                  type="text"
                                  name="namaKelas"
                                  value={formData.namaKelas}
                                  onChange={handleChange}
                                  required
                                />
                              </div>
                              <div className="edit-form-group-mahasiswa">
                                <label>Kode Kelas:</label>
                                <input
                                  type="text"
                                  name="kodeKelas"
                                  value={formData.kodeKelas}
                                  onChange={handleChange}
                                  required
                                />
                              </div>
                              <div className="edit-form-group-mahasiswa">
                                <label>Tanggal Mulai:</label>
                                <input
                                  type="date"
                                  name="start_period"
                                  value={formData.start_period}
                                  onChange={handleChange}
                                  required
                                />
                              </div>
                              <div className="edit-form-group-mahasiswa">
                                <label>Tanggal Selesai:</label>
                                <input
                                  type="date"
                                  name="end_period"
                                  value={formData.end_period}
                                  onChange={handleChange}
                                  required
                                />
                              </div>
                              <div className="edit-form-group-mahasiswa">
                                <label>Status:</label>
                                <select
                                  name="status"
                                  value={formData.status}
                                  onChange={handleChange}
                                  required
                                >
                                  <option value="">Pilih Status</option>
                                  <option value="ACTIVE">Active</option>
                                  <option value="INACTIVE">Expired</option>
                                </select>
                                {/* <img src={file} /> */}
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
                          onClick={() => mutation.mutate(item.id)}
                          className="bg-green-600"
                        >
                          Simpan
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  {/* <button
                    className="action-button edit"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button> */}
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
                          // setData(
                          //   data.filter((itemData) => itemData.id !== item.id)
                          // );
                          mutationDelete.mutate(item.id);
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
          <div className="pagination">
            <button
              className="page-item"
              onClick={() => setUrl(data.links.prev)}
              disabled={data.meta.current_page === 1}
            >
              &lt;
            </button>

            {(() => {
              const currentPage = data.meta.current_page;
              const lastPage = data.meta.last_page;
              const pages = [];

              const addPage = (page) => {
                pages.push(
                  <button
                    key={page}
                    className={`page-item ${currentPage === page ? "active" : ""}`}
                    onClick={() => setUrl(`${RoutesApi.classAdmin}?page=${page}`)}
                  >
                    {page}
                  </button>
                );
              };

              addPage(1);

              if (currentPage > 2) pages.push(<span key="dots-start">...</span>);

              if (currentPage !== 1 && currentPage !== lastPage) addPage(currentPage);

              if (currentPage < lastPage - 1) pages.push(<span key="dots-end">...</span>);

              if (lastPage > 1) addPage(lastPage);

              return pages;
            })()}  {/* ← perhatikan () di sini */}

            <button
              className="page-item"
              onClick={() => setUrl(data.links.next)}
              disabled={data.meta.current_page === data.meta.last_page}
            >
              &gt;
            </button>
          </div>

          {/* <div className="pagination-info">
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
                  className={`page-item ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </button>
              )
            )}
            <button
              className={`page-item ${
                currentPage === Math.ceil(data.length / itemsPerPage)
                  ? "disabled"
                  : ""
              }`}
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === Math.ceil(data.length / itemsPerPage)}
            >
              &gt;
            </button>
          </div> */}
        </div>
      </div>
      {isOpen && (
        <EditPopupKelas
          onClose={() => setIsOpen(false)}
          data={selectedKelas}
          onSave={handleUpdateKelas}
        />
      )}
    </div>
  );
};

export default EditKelas;
