import React, { useEffect } from "react";
import { formatRupiah, formatNumber, parseFormattedNumber } from "../../../utils/formatCurrency";

const KODE_PENGHASILAN = [
  {
    id: 1,
    kode: "303",
    deskripsi: "Dividen atau bagian laba",
  },
  {
    id: 2,
    kode: "401",
    deskripsi: "Pembebasan utang",
  },
  {
    id: 3,
    kode: "402",
    deskripsi: "Hibah",
  },
  {
    id: 4,
    kode: "403",
    deskripsi: "Bantuan/sumbangan",
  },
  {
    id: 5,
    kode: "404",
    deskripsi: "Warisan",
  },
  {
    id: 6,
    kode: "405",
    deskripsi: "Penerima Zakat",
  },
  {
    id: 7,
    kode: "406",
    deskripsi: "Bagian laba anggota CV ",
  },
  {
    id: 8,
    kode: "407",
    deskripsi: "Klaim asuransi",
  },
  {
    id: 9,
    kode: "408",
    deskripsi: "Beasiswa ",
  },
  {
    id: 10,
    kode: "409",
    deskripsi: "Hadiah ",
  },

  {
    id: 11,
    kode: "424",
    deskripsi: "Natura dan kenikmatan yang dikecualikan  ",
  },
  {
    id: 12,
    kode: "425",
    deskripsi: "SHU koperasi ",
  },
  {
    id: 13,
    kode: "498",
    deskripsi: "Penghasilan lain yang tidak termasuk objek pajak",
  },
];

const FormFieldPenghasilanC = ({ modalData, updateModalData }) => {
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

      {/*  Jenis penghasilan dengan mapping */}
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-gray-700 w-48 flex-shrink-0">
          Jenis Penghasilan
        </label>
        <select
          value={modalData.jenis || ""}
          onChange={(e) => handleSelectChange("jenis")(e.target.value)}
          className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
        >
          <option value="">Pilih Jenis Penghasilan</option>
          {KODE_PENGHASILAN.map((item) => (
            <option key={item.id} value={item.kode}>
              {item.deskripsi}
            </option>
          ))}
        </select>
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

      {/* Nama Pemotong / Pemumut PPh */}
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-gray-700 w-48 flex-shrink-0">
          Nama Pemotong / Pemumut PPh <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={modalData.namaPemotong || ""}
          onChange={(e) => updateModalData("namaPemotong", e.target.value)}
          className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
          placeholder="Nama Pemotong /Pemumut PPh"
        />
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

      {/* Laba Kotor*/}
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-gray-700 w-48 flex-shrink-0">
          Laba Kotor <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          min={0}
          value={formatNumber(modalData.labaKotor)}
          onChange={handleNumericChange("labaKotor")}
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-sm "
          placeholder="Masukkan jumlah laba kotor"
          inputMode="numeric"
        />
      </div>
    </div>
  );
};

export default FormFieldPenghasilanC;
