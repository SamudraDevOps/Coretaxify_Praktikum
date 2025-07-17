import React, { useState } from "react";
import BUPOTSidebar from "./BUPOTSidebar";
import BUPOTActionBar from "./BUPOTActionBar";
import BUPOTTable from "./BUPOTTable";
import BUPOTPagination from "./BUPOTPagination";

const BUPOTLayout = ({
  type,
  status = "draft",
  title,
  tableTitle,
  sidebarTitle,
  data = [],
  pagination,
  links,
  currentPage,
  onPageChange,
  columns,
  children,
  customTable,
  customActionBar,
  onDataRefresh,
  sidebar,
  statusPenerbitan,
  tipeBupot,
  sistemId,
}) => {
  const [selectedItems, setSelectedItems] = useState([]);

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

  const handleActionComplete = () => {
    setSelectedItems([]);
    onDataRefresh?.();
  };

  const handlePageChange = (page) => {
    setSelectedItems([]); // Clear selections when changing pages
    onPageChange?.(page);
  };

  return (
    <div className="flex">
      <BUPOTSidebar type={type} title={sidebarTitle} sidebar={sidebar}/>

      <div className="w-full p-6 bg-gray-50 min-h-screen min-w-0">
        {customActionBar || (
          <BUPOTActionBar
            type={type}
            status={status}
            title={tableTitle}
            selectedItems={selectedItems}
            onActionComplete={handleActionComplete}
            statusPenerbitan={statusPenerbitan}
            tipeBupot={tipeBupot}
            sistemId={sistemId}
          />
        )}

        {customTable || (
          <BUPOTTable
            columns={columns || defaultColumns}
            data={data}
            status={status}
            selectedItems={selectedItems}
            onSelectionChange={setSelectedItems}
            type={type}
            currentPage={currentPage}
            pagination={pagination}
          />
        )}

        {/* Pagination Component */}
        {pagination && (
          <BUPOTPagination
            currentPage={currentPage}
            totalPages={pagination.last_page}
            totalItems={pagination.total}
            itemsPerPage={pagination.per_page}
            from={pagination.from}
            to={pagination.to}
            links={links}
            onPageChange={handlePageChange}
          />
        )}

        {children}
      </div>
    </div>
  );
};

export default BUPOTLayout;
