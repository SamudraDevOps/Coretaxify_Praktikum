import React, { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Header from "./Header";
import Kelompok1IndexBerwujud from "./section/Lampiran9/HartaBerwujud/Kelompok1";
import Kelompok2IndexBerwujud from "./section/Lampiran9/HartaBerwujud/Kelompok2";
import Kelompok3IndexBerwujud from "./section/Lampiran9/HartaBerwujud/Kelompok3";
import Kelompok4IndexBerwujud from "./section/Lampiran9/HartaBerwujud/Kelompok4";
import KelompokLainnyaIndexBerwujud from "./section/Lampiran9/HartaBerwujud/kelompokLainnya";
import PermanenIndex from "./section/Lampiran9/Bangunan/Permanen/Permanen";
import TidakPermanenIndex from "./section/Lampiran9/Bangunan/TidakPermanen";
import GlobalFormField from "@shared/GlobalFormField";
import Kelompok1IndexTdkBerwujud from "./section/Lampiran9/HartaTdkBerwujud/Kelompok1";
import Kelompok2IndexTdkBerwujud from "./section/Lampiran9/HartaTdkBerwujud/Kelompok2";
import Kelompok3IndexTdkBerwujud from "./section/Lampiran9/HartaTdkBerwujud/Kelompok3";
import Kelompok4IndexTdkBerwujud from "./section/Lampiran9/HartaTdkBerwujud/Kelompok4";
import KelompokLainnyaIndexTdkBerwujud from "./section/Lampiran9/HartaBerwujud/kelompokLainnya";

const Lampiran9 = ({ data }) => {
  const [showBagian1, setShowBagian1] = useState(true);
  const [showBagian2, setShowBagian2] = useState(true);

  const [showsubKelompok1, setShowsubKelompok1] = useState(false);
  const [showsubKelompok2, setShowsubKelompok2] = useState(false);
  const [showsubKelompok3, setShowsubKelompok3] = useState(false);
  const [showsubKelompok4, setShowsubKelompok4] = useState(false);
  const [showsubKelompokLainnya, setShowsubKelompokLainnya] = useState(false);

  const [showBangunanPermanen, setShowBangunanPermanen] = useState(false);
  const [showBangunanTidakPermanen, setShowBangunanTidakPermanen] = useState(false);

  // State untuk menyimpan total dari setiap kelompok
  const [totals, setTotals] = useState({
    kelompok1: 0,
    kelompok2: 0,
    kelompok3: 0,
    kelompok4: 0,
    kelompokLainnya: 0,
    bangunanPermanen: 0,
    bangunanTidakPermanen: 0,
  });

  const [totalsTdkBerwujud, setTotalsTdkBerwujud] = useState({
    kelompok1: 0,
    kelompok2: 0,
    kelompok3: 0,
    kelompok4: 0,
    kelompokLainnya: 0,
  });

  const [form, setForm] = useState({
    penFiskal: "",
    penKomersial: "",
    selisihPen: "",
    amorFiskal: "",
    amorKomersial: "",
    selisihAmor: "",
  });

  // Callback untuk menerima total dari setiap kelompok
  const handleTotalChange = (kelompok, total) => {
    setTotals((prev) => ({
      ...prev,
      [kelompok]: total || 0,
    }));
  };

  // Callback untuk menerima total dari setiap kelompok tidak berwujud
  const handleTotalChangeTdkBerwujud = (kelompok, total) => {
    setTotalsTdkBerwujud((prev) => ({
      ...prev,
      [kelompok]: total || 0,
    }));
  };

  // Hitung total penyusutan fiskal dari semua kelompok
  useEffect(() => {
    const totalPenyusutanFiskal =
      totals.kelompok1 +
      totals.kelompok2 +
      totals.kelompok3 +
      totals.kelompok4 +
      totals.kelompokLainnya +
      totals.bangunanPermanen +
      totals.bangunanTidakPermanen;

    setForm((prev) => ({
      ...prev,
      penFiskal: totalPenyusutanFiskal,
    }));
  }, [totals]);

  // Hitung selisih penyusutan
  useEffect(() => {
    const selisih = (form.penFiskal || 0) - (form.penKomersial || 0);
    setForm((prev) => ({
      ...prev,
      selisihPen: selisih,
    }));
  }, [form.penFiskal, form.penKomersial]);

  // Hitung total penyusutan fiskal dari semua kelompok tidak berwujud
  useEffect(() => {
    const totalPenyusutanFiskalTdkBerwujud =
      totalsTdkBerwujud.kelompok1 +
      totalsTdkBerwujud.kelompok2 +
      totalsTdkBerwujud.kelompok3 +
      totalsTdkBerwujud.kelompok4 +
      totalsTdkBerwujud.kelompokLainnya;

    setForm((prev) => ({
      ...prev,
      penFiskalTdkBerwujud: totalPenyusutanFiskalTdkBerwujud,
    }));
  }, [totalsTdkBerwujud]);

  // Hitung selisih penyusutan tidak berwujud
  useEffect(() => {
    const selisihTdkBerwujud =
      (form.penFiskalTdkBerwujud || 0) - (form.penKomersialTdkBerwujud || 0);
    setForm((prev) => ({
      ...prev,
      selisihPenTdkBerwujud: selisihTdkBerwujud,
    }));
  }, [form.penFiskalTdkBerwujud, form.penKomersialTdkBerwujud]);

  return (
    <div className="space-y-4">
      <Header />
      {/* Bagian A - HARTA BERWUJUD */}
      <div>
        <div
          className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
          onClick={() => setShowBagian1(!showBagian1)}
        >
          <h3 className="text-lg font-semibold">A. HARTA BERWUJUD </h3>
          <span
            className={`transition-transform duration-500 ease-in-out ${
              showBagian1 ? "rotate-180" : "rotate-0"
            }`}
          >
            <FaChevronDown />
          </span>
        </div>
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            showBagian1 ? " opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="border rounded-md p-4 space-y-4">
            {/* Sub-Bagian Kelompok 1  */}
            <div className="ml-4">
              <div
                className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
                onClick={() => setShowsubKelompok1(!showsubKelompok1)}
              >
                <h4 className="text-lg font-semibold">KELOMPOK 1</h4>
                <span
                  className={`transition-transform duration-500 ease-in-out ${
                    showsubKelompok1 ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <FaChevronDown />
                </span>
              </div>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  showsubKelompok1 ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="border rounded-md p-4">
                  <Kelompok1IndexBerwujud
                    onTotalChange={(total) => handleTotalChange("kelompok1", total)}
                  />
                </div>
              </div>
            </div>

            {/* Sub-Bagian Kelompok 2  */}
            <div className="ml-4">
              <div
                className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
                onClick={() => setShowsubKelompok2(!showsubKelompok2)}
              >
                <h4 className="text-lg font-semibold">KELOMPOK 2</h4>
                <span
                  className={`transition-transform duration-500 ease-in-out ${
                    showsubKelompok2 ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <FaChevronDown />
                </span>
              </div>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  showsubKelompok2 ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="border rounded-md p-4">
                  <Kelompok2IndexBerwujud
                    onTotalChange={(total) => handleTotalChange("kelompok2", total)}
                  />
                </div>
              </div>
            </div>

            {/* Sub-Bagian Kelompok 3  */}
            <div className="ml-4">
              <div
                className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
                onClick={() => setShowsubKelompok3(!showsubKelompok3)}
              >
                <h4 className="text-lg font-semibold">KELOMPOK 3</h4>
                <span
                  className={`transition-transform duration-500 ease-in-out ${
                    showsubKelompok3 ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <FaChevronDown />
                </span>
              </div>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  showsubKelompok3 ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="border rounded-md p-4">
                  <Kelompok3IndexBerwujud
                    onTotalChange={(total) => handleTotalChange("kelompok3", total)}
                  />
                </div>
              </div>
            </div>

            {/* Sub-Bagian Kelompok 4  */}
            <div className="ml-4">
              <div
                className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
                onClick={() => setShowsubKelompok4(!showsubKelompok4)}
              >
                <h4 className="text-lg font-semibold">KELOMPOK 4</h4>
                <span
                  className={`transition-transform duration-500 ease-in-out ${
                    showsubKelompok4 ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <FaChevronDown />
                </span>
              </div>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  showsubKelompok4 ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="border rounded-md p-4">
                  <Kelompok4IndexBerwujud
                    onTotalChange={(total) => handleTotalChange("kelompok4", total)}
                  />
                </div>
              </div>
            </div>

            {/* Sub-Bagian Kelompok Lainnya */}
            <div className="ml-4">
              <div
                className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
                onClick={() => setShowsubKelompokLainnya(!showsubKelompokLainnya)}
              >
                <h4 className="text-lg font-semibold">KELOMPOK LAINNYA</h4>
                <span
                  className={`transition-transform duration-500 ease-in-out ${
                    showsubKelompokLainnya ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <FaChevronDown />
                </span>
              </div>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  showsubKelompokLainnya ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="border rounded-md p-4">
                  <KelompokLainnyaIndexBerwujud
                    onTotalChange={(total) => handleTotalChange("kelompokLainnya", total)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bagian B - BANGUNAN */}
      <div>
        <div
          className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
          onClick={() => setShowBagian2(!showBagian2)}
        >
          <h3 className="text-lg font-semibold">B. BANGUNAN </h3>
          <span
            className={`transition-transform duration-500 ease-in-out ${
              showBagian2 ? "rotate-180" : "rotate-0"
            }`}
          >
            <FaChevronDown />
          </span>
        </div>
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            showBagian2 ? " opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="border rounded-md p-4 space-y-4">
            {/* Sub-Bagian Bangunan Permanen  */}
            <div className="ml-4">
              <div
                className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
                onClick={() => setShowBangunanPermanen(!showBangunanPermanen)}
              >
                <h4 className="text-lg font-semibold">PERMANEN</h4>
                <span
                  className={`transition-transform duration-500 ease-in-out ${
                    showBangunanPermanen ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <FaChevronDown />
                </span>
              </div>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  showBangunanPermanen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="border rounded-md p-4">
                  <PermanenIndex
                    onTotalChange={(total) => handleTotalChange("bangunanPermanen", total)}
                  />
                </div>
              </div>
            </div>

            {/* Sub-Bagian Bangunan Tidak Permanen  */}
            <div className="ml-4">
              <div
                className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
                onClick={() => setShowBangunanTidakPermanen(!showBangunanTidakPermanen)}
              >
                <h4 className="text-lg font-semibold">TIDAK PERMANEN</h4>
                <span
                  className={`transition-transform duration-500 ease-in-out ${
                    showBangunanTidakPermanen ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <FaChevronDown />
                </span>
              </div>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  showBangunanTidakPermanen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="border rounded-md p-4">
                  <TidakPermanenIndex
                    onTotalChange={(total) => handleTotalChange("bangunanTidakPermanen", total)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border rounded-md p-4 space-y-4">
        <GlobalFormField
          customChildren={[
            {
              key: "penFiskal",
              type: "currency",
              title: "JUMLAH PENYUSUTAN FISKAL",
              placeholder: "",
              readOnly: true,
            },

            {
              key: "penKomersial",
              type: "currency",
              title: "JUMLAH PENYUSUTAN KOMERSIAL",
              placeholder: "",
            },

            {
              key: "selisihPen",
              type: "currency",
              title: "SELISIH PENYUSUTAN",
              placeholder: "",
              readOnly: true,
            },
          ]}
          formData={form}
          onFieldChange={(key, value) => setForm((prev) => ({ ...prev, [key]: value }))}
          labelWidth="w-80"
        />
      </div>

      {/* Bagian C - HARTA TIDAK BERWUJUD */}
      <div>
        <div
          className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
          onClick={() => setShowBagian1(!showBagian1)}
        >
          <h3 className="text-lg font-semibold">A. HARTA TIDAK BERWUJUD </h3>
          <span
            className={`transition-transform duration-500 ease-in-out ${
              showBagian1 ? "rotate-180" : "rotate-0"
            }`}
          >
            <FaChevronDown />
          </span>
        </div>
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            showBagian1 ? " opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="border rounded-md p-4 space-y-4">
            {/* Sub-Bagian Kelompok 1  */}
            <div className="ml-4">
              <div
                className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
                onClick={() => setShowsubKelompok1(!showsubKelompok1)}
              >
                <h4 className="text-lg font-semibold">KELOMPOK 1</h4>
                <span
                  className={`transition-transform duration-500 ease-in-out ${
                    showsubKelompok1 ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <FaChevronDown />
                </span>
              </div>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  showsubKelompok1 ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="border rounded-md p-4">
                  <Kelompok1IndexTdkBerwujud
                    onTotalChange={(total) => handleTotalChangeTdkBerwujud("kelompok1", total)}
                  />
                </div>
              </div>
            </div>

            {/* Sub-Bagian Kelompok 2  */}
            <div className="ml-4">
              <div
                className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
                onClick={() => setShowsubKelompok2(!showsubKelompok2)}
              >
                <h4 className="text-lg font-semibold">KELOMPOK 2</h4>
                <span
                  className={`transition-transform duration-500 ease-in-out ${
                    showsubKelompok2 ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <FaChevronDown />
                </span>
              </div>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  showsubKelompok2 ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="border rounded-md p-4">
                  <Kelompok2IndexTdkBerwujud
                    onTotalChange={(total) => handleTotalChangeTdkBerwujud("kelompok2", total)}
                  />
                </div>
              </div>
            </div>

            {/* Sub-Bagian Kelompok 3  */}
            <div className="ml-4">
              <div
                className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
                onClick={() => setShowsubKelompok3(!showsubKelompok3)}
              >
                <h4 className="text-lg font-semibold">KELOMPOK 3</h4>
                <span
                  className={`transition-transform duration-500 ease-in-out ${
                    showsubKelompok3 ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <FaChevronDown />
                </span>
              </div>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  showsubKelompok3 ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="border rounded-md p-4">
                  <Kelompok3IndexTdkBerwujud
                    onTotalChange={(total) => handleTotalChangeTdkBerwujud("kelompok3", total)}
                  />
                </div>
              </div>
            </div>

            {/* Sub-Bagian Kelompok 4  */}
            <div className="ml-4">
              <div
                className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
                onClick={() => setShowsubKelompok4(!showsubKelompok4)}
              >
                <h4 className="text-lg font-semibold">KELOMPOK 4</h4>
                <span
                  className={`transition-transform duration-500 ease-in-out ${
                    showsubKelompok4 ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <FaChevronDown />
                </span>
              </div>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  showsubKelompok4 ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="border rounded-md p-4">
                  <Kelompok4IndexTdkBerwujud
                    onTotalChange={(total) => handleTotalChangeTdkBerwujud("kelompok4", total)}
                  />
                </div>
              </div>
            </div>

            {/* Sub-Bagian Kelompok Lainnya */}
            <div className="ml-4">
              <div
                className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
                onClick={() => setShowsubKelompokLainnya(!showsubKelompokLainnya)}
              >
                <h4 className="text-lg font-semibold">KELOMPOK LAINNYA</h4>
                <span
                  className={`transition-transform duration-500 ease-in-out ${
                    showsubKelompokLainnya ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <FaChevronDown />
                </span>
              </div>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  showsubKelompokLainnya ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="border rounded-md p-4">
                  <KelompokLainnyaIndexTdkBerwujud
                    onTotalChange={(total) =>
                      handleTotalChangeTdkBerwujud("kelompokLainnya", total)
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border rounded-md p-4 space-y-4">
        <GlobalFormField
          customChildren={[
            {
              key: "penFiskalTdkBerwujud",
              type: "currency",
              title: "JUMLAH AMORTISASI FISKAL",
              placeholder: "",
              readOnly: true,
            },

            {
              key: "penKomersialTdkBerwujud",
              type: "currency",
              title: "JUMLAH AMORTISASI KOMERSIAL",
              placeholder: "",
            },

            {
              key: "selisihPenTdkBerwujud",
              type: "currency",
              title: "SELISIH AMORTISASI",
              placeholder: "",
              readOnly: true,
            },
          ]}
          formData={form}
          onFieldChange={(key, value) => setForm((prev) => ({ ...prev, [key]: value }))}
          labelWidth="w-80"
        />
      </div>
    </div>
  );
};

export default Lampiran9;
