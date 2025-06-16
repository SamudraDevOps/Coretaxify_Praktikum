import React from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigateWithParams } from "@/hooks/useNavigateWithParams";

const BUPOTTable = ({
  columns,
  data = [],
  status = "belumTerbit",
  emptyMessage = "Tidak ada data yang ditemukan.",
  selectedItems = [],
  onSelectionChange,
  type,
}) => {
  const { id, akun } = useParams();
  const navigate = useNavigateWithParams();

  // handle select all
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allIds = data.map(item => item.id);
      onSelectionChange(allIds);
    } else {
      onSelectionChange([]);
    }
  };

  const handleSelectItem = (itemId, checked) => {
    if (checked) {
      onSelectionChange([...selectedItems, itemId]);
    } else {
      onSelectionChange(selectedItems.filter(id => id !== itemId));
    }
  };

  // Different columns for "Telah Terbit" status
  const getColumns = () => {
    const baseColumns = [
      { key: "checkbox", label: (
        <input
          type="checkbox"
          checked={selectedItems.length === data.length && data.length > 0}
          onChange={handleSelectAll}
        />
      ) },
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

  return (
    <div className="bg-white p-4 border rounded w-[1220px] overflow-x-auto">
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
                        onChange={(e) => handleSelectItem(row.id, e.target.checked)}
                      />
                    ) : column.key === "no" ? (
                      rowIndex + 1
                    ) : column.key === "actions" ? (
                      <div className="flex pace-x-2">
                        <button 
                          onClick={() => navigate(`/praktikum/${id}/sistem/${akun}/bupot/${type}/${row.id}/edit`)}
                          className="bg-blue-500 text-white px-2 py-1 rounded text-sm hover:bg-blue-600"
                        >
                          Edit
                        </button>
                      </div>
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
