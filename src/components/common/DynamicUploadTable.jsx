import React from "react";
import { FaTrash } from "react-icons/fa";

export default function DynamicUploadTable({
  rows,
  handleFileChange,
  handleInputChange,
  handleAddRow,
  handleRemoveRow,
  total,
  columns,
  fileLabel = "File",
  addLabel = "+ Tambah data",
  showTotal = true,
}) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300 rounded-md">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="py-2 px-3 border-b text-center">
                {col.label}
              </th>
            ))}
            <th className="py-2 px-3 border-b text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx}>
              {columns.map((col) => (
                <td key={col.key} className="py-2 px-3 border-b text-center">
                  {col.type === "file" ? (
                    <>
                      <input
                        type="file"
                        accept={col.accept || "*"}
                        onChange={(e) =>
                          handleFileChange(idx, e.target.files[0])
                        }
                      />
                      {row.file && (
                        <div className="text-xs mt-1">{row.file.name}</div>
                      )}
                    </>
                  ) : (
                    <input
                      type={col.type}
                      className="w-24 border rounded px-2 py-1 text-right"
                      value={row[col.key]}
                      onChange={(e) =>
                        handleInputChange(idx, col.key, e.target.value)
                      }
                      min={col.type === "number" ? "0" : undefined}
                    />
                  )}
                </td>
              ))}
              <td className="py-2 px-3 border-b text-center">
                <button
                  type="button"
                  className="text-red-600 hover:text-red-800 text-xl"
                  onClick={() => handleRemoveRow(idx)}
                  title="Hapus"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={columns.length + 1} className="p-3">
              <button
                type="button"
                className="bg-blue-600 text-white hover:bg-blue-700 text-sm px-3 py-2 rounded"
                onClick={handleAddRow}
              >
                {addLabel}
              </button>
            </td>
          </tr>
          {showTotal && (
            <tr className="font-semibold bg-gray-50">
              <td className="py-2 px-3 text-right">Total</td>
              {columns.map((col) => (
                <td key={col.key} className="py-2 px-3 text-right">
                  {col.type === "number" ? total(col.key) : ""}
                </td>
              ))}
              <td></td>
            </tr>
          )}
        </tfoot>
      </table>
    </div>
  );
}