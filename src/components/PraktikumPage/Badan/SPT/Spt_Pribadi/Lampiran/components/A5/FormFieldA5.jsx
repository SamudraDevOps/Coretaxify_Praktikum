import React from "react";
import {
  formatRupiah,
  formatNumber,
  parseFormattedNumber,
} from "../../utils/formatCurrency";

const FormFieldA6 = ({ modalData, updateModalData }) => {
  const handleSelectChange = (fieldName) => (selectedValue) => {
    updateModalData(fieldName, selectedValue);

    // Logic khusus berdasarkan field yang diubah
    switch (fieldName) {
      case "deskripsi":
        console.log("Deskripsi dipilih:", selectedValue);
        // Ekstrak kode dari value yang dipilih (4 digit pertama)
        if (selectedValue) {
          const kode = selectedValue.substring(0, 4);
          updateModalData("kode", kode);
        } else {
          updateModalData("kode", "");
        }
        break;

      case "sumberKepemilikan":
        console.log("sumberKepemilikan dipilih:", selectedValue);
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

          <option value="0501: Tanah Kosong">Tanah Kosong</option>
          <option value="0502: Tanah dan/atau Bangunan untuk Tempat Tinggal">Tanah dan/atau Bangunan untuk Tempat Tinggal</option>
          <option value="0503: Apartemen">Apartemen</option>
          <option value="0504: Vessel"> Vessel</option>
          <option value="0505: Tanah atau Lahan untuk Usaha (lahan pertanian, perkebunan, dsb)">Tanah atau Lahan untuk Usaha (lahan pertanian, perkebunan, dsb)</option>
          <option value="0506: Tanah dan/atau Bangunan untuk Usaha (toko, pabrik, dsb)">Tanah dan/atau Bangunan untuk Usaha (toko, pabrik, dsb)</option>
          <option value="0507: Tanah dan/atau Bangunan yang disewakan">Tanah dan/atau Bangunan yang disewakan</option>
          <option value="0509: Harta Tidak Bergerak Lainnya">Harta Tidak Bergerak Lainnya</option>
        </select>
      </div>

      {/* Lokasi Harta */}
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-gray-700 w-48 flex-shrink-0">
          Lokasi Harta
          <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={modalData.lokasiHarta || ""}
          onChange={(e) => updateModalData("lokasiHarta", e.target.value)}
          className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
          placeholder="Lokasi Harta"
        />
      </div>

      {/* Ukuran Properti */}
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-gray-700 w-48 flex-shrink-0">
          Ukuran Properti - Tanah (m2)
          <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={modalData.ukuranTanah || ""}
          onChange={(e) => updateModalData("ukuranTanah", e.target.value)}
          className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
          placeholder="Ukuran Properti - Tanah"
        />
      </div>

      
      {/* Ukuran Properti - Bangunan */}
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-gray-700 w-48 flex-shrink-0">
          Ukuran Properti - Bangunan (m2)
          <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={modalData.ukuranBangunan || ""}
          onChange={(e) => updateModalData("ukuranBangunan", e.target.value)}
          className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
          placeholder="Ukuran Properti - Bangunan"
        />
      </div>

      {/* Ukuran Properti - Bangunan */}
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-gray-700 w-48 flex-shrink-0">
          Sumber Kepemilikan
        </label>
        <select
          value={modalData.sumberKepemilikan || ""}
          onChange={(e) => handleSelectChange("sumberKepemilikan")(e.target.value)}
          className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
        >
          <option value="">Pilih Kepemilikan</option>
          <option value="1">Warisan</option>
          <option value="2">Hasil Sendiri</option>
          <option value="3">Utang</option>
          <option value="4">Hibah</option>
          <option value="5">Hadiah</option>
          <option value="6">Sumber Lainnya</option>
        </select>
      </div>

      {/*  Nomor Sertifikat */}
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-gray-700 w-48 flex-shrink-0">
          Nomor Sertifikat
          <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={modalData.nomorSertifikat || ""}
          onChange={(e) => updateModalData("nomorSertifikat", e.target.value)}
          className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
          placeholder="Nomor Sertifikat"
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

export default FormFieldA6;
