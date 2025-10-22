import React, { useState, useMemo, useCallback } from "react";
import LaporanNeraca from "./LaporanNeraca";

export default function BagianB() {
  console.log("BagianB rendered"); // Debug log

  // Data untuk sisi kiri (Aset) - nilai awal 0 untuk bisa diisi
  const [leftRows, setLeftRows] = useState([
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
      keterangan: "Aset Tak Berwujud",
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
      id: "s-total-aset",
      type: "subtotal",
      level: 0,
      keterangan: "TOTAL ASET",
      nilaiKomersial: 0,
    },
  ]);

  // Data untuk sisi kanan (Liabilitas & Ekuitas)
  const [rightRows, setRightRows] = useState([
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
      id: 2111,
      kodeAkun: "2111",
      keterangan: "Utang Bunga",
      type: "line",
      level: 1,
      nilaiKomersial: 0,
    },

    // Total Liabilitas
    {
      id: "s-total-liabilitas",
      type: "subtotal",
      level: 0,
      keterangan: "Total Liabilitas",
      nilaiKomersial: 0,
    },
    {
      id: "h-ekuitas",
      type: "header",
      level: 0,
      keterangan: "Ekuitas",
      nilaiKomersial: 0,
    },
    {
      id: 31028,
      kodeAkun: "3102",
      keterangan: "Modal Saham",
      type: "line",
      level: 1,
      nilaiKomersial: 0,
    },

    // Total Ekuitas
    {
      id: "s-total-ekuitas",
      type: "subtotal",
      level: 0,
      keterangan: "Total Ekuitas",
      nilaiKomersial: 0,
    },
  ]);

  // Hitung subtotal di sisi kiri (TOTAL ASET) menggunakan calculateWithDeductions

  const calculateWithDeductions = useCallback((addIds, subtractIds, sourceRows) => {
    console.log(" calculateWithDeductions called with:", { addIds, subtractIds });

    const totalAdd = addIds.reduce((sum, id) => {
      const row = sourceRows.find((r) => r.id === id);
      const value = row?.nilaiKomersial || 0;
      console.log(`Adding ID ${id}: ${value}`);
      return sum + value;
    }, 0);

    const totalSubtract = subtractIds.reduce((sum, id) => {
      const row = sourceRows.find((r) => r.id === id);
      const value = row?.nilaiKomersial || 0;
      console.log(`Subtracting ID ${id}: ${value}`);
      return sum + value;
    }, 0);

    const result = totalAdd - totalSubtract;
    console.log(` Final calculation: ${totalAdd} - ${totalSubtract} = ${result}`);
    return result;
  }, []);

  const leftRowsWithCalculation = useMemo(() => {
    return leftRows.map((row) => {
      if (row.id === "s-total-aset") {
        const addIds = [
          1101, 1200, 1122, 1123, 1124, 1125, 1401, 1421, 1422, 1423, 1499, 1501, 1523, 1529, 1541,
          1599, 1600, 1611, 1698,
        ];
        const subtractIds = [1131, 1524, 1530];
        const value = calculateWithDeductions(addIds, subtractIds, leftRows);
        console.log("🔢 Calculating TOTAL ASET:", value);
        return { ...row, nilaiKomersial: value };
      }

      return row;
    });
  }, [leftRows, calculateWithDeductions]);

  const rightRowsWithCalculation = useMemo(() => {
    return rightRows.map((row) => {
      // Auto-calculate untuk Total Liabilitas row
      if (row.id === "s-total-liabilitas") {
        const liabilitasIds = [2102, 2111]; // Utang Usaha + Utang Bunga
        const totalLiabilitas = liabilitasIds.reduce((sum, id) => {
          const liabilitasRow = rightRows.find((r) => r.id === id);
          return sum + (liabilitasRow?.nilaiKomersial || 0);
        }, 0);

        console.log(" Calculating row Total Liabilitas:", totalLiabilitas); // Debug
        return { ...row, nilaiKomersial: totalLiabilitas };
      }

      // Auto-calculate untuk Total Ekuitas row
      if (row.id === "s-total-ekuitas") {
        const ekuitasIds = [31028]; // Modal Saham
        const totalEkuitas = ekuitasIds.reduce((sum, id) => {
          const ekuitasRow = rightRows.find((r) => r.id === id);
          return sum + (ekuitasRow?.nilaiKomersial || 0);
        }, 0);

        console.log(" Calculating row Total Ekuitas:", totalEkuitas); // Debug
        return { ...row, nilaiKomersial: totalEkuitas };
      }

      if (row.id === "s-total-liab-ekuitas") {
        // Ambil dari subtotal yang sudah dihitung
        const totalLiab = rightRows.find((r) => r.id === "s-total-liabilitas")?.nilaiKomersial || 0;
        const totalEkuitas = rightRows.find((r) => r.id === "s-total-ekuitas")?.nilaiKomersial || 0;

        // Atau hitung langsung dari ID individual
        const liabIds = [2102, 2111];
        const ekuitasIds = [31028];

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

  // Function untuk handle perubahan nilai
  const handleValueChange = (rowId, newValue, side) => {
    console.log("Value change in BagianB:", rowId, newValue, side); // Debug log

    if (side === "left") {
      setLeftRows((prev) => {
        const updated = prev.map((row) =>
          row.id === rowId ? { ...row, nilaiKomersial: newValue } : row
        );
        console.log("Updated leftRows:", updated); // Debug log
        return updated;
      });
    } else if (side === "right") {
      setRightRows((prev) => {
        const updated = prev.map((row) =>
          row.id === rowId ? { ...row, nilaiKomersial: newValue } : row
        );
        console.log("Updated rightRows:", updated); // Debug log
        return updated;
      });
    }
  };

  return (
    <LaporanNeraca
      leftRows={leftRowsWithCalculation}
      rightRows={rightRowsWithCalculation}
      onValueChange={handleValueChange}
      // jumlahtotal={jumlahtotal}
    />
  );
}
