import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { RoutesApi } from "@/Routes";
import { useCookies } from "react-cookie";
import { RxCross1 } from "react-icons/rx";
import Swal from "sweetalert2";

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

const EditBupotObjekPajak = ({
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
    tipe_bupot: "",
    nama_objek_pajak: "",
    jenis_pajak: "",
    kode_objek_pajak: "",
    tarif_pajak: "",
    kap: "",
    persentase_penghasilan_bersih: "",
    sifat_pajak_penghasilan: "",
  });

  useEffect(() => {
    if (isOpen) {
      setFormData({
        tipe_bupot: data.tipe_bupot,
        nama_objek_pajak: data.nama_objek_pajak,
        jenis_pajak: data.jenis_pajak,
        kode_objek_pajak: data.kode_objek_pajak,
        tarif_pajak: data.tarif_pajak,
        kap: data.kap,
        persentase_penghasilan_bersih: data.persentase_penghasilan_bersih,
        sifat_pajak_penghasilan: data.sifat_pajak_penghasilan,
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
      const updateEndpoint = `${RoutesApi.apiUrl}bupot-objek-pajaks/${id}`;
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
        text: "Objek Pajak Bupot berhasil diperbarui",
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
        <h2>Edit Data Objek Pajak Bupot</h2>
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
          </div>
          <div className="kontrak-form-group">
            <label>Nama Objek Pajak</label>
            <input
              type="text"
              name="nama_objek_pajak"
              value={formData.nama_objek_pajak}
              onChange={handleChange}
            />
          </div>
          <div className="kontrak-form-group">
            <label>Jenis Pajak</label>
            <input
              type="text"
              name="jenis_pajak"
              value={formData.jenis_pajak}
              onChange={handleChange}
            />
          </div>
          <div className="kontrak-form-group">
            <label>Kode Objek Pajak</label>
            <input
              type="text"
              name="kode_objek_pajak"
              value={formData.kode_objek_pajak}
              onChange={handleChange}
            />
          </div>
          <div className="kontrak-form-group">
            <label>Tarif Pajak (%)</label>
            <input
              type="text"
              name="tarif_pajak"
              value={formData.tarif_pajak}
              onChange={handleChange}
            />
          </div>
          <div className="kontrak-form-group">
            <label>KAP</label>
            <input
              type="text"
              name="kap"
              value={formData.kap}
              onChange={handleChange}
            />
          </div>
          <div className="kontrak-form-group">
            <label>Persentase Penghasilan Bersih</label>
            <input
              type="text"
              name="persentase_penghasilan_bersih"
              value={formData.persentase_penghasilan_bersih}
              onChange={handleChange}
            />
          </div>
          <div className="kontrak-form-group">
            <label>Sifat Pajak Penghasilan</label>
            <input
              type="text"
              name="sifat_pajak_penghasilan"
              value={formData.sifat_pajak_penghasilan}
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

export default EditBupotObjekPajak;