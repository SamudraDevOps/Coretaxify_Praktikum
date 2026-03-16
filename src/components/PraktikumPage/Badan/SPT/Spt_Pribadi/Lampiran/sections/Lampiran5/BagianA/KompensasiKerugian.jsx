import React from "react";
import GlobalTable from "@shared/GlobalTable";
import { formatRupiah, formatNumber } from "@utils/formatCurrency";
import { Edit } from "lucide-react";

export default function KompensasiKerugian({ rows = [], openEditModal }) {
  const years = ["2021", "2022", "2023", "2024", "2025", "2026"];

  const columnGroups = [
    {
      key: "_aksi",
      title: "TINDAKAN",
      align: "center",
      render: (row) =>
        row.type === "line" ? (
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
      key: "_no",
      title: "NO.",
      align: "center",
      render: (row, idx) => (row.type === "total" ? "" : idx + 1),
    },
    {
      key: "group-laba-rugi",
      title: "LABA/RUGI PENGHASILAN FISKAL",
      children: [
        {
          key: "tahunPajak",
          title: "Tahun Pajak/Bagian Tahun Pajak",
          align: "center",
          render: (row) => row.tahunPajak || "",
        },
        {
          key: "labaRugi",
          title: "BESARAN BIAYA (RUPIAH)",
          align: "right",
          render: (row) => {
            const isBold = row.type === "total";
            return (
              <span className={isBold ? "font-semibold" : ""}>
                {formatRupiah(row.labaRugi || 0)}
              </span>
            );
          },
        },
      ],
    },
    {
      key: "group-kompensasi",
      title: "KOMPENSASI KERUGIAN FISKAL",
      children: [
        ...years.map((tahun, index) => {
          
          // Cek apakah ini item ke-2 dari belakang atau item terakhir
          const isSecondLast = index === years.length - 2;
          const isLast = index === years.length - 1;

          // Tentukan title untuk children berdasarkan posisi
          let childTitle = "NILAI (RP)";
          if (isSecondLast) {
            childTitle = "RUPIAH (TAHUN PAJAK INI)";
          } else if (isLast) {
            childTitle = "TAHUN PAJAK BERJALAN";
          }

          return {
            key: tahun,
            title: `YEAR ${tahun}`,
            align: "center",
            children: [
              {
                key: `nilai-${tahun}`,
                title: childTitle,
                align: "center",
                render: (row) => {
                  const isBold = row.type === "total";
                  return (
                    <span className={isBold ? "font-semibold" : ""}>
                      {formatNumber(row[tahun] || 0)}
                    </span>
                  );
                },
              },
            ],
          };
        }),
      ],
    },
  ];

  return (
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
        return "";
      }}
    />
  );
}
