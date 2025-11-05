import React from "react";
import { X } from "lucide-react";
import FormFieldPajakFinal from "./FormFieldPajakFinal";

export default function ModalPajakFinal({ open, onClose, title, schema, initialData, onSubmit }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-lg shadow-xl overflow-hidden">
        {/* Header */}
        <div className="sticky top-0 z-10 border-b bg-white px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
              {/* Tampilkan Nama TKU (Read-only) */}
              {initialData?.namaTKU && (
                <p className="text-sm text-gray-600 mt-1">
                  <strong>Nama TKU:</strong> {initialData.namaTKU}
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              className="rounded-full p-1 hover:bg-gray-100 transition-colors ml-4"
              type="button"
            >
              <X size={20} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Body - Scrollable */}
        <div className="overflow-y-auto max-h-[calc(90vh-140px)] p-6">
          <FormFieldPajakFinal
            schema={schema}
            initialData={initialData}
            onSubmit={onSubmit}
            onCancel={onClose}
          />
        </div>
      </div>
    </div>
  );
}
