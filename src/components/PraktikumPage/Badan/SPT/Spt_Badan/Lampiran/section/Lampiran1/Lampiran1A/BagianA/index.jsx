import React, { useState } from "react";
import { parseFormattedNumber, formatNumber, toNumber } from "@utils/formatCurrency";
import { MASTER_AKUN_LAPORAN_LABA_RUGI, createLineRow } from "@shared/akunList";
import { getLampiran1FieldConfig } from "@shared/lampiran1FieldConfig";
import LaporanLabaRugiTabel from "../../shared/LaporanLabaRugiTabel";
import GlobalModal from "@shared/GlobalModal";
import {
  hitungSubtotal4004,
  hitungSubtotal4020,
  hitungSubtotal5020,
  hitungSubtotal4300,
  hitungSubtotal5400,
  hitungSubtotal4500,
  hitungSubtotal4600,
  hitungSubtotal5500,
  hitungTotal4700,
  hitungTotal4800,
} from "./utils/labaRugiSubtotal";

// Opsi dropdown Kode Koreksi Fiskal
const KODE_KOREKSI_OPTIONS = [
  { value: "", label: "" },
  {
    value: "FPO-01",
    label: "Fees charged/issued for the personal interest of the Taxpayer or his dependents",
  },
  {
    value: "FPO-02",
    label:
      "Health insurance premiums, accident insurance, life insurance, endowment insurance, and scholarship insurance paid by the taxpayer",
  },
  {
    value: "FPO-03",
    label: "Replacement or compensation for work or services in kind and enjoyment",
  },
  {
    value: "FPO-04",
    label:
      "Amounts that exceed the reasonable amount paid to related parties in connection with the work performed",
  },
  {
    value: "FPO-05",
    label: "Donated property, help or donation",
  },
  {
    value: "FPO-06",
    label: "Income Tax",
  },
  {
    value: "FPO-07",
    label: "Salary paid to the owner/person who is his dependents",
  },
  {
    value: "FPO-08",
    label: "Administrative sanctions",
  },
  {
    value: "FPO-09",
    label: "The difference between commercial depreciation over fiscal depreciation",
  },
  {
    value: "FPO-10",
    label: "The difference between commercial amortization over fiscal amortization",
  },

  {
    value: "FPO-11",
    label:
      "Fees for obtaining, collecting and maintaining income subject to Final Income Tax and income that is not included in the tax object",
  },
  {
    value: "FPO-12",
    label: "Another positive fiscal adjustment",
  },
  {
    value: "FNE-01",
    label:
      "Income that is subject to final income tax and income that is not included in the tax object but is included in the business cycle",
  },
  {
    value: "FNE-02",
    label: "The difference between commercial depreciation under fiscal depreciation",
  },
  {
    value: "FNE-03",
    label: "Amortization difference under fiscal amortization",
  },
  {
    value: "FNE-04",
    label: "Other negative fiscal adjustments",
  },
];

const AKUN_KONTEKS = {
  // Penjualan
  4002: ["umum"],
  4003: ["umum"],
  4004: ["umum"],

  // Penjualan Dikurangi

  4011: ["umum"],
  4012: ["umum"],
  4013: ["umum"],
  4020: ["umum"],

  // Harga Pokok Penjualan (HPP)

  5001: ["umum"],
  5003: ["umum"],
  5007: ["umum"],
  5008: ["umum"],
  5009: ["umum"],
  5020: ["umum"],
  4300: ["umum"],
  4199: ["umum"],

  // Beban Usaha

  5311: ["umum"],
  5312: ["umum"],
  5313: ["umum"],
  5314: ["umum"],
  5315: ["umum"],
  5316: ["umum"],
  5317: ["umum"],
  5318: ["umum"],
  5319: ["umum"],
  5320: ["umum"],
  5321: ["umum"],
  5322: ["umum"],
  5399: ["umum"],
  5400: ["umum"],
  4500: ["umum"],

  // Pendapatan Non Usaha

  4501: ["umum"],
  4503: ["umum"],
  4511: ["umum"],
  4599: ["umum"],
  4600: ["umum"],

  // Beban Non Usaha

  5405: ["umum"],
  5409: ["umum"],
  5421: ["umum"],
  5499: ["umum"],
  5500: ["umum"],
  4700: ["umum"],
  4800: ["umum"],
};

const LINE_ROWS = [];

Object.entries(AKUN_KONTEKS).forEach(([kodeAkun, jenisAktif]) => {
  // Ambil semua definisi akun dengan kode tsb
  const kandidat = MASTER_AKUN_LAPORAN_LABA_RUGI.filter((a) => a.kodeAkun === kodeAkun);

  if (!kandidat.length) {
    console.log(`Tidak ditemukan akun dengan kode ${kodeAkun}`);
    return;
  }

  // Cari akun yang jenisPerusahaannya MATCH dengan konteks aktif
  const cocok = kandidat.find(
    (a) =>
      Array.isArray(a.jenisPerusahaan) && a.jenisPerusahaan.some((jp) => jenisAktif.includes(jp))
  );

  if (!cocok) {
    console.error(
      `Tidak ditemukan akun untuk kode ${kodeAkun} dengan jenis perusahaan: ${jenisAktif.join(
        ", "
      )}`
    );
    return;
  }

  LINE_ROWS.push(createLineRow(cocok, 0));
});

console.log("LINE_ROWS:", LINE_ROWS);

// Validasi: tidak boleh ada ID duplikat
const ids = LINE_ROWS.map((r) => r.id);
if (new Set(ids).size !== ids.length) {
  throw new Error("Duplicate akun id dalam satu form Laba Rugi");
}

// Untuk menampilkan akun mana yang akan ditampilkan di tabel
const pickByKode = (kodes) => {
  return kodes.map((kode) => LINE_ROWS.find((r) => r.kodeAkun === kode)).filter(Boolean);
};
// ROWS STATIS
const INITIAL_ROWS = [
  // GROUP PENJUALAN
  { id: "g-penjualan", type: "header", level: 0, keterangan: "Penjualan" },

  ...pickByKode(["4002", "4003"]),

  ...pickByKode(["4004"]).map((row) => {
    if (row.kodeAkun === "4004") {
      return {
        ...row,
        type: "label",
        variant: "bold",
      };
    }
    return row;
  }),

  // DIKURANGI:
  { id: "label-dikurangi", type: "label", level: 0, keterangan: "Dikurangi :", variant: "bold" },

  ...pickByKode(["4011", "4012", "4013"]).map((row) => {
    if ((row.kodeAkun === "4011", "4012", "4013")) {
      return {
        ...row,
        level: 1,
      };
    }
    return row;
  }),

  ...pickByKode(["4020"]).map((row) => {
    if (row.kodeAkun === "4020") {
      return {
        ...row,
        type: "label",
        variant: "bold",
      };
    }
    return row;
  }),

  // GROUP Harga Pokok Penjualan (HPP)
  { id: "g-hpp", type: "header", level: 0, keterangan: "Harga Pokok Penjualan (HPP)" },

  ...pickByKode(["5001", "5003", "5007", "5008"]).map((row) => {
    if ((row.kodeAkun === "5001", "5003", "5007", "5008")) {
      return {
        ...row,
        level: 1,
      };
    }
    return row;
  }),

  ...pickByKode(["5009"]).map((row) => {
    if (row.kodeAkun === "5009") {
      return {
        ...row,
        level: 2,
      };
    }
    return row;
  }),

  ...pickByKode(["5020"]).map((row) => {
    if (row.kodeAkun === "5020") {
      return {
        ...row,
        type: "label",
        level: 1,
        variant: "bold",
      };
    }
    return row;
  }),

  ...pickByKode(["4300"]).map((row) => {
    if (row.kodeAkun === "4300") {
      return {
        ...row,
        type: "label",
        variant: "bold",
      };
    }
    return row;
  }),

  ...pickByKode(["4199"]),

  // GROUP Beban Usaha
  { id: "g-beban-usaha", type: "header", level: 0, keterangan: "Beban Usaha" },

  ...pickByKode([
    "5311",
    "5312",
    "5313",
    "5314",
    "5315",
    "5316",
    "5317",
    "5318",
    "5319",
    "5320",
    "5321",
    "5322",
    "5399",
  ]),
  ...pickByKode(["5400"]).map((row) => {
    if (row.kodeAkun === "5400") {
      return {
        ...row,
        type: "label",
        variant: "bold",
        level: 1,
      };
    }
    return row;
  }),
  ...pickByKode(["4500"]).map((row) => {
    if (row.kodeAkun === "4500") {
      return {
        ...row,
        type: "label",
        variant: "bold",
      };
    }
    return row;
  }),

  // Pendapatan Non Usaha

  { id: "g-pendapatan-non-usaha", type: "header", level: 0, keterangan: "Pendapatan Non Usaha" },

  ...pickByKode(["4501", "4503", "4511", "4599"]),

  ...pickByKode(["4600"]).map((row) => {
    if (row.kodeAkun === "4600") {
      return {
        ...row,
        type: "label",
        variant: "bold",
      };
    }
    return row;
  }),

  // Group BEBAN NON USAHA
  { id: "g-beban-non-usaha", type: "header", level: 0, keterangan: "Beban Non Usaha" },

  ...pickByKode(["5405", "5409", "5421", "5499"]),

  ...pickByKode(["5500"]).map((row) => {
    if (row.kodeAkun === "5500") {
      return {
        ...row,
        type: "label",
        variant: "bold",
        level: 1,
      };
    }
    return row;
  }),
  ...pickByKode(["4700", "4800"]).map((row) => {
    if ((row.kodeAkun === "4700", "4800")) {
      return {
        ...row,
        type: "label",
        variant: "bold",
      };
    }
    return row;
  }),
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
      const fieldsToWatch = [
        "nilaiKomersial",
        "nonObjekPajak",
        "pphFinal",
        "penyesuaianPositif",
        "penyesuaianNegatif",
      ];

      // Hitung tidakFinal otomatis HANYA jika user TIDAK sedang edit tidakFinal
      if (key !== "tidakFinal") {
        newData.tidakFinal =
          toNumber(newData.nilaiKomersial) -
          (toNumber(newData.nonObjekPajak) + toNumber(newData.pphFinal));
      }

      // Hitung nilaiFiskal otomatis
      if (fieldsToWatch.includes(key)) {
        newData.nilaiFiskal =
          toNumber(newData.nilaiKomersial) -
          (toNumber(newData.nonObjekPajak) + toNumber(newData.pphFinal)) -
          toNumber(newData.penyesuaianPositif) +
          toNumber(newData.penyesuaianNegatif);
      }

      return newData;
    });
  };

  // Save & recalculate subtotals
  const handleSave = (values) => {
    // Update row yang diedit
    let updatedRows = rows.map((r) => (r.id === selectedRow.id ? { ...r, ...values } : r));

    // Recalculate subtotal untuk kode 4004 Penjualan Bruto
    hitungSubtotal4004(updatedRows);

    // Recalculate subtotal untuk kode 4020 Penjualan Bersih
    hitungSubtotal4020(updatedRows);

    // Recalculate subtotal untuk kode 5020 Jumlah HPP
    hitungSubtotal5020(updatedRows);

    // Recalculate subtotal Laba Kotor untuk kode 4300 Laba Kotor
    hitungSubtotal4300(updatedRows);

    // Recalculate subtotal Jumlah Beban Usaha untuk kode 5400
    hitungSubtotal5400(updatedRows);

    // Recalculate subtotal Laba Rugi Usaha untuk kode 4500
    hitungSubtotal4500(updatedRows);

    // Recalculate subtotal Jumlah Pendapatan Non Usaha untuk kode 4600
    hitungSubtotal4600(updatedRows);

    // Recalculate subtotal Jumlah Beban Non Usaha untuk kode 5500
    hitungSubtotal5500(updatedRows);

    // Recalculate total Laba (Rugi) Non Usaha untuk kode 4700
    hitungTotal4700(updatedRows);

    // Recalculate total Laba (Rugi) Sebelum Pajak untuk kode 4800
    hitungTotal4800(updatedRows);

    setRows(updatedRows);
    closeModal();
    console.log("Saved values:", values);
  };

  // Build field config berdasarkan row type
  const fieldConfig = getLampiran1FieldConfig(selectedRow, {
    kodeKoreksiOptions: KODE_KOREKSI_OPTIONS,
    // Daftar kode yang field BISA diedit di pphTidakFinal dan nilaiFiskal

    editableTidakFinal: [],
    editableNilaiFiskal: [],
    // editableTidakFinal: [4021, 4199],
    // editableNilaiFiskal: [4021, 4199],

    // Field

    //  "nilaiKomersial",
    // "nonObjekPajak",
    // "pphFinal",
    // "penyesuaianPositif",
    // "penyesuaianNegatif",

    readOnlyFields: {
      4011: ["nonObjekPajak", "pphFinal"],
      4012: ["nonObjekPajak", "pphFinal"],
      4013: ["nonObjekPajak", "pphFinal"],

      5001: ["nonObjekPajak", "pphFinal"],
      5003: ["nonObjekPajak", "pphFinal"],
      5007: ["nonObjekPajak", "pphFinal"],
      5008: ["nonObjekPajak", "pphFinal"],
      5009: ["nonObjekPajak", "pphFinal"],

      5311: ["nonObjekPajak", "pphFinal"],
      5312: ["nonObjekPajak", "pphFinal"],
      5313: ["nonObjekPajak", "pphFinal"],
      5314: ["nonObjekPajak", "pphFinal"],
      5315: ["nonObjekPajak", "pphFinal"],
      5316: ["nonObjekPajak", "pphFinal"],
      5317: ["nonObjekPajak", "pphFinal"],
      5318: ["nonObjekPajak", "pphFinal"],
      5319: ["nonObjekPajak", "pphFinal"],
      5320: ["nonObjekPajak", "pphFinal"],
      5321: ["nonObjekPajak", "pphFinal"],
      5399: ["nonObjekPajak", "pphFinal"],

      5405: ["nonObjekPajak", "pphFinal"],
      5409: ["nonObjekPajak", "pphFinal"],
      5421: ["nonObjekPajak", "pphFinal"],
      5499: ["nonObjekPajak", "pphFinal"],
    },
  });

  return (
    <>
      <LaporanLabaRugiTabel
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
