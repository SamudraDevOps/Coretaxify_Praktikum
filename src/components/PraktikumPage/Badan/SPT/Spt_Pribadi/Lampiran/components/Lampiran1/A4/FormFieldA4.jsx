import React from "react";
import {
  formatRupiah,
  formatNumber,
  parseFormattedNumber,
} from "../../../utils/formatCurrency";

const FormFieldA4 = ({ modalData, updateModalData }) => {
  const handleSelectChange = (fieldName) => (selectedValue) => {
    updateModalData(fieldName, selectedValue);

    // Logic khusus berdasarkan field yang diubah
    switch (fieldName) {
      case "tipe":
        console.log("tipe dipilih:", selectedValue);
        // Ekstrak kode dari value yang dipilih (4 digit pertama)
        if (selectedValue) {
          const kode = selectedValue.substring(0, 4);
          updateModalData("kode", kode);
        } else {
          updateModalData("kode", "");
        }
        break;

      case "Kepemilikan":
        console.log("Kepemilikan dipilih:", selectedValue);
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

      {/* Tipe */}
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-gray-700 w-48 flex-shrink-0">
          Tipe
        </label>
        <select
          value={modalData.tipe || ""}
          onChange={(e) => handleSelectChange("tipe")(e.target.value)}
          className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
        >
          <option value="">Pilih Tipe</option>
          <option value="0401: Sepeda"> Sepeda </option>
          <option value="0402: Sepeda Motor"> Sepeda Motor </option>
          <option value="0403: Mobil Penumpang"> Mobil Penumpang </option>
          <option value="0404: Bus"> Bus </option>
          <option value="0405: Kendaraan Angkutan Jalan">
            Kendaraan Angkutan Jalan
          </option>
          <option value="0406: Kendaraan Tujuan Khusus">
            Kendaraan Tujuan Khusus
          </option>
          <option value="0407: Kereta"> Kereta </option>
          <option value="0408: Pesawat Terbang"> Pesawat Terbang </option>
          <option value="0409: Kapal"> Kapal </option>
          <option value="0410: Mesin"> Mesin </option>
          <option value="0411: Gerobak"> Gerobak </option>
          <option value="0412: Kapal Pesiar"> Kapal Pesiar </option>
          <option value="0499: Harta Bergerak Lainnya">
            Harta Bergerak Lainnya
          </option>
        </select>
      </div>

      {/* Merk/Model */}
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-gray-700 w-48 flex-shrink-0">
          Merk/Model
          <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={modalData.merkModel || ""}
          onChange={(e) => updateModalData("merkModel", e.target.value)}
          className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
          placeholder="Merk/Model"
        />
      </div>

      {/* Nomor Polisi/Registrasi */}
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-gray-700 w-48 flex-shrink-0">
          Nomor Polisi/Registrasi
          <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={modalData.nomorPolisi || ""}
          onChange={(e) => updateModalData("nomorPolisi", e.target.value)}
          className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
          placeholder="Nomor Polisi/Registrasi"
        />
      </div>

      {/* Kepemilikan */}
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-gray-700 w-48 flex-shrink-0">
          Kepemilikan
        </label>
        <select
          value={modalData.Kepemilikan || ""}
          onChange={(e) => handleSelectChange("Kepemilikan")(e.target.value)}
          className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
        >
          <option value="">Pilih Kepemilikan</option>
          <option value="1">Atas Nama Sendiri</option>
          <option value="2">Atas Nama Pihak Lain</option>
        </select>
      </div>

      {/*  NPWP */}
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-gray-700 w-48 flex-shrink-0">
          NPWP
          <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={modalData.npwp || ""}
          onChange={(e) => updateModalData("npwp", e.target.value)}
          className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
          placeholder="NPWP"
        />
      </div>

      {/*Nama Pemotong Pajak */}
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-gray-700 w-48 flex-shrink-0">
          Nama Pemotong Pajak
          <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={modalData.namaPemotongPajak || ""}
          onChange={(e) => updateModalData("namaPemotongPajak", e.target.value)}
          className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
          placeholder="Nama Pemotong Pajak"
        />
      </div>

      {/* Tahun Perolehan */}
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-gray-700 w-48 flex-shrink-0">
          Tahun Perolehan
        </label>
        <select
          value={modalData.tahunPerolehan || ""}
          onChange={(e) => handleSelectChange("tahunPerolehan")(e.target.value)}
          className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
        >
          <option value="">Pilih Tahun</option>
          {Array.from({ length: 50 }, (_, i) => {
            const year = new Date().getFullYear() - i;
            return (
              <option key={year} value={year}>
                {year}
              </option>
            );
          })}
        </select>
      </div>

      
      {/* Biaya Perolehan */}
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-gray-700 w-48 flex-shrink-0">
          Biaya Perolehan
          <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          min={0}
          value={formatNumber(modalData.biayaPerolehan)}
          onChange={handleNumericChange("biayaPerolehan")}
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-sm "
          placeholder="Masukkan jumlah biaya perolehan  "
          inputMode="numeric"
        />
      </div>

      {/* Nilai Saat ini */}
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-gray-700 w-48 flex-shrink-0">
          Nilai Saat ini
          <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          min={0}
          value={formatNumber(modalData.nilaiSaatIni)}
          onChange={handleNumericChange("nilaiSaatIni")}
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-sm "
          placeholder="Masukkan jumlah nilai saat ini"
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

export default FormFieldA4;
