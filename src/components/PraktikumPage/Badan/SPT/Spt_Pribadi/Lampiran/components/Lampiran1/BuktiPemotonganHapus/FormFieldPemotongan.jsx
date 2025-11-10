import React, { useEffect } from "react";
import {
  formatRupiah,
  formatNumber,
  parseFormattedNumber,
} from "../../../utils/formatCurrency";

const FormFieldPemotongan = ({ modalData, updateModalData }) => {
  const handleSelectChange = (fieldName) => (selectedValue) => {
    updateModalData(fieldName, selectedValue);

    // Logic khusus berdasarkan field yang diubah
    switch (fieldName) {
      case "jenisPajak":
        console.log("Jenis Pajak dipilih:", selectedValue);
        break;

      default:
        // Field lain tidak perlu logic khusus
        break;
    }
  };

  // Function untuk handle input nilai piutang menggunakan utility function
  const handleNumericChange = (fieldName) => (e) => {
    const numericValue = parseFormattedNumber(e.target.value);
    updateModalData(fieldName, numericValue);
  };

  return (
    <div className="space-y-3">
      {/* Nama Pemotong /Pemumut PPh */}
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-gray-700 w-48 flex-shrink-0">
          Nama Pemotong /Pemumut PPh <span className="text-red-500">*</span>
        </label>
        <input
          readOnly
          type="text"
          value={modalData.namaPemotong || ""}
          className="flex-1 p-2 border rounded-md bg-gray-100 text-gray-600 text-sm"
          placeholder="Nama Pemotong /Pemumut PPh Otomatis Terisi"
        />
      </div>

      {/* NPWP Pemotong / Pemumut PPh */}
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-gray-700 w-48 flex-shrink-0">
          NPWP Pemotong / Pemumut PPh <span className="text-red-500">*</span>
        </label>
        <input
          type="numb"
          value={modalData.npwpPemotong || ""}
          onChange={(e) => updateModalData("npwpPemotong", e.target.value)}
          className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
          placeholder="Nomor Identitas Pemotong /Pemumut PPh"
        />
      </div>

      {/* Nomor Bukti Pemotongan / Pemumutan */}
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-gray-700 w-48 flex-shrink-0">
          Nomor Bukti Pemotongan / Pemumutan{" "}
          <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={modalData.nomorBuktiPemotongan || ""}
          onChange={(e) =>
            updateModalData("nomorBuktiPemotongan", e.target.value)
          }
          className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
          placeholder="Nomor Bukti Pemotongan / Pemumutan"
        />
      </div>

      {/* Tanggal Bukti Pemotongan / Pemumutan */}
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-gray-700 w-48 flex-shrink-0">
          Tanggal Pemotongan
        </label>
        <input
          type="date"
          value={modalData.tanggalPemotongan || ""}
          onChange={(e) => updateModalData("tanggalPemotongan", e.target.value)}
          className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
        />
      </div>

      {/* Jenis Pajak */}
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-gray-700 w-48 flex-shrink-0">
          Jenis Pajak
        </label>
        <select
          value={modalData.jenisPajak || ""}
          onChange={(e) => handleSelectChange("jenisPajak")(e.target.value)}
          className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
        >
          <option value="">Pilih Jenis Pajak</option>
          <option value="Pasal21">PPh Pasal 21</option>
          <option value="Pasal22">PPh Pasal 22</option>
          <option value="Pasal23">PPh Pasal 23</option>
          <option value="Pasal26">PPh Pasal 26</option>
          <option value="DTP">PPh DTP</option>
        </select>
      </div>

      {/* Dasar Pengenaan Pajak */}
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-gray-700 w-48 flex-shrink-0">
          Dasar Pengenaan Pajak
          <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          min={0}
          value={formatNumber(modalData.dasarPengenaanPajak)}
          onChange={handleNumericChange("dasarPengenaanPajak")}
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-sm "
          placeholder="Masukkan jumlah dasar pengenaan pajak"
          inputMode="numeric"
        />
      </div>

      {/* PPh Yang dipotong / Dipungut   */}
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-gray-700 w-48 flex-shrink-0">
          PPh Yang Dipotong / Dipungut{" "}
          <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          min={0}
          value={formatNumber(modalData.pphdipotong)}
          onChange={handleNumericChange("pphdipotong")}
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-sm "
          placeholder="Masukkan jumlah PPh yang dipotong / dipungut"
          inputMode="numeric"
        />
      </div>
    </div>
  );
};

export default FormFieldPemotongan;
