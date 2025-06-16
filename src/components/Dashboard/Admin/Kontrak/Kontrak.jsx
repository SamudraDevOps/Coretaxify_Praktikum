import React, { useState } from "react";
import "./kontrak.css";
import TambahKontrak from "./TambahKontrak";
import Swal from "sweetalert2";
import { CookiesProvider, useCookies } from "react-cookie";
import axios from "axios";
import { RoutesApi } from "@/Routes";
import { useQuery, useMutation } from "@tanstack/react-query";
import ClipLoader from "react-spinners/ClipLoader";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { FaRegCopy } from "react-icons/fa";

import EditKontrak from "./EditKontrak";
import { deleteContract, getContracts, testAlert } from "@/hooks/dashboard";
import { getCookie, getCookieToken } from "@/service";

const Kontrak = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [idEdit, setIdEdit] = useState(-1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [cookies, setCookie] = useCookies([]);
  const [url, setUrl] = useState(RoutesApi.contractAdmin);
  const { toast } = useToast();

  const { isLoading, isError, data, error, refetch } = getContracts(
    url,
    getCookieToken()
  );
  const {
    isLoading: isLoadingTask,
    isError: isErrorTask,
    data: taskData,
    error: errorTask,
  } = useQuery({
    queryKey: ["task"],
    queryFn: async () => {
      const { data } = await axios.get(RoutesApi.tasksAdmin, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      });
      console.log(data.data);
      return data;
    },
  });
  const {
    isLoading: isLoadingUni,
    isError: isErrorUni,
    data: dataUni,
    error: errorUni,
  } = useQuery({
    queryKey: ["univerities"],
    queryFn: async () => {
      const { data } = await axios.get(RoutesApi.uniAdmin, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
        params: {
          perPage: 10000,
        },
      });
      console.log(data.data);
      return data.data;
    },
  });

  const mutation = deleteContract(getCookie());

  const handleData = (newData) => {
    // setData([...data, newData]);
    refetch();
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
  // const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  if (isLoading) {
    return (
      <div className="loading">
        <ClipLoader color="#7502B5" size={50} />
      </div>
      // <div className="h-full w-full text-2xl italic font-bold text-center flex items-center justify-center">Loading...</div>
    );
  }
  if (isLoadingUni) {
    return (
      <div className="loading">
        <ClipLoader color="#7502B5" size={50} />
      </div>
      // <div className="h-full w-full text-2xl italic font-bold text-center flex items-center justify-center">Loading...</div>
    );
  }

  if (isError || isErrorTask || isErrorUni) {
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
            {/* <p>{!error.message ? error.message : "Error ! "}</p> */}
            <div className="w-full flex justify-end">
              <button
                className="bg-green-500 p-2 rounded-md text-white"
                onClick={() => refetch()}
              >
                Ulangi
              </button>
            </div>
          </div>
          {/* <AlertDescription>
            {error.message}</AlertDescription> */}
        </Alert>
      </div>
    );
  }
  // if (data == null || data == undefined) {
  //   {
  //     console.log(error);
  //   }
  //   return (
  //     <div className="h-screen w-full justify-center items-center flex ">
  //       <Alert variant="destructive" className="w-1/2 bg-white ">
  //         <AlertCircle className="h-4 w-4" />
  //         <AlertTitle>Error !</AlertTitle>
  //         <div className="">
  //           <p>{error.message}</p>
  //           <div className="w-full flex justify-end">
  //             <button
  //               className="bg-green-500 p-2 rounded-md text-white"
  //               onClick={() => refetch()}
  //             >
  //               Ulangi
  //             </button>
  //           </div>
  //         </div>
  //         {/* <AlertDescription>
  //           {error.message}</AlertDescription> */}
  //       </Alert>
  //     </div>
  //   );
  // }

  return (
    <div className="kontrak-container">
      <div className="header-kontrak ">
        <h2>Data Kontrak Instansi</h2>
        {/* <button onClick={() => testAlert()}>Test</button> */}
        {/* <button
          onClick={() => {
            toast({
              title: "Scheduled: Catch up",
              description: "Friday, February 10, 2023 at 5:57 PM",
            });
          }}
        >
          alert
        </button> */}
      </div>
      <div className="search-add-container">
        <input
          type="text"
          className="search-input"
          placeholder="Cari Data Instansi 🔎"
        />
        <button className="add-button" onClick={() => setIsOpen(true)}>
          + Tambah Data Kontrak
        </button>
      </div>
      <TambahKontrak
        refetch={refetch}
        UniData={dataUni}
        taskData={taskData}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSave={handleData}
        setOpen={setIsOpen}
      />
      <EditKontrak
        refetch={refetch}
        UniData={dataUni}
        isOpen={isOpenEdit}
        taskData={taskData}
        id={idEdit}
        onClose={() => setIsOpenEdit(false)}
        onSave={handleData}
        setEdit={setIdEdit}
      ></EditKontrak>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort("jenisKontrak")}>Jenis Kontrak</th>
              <th onClick={() => handleSort("instansi")}>Instansi</th>
              <th onClick={() => handleSort("mahasiswa")}>Jumlah Mahasiswa</th>
              <th>Periode Awal</th>
              <th>Periode Akhir</th>
              <th>SPT</th>
              <th>Bupot</th>
              <th>Faktur</th>
              <th>Kode Pembelian</th>
              <th>Kolom Soal</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.data.map((item, index) => (
              <tr key={index}>
                <td>{item.contract_type}</td>
                <td>{item.university.name}</td>
                <td>{item.qty_student}</td>
                <td>{item.start_period}</td>
                <td>{item.end_period}</td>
                <td>{item.spt}</td>
                <td>{item.bupot}</td>
                <td>{item.faktur}</td>
                <td className="">
                  <div className="flex justify-center items-center gap-3">
                    {item.contract_code}
                    <FaRegCopy
                      onClick={(e) => {
                        // e.stopPropagation();
                        e.preventDefault();
                        navigator.clipboard.writeText(item.contract_code);
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
                <td>{item.is_buy_task === 1 ? "Ya" : "Tidak"}</td>
                <td>{item.status}</td>
                <td>
                  <button
                    className="action-button"
                    onClick={() => {
                      setIdEdit(item.id);
                      setIsOpenEdit(true);
                    }}
                  >
                    Edit
                  </button>
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
    </div>
  );
};

export default Kontrak;
