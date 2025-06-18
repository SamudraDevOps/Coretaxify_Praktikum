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

export default function MahasiswaKelas() {
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState(`${RoutesApi.url}api/student/groups`);
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
      console.log(data);
      return data;
    },
  });

  const [formData, setFormData] = useState({
    kodeKelas: "",
    // kodePraktikum: "",
    // supportingFile: null,
    // deadline: "",
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
    setFormData({ ...formData, kodePraktikum: generateRandomCode() });
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
  //   const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const [search, setSearch] = useState("");

  //   const processedData = data.map((item) => ({
  //     ...item,
  //     highlight:
  //       search &&
  //       Object.values(item).some((value) =>
  //         String(value).toLowerCase().includes(search.toLowerCase())
  //       ),
  //   }));
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
      const data = await axios.post(
        RoutesApi.joinClass.url,
        {
          class_code: formData.kodeKelas,
        },

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
          params: {
            intent: RoutesApi.joinClass.intent,
          },
        }
      );
      return data;
    },
    onSuccess: (data) => {
      console.log(data);
      Swal.fire("Berhasil!", "Praktikum berhasil ditambahkan!", "success").then(
        () => {
          refetch();
        }
      );
      // window.location.reload();
      // const role = data.data.user.roles[0].name;
      // setCookie("token", data.data.token, { path: "/" });
      // setCookie("role", role, { path: "/" });

      // alert("Login successful!");
      // queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  console.log(cookies.token);

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
            setFormData({
              kodeKelas: "",
            });
            setIsAddOpen(true);
            // setFormData({ ...formData, kodePraktikum: generateRandomCode() });
          }}
        >
          Gabung Kelas
        </button>
      </div>
      {/* <div className="table-container"> */}
      {/* <table>
          <thead>
            <tr>
              <th>No</th>
              <th onClick={() => handleSort("namaPraktikum ")}>
                Nama Kelas{" "}
                {sortConfig.key === "namaPraktikum"
                  ? sortConfig.direction === "ascending"
                    ? "↑"
                    : "↓"
                  : sortConfig.direction === "descending"
                  ? "↓"
                  : "↑"}
              </th>
              <th>Kode Kelas</th>
              <th>Status</th>
              <th>Nama File</th>
              <th>Tanggal Mulai</th>
              <th>Tanggal Selesai</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 place-items-start">
        {data == undefined || data.data.length == 0 ? (
          <div className="">
            <h1>Anda Belum tergabung dengan kelas manapun.</h1>
            {/* <ClipLoader color="#7502B5" size={50} /> */}
          </div>
        ) : (
          data.data.map((item, index) => (
            <div
              key={item.id}
              className="relative  shadow-lg rounded-lg w-100 md:min-w-96 p-4 cursor-pointer"
              onClick={() => {
                window.location.href = `/mahasiswa/kelas/${item.id}`;
              }}
            >
              <div className="bg-purple-700 text-white p-4 rounded-t-lg w-150">
                <h3 className="font-bold text-lg">{item.name}</h3>
                {/* <p className="text-sm">Pengajar : {item.user.name}</p> */}
              </div>
              <div className="p-4">
                <ul className="text-gray-700 text-sm space-y-2 h-10">
                  <li>
                    <strong className="text-indigo-700">
                      Kode Kelas : {item.class_code}
                    </strong>
                    {/* <p className="text-gray-500 p-4">
                      Tanggal Mulai {item.start_period}
                    </p>
                    <strong className="text-indigo-700">
                      {item.perusahaan}
                    </strong>
                    <p className="text-gray-500 p-4">
                      Deadline {item.end_period}
                    </p> */}
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
                className="absolute bottom-[200px] right-4 w-14 h-14 rounded-full border-2 border-white shadow-md"
              />
            </div>
            // <tr key={item.id}>
            //   <td>{item.id + index + 1}</td>
            //   <td>{item.name}</td>
            //   <td>{item.class_code}</td>
            //   <td>{item.status}</td>
            //   <td>{item.filename}</td>
            //   <td>{item.start_period}</td>
            //   <td>{item.end_period}</td>
            //   <td>
            //     <AlertDialog>
            //       <AlertDialogTrigger className="action-button edit">
            //         Edit
            //       </AlertDialogTrigger>
            //       <AlertDialogContent>
            //         <AlertDialogHeader>
            //           <AlertDialogTitle>Edit Kelas</AlertDialogTitle>
            //           <AlertDialogDescription className="w-full">
            //             <div className="">
            //               <form>
            //                 <div className="edit-form-group-mahasiswa ">
            //                   <label>Nama Praktikum:</label>
            //                   <input
            //                     type="text"
            //                     name="namaPraktikum"
            //                     value={formData.namaPraktikum}
            //                     onChange={handleChange}
            //                     required
            //                   />
            //                 </div>
            //                 <div className="edit-form-group-mahasiswa">
            //                   <label>Kode Praktikum:</label>
            //                   <input
            //                     className="text-black"
            //                     name="kodePraktikum"
            //                     value={formData.kodePraktikum}
            //                     onChange={handleChange}
            //                   />
            //                 </div>
            //                 <div className="edit-form-group-mahasiswa">
            //                   <label>File Support:</label>
            //                   <input
            //                     className="text-black"
            //                     type="file"
            //                     name="supportingFile"
            //                     onChange={handleFileChange}
            //                   />
            //                 </div>
            //                 <div className="edit-form-group-mahasiswa">
            //                   <label>Deadline:</label>
            //                   <input
            //                     className="text-black"
            //                     type="date"
            //                     name="deadline"
            //                     value={formData.deadline}
            //                     onChange={handleChange}
            //                   />
            //                 </div>
            //               </form>
            //             </div>
            //           </AlertDialogDescription>
            //         </AlertDialogHeader>
            //         <AlertDialogFooter>
            //           <AlertDialogCancel className="bg-red-600 text-white">
            //             Kembali
            //           </AlertDialogCancel>
            //           <AlertDialogAction className="bg-green-600 ">
            //             Simpan
            //           </AlertDialogAction>
            //         </AlertDialogFooter>
            //       </AlertDialogContent>
            //     </AlertDialog>

            //     <button
            //       className="action-button delete"
            //       onClick={() => {
            //         Swal.fire({
            //           title: "Hapus Kelas?",
            //           text: "Kelas akan dihapus secara permanen!",
            //           icon: "warning",
            //           showCancelButton: true,
            //           confirmButtonText: "Ya, hapus!",
            //           cancelButtonText: "Batal",
            //           dangerMode: true,
            //         }).then((result) => {
            //           if (result.isConfirmed) {
            //             const newData = data.filter(
            //               (itemData) => itemData.id !== item.id
            //             );
            //             setData(newData);
            //             Swal.fire(
            //               "Berhasil!",
            //               "Kelas berhasil dihapus!",
            //               "success"
            //             );
            //           }
            //         });
            //       }}
            //     >
            //       Delete
            //     </button>
            //   </td>
            // </tr>
          ))
        )}
        {/* </tbody>
        </table> */}
        {/* <div className="pagination-container sticky">
          <div className="pagination-info">
            {`Showing ${indexOfFirstItem + 1} to ${Math.min(
              indexOfLastItem,
              data.length
            )} of ${data.length} entries`}
          </div>

          <div className="pagination ">
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
      </div> */}
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
            <AlertDialogTitle>Ikuti Kelas</AlertDialogTitle>
            <AlertDialogDescription className="w-full">
              <div className="max-h-[70vh] overflow-y-auto">
                <form>
                  <div className="edit-form-group-mahasiswa ">
                    {/* <label>Nama Kelas:</label> */}
                    {/* <input
                      type="text"
                      name="namaPraktikum"
                      value={formData.namaPraktikum}
                      onChange={handleChange}
                      required
                    /> */}
                  </div>
                  <div className="edit-form-group-mahasiswa">
                    <label>Kode Kelas:</label>
                    <div className="flex items-center gap-2">
                      <input
                        className="text-black"
                        name="kodeKelas"
                        value={formData.kodeKelas}
                        onChange={handleChange}
                        // readOnly
                      />
                    </div>
                  </div>
                </form>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-red-600 text-white hover:bg-red-800 hover:text-white">
              Batal
            </AlertDialogCancel>
            <AlertDialogAction className="bg-green-600" onClick={handleSave}>
              Gabung Kelas
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
