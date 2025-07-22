import React, { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { FaSquarePen } from "react-icons/fa6";
import SideBarEfaktur from "./SideBarEFaktur";
import { IoDocumentTextOutline } from "react-icons/io5";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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
import { NumericFormat } from "react-number-format";
import { FiX } from "react-icons/fi";
import { useParams, useSearchParams } from "react-router";
import Select from "react-select";
import { useMutation } from "@tanstack/react-query";
import { getCsrf } from "@/service/getCsrf";
import axios from "axios";
import { RoutesApi } from "@/Routes";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";
import { useNavigateWithParams } from "@/hooks/useNavigateWithParams";

const EditReturFaktur = ({ data, sidebar }) => {
  console.log(data);
  const { id, akun, idFaktur } = useParams();
  const [periodeRetur, setPeriodeRetur] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const viewAsCompanyId = searchParams.get("viewAs");
  const [cookies] = useCookies(["token"]);
  const [showDokumenTransaksi, setShowDokumenTransaksi] = useState(true);
  const [showDetailTransaksi, setShowDetailTransaksi] = useState(true);
  const [tipe, setTipe] = useState("");
  const [namaBarang, setNamaBarang] = useState("");
  const [kode, setKode] = useState("");
  const [satuan, setSatuan] = useState("");
  const [hargaSatuan, setHargaSatuan] = useState("");
  const [kuantitas, setKuantitas] = useState(0);
  const [totalHarga, setTotalHarga] = useState("");
  const [potonganHarga, setPotonganHarga] = useState("");
  const [dpp, setDPP] = useState("");
  const [jumlah, setJumlah] = useState("");
  const [ppn, setPPN] = useState("");
  const [tarifPPnBM, setTarifPPnBM] = useState("");
  const [ppnbm, setPPnBM] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [dppRetur, setDppRetur] = useState("");
  const [ppnRetur, setPpnRetur] = useState("");
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [editingTransaction, setEditingTransaction] = useState({
    tipe: "",
    nama: "",
    kode: "",
    satuan: "",
    harga_satuan: "",
    kuantitas: 0,
    total_harga: "",
    pemotongan_harga: "",
    dpp: "",
    ppn_retur: "",
    dpp_lain_retur: "",
    ppnbm_retur: "",
    tarif_ppnbm: "",
  });

  const navigate = useNavigateWithParams();

  const [tanggalRetur, setTanggalRetur] = useState("");
  // useEffect(() => {
  //   if (data?.tanggal_retur) {
  //     // Convert from DD-M-YYYY to YYYY-MM-DD format for date input
  //     const dateParts = data.tanggal_retur.split("-");
  //     const day = dateParts[0].padStart(2, "0");
  //     const month = dateParts[1].padStart(2, "0");
  //     const year = dateParts[2];
  //     setTanggalRetur(`${year}-${month}-${day}`);
  //   }
  // }, [data?.tanggal_retur]);
  // Add this helper function at the top of your component
  const formatDateToPeriode = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    const months = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];

    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${month} ${year}`;
  };
  useEffect(() => {
    if (data?.tanggal_retur) {
      const convertedDate = convertDateFormat(data.tanggal_retur);
      setTanggalRetur(convertedDate);

      // Set periode retur based on tanggal retur
      const periode = formatDateToPeriode(convertedDate);
      setPeriodeRetur(periode);
    }
  }, [data?.tanggal_retur]);
  const handleTanggalReturChange = (e) => {
    const selectedDate = e.target.value;
    setTanggalRetur(selectedDate);

    // Automatically update periode retur when tanggal retur changes
    const periode = formatDateToPeriode(selectedDate);
    setPeriodeRetur(periode);
  };

  const convertDateFormat = (dateString) => {
    if (!dateString) return "";

    // Check if it's already in YYYY-MM-DD format
    if (dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
      return dateString;
    }

    // Handle DD-M-YYYY or DD-MM-YYYY format
    const dateParts = dateString.split("-");
    if (dateParts.length === 3) {
      const day = dateParts[0].padStart(2, "0");
      const month = dateParts[1].padStart(2, "0");
      const year = dateParts[2];

      // Validate year is 4 digits
      if (year.length === 4) {
        return `${year}-${month}-${day}`;
      }
    }

    console.error("Invalid date format:", dateString);
    return "";
  };

  // Update the useEffect
  useEffect(() => {
    if (data?.tanggal_retur) {
      const convertedDate = convertDateFormat(data.tanggal_retur);
      setTanggalRetur(convertedDate);
    }
  }, [data?.tanggal_retur]);

  // Helper function to convert back to DD-M-YYYY format when needed
  const formatDateToOriginal = (dateString) => {
    if (!dateString) return "";
    const dateParts = dateString.split("-");
    const year = dateParts[0];
    const month = parseInt(dateParts[1], 10); // Remove leading zero
    const day = parseInt(dateParts[2], 10); // Remove leading zero
    return `${day}-${month}-${year}`;
  };
  const [jumlahBarangDiretur, setJumlahBarangDiretur] = useState(0);
  const [jumlahBarangDireturInput, setJumlahBarangDireturInput] = useState("");
  const [pemotonganHargaDiretur, setPemotonganHargaDiretur] = useState("");
  const [ppnReturEdit, setPpnReturEdit] = useState("");
  const [dppLainReturEdit, setDppLainReturEdit] = useState("");
  const [ppnbmReturEdit, setPpnbmReturEdit] = useState("");

  // const handleEditTransaction = (transaction) => {
  //   setSelectedTransaction(transaction);
  //   setEditingTransaction({
  //     tipe: transaction.tipe || "",
  //     nama: transaction.nama || "",
  //     kode: transaction.kode || "",
  //     satuan: transaction.satuan || "",
  //     harga_satuan: transaction.harga_satuan || "",
  //     kuantitas: transaction.kuantitas || 0,
  //     total_harga: transaction.total_harga || "",
  //     pemotongan_harga: transaction.pemotongan_harga || "",
  //     dpp: transaction.dpp || "",
  //     ppn_retur: transaction.ppn_retur || "",
  //     dpp_lain_retur: transaction.dpp_lain_retur || "",
  //     ppnbm_retur: transaction.ppnbm_retur || "",
  //     tarif_ppnbm: transaction.tarif_ppnbm || "",
  //   });
  // };
  const handleEditTransaction = (transaction) => {
    setSelectedTransaction(transaction);
    setEditingTransaction({
      tipe: transaction.tipe || "",
      nama: transaction.nama || "",
      kode: transaction.kode || "",
      satuan: transaction.satuan || "",
      harga_satuan: transaction.harga_satuan || "",
      kuantitas: transaction.kuantitas || 0,
      total_harga: transaction.total_harga || "",
      pemotongan_harga: transaction.pemotongan_harga || "",
      dpp: transaction.dpp || "",
      ppn_retur: transaction.ppn_retur || "",
      dpp_lain_retur: transaction.dpp_lain_retur || "",
      ppnbm_retur: transaction.ppnbm_retur || "",
      tarif_ppnbm: transaction.tarif_ppnbm || "",
    });

    // Set the specific fields for editing
    setJumlahBarangDiretur(0); // Reset to 0 for new edit
    setPemotonganHargaDiretur("");
    setPpnReturEdit("");
    setDppLainReturEdit("");
    setPpnbmReturEdit("");
  };

  const updateDetailTransaksi = useMutation({
    mutationFn: async ({ idTransaksi }) => {
      const csrf = await getCsrf();
      const accountId = viewAsCompanyId ? viewAsCompanyId : akun;
      const formatCurrencyForDB = (value) => {
        if (!value) return "0";
        return value.toString().replace(/[^\d]/g, "");
      };
      return axios.put(
        `${RoutesApi.url}api/student/assignments/${id}/sistem/${accountId}/faktur/${idFaktur}/detail-transaksi/${idTransaksi}`,
        {
          jumlah_barang_diretur: jumlahBarangDiretur,
          pemotongan_harga_diretur: formatCurrencyForDB(pemotonganHargaDiretur),
          ppn_retur: formatCurrencyForDB(ppnReturEdit),
          dpp_lain_retur: formatCurrencyForDB(dppLainReturEdit),
          ppnbm_retur: formatCurrencyForDB(ppnbmReturEdit),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-CSRF-TOKEN": csrf,
            Authorization: `Bearer ${cookies.token}`,
          },
          params: {
            intent: "api.update.detail.transaksi.faktur.retur.masukan",
          },
        }
      );
    },
    onSuccess: (data, variables) => {
      // console.log(data);
      // const successMessage = variables.isDraft
      //   ? "Draft Faktur berhasil dibuat"
      //   : "Faktur berhasil diupload";

      Swal.fire(
        "Berhasil!",
        "Detail Transaksi berhasil ditambahkan",
        "success"
      ).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
          // window.location.href = `/praktikum/${id}/sistem/${akun}/e-faktur/pajak-keluaran?viewAs=${viewAsCompanyId}`;
        }
      });
    },
    onError: (error) => {
      console.error("Error saving data:", error);
      Swal.fire("Gagal!", "Terjadi kesalahan saat menyimpan data.", "error");
    },
  });
  const updateFakturRetur = useMutation({
    mutationFn: async () => {
      const csrf = await getCsrf();
      const accountId = viewAsCompanyId ? viewAsCompanyId : akun;
      // const formattedDate = formatDateToOriginal(tanggalRetur);
      return axios.put(
        `${RoutesApi.url}api/student/assignments/${id}/sistem/${accountId}/faktur/${idFaktur}`,
        {
          // tanggal_retur: formattedDate,
          tanggal_retur: tanggalRetur,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-CSRF-TOKEN": csrf,
            Authorization: `Bearer ${cookies.token}`,
          },
          params: {
            intent: "api.update.faktur.retur.masukan",
          },
        }
      );
    },
    onSuccess: (data, variables) => {
      // console.log(data);
      // const successMessage = variables.isDraft
      //   ? "Draft Faktur berhasil dibuat"
      //   : "Faktur berhasil diupload";

      Swal.fire("Berhasil!", "Faktur Retur berhasil disimpan", "success").then(
        (result) => {
          if (result.isConfirmed) {
            navigate(`/praktikum/${id}/sistem/${akun}/e-faktur/pajak-masukan`);
            // window.location.reload();
            // window.location.href = `/praktikum/${id}/sistem/${akun}/e-faktur/pajak-keluaran?viewAs=${viewAsCompanyId}`;
          }
        }
      );
    },
    onError: (error) => {
      console.error("Error saving data:", error);
      Swal.fire("Gagal!", "Terjadi kesalahan saat menyimpan data.", "error");
    },
  });
  const handleUploadKonsep = () => {
    // Validation for tanggal retur
    if (!tanggalRetur || tanggalRetur.trim() === "") {
      Swal.fire({
        title: "Error!",
        text: "Tanggal Retur harus diisi",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    // If validation passes, proceed with mutation
    updateFakturRetur.mutate();
  };
  // function formatRupiah(value) {
  //   const numberString = value?.toString().replace(/[^0-9]/g, "") || "0";
  //   return new Intl.NumberFormat("id-ID", {
  //     style: "currency",
  //     currency: "IDR",
  //     minimumFractionDigits: 0,
  //   }).format(numberString || 0);
  // }
  // function formatRupiah(value) {
  //   if (!value) return "Rp 0";

  //   // Allow numbers and decimal point, remove other characters
  //   const cleanValue = value.toString().replace(/[^0-9.]/g, "");
  //   const numericValue = parseFloat(cleanValue) || 0;

  //   return new Intl.NumberFormat("id-ID", {
  //     style: "currency",
  //     currency: "IDR",
  //     minimumFractionDigits: 0,
  //   }).format(numericValue);
  // }
  function formatRupiah(value) {
    // console.log("formatRupiah input:", value, "type:", typeof value);

    if (!value && value !== 0) {
      // console.log("formatRupiah returning Rp 0 - no value");
      return "Rp 0";
    }

    const numericValue = parseFloat(value);
    // console.log("formatRupiah parsed value:", numericValue);

    if (isNaN(numericValue)) {
      // console.log("formatRupiah returning Rp 0 - NaN");
      return "Rp 0";
    }

    const formatted = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(numericValue);

    // console.log("formatRupiah final result:", formatted);
    return formatted;
  }

  function updatePPN(newJumlah) {
    const numericJumlah = parseInt(newJumlah || "0", 10) || 0;
    setPPN(formatRupiah((numericJumlah * 0.12).toString())); // 12%
    // Hitung PPnBM jika tarif diisi
    if (tarifPPnBM) {
      const numericPPnBM = parseInt(tarifPPnBM.replace(/\D/g, ""), 10) || 0;
      setPPnBM(formatRupiah(((numericJumlah * numericPPnBM) / 100).toString()));
    }
  }

  // Handler untuk perubahan input
  const handleHargaSatuanChange = (value) => {
    setHargaSatuan(value);
    const numericHarga = parseInt(value || "0", 10) || 0;
    const newTotal = numericHarga * (parseInt(kuantitas, 10) || 0);
    setTotalHarga(newTotal);
    const newDPP = newTotal - (parseInt(potonganHarga, 10) || 0);
    setDPP(newDPP);
    if (!isChecked) setJumlah(newDPP);
    updatePPN(newDPP);
  };

  const handleKuantitasChange = (value) => {
    setKuantitas(value);
    const numericHarga = parseInt(hargaSatuan || "0", 10) || 0;
    const newTotal = numericHarga * (parseInt(value, 10) || 0);
    setTotalHarga(newTotal);
    const newDPP = newTotal - (parseInt(potonganHarga, 10) || 0);
    setDPP(newDPP);
    if (!isChecked) setJumlah(newDPP);
    updatePPN(newDPP);
  };

  const handlePotonganHargaChange = (value) => {
    setPotonganHarga(value);
    const numericTotal = parseInt(totalHarga || "0", 10) || 0;
    const numericPotongan = parseInt(value || "0", 10) || 0;
    const newDPP = numericTotal - numericPotongan;
    setDPP(newDPP);
    if (!isChecked) setJumlah(newDPP);
    updatePPN(newDPP);
  };

  const handleTarifPPnBMChange = (value) => {
    setTarifPPnBM(value);
    const numericJumlah = parseInt(jumlah || "0", 10) || 0;
    const numericPPnBM = parseInt(value.replace(/\D/g, ""), 10) || 0;
    setPPnBM(formatRupiah(((numericJumlah * numericPPnBM) / 100).toString()));
  };

  const handleJumlahChange = (value) => {
    if (isChecked) {
      setJumlah(value);
      updatePPN(value);
    }
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    if (!isChecked) {
      setJumlah(dpp);
      updatePPN(dpp);
    }
  };

  return (
    <div className="flex items-start">
      {/* <SideBarEfaktur /> */}

      <SideBarEfaktur
        npwp_akun={sidebar.npwp_akun}
        nama_akun={sidebar.nama_akun}
        akun={{ id, akun }}
      />
      <div className="w-full flex-grow p-6 bg-white h-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Edit Faktur Pajak Masukan
        </h2>
        <div
          className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 "
          onClick={() => setShowDokumenTransaksi(!showDokumenTransaksi)}
        >
          <h3 className="text-lg font-semibold">Dokumen Transaksi</h3>
          {showDokumenTransaksi ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {showDokumenTransaksi && (
          <div className="border rounded-md p-2 mb-2">
            <div className=" rounded-md p-4 mb-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Nomor Faktur
                </label>
                <input
                  readOnly
                  value={data?.nomor_faktur_pajak}
                  type="text"
                  className="border rounded-md p-2 w-full"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Tanggal Faktur
                </label>
                <p className="border rounded-md p-2 w-full">
                  {data?.masa_pajak} {data?.tahun}
                </p>
              </div>
              <div className="space-y-2"></div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">NPWP</label>
                <input
                  type="text"
                  value={data?.akun_pengirim_id?.npwp_akun}
                  className="border rounded-md p-2 w-full cursor-not-allowed bg-gray-100"
                  disabled
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Nama Penjual
                </label>
                <input
                  type="text"
                  value={data?.akun_pengirim_id?.nama_akun}
                  className="border rounded-md p-2 w-full cursor-not-allowed bg-gray-100"
                  disabled
                />
              </div>
              <div className="space-y-2"></div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">Nomor Retur</label>
                <input
                  type="text"
                  className="border rounded-md p-2 w-full cursor-not-allowed bg-gray-100"
                  disabled
                  value={data?.nomor_retur}
                />
              </div>
              <div className="space-y-2"></div>
              <div className="space-y-2"></div>
              {/* <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Tanggal Retur
                </label> */}
              {/* <input
                  readOnly
                  value={data?.tanggal_retur}
                  className="border rounded-md p-2 w-full"
                /> */}
              {/* <input
                  type="text"
                  value={tanggalRetur}
                  onChange={(e) => setTanggalRetur(e.target.value)}
                  className="border rounded-md p-2 w-full"
                  placeholder="DD-M-YYYY"
                /> */}
              {/* <input
                  type="date"
                  value={tanggalRetur}
                  onChange={(e) => setTanggalRetur(e.target.value)}
                  className="border rounded-md p-2 w-full"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Periode Retur
                </label> */}
              {/* <input type="month" className="border rounded-md p-2 w-full" /> */}
              {/* <p className="border rounded-md p-2 w-full">
                  {data?.masa_pajak} {data?.tahun}
                </p>
              </div> */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Tanggal Retur
                </label>
                <input
                  type="date"
                  value={tanggalRetur}
                  onChange={handleTanggalReturChange}
                  className="border rounded-md p-2 w-full"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Periode Retur
                </label>
                <input
                  type="text"
                  value={periodeRetur}
                  className="border rounded-md p-2 w-full bg-gray-100"
                  readOnly
                  placeholder="Periode akan terisi otomatis"
                />
              </div>
              <div className="space-y-2"></div>
            </div>
            <div className="rounded-md p-4 mb-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  DPP diretur *
                </label>
                <input
                  type="text"
                  value={formatRupiah(data?.dpp)}
                  className="border rounded-md p-2 w-full cursor-not-allowed bg-gray-100"
                  disabled
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">Maks *</label>
                <input
                  type="text"
                  value={formatRupiah(data?.dpp)}
                  className="border rounded-md p-2 w-full cursor-not-allowed bg-gray-100"
                  disabled
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  DPP Nilai Lain diretur *
                </label>
                <input
                  type="text"
                  value={formatRupiah(data?.dpp_lain_retur)}
                  className="border rounded-md p-2 w-full cursor-not-allowed bg-gray-100"
                  disabled
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">Maks *</label>
                <input
                  type="text"
                  value={formatRupiah(data?.dpp_lain_retur)}
                  className="border rounded-md p-2 w-full cursor-not-allowed bg-gray-100"
                  disabled
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  PPN diretur *
                </label>
                <input
                  value={formatRupiah(data?.ppn_retur)}
                  type="text"
                  className="border rounded-md p-2 w-full cursor-not-allowed bg-gray-100"
                  disabled
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">Maks *</label>
                <input
                  value={formatRupiah(data?.ppn_retur)}
                  type="text"
                  className="border rounded-md p-2 w-full cursor-not-allowed bg-gray-100"
                  disabled
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  PPnBM diretur *
                </label>
                <input
                  value={formatRupiah(data?.ppnbm_retur)}
                  type="text"
                  className="border rounded-md p-2 w-full cursor-not-allowed bg-gray-100"
                  disabled
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">Maks *</label>
                <input
                  value={formatRupiah(data?.ppnbm_retur)}
                  type="text"
                  className="border rounded-md p-2 w-full cursor-not-allowed bg-gray-100"
                  disabled
                />
              </div>
            </div>
          </div>
        )}
        <div
          className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 "
          onClick={() => setShowDetailTransaksi(!showDetailTransaksi)}
        >
          <h3 className="text-lg font-semibold">Detail Transaksi</h3>
          {showDetailTransaksi ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {showDetailTransaksi && (
          <div className="border rounded-md p-2 mb-2">
            <div className="w-auto overflow-x-auto bg-white shadow-md rounded-lg overflow-hidden">
              <table className="table-auto border border-gray-300 overflow-hidden">
                <thead>
                  <tr>
                    <th className="border border-gray-300 px-2 py-2"></th>
                    <th className="border border-gray-300 px-2 py-2"></th>
                    <th className="border border-gray-300 px-4 py-2">Tipe</th>
                    <th className="border border-gray-300 px-4 py-2">Nama</th>
                    <th className="border border-gray-300 px-4 py-2">Kode</th>
                    <th className="border border-gray-300 px-4 py-2">
                      Kuantitas
                    </th>
                    <th className="border border-gray-300 px-4 py-2">Satuan</th>
                    <th className="border border-gray-300 px-4 py-2">
                      Harga Satuan
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Total Harga
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Potongan Harga
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Tarif PPN
                    </th>
                    <th className="border border-gray-300 px-4 py-2">DPP</th>
                    <th className="border border-gray-300 px-4 py-2">PPN</th>
                    <th className="border border-gray-300 px-4 py-2">
                      DPP Nilai Lain/DPP
                    </th>
                    <th className="border border-gray-300 px-4 py-2">PPnBM</th>
                    <th className="border border-gray-300 px-4 py-2">
                      Tarif PPnBM
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data?.detail_transaksi?.map((transaction, index) => (
                    <tr key={transaction.id || index}>
                      <td className="border border-gray-300 px-2 py-2">
                        <input type="checkbox" />
                      </td>
                      <td className="border border-gray-300 px-2 py-2">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <button>
                              <FaSquarePen className="text-lg text-blue-900" />
                            </button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="bg-white rounded-md shadow-md p-4 !min-w-[1000px]">
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Edit Transaksi
                              </AlertDialogTitle>
                            </AlertDialogHeader>
                            <div className="grid grid-cols-2 gap-6 w-full overflow-auto h-96">
                              <div className="space-y-4 h-full">
                                <div className="space-y-2">
                                  <label className="block text-sm font-medium">
                                    Tipe
                                  </label>
                                  <div className="grid grid-cols-2 gap-3">
                                    <label className="flex items-center gap-2">
                                      <input
                                        type="radio"
                                        name="tipe"
                                        value="Barang"
                                        checked={tipe === "Barang"}
                                        onChange={() => setTipe("Barang")}
                                      />
                                      Barang
                                    </label>
                                    <label className="flex items-center gap-2">
                                      <input
                                        type="radio"
                                        name="tipe"
                                        value="Jasa"
                                        checked={tipe === "Jasa"}
                                        onChange={() => setTipe("Jasa")}
                                      />
                                      Jasa
                                    </label>
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <label className="block text-sm font-medium">
                                    Kode
                                  </label>
                                  <Select
                                    placeholder="Pilih kode barang/jasa"
                                    className="w-full"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <label className="block text-sm font-medium">
                                    Nama
                                  </label>
                                  <input
                                    type="text"
                                    className="p-2 border rounded w-full bg-gray-100"
                                    value={transaction.nama}
                                    onChange={(e) =>
                                      setNamaBarang(e.target.value)
                                    }
                                    placeholder="Galeh Ganteng Serigala"
                                    readOnly
                                  />
                                </div>
                                <div className="space-y-2">
                                  <label className="block text-sm font-medium">
                                    Satuan
                                  </label>
                                  {/* <select
                                    id=""
                                    className="p-2 border rounded w-full bg-gray-100"
                                  ></select> */}

                                  <input
                                    type="text"
                                    className="p-2 border rounded w-full bg-gray-100"
                                    value={transaction.satuan}
                                    onChange={(e) =>
                                      setNamaBarang(e.target.value)
                                    }
                                    placeholder="Galeh Ganteng Serigala"
                                    readOnly
                                  />
                                </div>
                                <div className="space-y-2">
                                  <label className="block text-sm font-medium">
                                    Harga Satuan
                                  </label>
                                  <NumericFormat
                                    value={transaction.harga_satuan}
                                    onValueChange={({ value }) =>
                                      handleHargaSatuanChange(value)
                                    }
                                    thousandSeparator="."
                                    decimalSeparator=","
                                    prefix="Rp "
                                    className="p-2 border rounded w-full bg-gray-100"
                                    placeholder="Rp 0"
                                    allowNegative={false}
                                    readOnly
                                    decimalScale={0}
                                  />
                                </div>
                                {/* <div className="space-y-2">
                                                                <label className="block text-sm font-medium">Kuantitas</label>
                                                                <input
                                                                    type="number"
                                                                    className="p-2 border rounded w-full"
                                                                    min="0"
                                                                    step="1"
                                                                    value={kuantitas === 0 ? "" : kuantitas}
                                                                    onChange={e => handleKuantitasChange(e.target.value)}
                                                                    placeholder="0"
                                                                />
                                                            </div> */}
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <label className="block text-sm font-medium">
                                      Jumlah Barang Diretur
                                    </label>
                                    <input
                                      type="number"
                                      value={jumlahBarangDiretur}
                                      min="0"
                                      max={transaction.kuantitas_asli}
                                      onFocus={(e) => {
                                        // Clear the field if it's 0 when user focuses
                                        if (jumlahBarangDiretur === 0) {
                                          setJumlahBarangDiretur("");
                                        }
                                      }}
                                      onChange={(e) => {
                                        const value = e.target.value;
                                        if (value === "") {
                                          setJumlahBarangDiretur("");
                                        } else {
                                          const numericValue =
                                            parseInt(value, 10) || 0;
                                          // Ensure the value doesn't exceed kuantitas
                                          if (
                                            numericValue <=
                                            transaction.kuantitas_asli
                                          ) {
                                            setJumlahBarangDiretur(
                                              numericValue
                                            );
                                          }
                                        }
                                      }}
                                      onBlur={(e) => {
                                        // Set back to 0 if empty when user leaves the field
                                        if (e.target.value === "") {
                                          setJumlahBarangDiretur(0);
                                        }
                                      }}
                                      className="p-2 border rounded w-full bg-white"
                                    />
                                    {/* Optional: Add a helper text to show the maximum allowed value */}
                                    <p className="text-xs text-gray-500">
                                      Maksimal: {transaction.kuantitas_asli}
                                    </p>
                                  </div>
                                  <div className="space-y-2">
                                    <label className="block text-sm font-medium">
                                      KUANTITAS
                                    </label>
                                    <input
                                      className="p-2 border rounded w-full bg-gray-100"
                                      value={transaction.kuantitas_asli}
                                      placeholder="0"
                                      readOnly
                                    />
                                    <p className="text-xs text-gray-500">
                                      Kuantitas barang
                                    </p>
                                  </div>
                                </div>

                                <div className="space-y-2">
                                  <label className="block text-sm font-medium">
                                    Total Harga
                                  </label>
                                  <input
                                    // type="number"
                                    value={formatRupiah(
                                      transaction.total_harga
                                    )}
                                    className="p-2 border rounded w-full bg-gray-100"
                                    readOnly
                                  />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <label className="block text-sm font-medium">
                                      Potongan Harga Diretur
                                    </label>
                                    <NumericFormat
                                      value={pemotonganHargaDiretur}
                                      onValueChange={({ value }) => {
                                        const numericValue =
                                          parseInt(value || "0", 10) || 0;
                                        const maxValue =
                                          parseInt(
                                            transaction.pemotongan_harga || "0",
                                            10
                                          ) || 0;

                                        // Ensure the value doesn't exceed the original pemotongan_harga
                                        if (numericValue <= maxValue) {
                                          setPemotonganHargaDiretur(value);
                                        }
                                      }}
                                      thousandSeparator="."
                                      decimalSeparator=","
                                      prefix="Rp "
                                      className="p-2 border rounded w-full bg-white"
                                      placeholder="Rp 0"
                                      allowNegative={false}
                                      isAllowed={(values) => {
                                        const { floatValue } = values;
                                        const maxValue =
                                          parseInt(
                                            transaction.potongan_harga_asli ||
                                              "0",
                                            10
                                          ) || 0;
                                        return (
                                          !floatValue || floatValue <= maxValue
                                        );
                                      }}
                                      decimalScale={0}
                                    />
                                    {/* Optional: Add a helper text to show the maximum allowed value */}
                                    <p className="text-xs text-gray-500">
                                      Maksimal:{" "}
                                      {formatRupiah(
                                        transaction.potongan_harga_asli
                                      )}
                                    </p>
                                  </div>
                                  <div className="space-y-2">
                                    <label className="block text-sm font-medium">
                                      Potongan Harga
                                    </label>
                                    <NumericFormat
                                      value={transaction.potongan_harga_asli}
                                      // onValueChange={({ value }) => {
                                      //   const numericValue =
                                      //     parseInt(value || "0", 10) || 0;
                                      //   const maxValue =
                                      //     parseInt(
                                      //       transaction.pemotongan_harga || "0",
                                      //       10
                                      //     ) || 0;

                                      //   // Ensure the value doesn't exceed the original pemotongan_harga
                                      //   if (numericValue <= maxValue) {
                                      //     setPemotonganHargaDiretur(value);
                                      //   }
                                      // }}
                                      thousandSeparator="."
                                      decimalSeparator=","
                                      prefix="Rp "
                                      className="p-2 border rounded w-full bg-gray-100"
                                      placeholder="Rp 0"
                                      allowNegative={false}
                                      disabled
                                      decimalScale={0}
                                    />
                                    {/* <input
                                      className="p-2 border rounded w-full bg-gray-100"
                                      type="number"
                                      placeholder="0"
                                      // value={transaction.potongan_harga_asli}
                                      // value={formatRupiah(
                                      //   transaction.potongan_harga_asli
                                      // )}
                                      readOnly
                                    /> */}
                                    <p className="text-xs text-gray-500">
                                      Potongan Harga Faktur
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="space-y-4 h-full">
                                <div className="text-center">PPN dan PPnBM</div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <label className="block text-sm font-medium">
                                      DPP diretur
                                    </label>
                                    <NumericFormat
                                      className="p-2 border rounded w-full bg-gray-100"
                                      placeholder="0"
                                      thousandSeparator="."
                                      decimalSeparator=","
                                      prefix="Rp "
                                      allowNegative={false}
                                      readOnly
                                      value={formatRupiah(transaction.dpp)}
                                      decimalScale={0}
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <label className="">DPP</label>
                                    <NumericFormat
                                      className="p-2 border rounded w-full bg-gray-100"
                                      placeholder="0"
                                      thousandSeparator="."
                                      decimalSeparator=","
                                      prefix="Rp "
                                      allowNegative={false}
                                      readOnly
                                      value={formatRupiah(transaction.dpp_asli)}
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <label className="block text-sm font-medium">
                                      DPP Nilai Lain diretur
                                    </label>
                                    <NumericFormat
                                      className="p-2 border rounded w-full bg-white"
                                      placeholder="0"
                                      thousandSeparator="."
                                      decimalSeparator=","
                                      prefix="Rp "
                                      allowNegative={false}
                                      value={
                                        dppLainReturEdit ||
                                        transaction.dpp_lain_retur
                                      }
                                      onValueChange={({ value }) => {
                                        const numericValue =
                                          parseInt(value || "0", 10) || 0;
                                        const maxValue =
                                          parseInt(
                                            transaction.dpp_lain_asli || "0",
                                            10
                                          ) || 0;

                                        // Only allow input if it doesn't exceed maximum
                                        if (numericValue <= maxValue) {
                                          setDppLainReturEdit(value);
                                          const dppNumber = parseInt(
                                            value || "0",
                                            10
                                          );
                                          setPpnReturEdit(
                                            (dppNumber * 0.12).toString()
                                          );
                                        }
                                      }}
                                      isAllowed={(values) => {
                                        const { floatValue } = values;
                                        const maxValue =
                                          parseInt(
                                            transaction.dpp_lain_asli || "0",
                                            10
                                          ) || 0;
                                        // Strictly enforce maximum during typing
                                        return (
                                          !floatValue || floatValue <= maxValue
                                        );
                                      }}
                                      decimalScale={0}
                                    />
                                    {/* Helper text to show maximum allowed value */}
                                    <p className="text-xs text-gray-500">
                                      Maksimal:{" "}
                                      {formatRupiah(transaction.dpp_lain_asli)}
                                    </p>
                                  </div>
                                  <div className="space-y-2">
                                    <label className="">
                                      DPP Nilai Lain/DPP
                                    </label>
                                    <NumericFormat
                                      className="p-2 border rounded w-full bg-gray-100"
                                      placeholder="0"
                                      thousandSeparator="."
                                      decimalSeparator=","
                                      value={formatRupiah(
                                        transaction.dpp_lain_asli
                                      )}
                                      prefix="Rp "
                                      allowNegative={false}
                                      readOnly
                                    />
                                    <p className="text-xs text-gray-500">
                                      DPP Faktur
                                    </p>
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <label className="block text-sm font-medium">
                                    Tarif PPN
                                  </label>
                                  <input
                                    type="text"
                                    className="p-2 rounded-md border w-full bg-gray-100"
                                    value="12%"
                                    readOnly
                                  />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <label className="block text-sm font-medium">
                                      PPN diretur
                                    </label>
                                    <NumericFormat
                                      className="p-2 border rounded w-full bg-white"
                                      placeholder="0"
                                      thousandSeparator="."
                                      decimalSeparator=","
                                      prefix="Rp "
                                      allowNegative={false}
                                      value={ppnReturEdit}
                                      onValueChange={({ value }) => {
                                        const numericValue =
                                          parseInt(value || "0", 10) || 0;
                                        const maxValue =
                                          parseInt(
                                            transaction.ppn_retur || "0",
                                            10
                                          ) || 0;

                                        // Only allow input if it doesn't exceed maximum
                                        if (numericValue <= maxValue) {
                                          setPpnReturEdit(value);
                                        }
                                      }}
                                      isAllowed={(values) => {
                                        const { floatValue } = values;
                                        const maxValue =
                                          parseInt(
                                            transaction.ppn_retur || "0",
                                            10
                                          ) || 0;
                                        // Strictly enforce maximum during typing
                                        return (
                                          !floatValue || floatValue <= maxValue
                                        );
                                      }}
                                      decimalScale={0}
                                    />
                                    {/* Helper text to show maximum allowed value */}
                                    <p className="text-xs text-gray-500">
                                      Maksimal:{" "}
                                      {formatRupiah(transaction.ppn_retur)}
                                    </p>
                                  </div>
                                  <div className="space-y-2">
                                    <label className="block text-sm font-medium">
                                      PPN
                                    </label>
                                    <NumericFormat
                                      className="p-2 border rounded w-full bg-gray-100"
                                      placeholder="0"
                                      thousandSeparator="."
                                      decimalSeparator=","
                                      prefix="Rp "
                                      allowNegative={false}
                                      value={ppnRetur}
                                      displayType="input"
                                      readOnly
                                      decimalScale={0}
                                    />
                                    <p className="text-xs text-gray-500">
                                      PPN Faktur
                                    </p>
                                  </div>
                                </div>

                                <div className="space-y-2">
                                  <label className="block text-sm font-medium">
                                    Tarif PPnBM
                                  </label>
                                  <input
                                    type="text"
                                    className="p-2 rounded-md border w-full bg-gray-100"
                                    value={formatRupiah(
                                      transaction.tarif_ppnbm_asli
                                    )}
                                    readOnly
                                  />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <label className="block text-sm font-medium">
                                      PPnBM diretur
                                    </label>
                                    <NumericFormat
                                      className="p-2 border rounded w-full bg-white"
                                      placeholder="0"
                                      thousandSeparator="."
                                      decimalSeparator=","
                                      prefix="Rp "
                                      allowNegative={false}
                                      value={
                                        ppnbmReturEdit ||
                                        transaction.ppnbm_retur
                                      }
                                      onValueChange={({ value }) => {
                                        const numericValue =
                                          parseInt(value || "0", 10) || 0;
                                        const maxValue =
                                          parseInt(
                                            transaction.ppnbm_asli || "0",
                                            10
                                          ) || 0;

                                        // Only allow input if it doesn't exceed maximum
                                        if (numericValue <= maxValue) {
                                          setPpnbmReturEdit(value);
                                        }
                                      }}
                                      isAllowed={(values) => {
                                        const { floatValue } = values;
                                        const maxValue =
                                          parseInt(
                                            transaction.ppnbm_asli || "0",
                                            10
                                          ) || 0;
                                        // Strictly enforce maximum during typing
                                        return (
                                          !floatValue || floatValue <= maxValue
                                        );
                                      }}
                                      decimalScale={0}
                                    />
                                    {/* Helper text to show maximum allowed value */}
                                    <p className="text-xs text-gray-500">
                                      Maksimal:{" "}
                                      {formatRupiah(transaction.ppnbm_asli)}
                                    </p>
                                  </div>
                                  <div className="space-y-2">
                                    <label className="block text-sm font-medium">
                                      PPnBM
                                    </label>
                                    <NumericFormat
                                      className="p-2 border rounded w-full bg-gray-100"
                                      placeholder="0"
                                      thousandSeparator="."
                                      decimalSeparator=","
                                      prefix="Rp "
                                      allowNegative={false}
                                      value={formatRupiah(
                                        transaction.ppnbm_asli
                                      )}
                                      displayType="input"
                                      readOnly
                                      decimalScale={0}
                                    />
                                    <p className="text-xs text-gray-500">
                                      PPnBM Faktur
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">
                                Batal
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() =>
                                  updateDetailTransaksi.mutate({
                                    idTransaksi: transaction.id,
                                  })
                                }
                                className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-950"
                              >
                                Simpan
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {transaction.tipe}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {transaction.nama}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {transaction.kode}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {transaction.kuantitas}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {transaction.satuan}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {formatRupiah(transaction.harga_satuan)}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {formatRupiah(transaction.total_harga)}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {formatRupiah(transaction.pemotongan_harga)}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">12%</td>
                      <td className="border border-gray-300 px-4 py-2">
                        {formatRupiah(transaction.dpp)}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {formatRupiah(transaction.ppn_retur)}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {formatRupiah(transaction.dpp_lain_retur)}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {formatRupiah(transaction.ppnbm_retur)}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {transaction.tarif_ppnbm}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-50 font-medium">
                    <td className="border border-gray-300 px-2 py-2"></td>
                    <td className="border border-gray-300 px-2 py-2"></td>
                    <td className="border border-gray-300 px-4 py-2"></td>
                    <td className="border border-gray-300 px-4 py-2"></td>
                    <td className="border border-gray-300 px-4 py-2"></td>
                    <td className="border border-gray-300 px-4 py-2"></td>
                    <td className="border border-gray-300 px-4 py-2"></td>
                    <td className="border border-gray-300 px-4 py-2 text-right font-semibold">
                      RETUR
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {/* {formatRupiah(
                        data?.detail_transaksi?.reduce(
                          (sum, transaction) =>
                            sum +
                            (parseInt(transaction.total_harga || "0", 10) || 0),
                          0
                        )
                      )} */}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {/* {formatRupiah(
                        data?.detail_transaksi?.reduce(
                          (sum, transaction) =>
                            sum +
                            (parseInt(
                              transaction.pemotongan_harga || "0",
                              10
                            ) || 0),
                          0
                        )
                      )} */}
                    </td>
                    <td className="border border-gray-300 px-4 py-2"></td>
                    <td className="border border-gray-300 px-4 py-2">
                      {/* {formatRupiah(
                        data?.detail_transaksi?.reduce(
                          (sum, transaction) =>
                            sum + (parseInt(transaction.dpp || "0", 10) || 0),
                          0
                        )
                      )} */}
                      {formatRupiah(data.jumlah_dpp_retur)}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {/* {formatRupiah(
                        data?.detail_transaksi?.reduce(
                          (sum, transaction) =>
                            sum +
                            (parseInt(transaction.ppn_retur || "0", 10) || 0),
                          0
                        )
                      )} */}
                      {formatRupiah(data.jumlah_ppn_retur)}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {/* {formatRupiah(
                        data?.detail_transaksi?.reduce(
                          (sum, transaction) =>
                            sum +
                            (parseInt(transaction.dpp_lain_retur || "0", 10) ||
                              0),
                          0
                        )
                      )} */}

                      {formatRupiah(data.jumlah_dpp_lain_retur)}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {/* {formatRupiah(
                        data?.detail_transaksi?.reduce(
                          (sum, transaction) =>
                            sum +
                            (parseInt(transaction.ppnbm_retur || "0", 10) || 0),
                          0
                        )
                      )} */}
                      {formatRupiah(data.jumlah_ppnbm_retur)}
                    </td>
                    <td className="border border-gray-300 px-4 py-2"></td>
                  </tr>
                  <tr className="bg-gray-100 font-bold">
                    <td className="border border-gray-300 px-2 py-2"></td>
                    <td className="border border-gray-300 px-2 py-2"></td>
                    <td className="border border-gray-300 px-4 py-2"></td>
                    <td className="border border-gray-300 px-4 py-2"></td>
                    <td className="border border-gray-300 px-4 py-2"></td>
                    <td className="border border-gray-300 px-4 py-2"></td>
                    <td className="border border-gray-300 px-4 py-2"></td>
                    <td className="border border-gray-300 px-4 py-2 text-right font-bold">
                      JUMLAH
                    </td>
                    <td className="border border-gray-300 px-4 py-2 font-bold">
                      {/* {formatRupiah(
                        data?.detail_transaksi?.reduce(
                          (sum, transaction) =>
                            sum +
                            (parseInt(transaction.total_harga || "0", 10) || 0),
                          0
                        )
                      )} */}

                      {formatRupiah(data.jumlah_total_bayar_retur)}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 font-bold">
                      {/* {formatRupiah(
                        data?.detail_transaksi?.reduce(
                          (sum, transaction) =>
                            sum +
                            (parseInt(
                              transaction.pemotongan_harga || "0",
                              10
                            ) || 0),
                          0
                        )
                      )} */}
                      {formatRupiah(data.jumlah_pemotongan_harga_retur)}
                    </td>
                    <td className="border border-gray-300 px-4 py-2"></td>
                    <td className="border border-gray-300 px-4 py-2 font-bold">
                      {/* {formatRupiah(
                        data?.detail_transaksi?.reduce(
                          (sum, transaction) =>
                            sum + (parseInt(transaction.dpp || "0", 10) || 0),
                          0
                        )
                      )} */}

                      {formatRupiah(data.dpp)}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 font-bold">
                      {/* {formatRupiah(
                        data?.detail_transaksi?.reduce(
                          (sum, transaction) =>
                            sum +
                            (parseInt(transaction.ppn_retur || "0", 10) || 0),
                          0
                        )
                      )} */}
                      {formatRupiah(data.ppn)}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 font-bold">
                      {/* {formatRupiah(
                        data?.detail_transaksi?.reduce(
                          (sum, transaction) =>
                            sum +
                            (parseInt(transaction.dpp_lain_retur || "0", 10) ||
                              0),
                          0
                        )
                      )} */}
                      {formatRupiah(data.dpp_nilai)}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 font-bold">
                      {/* {formatRupiah(
                        data?.detail_transaksi?.reduce(
                          (sum, transaction) =>
                            sum +
                            (parseInt(transaction.ppnbm_retur || "0", 10) || 0),
                          0
                        )
                      )} */}
                      {formatRupiah(data.ppnbm)}
                    </td>
                    <td className="border border-gray-300 px-4 py-2"></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        )}
        <div className="flex space-x-4 mt-4">
          <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
            Batalkan Konsep
          </button>
          <button
            onClick={handleUploadKonsep}
            disabled={updateFakturRetur.isPending}
            className={`px-4 py-2 rounded-md text-white ${
              updateFakturRetur.isPending
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {updateFakturRetur.isPending ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Loading...
              </div>
            ) : (
              "Upload Konsep"
            )}
          </button>

          {/* <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                Upload Konsep
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-white rounded-md shadow-md p-4 !min-w-[1000px]">
              <AlertDialogHeader className="flex flex-row items-center justify-between gap-4">
                <AlertDialogTitle className="text-lg font-semibold">
                  Tanda Tangan Dokumen
                </AlertDialogTitle>
                <AlertDialogCancel asChild>
                  <button
                    className="text-gray-500 hover:text-gray-700 text-2xl font-bold px-2 py-0 rounded-md focus:outline-none"
                    aria-label="Close"
                  >
                    <FiX />
                  </button>
                </AlertDialogCancel>
              </AlertDialogHeader>
              <div className="p-2 border rounded-md">
                <div className="block text-sm font-bold">Tanda Tangan</div>
                <div className=" p-2 rounded-md border">
                  <div className="space-y-2 grid grid-cols-2 items-center">
                    <label className="block text-sm font-medium">
                      Jenis Penandatanganan *
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-md bg-gray-100"
                      readOnly
                    />
                  </div>
                  <div className="space-y-2 grid grid-cols-2 items-center">
                    <label className="block text-sm font-medium">
                      Penyedia Penandatangan *
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-md bg-gray-100"
                      readOnly
                    />
                  </div>
                  <div className="space-y-2 grid grid-cols-2 items-center">
                    <label className="block text-sm font-medium">
                      ID Penandatangan *
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-md bg-gray-100"
                      readOnly
                    />
                  </div>
                  <div className="space-y-2 grid grid-cols-2 items-center">
                    <label className="block text-sm font-medium">
                      Kata Sandi Penandatangan *
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-md "
                    />
                  </div>
                </div>
              </div>
              <AlertDialogFooter>
                <AlertDialogAction className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                  Simpan
                </AlertDialogAction>
                <AlertDialogAction className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-950">
                  Konfirmasi Tanda Tangan
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog> */}
        </div>
      </div>
    </div>
  );
};

export default EditReturFaktur;
