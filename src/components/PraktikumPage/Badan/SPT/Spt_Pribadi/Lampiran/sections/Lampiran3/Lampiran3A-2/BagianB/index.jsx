import React, { useState, useMemo, useCallback } from "react";
import GlobalTable from "@shared/GlobalTable";
import { formatNumber, parseFormattedNumber } from "@utils/formatCurrency";

// Helper untuk convert value ke number
const toNum = (v) => (v === "" || v == null ? 0 : Number(v));

// INITIAL DATA - ASET (Kiri) dari indexHapus.jsx
const INITIAL_LEFT_ROWS = [
  { id: "h-aset-lancar", type: "header", level: 0, keterangan: "Aset Lancar", nilaiKomersial: 0 },
  {
    id: 1101,
    kodeAkun: "1101",
    keterangan: "Kas dan Setara Kas",
    type: "line",
    level: 1,
    nilaiKomersial: 0,
  },
  {
    id: 1200,
    kodeAkun: "1200",
    keterangan: "Penyertaan Modal",
    type: "line",
    level: 1,
    nilaiKomersial: 0,
  },
  {
    id: 1122,
    kodeAkun: "1122",
    keterangan: "Piutang Usaha - Pihak Ketiga",
    type: "line",
    level: 1,
    nilaiKomersial: 0,
  },
  {
    id: 1123,
    kodeAkun: "1123",
    keterangan: "Piutang Usaha - Pihak Yang Mempunyai Hubungan Istimewa",
    type: "line",
    level: 1,
    nilaiKomersial: 0,
  },
  {
    id: 1124,
    kodeAkun: "1124",
    keterangan: "Piutang Lainnya - Pihak Ketiga",
    type: "line",
    level: 1,
    nilaiKomersial: 0,
  },
  {
    id: 1125,
    kodeAkun: "1125",
    keterangan: "Piutang Lainnya - Pihak Yang Mempunyai Hubungan Istimewa",
    type: "line",
    level: 1,
    nilaiKomersial: 0,
  },
  {
    id: 1131,
    kodeAkun: "1131",
    keterangan: "(Dikurangi : Cadangan Piutang Tak Tertagih)",
    type: "line",
    level: 3,
    nilaiKomersial: 0,
  },
  {
    id: 1401,
    kodeAkun: "1401",
    keterangan: "Persediaan",
    type: "line",
    level: 1,
    nilaiKomersial: 0,
  },
  {
    id: 1421,
    kodeAkun: "1421",
    keterangan: "Biaya Dibayar Dimuka",
    type: "line",
    level: 1,
    nilaiKomersial: 0,
  },

  {
    id: 1422,
    kodeAkun: "1422",
    keterangan: "Pendapatan Dibayar Dimuka",
    type: "line",
    level: 1,
    nilaiKomersial: 0,
  },

  {
    id: 1423,
    kodeAkun: "1423",
    keterangan: "Pajak Dibayar Dimuka",
    type: "line",
    level: 1,
    nilaiKomersial: 0,
  },

  {
    id: 1499,
    kodeAkun: "1499",
    keterangan: "Aset Lancar Lainnya",
    type: "line",
    level: 1,
    nilaiKomersial: 0,
  },

  {
    id: "h-aset-tidak-Lancar",
    type: "header",
    level: 0,
    keterangan: "Aset Tidak Lancar",
    nilaiKomersial: 0,
  },

  {
    id: 1501,
    kodeAkun: "1501",
    keterangan: "Piutang Jangka Panjang",
    type: "line",
    level: 1,
    nilaiKomersial: 0,
  },
  {
    id: 1523,
    kodeAkun: "1523",
    keterangan: "Tanah Dan Bangunan",
    type: "line",
    level: 1,
    nilaiKomersial: 0,
  },
  {
    id: 1524,
    kodeAkun: "1524",
    keterangan: "(Dikurangi : Akumulasi Penyusutan)",
    type: "line",
    level: 3,
    nilaiKomersial: 0,
  },
  {
    id: 1529,
    kodeAkun: "1529",
    keterangan: "Aset Tetap Lainnya",
    type: "line",
    level: 1,
    nilaiKomersial: 0,
  },
  {
    id: 1530,
    kodeAkun: "1530",
    keterangan: "(Dikurangi : Akumulasi Penyusutan)",
    type: "line",
    level: 3,
    nilaiKomersial: 0,
  },
  {
    id: 1541,
    kodeAkun: "1541",
    keterangan: "Investasi pada Perusahaan Asosiasi",
    type: "line",
    level: 1,
    nilaiKomersial: 0,
  },

  {
    id: 1599,
    kodeAkun: "1599",
    keterangan: "Investasi Jangka Panjang",
    type: "line",
    level: 1,
    nilaiKomersial: 0,
  },

  {
    id: 1600,
    kodeAkun: "1600",
    keterangan: "Aset Tak Berwujud - net",
    type: "line",
    level: 1,
    nilaiKomersial: 0,
  },

  {
    id: 1611,
    kodeAkun: "1611",
    keterangan: "Aktiva Pajak Tangguhan",
    type: "line",
    level: 1,
    nilaiKomersial: 0,
  },

  {
    id: 1698,
    kodeAkun: "1698",
    keterangan: "Aset Tidak Lancar Lainnya",
    type: "line",
    level: 1,
    nilaiKomersial: 0,
  },
  {
    id: "1700",
    kodeAkun: "1700",
    type: "subtotal",
    level: 0,
    keterangan: "TOTAL ASET",
    nilaiKomersial: 0,
  },
];

// INITIAL DATA - LIABILITAS & EKUITAS (Kanan)
const INITIAL_RIGHT_ROWS = [
  {
    id: "h-liab-pendek",
    type: "header",
    level: 0,
    keterangan: "Liabilitas Jangka Pendek",
    nilaiKomersial: 0,
  },
  {
    id: 2102,
    kodeAkun: "2102",
    keterangan: "Utang Usaha - Pihak Ketiga",
    type: "line",
    level: 1,
    nilaiKomersial: 0,
  },
  {
    id: 2103,
    kodeAkun: "2103",
    keterangan: "Utang Usaha - Pihak Yang Mempunyai Hubungan Istimewa",
    type: "line",
    level: 1,
    nilaiKomersial: 0,
  },
  {
    id: 2111,
    kodeAkun: "2111",
    keterangan: "Utang Bunga",
    type: "line",
    level: 1,
    nilaiKomersial: 0,
  },
  {
    id: 2191,
    kodeAkun: "2191",
    keterangan: "Utang Pajak",
    type: "line",
    level: 1,
    nilaiKomersial: 0,
  },

  {
    id: 2192,
    kodeAkun: "2192",
    keterangan: "Utang Dividen",
    type: "line",
    level: 1,
    nilaiKomersial: 0,
  },

  {
    id: 2195,
    kodeAkun: "2195",
    keterangan: "Beban Yang Masih Harus Dibayar",
    type: "line",
    level: 1,
    nilaiKomersial: 0,
  },

  {
    id: 2201,
    kodeAkun: "2201",
    keterangan: "Utang Bank Jangka Pendek",
    type: "line",
    level: 1,
    nilaiKomersial: 0,
  },

  {
    id: 2202,
    kodeAkun: "2202",
    keterangan: "Utang Bank Jangka Panjang yang Jatuh Tempo Dalam Satu Tahun",
    type: "line",
    level: 1,
    nilaiKomersial: 0,
  },
  {
    id: 2203,
    kodeAkun: "2203",
    keterangan: "Pendapatan Diterima Dimuka",
    type: "line",
    level: 1,
    nilaiKomersial: 0,
  },

  {
    id: 2228,
    kodeAkun: "2228",
    keterangan: "Liabilitas Jangka Pendek Lainnya",
    type: "line",
    level: 1,
    nilaiKomersial: 0,
  },

  {
    id: "liabilitas-jangka-panjang",
    type: "header",
    level: 0,
    keterangan: "Liabilitas Jangka Panjang",
    nilaiKomersial: 0,
  },

  {
    id: 2301,
    kodeAkun: "2301",
    keterangan: "Utang Bank Jangka Panjang",
    type: "line",
    level: 1,
    nilaiKomersial: 0,
  },

  {
    id: 2303,
    kodeAkun: "2303",
    keterangan: "Utang Jangka Panjang-pihak Ketiga",
    type: "line",
    level: 1,
    nilaiKomersial: 0,
  },

  {
    id: 2304,
    kodeAkun: "2304",
    keterangan: "Utang Jangka Panjang-pihak Yang Mempunyai Hubungan Istimewa",
    type: "line",
    level: 1,
    nilaiKomersial: 0,
  },

  {
    id: 2321,
    kodeAkun: "2321",
    keterangan: "Liabilitas Pajak Tangguhan",
    type: "line",
    level: 1,
    nilaiKomersial: 0,
  },

  {
    id: 2998,
    kodeAkun: "2998",
    keterangan: "Liabilitas Jangka Panjang Lainnya",
    type: "line",
    level: 1,
    nilaiKomersial: 0,
  },
  // Total Liabilitas
  {
    id: "2999",
    kodeAkun: "2999",
    type: "line",
    level: 1,
    keterangan: "Jumlah Liabilitas",
    nilaiKomersial: 0,
  },

  // Ekuitas
  {
    id: "h-ekuitas",
    type: "header",
    level: 0,
    keterangan: "Ekuitas",
    nilaiKomersial: 0,
  },
  {
    id: 3102,
    kodeAkun: "3102",
    keterangan: "Modal Saham",
    type: "line",
    level: 1,
    nilaiKomersial: 0,
  },

  {
    id: 3120,
    kodeAkun: "3120",
    keterangan: "Tambahan Modal Disetor",
    type: "line",
    level: 1,
    nilaiKomersial: 0,
  },

  {
    id: 3200,
    kodeAkun: "3200",
    keterangan: "Laba Ditahan",
    type: "line",
    level: 1,
    nilaiKomersial: 0,
  },

  {
    id: 3298,
    kodeAkun: "3298",
    keterangan: "Ekuitas Lainnya",
    type: "line",
    level: 1,
    nilaiKomersial: 0,
  },
  // Total Ekuitas
  {
    id: "3299",
    kodeAkun: "3299",
    type: "line",
    level: 1,
    keterangan: "Jumlah Ekuitas",
    nilaiKomersial: 0,
  },

  // Total Liabilitas & Ekuitas
  {
    id: "3300",
    kodeAkun: "3300",
    type: "subtotal",
    level: 0,
    keterangan: "Jumlah Liabilitas & Ekuitas",
    nilaiKomersial: 0,
  },
];

export default function BagianB() {
  const [leftRows, setLeftRows] = useState(INITIAL_LEFT_ROWS);
  const [rightRows, setRightRows] = useState(INITIAL_RIGHT_ROWS);

  // Auto-calculate dengan support pengurangan (deductions)
  const calculateWithDeductions = useCallback((addIds, subtractIds, sourceRows) => {
    const totalAdd = addIds.reduce((sum, id) => {
      const row = sourceRows.find((r) => r.id === id);
      return sum + toNum(row?.nilaiKomersial);
    }, 0);

    const totalSubtract = subtractIds.reduce((sum, id) => {
      const row = sourceRows.find((r) => r.id === id);
      return sum + toNum(row?.nilaiKomersial);
    }, 0);

    return totalAdd - totalSubtract;
  }, []);

  // Calculate leftRows dengan subtotal
  const leftRowsWithCalculation = useMemo(() => {
    return leftRows.map((row) => {
      if (row.id === "1700") {
        const addIds = [
          1101, 1200, 1122, 1123, 1124, 1125, 1401, 1421, 1422, 1423, 1499, 1501, 1523, 1529, 1541,
          1599, 1600, 1611, 1698,
        ];
        const subtractIds = [1131, 1524, 1530];
        const value = calculateWithDeductions(addIds, subtractIds, leftRows);
        console.log(" Calculating TOTAL ASET:", value);
        return { ...row, nilaiKomersial: value };
      }

      return row;
    });
  }, [leftRows, calculateWithDeductions]);

  // Calculate rightRows dengan subtotal
  const rightRowsWithCalculation = useMemo(() => {
    return rightRows.map((row) => {
      // Auto-calculate untuk Total Liabilitas row
      if (row.id === "2999") {
        const liabilitasIds = [
          2102, 2103, 2111, 2191, 2192, 2195, 2201, 2202, 2203, 2228, 2301, 2303, 2304, 2321, 2998,
        ];
        const totalLiabilitas = liabilitasIds.reduce((sum, id) => {
          const liabilitasRow = rightRows.find((r) => r.id === id);
          return sum + (liabilitasRow?.nilaiKomersial || 0);
        }, 0);

        console.log(" Calculating row Total Liabilitas:", totalLiabilitas); // Debug
        return { ...row, nilaiKomersial: totalLiabilitas };
      }

      // Auto-calculate untuk Total Ekuitas row
      if (row.id === "3299") {
        const ekuitasIds = [3102, 3120, 3200, 3298];
        const totalEkuitas = ekuitasIds.reduce((sum, id) => {
          const ekuitasRow = rightRows.find((r) => r.id === id);
          return sum + (ekuitasRow?.nilaiKomersial || 0);
        }, 0);

        console.log(" Calculating row Total Ekuitas:", totalEkuitas); // Debug
        return { ...row, nilaiKomersial: totalEkuitas };
      }

      if (row.id === "3300") {
        // Ambil dari subtotal yang sudah dihitung
        const totalLiab = rightRows.find((r) => r.id === "s-total-liabilitas")?.nilaiKomersial || 0;
        const totalEkuitas = rightRows.find((r) => r.id === "s-total-ekuitas")?.nilaiKomersial || 0;

        // Atau hitung langsung dari ID individual
        const liabIds = [
          2102, 2103, 2111, 2191, 2192, 2195, 2201, 2202, 2203, 2228, 2301, 2303, 2304, 2321, 2998,
        ];
        const ekuitasIds = [3102, 3120, 3200, 3298];

        const calculatedLiab = liabIds.reduce((sum, id) => {
          const row = rightRows.find((r) => r.id === id);
          return sum + (row?.nilaiKomersial || 0);
        }, 0);

        const calculatedEkuitas = ekuitasIds.reduce((sum, id) => {
          const row = rightRows.find((r) => r.id === id);
          return sum + (row?.nilaiKomersial || 0);
        }, 0);

        const totalGabungan = calculatedLiab + calculatedEkuitas;
        console.log(" Calculating Total Liab & Ekuitas:", totalGabungan);
        return { ...row, nilaiKomersial: totalGabungan };
      }

      return row;
    });
  }, [rightRows]);

  // Handle value change (inline edit)
  const handleValueChange = (rowId, value, side) => {
    const numValue = parseFormattedNumber(value);

    if (side === "left") {
      setLeftRows((prev) =>
        prev.map((row) => (row.id === rowId ? { ...row, nilaiKomersial: numValue } : row))
      );
    } else {
      setRightRows((prev) =>
        prev.map((row) => (row.id === rowId ? { ...row, nilaiKomersial: numValue } : row))
      );
    }
  };

  // Column definitions - HANYA 3 KOLOM (dikecilkan kolom keterangan)
  const createColumns = (side) => [
    {
      key: "kodeAkun",
      title: "KODE AKUN",
      align: "center",
      render: (row) => row.kodeAkun || "",
    },
    {
      key: "keterangan",
      title: "KETERANGAN",
      align: "center",
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
      title: "",
      align: "center",
      render: (row) => {
        if (row.type === "header") return "";

        const isBold = row.type === "subtotal";
        const isEditable = row.type === "line";

        // Jika subtotal, tampilkan format readonly dengan Rp
        if (!isEditable) {
          return (
            <span className={isBold ? "font-semibold" : ""}>
              Rp {formatNumber(row.nilaiKomersial || 0)}
            </span>
          );
        }

        // Jika line, tampilkan input field TANPA Rp (hanya angka terformat)
        return (
          <input
            type="text"
            value={formatNumber(row.nilaiKomersial || 0)}
            onChange={(e) => handleValueChange(row.id, e.target.value, side)}
            className="w-full text-right border-none focus:outline-none focus:ring-1 focus:ring-blue-500 px-2 py-1 rounded"
            placeholder="0"
          />
        );
      },
    },
  ];

  const leftColumns = createColumns("left");
  const rightColumns = createColumns("right");

  return (
    <div className="space-y-6">
      {/* Tabel Neraca - 2 Kolom */}
      <div className="grid grid-cols-2 gap-4">
        {/* Tabel Kiri: ASET */}
        <div>
          <div className="mb-2 text-center font-bold text-lg bg-purple-700 text-white py-2 rounded-t-lg">
            ASET
          </div>
          <GlobalTable
            columnGroups={leftColumns}
            data={leftRowsWithCalculation}
            page={1}
            pageSize={9999}
            total={leftRowsWithCalculation.length}
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
            data={rightRowsWithCalculation}
            page={1}
            pageSize={9999}
            total={rightRowsWithCalculation.length}
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
