import React, { useEffect } from "react";
import { formatRupiah, formatNumber, parseFormattedNumber } from "../../../utils/formatCurrency";

const KODE_PENGHASILAN = [
  {
    id: 1,
    kode: "28-423-01",
    deskripsi:
      "Gaji, upah, honorarium, tunjangan, dan pembayaran lain sehubungan dengan pekerjaan atau jabatan",
  },
  { id: 2, kode: "28-423-99", deskripsi: "PPh final sesuai PP-55/2022 (Disetor Sendiri)" },
  {
    id: 3,
    kode: "28-404-01",
    deskripsi: "bunga tabungan dan bunga deposito yang ditempatkan di DN (selain dari DHE)",
  },
  {
    id: 4,
    kode: "28-401-01",
    deskripsi: "bunga obligasi, SUN, atau obligasi daerah yang diterima WP DN dan BUT",
  },
  {
    id: 5,
    kode: "28-406-01",
    deskripsi: "transaksi penjualan saham di bursa efek (bukan saham pendiri)",
  },
  { id: 6, kode: "21-401-01", deskripsi: "uang pesangon yang dibayarkan sekaligus" },
  {
    id: 7,
    kode: "21-402-02",
    deskripsi:
      "honor atau imbalan lain APBN atau APBD yang diterima PNS/TNI/POLRI dan pensiunannya",
  },
  {
    id: 8,
    kode: "28-417-02",
    deskripsi: "bunga simpanan yang dibayarkan oleh koperasi kepada anggota WP OP",
  },
  { id: 9, kode: "28-419-01", deskripsi: "dividen yang diterima/diperoleh WP OP DN" },
  { id: 10, kode: "28-402-01", deskripsi: "pengalihan hak atas tanah dan/atau bangunan" },
  { id: 11, kode: "28-403-02", deskripsi: "persewaan tanah dan/atau bangunan" },
  {
    id: 12,
    kode: "28-409-10",
    deskripsi: "jasa konstruksi berupa jasa pelaksanaan konstruksi (kualifikasi usaha kecil)",
  },
  {
    id: 13,
    kode: "28-499-99",
    deskripsi:
      "penghasilan istri dari satu pemberi kerja yang hak dan kewajiban perpajakannya dilaksanakan oleh kepala keluarga",
  },
];

const FormFieldPenghasilan = ({ modalData, updateModalData }) => {
  const handleSelectChange = (fieldName) => (selectedValue) => {
    updateModalData(fieldName, selectedValue);

    // Logic khusus berdasarkan field yang diubah
    switch (fieldName) {
      case "jenis":
        console.log("jenis dipilih:", selectedValue);
        if (selectedValue) {
          // IMPROVED: Cari data lengkap dari KODE_PENGHASILAN
          const selectedPenghasilan = KODE_PENGHASILAN.find((item) => item.kode === selectedValue);

          if (selectedPenghasilan) {
            updateModalData("kode", selectedPenghasilan.kode);
            updateModalData("jenisId", selectedPenghasilan.id); // Simpan ID untuk BE
            updateModalData("jenisDeskripsi", selectedPenghasilan.deskripsi); // Simpan deskripsi

            console.log("Data penghasilan lengkap:", selectedPenghasilan);
          }
        } else {
          updateModalData("kode", "");
          updateModalData("jenisId", "");
          updateModalData("jenisDeskripsi", "");
        }
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
          type="number"
          value={modalData.npwpPemotong || ""}
          onChange={(e) => updateModalData("npwpPemotong", e.target.value)}
          className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
          placeholder="Nomor Identitas Pemotong /Pemumut PPh"
        />
      </div>

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

      {/*Jenis penghasilan dengan mapping */}
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-gray-700 w-48 flex-shrink-0">
          Jenis Penghasilan
        </label>
        <select
          value={modalData.jenis || ""}
          onChange={(e) => handleSelectChange("jenis")(e.target.value)}
          className="w-full p-2 pr-9
        border rounded-md text-sm bg-white
        focus:ring-2 focus:ring-blue-500
        appearance-none
        overflow-hidden text-ellipsis whitespace-nowrap"
        >
          <option value="">Pilih Jenis Penghasilan</option>
          {KODE_PENGHASILAN.map((item) => (
            <option key={item.id} value={item.kode}>
              {item.deskripsi}
            </option>
          ))}
        </select>
      </div>

      {/*Preview data yang dipilih */}
      {/* {modalData.jenis && (
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-gray-700 w-48 flex-shrink-0">
            Preview
          </label>
          <div className="flex-1 p-2 bg-blue-50 border border-blue-200 rounded-md text-sm">
            <div><strong>ID:</strong> {modalData.jenisId}</div>
            <div><strong>Kode:</strong> {modalData.kode}</div>
            <div><strong>Deskripsi:</strong> {modalData.jenisDeskripsi}</div>
          </div>
        </div>
      )} */}

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
          PPh Yang Dipotong / Dipungut <span className="text-red-500">*</span>
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

export default FormFieldPenghasilan;
