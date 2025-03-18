import React, { useState } from "react";
import Swal from "sweetalert2";
import { IoReload } from "react-icons/io5";
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
import { FaFile } from "react-icons/fa";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ClipLoader } from "react-spinners";
import { RoutesApi } from "@/Routes";
import Wulan from "../../../../assets/images/wulan.png";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { HiDotsVertical } from "react-icons/hi";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { RxCross1 } from "react-icons/rx";

export default function DosenKelas() {
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState(RoutesApi.classAdmin);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [selectedData, setSelectedData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [cookies, setCookie] = useCookies(["user"]);
  const [filePreview, setFilePreview] = useState(null);

  const { isLoading, isError, data, error, refetch } = useQuery({
    queryKey: ["kelas_dosen", url],
    queryFn: async () => {
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
          Accept: "application/json",
        },
      });
      // console.log(data);
      return data;
    },
  });

  const [formData, setFormData] = useState({
    namaKelas: "",
    kodeKelas: "",
    status: "",
    file_name: "",
    start_period: "",
    end_period: "",
  });

  const generateRandomCode = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";
    for (let i = 0; i < 5; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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

  const handleSave = () => {
    if (
      !formData.kodeKelas
      // !formData.kodePraktikum ||
      // !formData.deadline
    ) {
      Swal.fire("Error", "Harap isi semua field yang diperlukan!", "error");
      return;
    }

    const newTugas = {
      id: String(data.length + 1),
      namaPraktikum: formData.namaPraktikum,
      kodePraktikum: formData.kodePraktikum,
      supportingFile: formData.supportingFile
        ? formData.supportingFile.name
        : "No file",
      deadline: formData.deadline,
    };

    // setData([...data, newTugas]);
    setIsAddOpen(false);
    // setFormData({
    //   namaPraktikum: "",
    //   kodePraktikum: "",
    //   supportingFile: null,
    //   deadline: "",
    // });
    // setFilePreview(null);
    mutation.mutate();

    // window.location.reload();
  };

  const handleReloadCode = () => {
    console.log("Reload");
    setFormData({ ...formData, kodeKelas: generateRandomCode() });
    // console.log
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

  const handleEditClick = (index) => {
    setSelectedData(data[index]);
    setIsOpen(true);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const [search, setSearch] = useState("");
  const handleEdit = (kelas) => {
    // alert("lapar");
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

  const mutation = useMutation({
    mutationFn: async ({ id, action }) => {
      console.log("button clicked");

      const response = await axios.get(`${RoutesApi.url}api/csrf-token`, {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          Accept: "application/json",
        },
      });

      console.log(response.data.token);
      axios.defaults.headers.common["X-CSRF-TOKEN"] = response.data.token;
      console.log(cookies.token);

      let urlLocal = RoutesApi.classLecturer.url;

      console.log(id, action);

      if (action === "update" && id) {
        urlLocal = `${RoutesApi.classLecturer.url}/${id}`;
        return await axios.put(
          urlLocal,
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
            params: {
              intent: RoutesApi.classLecturer.intent,
            },
          }
        );
      } else if (action === "delete" && id) {
        urlLocal = `${RoutesApi.classLecturer.url}/${id}`;
        return await axios.delete(urlLocal, {
          headers: {
            "X-CSRF-TOKEN": response.data.token,
            Authorization: `Bearer ${cookies.token}`,
          },
        });
      } else {
        return await axios.post(
          urlLocal,
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
            params: {
              intent: RoutesApi.classLecturer.intent,
            },
          }
        );
      }
    },
    onSuccess: (data) => {
      console.log(data);
      Swal.fire("Berhasil!", "Operasi berhasil dilakukan!", "success");
    },
    onError: (error, action) => {
      console.log(action);
      console.log(error.response);
      if (error.response == undefined) {
        Swal.fire("Gagal !", error.message, "error");
        return;
      }

      Swal.fire("Gagal !", error.response.data.message, "error");
    },
  });

  const [isChecked, setIsChecked] = useState(false);

  if (isLoading) {
    return (
      <div className="loading">
        <ClipLoader color="#7502B5" size={50} />
      </div>
    );
  }

  if (isError) {
    {
      console.log(error);
    }
    return (
      <div className="h-screen w-full justify-center items-center flex ">
        <Alert variant="destructive" className="w-1/2 bg-white ">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error !</AlertTitle>
          <div className="">
            <p>{error?.message ?? "error !"}</p>
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

  // if (!data) {
  //   return <h1>No Data</h1>;
  // }
  console.log("fetch");
  console.log(data.data[0]);

  return (
    <div className="kontrak-container">
      <div className="header">
        <h2>Kelas</h2>
      </div>
      <div className="search-add-container">
        <div className="search-input-container">
          <input
            type="text"
            id="search"
            className="search-input"
            placeholder="Cari Kelas                     🔎"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button
          className="bg-blue-800 p-2 rounded-md text-white hover:bg-blue-900"
          onClick={() => {
            setIsAddOpen(true);
            setFormData({ ...formData, kodeKelas: generateRandomCode() });
            setFormData({
              end_period: "",
              start_period: "",
              namaKelas: "",
              kodeKelas: "",
              status: "",
            });
          }}
        >
          Tambah Kelas
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 place-items-start">
        {data == undefined ? (
          <div className="loading">
            <h1>Data Empty !</h1>
            {/* <ClipLoader color="#7502B5" size={50} /> */}
          </div>
        ) : (
          data.data.map((item, index) => (
            <a
              key={item.id}
              className="relative  shadow-lg rounded-lg w-100 md:min-w-96 p-4 cursor-pointer"
              href={`/dosen/kelas/praktikum/${item.id}`}
            >
              <div className="bg-purple-700 flex justify-between text-white p-4 rounded-t-lg w-150 relative">
                <div className="">
                  <h3 className="font-bold text-lg">{item.name}</h3>
                  <p className="text-sm">Pengajar : { }</p>
                </div>

                <AlertDialog
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                  }}
                >
                  <Menubar
                    className="bg-transparent"
                    onClick={(e) => {
                      e.stopPropagation();

                      e.preventDefault();
                    }}
                  >
                    <MenubarMenu className="">
                      <MenubarTrigger
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                        }}
                        className=""
                      >
                        <HiDotsVertical />
                      </MenubarTrigger>
                      <MenubarContent>
                        <MenubarItem>
                          <AlertDialogTrigger
                            onClick={(e) => {
                              handleEdit(item);
                              e.stopPropagation();
                            }}
                            className="text-start w-full"
                          >
                            Edit
                          </AlertDialogTrigger>
                          {/* Edit Kelas */}
                        </MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem
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
                                mutation.mutate({
                                  id: item.id,
                                  action: "delete",
                                });
                              }
                            });
                          }}
                        >
                          Hapus Kelas
                        </MenubarItem>
                      </MenubarContent>
                    </MenubarMenu>
                  </Menubar>
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
                      <AlertDialogTitle>Edit Kelas</AlertDialogTitle>
                      <AlertDialogDescription className="w-full">
                        <div className="">
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
                                className="text-black"
                                name="kodeKelas"
                                value={formData.kodeKelas}
                                onChange={handleChange}
                              />
                            </div>
                            <div className="edit-form-group-mahasiswa ">
                              <label>Tanggal Mulai:</label>
                              <input
                                className="text-black"
                                type="date"
                                name="start_period"
                                value={formData.start_period}
                                onChange={handleChange}
                              />
                            </div>
                            <div className="edit-form-group-mahasiswa">
                              <label>Deadline:</label>
                              <input
                                className="text-black"
                                type="date"
                                name="end_period"
                                value={formData.end_period}
                                onChange={handleChange}
                              />
                            </div>
                            <div className="edit-form-group-mahasiswa">
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
                        onClick={() =>
                          mutation.mutate({ id: item.id, action: "update" })
                        }
                        className="bg-green-600 "
                      >
                        Simpan
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
              <div className="p-4">
                <ul className="text-gray-700 text-sm space-y-2 h-10">
                  <li>
                    <strong className="text-indigo-700">
                      Kode Kelas : {item.class_code}
                    </strong>
                  </li>
                </ul>
              </div>
              <div className="border-t px-4 py-2 flex items-center text-gray-700 text-sm">
                {/* <span className="mr-2">⏳</span> */}
                <p>Waktu pengerjaan :</p>
                <p className="text-gray-500 p-4">{item.start_period}</p>-
                <p className="text-gray-500 p-4"> {item.end_period}</p>
              </div>
              <img
                src={Wulan}
                alt="Icon"
                className="absolute bottom-[120px] right-4 w-14 h-14 rounded-full border-2 border-white shadow-md"
              />
            </a>
          ))
        )}
      </div>
      <div className="pagination-container !static !bg-transparent mt-10 !shadow-none ">
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
      {isOpen && (
        <EditPopupMahasiswa
          onClose={() => setIsOpen(false)}
          data={selectedData}
        />
      )}
      <AlertDialog
        open={isAddOpen}
        onOpenChange={setIsAddOpen}
        className="max-h-[50vh] overflow-y-auto"
      >
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
            <AlertDialogTitle>Tambah Kelas</AlertDialogTitle>
            <AlertDialogDescription className="w-full">
              <div className="max-h-[70vh] overflow-y-auto">
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
                    <div className="flex items-center gap-2">
                      <input
                        className="text-black"
                        name="kodeKelas"
                        value={formData.kodeKelas}
                        onChange={handleChange}
                        readOnly
                      />
                      <button
                        type="button"
                        className="p-3 bg-purple-800 rounded-md hover:bg-purple-900"
                        onClick={handleReloadCode}
                      >
                        <IoReload className="text-lg text-white " />
                      </button>
                    </div>
                  </div>
                  <div className="edit-form-group-mahasiswa">
                    <label>Tanggal Mulai:</label>
                    <input
                      className="text-black"
                      type="date"
                      name="start_period"
                      value={formData.start_period}
                      onChange={handleChange}
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                  <div className="edit-form-group-mahasiswa">
                    <label>Deadline:</label>
                    <input
                      className="text-black"
                      type="date"
                      name="end_period"
                      value={formData.end_period}
                      onChange={handleChange}
                      min={formData.start_period || new Date().toISOString().split("T")[0]} 
                    />
                  </div>
                  <div className="edit-form-group-mahasiswa">
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
                  </div>
                </form>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-red-600 text-white hover:bg-red-800 hover:text-white">
              Batal
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-green-600"
              onClick={() => mutation.mutate(0, "")}
            >
              {mutation.status == "pending" ? <p>Loading...</p> : <>Simpan</>}
            </AlertDialogAction>
          </AlertDialogFooter>
          <div className="text-xs  mt-2 text-red-700">
            {mutation.isError && mutation.error.response?.data.message}
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
