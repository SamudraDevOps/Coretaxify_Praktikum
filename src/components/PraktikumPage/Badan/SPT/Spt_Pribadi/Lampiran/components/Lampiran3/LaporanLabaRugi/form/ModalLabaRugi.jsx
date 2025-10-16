// @lampiran/Lampiran3/LaporanLabaRugi/form/ModalLabaRugi.jsx
import React from "react";
import FormFieldLabaRugi from "./FormFieldLabaRugi";

export default function ModalLabaRugi({
  open,
  onClose,
  title,
  schema = [],
  initialData = {},
  onSubmit,
  autoHitungNilaiFiskal = true, // set false bila tidak mau auto-hitung
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-5 w-[760px] shadow-xl">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-lg">{title || "Ubah"}</h3>
          <button className="text-gray-500 hover:text-gray-800" onClick={onClose}>
            ✕
          </button>
        </div>

        <FormFieldLabaRugi
          schema={schema}
          initialData={initialData}
          onSubmit={onSubmit}
          onCancel={onClose}
          autoHitungNilaiFiskal={autoHitungNilaiFiskal}
        />
      </div>
    </div>
  );
}
