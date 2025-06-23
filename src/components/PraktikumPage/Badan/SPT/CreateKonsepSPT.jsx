import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FaCalendarAlt,
  FaFilter,
  FaSearch,
  FaTimes,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
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
import { FaTrash } from "react-icons/fa";
import DynamicUploadTable from "@/components/common/DynamicUploadTable";
import { useDynamicTableRows } from "@/hooks/useDynamicTableRows";
import axios from "axios";
import { getCsrf } from "@/service/getCsrf";
import Swal from "sweetalert2";
import { useParams, useSearchParams } from "react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { RoutesApi } from "@/Routes";
import { useCookies } from "react-cookie";
import { useNavigateWithParams } from "@/hooks/useNavigateWithParams";
import { ClipLoader } from "react-spinners";

// const columnsUpload = [
//   { key: "file", label: "File Excel", type: "file", accept: ".xlsx,.xls,.csv" },
// { key: "DPP Nilai Lain", label: "DPP Lain", type: "number" },
//   { key: "DPP Nilai Lain Lain", label: "DPP Lain Lain", type: "number" },
//   { key: "PPN", label: "PPN", type: "number" },
//   { key: "PPnBM", label: "PPnBM", type: "number" },
// ];
const columnsUpload = [
  { key: "file", label: "Upload File", type: "file" },
  { key: "dppHargaJual", label: "DPP/Harga Jual", type: "number" },
  { key: "dppNilaiLain", label: "DPP Nilai Lain", type: "number" },
  { key: "ppn", label: "PPN", type: "number" },
  { key: "ppnbm", label: "PPnBM", type: "number" },
];
const initialRowUpload = {
  file: null,
  hargaJual: "",
  dppLain: "",
  ppn: "",
  ppnbm: "",
};
// const formatNumber = (val) => {
//     if (!val) return 0;
//     return Number(val);
// };

const CreateKonsepSPT = ({ data }) => {
  const { id, akun, idSpt } = useParams();
  const [activeTab, setActiveTab] = useState("induk");
  const [activeTabContent, setActiveTabContent] = useState("A1");
  const [showHeaderInduk, setShowHeaderInduk] = useState(false);
  const [showPenyerahanBarangJasa, setShowPenyerahanBarangJasa] =
    useState(false);
  const [showPerolehanBarangJasa, setShowPerolehanBarangJasa] = useState(false);
  const [
    showPenghitunganPPNKurangBayarLebihBayar,
    setShowPenghitunganBayarLebihBayar,
  ] = useState(false);
  const [
    showPPNTerutangAtasKegiatanMembangunSendiri,
    setShowPPNTerutangAtasKegiatanMembangunSendiri,
  ] = useState(false);
  const [
    showPembayaranKembaliPajakMasukanTidakDapatDikreditkan,
    setShowPembayaranKembaliPajakMasukanYangTidakDapatDikreditkan,
  ] = useState(false);
  const [
    showPajakPenjualanAtasBarangMewah,
    setShowPajakPenjualanAtasBarangMewah,
  ] = useState(false);
  const [
    showPemungutanPPNatauPPNdanPPNMBolehPemungutPPN,
    setShowPemungutanPPNatauPPNdanPPNMBolehPemungutPPN,
  ] = useState(false);
  const [
    showPemungutanPPNatauPPNdanPPNMBolehPihakLain,
    setShowPemungutanPPNatauPPNdanPPNMBolehPihakLain,
  ] = useState(false);
  const [showKelengkapan, setShowKelengkapan] = useState(false);
  const [showPernyataan, setShowPernyataan] = useState(false);

  const [showHeadera1, setShowHeadera1] = useState(false);
  const [showHeadera2, setShowHeadera2] = useState(false);
  const [showHeaderb1, setShowHeaderb1] = useState(false);
  const [showHeaderb2, setShowHeaderb2] = useState(false);
  const [showHeaderb3, setShowHeaderb3] = useState(false);
  const [showHeaderc, setShowHeaderc] = useState(false);

  const [showScrollTop, setShowScrollTop] = useState(false);
  const [openUpload, setOpenUpload] = useState(false);
  const [openLampiran, setOpenLampiran] = useState(false);
  const [openPenyerahan, setOpenPenyerahan] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const viewAsCompanyId = searchParams.get("viewAs");
  // const formatRupiah = (number) => {
  //   if (typeof number !== "number") return "";
  //   return new Intl.NumberFormat("id-ID", {
  //     style: "currency",
  //     currency: "IDR",
  //     minimumFractionDigits: 0,
  //   }).format(number);
  // };
  const formatRupiah = (number) => {
    if (typeof number !== "number" && typeof number !== "string") return "";
    const numericValue =
      typeof number === "string"
        ? Number(number.replace(/[^0-9]/g, ""))
        : number;
    if (isNaN(numericValue)) return "";
    return new Intl.NumberFormat("id-ID", {
      style: "decimal",
      minimumFractionDigits: 0,
    }).format(numericValue);
  };
  const stripRupiahFormat = (value) => {
    if (!value) return value;
    // Remove all dots from the string
    return value.toString().replace(/\./g, "");
  };

  // Add this function to calculate totals from the table
  const calculateTableTotals = (tableRows, columns) => {
    const totals = {};

    columns.forEach((col) => {
      if (col.type === "number") {
        totals[col.key] = tableRows.reduce((sum, row) => {
          const value = parseFloat(row[col.key]) || 0;
          return sum + value;
        }, 0);
      }
    });

    return totals;
  };

  // Function to apply totals to form based on dialog type
  const applyTotalsToForm = (dialogType, tableRows, columns) => {
    const totals = calculateTableTotals(tableRows, columns);

    setFormData((prevData) => {
      const newData = { ...prevData };

      switch (dialogType) {
        case "upload": // Row 5 (cl_1a5_*)
          newData.cl_1a5_dpp = totals.dppHargaJual?.toString() || "0";
          newData.cl_1a5_dpp_lain = totals.dppNilaiLain?.toString() || "0";
          newData.cl_1a5_ppn = totals.ppn?.toString() || "0";
          newData.cl_1a5_ppnbm = totals.ppnbm?.toString() || "0";
          break;

        case "lampiran": // Row 9 (cl_1a9_*)
          newData.cl_1a9_dpp = totals.dppHargaJual?.toString() || "0";
          newData.cl_1a9_dpp_lain = totals.dppNilaiLain?.toString() || "0";
          newData.cl_1a9_ppn = totals.ppn?.toString() || "0";
          newData.cl_1a9_ppnbm = totals.ppnbm?.toString() || "0";
          break;

        case "penyerahan": // Row B (cl_1b_*)
          newData.cl_1b_dpp = totals.hargaJual?.toString() || "0";
          break;

        default:
          break;
      }

      return newData;
    });
  };

  const [cookies] = useCookies(["token"]);

  const [formData, setFormData] = useState({
    cl_1b_jumlah_dpp: formatRupiah(data?.detail_spt?.cl_1b_jumlah_dpp || "0"),
    cl_1a5_dpp: formatRupiah(data?.detail_spt?.cl_1a5_dpp || "0"),
    cl_1a5_dpp_lain: formatRupiah(data?.detail_spt?.cl_1a5_dpp_lain || "0"),
    cl_1a5_ppn: formatRupiah(data?.detail_spt?.cl_1a5_ppn || "0"),
    cl_1a5_ppnbm: formatRupiah(data?.detail_spt?.cl_1a5_ppnbm || "0"),
    cl_1a9_dpp: formatRupiah(data?.detail_spt?.cl_1a9_dpp || "0"),
    cl_1a9_dpp_lain: formatRupiah(data?.detail_spt?.cl_1a9_dpp_lain || "0"),
    cl_1a9_ppn: formatRupiah(data?.detail_spt?.cl_1a9_ppn || "0"),
    cl_1a9_ppnbm: formatRupiah(data?.detail_spt?.cl_1a9_ppnbm || "0"),
    cl_2e_ppn: formatRupiah(data?.detail_spt?.cl_2e_ppn || "0"),
    cl_2f_ppn: formatRupiah(data?.detail_spt?.cl_2f_ppn || "0"),
    cl_2i_dpp: formatRupiah(data?.detail_spt?.cl_2i_dpp || "0"),
    cl_3b_ppnb: formatRupiah(data?.detail_spt?.cl_3b_ppnb || "0"),
    cl_3d_ppnb: formatRupiah(data?.detail_spt?.cl_3d_ppnb || "0"),
    cl_3f_ppnb: formatRupiah(data?.detail_spt?.cl_3f_ppnb || "0"),
    cl_3h_diminta: data?.detail_spt?.cl_3h_diminta || "",
    cl_3h_nomor_rekening: data?.detail_spt?.cl_3h_nomor_rekening || "",
    cl_3h_nama_bank: data?.detail_spt?.cl_3h_nama_bank || "",
    cl_3h_nama_pemilik_bank: data?.detail_spt?.cl_3h_nama_pemilik_bank || "",
    cl_4_ppn_terutang_dpp: formatRupiah(
      data?.detail_spt?.cl_4_ppn_terutang_dpp || "0"
    ),
    cl_5_ppn_wajib: formatRupiah(data?.detail_spt?.cl_5_ppn_wajib || "0"),
    cl_6b_ppnbm: formatRupiah(data?.detail_spt?.cl_6b_ppnbm || "0"),
    cl_6d_ppnbm: formatRupiah(data?.detail_spt?.cl_6d_ppnbm || "0"),
    cl_6f_diminta_pengembalian: formatRupiah(
      data?.detail_spt?.cl_6f_diminta_pengembalian || "0"
    ),
    cl_7a_dpp: formatRupiah(data?.detail_spt?.cl_7a_dpp || "0"),
    cl_7a_dpp_lain: formatRupiah(data?.detail_spt?.cl_7a_dpp_lain || "0"),
    cl_7a_ppn: formatRupiah(data?.detail_spt?.cl_7a_ppn || "0"),
    cl_7a_ppnbm: formatRupiah(data?.detail_spt?.cl_7a_ppnbm || "0"),
    cl_7b_dpp: formatRupiah(data?.detail_spt?.cl_7b_dpp || "0"),
    cl_7b_dpp_lain: formatRupiah(data?.detail_spt?.cl_7b_dpp_lain || "0"),
    cl_7b_ppn: formatRupiah(data?.detail_spt?.cl_7b_ppn || "0"),
    cl_7b_ppnbm: formatRupiah(data?.detail_spt?.cl_7b_ppnbm || "0"),
    cl_8a_dpp: formatRupiah(data?.detail_spt?.cl_8a_dpp || "0"),
    cl_8a_dpplain: formatRupiah(data?.detail_spt?.cl_8a_dpplain || "0"),
    cl_8a_ppn: formatRupiah(data?.detail_spt?.cl_8a_ppn || "0"),
    cl_8a_ppnbm: formatRupiah(data?.detail_spt?.cl_8a_ppnbm || "0"),
    cl_8b_dpp: formatRupiah(data?.detail_spt?.cl_8b_dpp || "0"),
    cl_8b_dpp_lain: formatRupiah(data?.detail_spt?.cl_8b_dpp_lain || "0"),
    cl_8b_ppn: formatRupiah(data?.detail_spt?.cl_8b_ppn || "0"),
    cl_8b_ppnbm: formatRupiah(data?.detail_spt?.cl_8b_ppnbm || "0"),
    cl_8d_diminta_pengembalian: formatRupiah(
      data?.detail_spt?.cl_8d_diminta_pengembalian || "0"
    ),
    cl_9a_daftar: formatRupiah(data?.detail_spt?.cl_9a_daftar || "0"),
    cl_9a_hasil_perhitungan: formatRupiah(
      data?.detail_spt?.cl_9a_hasil_perhitungan || "0"
    ),
    cl_10_batas_waktu: formatRupiah(data?.detail_spt?.cl_10_batas_waktu || "0"),
    klasifikasi_lapangan_usaha:
      data?.detail_spt?.klasifikasi_lapangan_usaha || "0",
  });

  console.log("form data", formData);

  const navigate = useNavigateWithParams();

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Define fields that need rupiah formatting
    const currencyFields = [
      "cl_1b_jumlah_dpp",
      "cl_1a5_dpp",
      "cl_1a5_dpp_lain",
      "cl_1a5_ppn",
      "cl_1a5_ppnbm",
      "cl_1a9_dpp",
      "cl_1a9_dpp_lain",
      "cl_1a9_ppn",
      "cl_1a9_ppnbm",
      "cl_2e_ppn",
      "cl_2f_ppn",
      "cl_2i_dpp",
      "cl_3b_ppnb",
      "cl_3d_ppnb",
      "cl_3f_ppnb",
      "cl_4_ppn_terutang_dpp",
      "cl_5_ppn_wajib",
      "cl_6b_ppnbm",
      "cl_6d_ppnbm",
      "cl_6f_diminta_pengembalian",
      "cl_7a_dpp",
      "cl_7a_dpp_lain",
      "cl_7a_ppn",
      "cl_7a_ppnbm",
      "cl_7b_dpp",
      "cl_7b_dpp_lain",
      "cl_7b_ppn",
      "cl_7b_ppnbm",
      "cl_8a_dpp",
      "cl_8a_dpplain",
      "cl_8a_ppn",
      "cl_8a_ppnbm",
      "cl_8b_dpp",
      "cl_8b_dpp_lain",
      "cl_8b_ppn",
      "cl_8b_ppnbm",
      "cl_8d_diminta_pengembalian",
      "cl_9a_daftar",
      "cl_9a_hasil_perhitungan",
      "cl_10_batas_waktu",
    ];

    // Format value if it's a currency field, otherwise use raw value
    // const processedValue = currencyFields.includes(name)
    //   ? formatRupiah(value.replace(/[^0-9]/g, ""))
    //   : value;

    // setFormData((prevData) => ({
    //   ...prevData,
    //   [name]: processedValue,
    // }));
    let processedValue;

    if (currencyFields.includes(name)) {
      // For currency fields, format as rupiah after removing non-numeric chars
      processedValue = formatRupiah(value.replace(/[^0-9]/g, ""));
    } else {
      // For non-currency fields, use the value directly without additional processing
      console.log(value);
      processedValue = value;
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: processedValue,
    }));
    // console.log(formData);
  };

  console.log(data);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // const getPrefilled = (i) => ({
  //     harga: (i === 1 && "105.500.000") || (i === 5 && "651.119.260") || (i === 8 && "756.619.260") || "0",
  //     dpp: (i === 1 && "96.708.334") || (i === 5 && "596.859.332") || "0",
  //     ppn: (i === 1 && "11.605.000") || (i === 5 && "71.623.128") || (i === 8 && "83.228.128") || "0",
  //     ppnbm: "0",
  // });
  const unggahXmlTable = useDynamicTableRows(initialRowUpload);
  const lampiranDokumenTable = useDynamicTableRows(initialRowUpload);
  const penyerahanBarangJasaTable = useDynamicTableRows(initialRowUpload);
  const [rows, setRows] = useState([{ ...initialRowUpload }]);

  const {
    data: sptOther,
    isLoading: isLoadingOther,
    isError: isErrorOther,
    error: sptError,
  } = useQuery({
    queryKey: [activeTabContent],
    queryFn: async () => {
      const accountId = viewAsCompanyId ? viewAsCompanyId : akun;
      const data = await axios.get(
        RoutesApi.apiUrl +
          `student/assignments/${id}/sistem/${accountId}/spt/${idSpt}/show-faktur-ppn`,
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
          params: {
            jenis_spt_ppn: activeTabContent,
          },
        }
      );
      console.log(data.data);
      return data.data;
    },
    enabled: activeTabContent !== null && activeTabContent !== undefined,
    // Add these options to prevent unnecessary refetches
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
  });

  const calculateSpt = useMutation({
    mutationFn: async () => {
      const csrf = await getCsrf();

      // Check if viewAsCompanyId exists
      // if (!viewAsCompanyId) {
      //   throw new Error("Company ID is not defined");
      // }

      // Helper function to convert string to number, return 0 if empty/null/undefined
      console.log(formData);
      // const toNumber = (value) => {
      //   // consol("called");
      //   console.log("value", value);
      //   if (value === null || value === undefined) {
      //     return 0;
      //   }
      //   const num = parseFloat(value);
      //   console.log("num", num);
      //   return isNaN(num) ? 0 : num;
      // };
      const toNumber = (value) => {
        if (value === undefined || value === null || value === "") return 0;
        // console.log("value", value);
        // First strip the dots, then convert to number
        const strippedValue = stripRupiahFormat(value);
        // console.log("num", strippedValue);
        return Number(strippedValue);
      };
      // const currencyFields = [
      //   "cl_1b_jumlah_dpp",
      //   "cl_1a5_dpp",
      //   "cl_1a5_dpp_lain",
      //   "cl_1a5_ppn",
      //   "cl_1a5_ppnbm",
      //   "cl_1a9_dpp",
      //   "cl_1a9_dpp_lain",
      //   "cl_1a9_ppn",
      //   "cl_1a9_ppnbm",
      //   "cl_2e_ppn",
      //   "cl_2f_ppn",
      //   "cl_2i_dpp",
      //   "cl_3b_ppnb",
      //   "cl_3d_ppnb",
      //   "cl_3f_ppnb",
      //   "cl_4_ppn_terutang_dpp",
      //   "cl_5_ppn_wajib",
      //   "cl_6b_ppnbm",
      //   "cl_6d_ppnbm",
      //   "cl_6f_diminta_pengembalian",
      //   "cl_7a_dpp",
      //   "cl_7a_dpp_lain",
      //   "cl_7a_ppn",
      //   "cl_7a_ppnbm",
      //   "cl_7b_dpp",
      //   "cl_7b_dpp_lain",
      //   "cl_7b_ppn",
      //   "cl_7b_ppnbm",
      //   "cl_8a_dpp",
      //   "cl_8a_dpplain",
      //   "cl_8a_ppn",
      //   "cl_8a_ppnbm",
      //   "cl_8b_dpp",
      //   "cl_8b_dpp_lain",
      //   "cl_8b_ppn",
      //   "cl_8b_ppnbm",
      //   "cl_8d_diminta_pengembalian",
      //   "cl_9a_daftar",
      //   "cl_9a_hasil_perhitungan",
      //   "cl_10_batas_waktu",
      // ];
      // const toNumber = (value) => {
      //   if (value === undefined || value === null || value === "") return 0;
      //   // First strip the Rupiah formatting, then convert to number
      //   const strippedValue = stripRupiahFormat(value);
      //   return Number(strippedValue);
      // };

      // Create an object with all the required fields from formData, converting to numbers
      const sptData = {
        cl_1a9_dpp: toNumber(formData.cl_1a9_dpp),
        cl_1a9_ppn: toNumber(formData.cl_1a9_ppn),
        cl_1a9_ppnbm: toNumber(formData.cl_1a9_ppnbm),
        cl_1b_jumlah_dpp: toNumber(formData.cl_1b_jumlah_dpp),
        cl_2e_ppn: toNumber(formData.cl_2e_ppn),
        cl_2f_ppn: toNumber(formData.cl_2f_ppn),
        cl_2i_dpp: toNumber(formData.cl_2i_dpp),
        cl_3b_ppnbm: toNumber(formData.cl_3b_ppnb),
        cl_3d_ppnbm: toNumber(formData.cl_3d_ppnb),
        cl_3f_ppnbm: toNumber(formData.cl_3f_ppnb),
        cl_3h_diminta: toNumber(formData.cl_3h_diminta),
        cl_3h_nomor_rekening: formData.cl_3h_nomor_rekening, // Keep as string
        cl_3h_nama_bank: formData.cl_3h_nama_bank, // Keep as string
        cl_3h_nama_pemilik_bank: formData.cl_3h_nama_pemilik_bank, // Keep as string
        cl_4_ppn_terutang_dpp: toNumber(formData.cl_4_ppn_terutang_dpp),
        cl_5_ppn_wajib: toNumber(formData.cl_5_ppn_wajib),
        cl_6b_ppnbm: toNumber(formData.cl_6b_ppnbm),
        cl_6d_ppnbm: toNumber(formData.cl_6d_ppnbm),
        cl_6f_diminta_pengembalian: toNumber(
          formData.cl_6f_diminta_pengembalian
        ),
        cl_7a_dpp: toNumber(formData.cl_7a_dpp),
        cl_7a_dpp_lain: toNumber(formData.cl_7a_dpp_lain),
        cl_7a_ppn: toNumber(formData.cl_7a_ppn),
        cl_7a_ppnbm: toNumber(formData.cl_7a_ppnbm),
        cl_7b_dpp: toNumber(formData.cl_7b_dpp),
        cl_7b_dpp_lain: toNumber(formData.cl_7b_dpp_lain),
        cl_7b_ppn: toNumber(formData.cl_7b_ppn),
        cl_7b_ppnbm: toNumber(formData.cl_7b_ppnbm),
        cl_8a_dpp: toNumber(formData.cl_8a_dpp),
        cl_8a_dpplain: toNumber(formData.cl_8a_dpplain),
        cl_8a_ppn: toNumber(formData.cl_8a_ppn),
        cl_8a_ppnbm: toNumber(formData.cl_8a_ppnbm),
        cl_8b_dpp: toNumber(formData.cl_8b_dpp),
        cl_8b_dpp_lain: toNumber(formData.cl_8b_dpp_lain),
        cl_8b_ppn: toNumber(formData.cl_8b_ppn),
        cl_8b_ppnbm: toNumber(formData.cl_8b_ppnbm),
        cl_8d_diminta_pengembalian: toNumber(
          formData.cl_8d_diminta_pengembalian
        ),
        cl_9a_daftar: toNumber(formData.cl_9a_daftar),
        cl_9a_hasil_perhitungan: toNumber(formData.cl_9a_hasil_perhitungan),
        cl_10_batas_waktu: formData.cl_10_batas_waktu, // Keep as string (likely a date)
        klasifikasi_lapangan_usaha: formData.klasifikasi_lapangan_usaha, // Keep as string
        badan_id: viewAsCompanyId,
      };

      // alert("mamamia");
      // alert("Sending SPT data: " + JSON.stringify(sptData, null, 2));

      console.log("Sending SPT data:", sptData); // Debug what's being sent

      const accountId = viewAsCompanyId ? viewAsCompanyId : akun;
      // return axios.put(
      //   `${RoutesApi.url}api/student/assignments/${id}/sistem/${akun}/spt/${idSpt}/calculate-spt`,
      //   sptData,

      return axios.put(
        `${RoutesApi.url}api/student/assignments/${id}/sistem/${accountId}/spt/${idSpt}/calculate-spt`,
        sptData,
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
    onSuccess: (data, variables) => {
      console.log(data);
      Swal.fire("Berhasil!", "Konsep SPT berhasil dihitung.", "success").then(
        (result) => {
          // if (result.isConfirmed) {
          //   window.location.href = `/praktikum/${id}/sistem/${akun}/surat-pemberitahuan-spt`;
          // }
          navigate(`/praktikum/${id}/sistem/${akun}/surat-pemberitahuan-spt`);
        }
      );
    },
    onError: (error) => {
      console.error("Error saving data:", error);
      Swal.fire("Gagal!", "Terjadi kesalahan saat menyimpan data.", "error");
    },
  });

  const saveConcept = useMutation({
    mutationFn: async () => {
      const csrf = await getCsrf();
      return axios.put(
        `${RoutesApi.url}api/student/assignments/${id}/sistem/${akun}/spt/${idSpt}`,
        {},
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
    onSuccess: (data, variables) => {
      // console.log(data);
      // const successMessage = variables.isDraft
      //   ? "Draft Faktur berhasil dibuat"
      //   : "Faktur berhasil diupload";

      Swal.fire("Berhasil!", "Konsep SPT berhasil dibuat.", "success").then(
        (result) => {
          if (result.isConfirmed) {
            // window.location.href = `/praktikum/${id}/sistem/${akun}/buat-konsep-spt/${idSpt}`;
          }
        }
      );
    },
    onError: (error) => {
      console.error("Error saving data:", error);
      Swal.fire("Gagal!", "Terjadi kesalahan saat menyimpan data.", "error");
    },
  });
  const payDeposit = useMutation({
    mutationFn: async () => {
      const csrf = await getCsrf();
      const accountId = viewAsCompanyId ? viewAsCompanyId : akun;
      return axios.put(
        `${RoutesApi.url}api/student/assignments/${id}/sistem/${accountId}/spt/${idSpt}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-CSRF-TOKEN": csrf,
            Authorization: `Bearer ${cookies.token}`,
          },
          params: {
            intent: "api.update.spt.ppn.bayar.deposit",
            pic_id: akun,
          },
        }
      );
    },
    onSuccess: (data, variables) => {
      // console.log(data);
      // const successMessage = variables.isDraft
      //   ? "Draft Faktur berhasil dibuat"
      //   : "Faktur berhasil diupload";

      Swal.fire("Berhasil!", "SPT berhasil dibayar.", "success").then(
        (result) => {
          if (result.isConfirmed) {
            navigate(`/praktikum/${id}/sistem/${akun}/surat-pemberitahuan-spt`);
          }
        }
      );
    },
    onError: (error) => {
      console.error("Error saving data:", error);
      Swal.fire("Gagal!", "Terjadi kesalahan saat menyimpan data.", "error");
    },
  });
  const payBilling = useMutation({
    mutationFn: async () => {
      const csrf = await getCsrf();
      const accountId = viewAsCompanyId ? viewAsCompanyId : akun;
      return axios.put(
        `${RoutesApi.url}api/student/assignments/${id}/sistem/${accountId}/spt/${idSpt}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-CSRF-TOKEN": csrf,
            Authorization: `Bearer ${cookies.token}`,
          },
          params: {
            intent: "api.update.spt.ppn.bayar.kode.billing",
            pic_id: akun,
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
        "Kode Billing SPT berhasil dibuat.",
        "success"
      ).then((result) => {
        if (result.isConfirmed) {
          // window.location.href = `/praktikum/${id}/sistem/${akun}/buat-konsep-spt/${idSpt}`;
          navigate(`/praktikum/${id}/sistem/${akun}/surat-pemberitahuan-spt`);
        }
      });
    },
    onError: (error) => {
      console.error("Error saving data:", error);
      Swal.fire("Gagal!", "Terjadi kesalahan saat menyimpan data.", "error");
    },
  });

  const handleTabChange = (value) => {
    // Prevent any default behavior if this is called from an event
    if (value?.preventDefault) {
      value.preventDefault();
      return;
    }

    setActiveTab(value);
    const formattedValue = value.replace(
      /([a-z])-(\d+)/i,
      (match, letter, number) => {
        return letter.toUpperCase() + number;
      }
    );

    // Use a callback to ensure state is updated before query runs
    setActiveTabContent(formattedValue);

    // Optional: Add a small delay to ensure state is updated
    // setTimeout(() => {
    //   setActiveTabContent(formattedValue);
    // }, 0);

    // Swal.fire({
    //   title: "Tab Changed",
    //   text: `Current tab: ${formattedValue}`,
    //   icon: "info",
    // });
  };

  // if (isLoadingOther) {
  //   return (
  //     <div className="loading">
  //       <ClipLoader></ClipLoader>
  //     </div>
  //   );
  // }

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-auto p-3 bg-white rounded-md h-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-light text-yellow-500 mt-4">
            SURAT PEMBERITAHUAN MASA PAJAK PERTAMBAHAN NILAI (SPT MASA PPN)
          </h2>
        </div>
        <div className="w-full p-2 ml-0 border-t text-lg">
          {/* <Tabs  defaultValue="induk" onValueChange={(val) => setActiveTab(val)}> */}
          <Tabs defaultValue="induk" onValueChange={handleTabChange}>
            <TabsList className="flex justify-start gap-2 text-blue-700 text-lg">
              <TabsTrigger value="induk">Induk</TabsTrigger>
              <TabsTrigger value="a-1">A-1</TabsTrigger>
              <TabsTrigger value="a-2">A-2</TabsTrigger>
              <TabsTrigger value="b-1">B-1</TabsTrigger>
              <TabsTrigger value="b-2">B-2</TabsTrigger>
              <TabsTrigger value="b-3">B-3</TabsTrigger>
              <TabsTrigger value="c">C</TabsTrigger>
            </TabsList>

            <TabsContent value="induk">
              <div className="mt-4">
                <div
                  className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
                  onClick={() => setShowHeaderInduk(!showHeaderInduk)}
                >
                  <h3 className="text-lg font-semibold">Header</h3>
                  {showHeaderInduk ? <FaChevronUp /> : <FaChevronDown />}
                </div>
                {showHeaderInduk && (
                  <div className="border rounded-md p-4 mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Kiri */}
                      <div>
                        <label className="block font-medium text-gray-700">
                          Nama Pengusaha Kena Pajak *
                        </label>
                        <input
                          type="text"
                          readOnly
                          className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                          value={data?.nama_pengusaha || ""}
                        />
                      </div>
                      <div>
                        <label className="block font-medium text-gray-700">
                          NPWP*
                        </label>
                        <input
                          type="text"
                          readOnly
                          value={data?.npwp || ""}
                          className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                        />
                      </div>

                      <div className="md:col-span-1">
                        <label className="block font-medium text-gray-700">
                          Alamat *
                        </label>
                        <input
                          type="text"
                          readOnly
                          value={data?.alamat || ""}
                          className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                        />
                      </div>
                      <div>
                        <label className="block font-medium text-gray-700">
                          Klasifikasi Lapangan Usaha *
                        </label>
                        <input
                          type="text"
                          readOnly
                          name="klasifikasi_lapangan_usaha"
                          onChange={handleChange}
                          value="AKTIVITAS AKUNTANSI, PEMBUKUAN DAN PEMERIKSA"
                          className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                        />
                      </div>

                      <div>
                        <label className="block font-medium text-gray-700">
                          Nomor Telepon
                        </label>
                        <input
                          type="text"
                          readOnly
                          value={data?.nomer_telpon || ""}
                          className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                        />
                      </div>
                      <div>
                        <label className="block font-medium text-gray-700">
                          Periode
                        </label>
                        <input
                          type="text"
                          readOnly
                          value={data?.periode || ""}
                          className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                        />
                      </div>

                      <div>
                        <label className="block font-medium text-gray-700">
                          Telepon Seluler *
                        </label>
                        <input
                          type="text"
                          readOnly
                          value={data?.telepon_seluler || ""}
                          className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                        />
                      </div>
                      <div className="flex gap-2">
                        <div className="flex-1">
                          <label className="block font-medium text-gray-700">
                            Periode Pembukuan
                          </label>
                          <input
                            type="text"
                            readOnly
                            value="01-12"
                            className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                          />
                        </div>
                        <div className="flex-1">
                          <label className="block font-medium text-gray-700">
                            Normal/Pembetulan
                          </label>
                          <select
                            disabled
                            className="w-full p-2 border rounded-md bg-gray-100 text-gray-600 cursor-not-allowed"
                            value={data?.model || "NORMAL"}
                          >
                            <option value="NORMAL">Normal</option>
                            <option value="PEMBETULAN">Pembetulan</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center gap-4">
                      <button
                        onClick={() => calculateSpt.mutate()}
                        className="bg-yellow-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-yellow-600 transition"
                      >
                        Posting SPT
                      </button>
                      <p className="text-sm text-gray-500">
                        Last prefiling Returnsheet is on{" "}
                        <strong>12 April 2025 23:24:46</strong>
                      </p>
                    </div>
                  </div>
                )}
                <div
                  className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100"
                  onClick={() =>
                    setShowPenyerahanBarangJasa(!showPenyerahanBarangJasa)
                  }
                >
                  <h3 className="text-lg font-semibold">
                    I. Penyerahan Barang dan Jasa
                  </h3>
                  {showPenyerahanBarangJasa ? (
                    <FaChevronUp />
                  ) : (
                    <FaChevronDown />
                  )}
                </div>
                {showPenyerahanBarangJasa && (
                  <div className="border rounded-md p-4 overflow-x-auto">
                    <table className="min-w-full text-sm text-left border overflow-x-auto">
                      <thead className="bg-purple-700 text-white text-center">
                        <tr>
                          <th className="p-2 min-w-[300px]">
                            Penyerahan BKP/JKP yang terutang PPN
                          </th>
                          <th className="p-2 min-w-[150px]">
                            Harga Jual/Penggantian/ <br />
                            Nilai Ekspor/DPP
                          </th>
                          <th className="p-2 min-w-[150px]">
                            DPP Nilai Lain/ DPP
                          </th>
                          <th className="p-2 min-w-[150px]">PPN</th>
                          <th className="p-2 min-w-[150px]">PPnBM</th>
                        </tr>
                      </thead>

                      <tbody className="">
                        <tr className="border-b">
                          <td className="p-2 whitespace-normal break-words text-sm">
                            A. Penyerahan BKP/JKP yang terutang PPN
                          </td>
                        </tr>
                        {/* Row 1 */}
                        <tr className="border-b">
                          <td className="p-2 whitespace-normal break-words text-sm">
                            1. Ekspor BKP/BKP Tidak Berwujud/JKP
                          </td>
                          <td className="p-2">
                            <input
                              // type="number"
                              name="cl_1a1_dpp"
                              className="w-full p-1 border rounded-md text-right text-sm bg-gray-100"
                              value={data.detail_spt.cl_1a1_dpp}
                              onChange={handleChange}
                              readOnly
                            />
                          </td>
                        </tr>

                        <tr className="border-b">
                          <td className="p-2 whitespace-normal break-words text-sm">
                            2. Penyerahan yang PPN atau PPN dan PPnBM-nya harus
                            dipungut sendiri dengan DPP Nilai Lain atau Besaran
                            Tertentu (dengan Faktur Pajak Kode 04 dan 05)
                          </td>
                          <td className="p-2">
                            <input
                              // type="number"

                              name="cl_1a2_dpp"
                              className="w-full p-1 border rounded-md text-right text-sm bg-gray-100"
                              value={data.detail_spt.cl_1a2_dpp}
                              readOnly
                            />
                          </td>
                          <td className="p-2">
                            <input
                              // type="number"
                              name="cl_1a2_dpp_nilai_lain"
                              className="w-full p-1 border rounded-md text-right text-sm bg-gray-100"
                              value={data.detail_spt.cl_1a2_dpp_lain}
                              readOnly
                            />
                          </td>
                          <td className="p-2">
                            <input
                              // type="number"
                              name="cl_1a2_ppn"
                              className="w-full p-1 border rounded-md text-right text-sm bg-gray-100"
                              value={data.detail_spt.cl_1a2_ppn}
                              readOnly
                            />
                          </td>
                          <td className="p-2">
                            <input
                              // type="number"
                              name="cl_1a2_ppnbm"
                              className="w-full p-1 border rounded-md text-right text-sm bg-gray-100"
                              value={data.detail_spt.cl_1a2_ppnbm}
                              readOnly
                            />
                          </td>
                        </tr>

                        {/* Row 3 */}
                        <tr className="border-b">
                          <td className="p-2 whitespace-normal break-words text-sm">
                            3. Penyerahan yang PPN atau PPN dan PPnBM-nya harus
                            dipungut sendiri kepada turis sesuai dengan Pasal
                            16E UU PPN (dengan Faktur Pajak Kode 06)
                          </td>
                          <td className="p-2">
                            <input
                              type="number"
                              name="cl_1a3_dpp"
                              className="w-full p-1 border rounded-md text-right text-sm bg-gray-100"
                              // value={data.detail_spt.cl_1a3_dpp}
                              readOnly
                            />
                          </td>
                          <td className="p-2">
                            <input
                              // type="number"
                              name="cl_1a3_dpp_lain"
                              className="w-full p-1 border rounded-md text-right text-sm bg-gray-100"
                              value={data.detail_spt.cl_1a3_dpp_lain}
                              readOnly
                            />
                          </td>
                          <td className="p-2">
                            <input
                              // type="number"
                              name="cl_1a3_ppn"
                              className="w-full p-1 border rounded-md text-right text-sm bg-gray-100"
                              value={data.detail_spt.cl_1a3_ppn}
                              readOnly
                            />
                          </td>
                          <td className="p-2">
                            <input
                              // type="number"
                              className="w-full p-1 border rounded-md text-right text-sm bg-gray-100"
                              defaultValue="0"
                              disabled
                              name="cl_3a_ppnb"
                              value={data.detail_spt.cl_3a_ppnb}
                            />
                          </td>
                        </tr>

                        {/* Row 4 */}
                        <tr className="border-b">
                          <td className="p-2 whitespace-normal break-words text-sm">
                            4. Penyerahan yang PPN atau PPN dan PPnBM-nya harus
                            dipungut sendiri lainnya (dengan Faktur Pajak Kode
                            01, 09 dan 10)
                          </td>
                          <td className="p-2">
                            <input
                              // type="number"
                              name="cl_1a4_dpp"
                              className="w-full p-1 border rounded-md text-right text-sm bg-gray-100"
                              value={data.detail_spt.cl_1a4_dpp}
                              readOnly
                            />
                          </td>
                          <td className="p-2">
                            {/* This column is intentionally left empty based on the table */}
                          </td>
                          <td className="p-2">
                            <input
                              // type="number"
                              name="cl_1a4_ppn"
                              className="w-full p-1 border rounded-md text-right text-sm bg-gray-100"
                              value={data.detail_spt.cl_1a4_ppn}
                              readOnly
                            />
                          </td>
                          <td className="p-2">
                            <input
                              // type="number"
                              name="cl_1a4_ppnbm"
                              className="w-full p-1 border rounded-md text-right text-sm bg-gray-100"
                              value={data.detail_spt.cl_1a4_ppnbm}
                              readOnly
                            />
                          </td>
                        </tr>

                        {/* Row 5 */}
                        <tr className="border-b">
                          <td className="p-2 whitespace-normal break-words text-sm">
                            5. Penyerahan yang PPN atau PPN dan PPnBM-nya harus
                            dipungut sendiri dengan Faktur Pajak yang dilaporkan
                            secara digunggung
                          </td>
                          <td className="p-2">
                            <input
                              // type="number"
                              readOnly
                              name="cl_1a5_dpp"
                              className="w-full p-1 border rounded-md text-right text-sm bg-gray-100"
                              value={formData.cl_1a5_dpp}
                              onChange={handleChange}
                            />
                          </td>
                          <td className="p-2">
                            <input
                              // type="number"
                              readOnly
                              name="cl_1a5_dpp_lain"
                              className="w-full p-1 border rounded-md text-right text-sm bg-gray-100"
                              value={formData.cl_1a5_dpp_lain}
                              onChange={handleChange}
                            />
                          </td>
                          <td className="p-2">
                            <input
                              // type="number"
                              readOnly
                              name="cl_1a5_ppn"
                              className="w-full p-1 border rounded-md text-right text-sm bg-gray-100"
                              value={formData.cl_1a5_ppn}
                              onChange={handleChange}
                            />
                          </td>
                          <td className="p-2 flex items-center gap-2">
                            <input
                              // type="number"
                              readOnly
                              name="cl_1a5_ppnbm"
                              className="w-full p-1 border rounded-md text-right text-sm bg-gray-100"
                              value={formData.cl_1a5_ppnbm}
                              onChange={handleChange}
                            />
                            <AlertDialog
                              open={openUpload}
                              onOpenChange={setOpenUpload}
                            >
                              <AlertDialogTrigger asChild>
                                <button
                                  className="bg-blue-700 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap"
                                  type="button"
                                >
                                  Unggah XML
                                </button>
                              </AlertDialogTrigger>
                              <AlertDialogContent className="max-w-4xl">
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Unggah Data Excel
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Silakan unggah file Excel dan lengkapi data
                                    berikut.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <DynamicUploadTable
                                  {...unggahXmlTable}
                                  columns={columnsUpload}
                                />
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Batal</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => {
                                      applyTotalsToForm(
                                        "upload",
                                        unggahXmlTable.rows,
                                        columnsUpload
                                      );
                                      setOpenUpload(false);
                                    }}
                                  >
                                    Simpan
                                  </AlertDialogAction>

                                  {/* <AlertDialogAction
                                    onClick={() => setOpenUpload(false)}
                                  >
                                    Simpan
                                  </AlertDialogAction> */}
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </td>
                        </tr>

                        {/* Row 6 */}
                        <tr className="border-b ">
                          <td className="p-2 whitespace-normal break-words text-sm">
                            6. Penyerahan yang PPN atau PPN dan PPnBM-nya harus
                            dipungut oleh Pemungut PPN (dengan Faktur Pajak Kode
                            02 dan 03)
                          </td>
                          <td className="p-2">
                            <input
                              // type="number"
                              name="cl_1a6_dpp"
                              className="w-full p-1 border rounded-md text-right text-sm bg-gray-100"
                              value={data.detail_spt.cl_1a6_dpp}
                              readOnly
                            />
                          </td>
                          <td className="p-2">
                            <input
                              // type="number"
                              name="cl_1a6_dpp_lain"
                              className="w-full p-1 border rounded-md text-right text-sm"
                              value={data.detail_spt.cl_1a6_dpp_lain}
                              readOnly
                            />
                          </td>
                          <td className="p-2">
                            <input
                              // type="number"
                              name="cl_1a6_ppn"
                              className="w-full p-1 border rounded-md text-right text-sm"
                              value={data.detail_spt.cl_1a6_ppn}
                              readOnly
                            />
                          </td>
                          <td className="p-2">
                            <input
                              // type="number"
                              name="cl_1a6_ppnbm"
                              className="w-full p-1 border rounded-md text-right text-sm bg-gray-100"
                              value={data.detail_spt.cl_1a6_ppnbm}
                              readOnly
                            />
                          </td>
                        </tr>

                        {/* Row 7 */}
                        <tr className="border-b">
                          <td className="p-2 whitespace-normal break-words text-sm">
                            7. Penyerahan yang mendapat fasilitas PPN atau PPnBM
                            Tidak Dipungut (dengan Faktur Pajak Kode 07)
                          </td>
                          <td className="p-2">
                            <input
                              // type="number"
                              name="cl_1a7_dpp"
                              className="w-full p-1 border rounded-md text-right text-sm bg-gray-100"
                              value={data.detail_spt.cl_1a7_dpp}
                              readOnly
                            />
                          </td>
                          <td className="p-2">
                            <input
                              // type="number"
                              name="cl_1a7_dpp_lain"
                              className="w-full p-1 border rounded-md text-right text-sm bg-gray-100"
                              value={data.detail_spt.cl_1a7_dpp_lain}
                              readOnly
                            />
                          </td>
                          <td className="p-2">
                            <input
                              // type="number"
                              name="cl_1a7_ppn"
                              className="w-full p-1 border rounded-md text-right text-sm bg-gray-100"
                              value={data.detail_spt.cl_1a7_ppn}
                              readOnly
                            />
                          </td>
                          <td className="p-2">
                            <input
                              // type="number"
                              name="cl_1a7_ppnbm"
                              className="w-full p-1 border rounded-md text-right text-sm bg-gray-100"
                              value={data.detail_spt.cl_1a7_ppnbm}
                              readOnly
                            />
                          </td>
                        </tr>

                        {/* Row 8 */}
                        <tr className="border-b">
                          <td className="p-2 whitespace-normal break-words text-sm">
                            8. Penyerahan yang mendapat fasilitas PPN atau PPnBM
                            Dibebaskan (dengan Faktur Pajak Kode 08)
                          </td>
                          <td className="p-2">
                            <input
                              // type="number"
                              name="cl_1a8_dpp"
                              className="w-full p-1 border rounded-md text-right text-sm bg-gray-100"
                              value={data.detail_spt.cl_1a8_dpp}
                              readOnly
                            />
                          </td>
                          <td className="p-2">
                            <input
                              // type="number"
                              name="cl_1a8_dpp_lain"
                              className="w-full p-1 border rounded-md text-right text-sm bg-gray-100"
                              value={data.detail_spt.cl_1a8_dpp_lain}
                              readOnly
                            />
                          </td>
                          <td className="p-2">
                            <input
                              // type="number"
                              name="cl_1a8_ppn"
                              className="w-full p-1 border rounded-md text-right text-sm bg-gray-100"
                              value={data.detail_spt.cl_1a8_ppn}
                              readOnly
                            />
                          </td>
                          <td className="p-2">
                            <input
                              // type="number"
                              name="cl_1a8_ppnbm"
                              className="w-full p-1 border rounded-md text-right text-sm bg-gray-100"
                              value={data.detail_spt.cl_1a8_ppnbm}
                              readOnly
                            />
                          </td>
                        </tr>

                        {/* Row 9 */}
                        <tr className="border-b">
                          <td className="p-2 whitespace-normal break-words text-sm">
                            9. Penyerahan yang mendapat fasilitas PPN atau PPnBM
                            dengan Faktur Pajak yang dilaporkan secara
                            digunggung
                          </td>
                          <td className="p-2">
                            <input
                              name="cl_1a9_dpp"
                              // type="number"
                              className="w-full p-1 border rounded-md text-right text-sm"
                              value={formData.cl_1a9_dpp}
                              onChange={handleChange}
                            />
                          </td>
                          <td className="p-2">
                            <input
                              name="cl_1a9_dpp_lain"
                              // type="number"
                              className="w-full p-1 border rounded-md text-right text-sm bg-gray-100"
                              value={formData.cl_1a9_dpp_lain}
                              onChange={handleChange}
                            />
                          </td>
                          <td className="p-2">
                            <input
                              name="cl_1a9_ppn"
                              // type="number"
                              className="w-full p-1 border rounded-md text-right text-sm bg-gray-100"
                              value={formData.cl_1a9_ppn}
                              onChange={handleChange}
                            />
                          </td>
                          <td className="p-2 flex items-center gap-2">
                            <input
                              name="cl_1a9_ppnbm"
                              // type="number"
                              className="w-full p-1 border rounded-md text-right text-sm"
                              value={formData.cl_1a9_ppnbm}
                              onChange={handleChange}
                            />
                            <AlertDialog
                              open={openLampiran}
                              onOpenChange={setOpenLampiran}
                            >
                              <AlertDialogTrigger asChild>
                                <button
                                  className="bg-blue-700 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap"
                                  type="button"
                                >
                                  Unggah XML
                                </button>
                              </AlertDialogTrigger>
                              <AlertDialogContent className="max-w-3xl">
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Unggah Lampiran Dokumen
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Silakan unggah file Excel dan lengkapi data
                                    berikut.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <DynamicUploadTable
                                  {...lampiranDokumenTable}
                                  columns={columnsUpload}
                                />
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Batal</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => {
                                      applyTotalsToForm(
                                        "lampiran",
                                        lampiranDokumenTable.rows,
                                        columnsUpload
                                      );
                                      setOpenLampiran(false);
                                    }}
                                    className="bg-blue-600 text-white"
                                  >
                                    Simpan
                                  </AlertDialogAction>
                                  {/* <AlertDialogAction
                                    onClick={() => setOpenLampiran(false)}
                                    className="bg-blue-600 text-white"
                                  >
                                    Simpan
                                  </AlertDialogAction> */}
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </td>
                        </tr>

                        {/* Row Jumlah IAI */}
                        <tr className="border-b">
                          <td className="p-2 whitespace-normal break-words text-sm">
                            Jumlah (I.A.1 + I.A.2 + I.A.3 + I.A.4 + I.A.5 +
                            I.A.6 + I.A.7 + I.A.8 + I.A.9)
                          </td>
                          <td className="p-2 flex items-center gap-2">
                            <input
                              name="cl_1a_jumlah_dpp"
                              // type="number"
                              readOnly
                              className="w-full p-1 border rounded-md text-right text-sm bg-gray-100"
                              value={data.detail_spt.cl_1a_jumlah_dpp}
                              onChange={handleChange}
                            />
                          </td>
                          <td className="p-2"></td>
                          <td className="p-2">
                            <input
                              name="cl_1a_jumlah_ppn"
                              // type="number"
                              readOnly
                              className="w-full p-1 border rounded-md text-right text-sm bg-gray-100"
                              value={data.detail_spt.cl_1a_jumlah_ppn}
                              onChange={handleChange}
                            />
                          </td>
                          <td className="p-2">
                            <input
                              name="cl_1a_jumlah_ppnbm"
                              // type="number"
                              readOnly
                              className="w-full p-1 border rounded-md text-right text-sm bg-gray-100"
                              value={data.detail_spt.cl_1a_jumlah_ppnbm}
                              onChange={handleChange}
                            />
                          </td>
                        </tr>

                        <tr className="border-b">
                          <td className="p-2 whitespace-normal break-words text-sm">
                            B. Penyerahan Barang dan Jasa yang tidak terutang
                            PPN
                          </td>
                          <td className="p-2 flex items-center gap-2">
                            <input
                              // type="number"
                              className="w-full p-1 border rounded-md text-right text-sm bg-gray-100"
                              value={formData.cl_1b_jumlah_dpp}
                              onChange={handleChange}
                              name="cl_1b_jumlah_dpp"
                            />
                          </td>
                          <td className="p2"></td>
                          <td className="p2"></td>
                          <td className="p-2 flex items-center gap-2">
                            <AlertDialog
                              open={openPenyerahan}
                              onOpenChange={setOpenPenyerahan}
                            >
                              <AlertDialogTrigger asChild>
                                <button
                                  className="bg-blue-700 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap"
                                  type="button"
                                >
                                  Upload XML
                                </button>
                              </AlertDialogTrigger>
                              <AlertDialogContent className="max-w-4xl">
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Unggah Lampiran Dokumen
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Silakan unggah file Excel dan lengkapi data
                                    berikut.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <DynamicUploadTable
                                  {...penyerahanBarangJasaTable}
                                  columns={columnsUpload}
                                />
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Batal</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => {
                                      applyTotalsToForm(
                                        "penyerahan",
                                        penyerahanBarangJasaTable.rows,
                                        columnsUpload
                                      );
                                      setOpenPenyerahan(false);
                                    }}
                                    className="bg-blue-600 text-white"
                                  >
                                    Simpan
                                  </AlertDialogAction>
                                  {/* <AlertDialogAction
                                    onClick={() => setOpenPenyerahan(false)}
                                    className="bg-blue-600 text-white"
                                  >
                                    Simpan
                                  </AlertDialogAction> */}
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </td>
                        </tr>

                        <tr className="border-b">
                          <td className="p-2 whitespace-normal break-words text-sm">
                            C. Jumlah Seluruh penyerahan barang dan Jasa (I.A +
                            I.B)
                          </td>
                          <td className="p-2 flex items-center gap-2">
                            <input
                              // type="number"
                              readOnly
                              className="w-full p-1 border rounded-md text-right text-sm bg-gray-100"
                              value={data.detail_spt.cl_1c_jumlah_dpp}
                              onChange={handleChange}
                              name="cl_1c_jumlah_dpp"
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
                <div
                  className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100"
                  onClick={() =>
                    setShowPerolehanBarangJasa(!showPerolehanBarangJasa)
                  }
                >
                  <h3 className="text-lg font-semibold">
                    II. Perolehan Barang dan Jasa
                  </h3>
                  {showPerolehanBarangJasa ? (
                    <FaChevronUp />
                  ) : (
                    <FaChevronDown />
                  )}
                </div>
                {showPerolehanBarangJasa && (
                  <div className="border rounded-md p-4 overflow-x-auto">
                    <table className="min-w-full text-sm text-left border overflow-x-auto">
                      <thead className="bg-purple-700 text-white text-center">
                        <tr>
                          <th className="p-2 min-w-[300px]"></th>
                          <th className="p-2 min-w-[150px]">
                            Harga Jual/Penggantian/ <br />
                            Nilai Ekspor/DPP
                          </th>
                          <th className="p-2 min-w-[150px]">
                            DPP Nilai Lain/ DPP
                          </th>
                          <th className="p-2 min-w-[150px]">PPN</th>
                          <th className="p-2 min-w-[150px]">PPnBM</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Row A */}
                        <tr className="border-b">
                          <td className="p-2 whitespace-normal break-words text-sm">
                            A. Impor BKP, Pemanfaatan BKP Tidak Berwujud
                            dan/atau JKP dari luar Daerah Pabean di dalam Daerah
                            Pabean yang Pajak Masukannya dapat dikreditkan
                          </td>
                          <td className="p-2">
                            <input
                              name="cl_2a_dpp"
                              // type="number"
                              readOnly
                              className="w-full p-1 border rounded-md text-right text-sm bg-gray-100"
                              value={data.detail_spt.cl_2a_dpp}
                              onChange={handleChange}
                            />
                          </td>
                          <td className="p-2"></td>
                          <td className="p-2">
                            <input
                              name="cl_2a_ppn"
                              // type="number"
                              readOnly
                              className="w-full p-1 border rounded-md text-right text-sm bg-gray-100"
                              value={data.detail_spt.cl_2a_ppn}
                              onChange={handleChange}
                            />
                          </td>
                          <td className="p-2">
                            <input
                              name="cl_2a_ppnbm"
                              // type="number"
                              readOnly
                              className="w-full p-1 border rounded-md text-right text-sm bg-gray-100"
                              value={data.detail_spt.cl_2a_ppnbm}
                              onChange={handleChange}
                            />
                          </td>
                        </tr>

                        {/* Row B */}
                        <tr className="border-b">
                          <td className="p-2 whitespace-normal break-words text-sm">
                            B. Perolehan BKP/JKP dari dalam negeri dengan DPP
                            Nilai Lain atau Besaran Tertentu yang Pajak
                            Masukannya dapat dikreditkan (dengan Faktur Pajak
                            Kode 04 dan 05)
                          </td>
                          <td className="p-2">
                            <input
                              name="cl_2b_dpp"
                              // type="number"
                              className="w-full p-1 border rounded-md text-right text-sm bg-gray-100"
                              value={data.detail_spt.cl_2b_dpp}
                              readOnly
                            />
                          </td>
                          <td className="p-2">
                            <input
                              name="cl_2b_dpp_lain"
                              // type="number"
                              className="w-full p-1 border rounded-md text-right text-sm bg-gray-100"
                              value={data.detail_spt.cl_2b_dpp_lain}
                              readOnly
                            />
                          </td>
                          <td className="p-2">
                            <input
                              name="cl_2b_ppn"
                              // type="number"
                              className="w-full p-1 border rounded-md text-right text-sm bg-gray-100"
                              value={data.detail_spt.cl_2b_ppn}
                              readOnly
                            />
                          </td>
                          <td className="p-2">
                            <input
                              name="cl_2b_ppnbm"
                              // type="number"
                              className="w-full p-1 border rounded-md text-right text-sm bg-gray-100"
                              value={data.detail_spt.cl_2b_ppnbm}
                              readOnly
                            />
                          </td>
                        </tr>

                        {/* Row C */}
                        <tr className="border-b">
                          <td className="p-2 whitespace-normal break-words text-sm">
                            C. Perolehan BKP dari dalam negeri selain dengan DPP
                            Nilai Lain yang Pajak Masukannya dapat dikreditkan
                            (dengan Faktur Pajak Kode 01, 09, dan 10)
                          </td>
                          <td className="p-2">
                            <input
                              name="cl_2c_dpp"
                              // type="number"
                              className="w-full p-1 border rounded-md text-right text-sm bg-gray-100"
                              value={data.detail_spt.cl_2c_dpp}
                              readOnly
                            />
                          </td>
                          <td className="p-2"></td>
                          <td className="p-2">
                            <input
                              name="cl_2c_ppn"
                              // type="number"
                              className="w-full p-1 border rounded-md text-right text-sm bg-gray-100"
                              value={data.detail_spt.cl_2c_ppn}
                              readOnly
                            />
                          </td>
                          <td className="p-2">
                            <input
                              name="cl_2c_ppnbm"
                              // type="number"
                              className="w-full p-1 border rounded-md text-right text-sm bg-gray-100"
                              value={data.detail_spt.cl_2c_ppnbm}
                              readOnly
                            />
                          </td>
                        </tr>

                        {/* Row D */}
                        <tr className="border-b">
                          <td className="p-2 whitespace-normal break-words text-sm">
                            D. Perolehan BKP/JKP dari dalam negeri sebagai
                            Pemungut PPN yang Pajak Masukannya dapat dikreditkan
                            (dengan Faktur Pajak Kode 02 dan 03)
                          </td>
                          <td className="p-2">
                            <input
                              name="cl_2d_dpp"
                              // type="number"
                              className="w-full p-1 border rounded-md text-right text-sm bg-gray-100"
                              value={data.detail_spt.cl_2d_dpp}
                              readOnly
                            />
                          </td>
                          <td className="p-2">
                            <input
                              name="cl_2d_dpp_lain"
                              // type="number"
                              className="w-full p-1 border rounded-md text-right text-sm bg-gray-100"
                              value={data.detail_spt.cl_2d_dpp_lain}
                              readOnly
                            />
                          </td>
                          <td className="p-2">
                            <input
                              name="cl_2d_ppn"
                              // type="number"
                              className="w-full p-1 border rounded-md text-right text-sm bg-gray-100"
                              value={data.detail_spt.cl_2d_ppn}
                              readOnly
                            />
                          </td>
                          <td className="p-2">
                            <input
                              name="cl_2d_ppnbm"
                              // type="number"
                              className="w-full p-1 border rounded-md text-right text-sm bg-gray-100"
                              value={data.detail_spt.cl_2d_ppnbm}
                              readOnly
                            />
                          </td>
                        </tr>

                        {/* Row E */}
                        <tr className="border-b">
                          <td className="p-2 whitespace-normal break-words text-sm">
                            E. Kompensasi kelebihan Pajak Masukan
                          </td>
                          <td className="p-2"></td>
                          <td className="p-2"></td>
                          <td className="p-2">
                            <input
                              // type="number"
                              className="w-full p-1 border rounded-md text-right text-sm bg-gray-100"
                              value={formData.cl_2e_ppn}
                              onChange={handleChange}
                              name="cl_2e_ppn"
                            />
                          </td>
                          <td className="p-2 "></td>
                        </tr>

                        {/* Row F */}
                        <tr className="border-b">
                          <td className="p-2 whitespace-normal break-words text-sm">
                            F. Hasil penghitungan kembali Pajak Masukan yang
                            telah dikreditkan
                          </td>
                          <td className="p-2"></td>
                          <td className="p-2"></td>
                          <td className="p-2">
                            <input
                              // type="number"
                              className="w-full p-1 border rounded-md text-right text-sm"
                              value={formData.cl_2f_ppn}
                              onChange={handleChange}
                              name="cl_2f_ppn"
                            />
                          </td>
                          <td className="p-2"></td>
                        </tr>

                        {/* Row G */}
                        <tr className="border-b">
                          <td className="p-2 whitespace-normal break-words text-sm">
                            G. Jumlah Pajak Masukan yang dapat diperhitungkan
                            (II.A + II.B + II.C + II.D + II.E + II.F)
                          </td>
                          <td className="p-2">
                            <input
                              // type="number"
                              readOnly
                              className="w-full p-1 border rounded-md text-right text-sm bg-gray-100"
                              value={data.detail_spt.cl_2g_dpp}
                              onChange={handleChange}
                              name="cl_2g_dpp"
                            />
                          </td>
                          <td className="p-2"></td>
                          <td className="p-2">
                            <input
                              // type="number"
                              readOnly
                              className="w-full p-1 border rounded-md text-right text-sm bg-gray-100"
                              value={data.detail_spt.cl_2g_ppn}
                              onChange={handleChange}
                              name="cl_2g_ppn"
                            />
                          </td>
                          <td className="p-2"></td>
                        </tr>

                        {/* Row H */}
                        <tr className="border-b">
                          <td className="p-2 whitespace-normal break-words text-sm">
                            H. Impor atau perolehan BKP/JKP yang Pajak
                            Masukannya tidak dikreditkan dan/atau impor atau
                            perolehan BKP/JKP yang mendapat fasilitas
                          </td>
                          <td className="p-2">
                            <input
                              name="cl_2h_dpp"
                              readOnly
                              // type="number"
                              className="w-full p-1 border rounded-md text-right text-sm bg-gray-100"
                              // value={formData.cl_2h_dpp}
                              value={data.detail_spt.cl_2h_dpp}
                              onChange={handleChange}
                            />
                          </td>
                          <td className="p-2">
                            <input
                              name="cl_2h_dpp_lain"
                              // type="number"
                              readOnly
                              className="w-full p-1 border rounded-md text-right text-sm bg-gray-100"
                              value={data.detail_spt.cl_2h_dpp_lain}
                              onChange={handleChange}
                            />
                          </td>
                          <td className="p-2">
                            <input
                              name="cl_2h_ppn"
                              // type="number"
                              readOnly
                              className="w-full p-1 border rounded-md text-right text-sm bg-gray-100"
                              value={data.detail_spt.cl_2h_ppn}
                              onChange={handleChange}
                            />
                          </td>
                          <td className="p-2">
                            <input
                              name="cl_2h_ppnbm"
                              // type="number"
                              readOnly
                              className="w-full p-1 border rounded-md text-right text-sm bg-gray-100"
                              value={data.detail_spt.cl_2h_ppnbm}
                              onChange={handleChange}
                            />
                          </td>
                        </tr>

                        {/* Row I */}
                        <tr className="border-b">
                          <td className="p-2 whitespace-normal break-words text-sm">
                            I. Impor atau perolehan BKP/JKP dengan Faktur Pajak
                            yang dilaporkan secara digunggung dan barang/jasa
                            yang tidak terutang PPN
                          </td>
                          <td className="p-2">
                            <input
                              // type="number"
                              className="w-full p-1 border rounded-md text-right text-sm"
                              value={formData.cl_2i_dpp}
                              onChange={handleChange}
                              name="cl_2i_dpp"
                            />
                          </td>
                          <td className="p-2"></td>
                          <td className="p-2"></td>
                          <td className="p-2 flex items-center gap-2"></td>
                        </tr>

                        {/* Row J */}
                        <tr className="border-b">
                          <td className="p-2 whitespace-normal break-words text-sm">
                            J. Jumlah Perolehan (II.A + II.B + II.C + II.D +
                            II.E + II.F + II.G + II.H + II.I)
                          </td>
                          <td className="p-2">
                            <input
                              // type="number"
                              className="w-full p-1 border rounded-md text-right text-sm bg-gray-100"
                              value={data.detail_spt.cl_2j_dpp}
                              onChange={handleChange}
                              name="cl_2j_dpp"
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
                <div
                  className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100"
                  onClick={() =>
                    setShowPenghitunganBayarLebihBayar(
                      !showPenghitunganPPNKurangBayarLebihBayar
                    )
                  }
                >
                  <h3 className="text-lg font-semibold">
                    III. Penghitungan PPN Kurang Bayar / Lebih Bayar
                  </h3>
                  {showPenghitunganPPNKurangBayarLebihBayar ? (
                    <FaChevronUp />
                  ) : (
                    <FaChevronDown />
                  )}
                </div>
                {showPenghitunganPPNKurangBayarLebihBayar && (
                  <div className="border rounded-md p-4 overflow-x-auto">
                    <table className="min-w-full text-sm text-left border overflow-x-auto">
                      <thead className="bg-purple-700 text-white text-center">
                        <tr>
                          <th className="p-2 min-w-[300px]"></th>
                          <th className="p-2 min-w-[150px]"></th>
                          <th className="p-2 min-w-[150px]"></th>
                          <th className="p-2 min-w-[150px]">PPN(Rupiah)</th>
                          <th className="p-2 min-w-[150px]"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Row A */}
                        <tr className="border-b">
                          <td className="p-2 whitespace-normal break-words text-sm">
                            A. Pajak Keluaran yang harus dipungut sendiri (I.A.2
                            + I.A.3 + I.A.4 + I.A.5)
                          </td>
                          <td className="p-2"></td>
                          <td className="p-2"></td>
                          <td className="p-2">
                            <input
                              // type="number"
                              className="w-full p-1 border rounded-md text-right text-sm bg-gray-100"
                              defaultValue="0"
                              name="cl_3a_ppnb"
                              value={data.detail_spt.cl_3a_ppnb}
                              disabled
                            />
                          </td>
                          <td className="p-2"></td>
                        </tr>

                        {/* Row B */}
                        <tr className="border-b">
                          <td className="p-2 whitespace-normal break-words text-sm">
                            B. PPN Disetor di muka dalam masa pajak yang sama
                          </td>
                          <td className="p-2"></td>
                          <td className="p-2"></td>
                          <td className="p-2">
                            <input
                              // type="number"
                              className="w-full p-1 border rounded-md text-right text-sm bg-gray-100"
                              name="cl_3b_ppnb"
                              value={formData.cl_3b_ppnb}
                              onChange={handleChange}
                            />
                          </td>
                          <td className="p-2"></td>
                        </tr>

                        {/* Row C */}
                        <tr className="border-b">
                          <td className="p-2 whitespace-normal break-words text-sm">
                            C. Pajak Masukan yang dapat diperhitungkan (II.G)
                          </td>
                          <td className="p-2"></td>
                          <td className="p-2"></td>
                          <td className="p-2">
                            <input
                              // type="number"
                              readOnly
                              className="w-full p-1 border rounded-md text-right text-sm bg-gray-100"
                              defaultValue="0"
                              disabled
                              name="cl_3c_ppnb"
                              value={data.detail_spt.cl_3c_ppnb}
                            />
                          </td>
                          <td className="p-2"></td>
                        </tr>

                        {/* Row D */}
                        <tr className="border-b">
                          <td className="p-2 whitespace-normal break-words text-sm">
                            D. Kelebihan pemungutan PPN oleh Pemungutan PPN
                          </td>
                          <td className="p-2"></td>
                          <td className="p-2"></td>
                          <td className="p-2">
                            <input
                              // type="number"
                              className="w-full p-1 border rounded-md text-right text-sm bg-gray-100"
                              defaultValue="0"
                              name="cl_3d_ppnb"
                              value={formData.cl_3d_ppnb}
                              onChange={handleChange}
                            />
                          </td>
                          <td className="p-2"></td>
                        </tr>

                        {/* Row E */}
                        <tr className="border-b">
                          <td className="p-2 whitespace-normal break-words text-sm">
                            E. PPN kurang atau (lebih) bayar (III.A - III.B -
                            III.C - III.D)
                          </td>
                          <td className="p-2"></td>
                          <td className="p-2"></td>
                          <td className="p-2">
                            <input
                              // type="number"
                              className="w-full p-1 border rounded-md text-right text-sm bg-gray-100"
                              value={data.detail_spt.cl_3e_ppnb}
                              name="cl_3e_ppnb"
                              readOnly
                              // onChange={handleChange}
                            />
                          </td>
                          <td className="p-2 flex items-center gap-2"></td>
                        </tr>

                        {/* Row F */}
                        <tr className="border-b">
                          <td className="p-2 whitespace-normal break-words text-sm">
                            F. PPN Kurang atau (lebih) bayar pada SPT yang
                            dibetulkan sebelumnya
                          </td>
                          <td className="p-2"></td>
                          <td className="p-2"></td>
                          <td className="p-2">
                            <input
                              // type="number"
                              className="w-full p-1 border rounded-md text-right text-sm bg-gray-100"
                              defaultValue="0"
                              name="cl_3f_ppnb"
                              value={formData.cl_3f_ppnb}
                              onChange={handleChange}
                            />
                          </td>
                          <td className="p-2"></td>
                        </tr>

                        {/* Row G */}
                        <tr className="border-b">
                          <td className="p-2 whitespace-normal break-words text-sm">
                            G. PPN kurang atau (lebih) bayar karena pembetulan
                            SPT (III.E - III.F)
                          </td>
                          <td className="p-2"></td>
                          <td className="p-2"></td>
                          <td className="p-2">
                            <input
                              // type="number"
                              className="w-full p-1 border rounded-md text-right text-sm bg-gray-100"
                              value={data.detail_spt.cl_3g_ppnb}
                              disabled
                              name="cl_3g_ppnb"
                            />
                          </td>
                          <td className="p-2"></td>
                        </tr>
                        <tr className="border-b align-top">
                          <td className="p-2 whitespace-normal break-words text-sm w-1/3 align-top">
                            H. Diminta Untuk
                          </td>
                          <td className="p-2 align-top">
                            <div className="flex flex-col items-start gap-2 w-full">
                              <label className="flex items-center w-full">
                                <input
                                  type="radio"
                                  name="cl_3h_diminta"
                                  value="1"
                                  checked={formData.cl_3h_diminta === "1"}
                                  onChange={handleChange}
                                  className="form-radio"
                                />
                                <span className="ml-2">1. Dikompresikan</span>
                              </label>
                              <label className="flex items-center w-full">
                                <input
                                  type="radio"
                                  name="cl_3h_diminta"
                                  value="2"
                                  checked={formData.cl_3h_diminta === "2"}
                                  onChange={handleChange}
                                  className="form-radio"
                                />
                                <span className="ml-2">
                                  2. Dikembalikan melalui pengembalian
                                  pendahuluan
                                </span>
                              </label>
                              <label className="flex items-center w-full">
                                <input
                                  type="radio"
                                  name="cl_3h_diminta"
                                  value="3"
                                  checked={formData.cl_3h_diminta === "3"}
                                  onChange={handleChange}
                                  className="form-radio"
                                />
                                <span className="ml-2">
                                  3. Dikembalikan untuk pemeriksaan
                                </span>
                              </label>
                            </div>
                          </td>
                          <td className="p-2 align-top">
                            <div className="flex flex-col gap-2">
                              <label className="block text-sm">
                                Pilih rekening bank
                                <input
                                  type="text"
                                  name="rekening_bank"
                                  className="w-full p-1 border rounded-md text-sm bg-gray-100 ml-3 mt-1"
                                  disabled
                                />
                              </label>
                              <label className="block text-sm">
                                Nomor Rekening
                                <input
                                  type="text"
                                  name="cl_3h_nomor_rekening"
                                  className="w-full p-1 border rounded-md text-sm ml-7 mt-1"
                                  value={formData.cl_3h_nomor_rekening}
                                  onChange={handleChange}
                                />
                              </label>
                              <label className="block text-sm">
                                Nama Bank
                                <input
                                  type="text"
                                  name="cl_3h_nama_bank"
                                  className="w-full p-1 border rounded-md text-sm ml-16 mt-1"
                                  value={formData.cl_3h_nama_bank}
                                  onChange={handleChange}
                                />
                              </label>
                              <label className="block text-sm">
                                Nama Pemilik Bank
                                <input
                                  type="text"
                                  name="cl_3h_nama_pemilik_bank"
                                  className="w-full p-1 border rounded-md text-sm ml-3 mt-1"
                                  value={formData.cl_3h_nama_pemilik_bank}
                                  onChange={handleChange}
                                />
                              </label>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
                <div
                  className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100"
                  onClick={() =>
                    setShowPPNTerutangAtasKegiatanMembangunSendiri(
                      !showPPNTerutangAtasKegiatanMembangunSendiri
                    )
                  }
                >
                  <h3 className="text-lg font-semibold">
                    IV. PPN Terutang Atas Kegiatan Membangun Sendiri
                  </h3>
                  {showPPNTerutangAtasKegiatanMembangunSendiri ? (
                    <FaChevronUp />
                  ) : (
                    <FaChevronDown />
                  )}
                </div>
                {showPPNTerutangAtasKegiatanMembangunSendiri && (
                  <div className="border rounded-md p-4 overflow-x-auto">
                    <table className="min-w-full text-sm text-left border overflow-x-auto">
                      <thead className="bg-purple-700 text-white text-center">
                        <tr>
                          <th className="p-2 min-w-[300px]"></th>
                          <th className="p-2 min-w-[150px]"></th>
                          <th className="p-2 min-w-[150px]">DPP (Rupiah)</th>
                          <th className="p-2 min-w-[150px]">PPN (Rupiah)</th>
                          <th className="p-2 min-w-[150px]"></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="p-2 whitespace-normal break-words text-sm">
                            PPN Terutang
                          </td>
                          <td className="p-2"></td>
                          <td className="p-2">
                            <input
                              // type="number"
                              className="w-full p-1 border rounded-md text-right text-sm"
                              defaultValue="0"
                              value={formData.cl_4_ppn_terutang_dpp}
                              onChange={handleChange}
                              name="cl_4_ppn_terutang_dpp"
                            />
                          </td>
                          <td className="p-2">
                            <input
                              // type="number"
                              className="w-full p-1 border rounded-md text-right text-sm bg-gray-100"
                              value={data.detail_spt.cl_4_ppn_terutang}
                              disabled
                              name="cl_4_ppn_terutang"
                            />
                          </td>
                          <td className="p-2"></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}

                <div
                  className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100"
                  onClick={() =>
                    setShowPembayaranKembaliPajakMasukanYangTidakDapatDikreditkan(
                      !showPembayaranKembaliPajakMasukanTidakDapatDikreditkan
                    )
                  }
                >
                  <h3 className="text-lg font-semibold">
                    V. Pembayaran Kembali Pajak Masukan Yang Tidak Dapat Di
                    Kreditkan
                  </h3>
                  {showPembayaranKembaliPajakMasukanTidakDapatDikreditkan ? (
                    <FaChevronUp />
                  ) : (
                    <FaChevronDown />
                  )}
                </div>
                {showPembayaranKembaliPajakMasukanTidakDapatDikreditkan && (
                  <div className="border rounded-md p-4 overflow-x-auto">
                    <table className="min-w-full text-sm text-left border overflow-x-auto">
                      <thead className="bg-purple-700 text-white text-center">
                        <tr>
                          <th className="p-2 min-w-[300px]"></th>
                          <th className="p-2 min-w-[150px]"></th>
                          <th className="p-2 min-w-[150px]"></th>
                          <th className="p-2 min-w-[150px]">PPN (Rupiah)</th>
                          <th className="p-2 min-w-[150px]"></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="p-2 whitespace-normal break-words text-sm">
                            Pajak yang wajib dibayarkan kembali
                          </td>
                          <td className="p-2"></td>
                          <td className="p-2"></td>
                          <td className="p-2">
                            <input
                              type="text"
                              className="w-full p-1 border rounded-md text-right text-sm bg-gray-100"
                              name="cl_5_ppn_wajib"
                              value={formData.cl_5_ppn_wajib}
                              onChange={handleChange}
                            />
                          </td>
                          <td className="p-2"></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
                <div
                  className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100"
                  onClick={() =>
                    setShowPajakPenjualanAtasBarangMewah(
                      !showPajakPenjualanAtasBarangMewah
                    )
                  }
                >
                  <h3 className="text-lg font-semibold">
                    VI. Pajak Penjualan Atas Barang Mewah
                  </h3>
                  {showPajakPenjualanAtasBarangMewah ? (
                    <FaChevronUp />
                  ) : (
                    <FaChevronDown />
                  )}
                </div>
                {showPajakPenjualanAtasBarangMewah && (
                  <div className="border rounded-md p-4 overflow-x-auto">
                    <table className="min-w-full text-sm text-left border overflow-x-auto">
                      <thead className="bg-purple-700 text-white text-center">
                        <tr>
                          <th className="p-2 min-w-[300px]"></th>
                          <th className="p-2 min-w-[150px]"></th>
                          <th className="p-2 min-w-[150px]"></th>
                          <th className="p-2 min-w-[150px]"></th>
                          <th className="p-2 min-w-[150px]">PPnBM</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* row 1 */}
                        <tr className="border-b">
                          <td className="p-2 whitespace-normal break-words text-sm">
                            A. PPnMB yang harus dipungut sendiri (I.A.2 + I.A.3
                            + I.A.4 + I.A.5)
                          </td>
                          <td className="p-2"></td>
                          <td className="p-2"></td>
                          <td className="p-2"></td>
                          <td className="p-2">
                            <input
                              // type="number"
                              className="w-full p-1 border rounded-md text-right text-sm bg-gray-100"
                              value={data.detail_spt.cl_6a_ppnbm}
                              disabled
                              name="cl_6a_ppnbm"
                            />
                          </td>
                        </tr>
                        {/* row 2 */}
                        <tr className="border-b">
                          <td className="p-2 whitespace-normal break-words text-sm">
                            B. Kelebihan pemungutan PPnMB oleh Pemungut PPN
                          </td>
                          <td className="p-2"></td>
                          <td className="p-2"></td>
                          <td className="p-2"></td>
                          <td className="p-2">
                            <input
                              // type="number"
                              className="w-full p-1 border rounded-md text-right text-sm"
                              defaultValue="0"
                              name="cl_6b_ppnbm"
                              value={formData.cl_6b_ppnbm}
                              onChange={handleChange}
                            />
                          </td>
                        </tr>
                        {/* row 3 */}
                        <tr className="border-b">
                          <td className="p-2 whitespace-normal break-words text-sm">
                            C. PPnMB kurang atau (lebih) bayar (VI.A - VI.B)
                          </td>
                          <td className="p-2"></td>
                          <td className="p-2"></td>
                          <td className="p-2"></td>
                          <td className="p-2">
                            <input
                              // type="number"
                              className="w-full p-1 border rounded-md text-right text-sm bg-gray-100"
                              value={data.detail_spt.cl_6c_ppnbm}
                              disabled
                              name="cl_6c_ppnbm"
                            />
                          </td>
                        </tr>
                        {/* row 4 */}
                        <tr className="border-b">
                          <td className="p-2 whitespace-normal break-words text-sm">
                            D. PPnMB kurang atau (lebih) pada SPT yang
                            dibetulkan sebelumnya
                          </td>
                          <td className="p-2"></td>
                          <td className="p-2"></td>
                          <td className="p-2"></td>
                          <td className="p-2">
                            <input
                              // type="number"
                              className="w-full p-1 border rounded-md text-right text-sm"
                              defaultValue="0"
                              name="cl_6d_ppnbm"
                              value={formData.cl_6d_ppnbm}
                              onChange={handleChange}
                            />
                          </td>
                        </tr>
                        {/* row 5 */}
                        <tr className="border-b">
                          <td className="p-2 whitespace-normal break-words text-sm">
                            E. PPnMB kurang atau (lebih) karena pembetulan SPT
                            (VI.C - VI.D)
                          </td>
                          <td className="p-2"></td>
                          <td className="p-2"></td>
                          <td className="p-2"></td>
                          <td className="p-2">
                            <input
                              // type="number"
                              className="w-full p-1 border rounded-md text-right text-sm BG-gray-100"
                              value={data.detail_spt.cl_6e_ppnbm}
                              disabled
                              name="cl_6e_ppnbm"
                            />
                          </td>
                        </tr>
                        {/* row 6 */}
                        <tr className="border-b">
                          <td className="p-2 whitespace-normal break-words text-sm">
                            F. <input type="checkbox" className="ml-2 top-2" />{" "}
                            PPnMB kurang atau (lebih) pada SPT yang dibetulkan
                            sebelumnya
                          </td>

                          {/* <input
                            // type="number"
                            className="w-full p-1 border rounded-md text-right text-sm BG-gray-100"
                            value={formData.cl_6f_diminta_pengembalian}
                            disabled={data.detail_spt.cl_6e_ppnbm > 0}
                            name="cl_6f_diminta_pengembalian"
                            onChange={handleChange}
                          /> */}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
                <div
                  className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100"
                  onClick={() =>
                    setShowPemungutanPPNatauPPNdanPPNMBolehPemungutPPN(
                      !showPemungutanPPNatauPPNdanPPNMBolehPemungutPPN
                    )
                  }
                >
                  <h3 className="text-lg font-semibold">
                    VII. Pemungutan PPN atau PPNmB oleh Pemungut PPN
                  </h3>
                  {setShowPemungutanPPNatauPPNdanPPNMBolehPemungutPPN ? (
                    <FaChevronUp />
                  ) : (
                    <FaChevronDown />
                  )}
                </div>
                {showPemungutanPPNatauPPNdanPPNMBolehPemungutPPN && (
                  <div className="border rounded-md p-4 overflow-x-auto">
                    <table className="min-w-full text-sm text-left border overflow-x-auto">
                      <thead className="bg-purple-700 text-white text-center">
                        <tr>
                          <th className="p-2 min-w-[300px]"></th>
                          <th className="p-2 min-w-[150px]">
                            Harga Jual/Penggantian/ <br />
                            Nilai Ekspor/DPP
                          </th>
                          <th className="p-2 min-w-[150px]">
                            DPP Nilai Lain/ DPP
                          </th>
                          <th className="p-2 min-w-[150px]">PPN</th>
                          <th className="p-2 min-w-[150px]">PPnBM</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* row 1 */}
                        <tr className="border-b">
                          <td className="p-2 whitespace-normal break-words text-sm">
                            A. Jumlah PPN dan PPNmB yang dipungut
                          </td>
                          <td className="p-2">
                            <input
                              name="cl_7a_dpp"
                              // type="number"
                              className="w-full p-1 border rounded-md text-right text-sm"
                              value={formData.cl_7a_dpp}
                              onChange={handleChange}
                            />
                          </td>
                          <td className="p-2">
                            <input
                              name="cl_7a_dpp_lain"
                              // type="number"
                              className="w-full p-1 border rounded-md text-right text-sm"
                              value={formData.cl_7a_dpp_lain}
                              onChange={handleChange}
                            />
                          </td>
                          <td className="p-2">
                            <input
                              name="cl_7a_ppn"
                              // type="number"
                              className="w-full p-1 border rounded-md text-right text-sm"
                              value={formData.cl_7a_ppn}
                              onChange={handleChange}
                            />
                          </td>
                          <td className="p-2">
                            <input
                              name="cl_7a_ppnbm"
                              // type="number"
                              className="w-full p-1 border rounded-md text-right text-sm"
                              value={formData.cl_7a_ppnbm}
                              onChange={handleChange}
                            />
                          </td>
                        </tr>

                        {/* row 2 */}
                        <tr className="border-b">
                          <td className="p-2 whitespace-normal break-words text-sm">
                            B. PPN dan PPNmB kurang atau (lebih) bayar pada SPT
                            yang dibetulkan sebelumnya
                          </td>
                          <td className="p-2">
                            <input
                              name="cl_7b_dpp"
                              // type="number"
                              className="w-full p-1 border rounded-md text-right text-sm"
                              value={formData.cl_7b_dpp}
                              onChange={handleChange}
                            />
                          </td>
                          <td className="p-2">
                            <input
                              name="cl_7b_dpp_lain"
                              // type="number"
                              className="w-full p-1 border rounded-md text-right text-sm"
                              value={formData.cl_7b_dpp_lain}
                              onChange={handleChange}
                            />
                          </td>
                          <td className="p-2">
                            <input
                              name="cl_7b_ppn"
                              // type="number"
                              className="w-full p-1 border rounded-md text-right text-sm"
                              value={formData.cl_7b_ppn}
                              onChange={handleChange}
                            />
                          </td>
                          <td className="p-2">
                            <input
                              name="cl_7b_ppnbm"
                              // type="number"
                              className="w-full p-1 border rounded-md text-right text-sm"
                              value={formData.cl_7b_ppnbm}
                              onChange={handleChange}
                            />
                          </td>
                        </tr>

                        {/* row 3 */}
                        <tr className="border-b">
                          <td className="p-2 whitespace-normal break-words text-sm">
                            C. PPN dan PPNmB kurang atau (lebih) bayar karena
                            pembetulan SPT (VII.A - VII.B)
                          </td>
                          <td className="p-2">
                            <input
                              name="cl_7c_dpp"
                              // type="number"
                              className="w-full p-1 border rounded-md text-right text-sm bg-gray-100"
                              value={data.detail_spt.cl_7c_dpp}
                              disabled
                            />
                          </td>
                          <td className="p-2">
                            <input
                              name="cl_7c_dpp_lain"
                              // type="number"
                              className="w-full p-1 border rounded-md text-right text-sm bg-gray-100"
                              value={data.detail_spt.cl_7c_dpp_lain}
                              disabled
                            />
                          </td>
                          <td className="p-2">
                            <input
                              name="cl_7c_ppn"
                              // type="number"
                              className="w-full p-1 border rounded-md text-right text-sm bg-gray-100"
                              value={data.detail_spt.cl_7c_ppn}
                              disabled
                            />
                          </td>
                          <td className="p-2">
                            <input
                              name="cl_7c_ppnbm"
                              // type="number"
                              className="w-full p-1 border rounded-md text-right text-sm bg-gray-100"
                              value={data.detail_spt.cl_7c_ppnbm}
                              disabled
                            />
                          </td>
                        </tr>

                        {/* row 1 */}
                        <tr className="border-b">
                          <td className="p-2 whitespace-normal break-words text-sm font-bold">
                            Setiap kelebihan pemungutan dari bagian ini akan
                            menjadi pengurang pada bagian III.D untuk PPN dan
                            VI.B untuk PPNmB
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
                <div
                  className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100"
                  onClick={() =>
                    setShowPemungutanPPNatauPPNdanPPNMBolehPihakLain(
                      !showPemungutanPPNatauPPNdanPPNMBolehPihakLain
                    )
                  }
                >
                  <h3 className="text-lg font-semibold">
                    VIII. Pemungutan PPN atau PPN dan PPNMB oleh Pihak Lain
                  </h3>
                  {setShowPemungutanPPNatauPPNdanPPNMBolehPihakLain ? (
                    <FaChevronUp />
                  ) : (
                    <FaChevronDown />
                  )}
                </div>
                {showPemungutanPPNatauPPNdanPPNMBolehPihakLain && (
                  <div className="border rounded-md p-4 overflow-x-auto">
                    <table className="min-w-full text-sm text-left border overflow-x-auto">
                      <thead className="bg-purple-700 text-white text-center">
                        <tr>
                          <th className="p-2 min-w-[300px]"></th>
                          <th className="p-2 min-w-[150px]">
                            Harga Jual/Penggantian/ <br />
                            Nilai Ekspor/DPP
                          </th>
                          <th className="p-2 min-w-[150px]">
                            DPP Nilai Lain/ DPP
                          </th>
                          <th className="p-2 min-w-[150px]">PPN</th>
                          <th className="p-2 min-w-[150px]">PPnBM</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* row 1 */}
                        <tr className="border-b">
                          <td className="p-2 whitespace-normal break-words text-sm">
                            A. Jumlah PPN dan PPNmB yang dipungut
                          </td>
                          <td className="p-2">
                            <input
                              name="cl_8a_dpp"
                              // type="number"
                              className="w-full p-1 border rounded-md text-right text-sm bg-gray-100"
                              value={formData.cl_8a_dpp}
                              onChange={handleChange}
                            />
                          </td>
                          <td className="p-2">
                            <input
                              name="cl_8a_dpp_lain"
                              // type="number"
                              className="w-full p-1 border rounded-md text-right text-sm bg-gray-100"
                              value={formData.cl_8a_dpp_lain}
                              onChange={handleChange}
                            />
                          </td>
                          <td className="p-2">
                            <input
                              name="cl_8a_ppn"
                              // type="number"
                              className="w-full p-1 border rounded-md text-right text-sm bg-gray-100"
                              value={formData.cl_8a_ppn}
                              onChange={handleChange}
                            />
                          </td>
                          <td className="p-2">
                            <input
                              name="cl_8a_ppnbm"
                              // type="number"
                              className="w-full p-1 border rounded-md text-right text-sm"
                              value={formData.cl_8a_ppnbm}
                              onChange={handleChange}
                            />
                          </td>
                        </tr>

                        {/* row 2 */}
                        <tr className="border-b">
                          <td className="p-2 whitespace-normal break-words text-sm">
                            B. PPN dan PPNmB kurang atau (lebih) bayar pada SPT
                            yang dibetulkan sebelumnya
                          </td>
                          <td className="p-2">
                            <input
                              type="text"
                              name="cl_8b_dpp"
                              className="w-full p-1 border rounded-md text-right text-sm bg-gray-100"
                              value={formData.cl_8b_dpp}
                              onChange={handleChange}
                            />
                          </td>
                          <td className="p-2">
                            <input
                              type="text"
                              name="cl_8b_dpp_lain"
                              className="w-full p-1 border rounded-md text-right text-sm bg-gray-100"
                              value={formData.cl_8b_dpp_lain}
                              onChange={handleChange}
                            />
                          </td>
                          <td className="p-2">
                            <input
                              type="text"
                              name="cl_8b_ppn"
                              className="w-full p-1 border rounded-md text-right text-sm bg-gray-100"
                              value={formData.cl_8b_ppn}
                              onChange={handleChange}
                            />
                          </td>
                          <td className="p-2">
                            <input
                              type="text"
                              name="cl_8b_ppnbm"
                              className="w-full p-1 border rounded-md text-right text-sm"
                              value={formData.cl_8b_ppnbm}
                              onChange={handleChange}
                            />
                          </td>
                        </tr>

                        {/* row 3 */}
                        <tr className="border-b">
                          <td className="p-2 whitespace-normal break-words text-sm">
                            C. PPN dan PPNmB kurang atau (lebih) bayar karena
                            pembetulan SPT (VIII.A - VIII.B)
                          </td>
                          <td className="p-2">
                            <input
                              type="text"
                              name="cl_8c_dpp"
                              className="w-full p-1 border rounded-md text-right text-sm bg-gray-100"
                              value={data.detail_spt.cl_8c_dpp}
                              disabled
                            />
                          </td>
                          <td className="p-2">
                            <input
                              type="text"
                              name="cl_8c_dpp_lain"
                              className="w-full p-1 border rounded-md text-right text-sm bg-gray-100"
                              value={data.detail_spt.cl_8c_dpp_lain}
                              disabled
                            />
                          </td>
                          <td className="p-2">
                            <input
                              type="text"
                              name="cl_8c_ppn"
                              className="w-full p-1 border rounded-md text-right text-sm bg-gray-100"
                              value={data.detail_spt.cl_8c_ppn}
                              disabled
                            />
                          </td>
                          <td className="p-2">
                            <input
                              type="text"
                              name="cl_8c_ppnbm"
                              className="w-full p-1 border rounded-md text-right text-sm bg-gray-100"
                              value={data.detail_spt.cl_8c_ppnbm}
                              disabled
                            />
                          </td>
                        </tr>

                        {/* row 4 */}
                        <tr className="border-b">
                          <td className="p-2 whitespace-normal break-words text-sm ">
                            D. <input type="checkbox" className="" /> diminta
                            pengembalian pajak yang tidak seharusnya terutang
                          </td>
                          <td className="p-2">
                            {/* <input
                              type="checkbox"
                              name="cl_8c_dpp"
                              className="p-1 border rounded-md bg-gray-100"
                              // checked={
                              //   data.detail_spt.cl_8d_diminta_pengembalian !==
                              //     "0" &&
                              //   data.detail_spt.cl_8d_diminta_pengembalian !==
                              //     undefined &&
                              //   data.detail_spt.cl_8d_diminta_pengembalian !==
                              //     ""
                              // }
                              onChange={(e) => {
                                const newValue = e.target.checked ? "1" : "0";
                                handleChange({
                                  target: {
                                    name: "cl_8d_diminta_pengembalian",
                                    value: newValue,
                                  },
                                });
                              }}
                            /> */}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
                <div
                  className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100"
                  onClick={() => setShowKelengkapan(!showKelengkapan)}
                >
                  <h3 className="text-lg font-semibold">IX. Kelengkapan</h3>
                  {setShowKelengkapan ? <FaChevronUp /> : <FaChevronDown />}
                </div>
                {showKelengkapan && (
                  <div className="border rounded-md p-4 overflow-x-auto">
                    <table className="min-w-full text-sm text-left border overflow-x-auto">
                      <thead className="bg-purple-700 text-white text-center">
                        <tr>
                          <th className="p-2 min-w-[300px]"></th>
                          <th className="p-2 min-w-[150px]">
                            Harga Jual/Penggantian/ <br />
                            Nilai Ekspor/DPP
                          </th>
                          <th className="p-2 min-w-[150px]">
                            DPP Nilai Lain/ DPP
                          </th>
                          <th className="p-2 min-w-[150px]">PPN</th>
                          <th className="p-2 min-w-[150px]">PPnBM</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* row 1 */}
                        <tr className="border-b">
                          <td className="p-2 whitespace-normal break-words text-sm">
                            A.{" "}
                            {/* <input
                              type="checkbox"
                              className=""
                              name="cl_9a_daftar"
                            />{" "} */}
                            Daftar Rincian Kendaraan Bermotor
                          </td>
                          <td className="p-2">
                            <input
                              type="checkbox"
                              name="cl_9a_daftar"
                              className="p-1 border rounded-md bg-gray-100"
                              // checked={
                              //   data.detail_spt.cl_8d_diminta_pengembalian !==
                              //     "0" &&
                              //   data.detail_spt.cl_8d_diminta_pengembalian !==
                              //     undefined &&
                              //   data.detail_spt.cl_8d_diminta_pengembalian !==
                              //     ""
                              // }
                              onChange={(e) => {
                                const newValue = e.target.checked ? "1" : "0";
                                handleChange({
                                  target: {
                                    name: "cl_9a_daftar",
                                    value: newValue,
                                  },
                                });
                              }}
                            />
                          </td>
                        </tr>
                        {/* row 2 */}
                        <tr className="border-b">
                          <td className="p-2 whitespace-normal break-words text-sm">
                            B.{" "}
                            {/* <input
                              type="checkbox"
                              className=""
                              name="cl_9a_daftar"
                            />{" "} */}
                            Hasil penghitungan kembali Pajak Masukan yang telah
                            dikreditkan sebagai penambah (pengurang) Pajak
                            Masukan
                          </td>
                          <td className="p-2">
                            <input
                              type="checkbox"
                              name="cl_9a_hasil_perhitungan"
                              className="p-1 border rounded-md bg-gray-100"
                              // checked={
                              //   data.detail_spt.cl_8d_diminta_pengembalian !==
                              //     "0" &&
                              //   data.detail_spt.cl_8d_diminta_pengembalian !==
                              //     undefined &&
                              //   data.detail_spt.cl_8d_diminta_pengembalian !==
                              //     ""
                              // }
                              onChange={(e) => {
                                const newValue = e.target.checked ? "1" : "0";
                                handleChange({
                                  target: {
                                    name: "cl_9a_hasil_perhitungan",
                                    value: newValue,
                                  },
                                });
                              }}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
                <div
                  className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100"
                  onClick={() => setShowPernyataan(!showPernyataan)}
                >
                  <h3 className="text-lg font-semibold">X. Pernyataan</h3>
                  {setShowPernyataan ? <FaChevronUp /> : <FaChevronDown />}
                </div>
                {showPernyataan && (
                  <div className="border rounded-md p-4 mb-4">
                    <div className="text-sm font-bold italic">
                      <input type="checkbox" className="m-2" />
                      PERNYATAAN : DENGAN MENYADARI SEPENUHNYA AKAN SEGALA
                      AKIBATNYA, SAYA MENYATAKAN BAHWA APA YANG TELAH SAYA
                      BERITAHUKAN DI ATAS BESERTA LAMPIRAN-LAMPIRANNYA ADALAH
                      BENAR, LENGKAP, JELAS, DAN TIDAK BERSYARAT
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div className="grid grid-cols-2 gap-4">
                        <label className="block text-sm font-medium text-gray-700 col-span-1">
                          DITANDATANGANI OLEH
                        </label>
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id="test1"
                            name="ditandatangani"
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            disabled
                            // value={}
                          />
                          <label
                            htmlFor="PKP"
                            className="text-gray-700 text-sm"
                          >
                            PKP
                          </label>
                          <input
                            type="radio"
                            id="test2"
                            name="ditandatangani"
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            onClick={(e) =>
                              e.target.parentElement.previousElementSibling.click()
                            }
                          />
                          <label
                            htmlFor="KuasaWajibPajak"
                            className="text-gray-700 text-sm"
                          >
                            Kuasa Wajib Pajak
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div className="grid grid-cols-2 gap-4">
                        <label className="block text-sm font-medium text-gray-700 col-span-1">
                          Kota Penandatanganan SPT
                        </label>
                        <div className="flex items-center space-x-2 w-full">
                          <input
                            name="kota_badan"
                            type="text"
                            className="rounded w-full bg-gray-300 border-black text-sm p-2 flex-1"
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div className="grid grid-cols-2 gap-4">
                        <label className="block text-sm font-medium text-gray-700 col-span-1">
                          Nama
                        </label>
                        <div className="flex items-center space-x-2 w-full">
                          <input
                            type="text"
                            name="nama_pic"
                            className="rounded w-full bg-gray-300 border-black text-sm p-2 flex-1"
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div className="grid grid-cols-2 gap-4">
                        <label className="block text-sm font-medium text-gray-700 col-span-1">
                          Posisi
                        </label>
                        <div className="flex items-center space-x-2 w-full">
                          <input
                            type="text"
                            // name="auto value pic"
                            className="rounded w-full bg-gray-300 border-black text-sm p-2 flex-1"
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div className="grid grid-cols-2 gap-4">
                        <label className="block text-sm font-medium text-gray-700 col-span-1">
                          Batas waktu pengumpulan
                        </label>
                        <div className="flex items-center space-x-2 w-full">
                          <input
                            name="cl_10_batas_waktu"
                            type="date"
                            className="rounded w-full bg-white border-grey-300 border text-sm p-2 flex-1"
                            onChange={handleChange}
                            value={formData.cl_10_batas_waktu}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div className="flex justify-start mt-4 gap-2">
                  <button
                    onClick={() => saveConcept.mutate()}
                    // type="submit"
                    className="bg-blue-700 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-sm"
                  >
                    Simpan Konsep
                  </button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <button
                        type="button"
                        className="bg-blue-700 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-sm"
                      >
                        Bayar dan Lapor
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="max-w-xl">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-lg font-semibold ">
                          Pilih Cara Pembayaran
                        </AlertDialogTitle>
                        <AlertDialogDescription className=" text-gray-600">
                          Silakan pilih metode pembayaran yang akan digunakan
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <div className="flex gap-3 py-4 justify-end">
                        <AlertDialogAction
                          onClick={() => payDeposit.mutate()}
                          className=" bg-blue-500 text-white py-3 px-4 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 text-sm font-medium transition-colors"
                        >
                          Pemindahan Deposit
                        </AlertDialogAction>
                        <AlertDialogAction
                          onClick={() => payBilling.mutate()}
                          className=" bg-blue-500 text-white py-3 px-4 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 text-sm font-medium transition-colors"
                        >
                          Buat Kode Billing
                        </AlertDialogAction>
                      </div>
                      <AlertDialogFooter>
                        {/* <AlertDialogCancel className="w-full">
                          Batal
                        </AlertDialogCancel> */}
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
                {showScrollTop && (
                  <button
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 bg-purple-700 text-white p-3 rounded-full shadow-lg hover:bg-purple-800 transition duration-300 w-12 h-12 flex items-center justify-center"
                    aria-label="Scroll to top"
                  >
                    ↑
                  </button>
                )}
              </div>
            </TabsContent>
            {isLoadingOther ? (
              <div className="loading">
                <ClipLoader></ClipLoader>
              </div>
            ) : (
              <>
                <TabsContent value="a-1">
                  <div className="mt-4">
                    <div className="text-lg font-semibold mb-4">
                      <h1>
                        DAFTAR EKSPOR BKP BERWUJUD, BKP TIDAK BERWUJUD, DAN/ATAU
                        PKP
                      </h1>
                    </div>
                    <div
                      className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
                      onClick={() => setShowHeadera1(!showHeadera1)}
                    >
                      <h3 className="text-lg font-semibold">Header</h3>
                      {showHeadera1 ? <FaChevronUp /> : <FaChevronDown />}
                    </div>
                    {showHeadera1 && (
                      <div className="border rounded-md p-4 mb-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Kiri */}
                          <div>
                            <label className="block font-medium text-gray-700">
                              NAMA PKP *
                            </label>
                            <input
                              type="text"
                              readOnly
                              value="KANTOR AKUNTAN PUBLIK MOH WILDAN DAN ADI DARMAWAN"
                              className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                            />
                          </div>

                          <div>
                            <label className="block font-medium text-gray-700">
                              MASA *
                            </label>
                            <input
                              type="text"
                              readOnly
                              value="032025"
                              className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                            />
                          </div>
                          <div>
                            <label className="block font-medium text-gray-700">
                              NPWP*
                            </label>
                            <input
                              type="text"
                              readOnly
                              value="0934274002429000"
                              className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                            />
                          </div>
                          <div>
                            <label className="block font-medium text-gray-700">
                              Normal/Pembetulan
                            </label>
                            <select
                              disabled
                              className="w-full p-2 border rounded-md bg-gray-100 text-gray-600 cursor-not-allowed"
                            >
                              <option>Normal</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="border">
                      <table className="min-w-full text-sm text-left border overflow-x-auto">
                        <thead className="bg-purple-700 text-white text-center">
                          <tr>
                            <th className="p-2 border-b">No</th>
                            <th className="p-2 border-b min-w-[200px]">
                              Nama Pembeli
                            </th>
                            <th className="p-2 border-b min-w-[150px]">NPWP</th>
                            <th className="p-2 border-b min-w-[150px]">
                              Faktur Pajak Nomor
                            </th>
                            <th className="p-2 border-b min-w-[150px]">
                              Faktur Pajak Tanggal
                            </th>
                            <th className="p-2 border-b min-w-[150px]">
                              DPP (Rupiah)
                            </th>
                            <th className="p-2 border-b min-w-[150px]">
                              DPP Lain (Rupiah)
                            </th>
                            <th className="p-2 border-b min-w-[150px]">
                              PPN (Rupiah)
                            </th>
                            <th className="p-2 border-b min-w-[150px]">
                              PPnBM (Rupiah)
                            </th>
                          </tr>
                        </thead>
                        <tbody className="text-gray-600 text-center">
                          {sptOther.data.length > 0 ? (
                            sptOther.data.map((item, index) => (
                              <tr key={index}>
                                <td className="p-2 border-b text-center">
                                  {index + 1}
                                </td>
                                <td className="p-2 border-b">
                                  {item.nama_pembeli || "-"}
                                </td>
                                <td className="p-2 border-b">
                                  {item.npwp || "-"}
                                </td>
                                <td className="p-2 border-b">
                                  {item.faktur_pajak_nomor || "-"}
                                </td>
                                <td className="p-2 border-b">
                                  {item.faktur_pajak_tanggal || "-"}
                                </td>
                                <td className="p-2 border-b">
                                  {item.dpp || "0"}
                                </td>
                                <td className="p-2 border-b">
                                  {item.dpp_lain || "0"}
                                </td>
                                <td className="p-2 border-b">
                                  {item.ppn || "0"}
                                </td>
                                <td className="p-2 border-b">
                                  {item.ppnbm || "0"}
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td
                                className="p-2 border-b text-center"
                                colSpan={6}
                              >
                                No data available
                              </td>
                            </tr>
                          )}
                        </tbody>
                        <tfoot className="text-gray-800 font-semibold bg-gray-100">
                          <tr>
                            <td
                              className="p-2 text-center min-w-[150px]"
                              colSpan={4}
                            >
                              Jumlah
                            </td>
                            <td className="p-2 text-center">
                              {/* {data.reduce(
                            (sum, item) => sum + parseFloat(item.dpp || 0),
                            0
                          )} */}
                            </td>
                            <td className="p-2"></td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="a-2">
                  <div className="mt-4">
                    <div className="text-lg font-semibold mb-4">
                      <h1>
                        DAFTAR PAJAK KELUARAN ATAS PENYERAHAN DALAM NEGERI
                        DENGAN FAKTUR PAJAK
                      </h1>
                    </div>
                    <div
                      className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
                      onClick={() => setShowHeadera2(!showHeadera2)}
                    >
                      <h3 className="text-lg font-semibold">Header</h3>
                      {showHeadera2 ? <FaChevronUp /> : <FaChevronDown />}
                    </div>
                    {showHeadera2 && (
                      <div className="border rounded-md p-4 mb-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Kiri */}
                          <div>
                            <label className="block font-medium text-gray-700">
                              NAMA PKP *
                            </label>
                            <input
                              type="text"
                              readOnly
                              value="KANTOR AKUNTAN PUBLIK MOH WILDAN DAN ADI DARMAWAN"
                              className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                            />
                          </div>

                          <div>
                            <label className="block font-medium text-gray-700">
                              MASA *
                            </label>
                            <input
                              type="text"
                              readOnly
                              value="032025"
                              className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                            />
                          </div>
                          <div>
                            <label className="block font-medium text-gray-700">
                              NPWP*
                            </label>
                            <input
                              type="text"
                              readOnly
                              value="0934274002429000"
                              className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                            />
                          </div>
                          <div>
                            <label className="block font-medium text-gray-700">
                              Normal/Pembetulan
                            </label>
                            <select
                              disabled
                              className="w-full p-2 border rounded-md bg-gray-100 text-gray-600 cursor-not-allowed"
                            >
                              <option>Normal</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className=" w-[1450px] overflow-x-auto bg-white shadow-md rounded-lg overflow-hidden ">
                      <table className="table-auto text-sm text-left border overflow-hidden">
                        <thead className="bg-purple-700 text-white text-center">
                          <tr>
                            <th className="p-2 border-b ">No</th>
                            <th className="p-2 border-b min-w-[200px]">
                              Nama Pembeli BKP/Penerima Manfaat BKP Tidak
                              Berwujud/Penerima JKP
                            </th>
                            <th className="p-2  border-b min-w-[150px]">
                              NPWP/NIK/Nomor Paspor
                            </th>
                            <th className="p-2 border-b min-w-[150px]">
                              Faktur Pajak Dokumen Tertentu/Nota Retur/Nota
                              Pembatalan - nomor
                            </th>
                            <th className="p-2 border-b min-w-[150px]">
                              Harga Jual/Pengganti/DPP (Rupiah)
                            </th>
                            <th className="p-2 border-b min-w-[150px]">
                              DPP Nilai Lain/DPP (Rupiah)
                            </th>
                            <th className="p-2 border-b min-w-[150px]">
                              PPN (Rupiah)
                            </th>
                            <th className="p-2 border-b min-w-[150px]">
                              PPnBM (Rupiah)
                            </th>
                            <th className="p-2 border-b min-w-[150px]">
                              Kode dan Nomor Seri Faktur Pajak Diganti/Diretur
                            </th>
                          </tr>
                        </thead>
                        <tbody className="text-gray-600 text-center">
                          {sptOther.data.length > 0 ? (
                            sptOther.data.map((item, index) => (
                              <tr key={index}>
                                <td className="p-2 border-b text-center">
                                  {index + 1}
                                </td>
                                <td className="p-2 border-b">
                                  {item.nama_pembeli || "-"}
                                </td>
                                <td className="p-2 border-b">
                                  {item.npwp || "-"}
                                </td>
                                <td className="p-2 border-b">
                                  {item.faktur_pajak_nomor || "-"}
                                </td>
                                <td className="p-2 border-b">
                                  {item.faktur_pajak_tanggal || "-"}
                                </td>
                                <td className="p-2 border-b">
                                  {item.dpp || "0"}
                                </td>
                                <td className="p-2 border-b">
                                  {item.dpp_lain || "0"}
                                </td>
                                <td className="p-2 border-b">
                                  {item.ppn || "0"}
                                </td>
                                <td className="p-2 border-b">
                                  {item.ppnbm || "0"}
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td
                                className="p-2 border-b text-center"
                                colSpan={6}
                              >
                                No data available
                              </td>
                            </tr>
                          )}
                        </tbody>
                        <tfoot className="text-gray-800 font-semibold bg-gray-100">
                          <tr>
                            <td
                              className="p-2 text-center min-w-[150px]"
                              colSpan={4}
                            >
                              Jumlah
                            </td>
                            <td className="p-2 text-center">0</td>
                            <td className="p-2"></td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="b-1">
                  <div className="mt-4">
                    <div className="text-lg font-semibold mb-4">
                      <h1>
                        DAFTAR PAJAK MASUKAN YANG DAPAT DIKREDITKAN ATAS IMPOR
                        BKP DAN PEMANFAATAN BKP TIDAK BERWUJUD/JKP DARI LUAR
                        DAERAH PABEAN
                      </h1>
                    </div>
                    <div
                      className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
                      onClick={() => setShowHeaderb1(!showHeaderb1)}
                    >
                      <h3 className="text-lg font-semibold">Header</h3>
                      {showHeaderb1 ? <FaChevronUp /> : <FaChevronDown />}
                    </div>
                    {showHeaderb1 && (
                      <div className="border rounded-md p-4 mb-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Kiri */}
                          <div>
                            <label className="block font-medium text-gray-700">
                              NAMA PKP *
                            </label>
                            <input
                              type="text"
                              readOnly
                              value="KANTOR AKUNTAN PUBLIK MOH WILDAN DAN ADI DARMAWAN"
                              className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                            />
                          </div>

                          <div>
                            <label className="block font-medium text-gray-700">
                              MASA *
                            </label>
                            <input
                              type="text"
                              readOnly
                              value="032025"
                              className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                            />
                          </div>
                          <div>
                            <label className="block font-medium text-gray-700">
                              NPWP*
                            </label>
                            <input
                              type="text"
                              readOnly
                              value="0934274002429000"
                              className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                            />
                          </div>
                          <div>
                            <label className="block font-medium text-gray-700">
                              Normal/Pembetulan
                            </label>
                            <select
                              disabled
                              className="w-full p-2 border rounded-md bg-gray-100 text-gray-600 cursor-not-allowed"
                            >
                              <option>Normal</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className=" w-[1450px] overflow-x-auto bg-white shadow-md rounded-lg overflow-hidden ">
                      <table className="table-auto text-sm text-left border overflow-hidden">
                        <thead className="bg-purple-700 text-white text-center">
                          <tr>
                            <th className="p-2 border-b ">No</th>
                            <th className="p-2 border-b min-w-[200px]">
                              Nama Pembeli BKP/Penerima Manfaat BKP Tidak
                              Berwujud/Penerima JKP
                            </th>
                            <th className="p-2  border-b min-w-[150px]">
                              NPWP/NIK/Nomor Paspor
                            </th>
                            <th className="p-2 border-b min-w-[150px]">
                              Dokumen Tertentu - Nomor
                            </th>
                            <th className="p-2 border-b min-w-[150px]">
                              Dokumen Tertentu - Tanggal
                            </th>
                            <th className="p-2 border-b min-w-[150px]">
                              DPP (Rupiah)
                            </th>
                            <th className="p-2 border-b min-w-[150px]">
                              PPN (Rupiah)
                            </th>
                            <th className="p-2 border-b min-w-[150px]">
                              PPnBM (Rupiah)
                            </th>
                            <th className="p-2 border-b min-w-[150px]">
                              Keterangan
                            </th>
                          </tr>
                        </thead>
                        <tbody className="text-gray-600 text-center">
                          {sptOther.data.length > 0 ? (
                            sptOther.data.map((item, index) => (
                              <tr key={index}>
                                <td className="p-2 border-b text-center">
                                  {index + 1}
                                </td>
                                <td className="p-2 border-b">
                                  {item.nama_pembeli || "-"}
                                </td>
                                <td className="p-2 border-b">
                                  {item.npwp || "-"}
                                </td>
                                <td className="p-2 border-b">
                                  {item.faktur_pajak_nomor || "-"}
                                </td>
                                <td className="p-2 border-b">
                                  {item.faktur_pajak_tanggal || "-"}
                                </td>
                                <td className="p-2 border-b">
                                  {item.dpp || "0"}
                                </td>
                                <td className="p-2 border-b">
                                  {item.dpp_lain || "0"}
                                </td>
                                <td className="p-2 border-b">
                                  {item.ppn || "0"}
                                </td>
                                <td className="p-2 border-b">
                                  {item.ppnbm || "0"}
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td
                                className="p-2 border-b text-center"
                                colSpan={6}
                              >
                                No data available
                              </td>
                            </tr>
                          )}
                        </tbody>
                        <tfoot className="text-gray-800 font-semibold bg-gray-100">
                          <tr>
                            <td
                              className="p-2 text-center min-w-[150px]"
                              colSpan={4}
                            >
                              Jumlah
                            </td>
                            <td className="p-2 text-center">0</td>
                            <td className="p-2"></td>
                            <td className="p-2"></td>
                            <td className="p-2"></td>
                            <td className="p-2"></td>
                            <td className="p-2"></td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="b-2">
                  <div className="mt-4">
                    <div className="text-lg font-semibold mb-4">
                      <h1>
                        DAFTAR PAJAK MASUKAN YANG DAPAT DIKREDITKAN BKP/JKP
                        DALAM NEGERI
                      </h1>
                    </div>
                    <div
                      className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
                      onClick={() => setShowHeaderb2(!showHeaderb2)}
                    >
                      <h3 className="text-lg font-semibold">Header</h3>
                      {showHeaderb2 ? <FaChevronUp /> : <FaChevronDown />}
                    </div>
                    {showHeaderb2 && (
                      <div className="border rounded-md p-4 mb-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Kiri */}
                          <div>
                            <label className="block font-medium text-gray-700">
                              NAMA PKP *
                            </label>
                            <input
                              type="text"
                              readOnly
                              value="KANTOR AKUNTAN PUBLIK MOH WILDAN DAN ADI DARMAWAN"
                              className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                            />
                          </div>

                          <div>
                            <label className="block font-medium text-gray-700">
                              MASA *
                            </label>
                            <input
                              type="text"
                              readOnly
                              value="032025"
                              className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                            />
                          </div>
                          <div>
                            <label className="block font-medium text-gray-700">
                              NPWP*
                            </label>
                            <input
                              type="text"
                              readOnly
                              value="0934274002429000"
                              className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                            />
                          </div>
                          <div>
                            <label className="block font-medium text-gray-700">
                              Normal/Pembetulan
                            </label>
                            <select
                              disabled
                              className="w-full p-2 border rounded-md bg-gray-100 text-gray-600 cursor-not-allowed"
                            >
                              <option>Normal</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className=" w-[1450px] overflow-x-auto bg-white shadow-md rounded-lg overflow-hidden ">
                      <table className="table-auto text-sm text-left border overflow-hidden">
                        <thead className="bg-purple-700 text-white text-center">
                          <tr>
                            <th className="p-2 border-b ">No</th>
                            <th className="p-2 border-b min-w-[200px]">
                              Nama Pembeli BKP/Penerima Manfaat BKP Tidak
                              Berwujud/Penerima JKP
                            </th>
                            <th className="p-2  border-b min-w-[150px]">
                              NPWP/NIK/Nomor Paspor
                            </th>
                            <th className="p-2 border-b min-w-[150px]">
                              Faktur Pajak/Dokumen Tertentu/Nota Retur/ Nota
                              Pembatalan - Nomor
                            </th>
                            <th className="p-2 border-b min-w-[150px]">
                              Faktur Pajak/Dokumen Tertentu/Nota Retur/ Nota
                              Pembatalan - Tanggal
                            </th>
                            <th className="p-2 border-b min-w-[150px]">
                              Harga Jual/Pengganti/DPP(Rupiah)
                            </th>
                            <th className="p-2 border-b min-w-[150px]">
                              DPP Nilai Lain/ DPP (Rupiah)
                            </th>
                            <th className="p-2 border-b min-w-[150px]">
                              PPN (Rupiah)
                            </th>
                            <th className="p-2 border-b min-w-[150px]">
                              PPnBM (Rupiah)
                            </th>
                            <th className="p-2 border-b min-w-[150px]">
                              Kode dan Nomor Seri Faktur Pajak yang
                              Diganti/Diretur
                            </th>
                          </tr>
                        </thead>
                        <tbody className="text-gray-600 text-center">
                          {sptOther.data.length > 0 ? (
                            sptOther.data.map((item, index) => (
                              <tr key={index}>
                                <td className="p-2 border-b text-center">
                                  {index + 1}
                                </td>
                                <td className="p-2 border-b">
                                  {item.nama_pembeli || "-"}
                                </td>
                                <td className="p-2 border-b">
                                  {item.npwp || "-"}
                                </td>
                                <td className="p-2 border-b">
                                  {item.faktur_pajak_nomor || "-"}
                                </td>
                                <td className="p-2 border-b">
                                  {item.faktur_pajak_tanggal || "-"}
                                </td>
                                <td className="p-2 border-b">
                                  {item.dpp || "0"}
                                </td>
                                <td className="p-2 border-b">
                                  {item.dpp_lain || "0"}
                                </td>
                                <td className="p-2 border-b">
                                  {item.ppn || "0"}
                                </td>
                                <td className="p-2 border-b">
                                  {item.ppnbm || "0"}
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td
                                className="p-2 border-b text-center"
                                colSpan={6}
                              >
                                No data available
                              </td>
                            </tr>
                          )}
                        </tbody>
                        <tfoot className="text-gray-800 font-semibold bg-gray-100">
                          <tr>
                            <td
                              className="p-2 text-center min-w-[150px]"
                              colSpan={4}
                            >
                              Jumlah
                            </td>
                            <td className="p-2 text-center">0</td>
                            <td className="p-2"></td>
                            <td className="p-2"></td>
                            <td className="p-2"></td>
                            <td className="p-2"></td>
                            <td className="p-2"></td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="b-3">
                  <div className="mt-4">
                    <div className="text-lg font-semibold mb-4">
                      <h1>
                        DAFTAR PAJAK MASUKAN YANG TIDAK DIKREDITKAN ATAU
                        MENDAPAT FASILITAS
                      </h1>
                    </div>
                    <div
                      className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
                      onClick={() => setShowHeaderb3(!showHeaderb3)}
                    >
                      <h3 className="text-lg font-semibold">Header</h3>
                      {showHeaderb3 ? <FaChevronUp /> : <FaChevronDown />}
                    </div>
                    {showHeaderb3 && (
                      <div className="border rounded-md p-4 mb-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Kiri */}
                          <div>
                            <label className="block font-medium text-gray-700">
                              NAMA PKP *
                            </label>
                            <input
                              type="text"
                              readOnly
                              value="KANTOR AKUNTAN PUBLIK MOH WILDAN DAN ADI DARMAWAN"
                              className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                            />
                          </div>

                          <div>
                            <label className="block font-medium text-gray-700">
                              MASA *
                            </label>
                            <input
                              type="text"
                              readOnly
                              value="032025"
                              className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                            />
                          </div>
                          <div>
                            <label className="block font-medium text-gray-700">
                              NPWP*
                            </label>
                            <input
                              type="text"
                              readOnly
                              value="0934274002429000"
                              className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                            />
                          </div>
                          <div>
                            <label className="block font-medium text-gray-700">
                              Normal/Pembetulan
                            </label>
                            <select
                              disabled
                              className="w-full p-2 border rounded-md bg-gray-100 text-gray-600 cursor-not-allowed"
                            >
                              <option>Normal</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className=" w-[1450px] overflow-x-auto bg-white shadow-md rounded-lg overflow-hidden ">
                      <table className="table-auto text-sm text-left border overflow-hidden">
                        <thead className="bg-purple-700 text-white text-center">
                          <tr>
                            <th className="p-2 border-b ">No</th>
                            <th className="p-2 border-b min-w-[200px]">
                              Nama Pembeli BKP/Penerima Manfaat BKP Tidak
                              Berwujud/Penerima JKP
                            </th>
                            <th className="p-2  border-b min-w-[150px]">
                              NPWP/NIK/Nomor Paspor
                            </th>
                            <th className="p-2 border-b min-w-[150px]">
                              Faktur Pajak/Dokumen Tertentu/Nota Retur/ Nota
                              Pembatalan - Nomor
                            </th>
                            <th className="p-2 border-b min-w-[150px]">
                              Faktur Pajak/Dokumen Tertentu/Nota Retur/ Nota
                              Pembatalan - Tanggal
                            </th>
                            <th className="p-2 border-b min-w-[150px]">
                              Harga Jual/Pengganti/DPP(Rupiah)
                            </th>
                            <th className="p-2 border-b min-w-[150px]">
                              DPP Nilai Lain/ DPP (Rupiah)
                            </th>
                            <th className="p-2 border-b min-w-[150px]">
                              PPN (Rupiah)
                            </th>
                            <th className="p-2 border-b min-w-[150px]">
                              PPnBM (Rupiah)
                            </th>
                            <th className="p-2 border-b min-w-[150px]">
                              Kode dan Nomor Seri Faktur Pajak yang
                              Diganti/Diretur
                            </th>
                          </tr>
                        </thead>
                        <tbody className="text-gray-600 text-center">
                          {sptOther.data.length > 0 ? (
                            sptOther.data.map((item, index) => (
                              <tr key={index}>
                                <td className="p-2 border-b text-center">
                                  {index + 1}
                                </td>
                                <td className="p-2 border-b">
                                  {item.nama_pembeli || "-"}
                                </td>
                                <td className="p-2 border-b">
                                  {item.npwp || "-"}
                                </td>
                                <td className="p-2 border-b">
                                  {item.faktur_pajak_nomor || "-"}
                                </td>
                                <td className="p-2 border-b">
                                  {item.faktur_pajak_tanggal || "-"}
                                </td>
                                <td className="p-2 border-b">
                                  {item.dpp || "0"}
                                </td>
                                <td className="p-2 border-b">
                                  {item.dpp_lain || "0"}
                                </td>
                                <td className="p-2 border-b">
                                  {item.ppn || "0"}
                                </td>
                                <td className="p-2 border-b">
                                  {item.ppnbm || "0"}
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td
                                className="p-2 border-b text-center"
                                colSpan={6}
                              >
                                No data available
                              </td>
                            </tr>
                          )}
                        </tbody>
                        <tfoot className="text-gray-800 font-semibold bg-gray-100">
                          <tr>
                            <td
                              className="p-2 text-center min-w-[150px]"
                              colSpan={4}
                            >
                              Jumlah
                            </td>
                            <td className="p-2 text-center">0</td>
                            <td className="p-2"></td>
                            <td className="p-2"></td>
                            <td className="p-2"></td>
                            <td className="p-2"></td>
                            <td className="p-2"></td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="c">
                  <div className="mt-4">
                    <div className="text-lg font-semibold mb-4">
                      <h1>DAFTAR PPN DAN PPNBM YANG DIPUNGUT PIHAK LAIN</h1>
                    </div>
                    <div
                      className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
                      onClick={() => setShowHeaderc(!showHeaderc)}
                    >
                      <h3 className="text-lg font-semibold">Header</h3>
                      {showHeaderc ? <FaChevronUp /> : <FaChevronDown />}
                    </div>
                    {showHeaderc && (
                      <div className="border rounded-md p-4 mb-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Kiri */}
                          <div>
                            <label className="block font-medium text-gray-700">
                              NAMA PKP *
                            </label>
                            <input
                              type="text"
                              readOnly
                              value="KANTOR AKUNTAN PUBLIK MOH WILDAN DAN ADI DARMAWAN"
                              className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                            />
                          </div>

                          <div>
                            <label className="block font-medium text-gray-700">
                              MASA *
                            </label>
                            <input
                              type="text"
                              readOnly
                              value="032025"
                              className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                            />
                          </div>
                          <div>
                            <label className="block font-medium text-gray-700">
                              NPWP*
                            </label>
                            <input
                              type="text"
                              readOnly
                              value="0934274002429000"
                              className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                            />
                          </div>
                          <div>
                            <label className="block font-medium text-gray-700">
                              Normal/Pembetulan
                            </label>
                            <select
                              disabled
                              className="w-full p-2 border rounded-md bg-gray-100 text-gray-600 cursor-not-allowed"
                            >
                              <option>Normal</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className=" w-[1450px] overflow-x-auto bg-white shadow-md rounded-lg overflow-hidden ">
                      <table className="table-auto text-sm text-left border overflow-hidden">
                        <thead className="bg-purple-700 text-white text-center">
                          <tr>
                            <th className="p-2 border-b ">No</th>
                            <th className="p-2 border-b ">Tindakan</th>
                            <th className="p-2 border-b min-w-[200px]">
                              NPWP/NIK/ID Lainnya Penjual Barang Kena
                              Pajak/Barang Kena Pajak Tidak Berwujud/Penyedia
                              Jasa Kena Pajak
                            </th>
                            <th className="p-2  border-b min-w-[150px]">
                              Nama Penjual Barang Kena Pajak/Baran Kena Pajak
                              Tidak Berwujud/Jasa Kena Pajak
                            </th>
                            <th className="p-2 border-b min-w-[150px]">
                              Nomor Identitas Pembeli BKP/Penerima Manfaat BKP
                              Tidak Berwujud/Penerima JKP
                            </th>
                            <th className="p-2 border-b min-w-[150px]">
                              Nama Pembeli BKP/penerima Manfaat BKP TIdak
                              Berwujud/Penerima JKP
                            </th>
                            <th className="p-2 border-b min-w-[150px]">
                              Tipe Transaksi PPN yang Dipungut
                            </th>
                            <th className="p-2 border-b min-w-[150px]">
                              Nomor Faktur Pajak/Dokumen Tertentu
                            </th>
                            <th className="p-2 border-b min-w-[150px]">
                              Tanggal Faktur Pajak/Dokumen Tertentu
                            </th>
                            <th className="p-2 border-b min-w-[150px]">
                              Kode dan Nomor Seri Faktur Pajak yang Diganti
                            </th>
                            <th className="p-2 border-b min-w-[150px]">
                              Harga Jual/DPP (Rupiah)
                            </th>
                            <th className="p-2 border-b min-w-[150px]">
                              DPP Nilai Lain/DPP (Rupiah)
                            </th>
                            <th className="p-2 border-b min-w-[150px]">
                              PPN (Rupiah)
                            </th>
                            <th className="p-2 border-b min-w-[150px]">
                              PPnBM (Rupiah)
                            </th>
                            <th className="p-2 border-b min-w-[150px]">
                              Informasi
                            </th>
                          </tr>
                        </thead>
                        <tbody className="text-gray-600 text-center">
                          {sptOther.data.length > 0 ? (
                            sptOther.data.map((item, index) => (
                              <tr key={index}>
                                <td className="p-2 border-b text-center">
                                  {index + 1}
                                </td>
                                <td className="p-2 border-b">
                                  {item.nama_pembeli || "-"}
                                </td>
                                <td className="p-2 border-b">
                                  {item.npwp || "-"}
                                </td>
                                <td className="p-2 border-b">
                                  {item.faktur_pajak_nomor || "-"}
                                </td>
                                <td className="p-2 border-b">
                                  {item.faktur_pajak_tanggal || "-"}
                                </td>
                                <td className="p-2 border-b">
                                  {item.dpp || "0"}
                                </td>
                                <td className="p-2 border-b">
                                  {item.dpp_lain || "0"}
                                </td>
                                <td className="p-2 border-b">
                                  {item.ppn || "0"}
                                </td>
                                <td className="p-2 border-b">
                                  {item.ppnbm || "0"}
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td
                                className="p-2 border-b text-center"
                                colSpan={6}
                              >
                                No data available
                              </td>
                            </tr>
                          )}
                        </tbody>
                        <tfoot className="text-gray-800 font-semibold bg-gray-100">
                          <tr>
                            <td
                              className="p-2 text-center min-w-[150px]"
                              colSpan={4}
                            >
                              Jumlah
                            </td>
                            <td className="p-2 text-center">0</td>
                            <td className="p-2"></td>
                            <td className="p-2"></td>
                            <td className="p-2"></td>
                            <td className="p-2"></td>
                            <td className="p-2"></td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                </TabsContent>
              </>
            )}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default CreateKonsepSPT;
