import React, { useState, useMemo } from "react";
import { NeracaFactory } from "./NeracaFactory";
import NeracaTabel from "@badanSections/Lampiran1/shared/NeracaTabel";

export default function UniversalNeraca({ jenisPerusahaan, bagian = "B" }) {
  if (!jenisPerusahaan) {
    return (
      <div style={{ padding: "20px", border: "2px solid orange", backgroundColor: "#fff3cd" }}>
        <h3> Warning: jenisPerusahaan undefined</h3>
        <p>Pastikan component dipanggil dengan props jenisPerusahaan yang valid.</p>
      </div>
    );
  }

  try {
    const { initialRows, config } = NeracaFactory.createComponent(jenisPerusahaan, bagian);

    const [rows, setRows] = useState(initialRows || []);

    //  Apply calculations secara real-time
    const rowsWithCalculation = useMemo(() => {
      return applyCalculations(rows, jenisPerusahaan, bagian);
    }, [rows, jenisPerusahaan, bagian]);

    //  Split rows berdasarkan property `side`
    const { leftRows, rightRows } = useMemo(() => {
      const left = rowsWithCalculation.filter((row) => row.side === "left");
      const right = rowsWithCalculation.filter((row) => row.side === "right");
      return { leftRows: left, rightRows: right };
    }, [rowsWithCalculation]);

    //  Handle value change langsung dari table (tanpa modal)
    const handleValueChange = (rowId, numericValue, side) => {
      console.log("Value changed:", { rowId, numericValue, side });

      setRows((prevRows) => {
        // Update row yang diubah
        const updatedRows = prevRows.map((row) =>
          row.id === rowId ? { ...row, nilaiKomersial: numericValue } : row
        );

        // Apply calculations setelah update
        try {
          const calculations = NeracaFactory.getSubtotalCalculations(jenisPerusahaan, bagian);
          let calculatedRows = updatedRows;

          calculations.forEach((calc) => {
            if (typeof calc === "function") {
              calculatedRows = calc(calculatedRows);
            }
          });

          return calculatedRows;
        } catch (error) {
          console.error("Error in calculations:", error);
          return updatedRows;
        }
      });
    };

    if (!rows || rows.length === 0) {
      return (
        <div style={{ padding: "20px", textAlign: "center", color: "#666" }}>
          <p>
            {" "}
            Tidak ada data untuk {jenisPerusahaan} - {bagian}
          </p>
        </div>
      );
    }

    return (
      <NeracaTabel
        leftRows={leftRows}
        rightRows={rightRows}
        onValueChange={handleValueChange}
        titleLeft="ASET"
        titleRight="LIABILITAS & EKUITAS"
      />
    );
  } catch (error) {
    console.error(" Error in UniversalNeraca:", error);
    return (
      <div
        style={{
          padding: "20px",
          border: "2px solid red",
          color: "red",
          backgroundColor: "#ffe6e6",
        }}
      >
        <h3> Error Loading Neraca</h3>
        <p>
          <strong>Message:</strong> {error.message}
        </p>
        <details style={{ marginTop: "10px", fontSize: "12px" }}>
          <summary>Stack Trace</summary>
          <pre style={{ background: "#f5f5f5", padding: "10px", overflow: "auto" }}>
            {error.stack}
          </pre>
        </details>
      </div>
    );
  }
}

//  Helper function untuk apply calculations
function applyCalculations(rows, jenisPerusahaan, bagian) {
  if (!rows || rows.length === 0) return [];

  try {
    const calculations = NeracaFactory.getSubtotalCalculations(jenisPerusahaan, bagian);

    if (!calculations || calculations.length === 0) {
      console.warn(` No calculations found for ${jenisPerusahaan} - ${bagian}`);
      return rows;
    }

    let updatedRows = [...rows];

    calculations.forEach((calcFn) => {
      if (typeof calcFn === "function") {
        updatedRows = calcFn(updatedRows);
      }
    });

    return updatedRows;
  } catch (error) {
    console.error("Error applying calculations:", error);
    return rows;
  }
}
