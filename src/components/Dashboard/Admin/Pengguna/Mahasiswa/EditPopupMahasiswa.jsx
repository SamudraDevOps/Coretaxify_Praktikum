import React, { useState, useEffect } from "react";
import "./editPopupMahasiswa.css";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { RoutesApi } from "@/Routes";
import { useCookies } from "react-cookie";
import IntentEnum from "@/constant/intent";
import Swal from "sweetalert2";
import { RxCross1 } from "react-icons/rx";

const EditPopupMahasiswa = ({ isOpen, onClose, data, onSave }) => {
  const [cookies, setCookie] = useCookies(["user"]);

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
  });

  useEffect(() => {
    if (data) {
      console.log(data);
      setFormData({
        id: data.id || "",
        name: data.name || "",
        email: data.email || "",
      });
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    if (
      formData.name &&
      formData.email
      // formData.kuotaKelas &&
      // formData.status
    ) {
      // onSave({ ...dosen, ...formData });
      mutation.mutate();
      onClose();
    } else {
      alert("Harap isi semua bidang yang wajib!");
    }
  };
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
      const data = await axios.put(
        RoutesApi.url + `api/admin/users/${formData.id}`,
        {
          name: formData.name,
          email: formData.email,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-CSRF-TOKEN": response.data.token,
            Authorization: `Bearer ${cookies.token}`,
          },
          params: {
            intent: IntentEnum.API_USER_CREATE_ADMIN,
          },
        }
      );
      return data;
    },
    onSuccess: (data) => {
      console.log(data);
      // window.location.reload();
      Swal.fire("Berhasil!", "Data Mahasiswa berhasil diubah!", "success").then(
        (result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        }
      );

      // window.location.href = "/" + role;
      // alert("Login successful!");
      // queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  if (!isOpen) return null;

  return (
    <div className="edit-popup-container-dosen">
      <div className="edit-popup-content-dosen">
        <div className="w-full flex justify-end">
          <RxCross1
            className="text-2xl hover:cursor-pointer"
            onClick={onClose}
          />
        </div>
        <div className="edit-popup-header-dosen">
          <h2>Edit Mahasiswa</h2>
        </div>
        <form>
          <div className="edit-form-group-dosen">
            <label>Nama Mahasiswa:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="edit-form-group-dosen">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          {/* <div className="edit-form-group-dosen">
            <label>Kuota Kelas:</label>
            <input
              type="number"
              name="kuotaKelas"
              value={formData.kuotaKelas}
              onChange={handleChange}
              required
            />
          </div>
          <div className="edit-form-group-dosen">
            <label>Kode Registrasi:</label>
            <input
              type="text"
              name="kodeRegistrasi"
              value={formData.kodeRegistrasi}
              onChange={handleChange}
            />
          </div>
          <div className="edit-form-group-dosen">
            <label>Jumlah Siswa:</label>
            <input
              type="number"
              name="jumlahSiswa"
              value={formData.jumlahSiswa}
              onChange={handleChange}
            />
          </div>
          <div className="edit-form-group-dosen">
            <label>Kode Pembelian:</label>
            <input
              type="text"
              name="kodePembelian"
              value={formData.kodePembelian}
              onChange={handleChange}
            />
          </div>
          <div className="edit-form-group-dosen">
            <label>Status:</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="">Pilih Status</option>
              <option value="Active">Active</option>
              <option value="Expired">Expired</option>
            </select>
          </div> */}
        </form>
        <div className="edit-popup-actions-dosen">
          <button className="edit-save-button" onClick={handleSave}>
            Simpan
          </button>
          <button className="edit-cancel-button" onClick={onClose}>
            Batal
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPopupMahasiswa;
