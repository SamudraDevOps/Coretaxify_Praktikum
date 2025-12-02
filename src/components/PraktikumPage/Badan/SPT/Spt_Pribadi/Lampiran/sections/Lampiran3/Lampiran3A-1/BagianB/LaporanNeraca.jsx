import React from "react";
import { Edit } from "lucide-react";
import { formatRupiah } from "@utils/formatCurrency";
import GlobalTable from "@shared/GlobalTable";

export default function LaporanNeraca({ leftRows, rightRows, openEditModal, kodeOptions = [] }) {
  const pad = (lvl = 0) => ({ paddingLeft: `${lvl * 20 + 10}px` });

  // Column definition untuk tabel kiri (ASET)
  const leftColumns = [
    {
      key: "_aksi",
      title: "AKSI",
      width: 80,
      align: "center",
      render: (row) =>
        row.type === "line" ? (
          <button
            className="p-1 text-blue-600 hover:bg-blue-50 rounded"
            onClick={() => openEditModal(row, "left")}
            title="Edit"
          >
            <Edit size={16} />
          </button>
        ) : null,
    },
    {
      key: "kodeAkun",
      title: "KODE AKUN",
      width: 100,
      align: "center",
      render: (row) => row.kodeAkun || "",
    },
    {
      key: "keterangan",
      title: "KETERANGAN",
      width: 300,
      align: "left",
      className: "!text-left",
      render: (row) => {
        const paddingLeft = (row.level || 0) * 20 + 10;
        const isBold = row.type === "header" || row.type === "subtotal";
        return (
          <div
            style={{ paddingLeft: `${paddingLeft}px`, textAlign: "left" }}
            className={`text-left w-full ${isBold ? "font-semibold" : ""}`}
          >
            {row.keterangan || ""}
          </div>
        );
      },
    },
    {
      key: "nilaiKomersial",
      title: "NILAI KOMERSIAL",
      width: 150,
      align: "right",
      render: (r) => {
        if (r.type === "header") return "";
        return (
          <span className={r.type === "subtotal" ? "font-semibold" : ""}>
            {formatRupiah(r.nilaiKomersial || 0)}
          </span>
        );
      },
    },
  ];

  // Column definition untuk tabel kanan (LIABILITAS & EKUITAS)
  const rightColumns = [
    {
      key: "_aksi",
      title: "AKSI",
      width: 80,
      align: "center",
      render: (row) =>
        row.type === "line" ? (
          <button
            className="p-1 text-blue-600 hover:bg-blue-50 rounded"
            onClick={() => openEditModal(row, "right")}
            title="Edit"
          >
            <Edit size={16} />
          </button>
        ) : null,
    },
    {
      key: "kodeAkun",
      title: "KODE AKUN",
      width: 100,
      align: "center",
      render: (row) => row.kodeAkun || "",
    },
    {
      key: "keterangan",
      title: "KETERANGAN",
      width: 300,
      align: "left",
      className: "!text-left",
      render: (row) => {
        const paddingLeft = (row.level || 0) * 20 + 10;
        const isBold = row.type === "header" || row.type === "subtotal";
        return (
          <div
            style={{ paddingLeft: `${paddingLeft}px`, textAlign: "left" }}
            className={`text-left w-full ${isBold ? "font-semibold" : ""}`}
          >
            {row.keterangan || ""}
          </div>
        );
      },
    },
    {
      key: "nilaiKomersial",
      title: "NILAI KOMERSIAL",
      width: 150,
      align: "right",
      render: (r) => {
        if (r.type === "header") return "";
        return (
          <span className={r.type === "subtotal" ? "font-semibold" : ""}>
            {formatRupiah(r.nilaiKomersial || 0)}
          </span>
        );
      },
    },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {/* Tabel Kiri: ASET */}
        <div>
          <div className="mb-2 text-center font-bold text-lg bg-purple-700 text-white py-2 rounded-t-lg">
            ASET
          </div>
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
              return "";
            }}
          />
        </div>

        {/* Tabel Kanan: LIABILITAS & EKUITAS */}
        <div>
          <div className="mb-2 text-center font-bold text-lg bg-purple-700 text-white py-2 rounded-t-lg">
            LIABILITAS & EKUITAS
          </div>
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
              return "";
            }}
          />
        </div>
      </div>
    </div>
  );
}
