import React from "react";
import {
  formatRupiah,
  formatNumber,
  parseFormattedNumber,
} from "../../../utils/formatCurrency";

const FormFieldA3 = ({ modalData, updateModalData }) => {
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
        // Logic tambahan untuk keterangan jika diperlukan
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
          <option value="">Pilih jenis harta</option>
          <option value="0301: Saham yang dibeli untuk dijual kembali ">
            Saham yang dibeli untuk dijual kembali
          </option>
          <option value="0302: Saham Non Bursa"> Saham Non Bursa</option>
          <option value="0303:  Saham Bursa"> Saham Bursa</option>

          <option value="0304: Obligasi Perusahaan">Obligasi Perusahaan</option>
          <option value="0305: Obligasi Pemerintah">Obligasi Pemerintah</option>
          <option value="0306: Surat Utang Lainnya">Surat Utang Lainnya</option>
          <option value="0307: Kontrak Investasi Kolektif (KIK) Indonesia">
            Kontrak Investasi Kolektif (KIK) Indonesia
          </option>
          <option value="0308: Instrumen derivative">
            Instrumen derivative
          </option>
          <option value="0309: Penyertaan modal dalam perusahaan lain yang bukan atas saham">
            Penyertaan modal dalam perusahaan lain yang bukan atas saham
          </option>
          <option value="0310: Asuransi"> Asuransi </option>
          <option value="0311: Unit link di Asuransi">
            Unit link di Asuransi
          </option>
          <option value="0399: Investasi lainnya"> Investasi lainnya </option>
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
          value={modalData.lokasiharta || ""}
          onChange={(e) => updateModalData("lokasiharta", e.target.value)}
          className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
          placeholder="Lokasi Harta"
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

      {/*  Nama Bank/Institusi/Penerima Investasi */}
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-gray-700 w-48 flex-shrink-0">
          Nama Bank/Institusi/Penerima Investasi
          <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={modalData.penerimaInvestasi || ""}
          onChange={(e) => updateModalData("penerimaInvestasi", e.target.value)}
          className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
          placeholder="Nama Bank/Institusi/Penerima Investasi"
        />
      </div>

      {/* Bukti Kepemilikan/Nomor Akun */}
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-gray-700 w-48 flex-shrink-0">
          Bukti Kepemilikan/Nomor Akuns
          <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          value={modalData.buktiKepemilikan || ""}
          onChange={(e) => updateModalData("buktiKepemilikan", e.target.value)}
          className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
          placeholder="Bukti Kepemilikan/Nomor Akun"
        />
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

       {/* Tahun Perolehan */}
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-gray-700 w-48 flex-shrink-0">
          Tahun Perolehan
        </label>
        <select
          value={modalData.tahunPerolehan || ""}
          onChange={(e) => handleSelectChange("tahunPerolehan")( e.target.value)}
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

export default FormFieldA3;
