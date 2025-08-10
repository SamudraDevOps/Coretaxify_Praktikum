import React, { useState } from "react";
import "./editDosen.css";
import TambahDosen from "./TambahDosen";
import EditPopupDosen from "./EditPopupDosen";
import Swal from "sweetalert2";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { RoutesApi } from "@/Routes";
import { ClipLoader } from "react-spinners";
import { useCookies } from "react-cookie";
import { getCookie, getCookieToken } from "@/service";
import { getContracts } from "@/hooks/dashboard";
import ImportDosen from "./ImportDosen";
import { getCsrf } from "@/service/getCsrf";
import IntentEnum from "@/constant/intent";

const EditDosen = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState(0);
  const [url, setUrl] = useState(RoutesApi.getDosenAdmin.url);
  const [editPopupOpen, setEditPopupOpen] = useState(false);
  const [tambahPopupOpen, setTambahPopupOpen] = useState(false);
  const [selectedDosen, setSelectedDosen] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [currentPage, setCurrentPage] = useState(1);
  const [cookies, setCookie] = useCookies(["user"]);
  const [invalidLecturers, setInvalidLecturers] = useState(null);
  const itemsPerPage = 10;

  const { isLoading, isError, data, error, refetch } = useQuery({
    queryKey: ["dosenadmin", url],
    queryFn: async () => {
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
        params: {
          intent: RoutesApi.getDosenAdmin.intent,
        },
      });
      console.log(data.data);
      return data;
    },
  });
  const {
    isLoading: isLoadingContract,
    isError: isErrorContract,
    data: dataContract,
    error: errorContract,
  } = getContracts(RoutesApi.url + "api/admin/contract", getCookieToken());

  const handleData = (newData) => {
    setData([...data, { id: data.length + 1, ...newData }]);
  };

  const handleEdit = (dosen) => {
    setSelectedDosen(dosen);
    setEditPopupOpen(true);
  };

  const handleUpdateDosen = (updatedDosen) => {
    // setData(
    //   data.map((item) => (item.id === updatedDosen.id ? updatedDosen : item))
    // );
    setEditPopupOpen(false);
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });

    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "ascending" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
    setData(sortedData);
  };

  const mutationCreate = useMutation({
    mutationFn: async ({ lecturers, contract_id }) => {
      console.log("contract", lecturers);
      const csrf = await getCsrf();

      const createPromises = lecturers.map((dosen) => {
        return axios.post(
          RoutesApi.url + "api/admin/users",
          {
            contract_id: contract_id,
            name: dosen.name,
            email: dosen.email,
            status: dosen.status,
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
      });
      // execute all request and return the combined
      return Promise.all(createPromises);
    },
    onError: (error) => {
      console.log(error);
      if (error.response === undefined) {
        Swal.fire("Gagal !", error.message, "error");
        return;
      }
      Swal.fire("Gagal !", error.response.data.message, "error").then((result) => {
        if (result.isConfirmed) {
          refetch();
          // window.location.reload();
        }
      });
    },
    onSuccess: (data) => {
      Swal.fire("Berhasil!", "Dosen berhasil ditambahkan!", "success").then(
        (result) => {
          if (result.isConfirmed) {
            setTambahPopupOpen(false);
            refetch();
          }
        }
      );
    },
  });

  const handleCreateMultipleDosen = (validLecturers, contract_id, invalidLecturers = [], errors = []) => {
    if (!contract_id) {
      Swal.fire("Gagal", "Harap pilih kontrak terlebih dahulu.", "error");
      return;
    }

    Swal.fire({
      title: "Tambah Dosen",
      text: `Anda akan menambahkan ${(validLecturers.length + invalidLecturers.length)} dosen baru. Lanjutkan?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya, lanjutkan",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        mutationCreate.mutate(
          { lecturers: validLecturers, contract_id },
          {
            onSuccess: () => {
              // After successful mutation, check if there were invalid lecturers
              if (invalidLecturers.length > 0) {
                // Keep the invalid lecturers in the form
                // You'll need to pass these back to TambahDosen component
                setTambahPopupOpen(true);
                setInvalidLecturers(invalidLecturers);

                // Show alert about partial success
                Swal.fire({
                  title: "Sebagian Data Berhasil Disimpan",
                  html: `${validLecturers.length} dosen berhasil disimpan.<br><br>
                         ${invalidLecturers.length} dosen gagal disimpan dengan error:<br>
                         ${errors.join('<br>')}`,
                  icon: "warning"
                }).then(() => {
                  refetch();
                })
              } else {
                // All lecturers were valid and saved successfully
                Swal.fire("Berhasil!", "Semua dosen berhasil ditambahkan!", "success").then(() => {
                  setTambahPopupOpen(false);
                  refetch();
                });
              }
            }
          }
        );
      }
    });
  };

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
      const data = await axios.delete(
        RoutesApi.postAdmin.url + `/${id}`,
        // `http://127.0.0.1:8000/api/admin/users/${id}?intent=api.user.create.admin`,

        //   university_id: 1,
        //   contract_type: "LICENSE",
        //   qty_student: 1,
        //   start_period: "2025-02-10",
        //   end_period: "2026-02-10",
        //   spt: 5,
        //   bupot: 5,
        //   faktur: 5,
        //   contract_code: "L-0001"
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-CSRF-TOKEN": response.data.token,
            Authorization: `Bearer ${cookies.token}`,
          },
          // params: {
          //   intent: RoutesApi.postAdmin.intent,
          // },
        }
      );
      return data;
    },
    onSuccess: (data) => {
      console.log(data);
      Swal.fire("Berhasil!", "Data Dosen berhasil dihapus.", "success").then(
        (result) => {
          if (result.isConfirmed) {
            refetch();
            // window.location.reload();
          }
        }
      );
      // const role = data.data.user.roles[0].name;
      // setCookie("token", data.data.token, { path: "/" });
      // setCookie("role", role, { path: "/" });

      // window.location.href = "/" + role;
      // alert("Login successful!");
      // queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error) => {
      console.log(error);
      Swal.fire("Gagal!", "Terjadi kesalahan!", "success").then((result) => {
        if (result.isConfirmed) {
          refetch();
          // window.location.reload();
        }
      });
    },
  });

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <ClipLoader color="#7502B5" size={50} />
      </div>
      // <div className="h-full w-full text-2xl italic font-bold text-center flex items-center justify-center">Loading...</div>
    );
  }
  if (!data) {
    return "Data undefined !";
  }

  return (
    <div className="">
      {mutation.isPending && (
        <div className="fixed inset-0 h-screen flex items-center justify-center bg-slate-600 z-50 bg-opacity-50 ">
          <ClipLoader color="#7502B5" size={50} className="!opacity-100" />
        </div>
      )}
      { }
      <div className="kontrak-container ">
        <div className="header">
          <h2>Data Dosen</h2>
        </div>
        <div className="search-add-container">
          <div className="search-input-container">
            <input
              type="text"
              className="search-input"
              placeholder="Cari Data Dosen 🔎"
            />
          </div>
          {/* <button
            className="add-button mr-3"
            onClick={() => {
              setIsOpen(true);
              setTambahPopupOpen(false);
            }}
          >
            + Import Dosen
          </button> */}
          <button
            className="add-button"
            onClick={() => {
              setTambahPopupOpen(true);
              setIsOpen(false);
              setInvalidLecturers(null);
            }}
          >
            + Tambah Dosen
          </button>
        </div>
        <ImportDosen
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSave={handleData}
        />
        {/* <TambahDosen
          isOpen={tambahPopupOpen}
          onClose={() => setTambahPopupOpen(false)}
          onSave={handleData}
        /> */}
        {tambahPopupOpen && (
          <TambahDosen
            dataContract={dataContract}
            // isMultipleMode={editPopupOpen}
            onClose={() => setTambahPopupOpen(false)}
            dosen={selectedDosen}
            onSave={handleCreateMultipleDosen}
            initialStudents={invalidLecturers}
          // id={id}
          />
        )}
        <EditPopupDosen
          isOpen={editPopupOpen}
          onClose={() => setEditPopupOpen(false)}
          dosen={selectedDosen}
          onSave={handleUpdateDosen}
          refetch={refetch}
        // id={id}
        />
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th onClick={() => handleSort("namaDosen")}>
                  Nama Dosen{" "}
                  {sortConfig.key === "namaDosen"
                    ? sortConfig.direction === "ascending"
                      ? "↑"
                      : "↓"
                    : ""}
                </th>
                <th onClick={() => handleSort("instansi")}>
                  Email{" "}
                  {sortConfig.key === "instansi"
                    ? sortConfig.direction === "ascending"
                      ? "↑"
                      : "↓"
                    : ""}
                </th>
                <th>Instansi</th>
                <th>Tanggal Registrasi</th>
                <th>Default Password</th>
                {/* <th>Kode Registrasi</th>
                <th>Kode Pembelian</th>
                <th>Status</th> */}
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.data.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.instansi}</td>
                  <td>{item.email_verified_at?.slice(0, 10)}</td>
                  <td>{item.default_password}</td>

                  {/* <td>{item.}</td>
                  <td>{item.kodePembelian}</td>
                  <td>{item.status}</td> */}
                  <td>
                    <button
                      className="action-button"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>
                    {/* <button
                      className="action-button delete"
                      onClick={() => {
                        Swal.fire({
                          title: "Hapus Dosen?",
                          text: "Data dosen akan dihapus secara permanen!",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonText: "Ya, hapus!",
                          cancelButtonText: "Batal",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            setId(item.id);
                            mutation.mutate(item.id);
                            // setData(data.filter((d) => d.id !== item.id));
                            // Swal.fire(
                            //   "Berhasil!",
                            //   "Data dosen berhasil dihapus!",
                            //   "success"
                            // );
                          }
                        });
                      }}
                    >
                      Delete
                    </button> */}
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
      </div>
    </div>
  );
};

export default EditDosen;
