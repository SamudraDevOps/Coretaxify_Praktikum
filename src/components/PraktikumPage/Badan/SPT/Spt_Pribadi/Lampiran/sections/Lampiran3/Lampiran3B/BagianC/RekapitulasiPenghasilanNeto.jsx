// d:/Coretaxify_Praktikum/src/components/PraktikumPage/Badan/SPT/Spt_Pribadi/Lampiran/sections/Lampiran3/Lampiran3B/BagianB/RekapitulasiPengusaha.jsx
import React from "react";
import { Edit } from "lucide-react";
import { formatRupiah } from "@utils/formatCurrency";
import GlobalTable from "@shared/GlobalTable";

export default function RekapitulasiPenghasilanNeto({ rows, openEditModal, jenisOptions }) {
  const columnGroups = [
    {
      title: "TINDAKAN",
      children: [
        {
          key: "_aksi",
          title: "AKSI",
          width: 100,
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
    { key: "namaTKU", title: "NAMA TKU", width: 250, align: "center" },
    {
      key: "jenis",
      title: "JENIS USAHA",
      width: 250,
      align: "center",
      render: (r) => {
        const found = jenisOptions.find((opt) => opt.value === r.jenis);
        return found ? found.label : r.jenis || "";
      },
    },

    // 12 Kolom Bulan
    {
      key: "januari",
      title: "JANUARI",
      width: 120,
      align: "center",
      render: (r) => formatRupiah(r.januari),
    },
    {
      key: "februari",
      title: "FEBRUARI",
      width: 120,
      align: "center",
      render: (r) => formatRupiah(r.februari),
    },
    {
      key: "maret",
      title: "MARET",
      width: 120,
      align: "center",
      render: (r) => formatRupiah(r.maret),
    },
    {
      key: "april",
      title: "APRIL",
      width: 120,
      align: "center",
      render: (r) => formatRupiah(r.april),
    },
    {
      key: "mei",
      title: "MEI",
      width: 120,
      align: "center",
      render: (r) => formatRupiah(r.mei),
    },
    {
      key: "juni",
      title: "JUNI",
      width: 120,
      align: "center",
      render: (r) => formatRupiah(r.juni),
    },
    {
      key: "juli",
      title: "JULI",
      width: 120,
      align: "center",
      render: (r) => formatRupiah(r.juli),
    },
    {
      key: "agustus",
      title: "AGUSTUS",
      width: 120,
      align: "center",
      render: (r) => formatRupiah(r.agustus),
    },
    {
      key: "september",
      title: "SEPTEMBER",
      width: 120,
      align: "center",
      render: (r) => formatRupiah(r.september),
    },
    {
      key: "oktober",
      title: "OKTOBER",
      width: 120,
      align: "center",
      render: (r) => formatRupiah(r.oktober),
    },
    {
      key: "november",
      title: "NOVEMBER",
      width: 120,
      align: "center",
      render: (r) => formatRupiah(r.november),
    },
    {
      key: "desember",
      title: "DESEMBER",
      width: 120,
      align: "center",
      render: (r) => formatRupiah(r.desember),
    },

    // Total
    {
      key: "total",
      title: "TOTAL",
      width: 150,
      align: "center",
      render: (r) => formatRupiah(r.total),
    },
  ];

  return (
    <div className="space-y-4">
      {/* Tidak ada tombol Add, karena row statis */}

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
    </div>
  );
}
