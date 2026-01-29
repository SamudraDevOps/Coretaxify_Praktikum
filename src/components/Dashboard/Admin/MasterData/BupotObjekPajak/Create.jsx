import React, { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { RoutesApi } from "@/Routes";
import { useCookies } from "react-cookie";
import { RxCross1 } from "react-icons/rx";
import Swal from "sweetalert2";
import Select from "react-select";

const initialFormState = {
  tipe_bupot: "",
  nama_objek_pajak: "",
  jenis_pajak: "",
  kode_objek_pajak: "",
  tarif_pajak: "",
  kap: "",
  persentase_penghasilan_bersih: "",
  sifat_pajak_penghasilan: "",
};

const TambahBupotObjekPajak = ({
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
      const storeEndpoint = `${RoutesApi.apiUrl}bupot-objek-pajaks`;
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
        text: "Objek Pajak Bupot berhasil ditambahan",
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
        <h2>Tambah Data Objek Pajak</h2>
        <form>
          <div className="kontrak-form-group">
            <label>Tipe Bupot</label>      
            <select
              name="tipe_bupot"
              value={formData.tipe_bupot}
              onChange={handleChange}
              placeholder="Please Select"
            >
              <option value="">Please Select</option>
              <option value="BPPU">BPPU</option>
              <option value="BPNR">BPNR</option>
              <option value="Penyetoran Sendiri">Penyetoran Sendiri</option>
              <option value="Pemotongan Secara Digunggung">Pemotongan Secara Digunggung</option>
              <option value="BP 21">BP 21</option>
              <option value="BP 26">BP 26</option>
              <option value="BP A1">BP A1</option>
              <option value="BP A2">BP A2</option>
              <option value="Bukti Pemotongan Bulanan Pegawai Tetap">Bukti Pemotongan Bulanan Pegawai Tetap</option>
              <option value="DSBP">DSBP</option>
            </select>
            {errors.tipe_bupot && <span className="error">{errors.tipe_bupot}</span>}
          </div>
          <div className="kontrak-form-group">
            <label>Nama Objek Pajak</label>
            <input
              type="text"
              name="nama_objek_pajak"
              value={formData.nama_objek_pajak}
              onChange={handleChange}
            />
            {errors.nama_objek_pajak && <span className="error">{errors.nama_objek_pajak}</span>}
          </div>
          <div className="kontrak-form-group">
            <label>Jenis Pajak</label>
            <input
              type="text"
              name="jenis_pajak"
              value={formData.jenis_pajak}
              onChange={handleChange}
            />
            {errors.jenis_pajak && <span className="error">{errors.jenis_pajak}</span>}
          </div>
          <div className="kontrak-form-group">
            <label>Kode Objek Pajak</label>
            <input
              type="text"
              name="kode_objek_pajak"
              value={formData.kode_objek_pajak}
              onChange={handleChange}
            />
            {errors.kode_objek_pajak && <span className="error">{errors.kode_objek_pajak}</span>}
          </div>
          <div className="kontrak-form-group">
            <label>Tarif Pajak (%)</label>
            <input
              type="number"
              name="tarif_pajak"
              value={formData.tarif_pajak}
              onChange={handleChange}
            />
            {errors.tarif_pajak && <span className="error">{errors.tarif_pajak}</span>}
          </div>
          <div className="kontrak-form-group">
            <label>KAP</label>
            <input
              type="text"
              name="kap"
              value={formData.kap}
              onChange={handleChange}
            />
            {errors.kap && <span className="error">{errors.kap}</span>}
          </div>
          <div className="kontrak-form-group">
            <label>Persentase Penghasilan Bersih</label>
            <input
              type="number"
              name="persentase_penghasilan_bersih"
              value={formData.persentase_penghasilan_bersih}
              onChange={handleChange}
            />
            {errors.persentase_penghasilan_bersih && <span className="error">{errors.persentase_penghasilan_bersih}</span>}
          </div>
          <div className="kontrak-form-group">
            <label>Sifat Pajak Penghasilan</label>
            <input
              type="text"
              name="sifat_pajak_penghasilan"
              value={formData.sifat_pajak_penghasilan}
              onChange={handleChange}
            />
            {errors.sifat_pajak_penghasilan && <span className="error">{errors.sifat_pajak_penghasilan}</span>}
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

export default TambahBupotObjekPajak;