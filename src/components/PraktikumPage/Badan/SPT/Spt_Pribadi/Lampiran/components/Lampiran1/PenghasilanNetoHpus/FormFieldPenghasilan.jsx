import React, { useEffect } from "react";
import {
  formatRupiah,
  formatNumber,
  parseFormattedNumber,
} from "../../../utils/formatCurrency";

const FormFieldPenghasilan = ({ modalData, updateModalData }) => {

  const handleSelectChange = (fieldName) => (selectedValue) => {
    updateModalData(fieldName, selectedValue);
  };


  // Function untuk handle input nilai piutang menggunakan utility function
  const handleNumericChange = (fieldName) => (e) => {
    const numericValue = parseFormattedNumber(e.target.value);
    updateModalData(fieldName, numericValue);
  };

    useEffect(() => {
    const bruto = Number(modalData.penghasilanBruto) || 0;
    const kurang = Number(modalData.pengurangan) || 0;
    const neto = Math.max(0, bruto - kurang);

    // update hanya jika berubah supaya tidak loop
    if ((Number(modalData.penghasilanNeto) || 0) !== neto) {
      updateModalData("penghasilanNeto", neto);
    }
  }, [modalData.penghasilanBruto, modalData.pengurangan]); // eslint-disable-line


  return (
    <div className="space-y-3">
      {/* Nomor Identitas Pemberi Kerja */}
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-gray-700 w-48 flex-shrink-0">
          Nomor Identitas Pemberi Kerja <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={modalData.pemberiKerja || ""}
         onChange={(e) => updateModalData("pemberiKerja", e.target.value)}
          className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
          placeholder="Nomor Identitas Pemberi Kerja"
        />
      </div>

      {/* Nama Pemberi Kerja */}
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-gray-700 w-48 flex-shrink-0">
          Nama Pemberi Kerja <span className="text-red-500">*</span>
        </label>
        <input
          readOnly
          type="text"
          value={modalData.namaPemberiKerja || ""}
          className="flex-1 p-2 border rounded-md bg-gray-100 text-gray-600 text-sm"
          placeholder="Nama Pemberi Kerja Otomatis Terisi"
        />
      </div>

      {/* Penghasilan Bruto */}
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-gray-700 w-48 flex-shrink-0">
          Penghasilan Bruto
          <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          min={0}
          value={formatNumber(modalData.penghasilanBruto)}
          onChange={handleNumericChange("penghasilanBruto")}
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-sm "
          placeholder="Masukkan jumlah penghasilan bruto"
          inputMode="numeric"
        />
      </div>

      {/* Pengurangan Penghasilan Bruto */}
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-gray-700 w-48 flex-shrink-0">
          Pengurangan Penghasilan Bruto/Biaya
          <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          min={0}
          value={formatNumber(modalData.pengurangan)}
          onChange={handleNumericChange("pengurangan")}
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-sm "
          placeholder="Masukkan jumlah pengurangan"
          inputMode="numeric"
        />
      </div>

      {/* Pengurangan Penghasilan Bruto */}
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-gray-700 w-48 flex-shrink-0">
          Penghasilan Neto
          <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          readOnly
          min={0}
          value={formatRupiah(Number(modalData.penghasilanNeto) || 0)}
          onChange={handleNumericChange("penghasilanNeto")}
          className="flex-1 p-2 border rounded-md bg-gray-100 text-sm"
          placeholder="Masukkan jumlah penghasilan bruto"
        />
      </div>
    </div>
  );
};

export default FormFieldPenghasilan;
