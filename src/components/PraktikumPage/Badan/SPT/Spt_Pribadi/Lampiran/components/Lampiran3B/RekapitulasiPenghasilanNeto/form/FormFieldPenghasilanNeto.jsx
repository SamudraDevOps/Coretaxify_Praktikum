import React, { useEffect, useState } from "react";
import { formatRupiah, formatNumber, parseFormattedNumber } from "@utils/formatCurrency";
import { BULAN_FIELDS } from "./schemas";

const toNum = (v) => (v === "" || v == null ? 0 : Number(v));

function cn(...cls) {
  return cls.filter(Boolean).join(" ");
}

export default function FormFieldPenghasilanNeto({
  schema = [],
  initialData = {},
  onSubmit,
  onCancel,
  autoHitungTotal = true,
}) {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const base = {};
    schema.forEach((f) => {
      const defVal = f.type === "number" ? 0 : "";
      base[f.name] = initialData?.[f.name] ?? defVal;
    });
    setForm(base);
  }, [schema, initialData]);

  // Auto-calculate total (sum dari semua bulan)
  const recomputeTotal = (draft) => {
    return BULAN_FIELDS.reduce((sum, field) => sum + toNum(draft[field]), 0);
  };

  // Handle input numeric dengan format currency
  const handleNumericChange = (fieldName) => (e) => {
    const numericValue = parseFormattedNumber(e.target.value);
    setForm((prev) => {
      const next = { ...prev, [fieldName]: numericValue };
      // Auto-calculate total jika ada field total
      if (autoHitungTotal && schema.some((f) => f.name === "total")) {
        next.total = recomputeTotal(next);
      }
      return next;
    });

    // Clear error untuk field ini
    if (errors[fieldName]) {
      setErrors((prev) => ({ ...prev, [fieldName]: null }));
    }
  };

  const handleChange = (field) => (e) => {
    console.log(" tes data ", field.name, e.target.value);
    const value = e.target.value;
    setForm((prev) => ({ ...prev, [field.name]: value }));

    // Clear error untuk field ini
    if (errors[field.name]) {
      setErrors((prev) => ({ ...prev, [field.name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(">>> submit", form);

    // Kirim nilai yang sudah dinormalisasi
    const payload = {};
    schema.forEach((f) => {
      payload[f.name] = f.type === "number" ? toNum(form[f.name]) : form[f.name] ?? "";
    });

    onSubmit?.(payload);
  };

  const renderField = (f) => {
    const { name, type, label, placeholder, readOnly, required, full } = f;
    const hasError = errors[name];
    const value = type === "number" ? form[name] : form[name] || "";

    const baseInputClass = cn(
      "flex-1 p-2 border rounded-md text-sm transition-colors",
      readOnly
        ? "bg-gray-100 text-gray-600 cursor-not-allowed"
        : "focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
      hasError ? "border-red-300 focus:ring-red-500" : "border-gray-300"
    );

    // Horizontal Layout Wrapper (seperti GlobalModal)
    const fieldWrapper = (content) => (
      <div key={name} className="space-y-1">
        {/* Horizontal Layout: Label kiri (fixed width), Input kanan (flex) */}
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-gray-700 w-48 flex-shrink-0">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
          {content}
        </div>
        {/* Error di bawah dengan margin sesuai label width */}
        {hasError && <p className="text-red-500 text-xs mt-1 ml-52">{hasError}</p>}
      </div>
    );

    // Render berdasarkan type
    if (type === "number") {
      return fieldWrapper(
        <input
          type="text"
          className={baseInputClass}
          value={readOnly ? formatRupiah(Number(value) || 0) : formatNumber(value)}
          onChange={readOnly ? undefined : handleNumericChange(name)}
          placeholder={placeholder || "Masukkan nilai"}
          readOnly={!!readOnly}
          inputMode="numeric"
        />
      );
    }

    if (f.type === "select") {
      return fieldWrapper(
        <select
          className={baseInputClass}
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

    // Text input (fallback)
    return fieldWrapper(
      <input
        type="text"
        className={baseInputClass}
        value={value}
        onChange={handleChange(f)}
        placeholder={placeholder || ""}
        readOnly={!!readOnly}
      />
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {/* Render semua fields dengan layout horizontal */}
      {schema.filter((f) => !f.hidden).map(renderField)}

      {/* Footer Actions */}
      <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border rounded hover:bg-gray-50 transition-colors"
        >
          Tutup
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors"
        >
          Simpan
        </button>
      </div>
    </form>
  );
}
