import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import DatePicker from "react-datepicker";
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
} from "./section";
import {
  Header,
  Lampiran1A,
  Lampiran1B,
  Lampiran1C,
  Lampiran1D,
  Lampiran1E,
  Lampiran1F,
  Lampiran2,
  Lampiran3,
  Lampiran4,
  Lampiran5,
  Lampiran9,
  Lampiran10A,
  Lampiran10B,
  Lampiran10C,
  Lampiran10D,
  Lampiran11A,
  Lampiran11B,
  Lampiran11C,
  Lampiran13A,
  Lampiran14,
} from "../Lampiran";

const CreateKonsepBadan = () => {
  const [showHeaderInduk, setShowHeaderInduk] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // STEP 4: Central state untuk semua jawaban
  const [answersState, setAnswersState] = useState({
    r1a: null, // 1.a - trigger Lampiran I
    // r1b1: null, // 1.b.1 - trigger Lampiran I
  });

  // STEP 5: State untuk lampiran yang aktif
  const [dynamicLampiran, setDynamicLampiran] = useState([]);

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

  const updateAnswer = (questionKey, value) => {
    setAnswersState((prev) => ({
      ...prev,
      [questionKey]: value,
    }));
  };

  // STEP 7: Effect untuk mengelola lampiran berdasarkan jawaban
  useEffect(() => {
    const allLampiran = [];

    allLampiran.push({
      id: "lampiran-1A",
      title: "L1-A",
      subtitle: "Lampiran 1A - UMUM",
      component: "Lampiran_1A",
      badge: "Tersedia",
      order: 1,
    });
    allLampiran.push({
      id: "lampiran-1B",
      title: "L1-B",
      subtitle: "Lampiran 1B - MANUFAKTUR",
      component: "Lampiran_1B",
      badge: "Tersedia",
      order: 1, // Urutan pertama
    });

    allLampiran.push({
      id: "lampiran-1C",
      title: "L1-C",
      subtitle: "Lampiran 1C - DAGANG",
      component: "Lampiran_1C",
      badge: "Tersedia",
      order: 1, // Urutan pertama
    });

    allLampiran.push({
      id: "lampiran-1D",
      title: "L1-D",
      subtitle: "Lampiran 1D - JASA",
      component: "Lampiran_1D",
      badge: "Tersedia",
      order: 1, // Urutan pertama
    });
    allLampiran.push({
      id: "lampiran-1E",
      title: "L1-E",
      subtitle: "Lampiran 1E - BANK KONVENSIONAL",
      component: "Lampiran_1E",
      badge: "Tersedia",
      order: 1, // Urutan pertama
    });

    allLampiran.push({
      id: "lampiran-1F",
      title: "L1-F",
      subtitle: "Lampiran 1F - DANA PENSIUN",
      component: "Lampiran_1F",
      badge: "Tersedia",
      order: 1, // Urutan pertama
    });

    allLampiran.push({
      id: "lampiran-2",
      title: "L2",
      subtitle: "Lampiran II - Daftar Harta dan Kewajiban",
      component: "Lampiran_2",
      badge: "Tersedia",
      order: 3, // Urutan ketiga
    });
    allLampiran.push({
      id: "lampiran-3",
      title: "L3",
      subtitle: "Lampiran III - Penghasilan dari Luar Negeri",
      component: "Lampiran_3",
      badge: "Tersedia",
      order: 4, // Urutan keempat
    });
    allLampiran.push({
      id: "lampiran-4",
      title: "L4",
      subtitle:
        "Lampiran IV - Penghasilan yang Dikenalakn Pajak Final dan Daftar Penghasilan yang Bukan Objek Pajak",
      component: "Lampiran_4",
      badge: "Tersedia",
      order: 5, // Urutan kelima
    });

    allLampiran.push({
      id: "lampiran-5",
      title: "L5",
      subtitle: "Lampiran v -Rekapitulasi Peredaran Bruto",
      component: "Lampiran_5",
      badge: "Tersedia",
      order: 6,
    });

    allLampiran.push({
      id: "lampiran-9",
      title: "L9",
      subtitle: "Lampiran IX - Harta Berwujud",
      component: "Lampiran_9",
      badge: "Tersedia",
      order: 7,
    });

    allLampiran.push({
      id: "lampiran-10A",
      title: "L10-A",
      subtitle: "Lampiran 10A - Daftar Transaksi yang Dipengaruhi Hubungan Istimewa",
      component: "Lampiran_10A",
      badge: "Tersedia",
      order: 8,
    });
    allLampiran.push({
      id: "lampiran-10B",
      title: "L10-B",
      subtitle: "Lampiran 10B - Pernyataan Terkait Transaksi yang Dipengaruhi Hubungan Istimewa",
      component: "Lampiran_10B",
      badge: "Tersedia",
      order: 9,
    });

    allLampiran.push({
      id: "lampiran-10C",
      title: "L10-C",
      subtitle:
        "Lampiran 10C - PERNYATAAN TRANSAKSI DENGAN PIHAK YANG MERUPAKAN PENDUDUK TAX HAVEN COUNTRY",
      component: "Lampiran_10C",
      badge: "Tersedia",
      order: 10,
    });

    allLampiran.push({
      id: "lampiran-10D",
      title: "L10-D",
      subtitle: "Lampiran 10D - IKHTISAR DOKUMEN INDUK DAN DOKUMEN LOKAL",
      component: "Lampiran_10D",
      badge: "Tersedia",
      order: 11,
    });

    allLampiran.push({
      id: "lampiran-11A",
      title: "L11-A",
      subtitle: "Lampiran 11A - RINCIAN BIAYA TERTENTU",
      component: "Lampiran_11A",
      badge: "Tersedia",
      order: 12,
    });

    allLampiran.push({
      id: "lampiran-11B",
      title: "L11-B",
      subtitle:
        "Lampiran 11B - PENGHITUNGAN BIAYA PINJAMAN YANG DAPAT DIBEBANKAN UNTUK KEPERLUAN PENGHITUNGAN PAJAK PENGHASILAN",
      component: "Lampiran_11B",
      badge: "Tersedia",
      order: 13,
    });

    allLampiran.push({
      id: "lampiran-11C",
      title: "L11-C",
      subtitle: "Lampiran 11C - LAPORAN UTANG SWASTA LUAR NEGERI",
      component: "Lampiran_11C",
      badge: "Tersedia",
      order: 13,
    });

    allLampiran.push({
      id: "lampiran-13A",
      title: "L13-A",
      subtitle: "Lampiran 13A - FASILITAS PERPAJAKAN DALAM RANGKA PENANAMAN MODAL",
      component: "Lampiran_13A",
      badge: "Tersedia",
      order: 13,
    });

    allLampiran.push({
      id: "lampiran-14",
      title: "L14",
      subtitle:
        "Lampiran 14 - PENGGUNAAN SISA LEBIH UNTUK PEMBANGUNAN DAN PENGADAAN SARANA DAN PRASARANA",
      component: "Lampiran_14",
      badge: "Tersedia",
      order: 14,
    });
    // if (answersState.r1a === true) {
    //   allLampiran.push({
    //     id: "lampiran-1",
    //     title: "L-1B",
    //     subtitle: "Lampiran I - Penghasilan dari Pekerjaan",
    //     component: "Lampiran_1B",
    //     badge: "Wajib Diisi",
    //     order: 1, // Urutan pertama
    //   });
    // }

    // CUSTOM SORTING berdasarkan property 'order'
    const sortedLampiran = allLampiran.sort((a, b) => {
      return a.order - b.order; // Sort berdasarkan order, bukan ID
    });

    setDynamicLampiran(sortedLampiran);
  }, [answersState]);

  // STEP 8: Function untuk render content lampiran (Import lampiran ditampilkan di atas)
  const renderLampiranContent = (componentName, data) => {
    switch (componentName) {
      case "Lampiran_1A":
        return <Lampiran1A data={data} />;
      case "Lampiran_1B":
        return <Lampiran1B data={data} />;
      case "Lampiran_1C":
        return <Lampiran1C data={data} />;
      case "Lampiran_1D":
        return <Lampiran1D data={data} />;
      case "Lampiran_1E":
        return <Lampiran1E data={data} />;
      case "Lampiran_1F":
        return <Lampiran1F data={data} />;
      case "Lampiran_2":
        return <Lampiran2 data={data} />;
      case "Lampiran_3":
        return <Lampiran3 data={data} />;
      case "Lampiran_4":
        return <Lampiran4 data={data} />;
      case "Lampiran_5":
        return <Lampiran5 data={data} />;
      case "Lampiran_9":
        return <Lampiran9 data={data} />;
      case "Lampiran_10A":
        return <Lampiran10A data={data} />;
      case "Lampiran_10B":
        return <Lampiran10B data={data} />;
      case "Lampiran_10C":
        return <Lampiran10C data={data} />;
      case "Lampiran_10D":
        return <Lampiran10D data={data} />;
      case "Lampiran_11A":
        return <Lampiran11A data={data} />;
      case "Lampiran_11B":
        return <Lampiran11B data={data} />;
      case "Lampiran_11C":
        return <Lampiran11C data={data} />;
      case "Lampiran_13A":
        return <Lampiran13A data={data} />;
      case "Lampiran_14":
        return <Lampiran14 data={data} />;

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
            SPT TAHUNAN PAJAK PENGHASILAN (PPh) WAJIB PAJAK BADAN
          </h2>
        </div>

        <div className="w-full p-2 ml-0 border-t text-lg">
          <Tabs defaultValue="induk" onValueChange={(val) => setShowHeaderInduk(val === "induk")}>
            <TabsList className="flex justify-start gap-2 text-blue-700 text-lg">
              <TabsTrigger value="induk">Induk</TabsTrigger>
              {/* Dynamic Lampiran Tabs */}
              {dynamicLampiran.map((lampiran) => (
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
                  {showHeaderInduk ? <FaChevronUp /> : <FaChevronDown />}
                </div>

                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    showHeaderInduk ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="border rounded-md p-4 mb-4">
                    <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-gray-700 font-medium mb-2 block">Tahun Pajak</label>
                        <DatePicker
                          className="w-72 p-2 border rounded-md bg-white text-gray-600"
                          showYearPicker
                          dateFormat="yyyy"
                        />
                      </div>
                      <div>
                        <label className="text-gray-700 font-medium mb-2 block">Status</label>
                        <select className="w-72 p-2 border rounded-md bg-gray-100 text-gray-600">
                          <option value="1">Normal</option>
                          <option value="2">Pembetulan</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-gray-700 font-medium mb-2 block">
                          Periode Pembukuan
                        </label>
                        <div className="flex gap-4">
                          <input
                            type="text"
                            className="w-32 p-2 border rounded-md bg-white text-gray-600"
                            value="01"
                            readOnly
                          />
                          <input
                            type="text"
                            className="w-32 p-2 border rounded-md bg-white text-gray-600"
                            value="12"
                            readOnly
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-gray-700 font-medium mb-2 block">
                          Metode Pembukuan
                        </label>
                        <select className="w-72 p-2 border rounded-md bg-gray-100 text-gray-600">
                          <option value="1">Penuh</option>
                          <option value="2">Sederhana</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <PertanyaanA />
              <PertanyaanB />
              <PertanyaanC />
              <PertanyaanD />
              <PertanyaanE />
              <PertanyaanF />
              <PertanyaanG />
              <PertanyaanH />
              <PertanyaanI />
              <PertanyaanJ />
            </TabsContent>

            {/* Dynamic Lampiran Content */}
            {dynamicLampiran.map((lampiran) => (
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

export default CreateKonsepBadan;
