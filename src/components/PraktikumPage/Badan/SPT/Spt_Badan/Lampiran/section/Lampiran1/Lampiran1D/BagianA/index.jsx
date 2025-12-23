import React, { useState } from "react";
import { parseFormattedNumber, formatNumber, toNumber } from "@utils/formatCurrency";
import { MASTER_AKUN_LAPORAN_LABA_RUGI, createLineRow } from "@shared/akunList";
import { getLampiran1FieldConfig } from "@shared/lampiran1FieldConfig";
import LaporanLabaRugi from "./LaporanLabaRugi";
import GlobalModal from "@shared/GlobalModal";
import {
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
  // Pendapatan
  4021: ["jasa"],
  4013: ["jasa"],
  5020: ["jasa"],
  4300: ["jasa"],
  4199: ["jasa"],

  //Beban

  5311: ["jasa"],
  5312: ["jasa"],
  5313: ["jasa"],
  5314: ["jasa"],
  5315: ["jasa"],
  5316: ["jasa"],
  5317: ["jasa"],
  5318: ["jasa"],
  5319: ["jasa"],
  5320: ["jasa"],
  5321: ["jasa"],
  5399: ["jasa"],
  5400: ["jasa"],
  4500: ["jasa"],

  // Pendapatan Non Usaha

  4501: ["jasa"],
  4503: ["jasa"],
  4511: ["jasa"],
  4599: ["jasa"],
  4600: ["jasa"],

  // Beban Non Usaha

  5405: ["jasa"],
  5409: ["jasa"],
  5421: ["jasa"],
  5499: ["jasa"],
  5500: ["jasa"],
  4700: ["jasa"],
  4800: ["jasa"],
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
  // GROUP PENDAPATAN
  { id: "g-pendapatan", type: "header", level: 0, keterangan: "Pendapatan" },

  ...pickByKode(["4021"]),

  ...pickByKode(["4013", "5020"]).map((row) => {
    if ((row.kodeAkun === "4013", "4013")) {
      return {
        ...row,
        level: 1,
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
        level: 0,
      };
    }
    return row;
  }),

  ...pickByKode(["4199"]),

  // Group BEBAN
  { id: "g-beban", type: "header", level: 0, keterangan: "Beban Usaha" },

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

  // DIKURANGI:
  // { id: "label-dikurangi", type: "label", level: 0, keterangan: "Dikurangi :" },
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
      // Rumus: nilaiKomersial - (nonObjekPajak + pphFinal) - (penyesuaianPositif - penyesuaianNegatif)
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

    // Recalculate subtotal Laba Kotor untuk kode 4300
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
      // id: [fieldKey, ...]
      4013: ["nonObjekPajak", "pphFinal"],
      5020: ["nonObjekPajak", "pphFinal"],
      5311: ["nonObjekPajak", "pphFinal"],
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
      4599: ["penyesuaianPositif", "penyesuaianNegatif", "kodePenyesuaian"],
      5405: ["nonObjekPajak", "pphFinal"],
      5409: ["nonObjekPajak", "pphFinal"],
      5421: ["nonObjekPajak", "pphFinal"],
    },
  });

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
