import React, { useState } from "react";
import GlobalFormField from "@shared/GlobalFormField";
import { parseFormattedNumber } from "@utils/formatCurrency";

// CONFIG
const ConfigComponent = {
  baseFields: [
    "alamat",
    "nomorSuratPenetapanDaerah",
    "tanggalSuratPenetapanDaerah",
    "nomorSuratPerpanjanganDaerah",
    "tanggalSuratPerpanjanganDaerah",
    "biayaTempatTinggal",
    "biayaKesehatan",
    "biayaPendidikan",
    "biayaPeribadatan",
    "biayaPegangkutan",
    "biayaOlahraga",
    "jumlahBiaya",
  ],

  customChildren: [
    {
      key: "nomorSuratPenetapanDaerah",
      type: "text",
      title: "Nomor Surat Keputusan Penetapan Daerah Tertentu",
      placeholder: "Nomor Surat Keputusan",
    },
    {
      key: "tanggalSuratPenetapanDaerah",
      type: "date",
      title: "Tanggal Surat Keputusan Penetapan Daerah Tertentu",
      placeholder: "",
    },
    {
      key: "nomorSuratPerpanjanganDaerah",
      type: "text",
      title: "Nomor Surat Keputusan Perpanjangan Penetapan Daerah Tertentu",
      placeholder: "Nomor Surat Keputusan",
    },
    {
      key: "tanggalSuratPerpanjanganDaerah",
      type: "date",
      title: "Tanggal Surat Keputusan Perpanjangan Penetapan Daerah Tertentu",
      placeholder: "",
    },
    {
      key: "biayaTempatTinggal",
      type: "currency",
      title:
        "Biaya yang dikeluarkan untuk tempat tinggal, termasuk perumahan untuk pegawai dan keluarganya",
      placeholder: "",
    },
    {
      key: "biayaKesehatan",
      type: "currency",
      title: "Biaya yang dikeluarkan untuk pelayanan kesehatan",
      placeholder: "",
    },
    {
      key: "biayaPendidikan",
      type: "currency",
      title: "Biaya yang dikeluarkan untuk pendidikan bagi pegawai dan keluarganya",
      placeholder: "",
    },
    {
      key: "biayaPeribadatan",
      type: "currency",
      title: "Biaya yang dikeluarkan untuk peribadatan",
      placeholder: "",
    },
    {
      key: "biayaPegangkutan",
      type: "currency",
      title: "Biaya yang dikeluarkan untuk pengangkutan bagi pegawai dan keluarganya",
      placeholder: "",
    },
    {
      key: "biayaOlahraga",
      type: "currency",
      title:
        "Biaya yang dikeluarkan untuk olahraga bagi pegawai dan keluarganya, tidak termasuk golf, power boating, pacuan kuda, dan terbang layang",
      placeholder: "",
    },
    {
      key: "jumlahBiaya",
      type: "currency",
      title: "Jumlah Biaya yang dikeluarkan",
      placeholder: "Akan Terhitung Otomatis",
      readOnly: true,
    },
  ],
};

const RincianAtauPenggantian = () => {
  const [form, setForm] = useState({});

  //  AUTO CALCULATE FUNCTION - Real-time
  const handleFieldChange = (key, value) => {
    setForm((prev) => {
      const newData = { ...prev, [key]: value };

      // Daftar field biaya yang akan dijumlahkan
      const biayaKeys = [
        "biayaTempatTinggal",
        "biayaKesehatan",
        "biayaPendidikan",
        "biayaPeribadatan",
        "biayaPegangkutan",
        "biayaOlahraga",
      ];

      if (biayaKeys.includes(key)) {
        const total = biayaKeys
          .map((k) => parseFormattedNumber(String(newData[k] ?? "")) || 0)
          .reduce((a, b) => a + b, 0);

        newData.jumlahBiaya = total;

        console.log("Auto Calculate - Total Biaya:", {
          [key]: value,
          total,
        });
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

export default RincianAtauPenggantian;
