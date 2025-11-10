import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import HeaderLampiran from "./HeaderLampiran";
// import { KasDanSetaraKas, Piutang} from "./sections/Lampiran1";
import KasDanSetaraKas from "./sections/Lampiran1/BagianA/KasDanSetaraKas";
import Piutang from "./sections/Lampiran1/BagianA/Piutang";
import Investasi from "./sections/Lampiran1/BagianA/Investasi";
import HartaBergerak from "./sections/Lampiran1/BagianA/HartaBergerak";
import HartaTidakBergerak from "./sections/Lampiran1/BagianA/HartaTidakBergerak";
import HartaLainnya from "./sections/Lampiran1/BagianA/HartaLainnya";
import UtangAkhir from "./sections/Lampiran1/BagianA/UtangAkhir";
import PenghasilanNeto from "./sections/Lampiran1/BagianA/PenghasilanNeto";
import Pemotongan from "./sections/Lampiran1/BagianA/BuktiPemotongan";

import {
  // Piutang,
  // Investasi,
  // HartaBergerak,
  // HartaTidakBergerak,
  // KasdanSetaraKas,
  // HartaLainnya,
  Ikhtisar,
  // UtangAkhir,
  // Penghasilan,
  // Pemotongan,
} from "./sections/Lampiran1";

const Lampiran_1 = ({ data }) => {
  const [showBagianA, setShowBagianA] = useState(true);
  const [showBagianB, setShowBagianB] = useState(false);
  const [showBagianC, setShowBagianC] = useState(false);
  const [showBagianD, setShowBagianD] = useState(false);
  const [showBagianE, setShowBagianE] = useState(false);

  // State untuk sub-bagian dalam Bagian A
  const [showKasdanSetaraKas, setShowKasdanSetaraKas] = useState(false);
  const [showPiutang, setShowPiutang] = useState(false);
  const [showInvestasi, setShowInvestasi] = useState(false);
  const [showHartaBergerak, setShowHartaBergerak] = useState(false);
  const [showHartaTidakBergerak, setShowHartaTidakBergerak] = useState(false);
  const [showHartaLainnya, setShowHartaLainnya] = useState(false);
  const [showIkhtisar, setShowIkhtisar] = useState(false);

  // State untuk data lampiran
  const [formData, setFormData] = useState({
    // Bagian A - Data Pemberi Kerja
    namaPemberiKerja: "",
    npwpPemberiKerja: "",
    alamatPemberiKerja: "",

    // Bagian B - Penghasilan Bruto
    gajiPokok: data?.amt1a || 0,
    tunjangan: 0,
    bonus: 0,
    totalPenghasilanBruto: 0,

    // Bagian C - Pengurang
    biayaJabatan: 0,
    iuranPensiun: 0,
    totalPengurang: 0,

    // Bagian D - Penghasilan Neto
    penghasilanNeto: 0,
    pphTerutang: 0,
    pphDipotong: 0,
  });

  // Function untuk format rupiah
  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  // Function untuk update field
  const updateField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Function untuk kalkulasi otomatis
  React.useEffect(() => {
    const totalBruto = formData.gajiPokok + formData.tunjangan + formData.bonus;
    const totalPengurang = formData.biayaJabatan + formData.iuranPensiun;
    const neto = totalBruto - totalPengurang;

    setFormData((prev) => ({
      ...prev,
      totalPenghasilanBruto: totalBruto,
      totalPengurang: totalPengurang,
      penghasilanNeto: neto,
    }));
  }, [
    formData.gajiPokok,
    formData.tunjangan,
    formData.bonus,
    formData.biayaJabatan,
    formData.iuranPensiun,
  ]);

  return (
    <div className="space-y-4">
      <ul className="space-y-2 pl-3">
        {[
          " Harta pada Akhir Tahun Pajak",
          "Hutang pada Akhir Tahun Pajak",
          "Daftar Angota Keluarga yang Menjadi Tanggungan",
          "Penghasilan Neto Dalam Negeri dan Pekerjaan",
          "Daftar Bukti Pemotongan/Pemungutan PPh ",
        ].map((t, i) => (
          <li
            key={i}
            className="relative pl-5 uppercase tracking-wide
                 before:content-['•'] before:absolute before:left-0
                before:text-black before:font-extrabold before:text-xl"
          >
            {t}
          </li>
        ))}
      </ul>

      {/* Header Lampiran */}
      <HeaderLampiran />

      {/* Bagian A - Harta pada Akhir Tahun Pajak */}
      <div>
        <div
          className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
          onClick={() => setShowBagianA(!showBagianA)}
        >
          <h3 className="text-lg font-semibold">A. HARTA PADA AKHIR TAHUN PAJAK</h3>
          <span
            className={`transition-transform duration-500 ease-in-out ${
              showBagianA ? "rotate-180" : "rotate-0"
            }`}
          >
            <FaChevronDown />
          </span>
        </div>
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            showBagianA ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="border rounded-md p-4 space-y-4">
            {/* Sub-Bagian A.1 */}
            <div className="ml-4">
              <div
                className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
                onClick={() => setShowKasdanSetaraKas(!showKasdanSetaraKas)}
              >
                <h4 className="text-lg font-semibold">A.1 KAS DAN SETARA KAS</h4>
                <span
                  className={`transition-transform duration-500 ease-in-out ${
                    showKasdanSetaraKas ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <FaChevronDown />
                </span>
              </div>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  showKasdanSetaraKas ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="border rounded-md p-4">
                  <KasDanSetaraKas />
                </div>
              </div>
            </div>
            {/* Sub-Bagian A.2 */}
            <div className="ml-4">
              <div
                className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
                onClick={() => setShowPiutang(!showPiutang)}
              >
                <h4 className="text-lg font-semibold">A.2 PIUTANG</h4>
                <span
                  className={`transition-transform duration-500 ease-in-out ${
                    showPiutang ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <FaChevronDown />
                </span>
              </div>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  showPiutang ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="border rounded-md p-4">
                  <Piutang />
                </div>
              </div>
            </div>
            {/* Sub-Bagian A.3 */}
            <div className="ml-4">
              <div
                className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
                onClick={() => setShowInvestasi(!showInvestasi)}
              >
                <h4 className="text-lg font-semibold">A.3 INVESTASI / SEKURITAS</h4>
                <span
                  className={`transition-transform duration-500 ease-in-out ${
                    showInvestasi ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <FaChevronDown />
                </span>
              </div>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  showInvestasi ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="border rounded-md p-4">
                  <Investasi />
                </div>
              </div>
            </div>
            {/* Sub-Bagian A.4 */}
            <div className="ml-4">
              <div
                className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
                onClick={() => setShowHartaBergerak(!showHartaBergerak)}
              >
                <h4 className="text-lg font-semibold">A.4 HARTA BERGERAK</h4>
                <span
                  className={`transition-transform duration-500 ease-in-out ${
                    showHartaBergerak ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <FaChevronDown />
                </span>
              </div>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  showHartaBergerak ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="border rounded-md p-4">
                  <HartaBergerak />
                </div>
              </div>
            </div>
            {/* Sub-Bagian A.5 */}
            <div className="ml-4">
              <div
                className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
                onClick={() => setShowHartaTidakBergerak(!showHartaTidakBergerak)}
              >
                <h4 className="text-lg font-semibold">
                  A.5 HARTA TIDAK BERGERAK (TERMASUK TANAH DAN/ATAU BANGUNAN)
                </h4>
                <span
                  className={`transition-transform duration-500 ease-in-out ${
                    showHartaTidakBergerak ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <FaChevronDown />
                </span>
              </div>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  showHartaTidakBergerak ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="border rounded-md p-4">
                  <HartaTidakBergerak />
                </div>
              </div>
            </div>
            {/* Sub-Bagian A.6 */}
            <div className="ml-4">
              <div
                className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
                onClick={() => setShowHartaLainnya(!showHartaLainnya)}
              >
                <h4 className="text-lg font-semibold">A.6 HARTA LAINNYA</h4>
                <span
                  className={`transition-transform duration-500 ease-in-out ${
                    showHartaLainnya ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <FaChevronDown />
                </span>
              </div>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  showHartaLainnya ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="border rounded-md p-4">
                  <HartaLainnya />
                </div>
              </div>
            </div>
            {/* Sub-Bagian A.7 */}
            <div className="ml-4">
              <div
                className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
                onClick={() => setShowIkhtisar(!showIkhtisar)}
              >
                <h4 className="text-lg font-semibold">A.7 IKHTISAR</h4>
                <span
                  className={`transition-transform duration-500 ease-in-out ${
                    showIkhtisar ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <FaChevronDown />
                </span>
              </div>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  showIkhtisar ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="border rounded-md p-4">
                  <Ikhtisar />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bagian B - Utang pada Akhir Tahun Pajak */}
      <div>
        <div
          className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
          onClick={() => setShowBagianB(!showBagianB)}
        >
          <h3 className="text-lg font-semibold">B. UTANG PADA AKHIR TAHUN PAJAK</h3>
          <span
            className={`transition-transform duration-500 ease-in-out ${
              showBagianB ? "rotate-180" : "rotate-0"
            }`}
          >
            <FaChevronDown />
          </span>
        </div>
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            showBagianB ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="border rounded-md p-4 space-y-4">
            <div className="ml-4">
              <UtangAkhir />
            </div>
          </div>
        </div>
      </div>

      {/* Bagian C - Daftar Anggota Keluarga yang Menjadi Tanggungan */}
      <div>
        <div
          className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
          onClick={() => setShowBagianC(!showBagianC)}
        >
          <h3 className="text-lg font-semibold">
            C. DAFTAR ANGGOTA KELUARGA YANG MENJADI TANGGUNGAN
          </h3>
          <span
            className={`transition-transform duration-500 ease-in-out ${
              showBagianC ? "rotate-180" : "rotate-0"
            }`}
          >
            <FaChevronDown />
          </span>
        </div>
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            showBagianC ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="border rounded-md p-4 space-y-4">
            <div className="ml-4">
              {/* <AnggotaKeluarga /> */}
              <div className="text-gray-500 italic">Next Update sabar Inggih.</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bagian D - Penghasilan Neto Dalam Negeri Dari Pekerjaan */}
      <div>
        <div
          className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
          onClick={() => setShowBagianD(!showBagianD)}
        >
          <h3 className="text-lg font-semibold">D. PENGHASILAN NETO DALAM NEGERI DARI PEKERJAAN</h3>
          <span
            className={`transition-transform duration-500 ease-in-out ${
              showBagianD ? "rotate-180" : "rotate-0"
            }`}
          >
            <FaChevronDown />
          </span>
        </div>
        <div
          className={`overflow-hidden transition-all duration-500  ${
            showBagianD ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="border rounded-md p-4 space-y-4">
            <div className="ml-4">
              <PenghasilanNeto />
            </div>
          </div>
        </div>
      </div>

      {/* Bagian E - Daftar Bukti Pemotongan/Pemungutan PPh */}
      <div>
        <div
          className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
          onClick={() => setShowBagianE(!showBagianE)}
        >
          <h3 className="text-lg font-semibold">E. DAFTAR BUKTI PEMOTONGAN/PEMUNGUTAN PPH</h3>
          <span
            className={`transition-transform duration-500 ease-in-out ${
              showBagianE ? "rotate-180" : "rotate-0"
            }`}
          >
            <FaChevronDown />
          </span>
        </div>
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            showBagianE ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="border rounded-md p-4 space-y-4">
            <div className="ml-4">
              <Pemotongan />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lampiran_1;
