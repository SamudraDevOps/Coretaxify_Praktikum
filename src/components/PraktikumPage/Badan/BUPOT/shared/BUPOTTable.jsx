import React from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useNavigateWithParams } from "@/hooks/useNavigateWithParams";

const BUPOTTable = ({
  columns,
  data = [],
  status = "belumTerbit",
  emptyMessage = "Tidak ada data yang ditemukan.",
  selectedItems = [],
  onSelectionChange,
  type,
  currentPage = 1,
  pagination,
}) => {
  const { id, akun } = useParams();
  const navigate = useNavigateWithParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const userId = searchParams.get("user_id");

  const formatRupiah = (number) => {
    // If data is null, undefined, or empty string, change it to 0
    if (number === null || number === undefined || number === "") {
      number = 0;
    }

    // Convert to string first to handle both string and number inputs
    let stringValue = String(number);

    // Normalize "0.00" to "0"
    if (stringValue === "0.00") stringValue = "0";

    // Remove any non-numeric characters except decimal point and negative sign
    const cleanedValue = stringValue.replace(/[^0-9.-]/g, "");

    // Convert to number
    const numericValue = parseFloat(cleanedValue);

    // Check if conversion was successful, if not return "0"
    if (isNaN(numericValue)) return "0";

    return new Intl.NumberFormat("id-ID", {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0, // This ensures no decimal places are shown
    }).format(numericValue);
  };
  // handle select all
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allIds = data.map((item) => item.id);
      onSelectionChange(allIds);
    } else {
      onSelectionChange([]);
    }
  };

  const handleSelectItem = (itemId, checked) => {
    if (checked) {
      onSelectionChange([...selectedItems, itemId]);
    } else {
      onSelectionChange(selectedItems.filter((id) => id !== itemId));
    }
  };

  // Calculate row number based on current page and pagination
  const getRowNumber = (index) => {
    if (pagination && pagination.from) {
      return pagination.from + index;
    }
    return (currentPage - 1) * (pagination?.per_page || 20) + index + 1;
  };
  // Different columns for "Telah Terbit" status
  const getColumns = () => {
    const baseColumns = [
      {
        key: "checkbox",
        label: (
          <input
            type="checkbox"
            checked={selectedItems.length === data.length && data.length > 0}
            onChange={handleSelectAll}
          />
        ),
      },
      { key: "actions", label: "Actions" },
      ...columns,
    ];

    if (status === "published") {
      return [
        ...baseColumns,
        { key: "dilaporkanSPT", label: "Dilaporkan Dalam SPT" },
        { key: "sptTelahDiperiksa", label: "SPT telah/sedang diperiksa" },
        { key: "sptPenegakanHukum", label: "SPT Dalam penegakan hukum" },
      ];
    }
    return baseColumns;
  };

  const tableColumns = getColumns();
  const colSpan = tableColumns.length;

  const getPdfPath = (rowId) => {
    if (type === "bppu") return `/praktikum/${id}/sistem/${akun}/bupot/bppu/pdf/${rowId}`;
    // if (type === "bpbpt") return `/praktikum/${id}/sistem/${akun}/bupot/bpbpt/pdf/${rowId}`;
    if (type === "bp21") return `/praktikum/${id}/sistem/${akun}/bupot/bp21/pdf/${rowId}`;

    return null;
  };

  return (
    <div className="bg-white p-4 border rounded w-full overflow-x-auto">
      <table className="table-auto border-collapse">
        <thead>
          <tr className="bg-blue-800 text-gray-700 text-left">
            {tableColumns.map((column, index) => (
              <th key={index} className="px-4 py-2 border">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {tableColumns.map((column, colIndex) => (
                  <td key={colIndex} className="px-4 py-2 border">
                    {column.key === "checkbox" ? (
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(row.id)}
                        onChange={(e) =>
                          handleSelectItem(row.id, e.target.checked)
                        }
                      />
                    ) : column.key === "no" ? (
                      getRowNumber(rowIndex)
                    ) : column.key === "actions" ? (
                      <div className="flex gap-2">
                        <div className="flex pace-x-2">
                          <button
                            onClick={() =>
                              navigate(
                                `/praktikum/${id}/sistem/${akun}/bupot/${type}/${row.id}/edit`
                              )
                            }
                            className={
                              userId
                                ? "hidden"
                                : "bg-blue-500 text-white px-2 py-1 rounded text-sm hover:bg-blue-600"
                            }
                          >
                            Edit
                          </button>
                        </div>
                        {status === "published" && getPdfPath(row.id) && (
                          <div className="flex space-x-2">
                            <button
                              onClick={() => navigate(getPdfPath(row.id))}
                              className={
                                userId
                                  ? "hidden"
                                  : "bg-blue-500 text-white px-2 py-1 rounded text-sm hover:bg-blue-600"
                              }
                            >
                              Lihat PDF
                            </button>
                          </div>
                        )}
                      </div>
                    ) : // row[column.key]
                      // <>{row[column.key]}{column.key}</>
                      column.key === "dasar_pengenaan_pajak" ||
                        column.key === "pajak_penghasilan" ? (
                        formatRupiah(row[column.key])
                      ) : (
                        row[column.key]
                      )}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr className="text-center text-gray-500">
              <td colSpan={colSpan} className="px-4 py-6 border">
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BUPOTTable;
