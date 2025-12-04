import React from "react";
import HartaTable from "../../shared/HartaTable";
import { jenisHartaBangunan } from "../../config/jenisHartaOptions";

export default function TidakPermanen({ config, onTotalChange }) {
  return (
    <HartaTable
      jenisHartaOptions={jenisHartaBangunan}
      title="Bangunan Tidak Permanen"
      customConfig={config} // Custom jika ingin ada perubahan kolom atau lainnya di Index
      onTotalChange={onTotalChange} 
    />
  );
}
