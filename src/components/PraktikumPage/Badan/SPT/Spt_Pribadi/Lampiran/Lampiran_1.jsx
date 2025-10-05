import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import HeaderLampiran from "./HeaderLampiran";
import {
  Piutang,
  Investasi,
  HartaBergerak,
  HartaTidakBergerak,
  KasdanSetaraKas,
  HartaLainnya,
  Ikhtisar
} from "./sections/BagianA";

//                                                ^

const Lampiran_1 = ({ data }) => {
  const [showBagianA, setShowBagianA] = useState(true);
  const [showBagianB, setShowBagianB] = useState(false);
  const [showBagianC, setShowBagianC] = useState(false);
  const [showBagianD, setShowBagianD] = useState(false);

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
          <h3 className="text-lg font-semibold">
            A. HARTA PADA AKHIR TAHUN PAJAK
          </h3>
          {showBagianA ? <FaChevronUp /> : <FaChevronDown />}
        </div>

        {showBagianA && (
          <div className="border rounded-md p-4 space-y-4">
            {/* Sub-Bagian A.1 - Harta Tidak Bergerak */}
            <div className="ml-4">
              <div
                className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
                onClick={() => setShowKasdanSetaraKas(!showKasdanSetaraKas)}
              >
                <h4 className="text-lg font-semibold">
                  A.1 KAS DAN SETARA KAS
                </h4>
                {showKasdanSetaraKas ? <FaChevronUp /> : <FaChevronDown />}
              </div>

              {showKasdanSetaraKas && (
                <div className="border rounded-md p-4">
                  <KasdanSetaraKas />
                </div>
              )}
            </div>

            {/* Sub-Bagian A.2 - Harta Bergerak */}
            <div className="ml-4">
              <div
                className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
                onClick={() => setShowPiutang(!showPiutang)}
              >
                <h4 className="text-lg font-semibold">A.2 PIUTANG</h4>
                {showPiutang ? <FaChevronUp /> : <FaChevronDown />}
              </div>

              {showPiutang && (
                <div className="border rounded-md p-4">
                  <Piutang />
                </div>
              )}
            </div>

            {/* Sub-Bagian A.3 -  Investasi/Sekuritas */}
            <div className="ml-4">
              <div
                className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
                onClick={() => setShowInvestasi(!showInvestasi)}
              >
                <h4 className="text-lg font-semibold">
                  A.3 INVESTASI / SEKURITAS
                </h4>
                {showInvestasi ? <FaChevronUp /> : <FaChevronDown />}
              </div>

              {showInvestasi && (
                <div className="border rounded-md p-4">
                  <Investasi/>
                </div>
              )}
            </div>

            {/* Sub-Bagian A.4 -  Harta Bergerak */}
            <div className="ml-4">
              <div
                className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
                onClick={() => setShowHartaBergerak(!showHartaBergerak)}
              >
                <h4 className="text-lg font-semibold">
                  A.4 HARTA BERGERAK
                </h4>
                {showHartaBergerak ? <FaChevronUp /> : <FaChevronDown />}
              </div>

              {showHartaBergerak && (
                <div className="border rounded-md p-4">
                  <HartaBergerak/>
                </div>
              )}
            </div>

             {/* Sub-Bagian A.5 -  Harta Tidak Bergerak */}
            <div className="ml-4">
              <div
                className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
                onClick={() => setShowHartaTidakBergerak(!showHartaTidakBergerak)}
              >
                <h4 className="text-lg font-semibold">
                  A.5 HARTA TIDAK BERGERAK (TERMASUK TANAH DAN/ATAU BANGUNAN)
                </h4>
                {showHartaTidakBergerak ? <FaChevronUp /> : <FaChevronDown />}
              </div>

              {showHartaTidakBergerak && (
                <div className="border rounded-md p-4">
                  <HartaTidakBergerak/>
                </div>
              )}
            </div>

                {/* Sub-Bagian A.6 -  Harta Lainnya*/}
            <div className="ml-4">
              <div
                className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
                onClick={() => setShowHartaLainnya(!showHartaLainnya)}
              >
                <h4 className="text-lg font-semibold">
                  A.6 HARTA LAINNYA 
                </h4>
                {showHartaLainnya ? <FaChevronUp /> : <FaChevronDown />}
              </div>

              {showHartaLainnya && (
                <div className="border rounded-md p-4">
                  <HartaLainnya/>
                </div>
              )}
            </div>
            
                {/* Sub-Bagian A.7 -  Ikhtisar*/}
            <div className="ml-4">
              <div
                className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
                onClick={() => setShowIkhtisar(!showIkhtisar)}
              >
                <h4 className="text-lg font-semibold">
                  A.7 IKHTISAR
                </h4>
                {showIkhtisar ? <FaChevronUp /> : <FaChevronDown />}
              </div>

              {showIkhtisar && (
                <div className="border rounded-md p-4">
                  <Ikhtisar/>
                </div>
              )}
            </div>

          </div>
        )}
      </div>

      {/* Bagian B - Penghasilan Bruto */}
      <div>
        <div
          className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
          onClick={() => setShowBagianB(!showBagianB)}
        >
          <h3 className="text-lg font-semibold">
            BAGIAN B - PENGHASILAN BRUTO
          </h3>
          {showBagianB ? <FaChevronUp /> : <FaChevronDown />}
        </div>

        {showBagianB && (
          <div className="border rounded-md p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gaji Pokok
                </label>
                <input
                  type="number"
                  min={0}
                  value={formData.gajiPokok}
                  onChange={(e) =>
                    updateField("gajiPokok", +e.target.value || 0)
                  }
                  className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formatRupiah(formData.gajiPokok)}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tunjangan
                </label>
                <input
                  type="number"
                  min={0}
                  value={formData.tunjangan}
                  onChange={(e) =>
                    updateField("tunjangan", +e.target.value || 0)
                  }
                  className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formatRupiah(formData.tunjangan)}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bonus/THR
                </label>
                <input
                  type="number"
                  min={0}
                  value={formData.bonus}
                  onChange={(e) => updateField("bonus", +e.target.value || 0)}
                  className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formatRupiah(formData.bonus)}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Penghasilan Bruto
                </label>
                <input
                  type="number"
                  value={formData.totalPenghasilanBruto}
                  readOnly
                  className="w-full p-3 border rounded-md bg-gray-100 text-gray-600"
                />
                <p className="text-xs text-green-600 mt-1 font-medium">
                  {formatRupiah(formData.totalPenghasilanBruto)}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bagian C - Pengurang */}
      <div>
        <div
          className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
          onClick={() => setShowBagianC(!showBagianC)}
        >
          <h3 className="text-lg font-semibold">BAGIAN C - PENGURANG</h3>
          {showBagianC ? <FaChevronUp /> : <FaChevronDown />}
        </div>

        {showBagianC && (
          <div className="border rounded-md p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Biaya Jabatan (5% maks 6jt/tahun)
                </label>
                <input
                  type="number"
                  min={0}
                  value={formData.biayaJabatan}
                  onChange={(e) =>
                    updateField("biayaJabatan", +e.target.value || 0)
                  }
                  className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formatRupiah(formData.biayaJabatan)}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Iuran Pensiun/JHT
                </label>
                <input
                  type="number"
                  min={0}
                  value={formData.iuranPensiun}
                  onChange={(e) =>
                    updateField("iuranPensiun", +e.target.value || 0)
                  }
                  className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formatRupiah(formData.iuranPensiun)}
                </p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Total Pengurang
              </label>
              <input
                type="number"
                value={formData.totalPengurang}
                readOnly
                className="w-full p-3 border rounded-md bg-gray-100 text-gray-600"
              />
              <p className="text-xs text-green-600 mt-1 font-medium">
                {formatRupiah(formData.totalPengurang)}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Bagian D - Penghasilan Neto */}
      <div>
        <div
          className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-green-100 w-full"
          onClick={() => setShowBagianD(!showBagianD)}
        >
          <h3 className="text-lg font-semibold text-green-800">
            BAGIAN D - PENGHASILAN NETO (HASIL AKHIR)
          </h3>
          {showBagianD ? <FaChevronUp /> : <FaChevronDown />}
        </div>

        {showBagianD && (
          <div className="border rounded-md p-4 space-y-4 bg-green-50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-green-700 mb-2">
                  Penghasilan Neto (Bruto - Pengurang)
                </label>
                <input
                  type="number"
                  value={formData.penghasilanNeto}
                  readOnly
                  className="w-full p-3 border rounded-md bg-white text-green-800 font-bold text-lg"
                />
                <p className="text-sm text-green-600 mt-1 font-bold">
                  {formatRupiah(formData.penghasilanNeto)}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  PPh Pasal 21 yang Dipotong
                </label>
                <input
                  type="number"
                  min={0}
                  value={formData.pphDipotong}
                  onChange={(e) =>
                    updateField("pphDipotong", +e.target.value || 0)
                  }
                  className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formatRupiah(formData.pphDipotong)}
                </p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border-2 border-green-300">
              <p className="text-center text-green-800 font-bold text-lg">
                TOTAL PENGHASILAN NETO DARI PEKERJAAN
              </p>
              <p className="text-center text-green-600 font-bold text-2xl mt-2">
                {formatRupiah(formData.penghasilanNeto)}
              </p>
              <p className="text-center text-xs text-gray-500 mt-1">
                *Nilai ini akan otomatis terbawa ke Form Induk bagian B.1.a
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Lampiran_1;
