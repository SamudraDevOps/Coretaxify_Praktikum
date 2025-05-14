import React from "react";

const BUPOTTable = ({
  columns,
  data = [],
  status = "belumTerbit",
  emptyMessage = "Tidak ada data yang ditemukan.",
}) => {
  // Different columns for "Telah Terbit" status
  const getColumns = () => {
    if (status === "telahTerbit") {
      return [
        ...columns,
        { key: "dilaporkanSPT", label: "Dilaporkan Dalam SPT" },
        { key: "sptTelahDiperiksa", label: "SPT telah/sedang diperiksa" },
        { key: "sptPenegakanHukum", label: "SPT Dalam penegakan hukum" },
      ];
    }
    return columns;
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
                    {row[column.key]}
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
