import React from 'react';
import BUPOTLayout from '../shared/BUPOTLayout';
import { useParams } from 'react-router-dom';

const BPPU = ({ data = [] }) => {
  const { status } = useParams();
  
  // Determine which status we're viewing
  const getStatus = () => {
    if (status === 'telah-terbit') return 'telahTerbit';
    if (status === 'tidak-valid') return 'tidakValid';
    return 'belumTerbit';
  };
  
  const currentStatus = getStatus();
  
  // BPPU-specific titles
  const titles = {
    belumTerbit: 'EBUPOT BPU NOT ISSUED',
    telahTerbit: 'EBUPOT BPU ISSUED',
    tidakValid: 'EBUPOT BPU INVALID',
    sidebar: 'BPPU'
  };
  
  // Any BPPU-specific columns or configurations
  const bppuColumns = [
    // Default columns will be used from BUPOTLayout
    // Add any BPPU-specific columns here
  ];
  
  return (
    <BUPOTLayout
      type="bppu"
      status={currentStatus}
      data={data}
      tableTitle={titles[currentStatus]}
      sidebarTitle={titles.sidebar}
      columns={bppuColumns}
    />
  );
};

export default BPPU;
