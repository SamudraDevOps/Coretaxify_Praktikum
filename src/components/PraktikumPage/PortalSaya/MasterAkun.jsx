import React, { useState, useRef, useEffect } from "react";
// import SideBarEFaktur from "./SideBarEFaktur";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FaChevronDown, FaChevronLeft, FaChevronRight, FaPlus, FaTrash, FaFileImport } from "react-icons/fa";
import { useParams, useSearchParams } from "react-router";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import axios from "axios";
import { getCsrf } from "@/service/getCsrf";
import { RoutesApi } from "@/Routes";
import { useCookies } from "react-cookie";
import * as XLSX from "xlsx";
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

export default function MasterAkun({ data, sidebar, pagination, onPageChange, currentPage = 1 }) {
  const { id, akun } = useParams();
  const [searchParams] = useSearchParams();
  const viewAsCompanyId = searchParams.get("viewAs");
  const userId = searchParams.get("user_id");
  const [cookies] = useCookies(["token"]);
  const accountId = viewAsCompanyId ? viewAsCompanyId : akun;

  // Tambah Satu satu lek
  const [formData, setFormData] = useState({
    nama_akun: "",
    tipe_akun: "",
    npwp_akun: "",
    alamat_utama_akun: "",
    email_akun: "",
    negara_asal: "",
  });
  const [editFormData, setEditFormData] = useState({
    nama_akun: "",
    tipe_akun: "",
    npwp_akun: "",
    alamat_utama_akun: "",
    email_akun: "",
    negara_asal: "",
  });

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "npwp_akun") {
      const numericValue = value.replace(/[^0-9]/g, "");
      setEditFormData((prev) => ({ ...prev, [name]: numericValue }));
    } else {
      setEditFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "npwp_akun") {
      const numericValue = value.replace(/[^0-9]/g, "");
      setFormData((prev) => ({ ...prev, [name]: numericValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const resetForm = () => {
    setFormData({
      nama_akun: "",
      tipe_akun: "",
      npwp_akun: "",
      alamat_utama_akun: "",
      email_akun: "",
      negara_asal: "",
    });
  };

  // const showSuccess = (title = "Berhasil!", text = "", reload = true) => {
  //   return Swal.fire({
  //     title,
  //     text,
  //     icon: "success",
  //     timer: 2000,
  //     showConfirmButton: false,
  //     timerProgressBar: true,
  //   }).then(() => {
  //     if (reload) window.location.reload();
  //   });
  // };

  // const showError = (title = "Gagal!", text = "Terjadi kesalahan") => {
  //   return Swal.fire({
  //     title,
  //     text,
  //     icon: "error",
  //   });
  // };

  // const showInfo = (title = "Info", text = "") => {
  //   return Swal.fire({
  //     title,
  //     text,
  //     icon: "info",
  //   });
  // };

  // const showLoading = (title = "Memproses...", text = "Mohon tunggu") => {
  //   return Swal.fire({
  //     title,
  //     text,
  //     allowOutsideClick: false,
  //     didOpen: () => Swal.showLoading(),
  //   });
  // };
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [isRows, setRows] = useState([
    {
      nama_akun: "",
      npwp_akun: "",
      alamat_utama_akun: "",
      tipe_akun: "Orang Pribadi",
      email_akun: "",
      negara_asal: "Indonesia",
    },
  ]);
  const bulkFileInputRef = useRef(null);
  const openFilePicker = () => bulkFileInputRef.current?.click();

  const addRow = () => {
    setRows((prev) => [
      ...prev,
      {
        nama_akun: "",
        npwp_akun: "",
        alamat_utama_akun: "",
        tipe_akun: "Orang Pribadi",
        email_akun: "",
        negara_asal: "Indonesia",
      },
    ]);
  };

  const removeRow = (index) => {
    setRows((prev) => prev.filter((_, i) => i !== index));
  };

  const FieldChange = (index, field, value) => {
    setRows((prev) => {
      const clone = [...prev];
      clone[index] = { ...clone[index], [field]: field === "npwp_akun" ? (value || "").replace(/[^0-9]/g, "") : value };
      return clone;
    });
  };

  const parseFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsImporting(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const firstSheetName = workbook.SheetNames[0];
        const ws = workbook.Sheets[firstSheetName];
        const json = XLSX.utils.sheet_to_json(ws, { header: 1 });
        if (json.length < 2) throw new Error("tidak ada data yang ditambahkan");
        const headers = json[0].map((h) => String(h || "").toLowerCase().trim());
        const idx = (name) => headers.indexOf(name);
        const required = ["nama_akun", "npwp_akun", "alamat_utama_akun", "tipe_akun", "email_akun", "negara_asal"];
        const missing = required.filter((h) => !headers.includes(h));
        if (missing.length) {
          throw new Error(`Kolom yang wajib diisi tidak ada dalam fotmat: ${missing.join(", ")}`);
        }
        const rows = json.slice(1).map((row) => ({
          nama_akun: row[idx("nama_akun")] || "",
          npwp_akun: String(row[idx("npwp_akun")] || "").replace(/[^0-9]/g, ""),
          alamat_utama_akun: row[idx("alamat_utama_akun")] || "",
          tipe_akun: row[idx("tipe_akun")] || "Orang Pribadi",
          email_akun: row[idx("email_akun")] || "",
          negara_asal: row[idx("negara_asal")] || "Indonesia",
        })).filter((r) => r.nama_akun || r.email_akun);
        if (!rows.length) throw new Error("Data Tidak ada");
        setRows(rows);
        Swal.fire("Berhasil", `${rows.length} baris siap ditambahkan.`, "success");
        setRows(rows);
        setIsDialogOpen(true); Swal.fire({
          title: "Berhasil!",
          text: `${rows.length} baris dimuat. Silakan cek & edit sebelum Simpan Semua.`,
          icon: "success", timer: 2000, showConfirmButton: false,
          timerProgressBar: true,
        });
      } catch (err) {
        console.error(err);
        Swal.fire("Gagal", err.message || "Gagal memproses file", "error");
      } finally {
        setIsImporting(false);
        e.target.value = null;
      }
    };
    reader.onerror = () => {
      setIsImporting(false);
      Swal.fire("Gagal", "Gagal membaca file", "error");
    };
    reader.readAsArrayBuffer(file);
  };


  // Update Master Akun iki
  const updateMasterAkun = useMutation({
    mutationFn: async ({ masterAkunId, data }) => {
      const csrf = await getCsrf();
      return axios.put(
        `${RoutesApi.apiUrl}student/assignments/${id}/sistem/${accountId}/sistem-tambahan/${masterAkunId}`,
        data,
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
    onSuccess: () => {
      Swal.fire({ title: "Berhasil!", text: "Master akun berhasil diupdate!", icon: "success", timer: 2000, showConfirmButton: false, timerProgressBar: true }).then(() => window.location.reload());
    },
    onError: () => Swal.fire("Gagal!", "Terjadi kesalahan saat mengupdate data.", "error"),
  });

  const createMasterAkun = useMutation({
    mutationFn: async (payload) => {
      const csrf = await getCsrf();
      return axios.post(
        `${RoutesApi.apiUrl}student/assignments/${id}/sistem/${accountId}/sistem-tambahan`,
        payload,
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
  });

  const deleteMasterAkun = useMutation({
    mutationFn: async ({ idMaster }) => {
      const csrf = await getCsrf();
      return axios.delete(
        `${RoutesApi.url}api/student/assignments/${id}/sistem/${accountId}/sistem-tambahan/${idMaster}/`,
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
    onSuccess: () => {
      Swal.fire({ title: "Berhasil!", text: "Master akun berhasil dihapus!", icon: "success", timer: 2000, showConfirmButton: false, timerProgressBar: true }).then(() => window.location.reload());
    },
    onError: () => Swal.fire("Gagal!", "Terjadi kesalahan saat menyimpan data.", "error"),
  });

  // Validasi
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const validateRow = (row, idx) => {
    const errors = [];
    if (!row.nama_akun) errors.push(`Baris ${idx + 1}: Nama Akun wajib diisi`);
    if (!row.npwp_akun) errors.push(`Baris ${idx + 1}: NIK/NPWP wajib diisi`);
    if (row.npwp_akun && row.npwp_akun.length !== 16) errors.push(`Baris ${idx + 1}: NIK/NPWP harus 16 digit`);
    if (!row.alamat_utama_akun) errors.push(`Baris ${idx + 1}: Alamat wajib diisi`);
    if (!row.tipe_akun) errors.push(`Baris ${idx + 1}: Tipe Akun wajib dipilih`);
    if (!row.email_akun) errors.push(`Baris ${idx + 1}: Email wajib diisi`);
    if (row.email_akun && !emailRegex.test(row.email_akun)) errors.push(`Baris ${idx + 1}: Format email tidak valid`);
    if (!row.negara_asal) errors.push(`Baris ${idx + 1}: Negara Asal wajib diisi`);
    return errors;
  };

  const handleSave = async () => {
    // Validai baris kosong 
    const filtered = isRows.filter((r) => Object.values(r).some((v) => String(v || "").trim() !== ""));
    if (!filtered.length) {
      Swal.fire("Tidak ada data", "Isi minimal satu baris sebelum menyimpan.", "info");
      return;
    }

    // validasi
    const allErrors = filtered.flatMap((row, i) => validateRow(row, i));
    if (allErrors.length) {
      Swal.fire({ title: "Validasi Gagal", html: allErrors.join("<br/>"), icon: "error" });
      return;
    }

    // Set Email dan NPWP Duplikasi
    const seenEmail = new Set();
    const seenNpwp = new Set();
    const deduped = [];
    for (const r of filtered) {
      const k1 = r.email_akun.toLowerCase();
      const k2 = r.npwp_akun;
      if (seenEmail.has(k1) || seenNpwp.has(k2)) continue;
      seenEmail.add(k1);
      seenNpwp.add(k2);
      deduped.push(r);
    }

    Swal.fire({ title: "Memproses...", text: "Sedang menyimpan data dalam jumlah banyak", allowOutsideClick: false, didOpen: () => Swal.showLoading() });
    try {
      const results = await Promise.allSettled(deduped.map((row) => createMasterAkun.mutateAsync(row)));
      const success = results.filter((r) => r.status === "fulfilled").length;
      const failed = results.length - success;
      Swal.fire({ title: "Selesai", html: ` Berhasil menambahkan <b>${success} Data Master Akun </b>`, icon: failed ? "warning" : "success", timer: 2000, showConfirmButton: false, timerProgressBar: true }).then(() => window.location.reload());
    } catch (e) {
      console.error(e);
      Swal.fire("Gagal", "Terjadi kesalahan saat menyimpan data.", "error");
    }
  };
  const getPageFromUrl = (url) => {
    if (!url) return null;
    const matches = url.match(/[?&]page=(\d+)/);
    return matches ? parseInt(matches[1]) : null;
  };
  const firstPage = pagination?.links?.first ? getPageFromUrl(pagination.links.first) : 1;
  const lastPage = pagination?.links?.last ? getPageFromUrl(pagination.links.last) : 1;
  const nextPage = pagination?.links?.next ? getPageFromUrl(pagination.links.next) : null;
  const prevPage = pagination?.links?.prev ? getPageFromUrl(pagination.links.prev) : null;
  const totalItems = pagination?.meta?.total || data?.length || 0;
  const itemsPerPage = pagination?.meta?.per_page || (pagination?.meta?.last_page ? Math.ceil(totalItems / pagination.meta.last_page) : 10);

  const item = localStorage.getItem("selectedCompanyId");

  const isFormInvalid = !formData.nama_akun || !formData.npwp_akun || !formData.alamat_utama_akun || !formData.tipe_akun || formData.tipe_akun === "Pilih Tipe Akun" || !formData.email_akun || !formData.negara_asal;
  const isEditFormInvalid = !editFormData.nama_akun || !editFormData.npwp_akun || !editFormData.alamat_utama_akun || !editFormData.tipe_akun || !editFormData.email_akun || !editFormData.negara_asal;

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [importLoading, setImportLoading] = useState(false);
  const fileInputRef = useRef(null);
  const handleImportClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
  };

  const handleImportFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImportLoading(true);
    try {
      const csrf = await getCsrf();
      const formDataUpload = new FormData();
      formDataUpload.append("file", file);
      await axios.post(
        `${RoutesApi.apiUrl}student/assignments/${id}/sistem/${accountId}/sistem-tambahan/import`,
        formDataUpload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
            "X-CSRF-TOKEN": csrf,
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );
      Swal.fire({ title: "Berhasil!", text: "Data berhasil diimport!", icon: "success", timer: 2000, showConfirmButton: false, timerProgressBar: true }).then(() => window.location.reload());
    } catch (error) {
      Swal.fire("Gagal!", "Terjadi kesalahan saat import data.", "error");
    } finally {
      setImportLoading(false);
    }
  };

  const handleDownloadClick = () => {
    const header = ["nama_akun", "npwp_akun", "alamat_utama_akun", "tipe_akun", "email_akun", "negara_asal"];
    const sampleData = [
      ["Budi Santoso", "1234567890123456", "Jl. Sudirman No. 1, Jakarta", "Orang Pribadi", "budi@email.com", "Indonesia"],
      ["PT Maju Mundur", "9876543210123456", "Jl. Merdeka No. 2, Bandung", "Badan", "admin@majumundur.com", "Indonesia"],
    ];
    const data = [header, ...sampleData];
    const ws = XLSX.utils.aoa_to_sheet(data);
    ws["!cols"] = [
      { wch: 24 },
      { wch: 18 },
      { wch: 40 },
      { wch: 16 },
      { wch: 28 },
      { wch: 16 },
    ];
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Master Akun");
    XLSX.writeFile(wb, "MasterAkun_import_template.xlsx");
  };

  useEffect(() => {
    const handler = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setIsDropdownOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* <SideBarEFaktur nama_akun={sidebar.nama_akun} npwp_akun={sidebar.npwp_akun} akun={{ id, akun }} /> */}
      <div className="flex-auto p-3 bg-white rounded-md h-full min-w-0">
        <div className="flex justify-between items-center mb-4 pb-3 border-b">
          <div className="flex items-center">
            <IoDocumentTextOutline className="text-4xl text-blue-900" />
            <h1 className="text-lg font-bold text-blue-900 ml-2">Master Akun</h1>
          </div>
        </div>

        <div className="flex justify-between mb-4 border-b pb-3">
          <div className="flex items-center gap-3">
            {/* Single Add */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button className={userId ? "hidden" : "bg-blue-900 hover:bg-blue-950 text-white font-bold py-2 px-2 rounded text-sm flex items-center gap-2"}>
                  Tambah (Single)
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent className="max-w-2xl flex flex-col max-h-[90vh]">
                <AlertDialogHeader>
                  <AlertDialogTitle>Tambah Master Akun</AlertDialogTitle>
                  <AlertDialogDescription>Masukkan data untuk membuat akun baru.</AlertDialogDescription>
                </AlertDialogHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 p-4">
                  <div className="grid gap-1.5">
                    <label htmlFor="nama_akun" className="text-sm font-medium text-gray-700">Nama Akun <span className="text-red-500">*</span></label>
                    <input id="nama_akun" name="nama_akun" value={formData.nama_akun} required onChange={handleInputChange} placeholder="Contoh: Budi Santoso" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                  <div className="grid gap-1.5">
                    <label htmlFor="npwp_akun" className="text-sm font-medium text-gray-700">NIK/NPWP <span className="text-red-500">*</span></label>
                    <input id="npwp_akun" name="npwp_akun" value={formData.npwp_akun} required onChange={handleInputChange} placeholder="Masukkan 16 digit NIK/NPWP" type="text" inputMode="numeric" pattern="[0-9]*" maxLength="16" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                  <div className="grid gap-1.5 md:col-span-2">
                    <label htmlFor="alamat_utama_akun" className="text-sm font-medium text-gray-700">`Alamat` <span className="text-red-500">*</span></label>
                    <textarea id="alamat_utama_akun" name="alamat_utama_akun" value={formData.alamat_utama_akun} required onChange={handleInputChange} placeholder="Masukkan alamat lengkap" rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                  <div className="grid gap-1.5">
                    <label htmlFor="tipe_akun" className="text-sm font-medium text-gray-700">Tipe Akun <span className="text-red-500">*</span></label>
                    <select id="tipe_akun" name="tipe_akun" value={formData.tipe_akun} required onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option defaultValue={"Pilih Tipe Akun"}>Pilih Tipe Akun</option>
                      <option value="Orang Pribadi">Orang Pribadi</option>
                      <option value="Badan">Badan</option>
                    </select>
                  </div>
                  <div className="grid gap-1.5">
                    <label htmlFor="email_akun" className="text-sm font-medium text-gray-700">Email <span className="text-red-500">*</span></label>
                    <input id="email_akun" name="email_akun" type="email" value={formData.email_akun} required onChange={handleInputChange} placeholder="contoh@email.com" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                  <div className="grid gap-1.5 md:col-span-2">
                    <label htmlFor="negara_asal" className="text-sm font-medium text-gray-700">Negara Asal <span className="text-red-500">*</span></label>
                    <input id="negara_asal" name="negara_asal" value={formData.negara_asal} required onChange={handleInputChange} placeholder="Contoh: Indonesia" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                </div>
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={resetForm}>Batal</AlertDialogCancel>
                  <AlertDialogAction onClick={() =>
                    createMasterAkun.mutate(formData, {
                      onSuccess: () => {
                        Swal.fire({ title: "Berhasil!", text: "Master akun berhasil dibuat!", icon: "success", timer: 2000, showConfirmButton: false, timerProgressBar: true }).then(() => window.location.reload());
                      },
                      onError: () => Swal.fire("Gagal!", "Terjadi kesalahan saat membuat data.", "error"),
                    })
                  } disabled={isFormInvalid || createMasterAkun.isLoading} className="bg-blue-900 hover:bg-blue-950 text-white font-bold py-2 px-4 rounded">
                    {createMasterAkun.isLoading ? "Menyimpan..." : "Simpan"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <AlertDialogTrigger asChild>
                <button className={userId ? "hidden" : "bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-2 rounded text-sm flex items-center gap-2"}>
                  <FaPlus /> Tambah Multiple
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent className="max-w-5xl flex flex-col max-h-[92vh]">
                <AlertDialogHeader className="p-6 pb-3 border-b">
                  <AlertDialogTitle className="text-xl">Tambah Banyak Master Akun</AlertDialogTitle>
                  <AlertDialogDescription>Tambah beberapa akun sekaligus, input manual atau import dari Excel/CSV.</AlertDialogDescription>
                </AlertDialogHeader>

                <div className="p-6 pt-4 space-y-4 overflow-y-auto">
                  <div className="flex flex-wrap gap-2 items-center">
                    <button type="button" onClick={openFilePicker} disabled={isImporting} className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-3 py-2 rounded">
                      <FaFileImport /> {isImporting ? "Mengimpor..." : "Import Excel/CSV"}
                    </button>
                    <button type="button" onClick={handleDownloadClick} className="bg-gray-200 hover:bg-gray-300 text-gray-900 text-sm font-semibold px-3 py-2 rounded">
                      Download Template
                    </button>
                    <input type="file" ref={bulkFileInputRef} accept=".xlsx,.xls,.csv" style={{ display: "none" }} onChange={parseFile} />
                  </div>

                  <div className="text-sm text-gray-600">Total baris: <b>{isRows.length}</b></div>

                  <div className="w-full overflow-auto border rounded">
                    <table className="min-w-[1300px] w-full text-sm">
                      <thead className="bg-gray-100 sticky top-0">
                        <tr>
                          <th className="px-3 py-2 border">#</th>
                          <th className="px-3 py-2 border text-left">Nama Akun*</th>
                          <th className="px-3 py-2 border text-left">NIK/NPWP* (16)</th>
                          <th className="px-3 py-2 border text-left">Alamat*</th>
                          <th className="px-3 py-2 border text-left">Tipe Akun*</th>
                          <th className="px-3 py-2 border text-left">Email*</th>
                          <th className="px-3 py-2 border text-left">Negara Asal*</th>
                          <th className="px-3 py-2 border">Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {isRows.map((row, i) => (
                          <tr key={i} className="odd:bg-white even:bg-gray-50">
                            <td className="px-3 py-2 border text-center">{i + 1}</td>
                            <td className="px-3 py-2 border">
                              <input className="w-full border rounded px-2 py-1" value={row.nama_akun} onChange={(e) => FieldChange(i, "nama_akun", e.target.value)} placeholder="Budi Santoso" />
                            </td>
                            <td className="px-3 py-2 border">
                              <input className="w-full border rounded px-2 py-1" value={row.npwp_akun} onChange={(e) => FieldChange(i, "npwp_akun", e.target.value)} maxLength={16} inputMode="numeric" placeholder="16 digit" />
                            </td>
                            <td className="px-3 py-2 border">
                              <input className="w-full border rounded px-2 py-1" value={row.alamat_utama_akun} onChange={(e) => FieldChange(i, "alamat_utama_akun", e.target.value)} placeholder="Alamat lengkap" />
                            </td>
                            <td className="px-3 py-2 border">
                              <select className="w-full border rounded px-2 py-1" value={row.tipe_akun} onChange={(e) => FieldChange(i, "tipe_akun", e.target.value)}>
                                <option value="Orang Pribadi">Orang Pribadi</option>
                                <option value="Badan">Badan</option>
                              </select>
                            </td>
                            <td className="px-3 py-2 border">
                              <input className="w-full border rounded px-2 py-1" value={row.email_akun} onChange={(e) => FieldChange(i, "email_akun", e.target.value)} placeholder="email@contoh.com" />
                            </td>
                            <td className="px-3 py-2 border">
                              <input className="w-full border rounded px-2 py-1" value={row.negara_asal} onChange={(e) => FieldChange(i, "negara_asal", e.target.value)} placeholder="Indonesia" />
                            </td>
                            <td className="px-3 py-2 border text-center">
                              <button type="button" onClick={() => removeRow(i)} disabled={isRows.length === 1} className="inline-flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-xs">
                                <FaTrash /> Hapus
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div>
                    <button type="button" onClick={addRow} className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-3 py-2 rounded">
                      <FaPlus /> Tambah Baris
                    </button>
                  </div>
                </div>

                <AlertDialogFooter className="p-6 pt-3 border-t">
                  <AlertDialogCancel>Batal</AlertDialogCancel>
                  <AlertDialogAction onClick={handleSave} className="bg-purple-700 hover:bg-purple-800 text-white">
                    Simpan Semua
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            {/* <div className="relative" ref={dropdownRef}>
              <button onClick={() => setIsDropdownOpen((s) => !s)} className={userId ? "hidden" : "flex items-center bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-2 rounded"}>
                Import <FaChevronDown className="ml-2" />
              </button>
              {isDropdownOpen && (
                <div className="absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                  <div className="py-1">
                    <button type="button" onClick={handleDownloadClick} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Download Template</button>
                    <a className={userId ? "hidden" : "block w-full cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"} onClick={handleImportClick}>
                      {importLoading ? "Mengupload..." : "Import Dokumen (Server)"}
                    </a>
                    <input type="file" accept=".xlsx,.xls" ref={fileInputRef} style={{ display: "none" }} onChange={handleImportFile} />
                  </div>
                </div>
              )}
            </div> */}
          </div>

          {item && <div className="flex items-center gap-3"></div>}
        </div>

        <div className="w-full overflow-x-auto bg-white shadow-md rounded-lg overflow-hidden mt-4">
          <table className="table-auto border border-gray-300 w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-2 border">No</th>
                <th className="px-6 py-2 border">Aksi</th>
                <th className="px-8 py-2 border">Nama Akun</th>
                <th className="px-4 py-2 border">NPWP</th>
                <th className="px-4 py-2 border">Alamat</th>
                <th className="px-4 py-2 border">Tipe Akun</th>
                <th className="px-4 py-2 border">Email Akun</th>
                <th className="px-4 py-2 border">Negara Asal</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {data && data.length > 0 ? (
                data.map((item, index) => (
                  <tr key={item.id || index}>
                    <td className="px-6 py-2 border text-center">{index + (pagination?.meta?.from || 1)}</td>
                    <td className="px-4 py-2 border">
                      <div className="flex space-x-2">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <button onClick={() => setEditFormData({
                              nama_akun: item.nama_akun || "",
                              tipe_akun: item.tipe_akun || "",
                              npwp_akun: item.npwp_akun || "",
                              alamat_utama_akun: item.alamat_utama_akun || "",
                              email_akun: item.email_akun || "",
                              negara_asal: item.negara_asal || "",
                            })} className={userId ? "hidden" : "bg-blue-900 hover:bg-blue-950 text-white font-bold py-2 px-2 rounded text-sm"}>
                              Edit
                            </button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="max-w-2xl flex flex-col max-h-[90vh]">
                            <AlertDialogHeader className="p-6 pb-4 border-b">
                              <AlertDialogTitle className="text-xl">Edit Master Akun</AlertDialogTitle>
                              <AlertDialogDescription>Ubah data akun yang sudah ada.</AlertDialogDescription>
                            </AlertDialogHeader>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 p-6 overflow-y-auto">
                              <div className="grid gap-1.5 md:col-span-2">
                                <label htmlFor="edit_nama_akun" className="text-sm font-medium text-gray-700">Nama Akun <span className="text-red-500">*</span></label>
                                <input id="edit_nama_akun" name="nama_akun" value={editFormData.nama_akun} onChange={handleEditInputChange} required placeholder="Masukkan nama" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                              </div>
                              <div className="grid gap-1.5 md:col-span-2">
                                <label htmlFor="edit_npwp_akun" className="text-sm font-medium text-gray-700">NIK/NPWP <span className="text-red-500">*</span></label>
                                <input id="edit_npwp_akun" name="npwp_akun" value={editFormData.npwp_akun} onChange={handleEditInputChange} required placeholder="Masukkan NIK/NPWP" type="text" inputMode="numeric" pattern="[0-9]*" maxLength="16" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                              </div>
                              <div className="grid gap-1.5 md:col-span-2">
                                <label htmlFor="edit_alamat_utama_akun" className="text-sm font-medium text-gray-700">Alamat <span className="text-red-500">*</span></label>
                                <textarea id="edit_alamat_utama_akun" name="alamat_utama_akun" value={editFormData.alamat_utama_akun} onChange={handleEditInputChange} required placeholder="Masukkan alamat" rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                              </div>
                              <div className="grid gap-1.5">
                                <label htmlFor="edit_tipe_akun" className="text-sm font-medium text-gray-700">Tipe Akun <span className="text-red-500">*</span></label>
                                <select name="tipe_akun" id="edit_tipe_akun" value={editFormData.tipe_akun} onChange={handleEditInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                                  <option value="">Pilih Tipe Akun</option>
                                  <option value="Orang Pribadi">Orang Pribadi</option>
                                  <option value="Badan">Badan</option>
                                </select>
                              </div>
                              <div className="grid gap-1.5">
                                <label htmlFor="edit_email_akun" className="text-sm font-medium text-gray-700">Email <span className="text-red-500">*</span></label>
                                <input id="edit_email_akun" name="email_akun" type="email" value={editFormData.email_akun} required onChange={handleEditInputChange} placeholder="Masukkan Email" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                              </div>
                              <div className="grid gap-1.5 md:col-span-2">
                                <label htmlFor="edit_negara_asal" className="text-sm font-medium text-gray-700">Negara Asal <span className="text-red-500">*</span></label>
                                <input id="edit_negara_asal" name="negara_asal" value={editFormData.negara_asal} required onChange={handleEditInputChange} placeholder="Masukkan Negara Asal" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                              </div>
                            </div>
                            <AlertDialogFooter className="p-6 pt-4 border-t">
                              <AlertDialogCancel>Batal</AlertDialogCancel>
                              <AlertDialogAction onClick={() => updateMasterAkun.mutate({ masterAkunId: item.id, data: editFormData })} disabled={isEditFormInvalid || updateMasterAkun.isLoading} className="bg-blue-900 hover:bg-blue-950 text-white">
                                {updateMasterAkun.isLoading ? "Mengupdate..." : "Update"}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                        <button onClick={() => deleteMasterAkun.mutate({ idMaster: item.id })} className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs">Hapus</button>
                      </div>
                    </td>
                    <td className="px-4 py-2 border">{item.nama_akun || "-"}</td>
                    <td className="px-4 py-2 border">{item.npwp_akun || "-"}</td>
                    <td className="px-4 py-2 border">{item.alamat_utama_akun || "-"}</td>
                    <td className="px-4 py-2 border">{item.tipe_akun || "-"}</td>
                    <td className="px-4 py-2 border">{item.email_akun || "-"}</td>
                    <td className="px-4 py-2 border">{item.negara_asal || "-"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="20" className="text-center p-4 border">Belum ada data</td>
                </tr>
              )}
            </tbody>
          </table>

          {pagination?.links && (
            <div className="flex justify-between items-center px-4 py-3 bg-white border-t border-gray-200">
              <div>
                <p className="text-sm text-gray-700">Page {currentPage} of {lastPage || 1}</p>
              </div>
              <div className="flex space-x-2">
                <button onClick={() => onPageChange(firstPage)} disabled={!prevPage} className={`px-3 py-1 rounded ${!prevPage ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}`}>First</button>
                <button onClick={() => onPageChange(prevPage || 1)} disabled={!prevPage} className={`px-3 py-1 rounded ${!prevPage ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}`}>
                  <FaChevronLeft className="h-4 w-4" />
                </button>
                <div className="flex space-x-1">
                  {Array.from({ length: lastPage }, (_, i) => i + 1)
                    .filter((pageNum) => pageNum === 1 || pageNum === lastPage || (pageNum >= currentPage - 1 && pageNum <= currentPage + 1))
                    .map((pageNum, index, array) => {
                      const showEllipsisBefore = index > 0 && array[index - 1] !== pageNum - 1;
                      const showEllipsisAfter = index < array.length - 1 && array[index + 1] !== pageNum + 1;
                      return (
                        <React.Fragment key={pageNum}>
                          {showEllipsisBefore && (<span className="px-3 py-1 bg-gray-100 rounded">...</span>)}
                          <button onClick={() => onPageChange(pageNum)} className={`px-3 py-1 rounded ${currentPage === pageNum ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`}>{pageNum}</button>
                          {showEllipsisAfter && (<span className="px-3 py-1 bg-gray-100 rounded">...</span>)}
                        </React.Fragment>
                      );
                    })}
                </div>
                <button onClick={() => onPageChange(nextPage || lastPage)} disabled={!nextPage} className={`px-3 py-1 rounded ${!nextPage ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}`}>
                  <FaChevronRight className="h-4 w-4" />
                </button>
                <button onClick={() => onPageChange(lastPage)} disabled={!nextPage} className={`px-3 py-1 rounded ${!nextPage ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}`}>Last</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
