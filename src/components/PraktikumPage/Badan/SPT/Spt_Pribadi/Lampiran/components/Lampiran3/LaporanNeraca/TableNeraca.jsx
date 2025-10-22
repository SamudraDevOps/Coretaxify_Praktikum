// src/components/.../LaporanNeraca/TableNeraca.jsx
import React, { useState, useCallback } from "react";
import { formatRupiah, formatNumber, parseFormattedNumber } from "@utils/formatCurrency";

const toNum = (v) => (v === "" || v == null ? 0 : Number(v));

// Function untuk format real-time saat mengetik
const formatInputValue = (value) => {
  if (!value) return "";

  // Hapus semua non-digit characters
  const numericValue = value.replace(/[^\d]/g, "");

  // Tambahkan titik setiap 3 digit dari kanan
  if (numericValue.length > 0) {
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  return numericValue;
};

// Component InputCell dengan format real-time
const InputCell = React.memo(({ value, onUpdate, rowId, side }) => {
  const [localValue, setLocalValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  // Sync dengan parent value hanya saat value berubah dari luar
  React.useEffect(() => {
    if (!isFocused) {
      setLocalValue(formatNumber(value || ""));
    }
  }, [value, isFocused]);

  const handleChange = (e) => {
    const inputValue = e.target.value;

    // Format real-time saat mengetik
    const formattedValue = formatInputValue(inputValue);
    setLocalValue(formattedValue);
  };

  const handleFocus = () => {
    setIsFocused(true);
    // Tetap gunakan format dengan titik saat focus
    const numericOnly = localValue.replace(/[^\d]/g, "");
    const formattedValue = formatInputValue(numericOnly);
    setLocalValue(formattedValue);
  };

  const handleBlur = () => {
    setIsFocused(false);
    const numericValue = parseFormattedNumber(localValue);

    // Update parent state hanya saat blur
    onUpdate(rowId, numericValue, side);

    // Format ulang menggunakan formatNumber untuk display
    setLocalValue(formatNumber(numericValue));
  };

  const handleKeyPress = (e) => {
    // Hanya izinkan angka dan backspace/delete
    if (
      !/[\d]/.test(e.key) &&
      !["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab", "Enter"].includes(e.key)
    ) {
      e.preventDefault();
    }

    // Update state juga saat Enter
    if (e.key === "Enter") {
      handleBlur();
      e.target.blur();
    }
  };

  const handleKeyDown = (e) => {
    // Handle backspace dan delete
    if (e.key === "Backspace" || e.key === "Delete") {
      return; // Biarkan default behavior
    }
  };

  return (
    <input
      type="text"
      className="w-full text-right border-0 bg-transparent focus:bg-white focus:border focus:border-blue-500 rounded px-1 focus:ring-2 focus:ring-blue-500"
      value={localValue}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyPress={handleKeyPress}
      onKeyDown={handleKeyDown}
      placeholder="0"
      inputMode="numeric"
    />
  );
});

export default function TableNeraca({
  leftRows = [],
  rightRows = [],
  onValueChange,
  titleLeft = "ASET",
  titleRight = "LIABILITAS & EKUITAS",
  jumlahtotal = [],
}) {
  const pad = (lvl = 0) => ({ paddingLeft: `${lvl * 20 + 10}px` });

  const moneyCell = (row, value) => {
    if (row.type === "header") return "";
    if (row.type === "subtotal" || row.type === "total") return formatRupiah(toNum(value));
    if (value == null || value === "") return "";
    return formatRupiah(toNum(value));
  };

  // Function untuk handle update - hanya dipanggil saat blur
  const handleUpdate = useCallback(
    (rowId, numericValue, side) => {
      console.log("Updating state on blur:", rowId, numericValue, side);
      onValueChange?.(rowId, numericValue, side);
    },
    [onValueChange]
  );

  const Row = useCallback(
    (r, side) => {
      const isEmph =
        r.type === "header" || r.type === "subtotal" || r.type === "total" || r.level === "line";

      return (
        <tr
          key={`${side}-${r.id}`} // Memastikan key id unik untuk setiap sisi  jaga jaga misal id kode ada yang sama bang
          className={`border-b hover:bg-gray-50 ${r.type === "header" ? "bg-gray-50" : ""}`}
        >
          <td className="border p-2 w-24 text-center font-medium">{r.kodeAkun || ""}</td>
          <td
            className={`border p-2 text-left ${isEmph ? "font-semibold" : ""}`}
            style={pad(r.level)}
          >
            {r.keterangan || ""}
          </td>
          <td className={`border p-2 w-36 text-right ${r.type === "total" ? "font-semibold" : ""}`}>
            {r.type === "line" ? (
              <InputCell
                value={r.nilaiKomersial}
                onUpdate={handleUpdate}
                rowId={r.id}
                side={side}
              />
            ) : (
              <span>{moneyCell(r, r.nilaiKomersial ?? r.nilai)}</span>
            )}
          </td>
        </tr>
      );
    },
    [handleUpdate, pad, moneyCell]
  );

  const TableHalf = useCallback(
    ({ title, rows, side }) => {
      // Cari custom footers untuk sisi ini
      const sideFooters = jumlahtotal.filter((f) => f.side === side);

      // Default footer jika tidak ada custom
      const defaultFooter = {
        label: `Jumlah ${title}`,
        value: rows
          .filter((r) => r.type === "line")
          .reduce((acc, r) => acc + toNum(r.nilaiKomersial), 0),
        className: "bg-gray-100",
      };

      const footersToShow = sideFooters.length > 0 ? sideFooters : [defaultFooter];
      // const totalValue = rows
      //   .filter((r) => r.type === "line")
      //   .reduce((acc, r) => acc + toNum(r.nilaiKomersial), 0);

      return (
        <div className="self-start overflow-x-auto rounded-xl shadow border border-gray-200">
          <table className="min-w-full text-sm border-collapse">
            <thead className="bg-purple-700 text-white font-semibold text-center">
              <tr>
                <th colSpan={3} className="border p-2 text-base">
                  {title}
                </th>
              </tr>
              <tr>
                <th className="border p-2 w-24">KODE AKUN</th>
                <th className="border p-2 text-left">NAMA AKUN</th>
                <th className="border p-2 w-36">NILAI</th>
              </tr>
            </thead>
            <tbody>{rows.map((row) => Row(row, side))}</tbody>
            {/* <tfoot>
              <tr className="bg-gray-100">
                <td className="border p-2 text-right font-semibold" colSpan={2}>
                  Jumlah {title}
                </td>
                <td className="border p-2 text-right font-semibold">{formatRupiah(totalValue)}</td>
              </tr>
            </tfoot> */}
            <tfoot>
              {footersToShow.map((footer, index) => (
                <tr key={`footer-${side}-${index}`} className={footer.className || "bg-gray-100"}>
                  <td className="border p-2 text-right font-semibold" colSpan={2}>
                    {footer.label}
                  </td>
                  <td className="border p-2 text-right font-semibold">
                    {formatRupiah(footer.value || 0)}
                  </td>
                </tr>
              ))}
            </tfoot>
          </table>
        </div>
      );
    },
    [Row, jumlahtotal]
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <TableHalf title={titleLeft} rows={leftRows} side="left" />
      <TableHalf title={titleRight} rows={rightRows} side="right" />
    </div>
  );
}
