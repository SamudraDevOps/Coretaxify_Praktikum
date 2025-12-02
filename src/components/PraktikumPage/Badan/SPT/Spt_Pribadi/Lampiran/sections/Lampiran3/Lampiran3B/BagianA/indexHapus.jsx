import React, { useState } from "react";
import RekapitulasiPajakFinal from "./RekapitulasiPajakFinal";
import ModalPajakFinal from "@lampiran/Lampiran3B/RekapitulasiPajakFinal/form/ModalPajakFinal";
import { buildSchema } from "@lampiran/Lampiran3B/RekapitulasiPajakFinal/form/schemas";
import { updateTotalRow } from "@lampiran/Lampiran3B/RekapitulasiPajakFinal/form/helper";

//  ROWS PATEN: isi lengkap sesuai struktur (dengan type & level)
const ROWS = [
  // Header
  // {
  //   id: "header-pajak-final",
  //   type: "header",
  //   level: 0,
  //   keterangan: "REKAPITULASI PENGHASILAN YANG DIKENAKAN PPh FINAL",
  // },

  {
    id: "TKU-1",
    type: "line",
    level: 0,
    namaTKU: "JUMLAH PEREDARAN BRUTO",
    januari: 0,
    februari: 0,
    maret: 0,
    april: 0,
    mei: 0,
    juni: 0,
    juli: 0,
    agustus: 0,
    september: 0,
    oktober: 0,
    november: 0,
    desember: 0,
  },

  {
    id: "TKU-2",
    type: "line",
    level: 0,
    namaTKU: "AKUMULASI PEREDARAN BRUTO",
    januari: 0,
    februari: 0,
    maret: 0,
    april: 0,
    mei: 0,
    juni: 0,
    juli: 0,
    agustus: 0,
    september: 0,
    oktober: 0,
    november: 0,
    desember: 0,
  },

  {
    id: "TKU-3",
    type: "header",
    level: 0,
    namaTKU: "PEREDARAN BRUTO TIDAK KENA PAJAK",
    januari: 0,
    februari: 0,
    maret: 0,
    april: 0,
    mei: 0,
    juni: 0,
    juli: 0,
    agustus: 0,
    september: 0,
    oktober: 0,
    november: 0,
    desember: 0,
  },

  {
    id: "TKU-4",
    type: "line",
    level: 0,
    namaTKU: "PEREDARAN BRUTO KENA PAJAK",
    januari: 0,
    februari: 0,
    maret: 0,
    april: 0,
    mei: 0,
    juni: 0,
    juli: 0,
    agustus: 0,
    september: 0,
    oktober: 0,
    november: 0,
    desember: 0,
  },

  {
    id: "TKU-5",
    type: "line",
    level: 0,
    namaTKU: "JUMLAH Pph BERSIFAT FINAL TERUTANG",
    januari: 0,
    februari: 0,
    maret: 0,
    april: 0,
    mei: 0,
    juni: 0,
    juli: 0,
    agustus: 0,
    september: 0,
    oktober: 0,
    november: 0,
    desember: 0,
  },
  {
    id: "TKU-6",
    type: "line",
    level: 0,
    namaTKU: "Pph FINAL YANG DI SETOR SENDIRI",
    januari: 0,
    februari: 0,
    maret: 0,
    april: 0,
    mei: 0,
    juni: 0,
    juli: 0,
    agustus: 0,
    september: 0,
    oktober: 0,
    november: 0,
    desember: 0,
  },

  {
    id: "TKU-7",
    type: "line",
    level: 0,
    namaTKU: "Pph FINAL YANG DIPOTONG/DIPUNGUT OLEH PIHAK LAIN",
    januari: 0,
    februari: 0,
    maret: 0,
    april: 0,
    mei: 0,
    juni: 0,
    juli: 0,
    agustus: 0,
    september: 0,
    oktober: 0,
    november: 0,
    desember: 0,
  },

  // Total (Grand Total)
  {
    id: "total-pajak-final",
    type: "total",
    level: 0,
    keterangan: "JUMLAH TOTAL",
    januari: 0,
    februari: 0,
    maret: 0,
    april: 0,
    mei: 0,
    juni: 0,
    juli: 0,
    agustus: 0,
    september: 0,
    oktober: 0,
    november: 0,
    desember: 0,
  },
];

export default function BagianA() {
  const [rows, setRows] = useState(ROWS);
  const [open, setOpen] = useState(false);
  const [schema, setSchema] = useState([]);
  const [selected, setSelected] = useState(null);

  const openModal = (row) => {
    // untuk header/label/subtotal/total → lock semua field (sama seperti LaporanLabaRugi)
    const isReadOnlyRow = row.type !== "line";
    const dyn = isReadOnlyRow
      ? [
          { name: "namaTKU", readOnly: true },
          { name: "januari", readOnly: true },
          { name: "februari", readOnly: true },
          { name: "maret", readOnly: true },
          { name: "april", readOnly: true },
          { name: "mei", readOnly: true },
          { name: "juni", readOnly: true },
          { name: "juli", readOnly: true },
          { name: "agustus", readOnly: true },
          { name: "september", readOnly: true },
          { name: "oktober", readOnly: true },
          { name: "november", readOnly: true },
          { name: "desember", readOnly: true },
          { name: "total", readOnly: true },
        ]
      : [
          // untuk baris line, namaTKU & total readonly
          { name: "namaTKU", readOnly: true },
          { name: "total", readOnly: true },
        ];

    setSchema(buildSchema(row, dyn));
    setSelected(row);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setSelected(null);
  };

  const onSubmit = (values) => {
    // Update row yang diedit
    const updatedRows = rows.map((r) => (r.id === selected.id ? { ...r, ...values } : r));

    // Auto-calculate total row (sum semua line rows)
    const finalRows = updateTotalRow(updatedRows);
    console.log(">>> submit dari modal", values);
    setRows((prev) => prev.map((r) => (r.id === selected.id ? { ...r, ...values } : r)));
    closeModal();
  };

  return (
    <>
      <RekapitulasiPajakFinal rows={rows} openModal={openModal} />
      <ModalPajakFinal
        open={open}
        onClose={closeModal}
        title={selected ? "UBAH" : "UBAH"}
        schema={schema}
        initialData={selected || {}}
        onSubmit={onSubmit}
      />
    </>
  );
}
