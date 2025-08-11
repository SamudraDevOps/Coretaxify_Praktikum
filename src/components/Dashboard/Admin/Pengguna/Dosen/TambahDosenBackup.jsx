import { getContracts } from "@/hooks/dashboard";
import { RoutesApi } from "@/Routes";
import { getCookieToken } from "@/service";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { IoMdDownload } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import Swal from "sweetalert2";
import { ClipLoader } from "react-spinners";

const TambahDosen = ({ isOpen, onClose, onSave }) => {
  const [cookies, setCookie] = useCookies(["user"]);
  const [formData, setFormData] = useState({
    contractId: "",
    name: "",
    email: "",
    // namaDosen: "",
    // instansi: "",
    // kuotaKelas: "",
    // kodeRegistrasi: "",
    // jumlahSiswa: "",
    // status: "",
  });

  const {
    isLoading: isLoadingContract,
    isError: isErrorContract,
    data: dataContract,
    error: errorContract,
  } = getContracts(RoutesApi.url + "api/admin/contract", getCookieToken());

  const mutation = useMutation({
    mutationFn: async () => {
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
        RoutesApi.importDosenAdmin.url,
        // "http://127.0.0.1:8000/api/admin/users?intent=api.user.import.dosen",
        {
          contract_id: formData.contractId,
          name: formData.name,
          email: formData.email,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
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
      // Swal.fire(
      //   "Berhasil!",
      //   "Data dosen berhasil ditambahkan!",
      //   "success"
      // ).then((result) => {
      //   if (result.isConfirmed) {
      //     window.location.reload();
      //   }
      // });
      Swal.fire({
        title: "Berhasil!",
        text: "Data dosen berhasil ditambahkan!",
        icon: "success",
        timer: 2000, // auto close after 2 seconds
        showConfirmButton: false,
        timerProgressBar: true,
      }).then(() => {
        window.location.reload();
      });

      // window.location.href = "/" + role;
      // alert("Login successful!");
      // queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    // onSave(formData);
    console.log(formData.fileDosen);
    mutation.mutate();
    // setFormData({
    //   namaDosen: "",
    //   instansi: "",
    //   kuotaKelas: "",
    //   kodeRegistrasi: "",
    //   jumlahSiswa: "",
    //   status: "",
    // });
    onClose();
  };

  if (!isOpen) return null;
  if (isLoadingContract) {
    return (
      <div className="loading">
        <ClipLoader color="#7502B5" size={50} />
      </div>
      // <div className="h-full w-full text-2xl italic font-bold text-center flex items-center justify-center">Loading...</div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
      <div className="bg-white w-full max-w-3xl rounded-lg shadow-lg p-6">
        <div className="w-full flex justify-end">
          <RxCross1
            className="text-2xl hover:cursor-pointer"
            onClick={onClose}
          />
        </div>
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-xl font-bold text-gray-800">Tambah Data Dosen</h2>
          {/* <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded flex items-center">
            <IoMdDownload className="mr-2" />
            Import
          </button> */}
        </div>
        <div className="overflow-x-auto py-4">
          <label htmlFor="name" className="mr-10 ">
            Nama Dosen :
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border px-2 py-1 rounded my-2"
            required
          />
          <label htmlFor="email" className="mr-10 ">
            Email Dosen :
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border px-2 py-1 rounded my-2"
            required
          />
          <label htmlFor="contractId" className="mr-10 ">
            Kontrak :
          </label>
          <select
            name="contractId"
            value={formData.instansi}
            onChange={handleChange}
            className="w-fit border px-2 py-1 rounded"
            required
          >
            <option value="">Pilih Kontrak</option>
            {dataContract.data.map((item) => (
              <option key={item.id} value={item.id}>
                {item.contract_code + " - " + item.university.name}
              </option>
            ))}
          </select>
          {/* <input
            type="text"
            name="contractId"
            value={formData.contractId}
            onChange={handleChange}
            className="w-full border px-2 py-1 rounded my-2"
            required
          /> */}
          {/* <div className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded flex items-center mt-4">
            <IoMdDownload className="mr-2" />
            <input
              type="file"
              name="fileDosen"
              accept=".xls,.xlsx"
              onChange={(e) =>
                setFormData({ ...formData, fileDosen: e.target.files[0] })
              }
            />
          </div> */}
        </div>
        <div className="flex justify-end mt-4 gap-2">
          <button
            onClick={handleSave}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            Simpan
          </button>
          <button
            onClick={onClose}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
};

export default TambahDosen;
