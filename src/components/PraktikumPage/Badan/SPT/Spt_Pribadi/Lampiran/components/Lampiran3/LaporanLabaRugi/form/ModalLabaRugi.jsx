// @lampiran/Lampiran3/LaporanLabaRugi/form/ModalLabaRugi.jsx
import React, { useEffect, useState } from "react";

const toNum = (v) => (v === "" || v == null ? 0 : Number(v));

export default function ModalLabaRugi({
  open,
  onClose,
  title,
  schema = [],
  initialData = {},
  onSubmit,
  autoHitungNilaiFiskal = true, // set false bila tidak mau auto-hitung
}) {
  const [form, setForm] = useState({});

  useEffect(() => {
    if (!open) return;
    const base = {};
    schema.forEach((f) => {
      const defVal = f.type === "number" ? "" : ""; // default kosong agar tidak tampil 0
      base[f.name] = initialData?.[f.name] ?? defVal;
    });
    setForm(base);
  }, [open, schema, initialData]);

  if (!open) return null;

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

  const handleChange = (field) => (e) => {
    const raw = e.target.value;
    const value = field.type === "number" ? raw.replace(/[^\d.-]/g, "") : raw;

    setForm((prev) => {
      const next = { ...prev, [field.name]: value };
      if (autoHitungNilaiFiskal && "nilaiFiskal" in next) {
        next.nilaiFiskal = String(recomputeNilaiFiskal(next));
      }
      return next;
    });
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

  const inputBase = "w-full border rounded p-2 text-sm disabled:bg-gray-100 disabled:text-gray-500";

  const renderField = (f) => {
    if (f.type === "select") {
      return (
        <select
          className={inputBase}
          value={form[f.name] ?? ""}
          onChange={handleChange(f)}
          disabled={!!f.readOnly}
        >
          {(f.options || []).map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      );
    }

    // number/text input
    const isNumber = f.type === "number";
    const content = (
      <input
        type={isNumber ? "text" : "text"} // biar bisa tampil kosong; normalisasi manual
        inputMode={isNumber ? "decimal" : undefined}
        className={inputBase}
        placeholder={isNumber ? "Rp." : ""}
        value={form[f.name] ?? ""}
        onChange={handleChange(f)}
        disabled={!!f.readOnly}
        readOnly={!!f.readOnly}
      />
    );

    // tampilan prefix "Rp." sesuai untuk field number
    if (isNumber) {
      return (
        <div className="flex items-stretch">
          <span className="inline-flex items-center px-3 border rounded-l bg-gray-50 text-gray-600 text-sm">
            Rp.
          </span>
          {React.cloneElement(content, {
            className:
              "flex-1 border-l-0 rounded-l-none rounded-r " + inputBase.replace("rounded ", ""),
          })}
        </div>
      );
    }

    return content;
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-5 w-[760px] shadow-xl">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-lg">{title || "Ubah"}</h3>
          <button className="text-gray-500 hover:text-gray-800" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* render dan Filter jika field satus hidden tidak ditampilkan pada field */}
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-3">
          {schema
            .filter((f) => !f.hidden)
            .map((f) => (
              <label key={f.name} className={`text-sm ${f.full ? "col-span-2" : ""}`}>
                {f.label}
                {renderField(f)}
              </label>
            ))}

          <div className="col-span-2 flex justify-end gap-2 mt-2">
            <button type="button" onClick={onClose} className="px-3 py-2 border rounded">
              Tutup
            </button>
            <button type="submit" className="px-3 py-2 rounded bg-blue-700 text-white">
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
