import React, { useState } from "react";
import Select from "react-select";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export default function LaporanKeuangan() {

  const [formData, setFormData] = useState({
    jenis_laporan: "",
    npwp_konsultan_pajak: "",
    nama_konsultan_pajak: "",
    npwp_kantor_akuntan_publik: "",
    nama_kantor_akuntan_publik: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "npwp_konsultan_pajak" || name === "npwp_kantor_akuntan_publik") {
      const numericValue = value.replace(/[^0-9]/g, "");
      setFormData((prev) => ({ ...prev, [name]: numericValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };
  // Jika nama field adalah jenis_laporan dan nilainya adalah "01", lakukan hanya tampilkan Npwp Konsultan Pajak dan Nama Konsultan Pajak saja 

  const setFieldShow = (e) => {
    const { name, value } = e.target;
    if (name === "jenis_laporan" && value === "01") {
      // Tampilkan hanya NPWP dan Nama Konsultan Pajak
      setFormData((prev) => ({
        ...prev,
        npwp_kantor_akuntan_publik: "",
        nama_kantor_akuntan_publik: "",
      }));
    }
  };

  return (
    <>
      <div className="border rounded-md p-4 mb-4">
        <div className="mt-4 flex justify-between gap-4">
          <label className="w-64 flex-none block text-sm font-base text-gray-700 font-semibold">
            Laporan Keuangan
          </label>
          <Select
            name="jenis_laporan"
            className="w-full"
            placeholder="Pilih Laporan Keuangan"
            options={[
              { value: "01", label: "Tidak Diaudit" },
              { value: "02", label: "Diaudit" },
            ]}
            onChange={(selectedOption) => {

            }}
          />
        </div>
        <div className="mt-4 flex justify-between gap-4">
          <label className="w-64 flex-none block text-sm font-base text-gray-700 font-semibold">
            NPWP Konsultan Pajak
          </label>
          <input
            id="npwp_konsultan_pajak"
            name="npwp_konsultan_pajak"
            placeholder="Masukkan NPWP Konsultan Pajak"
            type="text"
            value={formData.npwp_konsultan_pajak}
            className="w-full p-2 border rounded-md text-gray-600"
            inputMode="numeric"
            maxLength={16}
            pattern="[0-9]*"
            onChange={handleInputChange}
          />
        </div>

        <div className="mt-4 flex justify-between gap-4">
          <label className="w-64 flex-none block text-sm font-base text-gray-700 font-semibold">
            Nama Konsultan Pajak
          </label>
          <input
            placeholder="Nama Konsultan Pajak"
            type="text"
            // value={}
            className="w-full p-2 border rounded-md text-gray-600"
          />
        </div>


        <div className="mt-4 flex justify-between gap-4">
          <label className="w-64 flex-none block text-sm font-base text-gray-700 font-semibold">
            NPWP Kantor Akuntan Publik
          </label>
          <input
            id="npwp_kantor_akuntan_publik"
            name="npwp_kantor_akuntan_publik"
            placeholder="Masukkan NPWP Kantor Akuntan Publik"
            type="text"
            value={formData.npwp_kantor_akuntan_publik}
            className="w-full p-2 border rounded-md text-gray-600"
            inputMode="numeric"
            maxLength={16}
            pattern="[0-9]*"
            onChange={handleInputChange}
          />
        </div>

        <div className="mt-4 flex justify-between gap-4">
          <label className="w-64 flex-none block text-sm font-base text-gray-700 font-semibold">
            Nama Kantor Akuntan Publik
          </label>
          <input
            placeholder="Nama Kantor Akuntan Publik"
            type="text"
            // value={}
            className="w-full p-2 border rounded-md text-gray-600"
          />
        </div>
      </div>
    </>
  );
};

