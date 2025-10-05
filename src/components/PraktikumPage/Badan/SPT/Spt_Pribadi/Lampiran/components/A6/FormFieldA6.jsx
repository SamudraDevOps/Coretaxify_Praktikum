import React from "react";
import {
  formatRupiah,
  formatNumber,
  parseFormattedNumber,
} from "../../utils/formatCurrency";

const FormFieldA5 = ({ modalData, updateModalData }) => {
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
          <option value="0601: Paten">Paten</option>
          <option value="0602: Royalti">Royalti</option>
          <option value="0603: Merek dagang">Merek dagang</option>
          <option value="0699: Harta Tidak Berwujud Lainnya">Harta Tidak Berwujud Lainnya</option>
          <option value="0701: Emas batangan">Emas batangan</option>
          <option value="0702: Emas perhiasan">Emas perhiasan</option>
          <option value="0703: Batangan non emas">Batangan non emas</option>
          <option value="0704: Perhiasan non emas">Perhiasan non emas</option>
          <option value="0705: Permata">Permata</option>
          <option value="0706: Barang-barang seni dan antic">Barang-barang seni dan antic</option>
          <option value="0707: Peralatan olahraga khusus">Peralatan olahraga khusus</option>
          <option value="0708: Peralatan elektronik">Peralatan elektronik</option>
          <option value="0709: Perabot rumah tangga">Perabot rumah tangga</option>
          <option value="0710: Peralatan kantor">Peralatan kantor</option>
          <option value="0711: Jet Ski">Jet Ski</option>
          <option value="0712: Persediaan Usaha">Persediaan Usaha</option>
          <option value="0799: Harta Lainnya">Harta Lainnya</option>
        </select>
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

      {/* Bukti Kepemilikan / Nomor Akun */}
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-gray-700 w-48 flex-shrink-0">
          Bukti Kepemilikan / Nomor Akun
          <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={modalData.buktiKepemilikan || ""}
          onChange={(e) => updateModalData("buktiKepemilikan", e.target.value)}
          className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
          placeholder="Bukti Kepemilikan / Nomor Akun"
        />
      </div>

      {/* Informasi Tambahan */}
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-gray-700 w-48 flex-shrink-0">
          Informasi Tambahan
          <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={modalData.InformasiTambahan || ""}
          onChange={(e) => updateModalData("InformasiTambahan", e.target.value)}
          className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
          placeholder="Informasi Tambahan"
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

export default FormFieldA5;
