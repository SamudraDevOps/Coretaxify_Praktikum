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
import TandaTangan from "../../../TandaTangan";
import Select from "react-select";
import {
  PertanyaanA,
  PertanyaanB,
  PertanyaanC,
  PertanyaanD,
  PertanyaanE,
  PertanyaanF,
  PertanyaanG,
  PertanyaanH,
  PertanyaanI,
  PertanyaanJ,
} from "./sections";
import {
  Lampiran_1,
  Lampiran_2,
  Lampiran_3A1,
  Lampiran_3B,
  Lampiran_3C,
  Lampiran_3D,
  Lampiran_4,
  Lampiran_5,
} from "../Lampiran";

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
  const [showIkhtisarPenghasilanNeto, setShowIkhtisarPenghasilanNeto] = useState(false);
  const [showPerhitunganPajakTerutang, setShowPerhitunganPajakTerutang] = useState(false);
  const [showKreditPajak, setShowKreditPajak] = useState(false);
  const [showKurangLebihBayar, setShowKurangLebihBayar] = useState(false);
  const [showPembetulanSPT, setShowPembetulanSPT] = useState(false);
  const [showPengembalianPPh, setShowPengembalianPPh] = useState(false);
  const [showAngsuran, setShowAngsuran] = useState(false);
  const [showTransaksiLainnya, setShowTransaksiLainnya] = useState(false);
  const [showLampiranTambahan, setShowLampiranTambahan] = useState(false);

  const [showScrollTop, setShowScrollTop] = useState(false);

  const sumberOptions = ["Kegiatan Usaha", "Pekerjaan", "Pekerjaan Bebas"];
  const metodeOptions = ["Pembukuan stelsel akrual", "Pembukuan stelsel kas", "Pencatatan"];

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

  // STEP 4: Central state untuk semua jawaban

  const [answersState, setAnswersState] = useState({
    r1a: null, // 1.a - trigger Lampiran I
    r1b1: null, // 1.b.1 - trigger Lampiran I
    r1b2: null, // 1.b.2 - Trigger Lampiran 3B
    hasPenghasilanUsaha: null, // 1.b.1 - trigger Lampiran 3A-4
    hasPenghasilanLainnya: null, // 1.c
    hasPenghasilanLuarNegeri: null, // 1.d - trigger Lampiran 2
    amt1a: 0, // Amount untuk lampiran
  });

  // STEP 5: State untuk lampiran yang aktif

  const [dynamicLampiran, setDynamicLampiran] = useState([]);
  const availableLampiran = dynamicLampiran;

  // STEP 6: Function yang menerima data dari child components

  const updateAnswer = (questionKey, value) => {
    setAnswersState((prev) => ({
      ...prev,
      [questionKey]: value,
    }));
  };

  // STEP 7: Effect untuk mengelola lampiran berdasarkan jawaban
  useEffect(() => {
    const allLampiran = [];

    // const newDynamicLampiran = [];

    // Lampiran I - Penghasilan dari Pekerjaan (1.a = Ya)
    // allLampiran.push({
    //   id: "lampiran-1",
    //   title: "L-I",
    //   subtitle: "Lampiran I - Penghasilan dari Pekerjaan",
    //   component: "Lampiran_1",
    //   badge: "Tersedia",
    //   order: 1, // Urutan pertama
    // });

    if (answersState.r1a === true) {
      allLampiran.push({
        id: "lampiran-1",
        title: "L-I",
        subtitle: "Lampiran I - Penghasilan dari Pekerjaan",
        component: "Lampiran_1",
        badge: "Wajib Diisi",
        order: 1, // Urutan pertama
      });
    }

    // Lampiran 2 - SELALU TERSEDIA

    allLampiran.push({
      id: "lampiran-2",
      title: "L-II",
      subtitle: "Lampiran 2 - Penghasilan Luar Negeri",
      component: "Lampiran_2",
      badge: "Tersedia",
      order: 2, // Urutan kedua
    });

    // Lampiran 3A1 - SELALU TERSEDIA

    allLampiran.push({
      id: "lampiran-3A1",
      title: "L-3A-1",
      subtitle: "Lampiran 3A1 - Rekonsiliasi Laporan Keuangan ",
      component: "Lampiran_3A1",
      badge: "Tersedia",
      order: 3,
    });

    // Lampiran 3B - Muncul jika r1b2 === "ya_final" ATAU "ya_oppt"
    if (answersState.r1b2 === "ya_final" || answersState.r1b2 === "ya_oppt") {
      allLampiran.push({
        id: "lampiran-3B",
        title: "L-3B",
        subtitle: "Lampiran 3B - Daftar Tempat Kegiatan Usaha (TKU)",
        component: "Lampiran_3B",
        badge: answersState.r1b2 === "ya_final" ? "Wajib Diisi" : "Wajib Diisi",
        order: 4,
      });
    }

    // Lampiran 3C - SELALU TERSEDIA

    allLampiran.push({
      id: "lampiran-3C",
      title: "L-3C",
      subtitle: "Lampiran 3C - Daftar Harta Berwujud",
      component: "Lampiran_3C",
      badge: "Tersedia",
      order: 5,
    });

    // Lampiran 3D - SELALU TERSEDIA

    allLampiran.push({
      id: "lampiran-3D",
      title: "L-3D",
      subtitle: "Lampiran 3D - Daftar Harta Tidak Berwujud",
      component: "Lampiran_3D",
      badge: "Tersedia",
      order: 6,
    });

    // Lampiran 4 - SELALU TERSEDIA
    allLampiran.push({
      id: "lampiran-4",
      title: "L-4",
      subtitle: "Lampiran 4 - Perhitungan Angsuran PPh Pasal 25 Tahun Berikutnya",
      component: "Lampiran_4",
      badge: "Tersedia",
      order: 7,
    });

    // Lampiran 5 - SELALU TERSEDIA
    allLampiran.push({
      id: "lampiran-5",
      title: "L-5",
      subtitle: "Lampiran 5 - Perhitungan Angsuran PPh Pasal 25 Tahun Berikutnya",
      component: "Lampiran_5",
      badge: "Tersedia",
      order: 7,
    });

    // Lampiran 3A-4 - Penghasilan dari Usaha (1.b.1 = Ya)
    if (answersState.hasPenghasilanUsaha === true) {
      allLampiran.push({
        id: "lampiran-3a4",
        title: "L-3A4",
        subtitle: "Lampiran 3A-4 - Penghasilan dari Usaha",
        component: "Lampiran_3A4",
        badge: "Wajib Diisi",
      });
    }

    // CUSTOM SORTING berdasarkan property 'order'
    const sortedLampiran = allLampiran.sort((a, b) => {
      return a.order - b.order; // Sort berdasarkan order, bukan ID
    });

    setDynamicLampiran(sortedLampiran);
  }, [answersState]);

  // STEP 8: Function untuk render content lampiran (Import lampiran ditampilkan di atas)
  const renderLampiranContent = (componentName, data) => {
    switch (componentName) {
      case "Lampiran_1":
        return <Lampiran_1 data={data} />;
      case "Lampiran_2":
        return <Lampiran_2 data={data} />;
      case "Lampiran_3A1":
        return <Lampiran_3A1 data={data} />;
      case "Lampiran_3B":
        return <Lampiran_3B data={data} />;
      case "Lampiran_3C":
        return <Lampiran_3C data={data} />;
      case "Lampiran_3D":
        return <Lampiran_3D data={data} />;
      case "Lampiran_4":
        return <Lampiran_4 data={data} />;
      case "Lampiran_5":
        return <Lampiran_5 data={data} />;
      default:
        return (
          <div className="text-center py-8">
            <p className="text-gray-500">Lampiran dalam pengembangan</p>
          </div>
        );
    }
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
              {/* Dynamic Lampiran Tabs */}

              {availableLampiran.map((lampiran) => (
                <TabsTrigger
                  key={lampiran.id}
                  value={lampiran.id}
                  className="whitespace-nowrap relative"
                  title={lampiran.subtitle}
                >
                  {lampiran.title}
                  {lampiran.badge && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
                      !
                    </span>
                  )}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value="induk">
              <div className="mt-4">
                <div
                  className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
                  onClick={() => setShowHeaderInduk(!showHeaderInduk)}
                >
                  <h3 className="text-lg font-semibold">HEADER</h3>
                  <span
                    className={`transition-transform duration-500 ${
                      showHeaderInduk ? "rotate-180" : "rotate-0"
                    }`}
                  >
                    <FaChevronDown />
                  </span>
                </div>
                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    showHeaderInduk ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
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
                        <label className="block mb-2 text-sm font-base text-gray-900">Status</label>
                        <input
                          readOnly
                          // value={data.status}
                          className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                        />
                      </div>

                      <div className="col-span-12 md:col-span-3 self-start">
                        <label className="block mb-2 text-sm font-base text-gray-900">
                          Sumber Penghasilan <span className="text-red-500">*</span>
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
                          Sumber Penghasilan <span className="text-red-500">*</span>
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
                </div>
              </div>

              {/* Identitas Waib Pajak */}
              <PertanyaanA />

              {/* khtisar Penghasilan Neto */}
              <PertanyaanB onAnswerChange={updateAnswer} answersState={answersState} />

              {/* Perhitungan Pajak Teruntang */}

              <PertanyaanC />

              {/* Kredit Pajak */}

              <PertanyaanD />
              {/* PPh KURANG/LEBIH BAYAR */}

              <PertanyaanE />
              {/* F. PEMBETULAN  */}

              <PertanyaanF />

              {/* G. Permohonan Pengembalian PPh Lebih Bayar */}

              <PertanyaanG />

              {/* H. Angsuran PPh Pasal 25 Tahun Pajak Berikutnya  */}

              <PertanyaanH />

              {/* I. Pernyataan transaksi lainnya */}

              <PertanyaanI />

              {/* J. LAMPIRAN TAMBAHAN */}

              <PertanyaanJ />
            </TabsContent>

            {/* Dynamic Lampiran Content */}
            {availableLampiran.map((lampiran) => (
              <TabsContent key={lampiran.id} value={lampiran.id}>
                <div className="mt-4">
                  {/* Render komponen lampiran */}
                  {renderLampiranContent(lampiran.component, answersState)}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default CreateKonsepPribadi;
