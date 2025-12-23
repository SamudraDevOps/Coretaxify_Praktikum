import React from "react";
import { Edit } from "lucide-react";
import { formatRupiah } from "@utils/formatCurrency";
import GlobalTable from "@shared/GlobalTable";

const isEditable = (row) => row.type === "line";

const isBoldRow = (row) =>
  row.type === "header" || row.type === "subtotal" || row.variant === "bold";

export default function LaporanLabaRugi({ rows, openEditModal, kodeOptions = [] }) {
  const columnGroups = [
    {
      key: "_aksi",
      title: "AKSI",
      width: 80,
      align: "center",
      render: (row) =>
        isEditable(row) ? (
          <button
            className="p-1 text-blue-600 hover:bg-blue-50 rounded"
            onClick={() => openEditModal(row)}
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
      title: "NAMA AKUN",
      width: 300,
      align: "center",
      className: "!text-left",
      render: (row) => {
        const paddingLeft = (row.level || 0) * 20 + 10;
        return (
          <div
            style={{ paddingLeft }}
            className={`w-full text-left ${isBoldRow(row) ? "font-semibold" : ""}`}
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
        return formatRupiah(r.nilaiKomersial || 0);
      },
    },
    {
      key: "nonObjekPajak",
      title: "TIDAK TERMASUK OBJEK PAJAK",
      width: 150,
      align: "right",
      render: (r) => {
        if (r.type === "header") return "";
        return formatRupiah(r.nonObjekPajak || 0);
      },
    },
    {
      key: "pphFinal",
      title: "DIKENAKAN PPh FINAL",
      width: 150,
      align: "right",
      render: (r) => {
        if (r.type === "header") return "";
        return formatRupiah(r.pphFinal || 0);
      },
    },
    {
      key: "tidakFinal",
      title: "OBJEK PAJAK TIDAK FINAL",
      width: 150,
      align: "right",
      render: (r) => {
        if (r.type === "header") return "";
        return formatRupiah(r.tidakFinal || 0);
      },
    },
    {
      key: "penyesuaianPositif",
      title: "KOREKSI FISKAL (+)",
      width: 150,
      align: "right",
      render: (r) => {
        if (r.type === "header") return "";
        return formatRupiah(r.penyesuaianPositif || 0);
      },
    },
    {
      key: "penyesuaianNegatif",
      title: "KOREKSI FISKAL (−)",
      width: 150,
      align: "right",
      render: (r) => {
        if (r.type === "header") return "";
        return formatRupiah(r.penyesuaianNegatif || 0);
      },
    },
    {
      key: "kodePenyesuaian",
      title: "KODE KOREKSI FISKAL",
      width: 200,
      align: "center",
      className: "!text-center", // Force text-left
      render: (r) => {
        if (r.type === "header" || r.type === "subtotal") return "";
        const found = kodeOptions.find((opt) => opt.value === r.kodePenyesuaian);
        return found ? found.label : r.kodePenyesuaian || "";
      },
    },
    {
      key: "nilaiFiskal",
      title: "NILAI FISKAL",
      width: 150,
      align: "center",
      render: (r) => {
        if (r.type === "header") return "";
        return <span className="font-semibold">{formatRupiah(r.nilaiFiskal || 0)}</span>;
      },
    },
  ];

  return (
    <div className="space-y-4">
      <GlobalTable
        columnGroups={columnGroups}
        data={rows}
        page={1}
        pageSize={9999}
        total={rows.length}
        onPageChange={() => {}}
        stickyHeader
        rowClassName={(row) => {
          if (row.type === "subtotal") return "bg-yellow-50 font-semibold";
          if (row.type === "header") return "bg-purple-100 font-semibold";
          if (row.type === "label") return "bg-gray-50 italic";
          if (row.variant === "bold") return " font-semibold";
          return "";
        }}
      />
    </div>
  );
}
