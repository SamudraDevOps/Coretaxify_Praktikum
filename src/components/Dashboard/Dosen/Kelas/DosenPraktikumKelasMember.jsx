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

export default function DosenPraktikumKelasMember() {
  const [isOpen, setIsOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [selectedData, setSelectedData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [cookies, setCookie] = useCookies(["user"]);
  const [url, setUrl] = useState(RoutesApi.classGroup.url);
  const [filePreview, setFilePreview] = useState(null);

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
            placeholder="Cari Praktikum   🔎"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <AlertDialog>
          <AlertDialogTrigger className="bg-blue-800 p-2 rounded-md text-white hover:bg-blue-900">
            Ikuti Praktikum
          </AlertDialogTrigger>
          <AlertDialogContent className="w-full ">
            <AlertDialogHeader>
              <AlertDialogTitle>Ikuti Praktikum</AlertDialogTitle>
              {/* <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription> */}
            </AlertDialogHeader>
            <div>
              <div className="edit-form-group-mahasiswa ">
                <label>Kode Praktikum:</label>
                <input
                  type="text"
                  name="assignment_code"
                  value={formData.assignment_code}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel>Kembali</AlertDialogCancel>
              <AlertDialogAction onClick={() => mutation.mutate()}>
                Ikuti Praktikum
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
                <td>{item.email}</td>
                <td>
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
