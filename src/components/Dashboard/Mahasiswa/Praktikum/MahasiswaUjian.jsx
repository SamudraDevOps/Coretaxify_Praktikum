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
import { useQuery, useMutation } from "@tanstack/react-query";
import { RoutesApi } from "@/Routes";
import { ClipLoader } from "react-spinners";
import { joinExamMahasiswa } from "@/hooks/dashboard/useMahasiswa";
import { getCookie } from "@/service";
import { getCsrf } from "@/service/getCsrf";
import { useOutletContext } from "react-router-dom";

export default function MahasiswaUjian() {
  const [isOpen, setIsOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [selectedData, setSelectedData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const [cookies, setCookie] = useCookies(["user"]);
  const [url, setUrl] = useState(`${RoutesApi.url}api/student/assignment-user`);
  const { user } = useOutletContext();

  const { isLoading, isError, data, error, refetch } = useQuery({
    queryKey: ["exam", url],
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
      console.log("data ujian: ", data);
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

  const resetForm = () => {
    setFormData({
      assignment_code: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDownload = (id) => {
    downloadMutation.mutate(id);
  };

  const [file, setFile] = useState();
  function handleChangeFile(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }
  const [search, setSearch] = useState("");

  const mutation = joinExamMahasiswa(getCookie(), formData, refetch);
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
        <h2>Data Ujian</h2>
        {/* <p>{cookies.user ? cookies.user : "no user"}</p>
        {processedData.map((item) => (
          <li key={item.id} style={{ color: item.highlight ? "red" : "black" }}>
            {item.namaUjian}
          </li>
        ))} */}
      </div>
      <div className="search-add-container flex justify-between">
        <div className="search-input-container flex justify-between pr-7 w-full">
          <input
            type="text"
            id="search"
            className="search-input"
            placeholder="Cari Ujian   🔎"
            onChange={(e) => setSearch(e.target.value)}
          />
          <AlertDialog>
            <AlertDialogTrigger
              className="bg-blue-800 p-2 rounded-md text-white hover:bg-blue-900"
              onClick={() => resetForm()}
            >
              Tambah Ujian
            </AlertDialogTrigger>
            <AlertDialogContent>
              <div className="edit-form-group-mahasiswa">
                <label className="!text-black">Kode Ujian :</label>
                <div className="flex items-center gap-2">
                  <input
                    className="text-black"
                    name="assignment_code"
                    value={formData.assignment_code}
                    onChange={handleChange}
                    // readOnly
                  />
                </div>
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel className="bg-red-600 text-white hover:bg-red-800 hover:text-white">
                  Batal
                </AlertDialogCancel>
                <AlertDialogAction
                  className="bg-green-600"
                  // onClick={handleSave}
                  onClick={() => {
                    mutation.mutate();
                  }}
                >
                  Gabung Ujian
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th className="">No</th>
              <th onClick={() => handleSort("namaUjian")}>
                Judul Ujian{" "}
                {sortConfig.key === "namaUjian"
                  ? sortConfig.direction === "ascending"
                    ? "↑"
                    : "↓"
                  : sortConfig.direction === "descending"
                  ? "↓"
                  : "↑"}
              </th>
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
                      onClick={() => handleDownload(item.id)}
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
                  <button className="bg-green-500 text-white p-2 rounded-md">
                    Mulai
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
