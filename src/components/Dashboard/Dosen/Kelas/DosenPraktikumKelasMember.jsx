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
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { RoutesApi } from "@/Routes";
import { ClipLoader } from "react-spinners";
import { useParams } from "react-router";
import { deleteMemberPraktikum } from "@/hooks/dashboard";
import { getCookie } from "@/service";
import { useLocation } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";

export default function DosenPraktikumKelasMember() {
  const [isOpen, setIsOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [selectedData, setSelectedData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [cookies, setCookie] = useCookies(["user"]);
  const [url, setUrl] = useState(RoutesApi.classGroup.url);
  const [filePreview, setFilePreview] = useState(null);
  const [scoreModal, setScoreModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [scoreValue, setScoreValue] = useState("");
  const location = useLocation();

  const getRoute = () => {
    const pathSegments = location.pathname.split("/");
    const currentRoute = pathSegments.find((segment) =>
      ["penilaian"].includes(segment)
    );

    switch (currentRoute) {
      case "penilaian":
        return "penilaian";
      default:
        return "kelas";
    }
  };

  const pathRoute = getRoute();

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["praktikum", url],
    queryFn: async () => {
      const { data } = await axios.get(
        url + `/${id}/assignments/${idpraktikum}/members`,
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
            Accept: "application/json",
          },
          // params: {
          //   intent: RoutesApi.classGroup.intent,
          // },
        }
      );
      console.log(url + `/${id}/assignments/${idpraktikum}/members`);
      console.log(data);
      return data;
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
    assignment_code: "",
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
  let { id, idpraktikum } = useParams();
  const mutation = deleteMemberPraktikum(getCookie(), id, idpraktikum);
  console.log("id", id, idpraktikum);

  const scoreMutation = useMutation({
    mutationFn: async ({ userId, score }) => {
      const response = await axios.put(
        `${RoutesApi.classGroup.url}/${id}/assignments/${idpraktikum}/members/${userId}/score`,
        { score: parseFloat(score) },
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
            Accept: "application/json",
          },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      Swal.fire({
        title: "Berhasil!",
        text: "Nilai berhasil diberikan!",
        icon: "success",
      });
      setScoreModal(false);
      setScoreValue("");
      setSelectedUser(null);
      // Refetch data to update the UI
      window.location.reload(); // or use react-query's refetch
    },
    onError: (error) => {
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Gagal memberikan nilai",
        icon: "error",
      });
    },
  });

  // Add this function to handle score submission
  const handleScoreSubmit = () => {
    if (!scoreValue || scoreValue < 0 || scoreValue > 100) {
      Swal.fire({
        title: "Error!",
        text: "Nilai harus antara 0-100",
        icon: "error",
      });
      return;
    }

    scoreMutation.mutate({
      userId: selectedUser.id,
      score: scoreValue,
    });
  };

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
            placeholder="Cari Mahasiswa    🔎"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th
                className="w-[2rem]"
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
              <th className="w-[2rem] !px-0">Nama Mahasiswa </th>
              <th className="w-[2rem]">NIM </th>
              {pathRoute === "penilaian" ? (
                <th className="w-[2rem]">Nilai </th>
              ) : ""}
              <th className="w-[2rem]">Email </th>
              <th className="w-[2rem]">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.data.map((item, index) => (
              <tr key={index}>
                <td className="max-w-5">{index + 1}</td>
                <td>{item.name}</td>
                <td></td>
                {pathRoute === "penilaian" ? (
                  <td>{item.pivot.score}</td>
                ) : ""}
                <td>{item.email}</td>
                <td>
                  {pathRoute === "penilaian" ? (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button
                          className="action-button score bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                          onClick={() => {
                            setSelectedUser(item);
                            setScoreValue("");
                          }}
                        >
                          Beri Nilai
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <div className="w-full flex justify-end">
                            <AlertDialogCancel className="border-none shadow-none">
                              <RxCross1 className="text-2xl text-black hover:cursor-pointer" />
                            </AlertDialogCancel>
                          </div>
                          <AlertDialogTitle>Beri Nilai</AlertDialogTitle>
                          <AlertDialogDescription className="w-full">
                            <div className="">
                              <p className="mb-4">
                                Beri nilai untuk: <strong>{item.name}</strong>
                              </p>
                              <div className="edit-form-group-mahasiswa">
                                <label>Nilai (0-100):</label>
                                <input
                                  type="number"
                                  min="0"
                                  max="100"
                                  step="0.01"
                                  value={scoreValue}
                                  onChange={(e) =>
                                    setScoreValue(e.target.value)
                                  }
                                  className="text-black"
                                  placeholder="Masukkan nilai..."
                                />
                              </div>
                            </div>
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="bg-red-600 text-white hover:bg-red-800 hover:text-white">
                            Batal
                          </AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-green-600"
                            onClick={() => {
                              if (
                                !scoreValue ||
                                scoreValue < 0 ||
                                scoreValue > 100
                              ) {
                                Swal.fire({
                                  title: "Error!",
                                  text: "Nilai harus antara 0-100",
                                  icon: "error",
                                });
                                return;
                              }
                              scoreMutation.mutate({
                                userId: item.id,
                                score: scoreValue,
                              });
                            }}
                          >
                            {scoreMutation.status === "pending" ? (
                              <p>Loading...</p>
                            ) : (
                              <>Simpan Nilai</>
                            )}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                        <div className="text-xs mt-2 text-red-700">
                          {scoreMutation.isError &&
                            scoreMutation.error.response?.data.message}
                        </div>
                      </AlertDialogContent>
                    </AlertDialog>
                  ) : (
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
                        }).then((result) => {
                          if (result.isConfirmed) {
                            mutation.mutate(item.id);
                          }
                        });
                      }}
                    >
                      {mutation.status == "pending" ? (
                        <p>Loading...</p>
                      ) : (
                        <>Delete</>
                      )}
                    </button>
                  )}
                </td>
              </tr>
            ))}
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
