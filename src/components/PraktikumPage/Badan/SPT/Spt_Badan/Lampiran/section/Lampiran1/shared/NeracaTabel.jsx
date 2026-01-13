import React from "react";
import { formatRupiah } from "@utils/formatCurrency";
import GlobalTable from "@shared/GlobalTable";

export default function NeracaTabel({
  leftRows = [],
  rightRows = [],
  onValueChange,
  titleLeft = "ASET",
  titleRight = "LIABILITAS & EKUITAS",
}) {
  //  Column config untuk LEFT (Aset)
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
      // className: "!text-left",
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

        //  Editable cell untuk type="line"
        if (row.type === "line") {
          return (
            <input
              type="text"
              className="w-full text-right border-0 bg-transparent focus:bg-white focus:border focus:border-blue-500 rounded px-2 py-1"
              defaultValue={formatRupiah(row.nilaiKomersial || 0)}
              onBlur={(e) => {
                const value = parseFloat(e.target.value.replace(/[^\d]/g, "")) || 0;
                onValueChange?.(row.id, value, "left");
              }}
              onFocus={(e) => {
                // Remove formatting on focus
                const numericValue = e.target.value.replace(/[^\d]/g, "");
                e.target.value = numericValue;
              }}
            />
          );
        }

        //  Read-only untuk subtotal/total
        return (
          <span className="font-semibold">
            {formatRupiah(row.nilaiKomersial || row.nilai || 0)}
          </span>
        );
      },
    },
  ];

  // Column config untuk RIGHT (Liabilitas & Ekuitas)
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
      // className: "!text-left",
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

        //  Editable cell untuk type="line"
        if (row.type === "line") {
          return (
            <input
              type="text"
              className="w-full text-right border-0 bg-transparent focus:bg-white focus:border focus:border-blue-500 rounded px-2 py-1"
              defaultValue={formatRupiah(row.nilaiKomersial || 0)}
              onBlur={(e) => {
                const value = parseFloat(e.target.value.replace(/[^\d]/g, "")) || 0;
                onValueChange?.(row.id, value, "right");
              }}
              onFocus={(e) => {
                const numericValue = e.target.value.replace(/[^\d]/g, "");
                e.target.value = numericValue;
              }}
            />
          );
        }
        //  Read-only untuk subtotal/total
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
      {/*  LEFT TABLE: ASET */}
      <div className="flex flex-col self-start">
        {" "}
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

      {/*  RIGHT TABLE: LIABILITAS & EKUITAS */}
      <div className="flex flex-col self-start">
        {" "}
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
