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
import { getCsrf } from "@/service/getCsrf";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useParams, useSearchParams } from "react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
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

import Swal from "sweetalert2";
import { RoutesApi } from "@/Routes";
import { useNavigateWithParams } from "@/hooks/useNavigateWithParams";
import { ClipLoader } from "react-spinners";
import { X } from "lucide-react";
import TandaTangan from "../TandaTangan";
const CreateKonsepPasal = ({ data, sidebar }) => {
  const navigate = useNavigateWithParams();
  console.log(data);
  const [cookies] = useCookies(["token"]);
  const { id, akun, idSpt } = useParams();
  // const [form, setForm] = useState({
  //   cl_bp1_2: "",
  //   cl_bp1_3: "",
  //   cl_bp1_5: "",
  //   cl_bp1_4: "0.00", // calculated
  //   cl_bp1_6: "0.00", // calculated
  //   cl_bp2_2: "",
  //   cl_bp2_3: "",
  //   cl_bp2_5: "",
  //   cl_bp2_4: "0.00", // calculated
  //   cl_bp2_6: "0.00",
  // });
  const formatRupiah = (number) => {
    if (typeof number !== "number" && typeof number !== "string") return "";

    // Normalize "0.00" to "0"
    const normalizedNumber = number === "0.00" ? "0" : number;

    const numericValue =
      typeof normalizedNumber === "string"
        ? Number(normalizedNumber.replace(/[^0-9.-]/g, "")) // Allow negative sign and decimal point
        : normalizedNumber;

    if (isNaN(numericValue)) return "";

    // Use US locale for consistent comma thousands separator
    return new Intl.NumberFormat("en-US", {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(numericValue);
  };

  const [form, setForm] = useState({
    cl_bp1_2: formatRupiah(data.detail_spt.cl_bp1_2) || 0,
    cl_bp1_3: formatRupiah(data.detail_spt.cl_bp1_3) || 0,
    cl_bp1_5: formatRupiah(data.detail_spt.cl_bp1_5) || 0,
    cl_bp1_4: formatRupiah(data.detail_spt.cl_bp1_4) || 0, // calculated
    cl_bp1_6: formatRupiah(data.detail_spt.cl_bp1_6) || 0, // calculated
    cl_bp2_2: formatRupiah(data.detail_spt.cl_bp2_2) || 0,
    cl_bp2_3: formatRupiah(data.detail_spt.cl_bp2_3) || 0,
    cl_bp2_5: formatRupiah(data.detail_spt.cl_bp2_5) || 0,
    cl_bp2_4: formatRupiah(data.detail_spt.cl_bp2_4) || 0, // calculated
    cl_bp2_6: formatRupiah(data.detail_spt.cl_bp2_6) || 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update nilai input dulu
    const updatedForm = {
      ...form,
      [name]: value,
    };

    // --- PASAL 21 ---
    const cl_bp1_1 =
      parseFloat(String(data.detail_spt.cl_bp1_1).replace(/[^0-9.-]/g, "")) ||
      0;
    const cl_bp1_2 =
      parseFloat(
        String(name === "cl_bp1_2" ? value : form.cl_bp1_2).replace(
          /[^0-9.-]/g,
          ""
        )
      ) || 0;
    const cl_bp1_3 =
      parseFloat(
        String(name === "cl_bp1_3" ? value : form.cl_bp1_3).replace(
          /[^0-9.-]/g,
          ""
        )
      ) || 0;
    const cl_bp1_5 =
      parseFloat(
        String(name === "cl_bp1_5" ? value : form.cl_bp1_5).replace(
          /[^0-9.-]/g,
          ""
        )
      ) || 0;

    const cl_bp1_4 = (cl_bp1_1 - cl_bp1_2 - cl_bp1_3).toFixed(2);
    const cl_bp1_6 = (cl_bp1_4 - cl_bp1_5).toFixed(2);

    updatedForm.cl_bp1_4 = formatRupiah(cl_bp1_4);
    updatedForm.cl_bp1_6 = formatRupiah(cl_bp1_6);

    // --- PASAL 26 ---
    const cl_bp2_1 =
      parseFloat(String(data.detail_spt.cl_bp2_1).replace(/[^0-9.-]/g, "")) ||
      0;
    const cl_bp2_2 =
      parseFloat(
        String(name === "cl_bp2_2" ? value : form.cl_bp2_2).replace(
          /[^0-9.-]/g,
          ""
        )
      ) || 0;
    const cl_bp2_3 =
      parseFloat(
        String(name === "cl_bp2_3" ? value : form.cl_bp2_3).replace(
          /[^0-9.-]/g,
          ""
        )
      ) || 0;
    const cl_bp2_5 =
      parseFloat(
        String(name === "cl_bp2_5" ? value : form.cl_bp2_5).replace(
          /[^0-9.-]/g,
          ""
        )
      ) || 0;

    const cl_bp2_4 = (cl_bp2_1 - cl_bp2_2 - cl_bp2_3).toFixed(2);
    const cl_bp2_6 = (cl_bp2_4 - cl_bp2_5).toFixed(2);

    updatedForm.cl_bp2_4 = formatRupiah(cl_bp2_4);
    updatedForm.cl_bp2_6 = formatRupiah(cl_bp2_6);

    // Set the updated form state
    setForm(updatedForm);
  };

  const calculateClBp1_4 = () => {
    // Strip formatting and parse to numbers
    const a =
      parseFloat(String(data.detail_spt.cl_bp1_1).replace(/[^0-9.-]/g, "")) ||
      0;
    const b = parseFloat(String(form.cl_bp1_2).replace(/[^0-9.-]/g, "")) || 0;
    const c = parseFloat(String(form.cl_bp1_3).replace(/[^0-9.-]/g, "")) || 0;

    // Calculate the result
    const result = (a - b - c).toFixed(2);

    // Apply formatRupiah to the result
    return formatRupiah(result);
  };

  const calculateClBp1_6 = () => {
    // Strip formatting and parse to numbers
    const d =
      parseFloat(String(calculateClBp1_4()).replace(/[^0-9.-]/g, "")) || 0;
    const e = parseFloat(String(form.cl_bp1_5).replace(/[^0-9.-]/g, "")) || 0;

    // Calculate the result
    const result = (d - e).toFixed(2);

    // Apply formatRupiah to the result
    return formatRupiah(result);
  };

  const [activeTab, setActiveTab] = useState("induk");
  const [showHeaderInduk, setShowHeaderInduk] = useState(true);
  const [showIdentitasPemotong, setShowIdentitasPemotong] = useState(false);
  const [showPajakPenghasilan21, setShowPajakPenghasilan21] = useState(false);
  const [showPajakPenghasilan26, setShowPajakPenghasilan26] = useState(false);
  const [showPernyataan, setShowPernyataan] = useState(false);

  const [showHeadera1, setShowHeadera1] = useState(true);
  const [showHeadera2, setShowHeadera2] = useState(false);
  const [showHeaderb1, setShowHeaderb1] = useState(false);
  const [showHeaderb2, setShowHeaderb2] = useState(false);
  const [showHeaderb3, setShowHeaderb3] = useState(false);
  const [showHeaderc, setShowHeaderc] = useState(false);

  const [showScrollTop, setShowScrollTop] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const viewAsCompanyId = searchParams.get("viewAs");
  const userId = searchParams.get("user_id");

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
          params: {
            intent: "api.update.spt.pph.konsep",
          },
        }
      );
    },
    onSuccess: (data, variables) => {
      // console.log(data);
      // const successMessage = variables.isDraft
      //   ? "Draft Faktur berhasil dibuat"
      //   : "Faktur berhasil diupload";

      // Swal.fire("Berhasil!", "Konsep SPT berhasil dibuat.", "success").then(
      //   (result) => {
      //     if (result.isConfirmed) {
      //       // window.location.href = `/praktikum/${id}/sistem/${akun}/buat-konsep-spt/${idSpt}`;
      //     }
      //   }
      // );
      Swal.fire({
        title: "Berhasil!",
        text: "Konsep SPT berhasil dibuat.",
        icon: "success",
        timer: 2000, // auto close after 2 seconds
        showConfirmButton: false,
        timerProgressBar: true,
      }).then(() => {
        // navigate(`/praktikum/${id}/sistem/${akun}/buat-konsep-spt/${idSpt}`);
        window.location.reload()
      });
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
            intent: "api.update.spt.pph.bayar.deposit",
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

      // Swal.fire("Berhasil!", "SPT berhasil dibayar.", "success").then(
      //   (result) => {
      //     if (result.isConfirmed) {
      //       navigate(
      //         `/praktikum/${id}/sistem/${akun}/surat-pemberitahuan-spt/konsep`
      //       );
      //     }
      //   }
      // );
      Swal.fire({
        title: "Berhasil!",
        text: "SPT berhasil dibayar.",
        icon: "success",
        timer: 2000, // auto close after 2 seconds
        showConfirmButton: false,
        timerProgressBar: true,
      }).then(() => {
        navigate(
          `/praktikum/${id}/sistem/${akun}/surat-pemberitahuan-spt/konsep`
        );
      });
    },
    onError: (error) => {
      console.error("Error saving data:", error);
      // Swal.fire("Gagal!", "Terjadi kesalahan saat menyimpan data.", "error");
      Swal.fire(
        "Gagal!",
        `Terjadi kesalahan saat menyimpan data. ${error?.response?.data?.message}`,
        "error"
      );
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
            intent: "api.update.spt.pph.bayar.kode.billing",
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

      // Swal.fire(
      //   "Berhasil!",
      //   "Kode Billing SPT berhasil dibuat.",
      //   "success"
      // ).then((result) => {
      //   if (result.isConfirmed) {
      //     // window.location.href = `/praktikum/${id}/sistem/${akun}/buat-konsep-spt/${idSpt}`;
      //     navigate(
      //       `/praktikum/${id}/sistem/${akun}/surat-pemberitahuan-spt/konsep`
      //     );
      //   }
      // });
      Swal.fire({
        title: "Berhasil!",
        text: "Kode Billing SPT berhasil dibuat.",
        icon: "success",
        timer: 2000, // auto close after 2 seconds
        showConfirmButton: false,
        timerProgressBar: true,
      }).then(() => {
        navigate(
          `/praktikum/${id}/sistem/${akun}/surat-pemberitahuan-spt/konsep`
        );
      });
    },
    onError: (error) => {
      console.error("Error saving data:", error);
      Swal.fire("Gagal!", "Terjadi kesalahan saat menyimpan data.", "error");
    },
  });
  // const activeTabContent = activeTab !== "induk" ? activeTab : null;

  const activeTabContent =
    activeTab !== "l-ib" && activeTab !== "l-ii" ? activeTab : null;

  const handleTabChange = (value) => {
    // Prevent any default behavior if this is called from an event
    if (value?.preventDefault) {
      value.preventDefault();
      return;
    }

    setActiveTab(value);
    // const formattedValue = value.replace(
    //   /([a-z])-(\d+)/i,
    //   (match, letter, number) => {
    //     return letter.toUpperCase() + number;
    //   }
    // );

    // setActiveTabContent(formattedValue);
    // alert(value);
  };
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
          `student/assignments/${id}/sistem/${accountId}/spt/${idSpt}/show-bupot-pph`,
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
          params: {
            jenis_spt_pph: activeTabContent,
          },
        }
      );
      console.log("other data : ", data.data);
      return data.data;
    },
    enabled: activeTabContent !== null && activeTabContent !== undefined,
    // Add these options to prevent unnecessary refetches
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
  });

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-auto p-3 bg-white rounded-md h-full min-w-0">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl text-blue-900 mt-4">
            PEMOTONGAN PPH PASAL 21 DAN ATAU PASAL 26
          </h2>
        </div>
        <div className="w-full p-2 ml-0 border-t text-lg">
          <Tabs defaultValue="induk" onValueChange={(val) => setActiveTab(val)}>
            <TabsList className="flex justify-start gap-2 text-blue-700 text-lg">
              <TabsTrigger value="induk">Induk</TabsTrigger>
              <TabsTrigger value="L1">L-I</TabsTrigger>
              <TabsTrigger value="l-ib">L-IB</TabsTrigger>
              <TabsTrigger value="l-ii">L-II</TabsTrigger>
              <TabsTrigger value="L3">L-III</TabsTrigger>
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
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Periode Pajak Bulan
                        </label>
                        <input
                          type="text"
                          readOnly
                          value={data.masa_bulan}
                          className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Periode Pajak Tahun
                        </label>
                        <input
                          type="text"
                          readOnly
                          value={data.masa_tahun}
                          className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Status
                        </label>
                        <select
                          disabled
                          className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                        >
                          <option value="normal">{data.status}</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}
                <div
                  className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
                  onClick={() =>
                    setShowIdentitasPemotong(!showIdentitasPemotong)
                  }
                >
                  <h3 className="text-lg font-semibold">
                    1. Identitas Pemotong
                  </h3>
                  {showIdentitasPemotong ? <FaChevronUp /> : <FaChevronDown />}
                </div>
                {showIdentitasPemotong && (
                  <div className="border rounded-md p-4 mb-4">
                    <div className="">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        NPWP
                      </label>
                      <input
                        type="text"
                        readOnly
                        value={data.npwp}
                        className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                      />
                    </div>
                    <div className="mt-4">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Nama
                      </label>
                      <input
                        type="text"
                        readOnly
                        value={data.nama_pengusaha}
                        className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                      />
                    </div>
                    <div className="mt-4">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Alamat
                      </label>
                      <input
                        type="text"
                        readOnly
                        value={data.alamat}
                        className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                      />
                    </div>
                    <div className="mt-4">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Nomor Telepon
                      </label>
                      <input
                        type="text"
                        readOnly
                        value={data.nomor_telpon}
                        className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                      />
                    </div>
                  </div>
                )}
                <div
                  className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
                  onClick={() =>
                    setShowPajakPenghasilan21(!showPajakPenghasilan21)
                  }
                >
                  <h3 className="text-lg font-semibold">
                    2. Pajak Penghasilan Pasal 21
                  </h3>
                  {showPajakPenghasilan21 ? <FaChevronUp /> : <FaChevronDown />}
                </div>
                {showPajakPenghasilan21 && (
                  <div className="border rounded-md p-4 overflow-x-auto">
                    <div className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full">
                      <h3 className="text-lg font-semibold">
                        I. Pajak Penghasilan Pasal 21 yang dipotong
                      </h3>
                    </div>
                    <table className="min-w-full text-sm text-left border overflow-x-auto">
                      <thead className="bg-purple-700 text-white text-center">
                        <tr>
                          <th className="p-2 min-w-[10px]">No</th>
                          <th className="p-2 min-w-[200px]">Uraian</th>
                          <th className="p-2 min-w-[100px]">KAP-KJS</th>
                          <th className="p-2 min-w-[100px]">Jumlah(RP)</th>
                        </tr>
                      </thead>

                      <tbody>
                        {/* Row 1 - cl_bp1_1 (from API) */}
                        <tr className="border-b">
                          <td className="p-2 text-center text-sm">1</td>
                          <td className="p-2 text-center text-sm">
                            Pajak Penghasilan Pasal 21 Yang dilakukan Pemotongan
                          </td>
                          <td className="p-2 text-center text-sm">
                            411121-100
                          </td>
                          <td className="p-2">
                            <input
                              type="text"
                              className="w-full p-1 border rounded-md text-right text-sm bg-yellow-100"
                              name="cl_bp1_1"
                              defaultValue={formatRupiah(
                                data.detail_spt.cl_bp1_1
                              )}
                              disabled
                            />
                          </td>
                        </tr>

                        {/* Row 2 - cl_bp1_2 (input) */}
                        <tr className="border-b">
                          <td className="p-2 text-center text-sm">2</td>
                          <td className="p-2 text-center text-sm">
                            Penyerahan Kelebihan Pembayaran Pajak Penghasilan{" "}
                            <br /> Pasal 21 dari Periode Sebelumnya
                          </td>
                          <td className="p-2 text-center text-sm">
                            411121-100
                          </td>
                          <td className="p-2">
                            <input
                              type="text"
                              className="w-full p-1 border rounded-md text-right text-sm"
                              name="cl_bp1_2"
                              value={formatRupiah(form.cl_bp1_2)}
                              onChange={handleChange}
                            />
                          </td>
                        </tr>

                        {/* Row 3 - cl_bp1_3 (input) */}
                        <tr className="border-b">
                          <td className="p-2 text-center text-sm">3</td>
                          <td className="p-2 text-center text-sm">
                            Pembayaran Pajak Penghasilan <br /> Dengan SP2D
                            (Hanya Untuk Instansi Pemerintah)
                          </td>
                          <td className="p-2 text-center text-sm">
                            411121-100
                          </td>
                          <td className="p-2">
                            <input
                              type="text"
                              className="w-full p-1 border rounded-md text-right text-sm"
                              name="cl_bp1_3"
                              value={formatRupiah(form.cl_bp1_3)}
                              onChange={handleChange}
                            />
                          </td>
                        </tr>

                        {/* Row 4 - cl_bp1_4 (calculation: cl_bp1_1 - cl_bp1_2 - cl_bp1_3) */}
                        <tr className="border-b">
                          <td className="p-2 text-center text-sm">4</td>
                          <td className="p-2 text-center text-sm">
                            Pajak Penghasilan Pasal 21 Yang Kurang (Lebih Bayar){" "}
                            <br />
                            (1 - 2 - 3) (Setiap Kelebihan Pembayaran akan
                            Diteruskan)
                          </td>
                          <td className="p-2 text-center text-sm">
                            411121-100
                          </td>
                          <td className="p-2">
                            <input
                              type="text"
                              className="w-full p-1 border rounded-md text-right text-sm bg-cyan-100"
                              name="cl_bp1_4"
                              value={formatRupiah(form.cl_bp1_4)}
                              disabled
                            />
                          </td>
                        </tr>

                        {/* Row 5 - cl_bp1_5 (input) */}
                        <tr className="border-b">
                          <td className="p-2 text-center text-sm">5</td>
                          <td className="p-2 text-center text-sm">
                            Pajak Penghasilan Pasal 21 <br /> Yang Dibayar Pada
                            SPT yang Diperbaiki
                          </td>
                          <td className="p-2 text-center text-sm">
                            411121-100
                          </td>
                          <td className="p-2">
                            <input
                              type="text"
                              className="w-full p-1 border rounded-md text-right text-sm bg-yellow-100"
                              name="cl_bp1_5"
                              defaultValue={formatRupiah(
                                data.detail_spt.cl_bp1_5
                              )}
                              onChange={handleChange}
                              readOnly
                            />
                          </td>
                        </tr>

                        {/* Row 6 - cl_bp1_6 (calculation: cl_bp1_4 - cl_bp1_5) */}
                        <tr className="border-b">
                          <td className="p-2 text-center text-sm">6</td>
                          <td className="p-2 text-center text-sm">
                            Pajak Penghasilan Pasal 21 Yang Kurang (Lebih Bayar){" "}
                            <br /> Akibat Perbaikan (4 - 5) (Setiap Kelebihan
                            Pembayaran akan diteruskan)
                          </td>
                          <td className="p-2 text-center text-sm">
                            411121-100
                          </td>
                          <td className="p-2">
                            <input
                              type="text"
                              className="w-full p-1 border rounded-md text-right text-sm bg-cyan-100"
                              name="cl_bp1_6"
                              value={form.cl_bp1_6}
                              disabled
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full mt-4">
                      <h3 className="text-lg font-semibold">
                        II. Pajak Penghasilan Pasal 21 yang Ditanggung
                        Pemerintah
                      </h3>
                    </div>
                    <table className="min-w-full text-sm text-left border overflow-x-auto">
                      <thead className="bg-purple-700 text-white text-center">
                        <tr>
                          <th className="p-2 min-w-[10px]">No</th>
                          <th className="p-2 min-w-[200px]">Uraian</th>
                          <th className="p-2 min-w-[100px]">KAP-KJS</th>
                          <th className="p-2 min-w-[100px]">Jumlah(RP)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="p-2 whitespace-normal break-words text-sm text-center">
                            1
                          </td>
                          <td className="p-2 whitespace-normal break-words text-sm text-center">
                            Pajak Penghasilan Pasal 21 ditanggung Pemerintah
                          </td>
                          <td className="p-2 whitespace-normal break-words text-sm text-center">
                            0
                          </td>
                          <td className="p-2">
                            <input
                              type="text"
                              className="w-full p-1 border rounded-md text-right text-sm bg-gray-100"
                              defaultValue={formatRupiah(
                                data.detail_spt.cl_bp1_7
                              )}
                              disabled
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
                <div
                  className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
                  onClick={() =>
                    setShowPajakPenghasilan26(!showPajakPenghasilan26)
                  }
                >
                  <h3 className="text-lg font-semibold">
                    3. Pajak Penghasilan Pasal 26
                  </h3>
                  {showPajakPenghasilan26 ? <FaChevronUp /> : <FaChevronDown />}
                </div>
                {showPajakPenghasilan26 && (
                  <div className="border rounded-md p-4 overflow-x-auto">
                    <div className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full">
                      <h3 className="text-lg font-semibold">
                        I. Pajak Penghasilan Pasal 26 yang dipotong
                      </h3>
                    </div>
                    <table className="min-w-full text-sm text-left border overflow-x-auto">
                      <thead className="bg-purple-700 text-white text-center">
                        <tr>
                          <th className="p-2 min-w-[10px]">No</th>
                          <th className="p-2 min-w-[200px]">Uraian</th>
                          <th className="p-2 min-w-[100px]">KAP-KJS</th>
                          <th className="p-2 min-w-[100px]">Jumlah(RP)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Row 1 - cl_bp2_1 */}
                        <tr className="border-b">
                          <td className="p-2 text-center text-sm">1</td>
                          <td className="p-2 text-center text-sm">
                            Pajak Penghasilan Pasal 26 Yang dipotong
                          </td>
                          <td className="p-2 text-center text-sm">
                            411127-100
                          </td>
                          <td className="p-2">
                            <input
                              name="cl_bp2_1"
                              type="text"
                              className="w-full p-1 border rounded-md text-right text-sm bg-yellow-100"
                              defaultValue={formatRupiah(
                                data.detail_spt.cl_bp2_1
                              )}
                              disabled
                            />
                          </td>
                        </tr>

                        {/* Row 2 - cl_bp2_2 */}
                        <tr className="border-b">
                          <td className="p-2 text-center text-sm">2</td>
                          <td className="p-2 text-center text-sm">
                            Membawa ke Depan Kelebihan Bayar Pajak Penghasilan
                            Pasal 26 dari Periode Pajak Sebelumnya
                          </td>
                          <td className="p-2 text-center text-sm">
                            411127-100
                          </td>
                          <td className="p-2">
                            <input
                              name="cl_bp2_2"
                              type="text"
                              className="w-full p-1 border rounded-md text-right text-sm"
                              value={formatRupiah(form.cl_bp2_2)}
                              onChange={handleChange}
                            />
                          </td>
                        </tr>

                        {/* Row 3 - cl_bp2_3 */}
                        <tr className="border-b">
                          <td className="p-2 text-center text-sm">3</td>
                          <td className="p-2 text-center text-sm">
                            Pembayaran Pajak Penghasilan Pasal 26 dengan SP2D
                            (Hanya Untuk Instansi Pemerintah)
                          </td>
                          <td className="p-2 text-center text-sm">
                            411127-100
                          </td>
                          <td className="p-2">
                            <input
                              name="cl_bp2_3"
                              type="text"
                              className="w-full p-1 border rounded-md text-right text-sm"
                              value={formatRupiah(form.cl_bp2_3)}
                              onChange={handleChange}
                            />
                          </td>
                        </tr>

                        {/* Row 4 - cl_bp2_4 = cl_bp2_1 - cl_bp2_2 - cl_bp2_3 */}
                        <tr className="border-b">
                          <td className="p-2 text-center text-sm">4</td>
                          <td className="p-2 text-center text-sm">
                            Pajak Penghasilan Pasal 26 Yang Kurang Bayar
                            (Kelebihan Bayar) <br />
                            (1-2-3) (Setiap Kelebihan Bayar Akan Dibawa Ke
                            Depan)
                          </td>
                          <td className="p-2 text-center text-sm">
                            411127-100
                          </td>
                          <td className="p-2">
                            <input
                              name="cl_bp2_4"
                              type="text"
                              className="w-full p-1 border rounded-md text-right text-sm bg-cyan-100"
                              value={formatRupiah(form.cl_bp2_4)}
                              disabled
                            />
                          </td>
                        </tr>

                        {/* Row 5 - cl_bp2_5 */}
                        <tr className="border-b">
                          <td className="p-2 text-center text-sm">5</td>
                          <td className="p-2 text-center text-sm">
                            Pajak Penghasilan Pasal 26 Yang Dibayar Pada
                            Pengembalian Pajak Yang Diubah
                          </td>
                          <td className="p-2 text-center text-sm">
                            411127-100
                          </td>
                          <td className="p-2">
                            <input
                              name="cl_bp2_5"
                              type="text"
                              className="w-full p-1 border rounded-md text-right text-sm"
                              value={formatRupiah(data.detail_spt.cl_bp2_5)}
                              disabled
                            />
                          </td>
                        </tr>

                        {/* Row 6 - cl_bp2_6 = cl_bp2_4 - cl_bp2_5 */}
                        <tr className="border-b">
                          <td className="p-2 text-center text-sm">6</td>
                          <td className="p-2 text-center text-sm">
                            Pajak Penghasilan Pasal 26 Yang Kurang Bayar
                            (Kelebihan Bayar) Akibat Perubahan (4 - 5) <br />
                            (Setiap Kelebihan Bayar Akan Dibawa Ke Depan)
                          </td>
                          <td className="p-2 text-center text-sm">
                            411127-100
                          </td>
                          <td className="p-2">
                            <input
                              name="cl_bp2_6"
                              type="text"
                              className="w-full p-1 border rounded-md text-right text-sm bg-cyan-100"
                              value={formatRupiah(form.cl_bp2_6)}
                              disabled
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full mt-4">
                      <h3 className="text-lg font-semibold">
                        II. Pajak Penghasilan Pasal 26 yang Ditanggung
                        Pemerintah
                      </h3>
                    </div>
                    <table className="min-w-full text-sm text-left border overflow-x-auto">
                      <thead className="bg-purple-700 text-white text-center">
                        <tr>
                          <th className="p-2 min-w-[10px]">No</th>
                          <th className="p-2 min-w-[200px]">Uraian</th>
                          <th className="p-2 min-w-[100px]">KAP-KJS</th>
                          <th className="p-2 min-w-[100px]">Jumlah(RP)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="p-2 whitespace-normal break-words text-sm text-center">
                            1
                          </td>
                          <td className="p-2 whitespace-normal break-words text-sm text-center">
                            Pajak Penghasilan Pasal 26 ditanggung Pemerintah
                          </td>
                          <td className="p-2 whitespace-normal break-words text-sm text-center">
                            0
                          </td>
                          <td className="p-2">
                            <input
                              type="text"
                              className="w-full p-1 border rounded-md text-right text-sm bg-gray-100"
                              defaultValue={formatRupiah(
                                data.detail_spt.cl_bp2_7
                              )}
                              disabled
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
                <div
                  className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
                  onClick={() => setShowPernyataan(!showPernyataan)}
                >
                  <h3 className="text-lg font-semibold">4. Pernyataan</h3>
                  {showPernyataan ? <FaChevronUp /> : <FaChevronDown />}
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
                          />
                          <label
                            htmlFor="PKP"
                            className="text-gray-700 text-sm"
                          >
                            TaxPayer
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
                            Representative
                          </label>
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
                            value={data.nama_pic}
                            className="rounded w-full bg-gray-300 border-black text-sm p-2 flex-1"
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div className="flex justify-start mt-4 gap-2">
                  <AlertDialog>
                    <button
                      onClick={() => saveConcept.mutate()}
                      disabled={saveConcept.isPending}
                      className={`py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-sm flex items-center justify-center ${
                        saveConcept.isPending
                          ? "bg-blue-400 text-white cursor-not-allowed"
                          : userId
                          ? "hidden"
                          : "bg-blue-700 text-white hover:bg-blue-800"
                      }`}
                    >
                      {saveConcept.isPending ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Menyimpan...
                        </>
                      ) : (
                        "Simpan Konsep"
                      )}
                    </button>

                    <AlertDialogTrigger asChild>
                      <button
                        // onClick={() => saveConcept.mutate()}
                        disabled={
                          saveConcept.isPending ||
                          payDeposit.isPending ||
                          payBilling.isPending
                        }
                        className={`py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-sm flex items-center justify-center ${
                          saveConcept.isPending ||
                          payDeposit.isPending ||
                          payBilling.isPending
                            ? "bg-blue-400 text-white cursor-not-allowed"
                            : userId
                            ? "hidden"
                            : "bg-blue-700 text-white hover:bg-blue-800"
                        }`}
                      >
                        {saveConcept.isPending ||
                        payDeposit.isPending ||
                        payBilling.isPending ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            {saveConcept.isPending && "Menyimpan..."}
                            {payDeposit.isPending && "Membayar Deposit..."}
                            {payBilling.isPending && "Memproses Pembayaran..."}
                          </>
                        ) : (
                          "Bayar dan Lapor"
                        )}
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="max-w-xl">
                      <AlertDialogCancel className="absolute top-4 right-4 p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md shadow-none border-none ring-0 focus:outline-none focus:ring-0">
                        <X className="w-5 h-5" />
                      </AlertDialogCancel>

                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-lg font-semibold ">
                          Pilih Cara Pembayaran
                        </AlertDialogTitle>
                        <AlertDialogDescription className=" text-gray-600">
                          Silakan pilih metode pembayaran yang akan digunakan
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <div className="flex gap-3 py-4 justify-end">
                        {/* <AlertDialogAction
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
                        </AlertDialogAction> */}

                        <TandaTangan
                          onConfirm={() => payDeposit.mutate()}
                          isLoading={payDeposit.isPending}
                          disabled={0}
                          confirmText="Pemindahan Deposit"
                          description="Apakah Anda yakin ingin buat kode billing ?"
                          npwp={sidebar.npwp_akun}
                        >
                          Pemindahan Deposit
                        </TandaTangan>
                        <TandaTangan
                          onConfirm={() => payBilling.mutate()}
                          isLoading={payBilling.isPending}
                          disabled={0}
                          confirmText="Buat Kode Billing"
                          description="Apakah Anda yakin ingin buat kode billing ?"
                          npwp={sidebar.npwp_akun}
                        >
                          Buat Kode Billing
                        </TandaTangan>
                      </div>
                      <AlertDialogFooter>
                        {/* <AlertDialogCancel className="w-full">
                          Batal
                        </AlertDialogCancel> */}
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  {/* <button
                    type="submit"
                    className="bg-blue-700 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-sm"
                  >
                    Simpan Konsep
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-700 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-sm"
                  >
                    Bayar dan Lapor
                  </button> */}
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
                <TabsContent value="L1">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-black mt-4">
                      DAFTAR PEMOTONGAN BULANAN PAJAK PENGHASILAN PASAL 21 BAGI
                      PEGAWAI TETAP DAN PENSIUNAN YANG MENERIMA UANG TERKAIT
                      PENSIUN SECARA BERKALA SERTA BAGI PEGAWAI NEGERI SIPIL,
                      ANGGOTA TENTARA NASIONAL INDONESIA, ANGGOTA KEPOLISIAN
                      REPUBLIK INDONESIA, PEJABAT NEGARA DAN PENSIUNANNYA
                    </h2>
                  </div>
                  <div className="mt-4">
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
                          <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                              NPWP
                            </label>
                            <input
                              type="text"
                              readOnly
                              value="2002909301990"
                              className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                            />
                          </div>
                          <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                              Masa Pajak
                            </label>
                            <input
                              type="text"
                              readOnly
                              value="2025"
                              className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="border rounded-md p-4 mb-4">
                      <div className=" overflow-x-auto bg-white shadow-md rounded-lg overflow-hidden">
                        <table className="table-auto text-sm text-left border overflow-hidden">
                          <thead className="bg-purple-700 text-white text-center">
                            <tr>
                              <th className="p-2 border-b ">No</th>
                              <th className="p-2 border-b ">NIK/NPWP</th>
                              <th className="p-2  border-]">Nama</th>
                              <th className="p-2 border-b w-auto">
                                Nomor Bukti Potong{" "}
                              </th>
                              <th className="p-2 border-b w-auto">
                                Tanggal Bukti Pemotongan{" "}
                              </th>
                              <th className="p-2 border-b w-auto">
                                Kode Objek Pajak
                              </th>
                              <th className="p-2 border-b w-auto">
                                Penghasilan Bruto (Rp)
                              </th>
                              <th className="p-2 border-b w-auto">
                                Pajak Penghasilan (Rp)
                              </th>
                            </tr>
                          </thead>
                          <tbody className="text-gray-600 text-center">
                            {sptOther?.data ? (
                              sptOther.data.map((item, index) => (
                                <tr key={item.id}>
                                  <td className="p-2 border-b text-center">
                                    {index + 1}
                                  </td>
                                  <td className="p-2 border-b">
                                    {item.npwp_akun || "-"}
                                  </td>
                                  <td className="p-2 border-b">
                                    {item.nama_akun || "-"}
                                  </td>
                                  <td className="p-2 border-b">
                                    {item.nomor_pemotongan || "-"}
                                  </td>
                                  <td className="p-2 border-b">
                                    {item.masa_awal
                                      ? new Date(
                                          item.masa_awal
                                        ).toLocaleDateString("id-ID")
                                      : "-"}
                                  </td>
                                  <td className="p-2 border-b">
                                    {item.kode_objek_pajak || "-"}
                                  </td>
                                  <td className="p-2 border-b">
                                    {item.dasar_pengenaan_pajak
                                      ? formatRupiah(item.dasar_pengenaan_pajak)
                                      : "-"}
                                  </td>
                                  <td className="p-2 border-b">
                                    {item.pajak_penghasilan
                                      ? formatRupiah(item.pajak_penghasilan)
                                      : "-"}
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td className="p-2 border-b text-center">-</td>
                                <td className="p-2 border-b">-</td>
                                <td className="p-2 border-b">-</td>
                                <td className="p-2 border-b">-</td>
                                <td className="p-2 border-b">-</td>
                                <td className="p-2 border-b">-</td>
                                <td className="p-2 border-b">-</td>
                                <td className="p-2 border-b">-</td>
                              </tr>
                            )}
                          </tbody>

                          <tfoot className="text-gray-800 font-semibold bg-gray-100">
                            <tr>
                              <td
                                className="p-2 text-right min-w-[150px]"
                                colSpan={6}
                              >
                                Jumlah Pendapatan Kotor dan Pajak Penghasilan
                                Yang Ditanggung Oleh Pemerintah
                              </td>
                              <td className="p-2 text-center">
                                {sptOther?.data
                                  ? formatRupiah(
                                      sptOther.data
                                        .filter(
                                          (item) =>
                                            item.jenis_pajak ===
                                              "PPh Pasal 21" ||
                                            item.jenis_pajak === "PPh Pasal 26"
                                        )
                                        .reduce(
                                          (total, item) =>
                                            total +
                                            (parseFloat(
                                              item.dasar_pengenaan_pajak
                                            ) || 0),
                                          0
                                        )
                                    )
                                  : "0"}
                              </td>
                              <td className="p-2 text-center">
                                {sptOther?.data
                                  ? formatRupiah(
                                      sptOther.data
                                        .filter(
                                          (item) =>
                                            item.jenis_pajak ===
                                              "PPh Pasal 21" ||
                                            item.jenis_pajak === "PPh Pasal 26"
                                        )
                                        .reduce(
                                          (total, item) =>
                                            total +
                                            (parseFloat(
                                              item.pajak_penghasilan
                                            ) || 0),
                                          0
                                        )
                                    )
                                  : "0"}
                              </td>
                            </tr>
                            <tr>
                              <td
                                className="p-2 text-right min-w-[150px]"
                                colSpan={6}
                              >
                                Jumlah Pendapatan Kotor dan Pajak Penghasilan
                                Yang Dipotong
                              </td>
                              <td className="p-2 text-center">
                                {sptOther?.data
                                  ? formatRupiah(
                                      sptOther.data.reduce(
                                        (total, item) =>
                                          total +
                                          (parseFloat(
                                            item.dasar_pengenaan_pajak
                                          ) || 0),
                                        0
                                      )
                                    )
                                  : "0"}
                              </td>
                              <td className="p-2 text-center">
                                {sptOther?.data
                                  ? formatRupiah(
                                      sptOther.data.reduce(
                                        (total, item) =>
                                          total +
                                          (parseFloat(item.pajak_penghasilan) ||
                                            0),
                                        0
                                      )
                                    )
                                  : "0"}
                              </td>
                            </tr>
                            <tr>
                              <td
                                className="p-2 text-right min-w-[150px]"
                                colSpan={6}
                              >
                                Jumlah Total Pendapatan Kotor Dan Pajak
                                Penghasilan Yang Ditanggung Oleh Pemerintah{" "}
                                <br /> serta Pajak penghasilan Yang Dipotong
                              </td>
                              <td className="p-2 text-center">
                                {sptOther?.data
                                  ? formatRupiah(
                                      sptOther.data.reduce(
                                        (total, item) =>
                                          total +
                                          (parseFloat(
                                            item.dasar_pengenaan_pajak
                                          ) || 0),
                                        0
                                      )
                                    )
                                  : "0"}
                              </td>
                              <td className="p-2 text-center">
                                {sptOther?.data
                                  ? formatRupiah(
                                      sptOther.data.reduce(
                                        (total, item) =>
                                          total +
                                          (parseFloat(item.pajak_penghasilan) ||
                                            0),
                                        0
                                      )
                                    )
                                  : "0"}
                              </td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="l-ib">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-black mt-4">
                      DAFTAR PEMOTONGAN PAJAK PENGHASILAN PASAL 21 BAGI PEGAWAI
                      TETAP DAN PENSIUNAN YANG MENERIMA UANG TERKAIT PENSIUN
                      SECARA BERKALA SERTA BAGI PEGAWAI NEGERI SIPIL, ANGGOTA
                      TENTARA NASIONAL INDONESIA, ANGGOTA KEPOLISIAN REPUBLIK
                      INDONESIA, PEJABAT NEGARA, DAN PENSIUNANNYA UNTUK MASA
                      PAJAK TERAKKHIR
                    </h2>
                  </div>
                  <div className="mt-4">
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
                          <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                              NPWP
                            </label>
                            <input
                              type="text"
                              readOnly
                              value="2002909301990"
                              className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                            />
                          </div>
                          <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                              Masa Pajak
                            </label>
                            <input
                              type="text"
                              readOnly
                              value="2025"
                              className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="border rounded-md p-4 mb-4 min-w-0 ">
                      <div className="border rounded-md p-4 mb-4 font-semibold">
                        BPA1
                      </div>
                      <div className="w-full overflow-x-auto bg-white shadow-md rounded-lg ">
                        <table className="table-auto text-sm text-left border overflow-hidden">
                          <thead className="bg-purple-700 text-white text-center">
                            <tr>
                              <th className="p-2 border-b ">No</th>
                              <th className="p-2 border-b min-w-[200px]">
                                NIK/NPWP
                              </th>
                              <th className="p-2  border-b min-w-[150px]">
                                Nama
                              </th>
                              <th className="p-2 border-b min-w-[150px]">
                                Nomor Bukti Potong{" "}
                              </th>
                              <th className="p-2 border-b min-w-[150px]">
                                Tanggal Bukti Pemotongan{" "}
                              </th>
                              <th className="p-2 border-b min-w-[150px]">
                                Kode Objek Pajak
                              </th>
                              <th className="p-2 border-b min-w-[150px]">
                                Penghasilan Bruto (Rp)
                              </th>
                              <th className="p-2 border-b min-w-[150px]">
                                Pajak Penghasilan (Rp)
                              </th>
                              <th className="p-2 border-b min-w-[150px]">
                                Fasilitas Perpajakan
                              </th>
                              <th className="p-2 border-b min-w-[150px]">
                                Negara
                              </th>
                              <th className="p-2 border-b min-w-[150px]">
                                ID Tempat Kegiatan Usaha
                              </th>
                              <th className="p-2 border-b min-w-[150px]">
                                KAP-KJS
                              </th>
                              <th className="p-2 border-b min-w-[150px]">
                                Status
                              </th>
                            </tr>
                          </thead>
                          <tbody className="text-gray-600 text-center">
                            <tr>
                              <td className="p-2 border-b text-center"></td>
                              <td className="p-2 border-b">
                                
                              </td>
                              <td className="p-2 border-b">-</td>
                              <td className="p-2 border-b">-</td>
                              <td className="p-2 border-b">-</td>
                              <td className="p-2 border-b">-</td>
                              <td className="p-2 border-b">-</td>
                              <td className="p-2 border-b">-</td>
                              <td className="p-2 border-b">-</td>
                              <td className="p-2 border-b">-</td>
                              <td className="p-2 border-b">-</td>
                              <td className="p-2 border-b">-</td>
                              <td className="p-2 border-b">-</td>
                            </tr>
                          </tbody>
                          {/* <tfoot className="text-gray-800 font-semibold bg-gray-100">
                                                <tr>
                                                    <td className="p-2 text-right min-w-[150px]" colSpan={11}>Jumlah Pendapatan Kotor dan Pajak Penghasilan Yang Ditanggung Oleh Pemerintah</td>
                                                    <td className="p-2 text-center">0</td>
                                                    <td className="p-2"></td>
                                                </tr>
                                                <tr>
                                                    <td className="p-2 text-right min-w-[150px]" colSpan={11}>Jumlah Pendapatan Kotor dan Pajak Penghasilan Yang Dipotong</td>
                                                    <td className="p-2 text-center">0</td>
                                                    <td className="p-2"></td>
                                                </tr>
                                                <tr>
                                                    <td className="p-2 text-right min-w-[150px]" colSpan={11}>Jumlah Total Pendapatan Kotor Dan Pajak Penghasilan Yang Ditanggung Oleh Pemerintah <br /> serta Pajak penghasilan Yang Dipotong</td>
                                                    <td className="p-2 text-center">0</td>
                                                    <td className="p-2"></td>
                                                </tr>
                                            </tfoot> */}
                        </table>
                      </div>
                    </div>
                    <div className="border rounded-md p-4 mb-4">
                      <div className="border rounded-md p-4 mb-4 font-semibold">
                        BPA2
                      </div>
                      <div className="w-full overflow-x-auto bg-white shadow-md rounded-lg ">
                        <table className="table-auto text-sm text-left border overflow-hidden">
                          <thead className="bg-purple-700 text-white text-center">
                            <tr>
                              <th className="p-2 border-b ">No</th>
                              <th className="p-2 border-b min-w-[200px]">
                                NIK/NPWP
                              </th>
                              <th className="p-2  border-b min-w-[150px]">
                                Nama
                              </th>
                              <th className="p-2 border-b min-w-[150px]">
                                Nomor Bukti Potong{" "}
                              </th>
                              <th className="p-2 border-b min-w-[150px]">
                                Tanggal Bukti Pemotongan{" "}
                              </th>
                              <th className="p-2 border-b min-w-[150px]">
                                Kode Objek Pajak
                              </th>
                              <th className="p-2 border-b min-w-[150px]">
                                Penghasilan Bruto (Rp)
                              </th>
                              <th className="p-2 border-b min-w-[150px]">
                                Pajak Penghasilan (Rp)
                              </th>
                              <th className="p-2 border-b min-w-[150px]">
                                Fasilitas Perpajakan
                              </th>
                              <th className="p-2 border-b min-w-[150px]">
                                Negara
                              </th>
                              <th className="p-2 border-b min-w-[150px]">
                                ID Tempat Kegiatan Usaha
                              </th>
                              <th className="p-2 border-b min-w-[150px]">
                                KAP-KJS
                              </th>
                              <th className="p-2 border-b min-w-[150px]">
                                Status
                              </th>
                            </tr>
                          </thead>
                          <tbody className="text-gray-600 text-center">
                            <tr>
                              <td className="p-2 border-b text-center"></td>
                              <td className="p-2 border-b">
                                
                              </td>
                              <td className="p-2 border-b">-</td>
                              <td className="p-2 border-b">-</td>
                              <td className="p-2 border-b">-</td>
                              <td className="p-2 border-b">-</td>
                              <td className="p-2 border-b">-</td>
                              <td className="p-2 border-b">-</td>
                              <td className="p-2 border-b">-</td>
                              <td className="p-2 border-b">-</td>
                              <td className="p-2 border-b">-</td>
                              <td className="p-2 border-b">-</td>
                              <td className="p-2 border-b">-</td>
                            </tr>
                          </tbody>
                          <tfoot className="text-gray-800 font-semibold bg-gray-100">
                            <tr>
                              <td
                                className="p-2 text-right min-w-[150px]"
                                colSpan={11}
                              >
                                Jumlah Pendapatan Kotor dan Pajak Penghasilan
                                Yang Ditanggung Oleh Pemerintah
                              </td>
                              <td className="p-2 text-center">0</td>
                              <td className="p-2"></td>
                            </tr>
                            <tr>
                              <td
                                className="p-2 text-right min-w-[150px]"
                                colSpan={11}
                              >
                                Jumlah Pendapatan Kotor dan Pajak Penghasilan
                                Yang Dipotong
                              </td>
                              <td className="p-2 text-center">0</td>
                              <td className="p-2"></td>
                            </tr>
                            <tr>
                              <td
                                className="p-2 text-right min-w-[150px]"
                                colSpan={11}
                              >
                                Jumlah Total Pendapatan Kotor Dan Pajak
                                Penghasilan Yang Ditanggung Oleh Pemerintah{" "}
                                <br /> serta Pajak penghasilan Yang Dipotong
                              </td>
                              <td className="p-2 text-center">0</td>
                              <td className="p-2"></td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="l-ii">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-black mt-4">
                      DAFTAR PEMOTONGAN SATU TAHUN PAJAK ATAU BAGIAN TAHUN PAJAK
                      PAJAK PENGHASILAN PASAL 21 BAGI PEGAWAI TETAP DAN
                      PENSIUNAN YANG MENERIMA UANG TERKAIT PENSIUN SECARA
                      BERKALA SERTA BAGI PEGAWAI NEGERI SIPIL, ANGGOTA TENTARA
                      NASIONAL INDONESIA, ANGGOTA KEPOLISIAN REPUBLIK INDONESIA,
                      PEJABAT NEGARA, DAN PENSIUNANNYA
                    </h2>
                  </div>
                  <div className="mt-4">
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
                          <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                              NPWP
                            </label>
                            <input
                              type="text"
                              readOnly
                              value="2002909301990"
                              className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                            />
                          </div>
                          <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                              Masa Pajak
                            </label>
                            <input
                              type="text"
                              readOnly
                              value="2025"
                              className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="border rounded-md p-4 mb-4">
                      <div className="border rounded-md p-4 mb-4 font-semibold">
                        BPA1
                      </div>
                      <div className="w-full overflow-x-auto bg-white shadow-md rounded-lg ">
                        <table className="table-auto text-sm text-left border overflow-hidden">
                          <thead className="bg-purple-700 text-white text-center">
                            <tr>
                              <th className="p-2 border-b ">No</th>
                              <th className="p-2 border-b min-w-[200px]">
                                NIK/NPWP
                              </th>
                              <th className="p-2  border-b min-w-[150px]">
                                Nama
                              </th>
                              <th className="p-2 border-b min-w-[150px]">
                                Nomor Bukti Potong{" "}
                              </th>
                              <th className="p-2 border-b min-w-[150px]">
                                Tanggal Bukti Pemotongan{" "}
                              </th>
                              <th className="p-2 border-b min-w-[150px]">
                                Kode Objek Pajak
                              </th>
                              <th className="p-2 border-b min-w-[150px]">
                                Penghasilan Bruto (Rp)
                              </th>
                              <th className="p-2 border-b min-w-[150px]">
                                Pajak Penghasilan (Rp)
                              </th>
                              <th className="p-2 border-b min-w-[150px]">
                                Fasilitas Perpajakan
                              </th>
                              <th className="p-2 border-b min-w-[150px]">
                                Negara
                              </th>
                              <th className="p-2 border-b min-w-[150px]">
                                ID Tempat Kegiatan Usaha
                              </th>
                              <th className="p-2 border-b min-w-[150px]">
                                KAP-KJS
                              </th>
                              <th className="p-2 border-b min-w-[150px]">
                                Status
                              </th>
                            </tr>
                          </thead>
                          <tbody className="text-gray-600 text-center">
                            <tr>
                              <td className="p-2 border-b text-center"></td>
                              <td className="p-2 border-b">
                                
                              </td>
                              <td className="p-2 border-b">-</td>
                              <td className="p-2 border-b">-</td>
                              <td className="p-2 border-b">-</td>
                              <td className="p-2 border-b">-</td>
                              <td className="p-2 border-b">-</td>
                              <td className="p-2 border-b">-</td>
                              <td className="p-2 border-b">-</td>
                              <td className="p-2 border-b">-</td>
                              <td className="p-2 border-b">-</td>
                              <td className="p-2 border-b">-</td>
                              <td className="p-2 border-b">-</td>
                            </tr>
                          </tbody>
                          {/* <tfoot className="text-gray-800 font-semibold bg-gray-100">
                                                <tr>
                                                    <td className="p-2 text-right min-w-[150px]" colSpan={11}>Jumlah Pendapatan Kotor dan Pajak Penghasilan Yang Ditanggung Oleh Pemerintah</td>
                                                    <td className="p-2 text-center">0</td>
                                                    <td className="p-2"></td>
                                                </tr>
                                                <tr>
                                                    <td className="p-2 text-right min-w-[150px]" colSpan={11}>Jumlah Pendapatan Kotor dan Pajak Penghasilan Yang Dipotong</td>
                                                    <td className="p-2 text-center">0</td>
                                                    <td className="p-2"></td>
                                                </tr>
                                                <tr>
                                                    <td className="p-2 text-right min-w-[150px]" colSpan={11}>Jumlah Total Pendapatan Kotor Dan Pajak Penghasilan Yang Ditanggung Oleh Pemerintah <br /> serta Pajak penghasilan Yang Dipotong</td>
                                                    <td className="p-2 text-center">0</td>
                                                    <td className="p-2"></td>
                                                </tr>
                                            </tfoot> */}
                        </table>
                      </div>
                    </div>
                    <div className="border rounded-md p-4 mb-4">
                      <div className="border rounded-md p-4 mb-4 font-semibold">
                        BPA2
                      </div>
                      <div className="w-full overflow-x-auto bg-white shadow-md rounded-lg ">
                        <table className="table-auto text-sm text-left border overflow-hidden">
                          <thead className="bg-purple-700 text-white text-center">
                            <tr>
                              <th className="p-2 border-b ">No</th>
                              <th className="p-2 border-b min-w-[200px]">
                                NIK/NPWP
                              </th>
                              <th className="p-2  border-b min-w-[150px]">
                                Nama
                              </th>
                              <th className="p-2 border-b min-w-[150px]">
                                Nomor Bukti Potong{" "}
                              </th>
                              <th className="p-2 border-b min-w-[150px]">
                                Tanggal Bukti Pemotongan{" "}
                              </th>
                              <th className="p-2 border-b min-w-[150px]">
                                Kode Objek Pajak
                              </th>
                              <th className="p-2 border-b min-w-[150px]">
                                Penghasilan Bruto (Rp)
                              </th>
                              <th className="p-2 border-b min-w-[150px]">
                                Pajak Penghasilan (Rp)
                              </th>
                              <th className="p-2 border-b min-w-[150px]">
                                Fasilitas Perpajakan
                              </th>
                              <th className="p-2 border-b min-w-[150px]">
                                Negara
                              </th>
                              <th className="p-2 border-b min-w-[150px]">
                                ID Tempat Kegiatan Usaha
                              </th>
                              <th className="p-2 border-b min-w-[150px]">
                                KAP-KJS
                              </th>
                              <th className="p-2 border-b min-w-[150px]">
                                Status
                              </th>
                            </tr>
                          </thead>
                          <tbody className="text-gray-600 text-center">
                            <tr>
                              <td className="p-2 border-b text-center"></td>
                              <td className="p-2 border-b">
                              </td>
                              <td className="p-2 border-b">-</td>
                              <td className="p-2 border-b">-</td>
                              <td className="p-2 border-b">-</td>
                              <td className="p-2 border-b">-</td>
                              <td className="p-2 border-b">-</td>
                              <td className="p-2 border-b">-</td>
                              <td className="p-2 border-b">-</td>
                              <td className="p-2 border-b">-</td>
                              <td className="p-2 border-b">-</td>
                              <td className="p-2 border-b">-</td>
                              <td className="p-2 border-b">-</td>
                            </tr>
                          </tbody>
                          <tfoot className="text-gray-800 font-semibold bg-gray-100">
                            <tr>
                              <td
                                className="p-2 text-right min-w-[150px]"
                                colSpan={11}
                              >
                                Total
                              </td>
                              <td className="p-2 text-center">0</td>
                              <td className="p-2"></td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="L3">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-black mt-4">
                      DAFTAR PEMOTONGAN PAJAK PENGHASILAN PASAL 21 DAN/ATAU
                      PASAL 26 SELAIN PEGAWAI TETAP ATAU PENSIUNAN YANG MENERIMA
                      UANG TERKAIT PENSIUN SECARA BERKALA
                    </h2>
                  </div>
                  <div className="mt-4">
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
                          <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                              NPWP
                            </label>
                            <input
                              type="text"
                              readOnly
                              value="2002909301990"
                              className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                            />
                          </div>
                          <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                              Masa Pajak
                            </label>
                            <input
                              type="text"
                              readOnly
                              value="2025"
                              className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="border rounded-md p-4 mb-4">
                      <div className="border rounded-md p-4 mb-4 font-semibold">
                        BP21
                      </div>
                      <div className="w-full overflow-x-auto bg-white shadow-md rounded-lg ">
                        <table className="table-auto text-sm text-left border overflow-hidden">
                          <thead className="bg-purple-700 text-white text-center">
                            <tr>
                              <th className="p-2 border-b ">No</th>
                              <th className="p-2 border-b min-w-[200px]">
                                NIK/NPWP
                              </th>
                              <th className="p-2  border-b min-w-[150px]">
                                Nama
                              </th>
                              <th className="p-2 border-b min-w-[150px]">
                                Nomor Bukti Potong{" "}
                              </th>
                              <th className="p-2 border-b min-w-[150px]">
                                Tanggal Bukti Pemotongan{" "}
                              </th>
                              <th className="p-2 border-b min-w-[150px]">
                                Kode Objek Pajak
                              </th>
                              <th className="p-2 border-b min-w-[150px]">
                                Objek Pajak
                              </th>
                              <th className="p-2 border-b min-w-[150px]">
                                Penghasilan Bruto (Rp)
                              </th>
                              <th className="p-2 border-b min-w-[150px]">
                                Pajak Penghasilan (Rp)
                              </th>
                              <th className="p-2 border-b min-w-[150px]">
                                Fasilitas Perpajakan
                              </th>
                              <th className="p-2 border-b min-w-[150px]">
                                ID Tempat Kegiatan Usaha
                              </th>
                              <th className="p-2 border-b min-w-[150px]">
                                Negara
                              </th>
                              <th className="p-2 border-b min-w-[150px]">
                                ID Tempat Kegiatan Usaha
                              </th>
                              <th className="p-2 border-b min-w-[150px]">
                                KAP-KJS
                              </th>
                              <th className="p-2 border-b min-w-[150px]">
                                Status
                              </th>
                            </tr>
                          </thead>
                          <tbody className="text-gray-600 text-center">
                            {sptOther?.data ? (
                              sptOther.data
                                .filter(
                                  (item) => item.jenis_pajak === "Pasal 21"
                                )
                                .map((item, index) => (
                                  <tr key={item.id}>
                                    <td className="p-2 border-b text-center">
                                      {index + 1}
                                    </td>
                                    <td className="p-2 border-b">
                                      {item.npwp_akun || "-"}
                                    </td>
                                    <td className="p-2 border-b">
                                      {item.nama_akun || "-"}
                                    </td>
                                    <td className="p-2 border-b">
                                      {item.nomor_pemotongan || "-"}
                                    </td>
                                    <td className="p-2 border-b">
                                      {item.masa_awal
                                        ? new Date(
                                            item.masa_awal
                                          ).toLocaleDateString("id-ID")
                                        : "-"}
                                    </td>
                                    <td className="p-2 border-b">
                                      {item.kode_objek_pajak || "-"}
                                    </td>
                                    <td className="p-2 border-b">
                                      {item.tipe_bupot || "-"}
                                    </td>
                                    <td className="p-2 border-b">
                                      {item.dasar_pengenaan_pajak
                                        ? formatRupiah(
                                            item.dasar_pengenaan_pajak
                                          )
                                        : "-"}
                                    </td>
                                    <td className="p-2 border-b">
                                      {item.pajak_penghasilan
                                        ? formatRupiah(item.pajak_penghasilan)
                                        : "-"}
                                    </td>
                                    <td className="p-2 border-b">
                                      {item.fasilitas_pajak || "-"}
                                    </td>
                                    <td className="p-2 border-b">
                                      {item.nitku || "-"}
                                    </td>
                                    <td className="p-2 border-b">
                                      ID Indonesia
                                    </td>
                                    <td className="p-2 border-b">
                                      {item.nitku || "-"}
                                    </td>
                                    <td className="p-2 border-b">411121-100</td>
                                    <td className="p-2 border-b">
                                      {item.status || "-"}
                                    </td>
                                  </tr>
                                ))
                            ) : (
                              <tr>
                                <td
                                  className="p-2 border-b text-center"
                                  colSpan="15"
                                >
                                  Tidak ada data
                                </td>
                              </tr>
                            )}
                          </tbody>

                          <tfoot className="text-gray-800 font-semibold bg-gray-100">
                            <tr>
                              <td
                                className="p-2 text-right min-w-[150px]"
                                colSpan={13}
                              >
                                JUMLAH PENDAPATAN KOTOR UNTUK PASAL 21 DAN PAJAK
                                PENGHASILAN PASAL 21 YANG DITANGGUNG OLEH
                                PEMERINTAH
                              </td>
                              <td className="p-2 text-center">
                                {sptOther?.data
                                  ? formatRupiah(
                                      sptOther.data
                                        .filter(
                                          (item) =>
                                            item.jenis_pajak === "Pasal 21" &&
                                            item.fasilitas_pajak ===
                                              "pph_ditanggung_pemerintah"
                                        )
                                        .reduce(
                                          (total, item) =>
                                            total +
                                            (parseFloat(
                                              item.dasar_pengenaan_pajak
                                            ) || 0),
                                          0
                                        )
                                    )
                                  : "0"}
                              </td>
                              <td className="p-2">
                                {sptOther?.data
                                  ? formatRupiah(
                                      sptOther.data
                                        .filter(
                                          (item) =>
                                            item.jenis_pajak === "Pasal 21" &&
                                            item.fasilitas_pajak ===
                                              "pph_ditanggung_pemerintah"
                                        )
                                        .reduce(
                                          (total, item) =>
                                            total +
                                            (parseFloat(
                                              item.pajak_penghasilan
                                            ) || 0),
                                          0
                                        )
                                    )
                                  : "0"}
                              </td>
                            </tr>
                            <tr>
                              <td
                                className="p-2 text-right min-w-[150px]"
                                colSpan={13}
                              >
                                JUMLAH UNTUK PASAL 21 DAN PENDAPATAN KOTOR PASAL
                                21 SERTA PAJAK PENGHASILAN YANG DIPOTONG
                              </td>
                              <td className="p-2 text-center">
                                {sptOther?.data
                                  ? formatRupiah(
                                      sptOther.data
                                        .filter(
                                          (item) =>
                                            item.jenis_pajak === "Pasal 21" &&
                                            item.fasilitas_pajak !==
                                              "pph_ditanggung_pemerintah"
                                        )
                                        .reduce(
                                          (total, item) =>
                                            total +
                                            (parseFloat(
                                              item.dasar_pengenaan_pajak
                                            ) || 0),
                                          0
                                        )
                                    )
                                  : "0"}
                              </td>
                              <td className="p-2">
                                {sptOther?.data
                                  ? formatRupiah(
                                      sptOther.data
                                        .filter(
                                          (item) =>
                                            item.jenis_pajak === "Pasal 21" &&
                                            item.fasilitas_pajak !==
                                              "pph_ditanggung_pemerintah"
                                        )
                                        .reduce(
                                          (total, item) =>
                                            total +
                                            (parseFloat(
                                              item.pajak_penghasilan
                                            ) || 0),
                                          0
                                        )
                                    )
                                  : "0"}
                              </td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    </div>
                    <div className="border rounded-md p-4 mb-4">
                      <div className="border rounded-md p-4 mb-4 font-semibold">
                        BP26
                      </div>
                      <div className="w-full overflow-x-auto bg-white shadow-md rounded-lg ">
                        <table className="table-auto text-sm text-left border overflow-hidden">
                          <thead className="bg-purple-700 text-white text-center">
                            <tr>
                              <th className="p-2 border-b ">No</th>
                              <th className="p-2 border-b min-w-[200px]">
                                NIK/NPWP
                              </th>
                              <th className="p-2  border-b min-w-[150px]">
                                Nama
                              </th>
                              <th className="p-2 border-b min-w-[150px]">
                                Nomor Bukti Potong{" "}
                              </th>
                              <th className="p-2 border-b min-w-[150px]">
                                Tanggal Bukti Pemotongan{" "}
                              </th>
                              <th className="p-2 border-b min-w-[150px]">
                                Kode Objek Pajak
                              </th>
                              <th className="p-2 border-b min-w-[150px]">
                                Objek Pajak
                              </th>
                              <th className="p-2 border-b min-w-[150px]">
                                Penghasilan Bruto (Rp)
                              </th>
                              <th className="p-2 border-b min-w-[150px]">
                                Pajak Penghasilan (Rp)
                              </th>
                              <th className="p-2 border-b min-w-[150px]">
                                Fasilitas Perpajakan
                              </th>
                              <th className="p-2 border-b min-w-[150px]">
                                ID Tempat Kegiatan Usaha
                              </th>
                              <th className="p-2 border-b min-w-[150px]">
                                Negara
                              </th>
                              <th className="p-2 border-b min-w-[150px]">
                                ID Tempat Kegiatan Usaha
                              </th>
                              <th className="p-2 border-b min-w-[150px]">
                                KAP-KJS
                              </th>
                              <th className="p-2 border-b min-w-[150px]">
                                Status
                              </th>
                            </tr>
                          </thead>
                          <tbody className="text-gray-600 text-center">
                            {sptOther?.data ? (
                              sptOther.data
                                .filter(
                                  (item) => item.jenis_pajak === "Pasal 26"
                                )
                                .map((item, index) => (
                                  <tr key={item.id}>
                                    <td className="p-2 border-b text-center">
                                      {index + 1}
                                    </td>
                                    <td className="p-2 border-b">
                                      {item.npwp_akun || "-"}
                                    </td>
                                    <td className="p-2 border-b">
                                      {item.nama_akun || "-"}
                                    </td>
                                    <td className="p-2 border-b">
                                      {item.nomor_pemotongan || "-"}
                                    </td>
                                    <td className="p-2 border-b">
                                      {item.masa_awal
                                        ? new Date(
                                            item.masa_awal
                                          ).toLocaleDateString("id-ID")
                                        : "-"}
                                    </td>
                                    <td className="p-2 border-b">
                                      {item.kode_objek_pajak || "-"}
                                    </td>
                                    <td className="p-2 border-b">
                                      {item.tipe_bupot || "-"}
                                    </td>
                                    <td className="p-2 border-b">
                                      {item.dasar_pengenaan_pajak
                                        ? formatRupiah(
                                            item.dasar_pengenaan_pajak
                                          )
                                        : "-"}
                                    </td>
                                    <td className="p-2 border-b">
                                      {item.pajak_penghasilan
                                        ? formatRupiah(item.pajak_penghasilan)
                                        : "-"}
                                    </td>
                                    <td className="p-2 border-b">
                                      {item.fasilitas_pajak || "-"}
                                    </td>
                                    <td className="p-2 border-b">
                                      {item.nitku || "-"}
                                    </td>
                                    <td className="p-2 border-b">
                                      ID Indonesia
                                    </td>
                                    <td className="p-2 border-b">
                                      {item.nitku || "-"}
                                    </td>
                                    <td className="p-2 border-b">411121-100</td>
                                    <td className="p-2 border-b">
                                      {item.status || "-"}
                                    </td>
                                  </tr>
                                ))
                            ) : (
                              <tr>
                                <td
                                  className="p-2 border-b text-center"
                                  colSpan="15"
                                >
                                  Tidak ada data
                                </td>
                              </tr>
                            )}
                          </tbody>

                          <tfoot className="text-gray-800 font-semibold bg-gray-100">
                            <tr>
                              <td
                                className="p-2 text-right min-w-[150px]"
                                colSpan={13}
                              >
                                JUMLAH PENDAPATAN KOTOR UNTUK PASAL 26 DAN PAJAK
                                PENGHASILAN PASAL 26 YANG DITANGGUNG OLEH
                                PEMERINTAH
                              </td>
                              <td className="p-2 text-center">
                                {sptOther?.data
                                  ? formatRupiah(
                                      sptOther.data
                                        .filter(
                                          (item) =>
                                            item.jenis_pajak === "Pasal 26" &&
                                            item.fasilitas_pajak ===
                                              "pph_ditanggung_pemerintah"
                                        )
                                        .reduce(
                                          (total, item) =>
                                            total +
                                            (parseFloat(
                                              item.dasar_pengenaan_pajak
                                            ) || 0),
                                          0
                                        )
                                    )
                                  : "0"}
                              </td>
                              <td className="p-2">
                                {sptOther?.data
                                  ? formatRupiah(
                                      sptOther.data
                                        .filter(
                                          (item) =>
                                            item.jenis_pajak === "Pasal 26" &&
                                            item.fasilitas_pajak ===
                                              "pph_ditanggung_pemerintah"
                                        )
                                        .reduce(
                                          (total, item) =>
                                            total +
                                            (parseFloat(
                                              item.pajak_penghasilan
                                            ) || 0),
                                          0
                                        )
                                    )
                                  : "0"}
                              </td>
                            </tr>
                            <tr>
                              <td
                                className="p-2 text-right min-w-[150px]"
                                colSpan={13}
                              >
                                JUMLAH UNTUK PASAL 26 DAN PENDAPATAN KOTOR PASAL
                                26 SERTA PAJAK PENGHASILAN YANG DIPOTONG
                              </td>
                              <td className="p-2 text-center">
                                {sptOther?.data
                                  ? formatRupiah(
                                      sptOther.data
                                        .filter(
                                          (item) =>
                                            item.jenis_pajak === "Pasal 26" &&
                                            item.fasilitas_pajak !==
                                              "pph_ditanggung_pemerintah"
                                        )
                                        .reduce(
                                          (total, item) =>
                                            total +
                                            (parseFloat(
                                              item.dasar_pengenaan_pajak
                                            ) || 0),
                                          0
                                        )
                                    )
                                  : "0"}
                              </td>
                              <td className="p-2">
                                {sptOther?.data
                                  ? formatRupiah(
                                      sptOther.data
                                        .filter(
                                          (item) =>
                                            item.jenis_pajak === "Pasal 26" &&
                                            item.fasilitas_pajak !==
                                              "pph_ditanggung_pemerintah"
                                        )
                                        .reduce(
                                          (total, item) =>
                                            total +
                                            (parseFloat(
                                              item.pajak_penghasilan
                                            ) || 0),
                                          0
                                        )
                                    )
                                  : "0"}
                              </td>
                            </tr>
                            <tr>
                              <td
                                className="p-2 text-right min-w-[150px]"
                                colSpan={13}
                              >
                                JUMLAH TOTAL PENDAPATAN KOTOR DAN PAJAK
                                PENGHASILAN YANG DITANGGUNG OLEH PEMERINTAH
                                SERTA PAJAK PENGHASILAN YANG DIPOTONG
                              </td>
                              <td className="p-2 text-center">
                                {sptOther?.data
                                  ? formatRupiah(
                                      sptOther.data
                                        .filter(
                                          (item) =>
                                            item.jenis_pajak === "Pasal 26"
                                        )
                                        .reduce(
                                          (total, item) =>
                                            total +
                                            (parseFloat(
                                              item.dasar_pengenaan_pajak
                                            ) || 0),
                                          0
                                        )
                                    )
                                  : "0"}
                              </td>
                              <td className="p-2">
                                {sptOther?.data
                                  ? formatRupiah(
                                      sptOther.data
                                        .filter(
                                          (item) =>
                                            item.jenis_pajak === "Pasal 26"
                                        )
                                        .reduce(
                                          (total, item) =>
                                            total +
                                            (parseFloat(
                                              item.pajak_penghasilan
                                            ) || 0),
                                          0
                                        )
                                    )
                                  : "0"}
                              </td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
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

export default CreateKonsepPasal;
