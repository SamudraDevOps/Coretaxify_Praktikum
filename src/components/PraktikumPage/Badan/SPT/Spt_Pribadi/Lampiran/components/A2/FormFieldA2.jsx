import React from "react";
import {
  formatRupiah,
  formatNumber,
  parseFormattedNumber,
} from "../../utils/formatCurrency";

// Function untuk mengekstrak kode dari deskripsi
  const handleDeskripsiChange = (selectedValue) => {
    updateModalData("deskripsi", selectedValue);

    // Ekstrak kode dari value yang dipilih (4 digit pertama)
    if (selectedValue) {
      const kode = selectedValue.substring(0, 4);
      updateModalData("kode", kode);
    } else {
      updateModalData("kode", "");
    }
  };

  // Function untuk handle input saldo menggunakan utility function
  const handleSaldoChange = (e) => {
    const numericValue = parseFormattedNumber(e.target.value);
    updateModalData("saldo", numericValue);
  };


const FormFieldA2 = ({ modalData, updateModalData }) => {
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
            onChange={(e) => handleDeskripsiChange(e.target.value)}
            className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value="">Pilih jenis harta</option>
            <option value="0101: Uang Tunai/Bank Note/Koin">
              Uang Tunai/Bank Note/Koin
            </option>
            <option value="0102: Tabungan (Bank/Lembaga Keuangan)">
              Tabungan (Bank/Lembaga Keuangan)
            </option>
            <option value="0103: Giro"> Giro</option>
            <option value="0104: Deposito"> Deposito</option>
            <option value="0105: Uang elektronik"> Uang elektronik</option>
            <option value="0106: Cek"> Cek</option>
            <option value="0107: Wessel"> Wessel</option>
            <option value="0108: Kertas komersial">Kertas komersial</option>
            <option value="0109: Setara Kas Lainnya">Setara Kas Lainnya</option>
          </select>
        </div>
  
        {/* Bukti Kepemilikan/Nomor Akun */}
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-gray-700 w-48 flex-shrink-0">
            Bukti Kepemilikan/Nomor Akun
          </label>
          <input
            type="text"
            value={modalData.buktikepemilikan || ""}
            onChange={(e) => updateModalData("buktikepemilikan", e.target.value)}
            className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
            placeholder="Nomor Rekening, Nomor Kartu, dll"
          />
        </div>
  
        {/* Atas Nama */}
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-gray-700 w-48 flex-shrink-0">
            Atas Nama
          </label>
          <input
            type="text"
            value={modalData.atasnama || ""}
            onChange={(e) => updateModalData("atasnama", e.target.value)}
            className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
            placeholder="Nama yang didaftarkan dalam rekening"
          />
        </div>
  
        {/* Nama Bank/Institusi */}
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-gray-700 w-48 flex-shrink-0">
            Nama Bank/Institusi
          </label>
          <input
            type="text"
            value={modalData.namabank || ""}
            onChange={(e) => updateModalData("namabank", e.target.value)}
            className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
            placeholder="Nama Bank/Institusi"
          />
        </div>
  
        {/* Lokasi Harta */}
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-gray-700 w-48 flex-shrink-0">
            Lokasi Harta
          </label>
          <input
            type="text"
            value={modalData.lokasiharta || ""}
            onChange={(e) => updateModalData("lokasiharta", e.target.value)}
            className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
            placeholder="Indonesia"
          />
        </div>
  
        {/* Tahun Perolehan */}
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-gray-700 w-48 flex-shrink-0">
            Tahun Perolehan
          </label>
          <input
            type="date"
            value={modalData.tahunperolehan || ""}
            onChange={(e) => updateModalData("tahunperolehan", e.target.value)}
            className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>
  
        {/* Saldo */}
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-gray-700 w-48 flex-shrink-0">
            Saldo
          </label>
          <div className="flex-1">
            <input
              type="text"
              min={0}
              value={formatNumber(modalData.saldo)}
              onChange={handleSaldoChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-sm "
              placeholder="Masukkan jumlah saldo"
              inputMode="numeric"
            />
            {/* <p className="text-xs text-gray-500 mt-1">
              {modalData.saldo ? formatRupiah(modalData.saldo) : "Rp 0"}
            </p> */}
          </div>
        </div>
  
        {/* Keterangan */}
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-gray-700 w-48 flex-shrink-0">
            Keterangan
          </label>
          <input
            type="text"
            value={modalData.keterangan || ""}
            onChange={(e) => updateModalData("keterangan", e.target.value)}
            className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
            placeholder="Keterangan tambahan (opsional)"
          />
        </div>
      </div>
    );
  };
  

export default FormFieldA2;