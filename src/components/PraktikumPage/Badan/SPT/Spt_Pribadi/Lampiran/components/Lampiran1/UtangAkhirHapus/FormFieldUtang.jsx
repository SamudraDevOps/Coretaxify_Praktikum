import React from "react";
import DatePicker from "react-datepicker";
import {
  formatRupiah,
  formatNumber,
  parseFormattedNumber,
} from "../../../utils/formatCurrency";
import {
  yearToDate,
  dateToYear,
  createYearPickerHandler,
  defaultYearPickerProps,
  formatYearDisplay,
} from "../../../utils/datePickerUtils";

const FormFieldUtang = ({ modalData, updateModalData }) => {
  const handleSelectChange = (fieldName) => (selectedValue) => {
    updateModalData(fieldName, selectedValue);

    // Logic khusus berdasarkan field yang diubah
    switch (fieldName) {
      case "deskripsi":
        console.log("Deskripsi dipilih:", selectedValue);
        // Ekstrak kode dari value yang dipilih (4 digit pertama)
        if (selectedValue) {
          const kode = selectedValue.substring(0, 3);
          updateModalData("kode", kode);
        } else {
          updateModalData("kode", "");
        }
        break;

      case "keterangan":
        console.log("Keterangan dipilih:", selectedValue);
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

  const handleYearChange = createYearPickerHandler(
    updateModalData,
    "tahunPerolehan"
  );

  return (
    <div className="space-y-3">
      {/* Kode */}
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-gray-700 w-48 flex-shrink-0">
          Kode <span className="text-red-500">*</span>
        </label>
        <input
          readOnly
          type="text"
          value={modalData.kode || ""}
          className="flex-1 p-2 border rounded-md bg-gray-100 text-gray-600 text-sm"
          placeholder="Kode akan otomatis terisi"
        />
      </div>

      {/* Deskripsi */}
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-gray-700 w-48 flex-shrink-0">
          Deskripsi
        </label>
        <select
          value={modalData.deskripsi || ""}
          onChange={(e) => handleSelectChange("deskripsi")(e.target.value)}
          className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
        >
          <option value="">Pilih Deskripsi</option>

          <option value="101: Utang Bank/Lembaga Keuangan Bukan Bank">
            Utang Bank/Lembaga Keuangan Bukan Bank
          </option>
          <option value="102: Kartu Kredit">Kartu Kredit </option>
          <option value="103: Utang Afiliasi">Utang Afiliasi </option>
          <option value="109: Utang Lainnya">Utang Lainnya </option>
        </select>
      </div>

      {/* NPWP Kreditur */}
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-gray-700 w-48 flex-shrink-0">
          NPWP Kreditur
          <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          value={modalData.npwpKreditur || ""}
          onChange={(e) => updateModalData("npwpKreditur", e.target.value)}
          className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
          placeholder="NPWP Kreditur"
          inputMode="numeric"
        />
      </div>

      {/* Negara Kreditur */}
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-gray-700 w-48 flex-shrink-0">
          Negara Kreditur
          <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={modalData.negara || ""}
          onChange={(e) => updateModalData("negara", e.target.value)}
          className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
          placeholder="Negara Kreditur"
          inputMode="numeric"
        />
      </div>

      {/* Tahun Perolehan */}
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-gray-700 w-48 flex-shrink-0">
          Tahun Perolehan
        </label>
        <div className="flex-1 relative">
          <DatePicker
            selected={yearToDate(modalData.tahunPerolehan)}
            onChange={handleYearChange}
            {...defaultYearPickerProps}
          />

          {/* Display selected year */}
          {modalData.tahunPerolehan && (
            <div className="absolute right-10 top-1/2 transform -translate-y-1/2 text-xs text-gray-500 pointer-events-none">
              {formatYearDisplay(modalData.tahunPerolehan)}
            </div>
          )}
        </div>
      </div>

      {/* Saldo */}
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-gray-700 w-48 flex-shrink-0">
          Saldo
          <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          min={0}
          value={formatNumber(modalData.saldo)}
          onChange={handleNumericChange("saldo")}
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-sm "
          placeholder="Masukkan jumlah saldo"
          inputMode="numeric"
        />
      </div>

      {/* Keterangan */}
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-gray-700 w-48 flex-shrink-0">
          Keterangan
        </label>
        <select
          value={modalData.keterangan || ""}
          onChange={(e) => handleSelectChange("keterangan")(e.target.value)}
          className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
        >
          <option value="">Pilih Keterangan</option>
          <option value="Harta PPS">Harta PPS</option>
          <option value="Harta Investasi"> Harta Investasi PPS</option>
        </select>
      </div>
    </div>
  );
};

export default FormFieldUtang;
