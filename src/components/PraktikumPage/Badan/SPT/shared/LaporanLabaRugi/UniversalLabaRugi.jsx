import React, { useState } from "react";
import { toNumber } from "@utils/formatCurrency";
import { getLampiran1FieldConfig } from "../lampiran1FieldConfig";
import { LabaRugiFactory } from "./LabaRugiFactory";
import LaporanLabaRugiTabel from "../../Spt_Badan/Lampiran/section/Lampiran1/shared/LaporanLabaRugiTabel";
import GlobalModal from "../GlobalModal";

export default function UniversalLabaRugi({ jenisPerusahaan, bagian = "A" }) {
  if (!jenisPerusahaan) {
    return (
      <div style={{ padding: "20px", border: "2px solid orange", backgroundColor: "#fff3cd" }}>
        <h3>Warning: jenisPerusahaan undefined</h3>
        <p>Pastikan component dipanggil dengan props jenisPerusahaan yang valid.</p>
      </div>
    );
  }

  try {
    const { initialRows, config, kodeKoreksiOptions } = LabaRugiFactory.createComponent(
      jenisPerusahaan,
      bagian
    );

    const [rows, setRows] = useState(initialRows || []);
    const [showModal, setShowModal] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);

    const openEditModal = (row) => {
      setSelectedRow(row);
      setShowModal(true);
    };

    const closeModal = () => {
      setShowModal(false);
      setSelectedRow(null);
    };

    const handleFieldChange = (key, value) => {
      setSelectedRow((prev) => {
        const newData = { ...prev, [key]: value };

        const fieldsToWatch = [
          "nilaiKomersial",
          "nonObjekPajak",
          "pphFinal",
          "penyesuaianPositif",
          "penyesuaianNegatif",
        ];

        // Auto-calculate tidakFinal
        if (key !== "tidakFinal") {
          newData.tidakFinal =
            toNumber(newData.nilaiKomersial) -
            (toNumber(newData.nonObjekPajak) + toNumber(newData.pphFinal));
        }

        // Auto-calculate nilaiFiskal
        if (fieldsToWatch.includes(key)) {
          newData.nilaiFiskal =
            toNumber(newData.nilaiKomersial) -
            (toNumber(newData.nonObjekPajak) + toNumber(newData.pphFinal)) -
            toNumber(newData.penyesuaianPositif) +
            toNumber(newData.penyesuaianNegatif);
        }

        return newData;
      });
    };

    const handleSave = (values) => {
      let updatedRows = rows.map((r) => (r.id === selectedRow.id ? { ...r, ...values } : r));

      // Apply calculations based on company type
      try {
        const calculations = LabaRugiFactory.getSubtotalCalculations(jenisPerusahaan, bagian);
        calculations.forEach((calc) => {
          if (typeof calc === "function") {
            calc(updatedRows);
          }
        });
      } catch (error) {
        console.error("Error in calculations:", error);
      }
      console.log("Updated Rows after calculations:", updatedRows);

      setRows(updatedRows);
      closeModal();
    };

    const fieldConfig = getLampiran1FieldConfig(selectedRow, {
      kodeKoreksiOptions,
      editableTidakFinal: [],
      editableNilaiFiskal: [],
      readOnlyFields: config?.readOnlyFields || {},
    });

    if (!rows || rows.length === 0) {
      return (
        <div style={{ padding: "20px", textAlign: "center", color: "#666" }}>
          <p>
            Tidak ada data untuk {jenisPerusahaan} - {bagian}
          </p>
        </div>
      );
    }

    return (
      <>
        <LaporanLabaRugiTabel
          rows={rows}
          openEditModal={openEditModal}
          kodeOptions={kodeKoreksiOptions}
        />

        <GlobalModal
          isOpen={showModal}
          onClose={closeModal}
          onSave={handleSave}
          title={`Edit ${selectedRow?.keterangan || ""}`}
          baseFields={fieldConfig.baseFields}
          customChildren={fieldConfig.customChildren}
          data={selectedRow || {}}
          size="2xl"
          onFieldChange={handleFieldChange}
        />
      </>
    );
  } catch (error) {
    console.error("Error in UniversalLabaRugi:", error);
  }
}
