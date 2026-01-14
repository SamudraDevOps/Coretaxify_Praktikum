import React, { useState } from "react";
import { formatRupiah, formatNumber } from "@utils/formatCurrency";
import GlobalTable from "@shared/GlobalTable";

// Komponen input currency dengan format real-time
function CurrencyInputCell({ row, onValueChange, side }) {
  const [inputValue, setInputValue] = useState(
    row.nilaiKomersial === 0 || row.nilaiKomersial === "" || row.nilaiKomersial === null
      ? ""
      : formatNumber(row.nilaiKomersial)
  );

  const handleChange = (e) => {
    let raw = e.target.value.replace(/\./g, "");

    // izinkan kosong & "-"
    if (raw === "" || raw === "-") {
      setInputValue(raw);
      return;
    }

    // hanya angka (sudah pasti bukan "-")
    if (/^-?\d+$/.test(raw)) {
      setInputValue(formatNumber(raw));
    }
  };

  const handleBlur = () => {
    const num = Number(inputValue.replace(/\./g, "")) || 0;
    setInputValue(formatNumber(num));
    onValueChange?.(row.id, num, side);
  };

  return (
    <input
      type="text"
      inputMode="decimal"
      className="w-full text-right px-2 py-1 rounded border border-slate-300"
      value={inputValue}
      onChange={handleChange}
      onBlur={handleBlur}
      placeholder="0"
      autoComplete="off"
    />
  );
}

export default function NeracaTabel({
  leftRows = [],
  rightRows = [],
  onValueChange,
  titleLeft = "ASET",
  titleRight = "LIABILITAS & EKUITAS",
}) {
  const leftColumns = [
    {
      key: "kodeAkun",
      title: "KODE AKUN",
      width: 120,
      align: "center",
      render: (row) => row.kodeAkun || "",
    },
    {
      key: "keterangan",
      title: "NAMA AKUN",
      width: 300,
      align: "center",
      render: (row) => {
        const paddingLeft = (row.level || 0) * 20 + 10;
        const isBold = row.type === "header" || row.type === "label";
        return (
          <div
            style={{ paddingLeft }}
            className={`w-full text-left ${isBold ? "font-semibold" : ""}`}
          >
            {row.keterangan || ""}
          </div>
        );
      },
    },
    {
      key: "nilaiKomersial",
      title: "NILAI",
      width: 150,
      align: "center",
      render: (row) => {
        if (row.type === "header") return "";
        if (row.type === "line") {
          return <CurrencyInputCell row={row} onValueChange={onValueChange} side="left" />;
        } else if (row.type === "subtotal" || row.type === "label") {
          return (
            <input
              type="text"
              className="w-full text-right px-2 py-1 rounded border border-slate-300 bg-gray-200"
              value={formatRupiah(row.nilaiKomersial || 0)}
              readOnly
            />
          );
        }
        return (
          <span className="font-semibold">
            {formatRupiah(row.nilaiKomersial || row.nilai || 0)}
          </span>
        );
      },
    },
  ];

  const rightColumns = [
    {
      key: "kodeAkun",
      title: "KODE AKUN",
      width: 120,
      align: "center",
      render: (row) => row.kodeAkun || "",
    },
    {
      key: "keterangan",
      title: "NAMA AKUN",
      width: 300,
      align: "center",
      render: (row) => {
        const paddingLeft = (row.level || 0) * 20 + 10;
        const isBold = row.type === "header" || row.type === "label";
        return (
          <div
            style={{ paddingLeft }}
            className={`w-full text-left ${isBold ? "font-semibold" : ""}`}
          >
            {row.keterangan || ""}
          </div>
        );
      },
    },
    {
      key: "nilaiKomersial",
      title: "NILAI",
      width: 150,
      align: "center",
      render: (row) => {
        if (row.type === "header") return "";
        if (row.type === "line") {
          return <CurrencyInputCell row={row} onValueChange={onValueChange} side="right" />;
        } else if (row.type === "subtotal" || row.type === "label") {
          return (
            <input
              type="text"
              className="w-full text-right px-2 py-1 rounded border border-slate-300 bg-gray-200"
              value={formatRupiah(row.nilaiKomersial || 0)}
              readOnly
            />
          );
        }
        return (
          <span className="font-semibold">
            {formatRupiah(row.nilaiKomersial || row.nilai || 0)}
          </span>
        );
      },
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* LEFT TABLE: ASET */}
      <div className="flex flex-col self-start">
        <h3 className="text-lg font-bold text-center bg-purple-700 text-white py-2 rounded-t-lg">
          {titleLeft}
        </h3>
        <GlobalTable
          columnGroups={leftColumns}
          data={leftRows}
          page={1}
          pageSize={9999}
          total={leftRows.length}
          onPageChange={() => {}}
          stickyHeader
          rowClassName={(row) => {
            if (row.type === "subtotal") return "bg-yellow-50 font-semibold";
            if (row.type === "header") return "bg-purple-100 font-semibold";
            if (row.type === "label") return "bg-gray-100 italic";
            if (row.variant === "bold") return " font-semibold";
            return "";
          }}
        />
      </div>

      {/* RIGHT TABLE: LIABILITAS & EKUITAS */}
      <div className="flex flex-col self-start">
        <h3 className="text-lg font-bold text-center bg-purple-700 text-white py-2 rounded-t-lg">
          {titleRight}
        </h3>
        <GlobalTable
          columnGroups={rightColumns}
          data={rightRows}
          page={1}
          pageSize={9999}
          total={rightRows.length}
          onPageChange={() => {}}
          stickyHeader
          rowClassName={(row) => {
            if (row.type === "subtotal") return "bg-yellow-50 font-semibold";
            if (row.type === "header") return "bg-purple-100 font-semibold";
            if (row.type === "label") return "bg-gray-100 italic";
            if (row.variant === "bold") return " font-semibold";
            return "";
          }}
        />
      </div>
    </div>
  );
}
