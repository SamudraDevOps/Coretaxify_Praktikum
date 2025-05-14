import React, { useState } from "react";
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

const BUPOTForm = ({
  type,
  title,
  sections = ["informasiUmum", "fasilitasPerpajakan", "dokumenReferensi"],
  onSubmit,
  initialData = {},
}) => {
  // State for accordion sections
  const [openSections, setOpenSections] = useState({
    informasiUmum: true,
    fasilitasPerpajakan: false,
    dokumenReferensi: false,
  });

  // Form data state
  const [formData, setFormData] = useState(initialData);

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
