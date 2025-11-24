import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { RoutesApi } from "@/Routes";
import { useCookies } from "react-cookie";
import { RxCross1 } from "react-icons/rx";
import Swal from "sweetalert2";

const initialFormState = {
  satuan: "",
  jenis: "",
};

const EditSatuan = ({
  refetch,
  isOpen,
  id,
  onClose,
  onSave,
  setOpen,
  data,
}) => {
  const [cookies] = useCookies(["user"]);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    satuan: "",
    jenis: "",
  });

  useEffect(() => {
    if (isOpen) {
      setFormData({
        satuan: data.satuan,
        jenis: data.jenis,
      });
    }
  }, [isOpen, data]);

  const mutation = useMutation({
    mutationFn: async ({ id }) => {
      const response = await axios.get(RoutesApi.csrf, {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          Accept: "application/json",
        }
      });

      axios.defaults.headers.common["X-CSRF-TOKEN"] = response.data.token;
      const updateEndpoint = `${RoutesApi.apiUrl}satuan/${id}`;
      return await axios.put(
        updateEndpoint,
        formData,
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
    onSuccess: () => {
      Swal.fire({
        title: "Berhasil!",
        text: "Satuan berhasil diperbarui",
        icon: "success",
        timer: 2000, // auto close after 2 seconds
        showConfirmButton: false,
        timerProgressBar: true,
      }).then(() => {
        setFormData({ ...initialFormState });
        refetch?.();
        onClose();
      });
    },
    onError: (error) => {
      Swal.fire({
        title: "Gagal!",
        text: error.message,
        icon: "error",
        timer: 2000, // auto close after 2 seconds
        showConfirmButton: false,
        timerProgressBar: true,
      });
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    mutation.mutate({ id });
  }

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
        <h2>Edit Data Satuan</h2>
        <form>
          <div className="kontrak-form-group">
            <label>Satuan</label>
            <input
              type="text"
              name="satuan"
              value={formData.satuan}
              onChange={handleChange}
            />
          </div>
          <div className="kontrak-form-group">
            <label>Jenis</label>
            <input
              type="text"
              name="jenis"
              value={formData.jenis}
              onChange={handleChange}
            />
          </div>
        </form>
        <div className="kontrak-popup-actions">
          <button
            type="button"
            className="kontrak-save-button"
            onClick={handleSave}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Loading..." : "Simpan"}
          </button>
          <button
            type="button"
            className="kontrak-cancel-button"
            onClick={onClose}
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditSatuan;