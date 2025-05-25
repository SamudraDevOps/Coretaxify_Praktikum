import { useState } from "react";

export function useDynamicTableRows(initialRow) {
  const [rows, setRows] = useState([{ ...initialRow }]);

  const handleFileChange = (idx, file) => {
    const updated = [...rows];
    updated[idx].file = file;
    setRows(updated);
  };

  const handleInputChange = (idx, field, value) => {
    const updated = [...rows];
    updated[idx][field] = value.replace ? value.replace(/[^0-9]/g, "") : value;
    setRows(updated);
  };

  const handleAddRow = () => {
    setRows([...rows, { ...initialRow }]);
  };

  const handleRemoveRow = (idx) => {
    const updated = rows.filter((_, i) => i !== idx);
    setRows(updated.length ? updated : [{ ...initialRow }]);
  };

  const total = (field) =>
    rows.reduce((sum, row) => sum + (Number(row[field]) || 0), 0);

  return {
    rows,
    setRows,
    handleFileChange,
    handleInputChange,
    handleAddRow,
    handleRemoveRow,
    total,
  };
}