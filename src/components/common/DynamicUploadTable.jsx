import React from "react";
import { FaTrash } from "react-icons/fa";
import * as XLSX from "xlsx";

// Excel processing utilities
const readExcelFileMultipleRows = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });

        // Look specifically for a sheet named "data"
        const dataSheetIndex = workbook.SheetNames.findIndex(
          (name) => name == "DATA"
        );

        if (dataSheetIndex === -1) {
          reject(new Error("Excel file must contain a sheet named 'data'"));
          return;
        }

        const worksheet = workbook.Sheets[workbook.SheetNames[dataSheetIndex]];

        // Convert to JSON - let XLSX auto-detect headers
        const jsonData = XLSX.utils.sheet_to_json(worksheet, {
          range: 4,
        });

        // console.log(jsonData);
        console.log("Raw Excel headers:", Object.keys(jsonData[0] || {}));
        console.log("Raw Excel first row:", jsonData[0]);
        resolve(jsonData);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
};

const filterRequiredColumns = (excelData) => {
  const requiredColumns = ["DPP/Harga Jual", "DPP Nilai Lain", "PPN", "PPnBM"];

  // Add debugging to see original data
  console.log("Before filtering, first row:", excelData[0]);

  return excelData.map((row) => {
    const filteredRow = {};
    let matchFound = false;

    // For each required column, try to find a matching column in the Excel data
    requiredColumns.forEach((reqCol) => {
      // Generate variations for this required column
      const reqColVariations = [
        reqCol,
        reqCol.toLowerCase(),
        reqCol.toUpperCase(),
        reqCol.replace(/\s+/g, ""),
        reqCol.replace(/\s+/g, "_"),
        reqCol.replace(/\//g, ""),
        reqCol.replace(/[\s\/]/g, ""),
      ];

      // Check all keys in the Excel row
      for (const key of Object.keys(row)) {
        // Generate variations for this Excel column
        const keyVariations = [
          key,
          key.toLowerCase(),
          key.toUpperCase(),
          key.replace(/\s+/g, ""),
          key.replace(/\s+/g, "_"),
          key.replace(/\//g, ""),
          key.replace(/[\s\/]/g, ""),
        ];

        // Check if any variation of the Excel column matches any variation of our required column
        const hasMatch = keyVariations.some((keyVar) =>
          reqColVariations.some(
            (reqVar) =>
              keyVar === reqVar ||
              keyVar.includes(reqVar) ||
              reqVar.includes(keyVar)
          )
        );

        if (hasMatch) {
          filteredRow[reqCol] = row[key];
          matchFound = true;
          console.log(
            `Matched column: Excel="${key}" to Required="${reqCol}" with value=${row[key]}`
          );
          break; // Found a match for this required column, move to next
        }
      }

      // If no match was found for this required column, set a default value
      if (!filteredRow[reqCol]) {
        filteredRow[reqCol] = reqCol.includes("PPN") ? 0 : "";
        console.log(
          `No match found for required column: ${reqCol}, using default value`
        );
      }
    });

    if (!matchFound) {
      console.warn("No matches found for any required columns in row:", row);
    }
    console.log("Filtered Row", filteredRow);
    return filteredRow;
  });
};

const validateExcelData = (data) => {
  if (!data || data.length === 0) {
    throw new Error("Excel file is empty");
  }
  return true;
};

// Dynamic mapping based on columns configuration
const mapExcelDataToRows = (excelData, columns, initialRow) => {
  return excelData.map((row) => {
    const mappedRow = { ...initialRow };

    // Dynamically map each column based on the columns configuration
    columns.forEach((col) => {
      if (col.type !== "file") {
        // Try multiple variations of the column key
        const possibleKeys = generateColumnKeyVariations(col.key, col.label);

        // Find the first matching key in the Excel data
        const matchingKey = possibleKeys.find((key) => row.hasOwnProperty(key));

        if (matchingKey) {
          mappedRow[col.key] = row[matchingKey];
        } else {
          mappedRow[col.key] = col.type === "number" ? 0 : "";
        }
      }
    });

    return mappedRow;
  });
};

// Generate possible column name variations
const generateColumnKeyVariations = (key, label) => {
  const variations = [
    key, // Original key (e.g., 'hargaJual')
    label, // Label as-is (e.g., 'Harga Jual')
    key.toLowerCase(), // lowercase (e.g., 'hargajual')
    key.toUpperCase(), // uppercase (e.g., 'HARGAJUAL')

    // Convert camelCase to snake_case
    key.replace(/([A-Z])/g, "_$1").toLowerCase(), // 'harga_jual'
    key.replace(/([A-Z])/g, "_$1").toUpperCase(), // 'HARGA_JUAL'

    // Convert camelCase to space-separated
    key.replace(/([A-Z])/g, " $1").trim(), // 'harga Jual'
    key
      .replace(/([A-Z])/g, " $1")
      .trim()
      .toLowerCase(), // 'harga jual'
    key
      .replace(/([A-Z])/g, " $1")
      .trim()
      .toUpperCase(), // 'HARGA JUAL'

    // Convert label to various formats
    label.toLowerCase(), // 'harga jual'
    label.toUpperCase(), // 'HARGA JUAL'
    label.replace(/\s+/g, ""), // 'HargaJual'
    label.replace(/\s+/g, "").toLowerCase(), // 'hargajual'
    label.replace(/\s+/g, "").toUpperCase(), // 'HARGAJUAL'
    label.replace(/\s+/g, "_"), // 'Harga_Jual'
    label.replace(/\s+/g, "_").toLowerCase(), // 'harga_jual'
    label.replace(/\s+/g, "_").toUpperCase(), // 'HARGA_JUAL'
  ];

  // Remove duplicates
  return [...new Set(variations)];
};

// Generate expected column format info
const generateExpectedColumnsInfo = (columns) => {
  const nonFileColumns = columns.filter((col) => col.type !== "file");
  return nonFileColumns.map((col) => {
    const variations = generateColumnKeyVariations(col.key, col.label);
    return {
      field: col.key,
      label: col.label,
      examples: variations.slice(0, 3), // Show first 3 variations as examples
    };
  });
};

export default function DynamicUploadTable({
  rows,
  setRows,
  handleFileChange,
  handleInputChange,
  handleAddRow,
  handleRemoveRow,
  total,
  columns,
  fileLabel = "File",
  addLabel = "+ Tambah data",
  showTotal = true,
  consolacon, // console.log(jsonData);
}) {
  // WORK MULTIPLE ROW
  // const handleExcelFileUpload = async (file, rowIndex) => {
  //   try {
  //     // Validate file type
  //     const validTypes = [
  //       "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
  //       "application/vnd.ms-excel", // .xls
  //       "text/csv", // .csv
  //     ];

  //     if (!validTypes.includes(file.type)) {
  //       throw new Error(
  //         "Please upload a valid Excel file (.xlsx, .xls) or CSV file"
  //       );
  //     }

  //     const excelData = await readExcelFileMultipleRows(file);
  //     validateExcelData(excelData);

  //     // Filter to only include the required columns
  //     const filteredData = filterRequiredColumns(excelData);
  //     console.log("Filtered data with required columns:", filteredData);

  //     // Get the initial row structure
  //     const initialRow = rows[rowIndex] || {};

  //     // Map Excel data to table rows
  //     const mappedExcelRows = mapExcelDataToRows(
  //       filteredData,
  //       columns,
  //       initialRow
  //     );

  //     // Create a copy of current rows
  //     const updatedRows = [...rows];

  //     if (mappedExcelRows.length === 1) {
  //       // Single row: Update the current row with Excel data
  //       updatedRows[rowIndex] = {
  //         ...mappedExcelRows[0],
  //         file: file,
  //       };
  //     } else if (mappedExcelRows.length > 1) {
  //       // Multiple rows: Replace current row and add additional rows
  //       // Set file reference only for the first row
  //       mappedExcelRows[0].file = file;

  //       // Replace current row with first Excel row
  //       updatedRows[rowIndex] = mappedExcelRows[0];

  //       // Insert additional rows after the current row
  //       const additionalRows = mappedExcelRows.slice(1);
  //       updatedRows.splice(rowIndex + 1, 0, ...additionalRows);
  //     }

  //     // Update the rows state
  //     setRows(updatedRows);

  //     // Log mapping info for debugging
  //     console.log(
  //       `Excel data loaded successfully at row ${rowIndex}:`,
  //       mappedExcelRows
  //     );
  //     console.log(
  //       "Available Excel columns:",
  //       Object.keys(filteredData[0] || {})
  //     );
  //     console.log("Expected columns:", generateExpectedColumnsInfo(columns));
  //   } catch (error) {
  //     console.error("Error reading Excel file:", error);
  //     alert(`Error reading Excel file: ${error.message}`);
  //   }
  // };
  const handleExcelFileUpload = async (file, rowIndex) => {
    try {
      // Validate file type
      const validTypes = [
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
        "application/vnd.ms-excel", // .xls
        "text/csv", // .csv
      ];

      if (!validTypes.includes(file.type)) {
        throw new Error(
          "Please upload a valid Excel file (.xlsx, .xls) or CSV file"
        );
      }

      const excelData = await readExcelFileMultipleRows(file);
      console.log("Raw Excel headers:", Object.keys(excelData[0] || {}));
      console.log("Raw Excel first row:", excelData[0]);

      validateExcelData(excelData);

      // Get the initial row structure
      const initialRow = rows[rowIndex] || {};

      // Create a more precise mapping between Excel columns and component columns
      const columnMapping = {
        "DPP/Harga Jual": "dppHargaJual",
        "DPP Nilai Lain": "dppNilaiLain",
        PPN: "ppn",
        PPnBM: "ppnbm",
      };

      // Calculate sums for each column
      const sums = {};

      // Initialize sums object with numeric columns from our configuration
      columns.forEach((col) => {
        if (col.type === "number") {
          sums[col.key] = 0;
        }
      });

      // For debugging - create a map to track which Excel columns map to which component columns
      const mappingUsed = {};

      // Process each row from Excel and add to sums
      excelData.forEach((row, rowIdx) => {
        // For each Excel row, we need to determine which columns match our required columns
        const rowMappings = {}; // To track which Excel column maps to which component column for this row

        // For each key in the Excel row
        Object.keys(row).forEach((excelColName) => {
          // For each of our required columns, check if this Excel column matches
          Object.entries(columnMapping).forEach(
            ([requiredName, componentKey]) => {
              // Generate variations for the required column name
              const requiredVariations = [
                requiredName,
                requiredName.toLowerCase(),
                requiredName.toUpperCase(),
                requiredName.replace(/\s+/g, ""),
                requiredName.replace(/\//g, ""),
                requiredName.replace(/[\s\/]/g, ""),
              ];

              // Generate variations for the Excel column name
              const excelVariations = [
                excelColName,
                excelColName.toLowerCase(),
                excelColName.toUpperCase(),
                excelColName.replace(/\s+/g, ""),
                excelColName.replace(/\//g, ""),
                excelColName.replace(/[\s\/]/g, ""),
              ];

              // Check if any variation of the Excel column matches any variation of our required column
              const matchFound = requiredVariations.some((reqVar) =>
                excelVariations.some(
                  (excelVar) =>
                    excelVar === reqVar ||
                    (excelVar.length > 3 &&
                      reqVar.length > 3 &&
                      (excelVar.includes(reqVar) || reqVar.includes(excelVar)))
                )
              );

              if (matchFound) {
                rowMappings[componentKey] = excelColName;
                if (!mappingUsed[excelColName]) {
                  mappingUsed[excelColName] = componentKey;
                  console.log(
                    `Mapping Excel column "${excelColName}" to component column "${componentKey}"`
                  );
                }
              }
            }
          );
        });

        // Now add the values using the mappings determined for this row
        Object.entries(rowMappings).forEach(([componentKey, excelColName]) => {
          // If this is a numeric column, add to sum
          const col = columns.find((c) => c.key === componentKey);
          if (col && col.type === "number") {
            const value = parseFloat(row[excelColName]) || 0;
            sums[componentKey] = (sums[componentKey] || 0) + value;
            console.log(
              `Row ${
                rowIdx + 1
              }: Adding ${value} to sum of ${componentKey} (from Excel column "${excelColName}"), new total: ${
                sums[componentKey]
              }`
            );
          }
        });
      });

      console.log("Final calculated sums:", sums);
      console.log("Column mappings used:", mappingUsed);

      // Create a copy of current rows
      const updatedRows = [...rows];

      // Update the current row with the sums
      updatedRows[rowIndex] = {
        ...initialRow,
        ...sums,
        file: file,
      };

      // Update the rows state
      setRows(updatedRows);

      // Display confirmation with row count
      console.log(`Summed ${excelData.length} rows from Excel into one row`);
    } catch (error) {
      console.error("Error reading Excel file:", error);
      alert(`Error reading Excel file: ${error.message}`);
    }
  };

  const handleFileChangeWithExcel = (idx, file) => {
    if (file) {
      // Check if it's an Excel/CSV file
      const isExcelFile =
        file.type.includes("spreadsheet") ||
        file.type.includes("excel") ||
        file.type.includes("csv") ||
        file.name.endsWith(".xlsx") ||
        file.name.endsWith(".xls") ||
        file.name.endsWith(".csv");

      if (isExcelFile) {
        handleExcelFileUpload(file, idx);
      } else {
        // Handle regular file upload
        if (handleFileChange) {
          handleFileChange(idx, file);
        }
      }
    }
  };

  // Generate help text based on columns
  const expectedColumnsInfo = generateExpectedColumnsInfo(columns);

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
                          handleFileChangeWithExcel(idx, e.target.files[0])
                        }
                      />
                      {row.file && (
                        <div className="text-xs mt-1 text-green-600">
                          {row.file.name}
                          {(row.file.name.endsWith(".xlsx") ||
                            row.file.name.endsWith(".xls") ||
                            row.file.name.endsWith(".csv")) && (
                            <span className="block text-blue-600">
                              ✓ Excel data loaded
                            </span>
                          )}
                        </div>
                      )}
                    </>
                  ) : (
                    <input
                      type={col.type}
                      className="w-24 border rounded px-2 py-1 text-right"
                      value={row[col.key] || ""}
                      onChange={(e) =>
                        handleInputChange &&
                        handleInputChange(idx, col.key, e.target.value)
                      }
                      min={col.type === "number" ? "0" : undefined}
                      placeholder={col.placeholder || ""}
                    />
                  )}
                </td>
              ))}
              <td className="py-2 px-3 border-b text-center">
                <button
                  type="button"
                  className="text-red-600 hover:text-red-800 text-xl"
                  onClick={() => handleRemoveRow && handleRemoveRow(idx)}
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
                  {col.type === "number"
                    ? total && total(col.key)
                      ? total(col.key)
                      : 0
                    : ""}
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
