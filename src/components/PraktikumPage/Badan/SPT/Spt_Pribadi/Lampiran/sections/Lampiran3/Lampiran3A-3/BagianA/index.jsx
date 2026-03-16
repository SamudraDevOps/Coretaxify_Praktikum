import React, { useState } from "react";
import LaporanLabaRugi from "./LaporanLabaRugi";
import GlobalModal from "@shared/GlobalModal";

// Opsi dropdown Kode Koreksi Fiskal
const KODE_KOREKSI_OPTIONS = [
  { value: "", label: "" },
  { value: "FPO-01", label: "FPO-01 Biaya yang dibebankan/..." },
  { value: "FPO-02", label: "FPO-02 Biaya natura/kenikmatan" },
  { value: "FPO-03", label: "FPO-03 Sanksi administrasi" },
  // Tambahkan sesuai kebutuhan
];

// Helper untuk convert value ke number
const toNum = (v) => (v === "" || v == null ? 0 : Number(v));

// ROWS STATIS
const INITIAL_ROWS = [
  // GROUP PENJUALAN
  { id: "g-penjualan", type: "header", level: 0, keterangan: "Penjualan" },
  {
    id: 4002,
    kodeAkun: "4002",
    keterangan: "Penjualan Domestik",
    type: "line",
    level: 0,
    nilaiKomersial: 0,
    nonObjekPajak: 0,
    pphFinal: 0,
    tidakFinal: 0,
    penyesuaianPositif: 0,
    penyesuaianNegatif: 0,
    kodePenyesuaian: "",
    nilaiFiskal: 0,
  },
  {
    id: 4003,
    kodeAkun: "4003",
    keterangan: "Penjualan Ekspor",
    type: "line",
    level: 0,
    nilaiKomersial: 0,
    nonObjekPajak: 0,
    pphFinal: 0,
    tidakFinal: 0,
    penyesuaianPositif: 0,
    penyesuaianNegatif: 0,
    kodePenyesuaian: "",
    nilaiFiskal: 0,
  },
  {
    id: 4004,
    kodeAkun: "4004",
    type: "subtotal",
    level: 0,
    keterangan: "Penjualan Bruto",
  },

  // DIKURANGI:
  { id: "label-dikurangi", type: "label", level: 0, keterangan: "Dikurangi :" },

  {
    id: 4011,
    kodeAkun: "4011",
    keterangan: "Retur",
    type: "line",
    level: 2,
    nilaiKomersial: 0,
    nonObjekPajak: 0,
    pphFinal: 0,
    tidakFinal: 0,
    penyesuaianPositif: 0,
    penyesuaianNegatif: 0,
    kodePenyesuaian: "",
    nilaiFiskal: 0,
  },
  {
    id: 4012,
    kodeAkun: "4012",
    keterangan: "Potongan Penjualan",
    type: "line",
    level: 2,
    nilaiKomersial: 0,
    nonObjekPajak: 0,
    pphFinal: 0,
    tidakFinal: 0,
    penyesuaianPositif: 0,
    penyesuaianNegatif: 0,
    kodePenyesuaian: "",
    nilaiFiskal: 0,
  },
  {
    id: 4020,
    kodeAkun: "4020",
    keterangan: "Penjualan Bersih",
    type: "subtotal",
    level: 2,
  },
  {
    id: 5040,
    kodeAkun: "5040",
    keterangan: "Biaya Bahan Baku",
    type: "line",
    level: 2,
    nilaiKomersial: 0,
    nonObjekPajak: 0,
    pphFinal: 0,
    tidakFinal: 0,
    penyesuaianPositif: 0,
    penyesuaianNegatif: 0,
    kodePenyesuaian: "",
    nilaiFiskal: 0,
  },
  {
    id: 5050,
    kodeAkun: "5050",
    keterangan: "Biaya Tenaga Kerja Langsung",
    type: "line",
    level: 1,
    nilaiKomersial: 0,
    nonObjekPajak: 0,
    pphFinal: 0,
    tidakFinal: 0,
    penyesuaianPositif: 0,
    penyesuaianNegatif: 0,
    kodePenyesuaian: "",
    nilaiFiskal: 0,
  },
  { id: "g-biaya-pabrikasi", type: "header", level: 0, keterangan: "Biaya Pabrikasi" },

  {
    id: 5051,
    kodeAkun: "5051",
    keterangan: "Biaya Tenaga Kerja Tidak Langsung",
    type: "line",
    level: 2,
    nilaiKomersial: 0,
    nonObjekPajak: 0,
    pphFinal: 0,
    tidakFinal: 0,
    penyesuaianPositif: 0,
    penyesuaianNegatif: 0,
    kodePenyesuaian: "",
    nilaiFiskal: 0,
  },
  {
    id: 5052,
    kodeAkun: "5052",
    keterangan: "Biaya Pemeliharaan dan Perbaikan Mesin",
    type: "line",
    level: 2,
    nilaiKomersial: 0,
    nonObjekPajak: 0,
    pphFinal: 0,
    tidakFinal: 0,
    penyesuaianPositif: 0,
    penyesuaianNegatif: 0,
    kodePenyesuaian: "",
    nilaiFiskal: 0,
  },
  {
    id: 5058,
    kodeAkun: "5058",
    keterangan: "Biaya Penyusutan dan Amortisasi",
    type: "line",
    level: 2,
    nilaiKomersial: 0,
    nonObjekPajak: 0,
    pphFinal: 0,
    tidakFinal: 0,
    penyesuaianPositif: 0,
    penyesuaianNegatif: 0,
    kodePenyesuaian: "",
    nilaiFiskal: 0,
  },
  {
    id: 5059,
    kodeAkun: "5059",
    keterangan: "Biaya Utilitas",
    type: "line",
    level: 2,
    nilaiKomersial: 0,
    nonObjekPajak: 0,
    pphFinal: 0,
    tidakFinal: 0,
    penyesuaianPositif: 0,
    penyesuaianNegatif: 0,
    kodePenyesuaian: "",
    nilaiFiskal: 0,
  },
  {
    id: 5069,
    kodeAkun: "5069",
    keterangan: "Biaya Pabrikasi Lainnya (termasuk pita cukai)",
    type: "line",
    level: 2,
    nilaiKomersial: 0,
    nonObjekPajak: 0,
    pphFinal: 0,
    tidakFinal: 0,
    penyesuaianPositif: 0,
    penyesuaianNegatif: 0,
    kodePenyesuaian: "",
    nilaiFiskal: 0,
  },
  {
    id: 5070,
    kodeAkun: "5070",
    keterangan: "Jumlah Biaya Pabrikasi",
    type: "subtotal",
    level: 2,
  },
  {
    id: 5080,
    kodeAkun: "5080",
    keterangan: "Jumlah Biaya Pabrikasi",
    type: "subtotal",
    level: 0,
  },

  {
    id: 5090,
    kodeAkun: "5090",
    keterangan: "Persediaan Awal Barang Dalam Proses ",
    type: "line",
    level: 2,
    nilaiKomersial: 0,
    nonObjekPajak: 0,
    pphFinal: 0,
    tidakFinal: 0,
    penyesuaianPositif: 0,
    penyesuaianNegatif: 0,
    kodePenyesuaian: "",
    nilaiFiskal: 0,
  },
  {
    id: 5099,
    kodeAkun: "5099",
    keterangan: "(Dikurangi Persediaan Akhir Dalam Proses )",
    type: "line",
    level: 2,
    nilaiKomersial: 0,
    nonObjekPajak: 0,
    pphFinal: 0,
    tidakFinal: 0,
    penyesuaianPositif: 0,
    penyesuaianNegatif: 0,
    kodePenyesuaian: "",
    nilaiFiskal: 0,
  },
  {
    id: 5100,
    kodeAkun: "5100",
    keterangan: "Jumlah Harga Pokok Produksi ",
    type: "subtotal",
    level: 0,
  },
  {
    id: 5008,
    kodeAkun: "5008",
    keterangan: "Persediaan Awal Barang Jadi",
    type: "line",
    level: 2,
    nilaiKomersial: 0,
    nonObjekPajak: 0,
    pphFinal: 0,
    tidakFinal: 0,
    penyesuaianPositif: 0,
    penyesuaianNegatif: 0,
    kodePenyesuaian: "",
    nilaiFiskal: 0,
  },
  {
    id: 5009,
    kodeAkun: "5009",
    keterangan: "(Dikurangi Persediaan Akhir Barang Jadi)",
    type: "line",
    level: 2,
    nilaiKomersial: 0,
    nonObjekPajak: 0,
    pphFinal: 0,
    tidakFinal: 0,
    penyesuaianPositif: 0,
    penyesuaianNegatif: 0,
    kodePenyesuaian: "",
    nilaiFiskal: 0,
  },
  {
    id: 5020,
    kodeAkun: "5020",
    keterangan: "Jumlah Harga Pokok Penjualan",
    type: "subtotal",
    level: 2,
  },
  {
    id: 4300,
    kodeAkun: "4300",
    keterangan: "Laba Kotor ",
    type: "subtotal",
    level: 0,
  },
  {
    id: "g-beban-operasional",
    type: "header",
    level: 0,
    keterangan: "Beban Operasional",
  },
  {
    id: 5311,
    kodeAkun: "5311",
    keterangan: "Gaji, Upah, Bonus, Grafikasi, Honorarium, THR, Dsb",
    type: "line",
    level: 1,
    nilaiKomersial: 0,
    nonObjekPajak: 0,
    pphFinal: 0,
    tidakFinal: 0,
    penyesuaianPositif: 0,
    penyesuaianNegatif: 0,
    kodePenyesuaian: "",
    nilaiFiskal: 0,
  },
  {
    id: 5313,
    kodeAkun: "5313",
    keterangan: "Biaya Transportasi",
    type: "line",
    level: 1,
    nilaiKomersial: 0,
    nonObjekPajak: 0,
    pphFinal: 0,
    tidakFinal: 0,
    penyesuaianPositif: 0,
    penyesuaianNegatif: 0,
    kodePenyesuaian: "",
    nilaiFiskal: 0,
  },
  {
    id: 5314,
    kodeAkun: "5314",
    keterangan: "Beban Penyusutan dan Amortisasi",
    type: "line",
    level: 1,
    nilaiKomersial: 0,
    nonObjekPajak: 0,
    pphFinal: 0,
    tidakFinal: 0,
    penyesuaianPositif: 0,
    penyesuaianNegatif: 0,
    kodePenyesuaian: "",
    nilaiFiskal: 0,
  },
  {
    id: 5315,
    kodeAkun: "5315",
    keterangan: "Biaya Bunga",
    type: "line",
    level: 1,
    nilaiKomersial: 0,
    nonObjekPajak: 0,
    pphFinal: 0,
    tidakFinal: 0,
    penyesuaianPositif: 0,
    penyesuaianNegatif: 0,
    kodePenyesuaian: "",
    nilaiFiskal: 0,
  },
  {
    id: 5316,
    kodeAkun: "5316",
    keterangan: "Beban Bunga",
    type: "line",
    level: 1,
    nilaiKomersial: 0,
    nonObjekPajak: 0,
    pphFinal: 0,
    tidakFinal: 0,
    penyesuaianPositif: 0,
    penyesuaianNegatif: 0,
    kodePenyesuaian: "",
    nilaiFiskal: 0,
  },
  {
    id: 5317,
    kodeAkun: "5317",
    keterangan: "Beban Sehubungan Dengan Jasa",
    type: "line",
    level: 1,
    nilaiKomersial: 0,
    nonObjekPajak: 0,
    pphFinal: 0,
    tidakFinal: 0,
    penyesuaianPositif: 0,
    penyesuaianNegatif: 0,
    kodePenyesuaian: "",
    nilaiFiskal: 0,
  },
  {
    id: 5318,
    kodeAkun: "5318",
    keterangan: "Beban Piutang Tidak Tertagih",
    type: "line",
    level: 1,
    nilaiKomersial: 0,
    nonObjekPajak: 0,
    pphFinal: 0,
    tidakFinal: 0,
    penyesuaianPositif: 0,
    penyesuaianNegatif: 0,
    kodePenyesuaian: "",
    nilaiFiskal: 0,
  },
  {
    id: 5320,
    kodeAkun: "5320",
    keterangan: "Biaya Pemasaran/Promosi",
    type: "line",
    level: 1,
    nilaiKomersial: 0,
    nonObjekPajak: 0,
    pphFinal: 0,
    tidakFinal: 0,
    penyesuaianPositif: 0,
    penyesuaianNegatif: 0,
    kodePenyesuaian: "",
    nilaiFiskal: 0,
  },
  {
    id: 5321,
    kodeAkun: "5321",
    keterangan: "Beban Entertaiment",
    type: "line",
    level: 1,
    nilaiKomersial: 0,
    nonObjekPajak: 0,
    pphFinal: 0,
    tidakFinal: 0,
    penyesuaianPositif: 0,
    penyesuaianNegatif: 0,
    kodePenyesuaian: "",
    nilaiFiskal: 0,
  },
  {
    id: 5322,
    kodeAkun: "5322",
    keterangan: "Beban Umum dan Administrasi",
    type: "line",
    level: 1,
    nilaiKomersial: 0,
    nonObjekPajak: 0,
    pphFinal: 0,
    tidakFinal: 0,
    penyesuaianPositif: 0,
    penyesuaianNegatif: 0,
    kodePenyesuaian: "",
    nilaiFiskal: 0,
  },
  {
    id: 5399,
    kodeAkun: "5399",
    keterangan: "Beban Operasional Lainnya",
    type: "line",
    level: 1,
    nilaiKomersial: 0,
    nonObjekPajak: 0,
    pphFinal: 0,
    tidakFinal: 0,
    penyesuaianPositif: 0,
    penyesuaianNegatif: 0,
    kodePenyesuaian: "",
    nilaiFiskal: 0,
  },
  {
    id: 5400,
    kodeAkun: "5400",
    keterangan: "Jumlah Beban Operasional",
    type: "subtotal",
    level: 0,
  },
  {
    id: 4800,
    kodeAkun: "4800",
    keterangan: "Laba (Rugi) Sebelum Pajak ",
    type: "subtotal",
    level: 0,
  },
];

export default function LabaRugi() {
  const [rows, setRows] = useState(INITIAL_ROWS);
  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  // Open modal edit
  const openEditModal = (row) => {
    setSelectedRow(row);
    setShowModal(true);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedRow(null);
  };

  // Auto-calculate handler (real-time di modal)
  const handleFieldChange = (key, value) => {
    setSelectedRow((prev) => {
      const newData = { ...prev, [key]: value };

      // Auto-calculate nilaiFiskal
      // Rumus: nilaiKomersial - (nonObjekPajak + pphFinal) + tidakFinal + (penyesuaianPositif - penyesuaianNegatif)
      const fieldsToWatch = [
        "nilaiKomersial",
        "nonObjekPajak",
        "pphFinal",
        "tidakFinal",
        "penyesuaianPositif",
        "penyesuaianNegatif",
      ];

      if (fieldsToWatch.includes(key)) {
        const k = toNum(newData.nilaiKomersial);
        const ttop = toNum(newData.nonObjekPajak) + toNum(newData.pphFinal);
        const tf = toNum(newData.tidakFinal);
        const adj = toNum(newData.penyesuaianPositif) - toNum(newData.penyesuaianNegatif);
        newData.nilaiFiskal = k - ttop + tf + adj;
      }

      return newData;
    });
  };

  // Save & recalculate subtotals
  const handleSave = (values) => {
    // Update row yang diedit
    let updatedRows = rows.map((r) => (r.id === selectedRow.id ? { ...r, ...values } : r));

    // TODO: Auto-calculate subtotal rows jika diperlukan
    // Contoh: hitung "Penjualan Bruto" = sum(4002, 4003)
    
    // Implementasikan logic subtotal sesuai kebutuhan bisnis

    setRows(updatedRows);
    closeModal();
    console.log("Saved values:", values);
  };

  // Build field config berdasarkan row type
  const getFieldConfig = () => {
    if (!selectedRow) return { baseFields: [], customChildren: [] };

    const isReadOnlyRow = selectedRow.type !== "line";

    return {
      baseFields: [],
      customChildren: [
        {
          key: "kodeAkun",
          type: "text",
          title: "Kode Akun",
          placeholder: "Kode Akun",
          required: true,
          readOnly: true,
          className: "bg-gray-100 text-gray-600",
        },
        {
          key: "keterangan",
          type: "text",
          title: "Keterangan",
          placeholder: "Keterangan",
          required: true,
          readOnly: true,
          className: "bg-gray-100 text-gray-600",
        },
        {
          key: "nilaiKomersial",
          type: "currency",
          title: "Nilai Komersial",
          placeholder: "0",
          required: false,
          readOnly: isReadOnlyRow,
          className: isReadOnlyRow ? "bg-gray-100 text-gray-600" : "",
        },
        {
          key: "nonObjekPajak",
          type: "currency",
          title: "Tidak Termasuk Objek Pajak",
          placeholder: "0",
          required: false,
          readOnly: isReadOnlyRow,
          className: isReadOnlyRow ? "bg-gray-100 text-gray-600" : "",
        },
        {
          key: "pphFinal",
          type: "currency",
          title: "Dikenakan PPh Final",
          placeholder: "0",
          required: false,
          readOnly: isReadOnlyRow,
          className: isReadOnlyRow ? "bg-gray-100 text-gray-600" : "",
        },
        {
          key: "tidakFinal",
          type: "currency",
          title: "Objek Pajak Tidak Final",
          placeholder: "0",
          required: false,
          readOnly: isReadOnlyRow,
          className: isReadOnlyRow ? "bg-gray-100 text-gray-600" : "",
        },
        {
          key: "penyesuaianPositif",
          type: "currency",
          title: "Koreksi Fiskal (+)",
          placeholder: "0",
          required: false,
          readOnly: isReadOnlyRow,
          className: isReadOnlyRow ? "bg-gray-100 text-gray-600" : "",
        },
        {
          key: "penyesuaianNegatif",
          type: "currency",
          title: "Koreksi Fiskal (−)",
          placeholder: "0",
          required: false,
          readOnly: isReadOnlyRow,
          className: isReadOnlyRow ? "bg-gray-100 text-gray-600" : "",
        },
        {
          key: "kodePenyesuaian",
          type: "select-search",
          title: "Kode Koreksi Fiskal",
          placeholder: "Silahkan pilih kode koreksi fiskal",
          required: false,
          options: KODE_KOREKSI_OPTIONS,
          readOnly: isReadOnlyRow,
          className: isReadOnlyRow ? "bg-gray-100 text-gray-600" : "",
        },
        {
          key: "nilaiFiskal",
          type: "currency",
          title: "Nilai Fiskal (Sebelum Fasilitas Perpajakan)",
          placeholder: "Auto Calculate",
          required: false,
          readOnly: true,
          className: "bg-gray-100 text-gray-600",
        },
      ],
    };
  };

  const fieldConfig = getFieldConfig();

  return (
    <>
      <LaporanLabaRugi
        rows={rows}
        openEditModal={openEditModal}
        kodeOptions={KODE_KOREKSI_OPTIONS}
      />

      <GlobalModal
        isOpen={showModal}
        onClose={closeModal}
        onSave={handleSave}
        title={`Edit ${selectedRow?.keterangan || ""}`}
        baseFields={fieldConfig.baseFields}
        customChildren={fieldConfig.customChildren}
        data={selectedRow || {}}
        size="2xl"
        onFieldChange={handleFieldChange}
      />
    </>
  );
}
