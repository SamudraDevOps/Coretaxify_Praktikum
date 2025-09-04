import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { RoutesApi } from "@/Routes";
import { ClipLoader } from "react-spinners";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { FaFile, FaPlus } from "react-icons/fa";
import GabungUjian from "./GabungUjian";
import { getCsrf } from "@/service/getCsrf";
import Swal from "sweetalert2";

const MahasiswaPscUjian = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies(["token"]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const [url, setUrl] = useState(`${RoutesApi.url}api/student/assignment-user`);
  const [isGabungUjianOpen, setIsGabungUjianOpen] = useState(false);
  const { user } = useOutletContext();

  // Fetch assignments data
  const { isLoading, isError, data, error, refetch } = useQuery({
    queryKey: ["mahasiswa_psc_exam", url],
    queryFn: async () => {
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
          Accept: "application/json",
        },
        params: {
          relation_column_filters: {
            assignment: {
              tipe: "exam",
            },
          },
          column_filters: {
            user_id: user.data.id,
          },
        },
      });
      console.log(data);
      return data;
    },
  });

  const downloadMutation = useMutation({
    mutationFn: async (id) => {
      try {
        const showEndpoint = RoutesApi.student.assignments.show(id);
        const response = await axios.get(showEndpoint.url, {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
            Accept: "*/*",
          },
          params: {
            intent: IntentEnum.API_USER_DOWNLOAD_FILE,
          },
          responseType: "blob",
        });

        let filename = "file.pdf";
        const contentDisposition = response.headers["content-disposition"];

        if (contentDisposition) {
          const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
          const matches = filenameRegex.exec(contentDisposition);
          if (matches !== null && matches[1]) {
            filename = matches[1].replace(/['"]/g, "");
          }
        }

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        return response;
      } catch (error) {
        console.error("Download error:", error);
        Swal.fire("Gagal!", "Gagal mengunduh file", "error");
        throw error;
      }
    },
  });

  const startUjian = useMutation({
    mutationFn: async (assignment_id) => {
      console.log("Start button clicked");
      const csrf = await getCsrf();
      const data = await axios.post(
        `${RoutesApi.url}api/student/sistem`,
        {
          assignment: String(assignment_id),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-CSRF-TOKEN": csrf,
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );
      return data;
    },
    onSuccess: (data, variables) => {
      console.log(data);
      // Swal.fire("Berhasil!", "Praktikum berhasil dimulai!", "success").then(
      //   (result) => {
      //     if (result.isConfirmed) {
      //       // Navigate to the praktikum system or refresh
      //       window.location.href = `/praktikum/${variables}`;
      //       refetch();
      //     }
      //   }
      // );

      Swal.fire({
        title: "Berhasil!",
        text: "Praktikum berhasil dimulai!",
        icon: "success",
        timer: 2000, // auto close after 2 seconds
        showConfirmButton: false,
        timerProgressBar: true,
      }).then(() => {
        // setTambahPopupOpen(false);
        window.location.href = `/praktikum/${variables}`;
        refetch();
      });
    },
    onError: (error) => {
      console.log("Error starting praktikum:", error);
      Swal.fire("Gagal!", error.message, "error");
    },
  });

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleGabungUjianSuccess = () => {
    refetch();
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

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
      <div className="h-screen w-full justify-center items-center flex">
        <Alert variant="destructive" className="w-1/2 bg-white">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error!</AlertTitle>
          <div className="">
            <p>{error?.message ?? "Error loading praktikum!"}</p>
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
  //   const filteredData =
  //     data?.data?.filter(
  //       (item) =>
  //         item.name?.toLowerCase().includes(search.toLowerCase()) ||
  //         item.description?.toLowerCase().includes(search.toLowerCase()) ||
  //         item.status?.toLowerCase().includes(search.toLowerCase())
  //     ) || [];

  return (
    <div className="kontrak-container">
      <div className="header">
        <h2>Ujian Saya</h2>
      </div>
      <div className="search-add-container">
        <div className="search-input-container">
          <input
            type="text"
            id="search"
            className="search-input"
            placeholder="Cari Ujian                     🔎"
            value={search}
            onChange={handleSearchChange}
          />
        </div>
        <button
          className="bg-blue-800 p-2 rounded-md text-white hover:bg-blue-900 flex items-center"
          onClick={() => setIsGabungUjianOpen(true)}
        >
          <FaPlus className="mr-2" /> Gabung Ujian
        </button>
      </div>

      {data.data.length === 0 ? (
        <div className="text-center py-8">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            Tidak ada ujian.
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Anda belum terdaftar di ujian manapun.
          </p>
          <button
            className="mt-4 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
            onClick={() => setIsGabungUjianOpen(true)}
          >
            Gabung Ujian
          </button>
        </div>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                {/* <th onClick={() => handleSort("namaPraktikum")}>
                          Judul Praktikum{" "}
                          {sortConfig.key === "namaPraktikum"
                            ? sortConfig.direction === "ascending"
                              ? "↑"
                              : "↓"
                            : sortConfig.direction === "descending"
                            ? "↓"
                            : "↑"}
                        </th> */}

                <th className="">No</th>
                <th className="">Judul Ujian</th>
                <th className="">Kode Ujian</th>
                <th className="">File Ujian</th>
                <th className="">Durasi Ujian</th>
                <th className="">Deadline Ujian</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.data.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.assignment.name}</td>
                  <td>{item.assignment.assignment_code}</td>
                  <td>
                    {item.supporting_file ? (
                      <button
                        onClick={() => handleDoanload(item.id)}
                        className="download-button"
                        disabled={downloadMutation.isPending}
                      >
                        {downloadMutation.isPending ? "Loading..." : "Download"}
                      </button>
                    ) : (
                      <span>-</span>
                    )}
                  </td>
                  <td>
                    {item.assignment.duration ? (
                      <span>{item.assignment.duration}</span>
                    ) : (
                      <span>-</span>
                    )}
                  </td>
                  <td>
                    {item.assignment.end_period ? (
                      <span>{item.assignment.end_period}</span>
                    ) : (
                      <span>-</span>
                    )}
                    <p className="">{item.tanggal}</p>
                  </td>
                  <td>
                    <button
                      className="action-button"
                      disabled={startUjian.isPending}
                      onClick={() => {
                        if (item.is_start === 1) {
                          // If already started, redirect directly
                          window.location.href = `/praktikum/${item.assignment.id}`;
                        } else {
                          // If not started, call the mutation to start
                          startUjian.mutate(item.assignment.id);
                        }
                      }}
                    >
                      {startUjian.isPending ? (
                        <div className="flex items-center gap-2">
                          <ClipLoader color="#ffffff" size={16} />
                          Loading...
                        </div>
                      ) : (
                        "Mulai"
                      )}
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
                data.data.length
              )} of ${data.data.length} entries`}
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
              {/* {Array.from(
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
              )} */}
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
      )}

      {/* Join Praktikum Dialog */}
      <GabungUjian
        isOpen={isGabungUjianOpen}
        setIsOpen={setIsGabungUjianOpen}
        onSuccess={handleGabungUjianSuccess}
      />
    </div>
  );
};

export default MahasiswaPscUjian;
