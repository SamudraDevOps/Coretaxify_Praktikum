import React, { useState, useEffect, useRef } from "react";
import { IoReload } from "react-icons/io5";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { RoutesApi } from "@/Routes";
import { CookiesProvider, useCookies } from "react-cookie";
import { RxCross1 } from "react-icons/rx";
import Swal from "sweetalert2";

const initialFormState = {
  name: "",
};

const TambahInstansi = ({ isOpen, onClose, onSave, setOpen, refetch, }) => {
  const [formData, setFormData] = useState({ ...initialFormState });
  const [cookies, setCookie] = useCookies(["user"]);
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};

    if (!formData.name) {
      newErrors.jenisKontrak = "Nama instansi harus diisi";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Reset form when popup is opened
  useEffect(() => {
    if (isOpen) {
      setFormData({ ...initialFormState });
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleSave = () => {
    console.log(formData);
    if (validate()) {
      mutation.mutate();
    }
  };

  const mutation = useMutation({
    mutationFn: async () => {
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
      const data = await axios.post(
        RoutesApi.admin.universities.store().url,
        {
          name: formData.name,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-CSRF-TOKEN": response.data.token,
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );
    },
    onSuccess: (data) => {
      setFormData({ ...initialFormState });
      Swal.fire({
        title: "Berhasil!",
        text: "Instansi berhasil ditambahan",
        icon: "success",
        timer: 2000, // auto close after 2 seconds
        showConfirmButton: false,
        timerProgressBar: true,
      }).then(() => {
        window.location.reload();
      });
    },
    onError: (error) => {
      setFormData({ ...initialFormState });
      Swal.fire({
        title: "Gagal!",
        text: error.message,
        icon: "error",
        timer: 2000, // auto close after 2 seconds
        showConfirmButton: false,
        timerProgressBar: true,
      }).then(() => {
        window.location.reload();
      });
    },
  });

  if (!isOpen) return null;

  return (
    <div className="kontrak-popup-overlay">
      <div className="kontrak-popup-container">
        <div className="w-full flex justify-end">
          <RxCross1
            className="text-2xl hover:cursor-pointer"
            onClick={onClose}
          />
        </div>
        <h2>Tambah Data Instansi</h2>
        <form>
          <div className="kontrak-form-group">
            <label>Nama Instansi</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              // required
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>
        </form>

        <div className="kontrak-popup-actions">
          <button className="kontrak-save-button" onClick={handleSave}>
            {mutation.status == "pending" ? <p>Loading...</p> : <>Simpan</>}
          </button>
          <button className="kontrak-cancel-button" onClick={onClose}>
            Batal
          </button>
        </div>
        <div className="text-xs mt-2 text-red-700">
          {mutation.isError && mutation.error.response.data.message}
        </div>
      </div>
    </div>
  );
};

export default TambahInstansi;
