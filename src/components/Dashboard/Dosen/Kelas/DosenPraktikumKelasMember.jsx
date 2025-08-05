// import React from "react";
import React, { useState } from "react";
// import "../Pengguna/Mahasiswa/editMahasiswa.css";
// import EditPopupMahasiswa from "../Pengguna/Mahasiswa/EditPopupMahasiswa";
import Swal from "sweetalert2";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

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
import { useLocation, useNavigate } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import { IntentEnum } from "@/enums/IntentEnum";
import TabelNilaiMahasiswa from "./TabelNilaiMahasiswa";

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
  const [isTabelNilaiMahasiswaOpen, setIsTabelNilaiMahasiswaOpen] =
    useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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

  const { isLoading, isError, data, error, refetch} = useQuery({
    queryKey: ["praktikum", url, currentPage],
    queryFn: async () => {
      const { data } = await axios.get(
        url + `/${id}/assignments/${idpraktikum}/members`,
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
            Accept: "application/json",
          },
          params: {
            intent: IntentEnum.API_GET_ASSIGNMENT_MEMBERS_WITH_SISTEM_SCORES,
            page: currentPage
          },
        }
      );
      console.log(url + `/${id}/assignments/${idpraktikum}/members`);
      console.log(data);
      return data;
    },
  });

  console.log(currentPage);

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

  const handleDataRefresh = () => {
    refetch();
  }

  const onPageChange = (page) => {
    setCurrentPage(page);
  }

  const getPageFromUrl = (url) => {
    if (!url) return null;
    const matches = url.match(/[?&]page=(\d+)/);
    return matches ? parseInt(matches[1]) : null;
  };

  const handlePageClick = (page) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const handleOpenNilai = (sistemScores) => {
    setSelectedUser(sistemScores);
    setIsTabelNilaiMahasiswaOpen(true);
  };

  const handleEditClick = (index) => {
    setSelectedData(data[index]);
    setIsOpen(true);
  };

  const [formData, setFormData] = useState({
    assignment_code: "",
  });

  const [file, setFile] = useState();
  function handleChangeFile(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }
  const [search, setSearch] = useState("");

  let { id, idpraktikum } = useParams();
  const mutation = deleteMemberPraktikum(getCookie(), id, idpraktikum);
  console.log("id", id, idpraktikum);

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
              ) : (
                ""
              )}
              <th className="w-[2rem]">Email </th>
              <th className="w-[2rem]">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.data.map((item, index) => (
              <tr key={index}>
                <td className="max-w-5">{index + 1}</td>
                <td>{item.user.name}</td>
                <td>
                  {item.user.unique_id !== null ? item.user.unique_id : "-"}
                </td>
                {pathRoute === "penilaian" ? (
                  <td>
                    {item.sistem_scores.length > 0 ? (
                      // <button
                      //   className="download-button"
                      //   onClick={() => handleOpenNilai(item.sistem_scores)}
                      // >
                      //   Lihat Nilai
                      // </button>
                      item.summary.total_scores_across_all_sistems
                    ) : (
                      "-"
                    )}
                  </td>
                ) : (
                  ""
                )}
                <td>{item.user.email}</td>
                <td>
                  {pathRoute === "penilaian" ? (
                    <>
                      <button
                        className="action-button edit bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors"
                        onClick={() => {
                          navigate(
                            `/praktikum/${idpraktikum}?user_id=${item.user.id}`
                          );
                        }}
                      >
                        Cek Pengerjaan
                      </button>
                    </>
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
                            mutation.mutate(item.user.id);
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
                onPageChange(getPageFromUrl(data.links.prev))
                // setUrl(data.links.prev);
              }}
              disabled={data.links.prev === null}
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
                onPageChange(getPageFromUrl(data.links.next))
                // console.log(data.links.next);
                // setUrl(data.links.next);
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
      {isTabelNilaiMahasiswaOpen && (
        <TabelNilaiMahasiswa
          onClose={() => setIsTabelNilaiMahasiswaOpen(false)}
          sistemScores={selectedUser}
        />
      )}
    </div>
  );
}
