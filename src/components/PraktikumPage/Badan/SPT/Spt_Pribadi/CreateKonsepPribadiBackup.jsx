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
import { useMutation, useQuery } from "@tanstack/react-query";
import { getCsrf } from "@/service/getCsrf";
import axios from "axios";
import { RoutesApi } from "@/Routes";
import Swal from "sweetalert2";
import { useParams, useSearchParams } from "react-router";
import { useCookies } from "react-cookie";
import { useNavigateWithParams } from "@/hooks/useNavigateWithParams";
import { ClipLoader } from "react-spinners";
import { X } from "lucide-react";
import TandaTangan from "../../TandaTangan";
import Select from "react-select";

const CreateKonsepPribadi = () => {
  const { id, akun, idSpt } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const viewAsCompanyId = searchParams.get("viewAs");
  const userId = searchParams.get("user_id");

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

  const [activeTab, setActiveTab] = useState("induk");
  const [showHeaderInduk, setShowHeaderInduk] = useState(true);
  const [showIdentitasWajibPajak, setShowIdentitasWajibPajak] = useState(false);
  const [showIkhtisarPenghasilanNeto, setShowIkhtisarPenghasilanNeto] =
    useState(false);
  const [showPerhitunganPajakTerutang, setShowPerhitunganPajakTerutang] =
    useState(false);
  const [showKreditPajak, setShowKreditPajak] = useState(false);
  const [showKurangLebihBayar, setShowKurangLebihBayar] = useState(false);
  const [showPembetulanSPT, setShowPembetulanSPT] = useState(false);
  const [showPengembalianPPh, setShowPengembalianPPh] = useState(false);
  const [showAngsuran, setShowAngsuran] = useState(false);
  const [showTransaksiLainnya, setShowTransaksiLainnya] = useState(false);
  const [showLampiranTambahan, setShowLampiranTambahan] = useState(false);

  const [showScrollTop, setShowScrollTop] = useState(false);

  // Dummy Bagian B
  // --- IKHTISAR (manual, 8 baris) ---
  const [r1a, setR1a] = useState(null);
  const [amt1a, setAmt1a] = useState(0);
  const [r1b1, setR1b1] = useState(null);
  const [amt1b1, setAmt1b1] = useState(0);
  const [r1b2, setR1b2] = useState("");
  const [amt1b2, setAmt1b2] = useState(0);
  const [r1b3, setR1b3] = useState("");
  const [amt1b3, setAmt1b3] = useState(0);
  const [r1b4, setR1b4] = useState("");
  const [amt1b4, setAmt1b4] = useState(0);
  const [r1b5, setR1b5] = useState(null);
  const [amt1b5, setAmt1b5] = useState(0);
  const [r1c, setR1c] = useState(null);
  const [amt1c, setAmt1c] = useState(0);
  const [r1d, setR1d] = useState(null);
  const [amt1d, setAmt1d] = useState(0);

  // Data Dummy Sementara

  const sumberOptions = ["Kegiatan Usaha", "Pekerjaan", "Pekerjaan Bebas"];
  const metodeOptions = [
    "Pembukuan stelsel akrual",
    "Pembukuan stelsel kas",
    "Pencatatan",
  ];

  // Dummy Bagian C
  // --- IKHTISAR (manual, 8 baris) ---
  const [r2, setR2] = useState(null);
  const [amt2, setAmt2] = useState(0);
  const [r3, setR3] = useState(null);
  const [amt3, setAmt3] = useState(0);
  const [r4, setR4] = useState(null);
  const [amt4, setAmt4] = useState(0);
  const [r5, setR5] = useState(null);
  const [amt5, setAmt5] = useState(0);
  const [r6, setR6] = useState(null);
  const [amt6, setAmt6] = useState(0);
  const [r7, setR7] = useState(null);
  const [amt7, setAmt7] = useState(0);
  const [r8, setR8] = useState(null);
  const [amt8, setAmt8] = useState(0);

  // Dummy Bagian d
  // --- IKHTISAR (manual, 4 baris) ---
  const [r10a, setR10a] = useState(null);
  const [amt10a, setAmt10a] = useState(0);
  const [r10b, setR10b] = useState(null);
  const [amt10b, setAmt10b] = useState(0);
  const [r10c, setR10c] = useState(null);
  const [amt10c, setAmt10c] = useState(0);
  const [r10d, setR10d] = useState(null);
  const [amt10d, setAmt10d] = useState(0);

  // Dummy Bagian e
  // --- IKHTISAR (manual, 3 baris) ---
  const [r11a, setR11a] = useState(null);
  const [amt11a, setAmt11a] = useState(0);
  const [r11b, setR11b] = useState(null);
  const [amt11b, setAmt11b] = useState(0);
  const [r11c, setR11c] = useState(null);
  const [amt11c, setAmt11c] = useState(0);

  // Dummy Bagian f
  // --- IKHTISAR (manual, 2 baris) ---
  const [r12a, setR12a] = useState(null);
  const [amt12a, setAmt12a] = useState(0);
  const [r12b, setR12b] = useState(null);
  const [amt12b, setAmt12b] = useState(0);

  // Dummy Bagian H
  // --- IKHTISAR (manual, 3 baris) ---
  const [r13a, setR13a] = useState(null);
  const [amt13a, setAmt13a] = useState(0);
  const [r13b, setR13b] = useState(null);
  const [amt13b, setAmt13b] = useState(0);
  const [r13c, setR13c] = useState(null);
  const [amt13c, setAmt13c] = useState(0);

  // Dummy Bagian I
  // --- IKHTISAR (manual, 4 baris) ---
  const [r14a, setR14a] = useState(null);
  const [amt14a, setAmt14a] = useState(0);
  const [r14b, setR14b] = useState(null);
  const [amt14b, setAmt14b] = useState(0);
  const [r14c, setR14c] = useState(null);
  const [amt14c, setAmt14c] = useState(0);
  const [r14d, setR14d] = useState(null);
  const [amt14d, setAmt14d] = useState(0);
  const [r14e, setR14e] = useState(null);
  const [amt14e, setAmt14e] = useState(0);
  const [r14f, setR14f] = useState(null);
  const [amt14f, setAmt14f] = useState(0);
  const [r14g, setR14g] = useState(null);
  const [amt14g, setAmt14g] = useState(0);

  // Dummy Bagian J
  // --- IKHTISAR (manual, 5 baris) ---
  const [ra, setRa] = useState(null);
  const [amta, setAmta] = useState(0);
  const [rb, setRb] = useState(null);
  const [amtb, setAmtb] = useState(0);
  const [rc, setRc] = useState(null);
  const [amtc, setAmtc] = useState(0);
  const [rd, setRd] = useState(null);
  const [amtd, setAmtd] = useState(0);
  const [re, setRe] = useState(null);
  const [amte, setAmte] = useState(0);

  const [metode, setMetode] = useState("Pencatatan");
  const [metodeOpen, setMetodeOpen] = useState(false);
  const [metodeQuery, setMetodeQuery] = useState("");
  const metodeFiltered = metodeOptions.filter((o) =>
    o.toLowerCase().includes(metodeQuery.toLowerCase())
  );

  // const activeTabContent = activeTab !== "induk" ? activeTab : null;
  // const activeTabContent = activeTab !== "induk" ? activeTab : null;
  // const [activeTabContent, setActiveTabContent] = useState("A1");
  // const activeTabContent = activeTab !== "induk" ? activeTab : null;
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
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-auto p-3 bg-white rounded-md h-full min-w-0">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl text-blue-900 mt-4">
            SPT TAHUNAN PAJAK PENGHASILAN (Pph) WAJIB PAJAK ORANG PRIBADI
          </h2>
        </div>

        <div className="w-full p-2 ml-0 border-t text-lg">
          <Tabs defaultValue="induk" onValueChange={(val) => setActiveTab(val)}>
            <TabsList className="flex justify-start gap-2 text-blue-700 text-lg">
              <TabsTrigger value="induk">Induk</TabsTrigger>
              {/* <TabsTrigger value="L1">L-I</TabsTrigger>
                                  <TabsTrigger value="l-ib">L-IB</TabsTrigger>
                                  <TabsTrigger value="l-ii">L-II</TabsTrigger>
                                  <TabsTrigger value="L3">L-III</TabsTrigger> */}
            </TabsList>
            <TabsContent value="induk">
              <div className="mt-4">
                <div
                  className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
                  onClick={() => setShowHeaderInduk(!showHeaderInduk)}
                >
                  <h3 className="text-lg font-semibold">HEADER</h3>
                  {showHeaderInduk ? <FaChevronUp /> : <FaChevronDown />}
                </div>

                {showHeaderInduk && (
                  <div className="border rounded-md p-4 mb-4">
                    <div className="grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-12 md:col-span-3">
                        <div className="flex items-center gap-3 mb-4 ">
                          <label className="text-sm font-base text-gray-900 w-64 leading-tight">
                            Tahun Pajak/Bagian Tahun Pajak
                          </label>
                          <input
                            type="text"
                            readOnly
                            // value={data.masa_tahun}
                            className="flex-1 p-2 border rounded-md bg-gray-100 text-gray-600 "
                          />
                        </div>

                        <div className="flex items-center gap-3">
                          <label className="text-sm font-base text-gray-900 w-56">
                            Periode Pembukuan
                          </label>
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              readOnly
                              value={"1"}
                              className="w-20 p-2 border rounded-md text-center bg-gray-100"
                            />
                            <span className="text-gray-500">s/d</span>
                            <input
                              type="text"
                              readOnly
                              value={"12"}
                              className="w-20 p-2 border rounded-md text-center bg-gray-100"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="col-span-12 md:col-span-2 self-start">
                        <label className="block mb-2 text-sm font-base text-gray-900">
                          Status
                        </label>
                        <input
                          readOnly
                          // value={data.status}
                          className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                        />
                      </div>

                      <div className="col-span-12 md:col-span-3 self-start">
                        <label className="block mb-2 text-sm font-base text-gray-900">
                          Sumber Penghasilan{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <select className="w-full p-2 pr-8 border rounded-md text-base">
                            <option value="">Please Select</option>
                            {sumberOptions.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="col-span-12 md:col-span-3 self-start">
                        <label className="block mb-2 text-sm font-base text-gray-900">
                          Sumber Penghasilan{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <select className="w-full p-2 pr-8 border rounded-md text-base">
                            <option value="">Please Select</option>
                            {metodeOptions.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Identitas Waib Pajak */}
              <div
                className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
                onClick={() =>
                  setShowIdentitasWajibPajak(!showIdentitasWajibPajak)
                }
              >
                <h3 className="text-lg font-semibold">
                  A. Identitas Wajib Pajak
                </h3>
                {showIdentitasWajibPajak ? <FaChevronUp /> : <FaChevronDown />}
              </div>
              {showIdentitasWajibPajak && (
                <div className="border rounded-md p-4 mb-4">
                  <div className="mt-4 flex justify-between gap-4">
                    <label className="w-64 flex-none block text-sm font-base text-gray-700 font-semibold">
                      NIK/NPWP *
                    </label>
                    <input
                      type="text"
                      readOnly
                      // value={data.npwp}
                      className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                    />
                  </div>
                  <div className="mt-4 flex justify-between gap-4">
                    <label className="w-64 flex-none block text-sm font-base text-gray-700 font-semibold">
                      NAMA *
                    </label>
                    <input
                      type="text"
                      readOnly
                      // value={data.nama_pengusaha}
                      className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                    />
                  </div>
                  <div className="mt-4 flex justify-between gap-4">
                    <label className="w-64 flex-none block text-sm font-base text-gray-700 font-semibold">
                      JENIS ID
                    </label>
                    <input
                      type="text"
                      readOnly
                      // value={data.alamat}
                      className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                    />
                  </div>
                  <div className="mt-4 flex justify-between gap-4">
                    <label className="w-64 flex-none block text-sm font-base text-gray-700 font-semibold">
                      NOMOR ID
                    </label>
                    <input
                      type="text"
                      readOnly
                      // value={data.nomor_telpon}
                      className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                    />
                  </div>
                  <div className="mt-4 flex justify-between gap-4">
                    <label className="w-64 flex-none block text-sm font-base text-gray-700 font-semibold">
                      NOMOR TELEPON
                    </label>
                    <input
                      type="text"
                      readOnly
                      // value={data.nomor_telpon}
                      className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                    />
                  </div>
                  <div className="mt-4 flex justify-between gap-4">
                    <label className="w-64 flex-none block text-sm font-base text-gray-700 font-semibold">
                      EMAIL
                    </label>
                    <input
                      type="text"
                      readOnly
                      // value={data.nomor_telpon}
                      className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                    />
                  </div>
                  <div className="mt-4 flex justify-between gap-4">
                    <label className="w-64 flex-none block text-sm font-base text-gray-700 font-semibold">
                      STATUS KEWAJIBAN PERPAJAKAN SUAMI DAN ISTRI
                      <span className="text-red-500 text-xs">
                        (Isi Jika Status adalah PH/MT)
                      </span>
                    </label>
                    <select className="w-64 flex-auto border p-2 rounded text-base">
                      <option value="">Please Select</option>
                      <option value="fasilitas_lainnya">
                        Pisah Harta (PH)
                      </option>
                      <option value="pph_ditanggung_pemerintah">
                        Memilih Terpisah (MT){" "}
                      </option>
                    </select>
                  </div>
                  <div className="mt-4 flex justify-between gap-4">
                    <label className="w-64 flex-none block text-sm font-base text-gray-700 font-semibold">
                      NIK/NPWP SUAMI/ISTRI
                    </label>
                    <input
                      type="text"
                      readOnly
                      // value={}
                      className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                    />
                  </div>
                </div>
              )}

              {/* khtisar Penghasilan Neto */}
              <div
                className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
                onClick={() =>
                  setShowIkhtisarPenghasilanNeto(!showIkhtisarPenghasilanNeto)
                }
              >
                <h3 className="text-lg font-semibold">
                  B. IKHTISAR PENGHASILAN NETO
                </h3>
                {showIkhtisarPenghasilanNeto ? (
                  <FaChevronUp />
                ) : (
                  <FaChevronDown />
                )}
              </div>
              {showIkhtisarPenghasilanNeto && (
                <div className="border rounded-md p-4 mb-4">
                  <div className="divide-y">
                    {/* 1.a */}
                    <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
                      <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                        <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">
                          1.a.
                        </span>
                        <span className="text-gray-800 text-base font-medium">
                          Apakah Anda menerima penghasilan dalam negeri dari
                          pekerjaan? <span className="text-red-500">*</span>
                        </span>
                      </div>
                      <div className="col-span-12 md:col-span-2">
                        <div className="flex items-center gap-6">
                          <label className="inline-flex items-center gap-2">
                            <input
                              type="radio"
                              name="r1a"
                              checked={r1a === true}
                              onChange={() => setR1a(true)}
                            />
                            <span>Ya</span>
                          </label>
                          <label className="inline-flex items-center gap-2">
                            <input
                              type="radio"
                              name="r1a"
                              checked={r1a === false}
                              onChange={() => setR1a(false)}
                            />
                            <span>Tidak</span>
                          </label>
                        </div>
                      </div>
                      <div className="col-span-12 md:col-span-3 text-sm">
                        <div className="bg-blue-100 rounded px-3 py-2">
                          {r1a === true &&
                            "Ya, silahkan mengisi lampiran I Bagian D"}
                          {r1a === false && "Tidak, Lanjutkan pertanyaan 1.b.1"}
                          {r1a === null && "Pilih salah satu Ya/Tidak"}
                        </div>
                      </div>
                      <div className="col-span-12 md:col-span-2">
                        <input
                          type="number"
                          min={0}
                          value={amt1a}
                          onChange={(e) => setAmt1a(+e.target.value || 0)}
                          className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                        />
                      </div>
                    </div>

                    {/* 1.b.1 */}
                    <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
                      <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                        <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">
                          1. b. 1
                        </span>
                        <span className="text-gray-800 text-base font-medium">
                          Apakah Anda menerima penghasilan dari usaha dan/atau
                          pekerjaan bebas?{" "}
                          <span className="text-red-500">*</span>
                        </span>
                      </div>
                      <div className="col-span-12 md:col-span-2">
                        <div className="flex items-center gap-6">
                          <label className="inline-flex items-center gap-2">
                            <input
                              type="radio"
                              name="r1b1"
                              checked={r1b1 === true}
                              onChange={() => setR1b1(true)}
                            />
                            <span>Ya</span>
                          </label>
                          <label className="inline-flex items-center gap-2">
                            <input
                              type="radio"
                              name="r1b1"
                              checked={r1b1 === false}
                              onChange={() => setR1b1(false)}
                            />
                            <span>Tidak</span>
                          </label>
                        </div>
                      </div>
                      <div className="col-span-12 md:col-span-3 text-sm">
                        <div className="bg-blue-100 rounded px-3 py-2">
                          {r1b1 === true &&
                            "Ya, silahkan mengisi jumlah pajak yang dapat diangsur/ditunda"}
                          {r1b1 === false && "Tidak, Lanjutkan pertanyaan 1.c"}
                          {r1b1 === null && "Pilih salah satu Ya/Tidak"}
                        </div>
                      </div>
                      <div className="col-span-12 md:col-span-2">
                        {/* <input
                          type="number"
                          min={0}
                          value={amt1b1}
                          onChange={(e) => setAmt1b1(+e.target.value || 0)}
                          className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                        /> */}
                      </div>
                    </div>

                    {/* 1.b.2 */}
                    <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
                      {/* Pertanyaan */}
                      <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                        <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">
                          1. b. 2
                        </span>
                        <span className="text-gray-800 text-base font-medium">
                          Apakah Anda termasuk Wajib Pajak Orang Pribadi yang
                          memiliki peredaran bruto tertentu atau Orang Pribadi
                          Pengusaha Tertentu (OPPT)?
                        </span>
                      </div>
                      {/* Dropdown */}
                      <div className="col-span-12 md:col-span-2">
                        <select
                          className="w-full p-2 border rounded-md text-sm truncate"
                          value={r1b2}
                          onChange={(e) => setR1b2(e.target.value)}
                        >
                          <option value="">Please select</option>
                          <option
                            value="ya_final"
                            className="whitespace-normal break-words"
                          >
                            Ya, termasuk WP OP yang memiliki peredaran bruto
                            tertentu yang dikenakan PPh final
                          </option>
                          <option value="ya_oppt">Ya, termasuk WP OPPT</option>
                          <option value="tidak">Tidak</option>
                        </select>
                      </div>
                      {/* Info */}
                      <div className="col-span-12 md:col-span-3 text-sm">
                        <div className="bg-blue-100 rounded px-3 py-2">
                          {r1b2 === "ya_final" &&
                            "Anda memilih WP OP dengan peredaran bruto tertentu yang dikenakan PPh final. Silakan isi Lampiran 3B."}
                          {r1b2 === "ya_oppt" &&
                            "Anda termasuk WP OPPT. Silakan isi Lampiran 3B Bagian B."}
                          {r1b2 === "tidak" &&
                            "Anda tidak termasuk kategori ini. Lanjutkan ke pertanyaan berikutnya 1.b.4."}
                          {r1b2 === "" && "Pilih salah satu opsi"}
                        </div>
                      </div>
                      {/* Nominal */}
                      <div className="col-span-12 md:col-span-2">
                        {/* <input
                          type="number"
                          min={0}
                          value={amt1b2}
                          onChange={(e) => setAmt1b2(+e.target.value || 0)}
                          className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                        /> */}
                      </div>
                    </div>

                    {/* 1.b.3 */}
                    <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
                      <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                        <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">
                          1. b. 3
                        </span>
                        <span className="text-gray-800 text-base font-medium">
                          Apakah Anda menggunakan Norma dalam menghitung
                          penghasilan neto?
                        </span>
                      </div>
                      <div className="col-span-12 md:col-span-2">
                        <select
                          className="w-full p-2 border rounded-md text-sm"
                          value={r1b3}
                          onChange={(e) => setR1b3(e.target.value)}
                        >
                          <option value="">Please select</option>
                          <option value="ya">
                            Ya, saya menggunakan Norma.
                          </option>
                          <option value="tidak">
                            Tidak, saya menyelenggarakan pembukuan.
                          </option>
                        </select>
                      </div>
                      <div className="col-span-12 md:col-span-3 text-sm">
                        <div className="bg-blue-100 rounded px-3 py-2">
                          {r1b3 === "ya" &&
                            "Ya, saya menyusun laporan keuangan berbasis kas/laporan keuangan."}
                          {r1b3 === "tidak" &&
                            "Tidak, saya tidak menyusun laporan keuangan berbasis kas/laporan keuangan. Lanjutkan ke pertanyaan berikutnya."}
                          {r1b3 === "" && "Pilih salah satu opsi"}
                        </div>
                      </div>
                      <div className="col-span-12 md:col-span-2">
                        {/* <input
                          type="number"
                          min={0}
                          value={amt1b3}
                          onChange={(e) => setAmt1b3(+e.target.value || 0)}
                          className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                        /> */}
                      </div>
                    </div>

                    {/* 1.b.4 */}
                    <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
                      <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                        <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">
                          1. b. 4
                        </span>
                        <span className="text-gray-800 text-base font-medium">
                          Anda menyelenggarakan pembukuan. Sebutkan sektor usaha
                          yang Anda lakukan?
                        </span>
                      </div>
                      <div className="col-span-12 md:col-span-2">
                        <select
                          className="w-full p-2 border rounded-md text-sm"
                          value={r1b4}
                          onChange={(e) => setR1b4(e.target.value)}
                        >
                          <option value="">Please select</option>
                          <option value="Dagang">Dagang</option>
                          <option value="Jasa">Jasa</option>
                          <option value="Manufaktur">Manufaktur</option>
                          <option value="Lainnya">Lainnya</option>
                        </select>
                      </div>
                      <div className="col-span-12 md:col-span-3 text-sm">
                        <div className="bg-blue-100 rounded px-3 py-2">
                          {r1b4 === "Dagang" &&
                            "Anda memilih sektor usaha Dagang. Silakan isi Lampiran 3A-4 Bagian A."}
                          {r1b4 === "Jasa" &&
                            "Anda memilih sektor usaha Jasa. Silakan isi Lampiran 3A-4 Bagian A."}
                          {r1b4 === "Manufaktur" &&
                            "Anda memilih sektor usaha Manufaktur. Silakan isi Lampiran 3A-4 Bagian A."}
                          {r1b4 === "Lainnya" &&
                            "Anda memilih sektor usaha Lainnya. Silakan isi Lampiran 3A-4 Bagian A."}
                          {r1b4 === "" && "Pilih salah satu opsi"}
                        </div>
                      </div>
                      <div className="col-span-12 md:col-span-2">
                        {/* <input
                          type="number"
                          min={0}
                          value={amt1b4}
                          onChange={(e) => setAmt1b4(+e.target.value || 0)}
                          className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                        /> */}
                      </div>
                    </div>

                    {/* 1.b.5 (tanpa dropdown/info, tetap rata kanan) */}
                    <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
                      <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                        <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">
                          1. b. 5
                        </span>
                        <span className="text-gray-800 text-base font-medium">
                          Penghasilan neto dari usaha dan/atau pekerjaan bebas
                        </span>
                      </div>
                      {/* Spacer untuk menjaga posisi kolom nominal di kanan */}
                      <div className="col-span-12 md:col-span-5"></div>
                      <div className="col-span-12 md:col-span-2">
                        <input
                          type="number"
                          min={0}
                          value={amt1b5}
                          onChange={(e) => setAmt1b5(+e.target.value || 0)}
                          className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                        />
                      </div>
                    </div>

                    {/* 1.c */}
                    <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
                      <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                        <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">
                          1.c.
                        </span>
                        <span className="text-gray-800 text-base font-medium">
                          Apakah Anda menerima penghasilan dalam negeri lainnya?
                        </span>
                      </div>
                      <div className="col-span-12 md:col-span-2">
                        <div className="flex items-center gap-6">
                          <label className="inline-flex items-center gap-2">
                            <input
                              type="radio"
                              name="r1c"
                              checked={r1c === true}
                              onChange={() => setR1c(true)}
                            />
                            <span>Ya</span>
                          </label>
                          <label className="inline-flex items-center gap-2">
                            <input
                              type="radio"
                              name="r1c"
                              checked={r1c === false}
                              onChange={() => setR1c(false)}
                            />
                            <span>Tidak</span>
                          </label>
                        </div>
                      </div>
                      <div className="col-span-12 md:col-span-3 text-sm">
                        <div className="bg-blue-100 rounded px-3 py-2">
                          {r1c === true &&
                            "Ya. Silahkan mengisi lampiran 3A-4 Bagian B"}
                          {r1c === false &&
                            "Tidak. Silahkan Melanjutkan ke pertanyaan berikutnya 1.d."}
                          {r1c === null && "Pilih salah satu Ya/Tidak"}
                        </div>
                      </div>
                      <div className="col-span-12 md:col-span-2">
                        <input
                          type="number"
                          min={0}
                          value={amt1c}
                          onChange={(e) => setAmt1c(+e.target.value || 0)}
                          className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                        />
                      </div>
                    </div>

                    {/* 1.d */}
                    <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
                      <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                        <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">
                          1.d.
                        </span>
                        <span className="text-gray-800 text-base font-medium">
                          Apakah Anda menerima penghasilan luar negeri?
                        </span>
                      </div>
                      <div className="col-span-12 md:col-span-2">
                        <div className="flex items-center gap-6">
                          <label className="inline-flex items-center gap-2">
                            <input
                              type="radio"
                              name="r1d"
                              checked={r1d === true}
                              onChange={() => setR1d(true)}
                            />
                            <span>Ya</span>
                          </label>
                          <label className="inline-flex items-center gap-2">
                            <input
                              type="radio"
                              name="r1d"
                              checked={r1d === false}
                              onChange={() => setR1d(false)}
                            />
                            <span>Tidak</span>
                          </label>
                        </div>
                      </div>
                      <div className="col-span-12 md:col-span-3 text-sm">
                        <div className="bg-blue-100 rounded px-3 py-2">
                          {r1d === true &&
                            "Ya, silahkan mengisi lampiran 2 Bagian C"}
                          {r1d === false &&
                            "Tidak. Silahkan Melanjutkan ke pertanyaan berikutnya."}
                          {r1d === null && "Pilih salah satu Ya/Tidak"}
                        </div>
                      </div>
                      <div className="col-span-12 md:col-span-2">
                        <input
                          type="number"
                          min={0}
                          value={amt1d}
                          onChange={(e) => setAmt1d(+e.target.value || 0)}
                          className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Perhitungan Pajak Teruntang */}

              <div
                className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
                onClick={() =>
                  setShowPerhitunganPajakTerutang(!showPerhitunganPajakTerutang)
                }
              >
                <h3 className="text-lg font-semibold">
                  C. PERHITUNGAN PAJAK TERUTANG
                </h3>
                {showPerhitunganPajakTerutang ? (
                  <FaChevronUp />
                ) : (
                  <FaChevronDown />
                )}
              </div>
              {showPerhitunganPajakTerutang && (
                // Ikhtisar Penghasilan Neto

                <div className="border rounded-md p-4 mb-4">
                  <div className="divide-y">
                    {/* 2 */}
                    <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
                      <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                        <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">
                          2
                        </span>
                        <span className="text-gray-800 text-base font-medium">
                          Penghasilan neto Setahun (1a + 1b + 1c + 1d){" "}
                          <span className="text-red-500">*</span>
                        </span>
                      </div>
                      <div className="col-span-12 md:col-span-5"></div>
                      <div className="col-span-12 md:col-span-2">
                        <input
                          type="number"
                          min={0}
                          value={amt2}
                          onChange={(e) => setAmt2(+e.target.value || 0)}
                          className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                        />
                      </div>
                    </div>

                    {/* 3 */}
                    <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
                      <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                        <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">
                          3
                        </span>
                        <span className="text-gray-800 text-base font-medium">
                          Apakah Terdapat Pengurangan Penghasilan Neto seperti
                          Kompensasi Kerugian Atau Zakat yang dibayarkan selain
                          yang telah diperhitungkan dalam formulir BPA1 dan/
                          Atau BPA2
                        </span>
                      </div>
                      <div className="col-span-12 md:col-span-2">
                        <div className="flex items-center gap-6">
                          <label className="inline-flex items-center gap-2">
                            <input
                              type="radio"
                              name="r3"
                              checked={r3 === true}
                              onChange={() => setR3(true)}
                            />
                            <span>Ya</span>
                          </label>
                          <label className="inline-flex items-center gap-2">
                            <input
                              type="radio"
                              name="r3"
                              checked={r3 === false}
                              onChange={() => setR3(false)}
                            />
                            <span>Tidak</span>
                          </label>
                        </div>
                      </div>
                      <div className="col-span-12 md:col-span-3 text-sm">
                        <div className="bg-blue-100 rounded px-3 py-2">
                          {r3 === true &&
                            "Ya, Isi Lampiran 5 Bagian A dan/Atau Bagian B"}
                          {r3 === false &&
                            "Tidak. Silahkan Melanjutkan ke pertanyaan berikutnya."}
                          {r3 === null && "Pilih salah satu Ya/Tidak"}
                        </div>
                      </div>
                      <div className="col-span-12 md:col-span-2">
                        <input
                          type="number"
                          min={0}
                          value={amt3}
                          onChange={(e) => setAmt3(+e.target.value || 0)}
                          className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                        />
                      </div>
                    </div>

                    {/* 4 */}
                    <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
                      <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                        <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">
                          4
                        </span>
                        <span className="text-gray-800 text-base font-medium">
                          Penghasilan Neto Setelah Pengurangan Penghasilan Neto
                          (2-3){" "}
                        </span>
                      </div>
                      <div className="col-span-12 md:col-span-5"></div>
                      <div className="col-span-12 md:col-span-2">
                        <input
                          type="number"
                          min={0}
                          value={amt4}
                          onChange={(e) => setAmt4(+e.target.value || 0)}
                          className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                        />
                      </div>
                    </div>

                    {/* 5 */}
                    <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
                      <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                        <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">
                          5
                        </span>
                        <span className="text-gray-800 text-base font-medium">
                          Penghasilan Tidak Kena Pajak
                        </span>
                      </div>
                      <div className="col-span-12 md:col-span-2">
                        <select
                          className="w-full p-2 border rounded-md text-sm"
                          value={r5}
                          onChange={(e) => setR5(e.target.value)}
                        >
                          <option value="">Please select</option>
                          <option value="K/0">K/0</option>
                          <option value="K/1">K/1</option>
                          <option value="K/2">K/2</option>
                          <option value="K/3">K/3</option>
                          <option value="TK/0">TK/0</option>
                          <option value="TK/1">TK/1</option>
                          <option value="TK/2">TK/2</option>
                          <option value="TK/3">TK/3</option>
                        </select>
                      </div>
                      <div className="col-span-12 md:col-span-3 text-sm">
                        {/* <div className="bg-blue-100 rounded px-3 py-2">
                          {r1b3 === "ya" &&
                            "Ya, saya menyusun laporan keuangan berbasis kas/laporan keuangan."}
                          {r1b3 === "tidak" &&
                            "Tidak, saya tidak menyusun laporan keuangan berbasis kas/laporan keuangan. Lanjutkan ke pertanyaan berikutnya."}
                          {r1b3 === "" && "Pilih salah satu opsi"}
                        </div> */}
                      </div>
                      <div className="col-span-12 md:col-span-2">
                        <input
                          type="number"
                          min={0}
                          value={amt5}
                          onChange={(e) => setAmt5(+e.target.value || 0)}
                          className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                        />
                      </div>
                    </div>

                    {/* 6 */}
                    <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
                      <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                        <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">
                          6
                        </span>
                        <span className="text-gray-800 text-base font-medium">
                          Penghasilan Kena Pajak (4-5){" "}
                        </span>
                      </div>
                      <div className="col-span-12 md:col-span-5"></div>
                      <div className="col-span-12 md:col-span-2">
                        <input
                          type="number"
                          min={0}
                          value={amt6}
                          onChange={(e) => setAmt6(+e.target.value || 0)}
                          className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                        />
                      </div>
                    </div>

                    {/* 7 */}
                    <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
                      <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                        <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">
                          7
                        </span>
                        <span className="text-gray-800 text-base font-medium">
                          Pph Terutang
                        </span>
                      </div>
                      <div className="col-span-12 md:col-span-5"></div>
                      <div className="col-span-12 md:col-span-2">
                        <input
                          type="number"
                          min={0}
                          value={amt7}
                          onChange={(e) => setAmt7(+e.target.value || 0)}
                          className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                        />
                      </div>
                    </div>

                    {/* 8 */}
                    <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
                      <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                        <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">
                          3
                        </span>
                        <span className="text-gray-800 text-base font-medium">
                          Apakah Terdapat Pengurangan PPh Terutang ?
                          <span className="text-red-500">*</span>
                        </span>
                      </div>
                      <div className="col-span-12 md:col-span-2">
                        <div className="flex items-center gap-6">
                          <label className="inline-flex items-center gap-2">
                            <input
                              type="radio"
                              name="r8"
                              checked={r8 === true}
                              onChange={() => setR8(true)}
                            />
                            <span>Ya</span>
                          </label>
                          <label className="inline-flex items-center gap-2">
                            <input
                              type="radio"
                              name="r8"
                              checked={r8 === false}
                              onChange={() => setR8(false)}
                            />
                            <span>Tidak</span>
                          </label>
                        </div>
                      </div>
                      <div className="col-span-12 md:col-span-3 text-sm">
                        <div className="bg-blue-100 rounded px-3 py-2">
                          {r8 === true && "Ya, Isi Lampiran 5 Bagian C "}
                          {r8 === false &&
                            "Tidak. Silahkan Melanjutkan ke pertanyaan berikutnya."}
                          {r8 === null && "Pilih salah satu Ya/Tidak"}
                        </div>
                      </div>
                      <div className="col-span-12 md:col-span-2">
                        <input
                          type="number"
                          min={0}
                          value={amt8}
                          onChange={(e) => setAmt8(+e.target.value || 0)}
                          className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Kredit Pajak */}

              <div
                className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
                onClick={() => setShowKreditPajak(!showKreditPajak)}
              >
                <h3 className="text-lg font-semibold">D. KREDIT PAJAK</h3>
                {showKreditPajak ? <FaChevronUp /> : <FaChevronDown />}
              </div>
              {showKreditPajak && (
                // Kredit Pajak

                <div className="border rounded-md p-4 mb-4">
                  <div className="divide-y">
                    {/* 10a */}
                    <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
                      <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                        <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">
                          10a
                        </span>
                        <span className="text-gray-800 text-base font-medium">
                          Apakah Terdapat Pengurangan PPh Yang Telah
                          Dipotong/Dipungut oleh pihak lain ?
                          <span className="text-red-500">*</span>
                        </span>
                      </div>
                      <div className="col-span-12 md:col-span-2">
                        <div className="flex items-center gap-6">
                          <label className="inline-flex items-center gap-2">
                            <input
                              type="radio"
                              name="r10a"
                              checked={r10a === true}
                              onChange={() => setR10a(true)}
                            />
                            <span>Ya</span>
                          </label>
                          <label className="inline-flex items-center gap-2">
                            <input
                              type="radio"
                              name="r10a"
                              checked={r10a === false}
                              onChange={() => setR10a(false)}
                            />
                            <span>Tidak</span>
                          </label>
                        </div>
                      </div>
                      <div className="col-span-12 md:col-span-3 text-sm">
                        <div className="bg-blue-100 rounded px-3 py-2">
                          {r10a === true &&
                            "Ya, Silahkan Mengisi Lampiran 1 Bagian E "}
                          {r10a === false &&
                            "Tidak. Silahkan Melanjutkan ke pertanyaan berikutnya."}
                          {r10a === null && "Pilih salah satu Ya/Tidak"}
                        </div>
                      </div>
                      <div className="col-span-12 md:col-span-2">
                        <input
                          type="number"
                          min={0}
                          value={amt10a}
                          onChange={(e) => setAmt10a(+e.target.value || 0)}
                          className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                        />
                      </div>
                    </div>

                    {/* 10b */}
                    <div className="grid grid-cols-12 gap-3 items-center px-3 py-2 ">
                      <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                        <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">
                          10b
                        </span>
                        <span className="text-gray-800 text-base font-medium ">
                          Angsuran Pph Pasal 25
                        </span>
                      </div>
                      <div className="col-span-12 md:col-span-5"></div>
                      <div className="col-span-12 md:col-span-2">
                        <input
                          type="number"
                          min={0}
                          value={amt10b}
                          onChange={(e) => setAmt10b(+e.target.value || 0)}
                          className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                        />
                      </div>
                    </div>

                    {/* 10c */}
                    <div className="grid grid-cols-12 gap-3 items-center px-3 py-2 ">
                      <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                        <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">
                          10c
                        </span>
                        <span className="text-gray-800 text-base font-medium ">
                          SPT PPh pasal 25 (Hanya Pokok Pajak){" "}
                        </span>
                      </div>
                      <div className="col-span-12 md:col-span-5"></div>
                      <div className="col-span-12 md:col-span-2">
                        <input
                          type="number"
                          min={0}
                          value={amt10c}
                          onChange={(e) => setAmt10c(+e.target.value || 0)}
                          className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                        />
                      </div>
                    </div>

                    {/* 10d */}
                    <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
                      <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                        <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">
                          10d
                        </span>
                        <span className="text-gray-800 text-base font-medium">
                          Apakah Terdapat Pengurangan PPh Yang Telah
                          Dipotong/Dipungut oleh pihak lain ?
                          <span className="text-red-500">*</span>
                        </span>
                      </div>
                      <div className="col-span-12 md:col-span-2">
                        <div className="flex items-center gap-6">
                          <label className="inline-flex items-center gap-2">
                            <input
                              type="radio"
                              name="r10d"
                              checked={r10d === true}
                              onChange={() => setR10d(true)}
                            />
                            <span>Ya</span>
                          </label>
                          <label className="inline-flex items-center gap-2">
                            <input
                              type="radio"
                              name="r10d"
                              checked={r10d === false}
                              onChange={() => setR10d(false)}
                            />
                            <span>Tidak</span>
                          </label>
                        </div>
                      </div>
                      <div className="col-span-12 md:col-span-3 text-sm">
                        <div className="bg-blue-100 rounded px-3 py-2">
                          {r10d === true &&
                            "Ya, Isi dengan Jumlah Pengembalian/Pengurangan Kredit PPh Luar Negeri "}
                          {r10d === false &&
                            "Tidak. Silahkan Melanjutkan ke pertanyaan berikutnya."}
                          {r10d === null && "Pilih salah satu Ya/Tidak"}
                        </div>
                      </div>
                      <div className="col-span-12 md:col-span-2">
                        <input
                          type="number"
                          min={0}
                          value={amt10d}
                          onChange={(e) => setAmt10d(+e.target.value || 0)}
                          className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* PPh KURANG/LEBIH BAYAR */}

              <div
                className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
                onClick={() => setShowKurangLebihBayar(!showKurangLebihBayar)}
              >
                <h3 className="text-lg font-semibold">
                  E. PPh KURANG/LEBIH BAYAR
                </h3>
                {showKurangLebihBayar ? <FaChevronUp /> : <FaChevronDown />}
              </div>
              {showKurangLebihBayar && (
                // PPh KURANG/LEBIH BAYAR

                <div className="border rounded-md p-4 mb-4">
                  <div className="divide-y">
                    {/* 11a */}
                    <div className="grid grid-cols-12 gap-3 items-center px-3 py-2 ">
                      <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                        <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">
                          11a
                        </span>
                        <span className="text-gray-800 text-base font-medium ">
                          PPh Kurang/Lebih Bayar (9 - 10a - 10b - 10c + 10d){" "}
                        </span>
                      </div>
                      <div className="col-span-12 md:col-span-5"></div>
                      <div className="col-span-12 md:col-span-2">
                        <input
                          type="number"
                          min={0}
                          value={amt11a}
                          onChange={(e) => setAmt11a(+e.target.value || 0)}
                          className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                        />
                      </div>
                    </div>

                    {/* 11b */}
                    <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
                      <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                        <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">
                          11b
                        </span>
                        <span className="text-gray-800 text-base font-medium">
                          Apakah Terdapat Surat Keputusan Persetujuan
                          Pengangsuran atau Penundaan Pembayaran Pajak?
                          {/* <span className="text-red-500">*</span> */}
                        </span>
                      </div>
                      <div className="col-span-12 md:col-span-2">
                        <div className="flex items-center gap-6">
                          <label className="inline-flex items-center gap-2">
                            <input
                              type="radio"
                              name="r11b"
                              checked={r11b === true}
                              onChange={() => setR11b(true)}
                            />
                            <span>Ya</span>
                          </label>
                          <label className="inline-flex items-center gap-2">
                            <input
                              type="radio"
                              name="r11b"
                              checked={r11b === false}
                              onChange={() => setR11b(false)}
                            />
                            <span>Tidak</span>
                          </label>
                        </div>
                      </div>
                      <div className="col-span-12 md:col-span-3 text-sm">
                        <div className="bg-blue-100 rounded px-3 py-2">
                          {r11b === true &&
                            "Ya, Isi dengan Jumlah yang telah disetujui untuk diangsur/ditunda "}
                          {r11b === false && "Tidak. Saya tidak Memiliki"}
                          {r11b === null && "Pilih salah satu Ya/Tidak"}
                        </div>
                      </div>
                      <div className="col-span-12 md:col-span-2">
                        <input
                          type="number"
                          min={0}
                          value={amt11b}
                          onChange={(e) => setAmt11b(+e.target.value || 0)}
                          className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                        />
                      </div>
                    </div>

                    {/* 11c */}
                    <div className="grid grid-cols-12 gap-3 items-center px-3 py-2 ">
                      <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                        <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">
                          11c
                        </span>
                        <span className="text-gray-800 text-base font-medium ">
                          PPh yang masih harus dibayar (11a-11b){" "}
                        </span>
                      </div>
                      <div className="col-span-12 md:col-span-5"></div>
                      <div className="col-span-12 md:col-span-2">
                        <input
                          type="number"
                          min={0}
                          value={amt11c}
                          onChange={(e) => setAmt11c(+e.target.value || 0)}
                          className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* F. PEMBETULAN  */}

              <div
                className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
                onClick={() => setShowPembetulanSPT(!showPembetulanSPT)}
              >
                <h3 className="text-lg font-semibold">
                  F. PEMBETULAN (DIISI JIKA STATUS SPT ADALAH PEMBETULAN)
                </h3>
                {showPembetulanSPT ? <FaChevronUp /> : <FaChevronDown />}
              </div>
              {showPembetulanSPT && (
                // PEMBETULAN (DIISI JIKA STATUS SPT ADALAH PEMBETULAN)

                <div className="border rounded-md p-4 mb-4">
                  <div className="divide-y">
                    {/* 12a */}
                    <div className="grid grid-cols-12 gap-3 items-center px-3 py-2 ">
                      <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                        <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">
                          12a
                        </span>
                        <span className="text-gray-800 text-base font-medium ">
                          PPh Kurang/Lebih Bayar pada SPT yang dibetulkan{" "}
                        </span>
                      </div>
                      <div className="col-span-12 md:col-span-5"></div>
                      <div className="col-span-12 md:col-span-2">
                        <input
                          type="number"
                          min={0}
                          value={amt12a}
                          onChange={(e) => setAmt12a(+e.target.value || 0)}
                          className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                        />
                      </div>
                    </div>

                    {/* 12b */}
                    <div className="grid grid-cols-12 gap-3 items-center px-3 py-2 ">
                      <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                        <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">
                          12a
                        </span>
                        <span className="text-gray-800 text-base font-medium ">
                          PPh Kurang/Lebih Bayar Karena Pembetulan (11a - 12){" "}
                          {""}
                        </span>
                      </div>
                      <div className="col-span-12 md:col-span-5"></div>
                      <div className="col-span-12 md:col-span-2">
                        <input
                          type="number"
                          min={0}
                          value={amt12b}
                          onChange={(e) => setAmt12b(+e.target.value || 0)}
                          className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* G. Permohonan Pengembalian PPh Lebih Bayar */}

              <div
                className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
                onClick={() => setShowPengembalianPPh(!showPengembalianPPh)}
              >
                <h3 className="text-lg font-semibold">
                  G. PERMOHONAN PENGEMBALIAN PPh LEBIH BAYAR (DIISI JIKA STATUS
                  SPT ADALAH LEBIH BAYAR)
                </h3>
                {showPengembalianPPh ? <FaChevronUp /> : <FaChevronDown />}
              </div>
              {showPengembalianPPh && (
                // PEMBETULAN (DIISI JIKA STATUS SPT ADALAH PEMBETULAN)

                <div className="border rounded-md p-4 mb-4">
                  <div className="divide-y">
                    {/* Lebih bayar ke BANK */}
                    <div className="grid grid-cols-12 gap-4 items-start">
                      {/* Kolom Kiri */}
                      <div className="col-span-12 md:col-span-6 self-start">
                        <div className="mb-3">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            PPh lebih bayar pada 11a atau 12b mohon:
                          </label>
                          <select
                            className="w-full p-2 border rounded-md text-sm bg-white"
                            // value={pilihan}
                            onChange={(e) => setPilihan(e.target.value)}
                          >
                            <option value="">Silakan Pilih</option>
                            <option value="rekening1">Rekening 1</option>
                            <option value="rekening2">Rekening 2</option>
                          </select>
                        </div>
                      </div>

                      {/* Kolom Kanan */}
                      <div className="col-span-12 md:col-span-6 space-y-3">
                        <div className="flex items-center gap-2">
                          <label className="text-sm text-gray-700 w-40">
                            Pilih Rekening Bank
                          </label>
                          <button className="px-3 py-2 border rounded bg-gray-100 hover:bg-gray-200">
                            📂
                          </button>
                        </div>
                        <div className="flex items-center gap-2">
                          <label className="text-sm text-gray-700 w-40">
                            Nomor Rekening
                          </label>
                          <input
                            type="text"
                            className="flex-1 p-2 border rounded-md bg-gray-100 text-sm"
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <label className="text-sm text-gray-700 w-40">
                            Nama Bank
                          </label>
                          <input
                            type="text"
                            className="flex-1 p-2 border rounded-md bg-gray-100 text-sm"
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <label className="text-sm text-gray-700 w-40">
                            Nama Pemilik Rekening
                          </label>
                          <input
                            type="text"
                            className="flex-1 p-2 border rounded-md bg-gray-100 text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* H. Angsuran PPh Pasal 25 Tahun Pajak Berikutnya  */}

              <div
                className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
                onClick={() => setShowAngsuran(!showAngsuran)}
              >
                <h3 className="text-lg font-semibold">
                  H. ANGSURAN PPh PASAL 25 TAHUN PAJAK BERIKUTNYA
                </h3>
                {showAngsuran ? <FaChevronUp /> : <FaChevronDown />}
              </div>
              {showAngsuran && (
                //Angsuran PPh Pasal 25 Tahun Pajak Berikutnya

                <div className="border rounded-md p-4 mb-4">
                  <div className="divide-y">
                    {/* 13a */}
                    <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
                      <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                        <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">
                          13a
                        </span>
                        <span className="text-gray-800 text-base font-medium">
                          Apakah Hanya Menerima Penghasilan Teratur dan
                          berkewajiban membayar angsuran PPh Pasal 25 tahun
                          pajak berikutnya
                          <span className="text-red-500">*</span>
                        </span>
                      </div>
                      <div className="col-span-12 md:col-span-2">
                        <div className="flex items-center gap-6">
                          <label className="inline-flex items-center gap-2">
                            <input
                              type="radio"
                              name="r13a"
                              checked={r13a === true}
                              onChange={() => setR13a(true)}
                            />
                            <span>Ya</span>
                          </label>
                          <label className="inline-flex items-center gap-2">
                            <input
                              type="radio"
                              name="r13a"
                              checked={r13a === false}
                              onChange={() => setR13a(false)}
                            />
                            <span>Tidak</span>
                          </label>
                        </div>
                      </div>
                      <div className="col-span-12 md:col-span-3 text-sm">
                        <div className="bg-blue-100 rounded px-3 py-2">
                          {r13a === true &&
                            "Ya, angsuran PPh pasal 25nya adalah 1/(12 atau banyaknya bulan dalam bagian tahun pajak) x Point (9-10a)"}
                          {r13a === false &&
                            "Tidak, Lanjutkan ke pertanyaan berikutnya"}
                          {r13a === null && "Pilih salah satu Ya/Tidak"}
                        </div>
                      </div>
                      <div className="col-span-12 md:col-span-2">
                        <input
                          type="number"
                          min={0}
                          value={amt13a}
                          onChange={(e) => setAmt13a(+e.target.value || 0)}
                          className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                        />
                      </div>
                    </div>

                    {/* 13b */}
                    <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
                      <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                        <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">
                          13b
                        </span>
                        <span className="text-gray-800 text-base font-medium">
                          Apakah anda menyusun perhitungan tersendiri angsuran
                          PPh pasal 25 Tahun pajak berikutnya ?
                          <span className="text-red-500">*</span>
                        </span>
                      </div>
                      <div className="col-span-12 md:col-span-2">
                        <div className="flex items-center gap-6">
                          <label className="inline-flex items-center gap-2">
                            <input
                              type="radio"
                              name="r13b"
                              checked={r13b === true}
                              onChange={() => setR13b(true)}
                            />
                            <span>Ya</span>
                          </label>
                          <label className="inline-flex items-center gap-2">
                            <input
                              type="radio"
                              name="r13b"
                              checked={r13b === false}
                              onChange={() => setR13b(false)}
                            />
                            <span>Tidak</span>
                          </label>
                        </div>
                      </div>
                      <div className="col-span-12 md:col-span-3 text-sm">
                        <div className="bg-blue-100 rounded px-3 py-2">
                          {r13b === true &&
                            "Ya, Isi lampiran 4 (L-4) Bagian A "}
                          {r13b === false &&
                            "Tidak, Lanjutkan ke pertanyaan berikutnya"}
                          {r13b === null && "Pilih salah satu Ya/Tidak"}
                        </div>
                      </div>
                      <div className="col-span-12 md:col-span-2">
                        <input
                          type="number"
                          min={0}
                          value={amt13b}
                          onChange={(e) => setAmt13b(+e.target.value || 0)}
                          className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                        />
                      </div>
                    </div>

                    {/* 13c */}
                    <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
                      <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                        <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">
                          13c
                        </span>
                        <span className="text-gray-800 text-base font-medium">
                          Apakah anda membayar angsuran PPh Pasla 25 OPPT Tahun
                          Pajak Berikutnya{" "}
                          <span className="text-red-500">*</span>
                        </span>
                      </div>
                      <div className="col-span-12 md:col-span-2">
                        <div className="flex items-center gap-6">
                          <label className="inline-flex items-center gap-2">
                            <input
                              type="radio"
                              name="r13c"
                              checked={r13c === true}
                              onChange={() => setR13c(true)}
                            />
                            <span>Ya</span>
                          </label>
                          <label className="inline-flex items-center gap-2">
                            <input
                              type="radio"
                              name="r13c"
                              checked={r13c === false}
                              onChange={() => setR13c(false)}
                            />
                            <span>Tidak</span>
                          </label>
                        </div>
                      </div>
                      <div className="col-span-12 md:col-span-3 text-sm">
                        <div className="bg-blue-100 rounded px-3 py-2">
                          {r13c === true &&
                            "Ya, Angsuran PPh Pasal 25 adalah 0.75% dari penghasilan bruto setiap bulan dari masing-masing tempat usaha"}
                          {r13c === false &&
                            "Tidak, Tidak memiliki kewajiban untuk membayar angsuran PPh Pasal 25"}
                          {r13c === null && "Pilih salah satu Ya/Tidak"}
                        </div>
                      </div>
                      <div className="col-span-12 md:col-span-2">
                        <input
                          type="number"
                          min={0}
                          value={amt13c}
                          onChange={(e) => setAmt13c(+e.target.value || 0)}
                          className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* I. Pernyataan transaksi lainnya */}

              <div
                className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
                onClick={() => setShowTransaksiLainnya(!showTransaksiLainnya)}
              >
                <h3 className="text-lg font-semibold">
                  I. PERNYATAAN TRANSAKSI LAINNYA
                </h3>
                {showTransaksiLainnya ? <FaChevronUp /> : <FaChevronDown />}
              </div>
              {showTransaksiLainnya && (
                //Pernyataan transaksi lainnya

                <div className="border rounded-md p-4 mb-4">
                  <div className="divide-y">
                    {/* 14a */}
                    <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
                      <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                        <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">
                          14a
                        </span>
                        <span className="text-gray-800 text-base font-medium">
                          Harta pada akhir tahun pajak* (Isi lampiran 1 Bagian
                          A, lalu ke pertanyaan selanjutnya)
                          <span className="text-red-500">*</span>
                        </span>
                      </div>
                      <div className="col-span-12 md:col-span-2"></div>
                      <div className="col-span-12 md:col-span-3 text-sm"></div>
                      <div className="col-span-12 md:col-span-2">
                        <input
                          type="number"
                          min={0}
                          value={amt14a}
                          onChange={(e) => setAmt14a(+e.target.value || 0)}
                          className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                        />
                      </div>
                    </div>

                    {/* 14b */}
                    <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
                      <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                        <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">
                          14b
                        </span>
                        <span className="text-gray-800 text-base font-medium">
                          Apakah anda memiliki utang pada akihir tahun pajak?
                          <span className="text-red-500">*</span>
                        </span>
                      </div>
                      <div className="col-span-12 md:col-span-2">
                        <div className="flex items-center gap-6">
                          <label className="inline-flex items-center gap-2">
                            <input
                              type="radio"
                              name="r14b"
                              checked={r14b === true}
                              onChange={() => setR14b(true)}
                            />
                            <span>Ya</span>
                          </label>
                          <label className="inline-flex items-center gap-2">
                            <input
                              type="radio"
                              name="r14b"
                              checked={r14b === false}
                              onChange={() => setR14b(false)}
                            />
                            <span>Tidak</span>
                          </label>
                        </div>
                      </div>
                      <div className="col-span-12 md:col-span-3 text-sm">
                        <div className="bg-blue-100 rounded px-3 py-2">
                          {r14b === true &&
                            "Ya, Silahkan mengisi lampiran 1 Tabel B "}
                          {r14b === false &&
                            "Tidak, Silahkan Melanjutkan ke pertanyaan berikutnya"}
                          {r14b === null && "Pilih salah satu Ya/Tidak"}
                        </div>
                      </div>
                      <div className="col-span-12 md:col-span-2">
                        <input
                          type="number"
                          min={0}
                          value={amt14b}
                          onChange={(e) => setAmt14b(+e.target.value || 0)}
                          className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                        />
                      </div>
                    </div>

                    {/* 14c */}
                    <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
                      <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                        <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">
                          14c
                        </span>
                        <span className="text-gray-800 text-base font-medium">
                          Apakah anda Menerima penghasilan yang dikenakan pajak
                          penghasilan bersifat final?
                          <span className="text-red-500">*</span>
                        </span>
                      </div>
                      <div className="col-span-12 md:col-span-2">
                        <div className="flex items-center gap-6">
                          <label className="inline-flex items-center gap-2">
                            <input
                              type="radio"
                              name="r14c"
                              checked={r14c === true}
                              onChange={() => setR14c(true)}
                            />
                            <span>Ya</span>
                          </label>
                          <label className="inline-flex items-center gap-2">
                            <input
                              type="radio"
                              name="r14c"
                              checked={r14c === false}
                              onChange={() => setR14c(false)}
                            />
                            <span>Tidak</span>
                          </label>
                        </div>
                      </div>
                      <div className="col-span-12 md:col-span-3 text-sm">
                        <div className="bg-blue-100 rounded px-3 py-2">
                          {r14c === true &&
                            "Ya, Silahkan mengisi lampiran 2 Tabel A "}
                          {r14c === false &&
                            "Tidak, Silahkan Melanjutkan ke pertanyaan berikutnya"}
                          {r14c === null && "Pilih salah satu Ya/Tidak"}
                        </div>
                      </div>
                      <div className="col-span-12 md:col-span-2">
                        <input
                          type="number"
                          min={0}
                          value={amt14c}
                          onChange={(e) => setAmt14c(+e.target.value || 0)}
                          className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                        />
                      </div>
                    </div>

                    {/* 14d */}
                    <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
                      <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                        <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">
                          14d
                        </span>
                        <span className="text-gray-800 text-base font-medium">
                          Apakah anda Menerima penghasilan yang termasuk obajek
                          pajak?
                          <span className="text-red-500">*</span>
                        </span>
                      </div>
                      <div className="col-span-12 md:col-span-2">
                        <div className="flex items-center gap-6">
                          <label className="inline-flex items-center gap-2">
                            <input
                              type="radio"
                              name="r14d"
                              checked={r14d === true}
                              onChange={() => setR14d(true)}
                            />
                            <span>Ya</span>
                          </label>
                          <label className="inline-flex items-center gap-2">
                            <input
                              type="radio"
                              name="r14d"
                              checked={r14d === false}
                              onChange={() => setR14d(false)}
                            />
                            <span>Tidak</span>
                          </label>
                        </div>
                      </div>
                      <div className="col-span-12 md:col-span-3 text-sm">
                        <div className="bg-blue-100 rounded px-3 py-2">
                          {r14d === true &&
                            "Ya, Silahkan mengisi lampiran 2 Tabel B "}
                          {r14d === false &&
                            "Tidak, Silahkan Melanjutkan ke pertanyaan berikutnya"}
                          {r14d === null && "Pilih salah satu Ya/Tidak"}
                        </div>
                      </div>
                      <div className="col-span-12 md:col-span-2">
                        <input
                          type="number"
                          min={0}
                          value={amt14d}
                          onChange={(e) => setAmt14d(+e.target.value || 0)}
                          className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                        />
                      </div>
                    </div>

                    {/* 14e */}
                    <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
                      <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                        <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">
                          14e
                        </span>
                        <span className="text-gray-800 text-base font-medium">
                          Apakah anda Melaporkan biaya penyusutan dan/atau
                          amortisasi fiskal?
                          <span className="text-red-500">*</span>
                        </span>
                      </div>
                      <div className="col-span-12 md:col-span-2">
                        <div className="flex items-center gap-6">
                          <label className="inline-flex items-center gap-2">
                            <input
                              type="radio"
                              name="r14e"
                              checked={r14e === true}
                              onChange={() => setR14e(true)}
                            />
                            <span>Ya</span>
                          </label>
                          <label className="inline-flex items-center gap-2">
                            <input
                              type="radio"
                              name="r14e"
                              checked={r14e === false}
                              onChange={() => setR14e(false)}
                            />
                            <span>Tidak</span>
                          </label>
                        </div>
                      </div>
                      <div className="col-span-12 md:col-span-3 text-sm">
                        <div className="bg-blue-100 rounded px-3 py-2">
                          {r14e === true && "Ya, Silahkan mengisi lampiran 3C "}
                          {r14e === false &&
                            "Tidak, Silahkan Melanjutkan ke pertanyaan berikutnya"}
                          {r14e === null && "Pilih salah satu Ya/Tidak"}
                        </div>
                      </div>
                      <div className="col-span-12 md:col-span-2">
                        <input
                          type="number"
                          min={0}
                          value={amt14e}
                          onChange={(e) => setAmt14e(+e.target.value || 0)}
                          className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                        />
                      </div>
                    </div>

                    {/* 14f */}
                    <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
                      <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                        <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">
                          14f
                        </span>
                        <span className="text-gray-800 text-base font-medium">
                          Apakah anda melaporkan biaya entertainment, buaya
                          promosi, penggantian atau imbalan dalam bentuk natura
                          dan/atau kenikmatan, serta piutang yang nyata-nyata
                          tidak dapat ditagih?
                          <span className="text-red-500">*</span>
                        </span>
                      </div>
                      <div className="col-span-12 md:col-span-2">
                        <div className="flex items-center gap-6">
                          <label className="inline-flex items-center gap-2">
                            <input
                              type="radio"
                              name="r14f"
                              checked={r14f === true}
                              onChange={() => setR14f(true)}
                            />
                            <span>Ya</span>
                          </label>
                          <label className="inline-flex items-center gap-2">
                            <input
                              type="radio"
                              name="r14f"
                              checked={r14f === false}
                              onChange={() => setR14f(false)}
                            />
                            <span>Tidak</span>
                          </label>
                        </div>
                      </div>
                      <div className="col-span-12 md:col-span-3 text-sm">
                        <div className="bg-blue-100 rounded px-3 py-2">
                          {r14f === true && "Ya, Silahkan mengisi lampiran 3D "}
                          {r14f === false &&
                            "Tidak, Silahkan Melanjutkan ke pertanyaan berikutnya"}
                          {r14f === null && "Pilih salah satu Ya/Tidak"}
                        </div>
                      </div>
                      <div className="col-span-12 md:col-span-2">
                        <input
                          type="number"
                          min={0}
                          value={amt14f}
                          onChange={(e) => setAmt14f(+e.target.value || 0)}
                          className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                        />
                      </div>
                    </div>

                    {/* 14g */}
                    <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
                      <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                        <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">
                          14g
                        </span>
                        <span className="text-gray-800 text-base font-medium">
                          Apakah anda Menerima Dividen dan/atau penghasilan lain
                          dari neger dan melaporkannya sebagai penghasilan tidak
                          termasuk obejek pajak?
                          <span className="text-red-500">*</span>
                        </span>
                      </div>
                      <div className="col-span-12 md:col-span-2">
                        <div className="flex items-center gap-6">
                          <label className="inline-flex items-center gap-2">
                            <input
                              type="radio"
                              name="r14g"
                              checked={r14g === true}
                              onChange={() => setR14g(true)}
                            />
                            <span>Ya</span>
                          </label>
                          <label className="inline-flex items-center gap-2">
                            <input
                              type="radio"
                              name="r14g"
                              checked={r14g === false}
                              onChange={() => setR14g(false)}
                            />
                            <span>Tidak</span>
                          </label>
                        </div>
                      </div>
                      <div className="col-span-12 md:col-span-3 text-sm">
                        <div className="bg-blue-100 rounded px-3 py-2">
                          {r14g === true &&
                            "Ya, Pastikan anda sudah menyampiakan laporan realisasi investasi secara terpisah"}
                          {r14g === false &&
                            "Tidak, Silahkan Melanjutkan ke pertanyaan berikutnya"}
                          {r14g === null && "Pilih salah satu Ya/Tidak"}
                        </div>
                      </div>
                      <div className="col-span-12 md:col-span-2">
                        <input
                          type="number"
                          min={0}
                          value={amt14g}
                          onChange={(e) => setAmt14g(+e.target.value || 0)}
                          className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                        />
                      </div>
                    </div>

                    {/* 14h */}
                    <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
                      <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                        <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">
                          14h
                        </span>
                        <span className="text-gray-800 text-base font-medium">
                          Kelebihan PPh Final atas penghasilan dari usaha dengan
                          peredaran Bruto tertentu yang dapat dimintakan
                          pengembalian. (Silahkan mengajukan permohonan
                          pengembalian pajak yang seharusnya tidak terhutang
                          secara terpisah){" "}
                          <span className="text-red-500">*</span>
                        </span>
                      </div>
                      <div className="col-span-12 md:col-span-2"></div>
                      <div className="col-span-12 md:col-span-3 text-sm"></div>
                      <div className="col-span-12 md:col-span-2">
                        <input
                          type="number"
                          min={0}
                          value={amt14g}
                          onChange={(e) => setAmt14g(+e.target.value || 0)}
                          className="w-full text-center p-2 border rounded-md bg-gray-200 text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* I. LAMPIRAN TAMBAHAN */}

              <div
                className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
                onClick={() => setShowLampiranTambahan(!showLampiranTambahan)}
              >
                <h3 className="text-lg font-semibold">
                  J. PERNYATAAN TRANSAKSI LAINNYA
                </h3>
                {showLampiranTambahan ? <FaChevronUp /> : <FaChevronDown />}
              </div>
              {showLampiranTambahan && (
                //Pernyataan transaksi lainnya

                <div className="border rounded-md p-4 mb-4">
                  <div className="divide-y">
                    {/* J-a*/}
                    <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
                      <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                        <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">
                          a
                        </span>
                        <span className="text-gray-800 text-base font-medium">
                          Laporan Keuangan / Laporan keuangan yang telah diaudit
                          {/* <span className="text-red-500">*</span> */}
                        </span>
                      </div>
                      <div className="col-span-12 md:col-span-2">
                        <div className="flex items-center gap-6">
                          <label className="inline-flex items-center gap-2">
                            <input
                              type="radio"
                              name="ra"
                              checked={ra === true}
                              onChange={() => setRa(true)}
                            />
                            <span>Ya</span>
                          </label>
                          <label className="inline-flex items-center gap-2">
                            <input
                              type="radio"
                              name="ra"
                              checked={ra === false}
                              onChange={() => setRa(false)}
                            />
                            <span>Tidak</span>
                          </label>
                        </div>
                      </div>
                      <div className="col-span-12 md:col-span-3 text-sm">
                        <div className="bg-blue-100 rounded px-3 py-2">
                          {ra === true &&
                            "Ya, Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
                          {ra === false &&
                            "Tidak, Jenis Pembukaan adalah Pembukaan Sederhana"}
                          {ra === null && "Pilih salah satu Ya/Tidak"}
                        </div>
                      </div>
                    </div>

                    {/* J-b*/}
                    <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
                      <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                        <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">
                          b
                        </span>
                        <span className="text-gray-800 text-base font-medium">
                          Bukti Pembayaran Zakat /sumbangan keagamaan
                          {/* <span className="text-red-500">*</span> */}
                        </span>
                      </div>
                      <div className="col-span-12 md:col-span-2">
                        <div className="flex items-center gap-6">
                          <label className="inline-flex items-center gap-2">
                            <input
                              type="radio"
                              name="rb"
                              checked={rb === true}
                              onChange={() => setRb(true)}
                            />
                            <span>Ya</span>
                          </label>
                          <label className="inline-flex items-center gap-2">
                            <input
                              type="radio"
                              name="rb"
                              checked={rb === false}
                              onChange={() => setRb(false)}
                            />
                            <span>Tidak</span>
                          </label>
                        </div>
                      </div>
                      <div className="col-span-12 md:col-span-3 text-sm">
                        <div className="bg-blue-100 rounded px-3 py-2">
                          {rb === true &&
                            "Ya, Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
                          {rb === false &&
                            "Tidak, Tidak ada Berkas yang perlu dilampirkan "}
                          {rb === null && "Pilih salah satu Ya/Tidak"}
                        </div>
                      </div>
                    </div>

                    {/* J-c*/}
                    <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
                      <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                        <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">
                          c
                        </span>
                        <span className="text-gray-800 text-base font-medium">
                          Bukti Pemotongan/Pemumutan sehubung dengan kredit
                          pajak luar negeri
                          {/* <span className="text-red-500">*</span> */}
                        </span>
                      </div>
                      <div className="col-span-12 md:col-span-2">
                        <div className="flex items-center gap-6">
                          <label className="inline-flex items-center gap-2">
                            <input
                              type="radio"
                              name="rc"
                              checked={rc === true}
                              onChange={() => setRc(true)}
                            />
                            <span>Ya</span>
                          </label>
                          <label className="inline-flex items-center gap-2">
                            <input
                              type="radio"
                              name="rc"
                              checked={rc === false}
                              onChange={() => setRc(false)}
                            />
                            <span>Tidak</span>
                          </label>
                        </div>
                      </div>
                      <div className="col-span-12 md:col-span-3 text-sm">
                        <div className="bg-blue-100 rounded px-3 py-2">
                          {rc === true &&
                            "Ya, Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
                          {rc === false &&
                            "Tidak, Tidak ada Berkas yang perlu dilampirkan "}
                          {rc === null && "Pilih salah satu Ya/Tidak"}
                        </div>
                      </div>
                    </div>

                    {/* J-d*/}
                    <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
                      <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                        <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">
                          d
                        </span>
                        <span className="text-gray-800 text-base font-medium">
                          Surat Kuasa (Hanya untuk SPT Kertas)
                          <span className="text-red-500">*</span>
                        </span>
                      </div>
                      <div className="col-span-12 md:col-span-2">
                        <div className="flex items-center gap-6">
                          <label className="inline-flex items-center gap-2">
                            <input
                              type="radio"
                              name="rd"
                              checked={rd === true}
                              onChange={() => setRd(true)}
                            />
                            <span>Ya</span>
                          </label>
                          <label className="inline-flex items-center gap-2">
                            <input
                              type="radio"
                              name="rd"
                              checked={rd === false}
                              onChange={() => setRd(false)}
                            />
                            <span>Tidak</span>
                          </label>
                        </div>
                      </div>
                      <div className="col-span-12 md:col-span-3 text-sm">
                        <div className="bg-blue-100 rounded px-3 py-2">
                          {rd === true &&
                            "Ya, Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
                          {rd === false &&
                            "Tidak, Lorem ipsum dolor sit amet, consectetur adipiscing elit. "}
                          {rd === null && "Pilih salah satu Ya/Tidak"}
                        </div>
                      </div>
                    </div>

                      {/* J-e*/}
                    <div className="grid grid-cols-12 gap-3 items-center px-3 py-2">
                      <div className="col-span-12 md:col-span-5 flex gap-3 items-center">
                        <span className="pt-1 text-gray-700 font-medium min-w-[3.5rem]">
                          e
                        </span>
                        <span className="text-gray-800 text-base font-medium">
                          Dokumen Lainnya
                          <span className="text-red-500">*</span>
                        </span>
                      </div>
                      <div className="col-span-12 md:col-span-2">
                        <div className="flex items-center gap-6">
                          <label className="inline-flex items-center gap-2">
                            <input
                              type="radio"
                              name="re"
                              checked={re === true}
                              onChange={() => setRe(true)}
                            />
                            <span>Ya</span>
                          </label>
                          <label className="inline-flex items-center gap-2">
                            <input
                              type="radio"
                              name="re"
                              checked={re === false}
                              onChange={() => setRe(false)}
                            />
                            <span>Tidak</span>
                          </label>
                        </div>
                      </div>
                      <div className="col-span-12 md:col-span-3 text-sm">
                        <div className="bg-blue-100 rounded px-3 py-2">
                          {re === true &&
                            "Ya, Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
                          {re === false &&
                            "Tidak, Lorem ipsum dolor sit amet, consectetur adipiscing elit. "}
                          {re === null && "Pilih salah satu Ya/Tidak"}
                        </div>
                      </div>
                    </div>
                    
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default CreateKonsepPribadi;
