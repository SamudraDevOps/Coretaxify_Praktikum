import React, { useState } from "react";
import {
  FaCalendarAlt,
  FaFilter,
  FaSearch,
  FaTimes,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import SidebarProfilSayaBadan from "./SidebarProfilSaya";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { useParams } from "react-router";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getCsrf } from "@/service/getCsrf";
import { getCookieToken } from "@/service";
import { RoutesApi } from "@/Routes";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";
import { ClipLoader } from "react-spinners";

const EditDataProfilBadan = ({ data, sidebar }) => {
  const [cookies] = useCookies(["token"]);
  const token = getCookieToken();
  // const { toast } = useToast();
  console.log(data);

  const { id, akun } = useParams();
  const [isPerwakilan, setIsPerwakilan] = useState(false);
  const [showInformasiUmum, setShowInformasiUmum] = useState(false);
  const [showDataEkonomi, setShowDataEkonomi] = useState(false);
  const [showDetailKontak, setShowDetailKontak] = useState(false);
  const [showPihakTerkait, setShowPihakTerkait] = useState(false);
  const [showAlamatWajibPajak, setShowAlamatWajibPajak] = useState(false);
  const [showTempatKegiatanUsaha, setShowTempatKegiatanUsaha] = useState(false);
  const [showDetailBank, setShowDetailBank] = useState(false);
  const [showNomorIdentifikasiEksternal, setShowNomorIdentifikasiEksternal] =
    useState(false);
  const [contacts, setContacts] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [isKaryawan, setIsKaryawan] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [selectedRelatedPersonType, setSelectedRelatedPersonType] =
    useState("");

  const [informasiUmumData, setInformasiUmumData] = useState({
    npwp: data.field_edit_informasi.informasi_umum.npwp,
    jenis_wajib_pajak:
      data.field_edit_informasi.informasi_umum.jenis_wajib_pajak,
    nama: data.field_edit_informasi.informasi_umum.nama,
    kategori_wajib_pajak:
      data?.field_edit_informasi?.informasi_umum?.kategori_wajib_pajak ||
      "Perseroan Terbatas (PT)",
    negara_asal:
      data?.field_edit_informasi?.informasi_umum?.negara_asal || "Indonesia",
    nomor_keputusan_pengesahan:
      data?.field_edit_informasi?.informasi_umum?.nomor_keputusan_pengesahan ||
      "",
    tanggal_keputusan_pengesahan:
      data?.field_edit_informasi?.informasi_umum
        ?.tanggal_keputusan_pengesahan || "",
    nomor_keputusan_pengesahan_perubahan:
      data?.field_edit_informasi?.informasi_umum
        ?.nomor_keputusan_pengesahan_perubahan || "",
    tanggal_surat_keputusan_perubahan_pengesahan:
      data?.field_edit_informasi?.informasi_umum
        ?.tanggal_surat_keputusan_perubahan_pengesahan || "",
    nomor_akta_pendirian:
      data?.field_edit_informasi?.informasi_umum?.nomor_akta_pendirian || "",
    tempat_pendirian:
      data?.field_edit_informasi?.informasi_umum?.tempat_pendirian || "",
    tanggal_pendirian:
      data?.field_edit_informasi?.informasi_umum?.tanggal_pendirian || "",
    nik_notaris: data?.field_edit_informasi?.informasi_umum?.nik_notaris || "",
    nama_notaris:
      data?.field_edit_informasi?.informasi_umum?.nama_notaris || "",
    fasilitas_pmdn:
      data?.field_edit_informasi?.informasi_umum?.fasilitas_pmdn ||
      "Swasta Nasional",
    modal_dasar: data?.field_edit_informasi?.informasi_umum?.modal_dasar || "",
    modal_ditempatkan:
      data?.field_edit_informasi?.informasi_umum?.modal_ditempatkan || "",
    modal_disetor:
      data?.field_edit_informasi?.informasi_umum?.modal_disetor || "",
    kewarganegaraan:
      data?.field_edit_informasi?.informasi_umum?.kewarganegaraan || "WNI",
    bahasa:
      data?.field_edit_informasi?.informasi_umum?.bahasa || "Bahasa Indonesia",
  });

  const {
    data: orangTerkait,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["orang_terkait"],
    queryFn: async () => {
      const data = await axios.get(
        RoutesApi.apiUrl + `student/assignments/${id}/sistem/${akun}`,
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
          params: {
            intent: "api.sistem.get.akun.orang.pibadi",
          },
        }
      );
      // console.log(data.data);
      return data.data;
    },
  });
  const [formOrangTerkait, setFormOrangTerkait] = useState({
    // jenis_orang_terkait: "",
    sub_orang_terkait: "",
    kewarganegaraan: "Indonesia",
    negara_asal: "Indonesia",
    keterangan: "keterangan",
    akun_op: "",
    tanggal_mulai: "",
    tanggal_berakhir: "",
  });
  const handlePersonTypeChange = (e) => {
    console.log("AA");
    const { name, value } = e.target;
    console.log(name, value);
    setFormOrangTerkait((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const createPihakTerkait = useMutation({
    mutationFn: async (data) => {
      const csrf = await getCsrf();
      return axios.post(
        `${RoutesApi.url}api/student/assignments/${id}/sistem/${akun}/pihak-terkait`,
        formOrangTerkait,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-CSRF-TOKEN": csrf,
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );
    },
    onSuccess: (data) => {
      console.log(data);
      Swal.fire(
        "Berhasil!",
        "Data informasi umum berhasil disimpan!",
        "success"
      ).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    },
    onError: (error) => {
      console.error("Error saving data:", error);
      Swal.fire("Gagal!", "Terjadi kesalahan saat menyimpan data.", "error");
    },
  });

  const handleInformasiUmumChange = (e) => {
    const { name, value } = e.target;
    setInformasiUmumData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const updateInformasiUmum = useMutation({
    mutationFn: async (data) => {
      const csrf = await getCsrf();
      return axios.put(
        `${RoutesApi.url}api/student/assignments/${id}/sistem/${akun}/informasi-umum/${akun}`,
        informasiUmumData,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-CSRF-TOKEN": csrf,
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );
    },
    onSuccess: (data) => {
      console.log(data);
      Swal.fire(
        "Berhasil!",
        "Data informasi umum berhasil disimpan!",
        "success"
      );
    },
    onError: (error) => {
      console.error("Error saving data:", error);
      Swal.fire("Gagal!", "Terjadi kesalahan saat menyimpan data.", "error");
    },
  });
  const [contactFormData, setContactFormData] = useState({
    jenis_kontak: "",
    nomor_telpon: "",
    nomor_handphone: "",
    nomor_faksimile: "",
    alamat_email: "",
    alamat_situs_wajib: "",
    keterangan: "",
    tanggal_mulai: "",
    tanggal_berakhir: "",
  });
  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const createContact = useMutation({
    mutationFn: async () => {
      const csrf = await getCsrf();
      return axios.post(
        `${RoutesApi.url}api/student/assignments/${id}/sistem/${akun}/detail-kontak`,
        contactFormData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
            "X-CSRF-TOKEN": csrf,
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: (data) => {
      console.log(data);
      Swal.fire(
        "Berhasil!",
        "Data detail kontak berhasil disimpan!",
        "success"
      ).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    },
    onError: (error) => {
      console.error("Error saving data:", error);
      Swal.fire("Gagal!", "Terjadi kesalahan saat menyimpan data.", "error");
    },
  });
  const updateContact = useMutation({
    mutationFn: async (contact_id) => {
      const csrf = await getCsrf();

      return axios.put(
        `${RoutesApi.url}api/student/assignments/${id}/sistem/${akun}/detail-kontak/${contact_id}`,
        contactFormData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
            "X-CSRF-TOKEN": csrf,
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: (data) => {
      console.log(data);
      Swal.fire(
        "Berhasil!",
        "Data detail kontak berhasil diubah!",
        "success"
      ).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    },
    onError: (error) => {
      console.error("Error saving data:", error);
      Swal.fire("Gagal!", "Terjadi kesalahan saat menyimpan data.", "error");
    },
  });
  const deleteContact = useMutation({
    mutationFn: async (contact_id) => {
      const csrf = await getCsrf();
      return axios.delete(
        `${RoutesApi.url}api/student/assignments/${id}/sistem/${akun}/detail-kontak/${contact_id}`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
            "X-CSRF-TOKEN": csrf,
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: (data) => {
      console.log(data);
      Swal.fire(
        "Berhasil!",
        "Data detail kontak berhasil dihapus!",
        "success"
      ).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    },
    onError: (error) => {
      console.error("Error saving data:", error);
      Swal.fire("Gagal!", "Terjadi kesalahan saat menyimpan data.", "error");
    },
  });
  if (isLoading) {
    return (
      <div className="loading">
        <ClipLoader color="#7502B5" size={50} />
      </div>
      // <div className="h-full w-full text-2xl italic font-bold text-center flex items-center justify-center">Loading...</div>
    );
  }
  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarProfilSayaBadan
        nama_akun={sidebar.nama_akun}
        npwp_akun={sidebar.npwp_akun}
        akun={{ id, akun }}
      />
      <div className="flex-grow p-6 bg-white  h-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Pembaruan Data Wajib Pajak
        </h2>
        <div className="border rounded-md p-4 mb-4">
          <h3 className="text-lg font-semibold mb-3">Manajemen Kasus</h3>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            <div>
              <label className="block font-medium text-gray-700">Kanal</label>
              <select className="w-full p-2 border rounded-md bg-gray-100 text-gray-600">
                <option>Daring (Portal Wajib Pajak)</option>
              </select>
            </div>
            <div>
              <label className="block font-medium text-gray-700">
                Tanggal Permohonan
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value="27-02-2025"
                  readOnly
                  className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                />
                <button className="p-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">
                  <FaCalendarAlt />
                </button>
                <button className="p-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                  <FaFilter />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="border rounded-md p-4 mb-4">
          <h3 className="text-lg font-semibold mb-3">Kuasa Wajib Pajak</h3>
          <div className="flex items-center gap-2 mb-3">
            <input
              type="checkbox"
              className="h-5 w-5"
              onChange={() => setIsPerwakilan(!isPerwakilan)}
            />
            <label className="text-gray-700">
              Diisi oleh perwakilan Wajib Pajak?
            </label>
          </div>
          <div
            className={`grid grid-cols-1 md:grid-cols-1 gap-4  ${
              !isPerwakilan && "opacity-50 pointer-events-none"
            }`}
          >
            <div>
              <label className="block font-medium text-gray-700">
                ID Penunjukan Perwakilan
              </label>
              <div className="flex items-center gap-2">
                <select className="w-full p-2 border rounded-md bg-gray-100 text-gray-600">
                  <option>Silakan pilih</option>
                </select>
                <button className="p-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">
                  <FaSearch />
                </button>
                <button className="p-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                  <FaTimes />
                </button>
              </div>
            </div>
            <div className="col-span-2">
              <label className="block font-medium text-gray-700">
                NIK/NPWP Perwakilan
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                readOnly
              />
            </div>
            <div className="col-span-2">
              <label className="block font-medium text-gray-700">
                Nama Wakil/Kuasa
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                readOnly
              />
            </div>
          </div>
        </div>
        <div
          className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100"
          onClick={() => setShowInformasiUmum(!showInformasiUmum)}
        >
          <h3 className="text-lg font-semibold">Informasi Umum</h3>
          {showInformasiUmum ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {showInformasiUmum && (
          <div className="border rounded-md p-4 mb-4">
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
              <div>
                <label className="block font-medium text-gray-700">NPWP</label>
                <input
                  type="text"
                  name="npwp"
                  value={informasiUmumData.npwp}
                  className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                  readOnly
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700">
                  Jenis Wajib Pajak
                </label>
                <select
                  name="jenis_wajib_pajak"
                  value={informasiUmumData.jenis_wajib_pajak}
                  onChange={handleInformasiUmumChange}
                  className="w-full p-2 border rounded-md bg-white text-gray-600"
                >
                  <option>Orang Pribadi</option>
                  <option>Badan</option>
                </select>
              </div>
              <div>
                <label className="block font-medium text-gray-700">Nama</label>
                <input
                  type="text"
                  name="nama"
                  value={informasiUmumData.nama}
                  className="w-full p-2 border rounded-md bg-gray-100 text-gray-600 cursor-not-allowed"
                  readOnly
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700">
                  Kategori Wajib Pajak
                </label>
                <select
                  name="kategori_wajib_pajak"
                  value={informasiUmumData.kategori_wajib_pajak}
                  onChange={handleInformasiUmumChange}
                  className="w-full p-2 border rounded-md bg-white text-gray-600"
                >
                  <option>Perseroan Terbatas (PT)</option>
                  <option>Perorangan</option>
                </select>
              </div>
              <div>
                <label className="block font-medium text-gray-700">
                  Negara Asal
                </label>
                <select
                  name="negara_asal"
                  value={informasiUmumData.negara_asal}
                  onChange={handleInformasiUmumChange}
                  className="w-full p-2 border rounded-md bg-white text-gray-600"
                >
                  <option>Indonesia</option>
                  <option>Malaysia</option>
                </select>
              </div>
              <div>
                <label className="block font-medium text-gray-700">
                  Nomor Keputusan Pengesahan
                </label>
                <input
                  type="text"
                  name="nomor_keputusan_pengesahan"
                  value={informasiUmumData.nomor_keputusan_pengesahan}
                  onChange={handleInformasiUmumChange}
                  className="w-full p-2 border rounded-md bg-white text-gray-600"
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700">
                  Tanggal Keputusan Pengesahan
                </label>
                <input
                  type="date"
                  name="tanggal_keputusan_pengesahan"
                  value={informasiUmumData.tanggal_keputusan_pengesahan}
                  onChange={handleInformasiUmumChange}
                  className="w-full p-2 border rounded-md bg-white text-gray-600"
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700">
                  Nomor Keputusan Pengesahan Perubahan
                </label>
                <input
                  type="text"
                  name="nomor_keputusan_pengesahan_perubahan"
                  value={informasiUmumData.nomor_keputusan_pengesahan_perubahan}
                  onChange={handleInformasiUmumChange}
                  className="w-full p-2 border rounded-md bg-white text-gray-600"
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700">
                  Tanggal Surat Keputusan Perubahan Pengesahan
                </label>
                <input
                  type="date"
                  name="tanggal_surat_keputusan_perubahan_pengesahan"
                  value={
                    informasiUmumData.tanggal_surat_keputusan_perubahan_pengesahan
                  }
                  onChange={handleInformasiUmumChange}
                  className="w-full p-2 border rounded-md bg-white text-gray-600"
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700">
                  Nomor Akta Pendirian
                </label>
                <input
                  type="text"
                  name="nomor_akta_pendirian"
                  value={informasiUmumData.nomor_akta_pendirian}
                  onChange={handleInformasiUmumChange}
                  className="w-full p-2 border rounded-md bg-white text-gray-600"
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700">
                  Tempat Pendirian
                </label>
                <input
                  type="text"
                  name="tempat_pendirian"
                  value={informasiUmumData.tempat_pendirian}
                  onChange={handleInformasiUmumChange}
                  className="w-full p-2 border rounded-md bg-white text-gray-600"
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700">
                  Tanggal Pendirian
                </label>
                <input
                  type="date"
                  name="tanggal_pendirian"
                  value={informasiUmumData.tanggal_pendirian}
                  onChange={handleInformasiUmumChange}
                  className="w-full p-2 border rounded-md bg-white text-gray-600"
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700">
                  NIK Notaris
                </label>
                <input
                  type="text"
                  name="nik_notaris"
                  value={informasiUmumData.nik_notaris}
                  onChange={handleInformasiUmumChange}
                  className="w-full p-2 border rounded-md bg-white text-gray-600"
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700">
                  Nama Notaris
                </label>
                <input
                  type="text"
                  name="nama_notaris"
                  value={informasiUmumData.nama_notaris}
                  onChange={handleInformasiUmumChange}
                  className="w-full p-2 border rounded-md bg-white text-gray-600"
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700">
                  Fasilitas PMDN
                </label>
                <select
                  name="fasilitas_pmdn"
                  value={informasiUmumData.fasilitas_pmdn}
                  onChange={handleInformasiUmumChange}
                  className="w-full p-2 border rounded-md bg-white text-gray-600"
                >
                  <option>Swasta Nasional</option>
                  <option>Fasilitas PMDN</option>
                  <option>BUMN</option>
                  <option>BUMD</option>
                  <option>Penanaman Modal Asing (PMA)</option>
                </select>
              </div>
              <div>
                <label className="block font-medium text-gray-700">
                  Modal Dasar
                </label>
                <input
                  type="number"
                  name="modal_dasar"
                  value={informasiUmumData.modal_dasar}
                  onChange={handleInformasiUmumChange}
                  className="w-full p-2 border rounded-md bg-white text-gray-600"
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700">
                  Modal Ditempatkan
                </label>
                <input
                  type="number"
                  name="modal_ditempatkan"
                  value={informasiUmumData.modal_ditempatkan}
                  onChange={handleInformasiUmumChange}
                  className="w-full p-2 border rounded-md bg-white text-gray-600"
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700">
                  Modal Disetor
                </label>
                <input
                  type="number"
                  name="modal_disetor"
                  value={informasiUmumData.modal_disetor}
                  onChange={handleInformasiUmumChange}
                  className="w-full p-2 border rounded-md bg-white text-gray-600"
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700">
                  Kewarganegaraan
                </label>
                <select
                  name="kewarganegaraan"
                  value={informasiUmumData.kewarganegaraan}
                  onChange={handleInformasiUmumChange}
                  className="w-full p-2 border rounded-md bg-white text-gray-600"
                >
                  <option>WNI</option>
                  <option>WNA</option>
                </select>
              </div>
              <div>
                <label className="block font-medium text-gray-700">
                  Bahasa Yang Dipilih
                </label>
                <input
                  type="text"
                  name="bahasa_yang_dipilih"
                  value={informasiUmumData.bahasa_yang_dipilih}
                  className="w-full p-2 border rounded-md bg-gray-100 cursor-not-allowed text-gray-600"
                  readOnly
                />
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                onClick={() => updateInformasiUmum.mutate()}
              >
                Simpan a
              </button>
            </div>
          </div>
        )}
        <div
          className="border rounded-md p-4 bg-gray-100 mb-2 cursor-pointer flex justify-between items-center"
          onClick={() => setShowDataEkonomi(!showDataEkonomi)}
        >
          <h3 className="text-lg font-semibold">Data Ekonomi</h3>
          {showDataEkonomi ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {showDataEkonomi && (
          <div className="border rounded-md p-4 mb-4">
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
              <div>
                <label className="block font-medium text-gray-700">
                  Merk Dagang/Bisnis
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md bg-white text-gray-600"
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700">
                  Memiliki Karyawan?
                </label>
                <input
                  type="checkbox"
                  className="h-5 w-5"
                  onChange={() => setIsKaryawan(!isKaryawan)}
                />
                {isKaryawan && (
                  <select className="w-full p-2 border rounded-md bg-white text-gray-600 mt-2">
                    <option>Jumlah Karyawan</option>
                    <option value="1-5">dibawah 10</option>
                    <option value="10-100">10 sd 100</option>
                    <option value="101-1000">101 sd 1000</option>
                    <option value="1000+">diatas 1000</option>
                  </select>
                )}
              </div>
              <div>
                <label className="block font-medium text-gray-700">
                  Metode Pembukuan/Pencatatan
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md bg-white text-gray-600"
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700">
                  Mata Uang Pembukuan
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md bg-white text-gray-600"
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700">
                  Periode Pembukuan
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md bg-white text-gray-600"
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700">
                  Omset Per Tahun
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md bg-white text-gray-600"
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700">
                  Jumlah Peredaran Bruto
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md bg-white text-gray-600"
                />
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
                Simpan
              </button>
            </div>
          </div>
        )}
        <div
          className="border bg-gray-100 rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center"
          onClick={() => setShowDetailKontak(!showDetailKontak)}
        >
          <h3 className="text-lg font-semibold">Detail Kontak</h3>
          {showDetailKontak ? <FaChevronUp /> : <FaChevronDown />}
        </div>

        {showDetailKontak && (
          <div className="border rounded-md p-4 mb-4">
            <div className="flex justify-between items-center mb-4">
              <AlertDialog>
                <AlertDialogTrigger className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">
                  + Tambah Kontak
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-white !min-w-[1000px] rounded-lg shadow-lg ">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-xl font-bold">
                      Tambahkan Kontak Wajib Pajak
                    </AlertDialogTitle>
                  </AlertDialogHeader>
                  <div className="grid gap-4 overflow-auto h-96">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Jenis Kontak
                      </label>
                      <select
                        className="w-full p-2 border rounded-md bg-white mt-1"
                        name="jenis_kontak"
                        onChange={handleContactChange}
                      >
                        <option value="kontak-alternatif-wajib-pajak">
                          Kontak Alternatif Wajib Pajak
                        </option>
                        <option value="kontak-utama-wajib-pajak">
                          Kontak Utama Wajib Pajak
                        </option>
                        <option value="kontak-orang-alternatif">
                          Kontak Orang Alternatif
                        </option>
                        <option value="kontak-orang-utama">
                          Kontak Orang Utama
                        </option>
                        <option value="kontak-teknis-wajib-pajak">
                          Kontak Teknis Wajib Pajak
                        </option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Nomor Telepon
                      </label>
                      <input
                        type="text"
                        name="nomor_telpon"
                        className="w-full p-2 border rounded-md bg-white mt-1"
                        placeholder="Masukkan nomor telepon"
                        onChange={handleContactChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">
                        Nomor Handphone Baru
                      </label>
                      <input
                        type="text"
                        name="nomor_handphone"
                        className="w-full p-2 border rounded"
                        onChange={handleContactChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">
                        Nomor Faksimile
                      </label>
                      <input
                        type="text"
                        name="nomor_faksimile"
                        className="w-full p-2 border rounded"
                        onChange={handleContactChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">
                        Alamat Email
                      </label>
                      <input
                        type="text"
                        name="alamat_email"
                        className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed"
                        onChange={handleContactChange}
                        // disabled
                      />
                      {/* Ngelink dari upload awal akun */}
                    </div>
                    <div>
                      <label className="block text-sm font-medium">
                        Website
                      </label>
                      <input
                        type="text"
                        name="alamat_situs_wajib"
                        className="w-full p-2 border rounded"
                        onChange={handleContactChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">
                        Keterangan
                      </label>
                      <textarea
                        name="keterangan"
                        className="w-full p-2 border rounded"
                        onChange={handleContactChange}
                      ></textarea>
                    </div>
                    <div>
                      <label className="block text-sm font-medium">
                        Tanggal Mulai
                      </label>
                      <input
                        type="date"
                        name="tanggal_mulai"
                        className="w-full p-2 border rounded"
                        onChange={handleContactChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">
                        Tanggal Berakhir
                      </label>
                      <input
                        type="date"
                        name="tanggal_berakhir"
                        className="w-full p-2 border rounded"
                        onChange={handleContactChange}
                      />
                    </div>
                  </div>

                  <AlertDialogFooter className="flex justify-end mt-6 space-x-2">
                    <AlertDialogCancel className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">
                      Batal
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => createContact.mutate()}
                      // onClick={()=>console.log(contactFormData)}
                      className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-950"
                    >
                      Simpan
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>

            <div className="w-[1050px] overflow-x-auto bg-white shadow-md rounded-lg overflow-hidden">
              <table className="table-auto border border-gray-300 w-full">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-6 py-2 border">Aksi</th>
                    <th className="px-8 py-2 border">Jenis Kontak</th>
                    <th className="px-4 py-2 border">Nomor Telepon</th>
                    <th className="px-4 py-2 border">Nomor Handphone</th>
                    <th className="px-4 py-2 border">Nomor Faksimile</th>
                    <th className="px-4 py-2 border">Alamat Email</th>
                    <th className="px-4 py-2 border">Alamat Situs Web</th>
                    <th className="px-4 py-2 border">Keterangan</th>
                    <th className="px-4 py-2 border">Tanggal Mulai</th>
                    <th className="px-4 py-2 border">Tanggal Berakhir</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600">
                  {data.field_edit_informasi.detail_kontak.length === 0 ? (
                    <tr>
                      <td colSpan="10" className="text-center p-4 border">
                        Belum ada kontak
                      </td>
                    </tr>
                  ) : (
                    data.field_edit_informasi.detail_kontak.map(
                      (contact, index) => (
                        <tr key={index} className="bg-gray-100">
                          <td className="px-4 py-4 border flex gap-2">
                            {/* <button>Edit</button> */}
                            <AlertDialog>
                              <AlertDialogTrigger
                                onClick={() => setContactFormData(contact)}
                                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
                              >
                                Ubah Kontak
                              </AlertDialogTrigger>
                              <AlertDialogContent className="bg-white !min-w-[1000px] rounded-lg shadow-lg ">
                                <AlertDialogHeader>
                                  <AlertDialogTitle className="text-xl font-bold">
                                    Ubah Kontak Wajib Pajak
                                  </AlertDialogTitle>
                                </AlertDialogHeader>
                                <div className="grid gap-4 overflow-auto h-96">
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                      Jenis Kontak
                                    </label>
                                    <select
                                      className="w-full p-2 border rounded-md bg-white mt-1"
                                      name="jenis_kontak"
                                      value={contactFormData.jenis_kontak || ""}
                                      onChange={handleContactChange}
                                    >
                                      <option value="kontak-alternatif-wajib-pajak">
                                        Kontak Alternatif Wajib Pajak
                                      </option>
                                      <option value="kontak-utama-wajib-pajak">
                                        Kontak Utama Wajib Pajak
                                      </option>
                                      <option value="kontak-orang-alternatif">
                                        Kontak Orang Alternatif
                                      </option>
                                      <option value="kontak-orang-utama">
                                        Kontak Orang Utama
                                      </option>
                                      <option value="kontak-teknis-wajib-pajak">
                                        Kontak Teknis Wajib Pajak
                                      </option>
                                    </select>
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                      Nomor Telepon
                                    </label>
                                    <input
                                      type="text"
                                      name="nomor_telpon"
                                      className="w-full p-2 border rounded-md bg-white mt-1"
                                      placeholder="Masukkan nomor telepon"
                                      value={contactFormData.nomor_telpon || ""}
                                      onChange={handleContactChange}
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium">
                                      Nomor Handphone Baru
                                    </label>
                                    <input
                                      type="text"
                                      name="nomor_handphone"
                                      className="w-full p-2 border rounded"
                                      value={
                                        contactFormData.nomor_handphone || ""
                                      }
                                      onChange={handleContactChange}
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium">
                                      Nomor Faksimile
                                    </label>
                                    <input
                                      type="text"
                                      name="nomor_faksimile"
                                      className="w-full p-2 border rounded"
                                      value={
                                        contactFormData.nomor_faksimile || ""
                                      }
                                      onChange={handleContactChange}
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium">
                                      Alamat Email
                                    </label>
                                    <input
                                      type="text"
                                      name="alamat_email"
                                      className="w-full p-2 border rounded bg-gray-100"
                                      value={contactFormData.alamat_email || ""}
                                      onChange={handleContactChange}
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium">
                                      Website
                                    </label>
                                    <input
                                      type="text"
                                      name="alamat_situs_wajib"
                                      className="w-full p-2 border rounded"
                                      value={
                                        contactFormData.alamat_situs_wajib || ""
                                      }
                                      onChange={handleContactChange}
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium">
                                      Keterangan
                                    </label>
                                    <textarea
                                      name="keterangan"
                                      className="w-full p-2 border rounded"
                                      value={contactFormData.keterangan || ""}
                                      onChange={handleContactChange}
                                    ></textarea>
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium">
                                      Tanggal Mulai
                                    </label>
                                    <input
                                      type="date"
                                      name="tanggal_mulai"
                                      className="w-full p-2 border rounded"
                                      value={
                                        contactFormData.tanggal_mulai || ""
                                      }
                                      onChange={handleContactChange}
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium">
                                      Tanggal Berakhir
                                    </label>
                                    <input
                                      type="date"
                                      name="tanggal_berakhir"
                                      className="w-full p-2 border rounded"
                                      value={
                                        contactFormData.tanggal_berakhir || ""
                                      }
                                      onChange={handleContactChange}
                                    />
                                  </div>
                                </div>

                                <AlertDialogFooter className="flex justify-end mt-6 space-x-2">
                                  <AlertDialogCancel className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">
                                    Batal
                                  </AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() =>
                                      updateContact.mutate(contact.id)
                                    }
                                    // onClick={()=>console.log(contactFormData)}
                                    className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-950"
                                  >
                                    Simpan
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
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
                                    deleteContact.mutate(contact.id);
                                  }
                                });
                              }}
                            >
                              {deleteContact.status == "pending" ? (
                                <p>Loading...</p>
                              ) : (
                                <>Delete</>
                              )}
                            </button>
                          </td>
                          <td className="px-2 py-4 border">
                            {contact.jenis_kontak}
                          </td>
                          <td className="px-4 py-4 border">
                            {contact.nomor_telpon}
                          </td>
                          <td className="px-4 py-4 border">
                            {contact.nomor_handphone}
                          </td>
                          <td className="px-4 py-4 border">
                            {contact.nomor_faksimile}
                          </td>
                          <td className="px-4 py-4 border">
                            {contact.alamat_email}
                          </td>
                          <td className="px-4 py-4 border">
                            {contact.alamat_situs_wajib}
                          </td>
                          <td className="px-4 py-4 border">
                            {contact.keterangan}
                          </td>
                          <td className="px-4 py-4 border">
                            {contact.tanggal_mulai}
                          </td>
                          <td className="px-4 py-4 border">
                            {contact.tanggal_berakhir}
                          </td>
                        </tr>
                      )
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
        <div
          className="border rounded-md p-4 bg-gray-100 mb-2 cursor-pointer flex justify-between items-center"
          onClick={() => setShowPihakTerkait(!showPihakTerkait)}
        >
          <h3 className="text-lg font-semibold">Pihak Terkait</h3>
          {showPihakTerkait ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {showPihakTerkait && (
          <div className="border rounded-md p-4 mb-4 ">
            <div className="flex justify-between items-center mb-4">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-2 rounded"
                onClick={openModal}
              >
                + Tambah
              </button>
            </div>
            <div className=" w-[1050px] overflow-x-auto bg-white shadow-md rounded-lg overflow-hidden ">
              <table className="table-auto border border-gray-300 overflow-hidden">
                <thead className="bg-gray-200 w-[100px]">
                  <tr>
                    <th className="px-6 py-2 border">Aksi</th>
                    <th className="px-8 py-2 border">Jenis Kontak</th>
                    <th className="px-4 py-2 border">Nomor Telepon</th>
                    <th className="px-4 py-2 border">Nomor Handphone</th>
                    <th className="px-4 py-2 border">Nomor Faksimile</th>
                    <th className="px-4 py-2 border">Alamat Email</th>
                    <th className="px-4 py-2 border">Alamat Situs Web</th>
                    <th className="px-4 py-2 border">Keterangan</th>
                    <th className="px-4 py-2 border">Tanggal Mulai</th>
                    <th className="px-4 py-2 border">Tanggal Berakhir</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600">
                  {data.field_edit_informasi.pihak_terkait.length === 0 ? (
                    <tr className="bg-gray-100">
                      <td colSpan="10" className="text-center p-4 border">
                        Belum ada data
                      </td>
                    </tr>
                  ) : (
                    data.field_edit_informasi.pihak_terkait.map((pihak) => (
                      <tr className="bg-gray-100">
                        <td>m</td>
                        <td className="text-center p-4 border">
                          {pihak.jenis_orang_terkait}
                        </td>
                        <td className="text-center p-4 border">{pihak.npwp}</td>
                        <td className="text-center p-4 border">{pihak.npwp}</td>
                        <td className="text-center p-4 border">{pihak.npwp}</td>
                        <td className="text-center p-4 border">
                          {pihak.nama_pengurus}
                        </td>
                        <td className="text-center p-4 border">
                          {pihak.nama_pengurus}
                        </td>
                        <td className="text-center p-4 border">
                          {pihak.keterangan}
                        </td>
                        <td className="text-center p-4 border">
                          {pihak.tanggal_mulai}
                        </td>
                        <td className="text-center p-4 border">
                          {pihak.tanggal_berakhir}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            {isModalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white w-[80%] rounded-lg shadow-lg">
                  <div className="flex justify-between items-center border-b p-4">
                    <h2 className="text-lg font-bold">
                      Pilih jenis Pihak Terkait yang akan ditambahkan.
                    </h2>
                    <button
                      onClick={closeModal}
                      className="text-gray-500 hover:text-red-500"
                    >
                      <FaTimes size={20} />
                    </button>
                  </div>
                  <div className="p-4">
                    <div className="grid gap-4 overflow-auto h-96">
                      <div className="h-full ">
                        <label className="block text-sm font-medium">
                          Jenis Pihak Terkait
                        </label>
                        <select
                          className="w-full p-2 border rounded-md bg-white"
                          value={selectedType}
                          onChange={(e) => setSelectedType(e.target.value)}
                        >
                          <option value="">-- Pilih Jenis Pihak --</option>
                          <option value="related-person">Related Person</option>
                          <option value="related-taxpayer">
                            Related Taxpayer
                          </option>
                        </select>
                      </div>
                      <div className="h-full mt-0">
                        {selectedType === "related-person" && (
                          <>
                            <div className="grid grid-cols-4 gap-4">
                              <div>
                                <label className="block text-sm font-medium">
                                  Apakah PIC?
                                </label>
                                <input
                                  type="checkbox"
                                  name="is_pic"
                                  className="justify-start p-3 border rounded"
                                  // checked={isPIC}
                                  // onChange={handleCheckboxChange}
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium">
                                  Jenis Orang Terkait
                                </label>
                                <select
                                  name="jenis_orang_terkait"
                                  className="w-full p-2 border rounded"
                                  value={selectedRelatedPersonType}
                                  onChange={(e) =>
                                    setSelectedRelatedPersonType(e.target.value)
                                  }
                                >
                                  <option value="">
                                    --Pilih jenis orang terkait--
                                  </option>
                                  <option value="direktur">Direktur</option>
                                  <option value="komisaris">Komisaris</option>
                                  <option value="lainnya">Lainnya</option>
                                  <option value="wakil">Wakil</option>
                                </select>
                              </div>

                              {selectedRelatedPersonType === "direktur" && (
                                <div>
                                  <label className="block text-sm font-medium">
                                    Sub Jenis Orang Terkait
                                  </label>
                                  <select
                                    className="w-full p-2 border rounded"
                                    // value={handlePersonTypeChange}
                                    name="sub_orang_terkait"
                                    onChange={handlePersonTypeChange}
                                  >
                                    <option value="">
                                      -- Pilih Sub Jenis --
                                    </option>
                                    <option value="dewan-pengawas-syariah">
                                      Dewan Pengawas Syariah
                                    </option>
                                    <option value="direktur">Direktur</option>
                                    <option value="direktur-independen">
                                      Direktur Independen
                                    </option>
                                    <option value="direktur-utama">
                                      Direktur Utama
                                    </option>
                                    <option value="presiden-direktur">
                                      Presiden Direktur
                                    </option>
                                    <option value="wakil-direktur">
                                      Wakil Direktur
                                    </option>
                                    <option value="wakil-direktur-utama">
                                      Wakil Direktur Utama
                                    </option>
                                    <option value="wakil-presiden-direktur">
                                      Wakil Presiden Direktur
                                    </option>
                                  </select>
                                </div>
                              )}

                              {selectedRelatedPersonType === "komisaris" && (
                                <div>
                                  <label className="block text-sm font-medium">
                                    Sub Jenis Orang Terkait
                                  </label>
                                  <select
                                    className="w-full p-2 border rounded"
                                    name="sub_orang_terkait"
                                    onChange={handlePersonTypeChange}
                                  >
                                    <option value="">
                                      -- Pilih Sub Jenis --
                                    </option>
                                    <option value="komisaris">Komisaris</option>
                                    <option value="komisaris-independen">
                                      Komisaris Independen
                                    </option>
                                    <option value="komisaris-utama">
                                      Komisaris Utama
                                    </option>
                                    <option value="presiden-komisaris">
                                      Presiden Komisaris
                                    </option>
                                    <option value="presiden-komisaris-independen">
                                      Presiden Komisaris Independen
                                    </option>
                                    <option value="wakil-komisaris-utama">
                                      Wakil Komisaris Utama
                                    </option>
                                    <option value="wakil-presiden-komisaris">
                                      Wakil Presiden Komisaris
                                    </option>
                                  </select>
                                </div>
                              )}

                              {selectedRelatedPersonType === "wakil" && (
                                <div>
                                  <label className="block text-sm font-medium">
                                    Sub Jenis Orang Terkait
                                  </label>
                                  <select
                                    // name="sub_jenis_orang_terkait"
                                    className="w-full p-2 border rounded"
                                    name="sub_orang_terkait"
                                    onChange={handlePersonTypeChange}
                                  >
                                    <option value="">
                                      -- Pilih Sub Jenis --
                                    </option>
                                    <option value="curator">Curator</option>
                                    <option value="karyawan">Karyawan</option>
                                    <option value="liquidator">
                                      Liquidator
                                    </option>
                                    <option value="pemilik-manfaat-lainnya">
                                      Pemilik Manfaat Lainnya
                                    </option>
                                  </select>
                                </div>
                              )}

                              {selectedRelatedPersonType === "lainnya" && (
                                <div>
                                  <label className="block text-sm font-medium">
                                    Keterangan
                                  </label>
                                  <input
                                    type="text"
                                    name="keterangan"
                                    className="w-full p-2 border rounded"
                                    // value={formData.keterangan}
                                    // onChange={handleInputChange}
                                    onChange={handlePersonTypeChange}
                                  />
                                </div>
                              )}

                              <div className="mt-2"></div>

                              <div className="mt-2">
                                <label className="block text-sm font-medium">
                                  NIK
                                </label>
                                <select
                                  name="akun_op"
                                  className="w-full p-2 border rounded"
                                  // value={formData.nik_id}
                                  onChange={(e) => {
                                    setFormOrangTerkait({
                                      ...formOrangTerkait,
                                      akun_op: e.target.value,
                                    });
                                    const selectedOrang =
                                      orangTerkait.data.find(
                                        (orang) => orang.id == e.target.value
                                      );
                                    if (selectedOrang) {
                                      // Update the name input field using document.getElementById
                                      const nameInput =
                                        document.getElementById(
                                          "nama-orang-terkait"
                                        );
                                      if (nameInput) {
                                        nameInput.value =
                                          selectedOrang.nama_akun ||
                                          "Nama tidak tersedia";
                                      }
                                    }
                                  }}
                                >
                                  <option value="">-- Pilih NIK --</option>
                                  {orangTerkait?.data?.map((orang) => (
                                    <option key={orang.id} value={orang.id}>
                                      {orang.npwp_akun}
                                    </option>
                                  ))}
                                </select>
                              </div>

                              <div className="mt-2">
                                <label className="block text-sm font-medium">
                                  Nama
                                </label>
                                <input
                                  id="nama-orang-terkait"
                                  type="text"
                                  name="nama"
                                  // value={formData.nama}
                                  className="w-full p-2 border rounded cursor-not-allowed bg-gray-200"
                                  disabled
                                />
                              </div>

                              <div className="mt-2">
                                <label className="block text-sm font-medium">
                                  Kewarganegaraan
                                </label>
                                <input
                                  type="text"
                                  name="kewarganegaraan"
                                  className="w-full p-2 border rounded cursor-not-allowed bg-gray-200"
                                  // value={formData.kewarganegaraan}
                                  readOnly
                                  disabled
                                />
                              </div>

                              <div className="mt-2">
                                <label className="block text-sm font-medium">
                                  Negara Asal
                                </label>
                                <input
                                  type="text"
                                  name="negara_asal"
                                  className="w-full p-2 border rounded cursor-not-allowed bg-gray-200"
                                  // value={formData.negara_asal}
                                  readOnly
                                  disabled
                                />
                              </div>

                              <div className="mt-2">
                                <label className="block text-sm font-medium">
                                  Email
                                </label>
                                <input
                                  type="email"
                                  id="alamat-email-terkait"
                                  name="email"
                                  // value={formData.email}
                                  // onChange={handleInputChange}
                                  className="w-full p-2 border rounded"
                                />
                              </div>

                              <div className="mt-2">
                                <label className="block text-sm font-medium">
                                  Nomor Telepon
                                </label>
                                <input
                                  type="text"
                                  name="nomor_telepon"
                                  // value={formData.nomor_telepon}
                                  // onChange={handleInputChange}
                                  className="w-full p-2 border rounded"
                                />
                              </div>

                              <div className="mt-2">
                                <label className="block text-sm font-medium">
                                  Tanggal Mulai
                                </label>
                                <input
                                  type="date"
                                  name="tanggal_mulai"
                                  // value={o.tanggal_mulai}
                                  onChange={handlePersonTypeChange}
                                  className="w-full p-2 border rounded"
                                />
                              </div>

                              <div className="mt-2">
                                <label className="block text-sm font-medium">
                                  Tanggal Berakhir
                                </label>
                                <input
                                  type="date"
                                  name="tanggal_berakhir"
                                  // value={o.tanggal_berakhir}
                                  onChange={handlePersonTypeChange}
                                  className="w-full p-2 border rounded"
                                />
                              </div>

                              <div className="col-span-4 flex justify-end mt-4">
                                <button
                                  type="button"
                                  // onClick={() => createRelatedPerson.mutate()}
                                  onClick={() => console.log(formOrangTerkait)}
                                  className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-950"
                                  // disabled={createRelatedPerson.isPending}
                                >
                                  {/* {createRelatedPerson.isPending
                                    ? "Menyimpan..."
                                    : "Simpan"} */}
                                </button>
                              </div>
                            </div>

                            <div className="flex justify-end p-4 border-t">
                              <button
                                onClick={closeModal}
                                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mr-2"
                              >
                                Batal
                              </button>
                              <button
                                // onClick={() => console.log(formOrangTerkait)}
                                onClick={() => createPihakTerkait.mutate()}
                                className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-950"
                              >
                                Simpan
                              </button>
                            </div>
                          </>
                        )}

                        {selectedType === "related-taxpayer" && (
                          <>
                            <div className="grid grid-cols-3 gap-4 ">
                              <div>
                                <label className="block text-sm font-medium">
                                  NIK/NPWP
                                </label>
                                <input
                                  type="text"
                                  className="w-full p-2 border rounded cursor-not-allowed bg-gray-100"
                                  disabled
                                  placeholder="hanya view gan"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium">
                                  Nama
                                </label>
                                <input
                                  type="text"
                                  className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed"
                                  disabled
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium">
                                  Pilih Jenis Wajib Pajak
                                </label>
                                <select
                                  className="w-full p-2 border rounded"
                                  onlyRead
                                >
                                  <option value="grup-perusahaan">
                                    Grup Perusahaan
                                  </option>
                                  <option value="lainnnya">Lainnya</option>
                                  <option value="pemilik-manfaat">
                                    Pemilik Manfaat
                                  </option>
                                  <option value="penanggung-pajak">
                                    Penanggung Pajak
                                  </option>
                                </select>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* <div className="flex justify-end p-4 border-t">
                                                                                                    <button onClick={closeModal} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mr-2">
                                                                                                              Batal
                                                                                                    </button>
                                                                                                    <button className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-950">
                                                                                                              Simpan
                                                                                                    </button>
                                                                                          </div> */}
                </div>
              </div>
            )}
          </div>
        )}
        <div
          className="border rounded-md p-4 mb-2 bg-gray-100 cursor-pointer flex justify-between items-center"
          onClick={() => setShowAlamatWajibPajak(!showAlamatWajibPajak)}
        >
          <h3 className="text-lg font-semibold">Alamat Wajib Pajak</h3>
          {showAlamatWajibPajak ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {showAlamatWajibPajak && (
          <div className="border rounded-md p-4 mb-4">
            <div className="spcae-y-2 h-full">
              <h1 className="text-lg font-semibold">Alamat Utama</h1>
              <p className="mt-2">
                Detail Alamat Utama : Link dari import an awal kang
              </p>
            </div>
          </div>
        )}
        <div
          className="border rounded-md p-4 mb-2 bg-gray-100 cursor-pointer flex justify-between items-center"
          onClick={() => setShowTempatKegiatanUsaha(!showTempatKegiatanUsaha)}
        >
          <h3 className="text-lg font-semibold">
            Tempat Kegiatan Usaha/Sub Unit
          </h3>
          {showTempatKegiatanUsaha ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {showTempatKegiatanUsaha && (
          <div className="border rounded-md p-4 mb-4">
            <div className="flex justify-between items-center mb-4">
              <AlertDialog>
                <AlertDialogTrigger className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">
                  + Tambah
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-white !min-w-[1000px] rounded-lg shadow-lg ">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-xl font-bold">
                      Tambahkan Tempat Kegiatan Baru
                    </AlertDialogTitle>
                  </AlertDialogHeader>
                  <div className="grid gap-4 overflow-auto h-96">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        NITKU
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md bg-white mt-1"
                        placeholder="Masukkan nomor telepon"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Jenis TKU *
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Nama TKU
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Jenis Usaha
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded"
                      />
                    </div>
                  </div>
                  <AlertDialogFooter className="flex justify-end mt-6 space-x-2">
                    <AlertDialogCancel className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">
                      Batal
                    </AlertDialogCancel>
                    <AlertDialogAction className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-950">
                      Simpan
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            <div className=" w-[1050px] overflow-x-auto bg-white shadow-md rounded-lg overflow-hidden ">
              <table className="table-auto border border-gray-300 overflow-hidden">
                <thead>
                  <tr>
                    <th className="border border-gray-300 px-1 py-2">Aksi</th>
                    <th className="border border-gray-300 px-4 py-2">NITKU</th>
                    <th className="border border-gray-300 px-4 py-2">
                      Jenis TKU
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Nama TKU
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      KLU TKU
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-600">
                  <tr className="bg-gray-100">
                    <td className="px-1 py-4 border">
                      <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-2 rounded">
                        Edit
                      </button>
                      <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-2 rounded ml-2">
                        Lihat
                      </button>
                    </td>
                    <td className="px-4 py-4 border">1234567890</td>
                    <td className="px-4 py-4 border">
                      Jenis Tempat Kegiatan Usaha
                    </td>
                    <td className="px-4 py-4 border">
                      Nama Tempat Kegiatan Usaha
                    </td>
                    <td className="px-4 py-4 border">
                      Kode KLU Tempat Kegiatan Usaha
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
        <div
          className="border rounded-md p-4 mb-2 cursor-pointer bg-gray-100 flex justify-between items-center"
          onClick={() => setShowDetailBank(!showDetailBank)}
        >
          <h3 className="text-lg font-semibold">Detail Bank</h3>
          {showDetailBank ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {showDetailBank && (
          <div className="border rounded-md p-4 mb-4">
            <div className="flex justify-between items-center mb-4">
              <AlertDialog>
                <AlertDialogTrigger className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">
                  + Tambah
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-white !min-w-[1000px] rounded-lg shadow-lg ">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-xl font-bold">
                      Tambahkan Tempat Kegiatan Baru
                    </AlertDialogTitle>
                  </AlertDialogHeader>
                  <div className="grid gap-4 overflow-auto h-96">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Bank *
                      </label>
                      <select className="w-full p-2 border rounded">
                        <option value="">Pilih Bank</option>
                        <option value="mandiri">
                          PT BANK MANDIRI (PERSERO) Tbk
                        </option>
                        <option value="bca">PT BANK CENTRAL ASIA Tbk</option>
                        <option value="bri">
                          PT BANK RAKYAT INDONESIA (PERSERO) Tbk
                        </option>
                        <option value="bni">
                          PT BANK NEGARA INDONESIA (PERSERO) Tbk
                        </option>
                        <option value="bukopin">PT BANK BUKOPIN Tbk</option>
                        <option value="btpn">PT BANK BTPN Tbk</option>
                        <option value="cimb">PT BANK CIMB NIAGA Tbk</option>
                        <option value="danamon">PT BANK DANAMON Tbk</option>
                        <option value="maybank">PT BANK MAYBANK Tbk</option>
                        <option value="mega">PT BANK MEGA Tbk</option>
                        <option value="permata">PT BANK PERMATA Tbk</option>
                        <option value="panin">PT BANK PANIN Tbk</option>
                        <option value="panin_syariah">
                          PT BANK PANIN SYARIAH Tbk
                        </option>
                        <option value="maybank_syariah">
                          PT BANK MAYBANK SYARIAH Tbk
                        </option>
                        <option value="bsi">
                          PT BANK SYARIAH INDONESIA Tbk
                        </option>
                        <option value="bsi_syariah">
                          PT BANK SYARIAH INDONESIA SYARIAH Tbk
                        </option>
                        <option value="bca_syariah">
                          PT BANK CENTRAL ASIA SYARIAH Tbk
                        </option>
                        <option value="bri_syariah">
                          PT BANK RAKYAT INDONESIA SYARIAH Tbk
                        </option>
                        <option value="bni_syariah">
                          PT BANK NEGARA INDONESIA SYARIAH Tbk
                        </option>
                        <option value="bukopin_syariah">
                          PT BANK BUKOPIN SYARIAH Tbk
                        </option>
                        <option value="btpn_syariah">
                          PT BANK BTPN SYARIAH Tbk
                        </option>
                        <option value="cimb_syariah">
                          PT BANK CIMB NIAGA SYARIAH Tbk
                        </option>
                        <option value="danamon_syariah">
                          PT BANK DANAMON SYARIAH Tbk
                        </option>
                        <option value="maybank_syariah">
                          PT BANK MAYBANK SYARIAH Tbk
                        </option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Nomor Rekening
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Jenis Rekening Bank
                      </label>
                      <select className="w-full p-2 border rounded">
                        <option value="akun-bisnis">Akun Bisnis</option>
                        <option value="akun-pribadi">Akun Pribadi</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Nama Pemilik Bank
                      </label>
                      <textarea className="w-full p-2 border rounded"></textarea>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Tanggal Mulai
                      </label>
                      <input
                        type="date"
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Tanggal Berakhir
                      </label>
                      <input
                        type="date"
                        className="w-full p-2 border rounded"
                      />
                    </div>
                  </div>
                  <AlertDialogFooter className="flex justify-end mt-6 space-x-2">
                    <AlertDialogCancel className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">
                      Batal
                    </AlertDialogCancel>
                    <AlertDialogAction className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-950">
                      Simpan
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            <div className=" w-[1050px] overflow-x-auto bg-white shadow-md rounded-lg overflow-hidden ">
              <table className="table-auto border border-gray-300 overflow-hidden">
                <thead>
                  <tr>
                    <th className="border border-gray-300 px-1 py-2">Aksi</th>
                    <th className="border border-gray-300 px-4 py-2">
                      Nama Bank
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Nomor Rekening
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Jenis Rekening Bank
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Tanggal Mulai
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Tanggal Berakhir
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-600">
                  <tr className="bg-gray-100">
                    <td className="px-1 py-4 border">
                      <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-2 rounded">
                        Edit
                      </button>
                    </td>
                    <td className="px-4 py-4 border">Bank Syariah Indonesia</td>
                    <td className="px-4 py-4 border">1234567890</td>
                    <td className="px-4 py-4 border">Rekening Koran</td>
                    <td className="px-4 py-4 border">01-01-2023</td>
                    <td className="px-4 py-4 border">01-01-2023</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
        <div
          className="border rounded-md p-4 mb-2 bg-gray-100 cursor-pointer flex justify-between items-center"
          onClick={() =>
            setShowNomorIdentifikasiEksternal(!showNomorIdentifikasiEksternal)
          }
        >
          <h3 className="text-lg font-semibold">
            Nomor Identifikasi Eksternal
          </h3>
          {showNomorIdentifikasiEksternal ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {showNomorIdentifikasiEksternal && (
          <div className="border rounded-md p-4 mb-4">
            <div className="flex justify-between items-center mb-4">
              <AlertDialog>
                <AlertDialogTrigger className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">
                  + Tambah
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-white !min-w-[1000px] rounded-lg shadow-lg ">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-xl font-bold">
                      Tambah nomor identifikasi eksternal
                    </AlertDialogTitle>
                  </AlertDialogHeader>
                  <div className="grid gap-4 overflow-auto h-96">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Jenis Nomor Identifikasi
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md bg-gray-100 mt-1 cursor-not-allowed"
                        disabled
                        placeholder="Auto NPWP"
                      />
                      {/*  */}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Nomor Identifikasi *
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded bg-gray-100 mt-1 cursor-not-allowed"
                        disabled
                        placeholder="Auto NPWP"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Tanggal Mulai
                      </label>
                      <input
                        type="date"
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Tanggal Berakhir
                      </label>
                      <input
                        type="date"
                        className="w-full p-2 border rounded"
                      />
                    </div>
                  </div>
                  <AlertDialogFooter className="flex justify-end mt-6 space-x-2">
                    <AlertDialogCancel className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">
                      Batal
                    </AlertDialogCancel>
                    <AlertDialogAction className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-950">
                      Simpan
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            <div className=" w-[1050px] overflow-x-auto bg-white shadow-md rounded-lg overflow-hidden ">
              <table className="table-auto border border-gray-300 overflow-hidden">
                <thead>
                  <tr>
                    <th className="border border-gray-300 px-1 py-2">Aksi</th>
                    <th className="border border-gray-300 px-4 py-2">Tipe</th>
                    <th className="border border-gray-300 px-4 py-2">
                      Nomor Identfikasi
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Tanggal Mulai
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Tanggal Berakhir
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-600">
                  <tr className="bg-gray-100">
                    <td className="px-1 py-4 border">
                      <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-2 rounded">
                        Edit
                      </button>
                      <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-2 rounded ml-2">
                        Lihat
                      </button>
                      <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-2 rounded ml-2">
                        Hapus
                      </button>
                    </td>
                    <td className="px-4 py-4 border">NPWP 15 Digit</td>
                    <td className="px-4 py-4 border">98018308108202131</td>
                    <td className="px-4 py-4 border">09-03-2024</td>
                    <td className="px-4 py-4 border"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditDataProfilBadan;
