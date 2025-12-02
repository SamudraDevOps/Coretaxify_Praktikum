import React from "react";
import { Edit } from "lucide-react";
import { formatRupiah } from "@utils/formatCurrency";
import GlobalTable from "@shared/GlobalTable";

const BULAN_NAMES = [
  "JANUARI",
  "FEBRUARI",
  "MARET",
  "APRIL",
  "MEI",
  "JUNI",
  "JULI",
  "AGUSTUS",
  "SEPTEMBER",
  "OKTOBER",
  "NOVEMBER",
  "DESEMBER",
];

const BULAN_FIELDS = [
  "januari",
  "februari",
  "maret",
  "april",
  "mei",
  "juni",
  "juli",
  "agustus",
  "september",
  "oktober",
  "november",
  "desember",
];

export default function RekapitulasiPajakFinal({ rows, openEditModal }) {
  const columnGroups = [
    {
      title: "TINDAKAN",
      children: [
        {
          key: "_aksi",
          title: "AKSI",
          width: 80,
          align: "center",
          render: (row) =>
            row.type === "line" ? (
              <div className="flex items-center justify-center gap-2">
                <button
                  className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                  onClick={() => openEditModal(row)}
                  title="Edit"
                >
                  <Edit size={16} />
                </button>
              </div>
            ) : null,
        },
      ],
    },
    {
      key: "namaTKU",
      title: "KETERANGAN",
      width: 300,
      align: "left",
      render: (row) => {
        const paddingLeft = (row.level || 0) * 20 + 10;
        const isBold = row.type === "header" || row.type === "subtotal" || row.type === "total";
        return (
          <div
            style={{ paddingLeft: `${paddingLeft}px` }}
            className={isBold ? "font-semibold" : ""}
          >
            {row.namaTKU || row.keterangan || ""}
          </div>
        );
      },
    },
    // 12 Kolom Bulan
    ...BULAN_FIELDS.map((field, idx) => ({
      key: field,
      title: BULAN_NAMES[idx],
      width: 120,
      align: "right",
      render: (r) => {
        if (r.type === "header") return "";
        return formatRupiah(r[field] || 0);
      },
    })),
    // Total
    {
      key: "total",
      title: "JUMLAH",
      width: 150,
      align: "right",
      render: (r) => {
        if (r.type === "header") return "";
        return formatRupiah(r.total || 0);
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
          if (row.type === "total") return "bg-yellow-50 font-semibold";
          if (row.type === "header") return "bg-gray-100 font-semibold";
          return "";
        }}
      />
    </div>
  );
}
