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
    { key: "masa_awal", label: "Masa Pajak" },
    { key: "nomor_pemotongan", label: "Nomor Pemotongan" },
    { key: "status", label: "Status" },
    { key: "nitku", label: "NITKU/Nomor Identitas Sub Unit Organisasi" },
    { key: "jenis_pajak", label: "Jenis Pajak" },
    { key: "kode_objek_pajak", label: "Kode Pajak" },
    { key: "npwp_akun", label: "NPWP" },
    { key: "nama_akun", label: "Nama" },
    { key: "dasar_pengenaan_pajak", label: "Dasar Pengenaan Pajak (RP)" },
    { key: "pajak_penghasilan", label: "Pajak Penghasilan" },
    { key: "fasilitas_pajak", label: "Fasilitas Pajak" },
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
