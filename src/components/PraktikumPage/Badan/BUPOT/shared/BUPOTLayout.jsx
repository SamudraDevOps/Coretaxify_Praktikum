import React from "react";
import BUPOTSidebar from "./BUPOTSidebar";
import BUPOTActionBar from "./BUPOTActionBar";
import BUPOTTable from "./BUPOTTable";

const BUPOTLayout = ({
  type,
  status = "draft",
  title,
  tableTitle,
  sidebarTitle,
  data = [],
  columns,
  children,
  customTable,
  customActionBar,
}) => {
  // Common columns for all BUPOT types
  const defaultColumns = [
    { key: "no", label: "No" },
    { key: "masaPajak", label: "Masa Pajak" },
    { key: "nomorPemotongan", label: "Nomor Pemotongan" },
    { key: "status", label: "Status" },
    { key: "nitku", label: "NITKU/Nomor Identitas Sub Unit Organisasi" },
    { key: "jenisPajak", label: "Jenis Pajak" },
    { key: "kodePajak", label: "Kode Pajak" },
    { key: "npwp", label: "NPWP" },
    { key: "nama", label: "Nama" },
    { key: "dasarPengenaan", label: "Dasar Pengenaan Pajak (RP)" },
    { key: "pajakPenghasilan", label: "Pajak Penghasilan" },
    { key: "fasilitasPajak", label: "Fasilitas Pajak" },
  ];

  return (
    <div className="flex">
      <BUPOTSidebar type={type} title={sidebarTitle} />

      <div className="w-full p-6 bg-gray-50 min-h-screen">
        {customActionBar || (
          <BUPOTActionBar type={type} status={status} title={tableTitle} />
        )}

        {customTable || (
          <BUPOTTable
            columns={columns || defaultColumns}
            data={data}
            status={status}
          />
        )}

        {children}
      </div>
    </div>
  );
};

export default BUPOTLayout;
