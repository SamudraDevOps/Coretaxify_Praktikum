import React, { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Select from "react-select";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "@/components/ui/button";
import BUPOTSidebar from "./BUPOTSidebar"; // Assuming you have a sidebar component

const BUPOTForm = ({
  type,
  title,
  sections = ["informasiUmum", "fasilitasPerpajakan", "dokumenReferensi"],
  onSubmit,
  sidebarTitle,
  initialData = {},
}) => {
  // State for accordion sections
  const [openSections, setOpenSections] = useState({
    informasiUmum: true,
    pajakPenghasilan: false,
    perhitunganPajakPenghasilan: false,
    fasilitasPerpajakan: false,
    dokumenReferensi: false,
    labaKotor: false,
    pengurang: false,
    perhitunganPph: false,
  });

  // Form data state
  const [formData, setFormData] = useState(initialData);

  // State for month options
  const [monthOption, setMonthOption] = useState([]);

  // Generate month option for the past 5 years
  useEffect(() => {
    const options = [];
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    // generate option for 5 years (60 months)
    for (let i = 0; i < 60; i++) {
      const targetMonth = currentMonth - i;

      // calculate the correct year and month
      const yearOffset = Math.floor(Math.abs(targetMonth) / 12);
      const adjustedYear = targetMonth < 0
        ? currentYear - yearOffset - 1
        : currentYear - Math.floor(i / 12);
      const adjustedMonth = targetMonth < 0
      ? 12 + (targetMonth % 12)
      : (currentMonth - (i % 12) + 12) % 12; 

      // create date object for the first day of the month
      const date = new Date(adjustedYear, adjustedMonth, 1);

      // format display : "MONTH - YEAR"
      const monthName = date.toLocaleString('default', { month: 'long' });
      const displayValue = `${monthName} ${adjustedYear}`;

      // format for value
      const month = String(adjustedMonth + 1).padStart(2, '0');
      const valueDate = `${adjustedYear}-${month}-01`;

      options.push({
        value: valueDate,
        label: displayValue,
      });
    }

    setMonthOption(options);
  }, []); 


  // Helper to toggle sections
  const toggleSection = (section) => {
    setOpenSections({
      ...openSections,
      [section]: !openSections[section],
    });
  };

  // Helper to update form data
  const updateFormData = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  // Handle submitting the form
  const handleSubmit = (action) => {
    onSubmit(formData, action);
  };

  // Format rupiah helper
  const formatRupiah = (value) => {
    const numberString = value?.replace(/[^\d]/g, "") || "";
    return new Intl.NumberFormat("id-ID").format(numberString);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Include Sidebar */}
      <BUPOTSidebar
        type={type}
        title={sidebarTitle || `${type.toUpperCase()}`}
        activePath="create" // Mark create as active
      />

      <div className="flex-auto p-3 bg-white rounded-md h-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-light text-yellow-500 mt-4">
            {title || `EBUPOT ${type.toUpperCase()}`}
          </h2>
        </div>

        {/* Render sections based on config */}
        {sections.includes("informasiUmum") && (
          <>
            <div
              className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
              onClick={() => toggleSection("informasiUmum")}
            >
              <h3 className="text-lg font-semibold">Informasi Umum</h3>
              {openSections.informasiUmum ? <FaChevronUp /> : <FaChevronDown />}
            </div>

            {openSections.informasiUmum && (
              <div className="border rounded-md p-4 mb-2 bg-white">
                {/* Common Information Section */}
                {/* Form fields for Informasi Umum */}
                {/* Masa Awal Pajak / Masa Pajak */}
                <div className="mt-4 flex justify-between gap-4">
                  <label className="w-32 flex-none block text-sm font-medium text-gray-700">
                    Masa Pajak
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-64 flex-auto border p-2 rounded appearance-none"
                    value={formData.masa_awal || ""}
                    onChange={(e) =>
                      updateFormData("masa_awal", e.target.value)
                    }
                    placehoder="Please Select"
                  >
                    <option value="">Please Select</option>
                    {monthOption.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <FaChevronDown className="text-gray-400" />
                  </div>
                </div>

                {/* STATUS */}
                <div className="mt-4 flex justify-between gap-4">
                  <label className="w-32 flex-none block text-sm font-medium text-gray-700">
                    Status
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-64 flex-auto border p-2 rounded appearance-none"
                    value={formData.status || ""}
                    onChange={(e) =>
                      updateFormData("status", e.target.value)
                    }
                    placehoder="Please Select"
                  >
                    <option value="">Please Select</option>
                    <option value="normal">Normal</option>
                    <option value="pembetulan">Pembetulan</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <FaChevronDown className="text-gray-400" />
                  </div>
                </div>

                {/* NPWP */}
                <div className="mt-4 flex justify-between gap-4">
                  <label className="w-32 flex-none block text-sm font-medium text-gray-700">
                    NPWP
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-64 flex-auto border p-2 rounded appearance-none"
                    value={formData.npwp_akun || ""}
                    onChange={(e) =>
                      updateFormData("npwp_akun", e.target.value)
                    }
                    placehoder="Please Select"
                  >
                    <option value="">Please Select</option>
                    <option value="NITKU1">NITKU1</option>
                    <option value="NITKU2">NITKU2</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <FaChevronDown className="text-gray-400" />
                  </div>
                </div>

                {/* Nama */}
                <div className="mt-4 flex justify-between gap-4">
                  <label className="w-32 flex-none block text-sm font-medium text-gray-700">
                    Nama
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-64 flex-auto border p-2 rounded"
                    placeholder="Nama"
                    value={formData.nama_akun || ""}
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/[^\d]/g, "");
                      updateFormData("nama_akun", e.target.value);
                    }}
                    readOnly={true}
                  />
                </div>

                {/* NITKU */}
                <div className="mt-4 flex justify-between gap-4">
                  <label className="w-32 flex-none block text-sm font-medium text-gray-700">
                    NITKU
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-64 flex-auto border p-2 rounded appearance-none"
                    value={formData.nitku || ""}
                    onChange={(e) =>
                      updateFormData("nitku", e.target.value)
                    }
                    placehoder="Please Select"
                  >
                    <option value="">Please Select</option>
                    <option value="NITKU1">NITKU1</option>
                    <option value="NITKU2">NITKU2</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <FaChevronDown className="text-gray-400" />
                  </div>
                </div>

                {/* Other Informasi Umum fields */}
                {/* ... */}
              </div>
            )}
          </>
        )}

        {sections.includes("pajakPenghasilan") && (
          <>
            <div
              className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
              onClick={() => toggleSection("pajakPenghasilan")}
            >
              <h3 className="text-lg font-semibold">Pajak Penghasilan</h3>
              {openSections.pajakPenghasilan ? (
                <FaChevronUp />
              ) : (
                <FaChevronDown />
              )}
            </div>

            {openSections.pajakPenghasilan && (
              <div className="border rounded-md p-4 mb-2 bg-white">
                {/* Common Information Section */}
                {/* Form fields for Informasi Umum */}
                {/* ... */}
              </div>
            )}
          </>
        )}

        {sections.includes("perhitunganPajakPenghasilan") && (
          <>
            <div
              className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
              onClick={() => toggleSection("perhitunganPajakPenghasilan")}
            >
              <h3 className="text-lg font-semibold">
                Perhitungan Pajak Penghasilan
              </h3>
              {openSections.perhitunganPajakPenghasilan ? (
                <FaChevronUp />
              ) : (
                <FaChevronDown />
              )}
            </div>

            {openSections.perhitunganPajakPenghasilan && (
              <div className="border rounded-md p-4 mb-2 bg-white">
                {/* Common Information Section */}
                {/* Form fields for Informasi Umum */}
                {/* ... */}
              </div>
            )}
          </>
        )}

        {sections.includes("labaKotor") && (
          <>
            <div
              className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
              onClick={() => toggleSection("labaKotor")}
            >
              <h3 className="text-lg font-semibold">Laba Kotor</h3>
              {openSections.labaKotor ? <FaChevronUp /> : <FaChevronDown />}
            </div>

            {openSections.labaKotor && (
              <div className="border rounded-md p-4 mb-2 bg-white">
                {/* Common Information Section */}
                {/* Form fields for Informasi Umum */}
                {/* ... */}
              </div>
            )}
          </>
        )}

        {sections.includes("pengurang") && (
          <>
            <div
              className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
              onClick={() => toggleSection("pengurang")}
            >
              <h3 className="text-lg font-semibold">Pengurang</h3>
              {openSections.pengurang ? <FaChevronUp /> : <FaChevronDown />}
            </div>

            {openSections.pengurang && (
              <div className="border rounded-md p-4 mb-2 bg-white">
                {/* Common Information Section */}
                {/* Form fields for Informasi Umum */}
                {/* ... */}
              </div>
            )}
          </>
        )}

        {sections.includes("perhitunganPph") && (
          <>
            <div
              className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
              onClick={() => toggleSection("perhitunganPph")}
            >
              <h3 className="text-lg font-semibold">Perhitungan PPH</h3>
              {openSections.perhitunganPph ? (
                <FaChevronUp />
              ) : (
                <FaChevronDown />
              )}
            </div>

            {openSections.perhitunganPph && (
              <div className="border rounded-md p-4 mb-2 bg-white">
                {/* Common Information Section */}
                {/* Form fields for Informasi Umum */}
                {/* ... */}
              </div>
            )}
          </>
        )}

        {sections.includes("fasilitasPerpajakan") && (
          <>
            <div
              className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
              onClick={() => toggleSection("fasilitasPerpajakan")}
            >
              <h3 className="text-lg font-semibold">Fasilitas Perpajakan</h3>
              {openSections.fasilitasPerpajakan ? (
                <FaChevronUp />
              ) : (
                <FaChevronDown />
              )}
            </div>

            {openSections.fasilitasPerpajakan && (
              <div className="border rounded-md p-4 mb-2 bg-white">
                {/* Fasilitas Perpajakan Fields */}
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Fasilitas Pajak yang dimiliki penyetor
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-full border p-2 rounded"
                    value={formData.fasilitasPajak || ""}
                    onChange={(e) =>
                      updateFormData("fasilitasPajak", e.target.value)
                    }
                  >
                    <option value="">Please Select</option>
                    <option value="Fasilitas Lainnya">Fasilitas Lainnya</option>
                    <option value="Ditanggung Pemerintah">
                      PPh Ditanggung Pemerintah (DTP)
                    </option>
                    <option value="Tanpa Fasilitas">Tanpa Fasilitas</option>
                  </select>
                </div>

                {/* Other Fasilitas Perpajakan fields */}
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Penghasilan Bruto (RP)
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full border p-2 rounded"
                    placeholder="Masukkan Penghasilan Bruto"
                    value={formData.penghasilanBruto || ""}
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/[^\d]/g, "");
                      updateFormData(
                        "penghasilanBruto",
                        formatRupiah(rawValue)
                      );
                      updateFormData("penghasilanBrutoRaw", Number(rawValue));
                    }}
                    onWheel={(e) => e.target.blur()}
                  />
                </div>

                {/* More fields as needed */}
              </div>
            )}
          </>
        )}

        {sections.includes("dokumenReferensi") && (
          <>
            <div
              className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
              onClick={() => toggleSection("dokumenReferensi")}
            >
              <h3 className="text-lg font-semibold">Dokumen Referensi</h3>
              {openSections.dokumenReferensi ? (
                <FaChevronUp />
              ) : (
                <FaChevronDown />
              )}
            </div>

            {openSections.dokumenReferensi && (
              <div className="border rounded-md p-4 mb-2 bg-white">
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Jenis Dokumen <span className="text-red-500">*</span>
                  </label>
                  <Select
                    placeholder="Pilih Jenis Dokumen"
                    className="w-full"
                    value={formData.jenisDokumen}
                    onChange={(selected) =>
                      updateFormData("jenisDokumen", selected)
                    }
                    options={[
                      { value: "Akta Perjanjian", label: "Akta Perjanjian" },
                      { value: "Bukti Pembayaran", label: "Bukti Pembayaran" },
                      { value: "Dokumen Lainnya", label: "Dokumen Lainnya" },
                      // Additional options...
                    ]}
                  />
                </div>

                {/* More document reference fields */}
              </div>
            )}
          </>
        )}

        {/* Action buttons */}
        <div className="flex justify-end mt-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
            onClick={() => handleSubmit("save")}
          >
            Simpan
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
            onClick={() => handleSubmit("draft")}
          >
            Simpan Draft
          </button>
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
            onClick={() => handleSubmit("cancel")}
          >
            Batalkan
          </button>
        </div>
      </div>
    </div>
  );
};

export default BUPOTForm;
