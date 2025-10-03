import React from "react";
import {
  formatRupiah,
  formatNumber,
  parseFormattedNumber,
} from "../../utils/formatCurrency";

const FormFieldA2 = ({ modalData, updateModalData }) => {
  // Function untuk mengekstrak kode dari deskripsi
  // const handleDeskripsiChange = (selectedValue) => {
  //   updateModalData("deskripsi", selectedValue);

  //   // Ekstrak kode dari value yang dipilih (4 digit pertama)
  //   if (selectedValue) {
  //     const kode = selectedValue.substring(0, 4);
  //     updateModalData("kode", kode);
  //   } else {
  //     updateModalData("kode", "");
  //   }
  // };

   const handleSelectChange = (fieldName) => (selectedValue) => {
    updateModalData(fieldName, selectedValue);

    // Logic khusus berdasarkan field yang diubah
    switch (fieldName) {
      case "deskripsi":
        // Ekstrak kode dari value yang dipilih (4 digit pertama)
        if (selectedValue) {
          const kode = selectedValue.substring(0, 4);
          updateModalData("kode", kode);
        } else {
          updateModalData("kode", "");
        }
        break;
        
      case "keterangan":
        // Logic tambahan untuk keterangan jika diperlukan
        console.log("Keterangan dipilih:", selectedValue);
        break;
        
      default:
        // Field lain tidak perlu logic khusus
        break;
    }
  };

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
          <option value="">Pilih jenis harta</option>
          <option value="0201: Piutang Usaha"> Piutang Usaha</option>
          <option value="0202:  Piutang Afiliasi"> Piutang Afiliasi</option>
          <option value="0209:  Piutang Lainnya"> Piutang Lainnya</option>
        </select>
      </div>

      {/* Lokasi Penerima */}
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-gray-700 w-48 flex-shrink-0">
          Lokasi Penerima
          <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={modalData.lokasipenerima || ""}
          onChange={(e) => updateModalData("lokasipenerima", e.target.value)}
          className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
          placeholder="Lokasi Penerima"
        />
      </div>

      {/* Nomor Identitas */}
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-gray-700 w-48 flex-shrink-0">
          Nomor Identitas
          <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          value={modalData.nomoridentitas || ""}
          onChange={(e) => updateModalData("nomoridentitas", e.target.value)}
          className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
          placeholder="Nomor Identitas"
        />
      </div>

      {/* Nama Penerima Pinjaman */}
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-gray-700 w-48 flex-shrink-0">
          Nama Penerima Pinjaman
          <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={modalData.penerimaPinjaman || ""}
          onChange={(e) => updateModalData("penerimaPinjaman", e.target.value)}
          className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
          placeholder="Nama Penerima Pinjaman"
        />
      </div>

      {/* Nilai Piutang */}
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-gray-700 w-48 flex-shrink-0">
          Nilai Piutang
          <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          min={0}
          value={formatNumber(modalData.nilaiPiutang)}
          onChange={handleNumericChange("nilaiPiutang")}
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-sm "
          placeholder="Masukkan jumlah nilai piutang"
          inputMode="numeric"
        />
      </div>

      {/* Tahun Dimulai */}
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-gray-700 w-48 flex-shrink-0">
          Tahun Dimulai
        </label>
        <select
          value={modalData.tahunDimulai || ""}
          onChange={(e) => handleSelectChange("tahunDimulai")( e.target.value)}
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

      {/* Saldo Piutang Saat ini */}
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-gray-700 w-48 flex-shrink-0">
          Saldo Piutang Saat Ini
          <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          min={0}
          value={formatNumber(modalData.SaldoPiutang)}
          onChange={handleNumericChange("SaldoPiutang")}
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-sm "
          placeholder="Saldo Piutang Saat Ini"
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
          onChange={(e) => handleSelectChange("keterangan") (e.target.value)}
          className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
        >
          <option value="">Pilih Keterangan</option>
          <option value="Harta PPS">Harta PPS</option>
          <option value="Harta  Investasi"> Harta Investasi PPS</option>
        </select>
      </div>
    </div>
  );
};

export default FormFieldA2;
