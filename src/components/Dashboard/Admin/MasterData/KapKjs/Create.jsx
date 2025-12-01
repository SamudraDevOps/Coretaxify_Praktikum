import React, { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { RoutesApi } from "@/Routes";
import { useCookies } from "react-cookie";
import { RxCross1 } from "react-icons/rx";
import Swal from "sweetalert2";

const initialFormState = {
  kode: "",
  ket_1: "",
  ket_2: "",
};

const TambahKapKjs = ({
  refetch,
  isOpen,
  onClose,
  onSave,
  setOpen
}) => {
  const [formData, setFormData] = useState({  ...initialFormState });
  const [cookies] = useCookies(["user"]);
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};

    if (!formData.name) {
      newErrors.name = "Nama harus diisi";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({  ...errors, [name]: null });
    }
  };

  const handleSave = () => {
    console.log(formData);
    // if (validate()) {
    //   mutation.mutate();
    // }
    mutation.mutate();
  };

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await axios.get(RoutesApi.csrf, {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          Accept: "application/json",
        },
      });

      axios.defaults.headers.common["X-CSRF-TOKEN"] = response.data.token;
      const storeEndpoint = `${RoutesApi.apiUrl}kap-kjs`;
      return await axios.post(storeEndpoint, formData, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-CSRF-TOKEN": response.data.token,
          Authorization: `Bearer ${cookies.token}`,
        },
      });
    },
    onSuccess: () => {
      setFormData({ ...initialFormState });
      Swal.fire({
        title: "Berhasil!",
        text: "KAP-KJS berhasil ditambahan",
        icon: "success",
        timer: 2000, // auto close after 2 seconds
        showConfirmButton: false,
        timerProgressBar: true,
      }).then(() => {
        refetch?.();
        onClose();
      });
    },
    onError: (error) => {
      console.log(error);
      Swal.fire({
        title: "Gagal!",
        text: error.message,
        icon: "error",
        timer: 2000, // auto close after 2 seconds
        showConfirmButton: false,
        timerProgressBar: true,
      });
    },
  })

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
        <h2>Tambah Data KAP-KJS</h2>
        <form>
          <div className="kontrak-form-group">
            <label>Kode</label>
            <input
              type="text"
              name="kode"
              value={formData.kode}
              onChange={handleChange}
            />
            {errors.kode && <span className="error">{errors.kode}</span>}
          </div>
          <div className="kontrak-form-group">
            <label>Keterangan 1</label>
            <input
              type="text"
              name="ket_1"
              value={formData.ket_1}
              onChange={handleChange}
            />
            {errors.ket_1 && <span className="error">{errors.ket_1}</span>}
          </div>
          <div className="kontrak-form-group">
            <label>Keterangan 2</label>
            <input
              type="text"
              name="ket_2"
              value={formData.ket_2}
              onChange={handleChange}
            />
            {errors.ket_2 && <span className="error">{errors.ket_2}</span>}
          </div>
        </form>
        <div className="kontrak-popup-actions">
          <button className="kontrak-save-button" onClick={handleSave}>
            {mutation.status == "pending" ? <p>Loading...</p> : <p>Simpan</p>}
          </button>
          <button className="kontrak-cancel-button" onClick={onClose}>
            Batal
          </button>
        </div>
      </div>
    </div>
  )
}

export default TambahKapKjs;