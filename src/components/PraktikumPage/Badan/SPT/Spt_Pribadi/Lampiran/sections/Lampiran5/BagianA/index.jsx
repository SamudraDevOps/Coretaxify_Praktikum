import React, { useState } from "react";
import KompensasiKerugian from "./KompensasiKerugian";
import ModalA from "@lampiran/Lampiran5/BagianA/form/ModalA";
import { buildSchema } from "@lampiran/Lampiran5/BagianA/form/schemas";
import { updateTotalRow, toNum } from "@lampiran/Lampiran5/BagianA/form/helper";

//  ROWS PATEN: isi lengkap sesuai yang dipingin bang pusing pala aing
const ROWS = [
  // GROUP PENJUALAN
  // { id: "g-penjualan", type: "header", level: 0, keterangan: "Penjualan" },
  {
    id: "2016",
    tahunPajak: "2016",
    labaRugi: 0,
    type: "line",
    2021: 0,
    2022: 0,
    2023: 0,
    2024: 0,
    2025: 0,
    2026: 0,
  },
  {
    id: "2017",
    tahunPajak: "2017",
    labaRugi: 0,
    type: "line",
    2021: 0,
    2022: 0,
    2023: 0,
    2024: 0,
    2025: 0,
    2026: 0,
  },
  {
    id: "2018",
    tahunPajak: "2018",
    labaRugi: 0,
    type: "line",
    2021: 0,
    2022: 0,
    2023: 0,
    2024: 0,
    2025: 0,
    2026: 0,
  },

  {
    id: "2019",
    tahunPajak: "2019",
    labaRugi: 0,
    type: "line",
    2021: 0,
    2022: 0,
    2023: 0,
    2024: 0,
    2025: 0,
    2026: 0,
  },
  {
    id: "2020",
    tahunPajak: "2020",
    labaRugi: 0,
    type: "line",
    2021: 0,
    2022: 0,
    2023: 0,
    2024: 0,
    2025: 0,
    2026: 0,
  },

  {
    id: "2021",
    tahunPajak: "2021",
    labaRugi: 0,
    type: "line",
    2021: 0,
    2022: 0,
    2023: 0,
    2024: 0,
    2025: 0,
    2026: 0,
  },

  {
    id: "2022",
    tahunPajak: "2022",
    labaRugi: 0,
    type: "line",
    2021: 0,
    2022: 0,
    2023: 0,
    2024: 0,
    2025: 0,
    2026: 0,
  },

  {
    id: "2023",
    tahunPajak: "2023",
    labaRugi: 0,
    type: "line",
    2021: 0,
    2022: 0,
    2023: 0,
    2024: 0,
    2025: 0,
    2026: 0,
  },

  {
    id: "2024",
    tahunPajak: "2024",
    labaRugi: 0,
    type: "line",
    2021: 0,
    2022: 0,
    2023: 0,
    2024: 0,
    2025: 0,
    2026: 0,
  },

  {
    id: "2025",
    tahunPajak: "2025",
    labaRugi: 0,
    type: "line",
    2021: 0,
    2022: 0,
    2023: 0,
    2024: 0,
    2025: 0,
    2026: 0,
  },

  // Total (Grand Total)
  {
    id: "total-pajak",
    // tahunPajak: "Jumlah Total",
    type: "total",
    level: 0,
    keterangan: "JUMLAH TOTAL",
  },
];

export default function BagianA({ onTotalChange }) {
  // const [rows, setRows] = useState(() => updateTotalRow(ROWS));
  const [rows, setRows] = useState(ROWS);
  const [open, setOpen] = useState(false);
  const [schema, setSchema] = useState([]);
  const [selected, setSelected] = useState(null);

  const openModal = (row) => {
    const isReadOnlyRow = row.type !== "line";
    const dyn = isReadOnlyRow
      ? [
          { name: "tahunPajak", readOnly: true },
          { name: "labaRugi", readOnly: true },
          { name: "2021", readOnly: true },
          { name: "2022", readOnly: true },
          { name: "2023", readOnly: true },
          { name: "2024", readOnly: true },
          { name: "2025", readOnly: true },
          { name: "2026", readOnly: true },
        ]
      : [{ name: "tahunPajak", readOnly: true }];

    setSchema(buildSchema(row, dyn));
    setSelected(row);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setSelected(null);
  };

  const onSubmit = (values) => {
    console.log("onSubmit data :", values);

    setRows((prev) => {
      const updated = prev.map((r) => (r.id === selected.id ? { ...r, ...values } : r));
      const result = updateTotalRow(updated);
      // console.log("updated rows:", result);

      // Kirim total 2025 ke parent
      const totalRow = result.find((r) => r.type === "total");
      if (onTotalChange && totalRow) {
        onTotalChange(totalRow["2025"] || 0);
      }

      return result;
    });
    closeModal();
  };
  // rows yang dikirim ke tabel sudah terupdate baris totalnya
  // const tableRows = updateTotalRow(rows);

  return (
    <>
      <KompensasiKerugian rows={rows} openModal={openModal} />
      <ModalA
        open={open}
        onClose={closeModal}
        title={
          selected
            ? "Perhitungan Konpensasi Kerugian Fiskal"
            : "Perhitungan Konpensasi Kerugian Fiskal"
        }
        schema={schema}
        initialData={selected || {}}
        onSubmit={onSubmit}
      />
    </>
  );
}
