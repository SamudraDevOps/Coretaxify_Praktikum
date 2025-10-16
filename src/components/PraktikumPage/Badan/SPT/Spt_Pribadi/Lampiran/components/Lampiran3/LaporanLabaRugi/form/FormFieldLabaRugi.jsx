import React, { useEffect, useState } from "react";
import { formatRupiah, formatNumber, parseFormattedNumber } from "@utils/formatCurrency";

const toNum = (v) => (v === "" || v == null ? 0 : Number(v));

export default function FormFieldLabaRugi({
  schema = [],
  initialData = {},
  onSubmit,
  onCancel,
  autoHitungNilaiFiskal = true,
}) {
  const [form, setForm] = useState({});

  useEffect(() => {
    const base = {};
    schema.forEach((f) => {
      const defVal = f.type === "number" ? 0 : "";
      base[f.name] = initialData?.[f.name] ?? defVal;
    });
    setForm(base);
  }, [schema, initialData]);

  // contoh rumus sederhana; sesuaikan dengan kebijakanmu
  const recomputeNilaiFiskal = (draft) => {
    const k = toNum(draft.nilaiKomersial);
    const no = toNum(draft.nonObjekPajak);
    const pf = toNum(draft.pphFinal);
    const tf = toNum(draft.tidakFinal);
    const p = toNum(draft.penyesuaianPositif);
    const n = toNum(draft.penyesuaianNegatif);
    return k - (no + pf) + tf + (p - n);
  };

  // Function untuk handle input numeric menggunakan utility function
  const handleNumericChange = (fieldName) => (e) => {
    const numericValue = parseFormattedNumber(e.target.value);
    setForm((prev) => {
      const next = { ...prev, [fieldName]: numericValue };
      if (autoHitungNilaiFiskal && schema.some((f) => f.name === "nilaiFiskal")) {
        next.nilaiFiskal = recomputeNilaiFiskal(next);
      }
      return next;
    });
  };

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setForm((prev) => ({ ...prev, [field.name]: value }));
  };

  const handleSubmit = (e) => {
    console.log(">>> submit", form);
    e.preventDefault();
    // kirim nilai yang sudah dinormalisasi (number untuk kolom number)
    const payload = {};
    schema.forEach((f) => {
      payload[f.name] = f.type === "number" ? toNum(form[f.name]) : form[f.name] ?? "";
    });
    onSubmit?.(payload);
  };

  const inputBase = "w-full border rounded p-2 text-sm";

  const renderField = (f) => {
    if (f.type === "select") {
      return (
        <select
          className={`${inputBase} ${f.readOnly ? "bg-gray-100 text-gray-500" : ""}`}
          value={form[f.name] ?? ""}
          onChange={handleChange(f)}
          disabled={!!f.readOnly}
        >
          <option value="">Pilih {f.label}</option>
          {(f.options || []).map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      );
    }

    // number input dengan format currency
    if (f.type === "number") {
      return (
        <input
          type="text"
          className={`${inputBase} ${
            f.readOnly ? "bg-gray-100 text-gray-600" : "focus:ring-2 focus:ring-blue-500"
          }`}
          value={f.readOnly ? formatRupiah(Number(form[f.name]) || 0) : formatNumber(form[f.name])}
          onChange={f.readOnly ? undefined : handleNumericChange(f.name)}
          placeholder={f.placeholder || "Masukkan nilai"}
          readOnly={!!f.readOnly}
          inputMode="numeric"
        />
      );
    }

    // text input
    return (
      <input
        type="text"
        className={`${inputBase} ${
          f.readOnly ? "bg-gray-100 text-gray-600" : "focus:ring-2 focus:ring-blue-500"
        }`}
        value={form[f.name] ?? ""}
        onChange={handleChange(f)}
        placeholder={f.placeholder || ""}
        readOnly={!!f.readOnly}
      />
    );
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-3">
      {schema
        .filter((f) => !f.hidden)
        .map((f) => (
          <label key={f.name} className={`text-sm ${f.full ? "col-span-2" : ""}`}>
            <span className="font-medium text-gray-700">
              {f.label}
              {f.required && <span className="text-red-500 ml-1">*</span>}
            </span>
            {renderField(f)}
          </label>
        ))}

      <div className="col-span-2 flex justify-end gap-2 mt-4 pt-3 border-t">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border rounded hover:bg-gray-50"
        >
          Tutup
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          Simpan
        </button>
      </div>
    </form>
  );
}
