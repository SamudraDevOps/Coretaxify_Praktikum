import React, { useState } from "react";
import GlobalFormField from "@shared/GlobalFormField";
import { parseFormattedNumber } from "@utils/formatCurrency";

// CONFIG
const ConfigComponent = {
  baseFields: [
    "penghasilanNetoKomersial",
    "bebanPenyusutanAmortisasi",
    "bebanPajakPenghasilan",
    "bebanBiayaPinjaman",
    "EBITDA",
    "EBITDA25Percent",
  ],

  customChildren: [
    {
      key: "penghasilanNetoKomersial",
      type: "currency",
      title: "1. PENGHASILAN NETO KOMERSIAL ",
      placeholder: "",
    },
    {
      key: "bebanPenyusutanAmortisasi",
      type: "currency",
      title: "2. BEBAN PENYUSUTAN DAN AMORTISASI",
      placeholder: "",
    },
    {
      key: "bebanPajakPenghasilan",
      type: "currency",
      title: "3. BEBAN PAJAK PENGHASILAN",
      placeholder: "",
    },
    {
      key: "bebanBiayaPinjaman",
      type: "currency",
      title: "4. BEBAN BIAYA PINJAMAN",
      placeholder: "",
    },
    {
      key: "EBITDA",
      type: "currency",
      title: "5.EBITDA",
      placeholder: "",
    },
    {
      key: "EBITDA25Percent",
      type: "currency",
      title: "6. EBITDA (25%)",
      placeholder: "",
      readOnly: true,
    },
  ],
};

const PerhitunganEBITDA = () => {
  const [form, setForm] = useState({});

  //  AUTO CALCULATE FUNCTION - Real-time
  const handleFieldChange = (key, value) => {
    setForm((prev) => {
      const newData = { ...prev, [key]: value };

      // Hitung total biaya untuk EBITDA
      const biayaKeys = [
        "penghasilanNetoKomersial",
        "bebanPenyusutanAmortisasi",
        "bebanPajakPenghasilan",
      ];

      // Jika field yang membentuk EBITDA berubah, hitung EBITDA dan EBITDA25Percent
      if (biayaKeys.includes(key)) {
        const total = biayaKeys
          .map((k) => parseFormattedNumber(String(newData[k] ?? "")) || 0)
          .reduce((a, b) => a + b, 0);

        newData.EBITDA = total;
        newData.EBITDA25Percent = total * 0.25;
      }

      // Jika field EBITDA diubah manual, hitung EBITDA25Percent dari value EBITDA terbaru
      if (key === "EBITDA") {
        const ebitdaValue = parseFormattedNumber(String(value) ?? "") || 0;
        newData.EBITDA25Percent = ebitdaValue * 0.25;
      }

      return newData;
    });
  };

  return (
    <div className="border rounded-md p-4 space-y-4">
      <GlobalFormField
        baseFields={ConfigComponent.baseFields}
        customChildren={ConfigComponent.customChildren}
        formData={form}
        onFieldChange={handleFieldChange}
        labelWidth="w-[600px]"
      />
    </div>
  );
};

export default PerhitunganEBITDA;
